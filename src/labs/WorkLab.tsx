import { useState, useEffect, useRef } from 'react';

interface VirtualFile {
  name: string;
  code: string;
  isCustom?: boolean;
}

interface WorkLabProps {
  onProjectAdded: (projectName: string, htmlContent: string) => void;
}

export default function WorkLab({ onProjectAdded }: WorkLabProps) {
  // WordPressモードを廃止し、純粋なWebファイルのみを管理
  const [webFiles, setWebFiles] = useState<VirtualFile[]>([
    { name: 'index.html', code: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { background: #141414; color: #06b6d4; text-align: center; font-family: sans-serif; padding-top: 50px; }\n  </style>\n</head>\n<body>\n  <h1>🌐 WEB FREE SANDBOX</h1>\n  <p>ここに自由にHTML/CSS/JSを書いて構築できますわ！</p>\n</body>\n</html>` },
    { name: 'style.css', code: `/* 自由なCSSスタイルシート */\nh1 { font-size: 3rem; text-shadow: 0 0 10px rgba(6,182,212,0.5); }` },
    { name: 'script.js', code: `// 自由なJavaScriptロジック\nconsole.log("Web Sandbox Ready.");` }
  ]);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [newFileName, setNewFileName] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("My_Creation");
  const [saveStatus, setSaveStatus] = useState<string>("");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentFile = webFiles[activeIdx];

  // 初回マウント時にプレビューを描画
  useEffect(() => {
    renderWebPreview(webFiles);
  }, []);

  // 👑 HTML/CSS/JS をガッチャンコして iframe にリアルタイム描画する関数
  const renderWebPreview = (filesList: VirtualFile[]) => {
    if (!iframeRef.current) return;
    
    const html = filesList.find(f => f.name.endsWith('.html'))?.code || "";
    const css = filesList.find(f => f.name.endsWith('.css'))?.code || "";
    const js = filesList.find(f => f.name.endsWith('.js'))?.code || "";

    const combinedBlob = `${html}<style>${css}</style><script>${js}</script>`;
    iframeRef.current.src = "data:text/html;charset=utf-8," + encodeURIComponent(combinedBlob);
  };

  const handleCodeChange = (newCode: string) => {
    const updated = webFiles.map((f, i) => i === activeIdx ? { ...f, code: newCode } : f);
    setWebFiles(updated);
    renderWebPreview(updated); // 入力するたびに爆速でプレビュー反映
  };

  const handleCreateFile = () => {
    const trimmed = newFileName.trim();
    if (!trimmed) return;
    if (webFiles.some(f => f.name === trimmed)) return;

    // 拡張子に合わせて初期コードを変える親切設計
    let initialCode = "\n";
    if (trimmed.endsWith('.css')) initialCode = "/* 新しいスタイル */\n";
    if (trimmed.endsWith('.js')) initialCode = "// 新しいスクリプト\n";

    const newFile: VirtualFile = {
      name: trimmed,
      code: initialCode,
      isCustom: true
    };

    const updated = [...webFiles, newFile];
    setWebFiles(updated);
    setActiveIdx(updated.length - 1);
    renderWebPreview(updated);
    setNewFileName("");
  };

  const handleExportProject = () => {
    if (!projectName.trim()) return;
    let totalDump = `\n\n`;
    webFiles.forEach(f => { totalDump += `/* === [${f.name}] === */\n${f.code}\n\n`; });
    onProjectAdded(`${projectName}.html`, totalDump);
    setSaveStatus("✨ PROJECT LAB に実績が保存されました！");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#141414] overflow-hidden text-left relative">
      {/* 👑 ヘッダーツールバー */}
      <div className="bg-[#1e1e1e] border-b border-[#3c3c3c] px-6 py-2 flex justify-between items-center shrink-0 w-full z-10">
        <div className="flex items-center gap-4">
          <span className="font-black text-indigo-400 text-lg tracking-wider">🌐 WEB FREE SANDBOX</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border-l border-[#2d2d2d] pl-6">
            <input 
              type="text" 
              value={newFileName} 
              onChange={(e) => setNewFileName(e.target.value)} 
              placeholder="ex) style2.css" 
              className="bg-[#141414] border border-[#3c3c3c] text-white text-[11px] px-3 py-1.5 rounded font-mono outline-none focus:border-indigo-500 w-42" 
            />
            <button 
              onClick={handleCreateFile} 
              className="bg-[#2d2d2d] hover:bg-[#37373d] text-slate-200 border border-[#3c3c3c] text-[11px] font-bold px-3 py-1.5 rounded transition cursor-pointer"
            >
              ➕ ファイル追加
            </button>
          </div>

          <div className="flex items-center gap-2 border-l border-[#2d2d2d] pl-6">
            <input 
              type="text" 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)} 
              className="bg-[#141414] border border-[#3c3c3c] text-white text-xs px-2 py-1.5 rounded font-mono outline-none w-28 text-center" 
            />
            <button 
              onClick={handleExportProject} 
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-1.5 rounded text-[11px] transition cursor-pointer shadow-lg"
            >
              🚀 実績として登録
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden w-full border-b border-[#2d2d2d]">
        {/* 👑 左側：エディタ領域 */}
        <div className="w-1/2 flex flex-col border-r border-[#2d2d2d] h-full bg-[#141414]">
          <div className="bg-[#1e1e1e] border-b border-[#2d2d2d] flex text-xs shrink-0 overflow-x-auto scrollbar-hide items-center justify-between pr-3">
            <div className="flex">
              {webFiles.map((file, i) => (
                <button 
                  key={file.name} 
                  onClick={() => setActiveIdx(i)} 
                  className={`px-5 py-2.5 border-r border-[#2b2b2b] font-mono transition-all text-[11px] flex items-center gap-2 shrink-0 cursor-pointer ${activeIdx === i ? 'bg-[#141414] text-indigo-400 border-t-2 border-indigo-500 font-bold' : 'bg-[#2d2d2d]/40 text-slate-500 hover:bg-[#2d2d2d]'}`}
                >
                  <span>{file.name.endsWith('.js') ? '💛' : file.name.endsWith('.css') ? '📘' : '🌐'}</span>
                  <span>{file.name}</span>
                  {file.isCustom && <span className="text-[7px] bg-[#2d2d2d] text-slate-400 px-1 rounded">NEW</span>}
                </button>
              ))}
            </div>
            {saveStatus && <span className="text-[10px] text-emerald-400 font-mono font-bold animate-pulse shrink-0">{saveStatus}</span>}
          </div>
          
          <textarea 
            value={currentFile?.code || ""} 
            onChange={(e) => handleCodeChange(e.target.value)} 
            className="flex-1 bg-[#141414] text-[#9cdcfe] font-mono text-[13.5px] outline-none resize-none p-5 leading-relaxed h-full w-full select-text" 
            style={{ lineHeight: '21px' }} 
            spellCheck={false} 
          />
        </div>

        {/* 👑 右側：ライブプレビュー領域 */}
        <div className="w-1/2 flex flex-col h-full bg-[#1a1a1a]">
          <div className="bg-[#1e1e1e] text-indigo-400 font-bold text-[10px] px-4 py-2.5 border-b border-[#2d2d2d] font-mono flex justify-between items-center tracking-widest">
            <span>🖥️ LIVE PREVIEW</span>
            <span className="text-[8px] px-2 py-0.5 rounded font-black bg-indigo-950 text-indigo-400 border border-indigo-800">BLAZING FAST</span>
          </div>
          <div className="flex-1 p-2 bg-[#111] flex relative h-full">
            <iframe 
              ref={iframeRef} 
              className="w-full h-full bg-white rounded-lg shadow-2xl border-0" 
              title="Web Sandbox" 
            />
          </div>
        </div>
      </div>

      {/* 👑 フッター */}
      <footer className="h-[40px] bg-[#0a0a0a] flex items-center shrink-0 w-full px-4 border-t border-[#222]">
        <div className="font-mono text-[11px] text-indigo-400 font-bold">
          <span className="animate-pulse mr-2">●</span> READY: HTML/CSS/JS リアルタイムコンパイラが稼働中です。
        </div>
      </footer>
    </div>
  );
}