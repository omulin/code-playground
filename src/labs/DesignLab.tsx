import { useState, useEffect } from 'react';

type TechType = 'html-css' | 'wordpress';
type MethodType = 'nocode' | 'code';

export default function DesignLab() {
  const [selectedTech, setSelectedTech] = useState<TechType>('html-css');
  const [selectedMethod, setSelectedMethod] = useState<MethodType>('nocode');
  
  // --- 復活：すべての状態（State） ---
  const [buttonText, setButtonText] = useState('詳しくはこちら');
  const [bgColor, setBgColor] = useState('#3498db');
  const [borderRadius, setBorderRadius] = useState(12);
  const [paddingX, setPaddingX] = useState(24);
  const [paddingY, setPaddingY] = useState(12);
  const [shadowBlur, setShadowBlur] = useState(8);
  const [hoverScale, setHoverScale] = useState(105); // %
  const [customCSS, setCustomCSS] = useState('');

  // スライダーとコード入力の自動同期
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
    
    if (selectedMethod === 'nocode') {
      setCustomCSS(css);
    }
  }, [bgColor, borderRadius, paddingX, paddingY, shadowBlur, hoverScale, selectedTech, selectedMethod]);

  return (
    <div className="space-y-6">
      
      {/* 上部コントロールバー */}
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
        
        {/* 左側：操作エリア */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-400">ボタンの文字 (Text)</label>
            <input 
              type="text" 
              value={buttonText} 
              onChange={(e) => setButtonText(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-cyan-500" 
            />
          </div>

          {selectedMethod === 'nocode' ? (
            /* 復活：すべてのスライダー群 */
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-400">背景色 (Background Color)</label>
                <div className="flex items-center gap-4">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded bg-transparent cursor-pointer border-0" />
                  <span className="font-mono text-sm bg-slate-950 px-3 py-1.5 rounded border border-slate-800 text-slate-300">{bgColor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-slate-400">角の丸み (Border Radius)</span><span className="text-cyan-400 font-mono">{borderRadius}px</span></div>
                <input type="range" min="0" max="30" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full accent-cyan-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-slate-400">横の余白 (Padding X)</span><span className="text-cyan-400 font-mono">{paddingX}px</span></div>
                <input type="range" min="10" max="50" value={paddingX} onChange={(e) => setPaddingX(Number(e.target.value))} className="w-full accent-cyan-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-slate-400">縦の余白 (Padding Y)</span><span className="text-cyan-400 font-mono">{paddingY}px</span></div>
                <input type="range" min="5" max="30" value={paddingY} onChange={(e) => setPaddingY(Number(e.target.value))} className="w-full accent-cyan-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-slate-400">影のぼかし (Box Shadow)</span><span className="text-cyan-400 font-mono">{shadowBlur}px</span></div>
                <input type="range" min="0" max="20" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full accent-cyan-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-slate-400">ホバー時の拡大率 (Hover Scale)</span><span className="text-cyan-400 font-mono">{hoverScale}%</span></div>
                <input type="range" min="100" max="120" value={hoverScale} onChange={(e) => setHoverScale(Number(e.target.value))} className="w-full accent-cyan-500" />
              </div>
            </div>
          ) : (
            <textarea value={customCSS} onChange={(e) => setCustomCSS(e.target.value)} rows={11} className="w-full bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs border border-slate-800 outline-none resize-none leading-relaxed" />
          )}
        </div>

        {/* 右側：プレビューエリア */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex-1 flex flex-col justify-between">
            <h3 className="font-bold text-md text-slate-400 uppercase tracking-wider mb-4">Preview</h3>
            <div className="flex-1 min-h-[160px] bg-slate-950 rounded-lg flex flex-col items-center justify-center relative p-4">
              {selectedTech === 'wordpress' && (
                <div className="absolute top-2 left-4 text-[10px] text-slate-600 font-mono w-full text-left">📄 投稿記事: 「おすすめのカフェ10選」</div>
              )}

              <style>{customCSS}</style>

              <button
                className={selectedMethod === 'code' ? (selectedTech === 'wordpress' ? 'wp-block-button__link' : 'custom-button') : "font-bold text-white border-none cursor-pointer"}
                style={selectedMethod === 'nocode' ? {
                  backgroundColor: bgColor,
                  borderRadius: `${borderRadius}px`,
                  padding: `${paddingY}px ${paddingX}px`,
                  boxShadow: `0 4px ${shadowBlur}px rgba(0,0,0,0.4)`,
                  transition: 'transform 0.2s ease',
                } : {}}
                onMouseEnter={(e) => { if (selectedMethod === 'nocode') e.currentTarget.style.transform = `scale(${hoverScale / 100})`; }}
                onMouseLeave={(e) => { if (selectedMethod === 'nocode') e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {buttonText}
              </button>
            </div>
          </div>

          {/* 生成されたコード表示 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 h-48 flex flex-col">
            <h3 className="font-bold text-md text-slate-400 uppercase tracking-wider mb-2">CSS 出力</h3>
            <pre className="flex-1 bg-slate-950 p-3 rounded-lg font-mono text-xs text-emerald-400 overflow-y-auto border border-slate-800 whitespace-pre-wrap text-left">
              {customCSS}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}