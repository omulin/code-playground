import { useState } from 'react';

interface WorkLabProps {
  onProjectAdded: (projectName: string, htmlContent: string) => void;
}

type ModeType = 'html-site' | 'wordpress-blog';

export default function WorkLab({ onProjectAdded }: WorkLabProps) {
  const [mode, setMode] = useState<ModeType>('html-site');
  const [activeTab, setActiveTab] = useState<'code' | 'css'>('code');
  const [projectName, setProjectName] = useState('マイ・オリジナルWebサイト');
  const [workStatus, setWorkStatus] = useState<'idle' | 'coding' | 'done'>('idle');

  // 👑 何もない、完全に自由な真っ白からスタートできるエディタ初期値
  const [htmlCode, setHtmlCode] = useState(`\n<div class="my-custom-site">\n  <h1>✨ My Creative Sandbox</h1>\n  <p>ここに好きな要素、好きな文字、好きな画像を自由に配置して世界に一つのサイトを作れます。</p>\n</div>`);
  const [cssCode, setCssCode] = useState(`/* 🎨 自由なスタイリングCSS空間 */\n.my-custom-site {\n  background: linear-gradient(135deg, #1e1e38, #0f0f1a);\n  padding: 40px;\n  border-radius: 12px;\n  text-align: center;\n  color: #ffffff;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.5);\n}\nh1 {\n  color: #06b6d4;\n}`);

  const renderPreview = () => {
    if (mode === 'html-site') return htmlCode;
    let rendered = htmlCode;
    rendered = rendered.replace(/<\?php bloginfo\('name'\);\s*\?>/g, "🚀 あなたのカスタム自由ブログ");
    rendered = rendered.replace(/<\?php bloginfo\('description'\);\s*\?>/g, "ゼロからのクリエイティブWordPressテーマ空間");
    rendered = rendered.replace(/<\?php the_title\(\);\s*\?>/g, "💡 自由な発想で生み出したオリジナル記事タイトル");
    rendered = rendered.replace(/<\?php the_content\(\);\s*\?>/g, "ここにWordPressの本文がデータベースから動的に呼び出されます。");
    return rendered;
  };

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // 👑 改善：テキストエリアの改行と美しく1:1連動する行番号生成（余分な空白ズレを防ぎます）
  const getLineNumbers = (text: string) => {
    const lines = text.split('\n').length;
    return Array.from({ length: Math.max(lines, 18) }, (_, i) => i + 1);
  };

  const handleDeliver = () => {
    setWorkStatus('coding');
    setTimeout(() => {
      setWorkStatus('done');
      if (typeof onProjectAdded === 'function') {
        onProjectAdded(`${projectName} (.html)`, `<style>${cssCode}</style>${renderPreview()}`);
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* 🚀 クリエイト空間の設定バー */}
      <div className="bg-[#252526] border border-[#3c3c3c] p-4 rounded-lg flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-emerald-400">📦 制作モード:</span>
          <div className="bg-[#1e1e1e] p-1 rounded border border-[#3c3c3c] flex">
            <button onClick={() => setMode('html-site')} className={`px-3 py-1 text-xs font-bold rounded transition ${mode === 'html-site' ? 'bg-[#0e639c] text-white' : 'text-slate-400'}`}>標準ホームページ制作</button>
            <button onClick={() => setMode('wordpress-blog')} className={`px-3 py-1 text-xs font-bold rounded transition ${mode === 'wordpress-blog' ? 'bg-[#0073aa] text-white' : 'text-slate-400'}`}>WordPress自作テーマ開発</button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">作品名:</span>
          <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="bg-[#1e1e1e] border border-[#3c3c3c] text-white px-3 py-1 text-xs rounded outline-none font-sans focus:border-cyan-500" />
        </div>
      </div>

      {/* 📸 パソコンの画像取り込み */}
      <div className="bg-[#252526] border border-[#3c3c3c] p-3 rounded-lg flex flex-col md:flex-row gap-3 items-center">
        <input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setUploadedImageUrl(reader.result as string);
            reader.readAsDataURL(file);
          }
        }} className="text-xs text-slate-400 file:py-1 file:px-2 file:rounded file:border-0 file:bg-[#3c3c3c] file:text-[#cccccc] cursor-pointer" />
        <input type="text" readOnly value={uploadedImageUrl || '← パソコンの画像を選ぶとここにHTML用のURLが生成されます'} className="flex-1 w-full bg-[#1e1e1e] border border-[#3c3c3c] text-slate-500 px-3 py-1 rounded text-xs font-mono truncate" />
        {uploadedImageUrl && (
          <button onClick={() => { navigator.clipboard.writeText(uploadedImageUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="px-3 py-1 text-xs bg-cyan-600 font-bold text-white rounded">
            {copied ? '✓ コピー完了' : '📄 コピー'}
          </button>
        )}
      </div>

      {/* 💻 メインワークスペース */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* エディタ */}
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg flex flex-col overflow-hidden shadow-2xl">
          <div className="bg-[#2d2d2d] flex border-b border-[#252526] text-xs">
            <button onClick={() => setActiveTab('code')} className={`px-4 py-2 border-r border-[#252526] transition ${activeTab === 'code' ? 'bg-[#1e1e1e] text-amber-400 font-bold border-t border-t-amber-500' : 'bg-[#2d2d2d] text-[#858585]'}`}>
              <span>{mode === 'html-site' ? '🧡 index.html' : '🐘 index.php'}</span>
            </button>
            <button onClick={() => setActiveTab('css')} className={`px-4 py-2 border-r border-[#252526] transition ${activeTab === 'css' ? 'bg-[#1e1e1e] text-cyan-400 font-bold border-t border-t-cyan-500' : 'bg-[#2d2d2d] text-[#858585]'}`}>
              <span>💙 style.css</span>
            </button>
          </div>

          <div className="flex-1 flex font-mono text-xs bg-[#1e1e1e] p-2 min-h-[400px]">
            {/* 行番号 */}
            <div className="w-8 text-right pr-2 text-[#5a5a5a] border-r border-[#2d2d2d] space-y-0.5 leading-relaxed pt-0.5 text-[11px] select-none">
              {getLineNumbers(activeTab === 'code' ? htmlCode : cssCode).map((num) => <div key={num}>{num}</div>)}
            </div>

            {activeTab === 'code' ? (
              <textarea value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} className="flex-1 bg-transparent text-[#9cdcfe] pl-3 py-0.5 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left overflow-x-auto" style={{ caretColor: '#fff' }} />
            ) : (
              <textarea value={cssCode} onChange={(e) => setCssCode(e.target.value)} className="flex-1 bg-transparent text-[#ce9178] pl-3 py-0.5 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left overflow-x-auto" style={{ caretColor: '#fff' }} />
            )}
          </div>
        </div>

        {/* プレビュー ＆ 保存 */}
        <div className="flex flex-col bg-[#252526] border border-[#3c3c3c] p-6 rounded-lg shadow-2xl justify-between">
          <div className="flex-1 flex flex-col">
            <h3 className="font-bold text-[#cccccc] text-xs uppercase tracking-wider mb-3">💻 LIVE PREVIEW Sandbox</h3>
            <style>{cssCode}</style>
            <div className="flex-1 bg-[#1a1a1a] rounded-lg p-4 min-h-[350px] flex items-center justify-center border border-[#3c3c3c] overflow-y-auto">
              <div className="w-full text-left" dangerouslySetInnerHTML={{ __html: renderPreview() }} />
            </div>
          </div>

          <div className="mt-4">
            {workStatus !== 'done' ? (
              <button onClick={handleDeliver} disabled={workStatus === 'coding'} className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white font-bold text-xs py-3 rounded uppercase tracking-wider transition">
                {workStatus === 'coding' ? '⏳ 作品をコンパイルパッケージング中...' : '✔ この作品を完成させて Project Lab へ登録保存する'}
              </button>
            ) : (
              <div className="p-4 bg-[#2d2d2d] border border-emerald-600 rounded text-center">
                <p className="text-emerald-400 font-bold text-xs">🚀 SUCCESS: オリジナル作品がポートフォリオに追加されました！</p>
                <button onClick={() => setWorkStatus('idle')} className="text-[10px] text-cyan-400 hover:underline mt-2 block mx-auto">続けてさらに作り込む</button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}