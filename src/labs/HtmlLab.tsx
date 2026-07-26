import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Sparkles, CheckCircle2, RotateCcw, Save, Layout, HelpCircle, Lightbulb, EyeOff, Copy, Check } from 'lucide-react';

interface HtmlStage {
  id: number;
  title: string;
  mission: string;
  hint: string;
  initialCode: string;
  correctCode: string;
  checkCondition: (code: string) => boolean;
}

// 🌟 全40問のHTML道場ステージデータ
const HTML_STAGES: HtmlStage[] = [
  {
    id: 1,
    title: `ステージ 1：DOCTYPE宣言とhtmlタグ`,
    mission: `Webページの最初に必ず記述する「<!DOCTYPE html>」宣言と、全体のルートである <html> タグを記述してください。`,
    hint: `<!DOCTYPE html> 宣言の後に <html> と </html> で囲みます。`,
    initialCode: `<!-- ここにDOCTYPE宣言とhtmlタグを書こう -->\n<div>Hello</div>`,
    correctCode: `<!DOCTYPE html>
<html>
</html>`,
    checkCondition: (code) => code.toLowerCase().includes('<!doctype html>') && code.includes('<html') && code.includes('</html>')
  },
  {
    id: 2,
    title: `ステージ 2：headとtitleタグ`,
    mission: `ブラウザのタブに表示されるページタイトルを設定するため、<head> タグの中に <title> タグを記述してください。`,
    hint: `<head><title>ページタイトル</title></head>`,
    initialCode: `<html>
  <head>
    <!-- ここにtitleを書こう -->
  </head>
</html>`,
    correctCode: `<html>
  <head>
    <title>マイサイト</title>
  </head>
</html>`,
    checkCondition: (code) => code.includes('<head>') && code.includes('<title>') && code.includes('</title>') && code.includes('</head>')
  },
  {
    id: 3,
    title: `ステージ 3：文字コード設定 (meta charset)`,
    mission: `文字化けを防ぐため、<head> 内に文字コードを UTF-8 に指定する <meta> タグを記述してください。`,
    hint: `<meta charset="utf-8"> を記述します。`,
    initialCode: `<head>
  <title>テスト</title>
  <!-- 文字コードを指定しよう -->
</head>`,
    correctCode: `<head>
  <title>テスト</title>
  <meta charset="utf-8">
</head>`,
    checkCondition: (code) => code.toLowerCase().includes('charset="utf-8"') || code.toLowerCase().includes("charset='utf-8'")
  },
  {
    id: 4,
    title: `ステージ 4：スマホ対応ビューポート (meta viewport)`,
    mission: `スマホ表示でレイアウトが崩れないよう、<meta name="viewport" content="width=device-width, initial-scale=1.0"> を記述してください。`,
    hint: `<meta name="viewport" content="width=device-width, initial-scale=1.0"> を記述します。`,
    initialCode: `<head>
  <meta charset="utf-8">
  <!-- ビューポートを設定しよう -->
</head>`,
    correctCode: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>`,
    checkCondition: (code) => code.includes('viewport') && code.includes('width=device-width')
  },
  {
    id: 5,
    title: `ステージ 5：bodyタグの配置`,
    mission: `実際に画面に表示されるコンテンツを格納するための <body> タグを配置してください。`,
    hint: `<body>ここに表示内容</body>`,
    initialCode: `<html>
  <head><title>テスト</title></head>
  <!-- ここにbodyタグを書こう -->
</html>`,
    correctCode: `<html>
  <head><title>テスト</title></head>
  <body>
  </body>
</html>`,
    checkCondition: (code) => code.includes('<body>') && code.includes('</body>')
  },
  {
    id: 6,
    title: `ステージ 6：メイン見出し (h1)`,
    mission: `ページの中で最も重要な見出しを <h1> タグで body の中に記述してください。`,
    hint: `<h1>ようこそ</h1> を body 内に書きます。`,
    initialCode: `<body>
  <!-- h1タグを書こう -->
</body>`,
    correctCode: `<body>
  <h1>ようこそ</h1>
</body>`,
    checkCondition: (code) => code.includes('<h1') && code.includes('</h1>')
  },
  {
    id: 7,
    title: `ステージ 7：段落のマークアップ (p)`,
    mission: `通常の文章を表現するため、<p> タグで囲んでください。`,
    hint: `<p>こんにちは、HTMLの世界へ！</p> と記述します。`,
    initialCode: `<body>
  こんにちは、HTMLの世界へ！
</body>`,
    correctCode: `<body>
  <p>こんにちは、HTMLの世界へ！</p>
</body>`,
    checkCondition: (code) => code.includes('<p') && code.includes('</p>')
  },
  {
    id: 8,
    title: `ステージ 8：ハイパーリンク (a)`,
    mission: `別サイトへ遷移するリンクを <a> タグと href 属性で作成してください。`,
    hint: `<a href="https://example.com">公式サイト</a> と記述します。`,
    initialCode: `<body>
  公式サイトはこちら（リンク未設定）
</body>`,
    correctCode: `<body>
  <a href="https://example.com">公式サイトはこちら</a>
</body>`,
    checkCondition: (code) => code.includes('<a') && code.includes('href=') && code.includes('</a>')
  },
  {
    id: 9,
    title: `ステージ 9：画像の埋め込み (img)`,
    mission: `画像 'logo.png' を表示し、alt属性に 'サイトロゴ' と記述してください。`,
    hint: `<img src="logo.png" alt="サイトロゴ"> と記述します。`,
    initialCode: `<body>
  <img src="logo.png">
</body>`,
    correctCode: `<body>
  <img src="logo.png" alt="サイトロゴ">
</body>`,
    checkCondition: (code) => code.includes('<img') && code.includes('src=') && code.includes('alt=')
  },
  {
    id: 10,
    title: `ステージ 10：テキストの強調 (strong)`,
    mission: `特に重要な部分を伝えるため <strong> タグで囲んでください。`,
    hint: `<strong>重要なお知らせ</strong> と記述します。`,
    initialCode: `<body>
  <b>重要なお知らせ</b>があります。
</body>`,
    correctCode: `<body>
  <strong>重要なお知らせ</strong>があります。
</body>`,
    checkCondition: (code) => code.includes('<strong>') && code.includes('</strong>')
  },
  {
    id: 11,
    title: `ステージ 11：ヘッダー領域 (header)`,
    mission: `ページの頭部やロゴを含む領域を <header> タグで囲んでください。`,
    hint: `<header><h1>サイト名</h1></header>`,
    initialCode: `<body>
  <div class="site-header">
    <h1>サイト名</h1>
  </div>
</body>`,
    correctCode: `<body>
  <header>
    <h1>サイト名</h1>
  </header>
</body>`,
    checkCondition: (code) => code.includes('<header') && code.includes('</header>')
  },
  {
    id: 12,
    title: `ステージ 12：ナビゲーション領域 (nav)`,
    mission: `メニューリンクの集まりを囲む <nav> タグを使用してください。`,
    hint: `<nav><a href="#">Home</a></nav>`,
    initialCode: `<body>
  <div class="menu">
    <a href="#">Home</a>
  </div>
</body>`,
    correctCode: `<body>
  <nav>
    <a href="#">Home</a>
  </nav>
</body>`,
    checkCondition: (code) => code.includes('<nav') && code.includes('</nav>')
  },
  {
    id: 13,
    title: `ステージ 13：メインコンテンツ (main)`,
    mission: `主要な内容を囲む <main> タグを使用してください。`,
    hint: `<main><h1>記事</h1></main>`,
    initialCode: `<body>
  <div class="content">
    <h1>記事</h1>
  </div>
</body>`,
    correctCode: `<body>
  <main>
    <h1>記事</h1>
  </main>
</body>`,
    checkCondition: (code) => code.includes('<main') && code.includes('</main>')
  },
  {
    id: 14,
    title: `ステージ 14：独立した記事 (article)`,
    mission: `それ単体で完結するコンテンツを囲む <article> タグを使用してください。`,
    hint: `<article><h2>ニュース</h2></article>`,
    initialCode: `<body>
  <h2>今日のニュース</h2>
</body>`,
    correctCode: `<body>
  <article>
    <h2>今日のニュース</h2>
  </article>
</body>`,
    checkCondition: (code) => code.includes('<article') && code.includes('</article>')
  },
  {
    id: 15,
    title: `ステージ 15：セクション領域 (section)`,
    mission: `テーマごとに章を区切る <section> タグを使用してください。`,
    hint: `<section><h2>会社概要</h2></section>`,
    initialCode: `<body>
  <h2>会社概要</h2>
</body>`,
    correctCode: `<body>
  <section>
    <h2>会社概要</h2>
  </section>
</body>`,
    checkCondition: (code) => code.includes('<section') && code.includes('</section>')
  },
  {
    id: 16,
    title: `ステージ 16：補足情報領域 (aside)`,
    mission: `サイドバーや広告を表す <aside> タグを使用してください。`,
    hint: `<aside>おすすめ記事</aside>`,
    initialCode: `<body>
  おすすめ記事一覧
</body>`,
    correctCode: `<body>
  <aside>
    <p>おすすめ記事一覧</p>
  </aside>
</body>`,
    checkCondition: (code) => code.includes('<aside') && code.includes('</aside>')
  },
  {
    id: 17,
    title: `ステージ 17：フッター領域 (footer)`,
    mission: `コピーライトなどを表す <footer> タグを使用してください。`,
    hint: `<footer><p>&copy; 2026</p></footer>`,
    initialCode: `<body>
  Copyright 2026
</body>`,
    correctCode: `<body>
  <footer>
    <p>&copy; 2026</p>
  </footer>
</body>`,
    checkCondition: (code) => code.includes('<footer') && code.includes('</footer>')
  },
  {
    id: 18,
    title: `ステージ 18：図表とキャプション (figure / figcaption)`,
    mission: `画像と、それに添えるキャプションをセットで表現するため <figure> と <figcaption> を使ってください。`,
    hint: `<figure><img src="photo.jpg" alt="写真"><figcaption>説明文</figcaption></figure>`,
    initialCode: `<body>
  <img src="photo.jpg" alt="写真">
  <p>写真の説明文</p>
</body>`,
    correctCode: `<body>
  <figure>
    <img src="photo.jpg" alt="写真">
    <figcaption>写真の説明文</figcaption>
  </figure>
</body>`,
    checkCondition: (code) => code.includes('<figure>') && code.includes('<figcaption>') && code.includes('</figcaption>') && code.includes('</figure>')
  },
  {
    id: 19,
    title: `ステージ 19：レスポンシブ画像 (picture)`,
    mission: `画面幅に応じて画像ソースを切り替えるため <picture> タグと <source> タグを使用してください。`,
    hint: `<picture><source media="(min-width: 768px)" srcset="pc.jpg"><img src="sp.jpg" alt="画像"></picture>`,
    initialCode: `<body>
  <img src="sp.jpg" alt="画像">
</body>`,
    correctCode: `<body>
  <picture>
    <source media="(min-width: 768px)" srcset="pc.jpg">
    <img src="sp.jpg" alt="画像">
  </picture>
</body>`,
    checkCondition: (code) => code.includes('<picture>') && code.includes('<source') && code.includes('</picture>')
  },
  {
    id: 20,
    title: `ステージ 20：外部コンテンツ埋め込み (iframe)`,
    mission: `YouTubeやGoogleマップを埋め込むための <iframe> タグを使用してください。`,
    hint: `<iframe src="https://example.com" title="埋め込み"></iframe>`,
    initialCode: `<body>
  <!--ここにiframeを配置しよう-->
</body>`,
    correctCode: `<body>
  <iframe src="https://example.com" title="埋め込み"></iframe>
</body>`,
    checkCondition: (code) => code.includes('<iframe') && code.includes('src=') && code.includes('</iframe>')
  },
  {
    id: 21,
    title: `ステージ 21：フォームの枠組み (form)`,
    mission: `送信フォームの土台となる <form> タグを action と method 属性付きで作成してください。`,
    hint: `<form action="submit.php" method="POST">...</form>`,
    initialCode: `<body>
  <input type="text">
</body>`,
    correctCode: `<body>
  <form action="submit.php" method="POST">
    <input type="text">
  </form>
</body>`,
    checkCondition: (code) => code.includes('<form') && code.includes('action=') && code.includes('</form>')
  },
  {
    id: 22,
    title: `ステージ 22：ラベルと入力欄の紐付け (label / input)`,
    mission: `<label> の for 属性と <input> の id 属性を一致させてテキスト入力欄を作ってください。`,
    hint: `<label for="name">名前</label><input type="text" id="name">`,
    initialCode: `<body>
  名前: <input type="text">
</body>`,
    correctCode: `<body>
  <label for="name">名前</label>
  <input type="text" id="name">
</body>`,
    checkCondition: (code) => code.includes('<label') && code.includes('for=') && code.includes('id=')
  },
  {
    id: 23,
    title: `ステージ 23：必須入力バリデーション (required)`,
    mission: `入力必須にするための required 属性を <input> に付与してください。`,
    hint: `<input type="text" name="username" required>`,
    initialCode: `<body>
  <input type="text" name="username">
</body>`,
    correctCode: `<body>
  <input type="text" name="username" required>
</body>`,
    checkCondition: (code) => code.includes('required')
  },
  {
    id: 24,
    title: `ステージ 24：プレースホルダー (placeholder)`,
    mission: `入力欄のヒントを表示する placeholder="例: 山田太郎" 属性を付与してください。`,
    hint: `<input type="text" placeholder="例: 山田太郎">`,
    initialCode: `<body>
  <input type="text" name="name">
</body>`,
    correctCode: `<body>
  <input type="text" name="name" placeholder="例: 山田太郎">
</body>`,
    checkCondition: (code) => code.includes('placeholder=')
  },
  {
    id: 25,
    title: `ステージ 25：パスワード入力欄 (type="password")`,
    mission: `入力文字がマスクされるパスワード専用の入力欄を作成してください。`,
    hint: `<input type="password" name="pass">`,
    initialCode: `<body>
  <input type="text" name="pass">
</body>`,
    correctCode: `<body>
  <input type="password" name="pass">
</body>`,
    checkCondition: (code) => code.includes('type="password"') || code.includes("type='password'")
  },
  {
    id: 26,
    title: `ステージ 26：ラジオボタン (type="radio")`,
    mission: `1つだけ選ばせるラジオボタンを作成してください。`,
    hint: `<label><input type="radio" name="gender"> 男性</label>`,
    initialCode: `<body>
  <input type="checkbox"> 男性
</body>`,
    correctCode: `<body>
  <label><input type="radio" name="gender" value="male"> 男性</label>
</body>`,
    checkCondition: (code) => code.includes('type="radio"') || code.includes("type='radio'")
  },
  {
    id: 27,
    title: `ステージ 27：チェックボックス (type="checkbox")`,
    mission: `複数選択可能なチェックボックスを作成してください。`,
    hint: `<input type="checkbox" name="hobby"> 読書`,
    initialCode: `<body>
  読書
</body>`,
    correctCode: `<body>
  <label><input type="checkbox" name="hobby"> 読書</label>
</body>`,
    checkCondition: (code) => code.includes('type="checkbox"') || code.includes("type='checkbox'")
  },
  {
    id: 28,
    title: `ステージ 28：セレクトボックス (select / option)`,
    mission: `プルダウンメニューを <select> と <option> で作成してください。`,
    hint: `<select><option>東京</option></select>`,
    initialCode: `<body>
  東京
</body>`,
    correctCode: `<body>
  <select>
    <option>東京</option>
    <option>大阪</option>
  </select>
</body>`,
    checkCondition: (code) => code.includes('<select') && code.includes('<option') && code.includes('</select>')
  },
  {
    id: 29,
    title: `ステージ 29：テキストエリア (textarea)`,
    mission: `長文入力を受け付ける <textarea> タグを配置してください。`,
    hint: `<textarea name="msg" rows="4"></textarea>`,
    initialCode: `<body>
  <input type="text" name="msg">
</body>`,
    correctCode: `<body>
  <textarea name="msg" rows="4"></textarea>
</body>`,
    checkCondition: (code) => code.includes('<textarea') && code.includes('</textarea>')
  },
  {
    id: 30,
    title: `ステージ 30：送信ボタン (button type="submit")`,
    mission: `フォームを送信するためのボタンタグ <button type="submit"> を作成してください。`,
    hint: `<button type="submit">送信する</button>`,
    initialCode: `<body>
  <button>送信</button>
</body>`,
    correctCode: `<body>
  <button type="submit">送信する</button>
</body>`,
    checkCondition: (code) => code.includes('type="submit"') || code.includes("type='submit'")
  },
  {
    id: 31,
    title: `ステージ 31：テーブルの基本 (table / tr / th / td)`,
    mission: `表形式でデータを表すため table, tr, th, td を組み合わせてください。`,
    hint: `<table><tr><th>見出し</th><td>データ</td></tr></table>`,
    initialCode: `<body>
  名前 | 年齢
</body>`,
    correctCode: `<body>
  <table>
    <tr>
      <th>名前</th>
      <td>Taro</td>
    </tr>
  </table>
</body>`,
    checkCondition: (code) => code.includes('<table') && code.includes('<tr') && code.includes('<th') && code.includes('<td') && code.includes('</table>')
  },
  {
    id: 32,
    title: `ステージ 32：テーブルの構造化 (thead / tbody)`,
    mission: `ヘッダーを <thead>、本体を <tbody> で囲んで構造化してください。`,
    hint: `<table><thead>...</thead><tbody>...</tbody></table>`,
    initialCode: `<body>
  <table>
    <tr><th>項目</th></tr>
    <tr><td>値</td></tr>
  </table>
</body>`,
    correctCode: `<body>
  <table>
    <thead>
      <tr><th>項目</th></tr>
    </thead>
    <tbody>
      <tr><td>値</td></tr>
    </tbody>
  </table>
</body>`,
    checkCondition: (code) => code.includes('<thead>') && code.includes('<tbody>')
  },
  {
    id: 33,
    title: `ステージ 33：セルの結合 (colspan)`,
    mission: `テーブルのセルを横方向に結合するため colspan="2" 属性を指定してください。`,
    hint: `<td colspan="2">結合セル</td>`,
    initialCode: `<body>
  <table>
    <tr><td>セル1</td></tr>
  </table>
</body>`,
    correctCode: `<body>
  <table>
    <tr><td colspan="2">見出しセル</td></tr>
  </table>
</body>`,
    checkCondition: (code) => code.includes('colspan=')
  },
  {
    id: 34,
    title: `ステージ 34：プログレスバー (progress)`,
    mission: `進捗を表す <progress> タグ（value属性付き）を使用してください。`,
    hint: `<progress value="70" max="100">70%</progress>`,
    initialCode: `<body>
  進捗率: 70%
</body>`,
    correctCode: `<body>
  <progress value="70" max="100">70%</progress>
</body>`,
    checkCondition: (code) => code.includes('<progress') && code.includes('value=')
  },
  {
    id: 35,
    title: `ステージ 35：数値メーター (meter)`,
    mission: `使用量を表す <meter> タグを使用してください。`,
    hint: `<meter value="0.6" min="0" max="1">60%</meter>`,
    initialCode: `<body>
  使用量: 60%
</body>`,
    correctCode: `<body>
  <meter value="0.6" min="0" max="1">60%</meter>
</body>`,
    checkCondition: (code) => code.includes('<meter') && code.includes('value=')
  },
  {
    id: 36,
    title: `ステージ 36：モーダルダイアログ (dialog)`,
    mission: `ポップアップやモーダルを構築するための <dialog> タグを使用してください。`,
    hint: `<dialog open>モーダル内容</dialog>`,
    initialCode: `<body>
  <!--ここにdialogを配置しよう-->
</body>`,
    correctCode: `<body>
  <dialog open>
    <p>モーダルウィンドウ</p>
  </dialog>
</body>`,
    checkCondition: (code) => code.includes('<dialog') && code.includes('</dialog>')
  },
  {
    id: 37,
    title: `ステージ 37：外部データ埋め込み用 (template)`,
    mission: `JavaScriptなどで複製して使うための非表示テンプレート要素 <template> を使用してください。`,
    hint: `<template><p>テンプレート内容</p></template>`,
    initialCode: `<body>
  <!--ここにtemplateを配置しよう-->
</body>`,
    correctCode: `<body>
  <template>
    <p>再利用可能なテンプレート</p>
  </template>
</body>`,
    checkCondition: (code) => code.includes('<template>') && code.includes('</template>')
  },
  {
    id: 38,
    title: `ステージ 38：外部スタイルシートの読み込み (link rel="stylesheet")`,
    mission: `<head> 内に外部CSSファイル（style.css）を読み込むための <link rel="stylesheet"> タグを記述してください。`,
    hint: `<link rel="stylesheet" href="style.css">`,
    initialCode: `<head>
  <title>テスト</title>
  <!-- CSSを読み込もう -->
</head>`,
    correctCode: `<head>
  <title>テスト</title>
  <link rel="stylesheet" href="style.css">
</head>`,
    checkCondition: (code) => code.includes('rel="stylesheet"') || code.includes("rel='stylesheet'")
  },
  {
    id: 39,
    title: `ステージ 39：スクリプトの読み込み (script src)`,
    mission: `<body> の末尾にJavaScriptファイル（app.js）を読み込むための <script> タグを記述してください。`,
    hint: `<script src="app.js"></script>`,
    initialCode: `<body>
  <h1>アプリ</h1>
  <!-- JSを読み込もう -->
</body>`,
    correctCode: `<body>
  <h1>アプリ</h1>
  <script src="app.js"></script>
</body>`,
    checkCondition: (code) => code.includes('<script') && code.includes('src=') && code.includes('</script>')
  },
  {
    id: 40,
    title: `ステージ 40：【最終試練】実務Webページの完全なフルマークアップ`,
    mission: `DOCTYPE宣言からhead(meta, title, link)、body(header, nav, main(article), aside, footer, script)までを組み合わせた実務レベルの完全なHTML構造を構築しよう！`,
    hint: `これまでの総集編です。正しい親子関係で構築します。`,
    initialCode: `<div>制作物</div>`,
    correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>実務Webページ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <nav><a href="#">Home</a></nav>
  </header>
  <main>
    <article>
      <h1>記事タイトル</h1>
      <p>本文です。</p>
    </article>
  </main>
  <footer>
    <p>&copy; 2026</p>
  </footer>
  <script src="app.js"></script>
</body>
</html>`,
    checkCondition: (code) => code.toLowerCase().includes('<!doctype html>') && code.includes('<html') && code.includes('<head>') && code.includes('<body') && code.includes('<header>') && code.includes('<footer>')
  }
];

export default function HtmlLab() {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const stage = HTML_STAGES[currentStageIdx] || HTML_STAGES[0];

  const storageKey = `html_lab_stage_${stage.id}_code`;
  const [userCode, setUserCode] = useState<string>(() => {
    return localStorage.getItem(storageKey) || stage.initialCode;
  });

  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [showAnswerModal, setShowAnswerModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem(`html_lab_stage_${stage.id}_code`);
    setUserCode(saved || stage.initialCode);
    checkPass(saved || stage.initialCode, false);
    setShowHintModal(false);
    setShowAnswerModal(false);
  }, [currentStageIdx]);

  const checkPass = (code: string, triggerPopup = true) => {
    const passed = stage.checkCondition(code);
    if (passed) {
      if (!isPassed && triggerPopup) {
        setShowModal(true);
      }
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  };

  const handleEditorChange = (val: string | undefined) => {
    const code = val || '';
    setUserCode(code);
    checkPass(code, true);
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, userCode);
    setSaveNotification("💾 セーブしました！");
    setTimeout(() => setSaveNotification(""), 2000);
  };

  const handleReset = () => {
    if (window.confirm("このステージのコードを初期状態に戻しますか？")) {
      localStorage.removeItem(storageKey);
      setUserCode(stage.initialCode);
      checkPass(stage.initialCode, false);
      setSaveNotification("🗑️ 初期化しました");
      setTimeout(() => setSaveNotification(""), 2000);
    }
  };

  const copyAnswerToClipboard = () => {
    navigator.clipboard.writeText(stage.correctCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex h-screen w-full bg-[#1e1e1e] text-white font-sans overflow-hidden relative">
      
      {/* 🎉 クリアお祝いポップアップ */}
      {showModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl flex flex-col items-center text-center">
            <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/30 mb-4 text-emerald-400">
              <Sparkles size={48} className="animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">🎉 STAGE {stage.id} クリア！</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              素晴らしい！正しいHTMLタグとマークアップ構造を再現できました。
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-[#333] hover:bg-[#444] text-gray-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                確認する
              </button>
              <button 
                onClick={() => {
                  setShowModal(false);
                  if (currentStageIdx + 1 < HTML_STAGES.length) {
                    setCurrentStageIdx(prev => prev + 1);
                  } else {
                    alert("🏆 全40ステージ完全制覇おめでとうございます！HTMLマスターです！");
                  }
                }}
                className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-black rounded-xl shadow-lg cursor-pointer"
              >
                次のステージへ ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💡 ヒント表示モーダル */}
      {showHintModal && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] border border-amber-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-3">
              <Lightbulb size={20} /> ステージ {stage.id} のヒント
            </div>
            <p className="text-sm text-gray-200 leading-relaxed bg-[#1e1e1e] p-4 rounded-xl border border-[#3c3c3c] mb-6 font-mono">
              {stage.hint}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 👁️ 模範解答確認用モーダル */}
      {showAnswerModal && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] border border-rose-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <EyeOff size={20} /> ステージ {stage.id} の模範解答
              </div>
              <button
                onClick={copyAnswerToClipboard}
                className="flex items-center gap-1 bg-[#333] hover:bg-[#444] text-gray-200 px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedCode ? 'コピー完了' : 'コードをコピー'}
              </button>
            </div>

            <p className="text-xs text-gray-400 mb-3">
              💡 解答を見て構造を理解したら、エディタにご自身のキーボードで入力して練習しましょう！
            </p>

            <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-xl p-4 mb-6 font-mono text-xs text-orange-400 whitespace-pre-wrap leading-relaxed select-all">
              {stage.correctCode}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowAnswerModal(false)}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 左カラム：ミッション＆ステージ選択 */}
      <div className="w-80 bg-[#252526] border-r border-[#3c3c3c] flex flex-col shrink-0 select-none">
        <div className="p-3 bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center justify-between text-xs font-bold text-orange-400">
          <div className="flex items-center gap-2">
            <Layout size={16} />
            <span>HTML Dojo (全40問)</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleSave} className="p-1 hover:bg-[#333] text-gray-300 rounded cursor-pointer" title="セーブ">
              <Save size={14} />
            </button>
            <button onClick={handleReset} className="p-1 hover:bg-[#333] text-gray-300 rounded cursor-pointer" title="初期化">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {saveNotification && (
          <div className="bg-emerald-950/80 text-emerald-400 text-[11px] font-bold py-1 px-3 text-center border-b border-emerald-900 animate-pulse">
            {saveNotification}
          </div>
        )}

        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">クエスト選択 (1〜40)</span>
            <select
              value={currentStageIdx}
              onChange={(e) => setCurrentStageIdx(parseInt(e.target.value, 10))}
              className="w-full bg-[#1e1e1e] text-orange-300 text-xs font-bold px-3 py-2 rounded border border-[#444] cursor-pointer outline-none"
            >
              {HTML_STAGES.map((s, idx) => (
                <option key={s.id} value={idx}>Stage {s.id}: {s.title}</option>
              ))}
            </select>
          </div>

          <div className="bg-orange-950/40 border border-orange-800/40 p-3 rounded-lg space-y-2">
            <div className="font-bold text-orange-300 flex items-center gap-1.5">
              <HelpCircle size={14} /> ミッション内容
            </div>
            <p className="text-gray-300 leading-relaxed">{stage.mission}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setShowHintModal(true)}
              className="py-2.5 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-700/50 text-amber-300 rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Lightbulb size={14} /> ヒント
            </button>
            <button
              onClick={() => setShowAnswerModal(true)}
              className="py-2.5 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <EyeOff size={14} /> 回答
            </button>
          </div>

          <div className="border-t border-[#3c3c3c] pt-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">判定ステータス</span>
            {isPassed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-400 p-3 rounded-lg flex items-center gap-2 font-bold animate-pulse">
                <CheckCircle2 size={18} /> Accepted (AC) - 合格！
              </div>
            ) : (
              <div className="bg-amber-950/40 border border-amber-800/60 text-amber-400 p-3 rounded-lg flex items-center gap-2 font-bold">
                ✍️ Writing Code... (要件未達)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 💻 中央カラム：HTMLエディタ */}
      <div className="w-[420px] bg-[#252526] flex flex-col h-full border-r border-[#3c3c3c] shrink-0">
        <div className="bg-[#2d2d2d] border-b border-[#3c3c3c] px-4 py-2 text-xs font-bold text-orange-400 flex justify-between items-center">
          <span>✍️ HTML Editor (index.html)</span>
          <span className="text-[10px] text-gray-400 font-mono">Monaco Editor</span>
        </div>
        <div className="flex-1 relative w-full overflow-hidden">
          <Editor
            height="100%"
            language="html"
            theme="vs-dark"
            value={userCode}
            onChange={handleEditorChange}
            options={{
              fontSize: 12,
              minimap: { enabled: false },
              wordWrap: 'on',
            }}
          />
        </div>
      </div>

      {/* 🖼️ 右カラム：ターゲットお手本 ＆ ライブプレビュー比較 */}
      <div className="flex-1 bg-[#141414] flex flex-col h-full overflow-hidden">
        <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-bold text-gray-400 flex justify-between items-center shrink-0">
          <span>👀 ターゲット (お手本) ＆ プレビュー比較</span>
          <span className="text-[10px] text-orange-400 font-mono">HTML Live Judge</span>
        </div>

        <div className="flex-1 p-6 grid grid-rows-2 gap-4 bg-[#1a1a1a] overflow-auto">
          {/* お手本プレビュー */}
          <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
            <div className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 border-b border-slate-200">
              ✨ ターゲット（目指すレンダリング）
            </div>
            <div className="flex-1 bg-white p-4 overflow-auto">
              <iframe
                srcDoc={stage.correctCode}
                title="Target Preview"
                className="w-full h-full border-0 pointer-events-none"
                sandbox="allow-same-origin"
              />
            </div>
          </div>

          {/* ユーザープレビュー */}
          <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
            <div className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 border-b border-slate-200">
              🖥️ あなたのプレビュー結果
            </div>
            <div className="flex-1 bg-white p-4 overflow-auto">
              <iframe
                srcDoc={userCode}
                title="User Preview"
                className="w-full h-full border-0"
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}