import type { TraceStage } from './traceTypes';

export const traceDataBeginner: TraceStage[] = [
  // ☕ 【Stage 1】モダンカフェ
  {
    id: 1,
    category: '初級：ガチ連動Webサイト',
    title: '初級 01：モダンカフェのWebサイト',
    description: 'インラインスタイルを排除し、クラス名で装飾を管理する基本です。',
    mission: 'カフェのトップページと概要ページ、そして専用CSSを完全に書き写してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="cafe-wrapper">\n  \n</div>',
        correctCode: `\n<div class="cafe-wrapper">\n  <header class="cafe-header">\n    <h1>☕ MOON CAFE</h1>\n    <nav><a href="index.html" class="active">Home</a><a href="about.html">About</a></nav>\n  </header>\n  <main class="cafe-main">\n    <section class="hero">\n      <h2>月明かりが照らす、最高の一杯。</h2>\n      <p>都会の喧騒を忘れ、静寂に包まれた極上の空間でこだわりの自家焙煎珈琲を。</p>\n      <a href="about.html" class="btn-primary">こだわりを見る</a>\n    </section>\n    <section class="info">\n      <h3>OPEN HOUR</h3>\n      <p>平日・土日 : 11:00 - 21:00 (水曜定休)</p>\n    </section>\n  </main>\n  <footer class="cafe-footer">&copy; 2026 MOON CAFE</footer>\n</div>`
      },
      {
        fileName: 'about.html',
        language: 'html',
        initialCode: '<div class="cafe-wrapper">\n  \n</div>',
        correctCode: `\n<div class="cafe-wrapper">\n  <header class="cafe-header">\n    <h1>☕ MOON CAFE</h1>\n    <nav><a href="index.html">Home</a><a href="about.html" class="active">About</a></nav>\n  </header>\n  <main class="cafe-main">\n    <section class="story">\n      <h2>私たちのこだわり</h2>\n      <p>世界中の農園から直接買い付けた最高品質のスペシャリティコーヒーのみを使用。</p>\n      <p>その日の気温や湿度に合わせて微調整する焙煎技術でコクを引き出します。</p>\n      <a href="index.html" class="btn-secondary">⬅ トップへ戻る</a>\n    </section>\n  </main>\n  <footer class="cafe-footer">&copy; 2026 MOON CAFE</footer>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Cafe Style */\n.cafe-wrapper {\n  \n}',
        correctCode: `/* Cafe Style */\n.cafe-wrapper { font-family: sans-serif; background: #faf6f0; color: #433422; }\n.cafe-header { display: flex; justify-content: space-between; padding: 15px; background: #fff; border-bottom: 1px solid #e8dec9; }\n.cafe-header h1 { font-size: 18px; margin: 0; }\n.cafe-header a { margin-left: 15px; text-decoration: none; color: #8c6239; }\n.cafe-header a.active { font-weight: bold; color: #ef4444; }\n.cafe-main { padding: 30px 15px; text-align: center; }\n.hero h2 { font-size: 22px; margin-bottom: 10px; }\n.hero p, .story p { font-size: 13px; color: #666; line-height: 1.6; }\n.btn-primary { display: inline-block; background: #8c6239; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 15px; }\n.btn-secondary { display: inline-block; color: #8c6239; text-decoration: none; margin-top: 15px; border-bottom: 1px solid #8c6239; }\n.info { margin-top: 40px; background: #fff; padding: 15px; border: 1px solid #e8dec9; }\n.cafe-footer { text-align: center; padding: 15px; background: #2c1d11; color: #a8927e; font-size: 10px; }`
      }
    ]
  },

  // 🧑‍💻 【Stage 2】ポートフォリオ
  {
    id: 2,
    category: '初級：ガチ連動Webサイト',
    title: '初級 02：個人のポートフォリオサイト',
    description: '自己紹介とスキルセットをまとめたダークモードのポートフォリオです。',
    mission: 'HTMLのリスト構造と、ダークテーマのCSSデザインを完全に結合させてください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="portfolio-wrap">\n  \n</div>',
        correctCode: `\n<div class="portfolio-wrap">\n  <nav class="port-nav">\n    <div class="port-logo">JOHN DOE</div>\n    <div class="port-links"><a href="index.html" class="current">PROFILE</a><a href="works.html">WORKS</a></div>\n  </nav>\n  <div class="port-content">\n    <img src="https://via.placeholder.com/80" alt="avatar" class="avatar">\n    <h2>Frontend Developer</h2>\n    <p>ReactとTypeScriptを愛するエンジニアです。美しいUIの実装を得意としています。</p>\n    <ul class="skills">\n      <li>HTML/CSS</li>\n      <li>JavaScript</li>\n      <li>React</li>\n    </ul>\n  </div>\n</div>`
      },
      {
        fileName: 'works.html',
        language: 'html',
        initialCode: '<div class="portfolio-wrap">\n  \n</div>',
        correctCode: `\n<div class="portfolio-wrap">\n  <nav class="port-nav">\n    <div class="port-logo">JOHN DOE</div>\n    <div class="port-links"><a href="index.html">PROFILE</a><a href="works.html" class="current">WORKS</a></div>\n  </nav>\n  <div class="port-content">\n    <h2>My Projects</h2>\n    <div class="project-card">\n      <h3>TraceLab IDE</h3>\n      <p>24インチ大画面に最適化した究極の写経・開発環境ツール。</p>\n    </div>\n    <div class="project-card">\n      <h3>Moon Cafe</h3>\n      <p>モダンなカフェのランディングページ実装。</p>\n    </div>\n  </div>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Portfolio Style */\n.portfolio-wrap {\n  \n}',
        correctCode: `/* Portfolio Style */\n.portfolio-wrap { font-family: monospace; background: #0f172a; color: #f8fafc; min-height: 400px; padding: 20px; }\n.port-nav { display: flex; justify-content: space-between; border-bottom: 1px solid #1e293b; padding-bottom: 15px; margin-bottom: 20px; }\n.port-logo { font-weight: bold; color: #38bdf8; }\n.port-links a { color: #94a3b8; text-decoration: none; margin-left: 15px; }\n.port-links a.current { color: #38bdf8; border-bottom: 1px solid #38bdf8; }\n.port-content { text-align: center; }\n.avatar { border-radius: 50%; border: 2px solid #38bdf8; margin-bottom: 15px; }\n.skills { list-style: none; padding: 0; display: flex; justify-content: center; gap: 10px; margin-top: 20px; }\n.skills li { background: #1e293b; padding: 5px 10px; border-radius: 4px; font-size: 11px; }\n.project-card { background: #1e293b; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: left; border-left: 3px solid #38bdf8; }\n.project-card h3 { margin: 0 0 5px 0; color: #f8fafc; }\n.project-card p { margin: 0; font-size: 12px; color: #94a3b8; }`
      }
    ]
  },

  // 🏢 【Stage 3】企業サイト
  {
    id: 3,
    category: '初級：ガチ連動Webサイト',
    title: '初級 03：ITベンチャーのコーポレートサイト',
    description: 'カチッとした信頼感のある企業サイトの2カラムレイアウトです。',
    mission: 'サイドバー付きのレイアウトをFlexboxで正確に組み上げてください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="corp-container">\n  \n</div>',
        correctCode: `\n<div class="corp-container">\n  <header class="corp-top">\n    <div class="corp-brand">TECH STARTUP</div>\n  </header>\n  <div class="corp-flex">\n    <main class="corp-main">\n      <h2>社会をアップデートする</h2>\n      <p>私たちは最先端のAI技術を用いて、誰もが使いやすいシステムを開発しています。</p>\n      <a href="service.html" class="corp-btn">事業内容を見る ➔</a>\n    </main>\n    <aside class="corp-side">\n      <h4>NEWS</h4>\n      <ul>\n        <li>2026.05.01 - サイト公開</li>\n        <li>2026.04.15 - 資金調達</li>\n      </ul>\n    </aside>\n  </div>\n</div>`
      },
      {
        fileName: 'service.html',
        language: 'html',
        initialCode: '<div class="corp-container">\n  \n</div>',
        correctCode: `\n<div class="corp-container">\n  <header class="corp-top">\n    <div class="corp-brand">TECH STARTUP</div>\n  </header>\n  <div class="corp-flex">\n    <main class="corp-main">\n      <h2>事業内容</h2>\n      <div class="service-box">\n        <h3>システム受託開発</h3>\n        <p>お客様の課題を解決する最適なWebアプリケーションを構築します。</p>\n      </div>\n      <a href="index.html" class="corp-link">⬅ 会社概要へ戻る</a>\n    </main>\n    <aside class="corp-side">\n      <h4>LINKS</h4>\n      <ul>\n        <li><a href="index.html">会社概要</a></li>\n        <li><a href="service.html">事業内容</a></li>\n      </ul>\n    </aside>\n  </div>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Corporate Style */\n.corp-container {\n  \n}',
        correctCode: `/* Corporate Style */\n.corp-container { font-family: sans-serif; background: #f3f4f6; color: #1f2937; padding: 20px; }\n.corp-top { background: #1e3a8a; color: #fff; padding: 15px; border-radius: 6px 6px 0 0; }\n.corp-brand { font-weight: bold; font-size: 16px; letter-spacing: 2px; }\n.corp-flex { display: flex; gap: 15px; margin-top: 15px; }\n.corp-main { flex: 3; background: #fff; padding: 20px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }\n.corp-side { flex: 1; background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb; font-size: 12px; }\n.corp-side h4 { border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-top: 0; }\n.corp-side ul { list-style: none; padding: 0; margin: 0; }\n.corp-side li { margin-bottom: 8px; color: #4b5563; }\n.corp-btn { display: inline-block; background: #1e3a8a; color: #fff; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 12px; margin-top: 10px; }\n.service-box { border: 1px solid #e5e7eb; padding: 10px; border-left: 4px solid #1e3a8a; margin-bottom: 15px; }\n.corp-link { color: #1e3a8a; font-size: 12px; text-decoration: none; }`
      }
    ]
  },

  // 🎸 【Stage 4】イベントLP
  {
    id: 4,
    category: '初級：ガチ連動Webサイト',
    title: '初級 04：音楽フェスの特設ランディングページ',
    description: '派手なカラーと大きな文字でインパクトを与えるイベントサイトです。',
    mission: '黒背景にネオンカラーを効かせたCSS装飾をマスターしてください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="fes-bg">\n  \n</div>',
        correctCode: `\n<div class="fes-bg">\n  <div class="fes-header">\n    <h1>ROCK FESTIVAL 2026</h1>\n    <nav><a href="index.html" class="neon">TOP</a><a href="ticket.html">TICKET</a></nav>\n  </div>\n  <div class="fes-hero">\n    <h2 class="glitch">FEEL THE BEAT.</h2>\n    <p>過去最大規模の野外フェスが遂に開幕。</p>\n    <a href="ticket.html" class="buy-btn">TICKET NOW ➔</a>\n  </div>\n  <div class="lineup">\n    <h3>LINE UP</h3>\n    <div class="artist">The Echoes</div>\n    <div class="artist">Neon Lights</div>\n  </div>\n</div>`
      },
      {
        fileName: 'ticket.html',
        language: 'html',
        initialCode: '<div class="fes-bg">\n  \n</div>',
        correctCode: `\n<div class="fes-bg">\n  <div class="fes-header">\n    <h1>ROCK FESTIVAL 2026</h1>\n    <nav><a href="index.html">TOP</a><a href="ticket.html" class="neon">TICKET</a></nav>\n  </div>\n  <div class="fes-hero">\n    <h2 class="glitch">TICKET INFO</h2>\n    <p>全席指定・先行抽選受付中</p>\n    <div class="ticket-card">\n      <h4>■ 2DAYS VIP PASS</h4>\n      <span class="price">¥25,000</span>\n    </div>\n    <a href="index.html" class="back-link">⬅ TOPへ戻る</a>\n  </div>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Festival Style */\n.fes-bg {\n  \n}',
        correctCode: `/* Festival Style */\n.fes-bg { font-family: 'Impact', sans-serif; background: #000; color: #fff; min-height: 400px; padding: 20px; }\n.fes-header { display: flex; justify-content: space-between; border-bottom: 1px solid #333; padding-bottom: 10px; }\n.fes-header h1 { margin: 0; font-size: 20px; color: #facc15; }\n.fes-header a { color: #fff; text-decoration: none; margin-left: 15px; }\n.neon { color: #ec4899 !important; text-shadow: 0 0 10px #ec4899; }\n.fes-hero { text-align: center; padding: 40px 0; }\n.glitch { font-size: 32px; letter-spacing: 4px; color: #22d3ee; margin-bottom: 10px; }\n.buy-btn { display: inline-block; background: #ec4899; color: #fff; padding: 12px 24px; font-size: 16px; text-decoration: none; font-weight: bold; border-radius: 4px; margin-top: 20px; }\n.lineup { border: 1px solid #333; padding: 15px; text-align: center; }\n.artist { font-size: 18px; margin: 10px 0; border-bottom: 1px dashed #444; }\n.ticket-card { border: 2px solid #facc15; padding: 20px; margin: 20px auto; max-width: 300px; }\n.price { font-size: 24px; color: #22d3ee; }\n.back-link { display: block; margin-top: 20px; color: #9ca3af; text-decoration: none; }`
      }
    ]
  },

  // 📱 【Stage 5】アプリ紹介ページ
  {
    id: 5,
    category: '初級：ガチ連動Webサイト',
    title: '初級 05：スマホアプリのプロモーションサイト',
    description: '丸みを帯びたポップなデザインと、特徴を伝えるシンプルな構成です。',
    mission: '角丸（border-radius）と鮮やかな背景色を活用してコーディングしてください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="app-promo">\n  \n</div>',
        correctCode: `\n<div class="app-promo">\n  <header class="promo-header">\n    <div class="app-name">✓ TaskMaster</div>\n    <nav><a href="index.html" class="active-tab">ホーム</a><a href="feature.html">機能</a></nav>\n  </header>\n  <main class="promo-main">\n    <div class="catch-copy">\n      <h2>タスク管理を、もっと直感的に。</h2>\n      <p>シンプルなスワイプ操作で、あなたの1日をデザインします。</p>\n      <button class="dl-btn">Download Now</button>\n    </div>\n    <div class="mockup-img">📱 UI SCREEN</div>\n  </main>\n</div>`
      },
      {
        fileName: 'feature.html',
        language: 'html',
        initialCode: '<div class="app-promo">\n  \n</div>',
        correctCode: `\n<div class="app-promo">\n  <header class="promo-header">\n    <div class="app-name">✓ TaskMaster</div>\n    <nav><a href="index.html">ホーム</a><a href="feature.html" class="active-tab">機能</a></nav>\n  </header>\n  <main class="promo-main flex-col">\n    <h2>3つの特徴</h2>\n    <div class="feature-list">\n      <div class="f-item">① 爆速のスワイプ完了機能</div>\n      <div class="f-item">② グラフによる自動分析</div>\n      <div class="f-item">③ クラウド完全同期</div>\n    </div>\n    <a href="index.html" class="back-text">⬅ 戻る</a>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* App Promo Style */\n.app-promo {\n  \n}',
        correctCode: `/* App Promo Style */\n.app-promo { font-family: 'Helvetica', sans-serif; background: #fafafa; color: #333; padding: 20px; }\n.promo-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }\n.app-name { font-size: 18px; font-weight: bold; color: #8b5cf6; }\n.promo-header a { text-decoration: none; color: #9ca3af; margin-left: 15px; font-size: 14px; }\n.active-tab { color: #8b5cf6 !important; font-weight: bold; }\n.promo-main { display: flex; gap: 20px; align-items: center; }\n.promo-main.flex-col { flex-direction: column; align-items: flex-start; }\n.catch-copy { flex: 1; }\n.catch-copy h2 { font-size: 24px; line-height: 1.4; color: #1f2937; margin-bottom: 10px; }\n.catch-copy p { font-size: 13px; color: #6b7280; margin-bottom: 20px; }\n.dl-btn { background: #8b5cf6; color: #fff; border: none; padding: 12px 24px; border-radius: 30px; font-size: 14px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(139,92,246,0.3); }\n.mockup-img { flex: 1; background: #ede9fe; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 20px; color: #8b5cf6; font-weight: bold; }\n.feature-list { width: 100%; }\n.f-item { background: #fff; padding: 15px; border-radius: 10px; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border-left: 4px solid #8b5cf6; }\n.back-text { margin-top: 15px; color: #8b5cf6; text-decoration: none; font-size: 12px; }`
      }
    ]
  },

  // ✂️ 【Stage 6】美容室サイト
  {
    id: 6,
    category: '初級：ガチ連動Webサイト',
    title: '初級 06：ヘアサロンの予約サイト',
    description: '白とベージュを基調とした、清潔感と透明感のあるデザイン構成です。',
    mission: '余白（padding/margin）を丁寧に打ち込み、優雅なデザインを再現してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="salon-base">\n  \n</div>',
        correctCode: `\n<div class="salon-base">\n  <header class="salon-head">\n    <div class="s-logo">Lumière Hair</div>\n    <nav><a href="index.html" class="s-active">Home</a><a href="menu.html">Menu</a></nav>\n  </header>\n  <div class="s-hero">\n    <h2>あなたの日常に、一筋の光を。</h2>\n    <p>髪質改善とオーガニックカラーの専門店</p>\n  </div>\n  <div class="s-reserve">\n    <p>お電話でのご予約</p>\n    <div class="tel">012-3456-7890</div>\n    <a href="menu.html" class="s-btn">メニューを見る ➔</a>\n  </div>\n</div>`
      },
      {
        fileName: 'menu.html',
        language: 'html',
        initialCode: '<div class="salon-base">\n  \n</div>',
        correctCode: `\n<div class="salon-base">\n  <header class="salon-head">\n    <div class="s-logo">Lumière Hair</div>\n    <nav><a href="index.html">Home</a><a href="menu.html" class="s-active">Menu</a></nav>\n  </header>\n  <div class="s-menu-list">\n    <h3>PRICE LIST</h3>\n    <ul class="prices">\n      <li><span>Cut</span> <span>¥5,500</span></li>\n      <li><span>Organic Color</span> <span>¥8,800</span></li>\n      <li><span>Head Spa</span> <span>¥4,000</span></li>\n    </ul>\n    <a href="index.html" class="s-back">⬅ 戻る</a>\n  </div>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Salon Style */\n.salon-base {\n  \n}',
        correctCode: `/* Salon Style */\n.salon-base { font-family: serif; background: #fffcf9; color: #5c544d; padding: 0 20px 30px; }\n.salon-head { display: flex; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid #efe8e1; }\n.s-logo { font-size: 20px; letter-spacing: 2px; }\n.salon-head a { text-decoration: none; color: #a39b94; margin-left: 20px; font-size: 13px; }\n.s-active { color: #5c544d !important; }\n.s-hero { text-align: center; padding: 50px 0; }\n.s-hero h2 { font-weight: normal; font-size: 22px; margin-bottom: 15px; }\n.s-hero p { font-size: 12px; color: #8a827b; }\n.s-reserve { background: #efe8e1; padding: 30px; text-align: center; border-radius: 4px; }\n.tel { font-size: 24px; font-weight: bold; margin: 10px 0 20px; letter-spacing: 1px; }\n.s-btn { display: inline-block; background: #5c544d; color: #fff; padding: 10px 30px; text-decoration: none; font-size: 12px; }\n.s-menu-list { padding: 40px 0; }\n.s-menu-list h3 { text-align: center; font-weight: normal; letter-spacing: 2px; border-bottom: 1px solid #efe8e1; padding-bottom: 10px; }\n.prices { list-style: none; padding: 0; }\n.prices li { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px dashed #efe8e1; font-size: 14px; }\n.s-back { display: block; text-align: center; margin-top: 30px; color: #8a827b; text-decoration: none; font-size: 12px; }`
      }
    ]
  },

  // 🏋️‍♂️ 【Stage 7】フィットネスジム
  {
    id: 7,
    category: '初級：ガチ連動Webサイト',
    title: '初級 07：24時間営業フィットネスジム',
    description: '力強いフォントとコントラストでアクティブな印象を与えるサイトです。',
    mission: '大文字（uppercase）や太字の指定を正確に行い、パワフルなデザインを作ります。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="gym-wrap">\n  \n</div>',
        correctCode: `\n<div class="gym-wrap">\n  <header class="gym-head">\n    <div class="g-logo">IRON 24 FITNESS</div>\n    <nav><a href="index.html" class="g-current">TOP</a><a href="join.html">JOIN</a></nav>\n  </header>\n  <main class="g-main">\n    <h2 class="g-hero">限界を越えろ。</h2>\n    <p class="g-sub">24時間365日、あなたの挑戦を待っている最新のマシン設備。</p>\n    <div class="g-features">\n      <div class="g-box">初心者歓迎</div>\n      <div class="g-box">シャワー完備</div>\n    </div>\n    <a href="join.html" class="g-action">入会案内へ ➔</a>\n  </main>\n</div>`
      },
      {
        fileName: 'join.html',
        language: 'html',
        initialCode: '<div class="gym-wrap">\n  \n</div>',
        correctCode: `\n<div class="gym-wrap">\n  <header class="gym-head">\n    <div class="g-logo">IRON 24 FITNESS</div>\n    <nav><a href="index.html">TOP</a><a href="join.html" class="g-current">JOIN</a></nav>\n  </header>\n  <main class="g-main">\n    <h2 class="g-title">MEMBERSHIP</h2>\n    <div class="g-plan">\n      <h3>レギュラー会員</h3>\n      <p>月額 ¥7,480 (税込)</p>\n      <span>全店舗利用可能</span>\n    </div>\n    <a href="index.html" class="g-back">⬅ ホームに戻る</a>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Gym Style */\n.gym-wrap {\n  \n}',
        correctCode: `/* Gym Style */\n.gym-wrap { font-family: 'Arial Black', Impact, sans-serif; background: #111; color: #eee; min-height: 400px; padding: 20px; }\n.gym-head { display: flex; justify-content: space-between; border-bottom: 3px solid #dc2626; padding-bottom: 10px; }\n.g-logo { font-size: 20px; color: #fff; }\n.gym-head a { color: #666; text-decoration: none; margin-left: 15px; font-family: sans-serif; font-weight: bold; }\n.g-current { color: #dc2626 !important; }\n.g-main { padding: 40px 0; text-align: center; }\n.g-hero { font-size: 36px; margin: 0 0 10px 0; color: #dc2626; }\n.g-sub { font-family: sans-serif; font-size: 12px; color: #aaa; margin-bottom: 30px; }\n.g-features { display: flex; justify-content: center; gap: 15px; margin-bottom: 30px; }\n.g-box { border: 2px solid #333; padding: 10px 20px; font-family: sans-serif; font-weight: bold; font-size: 12px; }\n.g-action { display: inline-block; background: #dc2626; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 16px; text-transform: uppercase; }\n.g-title { font-size: 28px; color: #fff; }\n.g-plan { background: #222; padding: 20px; border-left: 5px solid #dc2626; text-align: left; max-width: 300px; margin: 0 auto; }\n.g-plan h3 { margin: 0 0 10px 0; font-family: sans-serif; }\n.g-plan p { font-size: 20px; color: #dc2626; margin: 0 0 5px 0; }\n.g-plan span { font-family: sans-serif; font-size: 11px; color: #888; }\n.g-back { display: block; margin-top: 30px; color: #666; font-family: sans-serif; text-decoration: none; }`
      }
    ]
  },

  // 📝 【Stage 8】テックブログ
  {
    id: 8,
    category: '初級：ガチ連動Webサイト',
    title: '初級 08：エンジニア向け技術ブログ',
    description: '記事の一覧と、記事詳細ページをリンクで行き来するブログ構造です。',
    mission: '記事のカードレイアウトと、タグのバッジデザインをCSSで表現してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="blog-container">\n  \n</div>',
        correctCode: `\n<div class="blog-container">\n  <header class="b-header">\n    <div class="b-title">DevLog.</div>\n    <nav><a href="index.html" class="active">Articles</a><a href="post.html">Latest</a></nav>\n  </header>\n  <main class="b-main">\n    <h2>Latest Posts</h2>\n    <article class="post-card">\n      <span class="tag">React</span>\n      <h3><a href="post.html">React Hooksの使い分け完全ガイド</a></h3>\n      <p>2026.05.10 - useStateとuseEffectの基礎から応用まで。</p>\n    </article>\n    <article class="post-card">\n      <span class="tag">CSS</span>\n      <h3>Grid Layoutでタイルを作る方法</h3>\n      <p>2026.04.22 - 複雑なレイアウトもGridなら数行で完結。</p>\n    </article>\n  </main>\n</div>`
      },
      {
        fileName: 'post.html',
        language: 'html',
        initialCode: '<div class="blog-container">\n  \n</div>',
        correctCode: `\n<div class="blog-container">\n  <header class="b-header">\n    <div class="b-title">DevLog.</div>\n    <nav><a href="index.html">Articles</a><a href="post.html" class="active">Latest</a></nav>\n  </header>\n  <main class="b-main">\n    <article class="single-post">\n      <span class="tag">React</span>\n      <h1>React Hooksの使い分け完全ガイド</h1>\n      <div class="date">Published on 2026.05.10</div>\n      <div class="content">\n        <p>Reactでの開発において、状態管理は非常に重要です。この記事では...</p>\n      </div>\n    </article>\n    <a href="index.html" class="b-home">⬅ 記事一覧に戻る</a>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Blog Style */\n.blog-container {\n  \n}',
        correctCode: `/* Blog Style */\n.blog-container { font-family: -apple-system, sans-serif; background: #fff; color: #333; max-width: 600px; margin: 0 auto; }\n.b-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #eaeaea; }\n.b-title { font-size: 20px; font-weight: 800; }\n.b-header a { text-decoration: none; color: #888; margin-left: 15px; font-size: 14px; }\n.b-header a.active { color: #2563eb; font-weight: bold; }\n.b-main { padding: 20px; }\n.b-main h2 { border-left: 4px solid #2563eb; padding-left: 10px; font-size: 18px; margin-bottom: 20px; }\n.post-card { border: 1px solid #eaeaea; padding: 15px; border-radius: 6px; margin-bottom: 15px; }\n.tag { background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; }\n.post-card h3 { margin: 10px 0 5px 0; font-size: 16px; }\n.post-card h3 a { color: #1f2937; text-decoration: none; }\n.post-card h3 a:hover { color: #2563eb; }\n.post-card p { margin: 0; font-size: 12px; color: #6b7280; }\n.single-post h1 { font-size: 22px; margin: 10px 0; }\n.date { font-size: 12px; color: #888; margin-bottom: 20px; }\n.content { line-height: 1.8; color: #4b5563; font-size: 14px; }\n.b-home { display: inline-block; margin-top: 30px; color: #2563eb; text-decoration: none; font-size: 13px; font-weight: bold; }`
      }
    ]
  },

  // 🍳 【Stage 9】レシピサイト
  {
    id: 9,
    category: '初級：ガチ連動Webサイト',
    title: '初級 09：料理のレシピ・手順紹介サイト',
    description: '材料リストや手順のステップを、分かりやすく美しい箇条書きで表現します。',
    mission: 'HTMLの `<ul>` や `<ol>` と、CSSのマージン調整の基本を学んでください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="recipe-base">\n  \n</div>',
        correctCode: `\n<div class="recipe-base">\n  <header class="r-head">\n    <div class="r-logo">🍅 My Recipe</div>\n    <nav><a href="index.html" class="active">Top</a><a href="detail.html">Recipe</a></nav>\n  </header>\n  <main class="r-main">\n    <h2>今日のおすすめレシピ</h2>\n    <div class="r-card">\n      <div class="r-img">🍝</div>\n      <div class="r-info">\n        <h3>絶品・濃厚カルボナーラ</h3>\n        <p>15分でできる、お店の味。</p>\n        <a href="detail.html" class="r-btn">作り方を見る</a>\n      </div>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'detail.html',
        language: 'html',
        initialCode: '<div class="recipe-base">\n  \n</div>',
        correctCode: `\n<div class="recipe-base">\n  <header class="r-head">\n    <div class="r-logo">🍅 My Recipe</div>\n    <nav><a href="index.html">Top</a><a href="detail.html" class="active">Recipe</a></nav>\n  </header>\n  <main class="r-main">\n    <h2>濃厚カルボナーラ</h2>\n    <div class="r-section">\n      <h4>材料 (2人分)</h4>\n      <ul class="ingredients">\n        <li>パスタ ... 200g</li>\n        <li>ベーコン ... 50g</li>\n        <li>卵黄 ... 2個</li>\n        <li>粉チーズ ... 大さじ2</li>\n      </ul>\n    </div>\n    <div class="r-section">\n      <h4>作り方</h4>\n      <ol class="steps">\n        <li>パスタを茹でる。</li>\n        <li>ベーコンをカリッと炒める。</li>\n        <li>ボウルで卵黄とチーズを混ぜ、パスタと絡める。</li>\n      </ol>\n    </div>\n    <a href="index.html" class="r-back">⬅ 戻る</a>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Recipe Style */\n.recipe-base {\n  \n}',
        correctCode: `/* Recipe Style */\n.recipe-base { font-family: 'M PLUS Rounded 1c', sans-serif; background: #fff7ed; color: #431407; padding: 20px; }\n.r-head { display: flex; justify-content: space-between; border-bottom: 2px solid #fdba74; padding-bottom: 10px; margin-bottom: 20px; }\n.r-logo { font-size: 18px; font-weight: bold; color: #ea580c; }\n.r-head a { color: #fdba74; text-decoration: none; margin-left: 10px; font-weight: bold; }\n.r-head a.active { color: #ea580c; }\n.r-main h2 { font-size: 20px; text-align: center; color: #c2410c; }\n.r-card { background: #fff; border-radius: 12px; padding: 15px; display: flex; gap: 15px; box-shadow: 0 4px 6px rgba(234,88,12,0.1); }\n.r-img { font-size: 40px; background: #ffedd5; padding: 10px; border-radius: 8px; }\n.r-info h3 { margin: 0 0 5px 0; font-size: 16px; }\n.r-info p { margin: 0 0 10px 0; font-size: 12px; color: #7c2d12; }\n.r-btn { display: inline-block; background: #ea580c; color: #fff; padding: 5px 15px; border-radius: 20px; text-decoration: none; font-size: 11px; }\n.r-section { background: #fff; padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #fed7aa; }\n.r-section h4 { margin: 0 0 10px 0; color: #ea580c; border-bottom: 1px dashed #fed7aa; padding-bottom: 5px; }\n.ingredients { padding-left: 20px; font-size: 13px; color: #7c2d12; margin: 0; }\n.steps { padding-left: 20px; font-size: 13px; color: #7c2d12; margin: 0; }\n.steps li { margin-bottom: 5px; }\n.r-back { display: block; text-align: center; color: #ea580c; text-decoration: none; font-size: 13px; font-weight: bold; }`
      }
    ]
  },

  // 🛒 【Stage 10】ECサイト・商品ページ
  {
    id: 10,
    category: '初級：ガチ連動Webサイト',
    title: '初級 10：スニーカーのオンラインストア',
    description: '商品の画像エリアと、価格・カートボタンを配置したECサイトの基本レイアウトです。',
    mission: 'ボタンのホバー効果を意識しつつ、購買意欲を高めるデザインを写経してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="ec-store">\n  \n</div>',
        correctCode: `\n<div class="ec-store">\n  <header class="ec-header">\n    <div class="ec-brand">KICKS STORE</div>\n    <nav><a href="index.html" class="ec-active">SHOP</a><a href="cart.html">CART (1)</a></nav>\n  </header>\n  <main class="ec-main">\n    <div class="product-wrap">\n      <div class="p-image">👟</div>\n      <div class="p-details">\n        <h2>AIR MAX VINTAGE</h2>\n        <p class="p-desc">クラシックなデザインと最新のクッション性を融合した一足。</p>\n        <div class="p-price">¥14,300 <span class="tax">税込</span></div>\n        <a href="cart.html" class="add-cart-btn">カートに入れる</a>\n      </div>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'cart.html',
        language: 'html',
        initialCode: '<div class="ec-store">\n  \n</div>',
        correctCode: `\n<div class="ec-store">\n  <header class="ec-header">\n    <div class="ec-brand">KICKS STORE</div>\n    <nav><a href="index.html">SHOP</a><a href="cart.html" class="ec-active">CART (1)</a></nav>\n  </header>\n  <main class="ec-main">\n    <h2>SHOPPING CART</h2>\n    <div class="cart-item">\n      <div class="c-name">AIR MAX VINTAGE x 1</div>\n      <div class="c-price">¥14,300</div>\n    </div>\n    <div class="total-box">\n      <span>合計:</span>\n      <span class="total-price">¥14,300</span>\n    </div>\n    <button class="checkout-btn">レジへ進む</button>\n    <a href="index.html" class="continue-link">⬅ 買い物を続ける</a>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* EC Style */\n.ec-store {\n  \n}',
        correctCode: `/* EC Style */\n.ec-store { font-family: 'Helvetica Neue', Arial, sans-serif; background: #fff; color: #111; padding: 20px; }\n.ec-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #111; padding-bottom: 15px; margin-bottom: 30px; }\n.ec-brand { font-size: 22px; font-weight: 900; font-style: italic; }\n.ec-header a { text-decoration: none; color: #888; margin-left: 20px; font-size: 12px; font-weight: bold; }\n.ec-active { color: #111 !important; border-bottom: 2px solid #111; }\n.product-wrap { text-align: center; }\n.p-image { font-size: 80px; background: #f4f4f5; padding: 30px; border-radius: 8px; margin-bottom: 20px; }\n.p-details h2 { margin: 0 0 10px 0; font-size: 24px; }\n.p-desc { color: #52525b; font-size: 13px; line-height: 1.5; margin-bottom: 15px; }\n.p-price { font-size: 20px; font-weight: bold; margin-bottom: 20px; }\n.tax { font-size: 10px; color: #71717a; font-weight: normal; }\n.add-cart-btn, .checkout-btn { display: block; width: 100%; background: #111; color: #fff; border: none; padding: 15px; font-size: 14px; font-weight: bold; cursor: pointer; text-decoration: none; text-align: center; border-radius: 4px; }\n.cart-item { display: flex; justify-content: space-between; border-bottom: 1px solid #e4e4e7; padding: 15px 0; margin-bottom: 20px; }\n.c-name { font-weight: bold; font-size: 14px; }\n.c-price { color: #52525b; }\n.total-box { display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; margin-bottom: 30px; }\n.continue-link { display: block; text-align: center; margin-top: 20px; color: #52525b; text-decoration: none; font-size: 12px; }`
      }
    ]
  }
];