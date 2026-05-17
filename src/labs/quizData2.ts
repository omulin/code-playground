// 👑 修正箇所：型インポートに type を明示してエラーを完全粉砕！
import type { Question } from './quizTypes';

export const QUIZ_DATA_2: Question[] = [
  // === 🟦 JavaScript・言語習得マスター（JS検定・実務レベル） ===
  {
    id: 81,
    category: 'JavaScript',
    question: "JavaScriptの非同期処理において、Promiseの成否（resolve / reject）を待ち、同期処理のように上から下へすっきりと記述するためにペアで使用するキーワードの組み合わせはどれですか？",
    options: [
      "try / catch",
      "async / await",
      "then / catch",
      "import / export"
    ],
    correctIdx: 1,
    explanation: "非同期関数を定義する `async` と、Promiseの完了を待つ `await` を組み合わせることで、コールバック地獄や複雑な `.then()` の連鎖を回避し、読みやすいコードを書くことができます。"
  },
  {
    id: 82,
    category: 'JavaScript',
    question: "JavaScriptの配列メソッドにおいて、元の配列を変更せず、条件に合致した（関数の戻り値が true になった）要素「だけ」を集めて新しい配列を生成する高階関数はどれですか？",
    options: ["array.map()", "array.forEach()", "array.filter()", "array.reduce()"],
    correctIdx: 2,
    explanation: "条件に合う要素を抽出（間引き）して新しい配列を作るのは `filter()` です。全要素を加工して同じ長さの新しい配列を作るのは `map()` になります。"
  },

  // === 🐘 WordPress・実務カスタムプロ ===
  {
    id: 121,
    category: 'WordPress',
    question: "WordPressにおいて、自作テーマやプラグインにCSSやJavaScriptファイルを安全かつ正しい順序で読み込ませる（キューに登録する）ために使用する、推奨されたアクションフックはどれですか？",
    options: ["wp_head", "wp_footer", "wp_enqueue_scripts", "admin_init"],
    correctIdx: 2,
    explanation: "HTMLに `<link>` や `<script>` タグを直接ハードコーディングするのではなく、`wp_enqueue_scripts` フックの中で専用の関数を使って登録するのがWordPress開発の鉄則です。"
  },
  {
    id: 122,
    category: 'WordPress',
    question: "WordPressのセキュリティ対策において、データベースから取得した動的なテキストをHTMLとしてブラウザに出力する際、悪意のあるスクリプト（XSS攻撃など）を無害化するために使用するエスケープ関数はどれですか？",
    options: ["esc_html()", "sanitize_text_field()", "wp_strip_all_tags()", "md5()"],
    correctIdx: 0,
    explanation: "画面に安全にテキストを出力（エスケープ）する場合は `esc_html()` などを使い、HTMLタグや特殊文字を無害な文字列に変換します。入力データを綺麗にする（無害化）場合は `sanitize_text_field()` を使います。"
  },

  // === 👁️ 視覚・四角レイアウト（新感覚：ブロックシミュレーション問題） ===
  {
    id: 161,
    category: '視覚レイアウト',
    question: "【視覚クイズ】横並びのFlexboxコンテナ（width: 500px）の中に、3つの四角形（A: 200px, B: 200px, C: 200px、合計600px）を配置しました。このとき、要素がはみ出さずに「幅が自動で縮んで綺麗に収まる」のは、親要素にデフォルトであるCSSプロパティが効いているためです。そのプロパティは何ですか？",
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
    id: 162,
    category: '視覚レイアウト',
    question: "【視覚クイズ】縦一列に並んでいる『赤・青・緑』の3つの四角形ブロックがあります。この親要素に対して、並び順の方向を反転させるプロパティ「flex-direction: column-reverse;」指定しました。このとき、画面の『一番上』に配置されるブロックは何色になりますか？",
    options: ["赤（1番目のブロック）", "青（2番目のブロック）", "緑（3番目のブロック）", "すべての色が重なって消える"],
    correctIdx: 2,
    explanation: "`column-reverse` を指定すると、要素は下から上に向かって配置されるようになります。そのため、元々最後（3番目）にあった「緑」のブロックが、画面の一番上の位置にせり上がってきます。"
  }
];