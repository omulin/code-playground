import type { Question } from './quizTypes';

export const QUIZ_DATA_2: Question[] = [
  // ==========================================
  // ⚡ JavaScript・フロントエンド開発
  // ==========================================
  {
    id: 101,
    category: 'JavaScript',
    question: "JavaScriptにおいて、一度値を代入すると「再代入が不可能」な、安全性の高い変数宣言を行うためのキーワードはどれですか？",
    options: ["var", "let", "const", "def"],
    correctIdx: 2,
    explanation: "`const`（Constant）で宣言した変数は再代入が禁止されるため、バグを防ぐモダンJavaScript開発の基本となります。値が変わる変数には `let` を使用します。"
  },
  {
    id: 102,
    category: 'JavaScript',
    question: "配列の末尾に新しい要素を「追加」し、追加した後の配列の新しい要素数を返す、標準のJavaScript配列メソッドはどれですか？",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctIdx: 1,
    explanation: "`push()` は配列の最後に要素を追加します。ちなみに `pop()` は末尾から削除、`shift()` は先頭から削除、`unshift()` は先頭に追加するメソッドです。"
  },
  {
    id: 103,
    category: 'JavaScript',
    question: "HTMLのボタン要素などが『クリックされた』というイベントを検知して特定の処理を実行させたい場合、一般的に使用される関数は何ですか？",
    options: ["addEventListener()", "triggerEvent()", "attachCallback()", "onProcess()"],
    correctIdx: 0,
    explanation: "`element.addEventListener('click', () => { ... })` のように記述することで、ユーザーの動き（イベント）をトリガーにしたJavaScriptの動的処理を実装できます。"
  },
  {
    id: 104,
    category: 'JavaScript',
    question: "JavaScriptの非同期処理において、データの取得成功（resolve）や失敗（reject）の状態をカプセル化し、`.then()` や `async/await` でスマートに扱えるようにするオブジェクトは何ですか？",
    options: ["Callback", "Promise", "Fetch", "Defer"],
    correctIdx: 1,
    explanation: "Promise（プロミス）は、未来のある時点で完了する非同期処理の結果を表現するオブジェクトで、コールバック地獄を解消するために導入されました。"
  },
  {
    id: 105,
    category: 'JavaScript',
    question: "2つの値が「型も含めて完全に等しい（厳密等価）」かどうかを判定する、JavaScriptで推奨される比較演算子はどれですか？",
    options: ["=", "==", "===", "===="],
    correctIdx: 2,
    explanation: "`==` は暗黙的な型変換を行って比較しますが、`===` は数値の `5` と文字列の `'5'` を明確に「異なるもの」と判定するため、実務では `===` の使用が鉄則です。"
  },
  {
    id: 106,
    category: 'JavaScript',
    question: "配列のすべての要素に対して順番に指定した処理（コールバック関数）を実行する、戻り値を持たないシンプルな繰り返しループ用の配列メソッドは何ですか？",
    options: ["map()", "filter()", "forEach()", "reduce()"],
    correctIdx: 2,
    explanation: "`forEach()` は配列を純粋にループ処理する目的で使用されます。一方、配列を加工して「新しい配列を生成する」場合は `map()` が適しています。"
  },
  {
    id: 107,
    category: 'JavaScript',
    question: "文字列の中に変数の値を直接埋め込むことができる、バッククォート（`）で囲むモダンな文字列記述方法を何と呼びますか？",
    options: ["シングルクォーテーション文字列", "テンプレートリテラル", "プレースホルダー構文", "インジェクションリテラル"],
    correctIdx: 1,
    explanation: "テンプレートリテラルを使用すると、`${variable}` の形で文字列内に変数を直感的かつ改行も含めて綺麗に記述することができます。"
  },
  {
    id: 108,
    category: 'JavaScript',
    question: "ブラウザのJavaScriptからWeb APIなどの外部サーバーにHTTPリクエストを送信し、データを非同期に取得するために標準で用意されている関数は何ですか？",
    options: ["ajax()", "axios()", "fetch()", "request()"],
    correctIdx: 2,
    explanation: "`fetch('https://...')` は、モダンなブラウザに標準搭載されている強力な非同期データ通信用のAPI関数です。"
  },
  {
    id: 109,
    category: 'JavaScript',
    question: "JavaScriptにおいて、既存の配列やオブジェクトを展開して別の配列にドット3つでマージする構文（例：`[...array1, ...array2]`）を何と呼びますか？",
    options: ["レスト構文", "スプレッド構文（スプレッド演算子）", "デストラクト構文", "マージ演算子"],
    correctIdx: 1,
    explanation: "要素を『バラバラに広げる』という意味を持つスプレッド（Spread）構文は、配列の複製や結合、クイズデータのマージ等で極めてよく使われます。"
  },
  {
    id: 110,
    category: 'JavaScript',
    question: "既存の配列から「特定の条件を満たす要素だけ」を抽出して、条件に合う要素だけで構成された新しい配列を生成する便利な配列メソッドはどれですか？",
    options: ["find()", "filter()", "map()", "some()"],
    correctIdx: 1,
    explanation: "`filter()` は、コールバック関数が `true` を返した要素だけで新しい配列を構築します。今回のクイズアプリの「カテゴリ絞り込み」でも大活躍しています。"
  },
  {
    id: 111,
    category: 'JavaScript',
    question: "JavaScriptオブジェクトを、ネットワーク通信やローカルストレージへの保存に適した「ただの1行の文字列（JSON文字列）」に変換するメソッドはどれですか？",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.convert()"],
    correctIdx: 1,
    explanation: "`JSON.stringify()` はデータを文字列化（テキスト化）します。逆に、受け取ったJSON文字列をJavaScriptのオブジェクトに戻すのが `JSON.parse()` です。"
  },
  {
    id: 112,
    category: 'JavaScript',
    question: "ブラウザがHTMLの読み込みを完了し、JavaScriptでHTML要素（DOM）の操作が完全に可能になった瞬間に発火するイベントは何ですか？",
    options: ["load", "DOMContentLoaded", "ready", "click"],
    correctIdx: 1,
    explanation: "`DOMContentLoaded` は画像などの重いファイルの読み込みを待たずに、HTMLの構造（DOM）が組み上がった最速のタイミングで実行されるため、実務で多用されます。"
  },
  {
    id: 113,
    category: 'JavaScript',
    question: "JavaScriptの関数定義において、`function` キーワードを使わず、`(arg) => { ... }` のように矢印を用いてコンパクトに記述するモダンな構文を何と呼びますか？",
    options: ["ラムダ関数", "アロー関数", "ショートカットマクロ", "インラインプロシージャ"],
    correctIdx: 1,
    explanation: "アロー（Arrow＝矢）関数は、記述を劇的に簡略化できるだけでなく、関数内部の `this` の挙動が固定されるという重要な特性を持っています。"
  },
  {
    id: 114,
    category: 'JavaScript',
    question: "非同期処理を同期処理（上から順に処理を待つ形）のように直感的に記述できるようにするキーワードの組み合わせはどれですか？",
    options: ["try / catch", "then / catch", "async / await", "defer / resume"],
    correctIdx: 2,
    explanation: "関数の頭に `async` を付与し、非同期処理の前に `await` を置くことで、プロミスの結果が返ってくるまで処理の一時停止を美しく記述できます。"
  },
  {
    id: 115,
    category: 'JavaScript',
    question: "JavaScriptにおいて、配列やオブジェクトの中から必要な値だけを直接抜き出して、一瞬で個別の変数に代入する便利な構文（例：`const { name, age } = user;`）を何と呼びますか？",
    options: ["分割代入 (Destructuring assignment)", "スプレッド展開", "オブジェクト結合", "プロパティマッピング"],
    correctIdx: 0,
    explanation: "分割代入を使うと、`user.name` や `user.age` のように何度もドットを書く必要がなくなり、コードの視認性が大幅に向上します。"
  },
  {
    id: 116,
    category: 'JavaScript',
    question: "値が未定義であることを表すJavaScript固有のプリミティブ値であり、変数に何も値が代入されていない初期状態の戻り値は何ですか？",
    options: ["null", "undefined", "NaN", "void"],
    correctIdx: 1,
    explanation: "`undefined` は「値が定義されていない（システム側が自動的に付ける）」状態です。意図的に「空っぽ」を代入したい場合は `null` を使用します。"
  },
  {
    id: 117,
    category: 'JavaScript',
    question: "一定の時間（例: 3秒後）が経過した後に、一度だけ特定の関数や処理を実行させたい場合に使用するブラウザ提供のタイマー関数はどれですか？",
    options: ["setInterval()", "setTimeout()", "delay()", "waitProcess()"],
    correctIdx: 1,
    explanation: "`setTimeout()` は指定時間後に一度だけ処理を行います。一方で、一定時間ごとに「何度も繰り返し」処理を行わせたい場合は `setInterval()` を使います。"
  },
  {
    id: 118,
    category: 'JavaScript',
    question: "エラーが発生する可能性のあるコードを囲み、もしエラーが起きてもシステムをクラッシュさせずに安全に例外処理を行うための制御構文はどれですか？",
    options: ["if / else", "try / catch", "switch / case", "error / handler"],
    correctIdx: 1,
    explanation: "`try` ブロックの中で発生したエラーを `catch` ブロックが捕獲（キャッチ）し、画面にエラーメッセージを出すなどの安全なリカバリ処理が行えます。"
  },
  {
    id: 119,
    category: 'JavaScript',
    question: "JavaScriptで「10 / 'apple'」のように、数値として不正な計算（計算不能なエラー）を行った結果として返される特殊な値は何ですか？",
    options: ["null", "undefined", "NaN", "Infinity"],
    correctIdx: 2,
    explanation: "NaNは「Not a Number（数値ではない）」の略で、数学的に矛盾した計算や、数値への変換に失敗したときに現れる特殊なエラー状態の値です。"
  },
  {
    id: 120,
    category: 'JavaScript',
    question: "ブラウザオブジェクトモデル（BOM）において、現在開いているWebページのURL情報を保持しており、JavaScriptから別のURLへページを強制移動させる際にも使用するプロパティは何ですか？",
    options: ["window.document", "window.location", "window.history", "window.navigator"],
    correctIdx: 1,
    explanation: "`window.location.href = 'https://...'` と代入を書き換えることで、プログラムの指示によってユーザーを別のWebページへ転送（リダイレクト）できます。"
  },
  {
    id: 121,
    category: 'JavaScript',
    question: "配列の各要素を「指定したルールで別の値に加工」し、元の配列と同じ長さを持つ『新しい配列』を1から作り出す超重要配列メソッドはどれですか？",
    options: ["filter()", "forEach()", "map()", "reduce()"],
    correctIdx: 2,
    explanation: "`map()` は配列データをReactやVueなどの画面コンポーネント（HTML要素の羅列）に一括変換する際にも、フロントエンド開発で毎日のように使われます。"
  },
  {
    id: 122,
    category: 'JavaScript',
    question: "条件分岐を行う際、`if (条件) { A } else { B }` を、`条件 ? A : B` のように1行でスタイリッシュに表現する演算子を何と呼びますか？",
    options: ["論理演算子", "三項演算子 (条件演算子)", "ヌル合体演算子", "ビット演算子"],
    correctIdx: 1,
    explanation: "三項演算子は、単純な変数の初期化や、Reactのコンポーネント内で「条件を満たしている場合だけこのUIを出す」といった分岐に最適です。"
  },
  {
    id: 123,
    category: 'JavaScript',
    question: "JavaScriptのイベントモデルにおいて、子要素で発生したイベント（クリック等）が、親要素、さらにその上の親要素へと次々に伝播していく現象を何と呼びますか？",
    options: ["イベントキャプチャリング", "イベントバブリング", "イベントデリゲーション", "イベントスロットリング"],
    correctIdx: 1,
    explanation: "水底の泡（バブル）が上昇するように、下から上へイベントが伝わることから「バブリング」と呼びます。これを止めるには `e.stopPropagation()` を使います。"
  },
  {
    id: 124,
    category: 'JavaScript',
    question: "JavaScriptにおいて、関数が定義されたタイミングの周囲のスコープ環境を記憶し、関数が実行される場所が変わってもその変数を参照し続けられる仕組みを何と呼びますか？",
    options: ["クロージャ (Closure)", "プロトタイプチェーン", "ホイスティング", "コールスタック"],
    correctIdx: 0,
    explanation: "クロージャを活用することで、グローバル変数を汚さずに、関数内部だけに隠蔽された安全な状態（プライベート変数のようなもの）を維持できます。"
  },
  {
    id: 125,
    category: 'JavaScript',
    question: "モダンなJavaScript開発において、ソースコードの品質を均一に保つため、構文エラーや記述ルールの違反（インデントのズレ、不要な変数の放置など）を自動で検知・警告してくれる静的解析ツールを何と呼びますか？",
    options: ["Prettier", "ESLint", "Webpack", "Babel"],
    correctIdx: 1,
    explanation: "コードのバグの種やルール違反を叱ってくれるのが `ESLint` です。見た目のフォーマット（整形）を専門とする `Prettier` と組み合わせて使われます。"
  },

  // ==========================================
  // 📝 WordPress・CMS構築
  // ==========================================
  {
    id: 126,
    category: 'WordPress',
    question: "WordPressにおいて、管理画面から投稿した最新の記事一覧などをループ処理で画面に出力する際、必ず使用される超定番の条件式（WordPressループの基本形）はどれですか？",
    options: [
      "if ( has_posts() )",
      "while ( have_posts() ) : the_post();",
      "foreach ( get_posts() as $post )",
      "for ( $i = 0; $i < count($posts); $i++ )"
    ],
    correctIdx: 1,
    explanation: "`while(have_posts()): the_post();` は、表示すべき記事がある限りループを回し、現在の投稿データを内部的にセットする、WordPress開発の王道の呪文です。"
  },
  {
    id: 127,
    category: 'WordPress',
    question: "WordPressテーマを自作する際、ページのヘッダー部分（一般にテーマの header.php）をテンプレート内に読み込ませるために使用する専用の関数は何ですか？",
    options: ["include_header()", "get_header()", "load_template('header')", "wp_header()"],
    correctIdx: 1,
    explanation: "`get_header()` を呼び出すことで、共通パーツである `header.php` を一発で読み込めます。フッターは `get_footer()`、サイドバーは `get_sidebar()` です。"
  },
  {
    id: 128,
    category: 'WordPress',
    question: "WordPressにおいて、管理画面の「外観 ＞ メニュー」の機能を有効化し、テーマ内の特定の場所にカスタムメニューを表示できるようにするために、`functions.php` で実行する関数は何ですか？",
    options: ["add_theme_support('menus')", "register_nav_menus()", "setup_custom_menu()", "wp_nav_menu()"],
    correctIdx: 1,
    explanation: "`register_nav_menus()` でメニューの位置をシステムに登録（定義）し、実際にテンプレート側で出力する際には `wp_nav_menu()` を使用します。"
  },
  {
    id: 129,
    category: 'WordPress',
    question: "WordPressが生成するHTMLの `<head>` タグの終了直前（`</head>`）に必ず記述しなければならない、プラグインやシステムの各種スクリプトを正しく動作させるための必須のアクションフック関数は何ですか？",
    options: ["wp_head()", "get_header()", "wp_footer()", "wp_enqueue_scripts()"],
    correctIdx: 0,
    explanation: "`wp_head()` が抜けていると、SEOプラグインが動かなかったり、CSSが読み込まれなくなったり、多くのプラグインが完全に機能不全を起こすため、テーマ作成の絶対ルールです。"
  },
  {
    id: 130,
    category: 'WordPress',
    question: "WordPressにおいて、標準の「投稿」や「固定ページ」とは別に、店舗情報や制作実績、スタッフ紹介などの『独自の入力・管理画面付きの投稿タイプ』を追加する機能を何と呼びますか？",
    options: ["カスタムタクソノミー", "カスタムフィールド", "カスタム投稿タイプ", "マルチサイト投稿"],
    correctIdx: 2,
    explanation: "「カスタム投稿タイプ」を定義することで、標準のブログ投稿とは完全に切り離した、独自仕様のデータ管理・一覧ページをサイト内に作成できます。"
  },
  {
    id: 131,
    category: 'WordPress',
    question: "WordPressサイト全体の基本設定やデータベースへの接続情報（データベース名、ユーザー名、パスワードなど）が記述されている、最も厳重に管理すべきルートディレクトリのファイル名はどれですか？",
    options: ["functions.php", "wp-config.php", "index.php", ".htaccess"],
    correctIdx: 1,
    explanation: "`wp-config.php`（ダブリューピーコンフィグ）は、WordPressの心臓部にあたる設定ファイルで、このファイルの情報が漏洩するとデータベースが乗っ取られる危険性があります。"
  },
  {
    id: 132,
    category: 'WordPress',
    question: "WordPressループ内で、現在の記事の「投稿本文（メインコンテンツ）」をそのままHTMLとして丸ごと画面に出力する関数はどれですか？",
    options: ["the_title()", "the_content()", "get_the_content()", "the_excerpt()"],
    correctIdx: 1,
    explanation: "`the_content()` は記事本文をそのまま出力します。なお、文字に `the_` がつく関数はその場で画面に出力（echo）し、`get_the_` がつく関数は値を取得するだけで出力はしません。"
  },
  {
    id: 133,
    category: 'WordPress',
    question: "WordPressで構築したサイトにおいて、ログイン画面のデフォルトのURL（不正アクセスや攻撃の標的になりやすい場所）の末尾は一般的にどれですか？",
    options: ["/admin.html", "/wp-login.php", "/login.asp", "/wordpress/setting"],
    correctIdx: 1,
    explanation: "デフォルトでは `wp-login.php` または `wp-admin` からログイン画面に入れます。セキュリティのために、プラグイン等を使ってこのURLを全く別の名前に変更するのが実務の定番対策です。"
  },
  {
    id: 134,
    category: 'WordPress',
    question: "WordPressテーマにおいて、自作のオリジナルCSSやJavaScriptファイルをシステムに安全かつ正しい順序で読み込ませる（登録する）ために推奨されている関数は何ですか？",
    options: ["wp_enqueue_script() / wp_enqueue_style()", "echo '<link rel=...>'", "include_once()", "add_theme_file()"],
    correctIdx: 0,
    explanation: "HTMLに直書きせず `wp_enqueue_style()` や `wp_enqueue_script()` を `functions.php` でフックして登録することで、二重読み込みやプラグインとの競合を安全に回避できます。"
  },
  {
    id: 135,
    category: 'WordPress',
    question: "WordPressにおいて、記事の「カテゴリー」や「タグ」のように、投稿を分類・グループ化するための仕組み（分類法）を総称するテクニカルプログラミング用語は何ですか？",
    options: ["アーカイブ", "タクソノミー", "ターム", "スラッグ"],
    correctIdx: 1,
    explanation: "分類の仕組み全体を「タクソノミー（Taxonomy）」と呼び、その中に入る具体的な項目（例: カレー、ラーメン等）のことを「ターム（Term）」と呼びます。"
  },
  {
    id: 136,
    category: 'WordPress',
    question: "WordPressの自作テーマ構築において、テーマの各種カスタマイズ設定や、自作の関数（機能のフック）を追加するために用意されている、テーマフォルダ内に必須のPHPファイルは何ですか？",
    options: ["custom.php", "functions.php", "theme-init.php", "wp-setting.php"],
    correctIdx: 1,
    explanation: "`functions.php`（ファンクションズピーエイチピー）は、自作テーマの挙動や機能をコントロールするプログラミング用の重要ファイルです。1文字でも記述をミスすると画面が真っ白になります。"
  },
  {
    id: 137,
    category: 'WordPress',
    question: "WordPressの管理画面の投稿エディタにおいて、標準の見出しや段落ブロックとは別に、価格表やQA、ボタンなどの『リッチな装飾済みのパーツをワンクリックで挿入できる仕組み』を何と呼びますか？",
    options: ["カスタムウィジェット", "ショートコード", "ブロックパターン", "プラグインツール"],
    correctIdx: 2,
    explanation: "ブロックパターンを活用すると、あらかじめデザインが組まれたレイアウトの塊をパッと呼び出せるため、実務で運用の手離れが劇的に良くなります。"
  },
  {
    id: 138,
    category: 'WordPress',
    question: "WordPressテーマの個別ページ用テンプレートファイルにおいて、ブログの「通常の投稿詳細（記事ページ）」を表示する際に自動的に最優先で適用されるファイル名はどれですか？",
    options: ["page.php", "single.php", "archive.php", "index.php"],
    correctIdx: 1,
    explanation: "ブログ記事の詳細には `single.php` が使われます。お問い合わせや会社概要などの「固定ページ」の詳細には `page.php` が呼び出されるテンプレート階層のルールがあります。"
  },
  {
    id: 139,
    category: 'WordPress',
    question: "データベース（MySQL）に保存されているブログ記事などのデータを安全にブラウザに表示するために、悪意あるコード（HTMLタグなど）を無害な文字列に変換する処理を何と呼びますか？",
    options: ["エスケープ処理 (サニタイズ)", "バリデーション", "暗号化", "インジェクション"],
    correctIdx: 0,
    explanation: "`esc_html()` などの関数を使ってエスケープ処理を挟むことで、不正なスクリプトがページ上で実行されてしまうクロスサイトスクリプティング（XSS）などの脆弱性を完全に防ぎます。"
  },
  {
    id: 140,
    category: 'WordPress',
    question: "WordPressにおいて、記事の作成画面に「価格」「点数」「イベント開催日」など、標準の枠を超えたオリジナルのカスタム入力欄を追加する機能を何と呼びますか？",
    options: ["カスタムタクソノミー", "カスタムフィールド", "カスタムメタボックス", "アドバンスドエディタ"],
    correctIdx: 1,
    explanation: "「カスタムフィールド」を使うことで、定型データを決まったフォーマットで簡単に入力させ、デザインを統一して画面に出力する高度なWeb構築が可能になります。"
  },
  {
    id: 141,
    category: 'WordPress',
    question: "WordPressループ内で、その記事が所属している「カテゴリーの一覧（リンク付き）」を画面に自動出力してくれる便利なテンプレートタグはどれですか？",
    options: ["the_category()", "get_the_category()", "the_tags()", "show_category_list()"],
    correctIdx: 0,
    explanation: "`the_category()` をループ内で呼び出すことで、その記事に関連づけられたカテゴリーがaタグ付きのリスト形式で自動で echo されます。"
  },
  {
    id: 142,
    category: 'WordPress',
    question: "WordPressにおいて、各ページのURL構造（例: ドメイン/post-123 や ドメイン/category/news など）の表示ルールの設定のことを何と呼びますか？",
    options: ["リンク構造", "パーマリンク設定", "ルーティングマッピング", "スラッグリンク"],
    correctIdx: 1,
    explanation: "「パーマリンク設定」を適切に（例えば『投稿名』に）設定することで、SEOに強く、人間がパッと見ても意味がわかりやすい綺麗なURL構成を維持できます。"
  },
  {
    id: 143,
    category: 'WordPress',
    question: "WordPressテーマにおいて、ブログのトップページや、該当する専用テンプレートが存在しない場合の「最終的な受け皿（すべての基本）」となる絶対に省略不可能な必須ファイルは何ですか？",
    options: ["main.php", "home.php", "index.php", "base.php"],
    correctIdx: 2,
    explanation: "WordPressテーマにおいて最低限必要なのは `style.css` と `index.php` の2つだけです。他のテンプレートが存在しない場合、最終的にすべてこの `index.php` が処理を担当します。"
  },
  {
    id: 144,
    category: 'WordPress',
    question: "WordPressの既存のテーマ（親テーマ）のデザインや機能を壊さずに、アップデートの影響を受けないように安全にカスタマイズを施すために作成するテーマを何と呼びますか？",
    options: ["サブテーマ", "クローンテーマ", "子テーマ (Child Theme)", "カスタムテーマ"],
    correctIdx: 2,
    explanation: "「子テーマ」を作ってカスタマイズを行うことで、親テーマ本体がセキュリティアップデート等で更新されても、自分が書いたコードが上書き消滅する悲劇を防ぐことができます。"
  },
  {
    id: 145,
    category: 'WordPress',
    question: "WordPressの記事一覧ページなどで、記事の本文すべてではなく「最初の110文字程度の抜粋テキスト」だけを綺麗に出力するテンプレートタグはどれですか？",
    options: ["the_content()", "the_excerpt()", "get_the_content()", "the_summary()"],
    correctIdx: 1,
    explanation: "`the_excerpt()`（ジ・エキサプト）を使うことで、ブログの一覧カード等に、自動的に長文を丸めて三点リーダー（…）付きの要約文として表示させられます。"
  },
  {
    id: 146,
    category: 'WordPress',
    question: "WordPressのフッター部分（一般に theme の footer.php）において、`</body>` タグの直前に必ず配置しなければならない、コアシステムや管理バーを表示させるための重要関数は何ですか？",
    options: ["wp_head()", "wp_footer()", "get_footer()", "wp_enqueue_scripts()"],
    correctIdx: 1,
    explanation: "`wp_footer()` は、JavaScriptの読み込みや管理画面用バーの展開フックを握っているため、これがないとサイトが多くの異常（動かないなど）を起こします。"
  },
  {
    id: 147,
    category: 'WordPress',
    question: "WordPressの管理画面の「設定 ＞ 一般」などで設定できる、URLの末尾やカテゴリーのURLに使われる、各ページ固有の「英数字の識別文字列」のことを何と呼びますか？",
    options: ["タグ", "スラッグ (Slug)", "エイリアス", "パーマキー"],
    correctIdx: 1,
    explanation: "例えば「お知らせ」というカテゴリーのスラッグを `news` に設定すると、その一覧URLは `example.com/category/news/` のようになり、綺麗なURLになります。"
  },
  {
    id: 148,
    category: 'WordPress',
    question: "WordPressの固定ページ（お問い合わせ等）において、特定のページ専用のカスタムレイアウトを適用したい場合に、ファイルの最上部に「Template Name: 〇〇」と記述して自作するファイルを何と呼びますか？",
    options: ["カスタム投稿テンプレート", "カスタムページテンプレート", "個別レイアウトファイル", "固定アーカイブ"],
    correctIdx: 1,
    explanation: "「カスタムページテンプレート」を作成すると、管理画面の固定ページ編集側から「どのテンプレートを適用するか」をプルダウンで自由に選べるようになります。"
  },
  {
    id: 149,
    category: 'WordPress',
    question: "WordPressにおいて、ブログ記事に設定された「アイキャッチ画像（サムネイル画像）」のURLやHTMLタグを、ループ内で自動取得・出力する関数はどれですか？",
    options: ["the_post_thumbnail()", "get_image()", "the_eyecatch()", "show_thumbnail_img()"],
    correctIdx: 0,
    explanation: "`the_post_thumbnail()` を記述すると、投稿に設定された記事の看板画像が、自動で `<img>` タグ化されて画面に表示されます（要 functions.php のサポート設定）。"
  },
  {
    id: 150,
    category: 'WordPress',
    question: "現在2020年代のWordPressの標準仕様となっている、ブロックをドラッグ＆ドロップして視覚的にWebページを組み立てていく直感的な最新エディタの開発コードネームは何ですか？",
    options: ["Classic Editor", "Gutenberg (グーテンベルク)", "Elementor", "Visual Composer"],
    correctIdx: 1,
    explanation: "活版印刷の発明者にちなんで名付けられた `Gutenberg` エディタは、これまでのテキスト中心の古い編集画面（クラシックエディタ）を塗り替え、現在の標準となっています。"
  },
// ==========================================
  // 👁️ 視覚レイアウト（ブロックシミュレーション）
  // ==========================================
  {
    id: 151,
    category: '視覚レイアウト',
    question: "【視覚クイズ】横並びのFlexboxコンテナ（width: 500px）の中に、3つの四角形（A: 200px, B: 200px, C: 200px、合計600px）を配置しました。要素がはみ出さずに「幅が自動で縮んで綺麗に収まる」のは、親要素にデフォルトであるCSSプロパティが効いているためです。そのプロパティは何ですか？",
    options: [
      "flex-wrap: nowrap",
      "flex-shrink: 1",
      "flex-grow: 0",
      "justify-content: space-between"
    ],
    correctIdx: 1,
    explanation: "Flexboxの中の子要素は、初期値で `flex-shrink: 1`（縮む設定）が有効になっているため、合計サイズ（600px）が親の幅（500px）を超えても、潰れるようにして自動で枠内に収まるよう調整されます。"
  },
  {
    id: 152,
    category: '視覚レイアウト',
    question: "【視覚クイズ】縦一列に並んでいる『赤・青・緑』の3つの四角形ブロックがあります。この親要素に対して、並び順の方向を反転させるプロパティ「flex-direction: column-reverse;」を指定しました。このとき、画面の『一番上』に配置されるブロックは何色になりますか？",
    options: ["赤（1番目のブロック）", "青（2番目のブロック）", "緑（3番目のブロック）", "すべての色が重なって消える"],
    correctIdx: 2,
    explanation: "`column-reverse` を指定すると、要素は下から上に向かって配置されるようになります。そのため、元々最後（3番目）にあった「緑」のブロックが、画面の一番上の位置にせり上がってきます。",
  },
  {
    id: 153,
    category: '視覚レイアウト',
    question: "【視覚クイズ】親要素（width: 400px）の中心に、幅 200px の子要素を『CSS Grid』を使って、上下左右完全に中央配置にしたいです。親要素（コンテナ）に指定する、最も手軽でモダンなプロパティと値の組み合わせはどれですか？",
    options: [
      "display: grid; text-align: center;",
      "display: grid; place-items: center;",
      "display: grid; justify-content: middle;",
      "display: grid; align-content: space-around;"
    ],
    correctIdx: 1,
    explanation: "CSS Gridにおいて、`place-items: center;` を1行書くだけで、中にある子要素を縦方向（上下）も横方向（左右）も完全にド真ん中に整列させることができます。"
  },
  {
    id: 154,
    category: '視覚レイアウト',
    question: "【視覚クイズ】CSSのボックスモデルにおいて、ある正方形のパーツに `width: 100px; padding: 20px; border: 5px solid black;` を設定しました。このとき、デフォルトの状態でブラウザがレンダリングする、このパーツの「外枠を含めた実際の合計横幅」は何ピクセルになりますか？",
    options: ["100px", "120px", "140px", "150px"],
    correctIdx: 3,
    explanation: "デフォルト（content-box）では、指定した幅（100px）の外側に padding（左右で40px）と border（左右で10px）が足されるため、合計は 100 + 40 + 10 = 150px に膨れ上がります。"
  },
  {
    id: 155,
    category: '視覚レイアウト',
    question: "【視覚クイズ】先ほどのボックスモデルの計算問題を解決し、`width: 100px;` と指定したら、paddingやborderがいくら増えても、パーツの合計横幅を「絶対に100pxのまま固定する」ために、実務でCSSの冒頭に必ず記述されるプロパティは何ですか？",
    options: ["box-sizing: border-box;", "box-sizing: content-box;", "width-control: strict;", "layout-size: fix;"],
    correctIdx: 0,
    explanation: "`box-sizing: border-box;` を指定すると、paddingやborderの厚みが指定幅（100px）の「内側」に食い込むように計算されるため、全体のサイズが膨らまず、レイアウト計算が劇的に楽になります。"
  },
  {
    id: 156,
    category: '視覚レイアウト',
    question: "【視覚クイズ】画面上に並んだ2つのボックスに、それぞれ `margin-bottom: 30px;` と `margin-top: 20px;` が設定されており、縦にぶつかり合っています。このとき、この2つのボックスの間の「実際の物理的な隙間の距離」は何ピクセルになりますか？",
    options: ["50px（足し算される）", "30px（大きい方が勝つ）", "20px（小さい方が勝つ）", "10px（相殺して引き算される）"],
    correctIdx: 1,
    explanation: "CSSの仕様において、ブロック要素の上下のmarginがぶつかると、足し算されずに重なり合う「マージンの相殺（たたみ込み）」が発生します。結果として、数値の大きい方（30px）の余白のみが適用されます。"
  },
  {
    id: 157,
    category: '視覚レイアウト',
    question: "【視覚クイズ】Flexboxで3つのカードを横並びにし、親要素に `justify-content: space-between;` を指定しました。このとき、3つのカードの並び方（視覚的なレイアウト）として正しい説明はどれですか？",
    options: [
      "3つのカードがすべて左端にぎゅっと固まって並ぶ",
      "3つのカードがすべて中央に集まり、隙間なく並ぶ",
      "両端のカードが左右の壁にぴったり張り付き、真ん中のカードとの間だけに均等な隙間ができる",
      "左右の壁との間も含めて、すべての隙間が完全に均等に配置される"
    ],
    correctIdx: 2,
    explanation: "`space-between` は最初と最後の要素を両端の壁に密着させ、残りの余白を中間の要素間で均等に分配します。壁との間に均等な隙間を開ける場合は `space-around` や `space-evenly` を使います。"
  },
  {
    id: 158,
    category: '視覚レイアウト',
    question: "【視覚クイズ】要素を動かす `transform: translate(50px, -20px);` を指定したボックスがあります。このボックスは、元の初期位置からどのように視覚的に移動（シフト）しますか？",
    options: [
      "右に50px、下に20px移動する",
      "右に50px、上に20px移動する",
      "左に50px、下に20px移動する",
      "左に50px、上に20px移動する"
    ],
    correctIdx: 1,
    explanation: "X軸はプラスで「右」、Y軸はマイナスで「上」に向かって要素が移動します。Webブラウザの座標系は上がマイナス、下がプラスになる特有の仕様を持っています。"
  },
  {
    id: 159,
    category: '視覚レイアウト',
    question: "【視覚クイズ】HTML上に `A, B, C` の順で記述された3つの重なり合うボックス（すべて absolute 配置）があります。特にCSSで優先度を指定していない場合、画面上で「最も手前（最前面）」に重なって表示されるのはどのボックスですか？",
    options: ["最初に書かれたA", "真ん中に書かれたB", "最後に書かれたC", "すべての要素がブレンドされて均等に映る"],
    correctIdx: 2,
    explanation: "CSSで `z-index` を指定していない場合、HTMLコード上で「より下に（後から）」記述された要素ほど、ブラウザのレイアウト空間では手前（前面）に重ねて描画されるルールを持っています。"
  },
  {
    id: 160,
    category: '視覚レイアウト',
    question: "【視覚クイズ】親要素に `position: relative;`、子要素に `position: absolute; top: 0; left: 0; width: 100%; height: 100%;` を指定しました。子要素は画面上でどのように表示されますか？",
    options: [
      "親要素の枠を完全に無視して、ブラウザ画面の左上に固定される",
      "親要素の左上を起点として、親要素と「全く同じ大きさ」で完全に上に重なる",
      "親要素の右側に、小さなアイコンサイズで飛び出して配置される",
      "親要素の中心に、丸い円形になって小さく収まる"
    ],
    correctIdx: 1,
    explanation: "親の `relative` を基準の壁にして、子を `absolute` で縦横100%に広げることで、親ボックスのサイズに完全に追従して覆いかぶさるマスクレイアウトや背景演出が完成します。"
  },

  // ==========================================
  // 🚀 フロントエンド・実務総合（161〜200問）
  // ==========================================
  {
    id: 161,
    category: 'JavaScript',
    question: "【実務総合】Gitにおいて、ローカル環境で新しく作成したファイルや変更したファイルを、コミット対象として一時的な「ステージングエリア（インデックス）」に登録するコマンドはどれですか？",
    options: ["git commit", "git push", "git add", "git init"],
    correctIdx: 2,
    explanation: "`git add .`（ドットはすべてのファイルの意）などを実行することで、変更したファイルがステージングに乗り、`git commit` で記録するための準備状態になります。"
  },
  {
    id: 162,
    category: 'WEBデザイン',
    question: "【実務総合】CSSにおいて、フォントサイズなどの単位に「rem（レム）」を使用した場合、このサイズは何を基準にして1倍、2倍と計算（決定）されますか？",
    options: [
      "直上の親要素（親ボックス）のフォントサイズ",
      "ルート要素（一般に html タグ）のフォントサイズ",
      "ブラウザの現在の画面の横幅 (ウィンドウ幅)",
      "ディスプレイの物理的な解像度のピクセル数"
    ],
    correctIdx: 1,
    explanation: "親要素基準の `em` と違い、`rem（Root em）` はサイト全体の根本（html）のフォントサイズ（デフォルトは16px）を基準とするため、デザインの破綻が起きにくいモダンな単位です。"
  },
  {
    id: 163,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptにおいて、ブラウザのメモリ上にデータを半永久的に保存し、ブラウザのタブやウィンドウを完全に閉じたりPCを再起動したりしてもデータが消えない保存領域（API）は何ですか？",
    options: ["sessionStorage", "localStorage", "Cookie", "MemoryCache"],
    correctIdx: 1,
    explanation: "半永久的に残るのが `localStorage` です。今回構築したクイズアプリの「途中でやめても再開できる中断機能」も、この仕組みを使ってデータを保護しています。"
  },
  {
    id: 164,
    category: 'WordPress',
    question: "【実務総合】WordPressテーマのテンプレート内で、現在のページの「URL（パーマリンク）」を文字列として直接画面に出力（echo）するテンプレートタグはどれですか？",
    options: ["the_permalink()", "get_the_permalink()", "the_url()", "show_page_link()"],
    correctIdx: 0,
    explanation: "`the_permalink()` を呼び出すことで、記事や固定ページの固有URLがそのまま出力されます。aタグのhref属性の中に仕込むのが標準の使い方です。"
  },
  {
    id: 165,
    category: 'WEBデザイン',
    question: "【実務総合】CSSのFlexboxにおいて、横並びになった子要素同士の「隙間（余白）」を、marginを細かく計算することなく、親要素に1行書くだけで一律に等間隔に設定できる非常に便利なプロパティは何ですか？",
    options: ["space-between", "padding-mix", "gap", "margin-collapse"],
    correctIdx: 2,
    explanation: "`gap: 20px;` のように親要素に指定するだけで、子要素と子要素の間にだけ綺麗な余白が生まれます。最初や最後の要素の外側には余白が出ないため、コーディングが大幅にスマートになります。"
  },
  {
    id: 166,
    category: 'JavaScript',
    question: "【実務総合】API通信などで取得した、キーと値がペアになったデータの塊「オブジェクト（連想配列）」の全ての『キー（プロパティ名）』のリストを、1つの配列として一瞬で抽出してくれる組み込み関数はどれですか？",
    options: ["Object.keys(obj)", "Object.values(obj)", "Object.entries(obj)", "obj.getAttributes()"],
    correctIdx: 0,
    explanation: "`Object.keys()` を使うと、オブジェクトの持つ全プロパティ名が配列として手に入ります。値のリストが欲しい場合は `Object.values()` を使います。"
  },
  {
    id: 167,
    category: 'WordPress',
    question: "【実務総合】WordPressテーマの最上部テンプレート（一般に header.php）内にある、SEO情報などを記述する `<head>` タグの中に、自作のオリジナルCSSファイルやJSファイルを一括ロードするために絶対に入れるべきフックは何ですか？",
    options: ["get_header();", "wp_head();", "wp_footer();", "wp_enqueue_scripts();"],
    correctIdx: 1,
    explanation: "前出の超重要フック問題の復習です。`<head>` 終了タグの直前に `wp_head();` を書くのは、すべてのWordPressテーマ制作における絶対的な誓約・開発ルールです。"
  },
  {
    id: 168,
    category: 'WEBデザイン',
    question: "【実務総合】HTMLにおいて、テキストの途中で強制的に改行を入れたい場合に使用する、閉じタグの存在しない独立した要素タグはどれですか？",
    options: ["<p>", "<line>", "<br>", "<hr>"],
    correctIdx: 2,
    explanation: "改行は `<br>（Break）` タグを使用します。ただし、スマホ表示のレイアウト調整などの目的で `<br>` を連発すると、SEOやアクセシビリティの低下、PC表示での予期せぬ崩れに繋がります。"
  },
  {
    id: 169,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptでHTML要素（DOM）をクラス名やタグ名、ID名を問わず、CSSセレクタと全く同じ記述方法（例：`.card > h2.title`）でピンポイントに1つだけ取得できる、最も万能で多用されるメソッドは何ですか？",
    options: ["getElementById()", "getElementsByClassName()", "querySelector()", "querySelectorAll()"],
    correctIdx: 2,
    explanation: "`document.querySelector()` は、CSSの書き方でHTML要素を狙い撃ちして取得できる、現在のフロントエンドJavaScriptの標準的な主役メソッドです。"
  },
  {
    id: 170,
    category: 'WordPress',
    question: "【実務総合】WordPressにおいて、サイトのセキュリティを強固にするために、管理画面の「ユーザー名」として設定することが最も危険（不正アクセスの標的になりやすい）とされている文字列はどれですか？",
    options: ["boss_developer", "admin", "wp_user_2026", "site_master"],
    correctIdx: 1,
    explanation: "`admin`（アドミン）や `manager` などの文字列は、攻撃者が最初にブルートフォースアタック（総当たり）で試す定番のユーザー名であるため、これらを管理アカウント名にするのは絶対に避けるべきです。"
  },
  {
    id: 171,
    category: 'WEBデザイン',
    question: "【実務総合】CSSにおいて、背景色などを「半透明」にしたい場合、RGB（赤・緑・青）に透明度（アルファチャンネル）の要素を加えたカラー指定の記述形式は何ですか？",
    options: ["hex（#ffffff）", "rgba（例: rgba(0,0,0,0.5)）", "hsl", "cmyk"],
    correctIdx: 1,
    explanation: "`rgba(0, 0, 0, 0.5)` のように4番目の数値に `0`（完全透明）から `1`（完全不透明）の間の値を設定することで、後ろが透けて見える美しい磨りガラスのようなUIを表現できます。"
  },
  {
    id: 172,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptにおいて、文字列を数値（整数）に安全に変換するための標準組み込み関数はどれですか？",
    options: ["String()", "parseInt()", "Math.round()", "Number.isInteger()"],
    correctIdx: 1,
    explanation: "`parseInt('123', 10)` のように使用することで、文字列の「123」を、プログラムの計算に使える純粋な数値の「123（10進数）」へと変換します。"
  },
  {
    id: 173,
    category: 'WordPress',
    question: "【実務総合】WordPressテーマファイルにおいて、ブログの「カテゴリーごとの記事一覧ページ」や「月別アーカイブページ」などを表示する際、システムによって自動的に呼び出される専用のテンプレートファイル名は何ですか？",
    options: ["single.php", "page.php", "archive.php", "index.php"],
    correctIdx: 2,
    explanation: "一覧（過去ログ）の表示を担当する基本のテンプレートファイルが `archive.php` です。これが無ければ、最終的にすべて `index.php` が身代わりに処理を行います。"
  },
  {
    id: 174,
    category: 'WEBデザイン',
    question: "【実務総合】HTMLの文章内に、プログラムのソースコードであることを表すテキスト（等幅フォントで表示されるもの）を意味的に正しくマークアップするために使用するタグはどれですか？",
    options: ["<script>", "<pre>", "<code>", "<text>"],
    correctIdx: 2,
    explanation: "単一のコードやキーワードには `<code>` タグを使用します。改行やインデントをそのまま維持して複数行のコードの塊を出す場合は、`<pre>` と `<code>` をセットで囲みます。"
  },
  {
    id: 175,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptにおいて、配列の一番最後の要素を「切り取って削除」し、その削除された要素の値を返してくれる配列メソッドは何ですか？",
    options: ["shift()", "pop()", "slice()", "splice()"],
    correctIdx: 1,
    explanation: "`pop()` は配列の一番後ろの要素を1つ取り除いて、配列の長さを1つ縮めます。先頭の要素を削除する場合は `shift()` になります。"
  },
  {
    id: 176,
    category: 'WordPress',
    question: "【実務総合】WordPressにおいて、プラグインを1つも追加していない標準状態のデータベース内に作成される、サイトの設定やオプション情報が一元管理されているコアテーブルの名称は何ですか？",
    options: ["wp_posts", "wp_users", "wp_options", "wp_comments"],
    correctIdx: 2,
    explanation: "`wp_options` テーブルには、サイトのURLやタイトル、有効化されているテーマ名など、システム全体のありとあらゆる根幹設定がレコードとして保存されています。"
  },
  {
    id: 177,
    category: 'WEBデザイン',
    question: "【実務総合】CSSの優先度（詳細度）の計算ルールにおいて、最も優先度が『低く』、他のどんな指定によっても簡単に上書きされてしまう最も弱いセレクタはどれですか？",
    options: ["要素名（タグ名）セレクタ（例: div）", "クラスセレクタ（例: .card）", "IDセレクタ（例: #main）", "インラインスタイル（HTMLへの直接記述）"],
    correctIdx: 0,
    explanation: "優先度の強さは「タグ（1点）＜ クラス（10点）＜ ID（100点）＜ インライン（1000点）」の順になっており、純粋なタグ名セレクタが最も弱い仕様です。"
  },
  {
    id: 178,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptにおいて、条件Aが成立し、かつ条件Bも成立している（両方とも真のときだけ処理をする）という「AND（かつ）」の論理条件を表現する演算子はどれですか？",
    options: ["||", "&&", "??", "!!"],
    correctIdx: 1,
    explanation: "`&&`（アンパサンド2つ）が「かつ（AND）」、`||`（パイプライン2つ）が「または（OR）」を表す論理演算子です。"
  },
  {
    id: 179,
    category: 'WordPress',
    question: "【実務総合】WordPressの関数において、データベースへの直接攻撃（SQLインジェクションなど）を防ぐために、動的な変数を含んだSQL文を安全に安全化（プレースホルダー化）してくれる、グローバル変数 `$wpdb` の持つ超重要メソッドは何ですか？",
    options: ["$wpdb->query()", "$wpdb->prepare()", "$wpdb->escape()", "$wpdb->sanitize()"],
    correctIdx: 1,
    explanation: "`$wpdb->prepare(\"SELECT * FROM ... WHERE id = %d\", $id)` のように記述することで、変数に不正なコードが混入していても自動で安全な形式に無害化して処理を仕掛けてくれます。"
  },
  {
    id: 180,
    category: 'WEBデザイン',
    question: "【実務総合】HTML5において、ページ全体のナビゲーションリンクではない、記事の最後に置かれる「関連リンク」や、SNSへの「シェアボタンの並び」を意味的に表現するために最適なタグは何ですか？",
    options: ["<nav>", "<menu>", "<ul>", "<div>"],
    correctIdx: 1,
    explanation: "サイト全体の主幹ナビには `<nav>` が推奨されますが、ユーザーが操作するインタラクティブなボタンの集まりやツールバー的なコマンドリストには `<menu>` タグの割り当てが意味的に適しています。"
  },
  {
    id: 181,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptにおいて、オブジェクトの中に特定のプロパティ（キー）が存在するかどうかを真偽値（true / false）で確認する演算子は何ですか？",
    options: ["inside", "in", "hasProperty", "exists"],
    correctIdx: 1,
    explanation: "`'category' in question` のように書く `in` 演算子を使用することで、そのオブジェクトに指定のキーが含まれているかどうかを即座に判定できます。"
  },
  {
    id: 182,
    category: 'WordPress',
    question: "【実務総合】WordPressテーマのループ処理の内部において、その記事が「何年何月何日」に公開されたかの投稿日付を画面に出力するテンプレートタグは何ですか？",
    options: ["the_time()", "the_date()", "get_the_date()", "the_posted_day()"],
    correctIdx: 1,
    explanation: "`the_date()` を使うとその日の日付が出力されます。ただし、同じ日に複数の記事がある場合、最初の記事にしか日付が出ない特殊な仕様があるため、実務では `the_time()` や `get_the_date()` をループで回すのが定番の回避策です。"
  },
  {
    id: 183,
    category: 'WEBデザイン',
    question: "【実務総合】CSSにおいて、要素を傾けたり、回転させたり、拡大縮小したりする（例: マウスホバーでボタンを1.1倍に膨らませる）グラフィカルな変形を行うプロパティは何ですか？",
    options: ["transition", "transform", "translate", "turn-effect"],
    correctIdx: 1,
    explanation: "`transform: scale(1.1);` や `transform: rotate(45deg);` のように指定するこのプロパティは、Webサイトに気持ちの良いリッチなアニメーション表現を加える主役機能です。"
  },
  {
    id: 184,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptにおいて、すべてのプロパティとメソッドを継承した「空の新しいオブジェクト」を明示的に1から生成するための標準のオブジェクトメソッドはどれですか？",
    options: ["Object.create()", "Object.new()", "Object.assign()", "Object.init()"],
    correctIdx: 0,
    explanation: "`Object.create(null)` のように使うことで、一切の余計なプロトタイプ（初期設定）を持たない、純粋な空っぽのデータコンテナを作ることができます。"
  },
  {
    id: 185,
    category: 'WordPress',
    question: "【実務総合】WordPressテーマにおいて、管理画面の「ウィジェット」エリアの機能を有効化し、テーマのサイドバーやフッターにユーザーが自由なブログパーツをドラッグ＆ドロップで追加できるようにするために `functions.php` に記述する関数は何ですか？",
    options: ["add_theme_support('widgets')", "register_sidebar()", "setup_widget_area()", "dynamic_sidebar()"],
    correctIdx: 1,
    explanation: "`register_sidebar()` を使ってウィジェットを差し込む「枠（エリア）」の名前をシステムに定義・登録します。実際に画面に出す側には `dynamic_sidebar()` を仕込みます。"
  },
  {
    id: 186,
    category: 'WEBデザイン',
    question: "【実務総合】HTMLにおいて、箇条書きのリスト（ulやol）の中に配置できる、中身の各項目を定義するための「唯一の正しい子要素タグ」はどれですか？",
    options: ["<list>", "<item>", "<li>", "<span>"],
    correctIdx: 2,
    explanation: "`<ul>` や `<ol>` の直下の子要素には、必ず `<li>（List Item）` タグを置かなければならないという厳格な文法ルールがあります。`<div>` などを直接挟むと構文エラーになります。"
  },
  {
    id: 187,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptにおいて、ブラウザのURLに含まれる「?id=123&category=js」のようなクエリパラメータ（連想文字列）を、簡単に解析・取得できるようにしてくれる標準の便利クラス（オブジェクト）は何ですか？",
    options: ["URLSearchParams", "UrlParser", "LocationQuery", "HttpParamEncoder"],
    correctIdx: 0,
    explanation: "`new URLSearchParams(window.location.search)` のようにインスタンス化することで、`.get('id')` のような直感的なメソッドでパラメータの値を一瞬で引っこ抜くことができます。"
  },
  {
    id: 188,
    category: 'WordPress',
    question: "【実務総合】WordPressの関数において、特定の投稿のIDを引数として渡すことで、その記事に設定されている「アイキャッチ画像の生のURL（文字列）」だけを取得してくれる関数は何ですか？",
    options: ["the_post_thumbnail()", "get_the_post_thumbnail_url()", "get_eyecatch_src()", "wp_get_attachment_image()"],
    correctIdx: 1,
    explanation: "HTMLタグ（`<img>`）ごと出力してしまう `the_post_thumbnail()` と違い、`get_the_post_thumbnail_url()` は純粋なURL文字列だけを返すため、CSSの `background-image` にURLを注入したい時に大活躍します。"
  },
  {
    id: 189,
    category: 'WEBデザイン',
    question: "【実務総合】CSSにおいて、文字の太さではなく、文字のスタイルを「斜体（イタリック体）」に変更したい場合に使用する正しいプロパティと値の組み合わせはどれですか？",
    options: ["text-decoration: italic;", "font-style: italic;", "font-variant: oblique;", "text-transform: skew;"],
    correctIdx: 1,
    explanation: "文字を斜めにする装飾は `font-style` プロパティの役割です。下線を引いたり打ち消し線を引いたりするのが `text-decoration` になります。"
  },
  {
    id: 190,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptで、配列のすべての要素に対して関数を実行し、それらの値を「1つの単一の値（例えば配列内の数値の合計値）」へとギュッと畳み込んで集計する高階関数メソッドは何ですか？",
    options: ["map()", "filter()", "forEach()", "reduce()"],
    correctIdx: 3,
    explanation: "`reduce()`（リデュース＝減らす・まとめる）は、配列内の数字をすべて足し算して合計値を出したり、複雑なデータ変形を集計したりする際に威力を発揮する玄人好みのメソッドです。"
  },
  {
    id: 191,
    category: 'WordPress',
    question: "【実務総合】WordPressのテンプレート階層において、サイト内に「404 Not Found（ページが見つかりません）」のエラー画面が発生した際、システムが最優先で自動適用してくれる専用のファイル名は何ですか？",
    options: ["error.php", "404.php", "page-error.php", "index.php"],
    correctIdx: 1,
    explanation: "テーマフォルダ内に `404.php` を作っておくだけで、ユーザーが間違ったURLにアクセスした際に、自動的にオリジナルの親切なエラー案内画面を表示させることができます。"
  },
  {
    id: 192,
    category: 'WEBデザイン',
    question: "【実務総合】HTMLにおいて、他人のブログや公式サイトからの文章を、自分のページ内に「長文の引用ブロック」として意味的に正しく配置したい場合に使用する親要素タグは何ですか？",
    options: ["<quote>", "<cite>", "<blockquote>", "<reference>"],
    correctIdx: 2,
    explanation: "まとまった長文を外部から引用してマークアップする際は `<blockquote>` タグを使用します。1行未満の短いインラインの引用には `<q>` タグが使われます。"
  },
  {
    id: 193,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptにおいて、ある関数が何度も連続して爆速で呼び出された際、処理がオーバーヒートするのを防ぐために「最後の呼び出しから一定時間（例: 0.5秒）経過するまで実行を遅延・間引きする」実務の最適化技法を何と呼びますか？",
    options: ["デバウンス (Debounce)", "スロットリング", "非同期ブロッキング", "コールバックサスペンド"],
    correctIdx: 0,
    explanation: "ブラウザの画面リサイズや、検索窓のキーワード入力（1文字打つごとにAPIを叩くのを防ぐ）などで、負荷を劇的に抑えるために使われる超定番のプロのフロントエンド最適化テクニックです。"
  },
  {
    id: 194,
    category: 'WordPress',
    question: "【実務総合】WordPressテーマにおいて、管理画面の「ユーザープロフィール」などで登録された、ユーザーの「メールアドレスに紐づいたアイコン画像（アバター画像）」を画面に出力する関数は何ですか？",
    options: ["the_user_icon()", "get_avatar()", "show_profile_img()", "wp_user_avatar()"],
    correctIdx: 1,
    explanation: "`get_avatar( $user_id, $size )` を実行すると、世界共通のアバターシステム「Gravatar（グラバター）」から、設定された綺麗なプロフィール画像を自動で取得して出力してくれます。"
  },
  {
    id: 195,
    category: 'WEBデザイン',
    question: "【実務総合】CSSのプロパティにおいて、大文字と小文字を区別する英語のテキストリンク等の表記を、CSSの力だけで「すべて大文字（UPPERCASE）」や「すべて小文字」に自動強制変換するプロパティは何ですか？",
    options: ["text-style", "font-variant", "text-transform", "font-transform"],
    correctIdx: 2,
    explanation: "`text-transform: uppercase;` を指定すると、HTMLに `welcome` と小文字で書かれていても、画面上は自動で `WELCOME` とすべて大文字に揃えて美しく描画されます。"
  },
  {
    id: 196,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptの標準オブジェクトにおいて、現在の日時や時刻（年、月、日、時、分、秒）を取得したり、時間の計算を行うためにインスタンス化して使用する組み込みクラスは何ですか？",
    options: ["Time", "Clock", "Date", "DateTime"],
    correctIdx: 2,
    explanation: "`const now = new Date();` のように生成することで、現在の正確な時刻情報を取得し、カレンダー機能や「投稿から何日前」といった時間のロジックを扱えるようになります。"
  },
  {
    id: 197,
    category: 'WordPress',
    question: "【実務総合】WordPressテーマの自作において、メインのデータベースへの問い合わせ（メインクエリ）とは完全に切り離して、固定ページ内や特定のサイドバー内に「特定のカテゴリーの記事だけを5件新しく取得して並べる」といった、自作のサブクエリを発行する際にインスタンス化する、WordPress最強のコアクラスは何ですか？",
    options: ["$wpdb", "WP_Query", "WP_Loop", "get_posts"],
    correctIdx: 1,
    explanation: "`$custom_query = new WP_Query($args);` のように条件をセットして呼び出すことで、WordPress内のありとあらゆる投稿データを自由自在に、好きな場所に、好きな並び順で引っこ抜くことができる超主役級のクラスです。"
  },
  {
    id: 198,
    category: 'WEBデザイン',
    question: "【実務総合】HTMLにおいて、画像やビデオなどのマルチメディア要素に対して、画面レイアウト上の「縦横比（アスペクト比、例: 16 / 9 など）」をあらかじめカチッと固定し、画像の読み込みによる画面のガタつき（レイアウトシフト）を防ぐためのモダンなCSSプロパティは何ですか？",
    options: ["aspect-ratio", "object-fit", "size-lock", "view-ratio"],
    correctIdx: 0,
    explanation: "`aspect-ratio: 16 / 9;` と記述することで、中身の動画データがロードされる前であっても、ブラウザに「ここには16対9の箱が入るから余白を開けておけ！」と命令できるため、ユーザー体験（UX）が大幅に向上します。"
  },
  {
    id: 199,
    category: 'JavaScript',
    question: "【実務総合】JavaScriptにおいて、ある変数の中身が `null` または `undefined` の「どちらか空っぽの時だけ」、右側に書いたデフォルトの初期値を適用する、ドット2つ（??）で記述するモダンな演算子を何と呼びますか？",
    options: ["三項演算子", "ヌル合体演算子 (Nullish coalescing operator)", "オプショナルチェイニング", "論理否定演算子"],
    correctIdx: 1,
    explanation: "`const score = savedScore ?? 0;` のように記述します。従来の `||` と違い、数値の `0` や空文字 `\"\"` を「有効なデータ」として正しく扱い、本当に中身がすっからかんの時だけ挙動を補完できる非常に安全な演算子です。"
  },
  {
    id: 200,
    category: 'WordPress',
    question: "【実務総合・第200問】WordPressにおいて、サイトの引っ越しやドメインの変更を行う際、データベース内にシリアライズ（暗号コード化）されて保存されている古いURLデータを、データの構造を一切破壊することなく安全に新しいURLに一括置換してくれる、エンジニア御用達の最高峰のコマンドラインツール（または外部ツール）の名称は何ですか？",
    options: ["phpMyAdmin", "WP-CLI (wp search-replace コマンド)", "All in One WP Migration", "SQL-Converter"],
    correctIdx: 1,
    explanation: "WordPressのデータはただのテキスト置換を行うと文字数のズレでデータが破損してしまいますが、`wp search-replace 'old.com' 'new.com'` を使うことで、シリアライズのバイト数計算をバックグラウンドで自動修正しながら安全・完璧にURLを全置換してくれます。これができれば本物のプロ開発者です！"
  }
];