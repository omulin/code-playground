import { useState } from 'react';

interface DesignAsset {
  id: string;
  category: 'java' | 'html_css' | 'wordpress';
  badge: string;
  title: string;
  desc: string;
  code: string;
  previewType: 'button' | 'card' | 'input' | 'badge_list' | 'info';
  previewData?: any;
}

// 👑 全20種類のガチ実戦テンプレート資産（Java 7個 / HTML・CSS 8個 / WP 5個）
const DESIGN_ASSETS: DesignAsset[] = [
  // --- ☕ JAVA (SWING CUSTOMS) ---
  {
    id: 'java-01',
    category: 'java',
    badge: 'Java 01',
    title: 'モダングラデーションボタン',
    desc: '標準の無骨なSwingボタンを、グラデーション・アンチエイリアス・手動角丸で今風のWebフロントエンド級に変貌させるカスタムJButtonクラス。',
    previewType: 'button',
    code: `import javax.swing.*;\nimport java.awt.*;\nimport java.awt.geom.RoundRectangle2D;\n\npublic class ModernGradientButton extends JButton {\n    public ModernGradientButton(String text) {\n        super(text);\n        setContentAreaFilled(false);\n        setFocusPainted(false);\n        setBorderPainted(false);\n        setForeground(Color.WHITE);\n        setFont(new Font("SansSerif", Font.BOLD, 14));\n        setCursor(new Cursor(Cursor.HAND_CURSOR));\n    }\n    @Override\n    protected void paintComponent(Graphics g) {\n        Graphics2D g2 = (Graphics2D) g.create();\n        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);\n        GradientPaint gp = new GradientPaint(0, 0, new Color(6, 182, 212), getWidth(), getHeight(), new Color(59, 130, 246));\n        g2.setPaint(gp);\n        g2.fill(new RoundRectangle2D.Double(0, 0, getWidth(), getHeight(), 16, 16));\n        super.paintComponent(g2);\n        g2.dispose();\n    }\n}`
  },
  {
    id: 'java-02',
    category: 'java',
    badge: 'Java 02',
    title: 'マテリアル・レイアウトカード',
    desc: '擬似ドロップシャドウ（影）と滑らかな角丸をJPanelのペイントメソッドで表現した、ダッシュボード等の情報をまとめるコンテナ。',
    previewType: 'card',
    code: `import javax.swing.*;\nimport java.awt.*;\nimport java.awt.geom.RoundRectangle2D;\n\npublic class MaterialCardPanel extends JPanel {\n    public MaterialCardPanel() {\n        setOpaque(false);\n        setBackground(new Color(30, 30, 40));\n    }\n    @Override\n    protected void paintComponent(Graphics g) {\n        Graphics2D g2 = (Graphics2D) g.create();\n        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);\n        g2.setColor(new Color(0, 0, 0, 45));\n        g2.fill(new RoundRectangle2D.Double(2, 4, getWidth()-4, getHeight()-6, 16, 16));\n        g2.setColor(getBackground());\n        g2.fill(new RoundRectangle2D.Double(0, 0, getWidth()-4, getHeight()-4, 16, 16));\n        g2.dispose();\n    }\n}`
  },
  {
    id: 'java-03',
    category: 'java',
    badge: 'Java 03',
    title: 'プレースホルダー入力フィールド',
    desc: '未入力時に薄いグレーのガイド用プレースホルダーを表示し、フォーカス時に自動消去するモダンなJTextField拡張。',
    previewType: 'input',
    code: `import javax.swing.*;\nimport java.awt.*;\nimport java.awt.event.*;\n\npublic class PlaceholderField extends JTextField {\n    private String ph = "入力してください...";\n    public PlaceholderField() {\n        setForeground(Color.GRAY);\n        setText(ph);\n        addFocusListener(new FocusAdapter() {\n            @Override\n            public void focusGained(FocusEvent e) {\n                if(getText().equals(ph)) { setText(""); setForeground(Color.WHITE); }\n            }\n        });\n    }\n}`
  },
  {
    id: 'java-04',
    category: 'java',
    badge: 'Java 04',
    title: '美化スクロールバーUI',
    desc: 'OS標準の太くて灰色のスクロールバーを駆逐し、VS Codeのような極細の半透明ホバーバーへとカスタムするUIクラス。',
    previewType: 'info',
    code: `import javax.swing.plaf.basic.BasicScrollBarUI;\nimport java.awt.*;\npublic class ModernScrollBarUI extends BasicScrollBarUI {\n    @Override\n    protected void paintTrack(Graphics g, JComponent c, Rectangle b) {\n        g.setColor(new Color(30, 30, 30));\n        g.fillRect(b.x, b.y, b.width, b.height);\n    }\n    @Override\n    protected void paintThumb(Graphics g, JComponent c, Rectangle b) {\n        Graphics2D g2 = (Graphics2D) g.create();\n        g2.setColor(new Color(80, 80, 80, 150));\n        g2.fillRect(b.x+2, b.y+2, b.width-4, b.height-4);\n        g2.dispose();\n    }\n}`
  },
  {
    id: 'java-05',
    category: 'java',
    badge: 'Java 05',
    title: 'フラットトースト通知 (Toast)',
    desc: '画面右下からフワッと浮き上がって数秒で自動消滅する、非同期スレッドを内包したマテリアルデザイン風のポップアップ通知コンポーネント。',
    previewType: 'info',
    code: `import javax.swing.*;\nimport java.awt.*;\npublic class ToastNotification extends JWindow {\n    public ToastNotification(String msg, int x, int y) {\n        JPanel p = new JPanel() {\n            protected void paintComponent(Graphics g) { g.setColor(new Color(0,0,0,200)); g.fillRoundRect(0,0,getWidth(),getHeight(),12,12); }\n        };\n        JLabel l = new JLabel(msg); l.setForeground(Color.WHITE);\n        p.add(l); add(p); pack(); setLocation(x, y);\n        new Thread(() -> { try { setVisible(true); Thread.sleep(2000); dispose(); }catch(Exception e){} }).start();\n    }\n}`
  },
  {
    id: 'java-06',
    category: 'java',
    badge: 'Java 06',
    title: 'ネオンLED境界線 (Custom Border)',
    desc: 'コンポーネントの周囲をサイバーパンクのLEDのように妖艶に発光させる、AntialiasedグラデーションStroke境界線クラス。',
    previewType: 'info',
    code: `import javax.swing.border.AbstractBorder;\nimport java.awt.*;\npublic class NeonBorder extends AbstractBorder {\n    @Override\n    public void paintBorder(Component c, Graphics g, int x, int y, int width, int height) {\n        Graphics2D g2 = (Graphics2D) g.create();\n        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);\n        g2.setStroke(new BasicStroke(3));\n        g2.setPaint(new GradientPaint(0,0,Color.CYAN,width,height,Color.MAGENTA));\n        g2.drawRoundRect(x+2,y+2,width-4,height-4,12,12);\n        g2.dispose();\n    }\n}`
  },
  {
    id: 'java-07',
    category: 'java',
    badge: 'Java 07',
    title: '半透明アクリルコンテナ',
    desc: '背後のコンポーネントをうっすらと透過・ブレンドさせ、高級なOSシェル（Windows 11のFluent Design）のような質感を作るJPanel。',
    previewType: 'card',
    code: `import javax.swing.*;\nimport java.awt.*;\npublic class AcrylicPanel extends JPanel {\n    public AcrylicPanel() { setOpaque(false); }\n    @Override\n    protected void paintComponent(Graphics g) {\n        Graphics2D g2 = (Graphics2D) g.create();\n        g2.setColor(new Color(255, 255, 255, 20)); // アルファ値20の極薄白\n        g2.fillRect(0, 0, getWidth(), getHeight());\n        g2.setColor(new Color(255, 255, 255, 40));\n        g2.drawRect(0, 0, getWidth()-1, getHeight()-1);\n        g2.dispose();\n    }\n}`
  },

  // --- 🌐 HTML / CSS (MODERN WEB ASSETS) ---
  {
    id: 'html-01',
    category: 'html_css',
    badge: 'HTML 01',
    title: 'ネオ・ブルータリズム風立体ボタン',
    desc: '太い黒ボーダーとオフセットされた強いドロップシャドウを組み合わせた、ポップでエッジの効いた最先端スタイル。',
    previewType: 'button',
    previewData: 'px-6 py-3 bg-amber-400 text-black border-4 border-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer rounded',
    code: `<button class="neo-btn">LAUNCH SYSTEM</button>\n\n<style>\n.neo-btn {\n  padding: 12px 24px; background: #fbbf24; border: 4px solid #000; font-weight: 900;\n  box-shadow: 4px 4px 0px 0px #000; transition: all 0.1s;\n}\n.neo-btn:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px #000; }\n</style>`
  },
  {
    id: 'html-02',
    category: 'html_css',
    badge: 'HTML 02',
    title: 'サイバーパンク・発光ネオンボタン',
    desc: 'ホバーすると怪しく美麗に発光（ネオンウェーブ）する、SF/サイバーテック・ダークテーマに完璧にマッチするアニメーションUI。',
    previewType: 'button',
    previewData: 'px-6 py-3 bg-transparent text-fuchsia-400 border-2 border-fuchsia-500 font-mono tracking-widest font-bold uppercase shadow-[0_0_15px_rgba(240,46,170,0.3)] hover:bg-fuchsia-500 hover:text-white hover:shadow-[0_0_25px_rgba(240,46,170,0.8)] transition-all duration-300 cursor-pointer rounded',
    code: `<button class="cyber-btn">INITIALIZE</button>\n\n<style>\n.cyber-btn {\n  padding: 12px 24px; background: transparent; color: #ff007f; border: 2px solid #ff007f;\n  box-shadow: 0 0 15px rgba(255, 0, 127, 0.3); transition: all 0.3s;\n}\n.cyber-btn:hover { background: #ff007f; color: #fff; box-shadow: 0 0 30px rgba(255, 0, 127, 0.8); }\n</style>`
  },
  {
    id: 'html-03',
    category: 'html_css',
    badge: 'HTML 03',
    title: '液体グラデーションテキスト',
    desc: '文字の中に美しいアニメーションする流体グラデーションを流し込み、テキストそのものをアート化するモダンCSSコーディング。',
    previewType: 'button',
    previewData: 'text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 bg-[size:200%_auto] animate-[pulse_3s_infinite] tracking-wider uppercase',
    code: `<h1 class="liquid-text">PREMIUM ASSET</h1>\n\n<style>\n.liquid-text {\n  font-size: 3rem; font-weight: 900; text-transparent: clip;\n  background: linear-gradient(to right, #06b6d4, #d946ef, #f59e0b);\n  -webkit-background-clip: text; color: transparent;\n}\n</style>`
  },
  {
    id: 'html-04',
    category: 'html_css',
    badge: 'HTML 04',
    title: 'インライン変形トグルスイッチ',
    desc: 'チェックボックスを完全にカスタムし、クリックすると中の丸が滑らかにスライド（滑空移動）する極上のCSSアニメーションスイッチ。',
    previewType: 'button',
    previewData: 'w-14 h-8 bg-cyan-600 rounded-full p-1 relative flex items-center shadow-inner cursor-pointer after:content-[""] after:w-6 after:h-6 after:bg-white after:rounded-full after:absolute after:right-1',
    code: `<label class="switch">\n  <input type="checkbox" checked>\n  <span class="slider"></span>\n</label>\n<style>\n.switch { position: relative; display: inline-block; width: 60px; height: 34px; }\n.slider { position: absolute; background: #ccc; border-radius: 34px; inset: 0; transition: .4s; }\ninput:checked + .slider { background: #06b6d4; }\n</style>`
  },
  {
    id: 'css-01',
    category: 'html_css',
    badge: 'CSS 01',
    title: 'グラスモルフィズム・UIカード',
    desc: '背景をすりガラスのように美しく透過させ、高級感と次元レイヤリングを表現するモダンWebカードコンテナ。',
    previewType: 'card',
    previewData: 'w-full max-w-md p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-left text-white',
    code: `<div class="glass-card">\n  <h3>Glassmorphism UI</h3>\n</div>\n\n<style>\n.glass-card {\n  padding: 24px; background: rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15);\n}\n</style>`
  },
  {
    id: 'css-02',
    category: 'html_css',
    badge: 'CSS 02',
    title: '3次元ホバーグリッドカード',
    desc: 'マウスカーソルの動きに合わせて傾斜（3D Tilt）しているかのように影と角度がダイナミックに変化する高難度アニメーション。',
    previewType: 'card',
    previewData: 'w-full max-w-sm p-6 bg-[#252526] border border-[#3e3e3e] rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-cyan-500/50 transition-all duration-300 text-slate-200 cursor-pointer',
    code: `<div class="tilt-card">Hover Me</div>\n\n<style>\n.tilt-card {\n  padding: 24px; background: #252526; border: 1px solid #3e3e3e; transition: all 0.3s;\n}\n.tilt-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); border-color: #06b6d4; }\n</style>`
  },
  {
    id: 'css-03',
    category: 'html_css',
    badge: 'CSS 03',
    title: 'スケルトンローディングローダー',
    desc: 'データの読み込み待ち（非同期フェッチ中）のUXを爆上げする、波打つように光る美しいプレースホルダーアニメーション。',
    previewType: 'card',
    previewData: 'w-full max-w-xs p-4 bg-[#1e1e1e] rounded-xl flex flex-col gap-3 animate-pulse',
    code: `<div class="skeleton-card">\n  <div class="skeleton-thumb animate-shimmer"></div>\n</div>\n<style>\n.skeleton-thumb {\n  width: 100%; height: 150px; background: #2a2a2a;\n  background-image: linear-gradient(90deg, #2a2a2a 0px, #3a3a3a 40px, #2a2a2a 8px);\n}\n</style>`
  },
  {
    id: 'css-04',
    category: 'html_css',
    badge: 'CSS 04',
    title: 'インフィニット無限画像スクロール',
    desc: '商品画像やロゴを、途切れることなく完全にシームレスに横方向へ無限ループで流し続けるガチ実務用の演出CSS。',
    previewType: 'badge_list',
    code: `<div class="slider-wrapper">\n  <div class="track"><span>ITEM</span><span>ITEM</span></div>\n</div>\n<style>\n@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }\n.track { display: flex; width: 200%; animation: scroll 20s linear infinite; }\n</style>`
  },

  // --- 📝 WORDPRESS (CORE & THEME UTILITIES) ---
  {
    id: 'wp-01',
    category: 'wordpress',
    badge: 'WP 01',
    title: '所属タクソノミー動起バッジ',
    desc: '記事一覧（メインループ）で、投稿に紐づいたカテゴリラベルを、カラーコード付きの美しいバッジとして動的に一括出力するPHPコード。',
    previewType: 'badge_list',
    code: `<?php\n$categories = get_the_category();\nif ( ! empty( $categories ) ) {\n    echo '<div class="wp-custom-badges flex gap-2">';\n    foreach ( $categories as $cat ) {\n        $link = get_category_link( $cat->term_id );\n        echo '<a href="'.esc_url($link).'" class="badge" style="background:#06b6d4; color:#fff; padding:4px 10px; border-radius:12px; font-size:11px; font-weight:bold; text-decoration:none;">';\n        echo esc_html( $cat->name );\n        echo '</a>';\n    }\n    echo '</div>';\n} ?>`
  },
  {
    id: 'wp-02',
    category: 'wordpress',
    badge: 'WP 02',
    title: '高精度閲覧数（PV）カウント関数',
    desc: 'プラグインの依存を完全に断ち切り、functions.phpに設置するだけで完全に軽量動作する、カスタムフィールドを活用したPV集計エンジン。',
    previewType: 'info',
    code: `// 【functions.php】PVカウントコアロジック\nfunction set_post_views($postID) {\n    $count_key = 'post_views_count';\n    $count = get_post_meta($postID, $count_key, true);\n    if($count == '') {\n        $count = 0; delete_post_meta($postID, $count_key); add_post_meta($postID, $count_key, '0');\n    } else {\n        $count++; update_post_meta($postID, $count_key, $count);\n    }\n}\nremove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);`
  },
  {
    id: 'wp-03',
    category: 'wordpress',
    badge: 'WP 03',
    title: 'スマホ追従フッターコンバージョンUI',
    desc: 'スマホ閲覧時のみ画面最下部にピタッと吸着し、電話・メール予約フォームへのクリック率（CVR）を極限まで引き上げる追従CSS/HTML。',
    previewType: 'info',
    code: `\n<div class="sp-fixed-cv-bar">\n  <a href="tel:000" class="cv-btn tel">📞 電話相談</a>\n  <a href="/contact" class="cv-btn mail">✉ WEB予約</a>\n</div>\n<style>\n@media (max-width: 767px) {\n  .sp-fixed-cv-bar { position: fixed; bottom: 0; left: 0; width: 100%; height: 60px; display: flex; z-index: 999; }\n  .cv-btn { flex: 1; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; }\n  .tel { background: #10b981; } .mail { background: #3b82f6; }\n}\n</style>`
  },
  {
    id: 'wp-04',
    category: 'wordpress',
    badge: 'WP 04',
    title: '管理者限定メンテナンス予告帯',
    desc: '管理者（Administrator）がログインしている時だけ、サイト最上部に真っ赤なシステムメンテナンス予告のバーを強制介入させる開発用スニペット。',
    previewType: 'info',
    code: `// 【functions.php】または header.php の冒頭にインクルード\nif ( current_user_can('administrator') ) {\n    echo '<div style="background:#ef4444; color:#fff; text-align:center; padding:8px; font-size:12px; font-weight:bold; position:sticky; top:0; z-index:99999;">';\n    echo '⚠️ 管理者ログイン中: 本日は22:00よりサーバーメンテナンスを実施します。';\n    echo '</div>';\n}`
  },
  {
    id: 'wp-05',
    category: 'wordpress',
    badge: 'WP 05',
    title: 'ダッシュボード完全クリーンアップ',
    desc: 'WordPressの管理画面トップにある、クライアントにとって邪魔でしかない「クイックドラフト」や「ニュース」などの既存ウィジェットを一斉駆逐する関数。',
    previewType: 'info',
    code: `// 【functions.php】不要ウィジェットを一網打尽\nfunction remove_dashboard_widgets() {\n    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');\n    remove_meta_box('dashboard_primary', 'dashboard', 'side');\n    remove_meta_box('dashboard_right_now', 'dashboard', 'normal');\n    remove_meta_box('dashboard_activity', 'dashboard', 'normal');\n}\nadd_action('wp_dashboard_setup', 'remove_dashboard_widgets');`
  }
];

export default function DesignLab() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedAsset = DESIGN_ASSETS[currentIdx];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#141414] overflow-hidden select-none font-sans text-left">
      
      {/* 🌐 最上部ヘッダー */}
      <header className="bg-[#252526] border-b border-[#3c3c3c] px-4 py-2 flex justify-between items-center shrink-0 w-full z-10 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-amber-500 text-amber-950 px-2 py-0.5 rounded font-mono">ASSET SHOWCASE v5.5</span>
          <h2 className="text-xs font-bold text-slate-200">🔮 DesignLab - 実戦開発リソースハブ（ライブ見本機能搭載）</h2>
        </div>
      </header>

      {/* 👑 【上段】：パノラマ・ステージ選択（全20個が横一列にズラリ！） */}
      <div className="bg-[#1e1e1e] border-b border-[#3c3c3c] px-3 py-2 flex gap-3 overflow-x-auto text-xs items-center shrink-0 w-full scrollbar-hide">
        <span className="text-[10px] font-bold text-[#858585] uppercase font-mono px-2 shrink-0">ASSET POOL:</span>
        {DESIGN_ASSETS.map((asset, idx) => (
          <button
            key={asset.id}
            onClick={() => setCurrentIdx(idx)}
            className={`px-4 py-2 rounded-lg font-mono text-[11px] border-2 flex flex-col items-start gap-1 transition shrink-0 min-w-[150px] ${
              currentIdx === idx 
                ? 'bg-[#2d2d2d] text-amber-400 border-amber-500 font-bold shadow-lg shadow-black/50' 
                : 'bg-[#141414] text-slate-400 border-transparent hover:bg-[#252526] hover:text-slate-200'
            }`}
          >
            <div className="flex justify-between w-full items-center">
              <span className="text-[10px] opacity-60">#{asset.badge}</span>
              <span className={`text-[8px] px-1 rounded font-black uppercase ${
                asset.category === 'java' ? 'bg-fuchsia-500/20 text-fuchsia-400' : asset.category === 'html_css' ? 'bg-sky-500/20 text-sky-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>{asset.category}</span>
            </div>
            <span className="text-[11px] font-bold truncate w-full tracking-tight">{asset.title}</span>
          </button>
        ))}
      </div>

      {/* 👑 【中段】：Design Canvas ＆ 説明エリア */}
      <div className="flex-1 flex overflow-hidden w-full relative border-b border-[#2d2d2d]">
        
        {/* 左側：リアルグラフィックスキャンバス（見本表示） */}
        <main className="flex-1 flex flex-col bg-[#141414] relative overflow-hidden h-full">
          <div className="bg-[#1e1e1e] text-amber-500 font-bold text-[10px] px-3 py-2 uppercase tracking-wider select-none shrink-0 border-b border-[#2d2d2d] font-mono flex justify-between items-center">
            <span>🎨 DESIGN CANVAS (LIVE PREVIEW)</span>
            <span className="text-[9px] text-slate-500 font-bold font-mono">RENDERED SUITE</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-tr from-[#111] via-[#16161a] to-[#111] shadow-inner overflow-auto relative">
            
            {/* 1. ボタン系プレビュー */}
            {selectedAsset.previewType === 'button' && (
              <button className={selectedAsset.previewData || "px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-lg cursor-pointer"}>
                {selectedAsset.title}
              </button>
            )}

            {/* 2. カード・コンテナ系プレビュー */}
            {selectedAsset.previewType === 'card' && (
              <div className={selectedAsset.previewData || "p-6 bg-[#252526] border border-[#3c3c3c] rounded-xl text-slate-300 text-sm max-w-sm"}>
                <h4 className="font-bold text-white text-base mb-2">✨ {selectedAsset.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">ボスのアプリケーションの美学を決定づけるコンポーネントです。ホバーやコンテキストをお試しください。</p>
              </div>
            )}

            {/* 3. 入力フォーム系プレビュー */}
            {selectedAsset.previewType === 'input' && (
              <div className="w-full max-w-sm flex flex-col gap-2">
                <label className="text-slate-400 text-xs font-mono">PlaceholderField Demo:</label>
                <input 
                  type="text" 
                  placeholder="入力してください..." 
                  className="w-full px-4 py-2.5 bg-[#1e1e1e] border border-[#3c3c3c] text-white text-sm rounded-lg outline-none focus:border-cyan-500 font-mono transition-all"
                />
              </div>
            )}

            {/* 4. バッジリストモックプレビュー */}
            {selectedAsset.previewType === 'badge_list' && (
              <div className="flex flex-col items-center gap-3">
                <span className="text-xs text-slate-500 font-mono">Dynamic Output Mock:</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-xs rounded-full">WordPress</span>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-xs rounded-full">開発ノウハウ</span>
                  <span className="px-3 py-1 bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 font-bold text-xs rounded-full">お気に入り</span>
                </div>
              </div>
            )}

            {/* 5. ロジック・ユーティリティ系説明表示 */}
            {selectedAsset.previewType === 'info' && (
              <div className="p-5 bg-slate-900/60 border border-slate-700/50 text-cyan-400 text-xs font-mono rounded-xl max-w-md leading-relaxed shadow-xl backdrop-blur">
                <div className="flex items-center gap-2 mb-2 text-sm font-bold text-white">
                  <span>💡</span> バックエンド・コアスクリプト
                </div>
                このアセットはUIパーツではなく、コアシステム（Javaグラフィックススレッド、またはWPフックシステム）の深淵で静かに動作する高効率スニペットです。下のソースコードをコピーして対象ファイルへ組み込んでください。
              </div>
            )}
          </div>
        </main>

        {/* 右側：アセットの解説詳細 */}
        <aside className="w-[380px] bg-[#1e1e1e] border-l border-[#3c3c3c] flex flex-col shrink-0 h-full">
          <div className="bg-[#1e1e1e] text-rose-400 font-bold text-[10px] px-3 py-2 uppercase tracking-wider select-none shrink-0 border-b border-2d2d2d font-mono">
            🎯 ASSET DESCRIPTION
          </div>
          <div className="p-5 bg-[#252526] flex-1 overflow-y-auto">
            <h3 className="text-white font-black text-[15px] mb-2">{selectedAsset.title}</h3>
            <p className="text-slate-300 text-[12px] leading-relaxed font-bold bg-[#141414] p-4 border border-[#3c3c3c] rounded shadow-inner">
              {selectedAsset.desc}
            </p>
          </div>
        </aside>
      </div>

      {/* 👑 【下段】：ソースコード閲覧 ＆ 爆速コピーエリア */}
      <footer className="h-[240px] bg-[#0a0a0a] border-t border-[#3c3c3c] flex overflow-hidden shrink-0 w-full">
        <div className="flex-1 p-4 overflow-y-auto font-mono text-[12.5px] flex flex-col gap-1 border-r border-[#2d2d2d] text-left relative selection:bg-slate-800">
          <div className="text-slate-500 mb-1 border-b border-[#222] pb-1 select-none font-mono">Source Code Clean Asset</div>
          <pre className="text-[#9cdcfe] leading-relaxed whitespace-pre font-mono">
            <code>{selectedAsset.code}</code>
          </pre>
        </div>

        <div className="w-[240px] bg-[#1e1e1e] p-4 flex items-center justify-center shrink-0">
          <button 
            onClick={() => handleCopy(selectedAsset.code)} 
            className={`w-full h-full font-black rounded-xl text-[13px] uppercase tracking-widest transition-all shadow-2xl flex flex-col items-center justify-center gap-2 cursor-pointer ${
              copied ? 'bg-emerald-600 text-white' : 'bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-amber-950 active:scale-95'
            }`}
          >
            <span className="text-xl">{copied ? '✔' : '📋'}</span>
            <span>{copied ? 'COPIED!!' : 'COPY ASSET'}</span>
          </button>
        </div>
      </footer>

    </div>
  );
}