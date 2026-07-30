import type { TraceStage } from './traceTypes';

export const traceDataBeginner: TraceStage[] = [
  // ☕ 【Stage 1】モダンカフェ
  {
    id: 1,
    category: '初級：ガチ連動Webサイト',
    title: '初級 01：モダンカフェのWebサイト',
    description: 'インラインスタイルを排除し、クラス名で装飾を管理する基本です。',
    mission: 'DOCTYPE宣言やhead、bodyを含む本格的なHTML構造でカフェのWebサイトを書き写してください。',
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
  <title>MOON CAFE - Home</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="cafe-wrapper">
  <header class="cafe-header">
    <h1>☕ MOON CAFE</h1>
    <nav><a href="index.html" class="active">Home</a><a href="about.html">About</a></nav>
  </header>
  <main class="cafe-main">
    <section class="hero">
      <h2>月明かりが照らす、最高の一杯。</h2>
      <p>都会の喧騒を忘れ、静寂に包まれた極上の空間でこだわりの自家焙煎珈琲を。</p>
      <a href="about.html" class="btn-primary">こだわりを見る</a>
    </section>
    <section class="info">
      <h3>OPEN HOUR</h3>
      <p>平日・土日 : 11:00 - 21:00 (水曜定休)</p>
    </section>
  </main>
  <footer class="cafe-footer">&copy; 2026 MOON CAFE</footer>
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
  <title>MOON CAFE - About</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="cafe-wrapper">
  <header class="cafe-header">
    <h1>☕ MOON CAFE</h1>
    <nav><a href="index.html">Home</a><a href="about.html" class="active">About</a></nav>
  </header>
  <main class="cafe-main">
    <section class="story">
      <h2>私たちのこだわり</h2>
      <p>世界中の農園から直接買い付けた最高品質のスペシャリティコーヒーのみを使用。</p>
      <p>その日の気温や湿度に合わせて微調整する焙煎技術でコクを引き出します。</p>
      <a href="index.html" class="btn-secondary">⬅ トップへ戻る</a>
    </section>
  </main>
  <footer class="cafe-footer">&copy; 2026 MOON CAFE</footer>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Cafe Style */
body {
  margin: 0;
  background: #faf6f0;
}

.cafe-wrapper {
  font-family: sans-serif;
  background: #faf6f0;
  color: #433422;
  min-height: 400px;
}

.cafe-header {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #fff;
  border-bottom: 1px solid #e8dec9;
}

.cafe-header h1 {
  font-size: 18px;
  margin: 0;
}

.cafe-header a {
  margin-left: 15px;
  text-decoration: none;
  color: #8c6239;
}

.cafe-header a.active {
  font-weight: bold;
  color: #ef4444;
}

.cafe-main {
  padding: 30px 15px;
  text-align: center;
}

.hero h2 {
  font-size: 22px;
  margin-bottom: 10px;
}

.hero p, .story p {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.btn-primary {
  display: inline-block;
  background: #8c6239;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 15px;
}

.btn-secondary {
  display: inline-block;
  color: #8c6239;
  text-decoration: none;
  margin-top: 15px;
  border-bottom: 1px solid #8c6239;
}

.info {
  margin-top: 40px;
  background: #fff;
  padding: 15px;
  border: 1px solid #e8dec9;
}

.cafe-footer {
  text-align: center;
  padding: 15px;
  background: #2c1d11;
  color: #a8927e;
  font-size: 10px;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>John Doe - Profile</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="portfolio-wrap">
  <nav class="port-nav">
    <div class="port-logo">JOHN DOE</div>
    <div class="port-links"><a href="index.html" class="current">PROFILE</a><a href="works.html">WORKS</a></div>
  </nav>
  <div class="port-content">
    <img src="https://via.placeholder.com/80" alt="avatar" class="avatar">
    <h2>Frontend Developer</h2>
    <p>ReactとTypeScriptを愛するエンジニアです。美しいUIの実装を得意としています。</p>
    <ul class="skills">
      <li>HTML/CSS</li>
      <li>JavaScript</li>
      <li>React</li>
    </ul>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'works.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>John Doe - Works</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="portfolio-wrap">
  <nav class="port-nav">
    <div class="port-logo">JOHN DOE</div>
    <div class="port-links"><a href="index.html">PROFILE</a><a href="works.html" class="current">WORKS</a></div>
  </nav>
  <div class="port-content">
    <h2>My Projects</h2>
    <div class="project-card">
      <h3>TraceLab IDE</h3>
      <p>24インチ大画面に最適化した究極の写経・開発環境ツール。</p>
    </div>
    <div class="project-card">
      <h3>Moon Cafe</h3>
      <p>モダンなカフェのランディングページ実装。</p>
    </div>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Portfolio Style */
body {
  margin: 0;
  background: #0f172a;
}

.portfolio-wrap {
  font-family: monospace;
  background: #0f172a;
  color: #f8fafc;
  min-height: 400px;
  padding: 20px;
}

.port-nav {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.port-logo {
  font-weight: bold;
  color: #38bdf8;
}

.port-links a {
  color: #94a3b8;
  text-decoration: none;
  margin-left: 15px;
}

.port-links a.current {
  color: #38bdf8;
  border-bottom: 1px solid #38bdf8;
}

.port-content {
  text-align: center;
}

.avatar {
  border-radius: 50%;
  border: 2px solid #38bdf8;
  margin-bottom: 15px;
}

.skills {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.skills li {
  background: #1e293b;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 11px;
}

.project-card {
  background: #1e293b;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: left;
  border-left: 3px solid #38bdf8;
}

.project-card h3 {
  margin: 0 0 5px 0;
  color: #f8fafc;
}

.project-card p {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tech Startup - Home</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="corp-container">
  <header class="corp-top">
    <div class="corp-brand">TECH STARTUP</div>
  </header>
  <div class="corp-flex">
    <main class="corp-main">
      <h2>社会をアップデートする</h2>
      <p>私たちは最先端のAI技術を用いて、誰もが使いやすいシステムを開発しています。</p>
      <a href="service.html" class="corp-btn">事業内容を見る ➔</a>
    </main>
    <aside class="corp-side">
      <h4>NEWS</h4>
      <ul>
        <li>2026.05.01 - サイト公開</li>
        <li>2026.04.15 - 資金調達</li>
      </ul>
    </aside>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'service.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tech Startup - Service</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="corp-container">
  <header class="corp-top">
    <div class="corp-brand">TECH STARTUP</div>
  </header>
  <div class="corp-flex">
    <main class="corp-main">
      <h2>事業内容</h2>
      <div class="service-box">
        <h3>システム受託開発</h3>
        <p>お客様の課題を解決する最適なWebアプリケーションを構築します。</p>
      </div>
      <a href="index.html" class="corp-link">⬅ 会社概要へ戻る</a>
    </main>
    <aside class="corp-side">
      <h4>LINKS</h4>
      <ul>
        <li><a href="index.html">会社概要</a></li>
        <li><a href="service.html">事業内容</a></li>
      </ul>
    </aside>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Corporate Style */
body {
  margin: 0;
  background: #f3f4f6;
}

.corp-container {
  font-family: sans-serif;
  background: #f3f4f6;
  color: #1f2937;
  padding: 20px;
  min-height: 400px;
}

.corp-top {
  background: #1e3a8a;
  color: #fff;
  padding: 15px;
  border-radius: 6px 6px 0 0;
}

.corp-brand {
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 2px;
}

.corp-flex {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.corp-main {
  flex: 3;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.corp-side {
  flex: 1;
  background: #fff;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 12px;
}

.corp-side h4 {
  border-bottom: 2px solid #1e3a8a;
  padding-bottom: 5px;
  margin-top: 0;
}

.corp-side ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.corp-side li {
  margin-bottom: 8px;
  color: #4b5563;
}

.corp-btn {
  display: inline-block;
  background: #1e3a8a;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 10px;
}

.service-box {
  border: 1px solid #e5e7eb;
  padding: 10px;
  border-left: 4px solid #1e3a8a;
  margin-bottom: 15px;
}

.corp-link {
  color: #1e3a8a;
  font-size: 12px;
  text-decoration: none;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rock Festival 2026</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="fes-bg">
  <div class="fes-header">
    <h1>ROCK FESTIVAL 2026</h1>
    <nav><a href="index.html" class="neon">TOP</a><a href="ticket.html">TICKET</a></nav>
  </div>
  <div class="fes-hero">
    <h2 class="glitch">FEEL THE BEAT.</h2>
    <p>過去最大規模の野外フェスが遂に開幕。</p>
    <a href="ticket.html" class="buy-btn">TICKET NOW ➔</a>
  </div>
  <div class="lineup">
    <h3>LINE UP</h3>
    <div class="artist">The Echoes</div>
    <div class="artist">Neon Lights</div>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'ticket.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rock Festival - Ticket</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="fes-bg">
  <div class="fes-header">
    <h1>ROCK FESTIVAL 2026</h1>
    <nav><a href="index.html">TOP</a><a href="ticket.html" class="neon">TICKET</a></nav>
  </div>
  <div class="fes-hero">
    <h2 class="glitch">TICKET INFO</h2>
    <p>全席指定・先行抽選受付中</p>
    <div class="ticket-card">
      <h4>■ 2DAYS VIP PASS</h4>
      <span class="price">¥25,000</span>
    </div>
    <a href="index.html" class="back-link">⬅ TOPへ戻る</a>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Festival Style */
body {
  margin: 0;
  background: #000;
}

.fes-bg {
  font-family: 'Impact', sans-serif;
  background: #000;
  color: #fff;
  min-height: 400px;
  padding: 20px;
}

.fes-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}

.fes-header h1 {
  margin: 0;
  font-size: 20px;
  color: #facc15;
}

.fes-header a {
  color: #fff;
  text-decoration: none;
  margin-left: 15px;
}

.neon {
  color: #ec4899 !important;
  text-shadow: 0 0 10px #ec4899;
}

.fes-hero {
  text-align: center;
  padding: 40px 0;
}

.glitch {
  font-size: 32px;
  letter-spacing: 4px;
  color: #22d3ee;
  margin-bottom: 10px;
}

.buy-btn {
  display: inline-block;
  background: #ec4899;
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  margin-top: 20px;
}

.lineup {
  border: 1px solid #333;
  padding: 15px;
  text-align: center;
}

.artist {
  font-size: 18px;
  margin: 10px 0;
  border-bottom: 1px dashed #444;
}

.ticket-card {
  border: 2px solid #facc15;
  padding: 20px;
  margin: 20px auto;
  max-width: 300px;
}

.price {
  font-size: 24px;
  color: #22d3ee;
}

.back-link {
  display: block;
  margin-top: 20px;
  color: #9ca3af;
  text-decoration: none;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaskMaster - Home</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="app-promo">
  <header class="promo-header">
    <div class="app-name">✓ TaskMaster</div>
    <nav><a href="index.html" class="active-tab">ホーム</a><a href="feature.html">機能</a></nav>
  </header>
  <main class="promo-main">
    <div class="catch-copy">
      <h2>タスク管理を、もっと直感的に。</h2>
      <p>シンプルなスワイプ操作で、あなたの1日をデザインします。</p>
      <button class="dl-btn">Download Now</button>
    </div>
    <div class="mockup-img">📱 UI SCREEN</div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'feature.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaskMaster - Feature</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="app-promo">
  <header class="promo-header">
    <div class="app-name">✓ TaskMaster</div>
    <nav><a href="index.html">ホーム</a><a href="feature.html" class="active-tab">機能</a></nav>
  </header>
  <main class="promo-main flex-col">
    <h2>3つの特徴</h2>
    <div class="feature-list">
      <div class="f-item">① 爆速のスワイプ完了機能</div>
      <div class="f-item">② グラフによる自動分析</div>
      <div class="f-item">③ クラウド完全同期</div>
    </div>
    <a href="index.html" class="back-text">⬅ 戻る</a>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* App Promo Style */
body {
  margin: 0;
  background: #fafafa;
}

.app-promo {
  font-family: 'Helvetica', sans-serif;
  background: #fafafa;
  color: #333;
  padding: 20px;
  min-height: 400px;
}

.promo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.app-name {
  font-size: 18px;
  font-weight: bold;
  color: #8b5cf6;
}

.promo-header a {
  text-decoration: none;
  color: #9ca3af;
  margin-left: 15px;
  font-size: 14px;
}

.active-tab {
  color: #8b5cf6 !important;
  font-weight: bold;
}

.promo-main {
  display: flex;
  gap: 20px;
  align-items: center;
}

.promo-main.flex-col {
  flex-direction: column;
  align-items: flex-start;
}

.catch-copy {
  flex: 1;
}

.catch-copy h2 {
  font-size: 24px;
  line-height: 1.4;
  color: #1f2937;
  margin-bottom: 10px;
}

.catch-copy p {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 20px;
}

.dl-btn {
  background: #8b5cf6;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(139,92,246,0.3);
}

.mockup-img {
  flex: 1;
  background: #ede9fe;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: #8b5cf6;
  font-weight: bold;
}

.feature-list {
  width: 100%;
}

.f-item {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  border-left: 4px solid #8b5cf6;
}

.back-text {
  margin-top: 15px;
  color: #8b5cf6;
  text-decoration: none;
  font-size: 12px;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lumière Hair - Home</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="salon-base">
  <header class="salon-head">
    <div class="s-logo">Lumière Hair</div>
    <nav><a href="index.html" class="s-active">Home</a><a href="menu.html">Menu</a></nav>
  </header>
  <div class="s-hero">
    <h2>あなたの日常に、一筋の光を。</h2>
    <p>髪質改善とオーガニックカラーの専門店</p>
  </div>
  <div class="s-reserve">
    <p>お電話でのご予約</p>
    <div class="tel">012-3456-7890</div>
    <a href="menu.html" class="s-btn">メニューを見る ➔</a>
  </div>
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
  <title>Lumière Hair - Menu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="salon-base">
  <header class="salon-head">
    <div class="s-logo">Lumière Hair</div>
    <nav><a href="index.html">Home</a><a href="menu.html" class="s-active">Menu</a></nav>
  </header>
  <div class="s-menu-list">
    <h3>PRICE LIST</h3>
    <ul class="prices">
      <li><span>Cut</span> <span>¥5,500</span></li>
      <li><span>Organic Color</span> <span>¥8,800</span></li>
      <li><span>Head Spa</span> <span>¥4,000</span></li>
    </ul>
    <a href="index.html" class="s-back">⬅ 戻る</a>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Salon Style */
body {
  margin: 0;
  background: #fffcf9;
}

.salon-base {
  font-family: serif;
  background: #fffcf9;
  color: #5c544d;
  padding: 0 20px 30px;
  min-height: 400px;
}

.salon-head {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #efe8e1;
}

.s-logo {
  font-size: 20px;
  letter-spacing: 2px;
}

.salon-head a {
  text-decoration: none;
  color: #a39b94;
  margin-left: 20px;
  font-size: 13px;
}

.s-active {
  color: #5c544d !important;
}

.s-hero {
  text-align: center;
  padding: 50px 0;
}

.s-hero h2 {
  font-weight: normal;
  font-size: 22px;
  margin-bottom: 15px;
}

.s-hero p {
  font-size: 12px;
  color: #8a827b;
}

.s-reserve {
  background: #efe8e1;
  padding: 30px;
  text-align: center;
  border-radius: 4px;
}

.tel {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0 20px;
  letter-spacing: 1px;
}

.s-btn {
  display: inline-block;
  background: #5c544d;
  color: #fff;
  padding: 10px 30px;
  text-decoration: none;
  font-size: 12px;
}

.s-menu-list {
  padding: 40px 0;
}

.s-menu-list h3 {
  text-align: center;
  font-weight: normal;
  letter-spacing: 2px;
  border-bottom: 1px solid #efe8e1;
  padding-bottom: 10px;
}

.prices {
  list-style: none;
  padding: 0;
}

.prices li {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px dashed #efe8e1;
  font-size: 14px;
}

.s-back {
  display: block;
  text-align: center;
  margin-top: 30px;
  color: #8a827b;
  text-decoration: none;
  font-size: 12px;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iron 24 Fitness - Home</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="gym-wrap">
  <header class="gym-head">
    <div class="g-logo">IRON 24 FITNESS</div>
    <nav><a href="index.html" class="g-current">TOP</a><a href="join.html">JOIN</a></nav>
  </header>
  <main class="g-main">
    <h2 class="g-hero">限界を越えろ。</h2>
    <p class="g-sub">24時間365日、あなたの挑戦を待っている最新のマシン設備。</p>
    <div class="g-features">
      <div class="g-box">初心者歓迎</div>
      <div class="g-box">シャワー完備</div>
    </div>
    <a href="join.html" class="g-action">入会案内へ ➔</a>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'join.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iron 24 Fitness - Join</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="gym-wrap">
  <header class="gym-head">
    <div class="g-logo">IRON 24 FITNESS</div>
    <nav><a href="index.html">TOP</a><a href="join.html" class="g-current">JOIN</a></nav>
  </header>
  <main class="g-main">
    <h2 class="g-title">MEMBERSHIP</h2>
    <div class="g-plan">
      <h3>レギュラー会員</h3>
      <p>月額 ¥7,480 (税込)</p>
      <span>全店舗利用可能</span>
    </div>
    <a href="index.html" class="g-back">⬅ ホームに戻る</a>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Gym Style */
body {
  margin: 0;
  background: #111;
}

.gym-wrap {
  font-family: 'Arial Black', Impact, sans-serif;
  background: #111;
  color: #eee;
  min-height: 400px;
  padding: 20px;
}

.gym-head {
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid #dc2626;
  padding-bottom: 10px;
}

.g-logo {
  font-size: 20px;
  color: #fff;
}

.gym-head a {
  color: #666;
  text-decoration: none;
  margin-left: 15px;
  font-family: sans-serif;
  font-weight: bold;
}

.g-current {
  color: #dc2626 !important;
}

.g-main {
  padding: 40px 0;
  text-align: center;
}

.g-hero {
  font-size: 36px;
  margin: 0 0 10px 0;
  color: #dc2626;
}

.g-sub {
  font-family: sans-serif;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 30px;
}

.g-features {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.g-box {
  border: 2px solid #333;
  padding: 10px 20px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
}

.g-action {
  display: inline-block;
  background: #dc2626;
  color: #fff;
  padding: 15px 30px;
  text-decoration: none;
  font-size: 16px;
  text-transform: uppercase;
}

.g-title {
  font-size: 28px;
  color: #fff;
}

.g-plan {
  background: #222;
  padding: 20px;
  border-left: 5px solid #dc2626;
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
}

.g-plan h3 {
  margin: 0 0 10px 0;
  font-family: sans-serif;
}

.g-plan p {
  font-size: 20px;
  color: #dc2626;
  margin: 0 0 5px 0;
}

.g-plan span {
  font-family: sans-serif;
  font-size: 11px;
  color: #888;
}

.g-back {
  display: block;
  margin-top: 30px;
  color: #666;
  font-family: sans-serif;
  text-decoration: none;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevLog - Articles</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="blog-container">
  <header class="b-header">
    <div class="b-title">DevLog.</div>
    <nav><a href="index.html" class="active">Articles</a><a href="post.html">Latest</a></nav>
  </header>
  <main class="b-main">
    <h2>Latest Posts</h2>
    <article class="post-card">
      <span class="tag">React</span>
      <h3><a href="post.html">React Hooksの使い分け完全ガイド</a></h3>
      <p>2026.05.10 - useStateとuseEffectの基礎から応用まで。</p>
    </article>
    <article class="post-card">
      <span class="tag">CSS</span>
      <h3>Grid Layoutでタイルを作る方法</h3>
      <p>2026.04.22 - 複雑なレイアウトもGridなら数行で完結。</p>
    </article>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'post.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevLog - Post</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="blog-container">
  <header class="b-header">
    <div class="b-title">DevLog.</div>
    <nav><a href="index.html">Articles</a><a href="post.html" class="active">Latest</a></nav>
  </header>
  <main class="b-main">
    <article class="single-post">
      <span class="tag">React</span>
      <h1>React Hooksの使い分け完全ガイド</h1>
      <div class="date">Published on 2026.05.10</div>
      <div class="content">
        <p>Reactでの開発において、状態管理は非常に重要です。この記事では...</p>
      </div>
    </article>
    <a href="index.html" class="b-home">⬅ 記事一覧に戻る</a>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Blog Style */
body {
  margin: 0;
  background: #fff;
}

.blog-container {
  font-family: -apple-system, sans-serif;
  background: #fff;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  min-height: 400px;
}

.b-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eaeaea;
}

.b-title {
  font-size: 20px;
  font-weight: 800;
}

.b-header a {
  text-decoration: none;
  color: #888;
  margin-left: 15px;
  font-size: 14px;
}

.b-header a.active {
  color: #2563eb;
  font-weight: bold;
}

.b-main {
  padding: 20px;
}

.b-main h2 {
  border-left: 4px solid #2563eb;
  padding-left: 10px;
  font-size: 18px;
  margin-bottom: 20px;
}

.post-card {
  border: 1px solid #eaeaea;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.tag {
  background: #e0f2fe;
  color: #0369a1;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
}

.post-card h3 {
  margin: 10px 0 5px 0;
  font-size: 16px;
}

.post-card h3 a {
  color: #1f2937;
  text-decoration: none;
}

.post-card h3 a:hover {
  color: #2563eb;
}

.post-card p {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
}

.single-post h1 {
  font-size: 22px;
  margin: 10px 0;
}

.date {
  font-size: 12px;
  color: #888;
  margin-bottom: 20px;
}

.content {
  line-height: 1.8;
  color: #4b5563;
  font-size: 14px;
}

.b-home {
  display: inline-block;
  margin-top: 30px;
  color: #2563eb;
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Recipe - Top</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="recipe-base">
  <header class="r-head">
    <div class="r-logo">🍅 My Recipe</div>
    <nav><a href="index.html" class="active">Top</a><a href="detail.html">Recipe</a></nav>
  </header>
  <main class="r-main">
    <h2>今日のおすすめレシピ</h2>
    <div class="r-card">
      <div class="r-img">🍝</div>
      <div class="r-info">
        <h3>絶品・濃厚カルボナーラ</h3>
        <p>15分でできる、お店の味。</p>
        <a href="detail.html" class="r-btn">作り方を見る</a>
      </div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'detail.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Recipe - Detail</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="recipe-base">
  <header class="r-head">
    <div class="r-logo">🍅 My Recipe</div>
    <nav><a href="index.html">Top</a><a href="detail.html" class="active">Recipe</a></nav>
  </header>
  <main class="r-main">
    <h2>濃厚カルボナーラ</h2>
    <div class="r-section">
      <h4>材料 (2人分)</h4>
      <ul class="ingredients">
        <li>パスタ ... 200g</li>
        <li>ベーコン ... 50g</li>
        <li>卵黄 ... 2個</li>
        <li>粉チーズ ... 大さじ2</li>
      </ul>
    </div>
    <div class="r-section">
      <h4>作り方</h4>
      <ol class="steps">
        <li>パスタを茹でる。</li>
        <li>ベーコンをカリッと炒める。</li>
        <li>ボウルで卵黄とチーズを混ぜ、パスタと絡める。</li>
      </ol>
    </div>
    <a href="index.html" class="r-back">⬅ 戻る</a>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Recipe Style */
body {
  margin: 0;
  background: #fff7ed;
}

.recipe-base {
  font-family: sans-serif;
  background: #fff7ed;
  color: #431407;
  padding: 20px;
  min-height: 400px;
}

.r-head {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #fdba74;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.r-logo {
  font-size: 18px;
  font-weight: bold;
  color: #ea580c;
}

.r-head a {
  color: #fdba74;
  text-decoration: none;
  margin-left: 10px;
  font-weight: bold;
}

.r-head a.active {
  color: #ea580c;
}

.r-main h2 {
  font-size: 20px;
  text-align: center;
  color: #c2410c;
}

.r-card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  gap: 15px;
  box-shadow: 0 4px 6px rgba(234,88,12,0.1);
}

.r-img {
  font-size: 40px;
  background: #ffedd5;
  padding: 10px;
  border-radius: 8px;
}

.r-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.r-info p {
  margin: 0 0 10px 0;
  font-size: 12px;
  color: #7c2d12;
}

.r-btn {
  display: inline-block;
  background: #ea580c;
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 11px;
}

.r-section {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #fed7aa;
}

.r-section h4 {
  margin: 0 0 10px 0;
  color: #ea580c;
  border-bottom: 1px dashed #fed7aa;
  padding-bottom: 5px;
}

.ingredients {
  padding-left: 20px;
  font-size: 13px;
  color: #7c2d12;
  margin: 0;
}

.steps {
  padding-left: 20px;
  font-size: 13px;
  color: #7c2d12;
  margin: 0;
}

.steps li {
  margin-bottom: 5px;
}

.r-back {
  display: block;
  text-align: center;
  color: #ea580c;
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;
}`
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
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kicks Store - Shop</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="ec-store">
  <header class="ec-header">
    <div class="ec-brand">KICKS STORE</div>
    <nav><a href="index.html" class="ec-active">SHOP</a><a href="cart.html">CART (1)</a></nav>
  </header>
  <main class="ec-main">
    <div class="product-wrap">
      <div class="p-image">👟</div>
      <div class="p-details">
        <h2>AIR MAX VINTAGE</h2>
        <p class="p-desc">クラシックなデザインと最新のクッション性を融合した一足。</p>
        <div class="p-price">¥14,300 <span class="tax">税込</span></div>
        <a href="cart.html" class="add-cart-btn">カートに入れる</a>
      </div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'cart.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kicks Store - Cart</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="ec-store">
  <header class="ec-header">
    <div class="ec-brand">KICKS STORE</div>
    <nav><a href="index.html">SHOP</a><a href="cart.html" class="ec-active">CART (1)</a></nav>
  </header>
  <main class="ec-main">
    <h2>SHOPPING CART</h2>
    <div class="cart-item">
      <div class="c-name">AIR MAX VINTAGE x 1</div>
      <div class="c-price">¥14,300</div>
    </div>
    <div class="total-box">
      <span>合計:</span>
      <span class="total-price">¥14,300</span>
    </div>
    <button class="checkout-btn">レジへ進む</button>
    <a href="index.html" class="continue-link">⬅ 買い物を続ける</a>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* EC Style */
body {
  margin: 0;
  background: #fff;
}

.ec-store {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #fff;
  color: #111;
  padding: 20px;
  min-height: 400px;
}

.ec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #111;
  padding-bottom: 15px;
  margin-bottom: 30px;
}

.ec-brand {
  font-size: 22px;
  font-weight: 900;
  font-style: italic;
}

.ec-header a {
  text-decoration: none;
  color: #888;
  margin-left: 20px;
  font-size: 12px;
  font-weight: bold;
}

.ec-active {
  color: #111 !important;
  border-bottom: 2px solid #111;
}

.product-wrap {
  text-align: center;
}

.p-image {
  font-size: 80px;
  background: #f4f4f5;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.p-details h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.p-desc {
  color: #52525b;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.p-price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.tax {
  font-size: 10px;
  color: #71717a;
  font-weight: normal;
}

.add-cart-btn, .checkout-btn {
  display: block;
  width: 100%;
  background: #111;
  color: #fff;
  border: none;
  padding: 15px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  border-radius: 4px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e7;
  padding: 15px 0;
  margin-bottom: 20px;
}

.c-name {
  font-weight: bold;
  font-size: 14px;
}

.c-price {
  color: #52525b;
}

.total-box {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
}

.continue-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #52525b;
  text-decoration: none;
  font-size: 12px;
}`
      }
    ]
  }
];