import { useState, useEffect, useRef } from 'react';

type DevMode = 'web' | 'wordpress';

interface VirtualFile {
  name: string;
  code: string;
  isCustom?: boolean;
}

interface WorkLabProps {
  onProjectAdded: (projectName: string, htmlContent: string) => void;
}

export default function WorkLab({ onProjectAdded }: WorkLabProps) {
  const [devMode, setDevMode] = useState<DevMode>('web');

  const [webFiles, setWebFiles] = useState<VirtualFile[]>([
    { name: 'index.html', code: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #141414; color: #06b6d4; text-align: center; font-family: sans-serif; padding-top: 50px; }\n  </style>\n</head>\n<body>\n  <h1>🌐 WEB FREE SANDBOX</h1>\n  <p>ここに自由にHTML/CSS/JSを書いて構築できますわ！</p>\n</body>\n</html>` },
    { name: 'style.css', code: `/* 自由なCSSスタイルシート */\nh1 { font-size: 3rem; text-shadow: 0 0 10px rgba(6,182,212,0.5); }` },
    { name: 'script.js', code: `// 自由なJavaScriptロジック\nconsole.log("Web Sandbox Ready.");` }
  ]);

  const [wpFiles, setWpFiles] = useState<VirtualFile[]>([
    { name: 'index.php', code: `<?php wp_head(); ?>\n\n<div style="padding: 40px; text-align: center; font-family: sans-serif; color: #38bdf8; background: #222; border-radius: 12px; margin: 20px; border: 2px solid #38bdf8;">\n  <h1>🔮 MY CUSTOM THEME BUILD</h1>\n  <p>PHPの動的パーツを組み込んで、最強のテーマを創りましょう。</p>\n</div>\n<?php wp_footer(); ?>` },
    { name: 'functions.php', code: `<?php\n// テーマ固有の機能を定義\n` },
    { name: 'sidebar.php', code: `\n<aside>\n  <h3>メニュー</h3>\n</aside>` }
  ]);

  const [activeWebIdx, setActiveWebIdx] = useState<number>(0);
  const [activeWpIdx, setActiveWpIdx] = useState<number>(0);

  const [newFileName, setNewFileName] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("My_Creation");
  const [terminalLog, setTerminalLog] = useState<string>("⏳ システム起動中...");
  const [saveStatus, setSaveStatus] = useState<string>("");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wpFilesRef = useRef<VirtualFile[]>(wpFiles);

  const currentFiles = devMode === 'web' ? webFiles : wpFiles;
  const currentIdx = devMode === 'web' ? activeWebIdx : activeWpIdx;
  const currentFile = currentFiles[currentIdx] || currentFiles;

  useEffect(() => {
    wpFilesRef.current = wpFiles;
  }, [wpFiles]);

  // 👑 盗聴器：Playgroundが発する全ての通信を丸裸にする！
  useEffect(() => {
    const handlePlaygroundMessages = (event: MessageEvent) => {
      // コンソールに受信したすべての生データを暴露
      console.log("🕵️‍♂️ [盗聴データ]:", event.data);

      let data = event.data;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch (e) {}
      }

      // もし何らかの準備完了らしきシグナルがあればキャッチ
      if (data && (data.type === 'playground_ready' || data.action === 'loaded' || data.type === 'ready' || data.type === 'wp_loaded')) {
        setTerminalLog("🌟 仮想WordPressの起動完了シグナルを受信！自動インジェクトを開始します...");
        executeThemeInject();
      }
    };

    window.addEventListener('message', handlePlaygroundMessages);
    return () => window.removeEventListener('message', handlePlaygroundMessages);
  }, []);

  useEffect(() => {
    if (!iframeRef.current) return;

    if (devMode === 'web') {
      setTerminalLog("🌐 READY: HTML/CSS/JS リアルタイムビューアーが接続されました。");
      renderWebPreview(webFiles);
    } else {
      setTerminalLog("⚙️ WordPress Playgroundを初期化中...（自動マウントを待機しています）");
      iframeRef.current.src = "https://playground.wordpress.net/?embed=1&storage=none";
    }
  }, [devMode]);

  const executeThemeInject = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    console.log("🚀 [インジェクト実行]: Blueprintデータを送信します", wpFilesRef.current);

    const blueprint = {
      type: 'runBlueprint',
      blueprint: {
        landingPage: '/',
        preferredVersion: { php: '8.1', wp: '6.4' },
        steps: [
          { step: 'mkdir', path: '/var/www/html/wp-content/themes/playground-theme' },
          { 
            step: 'writeFile', 
            path: '/var/www/html/wp-content/themes/playground-theme/style.css', 
            data: '/*\nTheme Name: Custom Sandbox Theme\nAuthor: Boss\nVersion: 1.0\n*/' 
          },
          ...wpFilesRef.current.map(f => ({
            step: 'writeFile',
            path: `/var/www/html/wp-content/themes/playground-theme/${f.name}`,
            data: f.code
          })),
          { step: 'login', username: 'admin', password: 'password' },
          { step: 'activateTheme', themeId: 'playground-theme' }
        ]
      }
    };

    iframeRef.current.contentWindow.postMessage(blueprint, '*');
    setTerminalLog("✨ SUCCESS: 自作テーマが仮想空間へ完全にマウントされましたわ！");
  };

  const handleCompileWordPress = () => {
    setTerminalLog("⚡ 手動リクエストを送信。最新のコードを再インジェクトします...");
    executeThemeInject();
  };

  const renderWebPreview = (filesList: VirtualFile[]) => {
    const html = filesList.find(f => f.name === 'index.html')?.code || "";
    const css = filesList.find(f => f.name === 'style.css')?.code || "";
    const js = filesList.find(f => f.name === 'script.js')?.code || "";

    const combinedBlob = `${html}<style>${css}</style><script>${js}</script>`;
    if (iframeRef.current && devMode === 'web') {
      iframeRef.current.src = "data:text/html;charset=utf-8," + encodeURIComponent(combinedBlob);
    }
  };

  const handleCodeChange = (newCode: string) => {
    if (devMode === 'web') {
      const updated = webFiles.map((f, i) => i === activeWebIdx ? { ...f, code: newCode } : f);
      setWebFiles(updated);
      renderWebPreview(updated);
    } else {
      const updated = wpFiles.map((f, i) => i === activeWpIdx ? { ...f, code: newCode } : f);
      setWpFiles(updated);
    }
  };

  const handleCreateFile = () => {
    const trimmed = newFileName.trim();
    if (!trimmed) return;
    if (currentFiles.some(f => f.name === trimmed)) return;

    const newFile: VirtualFile = {
      name: trimmed,
      code: trimmed.endsWith('.php') ? "<?php\n// 新しいPHPテンプレート\n" : "/* 新しいアセット */\n",
      isCustom: true
    };

    if (devMode === 'web') {
      const updated = [...webFiles, newFile];
      setWebFiles(updated);
      setActiveWebIdx(updated.length - 1);
      renderWebPreview(updated);
    } else {
      const updated = [...wpFiles, newFile];
      setWpFiles(updated);
      setActiveWpIdx(updated.length - 1);
    }
    setNewFileName("");
  };

  const handleExportProject = () => {
    if (!projectName.trim()) return;
    let totalDump = `\n\n`;
    currentFiles.forEach(f => { totalDump += `/* === [${f.name}] === */\n${f.code}\n\n`; });
    onProjectAdded(`${projectName}.${devMode === 'web' ? 'html' : 'wordpress.php'}`, totalDump);
    setSaveStatus("✨ PROJECT LAB に実績が保存されました！");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#141414] overflow-hidden text-left relative">
      <div className="bg-[#1e1e1e] border-b border-[#3c3c3c] px-4 py-2 flex justify-between items-center shrink-0 w-full z-10">
        <div className="flex bg-[#0a0a0a] p-1 border border-[#2d2d2d] rounded-xl">
          <button onClick={() => setDevMode('web')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${devMode === 'web' ? 'bg-indigo-600 text-white font-black shadow-md' : 'text-slate-500 hover:text-slate-300'}`}>🌐 WEB (HTML/CSS/JS)</button>
          <button onClick={() => setDevMode('wordpress')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${devMode === 'wordpress' ? 'bg-cyan-600 text-white font-black shadow-md' : 'text-slate-500 hover:text-slate-300'}`}>🐘 WORDPRESS (WASM)</button>
        </div>

        {devMode === 'wordpress' && (
          <button
            onClick={handleCompileWordPress}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-black px-5 py-1.5 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer animate-pulse"
          >
            ▶ プレビューに反映（テーマ有効化）
          </button>
        )}

        <div className="flex items-center gap-2 border-x border-[#2d2d2d] px-4 mx-4">
          <input type="text" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} placeholder={devMode === 'web' ? "ex) page2.html" : "ex) custom.php"} className="bg-[#141414] border border-[#3c3c3c] text-white text-[11px] px-3 py-1 rounded font-mono outline-none focus:border-cyan-500 w-42" />
          <button onClick={handleCreateFile} className="bg-[#2d2d2d] hover:bg-[#37373d] text-slate-200 border border-[#3c3c3c] text-[11px] font-bold px-2.5 py-1 rounded transition cursor-pointer">➕ 追加</button>
        </div>

        <div className="flex items-center gap-2">
          <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="bg-[#141414] border border-[#3c3c3c] text-white text-xs px-2 py-1 rounded font-mono outline-none w-24 text-center" />
          <button onClick={handleExportProject} className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-3 py-1 rounded text-[11px] transition cursor-pointer">🚀 実績登録</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden w-full border-b border-[#2d2d2d]">
        <div className="w-1/2 flex flex-col border-r border-[#2d2d2d] h-full bg-[#141414]">
          <div className="bg-[#1e1e1e] border-b border-[#2d2d2d] flex text-xs shrink-0 overflow-x-auto scrollbar-hide items-center justify-between pr-3">
            <div className="flex">
              {currentFiles.map((file, i) => (
                <button key={file.name} onClick={() => devMode === 'web' ? setActiveWebIdx(i) : setActiveWpIdx(i)} className={`px-4 py-2 border-r border-[#2b2b2b] font-mono transition-all text-[11px] flex items-center gap-1.5 shrink-0 ${currentIdx === i ? 'bg-[#141414] text-amber-400 border-t-2 border-amber-500 font-bold' : 'bg-[#2d2d2d]/40 text-slate-500 hover:bg-[#2d2d2d]'}`}>
                  <span>{file.name.endsWith('.php') ? '🐘' : file.name.endsWith('.html') ? '🌐' : '📄'}</span>
                  <span>{file.name}</span>
                  {file.isCustom && <span className="text-[7px] bg-[#2d2d2d] text-slate-400 px-1 rounded">NEW</span>}
                </button>
              ))}
            </div>
            {saveStatus && <span className="text-[10px] text-emerald-400 font-mono font-bold animate-pulse shrink-0">{saveStatus}</span>}
          </div>
          <textarea value={currentFile?.code || ""} onChange={(e) => handleCodeChange(e.target.value)} className="flex-1 bg-[#141414] text-[#dcdcaa] font-mono text-[13.5px] outline-none resize-none p-5 leading-relaxed h-full w-full select-text" style={{ lineHeight: '21px' }} spellCheck={false} />
        </div>

        <div className="w-1/2 flex flex-col h-full bg-[#1a1a1a]">
          <div className="bg-[#1e1e1e] text-cyan-400 font-bold text-[10px] px-3 py-2 border-b border-[#2d2d2d] font-mono flex justify-between items-center">
            <span>🖥️ LIVE PREVIEW ({devMode === 'web' ? 'HYPER TEXT VIEW' : 'WP WASM SANDBOX'})</span>
            <span className={`text-[8px] px-1 rounded font-black ${devMode === 'web' ? 'bg-indigo-950 text-indigo-400' : 'bg-cyan-950 text-cyan-400'}`}>{devMode === 'web' ? 'BLAZING FAST DIRECT' : 'UNIVERSAL GATE'}</span>
          </div>
          <div className="flex-1 p-2 bg-[#111] flex relative h-full">
            <iframe ref={iframeRef} className="w-full h-full bg-white rounded-lg shadow-2xl" title="WorkLab Arena" />
          </div>
        </div>
      </div>

      <footer className="h-[40px] bg-[#0a0a0a] flex shrink-0 w-full p-2 border-t border-[#222]">
        <div className="flex-1 overflow-y-auto font-mono text-[11px] text-left">
          <div className={`leading-relaxed whitespace-pre-wrap ${devMode === 'web' ? 'text-indigo-400' : 'text-emerald-400 font-bold'}`}>{terminalLog}</div>
        </div>
      </footer>
    </div>
  );
}