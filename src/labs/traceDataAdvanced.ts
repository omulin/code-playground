import type { TraceStage } from './traceTypes';

export const traceDataAdvanced: TraceStage[] = [
  // 🍎 【Stage 21】Apple風プロダクトLP
  {
    id: 21,
    category: '上級：ガチ連動Webサイト',
    title: '上級 21：ハイエンドデバイスの製品LP（Apple風）',
    description: '巨大なタイポグラフィ、スクロールで追従するStickyナビ、黒背景に浮かぶ美しいグラデーションテキストなど、最高峰の製品紹介ページです。',
    mission: 'DOCTYPE宣言から始まる本格的な構造の中で、stickyやbackground-clipを完全に写経してください。',
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
  <title>X-Phone Pro - Overview</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="product-lp">
  <nav class="global-nav">
    <div class="nav-content"><a href="#" class="brand">X-DEVICE</a><a href="#">Mac</a><a href="#">iPad</a><a href="#">iPhone</a><a href="#">Support</a></div>
  </nav>
  <nav class="local-nav">
    <div class="local-content">
      <h2 class="product-name">X-Phone Pro</h2>
      <div class="local-links"><a href="index.html" class="active">概要</a><a href="specs.html">仕様</a><a href="#" class="buy-btn">購入</a></div>
    </div>
  </nav>
  <main class="lp-main">
    <section class="hero-section">
      <h1 class="hero-title">プロのその先へ。</h1>
      <p class="hero-subtitle">チタニウムの美しさと、A18チップの圧倒的パワー。</p>
      <div class="hero-image-placeholder">DEVICE FRONT VIEW</div>
    </section>
    <section class="feature-dark">
      <div class="feature-text">
        <h2 class="gradient-text">光を操る、新しいカメラ。</h2>
        <p>暗闇すらも、あなたのキャンバスに。</p>
      </div>
      <div class="camera-grid">
        <div class="lens">Ultra Wide</div>
        <div class="lens">Main 48MP</div>
        <div class="lens">Telephoto</div>
      </div>
    </section>
  </main>
  <footer class="lp-footer">Copyright &copy; 2026 X-DEVICE Inc. All rights reserved.</footer>
</div>
</body>
</html>`
      },
      {
        fileName: 'specs.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>X-Phone Pro - Specs</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="product-lp">
  <nav class="global-nav">
    <div class="nav-content"><a href="#" class="brand">X-DEVICE</a><a href="#">Mac</a><a href="#">iPad</a><a href="#">iPhone</a><a href="#">Support</a></div>
  </nav>
  <nav class="local-nav">
    <div class="local-content">
      <h2 class="product-name">X-Phone Pro</h2>
      <div class="local-links"><a href="index.html">概要</a><a href="specs.html" class="active">仕様</a><a href="#" class="buy-btn">購入</a></div>
    </div>
  </nav>
  <main class="lp-main">
    <section class="specs-section">
      <h1 class="specs-title">技術仕様</h1>
      <div class="spec-table">
        <div class="spec-row"><div class="spec-key">仕上げ</div><div class="spec-val">ブラックチタニウム<br>ホワイトチタニウム</div></div>
        <div class="spec-row"><div class="spec-key">容量</div><div class="spec-val">256GB / 512GB / 1TB</div></div>
        <div class="spec-row"><div class="spec-key">ディスプレイ</div><div class="spec-val">6.7インチ Super Retina XDR<br>ProMotionテクノロジー</div></div>
      </div>
    </section>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* High-End LP Styles */
body { margin: 0; background: #000; }
.product-lp { font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif; background: #000; color: #f5f5f7; min-height: 100vh; }
.global-nav { background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); height: 44px; font-size: 12px; position: fixed; top: 0; width: 100%; z-index: 100; }
.nav-content { max-width: 980px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; height: 100%; padding: 0 20px; }
.nav-content a { color: #d1d5db; text-decoration: none; transition: color 0.3s; }
.nav-content a:hover { color: #fff; }
.brand { font-weight: bold; color: #fff !important; }
.local-nav { background: rgba(20,20,20,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid #333; position: sticky; top: 44px; z-index: 90; }
.local-content { max-width: 980px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; }
.product-name { font-size: 20px; font-weight: 600; margin: 0; }
.local-links { display: flex; gap: 20px; align-items: center; font-size: 12px; }
.local-links a { color: #9ca3af; text-decoration: none; }
.local-links a.active { color: #fff; border-bottom: 1px solid #fff; padding-bottom: 2px; }
.buy-btn { background: #0071e3; color: #fff !important; padding: 4px 10px; border-radius: 20px; font-weight: bold; }
.lp-main { padding-top: 100px; text-align: center; }
.hero-section { padding: 80px 20px; }
.hero-title { font-size: 64px; font-weight: 700; letter-spacing: -2px; margin: 0 0 10px 0; }
.hero-subtitle { font-size: 24px; color: #86868b; margin-bottom: 50px; }
.hero-image-placeholder { width: 300px; height: 400px; border: 2px solid #333; border-radius: 40px; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: #444; font-weight: bold; background: linear-gradient(135deg, #111, #222); }
.feature-dark { background: #000; padding: 120px 20px; }
.gradient-text { font-size: 56px; font-weight: 800; background: linear-gradient(90deg, #ffb6ff, #b344ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 20px 0; }
.feature-text p { font-size: 20px; color: #a1a1a6; }
.camera-grid { display: flex; justify-content: center; gap: 20px; margin-top: 60px; }
.lens { width: 120px; height: 120px; border-radius: 50%; border: 4px solid #333; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; color: #666; background: radial-gradient(circle, #222, #000); }
.specs-section { max-width: 800px; margin: 0 auto; padding: 60px 20px; text-align: left; }
.specs-title { font-size: 40px; border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 40px; }
.spec-table { display: flex; flex-direction: column; gap: 0; }
.spec-row { display: flex; border-bottom: 1px solid #222; padding: 25px 0; }
.spec-key { width: 30%; font-weight: bold; color: #f5f5f7; }
.spec-val { width: 70%; color: #86868b; line-height: 1.6; }
.lp-footer { text-align: center; padding: 30px; font-size: 11px; color: #666; border-top: 1px solid #222; }`
      }
    ]
  },

  // 📝 【Stage 22】Notion風ドキュメントUI
  {
    id: 22,
    category: '上級：ガチ連動Webサイト',
    title: '上級 22：Notion風ドキュメントエディタUI',
    description: '左にネストされたツリー型サイドバー、右にパンくずリストとリッチテキストエディタ風のブロックを配置した最強のUIです。',
    mission: 'DOCTYPE宣言やhead、bodyを含む本格的なHTML構造の中で、calc()やcontenteditableを実装してください。',
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
  <title>Notion Clone - Specs</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="notion-clone">
  <aside class="n-sidebar">
    <div class="workspace-switcher"><span class="icon">💻</span> My Workspace</div>
    <div class="side-scroll">
      <div class="nav-group">
        <div class="nav-title">FAVORITES</div>
        <a href="index.html" class="nav-item active"><span class="emoji">📝</span> TraceLab 仕様書</a>
        <a href="roadmap.html" class="nav-item"><span class="emoji">🗺️</span> 開発ロードマップ</a>
      </div>
      <div class="nav-group">
        <div class="nav-title">PRIVATE</div>
        <div class="nav-item has-child"><span class="toggle">▶</span> <span class="emoji">📓</span> 日報</div>
        <div class="nav-item has-child"><span class="toggle">▼</span> <span class="emoji">💡</span> アイデアメモ</div>
        <div class="child-items">
          <a href="#" class="nav-item"><span class="emoji">📄</span> UI改善案</a>
        </div>
      </div>
    </div>
  </aside>
  <main class="n-main">
    <header class="n-topbar">
      <div class="breadcrumbs"><span>TraceLab プロジェクト</span> <span class="sep">/</span> <span>TraceLab 仕様書</span></div>
      <div class="top-actions"><button>Share</button><button>💬</button><button>•••</button></div>
    </header>
    <div class="n-editor">
      <h1 class="doc-title" contenteditable="true">TraceLab 完全仕様書</h1>
      <div class="doc-blocks">
        <div class="block-callout">
          <span class="emoji">💡</span>
          <p>このページは、TraceLabのアーキテクチャとUIコンポーネントの設計思想をまとめたドキュメントです。</p>
        </div>
        <h2 contenteditable="true">1. 概要 (Overview)</h2>
        <p contenteditable="true">24インチモニターの画面幅をフルに使い切る、3等分のエッジトゥエッジIDE画面をReactとTailwind CSSで構築します。</p>
        <ul class="block-list">
          <li contenteditable="true">左カラム: 正解コード</li>
          <li contenteditable="true">中央カラム: 入力エリア</li>
          <li contenteditable="true">右カラム: ライブプレビュー</li>
        </ul>
        <div class="block-quote" contenteditable="true">"本物の実務コードを写経することで、真のフロントエンド力が身につく。"</div>
      </div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'roadmap.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notion Clone - Roadmap</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="notion-clone">
  <aside class="n-sidebar">
    <div class="workspace-switcher"><span class="icon">💻</span> My Workspace</div>
    <div class="side-scroll">
      <div class="nav-group">
        <div class="nav-title">FAVORITES</div>
        <a href="index.html" class="nav-item"><span class="emoji">📝</span> TraceLab 仕様書</a>
        <a href="roadmap.html" class="nav-item active"><span class="emoji">🗺️</span> 開発ロードマップ</a>
      </div>
    </div>
  </aside>
  <main class="n-main">
    <header class="n-topbar">
      <div class="breadcrumbs"><span>TraceLab プロジェクト</span> <span class="sep">/</span> <span>開発ロードマップ</span></div>
    </header>
    <div class="n-editor">
      <h1 class="doc-title" contenteditable="true">開発ロードマップ 2026</h1>
      <div class="kanban-preview">
        <div class="k-col"><h4>To Do</h4><div class="k-card">Web3 LPの追加</div></div>
        <div class="k-col"><h4>In Progress</h4><div class="k-card">24インチ対応化</div></div>
        <div class="k-col"><h4>Done</h4><div class="k-card">MissionLab完成</div></div>
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
        correctCode: `/* Notion UI Clone Styles */
body { margin: 0; }
.notion-clone { display: flex; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background: #fff; color: #37352f; min-height: 500px; }
.n-sidebar { width: 240px; background: #fbfbfa; border-right: 1px solid #f0f0f0; display: flex; flex-direction: column; flex-shrink: 0; }
.workspace-switcher { padding: 14px; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s; }
.workspace-switcher:hover { background: #efefed; }
.workspace-switcher .icon { margin-right: 8px; }
.side-scroll { overflow-y: auto; flex: 1; padding: 10px 0; }
.nav-group { margin-bottom: 20px; }
.nav-title { font-size: 11px; font-weight: 600; color: rgba(55,53,47,0.5); padding: 0 14px; margin-bottom: 4px; letter-spacing: 0.5px; }
.nav-item { display: flex; align-items: center; padding: 6px 14px; text-decoration: none; color: #37352f; font-size: 14px; cursor: pointer; transition: background 0.1s; }
.nav-item:hover { background: #efefed; }
.nav-item.active { background: #ebeced; font-weight: 600; }
.nav-item .emoji { margin-right: 10px; font-size: 16px; }
.has-child .toggle { font-size: 10px; color: rgba(55,53,47,0.4); margin-right: 6px; width: 12px; }
.child-items { padding-left: 20px; }
.n-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.n-topbar { height: 45px; display: flex; justify-content: space-between; align-items: center; padding: 0 16px; position: sticky; top: 0; background: rgba(255,255,255,0.9); backdrop-filter: blur(5px); z-index: 10; }
.breadcrumbs { font-size: 14px; color: #37352f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.breadcrumbs .sep { color: rgba(55,53,47,0.4); margin: 0 6px; }
.top-actions button { background: transparent; border: none; font-size: 14px; color: rgba(55,53,47,0.6); cursor: pointer; padding: 4px 8px; border-radius: 4px; margin-left: 4px; }
.top-actions button:hover { background: #efefed; }
.n-editor { max-width: 900px; width: 100%; margin: 0 auto; padding: 60px 96px; overflow-y: auto; box-sizing: border-box; }
.doc-title { font-size: 40px; font-weight: 700; margin: 0 0 30px 0; outline: none; }
.doc-title[placeholder]:empty:before { content: attr(placeholder); color: rgba(55,53,47,0.2); }
.doc-blocks h2 { font-size: 24px; font-weight: 600; margin: 30px 0 10px 0; outline: none; }
.doc-blocks p { font-size: 16px; line-height: 1.6; margin: 0 0 10px 0; outline: none; }
.block-callout { display: flex; padding: 16px; background: #f1f1ef; border-radius: 4px; margin: 20px 0; }
.block-callout .emoji { font-size: 24px; margin-right: 12px; }
.block-callout p { margin: 0; font-size: 15px; }
.block-list { margin: 0 0 20px 0; padding-left: 24px; font-size: 16px; line-height: 1.6; outline: none; }
.block-list li { margin-bottom: 6px; }
.block-quote { border-left: 3px solid currentColor; padding-left: 14px; margin: 20px 0; font-size: 16px; font-style: italic; outline: none; }
.kanban-preview { display: flex; gap: 16px; margin-top: 30px; }
.k-col { flex: 1; }
.k-col h4 { font-size: 14px; color: rgba(55,53,47,0.6); margin: 0 0 10px 0; }
.k-card { background: #fff; border: 1px solid #e5e5e5; box-shadow: 0 1px 2px rgba(0,0,0,0.05); padding: 10px 14px; border-radius: 4px; font-size: 14px; }`
      }
    ]
  },

  // 💳 【Stage 23】Stripe風APIドキュメント
  {
    id: 23,
    category: '上級：ガチ連動Webサイト',
    title: '上級 23：Stripe風 3カラムAPIドキュメント',
    description: '左にナビ、中央にテキスト、右に黒背景のコードスニペットを配置する開発者向けドキュメントの最高峰。',
    mission: 'GridとStickyを組み合わせ、スクロールしてもコードが追従する美しいUIを作ってください。',
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
  <title>PaySystem API - Auth</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="api-docs">
  <aside class="api-sidebar">
    <div class="api-brand">PaySystem API</div>
    <nav class="api-nav">
      <div class="nav-sec">Getting Started</div>
      <ul><li><a href="index.html" class="active">Authentication</a></li><li><a href="errors.html">Errors</a></li></ul>
      <div class="nav-sec">Core Resources</div>
      <ul><li><a href="#">Charges</a></li><li><a href="#">Customers</a></li></ul>
    </nav>
  </aside>
  <main class="api-main">
    <div class="api-content">
      <h1>Authentication</h1>
      <p>PaySystemのAPIは、リクエストの認証にAPIキーを使用します。APIキーはダッシュボードから取得できます。</p>
      <p>APIキーを秘密に保ち、公開リポジトリ（GitHubなど）にコミットしないよう注意してください。</p>
      <hr>
      <h2>Test and Live modes</h2>
      <p>すべてのAPIリクエストは、テストモードまたはライブモードのいずれかで実行されます。キーのプレフィックスで区別されます（例: <code>sk_test_...</code>）。</p>
    </div>
    <div class="api-code-panel">
      <div class="code-sticky">
        <div class="code-tab">cURL</div>
        <pre class="code-block"><code>curl https://api.paysystem.com/v1/charges \\\n  -u dummy_key_4eC39HqLyjWDarjtT1zdp7dc:</code></pre>
        <div class="code-tab" style="margin-top:20px;">Node.js</div>
        <pre class="code-block"><code>const pay = require('paysystem')('sk_test_...');\n\npay.charges.create({\n  amount: 2000,\n  currency: 'jpy',\n  source: 'tok_visa',\n});</code></pre>
      </div>
    </div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'errors.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PaySystem API - Errors</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="api-docs">
  <aside class="api-sidebar">
    <div class="api-brand">PaySystem API</div>
    <nav class="api-nav">
      <div class="nav-sec">Getting Started</div>
      <ul><li><a href="index.html">Authentication</a></li><li><a href="errors.html" class="active">Errors</a></li></ul>
      <div class="nav-sec">Core Resources</div>
      <ul><li><a href="#">Charges</a></li><li><a href="#">Customers</a></li></ul>
    </nav>
  </aside>
  <main class="api-main">
    <div class="api-content">
      <h1>Errors</h1>
      <p>PaySystemは、リクエストの成功・失敗を示すために標準のHTTPステータスコードを使用します。</p>
      <ul class="error-list">
        <li><code>200 - OK</code> すべて正常です。</li>
        <li><code>400 - Bad Request</code> パラメータに誤りがあります。</li>
        <li><code>401 - Unauthorized</code> APIキーが無効です。</li>
      </ul>
    </div>
    <div class="api-code-panel">
      <div class="code-sticky">
        <div class="code-tab">Error Response</div>
        <pre class="code-block"><code>{\n  "error": {\n    "type": "invalid_request_error",\n    "message": "Amount must be greater than 0"\n  }\n}</code></pre>
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
        correctCode: `/* 3-Column API Docs Styles */
body { margin: 0; }
.api-docs { display: flex; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #424770; background: #fff; height: 100vh; }
.api-sidebar { width: 220px; background: #f7fafc; border-right: 1px solid #e2e8f0; height: 100%; overflow-y: auto; flex-shrink: 0; padding: 20px 0; box-sizing: border-box; }
.api-brand { padding: 0 20px 20px; font-weight: bold; font-size: 16px; color: #1a1f36; }
.api-nav .nav-sec { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #8792a2; padding: 15px 20px 5px; }
.api-nav ul { list-style: none; padding: 0; margin: 0; }
.api-nav a { display: block; padding: 6px 20px; color: #424770; text-decoration: none; font-size: 14px; transition: color 0.2s; }
.api-nav a:hover { color: #1a1f36; }
.api-nav a.active { color: #635bff; font-weight: bold; }
.api-main { flex: 1; display: grid; grid-template-columns: minmax(400px, 1fr) minmax(400px, 1fr); overflow-y: auto; }
.api-content { padding: 40px; max-width: 600px; margin-left: auto; }
.api-content h1 { font-size: 32px; color: #1a1f36; margin: 0 0 20px 0; }
.api-content h2 { font-size: 20px; color: #1a1f36; margin: 30px 0 15px 0; }
.api-content p { font-size: 15px; line-height: 1.6; margin-bottom: 15px; }
.api-content code { background: #f7fafc; border: 1px solid #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px; color: #d946ef; }
.api-content hr { border: none; border-top: 1px solid #e2e8f0; margin: 40px 0; }
.error-list { padding-left: 20px; line-height: 1.8; }
.api-code-panel { background: #0f172a; padding: 40px; color: #f8fafc; }
.code-sticky { position: sticky; top: 40px; }
.code-tab { font-size: 12px; font-family: monospace; color: #94a3b8; margin-bottom: 8px; font-weight: bold; text-transform: uppercase; }
.code-block { background: #1e293b; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 13px; line-height: 1.5; overflow-x: auto; margin: 0; border: 1px solid #334155; }
.code-block code { color: #a5b4fc; }`
      }
    ]
  },

  // 🛍️ 【Stage 24】複雑なECプロダクト詳細
  {
    id: 24,
    category: '上級：ガチ連動Webサイト',
    title: '上級 24：ハイエンドECの商品詳細ページ',
    description: '左にStickyな画像ギャラリー、右にアコーディオンや色/サイズ選択を持つ複雑な商品詳細レイアウトです。',
    mission: 'DO始まりの構造の中で、Gridの2カラムと右側だけがスクロールする非対称UIを完成させてください。',
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
  <title>Store - Heavy Jacket</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="ec-detail">
  <header class="ec-head"><h2>STORE</h2><nav><a href="index.html">Men</a><a href="index.html">Women</a><a href="cart.html">Cart(0)</a></nav></header>
  <main class="product-split">
    <div class="p-gallery">
      <div class="gallery-sticky">
        <div class="g-img main-img">FRONT VIEW</div>
        <div class="g-img-grid">
          <div class="g-img thumb">SIDE</div>
          <div class="g-img thumb">BACK</div>
          <div class="g-img thumb">DETAIL</div>
        </div>
      </div>
    </div>
    <div class="p-info-scroll">
      <div class="breadcrumb">Home > Men > Outerwear > Heavy Jacket</div>
      <h1 class="p-title">Extreme Winter Parka</h1>
      <div class="p-price">¥85,000 <span class="tax">Tax included</span></div>
      <div class="p-color-sec">
        <h4>Color: <span class="selected-color">Matte Black</span></h4>
        <div class="color-options"><button class="color-btn black active"></button><button class="color-btn olive"></button><button class="color-btn navy"></button></div>
      </div>
      <div class="p-size-sec">
        <h4>Size</h4>
        <div class="size-options"><button>S</button><button class="active">M</button><button>L</button><button disabled>XL</button></div>
      </div>
      <button class="add-to-cart-massive">ADD TO CART</button>
      <div class="accordion-wrap">
        <details open><summary>Description</summary><p>極寒の環境にも耐えうる、最高峰の保温性を持つダウンジャケット。表地には撥水加工を施した高密度ナイロンを使用。</p></details>
        <details><summary>Details & Care</summary><p>素材: ナイロン100%, 中綿: ダウン90% フェザー10%<br>お手入れ: クリーニング専門店にご相談ください。</p></details>
        <details><summary>Shipping & Returns</summary><p>全国送料無料。到着後14日以内は返品可能です。</p></details>
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
  <title>Store - Cart</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="ec-detail">
  <header class="ec-head"><h2>STORE</h2><nav><a href="index.html">Men</a><a href="index.html">Women</a><a href="cart.html">Cart(1)</a></nav></header>
  <main style="padding:100px; text-align:center;">
    <h1>CART IS EMPTY</h1>
    <a href="index.html" style="color:#000; text-decoration:underline;">Back to Product</a>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Advanced E-Commerce Styles */
body { margin: 0; }
.ec-detail { font-family: 'Helvetica Neue', Helvetica, sans-serif; color: #111; min-height: 500px; }
.ec-head { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 1px solid #eee; position: sticky; top: 0; background: #fff; z-index: 100; box-sizing: border-box; }
.ec-head h2 { margin: 0; font-size: 18px; letter-spacing: 2px; }
.ec-head a { margin-left: 20px; text-decoration: none; color: #111; font-size: 12px; font-weight: bold; text-transform: uppercase; }
.product-split { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 65px); }
.p-gallery { background: #f9f9f9; padding: 40px; border-right: 1px solid #eee; }
.gallery-sticky { position: sticky; top: 100px; }
.g-img { background: #e5e5e5; display: flex; align-items: center; justify-content: center; color: #999; font-weight: bold; font-size: 12px; letter-spacing: 1px; border-radius: 4px; }
.main-img { height: 500px; margin-bottom: 20px; }
.g-img-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.thumb { height: 120px; cursor: pointer; }
.p-info-scroll { padding: 40px 60px; max-width: 600px; }
.breadcrumb { font-size: 11px; color: #888; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
.p-title { font-size: 32px; font-weight: 500; margin: 0 0 15px 0; }
.p-price { font-size: 24px; margin-bottom: 40px; }
.tax { font-size: 12px; color: #888; }
.p-color-sec h4, .p-size-sec h4 { font-size: 13px; margin: 0 0 10px 0; text-transform: uppercase; }
.selected-color { color: #888; font-weight: normal; }
.color-options { display: flex; gap: 10px; margin-bottom: 30px; }
.color-btn { width: 30px; height: 30px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; outline: 2px solid #fff; box-shadow: 0 0 0 1px #ddd; }
.color-btn.active { outline: 2px solid #111; }
.black { background: #222; }
.olive { background: #4b5320; }
.navy { background: #000080; }
.size-options { display: flex; gap: 10px; margin-bottom: 40px; }
.size-options button { flex: 1; padding: 12px 0; border: 1px solid #ddd; background: #fff; font-size: 14px; cursor: pointer; }
.size-options button.active { border-color: #111; background: #111; color: #fff; }
.size-options button:disabled { opacity: 0.3; cursor: not-allowed; text-decoration: line-through; }
.add-to-cart-massive { width: 100%; padding: 20px; background: #111; color: #fff; font-size: 16px; font-weight: bold; border: none; cursor: pointer; transition: background 0.3s; margin-bottom: 40px; }
.add-to-cart-massive:hover { background: #333; }
details { border-top: 1px solid #eee; padding: 20px 0; }
details:last-child { border-bottom: 1px solid #eee; }
summary { font-size: 14px; font-weight: bold; text-transform: uppercase; cursor: pointer; outline: none; list-style: none; display: flex; justify-content: space-between; }
summary::-webkit-details-marker { display: none; }
summary::after { content: "+"; }
details[open] summary::after { content: "-"; }
details p { margin: 15px 0 0 0; font-size: 14px; color: #666; line-height: 1.6; }`
      }
    ]
  },

  // 📈 【Stage 25】CSS Grid 分析ダッシュボード
  {
    id: 25,
    category: '上級：ガチ連動Webサイト',
    title: '上級 25：Grid-template-areas を極めるダッシュボード',
    description: 'HTMLの記述順に縛られない、grid-template-areasを用いた高度な2次元パズル配置です。',
    mission: 'DOCTYPE宣言などを含めた構造の中で、複雑なGridエリアの命名とマッピングを完璧に組み上げてください。',
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
  <title>Nexus Analytics - Overview</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="analytics-dash">
  <div class="grid-layout">
    <header class="area-header"><h2>📊 Nexus Analytics</h2><div class="user">Admin User</div></header>
    <nav class="area-nav">
      <ul><li><a href="index.html" class="active">Overview</a></li><li><a href="reports.html">Reports</a></li><li><a href="#">Settings</a></li></ul>
    </nav>
    <main class="area-main">
      <div class="metric-card"><h3>Views</h3><p class="val">2.4M</p><span class="trend up">↑ 12%</span></div>
      <div class="metric-card"><h3>Bounce Rate</h3><p class="val">42%</p><span class="trend down">↓ 3%</span></div>
      <div class="metric-card"><h3>Conversion</h3><p class="val">3.8%</p><span class="trend up">↑ 1.2%</span></div>
      <div class="chart-big">
        <h3>Traffic Sources</h3>
        <div class="chart-placeholder">MAIN CHART GRAPHIC AREA</div>
      </div>
    </main>
    <aside class="area-side">
      <h3>Recent Activity</h3>
      <ul class="activity-list">
        <li>User signed up <span>2m ago</span></li>
        <li>Payment received <span>15m ago</span></li>
        <li>Server rebooted <span>1h ago</span></li>
      </ul>
    </aside>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'reports.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus Analytics - Reports</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="analytics-dash">
  <div class="grid-layout">
    <header class="area-header"><h2>📊 Nexus Analytics</h2><div class="user">Admin User</div></header>
    <nav class="area-nav">
      <ul><li><a href="index.html">Overview</a></li><li><a href="reports.html" class="active">Reports</a></li><li><a href="#">Settings</a></li></ul>
    </nav>
    <main class="area-main" style="grid-column: span 2;">
      <h2 style="color:#0f172a;">Generated Reports</h2>
      <p>No reports generated today.</p>
      <button style="padding:10px 20px; background:#4f46e5; color:#fff; border:none; border-radius:4px; margin-top:20px;">Generate New</button>
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
        correctCode: `/* Grid Template Areas Styles */
body { margin: 0; }
.analytics-dash { font-family: 'Inter', sans-serif; background: #e2e8f0; min-height: 100vh; padding: 20px; box-sizing: border-box; }
.grid-layout { display: grid; grid-template-columns: 200px 1fr 300px; grid-template-rows: 60px 1fr; grid-template-areas: "header header header" "nav main side"; gap: 20px; height: calc(100vh - 40px); max-width: 1400px; margin: 0 auto; }
.area-header { grid-area: header; background: #0f172a; color: #fff; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
.area-header h2 { margin: 0; font-size: 16px; letter-spacing: 1px; }
.user { font-size: 13px; font-weight: bold; background: #334155; padding: 5px 10px; border-radius: 20px; }
.area-nav { grid-area: nav; background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.area-nav ul { list-style: none; padding: 0; margin: 0; }
.area-nav li { margin-bottom: 10px; }
.area-nav a { display: block; padding: 10px 15px; color: #64748b; text-decoration: none; border-radius: 6px; font-size: 14px; transition: all 0.2s; }
.area-nav a:hover, .area-nav a.active { background: #e0e7ff; color: #4f46e5; font-weight: bold; }
.area-main { grid-area: main; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: min-content; gap: 20px; }
.metric-card { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.metric-card h3 { margin: 0 0 10px 0; font-size: 13px; color: #64748b; text-transform: uppercase; }
.val { font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 5px 0; }
.trend { font-size: 12px; font-weight: bold; }
.trend.up { color: #10b981; }
.trend.down { color: #ef4444; }
.chart-big { grid-column: span 3; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); min-height: 300px; display: flex; flex-direction: column; }
.chart-big h3 { margin: 0 0 20px 0; color: #0f172a; font-size: 16px; }
.chart-placeholder { flex: 1; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: bold; font-size: 14px; background: #f8fafc; }
.area-side { grid-area: side; background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.area-side h3 { margin: 0 0 20px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
.activity-list { list-style: none; padding: 0; margin: 0; }
.activity-list li { padding: 15px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #334155; font-weight: 500; display: flex; flex-direction: column; gap: 5px; }
.activity-list span { font-size: 11px; color: #94a3b8; font-weight: normal; }`
      }
    ]
  },

  // 🏛️ 【Stage 26】デザインエージェンシーの視差効果
  {
    id: 26,
    category: '上級：ガチ連動Webサイト',
    title: '上級 26：Web制作会社のパララックス（視差効果）LP',
    description: 'background-attachment: fixed を駆使し、スクロールすると背景画像が遅れて動くパララックス効果を実装します。',
    mission: 'DOCTYPE宣言を含めたHTML構造の中で、画像のトリミングとパララックス効果を作り出してください。',
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
  <title>Oxygen - Work</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="agency-wrap">
  <nav class="agency-nav">
    <div class="a-logo">O X Y G E N</div>
    <div class="a-links"><a href="index.html" class="active">Work</a><a href="studio.html">Studio</a></div>
  </nav>
  <div class="parallax-window p-hero">
    <div class="p-content">
      <h1 class="mix-blend">Breathe Life<br>into Digital.</h1>
    </div>
  </div>
  <div class="solid-section">
    <div class="text-block">
      <h2>We are Oxygen.</h2>
      <p>デザインの力で、ブランドに新たな呼吸を。我々は東京を拠点にするデジタルクリエイティブチームです。表面的な美しさだけでなく、本質的な課題解決のためのデザインを提供します。</p>
    </div>
  </div>
  <div class="parallax-window p-mid">
    <div class="p-content"><h2 class="mix-blend">Selected Works</h2></div>
  </div>
  <div class="solid-section">
    <div class="work-gallery">
      <div class="work-item"><h3>Brand Identity</h3><p>For Tech Startup</p></div>
      <div class="work-item"><h3>E-Commerce</h3><p>Fashion Brand Redesign</p></div>
    </div>
  </div>
</div>
</body>
</html>`
      },
      {
        fileName: 'studio.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Oxygen - Studio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="agency-wrap">
  <nav class="agency-nav" style="background:#000;">
    <div class="a-logo">O X Y G E N</div>
    <div class="a-links"><a href="index.html">Work</a><a href="studio.html" class="active">Studio</a></div>
  </nav>
  <div class="solid-section" style="min-height:80vh; display:flex; align-items:center; justify-content:center;">
    <div class="text-block" style="text-align:center;">
      <h2>Our Studio in Tokyo</h2>
      <p>東京都渋谷区神宮前X-X-X</p>
      <a href="index.html" style="color:#000; display:inline-block; margin-top:20px; font-weight:bold;">⬅ Back to Home</a>
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
        correctCode: `/* Parallax Agency Styles */
body { margin: 0; }
.agency-wrap { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #fff; color: #000; min-height: 500px; }
.agency-nav { position: fixed; top: 0; width: 100%; padding: 25px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 100; box-sizing: border-box; mix-blend-mode: difference; color: #fff; }
.a-logo { font-weight: 900; font-size: 14px; letter-spacing: 4px; }
.a-links a { color: #fff; text-decoration: none; margin-left: 30px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; position: relative; }
.a-links a::after { content: ''; position: absolute; width: 0; height: 1px; bottom: -4px; left: 0; background: #fff; transition: width 0.3s; }
.a-links a:hover::after, .a-links a.active::after { width: 100%; }
.parallax-window { height: 100vh; background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; display: flex; align-items: center; justify-content: center; position: relative; }
.p-hero { background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'); }
.p-mid { background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'); height: 60vh; }
.p-content { text-align: center; z-index: 2; }
.mix-blend { font-size: 8vw; line-height: 1; margin: 0; font-weight: 900; color: #fff; mix-blend-mode: overlay; text-transform: uppercase; letter-spacing: -2px; }
.solid-section { padding: 120px 40px; background: #fff; }
.text-block { max-width: 700px; margin: 0 auto; text-align: left; }
.text-block h2 { font-size: 42px; margin: 0 0 30px 0; font-weight: 900; }
.text-block p { font-size: 18px; line-height: 2; color: #555; }
.work-gallery { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.work-item { background: #f4f4f4; height: 400px; padding: 40px; display: flex; flex-direction: column; justify-content: flex-end; transition: transform 0.4s; cursor: pointer; }
.work-item:hover { transform: scale(0.98); }
.work-item h3 { font-size: 24px; margin: 0 0 10px 0; font-weight: 800; }
.work-item p { margin: 0; font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px; }`
      }
    ]
  },

  // 📝 【Stage 27】カンバンボード (Trello Clone)
  {
    id: 27,
    category: '上級：ガチ連動Webサイト',
    title: '上級 27：カンバンボード（Trello風タスク管理）',
    description: '横スクロールするリストエリアと、縦スクロールするカードの二重構造を持つUIです。',
    mission: 'DOCTYPE宣言を含めた構造の中で、overflowの分離とflex-shrinkを制御してください。',
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
  <title>TaskFlow - Board</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="kanban-app">
  <header class="k-header">
    <div class="k-logo">☑ TaskFlow</div>
    <div class="k-user">Trace Project <span class="badge">Private</span></div>
  </header>
  <main class="k-board">
    <div class="k-list">
      <div class="list-header"><h3>To Do</h3><button>•••</button></div>
      <div class="cards-container">
        <div class="task-card"><div class="labels"><span class="lbl red"></span><span class="lbl blue"></span></div><p>Headerコンポーネントの実装</p><div class="card-meta"><span>≡</span><span>💬 2</span></div></div>
        <div class="task-card"><p>データベースの設計案作成</p></div>
      </div>
      <button class="add-card-btn">+ Add a card</button>
    </div>
    <div class="k-list">
      <div class="list-header"><h3>In Progress</h3><button>•••</button></div>
      <div class="cards-container">
        <div class="task-card"><div class="labels"><span class="lbl yellow"></span></div><p>TraceLab 24インチ対応化の検証</p><div class="card-meta"><span>≡</span></div></div>
      </div>
      <button class="add-card-btn">+ Add a card</button>
    </div>
    <div class="k-list">
      <div class="list-header"><h3>Done</h3><button>•••</button></div>
      <div class="cards-container">
        <div class="task-card"><div class="labels"><span class="lbl green"></span></div><p>環境構築とVite設定</p></div>
        <div class="task-card"><p>GitHubリポジトリの作成</p></div>
      </div>
      <button class="add-card-btn">+ Add a card</button>
    </div>
    <div class="add-list-wrapper"><button class="add-list-btn">+ Add another list</button></div>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'board.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaskFlow - Subpage</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="kanban-app">
  <header class="k-header">
    <div class="k-logo">☑ TaskFlow</div>
    <div class="k-user"><a href="index.html" style="color:#fff; text-decoration:none;">⬅ Back to Board</a></div>
  </header>
  <main style="padding:40px; color:#fff;">
    <h1>Subpage Test</h1>
    <p>カンバンボードの内部ルーティングテストです。</p>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* Kanban Board Styles */
body { margin: 0; }
.kanban-app { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0079bf; height: 100vh; display: flex; flex-direction: column; }
.k-header { background: rgba(0,0,0,0.15); padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; color: #fff; backdrop-filter: blur(5px); box-sizing: border-box; }
.k-logo { font-weight: bold; font-size: 18px; }
.k-user { font-size: 14px; font-weight: bold; display: flex; align-items: center; gap: 10px; }
.badge { background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: normal; }
.k-board { flex: 1; padding: 20px; display: flex; gap: 15px; overflow-x: auto; align-items: flex-start; }
.k-list { background: #ebecf0; border-radius: 8px; width: 272px; flex-shrink: 0; display: flex; flex-direction: column; max-height: 100%; box-sizing: border-box; }
.list-header { padding: 12px 15px; display: flex; justify-content: space-between; align-items: center; }
.list-header h3 { margin: 0; font-size: 14px; color: #172b4d; font-weight: bold; }
.list-header button { background: transparent; border: none; color: #6b778c; cursor: pointer; font-weight: bold; padding: 4px 8px; border-radius: 4px; }
.list-header button:hover { background: #091e4214; }
.cards-container { padding: 0 10px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 8px; min-height: 10px; }
.task-card { background: #fff; padding: 10px 12px; border-radius: 4px; box-shadow: 0 1px 1px rgba(9,30,66,0.25); cursor: pointer; }
.task-card:hover { background: #f4f5f7; }
.labels { display: flex; gap: 4px; margin-bottom: 6px; flex-wrap: wrap; }
.lbl { height: 8px; width: 40px; border-radius: 4px; }
.lbl.red { background: #ef4444; }
.lbl.blue { background: #3b82f6; }
.lbl.yellow { background: #f59e0b; }
.lbl.green { background: #10b981; }
.task-card p { margin: 0; font-size: 14px; color: #172b4d; line-height: 1.4; }
.card-meta { display: flex; gap: 12px; margin-top: 8px; color: #5e6c84; font-size: 12px; }
.add-card-btn { margin: 8px 10px 10px; padding: 8px 10px; background: transparent; border: none; text-align: left; color: #5e6c84; font-size: 14px; border-radius: 4px; cursor: pointer; }
.add-card-btn:hover { background: #091e4214; color: #172b4d; }
.add-list-wrapper { width: 272px; flex-shrink: 0; }
.add-list-btn { width: 100%; background: rgba(255,255,255,0.24); color: #fff; border: none; padding: 12px 15px; text-align: left; font-size: 14px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: background 0.2s; }
.add-list-btn:hover { background: rgba(255,255,255,0.32); }`
      }
    ]
  },

  // 🏨 【Stage 28】ホテル宿泊予約
  {
    id: 28,
    category: '上級：ガチ連動Webサイト',
    title: '上級 28：ホテルの複合検索＆予約システムUI',
    description: '絶対配置（absolute）を使った検索フォームの重ね合わせと、検索結果リストのレイアウトです。',
    mission: 'DOCTYPE宣言などの基本構造の中で、z-indexとFlexbox配置を完璧に制御してください。',
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
  <title>Luxury Stays - Home</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="booking-app">
  <header class="bk-head">
    <div class="bk-logo">LUXURY STAYS</div>
    <nav><a href="index.html" class="active">Home</a><a href="rooms.html">Rooms</a></nav>
  </header>
  <main class="bk-main">
    <div class="bk-hero">
      <h1>非日常の、その先へ。</h1>
      <div class="search-widget">
        <form class="s-form">
          <div class="input-group"><label>チェックイン</label><input type="date"></div>
          <div class="input-group"><label>チェックアウト</label><input type="date"></div>
          <div class="input-group"><label>人数</label><select><option>大人2名</option><option>大人1名</option></select></div>
          <button type="button" class="s-btn">空室を検索</button>
        </form>
      </div>
    </div>
    <section class="bk-features">
      <h2>Recommend</h2>
      <div class="f-cards">
        <div class="f-card"><h3>Ocean View Suite</h3><p>海を一望できる最上階スイート。プライベートジャグジー完備。</p></div>
        <div class="f-card"><h3>Forest Villa</h3><p>森に囲まれた静寂の一棟貸しヴィラ。完全なプライベート空間。</p></div>
      </div>
    </section>
  </main>
</div>
</body>
</html>`
      },
      {
        fileName: 'rooms.html',
        language: 'html',
        initialCode: '',
        correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luxury Stays - Rooms</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="booking-app">
  <header class="bk-head" style="background:#111;">
    <div class="bk-logo">LUXURY STAYS</div>
    <nav><a href="index.html">Home</a><a href="rooms.html" class="active">Rooms</a></nav>
  </header>
  <main class="bk-results">
    <aside class="bk-sidebar">
      <h3>フィルター</h3>
      <div class="filter-box"><label><input type="checkbox"> 温泉あり</label><label><input type="checkbox"> 朝食付き</label><label><input type="checkbox"> 禁煙ルーム</label></div>
    </aside>
    <div class="bk-list">
      <div class="room-item">
        <div class="r-img bg-ocean"></div>
        <div class="r-detail">
          <div class="r-tags"><span class="tag">残りわずか</span></div>
          <h2>Ocean View Suite</h2>
          <p>80平米 / キングサイズベッド1台 / オーシャンビュー</p>
          <div class="r-bottom">
            <div class="r-price">¥120,000<span>/泊</span></div>
            <button class="book-btn">予約する</button>
          </div>
        </div>
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
        correctCode: `/* Booking System Styles */
body { margin: 0; }
.booking-app { font-family: 'Mincho', serif; color: #333; min-height: 500px; }
.bk-head { position: absolute; top: 0; width: 100%; display: flex; justify-content: space-between; padding: 30px 50px; box-sizing: border-box; z-index: 50; color: #fff; }
.bk-logo { font-size: 20px; letter-spacing: 3px; font-weight: bold; text-transform: uppercase; }
.bk-head a { color: #fff; text-decoration: none; margin-left: 30px; font-family: sans-serif; font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
.bk-head a.active { border-bottom: 2px solid #d4af37; color: #d4af37; }
.bk-hero { position: relative; height: 600px; background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1542314831-c6a4d1429392?w=1200&q=80') center/cover; display: flex; align-items: center; justify-content: center; }
.bk-hero h1 { color: #fff; font-size: 48px; font-weight: normal; letter-spacing: 5px; text-shadow: 0 4px 10px rgba(0,0,0,0.5); margin-bottom: 80px; }
.search-widget { position: absolute; bottom: -40px; background: #fff; padding: 25px; border-radius: 4px; box-shadow: 0 15px 30px rgba(0,0,0,0.1); width: 80%; max-width: 900px; box-sizing: border-box; }
.s-form { display: flex; gap: 20px; align-items: flex-end; }
.input-group { flex: 1; display: flex; flex-direction: column; }
.input-group label { font-family: sans-serif; font-size: 11px; color: #888; font-weight: bold; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
.input-group input, .input-group select { padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; font-family: sans-serif; }
.s-btn { background: #d4af37; color: #fff; border: none; padding: 14px 30px; font-size: 14px; font-weight: bold; cursor: pointer; border-radius: 4px; transition: background 0.3s; font-family: sans-serif; }
.s-btn:hover { background: #b5952f; }
.bk-features { padding: 100px 50px 60px; background: #fdfbf9; text-align: center; }
.bk-features h2 { font-size: 28px; font-weight: normal; letter-spacing: 3px; margin-bottom: 50px; }
.f-cards { display: flex; justify-content: center; gap: 40px; }
.f-card { background: #fff; border: 1px solid #eee; padding: 40px; width: 350px; text-align: left; }
.f-card h3 { font-size: 20px; margin: 0 0 15px 0; color: #111; }
.f-card p { font-size: 14px; color: #666; line-height: 1.8; }
.bk-results { display: flex; padding: 100px 50px; gap: 40px; background: #fdfbf9; }
.bk-sidebar { width: 250px; background: #fff; padding: 30px; border: 1px solid #eee; height: fit-content; }
.bk-sidebar h3 { font-size: 16px; margin: 0 0 20px 0; border-bottom: 1px solid #eee; padding-bottom: 10px; }
.filter-box { display: flex; flex-direction: column; gap: 15px; font-family: sans-serif; font-size: 14px; }
.bk-list { flex: 1; display: flex; flex-direction: column; gap: 30px; }
.room-item { display: flex; background: #fff; border: 1px solid #eee; transition: box-shadow 0.3s; }
.room-item:hover { box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
.r-img { width: 300px; background-size: cover; background-position: center; }
.bg-ocean { background-image: url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80'); }
.r-detail { padding: 30px; flex: 1; display: flex; flex-direction: column; }
.r-tags { margin-bottom: 15px; }
.tag { background: #b91c1c; color: #fff; font-family: sans-serif; font-size: 10px; padding: 4px 8px; font-weight: bold; }
.r-detail h2 { margin: 0 0 10px 0; font-size: 24px; }
.r-detail p { font-family: sans-serif; font-size: 13px; color: #666; margin: 0 0 30px 0; }
.r-bottom { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #eee; padding-top: 20px; }
.r-price { font-size: 28px; font-weight: bold; font-family: sans-serif; }
.r-price span { font-size: 12px; font-weight: normal; color: #888; }
.book-btn { background: #111; color: #fff; border: none; padding: 12px 30px; font-family: sans-serif; font-weight: bold; font-size: 14px; cursor: pointer; transition: background 0.3s; }
.book-btn:hover { background: #d4af37; }`
      }
    ]
  },

  // 👾 【Stage 29】VS Code クローン (Meta)
  {
    id: 29,
    category: '上級：ガチ連動Webサイト',
    title: '上級 29：IDEのUIクローン（VS Code風）',
    description: 'サイドバー、ファイルツリー、エディタタブ、ステータスバーを備えた最強のレイアウトパズルです。',
    mission: 'DOCTYPE宣言などの構造の中で、TraceLabそのものの構造を自らの手で写経して作り上げてください。',
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
  <title>VS Code Clone</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="ide-clone">
  <header class="i-titlebar">VS Code Clone - index.html</header>
  <div class="i-body">
    <aside class="i-activity"><div class="i-icon active">📁</div><div class="i-icon">🔍</div><div class="i-icon">⚙️</div></aside>
    <nav class="i-sidebar">
      <div class="i-side-title">EXPLORER</div>
      <div class="i-tree">
        <div class="i-folder">▼ src</div>
        <a href="index.html" class="i-file active">📄 index.html</a>
        <a href="style.css" class="i-file">🎨 style.css</a>
      </div>
    </nav>
    <main class="i-editor">
      <div class="i-tabs"><div class="i-tab active">index.html</div><div class="i-tab">style.css</div></div>
      <div class="i-code-area">
        <div class="i-lines"><div>1</div><div>2</div><div>3</div></div>
        <div class="i-code">&lt;div class="ide-clone"&gt;<br>  &lt;h1&gt;Hello World&lt;/h1&gt;<br>&lt;/div&gt;</div>
      </div>
    </main>
  </div>
  <footer class="i-statusbar"><div>✓ Ready</div><div>UTF-8</div></footer>
</div>
</body>
</html>`
      },
      {
        fileName: 'style.css',
        language: 'css',
        initialCode: '',
        correctCode: `/* IDE Clone Styles */
body { margin: 0; }
.ide-clone { display: flex; flex-direction: column; height: 100vh; background: #1e1e1e; color: #cccccc; font-family: 'Consolas', 'Courier New', monospace; min-height: 500px; }
.i-titlebar { background: #333333; color: #cccccc; font-size: 12px; text-align: center; padding: 5px; border-bottom: 1px solid #252526; }
.i-body { flex: 1; display: flex; overflow: hidden; }
.i-activity { width: 50px; background: #333333; display: flex; flex-direction: column; align-items: center; padding-top: 10px; gap: 20px; border-right: 1px solid #252526; }
.i-icon { font-size: 20px; cursor: pointer; opacity: 0.5; transition: opacity 0.2s; }
.i-icon:hover { opacity: 1; }
.i-icon.active { opacity: 1; border-left: 2px solid #007acc; padding-left: -2px; }
.i-sidebar { width: 200px; background: #252526; display: flex; flex-direction: column; border-right: 1px solid #1e1e1e; }
.i-side-title { font-size: 11px; padding: 10px 15px; font-weight: bold; letter-spacing: 1px; }
.i-tree { display: flex; flex-direction: column; font-size: 13px; }
.i-folder { padding: 4px 15px; cursor: pointer; }
.i-folder:hover { background: #2a2d2e; }
.i-file { padding: 4px 15px 4px 25px; text-decoration: none; color: #cccccc; cursor: pointer; }
.i-file:hover { background: #2a2d2e; }
.i-file.active { background: #37373d; color: #ffffff; }
.i-editor { flex: 1; display: flex; flex-direction: column; background: #1e1e1e; }
.i-tabs { display: flex; background: #2d2d2d; font-size: 13px; }
.i-tab { padding: 10px 15px; background: #2d2d2d; color: #888888; border-top: 2px solid transparent; cursor: pointer; }
.i-tab.active { background: #1e1e1e; color: #ffffff; border-top-color: #007acc; }
.i-code-area { flex: 1; display: flex; padding-top: 10px; overflow: auto; }
.i-lines { padding: 0 15px; text-align: right; color: #858585; border-right: 1px solid #444; margin-right: 15px; user-select: none; }
.i-code { color: #9cdcfe; white-space: pre; line-height: 1.5; }
.i-statusbar { background: #007acc; color: #ffffff; font-size: 12px; padding: 5px 15px; display: flex; justify-content: space-between; box-sizing: border-box; }`
      }
    ]
  },

  // 🏆 【Stage 30】TraceLab 最終試験
  {
    id: 30,
    category: '上級：ガチ連動Webサイト',
    title: '上級 30：【最終試験】TraceLab 24インチフルワイドエディタ',
    description: 'あなたがいま見ているこの「3等分エッジトゥエッジ画面」そのものをHTMLとCSSで組み上げる、TraceLab最大のメタ・チャレンジです。',
    mission: 'DOCTYPE宣言から始まる完璧な構造の中で、GridとFlexboxのすべてを動員して究極のレイアウトを完成させてください！',
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
  <title>TraceLab - Final Boss</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="final-boss">
  <header class="boss-head">
    <div class="badge">24INCH TRUE IDE</div>
    <div class="title">MISSION 30：最終試験</div>
    <div class="mission-tag">🎯 すべての力を解放せよ</div>
  </header>
  <nav class="boss-stages">
    <span class="st-lbl">STAGES</span>
    <button class="st-btn">#28</button><button class="st-btn">#29</button><button class="st-btn active">#30</button>
  </nav>
  <nav class="boss-tabs">
    <button class="t-btn active">🧡 index.html</button><button class="t-btn">💙 style.css</button>
    <span class="status-msg">✍ 最終決戦転写中...</span>
  </nav>
  <main class="boss-grid">
    <div class="boss-panel">
      <div class="p-head cyan">👀 SPEC CODE</div>
      <div class="p-body"><div class="p-lines">1<br>2</div><div class="p-code">&lt;!-- FINAL --&gt;</div></div>
    </div>
    <div class="boss-panel">
      <div class="p-head amber">✍️ YOUR EDITOR</div>
      <div class="p-body"><div class="p-lines">1</div><textarea class="p-textarea" placeholder="写経せよ..."></textarea></div>
    </div>
    <div class="boss-panel preview">
      <div class="p-head gray">🌐 LIVE PREVIEW</div>
      <div class="p-preview-area">Rendering...</div>
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
        correctCode: `/* TRACELAB ULTIMATE CLONE STYLES */
body { margin: 0; }
.final-boss { display: flex; flex-direction: column; height: 100vh; background: #141414; color: #fff; font-family: sans-serif; min-height: 500px; }
.boss-head { display: flex; justify-content: space-between; align-items: center; padding: 10px 15px; background: #252526; border-bottom: 1px solid #3c3c3c; box-sizing: border-box; }
.badge { background: #4f46e5; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 4px; }
.title { font-size: 12px; font-weight: bold; }
.mission-tag { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); color: #f59e0b; font-size: 11px; padding: 2px 10px; border-radius: 4px; }
.boss-stages { display: flex; gap: 5px; padding: 8px 10px; background: #252526; border-bottom: 1px solid #3c3c3c; align-items: center; box-sizing: border-box; }
.st-lbl { background: #d97706; font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
.st-btn { background: #1e1e1e; border: 1px solid transparent; color: #94a3b8; font-size: 11px; padding: 2px 8px; border-radius: 4px; cursor: pointer; }
.st-btn.active { background: #37373d; color: #fbbf24; border-color: #fbbf24; }
.boss-tabs { display: flex; justify-content: space-between; align-items: center; background: #2d2d2d; border-bottom: 1px solid #252526; padding-right: 15px; box-sizing: border-box; }
.t-btn { background: #2d2d2d; color: #94a3b8; border: none; border-top: 2px solid transparent; padding: 8px 20px; font-size: 12px; cursor: pointer; }
.t-btn.active { background: #141414; color: #fbbf24; border-top-color: #fbbf24; font-weight: bold; }
.status-msg { font-size: 11px; color: #f59e0b; font-weight: bold; }
.boss-grid { flex: 1; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; overflow: hidden; }
.boss-panel { display: flex; flex-direction: column; border-right: 1px solid #2d2d2d; }
.boss-panel.preview { background: #1b1b1c; border-right: none; }
.p-head { padding: 6px 15px; font-size: 10px; font-weight: bold; background: #1e1e1e; border-bottom: 1px solid #2d2d2d; }
.p-head.cyan { color: #22d3ee; }
.p-head.amber { color: #f59e0b; }
.p-head.gray { color: #94a3b8; display: flex; justify-content: space-between; }
.p-body { flex: 1; display: flex; background: #0a0a0a; overflow: hidden; }
.boss-panel:nth-child(2) .p-body { background: #141414; }
.p-lines { width: 40px; background: #0f0f10; border-right: 1px solid #2d2d2d; text-align: right; padding: 10px 8px; font-family: monospace; font-size: 11px; color: #5a5a5a; }
.boss-panel:nth-child(2) .p-lines { background: #141414; }
.p-code { flex: 1; padding: 10px; font-family: monospace; font-size: 12px; color: #4ade80; }
.p-textarea { flex: 1; background: transparent; border: none; color: #9cdcfe; font-family: monospace; font-size: 12px; padding: 10px; outline: none; resize: none; }
.p-preview-area { flex: 1; background: rgba(15,23,42,0.2); margin: 5px; border-radius: 8px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; color: #64748b; }`
      }
    ]
  }
];