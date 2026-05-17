import { useState, useEffect } from 'react';

type DesignType = 'ui' | 'wp-ui';
type EditorTab = 'code' | 'css';

const PRESETS = {
  ui: [
    { id: 1, name: "💎 ガラス質感 (Glassmorphism)", html: `<button class="glass-btn">\n  <span class="icon">✨</span>\n  探索を開始する\n</button>`, css: `.glass-btn {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  padding: 12px 24px;\n  border-radius: 12px;\n  color: #fff;\n  font-weight: bold;\n  cursor: pointer;\n  box-shadow: 0 8px 32px rgba(0,0,0,0.37);\n  transition: 0.3s;\n}\n.glass-btn:hover {\n  background: rgba(255, 255, 255, 0.2);\n  transform: translateY(-2px);\n}` },
    { id: 2, name: "☁️ ぷにぷに (Neumorphism)", html: `<div class="neu-container">\n  <button class="neu-btn">PUSH</button>\n</div>`, css: `.neu-container {\n  padding: 40px;\n  background: #e0e5ec;\n  border-radius: 20px;\n}\n.neu-btn {\n  width: 100px; height: 100px;\n  border-radius: 50%;\n  background: #e0e5ec;\n  border: none;\n  color: #71b2ff;\n  font-weight: bold;\n  box-shadow: 9px 9px 16px rgb(163,177,198,0.6), \n              -9px -9px 16px rgba(255,255,255, 0.5);\n  cursor: pointer;\n  transition: 0.2s;\n}\n.neu-btn:active {\n  box-shadow: inset 7px 7px 10px rgb(163,177,198,0.6), \n              inset -7px -7px 10px rgba(255,255,255, 0.5);\n}` },
    { id: 3, name: "⚡ サイバーパンク (Neon)", html: `<button class="cyber-btn">\n  CRITICAL_ERROR\n  <span class="glitch"></span>\n</button>`, css: `.cyber-btn {\n  background: transparent;\n  color: #00fff2;\n  border: 2px solid #00fff2;\n  padding: 15px 30px;\n  font-family: monospace;\n  font-size: 18px;\n  font-weight: bold;\n  text-transform: uppercase;\n  position: relative;\n  cursor: pointer;\n  box-shadow: 0 0 15px rgba(0,255,242,0.4);\n  clip-path: polygon(90% 0, 100% 30%, 100% 100%, 0 100%, 0 0);\n}\n.cyber-btn:hover {\n  background: #00fff2;\n  color: #000;\n  box-shadow: 0 0 30px #00fff2;\n}` },
    { id: 4, name: "🌈 動くグラデーションボタン", html: `<button class="grad-btn">START JOURNEY</button>`, css: `.grad-btn {\n  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);\n  background-size: 400% 400%;\n  animation: gradient 5s ease infinite;\n  color: white;\n  border: none;\n  padding: 14px 28px;\n  border-radius: 8px;\n  font-weight: 800;\n  cursor: pointer;\n}\n@keyframes gradient {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}` },
    { id: 5, name: "🦄 パステル・ポップカード", html: `<div class="pop-card">\n  <div class="emoji">🎁</div>\n  <h4>Happy Surprise</h4>\n  <p>可愛いをコードでデザインする。</p>\n</div>`, css: `.pop-card {\n  background: #fff;\n  border: 4px solid #000;\n  padding: 20px;\n  border-radius: 20px;\n  box-shadow: 8px 8px 0px #ffb3ba;\n  text-align: center;\n  color: #333;\n}\n.emoji { font-size: 40px; }\nh4 { margin: 10px 0; font-size: 20px; }` },
  ],
  wp_ui: [
    { id: 1, name: "🐘 記事一覧ナビ (Pagination)", html: `<div class="wp-nav">\n  <?php next_posts_link('前の記事へ'); ?>\n  <span class="page-num">1 / 5</span>\n  <?php previous_posts_link('次の記事へ'); ?>\n</div>`, css: `.wp-nav {\n  display: flex; align-items: center; gap: 15px; background: #fff; padding: 10px 20px; border-radius: 50px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);\n}\n.wp-nav a {\n  color: #0073aa; text-decoration: none; font-size: 13px; font-weight: bold; border: 1px solid #0073aa; padding: 5px 12px; border-radius: 20px; transition: 0.2s;\n}\n.wp-nav a:hover { background: #0073aa; color: #fff; }\n.page-num { font-size: 12px; color: #777; }` },
    { id: 2, name: "🐘 投稿タグ (Post Tags)", html: `<div class="wp-tags">\n  <span class="label">TAGS:</span>\n  <?php the_tags('<ul><li>','</li><li>','</li></ul>'); ?>\n</div>`, css: `.wp-tags { display: flex; align-items: center; gap: 8px; }\n.label { font-size: 10px; font-weight: bold; color: #888; }\n.wp-tags ul { display: flex; gap: 6px; list-style: none; padding: 0; }\n.wp-tags li { background: #f0f0f1; color: #3c434a; font-size: 11px; padding: 4px 10px; border-radius: 4px; border: 1px solid #dcdcde; }` },
    { id: 3, name: "🐘 コメント入力欄 (Comment Form)", html: `<div class="wp-comment-area">\n  <h3>コメントを残す</h3>\n  <textarea placeholder="ここにメッセージを入力..."></textarea>\n  <button>送信する</button>\n</div>`, css: `.wp-comment-area { background: #f9f9f9; padding: 20px; border-radius: 8px; color: #333; text-align: left; }\ntextarea { width: 100%; height: 80px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; padding: 10px; }\nbutton { background: #23282d; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }` },
    { id: 4, name: "🐘 プロフィール (Author Bio)", html: `<div class="wp-author">\n  <div class="avatar">👤</div>\n  <div class="info">\n    <p class="name"><?php the_author(); ?></p>\n    <p class="bio">WordPressのテーマ制作を愛する、駆け出しエンジニアです。</p>\n  </div>\n</div>`, css: `.wp-author { display: flex; align-items: center; gap: 15px; background: #fff; padding: 15px; border: 1px solid #eee; border-radius: 12px; color: #333; }\n.avatar { width: 50px; height: 50px; background: #ddd; border-radius: 50%; display: flex; items-center; justify-content: center; font-size: 24px; }\n.name { font-weight: bold; color: #0073aa; }\n.bio { font-size: 12px; color: #666; }` },
    { id: 5, name: "🐘 サイドバー枠 (Widget Box)", html: `<aside class="wp-widget">\n  <h4 class="widget-title">最近の投稿</h4>\n  <ul>\n    <li><a href="#">世界一簡単なHTML講座</a></li>\n    <li><a href="#">VS Code風デザインの作り方</a></li>\n  </ul>\n</aside>`, css: `.wp-widget { background: #fff; border: 1px solid #ccd0d4; padding: 0; border-radius: 4px; color: #333; text-align: left; }\n.widget-title { background: #f6f7f7; padding: 10px 15px; font-size: 14px; border-bottom: 1px solid #ccd0d4; margin: 0; }\n.wp-widget ul { list-style: none; padding: 15px; }\n.wp-widget li { margin-bottom: 10px; font-size: 13px; }\n.wp-widget a { color: #0073aa; text-decoration: none; }` },
  ]
};

export default function DesignLab() {
  const [designType, setDesignType] = useState<DesignType>('ui');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<EditorTab>('code');

  const currentPreset = PRESETS[designType === 'ui' ? 'ui' : 'wp_ui'][currentIdx];
  const [htmlCode, setHtmlCode] = useState(currentPreset.html);
  const [cssCode, setCssCode] = useState(currentPreset.css);

  useEffect(() => {
    setHtmlCode(currentPreset.html);
    setCssCode(currentPreset.css);
  }, [designType, currentIdx]);

  // WordPressの擬似レンダラー（DesignLab版）
  const renderWpPreview = (code: string) => {
    let rendered = code;
    rendered = rendered.replace(/<\?php next_posts_link\('(.*?)'\);\s*\?>/g, "<a href='#'>$1</a>");
    rendered = rendered.replace(/<\?php previous_posts_link\('(.*?)'\);\s*\?>/g, "<a href='#'>$1</a>");
    rendered = rendered.replace(/<\?php the_tags\('(.*?)','(.*?)','(.*?)'\);\s*\?>/g, "$1<span>デザイン</span>$2<span>WP制作</span>$2<span>HTML</span>$3");
    rendered = rendered.replace(/<\?php the_author\(\);\s*\?>/g, "YUTO_CODE");
    return rendered;
  };

  const getLineNumbers = (text: string) => {
    const lines = text.split('\n').length;
    return Array.from({ length: Math.max(lines, 16) }, (_, i) => i + 1);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* 🎛️ モード切り替えタブ */}
      <div className="flex bg-[#2d2d2d] border border-[#3c3c3c] p-1 rounded-lg w-fit">
        <button onClick={() => { setDesignType('ui'); setCurrentIdx(0); }} className={`px-4 py-1.5 text-xs font-bold rounded transition ${designType === 'ui' ? 'bg-[#0e639c] text-white' : 'text-slate-400 hover:text-slate-200'}`}>
          🎨 UIパーツカタログ (HTML/CSS)
        </button>
        <button onClick={() => { setDesignType('wp-ui'); setCurrentIdx(0); }} className={`px-4 py-1.5 text-xs font-bold rounded transition ${designType === 'wp-ui' ? 'bg-[#0073aa] text-white' : 'text-slate-400 hover:text-slate-200'}`}>
          🐘 WordPress部品 (テンプレートタグ)
        </button>
      </div>

      {/* 📂 パーツエクスプローラー */}
      <div className="bg-[#252526] border border-[#3c3c3c] p-3 rounded-lg flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold text-[#858585] uppercase tracking-wider mr-2">カタログ:</span>
        {PRESETS[designType === 'ui' ? 'ui' : 'wp_ui'].map((preset, idx) => (
          <button
            key={preset.id}
            onClick={() => setCurrentIdx(idx)}
            className={`px-3 py-1 text-[11px] rounded font-bold border whitespace-nowrap transition ${currentIdx === idx ? 'bg-[#37373d] text-cyan-400 border-cyan-500 shadow-lg' : 'bg-[#1e1e1e] text-slate-400 border-transparent hover:border-slate-500'}`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* 💻 メイン開発スタジオ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* エディタ */}
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg flex flex-col overflow-hidden shadow-2xl">
          <div className="bg-[#2d2d2d] flex border-b border-[#252526] text-xs">
            <button onClick={() => setActiveTab('code')} className={`px-4 py-2 border-r border-[#252526] transition ${activeTab === 'code' ? 'bg-[#1e1e1e] text-amber-400 font-bold border-t border-t-amber-500' : 'bg-[#2d2d2d] text-[#858585]'}`}>
              <span>🧡 {designType === 'ui' ? 'part.html' : 'theme.php'}</span>
            </button>
            <button onClick={() => setActiveTab('css')} className={`px-4 py-2 border-r border-[#252526] transition ${activeTab === 'css' ? 'bg-[#1e1e1e] text-cyan-400 font-bold border-t border-t-cyan-500' : 'bg-[#2d2d2d] text-[#858585]'}`}>
              <span>💙 design.css</span>
            </button>
          </div>

          <div className="flex-1 flex font-mono text-xs bg-[#1e1e1e] p-2 min-h-[380px]">
            <div className="w-8 text-right pr-2 text-[#5a5a5a] border-r border-[#2d2d2d] space-y-0.5 leading-relaxed pt-0.5 text-[11px] select-none font-mono">
              {getLineNumbers(activeTab === 'code' ? htmlCode : cssCode).map((num) => <div key={num}>{num}</div>)}
            </div>
            {activeTab === 'code' ? (
              <textarea value={htmlCode} onChange={(e) => setHtmlCode(e.target.value)} className="flex-1 bg-transparent text-[#9cdcfe] pl-3 py-0.5 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left overflow-x-auto" style={{ caretColor: '#fff' }} />
            ) : (
              <textarea value={cssCode} onChange={(e) => setCssCode(e.target.value)} className="flex-1 bg-transparent text-[#ce9178] pl-3 py-0.5 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left overflow-x-auto" style={{ caretColor: '#fff' }} />
            )}
          </div>
        </div>

        {/* プレビュー画面 */}
        <div className="flex flex-col bg-[#252526] border border-[#3c3c3c] p-6 rounded-lg shadow-2xl justify-between">
          <div className="flex-1 flex flex-col">
            <h3 className="font-bold text-[#cccccc] text-xs uppercase tracking-wider mb-4">👀 PREVIEW（リアルタイム抽出）</h3>
            <style>{cssCode}</style>
            
            {/* デザインが一番映えるプロ仕様のチェッカー背景 */}
            <div 
              className="flex-1 rounded-lg p-10 min-h-[320px] flex items-center justify-center border border-[#3c3c3c] overflow-y-auto"
              style={{
                backgroundColor: '#141414',
                backgroundImage: 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: designType === 'ui' ? htmlCode : renderWpPreview(htmlCode) }} />
            </div>
          </div>
          <div className="mt-4 p-2.5 bg-[#1e1e1e] border border-[#3c3c3c] rounded text-[10px] text-slate-500 font-sans">
            💡 <strong>UIカタログの使い方:</strong> 上のカタログから好きなパーツを選んで、コードを自分流にアレンジしてみましょう。WordPressモードでは実戦で使うテンプレートタグの装飾を実験できます。
          </div>
        </div>

      </div>
    </div>
  );
}