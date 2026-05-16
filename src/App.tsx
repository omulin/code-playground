import { useState, useEffect } from 'react';

type Mode = 'top' | 'design' | 'visual' | 'code' | 'quiz' | 'work' | 'project';
type TechType = 'html-css' | 'wordpress';
type MethodType = 'nocode' | 'code'; // 新機能：作り方の種類

export default function App() {
  const [mode, setMode] = useState<Mode>('top');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // --- 技術とアプローチの切り替え ---
  const [selectedTech, setSelectedTech] = useState<TechType>('html-css');
  const [selectedMethod, setSelectedMethod] = useState<MethodType>('nocode'); // 新機能：ノーコード or コード入力

  // --- Design Lab用の状態（State） ---
  const [buttonText, setButtonText] = useState('詳しくはこちら'); // 新機能：ボタンの文字
  const [bgColor, setBgColor] = useState('#3498db');
  const [borderRadius, setBorderRadius] = useState(12);
  const [paddingX, setPaddingX] = useState(24);
  const [paddingY, setPaddingY] = useState(12);
  const [shadowBlur, setShadowBlur] = useState(8);
  const [hoverScale, setHoverScale] = useState(105); // %

  // 新機能：コード入力モード用のテキストエリアの状態
  const [customCSS, setCustomCSS] = useState('');

  // スライダーの値が変わるたびに、コード入力用のCSSテキストも自動更新する
  useEffect(() => {
    const css = selectedTech === 'wordpress' 
? `.wp-block-button__link {
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
: `.custom-button {
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
    
    // ユーザーが「コード入力モード」で直接ガリガリ書いていない時だけ同期する
    if (selectedMethod === 'nocode') {
      setCustomCSS(css);
    }
  }, [bgColor, borderRadius, paddingX, paddingY, shadowBlur, hoverScale, selectedTech, selectedMethod]);

  // 初回起動時の読み込み
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
      if (parsed.buttonText) setButtonText(parsed.buttonText);
    }
  }, []);

  const saveToLocal = () => {
    const data = { bgColor, borderRadius, paddingX, paddingY, shadowBlur, hoverScale, buttonText };
    localStorage.setItem('codeplayground_design_preset', JSON.stringify(data));
    alert('ブラウザ/アプリ内に進捗を保存しました！');
  };

  const downloadFiles = () => {
    // 現在使っているCSS（ノーコードなら自動生成、コード入力ならユーザーが書いたもの）
    const finalCSS = customCSS;

    if (selectedTech === 'wordpress') {
      const readmeContent = `【WordPressカスタム体験 成果物】\n\nこのテキスト内のCSSコードをコピーして使用してください。`;
      const txtBlob = new Blob([readmeContent + "\n\n" + finalCSS], { type: 'text/plain' });
      const txtLink = document.createElement('a');
      txtLink.href = URL.createObjectURL(txtBlob);
      txtLink.download = 'wordpress-style.txt';
      txtLink.click();
      return;
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>CodePlayground Output</title>
    <link rel="stylesheet" href="style.css">
</head>
<body style="background: #111827; display: flex; justify-content: center; align-items: center; height: 100vh;">
    <button class="custom-button">${buttonText}</button>
</body>
</html>`;

    const cssBlob = new Blob([finalCSS], { type: 'text/css' });
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

      {/* メイン */}
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
            
            {/* 上部コントロールバー：道具と方法の切り替え */}
            <div className="flex flex-wrap gap-6 p-4 bg-slate-900/40 border border-slate-800 rounded-xl justify-between items-center">
              <div className="flex gap-4 items-center">
                <span className="text-sm font-semibold text-slate-400">体験するシステム:</span>
                <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex">
                  <button onClick={() => setSelectedTech('html-css')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedTech === 'html-css' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>標準 HTML / CSS</button>
                  <button onClick={() => setSelectedTech('wordpress')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedTech === 'wordpress' ? 'bg-blue-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>WordPress風カスタム</button>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <span className="text-sm font-semibold text-slate-400">作り方:</span>
                <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex">
                  <button onClick={() => setSelectedMethod('nocode')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedMethod === 'nocode' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>かんたん設定 (ノーコード)</button>
                  <button onClick={() => setSelectedMethod('code')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedMethod === 'code' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>コード入力 (エディタ)</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* 左側：操作エリア（切り替え式） */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
                <h3 className="font-bold text-md text-slate-400 uppercase tracking-wider">
                  {selectedMethod === 'nocode' ? '⚙️ 設定パネル' : '💻 コードエディタ'}
                </h3>
                
                {/* 新機能：ボタンの文字変更（どっちのモードでも表示） */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-400">ボタンの文字 (Text)</label>
                  <input 
                    type="text" 
                    value={buttonText} 
                    onChange={(e) => setButtonText(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 focus:outline-none focus:border-cyan-500"
                    placeholder="ボタンの文字を入力..."
                  />
                </div>

                {selectedMethod === 'nocode' ? (
                  /* 【A】ノーコード（スライダー群） */
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-slate-400">背景色 (Background Color)</label>
                      <div className="flex items-center gap-4">
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded bg-transparent cursor-pointer border-0" />
                        <span className="font-mono text-sm bg-slate-950 px-3 py-1.5 rounded border border-slate-800 text-slate-300">{bgColor}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs"><span className="text-slate-400">角の丸み</span><span className="text-cyan-400 font-mono">{borderRadius}px</span></div>
                      <input type="range" min="0" max="30" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full accent-cyan-500" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs"><span className="text-slate-400">横の余白</span><span className="text-cyan-400 font-mono">{paddingX}px</span></div>
                      <input type="range" min="10" max="50" value={paddingX} onChange={(e) => setPaddingX(Number(e.target.value))} className="w-full accent-cyan-500" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs"><span className="text-slate-400">縦の余白</span><span className="text-cyan-400 font-mono">{paddingY}px</span></div>
                      <input type="range" min="5" max="30" value={paddingY} onChange={(e) => setPaddingY(Number(e.target.value))} className="w-full accent-cyan-500" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs"><span className="text-slate-400">影のぼかし</span><span className="text-cyan-400 font-mono">{shadowBlur}px</span></div>
                      <input type="range" min="0" max="20" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full accent-cyan-500" />
                    </div>
                  </div>
                ) : (
                  /* 【B】コード入力（プロっぽテキストエリア） */
                  <div className="space-y-2 flex-1 flex flex-col">
                    <label className="block text-xs font-medium text-slate-400">CSSを自由に書き換えてみよう！</label>
                    <textarea 
                      value={customCSS} 
                      onChange={(e) => setCustomCSS(e.target.value)}
                      rows={11}
                      className="w-full bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs border border-slate-800 focus:border-cyan-500 outline-none resize-none leading-relaxed"
                    />
                    <p className="text-[11px] text-slate-500">※（注意）コード入力モード中の変更はスライダーには連動しません。本物のコードをいじる体験です！</p>
                  </div>
                )}

                <button onClick={saveToLocal} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-sm font-medium rounded-lg transition border border-slate-700 text-white">
                  📁 現在の設定をローカルに保存
                </button>
              </div>

              {/* 右側：プレビューエリア */}
              <div className="flex flex-col gap-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-md text-slate-400 uppercase tracking-wider mb-4">Preview</h3>
                  
                  {/* ★コード入力時はHTMLの中に直接カスタムCSSを適用するスタイルタグを仕込むアプローチ */}
                  <div className="flex-1 min-h-[160px] bg-slate-950 rounded-lg border border-slate-800 flex flex-col items-center justify-center relative p-4 overflow-hidden">
                    {selectedTech === 'wordpress' && (
                      <div className="absolute top-2 left-4 text-[10px] text-slate-600 font-mono w-full text-left">📄 投稿記事: 「おすすめのカフェ10選」</div>
                    )}

                    {/* コード入力モードの時のCSSをリアルタイムにこの画面だけに適用する魔法のタグ */}
                    <style>{customCSS}</style>

                    <button
                      className={selectedMethod === 'code' 
                        ? (selectedTech === 'wordpress' ? 'wp-block-button__link' : 'custom-button') 
                        : "font-bold text-white border-none cursor-pointer"
                      }
                      style={selectedMethod === 'nocode' ? {
                        backgroundColor: bgColor,
                        borderRadius: `${borderRadius}px`,
                        padding: `${paddingY}px ${paddingX}px`,
                        boxShadow: `0 4px ${shadowBlur}px rgba(0,0,0,0.4)`,
                        transition: 'transform 0.2s ease',
                      } : {}}
                      onMouseEnter={(e) => {
                        if (selectedMethod === 'nocode') e.currentTarget.style.transform = `scale(${hoverScale / 100})`;
                      }}
                      onMouseLeave={(e) => {
                        if (selectedMethod === 'nocode') e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {buttonText}
                    </button>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button onClick={() => { navigator.clipboard.writeText(customCSS); alert('CSSをコピーしました！'); }} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium border border-slate-700 text-white">
                      📋 コードをコピー
                    </button>
                    <button onClick={downloadFiles} className={`flex-1 py-2 rounded-lg text-xs font-medium text-white ${selectedTech === 'wordpress' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}>
                      📥 成果物をダウンロード
                    </button>
                  </div>
                </div>

                {/* 生成されたコード表示（ノーコード時のみ、またはコード入力時の確認用） */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-48 flex flex-col">
                  <h3 className="font-bold text-md text-slate-400 uppercase tracking-wider mb-2">CSS 出力</h3>
                  <pre className="flex-1 bg-slate-950 p-3 rounded-lg font-mono text-xs text-emerald-400 overflow-y-auto border border-slate-800 whitespace-pre-wrap text-left">
                    {customCSS}
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