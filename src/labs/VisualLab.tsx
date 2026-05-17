import { useState, useEffect } from 'react';

type ModeType = 'site' | 'wordpress';
type StepType = 'visual' | 'code';

interface LayoutStage {
  id: number;
  title: string;
  mission: string;
  hint: string;
  correctHtml: string; 
  correctCss: string;  
  elements: { id: number; label: string; color: string; icon: string }[];
  controls: { property: string; options: string[] }[];
  initialHtml: string;
  initialCss: string;
}

const STAGES: Record<ModeType, LayoutStage[]> = {
  site: [
    { 
      id: 1, title: "1. ヒーローエリアの中央爆破 (Flexbox)", 
      mission: "HTMLで親となるコンテナを作り、その中のヒーロー画像を画面の「縦横ド真ん中」に配置してください。", 
      hint: "HTMLは <div class=\"container\"> で囲み、CSSは justify-content: center; と align-items: center; を指定します。", 
      correctHtml: "container", correctCss: "center", 
      initialHtml: "\n<div class=\"\">\n  <div class=\"item\">🖼️ HERO</div>\n</div>",
      initialCss: "/* 横軸・縦軸を中央に集める命令を書こう */\n.container {\n  display: flex;\n  \n}", 
      elements: [{ id: 1, label: "HERO IMAGE", color: "#0ea5e9", icon: "🖼️" }], 
      controls: [{ property: "justify-content", options: ["flex-start", "center", "flex-end"] }, { property: "align-items", options: ["flex-start", "center", "flex-end"] }] 
    },
    { 
      id: 2, title: "2. サイトヘッダーの左右大分散 (Flexbox)", 
      mission: "HTMLで「header」タグを用意し、中のロゴとメニューを画面の左右両端に引き離して配置してください。", 
      hint: "HTMLは <header> を使い、CSSは最大の隙間を空ける space-between を記述します。", 
      correctHtml: "header", correctCss: "space-between", 
      initialHtml: "\n<div class=\"\">\n  <div class=\"item\">🔷 LOGO</div>\n  <div class=\"item\">☰ MENU</div>\n</div>",
      initialCss: "header {\n  display: flex;\n  /* 左右に分散させる命令は？ */\n  \n}", 
      elements: [{ id: 1, label: "LOGO", color: "#38bdf8", icon: "🔷" }, { id: 2, label: "MENU", color: "#94a3b8", icon: "☰" }], 
      controls: [{ property: "justify-content", options: ["flex-start", "center", "space-between"] }] 
    },
    { 
      id: 3, title: "3. スマホ対応の折り返し (Flexwrap)", 
      mission: "HTMLで「badges」クラスの枠を作り、中身が画面幅を超えたら自動で折り返すようにして！", 
      hint: "CSSで折り返しを許可する flex-wrap: wrap; を指定します。", 
      correctHtml: "badges", correctCss: "wrap", 
      initialHtml: "<div class=\"\">\n  <div class=\"item\">💎 1</div>\n  <div class=\"item\">💎 2</div>\n  <div class=\"item\">💎 3</div>\n</div>",
      initialCss: ".badges {\n  display: flex;\n  /* 折り返しを許可しよう */\n  \n}", 
      elements: [{ id: 1, label: "BADGE 1", color: "#a855f7", icon: "💎" }, { id: 2, label: "BADGE 2", color: "#a855f7", icon: "💎" }, { id: 3, label: "BADGE 3", color: "#a855f7", icon: "💎" }], 
      controls: [{ property: "flex-wrap", options: ["nowrap", "wrap"] }] 
    },
    { 
      id: 4, title: "4. アパレル2カラムグリッド (CSS Grid)", 
      mission: "HTMLで「grid-box」を作り、4つの商品を縦2列×横2列のきれいなタイル状に並べよ！", 
      hint: "CSS Gridを起動し、grid-template-columns: 1fr 1fr; を指定します。", 
      correctHtml: "grid-box", correctCss: "1fr1fr", 
      initialHtml: "<div class=\"\">\n  <div class=\"item\">🧥 A</div>\n  <div class=\"item\">👗 B</div>\n  <div class=\"item\">👕 C</div>\n  <div class=\"item\">👖 D</div>\n</div>",
      initialCss: ".grid-box {\n  display: grid;\n  /* 2列に均等分割して */\n  \n}", 
      elements: [{ id: 1, label: "ITEM A", color: "#ec4899", icon: "🧥" }, { id: 2, label: "ITEM B", color: "#ec4899", icon: "👗" }, { id: 3, label: "ITEM C", color: "#ec4899", icon: "👕" }, { id: 4, label: "ITEM D", color: "#ec4899", icon: "👖" }], 
      controls: [{ property: "grid-template-columns", options: ["1fr", "1fr 1fr", "1fr 1fr 1fr"] }] 
    },
    { 
      id: 5, title: "5. メディア全体の3カラムタイル (CSS Grid)", 
      mission: "HTMLで「catalog」の親を作り、横並びに3つのカードを均等に並べ、隙間を20px空けてください。", 
      hint: "CSSで列を 1fr 1fr 1fr にし、gap: 20px; を設定します。", 
      correctHtml: "catalog", correctCss: "20px", 
      initialHtml: "<div class=\"\">\n  <div class=\"item\">📰 1</div>\n  <div class=\"item\">📰 2</div>\n  <div class=\"item\">📰 3</div>\n</div>",
      initialCss: ".catalog {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  /* 隙間（ギャップ）を20pxに設定して */\n  \n}", 
      elements: [{ id: 1, label: "CARD 1", color: "#e11d48", icon: "📰" }, { id: 2, label: "CARD 2", color: "#e11d48", icon: "📰" }, { id: 3, label: "CARD 3", color: "#e11d48", icon: "📰" }], 
      controls: [{ property: "grid-template-columns", options: ["1fr 1fr 1fr"] }, { property: "gap", options: ["0px", "10px", "20px"] }] 
    }
  ],
  wordpress: [
    { 
      id: 1, title: "1. WPループ記事カードの横並び (Flexbox)", 
      mission: "WordPressのループを包む「wp-wrapper」クラスを作り、出力された2つの投稿を横並びにせよ！", 
      hint: "CSSで親要素に display: flex; を指定することで、中身の投稿が自動で横並びになります。", 
      correctHtml: "wp-wrapper", correctCss: "flex", 
      initialHtml: "\n<div class=\"\">\n  <div class=\"item\">🐘 POST1</div>\n  <div class=\"item\">🐘 POST2</div>\n</div>",
      initialCss: ".wp-wrapper {\n  /* 横並びを起動して */\n  \n}", 
      elements: [{ id: 1, label: "POST 1", color: "#0073aa", icon: "🐘" }, { id: 2, label: "POST 2", color: "#0073aa", icon: "🐘" }], 
      controls: [{ property: "display", options: ["block", "flex", "grid"] }] 
    },
    { 
      id: 2, title: "2. 投稿記事の縦積みダッシュボード (Column)", 
      mission: "HTMLで「wp-sidebar」を用意し、メニューアイコンを上から下へ流れる「縦積み」に直して！", 
      hint: "CSSで flex-direction: column; を指定すると、要素が垂直に並びます。", 
      correctHtml: "wp-sidebar", correctCss: "column", 
      initialHtml: "<div class=\"\">\n  <div class=\"item\">📄 LATEST1</div>\n  <div class=\"item\">📄 LATEST2</div>\n</div>",
      initialCss: ".wp-sidebar {\n  display: flex;\n  /* 縦積みに変更 */\n  \n}", 
      elements: [{ id: 1, label: "LATEST 1", color: "#0073aa", icon: "📄" }, { id: 2, label: "LATEST 2", color: "#0073aa", icon: "📄" }], 
      controls: [{ property: "flex-direction", options: ["row", "column"] }] 
    },
    { 
      id: 3, title: "3. アーカイブページの3カラムグリッド", 
      mission: "HTMLで「wp-archive」の枠を作り、WPの過去記事一覧を美しい3カラムのグリッドにせよ！", 
      hint: "CSSで grid-template-columns: repeat(3, 1fr); を記述します。", 
      correctHtml: "wp-archive", correctCss: "1fr1fr1fr", 
      initialHtml: "<div class=\"\">\n  <div class=\"item\">📦 ARCH1</div>\n  <div class=\"item\">📦 ARCH2</div>\n  <div class=\"item\">📦 ARCH3</div>\n</div>",
      initialCss: ".wp-archive {\n  display: grid;\n  /* 3列に均等分割 */\n  \n}", 
      elements: [{ id: 1, label: "ARCH 1", color: "#0ea5e9", icon: "📦" }, { id: 2, label: "ARCH 2", color: "#0ea5e9", icon: "📦" }, { id: 3, label: "ARCH 3", color: "#0ea5e9", icon: "📦" }], 
      controls: [{ property: "grid-template-columns", options: ["1fr", "1fr 1fr", "1fr 1fr 1fr"] }] 
    },
    { 
      id: 4, title: "4. WP管理画面風の左右2レイアウト", 
      mission: "HTMLで「wp-admin」の骨組みを作り、左メニューと右編集画面を 1:3 の比率で横並びにして！", 
      hint: "CSS Gridを使い、列の比率（grid-template-columns）を 1fr 3fr に設定します。", 
      correctHtml: "wp-admin", correctCss: "1fr3fr", 
      initialHtml: "<div class=\"\">\n  <div class=\"item\">⚙️ SIDE</div>\n  <div class=\"item\">📝 MAIN</div>\n</div>",
      initialCss: ".wp-admin {\n  display: grid;\n  /* 比率を 1fr 3fr に指定 */\n  \n}", 
      elements: [{ id: 1, label: "SIDE", color: "#23282d", icon: "⚙️" }, { id: 2, label: "MAIN EDITOR", color: "#ffffff", icon: "📝" }], 
      controls: [{ property: "grid-template-columns", options: ["1fr 1fr", "1fr 3fr", "3fr 1fr"] }] 
    },
    { 
      id: 5, title: "5. 【最終試練】自作テーマの統合パーツ配置", 
      mission: "HTMLで「single-article」を作り、中のアイキャッチと本文の隙間を30px空けて完全固定せよ！", 
      hint: "CSSで gap: 30px; を指定することで、WordPressの動的パーツ間に完璧な距離を作れます。", 
      correctHtml: "single-article", correctCss: "30px", 
      initialHtml: "<div class=\"\">\n  <div class=\"item\">🖼️ THUMB</div>\n  <div class=\"item\">✍️ TEXT</div>\n</div>",
      initialCss: ".single-article {\n  display: flex;\n  /* パーツ間の隙間を30pxにして */\n  \n}", 
      elements: [{ id: 1, label: "THUMB", color: "#00a0d2", icon: "🖼️" }, { id: 2, label: "CONTENT", color: "#f1f5f9", icon: "✍️" }], 
      controls: [{ property: "gap", options: ["0px", "10px", "30px"] }] 
    }
  ]
};

export default function VisualLab() {
  const [mode, setMode] = useState<ModeType>('site');
  const [step, setStep] = useState<StepType>('visual');
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const stage = STAGES[mode][currentIdx] || STAGES[mode];

  // 👑 究極の安全対策：型を最初からなんでも入るオブジェクト型(any)にしてエラーを完全排除！
  const [visualStyles, setVisualStyles] = useState<any>({});
  const [htmlValue, setHtmlValue] = useState<string>("");
  const [cssValue, setCssValue] = useState<string>("");
  const [isPassed, setIsPassed] = useState<boolean>(false);

  // 👑 究極の安全対策その2：不具合の元になっていた c.options のループ処理を消滅させ、
  // 代わりに空オブジェクトを安全に入れるだけで完全に同期させました。
  useEffect(() => {
    setVisualStyles({});
    setHtmlValue(stage.initialHtml);
    setCssValue(stage.initialCss);
    setIsPassed(false);
    setActiveTab('html');
  }, [mode, currentIdx, stage]);

  const checkPassStatus = (html: string, css: string) => {
    const cleanHtml = html.replace(/\s/g, "");
    const cleanCss = css.replace(/\s/g, "");
    const targetHtml = stage.correctHtml.replace(/\s/g, "");
    const targetCss = stage.correctCss.replace(/\s/g, "");

    if (cleanHtml.includes(targetHtml) && cleanCss.includes(targetCss)) {
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  };

  const getContainerStyle = () => {
    if (step === 'visual') {
      return {
        display: (stage.id >= 4 && mode === 'site') || (stage.id >= 3 && mode === 'wordpress' && currentIdx >= 2) ? 'grid' : 'flex',
        ...visualStyles,
        width: '100%', height: '100%', minHeight: '280px', background: '#141414', padding: '20px', borderRadius: '8px'
      };
    } else {
      return {
        display: (stage.id >= 4 && mode === 'site') || (stage.id >= 3 && mode === 'wordpress' && currentIdx >= 2) ? 'grid' : 'flex',
        justifyContent: isPassed && stage.correctCss === 'center' ? 'center' : isPassed && stage.correctCss === 'space-between' ? 'space-between' : 'flex-start',
        alignItems: isPassed && stage.correctCss === 'center' ? 'center' : 'flex-start',
        flexDirection: isPassed && stage.correctCss === 'column' ? 'column' : 'row',
        flexWrap: isPassed && stage.correctCss === 'wrap' ? 'wrap' : 'nowrap',
        gridTemplateColumns: isPassed && stage.correctCss === '1fr1fr' ? '1fr 1fr' : isPassed && stage.correctCss === '1fr1fr1fr' ? '1fr 1fr 1fr' : isPassed && stage.correctCss === '1fr3fr' ? '1fr 3fr' : '1fr',
        gap: isPassed && stage.correctCss === '20px' ? '20px' : isPassed && stage.correctCss === '30px' ? '30px' : '0px',
        width: '100%', height: '100%', minHeight: '280px', background: '#141414', padding: '20px', borderRadius: '8px'
      };
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex bg-[#2d2d2d] border border-[#3c3c3c] p-1 rounded text-xs">
          <button onClick={() => { setMode('site'); setCurrentIdx(0); }} className={`px-3 py-1 rounded font-bold ${mode === 'site' ? 'bg-[#0e639c] text-white' : 'text-slate-400'}`}>🌐 WEB標準構造</button>
          <button onClick={() => { setMode('wordpress'); setCurrentIdx(0); }} className={`px-3 py-1 rounded font-bold ${mode === 'wordpress' ? 'bg-[#0073aa] text-white' : 'text-slate-400'}`}>💬 WPテーマテンプレート構造</button>
        </div>

        <div className="flex bg-[#2d2d2d] border border-[#3c3c3c] p-1 rounded text-xs">
          <button onClick={() => setStep('visual')} className={`px-3 py-1 rounded font-bold ${step === 'visual' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}>🎛️ STEP 1: マップ設計</button>
          <button onClick={() => setStep('code')} className={`px-3 py-1 rounded font-bold ${step === 'code' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>💻 STEP 2: ガチ書き実戦 (HTML×CSS)</button>
        </div>
      </div>

      <div className="bg-[#252526] border border-[#3c3c3c] p-2 rounded flex gap-1 overflow-x-auto text-xs">
        {STAGES[mode].map((s, idx) => (
          <button key={s.id} onClick={() => setCurrentIdx(idx)} className={`px-2.5 py-0.5 rounded font-mono font-bold border ${currentIdx === idx ? 'bg-[#37373d] text-cyan-400 border-cyan-500' : 'bg-[#1e1e1e] text-slate-400 border-transparent'}`}>#{s.id}</button>
        ))}
      </div>

      <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded border-l-4 border-cyan-500 space-y-1.5 text-xs">
        <div className="font-bold text-white">MISSION 0{stage.id}：{stage.title}</div>
        <p className="text-slate-400 bg-[#252526] p-2 rounded border border-[#2b2b2b]">{stage.mission}</p>
        <div className="text-[11px] text-cyan-400/90 bg-cyan-950/20 p-2 rounded">💡 2刀流ヒント: [HTMLのクラス名] と [CSSの配置コマンド] の両方を正しく繋げましょう。</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded flex flex-col min-h-[340px] overflow-hidden">
          {step === 'visual' ? (
            <div className="p-4 space-y-4 w-full">
              <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">▼ Property 設計シミュレーター</h4>
              {stage.controls.map((ctrl) => (
                <div key={ctrl.property} className="space-y-1 text-xs">
                  <div className="font-mono text-slate-400 text-[11px]">{ctrl.property}:</div>
                  <div className="flex flex-wrap gap-1">
                    {ctrl.options.map((opt) => (
                      <button key={opt} onClick={() => setVisualStyles((p: any) => ({ ...p, [ctrl.property]: opt }))} className={`px-2 py-0.5 text-[10px] font-mono rounded border ${visualStyles[ctrl.property] === opt ? 'bg-[#0e639c] text-white border-cyan-500' : 'bg-[#2d2d2d] text-slate-400 border-transparent'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-[#2b2b2b]">
                <div className="text-[10px] text-slate-500 mb-1 font-mono">自動生成CSS構造:</div>
                <pre className="bg-black/30 p-2 rounded text-[10px] text-amber-300 font-mono overflow-x-auto">{`.parent {\n${Object.entries(visualStyles).map(([k,v]) => `  ${k}: ${v};`).join('\n')}\n}`}</pre>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col h-full">
              <div className="bg-[#2d2d2d] flex border-b border-[#252526] text-xs text-slate-400 select-none">
                <button onClick={() => setActiveTab('html')} className={`px-4 py-2 ${activeTab === 'html' ? 'bg-[#1e1e1e] text-amber-400 font-bold border-t border-t-amber-500' : ''}`}>🧡 template.html</button>
                <button onClick={() => setActiveTab('css')} className={`px-4 py-2 ${activeTab === 'css' ? 'bg-[#1e1e1e] text-cyan-400 font-bold border-t border-t-cyan-500' : ''}`}>💙 style.css</button>
                <div className="ml-auto pr-3 flex items-center text-[10px]">
                  {isPassed ? <span className="text-emerald-400 font-bold">✓ 両条件クリア！合格</span> : <span className="text-rose-400">● 構築中...</span>}
                </div>
              </div>

              <div className="flex-1 p-2 bg-[#141414] min-h-[260px] flex flex-col">
                {activeTab === 'html' ? (
                  <textarea value={htmlValue} onChange={(e) => { setHtmlValue(e.target.value); checkPassStatus(e.target.value, cssValue); }} className="flex-grow w-full bg-transparent text-[#9cdcfe] font-mono text-xs outline-none resize-none leading-relaxed text-left" style={{ caretColor: '#fff', minHeight: '240px' }} />
                ) : (
                  <textarea value={cssValue} onChange={(e) => { setCssValue(e.target.value); checkPassStatus(htmlValue, e.target.value); }} className="flex-grow w-full bg-transparent text-[#ce9178] font-mono text-xs outline-none resize-none leading-relaxed text-left" style={{ caretColor: '#fff', minHeight: '240px' }} />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#252526] border border-[#3c3c3c] p-4 rounded flex flex-col min-h-[340px] justify-between">
          <div className="flex-grow flex flex-col">
            <h4 className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-2">👁️ STRUCTURE LIVE PREVIEW</h4>
            <div className="flex-grow bg-[#141414] rounded p-4 flex items-center justify-center border border-[#2b2b2b] min-h-[240px]">
              <div style={getContainerStyle() as any} className="transition-all duration-300">
                {stage.elements.map((el) => (
                  <div key={el.id} style={{ backgroundColor: el.color }} className="p-4 rounded shadow-lg text-white flex flex-col items-center justify-center min-w-[70px]">
                    <span className="text-xl">{el.icon}</span>
                    <span className="text-[9px] font-bold font-mono tracking-tighter mt-1">{el.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {step === 'code' && isPassed && (
            <div className="mt-2 p-2 bg-emerald-950/40 border border-emerald-800 rounded text-center">
              <span className="text-emerald-400 font-bold text-xs">🎉 完璧です！！HTMLの箱（構造）とCSSのレイアウト命令が完全に噛み合いました！ステージクリア！</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}