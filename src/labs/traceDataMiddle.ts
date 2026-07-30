import type { TraceStage } from './traceTypes';

export const traceDataMiddle: TraceStage[] = [
  // ☁️ 【Stage 11】SaaS料金表
  {
    id: 11,
    category: '中級：ガチ連動Webサイト',
    title: '中級 11：SaaSプロダクトの立体料金表（Pricing）',
    description: 'ホバー時の浮き上がりや、おすすめプランの強調など、実務で頻出のUIです。',
    mission: 'transformやbox-shadowを駆使し、立体的なカードレイアウトを完全記述してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CloudSync - Pricing</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="saas-wrap">
  <header class="saas-nav">
    <div class="brand">CloudSync</div>
    <div class="links">
      <a href="index.html" class="active">Pricing</a>
      <a href="faq.html">FAQ</a>
    </div>
  </header>
  <main class="saas-main">
    <div class="title-area">
      <h2>シンプルな料金体系</h2>
      <p>あなたのチームに最適なプランを選びましょう。</p>
    </div>
    <div class="pricing-grid">
      <div class="plan-card">
        <h3>Basic</h3>
        <div class="price">¥1,200<span>/mo</span></div>
        <ul class="features">
          <li>5GB Storage</li>
          <li>Basic Support</li>
        </ul>
        <button class="btn-outline">選択する</button>
      </div>
      <div class="plan-card popular">
        <div class="badge">一番人気</div>
        <h3>Pro</h3>
        <div class="price">¥3,500<span>/mo</span></div>
        <ul class="features">
          <li>50GB Storage</li>
          <li>Priority Support</li>
          <li>Team Analytics</li>
        </ul>
        <button class="btn-solid">選択する</button>
      </div>
      <div class="plan-card">
        <h3>Enterprise</h3>
        <div class="price">¥12,000<span>/mo</span></div>
        <ul class="features">
          <li>Unlimited Storage</li>
          <li>24/7 Support</li>
        </ul>
        <button class="btn-outline">選択する</button>
      </div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'faq.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CloudSync - FAQ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="saas-wrap">
  <header class="saas-nav">
    <div class="brand">CloudSync</div>
    <div class="links">
      <a href="index.html">Pricing</a>
      <a href="faq.html" class="active">FAQ</a>
    </div>
  </header>
  <main class="saas-main">
    <div class="title-area">
      <h2>よくある質問</h2>
    </div>
    <div class="faq-list">
      <div class="faq-item">
        <h4>Q. プランの途中変更は可能ですか？</h4>
        <p>A. はい、管理画面からいつでもアップグレード・ダウングレードが可能です。日割り計算で請求されます。</p>
      </div>
      <div class="faq-item">
        <h4>Q. 解約手数料はかかりますか？</h4>
        <p>A. いいえ、いつでも無料で解約いただけます。</p>
      </div>
    </div>
    <div style="text-align:center; margin-top:30px;">
      <a href="index.html" style="color:#2563eb;">⬅ 料金表に戻る</a>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* SaaS Pricing Styles */
body {
  margin: 0;
  background: #f8fafc;
}

.saas-wrap {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f8fafc;
  color: #334155;
  min-height: 500px;
}

.saas-nav {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.brand {
  font-weight: 800;
  font-size: 18px;
  color: #0f172a;
}

.links a {
  margin-left: 20px;
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
}

.links a.active {
  color: #2563eb;
}

.saas-main {
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
}

.title-area {
  text-align: center;
  margin-bottom: 40px;
}

.title-area h2 {
  font-size: 28px;
  color: #0f172a;
  margin-bottom: 10px;
}

.pricing-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
}

.plan-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 30px;
  border-radius: 12px;
  width: 280px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.plan-card.popular {
  border: 2px solid #2563eb;
  position: relative;
  padding: 40px 30px;
  box-shadow: 0 10px 25px rgba(37,99,235,0.15);
}

.badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #2563eb;
  color: #fff;
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 20px;
  font-weight: bold;
}

.price {
  font-size: 32px;
  font-weight: 800;
  color: #0f172a;
  margin: 15px 0;
}

.price span {
  font-size: 14px;
  color: #94a3b8;
  font-weight: normal;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
  text-align: left;
}

.features li {
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}

.features li::before {
  content: "✓";
  color: #10b981;
  margin-right: 8px;
  font-weight: bold;
}

.btn-outline {
  background: transparent;
  color: #2563eb;
  border: 1px solid #2563eb;
  padding: 10px 0;
  width: 100%;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.btn-solid {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 12px 0;
  width: 100%;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.faq-list {
  max-width: 600px;
  margin: 0 auto;
}

.faq-item {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e2e8f0;
}

.faq-item h4 {
  margin: 0 0 10px 0;
  color: #0f172a;
}

.faq-item p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}`
      }
    ]
  },

  // 🏡 【Stage 12】不動産ギャラリー
  {
    id: 12,
    category: '中級：ガチ連動Webサイト',
    title: '中級 12：不動産サイトのGrid画像ギャラリー',
    description: 'CSS Gridを用いた美しいタイル配置と、画像上の絶対配置（absolute）バッジです。',
    mission: '画像のトリミングとGridの設定を正確に行ってください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Urban Estate - Properties</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="realestate-wrap">
  <header class="re-header">
    <h2>URBAN ESTATE</h2>
    <nav>
      <a href="index.html" class="active">Properties</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>
  <main class="re-main">
    <h3 class="page-title">最新の物件情報</h3>
    <div class="property-grid">
      <article class="prop-card">
        <div class="img-box">
          <span class="status new">NEW</span>
          <div class="dummy-img bg-1"></div>
        </div>
        <div class="prop-info">
          <h4>新宿区 デザイナーズマンション</h4>
          <p class="prop-price">¥85,000,000</p>
          <div class="prop-specs">
            <span>2LDK</span>
            <span>75㎡</span>
            <span>駅徒歩5分</span>
          </div>
        </div>
      </article>
      <article class="prop-card">
        <div class="img-box">
          <span class="status sold">SOLD OUT</span>
          <div class="dummy-img bg-2"></div>
        </div>
        <div class="prop-info">
          <h4>渋谷区 リノベーション物件</h4>
          <p class="prop-price">¥62,000,000</p>
          <div class="prop-specs">
            <span>1LDK</span>
            <span>50㎡</span>
            <span>駅徒歩10分</span>
          </div>
        </div>
      </article>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'contact.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Urban Estate - Contact</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="realestate-wrap">
  <header class="re-header">
    <h2>URBAN ESTATE</h2>
    <nav>
      <a href="index.html">Properties</a>
      <a href="contact.html" class="active">Contact</a>
    </nav>
  </header>
  <main class="re-main">
    <h3 class="page-title">お問い合わせ</h3>
    <form class="contact-form">
      <div class="form-group">
        <label>お名前</label>
        <input type="text" placeholder="山田 太郎">
      </div>
      <div class="form-group">
        <label>メールアドレス</label>
        <input type="email" placeholder="mail@example.com">
      </div>
      <button type="button" class="submit-btn">送信する</button>
    </form>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Real Estate Grid Styles */
body {
  margin: 0;
  background: #f3f4f6;
}

.realestate-wrap {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #f3f4f6;
  color: #1f2937;
  min-height: 500px;
}

.re-header {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  background: #111827;
  color: #fff;
}

.re-header h2 {
  margin: 0;
  font-size: 18px;
  letter-spacing: 2px;
}

.re-header a {
  color: #9ca3af;
  text-decoration: none;
  margin-left: 20px;
  font-size: 13px;
  text-transform: uppercase;
}

.re-header a.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.re-main {
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  border-left: 4px solid #111827;
  padding-left: 10px;
  margin-bottom: 25px;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.prop-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s;
}

.prop-card:hover {
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
}

.img-box {
  position: relative;
  height: 180px;
}

.dummy-img {
  width: 100%;
  height: 100%;
}

.bg-1 {
  background: linear-gradient(45deg, #9ca3af, #d1d5db);
}

.bg-2 {
  background: linear-gradient(45deg, #6b7280, #9ca3af);
}

.status {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
}

.status.new {
  background: #ef4444;
}

.status.sold {
  background: #374151;
}

.prop-info {
  padding: 20px;
}

.prop-info h4 {
  margin: 0 0 10px 0;
  font-size: 15px;
  color: #111827;
}

.prop-price {
  font-size: 20px;
  font-weight: bold;
  color: #2563eb;
  margin: 0 0 15px 0;
}

.prop-specs {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #6b7280;
}

.prop-specs span {
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
}

.contact-form {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-btn {
  background: #111827;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}`
      }
    ]
  },

  // 📊 【Stage 13】ダッシュボード
  {
    id: 13,
    category: '中級：ガチ連動Webサイト',
    title: '中級 13：管理画面（Dashboard）レイアウト',
    description: '左サイドバー固定＋右メインコンテンツという、Webアプリの王道構造です。',
    mission: 'フレックスボックスを用いて、画面いっぱいに広がるUIを構築してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel - Overview</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dash-layout">
  <aside class="sidebar">
    <div class="sys-title">Admin Panel</div>
    <nav class="side-nav">
      <a href="index.html" class="active">📊 Overview</a>
      <a href="users.html">👥 Users</a>
      <a href="#">⚙️ Settings</a>
    </nav>
  </aside>
  <div class="main-wrapper">
    <header class="topbar">
      <div class="search">
        <input type="text" placeholder="Search...">
      </div>
      <div class="user-profile">Admin</div>
    </header>
    <main class="dash-content">
      <h2 class="dash-title">Dashboard Overview</h2>
      <div class="stat-cards">
        <div class="stat-card">
          <div class="stat-name">Total Sales</div>
          <div class="stat-val">¥1,240,500</div>
        </div>
        <div class="stat-card">
          <div class="stat-name">Active Users</div>
          <div class="stat-val">8,234</div>
        </div>
        <div class="stat-card">
          <div class="stat-name">Conversion Rate</div>
          <div class="stat-val">4.5%</div>
        </div>
      </div>
      <div class="chart-mockup">
        <h3>Monthly Revenue</h3>
        <div class="bar-chart">
          <div class="bar" style="height: 60%"></div>
          <div class="bar" style="height: 80%"></div>
          <div class="bar" style="height: 40%"></div>
          <div class="bar" style="height: 90%"></div>
        </div>
      </div>
    </main>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'users.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel - Users</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dash-layout">
  <aside class="sidebar">
    <div class="sys-title">Admin Panel</div>
    <nav class="side-nav">
      <a href="index.html">📊 Overview</a>
      <a href="users.html" class="active">👥 Users</a>
      <a href="#">⚙️ Settings</a>
    </nav>
  </aside>
  <div class="main-wrapper">
    <header class="topbar">
      <div class="search">
        <input type="text" placeholder="Search users...">
      </div>
      <div class="user-profile">Admin</div>
    </header>
    <main class="dash-content">
      <h2 class="dash-title">User Management</h2>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#001</td>
            <td>John Doe</td>
            <td>Admin</td>
            <td><span class="status-badge green">Active</span></td>
          </tr>
          <tr>
            <td>#002</td>
            <td>Jane Smith</td>
            <td>Editor</td>
            <td><span class="status-badge gray">Offline</span></td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Dashboard Layout Styles */
body {
  margin: 0;
  height: 100vh;
}

.dash-layout {
  display: flex;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: #f1f5f9;
  color: #334155;
}

.sidebar {
  width: 250px;
  background: #1e293b;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
}

.sys-title {
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #334155;
  letter-spacing: 1px;
}

.side-nav {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}

.side-nav a {
  padding: 15px 20px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.2s;
}

.side-nav a:hover, .side-nav a.active {
  background: #334155;
  color: #fff;
  border-left: 4px solid #38bdf8;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.search input {
  padding: 8px 15px;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  width: 250px;
  outline: none;
}

.user-profile {
  font-weight: bold;
  color: #0f172a;
}

.dash-content {
  padding: 30px;
  overflow-y: auto;
}

.dash-title {
  margin: 0 0 25px 0;
  font-size: 22px;
  color: #0f172a;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.stat-name {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.stat-val {
  font-size: 28px;
  font-weight: bold;
  color: #0f172a;
}

.chart-mockup {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.chart-mockup h3 {
  margin: 0 0 20px 0;
  font-size: 15px;
}

.bar-chart {
  height: 200px;
  display: flex;
  align-items: flex-end;
  gap: 15px;
  border-bottom: 2px solid #cbd5e1;
  padding-bottom: 10px;
}

.bar {
  flex: 1;
  background: #38bdf8;
  border-radius: 4px 4px 0 0;
  transition: height 0.5s;
}

.bar:hover {
  background: #0284c7;
}

.user-table {
  width: 100%;
  background: #fff;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.user-table th, .user-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.user-table th {
  background: #f8fafc;
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
}

.status-badge.green {
  background: #dcfce7;
  color: #059669;
}

.status-badge.gray {
  background: #f1f5f9;
  color: #64748b;
}`
      }
    ]
  },

  // ✈️ 【Stage 14】旅行代理店
  {
    id: 14,
    category: '中級：ガチ連動Webサイト',
    title: '中級 14：旅行サイトの検索ヒーローUI',
    description: '背景画像の上に検索フォームを浮かべる、トラベル系で必須のレイアウトです。',
    mission: '背景のオーバーレイと、フォーム要素の横並び配置を完璧に記述してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voyage - Explore</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="travel-site">
  <nav class="t-nav">
    <div class="t-logo">🌍 Voyage</div>
    <div class="t-menu">
      <a href="index.html" class="active">Explore</a>
      <a href="dest.html">Destinations</a>
    </div>
  </nav>
  <div class="t-hero">
    <div class="t-overlay"></div>
    <div class="t-hero-content">
      <h1>見知らぬ世界へ、飛び出そう。</h1>
      <p>あなたにぴったりの最高の旅行プランを見つけます。</p>
      <form class="t-search-form">
        <input type="text" placeholder="目的地 (例: ハワイ)">
        <input type="date">
        <button type="button">検索する</button>
      </form>
    </div>
  </div>
  <section class="t-section">
    <h2>人気の目的地</h2>
    <div class="t-cards">
      <div class="t-card">
        <h3>🌺 Hawaii</h3>
        <p>常夏の楽園でリフレッシュ</p>
      </div>
      <div class="t-card">
        <h3>🗼 Paris</h3>
        <p>芸術と花の都を巡る</p>
      </div>
    </div>
  </section>
</div>
</body>
</html>`
      },
      {
        fileName: 'dest.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voyage - Destinations</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="travel-site">
  <nav class="t-nav" style="background:#1e3a8a;">
    <div class="t-logo">🌍 Voyage</div>
    <div class="t-menu">
      <a href="index.html">Explore</a>
      <a href="dest.html" class="active">Destinations</a>
    </div>
  </nav>
  <section class="t-section" style="padding-top:100px;">
    <h2>Destination List</h2>
    <div class="list-grid">
      <div class="d-item">Hawaii - $1,200~</div>
      <div class="d-item">Paris - $1,500~</div>
      <div class="d-item">New York - $1,300~</div>
    </div>
    <a href="index.html" style="display:block; margin-top:20px; color:#1e3a8a;">⬅ トップに戻る</a>
  </section>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Travel Site Styles */
body {
  margin: 0;
}

.travel-site {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  min-height: 500px;
}

.t-nav {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  box-sizing: border-box;
  z-index: 10;
}

.t-logo {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.t-menu a {
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
  font-size: 14px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.t-menu a.active {
  border-bottom: 2px solid #fff;
  font-weight: bold;
}

.t-hero {
  position: relative;
  height: 500px;
  background: url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.t-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
}

.t-hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
}

.t-hero-content h1 {
  font-size: 42px;
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.t-hero-content p {
  font-size: 16px;
  margin-bottom: 30px;
  text-shadow: 0 1px 5px rgba(0,0,0,0.3);
}

.t-search-form {
  display: flex;
  background: #fff;
  padding: 10px;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.t-search-form input {
  flex: 1;
  border: none;
  padding: 15px 20px;
  font-size: 16px;
  outline: none;
  background: transparent;
}

.t-search-form input[type="text"] {
  border-right: 1px solid #e2e8f0;
}

.t-search-form button {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 0 30px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.t-search-form button:hover {
  background: #1d4ed8;
}

.t-section {
  padding: 60px 40px;
  background: #f8fafc;
}

.t-section h2 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 40px;
  color: #0f172a;
}

.t-cards {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.t-card {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.t-card h3 {
  margin: 0 0 10px 0;
  color: #2563eb;
}

.t-card p {
  margin: 0;
  color: #64748b;
}

.list-grid {
  display: grid;
  gap: 15px;
}

.d-item {
  background: #fff;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: bold;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeAcademy - Course</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="edu-wrap">
  <header class="e-head">
    <div class="e-logo">CodeAcademy</div>
    <nav>
      <a href="index.html" class="active">Course</a>
      <a href="about.html">Instructor</a>
    </nav>
  </header>
  <main class="e-main">
    <div class="e-video-area">
      <div class="video-player">▶ PLAY VIDEO</div>
      <h2>React Hooks 徹底マスター講座</h2>
      <p>このコースでは、最新のReact開発で必須となるHooksの仕組みをゼロから学びます。</p>
    </div>
    <aside class="e-curriculum">
      <h3>Curriculum</h3>
      <div class="chapter-list">
        <div class="chapter completed">はじめに - 環境構築</div>
        <div class="chapter active">useStateの基礎と応用</div>
        <div class="chapter">useEffectと副作用</div>
        <div class="chapter">カスタムフックの作成</div>
      </div>
    </aside>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'about.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeAcademy - Instructor</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="edu-wrap">
  <header class="e-head">
    <div class="e-logo">CodeAcademy</div>
    <nav>
      <a href="index.html">Course</a>
      <a href="about.html" class="active">Instructor</a>
    </nav>
  </header>
  <main class="e-main" style="display:block; max-width:800px; margin:0 auto;">
    <h2>Instructor Profile</h2>
    <div style="background:#fff; padding:30px; border-radius:8px; border:1px solid #e2e8f0;">
      <h3>Kenji Developer</h3>
      <p>フロントエンド歴10年のベテランエンジニア。数々の大規模Webアプリケーションの設計を担当。</p>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Education Platform Styles */
body {
  margin: 0;
  background: #f8fafc;
}

.edu-wrap {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #334155;
  min-height: 500px;
}

.e-head {
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.e-logo {
  font-weight: 800;
  color: #6366f1;
  font-size: 18px;
}

.e-head a {
  margin-left: 20px;
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.e-head a.active {
  color: #6366f1;
}

.e-main {
  display: flex;
  gap: 30px;
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.e-video-area {
  flex: 2;
}

.video-player {
  background: #0f172a;
  height: 350px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.e-video-area h2 {
  font-size: 24px;
  color: #0f172a;
  margin: 0 0 10px 0;
}

.e-video-area p {
  line-height: 1.6;
  color: #475569;
}

.e-curriculum {
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  height: fit-content;
}

.e-curriculum h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 10px;
}

.chapter-list {
  counter-reset: chapter-counter;
}

.chapter {
  position: relative;
  padding: 12px 12px 12px 40px;
  margin-bottom: 8px;
  background: #f8fafc;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bold;
  color: #64748b;
  cursor: pointer;
}

.chapter::before {
  counter-increment: chapter-counter;
  content: counter(chapter-counter);
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: #cbd5e1;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.chapter.completed {
  background: #fff;
  border: 1px solid #e2e8f0;
}

.chapter.completed::before {
  background: #10b981;
  content: "✓";
}

.chapter.active {
  background: #e0e7ff;
  color: #4f46e5;
  border: 1px solid #c7d2fe;
}

.chapter.active::before {
  background: #4f46e5;
}`
      }
    ]
  },

  // 🍽️ 【Stage 16】高級レストラン
  {
    id: 16,
    category: '中級：ガチ連動Webサイト',
    title: '中級 16：ファインダイニングのWebサイト',
    description: '明朝体を用い、画像とテキストを交互に配置するエレガントなレイアウトです。',
    mission: '洗練された余白と、Flexboxの「row-reverse」による左右反転配置を実装してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>L'Étoile - Concept</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dine-wrap">
  <header class="d-head">
    <h1>L'Étoile</h1>
    <nav>
      <a href="index.html" class="active">Concept</a>
      <a href="menu.html">Menu</a>
    </nav>
  </header>
  <main class="d-main">
    <section class="d-split">
      <div class="d-img bg-wine"></div>
      <div class="d-text">
        <h2>至高のペアリングを。</h2>
        <p>厳選された季節の食材と、世界中から集められたワインが織りなす芸術的なひととき。</p>
      </div>
    </section>
    <section class="d-split reverse">
      <div class="d-img bg-chef"></div>
      <div class="d-text">
        <h2>シェフの哲学</h2>
        <p>伝統的なフレンチの技法をベースに、現代的なエッセンスを加えた革新的な料理を提供します。</p>
      </div>
    </section>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'menu.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>L'Étoile - Menu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dine-wrap">
  <header class="d-head">
    <h1>L'Étoile</h1>
    <nav>
      <a href="index.html">Concept</a>
      <a href="menu.html" class="active">Menu</a>
    </nav>
  </header>
  <main class="d-main">
    <div class="menu-list">
      <h2>Dinner Course</h2>
      <div class="course-item">
        <h3>Menu Dégustation <span>¥18,000</span></h3>
        <p>アミューズ / 前菜2品 / 魚料理 / 肉料理 / デザート / 小菓子</p>
      </div>
      <div class="course-item">
        <h3>Menu Spécial <span>¥25,000</span></h3>
        <p>シェフおまかせの特別コース（全8品）</p>
      </div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Fine Dining Styles */
body {
  margin: 0;
  background: #0a0a0a;
}

.dine-wrap {
  font-family: 'Times New Roman', Times, serif;
  background: #0a0a0a;
  color: #d4af37;
  min-height: 500px;
}

.d-head {
  text-align: center;
  padding: 40px 20px;
  border-bottom: 1px solid #333;
}

.d-head h1 {
  font-size: 36px;
  font-weight: normal;
  letter-spacing: 4px;
  margin: 0 0 20px 0;
}

.d-head a {
  color: #888;
  text-decoration: none;
  margin: 0 15px;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: color 0.3s;
}

.d-head a:hover, .d-head a.active {
  color: #d4af37;
}

.d-main {
  padding: 60px 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.d-split {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-bottom: 80px;
}

.d-split.reverse {
  flex-direction: row-reverse;
}

.d-img {
  flex: 1;
  height: 350px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
}

.bg-wine {
  background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80');
}

.bg-chef {
  background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80');
}

.d-text {
  flex: 1;
}

.d-text h2 {
  font-size: 28px;
  font-weight: normal;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.d-text p {
  font-size: 14px;
  line-height: 2;
  color: #aaa;
}

.menu-list {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.menu-list h2 {
  font-weight: normal;
  font-size: 24px;
  border-bottom: 1px solid #d4af37;
  padding-bottom: 10px;
  margin-bottom: 40px;
  letter-spacing: 3px;
}

.course-item {
  margin-bottom: 40px;
}

.course-item h3 {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px dotted #333;
  padding-bottom: 5px;
}

.course-item span {
  font-size: 14px;
}

.course-item p {
  font-size: 13px;
  color: #888;
  text-align: left;
  margin: 0;
}`
      }
    ]
  },

  // 🤝 【Stage 17】採用・リクルート
  {
    id: 17,
    category: '中級：ガチ連動Webサイト',
    title: '中級 17：リクルート（採用）サイトの選考フロー',
    description: '矢印を用いたステップ進行UIや、熱いメッセージを伝える採用特設ページです。',
    mission: '疑似要素（::after）を使った三角形の作成技法を習得してください。',
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recruit 2026 - Message</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="recruit-wrap">
  <header class="rec-head">
    <div class="r-logo">RECRUIT 2026</div>
    <nav>
      <a href="index.html" class="active">Message</a>
      <a href="flow.html">Flow</a>
    </nav>
  </header>
  <main class="rec-main">
    <div class="message-box">
      <h2>未完成な君こそ、<br>未来の主役だ。</h2>
      <p>私たちは完璧なスキルを求めていません。変化を恐れず、失敗から学び、共に成長できる「熱量」を探しています。</p>
      <a href="flow.html" class="btn-rec">選考フローを見る ➔</a>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'flow.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recruit 2026 - Flow</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="recruit-wrap">
  <header class="rec-head">
    <div class="r-logo">RECRUIT 2026</div>
    <nav>
      <a href="index.html">Message</a>
      <a href="flow.html" class="active">Flow</a>
    </nav>
  </header>
  <main class="rec-main">
    <h3 class="section-ttl">選考プロセス</h3>
    <div class="step-flow">
      <div class="step"><span>STEP 01</span>書類選考</div>
      <div class="step"><span>STEP 02</span>一次面接 (Web)</div>
      <div class="step"><span>STEP 03</span>最終面接 (役員)</div>
      <div class="step final">内定</div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Recruitment Styles */
body {
  margin: 0;
  background: #fff;
}

.recruit-wrap {
  font-family: 'Noto Sans JP', sans-serif;
  background: #fff;
  color: #333;
  min-height: 500px;
}

.rec-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: #000;
  color: #fff;
}

.r-logo {
  font-weight: 900;
  font-size: 20px;
  letter-spacing: 2px;
}

.rec-head a {
  color: #aaa;
  text-decoration: none;
  margin-left: 20px;
  font-weight: bold;
  font-size: 14px;
}

.rec-head a.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.rec-main {
  padding: 60px 40px;
  max-width: 900px;
  margin: 0 auto;
}

.message-box {
  text-align: center;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 8px solid #000;
}

.message-box h2 {
  font-size: 32px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #000;
}

.message-box p {
  font-size: 15px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 30px;
  font-weight: bold;
}

.btn-rec {
  display: inline-block;
  background: #000;
  color: #fff;
  padding: 15px 30px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  transition: transform 0.2s;
}

.btn-rec:hover {
  transform: scale(1.05);
}

.section-ttl {
  text-align: center;
  font-size: 24px;
  margin-bottom: 40px;
}

.step-flow {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.step {
  position: relative;
  background: #f1f3f5;
  padding: 20px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
}

.step span {
  display: block;
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
}

.step:not(.final)::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 15px 15px 0 15px;
  border-style: solid;
  border-color: #f1f3f5 transparent transparent transparent;
  z-index: 10;
}

.step.final {
  background: #000;
  color: #fff;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visionary - Work</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="creative-bg">
  <div class="blob shape-1"></div>
  <div class="blob shape-2"></div>
  <div class="glass-container">
    <header class="g-head">
      <div class="g-logo">Visionary</div>
      <nav>
        <a href="index.html" class="active">Work</a>
        <a href="about.html">About</a>
      </nav>
    </header>
    <main class="g-main">
      <h2>Crafting the Future</h2>
      <p>デザインとテクノロジーの境界線を溶かし、未知の体験を創造するデジタルエージェンシー。</p>
      <div class="work-grid">
        <div class="glass-card">
          <h3>Project Alpha</h3>
          <p>Web3 Platform UI/UX</p>
        </div>
        <div class="glass-card">
          <h3>Project Beta</h3>
          <p>AI Generator App</p>
        </div>
      </div>
    </main>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'about.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visionary - About</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="creative-bg">
  <div class="blob shape-1" style="left:10%; top:60%;"></div>
  <div class="blob shape-2" style="right:20%; top:20%;"></div>
  <div class="glass-container">
    <header class="g-head">
      <div class="g-logo">Visionary</div>
      <nav>
        <a href="index.html">Work</a>
        <a href="about.html" class="active">About</a>
      </nav>
    </header>
    <main class="g-main">
      <h2>Who We Are</h2>
      <div class="glass-card" style="margin-top:20px;">
        <h3>Core Values</h3>
        <p>1. 既成概念を疑え<br>2. 細部に神を宿せ<br>3. ユーザーの心を揺さぶれ</p>
      </div>
    </main>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Glassmorphism Styles */
body {
  margin: 0;
  background: #0f172a;
}

.creative-bg {
  position: relative;
  min-height: 600px;
  background: #0f172a;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.blob {
  position: absolute;
  filter: blur(60px);
  border-radius: 50%;
  opacity: 0.6;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: #c026d3;
  top: -50px;
  left: -50px;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: #3b82f6;
  bottom: -100px;
  right: -50px;
}

.glass-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 900px;
  min-height: 500px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
}

.g-head {
  display: flex;
  justify-content: space-between;
  padding: 30px 40px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.g-logo {
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 2px;
}

.g-head a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  margin-left: 20px;
  font-weight: bold;
  transition: color 0.3s;
}

.g-head a.active, .g-head a:hover {
  color: #fff;
}

.g-main {
  padding: 50px 40px;
  color: #fff;
  flex: 1;
}

.g-main h2 {
  font-size: 36px;
  margin: 0 0 15px 0;
  background: linear-gradient(to right, #e879f9, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.g-main p {
  color: rgba(255,255,255,0.8);
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
}

.work-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 25px;
  border-radius: 16px;
  transition: transform 0.3s, background 0.3s;
}

.glass-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
}

.glass-card h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #fff;
}

.glass-card p {
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StarterCamp - Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="cf-wrap">
  <header class="cf-header">
    <div class="cf-brand">StarterCamp</div>
    <nav>
      <a href="index.html" class="active">Project</a>
      <a href="rewards.html">Rewards</a>
    </nav>
  </header>
  <main class="cf-main">
    <div class="project-view">
      <div class="p-image">🏕️</div>
      <div class="p-info">
        <span class="category">ガジェット</span>
        <h2>次世代の超軽量・防水スマートテント</h2>
        <div class="stats">
          <div class="amount">¥4,500,000</div>
          <div class="goal">目標: ¥3,000,000</div>
        </div>
        <div class="progress-bg">
          <div class="progress-fill" style="width: 100%;"></div>
        </div>
        <div class="meta-data">
          <span>達成率: 150%</span>
          <span>支援者: 320人</span>
          <span>残り: 12日</span>
        </div>
        <a href="rewards.html" class="back-btn">プロジェクトを支援する</a>
      </div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'rewards.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StarterCamp - Rewards</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="cf-wrap">
  <header class="cf-header">
    <div class="cf-brand">StarterCamp</div>
    <nav>
      <a href="index.html">Project</a>
      <a href="rewards.html" class="active">Rewards</a>
    </nav>
  </header>
  <main class="cf-main">
    <h2>リターン（支援コース）一覧</h2>
    <div class="reward-list">
      <div class="reward-card">
        <h3>【早割】スマートテント1式</h3>
        <div class="r-price">¥25,000</div>
        <p>一般販売予定価格より30%OFFでご提供します。</p>
        <button class="support-btn">このコースで支援</button>
      </div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Crowdfunding Styles */
body {
  margin: 0;
  background: #f9fafb;
}

.cf-wrap {
  font-family: sans-serif;
  background: #f9fafb;
  color: #111827;
  min-height: 500px;
}

.cf-header {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.cf-brand {
  font-size: 20px;
  font-weight: 900;
  color: #10b981;
}

.cf-header a {
  text-decoration: none;
  color: #6b7280;
  font-weight: bold;
  margin-left: 20px;
}

.cf-header a.active {
  color: #111827;
  border-bottom: 2px solid #111827;
}

.cf-main {
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
}

.project-view {
  display: flex;
  gap: 30px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.p-image {
  flex: 1;
  background: #d1fae5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  border-radius: 8px;
  min-height: 250px;
}

.p-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category {
  display: inline-block;
  background: #f3f4f6;
  color: #4b5563;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
  width: fit-content;
}

.p-info h2 {
  margin: 0 0 20px 0;
  font-size: 22px;
  line-height: 1.4;
}

.stats {
  margin-bottom: 10px;
}

.amount {
  font-size: 28px;
  font-weight: 900;
  color: #10b981;
}

.goal {
  font-size: 13px;
  color: #6b7280;
}

.progress-bg {
  width: 100%;
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-fill {
  height: 100%;
  background: #10b981;
  border-radius: 6px;
}

.meta-data {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 25px;
}

.back-btn, .support-btn {
  background: #10b981;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 12px 0;
  border-radius: 6px;
  font-weight: bold;
  font-size: 15px;
  border: none;
  cursor: pointer;
  display: block;
  width: 100%;
}

.reward-card {
  background: #fff;
  border: 2px solid #e5e7eb;
  padding: 25px;
  border-radius: 8px;
  max-width: 400px;
}

.reward-card h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.r-price {
  font-size: 24px;
  font-weight: bold;
  color: #10b981;
  margin-bottom: 15px;
}

.reward-card p {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 20px;
  line-height: 1.5;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus Protocol - Ecosystem</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="web3-wrap">
  <header class="w3-head">
    <div class="w3-logo">⬡ NEXUS PROTOCOL</div>
    <nav>
      <a href="index.html" class="active">Ecosystem</a>
      <a href="token.html">Token</a>
    </nav>
  </header>
  <main class="w3-main">
    <div class="hero-glow">
      <h1>Decentralize Everything.</h1>
      <p>次世代の分散型金融（DeFi）を構築する、高速でセキュアなブロックチェーンプロトコル。</p>
      <div class="btn-group">
        <a href="#" class="btn-neon">Connect Wallet</a>
        <a href="token.html" class="btn-ghost">View Tokenomics</a>
      </div>
    </div>
    <div class="feature-nodes">
      <div class="node-card">
        <div class="icon">⚡</div>
        <h3>Ultra Fast</h3>
        <p>秒間10万トランザクションの圧倒的処理速度。</p>
      </div>
      <div class="node-card">
        <div class="icon">🔒</div>
        <h3>Secure</h3>
        <p>最新の暗号技術による堅牢なスマートコントラクト。</p>
      </div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'token.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus Protocol - Token</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="web3-wrap">
  <header class="w3-head">
    <div class="w3-logo">⬡ NEXUS PROTOCOL</div>
    <nav>
      <a href="index.html">Ecosystem</a>
      <a href="token.html" class="active">Token</a>
    </nav>
  </header>
  <main class="w3-main">
    <div class="token-box">
      <h2>$NEX Tokenomics</h2>
      <div class="stats-glow">
        <div class="stat">
          <span>Total Supply</span>
          1,000,000,000 NEX
        </div>
        <div class="stat">
          <span>Circulating</span>
          250,000,000 NEX
        </div>
      </div>
      <a href="index.html" class="btn-ghost" style="margin-top:30px;">⬅ Back to Home</a>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Web3 Crypto Styles */
body {
  margin: 0;
  background: #000;
}

.web3-wrap {
  font-family: 'Space Grotesk', sans-serif;
  background: #000;
  color: #fff;
  min-height: 600px;
}

.w3-head {
  display: flex;
  justify-content: space-between;
  padding: 25px 40px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.w3-logo {
  font-size: 20px;
  font-weight: 900;
  background: linear-gradient(90deg, #00ffcc, #7000ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.w3-head a {
  color: #888;
  text-decoration: none;
  margin-left: 25px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s;
}

.w3-head a.active, .w3-head a:hover {
  color: #00ffcc;
  text-shadow: 0 0 10px rgba(0,255,204,0.5);
}

.w3-main {
  padding: 60px 40px;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.hero-glow h1 {
  font-size: 48px;
  margin: 0 0 20px 0;
  font-weight: 900;
  letter-spacing: -1px;
}

.hero-glow p {
  font-size: 16px;
  color: #aaa;
  max-width: 600px;
  margin: 0 auto 40px auto;
  line-height: 1.6;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 80px;
}

.btn-neon {
  display: inline-block;
  background: transparent;
  color: #00ffcc;
  border: 2px solid #00ffcc;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 0 15px rgba(0,255,204,0.3), inset 0 0 10px rgba(0,255,204,0.2);
  transition: all 0.3s;
}

.btn-neon:hover {
  background: #00ffcc;
  color: #000;
  box-shadow: 0 0 30px rgba(0,255,204,0.6);
}

.btn-ghost {
  display: inline-block;
  background: rgba(255,255,255,0.05);
  color: #fff;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background 0.3s;
}

.btn-ghost:hover {
  background: rgba(255,255,255,0.1);
}

.feature-nodes {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.node-card {
  background: rgba(20,20,20,0.8);
  border: 1px solid rgba(112,0,255,0.3);
  padding: 30px;
  border-radius: 16px;
  width: 300px;
  box-shadow: 0 10px 30px rgba(112,0,255,0.1);
}

.icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.node-card h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
}

.node-card p {
  margin: 0;
  font-size: 14px;
  color: #888;
  line-height: 1.5;
}

.token-box {
  background: rgba(20,20,20,0.8);
  border: 1px solid rgba(0,255,204,0.3);
  padding: 50px;
  border-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.token-box h2 {
  font-size: 32px;
  margin: 0 0 30px 0;
}

.stats-glow {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat {
  background: #000;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #00ffcc;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat span {
  font-size: 12px;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}`
      }
    ]
  }
];