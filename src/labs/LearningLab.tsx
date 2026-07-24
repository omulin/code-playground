import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Save, Trash2, Sparkles } from 'lucide-react';

interface LearningStep {
  step: number;
  title: string;
  category: 'HTML' | 'CSS' | 'JavaScript';
  description: string;
  behaviorNote: string;
  codeAnswer: string;
  targetFile: 'html' | 'css' | 'js';
  targetKeyword: string;
  checkpoint: string;
  defaultHtml: string;
  defaultCss: string;
  defaultJs: string;
}

const LEARNING_STEPS: LearningStep[] = [
  // --- HTML編 (1-17) ---
  {
    step: 1, title: "STEP 1: DOCTYPE宣言を書く", category: "HTML",
    description: "Webページを作る最初の1行です。", behaviorNote: "ブラウザに「これは古い規格じゃなく、最新のHTML5で作られてるよ！」と伝えます。",
    codeAnswer: "<!DOCTYPE html>", targetFile: 'html', targetKeyword: '<!DOCTYPE html>',
    checkpoint: "index.html の1行目に `<!DOCTYPE html>` を記述してください。",
    defaultHtml: "", defaultCss: "", defaultJs: ""
  },
  {
    step: 2, title: "STEP 2: <html>タグを作る", category: "HTML",
    description: "ページ全体の根幹となるタグを作ります。", behaviorNote: "ここからHTML文書が始まることを示します。",
    codeAnswer: "<html>\n\n</html>", targetFile: 'html', targetKeyword: '<html>',
    checkpoint: "`<html>` タグを配置してください。",
    defaultHtml: "<!DOCTYPE html>\n", defaultCss: "", defaultJs: ""
  },
  {
    step: 3, title: "STEP 3: headとbodyを置く", category: "HTML",
    description: "裏設定のheadと、目に見えるbodyを作ります。", behaviorNote: "headはブラウザや検索エンジン向けの設定、bodyは実際に画面に映る中身です。",
    codeAnswer: "<head>\n\n</head>\n<body>\n\n</body>", targetFile: 'html', targetKeyword: '<head>',
    checkpoint: "`<head>` と `<body>` タグを <html> の中に配置してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n  \n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 4, title: "STEP 4: 文字化けを防ぐおまじない (charset)", category: "HTML",
    description: "headタグの中に、文字コードのルールを書きます。", behaviorNote: "UTF-8（世界標準）を指定しないと、日本語が変な記号にバケバケになってしまうことがあります！絶対に必要です。",
    codeAnswer: "<meta charset=\"UTF-8\">", targetFile: 'html', targetKeyword: 'UTF-8',
    checkpoint: "<head> の中に `<meta charset=\"UTF-8\">` を配置してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  \n</head>\n<body>\n\n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 5, title: "STEP 5: スマホ対応のおまじない (viewport)", category: "HTML",
    description: "スマホで見たときの画面サイズ調整ルールを書きます。", behaviorNote: "これがないと、スマホで見たときにPC用の広い画面がそのままギュッと縮小表示され、文字が小さすぎて読めなくなります。",
    codeAnswer: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", targetFile: 'html', targetKeyword: 'viewport',
    checkpoint: "<head> の中に `viewport` のmetaタグを配置してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  \n</head>\n<body>\n\n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 6, title: "STEP 6: タイトルを設定する", category: "HTML",
    description: "ブラウザのタブに表示される名前を決めます。", behaviorNote: "サイトの看板になるタイトルです。Google検索の結果にもこれが表示されます。",
    codeAnswer: "<title>マイポートフォリオ</title>", targetFile: 'html', targetKeyword: '<title>',
    checkpoint: "`<title>` タグでページ名を設定してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  \n</head>\n<body>\n\n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 7, title: "STEP 7: メイン見出し (<h1>)", category: "HTML",
    description: "ページの一番大きなメイン見出しを置きます。", behaviorNote: "サイトの中で最も重要なテーマを表す見出しです。原則1ページに1つだけにします。",
    codeAnswer: "<h1>My Portfolio</h1>", targetFile: 'html', targetKeyword: '<h1>',
    checkpoint: "<body> の中に `<h1>` タグでメイン見出しを置いてください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 8, title: "STEP 8: サブ見出し (<h2>)", category: "HTML",
    description: "セクションごとの見出しを作ります。", behaviorNote: "見出しの階層（h1, h2, h3...）を整理することで、読みやすく美しい構造になります。",
    codeAnswer: "<h2>About Me</h2>", targetFile: 'html', targetKeyword: '<h2>',
    checkpoint: "`<h2>` タグを配置してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  <h1>My Portfolio</h1>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 9, title: "STEP 9: 段落 (p)", category: "HTML",
    description: "自己紹介などの文章を入れる段落タグです。", behaviorNote: "改行されたきれいなテキストのブロックを作ります。",
    codeAnswer: "<p>こんにちは！フロントエンド学習中です。</p>", targetFile: 'html', targetKeyword: '<p>',
    checkpoint: "`<p>` タグで文章を追加してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  <h1>My Portfolio</h1>\n  <h2>About Me</h2>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 10, title: "STEP 10: 画像の表示 (img)", category: "HTML",
    description: "アイコンや写真を画面に表示します。", behaviorNote: "src属性に画像ファイルのURLを指定します。閉じタグがない珍しいタグです。",
    codeAnswer: "<img src=\"https://via.placeholder.com/150\" alt=\"avatar\">", targetFile: 'html', targetKeyword: '<img',
    checkpoint: "`<img src=\"...\">` を配置してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  <h1>My Portfolio</h1>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 11, title: "STEP 11: リンク (a)", category: "HTML",
    description: "外部サイトやSNSへ飛ぶリンクを作ります。", behaviorNote: "href属性に行き先のURLを指定します。WebをWebたらしめている最重要タグです。",
    codeAnswer: "<a href=\"https://github.com\">GitHubはこちら</a>", targetFile: 'html', targetKeyword: 'href=',
    checkpoint: "`<a href=\"...\">` を配置してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  <h1>My Portfolio</h1>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 12, title: "STEP 12: リスト (ul/li)", category: "HTML",
    description: "スキルなどを箇条書きで並べます。", behaviorNote: "リスト項目をきれいに縦に並べます。メニューバーを作る時にもよく使われます。",
    codeAnswer: "<ul>\n  <li>HTML / CSS</li>\n  <li>JavaScript</li>\n</ul>", targetFile: 'html', targetKeyword: '<li>',
    checkpoint: "`<ul>` と `<li>` で箇条書きを作ってください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  <h1>Skills</h1>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 13, title: "STEP 13: カードコンテナ (div)", category: "HTML",
    description: "デザインを当てるためのグループを作ります。", behaviorNote: "div自体に意味はありませんが、classをつけて後からCSSで箱として装飾するための必須テクニックです。",
    codeAnswer: "<div class=\"profile-card\">\n  <h2>プロフィール</h2>\n</div>", targetFile: 'html', targetKeyword: 'class=',
    checkpoint: "`<div class=\"...\">` でグループ化してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 14, title: "STEP 14: インライングループ (span)", category: "HTML",
    description: "特定の部分だけ文字の色を変える準備をします。", behaviorNote: "改行させずに、文章の一部をピンポイントで囲みたい時に使います。",
    codeAnswer: "<p>私の得意な言語は<span>JavaScript</span>です。</p>", targetFile: 'html', targetKeyword: '<span>',
    checkpoint: "`<span>` タグを配置してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  <p></p>\n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 15, title: "STEP 15: 入力フォーム (input)", category: "HTML",
    description: "文字を入力できるテキストボックスを置きます。", behaviorNote: "ユーザーからの入力を受け付けます。typeを変えるとパスワード用などにもなります。",
    codeAnswer: "<input type=\"text\" id=\"myInput\" placeholder=\"お名前を入力\">", targetFile: 'html', targetKeyword: '<input',
    checkpoint: "`<input type=\"text\">` を配置してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 16, title: "STEP 16: ボタン (button)", category: "HTML",
    description: "クリックできるボタンを設置します。", behaviorNote: "ユーザーのアクションのトリガーになります。",
    codeAnswer: "<button id=\"myBtn\">送信する</button>", targetFile: 'html', targetKeyword: '<button>',
    checkpoint: "`<button>` タグを配置してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 17, title: "STEP 17: HTML骨組み完成", category: "HTML",
    description: "ここまでのHTML要素を美しく総まとめします。", behaviorNote: "1枚のホームページのベースとなる完璧な骨組みが完成します。",
    codeAnswer: "<!-- HTML骨組み完了 -->", targetFile: 'html', targetKeyword: '<body>',
    checkpoint: "HTMLの骨組みを整えてください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  <h1>Portfolio</h1>\n</body>\n</html>", defaultCss: "", defaultJs: ""
  },

  // --- CSS編 (18-32) ---
  {
    step: 18, title: "STEP 18: CSSの読み込み (<link>)", category: "CSS",
    description: "HTMLのhead内にCSSファイルを紐付けます。", behaviorNote: "デザインファイル（style.css）を適用させます。",
    codeAnswer: "<link rel=\"stylesheet\" href=\"style.css\">", targetFile: 'html', targetKeyword: 'stylesheet',
    checkpoint: "<head>内に `<link rel=\"stylesheet\" href=\"style.css\">` を書いてください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Site</title>\n</head>\n<body>\n  <h1>Hello</h1>\n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 19, title: "STEP 19: 背景色の変更 (background)", category: "CSS",
    description: "style.cssに切り替え、全体の背景色を変えます。", behaviorNote: "Webサイト全体の雰囲気を決めます。",
    codeAnswer: "body {\n  background: #0f172a;\n  color: #f8fafc;\n}", targetFile: 'css', targetKeyword: 'background',
    checkpoint: "style.css の body に `background:` を設定してください。",
    defaultHtml: "", defaultCss: "/* ここにCSSを書こう */", defaultJs: ""
  },
  {
    step: 20, title: "STEP 20: 見出しのデザイン (color/font-size)", category: "CSS",
    description: "h1見出しの色や大きさを変えます。", behaviorNote: "視覚的な階層とインパクトを与えます。",
    codeAnswer: "h1 {\n  color: #38bdf8;\n  font-size: 2.5rem;\n}", targetFile: 'css', targetKeyword: 'color',
    checkpoint: "style.css に `color:` と `font-size:` を設定してください。",
    defaultHtml: "", defaultCss: "body {\n  background: #0f172a;\n}\n\nh1 {\n  \n}", defaultJs: ""
  },
  {
    step: 21, title: "STEP 21: 余白と角丸 (padding/border-radius)", category: "CSS",
    description: "カード要素の内側余白と角の丸みを作ります。", behaviorNote: "UIパーツをリッチに整えます。",
    codeAnswer: ".profile-card {\n  padding: 24px;\n  border-radius: 16px;\n  background: #1e293b;\n}", targetFile: 'css', targetKeyword: 'padding',
    checkpoint: "style.css に `padding:` と `border-radius:` を設定してください。",
    defaultHtml: "", defaultCss: ".profile-card {\n  \n}", defaultJs: ""
  },
  {
    step: 22, title: "STEP 22: 枠線をつける (border)", category: "CSS",
    description: "カードに上品なボーダーラインを引きます。", behaviorNote: "要素の境界線を明確にします。",
    codeAnswer: "border: 1px solid #334155;", targetFile: 'css', targetKeyword: 'border',
    checkpoint: "style.css に `border:` プロパティを記述してください。",
    defaultHtml: "", defaultCss: ".profile-card {\n  padding: 20px;\n  \n}", defaultJs: ""
  },
  {
    step: 23, title: "STEP 23: 立体感を出す (box-shadow)", category: "CSS",
    description: "影をつけて浮き出たようなデザインにします。", behaviorNote: "奥行き感を演出します。",
    codeAnswer: "box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);", targetFile: 'css', targetKeyword: 'box-shadow',
    checkpoint: "style.css に `box-shadow:` を設定してください。",
    defaultHtml: "", defaultCss: ".profile-card {\n  \n}", defaultJs: ""
  },
  {
    step: 24, title: "STEP 24: 幅と高さの指定 (width/height)", category: "CSS",
    description: "要素のサイズをコントロールします。", behaviorNote: "レイアウトの大きさを固定・可変にします。",
    codeAnswer: "width: 100%;\nmax-width: 600px;", targetFile: 'css', targetKeyword: 'width',
    checkpoint: "style.css に `width:` を設定してください。",
    defaultHtml: "", defaultCss: ".profile-card {\n  \n}", defaultJs: ""
  },
  {
    step: 25, title: "STEP 25: 中央寄せ (margin: 0 auto)", category: "CSS",
    description: "コンテンツ全体を画面の中央に配置します。", behaviorNote: "左右の余白を自動で均等にします。",
    codeAnswer: "margin: 0 auto;", targetFile: 'css', targetKeyword: 'margin',
    checkpoint: "style.css に `margin: 0 auto;` を設定してください。",
    defaultHtml: "", defaultCss: ".profile-card {\n  \n}", defaultJs: ""
  },
  {
    step: 26, title: "STEP 26: 横並びレイアウト (display: flex)", category: "CSS",
    description: "要素を縦から横一列の並びに変えます。", behaviorNote: "モダンWeb制作の必須レイアウト手法です。",
    codeAnswer: "display: flex;", targetFile: 'css', targetKeyword: 'display: flex',
    checkpoint: "style.css に `display: flex;` を指定してください。",
    defaultHtml: "", defaultCss: ".container {\n  \n}", defaultJs: ""
  },
  {
    step: 27, title: "STEP 27: 配置の調整 (justify-content)", category: "CSS",
    description: "横並びのアイテムの間隔や位置を調整します。", behaviorNote: "space-betweenなどで均等配置できます。",
    codeAnswer: "justify-content: space-between;", targetFile: 'css', targetKeyword: 'justify-content',
    checkpoint: "style.css に `justify-content:` を設定してください。",
    defaultHtml: "", defaultCss: ".container {\n  display: flex;\n  \n}", defaultJs: ""
  },
  {
    step: 28, title: "STEP 28: 要素の隙間 (gap)", category: "CSS",
    description: "並んだ要素同士の間に綺麗な隙間を作ります。", behaviorNote: "余白計算の手間をなくします。",
    codeAnswer: "gap: 16px;", targetFile: 'css', targetKeyword: 'gap',
    checkpoint: "style.css に `gap:` を設定してください。",
    defaultHtml: "", defaultCss: ".container {\n  display: flex;\n  \n}", defaultJs: ""
  },
  {
    step: 29, title: "STEP 29: ホバーエフェクト (:hover)", category: "CSS",
    description: "マウスを乗せたときに色が変わる動きをつけます。", behaviorNote: "ユーザーの操作にインタラクティブに反応します。",
    codeAnswer: "button:hover {\n  opacity: 0.8;\n  transform: translateY(-2px);\n}", targetFile: 'css', targetKeyword: ':hover',
    checkpoint: "style.css に `:hover` 疑似クラスを記述してください。",
    defaultHtml: "", defaultCss: "button {\n  background: blue;\n}\n\n", defaultJs: ""
  },
  {
    step: 30, title: "STEP 30: 行間の調整 (line-height)", category: "CSS",
    description: "文章の行間を広げて読みやすくします。", behaviorNote: "テキストの視認性を高めます。",
    codeAnswer: "line-height: 1.7;", targetFile: 'css', targetKeyword: 'line-height',
    checkpoint: "style.css に `line-height:` を設定してください。",
    defaultHtml: "", defaultCss: "p {\n  \n}", defaultJs: ""
  },
  {
    step: 31, title: "STEP 31: スマホ対応 (@media)", category: "CSS",
    description: "画面幅に応じたレスポンシブデザインを組みます。", behaviorNote: "スマホ画面でも崩れないように調整します。",
    codeAnswer: "@media (max-width: 768px) {\n  body { padding: 12px; }\n}", targetFile: 'css', targetKeyword: '@media',
    checkpoint: "style.css に `@media` クエリを記述してください。",
    defaultHtml: "", defaultCss: "/* レスポンシブ設定 */\n", defaultJs: ""
  },
  {
    step: 32, title: "STEP 32: CSSデザイン総仕上げ", category: "CSS",
    description: "すべてのスタイルを調和させてデザインを完成させます。", behaviorNote: "美しいポートフォリオサイトの見た目が整います。",
    codeAnswer: "/* CSS Completed */", targetFile: 'css', targetKeyword: 'background',
    checkpoint: "デザインスタイルを完成させてください。",
    defaultHtml: "", defaultCss: "body {\n  background: #111;\n}", defaultJs: ""
  },

  // --- JavaScript編 (33-47) ---
  {
    step: 33, title: "STEP 33: JSファイルの読み込み (<script>)", category: "JavaScript",
    description: "HTMLの末尾にJavaScriptファイルを読み込ませます。", behaviorNote: "動的なプログラムを動かす準備をします。",
    codeAnswer: "<script src=\"script.js\"></script>", targetFile: 'html', targetKeyword: 'script.js',
    checkpoint: "bodyの最後に `<script src=\"script.js\"></script>` を記述してください。",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n</head>\n<body>\n  \n</body>\n</html>", defaultCss: "", defaultJs: ""
  },
  {
    step: 34, title: "STEP 34: コンソール出力 (console.log)", category: "JavaScript",
    description: "script.jsに切り替え、開発者ツールへログを出力します。", behaviorNote: "プログラムの動作確認の基本です。",
    codeAnswer: "console.log(\"Hello Frontend Master!\");", targetFile: 'js', targetKeyword: 'console.log',
    checkpoint: "script.js に `console.log` を記述してください。",
    defaultHtml: "", defaultCss: "", defaultJs: "// ここにJSを書こう\n"
  },
  {
    step: 35, title: "STEP 35: 変数の宣言 (const)", category: "JavaScript",
    description: "データを安全に保存する定数ボックスを作ります。", behaviorNote: "書き換えないデータを保持します。",
    codeAnswer: "const appName = \"My Portfolio App\";", targetFile: 'js', targetKeyword: 'const',
    checkpoint: "script.js に `const` を使った変数宣言を記述してください。",
    defaultHtml: "", defaultCss: "", defaultJs: ""
  },
  {
    step: 36, title: "STEP 36: ポップアップ通知 (alert)", category: "JavaScript",
    description: "画面にアラートダイアログを出します。", behaviorNote: "ユーザーに直接メッセージを伝えます。",
    codeAnswer: "alert('JavaScriptの世界へようこそ！');", targetFile: 'js', targetKeyword: 'alert',
    checkpoint: "script.js に `alert` を記述してください。",
    defaultHtml: "", defaultCss: "", defaultJs: ""
  },
  {
    step: 37, title: "STEP 37: 要素の取得 (getElementById)", category: "JavaScript",
    description: "HTMLのパーツをID名でプログラムに引っ張ります。", behaviorNote: "操作したいHTML要素をキャッチします。",
    codeAnswer: "const titleEl = document.getElementById('myBtn');", targetFile: 'js', targetKeyword: 'getElementById',
    checkpoint: "script.js に `document.getElementById` を記述してください。",
    defaultHtml: "<h1 id=\"title\">Title</h1>", defaultCss: "", defaultJs: ""
  },
  {
    step: 38, title: "STEP 38: 文字の書き換え (textContent)", category: "JavaScript",
    description: "取得した要素のテキストを動的に変更します。", behaviorNote: "画面の文字をプログラムから自由に変えられます。",
    codeAnswer: "const title = document.getElementById('title');\ntitle.textContent = \"JavaScriptで変更したよ！\";", targetFile: 'js', targetKeyword: 'textContent',
    checkpoint: "script.js に `textContent` を記述して文字を変えてください。",
    defaultHtml: "<h1 id=\"title\">Old Title</h1>", defaultCss: "", defaultJs: "const title = document.getElementById('title');\n"
  },
  {
    step: 39, title: "STEP 39: クリックイベント (addEventListener)", category: "JavaScript",
    description: "ボタンが押された瞬間を監視して処理を走らせます。", behaviorNote: "ユーザーのアクションに反応する動的機能の核心です。",
    codeAnswer: "const btn = document.getElementById('myBtn');\nbtn.addEventListener('click', () => {\n  console.log('Clicked!');\n});", targetFile: 'js', targetKeyword: 'addEventListener',
    checkpoint: "script.js に `addEventListener` を記述してください。",
    defaultHtml: "<button id=\"myBtn\">Btn</button>", defaultCss: "", defaultJs: ""
  },
  {
    step: 40, title: "STEP 40: イベント連動の文字変更", category: "JavaScript",
    description: "ボタンを押すとメッセージが変わる仕組みを作ります。", behaviorNote: "クリックとテキスト変更を組み合わせます。",
    codeAnswer: "btn.addEventListener('click', () => {\n  alert('クリックされました！');\n});", targetFile: 'js', targetKeyword: 'click',
    checkpoint: "クリック時の処理を記述してください。",
    defaultHtml: "<button id=\"myBtn\">Btn</button>", defaultCss: "", defaultJs: "const btn = document.getElementById('myBtn');\n"
  },
  {
    step: 41, title: "STEP 41: スタイルの動的変更 (.style)", category: "JavaScript",
    description: "JavaScriptからCSSのプロパティを書き換えます。", behaviorNote: "見た目をプログラムからリアルタイムに変化させます。",
    codeAnswer: "const box = document.getElementById('box');\nbox.style.background = '#0284c7';", targetFile: 'js', targetKeyword: 'style',
    checkpoint: "script.js から `.style` を操作するコードを書いてください。",
    defaultHtml: "<div id=\"box\">Box</div>", defaultCss: "", defaultJs: ""
  },
  {
    step: 42, title: "STEP 42: 条件分岐 (if文)", category: "JavaScript",
    description: "「もし〜なら」というプログラムの判断ロジックを作ります。", behaviorNote: "状況に応じた処理の切り替えを行います。",
    codeAnswer: "const score = 100;\nif (score >= 80) {\n  console.log(\"合格！\");\n}", targetFile: 'js', targetKeyword: 'if',
    checkpoint: "script.js に `if` 文による条件分岐を記述してください。",
    defaultHtml: "", defaultCss: "", defaultJs: ""
  },
  {
    step: 43, title: "STEP 43: クラスの切り替え (classList)", category: "JavaScript",
    description: "CSSのクラスを付け外ししてデザインをトグルさせます。", behaviorNote: "ダークモード切替などに多用されます。",
    codeAnswer: "const el = document.getElementById('app');\nel.classList.toggle('active');", targetFile: 'js', targetKeyword: 'classList',
    checkpoint: "script.js に `classList` を使った操作を記述してください。",
    defaultHtml: "<div id=\"app\">App</div>", defaultCss: "", defaultJs: ""
  },
  {
    step: 44, title: "STEP 44: カウンター機能を作る", category: "JavaScript",
    description: "数値をカウントアップするプログラムを作ります。", behaviorNote: "アプリらしい状態（ステート）の管理を学びます。",
    codeAnswer: "let count = 0;\ncount++;\nconsole.log(count);", targetFile: 'js', targetKeyword: 'count',
    checkpoint: "カウンターのロジックを記述してください。",
    defaultHtml: "", defaultCss: "", defaultJs: ""
  },
  {
    step: 45, title: "STEP 45: 表示・非表示の切替", category: "JavaScript",
    description: "要素の display をいじって表示をコントロールします。", behaviorNote: "モーダルや詳細メニューの開閉に使います。",
    codeAnswer: "const detail = document.getElementById('detail');\ndetail.style.display = 'block';", targetFile: 'js', targetKeyword: 'display',
    checkpoint: "表示・非表示を切り替えるコードを書いてください。",
    defaultHtml: "<div id=\"detail\">Detail</div>", defaultCss: "", defaultJs: ""
  },
  {
    step: 46, title: "STEP 46: 入力値の取得 (value)", category: "JavaScript",
    description: "ユーザーがテキストボックスに入力した値を受け取ります。", behaviorNote: "フォーム送信や検索処理の基礎になります。",
    codeAnswer: "const inputVal = document.getElementById('myInput').value;\nconsole.log(inputVal);", targetFile: 'js', targetKeyword: 'value',
    checkpoint: "script.js で `value` を取得するコードを書いてください。",
    defaultHtml: "<input id=\"myInput\" type=\"text\">", defaultCss: "", defaultJs: ""
  },
  {
    step: 47, title: "STEP 47: フロントエンドマスター完走！", category: "JavaScript",
    description: "全47ステップのすべての知識を統合してアプリを完成させます。", behaviorNote: "HTML・CSS・JSを完璧にマスターした証です！",
    codeAnswer: "console.log(\"Frontend Master Completed!!\");", targetFile: 'js', targetKeyword: 'script.js',
    checkpoint: "完走のコードを記述して全クリアを達成しよう！",
    defaultHtml: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n</head>\n<body>\n  <h1>Complete!</h1>\n  <script src=\"script.js\"></script>\n</body>\n</html>", defaultCss: "", defaultJs: "console.log(\"Frontend Master Completed!!\");"
  }
];

export default function LearningLab() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(() => {
    const saved = localStorage.getItem('code_lab_step_v3');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [selectedCategory, setSelectedCategory] = useState<'HTML' | 'CSS' | 'JavaScript'>('HTML');

  const currentStep = LEARNING_STEPS[currentStepIdx] || LEARNING_STEPS[0];

  const [userFiles, setUserFiles] = useState<{ [stepIdx: number]: { html: string; css: string; js: string } }>(() => {
    const saved = localStorage.getItem('code_lab_files_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {};
  });

  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [isPassed, setIsPassed] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [saveNotification, setSaveNotification] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentHtml = userFiles[currentStepIdx]?.html ?? currentStep.defaultHtml;
  const currentCss = userFiles[currentStepIdx]?.css ?? currentStep.defaultCss;
  const currentJs = userFiles[currentStepIdx]?.js ?? currentStep.defaultJs;

  useEffect(() => {
    setActiveTab(currentStep.targetFile);
    setIsPassed(false);
    setErrorMessage("");
  }, [currentStepIdx]);

  useEffect(() => {
    renderLivePreview(currentHtml, currentCss, currentJs);
  }, [currentHtml, currentCss, currentJs]);

  const handleEditorChange = (value: string | undefined) => {
    const val = value || "";
    setUserFiles(prev => ({
      ...prev,
      [currentStepIdx]: {
        html: activeTab === 'html' ? val : (prev[currentStepIdx]?.html ?? currentStep.defaultHtml),
        css: activeTab === 'css' ? val : (prev[currentStepIdx]?.css ?? currentStep.defaultCss),
        js: activeTab === 'js' ? val : (prev[currentStepIdx]?.js ?? currentStep.defaultJs),
      }
    }));
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editor.onDidChangeModelContent((e: any) => {
      const model = editor.getModel();
      if (!model) return;
      const currentLang = model.getLanguageId();
      if (currentLang !== 'html') return;

      const changes = e.changes?.[0];
      if (!changes || changes.text !== '>') return;

      const position = editor.getPosition();
      if (!position) return;

      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });
      
      const match = textUntilPosition.match(/<([a-zA-Z0-9\-]+)[^>]*>$/);
      const voidElements = ['br', 'img', 'input', 'hr', 'meta', 'link'];
      
      if (match && !voidElements.includes(match[1]) && monaco?.Range) {
        const tag = match[1];
        editor.executeEdits("auto-close", [
          {
            range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
            text: `</${tag}>`,
            forceMoveMarkers: true
          }
        ]);
        editor.setPosition(position);
      }
    });
  };

  const handleStepChange = (idx: number) => {
    setCurrentStepIdx(idx);
    setSelectedCategory(LEARNING_STEPS[idx].category);
    localStorage.setItem('code_lab_step_v3', idx.toString());
  };

  const handleManualSave = () => {
    localStorage.setItem('code_lab_step_v3', currentStepIdx.toString());
    localStorage.setItem('code_lab_files_v3', JSON.stringify(userFiles));
    setSaveNotification("💾 セーブしました！");
    setTimeout(() => setSaveNotification(""), 3000);
  };

  const handleFullReset = () => {
    if (window.confirm("🚨 すべての進捗とコードをリセットして最初からやり直しますか？")) {
      localStorage.removeItem('code_lab_step_v3');
      localStorage.removeItem('code_lab_files_v3');
      setCurrentStepIdx(0);
      setSelectedCategory('HTML');
      setUserFiles({});
      setIsPassed(false);
      setErrorMessage("");
      setSaveNotification("🗑️ リセットしました");
      setTimeout(() => setSaveNotification(""), 3000);
    }
  };

  const renderLivePreview = (html: string, css: string, js: string) => {
    if (!iframeRef.current) return;
    let processedHtml = html
      .replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, `<style>${css}</style>`)
      .replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, `<script>${js}</script>`);

    iframeRef.current.src = "data:text/html;charset=utf-8," + encodeURIComponent(processedHtml);
  };

  const handleCheckCode = () => {
    let codeToTest = "";
    let fileNameText = "";
    
    switch (currentStep.targetFile) {
      case 'html': codeToTest = currentHtml; fileNameText = 'index.html'; break;
      case 'css': codeToTest = currentCss; fileNameText = 'style.css'; break;
      case 'js': codeToTest = currentJs; fileNameText = 'script.js'; break;
    }

    if (codeToTest.includes(currentStep.targetKeyword)) {
      setIsPassed(true);
      setErrorMessage("");
      setShowModal(true);
      localStorage.setItem('code_lab_step_v3', currentStepIdx.toString());
    } else {
      setIsPassed(false);
      setErrorMessage(`❌ エラー:「${fileNameText}」内にキーワード「 ${currentStep.targetKeyword} 」が見つかりません。`);
    }
  };

  const handleNext = () => {
    setShowModal(false);
    if (currentStepIdx + 1 < LEARNING_STEPS.length) {
      handleStepChange(currentStepIdx + 1);
    } else {
      alert(`🎉 おめでとうございます！！全${LEARNING_STEPS.length}ステップを完全走破しました！`);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) handleStepChange(currentStepIdx - 1);
  };

  const filteredSteps = LEARNING_STEPS.filter(s => s.category === selectedCategory);

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] text-white overflow-hidden text-left font-sans relative">
      
      {showModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl flex flex-col items-center text-center">
            <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/30 mb-4 text-emerald-400">
              <Sparkles size={48} className="animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">🎉 STEP {currentStep.step} クリア！</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              素晴らしい！指定されたコードが正しく記述され、プレビューに反映されました。
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-[#333] hover:bg-[#444] text-gray-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                コードを見直す
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                次のSTEPへ ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* トップヘッダー */}
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-6 py-2 flex flex-col md:flex-row justify-between items-center shrink-0 gap-2">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xl">🛠️</span>
          <h1 className="text-sm font-black tracking-wider text-indigo-400 shrink-0">コード学習ラボ</h1>
          
          <div className="flex items-center gap-1 bg-[#1e1e1e] p-1 rounded border border-[#3c3c3c] overflow-x-auto">
            {(['HTML', 'CSS', 'JavaScript'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  const firstInCat = LEARNING_STEPS.findIndex(s => s.category === cat);
                  if (firstInCat !== -1) handleStepChange(firstInCat);
                }}
                className={`px-3 py-1 text-[11px] font-bold rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-gray-400 hover:text-white hover:bg-[#2d2d2d]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={currentStepIdx}
            onChange={(e) => handleStepChange(parseInt(e.target.value, 10))}
            className="bg-[#1e1e1e] text-indigo-200 text-xs font-bold px-2 py-1 rounded border border-[#444] cursor-pointer outline-none"
          >
            {filteredSteps.map((s) => (
              <option key={s.step} value={s.step - 1}>
                STEP {s.step}: {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleManualSave}
            className="flex items-center gap-1 bg-[#1e293b] hover:bg-[#334155] border border-indigo-500/50 text-indigo-200 px-3 py-1 rounded text-xs cursor-pointer transition-colors"
          >
            <Save size={12} /> セーブ
          </button>
          <button
            onClick={handleFullReset}
            className="flex items-center gap-1 bg-rose-950/50 hover:bg-rose-900 border border-rose-500/50 text-rose-200 px-3 py-1 rounded text-xs cursor-pointer transition-colors"
            title="全ての進捗とコードを初期化"
          >
            <Trash2 size={12} /> リセット
          </button>
          {saveNotification && (
            <span className="text-xs text-emerald-400 font-bold animate-pulse ml-1">
              {saveNotification}
            </span>
          )}
          <div className="text-xs font-mono bg-[#111] px-3 py-1 rounded-full border border-[#3c3c3c] font-bold text-cyan-400 ml-1">
            STEP: {currentStep.step} / {LEARNING_STEPS.length}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden w-full">
        
        {/* 1列目：解説・ミッション（アクションボタンを最上部に配置） */}
        <div className="w-[32%] flex flex-col border-r border-[#3c3c3c] bg-[#1e1e1e] h-full overflow-hidden">
          
          {/* 上部：アクションボタンエリア（スクロール不要で常に一番上に見える） */}
          <div className="p-3 bg-[#252526] border-b border-[#3c3c3c] shrink-0">
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev} 
                disabled={currentStepIdx === 0} 
                className={`px-3 py-1.5 rounded text-[11px] font-bold border transition ${currentStepIdx === 0 ? 'border-[#3c3c3c] text-[#555] bg-transparent cursor-not-allowed' : 'border-[#444] hover:bg-[#333] text-slate-200 cursor-pointer'}`}
              >
                ◀ 戻る
              </button>
              {isPassed ? (
                <button 
                  onClick={handleNext} 
                  className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] rounded cursor-pointer shadow-md transition"
                >
                  {currentStep.step === LEARNING_STEPS.length ? "🏆 完走！" : "正解！次へ ➔"}
                </button>
              ) : (
                <button 
                  onClick={handleCheckCode} 
                  className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[11px] rounded cursor-pointer shadow-md transition"
                >
                  🔍 判定する
                </button>
              )}
            </div>
          </div>

          {/* 下部：スクロール可能な解説エリア */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider bg-indigo-600 text-white">
                {currentStep.category}
              </span>
            </div>

            <h2 className="text-sm font-black text-slate-100">{currentStep.title}</h2>
            
            <p className="text-[11px] text-[#cccccc] leading-relaxed bg-[#252526] border border-[#3c3c3c] p-2.5 rounded">
              {currentStep.description}
            </p>

            <div className="bg-sky-950/30 border border-sky-900/60 p-2.5 rounded text-[11px] leading-relaxed text-sky-200">
              <strong className="block text-sky-400 mb-0.5">💡 タグ・コードの意味:</strong>
              {currentStep.behaviorNote}
            </div>

            <div className="bg-[#141414] border border-[#3c3c3c] p-2.5 rounded font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">
              <span className="text-[9px] text-emerald-500 font-bold block mb-0.5">📝 コードの正解例（参考）:</span>
              {currentStep.codeAnswer}
            </div>

            <div className="bg-indigo-950/35 border border-indigo-900 p-2.5 rounded text-[11px] leading-relaxed text-indigo-300 shadow-inner">
              <strong className="block text-indigo-400 mb-0.5">🎯 クリア条件 ({currentStep.targetFile.toUpperCase()}):</strong>
              {currentStep.checkpoint}
            </div>
          </div>

        </div>

        {/* 2列目：エディタ */}
        <div className="w-[36%] bg-[#1e1e1e] flex flex-col h-full border-r border-[#3c3c3c]">
          <div className="bg-[#252526] border-b border-[#3c3c3c] flex text-xs shrink-0 items-center justify-between pr-3">
            <div className="flex">
              <button onClick={() => setActiveTab('html')} className={`px-4 py-2 font-mono text-[11px] transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'html' ? 'bg-[#1e1e1e] text-orange-400 border-t-2 border-orange-500 font-bold' : 'text-[#858585] hover:bg-[#2d2d2d]'}`}>
                🌐 index.html
              </button>
              <button onClick={() => setActiveTab('css')} className={`px-4 py-2 font-mono text-[11px] transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'css' ? 'bg-[#1e1e1e] text-sky-400 border-t-2 border-sky-500 font-bold' : 'text-[#858585] hover:bg-[#2d2d2d]'}`}>
                📘 style.css
              </button>
              <button onClick={() => setActiveTab('js')} className={`px-4 py-2 font-mono text-[11px] transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'js' ? 'bg-[#1e1e1e] text-yellow-400 border-t-2 border-yellow-500 font-bold' : 'text-[#858585] hover:bg-[#2d2d2d]'}`}>
                💛 script.js
              </button>
            </div>
            {isPassed && <span className="text-[9px] bg-emerald-950 border border-emerald-500 text-emerald-400 px-1.5 py-0.5 rounded font-black shrink-0">PASSED</span>}
          </div>
          
          <div className="flex-1 relative w-full h-full overflow-hidden">
            {activeTab === 'html' && (
              <Editor height="100%" language="html" theme="vs-dark" value={currentHtml} onChange={handleEditorChange} onMount={handleEditorDidMount} options={{ fontSize: 13, minimap: { enabled: false }, wordWrap: 'on', tabSize: 2 }} />
            )}
            {activeTab === 'css' && (
              <Editor height="100%" language="css" theme="vs-dark" value={currentCss} onChange={handleEditorChange} options={{ fontSize: 13, minimap: { enabled: false }, wordWrap: 'on', tabSize: 2 }} />
            )}
            {activeTab === 'js' && (
              <Editor height="100%" language="javascript" theme="vs-dark" value={currentJs} onChange={handleEditorChange} options={{ fontSize: 13, minimap: { enabled: false }, wordWrap: 'on', tabSize: 2 }} />
            )}
          </div>

          {errorMessage && (
            <div className="bg-rose-950/80 border-t border-rose-900 text-rose-300 p-3 font-mono text-[11px] leading-relaxed shrink-0">
              {errorMessage}
            </div>
          )}
        </div>

        {/* 3列目：プレビュー */}
        <div className="w-[32%] bg-[#1a1a1a] flex flex-col h-full">
          <div className="bg-[#252526] px-4 py-2 text-[10px] font-mono text-indigo-400 border-b border-[#3c3c3c] flex justify-between items-center font-bold tracking-wider">
            <span>🖥️ PREVIEW (LIVE)</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-950 border border-indigo-800">SYNCED</span>
          </div>
          <div className="flex-1 p-2 bg-[#111] h-full">
            <iframe 
              ref={iframeRef} 
              className="w-full h-full bg-white rounded-lg shadow-inner border-0" 
              title="Preview" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}