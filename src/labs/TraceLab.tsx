import { useState, useEffect, useRef } from 'react';
// クリーンに型とデータを読み込み
import type { TraceStage, TracePage } from './traceData';
import { TRACE_STAGES } from './traceData';

export default function TraceLab() {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const stage: TraceStage = TRACE_STAGES[currentStageIdx] || TRACE_STAGES;

  const [userCodes, setUserCodes] = useState<Record<string, string>>({});
  const [activeFileName, setActiveFileName] = useState<string>('index.html');
  const [browserPath, setBrowserPath] = useState<string>('index.html');
  const [isPassed, setIsPassed] = useState<boolean>(false);

  // エディタ側のスクロール同期Ref
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ステージ切り替え時、またはデータ読み込み時の初期化
  useEffect(() => {
    if (!stage || !stage.pages || stage.pages.length === 0) return;

    const initialCodes: Record<string, string> = {};
    stage.pages.forEach(p => {
      initialCodes[p.fileName] = p.initialCode || '';
    });
    setUserCodes(initialCodes);
    
    const firstTarget = stage.pages?.fileName || 'index.html';
    setActiveFileName(firstTarget);
    setBrowserPath(firstTarget);
    setIsPassed(false);
  }, [currentStageIdx]);

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

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // HTMLとCSSを動的にガッチャンコして描画するプレビュー
  const renderVirtualBrowser = () => {
    const targetPath = browserPath || 'index.html';
    const htmlRaw = userCodes[targetPath] || '';
    const cssRaw = userCodes['style.css'] || '';

    if (userCodes[targetPath] === undefined) {
      return <div className="w-full h-full bg-white text-rose-500 p-4">❌ 404 Not Found</div>;
    }

    const finalBlob = `
      <html>
        <head>
          <style>
            ${cssRaw}
            ::-webkit-scrollbar { width: 6px; height: 6px; }
            ::-webkit-scrollbar-track { background: #f1f5f9; }
            ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
          </style>
        </head>
        <body style="margin:0; padding:10px; background:#f8fafc; font-family: sans-serif;">
          ${htmlRaw}
        </body>
      </html>
    `;
    
    return (
      <div className="w-full h-full bg-white border border-[#2d2d2d] text-left flex flex-col overflow-hidden">
        <div className="bg-[#f1f5f9] text-slate-700 text-[10px] font-mono px-2 py-1 border-b border-slate-300 flex items-center gap-2 select-none shrink-0">
          <span className="text-emerald-500">🔒 https://</span>
          <span className="font-bold text-slate-800">localhost:1420/{targetPath}</span>
        </div>
        <div className="flex-1 w-full overflow-auto" dangerouslySetInnerHTML={{ __html: finalBlob }} />
      </div>
    );
  };

  const activePage = getActivePage();
  const displayCode = activePage.correctCode || '';

  function getActivePage(): TracePage {
    if (stage && stage.pages && stage.pages.length > 0) {
      const found = stage.pages.find(p => p.fileName === activeFileName);
      if (found) return found;
      return stage.pages;
    }
    return { fileName: 'index.html', initialCode: '', correctCode: '', language: 'html' };
  }

  const correctLineNumbers = Array.from({ length: Math.max(displayCode.split('\n').length, 1) }, (_, i) => i + 1);
  const userLineNumbers = Array.from({ length: Math.max((userCodes[activeFileName] || '').split('\n').length, 1) }, (_, i) => i + 1);

  return (
    // 👑 完璧なフルフラット化：内枠の不要なマージンやパディングを「0」にし、Tauriの窓の底辺まで高さを100%自動追従させる！
    <div className="w-full flex-1 flex flex-col overflow-hidden bg-[#141414]">
      
      {/* ラボ専用：上部インフォヘッダー（無駄な余白や丸みを排したインダストリアルデザイン） */}
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-3 py-1.5 flex items-center justify-between shrink-0 w-full select-none">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded font-mono">TRACE STADIUM</span>
          <h2 className="text-xs font-bold text-slate-300">STAGE {stage.id < 10 ? `0${stage.id}` : stage.id}：{stage.title}</h2>
        </div>
        <div className="text-[11px] text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-800/40 font-mono">
          🎯 {stage.mission}
        </div>
      </div>

      {/* ステージ大整列エリア */}
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-2 py-1 flex gap-1.5 overflow-x-auto text-xs items-center shrink-0 w-full">
        <span className="text-[10px] font-bold text-[#858585] uppercase font-mono">SELECT STAGE:</span>
        {TRACE_STAGES.map((s, idx) => (
          <button
            key={`stage-btn-${s.id}-${idx}`}
            onClick={() => setCurrentStageIdx(idx)}
            className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold border transition ${
              currentStageIdx === idx ? 'bg-[#37373d] text-amber-400 border-amber-500 shadow-md' : 'bg-[#1e1e1e] text-slate-400 border-transparent hover:bg-[#2d2d2d]'
            }`}
          >
            #{s.id}
          </button>
        ))}
      </div>

      {/* サブファイル用：子タブバー */}
      <div className="bg-[#2d2d2d] flex border-b border-[#252526] text-xs text-slate-400 select-none overflow-x-auto shrink-0 w-full">
        {stage.pages.map((p, pIdx) => (
          <button
            key={`tab-btn-${p.fileName}-${pIdx}`}
            onClick={() => setActiveFileName(p.fileName)}
            className={`px-5 py-2 border-t-2 font-mono flex items-center gap-1.5 transition text-xs ${
              activeFileName === p.fileName ? 'bg-[#141414] text-amber-400 font-bold border-t-amber-500' : 'border-t-transparent text-slate-500 hover:bg-[#333]'
            }`}
          >
            {p.language === 'html' ? '🧡' : '💙'} {p.fileName}
          </button>
        ))}
        <div className="ml-auto pr-4 flex items-center text-[10px] font-mono">
          {isPassed ? (
            <span className="text-emerald-400 font-bold animate-pulse">✓ COMPLETE!</span>
          ) : (
            <span className="text-amber-500 font-medium">✍ RUNNING...</span>
          )}
        </div>
      </div>

      {/* 👑 【大画面全面開放スタジアム】
          邪魔をしていた「一回り中の四角いカード（div）」を跡形もなく完全爆破！！！
          画面全体をフルに横3分割し、文字入力エリアの限界横幅を物理的に100%全開放！！！ */}
      <div className="flex-1 w-full grid grid-cols-3 gap-0 overflow-hidden items-stretch bg-[#141414]">
        
        {/* ① 左：[見本コード] */}
        <div className="flex flex-col h-full overflow-hidden border-r border-[#2d2d2d]">
          <div className="bg-[#1e1e1e] text-cyan-400 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#2d2d2d] font-mono">
            👀 SPEC CODE ({activeFileName})
          </div>
          <div className="flex-1 flex overflow-y-auto w-full h-full bg-[#0a0a0a]">
            <div className="w-10 bg-[#0f0f10] text-[#5a5a5a] font-mono text-[11px] text-right pr-2 py-3 border-r border-[#2d2d2d] select-none leading-relaxed shrink-0">
              {correctLineNumbers.map(ln => <div key={`correct-ln-${ln}`}>{ln}</div>)}
            </div>
            <div 
              className="flex-1 p-3 pl-2 font-mono text-[12px] overflow-auto whitespace-pre leading-relaxed text-left select-all w-full" 
              style={{ color: '#4ade80', lineHeight: '18px' }}
            >
              {displayCode}
            </div>
          </div>
        </div>

        {/* ② 中央：[入力エディタ] */}
        <div className="flex flex-col h-full overflow-hidden border-r border-[#2d2d2d]">
          <div className="bg-[#1e1e1e] text-amber-500 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#2d2d2d] font-mono">
            ✍️ YOUR EDITOR ({activeFileName})
          </div>
          <div className="flex-1 flex bg-[#141414] h-full w-full relative">
            <div ref={lineNumbersRef} className="w-10 bg-[#141414] text-[#5a5a5a] font-mono text-[11px] text-right pr-2 py-3 border-r border-[#2d2d2d] select-none overflow-hidden leading-relaxed shrink-0">
              {userLineNumbers.map(ln => <div key={`user-ln-${ln}`} className="h-[18px]">{ln}</div>)}
            </div>
            {/* 👑 邪魔なカード枠の壁が消えたため、テキストエリアそのものが右側の境界線ギリギリまで100%フルに広がりきります！！ */}
            <textarea
              ref={textareaRef}
              value={userCodes[activeFileName] || ''}
              onChange={(e) => handleCodeChange(activeFileName, e.target.value)}
              onScroll={handleScroll}
              className="flex-1 bg-transparent text-[#9cdcfe] font-mono text-[12px] outline-none resize-none p-3 pl-2 leading-relaxed text-left overflow-y-auto whitespace-pre h-full w-full"
              style={{ caretColor: '#fff', lineHeight: '18px' }}
              placeholder="見本コードをここに写し取ってください..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* ③ 右：[バーチャルライブブラウザ] */}
        <div className="flex flex-col h-full overflow-hidden bg-[#141414]">
          <div className="bg-[#1e1e1e] text-slate-400 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#2d2d2d] flex justify-between items-center font-mono">
            <span>🌐 LIVE PREVIEW</span>
            <div className="flex gap-1">
              {stage.pages.map(p => (
                <button 
                  key={`browser-btn-${p.fileName}`}
                  onClick={() => setBrowserPath(p.fileName)} 
                  className={`px-1.5 py-0.5 rounded font-mono text-[9px] font-bold border transition ${browserPath === p.fileName ? 'bg-sky-600 text-white border-sky-500' : 'bg-[#2d2d2d] text-slate-400 border-transparent'}`}
                >
                  {p.fileName}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-slate-900/20 p-0 flex flex-col h-full overflow-hidden">
            {renderVirtualBrowser()}
          </div>
        </div>

      </div>

    </div>
  );
}