import type { TraceStage } from './traceTypes';

export const traceDataMiddle: TraceStage[] = [
  // ☁️ 【Stage 11】SaaS料金表
  {
    id: 11,
    category: '中級：ガチ連動Webサイト',
    title: '中級 11：SaaSプロダクトの立体料金表（Pricing）',
    description: 'ホバー時の浮き上がりや、おすすめプランの強調など、実務で頻出のUIです。',
    mission: 'transformやbox-shadowを駆使し、立体的なカードレイアウトを写経してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="saas-wrap">\n  \n</div>',
        correctCode: `\n<div class="saas-wrap">\n  <header class="saas-nav">\n    <div class="brand">CloudSync</div>\n    <div class="links"><a href="index.html" class="active">Pricing</a><a href="faq.html">FAQ</a></div>\n  </header>\n  <main class="saas-main">\n    <div class="title-area">\n      <h2>シンプルな料金体系</h2>\n      <p>あなたのチームに最適なプランを選びましょう。</p>\n    </div>\n    <div class="pricing-grid">\n      <div class="plan-card">\n        <h3>Basic</h3>\n        <div class="price">¥1,200<span>/mo</span></div>\n        <ul class="features"><li>5GB Storage</li><li>Basic Support</li></ul>\n        <button class="btn-outline">選択する</button>\n      </div>\n      <div class="plan-card popular">\n        <div class="badge">一番人気</div>\n        <h3>Pro</h3>\n        <div class="price">¥3,500<span>/mo</span></div>\n        <ul class="features"><li>50GB Storage</li><li>Priority Support</li><li>Team Analytics</li></ul>\n        <button class="btn-solid">選択する</button>\n      </div>\n      <div class="plan-card">\n        <h3>Enterprise</h3>\n        <div class="price">¥12,000<span>/mo</span></div>\n        <ul class="features"><li>Unlimited Storage</li><li>24/7 Support</li></ul>\n        <button class="btn-outline">選択する</button>\n      </div>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'faq.html',
        language: 'html',
        initialCode: '<div class="saas-wrap">\n  \n</div>',
        correctCode: `\n<div class="saas-wrap">\n  <header class="saas-nav">\n    <div class="brand">CloudSync</div>\n    <div class="links"><a href="index.html">Pricing</a><a href="faq.html" class="active">FAQ</a></div>\n  </header>\n  <main class="saas-main">\n    <div class="title-area">\n      <h2>よくある質問</h2>\n    </div>\n    <div class="faq-list">\n      <div class="faq-item">\n        <h4>Q. プランの途中変更は可能ですか？</h4>\n        <p>A. はい、管理画面からいつでもアップグレード・ダウングレードが可能です。日割り計算で請求されます。</p>\n      </div>\n      <div class="faq-item">\n        <h4>Q. 解約手数料はかかりますか？</h4>\n        <p>A. いいえ、いつでも無料で解約いただけます。</p>\n      </div>\n    </div>\n    <div style="text-align:center; margin-top:30px;"><a href="index.html" style="color:#2563eb;">⬅ 料金表に戻る</a></div>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* SaaS Style */\n.saas-wrap {\n  \n}',
        correctCode: `/* SaaS Pricing Styles */\n.saas-wrap { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; color: #334155; min-height: 500px; }\n.saas-nav { display: flex; justify-content: space-between; padding: 20px 40px; background: #fff; border-bottom: 1px solid #e2e8f0; }\n.brand { font-weight: 800; font-size: 18px; color: #0f172a; }\n.links a { margin-left: 20px; text-decoration: none; color: #64748b; font-weight: 600; }\n.links a.active { color: #2563eb; }\n.saas-main { padding: 40px 20px; max-width: 900px; margin: 0 auto; }\n.title-area { text-align: center; margin-bottom: 40px; }\n.title-area h2 { font-size: 28px; color: #0f172a; margin-bottom: 10px; }\n.pricing-grid { display: flex; justify-content: center; gap: 20px; align-items: center; }\n.plan-card { background: #fff; border: 1px solid #e2e8f0; padding: 30px; border-radius: 12px; width: 280px; text-align: center; transition: transform 0.3s, box-shadow 0.3s; }\n.plan-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }\n.plan-card.popular { border: 2px solid #2563eb; position: relative; padding: 40px 30px; box-shadow: 0 10px 25px rgba(37,99,235,0.15); }\n.badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #2563eb; color: #fff; padding: 4px 12px; font-size: 12px; border-radius: 20px; font-weight: bold; }\n.price { font-size: 32px; font-weight: 800; color: #0f172a; margin: 15px 0; }\n.price span { font-size: 14px; color: #94a3b8; font-weight: normal; }\n.features { list-style: none; padding: 0; margin: 0 0 25px 0; text-align: left; }\n.features li { padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }\n.features li::before { content: "✓"; color: #10b981; margin-right: 8px; font-weight: bold; }\n.btn-outline { background: transparent; color: #2563eb; border: 1px solid #2563eb; padding: 10px 0; width: 100%; border-radius: 6px; font-weight: bold; cursor: pointer; }\n.btn-solid { background: #2563eb; color: #fff; border: none; padding: 12px 0; width: 100%; border-radius: 6px; font-weight: bold; cursor: pointer; }\n.faq-list { max-width: 600px; margin: 0 auto; }\n.faq-item { background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #e2e8f0; }\n.faq-item h4 { margin: 0 0 10px 0; color: #0f172a; }\n.faq-item p { margin: 0; font-size: 14px; color: #64748b; line-height: 1.6; }`
      }
    ]
  },

  // 🏡 【Stage 12】不動産ギャラリー
  {
    id: 12,
    category: '中級：ガチ連動Webサイト',
    title: '中級 12：不動産サイトのGrid画像ギャラリー',
    description: 'CSS Gridを用いた美しいタイル配置と、画像上の絶対配置（absolute）バッジです。',
    mission: '画像のトリミング（object-fit）とGridの設定を正確に行ってください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="realestate-wrap">\n  \n</div>',
        correctCode: `\n<div class="realestate-wrap">\n  <header class="re-header">\n    <h2>URBAN ESTATE</h2>\n    <nav><a href="index.html" class="active">Properties</a><a href="contact.html">Contact</a></nav>\n  </header>\n  <main class="re-main">\n    <h3 class="page-title">最新の物件情報</h3>\n    <div class="property-grid">\n      <article class="prop-card">\n        <div class="img-box">\n          <span class="status new">NEW</span>\n          <div class="dummy-img bg-1"></div>\n        </div>\n        <div class="prop-info">\n          <h4>新宿区 デザイナーズマンション</h4>\n          <p class="prop-price">¥85,000,000</p>\n          <div class="prop-specs"><span>2LDK</span><span>75㎡</span><span>駅徒歩5分</span></div>\n        </div>\n      </article>\n      <article class="prop-card">\n        <div class="img-box">\n          <span class="status sold">SOLD OUT</span>\n          <div class="dummy-img bg-2"></div>\n        </div>\n        <div class="prop-info">\n          <h4>渋谷区 リノベーション物件</h4>\n          <p class="prop-price">¥62,000,000</p>\n          <div class="prop-specs"><span>1LDK</span><span>50㎡</span><span>駅徒歩10分</span></div>\n        </div>\n      </article>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'contact.html',
        language: 'html',
        initialCode: '<div class="realestate-wrap">\n  \n</div>',
        correctCode: `\n<div class="realestate-wrap">\n  <header class="re-header">\n    <h2>URBAN ESTATE</h2>\n    <nav><a href="index.html">Properties</a><a href="contact.html" class="active">Contact</a></nav>\n  </header>\n  <main class="re-main">\n    <h3 class="page-title">お問い合わせ</h3>\n    <form class="contact-form">\n      <div class="form-group">\n        <label>お名前</label>\n        <input type="text" placeholder="山田 太郎">\n      </div>\n      <div class="form-group">\n        <label>メールアドレス</label>\n        <input type="email" placeholder="mail@example.com">\n      </div>\n      <button type="button" class="submit-btn">送信する</button>\n    </form>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Real Estate Style */\n.realestate-wrap {\n  \n}',
        correctCode: `/* Real Estate Grid Styles */\n.realestate-wrap { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f3f4f6; color: #1f2937; }\n.re-header { display: flex; justify-content: space-between; padding: 20px 30px; background: #111827; color: #fff; }\n.re-header h2 { margin: 0; font-size: 18px; letter-spacing: 2px; }\n.re-header a { color: #9ca3af; text-decoration: none; margin-left: 20px; font-size: 13px; text-transform: uppercase; }\n.re-header a.active { color: #fff; border-bottom: 2px solid #fff; }\n.re-main { padding: 30px; max-width: 1000px; margin: 0 auto; }\n.page-title { font-size: 20px; border-left: 4px solid #111827; padding-left: 10px; margin-bottom: 25px; }\n.property-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; }\n.prop-card { background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: box-shadow 0.3s; }\n.prop-card:hover { box-shadow: 0 10px 15px rgba(0,0,0,0.1); }\n.img-box { position: relative; height: 180px; }\n.dummy-img { width: 100%; height: 100%; }\n.bg-1 { background: linear-gradient(45deg, #9ca3af, #d1d5db); }\n.bg-2 { background: linear-gradient(45deg, #6b7280, #9ca3af); }\n.status { position: absolute; top: 10px; left: 10px; padding: 4px 10px; font-size: 10px; font-weight: bold; color: #fff; border-radius: 4px; }\n.status.new { background: #ef4444; }\n.status.sold { background: #374151; }\n.prop-info { padding: 20px; }\n.prop-info h4 { margin: 0 0 10px 0; font-size: 15px; color: #111827; }\n.prop-price { font-size: 20px; font-weight: bold; color: #2563eb; margin: 0 0 15px 0; }\n.prop-specs { display: flex; gap: 10px; font-size: 12px; color: #6b7280; }\n.prop-specs span { background: #f3f4f6; padding: 4px 8px; border-radius: 4px; }\n.contact-form { background: #fff; padding: 30px; border-radius: 8px; max-width: 500px; }\n.form-group { margin-bottom: 20px; }\n.form-group label { display: block; margin-bottom: 8px; font-size: 13px; font-weight: bold; }\n.form-group input { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 4px; box-sizing: border-box; }\n.submit-btn { background: #111827; color: #fff; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; width: 100%; font-weight: bold; }`
      }
    ]
  },

  // 📊 【Stage 13】ダッシュボード
  {
    id: 13,
    category: '中級：ガチ連動Webサイト',
    title: '中級 13：管理画面（Dashboard）レイアウト',
    description: '左サイドバー固定＋右メインコンテンツという、Webアプリの王道構造です。',
    mission: 'calc()やflex-growを用いて、画面いっぱいに広がるUIを構築してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="dash-layout">\n  \n</div>',
        correctCode: `\n<div class="dash-layout">\n  <aside class="sidebar">\n    <div class="sys-title">Admin Panel</div>\n    <nav class="side-nav">\n      <a href="index.html" class="active">📊 Overview</a>\n      <a href="users.html">👥 Users</a>\n      <a href="#">⚙️ Settings</a>\n    </nav>\n  </aside>\n  <div class="main-wrapper">\n    <header class="topbar">\n      <div class="search"><input type="text" placeholder="Search..."></div>\n      <div class="user-profile">Admin</div>\n    </header>\n    <main class="dash-content">\n      <h2 class="dash-title">Dashboard Overview</h2>\n      <div class="stat-cards">\n        <div class="stat-card"><div class="stat-name">Total Sales</div><div class="stat-val">¥1,240,500</div></div>\n        <div class="stat-card"><div class="stat-name">Active Users</div><div class="stat-val">8,234</div></div>\n        <div class="stat-card"><div class="stat-name">Conversion Rate</div><div class="stat-val">4.5%</div></div>\n      </div>\n      <div class="chart-mockup">\n        <h3>Monthly Revenue</h3>\n        <div class="bar-chart"><div class="bar" style="height: 60%"></div><div class="bar" style="height: 80%"></div><div class="bar" style="height: 40%"></div><div class="bar" style="height: 90%"></div></div>\n      </div>\n    </main>\n  </div>\n</div>`
      },
      {
        fileName: 'users.html',
        language: 'html',
        initialCode: '<div class="dash-layout">\n  \n</div>',
        correctCode: `\n<div class="dash-layout">\n  <aside class="sidebar">\n    <div class="sys-title">Admin Panel</div>\n    <nav class="side-nav">\n      <a href="index.html">📊 Overview</a>\n      <a href="users.html" class="active">👥 Users</a>\n      <a href="#">⚙️ Settings</a>\n    </nav>\n  </aside>\n  <div class="main-wrapper">\n    <header class="topbar">\n      <div class="search"><input type="text" placeholder="Search users..."></div>\n      <div class="user-profile">Admin</div>\n    </header>\n    <main class="dash-content">\n      <h2 class="dash-title">User Management</h2>\n      <table class="user-table">\n        <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Status</th></tr></thead>\n        <tbody>\n          <tr><td>#001</td><td>John Doe</td><td>Admin</td><td><span class="status-badge green">Active</span></td></tr>\n          <tr><td>#002</td><td>Jane Smith</td><td>Editor</td><td><span class="status-badge gray">Offline</span></td></tr>\n        </tbody>\n      </table>\n    </main>\n  </div>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Dashboard Style */\n.dash-layout {\n  \n}',
        correctCode: `/* Dashboard Layout Styles */\n.dash-layout { display: flex; height: 100vh; font-family: 'Segoe UI', Tahoma, sans-serif; background: #f1f5f9; color: #334155; }\n.sidebar { width: 250px; background: #1e293b; color: #f8fafc; display: flex; flex-direction: column; }\n.sys-title { padding: 20px; font-size: 18px; font-weight: bold; border-bottom: 1px solid #334155; letter-spacing: 1px; }\n.side-nav { padding: 20px 0; display: flex; flex-direction: column; }\n.side-nav a { padding: 15px 20px; color: #94a3b8; text-decoration: none; font-size: 14px; transition: background 0.2s; }\n.side-nav a:hover, .side-nav a.active { background: #334155; color: #fff; border-left: 4px solid #38bdf8; }\n.main-wrapper { flex: 1; display: flex; flex-direction: column; overflow: hidden; }\n.topbar { height: 60px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }\n.search input { padding: 8px 15px; border: 1px solid #cbd5e1; border-radius: 20px; width: 250px; outline: none; }\n.user-profile { font-weight: bold; color: #0f172a; }\n.dash-content { padding: 30px; overflow-y: auto; }\n.dash-title { margin: 0 0 25px 0; font-size: 22px; color: #0f172a; }\n.stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }\n.stat-card { background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }\n.stat-name { font-size: 13px; color: #64748b; margin-bottom: 10px; text-transform: uppercase; }\n.stat-val { font-size: 28px; font-weight: bold; color: #0f172a; }\n.chart-mockup { background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }\n.chart-mockup h3 { margin: 0 0 20px 0; font-size: 15px; }\n.bar-chart { height: 200px; display: flex; align-items: flex-end; gap: 15px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; }\n.bar { flex: 1; background: #38bdf8; border-radius: 4px 4px 0 0; transition: height 0.5s; }\n.bar:hover { background: #0284c7; }\n.user-table { width: 100%; background: #fff; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }\n.user-table th, .user-table td { padding: 15px; text-align: left; border-bottom: 1px solid #e2e8f0; }\n.user-table th { background: #f8fafc; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; }\n.status-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }\n.status-badge.green { background: #dcfce7; color: #059669; }\n.status-badge.gray { background: #f1f5f9; color: #64748b; }`
      }
    ]
  },

  // ✈️ 【Stage 14】旅行代理店
  {
    id: 14,
    category: '中級：ガチ連動Webサイト',
    title: '中級 14：旅行サイトの検索ヒーローUI',
    description: '背景画像の上に検索フォームを浮かべる、トラベル系で必須のレイアウトです。',
    mission: '背景のオーバーレイと、フォーム要素の横並び配置を完璧に写経してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="travel-site">\n  \n</div>',
        correctCode: `\n<div class="travel-site">\n  <nav class="t-nav">\n    <div class="t-logo">🌍 Voyage</div>\n    <div class="t-menu"><a href="index.html" class="active">Explore</a><a href="dest.html">Destinations</a></div>\n  </nav>\n  <div class="t-hero">\n    <div class="t-overlay"></div>\n    <div class="t-hero-content">\n      <h1>見知らぬ世界へ、飛び出そう。</h1>\n      <p>あなたにぴったりの最高の旅行プランを見つけます。</p>\n      <form class="t-search-form">\n        <input type="text" placeholder="目的地 (例: ハワイ)">\n        <input type="date">\n        <button type="button">検索する</button>\n      </form>\n    </div>\n  </div>\n  <section class="t-section">\n    <h2>人気の目的地</h2>\n    <div class="t-cards">\n      <div class="t-card"><h3>🌺 Hawaii</h3><p>常夏の楽園でリフレッシュ</p></div>\n      <div class="t-card"><h3>🗼 Paris</h3><p>芸術と花の都を巡る</p></div>\n    </div>\n  </section>\n</div>`
      },
      {
        fileName: 'dest.html',
        language: 'html',
        initialCode: '<div class="travel-site">\n  \n</div>',
        correctCode: `\n<div class="travel-site">\n  <nav class="t-nav" style="background:#1e3a8a;">\n    <div class="t-logo">🌍 Voyage</div>\n    <div class="t-menu"><a href="index.html">Explore</a><a href="dest.html" class="active">Destinations</a></div>\n  </nav>\n  <section class="t-section">\n    <h2>Destination List</h2>\n    <div class="list-grid">\n      <div class="d-item">Hawaii - $1,200~</div>\n      <div class="d-item">Paris - $1,500~</div>\n      <div class="d-item">New York - $1,300~</div>\n    </div>\n    <a href="index.html" style="display:block; margin-top:20px; color:#1e3a8a;">⬅ トップに戻る</a>\n  </section>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Travel Style */\n.travel-site {\n  \n}',
        correctCode: `/* Travel Site Styles */\n.travel-site { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; }\n.t-nav { position: absolute; top: 0; width: 100%; display: flex; justify-content: space-between; padding: 20px 40px; box-sizing: border-box; z-index: 10; }\n.t-logo { color: #fff; font-size: 24px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }\n.t-menu a { color: #fff; text-decoration: none; margin-left: 20px; font-size: 14px; text-shadow: 0 1px 3px rgba(0,0,0,0.5); }\n.t-menu a.active { border-bottom: 2px solid #fff; font-weight: bold; }\n.t-hero { position: relative; height: 500px; background: url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80') center/cover; display: flex; align-items: center; justify-content: center; }\n.t-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.4); }\n.t-hero-content { position: relative; z-index: 1; text-align: center; color: #fff; width: 100%; max-width: 800px; padding: 0 20px; }\n.t-hero-content h1 { font-size: 42px; margin-bottom: 10px; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }\n.t-hero-content p { font-size: 16px; margin-bottom: 30px; text-shadow: 0 1px 5px rgba(0,0,0,0.3); }\n.t-search-form { display: flex; background: #fff; padding: 10px; border-radius: 50px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }\n.t-search-form input { flex: 1; border: none; padding: 15px 20px; font-size: 16px; outline: none; background: transparent; }\n.t-search-form input[type="text"] { border-right: 1px solid #e2e8f0; }\n.t-search-form button { background: #2563eb; color: #fff; border: none; padding: 0 30px; border-radius: 30px; font-size: 16px; font-weight: bold; cursor: pointer; transition: background 0.3s; }\n.t-search-form button:hover { background: #1d4ed8; }\n.t-section { padding: 60px 40px; background: #f8fafc; }\n.t-section h2 { text-align: center; font-size: 28px; margin-bottom: 40px; color: #0f172a; }\n.t-cards { display: flex; gap: 20px; justify-content: center; }\n.t-card { background: #fff; padding: 30px; border-radius: 12px; width: 300px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }\n.t-card h3 { margin: 0 0 10px 0; color: #2563eb; }\n.t-card p { margin: 0; color: #64748b; }\n.list-grid { display: grid; gap: 15px; }\n.d-item { background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; font-weight: bold; }`
      }
    ]
  },

  // 🎓 【Stage 15】オンライン学習
  {
    id: 15,
    category: '中級：ガチ連動Webサイト',
    title: '中級 15：動画学習プラットフォーム',
    description: '動画プレイヤーエリアと、カリキュラムのリストを併置した学習サイトです。',
    mission: 'リストの疑似要素（::before）を使ったカスタムナンバリングに挑戦してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="edu-wrap">\n  \n</div>',
        correctCode: `\n<div class="edu-wrap">\n  <header class="e-head">\n    <div class="e-logo">CodeAcademy</div>\n    <nav><a href="index.html" class="active">Course</a><a href="about.html">Instructor</a></nav>\n  </header>\n  <main class="e-main">\n    <div class="e-video-area">\n      <div class="video-player">▶ PLAY VIDEO</div>\n      <h2>React Hooks 徹底マスター講座</h2>\n      <p>このコースでは、最新のReact開発で必須となるHooksの仕組みをゼロから学びます。</p>\n    </div>\n    <aside class="e-curriculum">\n      <h3>Curriculum</h3>\n      <div class="chapter-list">\n        <div class="chapter completed">はじめに - 環境構築</div>\n        <div class="chapter active">useStateの基礎と応用</div>\n        <div class="chapter">useEffectと副作用</div>\n        <div class="chapter">カスタムフックの作成</div>\n      </div>\n    </aside>\n  </main>\n</div>`
      },
      {
        fileName: 'about.html',
        language: 'html',
        initialCode: '<div class="edu-wrap">\n  \n</div>',
        correctCode: `\n<div class="edu-wrap">\n  <header class="e-head">\n    <div class="e-logo">CodeAcademy</div>\n    <nav><a href="index.html">Course</a><a href="about.html" class="active">Instructor</a></nav>\n  </header>\n  <main class="e-main" style="display:block; max-width:800px; margin:0 auto;">\n    <h2>Instructor Profile</h2>\n    <div style="background:#fff; padding:30px; border-radius:8px; border:1px solid #e2e8f0;">\n      <h3>Kenji Developer</h3>\n      <p>フロントエンド歴10年のベテランエンジニア。数々の大規模Webアプリケーションの設計を担当。</p>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Edu Style */\n.edu-wrap {\n  \n}',
        correctCode: `/* Education Platform Styles */\n.edu-wrap { font-family: 'Inter', sans-serif; background: #f8fafc; color: #334155; min-height: 500px; }\n.e-head { display: flex; justify-content: space-between; padding: 15px 30px; background: #fff; border-bottom: 1px solid #e2e8f0; }\n.e-logo { font-weight: 800; color: #6366f1; font-size: 18px; }\n.e-head a { margin-left: 20px; color: #64748b; text-decoration: none; font-size: 14px; font-weight: 600; }\n.e-head a.active { color: #6366f1; }\n.e-main { display: flex; gap: 30px; padding: 30px; max-width: 1200px; margin: 0 auto; }\n.e-video-area { flex: 2; }\n.video-player { background: #0f172a; height: 350px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 24px; font-weight: bold; margin-bottom: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }\n.e-video-area h2 { font-size: 24px; color: #0f172a; margin: 0 0 10px 0; }\n.e-video-area p { line-height: 1.6; color: #475569; }\n.e-curriculum { flex: 1; background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; height: fit-content; }\n.e-curriculum h3 { margin: 0 0 15px 0; font-size: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; }\n.chapter-list { counter-reset: chapter-counter; }\n.chapter { position: relative; padding: 12px 12px 12px 40px; margin-bottom: 8px; background: #f8fafc; border-radius: 6px; font-size: 13px; font-weight: bold; color: #64748b; cursor: pointer; }\n.chapter::before { counter-increment: chapter-counter; content: counter(chapter-counter); position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: #cbd5e1; color: #fff; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; }\n.chapter.completed { background: #fff; border: 1px solid #e2e8f0; }\n.chapter.completed::before { background: #10b981; content: "✓"; }\n.chapter.active { background: #e0e7ff; color: #4f46e5; border: 1px solid #c7d2fe; }\n.chapter.active::before { background: #4f46e5; }`
      }
    ]
  },

  // 🍽️ 【Stage 16】高級レストラン
  {
    id: 16,
    category: '中級：ガチ連動Webサイト',
    title: '中級 16：ファインダイニングのWebサイト',
    description: '明朝体（Serif）を用い、画像とテキストを交互に配置するエレガントなレイアウトです。',
    mission: '洗練された余白と、Flexboxの「row-reverse」による左右反転配置を実装してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="dine-wrap">\n  \n</div>',
        correctCode: `\n<div class="dine-wrap">\n  <header class="d-head">\n    <h1>L'Étoile</h1>\n    <nav><a href="index.html" class="active">Concept</a><a href="menu.html">Menu</a></nav>\n  </header>\n  <main class="d-main">\n    <section class="d-split">\n      <div class="d-img bg-wine"></div>\n      <div class="d-text">\n        <h2>至高のペアリングを。</h2>\n        <p>厳選された季節の食材と、世界中から集められたワインが織りなす芸術的なひととき。</p>\n      </div>\n    </section>\n    <section class="d-split reverse">\n      <div class="d-img bg-chef"></div>\n      <div class="d-text">\n        <h2>シェフの哲学</h2>\n        <p>伝統的なフレンチの技法をベースに、現代的なエッセンスを加えた革新的な料理を提供します。</p>\n      </div>\n    </section>\n  </main>\n</div>`
      },
      {
        fileName: 'menu.html',
        language: 'html',
        initialCode: '<div class="dine-wrap">\n  \n</div>',
        correctCode: `\n<div class="dine-wrap">\n  <header class="d-head">\n    <h1>L'Étoile</h1>\n    <nav><a href="index.html">Concept</a><a href="menu.html" class="active">Menu</a></nav>\n  </header>\n  <main class="d-main">\n    <div class="menu-list">\n      <h2>Dinner Course</h2>\n      <div class="course-item">\n        <h3>Menu Dégustation <span>¥18,000</span></h3>\n        <p>アミューズ / 前菜2品 / 魚料理 / 肉料理 / デザート / 小菓子</p>\n      </div>\n      <div class="course-item">\n        <h3>Menu Spécial <span>¥25,000</span></h3>\n        <p>シェフおまかせの特別コース（全8品）</p>\n      </div>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Dining Style */\n.dine-wrap {\n  \n}',
        correctCode: `/* Fine Dining Styles */\n.dine-wrap { font-family: 'Times New Roman', Times, serif; background: #0a0a0a; color: #d4af37; min-height: 500px; }\n.d-head { text-align: center; padding: 40px 20px; border-bottom: 1px solid #333; }\n.d-head h1 { font-size: 36px; font-weight: normal; letter-spacing: 4px; margin: 0 0 20px 0; }\n.d-head a { color: #888; text-decoration: none; margin: 0 15px; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; transition: color 0.3s; }\n.d-head a:hover, .d-head a.active { color: #d4af37; }\n.d-main { padding: 60px 20px; max-width: 1000px; margin: 0 auto; }\n.d-split { display: flex; align-items: center; gap: 50px; margin-bottom: 80px; }\n.d-split.reverse { flex-direction: row-reverse; }\n.d-img { flex: 1; height: 350px; background-size: cover; background-position: center; border-radius: 4px; }\n.bg-wine { background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80'); }\n.bg-chef { background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80'); }\n.d-text { flex: 1; }\n.d-text h2 { font-size: 28px; font-weight: normal; margin-bottom: 20px; letter-spacing: 2px; }\n.d-text p { font-size: 14px; line-height: 2; color: #aaa; }\n.menu-list { text-align: center; max-width: 600px; margin: 0 auto; }\n.menu-list h2 { font-weight: normal; font-size: 24px; border-bottom: 1px solid #d4af37; padding-bottom: 10px; margin-bottom: 40px; letter-spacing: 3px; }\n.course-item { margin-bottom: 40px; }\n.course-item h3 { font-size: 18px; font-weight: normal; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px dotted #333; padding-bottom: 5px; }\n.course-item span { font-size: 14px; }\n.course-item p { font-size: 13px; color: #888; text-align: left; margin: 0; }`
      }
    ]
  },

  // 🤝 【Stage 17】採用・リクルート
  {
    id: 17,
    category: '中級：ガチ連動Webサイト',
    title: '中級 17：リクルート（採用）サイトの選考フロー',
    description: '矢印を用いたステップ進行UIや、熱いメッセージを伝える採用特設ページです。',
    mission: '擬似要素（::after）を使った三角形（矢印）の作成技法を習得してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="recruit-wrap">\n  \n</div>',
        correctCode: `\n<div class="recruit-wrap">\n  <header class="rec-head">\n    <div class="r-logo">RECRUIT 2026</div>\n    <nav><a href="index.html" class="active">Message</a><a href="flow.html">Flow</a></nav>\n  </header>\n  <main class="rec-main">\n    <div class="message-box">\n      <h2>未完成な君こそ、<br>未来の主役だ。</h2>\n      <p>私たちは完璧なスキルを求めていません。変化を恐れず、失敗から学び、共に成長できる「熱量」を探しています。</p>\n      <a href="flow.html" class="btn-rec">選考フローを見る ➔</a>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'flow.html',
        language: 'html',
        initialCode: '<div class="recruit-wrap">\n  \n</div>',
        correctCode: `\n<div class="recruit-wrap">\n  <header class="rec-head">\n    <div class="r-logo">RECRUIT 2026</div>\n    <nav><a href="index.html">Message</a><a href="flow.html" class="active">Flow</a></nav>\n  </header>\n  <main class="rec-main">\n    <h3 class="section-ttl">選考プロセス</h3>\n    <div class="step-flow">\n      <div class="step"><span>STEP 01</span>書類選考</div>\n      <div class="step"><span>STEP 02</span>一次面接 (Web)</div>\n      <div class="step"><span>STEP 03</span>最終面接 (役員)</div>\n      <div class="step final">内定</div>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Recruit Style */\n.recruit-wrap {\n  \n}',
        correctCode: `/* Recruitment Styles */\n.recruit-wrap { font-family: 'Noto Sans JP', sans-serif; background: #fff; color: #333; min-height: 500px; }\n.rec-head { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background: #000; color: #fff; }\n.r-logo { font-weight: 900; font-size: 20px; letter-spacing: 2px; }\n.rec-head a { color: #aaa; text-decoration: none; margin-left: 20px; font-weight: bold; font-size: 14px; }\n.rec-head a.active { color: #fff; border-bottom: 2px solid #fff; }\n.rec-main { padding: 60px 40px; max-width: 900px; margin: 0 auto; }\n.message-box { text-align: center; padding: 40px; background: #f8f9fa; border-radius: 8px; border-left: 8px solid #000; }\n.message-box h2 { font-size: 32px; line-height: 1.5; margin-bottom: 20px; color: #000; }\n.message-box p { font-size: 15px; line-height: 1.8; color: #555; margin-bottom: 30px; font-weight: bold; }\n.btn-rec { display: inline-block; background: #000; color: #fff; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 4px; transition: transform 0.2s; }\n.btn-rec:hover { transform: scale(1.05); }\n.section-ttl { text-align: center; font-size: 24px; margin-bottom: 40px; }\n.step-flow { display: flex; flex-direction: column; gap: 20px; max-width: 500px; margin: 0 auto; }\n.step { position: relative; background: #f1f3f5; padding: 20px; border-radius: 4px; font-weight: bold; font-size: 18px; text-align: center; }\n.step span { display: block; font-size: 12px; color: #888; margin-bottom: 5px; }\n/* 👑 下向きの矢印を border で作るCSSの奥義！ */\n.step:not(.final)::after { content: ""; position: absolute; bottom: -15px; left: 50%; transform: translateX(-50%); border-width: 15px 15px 0 15px; border-style: solid; border-color: #f1f3f5 transparent transparent transparent; z-index: 10; }\n.step.final { background: #000; color: #fff; }`
      }
    ]
  },

  // 🎨 【Stage 18】クリエイティブエージェンシー
  {
    id: 18,
    category: '中級：ガチ連動Webサイト',
    title: '中級 18：クリエイティブ企業のGlassmorphism',
    description: '背景のグラデーションが透けて見える「すりガラス効果」を使ったモダンUIです。',
    mission: 'backdrop-filterを活用し、透明感のある最先端のカードデザインを実装してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="creative-bg">\n  \n</div>',
        correctCode: `\n<div class="creative-bg">\n  <div class="blob shape-1"></div>\n  <div class="blob shape-2"></div>\n  <div class="glass-container">\n    <header class="g-head">\n      <div class="g-logo">V isionary</div>\n      <nav><a href="index.html" class="active">Work</a><a href="about.html">About</a></nav>\n    </header>\n    <main class="g-main">\n      <h2>Crafting the Future</h2>\n      <p>デザインとテクノロジーの境界線を溶かし、未知の体験を創造するデジタルエージェンシー。</p>\n      <div class="work-grid">\n        <div class="glass-card"><h3>Project Alpha</h3><p>Web3 Platform UI/UX</p></div>\n        <div class="glass-card"><h3>Project Beta</h3><p>AI Generator App</p></div>\n      </div>\n    </main>\n  </div>\n</div>`
      },
      {
        fileName: 'about.html',
        language: 'html',
        initialCode: '<div class="creative-bg">\n  \n</div>',
        correctCode: `\n<div class="creative-bg">\n  <div class="blob shape-1" style="left:10%; top:60%;"></div>\n  <div class="blob shape-2" style="right:20%; top:20%;"></div>\n  <div class="glass-container">\n    <header class="g-head">\n      <div class="g-logo">V isionary</div>\n      <nav><a href="index.html">Work</a><a href="about.html" class="active">About</a></nav>\n    </header>\n    <main class="g-main">\n      <h2>Who We Are</h2>\n      <div class="glass-card" style="margin-top:20px;">\n        <h3>Core Values</h3>\n        <p>1. 既成概念を疑え<br>2. 細部に神を宿せ<br>3. ユーザーの心を揺さぶれ</p>\n      </div>\n    </main>\n  </div>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Creative Style */\n.creative-bg {\n  \n}',
        correctCode: `/* Glassmorphism Styles */\n.creative-bg { position: relative; min-height: 600px; background: #0f172a; overflow: hidden; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; padding: 20px; }\n.blob { position: absolute; filter: blur(60px); border-radius: 50%; opacity: 0.6; }\n.shape-1 { width: 300px; height: 300px; background: #c026d3; top: -50px; left: -50px; }\n.shape-2 { width: 400px; height: 400px; background: #3b82f6; bottom: -100px; right: -50px; }\n.glass-container { position: relative; z-index: 10; width: 100%; max-width: 900px; min-height: 500px; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); display: flex; flex-direction: column; }\n.g-head { display: flex; justify-content: space-between; padding: 30px 40px; border-bottom: 1px solid rgba(255,255,255,0.1); }\n.g-logo { color: #fff; font-size: 20px; font-weight: 800; letter-spacing: 2px; }\n.g-head a { color: rgba(255,255,255,0.6); text-decoration: none; margin-left: 20px; font-weight: bold; transition: color 0.3s; }\n.g-head a.active, .g-head a:hover { color: #fff; }\n.g-main { padding: 50px 40px; color: #fff; flex: 1; }\n.g-main h2 { font-size: 36px; margin: 0 0 15px 0; background: linear-gradient(to right, #e879f9, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }\n.g-main p { color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.6; margin-bottom: 40px; max-width: 600px; }\n.work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }\n.glass-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 25px; border-radius: 16px; transition: transform 0.3s, background 0.3s; }\n.glass-card:hover { transform: translateY(-5px); background: rgba(255, 255, 255, 0.08); }\n.glass-card h3 { margin: 0 0 10px 0; font-size: 18px; color: #fff; }\n.glass-card p { margin: 0; font-size: 13px; color: rgba(255,255,255,0.6); }`
      }
    ]
  },

  // 🚀 【Stage 19】クラウドファンディング
  {
    id: 19,
    category: '中級：ガチ連動Webサイト',
    title: '中級 19：クラウドファンディングの進捗UI',
    description: '目標金額に対する達成率を示すプログレスバーをCSSのみで実装します。',
    mission: '幅（width）をパーセンテージで指定し、美しいゲージを作成してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="cf-wrap">\n  \n</div>',
        correctCode: `\n<div class="cf-wrap">\n  <header class="cf-header">\n    <div class="cf-brand">StarterCamp</div>\n    <nav><a href="index.html" class="active">Project</a><a href="rewards.html">Rewards</a></nav>\n  </header>\n  <main class="cf-main">\n    <div class="project-view">\n      <div class="p-image">🏕️</div>\n      <div class="p-info">\n        <span class="category">ガジェット</span>\n        <h2>次世代の超軽量・防水スマートテント</h2>\n        <div class="stats">\n          <div class="amount">¥4,500,000</div>\n          <div class="goal">目標: ¥3,000,000</div>\n        </div>\n        <div class="progress-bg">\n          <div class="progress-fill" style="width: 100%;"></div>\n        </div>\n        <div class="meta-data">\n          <span>達成率: 150%</span>\n          <span>支援者: 320人</span>\n          <span>残り: 12日</span>\n        </div>\n        <a href="rewards.html" class="back-btn">プロジェクトを支援する</a>\n      </div>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'rewards.html',
        language: 'html',
        initialCode: '<div class="cf-wrap">\n  \n</div>',
        correctCode: `\n<div class="cf-wrap">\n  <header class="cf-header">\n    <div class="cf-brand">StarterCamp</div>\n    <nav><a href="index.html">Project</a><a href="rewards.html" class="active">Rewards</a></nav>\n  </header>\n  <main class="cf-main">\n    <h2>リターン（支援コース）一覧</h2>\n    <div class="reward-list">\n      <div class="reward-card">\n        <h3>【早割】スマートテント1式</h3>\n        <div class="r-price">¥25,000</div>\n        <p>一般販売予定価格より30%OFFでご提供します。</p>\n        <button class="support-btn">このコースで支援</button>\n      </div>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Crowdfunding Style */\n.cf-wrap {\n  \n}',
        correctCode: `/* Crowdfunding Styles */\n.cf-wrap { font-family: sans-serif; background: #f9fafb; color: #111827; min-height: 500px; }\n.cf-header { display: flex; justify-content: space-between; padding: 20px 30px; background: #fff; border-bottom: 1px solid #e5e7eb; }\n.cf-brand { font-size: 20px; font-weight: 900; color: #10b981; }\n.cf-header a { text-decoration: none; color: #6b7280; font-weight: bold; margin-left: 20px; }\n.cf-header a.active { color: #111827; border-bottom: 2px solid #111827; }\n.cf-main { padding: 40px 20px; max-width: 900px; margin: 0 auto; }\n.project-view { display: flex; gap: 30px; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }\n.p-image { flex: 1; background: #d1fae5; display: flex; align-items: center; justify-content: center; font-size: 80px; border-radius: 8px; min-height: 250px; }\n.p-info { flex: 1; display: flex; flex-direction: column; justify-content: center; }\n.category { display: inline-block; background: #f3f4f6; color: #4b5563; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 10px; width: fit-content; }\n.p-info h2 { margin: 0 0 20px 0; font-size: 22px; line-height: 1.4; }\n.stats { margin-bottom: 10px; }\n.amount { font-size: 28px; font-weight: 900; color: #10b981; }\n.goal { font-size: 13px; color: #6b7280; }\n.progress-bg { width: 100%; height: 12px; background: #e5e7eb; border-radius: 6px; overflow: hidden; margin-bottom: 15px; }\n.progress-fill { height: 100%; background: #10b981; border-radius: 6px; }\n.meta-data { display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; color: #374151; margin-bottom: 25px; }\n.back-btn, .support-btn { background: #10b981; color: #fff; text-align: center; text-decoration: none; padding: 12px 0; border-radius: 6px; font-weight: bold; font-size: 15px; border: none; cursor: pointer; display: block; width: 100%; }\n.reward-card { background: #fff; border: 2px solid #e5e7eb; padding: 25px; border-radius: 8px; max-width: 400px; }\n.reward-card h3 { margin: 0 0 10px 0; font-size: 18px; }\n.r-price { font-size: 24px; font-weight: bold; color: #10b981; margin-bottom: 15px; }\n.reward-card p { font-size: 14px; color: #4b5563; margin-bottom: 20px; line-height: 1.5; }`
      }
    ]
  },

  // 💎 【Stage 20】Web3 / Crypto Landing Page
  {
    id: 20,
    category: '中級：ガチ連動Webサイト',
    title: '中級 20：Web3・暗号資産のネオンUI',
    description: '黒背景に強烈なグラデーションと光るボーダーを配置した、最先端のWeb3風デザインです。',
    mission: 'box-shadowの多重掛けや、linear-gradientによるネオン表現を完全トレースしてください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '<div class="web3-wrap">\n  \n</div>',
        correctCode: `\n<div class="web3-wrap">\n  <header class="w3-head">\n    <div class="w3-logo">⬡ NEXUS PROTOCOL</div>\n    <nav><a href="index.html" class="active">Ecosystem</a><a href="token.html">Token</a></nav>\n  </header>\n  <main class="w3-main">\n    <div class="hero-glow">\n      <h1>Decentralize Everything.</h1>\n      <p>次世代の分散型金融（DeFi）を構築する、高速でセキュアなブロックチェーンプロトコル。</p>\n      <div class="btn-group">\n        <a href="#" class="btn-neon">Connect Wallet</a>\n        <a href="token.html" class="btn-ghost">View Tokenomics</a>\n      </div>\n    </div>\n    <div class="feature-nodes">\n      <div class="node-card"><div class="icon">⚡</div><h3>Ultra Fast</h3><p>秒間10万トランザクションの圧倒的処理速度。</p></div>\n      <div class="node-card"><div class="icon">🔒</div><h3>Secure</h3><p>最新の暗号技術による堅牢なスマートコントラクト。</p></div>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'token.html',
        language: 'html',
        initialCode: '<div class="web3-wrap">\n  \n</div>',
        correctCode: `\n<div class="web3-wrap">\n  <header class="w3-head">\n    <div class="w3-logo">⬡ NEXUS PROTOCOL</div>\n    <nav><a href="index.html">Ecosystem</a><a href="token.html" class="active">Token</a></nav>\n  </header>\n  <main class="w3-main">\n    <div class="token-box">\n      <h2>$NEX Tokenomics</h2>\n      <div class="stats-glow">\n        <div class="stat"><span>Total Supply</span>1,000,000,000 NEX</div>\n        <div class="stat"><span>Circulating</span>250,000,000 NEX</div>\n      </div>\n      <a href="index.html" class="btn-ghost" style="margin-top:30px;">⬅ Back to Home</a>\n    </div>\n  </main>\n</div>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '/* Web3 Style */\n.web3-wrap {\n  \n}',
        correctCode: `/* Web3 Crypto Styles */\n.web3-wrap { font-family: 'Space Grotesk', sans-serif; background: #000; color: #fff; min-height: 600px; }\n.w3-head { display: flex; justify-content: space-between; padding: 25px 40px; border-bottom: 1px solid rgba(255,255,255,0.1); }\n.w3-logo { font-size: 20px; font-weight: 900; background: linear-gradient(90deg, #00ffcc, #7000ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }\n.w3-head a { color: #888; text-decoration: none; margin-left: 25px; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; transition: color 0.3s; }\n.w3-head a.active, .w3-head a:hover { color: #00ffcc; text-shadow: 0 0 10px rgba(0,255,204,0.5); }\n.w3-main { padding: 60px 40px; max-width: 1000px; margin: 0 auto; text-align: center; }\n.hero-glow h1 { font-size: 48px; margin: 0 0 20px 0; font-weight: 900; letter-spacing: -1px; }\n.hero-glow p { font-size: 16px; color: #aaa; max-width: 600px; margin: 0 auto 40px auto; line-height: 1.6; }\n.btn-group { display: flex; justify-content: center; gap: 20px; margin-bottom: 80px; }\n.btn-neon { display: inline-block; background: transparent; color: #00ffcc; border: 2px solid #00ffcc; padding: 12px 30px; border-radius: 30px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 0 15px rgba(0,255,204,0.3), inset 0 0 10px rgba(0,255,204,0.2); transition: all 0.3s; }\n.btn-neon:hover { background: #00ffcc; color: #000; box-shadow: 0 0 30px rgba(0,255,204,0.6); }\n.btn-ghost { display: inline-block; background: rgba(255,255,255,0.05); color: #fff; padding: 12px 30px; border-radius: 30px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; transition: background 0.3s; }\n.btn-ghost:hover { background: rgba(255,255,255,0.1); }\n.feature-nodes { display: flex; justify-content: center; gap: 30px; }\n.node-card { background: rgba(20,20,20,0.8); border: 1px solid rgba(112,0,255,0.3); padding: 30px; border-radius: 16px; width: 300px; box-shadow: 0 10px 30px rgba(112,0,255,0.1); }\n.icon { font-size: 40px; margin-bottom: 15px; }\n.node-card h3 { margin: 0 0 10px 0; font-size: 20px; }\n.node-card p { margin: 0; font-size: 14px; color: #888; line-height: 1.5; }\n.token-box { background: rgba(20,20,20,0.8); border: 1px solid rgba(0,255,204,0.3); padding: 50px; border-radius: 16px; max-width: 600px; margin: 0 auto; }\n.token-box h2 { font-size: 32px; margin: 0 0 30px 0; }\n.stats-glow { display: flex; flex-direction: column; gap: 20px; }\n.stat { background: #000; padding: 20px; border-radius: 8px; border-left: 4px solid #00ffcc; font-size: 24px; font-weight: bold; display: flex; flex-direction: column; align-items: flex-start; }\n.stat span { font-size: 12px; color: #aaa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }`
      }
    ]
  }
];