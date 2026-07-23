import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
// クリーンに型とデータを読み込み
import type { TraceStage, TracePage } from './traceData';
import { TRACE_STAGES } from './traceData';

export default function TraceLab() {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const stage: TraceStage = TRACE_STAGES[currentStageIdx] || TRACE_STAGES[0];

  const [userCodes, setUserCodes] = useState<Record<string, string>>({});
  const [activeFileName, setActiveFileName] = useState<string>('index.html');
  const [browserPath, setBrowserPath] = useState<string>('index.html');
  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string>('');

  // 💡 ステージ変更時、またはローカルストレージからの復元
  useEffect(() => {
    if (!stage || !stage.pages || stage.pages.length === 0) return;

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

    // クリア判定の初期チェック
    checkIfPassed(initialCodes);
  }, [currentStageIdx]);

  const checkIfPassed = (codes: Record<string, string>) => {
    let allMatch = true;
    stage.pages.forEach(p => {
      const userClean = (codes[p.fileName] || "").replace(/\s/g, "");
      const correctClean = (p.correctCode || "").replace(/\s/g, "");
      if (userClean !== correctClean) {
        allMatch = false;
      }
    });
    setIsPassed(allMatch);
  };

  const handleCodeChange = (fileName: string, val: string) => {
    const updated = { ...userCodes, [fileName]: val };
    setUserCodes(updated);
    checkIfPassed(updated);
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
      checkIfPassed(initialCodes);
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
        <div 
          className="flex-1 w-full overflow-auto" 
          dangerouslySetInnerHTML={{ __html: finalBlob }} 
          onClick={(e) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            if (anchor) {
              e.preventDefault(); 
              const href = anchor.getAttribute('href');
              
              if (href && href.startsWith('#')) {
                const id = href.substring(1);
                const container = e.currentTarget as HTMLElement;
                const targetEl = container.querySelector('#' + id);
                if (targetEl) {
                  targetEl.scrollIntoView({ behavior: 'smooth' });
                }
              } else if (href && userCodes[href] !== undefined) {
                setBrowserPath(href);
              } else if (href) {
                alert(`エラー: '${href}' はまだ作成されていないか、存在しません！`);
              }
            }
          }}
        />
      </div>
    );
  };

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
    <div className="w-full flex-1 flex flex-col overflow-hidden bg-[#141414]">
      
      {/* 最上部ヘッダー */}
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-3 py-1.5 flex items-center justify-between shrink-0 w-full select-none">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded font-mono">TRACE STADIUM</span>
          <h2 className="text-xs font-bold text-slate-300">STAGE {stage.id < 10 ? `0${stage.id}` : stage.id}：{stage.title}</h2>
        </div>
        <div className="text-[11px] text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-800/40 font-mono">
          🎯 {stage.mission}
        </div>
      </div>

      {/* ステージ選択 ＆ 一時保存ボタンエリア */}
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-3 py-1.5 flex items-center justify-between text-xs shrink-0 w-full select-none">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-[#858585] uppercase font-mono">SELECT STAGE:</span>
          <select
            value={currentStageIdx}
            onChange={(e) => setCurrentStageIdx(parseInt(e.target.value, 10))}
            className="bg-[#1e1e1e] text-amber-300 text-xs font-bold px-3 py-1 rounded border border-[#444] cursor-pointer outline-none"
          >
            {TRACE_STAGES.map((s, idx) => (
              <option key={`stage-opt-${s.id}-${idx}`} value={idx}>
                STAGE {s.id}: {s.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {saveNotification && (
            <span className="text-xs text-emerald-400 font-bold animate-pulse font-mono">
              {saveNotification}
            </span>
          )}
          <button
            onClick={handleManualSave}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer shadow"
          >
            💾 一時保存
          </button>
          <button
            onClick={handleResetStorage}
            className="bg-[#333] hover:bg-[#444] text-gray-300 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer"
            title="保存をリセット"
          >
            初期化
          </button>
        </div>
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

        {/* ② 中央：[入力エディタ (Monaco Editor)] */}
        <div className="flex flex-col h-full overflow-hidden border-r border-[#2d2d2d]">
          <div className="bg-[#1e1e1e] text-amber-500 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#2d2d2d] font-mono">
            ✍️ YOUR EDITOR ({activeFileName})
          </div>
          <div className="flex-1 bg-[#141414] h-full w-full relative">
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