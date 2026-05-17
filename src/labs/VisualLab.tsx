import { useState, useEffect } from 'react';

type TechType = 'html-css' | 'wordpress';
type MethodType = 'nocode' | 'code';

export default function VisualLab() {
  const [selectedTech, setSelectedTech] = useState<TechType>('html-css');
  const [selectedMethod, setSelectedMethod] = useState<MethodType>('nocode');
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');
  const [justifyContent, setJustifyContent] = useState('center');
  const [gapSize, setGapSize] = useState(16);
  const [logoImage, setLogoImage] = useState<string>('');
  const [cardAImage, setCardAImage] = useState<string>('');
  const [layoutCSS, setLayoutCSS] = useState('');

  useEffect(() => {
    const css = selectedTech === 'wordpress'
      ? `/* WordPressテーマのレイアウト上書き */
.wp-block-group {
  display: flex !important;
  flex-direction: ${flexDirection} !important;
  justify-content: ${justifyContent} !important;
  gap: ${gapSize}px !important;
}`
      : `/* 標準のHTML/CSSレイアウト */
.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  gap: ${gapSize}px;
}`;
    if (selectedMethod === 'nocode') {
      setLayoutCSS(css);
    }
  }, [flexDirection, justifyContent, gapSize, selectedTech, selectedMethod]);

  // 🛠️ 修正完了：パソコンから画像を取り込む関数
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'logo' | 'cardA') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'logo') setLogoImage(reader.result as string);
        if (target === 'cardA') setCardAImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-6 p-4 bg-slate-900/40 border border-slate-800 rounded-xl justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="text-sm font-semibold text-slate-400">体験するシステム:</span>
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex">
            <button onClick={() => setSelectedTech('html-css')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedTech === 'html-css' ? 'bg-emerald-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>標準 HTML / CSS</button>
            <button onClick={() => setSelectedTech('wordpress')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedTech === 'wordpress' ? 'bg-blue-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>WordPressテーマ風</button>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-sm font-semibold text-slate-400">配置方法:</span>
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex">
            <button onClick={() => setSelectedMethod('nocode')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedMethod === 'nocode' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>直感操作 (ノーコード)</button>
            <button onClick={() => setSelectedMethod('code')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${selectedMethod === 'code' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}>コード記述 (CSS)</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl space-y-6 lg:col-span-1">
          <h3 className="font-bold text-slate-300 uppercase tracking-wider text-sm">🛠️ レイアウト・画像設定</h3>
          
          <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400">💻 パソコンの画像を取り込む</h4>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">ロゴ用画像を選択</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer" />
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">記事Aのアイキャッチを選択</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cardA')} className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer" />
            </div>
          </div>

          {selectedMethod === 'nocode' ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 block mb-1">並べる方向 (flex-direction)</span>
                <div className="flex gap-2">
                  <button onClick={() => setFlexDirection('row')} className={`flex-1 py-1.5 text-xs rounded-md font-medium transition ${flexDirection === 'row' ? 'bg-cyan-500 text-white' : 'bg-slate-950 text-slate-400'}`}>横並び (row)</button>
                  <button onClick={() => setFlexDirection('column')} className={`flex-1 py-1.5 text-xs rounded-md font-medium transition ${flexDirection === 'column' ? 'bg-cyan-500 text-white' : 'bg-slate-950 text-slate-400'}`}>縦並び (column)</button>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">揃え位置 (justify-content)</span>
                <select value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)} className="w-full bg-slate-950 text-xs p-2 rounded-md border border-slate-800 text-white outline-none">
                  <option value="center">中央揃え (center)</option>
                  <option value="flex-start">左/上詰め (flex-start)</option>
                  <option value="flex-end">右/下詰め (flex-end)</option>
                  <option value="space-between">両端揃え (space-between)</option>
                </select>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs"><span className="text-slate-400">要素のスキマ (gap)</span><span className="text-cyan-400 font-mono">{gapSize}px</span></div>
                <input type="range" min="0" max="50" value={gapSize} onChange={(e) => setGapSize(Number(e.target.value))} className="w-full accent-cyan-500" />
              </div>
            </div>
          ) : (
            <div className="space-y-2 flex flex-col">
              <label className="block text-xs font-medium text-slate-400">レイアウトCSSを自由に入力</label>
              <textarea value={layoutCSS} onChange={(e) => setLayoutCSS(e.target.value)} rows={9} className="w-full bg-slate-950 text-emerald-400 p-3 rounded-xl font-mono text-xs border border-slate-800 outline-none resize-none" />
            </div>
          )}
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl flex-1 flex flex-col justify-between">
            <h3 className="font-bold text-slate-300 text-sm mb-4">プレビュー</h3>
            <style>{layoutCSS}</style>
            <div className={selectedMethod === 'code' ? (selectedTech === 'wordpress' ? 'wp-block-group' : 'container') : "flex bg-slate-950 rounded-xl p-6 min-h-[220px] transition-all duration-200 border border-slate-800"} style={selectedMethod === 'nocode' ? { display: 'flex', flexDirection: flexDirection, justifyContent: justifyContent, alignItems: 'center', gap: `${gapSize}px` } : {}}>
              <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center font-bold text-white text-[11px] overflow-hidden shadow-md shrink-0">
                {logoImage ? <img src={logoImage} alt="Logo" className="w-full h-full object-cover" /> : <span>ロゴ画像</span>}
              </div>
              <div className="w-32 h-24 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center font-bold text-white text-[11px] overflow-hidden shadow-md shrink-0">
                {cardAImage ? <img src={cardAImage} alt="CardA" className="w-full h-full object-cover" /> : <span className="p-2 text-center text-slate-500">画像未選択<br/>(記事A)</span>}
              </div>
              <div className="w-32 h-24 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center font-bold text-white text-[11px] overflow-hidden shadow-md shrink-0 p-2 text-center">
                <div className="text-cyan-400 font-bold mb-1">📢 お知らせ</div>
                <div className="text-[9px] text-slate-400 font-normal">新アプリをリリースしました！</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-6 h-40 flex flex-col rounded-xl">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">生成された配置CSSコード</h3>
            <pre className="flex-1 bg-slate-950 p-3 rounded-lg font-mono text-xs text-emerald-400 overflow-y-auto border border-slate-800 whitespace-pre-wrap text-left">{layoutCSS}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}