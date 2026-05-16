import { useState, useEffect } from 'react';

type Mode = 'top' | 'design' | 'visual' | 'code' | 'quiz' | 'work' | 'project';
type TechType = 'html-css' | 'wordpress';

export default function App() {
  const [mode, setMode] = useState<Mode>('top');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // --- 新機能：技術の切り替え ---
  const [selectedTech, setSelectedTech] = useState<TechType>('html-css');

  // --- Design Lab用の状態（State） ---
  const [bgColor, setBgColor] = useState('#3498db');
  const [borderRadius, setBorderRadius] = useState(12);
  const [paddingX, setPaddingX] = useState(24);
  const [paddingY, setPaddingY] = useState(12);
  const [shadowBlur, setShadowBlur] = useState(8);
  const [hoverScale, setHoverScale] = useState(105); // %

  // 初回起動時にlocalStorageからデータを読み込む
  useEffect(() => {
    const saved = localStorage.getItem('codeplayground_design_preset');
    if (saved) {
      const parsed = JSON.parse(saved);
      setBgColor(parsed.bgColor);
      setBorderRadius(parsed.borderRadius);
      setPaddingX(parsed.paddingX);
      setPaddingY(parsed.paddingY);
      setShadowBlur(parsed.shadowBlur);
      setHoverScale(parsed.hoverScale);
    }
  }, []);

  // 状態が変更されたらローカルストレージに自動保存
  const saveToLocal = () => {
    const data = { bgColor, borderRadius, paddingX, paddingY, shadowBlur, hoverScale };
    localStorage.setItem('codeplayground_design_preset', JSON.stringify(data));
    alert('ブラウザ/アプリ内に進捗を保存しました！');
  };

  // 生成されるCSS/WordPress追加CSS文字列
  const generatedCSS = selectedTech === 'wordpress' 
? `/* WordPressの「追加CSS」に貼り付けるコード */
.wp-block-button__link {
  background-color: ${bgColor} !important;
  border-radius: ${borderRadius}px !important;
  padding: ${paddingY}px ${paddingX}px !important;
  box-shadow: 0 4px ${shadowBlur}px rgba(0, 0, 0, 0.4) !important;
  color: #ffffff !important;
  font-weight: bold !important;
  border: none !important;
  transition: transform 0.2s ease !important;
}

.wp-block-button__link:hover {
  transform: scale(${hoverScale / 100}) !important;
}`
: `/* HTML/CSS用の標準スタイル */
.custom-button {
  background-color: ${bgColor};
  border-radius: ${borderRadius}px;
  padding: ${paddingY}px ${paddingX}px;
  box-shadow: 0 4px ${shadowBlur}px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.custom-button:hover {
  transform: scale(${hoverScale / 100});
}`;

  // HTML/CSSまたはWordPress用ファイルのダウンロード
  const downloadFiles = () => {
    if (selectedTech === 'wordpress') {
      // WordPress用のダウンロード（READMEとCSS）
      const readmeContent = `【WordPressカスタム体験 成果物】
生成されたCSSコードを、WordPress管理画面の
「外観」＞「カスタマイズ」＞「追加CSS」
に貼り付けると、ブログ内のボタンデザインがこれに変わります！`;
      
      const txtBlob = new Blob([readmeContent + "\n\n" + generatedCSS], { type: 'text/plain' });
      const txtLink = document.createElement('a');
      txtLink.href = URL.createObjectURL(txtBlob);
      txtLink.download = 'wordpress-style.txt';
      txtLink.click();
      return;
    }

    // HTML/CSSのダウンロード
    const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>CodePlayground Output</title>
    <link rel="stylesheet" href="style.css">
</head>
<body style="background: #111827; display: flex; justify-content: center; align-items: center; height: 100vh;">
    <button class="custom-button">CLICK ME</button>
</body>
</html>`;

    const cssBlob = new Blob([generatedCSS], { type: 'text/css' });
    const cssLink = document.createElement('a');
    cssLink.href = URL.createObjectURL(cssBlob);
    cssLink.download = 'style.css';
    cssLink.click();

    const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
    const htmlLink = document.createElement('a');
    htmlLink.href = URL.createObjectURL(htmlBlob);
    htmlLink.download = 'index.html';
    htmlLink.click();
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-200 font-sans`}>
      {/* グリッド背景の演出 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 -z-10" />

      {/* ヘッダー */}
      <header className="border-b border-slate-800 px-6 py-4 flex justify-between items-center bg-slate-900/50 backdrop-blur">
        <h1 className="text-xl font-bold tracking-wider text-cyan-400 cursor-pointer" onClick={() => setMode('top')}>
          &lt;CodePlayground /&gt;
        </h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg bg-slate-800 text-sm border border-slate-700 text-white">
            {isDarkMode ? '🌙 DARK' : '☀️ LIGHT'}
          </button>
          {mode !== 'top' && (
            <button onClick={() => setMode('top')} className="text-sm text-slate-400 hover:text-white transition">
              ← トップに戻る
            </button>
          )}
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {mode === 'top' && (
          <div className="text-center">
            <h2 className="text-3xl font-extrabold mb-2">ITの世界を体験しよう</h2>
            <p className="text-slate-400 mb-12 text-sm">ゲーム感覚でプログラミングや制作の仕事を学べる体験型 playground</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button onClick={() => setMode('design')} className="p-6 bg-slate-900/60 border border-slate-800 hover:border-emerald-500 rounded-xl text-left transition group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition">🎨</div>
                <h3 className="font-bold text-lg text-white">Design Lab</h3>
                <p className="text-xs text-slate-400 mt-1">ボタンデザインを通じて、CSSやWordPressの仕組みを体験します。</p>
              </button>
              {['visual', 'code', 'quiz', 'work', 'project'].map((m) => (
                <div key={m} className="p-6 bg-slate-900/20 border border-slate-900 rounded-xl text-left opacity-50 cursor-not-allowed">
                  <div className="text-2xl mb-2">🔒</div>
                  <h3 className="font-bold text-lg capitalize text-slate-500">{m} Lab</h3>
                  <p className="text-xs text-slate-500 mt-1">今後のアップデートで解放されます。</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🎨 Design Lab 画面 */}
        {mode === 'design' && (
          <div className="space-y-6">
            
            {/* 🛠️ 新機能：上部の技術切り替えタブ */}
            <div className="flex gap-4 items-center p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
              <span className="text-sm font-semibold text-slate-400">体験するシステム:</span>
              <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex">
                <button 
                  onClick={() => setSelectedTech('html-css')} 
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedTech === 'html-css' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  🟢 標準 HTML / CSS
                </button>
                <button 
                  onClick={() => setSelectedTech('wordpress')} 
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedTech === 'wordpress' ? 'bg-blue-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  🔵 WordPress風カスタム
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* 左側：コントロールパネル */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-md text-slate-400 uppercase tracking-wider">Button カスタマイズ</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${selectedTech === 'wordpress' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {selectedTech === 'wordpress' ? 'WordPress Mode' : 'HTML/CSS Mode'}
                  </span>
                </div>
                
                {/* カラーピッカー */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-400">背景色 (Background Color)</label>
                  <div className="flex items-center gap-4">
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded bg-transparent cursor-pointer border-0" />
                    <span className="font-mono text-sm bg-slate-950 px-3 py-1.5 rounded border border-slate-800 text-slate-300">{bgColor}</span>
                  </div>
                </div>

                {/* 角丸スライダー */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">角の丸み (Border Radius)</span>
                    <span className="text-cyan-400 font-mono">{borderRadius}px</span>
                  </div>
                  <input type="range" min="0" max="30" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>

                {/* 横余白スライダー */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">横の余白 (Padding X)</span>
                    <span className="text-cyan-400 font-mono">{paddingX}px</span>
                  </div>
                  <input type="range" min="10" max="50" value={paddingX} onChange={(e) => setPaddingX(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>

                {/* 縦余白スライダー */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">縦の余白 (Padding Y)</span>
                    <span className="text-cyan-400 font-mono">{paddingY}px</span>
                  </div>
                  <input type="range" min="5" max="30" value={paddingY} onChange={(e) => setPaddingY(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>

                {/* 影スライダー */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">影のぼかし (Box Shadow)</span>
                    <span className="text-cyan-400 font-mono">{shadowBlur}px</span>
                  </div>
                  <input type="range" min="0" max="20" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>

                {/* ホバースケール */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">ホバー時の拡大率 (Hover Scale)</span>
                    <span className="text-cyan-400 font-mono">{hoverScale}%</span>
                  </div>
                  <input type="range" min="100" max="120" value={hoverScale} onChange={(e) => setHoverScale(Number(e.target.value))} className="w-full accent-cyan-500" />
                </div>

                {/* ローカル保存ボタン */}
                <button onClick={saveToLocal} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-sm font-medium rounded-lg transition border border-slate-700 text-white">
                  📁 進捗をローカルに保存
                </button>
              </div>

              {/* 右側：プレビューと生成コード */}
              <div className="flex flex-col gap-6">
                {/* リアルタイムプレビュー */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-md text-slate-400 uppercase tracking-wider mb-4">
                    {selectedTech === 'wordpress' ? 'WordPress ブログ風プレビュー' : 'Webサイト プレビュー'}
                  </h3>
                  <div className="flex-1 min-h-[160px] bg-slate-950 rounded-lg border border-slate-800 flex flex-col items-center justify-center relative p-4">
                    
                    {/* WordPressモードの時は、それっぽいダミーブログ背景を少し出す */}
                    {selectedTech === 'wordpress' && (
                      <div className="absolute top-2 left-4 text-[10px] text-slate-600 font-mono w-full text-left">
                        📄 投稿記事: 「おすすめのカフェ10選」
                      </div>
                    )}

                    <button
                      style={{
                        backgroundColor: bgColor,
                        borderRadius: `${borderRadius}px`,
                        padding: `${paddingY}px ${paddingX}px`,
                        boxShadow: `0 4px ${shadowBlur}px rgba(0,0,0,0.4)`,
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = `scale(${hoverScale / 100})`)}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      className="font-bold text-white border-none cursor-pointer"
                    >
                      {selectedTech === 'wordpress' ? '詳しくはこちら (WPボタン)' : 'CLICK ME'}
                    </button>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => { navigator.clipboard.writeText(generatedCSS); alert('CSSをコピーしました！'); }} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium border border-slate-700 text-white">
                      📋 コードをコピー
                    </button>
                    <button onClick={downloadFiles} className={`flex-1 py-2 rounded-lg text-xs font-medium text-white ${selectedTech === 'wordpress' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}>
                      📥 {selectedTech === 'wordpress' ? 'WP用設定をダウンロード' : 'HTML/CSSをダウンロード'}
                    </button>
                  </div>
                </div>

                {/* 生成されたコード表示 */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-48 flex flex-col">
                  <h3 className="font-bold text-md text-slate-400 uppercase tracking-wider mb-2">
                    {selectedTech === 'wordpress' ? 'WordPress 追加CSS' : 'Generated CSS'}
                  </h3>
                  <pre className="flex-1 bg-slate-950 p-3 rounded-lg font-mono text-xs text-emerald-400 overflow-y-auto border border-slate-800 whitespace-pre-wrap text-left">
                    {generatedCSS}
                  </pre>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}