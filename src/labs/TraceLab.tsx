import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Sparkles } from 'lucide-react';
// 👑 合体済みの TRACE_STAGES と 型 を読み込む
import type { TraceStage, TracePage } from './traceTypes';
import { TRACE_STAGES } from './traceData';

// 💡 外部（App.tsx）から受け取るプロパティの型定義
export interface TraceLabProps {
  isPreviewOnly?: boolean;
  isPreviewHidden?: boolean;
}

export default function TraceLab({ isPreviewOnly = false, isPreviewHidden = false }: TraceLabProps) {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const stage: TraceStage | undefined = TRACE_STAGES[currentStageIdx];

  const [userCodes, setUserCodes] = useState<Record<string, string>>({});
  const [activeFileName, setActiveFileName] = useState<string>('index.html');
  const [browserPath, setBrowserPath] = useState<string>('index.html');
  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string>('');

  if (!stage) {
    return <div className="w-full h-full flex items-center justify-center bg-[#1e1e1e] text-rose-500">ステージデータの読み込みに失敗しました。</div>;
  }

  // 💡 ステージ変更時、またはローカルストレージからの復元
  useEffect(() => {
    if (!stage.pages || stage.pages.length === 0) return;

    const storageKey = `trace_lab_stage_${stage.id}_codes`;
    const savedCodes = localStorage.getItem(storageKey);

    const initialCodes: Record<string, string> = {};
    if (savedCodes) {
      try {
        const parsed = JSON.parse(savedCodes);
        stage.pages.forEach(p => {
          initialCodes[p.fileName] = parsed[p.fileName] !== undefined ? parsed[p.fileName] : (p.initialCode || '');
        });
      } catch (e) {
        stage.pages.forEach(p => {
          initialCodes[p.fileName] = p.initialCode || '';
        });
      }
    } else {
      stage.pages.forEach(p => {
        initialCodes[p.fileName] = p.initialCode || '';
      });
    }

    setUserCodes(initialCodes);
    
    const firstTarget = stage.pages[0]?.fileName || 'index.html';
    setActiveFileName(firstTarget);
    setBrowserPath(firstTarget);
    setShowCompleteModal(false);

    // クリア判定の初期チェック
    checkIfPassed(initialCodes, false);
  }, [currentStageIdx, stage]);

  // 💡 リアルタイム同期ロジック（メイン画面とポップアップ画面の通信）
  useEffect(() => {
    if (!isPreviewOnly) {
      localStorage.setItem('trace_lab_sync_codes', JSON.stringify(userCodes));
    }
  }, [userCodes, isPreviewOnly]);

  useEffect(() => {
    if (isPreviewOnly) {
      const syncedCodes = localStorage.getItem('trace_lab_sync_codes');
      if (syncedCodes) {
        try {
          setUserCodes(JSON.parse(syncedCodes));
        } catch (e) {}
      }

      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'trace_lab_sync_codes' && e.newValue) {
          setUserCodes(JSON.parse(e.newValue));
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [isPreviewOnly]);

  // 💡 完璧な正誤判定ロジック
  const checkIfPassed = (codes: Record<string, string>, triggerPopup = true) => {
    let allMatch = true;
    stage.pages.forEach(p => {
      const userClean = (codes[p.fileName] || "").replace(/\s+/g, "");
      const correctClean = (p.correctCode || "").replace(/\s+/g, "");
      if (userClean !== correctClean) {
        allMatch = false;
      }
    });

    if (allMatch) {
      if (!isPassed && triggerPopup && !isPreviewOnly) {
        setShowCompleteModal(true);
      }
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  };

  const handleCodeChange = (fileName: string, val: string) => {
    const updated = { ...userCodes, [fileName]: val };
    setUserCodes(updated);
    checkIfPassed(updated, true);
  };

  // 💡 次のステージへ進む
  const handleNextStage = () => {
    setShowCompleteModal(false);
    if (currentStageIdx + 1 < TRACE_STAGES.length) {
      setCurrentStageIdx(prev => prev + 1);
    } else {
      alert("🏆 おめでとうございます！全ステージを完全走破しました！");
    }
  };

  // 💡 手動一時保存ボタンの処理
  const handleManualSave = () => {
    const storageKey = `trace_lab_stage_${stage.id}_codes`;
    localStorage.setItem(storageKey, JSON.stringify(userCodes));
    setSaveNotification("💾 一時保存しました！");
    setTimeout(() => setSaveNotification(""), 2500);
  };

  // 💡 一時保存リセット
  const handleResetStorage = () => {
    if (window.confirm("このステージの保存データを初期状態に戻しますか？")) {
      const storageKey = `trace_lab_stage_${stage.id}_codes`;
      localStorage.removeItem(storageKey);
      
      const initialCodes: Record<string, string> = {};
      stage.pages.forEach(p => {
        initialCodes[p.fileName] = p.initialCode || '';
      });
      setUserCodes(initialCodes);
      checkIfPassed(initialCodes, false);
      setSaveNotification("🗑️ リセットしました");
      setTimeout(() => setSaveNotification(""), 2500);
    }
  };

  // Monaco Editor の自動補完（閉じタグ挿入）設定
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editor.onDidChangeModelContent((e: any) => {
      const model = editor.getModel();
      if (!model) return;
      const currentLang = model.getLanguageId();
      if (currentLang !== 'html') return;

      const changes = e.changes?.[0];
      if (!changes || changes.text !== '>') return;

      const position = editor.getPosition();
      if (!position) return;

      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });
      
      const match = textUntilPosition.match(/<([a-zA-Z0-9\-]+)[^>]*>$/);
      const voidElements = ['br', 'img', 'input', 'hr', 'meta', 'link'];
      
      if (match && !voidElements.includes(match[1]) && monaco?.Range) {
        const tag = match[1];
        editor.executeEdits("auto-close", [
          {
            range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
            text: `</${tag}>`,
            forceMoveMarkers: true
          }
        ]);
        editor.setPosition(position);
      }
    });
  };

  const renderVirtualBrowser = () => {
    const targetPath = browserPath || 'index.html';
    const htmlRaw = userCodes[targetPath] || '';
    const cssRaw = userCodes['style.css'] || '';

    if (userCodes[targetPath] === undefined) {
      return <div className="w-full h-full bg-white text-rose-500 p-4">❌ 404 Not Found</div>;
    }

    let processedHtml = htmlRaw.replace(
      /<link[^>]*href=["']style\.css["'][^>]*>/gi,
      `<style>${cssRaw}</style>`
    );

    if (!processedHtml.includes('<style>') && processedHtml.includes('</head>')) {
      processedHtml = processedHtml.replace('</head>', `<style>${cssRaw}</style></head>`);
    } else if (!processedHtml.includes('<style>') && !processedHtml.includes('</head>')) {
      processedHtml = `<html><head><style>${cssRaw}</style></head><body>${processedHtml}</body></html>`;
    }

    return (
      <div className="w-full h-full bg-white text-left flex flex-col overflow-hidden">
        <div className="bg-[#f1f5f9] text-slate-700 text-[10px] font-mono px-3 py-1.5 border-b border-slate-300 flex items-center gap-2 select-none shrink-0">
          <span className="text-emerald-600 font-bold">🔒 https://</span>
          <span className="font-semibold text-slate-800">localhost:1420/{targetPath}</span>
        </div>
        <iframe
          className="flex-1 w-full border-0 bg-white"
          srcDoc={processedHtml}
          title={targetPath}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    );
  };

  // 🚀 【追加】もし「プレビュー専用モード（ポップアップ）」なら、プレビュー画面だけを全画面で返す
  if (isPreviewOnly) {
    return (
      <div className="w-full h-full flex flex-col overflow-hidden bg-[#141414] text-white">
        <div className="bg-[#252526] text-slate-300 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#3c3c3c] flex justify-between items-center font-mono">
          <div className="flex items-center gap-2">
            <span>🌐 LIVE PREVIEW MONITOR</span>
            <span className="text-[9px] bg-emerald-600/30 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30 animate-pulse">
              リアルタイム同期中
            </span>
          </div>
          <div className="flex gap-1">
            {stage.pages.map((p: TracePage) => (
              <button 
                key={`browser-btn-popup-${p.fileName}`}
                onClick={() => setBrowserPath(p.fileName)} 
                className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold border transition cursor-pointer ${
                  browserPath === p.fileName 
                    ? 'bg-sky-600 text-white border-sky-400 shadow' 
                    : 'bg-[#2d2d2d] text-slate-400 border-transparent hover:bg-[#333]'
                }`}
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
    );
  }

  const getActivePage = (): TracePage => {
    if (stage && stage.pages && stage.pages.length > 0) {
      const found = stage.pages.find(p => p.fileName === activeFileName);
      if (found) return found;
      return stage.pages[0];
    }
    return { fileName: 'index.html', initialCode: '', correctCode: '', language: 'html' };
  };

  const activePage = getActivePage();
  const displayCode = activePage.correctCode || '';
  const correctLineNumbers = Array.from({ length: Math.max(displayCode.split('\n').length, 1) }, (_, i) => i + 1);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#1e1e1e] text-white font-sans select-none relative">
      
      {/* 🎉 クリアお祝いポップアップ */}
      {showCompleteModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl flex flex-col items-center text-center">
            <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/30 mb-4 text-emerald-400">
              <Sparkles size={48} className="animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">🎉 STAGE {stage.id} クリア！</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              素晴らしい！見本通りのコードが正しく書き上げられ、プレビューに完璧に反映されました。
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowCompleteModal(false)}
                className="flex-1 py-3 bg-[#333] hover:bg-[#444] text-gray-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                コードを見直す
              </button>
              <button 
                onClick={handleNextStage}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                次のステージへ ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 ヘッダー */}
      <div className="bg-[#2d2d2d] border-b border-[#3c3c3c] px-4 py-2 flex items-center justify-between shrink-0 w-full">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black bg-amber-600 text-white px-2 py-0.5 rounded font-mono tracking-wider shadow">TRACE STADIUM</span>
          <h2 className="text-xs font-bold text-slate-200">STAGE {stage.id < 10 ? `0${stage.id}` : stage.id}：{stage.title}</h2>
        </div>
        <div className="text-[11px] text-amber-300 bg-amber-950/60 px-3 py-1 rounded-md border border-amber-800/50 font-mono shadow-inner">
          🎯 <strong>ミッション:</strong> {stage.mission}
        </div>
      </div>

      {/* 🧭 コントロールバー */}
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-4 py-1.5 flex items-center justify-between text-xs shrink-0 w-full">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-[#858585] uppercase font-mono tracking-wide">STAGE SELECT:</span>
          <select
            value={currentStageIdx}
            onChange={(e) => setCurrentStageIdx(parseInt(e.target.value, 10))}
            className="bg-[#1e1e1e] text-amber-300 text-xs font-bold px-3 py-1 rounded border border-[#444] cursor-pointer outline-none shadow-sm"
          >
            {TRACE_STAGES.map((s: TraceStage, idx: number) => (
              <option key={`stage-opt-${s.id}-${idx}`} value={idx}>
                STAGE {s.id}: {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {saveNotification && (
            <span className="text-xs text-emerald-400 font-bold animate-pulse font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              {saveNotification}
            </span>
          )}
          <button
            onClick={handleManualSave}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer shadow active:scale-95"
          >
            💾 一時保存
          </button>
          <button
            onClick={handleResetStorage}
            className="bg-[#333] hover:bg-[#444] text-gray-300 px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer"
            title="保存をリセット"
          >
            初期化
          </button>
        </div>
      </div>

      {/* 📑 サブファイル用：子タブバー */}
      <div className="bg-[#2d2d2d] flex border-b border-[#1e1e1e] text-xs text-slate-400 select-none overflow-x-auto shrink-0 w-full">
        {stage.pages.map((p: TracePage, pIdx: number) => (
          <button
            key={`tab-btn-${p.fileName}-${pIdx}`}
            onClick={() => setActiveFileName(p.fileName)}
            className={`px-5 py-2 border-t-2 font-mono flex items-center gap-2 transition text-xs cursor-pointer ${
              activeFileName === p.fileName 
                ? 'bg-[#1e1e1e] text-amber-400 font-bold border-t-amber-500 shadow-inner' 
                : 'border-t-transparent text-slate-400 hover:bg-[#333]'
            }`}
          >
            <span>{p.language === 'html' ? '🧡' : '💙'}</span>
            <span>{p.fileName}</span>
          </button>
        ))}
        <div className="ml-auto pr-4 flex items-center text-[11px] font-mono font-bold">
          {isPassed ? (
            <span className="text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800 animate-pulse">✓ STAGE COMPLETE!</span>
          ) : (
            <span className="text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-800/40">✍ CODING...</span>
          )}
        </div>
      </div>

      {/* 🖥️ メインコンテンツ：3カラムレイアウト（※プレビュー非表示時は2カラムに変化！） */}
      <div className={`flex-1 w-full grid ${isPreviewHidden ? 'grid-cols-2' : 'grid-cols-3'} gap-0 overflow-hidden bg-[#141414] h-full`}>
        
        {/* ① 左：[見本コード (SPEC)] */}
        <div className="flex flex-col h-full overflow-hidden border-r border-[#3c3c3c] bg-[#0a0a0a]">
          <div className="bg-[#252526] text-cyan-400 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#3c3c3c] font-mono flex items-center justify-between">
            <span>👀 SPEC CODE ({activeFileName})</span>
            <span className="text-[9px] text-gray-500">見本通りに入力しよう</span>
          </div>
          <div className="flex-1 flex overflow-hidden w-full h-full">
            <div className="w-10 bg-[#0f0f10] text-[#5a5a5a] font-mono text-[11px] text-right pr-2 py-3 border-r border-[#2d2d2d] select-none leading-relaxed shrink-0">
              {correctLineNumbers.map(ln => <div key={`correct-ln-${ln}`}>{ln}</div>)}
            </div>
            <div 
              className="flex-1 p-3 pl-3 font-mono text-[12px] overflow-auto whitespace-pre leading-relaxed text-left select-all w-full" 
              style={{ color: '#4ade80', lineHeight: '18px' }}
            >
              {displayCode}
            </div>
          </div>
        </div>

        {/* ② 中央：[入力エディタ (YOUR EDITOR)] */}
        <div className="flex flex-col h-full overflow-hidden border-r border-[#3c3c3c] bg-[#1e1e1e]">
          <div className="bg-[#252526] text-amber-500 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#3c3c3c] font-mono flex items-center justify-between">
            <span>✍️ YOUR EDITOR ({activeFileName})</span>
            <span className="text-[9px] text-gray-500">Monaco Editor</span>
          </div>
          <div className="flex-1 bg-[#1e1e1e] h-full w-full relative overflow-hidden">
            <Editor
              height="100%"
              language={activePage.language as any}
              theme="vs-dark"
              value={userCodes[activeFileName] || ''}
              onChange={(val) => handleCodeChange(activeFileName, val || '')}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 12,
                minimap: { enabled: false },
                wordWrap: 'on',
                tabSize: 2,
                autoClosingBrackets: 'always',
              }}
            />
          </div>
        </div>

        {/* ③ 右：[ライブプレビュー]（※ isPreviewHidden が true の時は消える！） */}
        {!isPreviewHidden && (
          <div className="flex flex-col h-full overflow-hidden bg-[#141414]">
            <div className="bg-[#252526] text-slate-300 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#3c3c3c] flex justify-between items-center font-mono">
              <span>🌐 LIVE PREVIEW</span>
              <div className="flex gap-1">
                {stage.pages.map((p: TracePage) => (
                  <button 
                    key={`browser-btn-${p.fileName}`}
                    onClick={() => setBrowserPath(p.fileName)} 
                    className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold border transition cursor-pointer ${
                      browserPath === p.fileName 
                        ? 'bg-sky-600 text-white border-sky-400 shadow' 
                        : 'bg-[#2d2d2d] text-slate-400 border-transparent hover:bg-[#333]'
                    }`}
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
        )}

      </div>

    </div>
  );
}