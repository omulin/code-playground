import { useState, useEffect, useRef } from 'react';
// クリーンに型とデータを読み込み
import type { TraceStage, TracePage } from './traceData';
import { TRACE_STAGES } from './traceData';

export default function TraceLab() {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  
  // 予備のデータを TRACE_STAGES にして単一オブジェクトに100%固定！
  const stage: TraceStage = TRACE_STAGES[currentStageIdx] || TRACE_STAGES;

  const [userCodes, setUserCodes] = useState<Record<string, string>>({});
  const [activeFileName, setActiveFileName] = useState<string>('index.html');
  const [browserPath, setBrowserPath] = useState<string>('index.html');
  const [isPassed, setIsPassed] = useState<boolean>(false);

  // エディタ側のスクロール同期Ref
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ステージ切り替え時、またはデータ読み込み時の鉄壁初期化
  useEffect(() => {
    if (!stage || !stage.pages || stage.pages.length === 0) return;

    const initialCodes: Record<string, string> = {};
    stage.pages.forEach(p => {
      initialCodes[p.fileName] = p.initialCode || '';
    });
    setUserCodes(initialCodes);
    
    // 最初のページのファイル名を確実に安全にセット！
    const firstTarget = stage.pages.fileName || 'index.html';
    setActiveFileName(firstTarget);
    setBrowserPath(firstTarget);
    setIsPassed(false);
  }, [currentStageIdx, stage]);

  const handleCodeChange = (fileName: string, val: string) => {
    const updated = { ...userCodes, [fileName]: val };
    setUserCodes(updated);

    let allMatch = true;
    stage.pages.forEach(p => {
      const userClean = (updated[p.fileName] || "").replace(/\s/g, "");
      const correctClean = (p.correctCode || "").replace(/\s/g, "");
      if (userClean !== correctClean) {
        allMatch = false;
      }
    });
    setIsPassed(allMatch);
  };

  // エディタ側のスクロール位置を左側の行番号へ同期する魔法
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const renderVirtualBrowser = () => {
    const targetPath = browserPath || 'index.html';
    const currentHtmlRaw = userCodes[targetPath] || ``;
    
    // WordPress用の安全な実装待ち表示（確定キープ）
    if (stage.category === 'WordPress' || targetPath.endsWith('.php')) {
      return (
        <div className="w-full h-full min-h-[260px] bg-[#1e1e1e] text-emerald-400 rounded-lg p-4 overflow-auto border border-[#333] flex flex-col justify-center items-center text-xs font-mono select-none">
          <span>🐘 WordPress PHP TEMPLATE MODE</span>
          <span className="text-[10px] text-slate-400 mt-2">PHPコードはサーバーサイドで実行されるため</span>
          <span className="text-[10px] text-slate-400">バーチャルブラウザの「見本」と一致すればクリアになります！</span>
        </div>
      );
    }

    if (targetPath === 'index.html' && (!userCodes['index.html'] || userCodes['index.html'].includes('見本を真似して'))) {
      return (
        <div className="w-full h-full min-h-[260px] bg-white rounded-lg p-4 overflow-auto border border-[#333] flex flex-col justify-center items-center text-slate-400 text-xs select-none">
          <span>🌐 待機中...</span>
          <span className="text-[10px] text-slate-400 mt-1">下のテキストエリアに写経を始めるとここに描画されます</span>
        </div>
      );
    }

    if (userCodes[targetPath] === undefined) {
      return (
        <div className="w-full h-full min-h-[260px] bg-white rounded-lg p-4 overflow-auto border border-[#333] flex flex-col justify-center items-center text-rose-500 text-xs font-bold font-mono">
          <span>❌ 404 Not Found</span>
          <span className="text-[10px] text-slate-400 mt-1">ファイル '{targetPath}' が見つかりません</span>
        </div>
      );
    }
    
    return (
      <div className="w-full h-full min-h-[260px] bg-white rounded-lg p-4 overflow-auto border border-[#333] text-left select-text">
        <div className="bg-[#f1f5f9] text-slate-700 text-[10px] font-mono px-3 py-1 rounded mb-3 border border-slate-300 flex items-center gap-2 select-none">
          <span className="text-emerald-500">🔒 https://</span>
          <span className="font-bold text-slate-800">localhost:3000/{targetPath}</span>
        </div>
        
        <div 
          className="preview-sandbox"
          dangerouslySetInnerHTML={{ __html: currentHtmlRaw }}
          onClick={(e) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            if (anchor) {
              const href = anchor.getAttribute('href');
              if (href && userCodes[href] !== undefined) {
                setBrowserPath(href);
              } else if (href) {
                alert(`エラー: '${href}' はまだ写経データが作成されていないか、存在しません！`);
              }
            }
          }}
        />
      </div>
    );
  };

  const getActivePage = (): TracePage => {
    if (stage && stage.pages && stage.pages.length > 0) {
      const found = activeFileName ? stage.pages.find(p => p.fileName === activeFileName) : null;
      if (found) return found;
      return stage.pages;
    }
    return { fileName: 'index.html', initialCode: '', correctCode: '', language: 'html' };
  };

  const activePage = getActivePage();
  const displayCode = activePage.correctCode || '';

  // 👑 見本コード側の改行数を数えて、見本用の行番号配列を錬成
  const correctLineCount = Math.max(displayCode.split('\n').length, 1);
  const correctLineNumbers = Array.from({ length: correctLineCount }, (_, i) => i + 1);

  // ユーザー入力コード側の改行数を数えて、エディタ用の行番号配列を錬成
  const currentUserCode = userCodes[activeFileName] || '';
  const userLineCount = Math.max(currentUserCode.split('\n').length, 1);
  const userLineNumbers = Array.from({ length: userLineCount }, (_, i) => i + 1);

  return (
    <div className="space-y-4 text-left">
      <div className="flex bg-[#252526] border border-[#3c3c3c] p-2 rounded gap-2 overflow-x-auto text-xs items-center">
        <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded tracking-wider uppercase font-mono">TRACE MODE</span>
        {TRACE_STAGES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentStageIdx(idx)}
            className={`px-3 py-1 rounded font-mono font-bold border transition ${
              currentStageIdx === idx 
                ? 'bg-[#37373d] text-amber-400 border-amber-500' 
                : 'bg-[#1e1e1e] text-slate-400 border-transparent hover:bg-[#2d2d2d]'
            }`}
          >
            #{s.id} {s.title.split('：')}
          </button>
        ))}
      </div>

      <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded border-l-4 border-amber-500 space-y-1 text-xs">
        <div className="font-bold text-white text-sm">MISSION 0{stage.id}：{stage.title}</div>
        <p className="text-slate-400 leading-relaxed">{stage.description}</p>
        <div className="text-[11px] text-amber-400/90 bg-amber-950/20 p-2 rounded mt-2">
          🎯 【勝利条件】: {stage.mission}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        
        {/* 左側：[見本] パネル（行番号完全分割表示！） */}
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-4 flex flex-col min-h-[360px]">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">👀 [見本] 正解コードパネル</h4>
            <span className="text-[9px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded font-mono">{activePage.fileName}</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-2">この文字列と完全に一致するように中央のエディタに書き写してね！</p>
          
          {/* 見本用のVS Code風コンテナ */}
          <div className="flex-1 rounded border border-[#3c3c3c] flex overflow-hidden relative" style={{ backgroundColor: '#0a0a0a' }}>
            {/* 見本側の行番号レーン */}
            <div className="w-10 bg-[#141414] text-[#5a5a5a] font-mono text-xs text-right pr-2 py-3 border-r border-[#2d2d2d] select-none leading-relaxed">
              {correctLineNumbers.map(ln => (
                <div key={ln} className="h-[18px]">{ln}</div>
              ))}
            </div>
            {/* 見本コードのテキスト本体 */}
            <div 
              className="flex-1 p-3 pl-2 font-mono text-[11px] overflow-auto whitespace-pre leading-relaxed select-all text-left"
              style={{ color: '#4ade80', lineHeight: '18px' }}
            >
              {displayCode}
            </div>
          </div>
        </div>

        {/* 中央：エディタパネル本体 */}
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded flex flex-col min-h-[360px] overflow-hidden">
          <div className="bg-[#2d2d2d] flex border-b border-[#252526] text-xs text-slate-400 select-none overflow-x-auto">
            {stage.pages.map(p => (
              <button
                key={p.fileName}
                onClick={() => {
                  setActiveFileName(p.fileName);
                  setBrowserPath(p.fileName);
                }}
                className={`px-4 py-2 border-t-2 font-mono flex items-center gap-1.5 transition ${
                  activeFileName === p.fileName 
                    ? 'bg-[#1e1e1e] text-amber-400 font-bold border-t-amber-500' 
                    : 'border-t-transparent text-slate-500 hover:bg-[#333]'
                }`}
              >
                {p.language === 'html' ? '🧡' : '💙'} {p.fileName}
              </button>
            ))}
            <div className="ml-auto pr-3 flex items-center text-[10px]">
              {isPassed ? (
                <span className="text-emerald-400 font-bold animate-pulse">✓ 完全トレース達成！</span>
              ) : (
                <span className="text-amber-500">✍️ トレース中...</span>
              )}
            </div>
          </div>

          {/* 入力用のVS Code仕様コンテナ */}
          <div className="flex-1 bg-[#141414] min-h-[280px] flex overflow-hidden relative">
            {/* 入力側の行番号レーン */}
            <div 
              ref={lineNumbersRef}
              className="w-10 bg-[#1e1e1e] text-[#5a5a5a] font-mono text-xs text-right pr-2 py-3 border-r border-[#2d2d2d] select-none overflow-hidden leading-relaxed"
            >
              {userLineNumbers.map(ln => (
                <div key={ln} className="h-[18px]">{ln}</div>
              ))}
            </div>

            {/* 本物の入力エリア */}
            <textarea
              ref={textareaRef}
              value={currentUserCode}
              onChange={(e) => handleCodeChange(activeFileName, e.target.value)}
              onScroll={handleScroll}
              className="flex-1 bg-transparent text-[#9cdcfe] font-mono text-xs outline-none resize-none p-3 pl-2 leading-relaxed text-left overflow-auto whitespace-pre"
              style={{ caretColor: '#fff', minHeight: '280px', lineHeight: '18px' }}
              placeholder="ここに見本コードを寸分違わず書き写してください..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* 右側：バーチャルブラウザ */}
        <div className="bg-[#252526] border border-[#3c3c3c] p-4 rounded flex flex-col min-h-[360px]">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">🌐 VIRTUAL LIVE BROWSER</h4>
            {stage.pages.length > 1 && (
              <div className="flex gap-1 text-[9px]">
                <button 
                  onClick={() => setBrowserPath('index.html')} 
                  className={`px-2 py-0.5 rounded font-mono ${browserPath === 'index.html' ? 'bg-sky-600 text-white' : 'bg-[#1e1e1e] text-slate-400'}`}
                >
                  indexへ強制ワープ
                </button>
                <button 
                  onClick={() => setBrowserPath('about.html')} 
                  className={`px-2 py-0.5 rounded font-mono ${browserPath === 'about.html' ? 'bg-purple-600 text-white' : 'bg-[#1e1e1e] text-slate-400'}`}
                >
                  aboutへ微調整ワープ
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            {renderVirtualBrowser()}
          </div>

          {isPassed && (
            <div className="mt-3 p-2 bg-emerald-950/50 border border-emerald-800 rounded text-center animate-bounce">
              <span className="text-emerald-400 font-bold text-xs">🎉 完璧なトレースです！！全ファイルのシンタックスが完全一致しました！大クリア！</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}