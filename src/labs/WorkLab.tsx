import { useState, useEffect, useRef } from 'react';

interface WorkLabProps {
  onProjectAdded: (projectName: string, htmlContent: string) => void;
}

type ModeType = 'html-site' | 'wordpress-blog';

interface FileData {
  name: string;
  language: 'html' | 'css' | 'javascript' | 'php';
  content: string;
}

export default function WorkLab({ onProjectAdded }: WorkLabProps) {
  const [mode, setMode] = useState<ModeType>('html-site');
  const [projectName, setProjectName] = useState('マイ・オリジナルWebサイト');
  const [workStatus, setWorkStatus] = useState<'idle' | 'coding' | 'done'>('idle');

  const [files, setFiles] = useState<FileData[]>([
    {
      name: 'index.html',
      language: 'html',
      content: `\n<div class="my-custom-site">\n  <h1>✨ My Creative Sandbox</h1>\n  <p>複数ページ、CSS、さらにはJavaScriptも自由に作れる最強の空間です。</p>\n  <button onclick="hello()">JSを実行してみる！</button>\n  <br><br>\n  <a href="about.html" style="color: cyan; font-weight: bold;">➔ Aboutページへ移動する</a>\n</div>`
    },
    {
      name: 'about.html',
      language: 'html',
      content: `\n<div class="my-custom-site">\n  <h1>👋 About Me</h1>\n  <p>ここは追加された別ページです！ファイルの枠を越えて自由にリンクで繋げます。</p>\n  <a href="index.html" style="color: cyan; font-weight: bold;">⬅ トップに戻る</a>\n</div>`
    },
    {
      name: 'style.css',
      language: 'css',
      content: `/* 🎨 自由なスタイリングCSS空間 */\n.my-custom-site {\n  background: linear-gradient(135deg, #1e1e38, #0f0f1a);\n  padding: 40px;\n  border-radius: 12px;\n  text-align: center;\n  color: #ffffff;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.5);\n}\nh1 {\n  color: #06b6d4;\n  margin-bottom: 20px;\n}\nbutton {\n  padding: 10px 20px;\n  background: #06b6d4;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  margin-top: 20px;\n  font-weight: bold;\n}`
    },
    {
      name: 'script.js',
      language: 'javascript',
      content: `// ⚡ JavaScriptで自由な動きをつけよう！\nfunction hello() {\n  alert('WorkLabへようこそ！\\nJavaScriptも完璧に動作するようになりました！');\n}`
    }
  ]);

  const [activeFileName, setActiveFileName] = useState<string>('index.html');
  const [browserPath, setBrowserPath] = useState<string>('index.html');
  const [newFileName, setNewFileName] = useState('');
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'NAVIGATE') {
        const targetPath = event.data.path;
        if (files.some(f => f.name === targetPath)) {
          setBrowserPath(targetPath);
        } else {
          alert(`エラー: ファイル '${targetPath}' はまだ作成されていません！\n「＋ ファイル追加」から作成してください。`);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [files]);

  const getLineNumbers = (text: string) => {
    const lines = text.split('\n').length;
    return Array.from({ length: Math.max(lines, 18) }, (_, i) => i + 1);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setFiles(prev => prev.map(f => f.name === activeFileName ? { ...f, content: val } : f));
  };

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleAddFile = () => {
    if (!newFileName.trim()) return;
    const name = newFileName.trim();
    if (files.some(f => f.name === name)) {
      alert('そのファイル名は既に存在します！');
      return;
    }
    let language: 'html' | 'css' | 'javascript' | 'php' = 'html';
    if (name.endsWith('.css')) language = 'css';
    else if (name.endsWith('.js')) language = 'javascript';
    else if (name.endsWith('.php')) language = 'php';

    setFiles([...files, { name, language, content: '' }]);
    setActiveFileName(name);
    setNewFileName('');
    setIsAddingFile(false);
  };

  const renderVirtualBrowser = () => {
    const targetFile = files.find(f => f.name === browserPath);
    if (!targetFile) {
      return (
        <div className="w-full h-full bg-white text-rose-500 flex flex-col justify-center items-center font-bold">
          <span>❌ 404 Not Found</span>
          <span className="text-xs text-slate-400 mt-2 font-normal">ファイルが見つかりません</span>
        </div>
      );
    }

    let htmlRaw = targetFile.content;
    
    if (mode === 'wordpress-blog') {
      htmlRaw = htmlRaw.replace(/<\?php bloginfo\('name'\);\s*\?>/g, "🚀 あなたのカスタム自由ブログ");
      htmlRaw = htmlRaw.replace(/<\?php bloginfo\('description'\);\s*\?>/g, "ゼロからのクリエイティブWordPressテーマ空間");
      htmlRaw = htmlRaw.replace(/<\?php the_title\(\);\s*\?>/g, "💡 自由な発想で生み出したオリジナル記事タイトル");
      htmlRaw = htmlRaw.replace(/<\?php the_content\(\);\s*\?>/g, "ここにWordPressの本文がデータベースから動的に呼び出されます。");
    }

    const cssFiles = files.filter(f => f.language === 'css').map(f => f.content).join('\n');
    const jsFiles = files.filter(f => f.language === 'javascript').map(f => f.content).join('\n');

    const finalBlob = `
      <html>
        <head>
          <style>${cssFiles}</style>
          <style>
            ::-webkit-scrollbar { width: 6px; height: 6px; }
            ::-webkit-scrollbar-track { background: #f1f5f9; }
            ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
          </style>
        </head>
        <body style="margin:0; padding:20px; background:#f8fafc; font-family: sans-serif;">
          ${htmlRaw}
          <script>
            ${jsFiles}
            
            document.addEventListener('click', function(e) {
              const anchor = e.target.closest('a');
              if (anchor) {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href && !href.startsWith('#')) {
                  window.parent.postMessage({ type: 'NAVIGATE', path: href }, '*');
                }
              }
            });
          </script>
        </body>
      </html>
    `;

    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-lg border border-[#3c3c3c]">
        <div className="bg-[#f1f5f9] text-slate-700 text-[10px] font-mono px-3 py-1.5 border-b border-slate-300 flex justify-between items-center shrink-0 select-none">
          <div className="flex gap-2 items-center">
            <span className="text-emerald-500">🔒 https://</span>
            <span className="font-bold text-slate-800">localhost:3000/{browserPath}</span>
          </div>
          <div className="flex gap-1">
            {files.filter(f => f.language === 'html' || f.language === 'php').map(f => (
               <button key={`browser-nav-${f.name}`} onClick={() => setBrowserPath(f.name)} className={`px-2 py-0.5 text-[9px] rounded font-bold transition ${browserPath === f.name ? 'bg-sky-600 text-white' : 'bg-[#e2e8f0] text-slate-500 hover:bg-slate-300'}`}>
                 {f.name}
               </button>
            ))}
          </div>
        </div>
        <iframe srcDoc={finalBlob} className="flex-1 w-full border-none" sandbox="allow-scripts allow-modals allow-popups allow-same-origin" title="Live Preview" />
      </div>
    );
  };

  const handleDeliver = () => {
    setWorkStatus('coding');
    setTimeout(() => {
      setWorkStatus('done');
      if (typeof onProjectAdded === 'function') {
        const allCss = files.filter(f => f.language === 'css').map(f => f.content).join('\n');
        const allJs = files.filter(f => f.language === 'javascript').map(f => f.content).join('\n');
        const mainHtml = files.find(f => f.name === 'index.html' || f.name === 'index.php')?.content || files.content;
        
        const finalOutput = `<style>${allCss}</style>\n${mainHtml}\n<script>${allJs}</script>`;
        onProjectAdded(`${projectName} (Multi-file)`, finalOutput);
      }
    }, 1500);
  };

  const activeFile = files.find(f => f.name === activeFileName) || files;
  const textColor = activeFile.language === 'html' || activeFile.language === 'php' ? '#9cdcfe' : activeFile.language === 'css' ? '#ce9178' : '#dcdcaa';

  return (
    <div className="space-y-4 text-left h-full flex flex-col p-2 lg:p-6" style={{ height: 'calc(100vh - 100px)' }}>
      
      <div className="bg-[#252526] border border-[#3c3c3c] p-3 rounded-lg flex flex-wrap justify-between items-center gap-4 shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded tracking-wider font-mono">📦 MULTI-FILE STUDIO</span>
          <div className="bg-[#1e1e1e] p-1 rounded border border-[#3c3c3c] flex">
            <button onClick={() => setMode('html-site')} className={`px-3 py-1 text-[11px] font-bold rounded transition ${mode === 'html-site' ? 'bg-[#0e639c] text-white' : 'text-slate-400'}`}>標準HP</button>
            <button onClick={() => setMode('wordpress-blog')} className={`px-3 py-1 text-[11px] font-bold rounded transition ${mode === 'wordpress-blog' ? 'bg-[#0073aa] text-white' : 'text-slate-400'}`}>WordPressテーマ</button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400">プロジェクト名:</span>
          <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="bg-[#1e1e1e] border border-[#3c3c3c] text-white px-3 py-1 text-xs rounded outline-none font-sans focus:border-cyan-500" />
        </div>
      </div>

      <div className="bg-[#252526] border border-[#3c3c3c] p-2 rounded-lg flex flex-col md:flex-row gap-2 items-center shrink-0 shadow-md">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-2">Image URL Generator</span>
        {/* 👑【絶対防御版】?. を一切使わず、泥臭く安全な書き方に変更しました！！！ */}
        <input type="file" accept="image/*" onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files;
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.result) {
                setUploadedImageUrl(String(reader.result));
              }
            };
            reader.readAsDataURL(file);
          }
        }} className="text-[11px] text-slate-400 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#3c3c3c] file:text-white file:font-bold cursor-pointer" />
        <input type="text" readOnly value={uploadedImageUrl || '← パソコンの画像を選ぶとここにHTML用のURLが生成されます'} className="flex-1 w-full bg-[#1e1e1e] border border-[#3c3c3c] text-slate-500 px-3 py-1.5 rounded text-[11px] font-mono truncate" />
        {uploadedImageUrl && (
          <button onClick={() => { navigator.clipboard.writeText(uploadedImageUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="px-3 py-1 text-[11px] bg-cyan-600 font-bold text-white rounded">
            {copied ? '✓ コピー完了' : '📄 コピー'}
          </button>
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4 overflow-hidden">
        
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg flex flex-col overflow-hidden shadow-2xl h-full">
          <div className="bg-[#2d2d2d] flex border-b border-[#252526] text-xs overflow-x-auto items-center shrink-0 scrollbar-hide">
            {files.map(f => (
              <button key={`tab-${f.name}`} onClick={() => setActiveFileName(f.name)} className={`px-4 py-2 border-r border-[#252526] whitespace-nowrap transition ${activeFileName === f.name ? 'bg-[#1e1e1e] text-white font-bold border-t-2 border-t-cyan-400' : 'bg-[#2d2d2d] text-slate-400 hover:bg-[#333]'}`}>
                {f.language === 'html' ? '🧡' : f.language === 'css' ? '💙' : f.language === 'javascript' ? '💛' : '🐘'} {f.name}
              </button>
            ))}
            {!isAddingFile ? (
              <button onClick={() => setIsAddingFile(true)} className="px-4 py-2 text-slate-400 hover:text-white font-bold whitespace-nowrap">＋ 新規ファイル</button>
            ) : (
              <div className="flex items-center px-2">
                <input type="text" value={newFileName} onChange={e => setNewFileName(e.target.value)} placeholder="contact.html" className="bg-[#141414] border border-[#3c3c3c] text-white px-2 py-1 text-[10px] rounded outline-none font-mono" autoFocus onKeyDown={e => e.key === 'Enter' && handleAddFile()} onBlur={() => setTimeout(() => setIsAddingFile(false), 200)} />
                <button onClick={handleAddFile} className="ml-2 text-emerald-400 font-bold">✔</button>
              </div>
            )}
          </div>

          <div className="flex-1 flex font-mono text-[12px] bg-[#141414] overflow-hidden relative">
            <div ref={lineNumbersRef} className="w-10 text-right pr-2 text-[#5a5a5a] border-r border-[#2d2d2d] leading-relaxed py-3 shrink-0 overflow-hidden select-none bg-[#1e1e1e]">
              {getLineNumbers(activeFile.content).map((num) => <div key={`line-${num}`} className="h-[18px]">{num}</div>)}
            </div>
            <textarea 
              ref={textareaRef}
              value={activeFile.content} 
              onChange={handleCodeChange} 
              onScroll={handleScroll}
              className="flex-1 bg-transparent pl-3 py-3 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left overflow-y-auto" 
              style={{ color: textColor, caretColor: '#fff', lineHeight: '18px' }} 
              spellCheck={false}
              placeholder={`${activeFile.name} のコードをここに記述してください...`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 overflow-hidden h-full">
          <div className="flex-1 flex flex-col bg-[#252526] border border-[#3c3c3c] p-3 rounded-lg shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center mb-2 shrink-0">
              <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">🌐 MULTI-PAGE LIVE PREVIEW</h3>
              <span className="text-[9px] bg-slate-700 text-white px-2 py-0.5 rounded">JS & Links Active</span>
            </div>
            {renderVirtualBrowser()}
          </div>

          <div className="shrink-0 bg-[#252526] border border-[#3c3c3c] p-3 rounded-lg shadow-2xl">
            {workStatus !== 'done' ? (
              <button onClick={handleDeliver} disabled={workStatus === 'coding'} className="w-full bg-[#007acc] hover:bg-[#005a9e] text-white font-bold text-xs py-3 rounded uppercase tracking-wider transition shadow-lg">
                {workStatus === 'coding' ? '⏳ 複数ファイルをパッケージング中...' : '✔ この作品を完成させて Project Lab へ登録保存する'}
              </button>
            ) : (
              <div className="p-3 bg-emerald-900/30 border border-emerald-600 rounded text-center">
                <p className="text-emerald-400 font-bold text-xs">🚀 SUCCESS: 全ファイルが結合されポートフォリオに追加されました！</p>
                <button onClick={() => setWorkStatus('idle')} className="text-[10px] text-cyan-400 hover:underline mt-1 block mx-auto">続けてさらに作り込む</button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}