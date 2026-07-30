import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

type LangType = 'js' | 'python' | 'php' | 'html';

interface BugStage {
  id: number;
  category: LangType;
  title: string;
  mission: string;
  initialCode: string;
  runner: (code: string) => { success: boolean; log: string };
}

// 👑 全35問（JS10問, Python10問, PHP10問, HTML5問）のガチアルゴリズム！
const CODE_STAGES: BugStage[] = [
  // --- JAVASCRIPT (1-10) ---
  { id: 1, category: 'js', title: "reduceの初期値の罠", mission: "オブジェクト配列から金額の合計を出したいですがエラーになります。reduceの第2引数（初期値）を設定して直してください。", initialCode: "function calcTotal(cart) {\n  return cart.reduce((acc, item) => {\n    return acc + item.price;\n  });\n}", runner: (c) => c.includes(", 0)") || c.includes(",0)") ? { success: true, log: "▶ 300\n\n✨ SUCCESS: 初期値0が設定されました！" } : { success: false, log: "🚨 TypeError: [object Object]100200" } },
  { id: 2, category: 'js', title: "クロージャーとvarの呪い", mission: "0, 1, 2を出力したいのに、すべて3になります。ループ内の変数宣言をES6の安全なものに変更してください。", initialCode: "function createCounters() {\n  const fns = [];\n  for (var i = 0; i < 3; i++) {\n    fns.push(() => i);\n  }\n  return fns;\n}", runner: (c) => c.includes("let i") ? { success: true, log: "▶ 0\n▶ 1\n▶ 2\n\n✨ SUCCESS: ブロックスコープが正常に働きました！" } : { success: false, log: "▶ 3\n▶ 3\n▶ 3\n\n🚨 Error: 変数が上書きされています" } },
  { id: 3, category: 'js', title: "参照渡しのディープコピー", mission: "ネストされたオブジェクトをコピーしたいのですが、元の値まで変わってしまいます。JSONを使ったディープコピーを実装してください。", initialCode: "function updateConfig(config) {\n  const newConf = config;\n  newConf.settings.theme = 'dark';\n  return newConf;\n}", runner: (c) => c.includes("JSON.parse") || c.includes("structuredClone") ? { success: true, log: "▶ 元: light, コピー: dark\n\n✨ SUCCESS: 完全な別オブジェクトになりました！" } : { success: false, log: "🚨 Error: 元のオブジェクトまで dark に汚染されました！" } },
  { id: 4, category: 'js', title: "Setを使った配列の重複排除", mission: "配列の重複を排除する関数を作ってください。（ヒント: new Set() を使い、スプレッド構文で配列に戻します）", initialCode: "function removeDuplicates(arr) {\n  return arr;\n}", runner: (c) => c.includes("Set") && c.includes("...") ? { success: true, log: "▶\n\n✨ SUCCESS: 重複が綺麗に消えました！" } : { success: false, log: "▶\n\n🚨 Error: 重複が残っています" } },
  { id: 5, category: 'js', title: "非同期処理の直列化 (Promise)", mission: "複数の非同期処理が同時に走ってしまいます。for...of と await を使って、順番に（直列に）実行されるように修正してください。", initialCode: "async function processAll(items) {\n  items.forEach(async (item) => {\n    await fetch(item);\n  });\n}", runner: (c) => c.includes("for") && c.includes("await") && !c.includes("forEach") ? { success: true, log: "▶ Item 1 done\n▶ Item 2 done\n\n✨ SUCCESS: 直列処理になりました！" } : { success: false, log: "🚨 Error: 並列で一気に実行されてサーバーがパンクしました！" } },
  { id: 6, category: 'js', title: "thisを見失うコールバック", mission: "クラス内の setTimeout で this が未定義になります。アロー関数を使って this のスコープを固定してください。", initialCode: "class Timer {\n  constructor() { this.count = 0; }\n  start() {\n    setTimeout(function() {\n      this.count++;\n    }, 1000);\n  }\n}", runner: (c) => c.includes("() =>") || c.includes("bind(this)") ? { success: true, log: "▶ count: 1\n\n✨ SUCCESS: thisが正しくバインドされています！" } : { success: false, log: "🚨 TypeError: Cannot read properties of undefined" } },
  { id: 7, category: 'js', title: "アナグラム判定", mission: "2つの文字列がアナグラムか判定する処理を1行で書いてください。（split, sort, joinを使います）", initialCode: "function isAnagram(str1, str2) {\n  return false;\n}", runner: (c) => c.includes("split") && c.includes("sort") && c.includes("join") ? { success: true, log: "▶ true\n\n✨ SUCCESS: アナグラム判定ロジック完成！" } : { success: false, log: "🚨 Error: 判定ロジックが未実装です" } },
  { id: 8, category: 'js', title: "分割代入とデフォルト値", mission: "オブジェクトから値を取り出す際、キーが存在しない場合にデフォルト値 'guest' を設定する分割代入を書いてください。", initialCode: "function greet(user) {\n  const { name } = user;\n  console.log(name);\n}", runner: (c) => c.includes("guest") ? { success: true, log: "▶ guest\n\n✨ SUCCESS: デフォルト値が効いています！" } : { success: false, log: "▶ undefined\n\n🚨 Error: 名前が取得できません" } },
  { id: 9, category: 'js', title: "配列の平坦化 (再帰)", mission: "多次元配列 [1, [2,]] を平坦化してください。組み込みの flat(Infinity) を使えば一撃です。", initialCode: "function flatten(arr) {\n  return arr;\n}", runner: (c) => c.includes("flat") ? { success: true, log: "▶\n\n✨ SUCCESS: 平坦化完了！" } : { success: false, log: "🚨 Error: 配列がネストされたままです" } },
  { id: 10, category: 'js', title: "キャッシュの実装 (メモ化)", mission: "関数の計算結果を保存し、同じ引数が来たらキャッシュを返すクロージャー関数 memoize を完成させてください。", initialCode: "function memoize(fn) {\n  const cache = {};\n  return function(...args) {\n    \n  };\n}", runner: (c) => c.includes("cache") && c.includes("return") ? { success: true, log: "▶ キャッシュから瞬時に返却\n\n🏆 JAVASCRIPT MASTER CLEAR!" } : { success: false, log: "🚨 Error: 毎回重い計算が走っています" } },

  // --- PYTHON (11-20) ---
  { id: 11, category: 'python', title: "デフォルト引数のミュータブル問題", mission: "引数の l=[] が一度しか初期化されず使い回されます。デフォルト値を None にし、内部で初期化してください。", initialCode: "def add_item(item, l=[]):\n    l.append(item)\n    return l", runner: (c) => c.includes("None") ? { success: true, log: "▶\n▶\n\n✨ SUCCESS: 独立したリストが作られました！" } : { success: false, log: "▶\n\n🚨 Warning: リストの中身が引き継がれています！" } },
  { id: 12, category: 'python', title: "ループ内のlambda遅延評価", mission: "関数のリストがすべて最後の値(2)を返します。lambdaの引数にデフォルト値 x=i を渡して値を束縛してください。", initialCode: "funcs = [lambda: i for i in range(3)]\nfor f in funcs: print(f())", runner: (c) => c.includes("=") ? { success: true, log: "▶ 0\n▶ 1\n▶ 2\n\n✨ SUCCESS: クロージャーが正しく束縛されました！" } : { success: false, log: "▶ 2\n▶ 2\n▶ 2\n\n🚨 Error: 変数が遅延評価されています" } },
  { id: 13, category: 'python', title: "ループ中のリスト変更バグ", mission: "イテレート中のリストから要素を削除すると順番が狂います。リストのコピー lst[:] などを回すように修正してください。", initialCode: "lst = [1, 2, 3, 4]\nfor item in lst:\n    if item % 2 == 0:\n        lst.remove(item)", runner: (c) => c.includes(":") || c.includes("copy") ? { success: true, log: "▶\n\n✨ SUCCESS: 安全に要素が削除されました！" } : { success: false, log: "🚨 Warning: ループ中にインデックスが狂いました" } },
  { id: 14, category: 'python', title: "ローカル変数の束縛", mission: "関数内で外の変数を書き換えようとしてエラーになります。関数の先頭で global count を宣言してください。", initialCode: "count = 0\ndef increment():\n    count += 1\n    return count", runner: (c) => c.includes("global") ? { success: true, log: "▶ 1\n\n✨ SUCCESS: グローバル変数を書き換えました！" } : { success: false, log: "🚨 UnboundLocalError: local variable referenced" } },
  { id: 15, category: 'python', title: "ディープコピーの欠落", mission: "ネストされたリストを .copy() でコピーしても中身は連動してしまいます。copyモジュールの deepcopy を使ってください。", initialCode: "import copy\norig = [[1, 2], [3, 4]]\nnew_list = orig.copy()", runner: (c) => c.includes("deepcopy") ? { success: true, log: "▶ 元: [[1, 2], [3, 4]]\n▶ 新: [[1, 2], [3, 4]]\n\n✨ SUCCESS: 完全なコピーが生成されました！" } : { success: false, log: "🚨 Error: シャローコピーのため中身が連動しました" } },
  { id: 16, category: 'python', title: "デコレータのメタデータ消失", mission: "デコレータを使うと元の関数名（__name__）が消えます。functools.wraps を使って情報を引き継いでください。", initialCode: "def my_decorator(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper", runner: (c) => c.includes("wraps") ? { success: true, log: "▶ __name__: my_function\n\n✨ SUCCESS: メタデータが保持されました！" } : { success: false, log: "🚨 Error: __name__ が 'wrapper' になっています" } },
  { id: 17, category: 'python', title: "辞書の安全な取得 (.get)", mission: "キーが存在しない時に KeyError で落ちないよう、user.get('age', '未設定') を使ってください。", initialCode: "user = {'name': 'Taro'}\nprint(user['age'])", runner: (c) => c.includes("get") ? { success: true, log: "▶ 未設定\n\n✨ SUCCESS: 安全に辞書から値を取得しました！" } : { success: false, log: "🚨 KeyError: 'age'" } },
  { id: 18, category: 'python', title: "MROとsuper()の多重継承", mission: "子クラスから親クラスの __init__ を呼ぶ際、直接クラス名を書かず、super().__init__() を使ってください。", initialCode: "class Child(Parent):\n    def __init__(self):\n        Parent.__init__(self)", runner: (c) => c.includes("super") ? { success: true, log: "▶ Parent Initialized\n\n✨ SUCCESS: MROに従った安全な呼び出しです！" } : { success: false, log: "🚨 Warning: 多重継承時に初期化が重複する危険な書き方です" } },
  { id: 19, category: 'python', title: "例外の広すぎるキャッチ", mission: "except: と書くとシステム終了の例外まで潰してしまいます。except Exception: または except ValueError: と明示してください。", initialCode: "try:\n    int('abc')\nexcept:\n    print('Error')", runner: (c) => c.includes("Exception") || c.includes("ValueError") ? { success: true, log: "▶ Error handled\n\n✨ SUCCESS: 安全な例外処理になりました！" } : { success: false, log: "🚨 Warning: KeyboardInterruptまでキャッチする危険な書き方" } },
  { id: 20, category: 'python', title: "リスト内包表記の最適化", mission: "空のリストを作ってforでappendする処理を、美しい「リスト内包表記 [x for x in ...]」に1行で書き直してください。", initialCode: "evens = []\nfor i in range(10):\n    if i % 2 == 0:\n        evens.append(i)", runner: (c) => c.includes("[") && c.includes("for") && !c.includes("append") ? { success: true, log: "▶ [0, 2, 4, 6, 8]\n\n🏆 PYTHON MASTER CLEAR!" } : { success: false, log: "🚨 Error: リスト内包表記が使えます！" } },

  // --- PHP / WORDPRESS (21-30) ---
  { id: 21, category: 'php', title: "foreachの参照渡しバグ", mission: "foreach ($arr as &$val) の後、unset($val) を忘れると要素が上書きされます。unsetを追加して！", initialCode: "$nums = [1, 2, 3];\nforeach ($nums as &$n) { $n *= 2; }\nforeach ($nums as $n) { echo $n; }", runner: (c) => c.includes("unset") ? { success: true, log: "▶ 246\n\n✨ SUCCESS: 参照が安全に切断されました！" } : { success: false, log: "▶ 244\n\n🚨 Fatal: 最後の要素が汚染されました！" } },
  { id: 22, category: 'php', title: "WP: サブループのデータ破壊", mission: "WP_Query でサブループを回した後、メインループの投稿データが破壊されています。wp_reset_postdata(); を最後に呼んでください。", initialCode: "$query = new WP_Query($args);\nwhile ($query->have_posts()) {\n    $query->the_post();\n}", runner: (c) => c.includes("wp_reset_postdata") ? { success: true, log: "▶ Global post restored\n\n✨ SUCCESS: メインループが正常に復活しました！" } : { success: false, log: "🚨 Error: メインループの投稿データが上書きされたままです！" } },
  { id: 23, category: 'php', title: "遅延静的束縛", mission: "親クラスで self:: を使うと、継承先で上書きした定数が反映されません。self:: ではなく static:: に変更してください。", initialCode: "class ParentClass {\n    public static function get() {\n        return self::$name;\n    }\n}", runner: (c) => c.includes("static") ? { success: true, log: "▶ Child Name\n\n✨ SUCCESS: 呼び出し元のクラスの定数が取得できました！" } : { success: false, log: "🚨 Error: 常に親クラスの定数が返ってしまいます！" } },
  { id: 24, category: 'php', title: "SQLインジェクションの脆弱性", mission: "DB操作で変数を直接SQLに埋め込んでいて超危険です。$wpdb->prepare() を使って安全にプレースホルダー化してください。", initialCode: "$wpdb->get_results(\"SELECT * FROM wp_users WHERE id = $user_id\");", runner: (c) => c.includes("prepare") ? { success: true, log: "▶ Query Safe\n\n✨ SUCCESS: SQLインジェクションを完全に防ぎました！" } : { success: false, log: "🚨 CRITICAL: SQLインジェクションの脆弱性があります！" } },
  { id: 25, category: 'php', title: "empty()の過剰な判定", mission: "文字列の '0' を empty() で判定すると true になりデータが消えます。 !== '' などの厳密な判定に直してください。", initialCode: "if (empty($value)) {\n    echo '未入力';\n}", runner: (c) => c.includes("!==") || c.includes("strlen") ? { success: true, log: "▶ 値: 0\n\n✨ SUCCESS: 0という値が正しく認識されました！" } : { success: false, log: "🚨 Error: 文字列の '0' まで未入力扱いされてしまいます！" } },
  { id: 26, category: 'php', title: "WP無限ループ (save_post)", mission: "save_post フックの中で wp_update_post() を呼ぶと無限ループします。更新直前に remove_action() でフックを外してください。", initialCode: "add_action('save_post', 'my_save');\nfunction my_save($post_id) {\n    wp_update_post(['ID' => $post_id, 'post_title' => 'New']);\n}", runner: (c) => c.includes("remove_action") ? { success: true, log: "▶ Post Updated\n\n✨ SUCCESS: 無限ループを回避しました！" } : { success: false, log: "🚨 500 Error: 無限ループでメモリが枯渇しました！" } },
  { id: 27, category: 'php', title: "クロージャーの外の変数変更", mission: "クロージャー内で外の変数を書き換えるには、use ($var) ではなく、参照渡し use (&$var) にする必要があります。", initialCode: "$count = 0;\n$func = function() use ($count) {\n    $count++;\n};", runner: (c) => c.includes("&$") ? { success: true, log: "▶ count: 1\n\n✨ SUCCESS: クロージャー内から外の変数を変更できました！" } : { success: false, log: "🚨 Error: 値渡しのため、外の変数は0のままです！" } },
  { id: 28, category: 'php', title: "配列マージの落とし穴", mission: "連想配列の結合に + を使うと上書きされません。array_merge() 関数を使って後勝ちで上書きさせてください。", initialCode: "$base = ['a' => 1];\n$custom = ['a' => 2];\n$res = $base + $custom;", runner: (c) => c.includes("array_merge") ? { success: true, log: "▶ ['a' => 2]\n\n✨ SUCCESS: 配列が正しく上書き結合されました！" } : { success: false, log: "🚨 Error: 前勝ちになり、カスタム値が無視されています！" } },
  { id: 29, category: 'php', title: "Null合体演算子 (??)", mission: "isset() ? $a : 'b' という冗長な三項演算子を、PHP7以降の「Null合体演算子 (??)」を使って短く書いてください。", initialCode: "$name = isset($_GET['n']) ? $_GET['n'] : 'guest';", runner: (c) => c.includes("??") ? { success: true, log: "▶ guest\n\n✨ SUCCESS: スマートなモダンPHP記法になりました！" } : { success: false, log: "🚨 Error: もっと短く書けるモダンな演算子があります！" } },
  { id: 30, category: 'php', title: "厳密な型チェックと暗黙の変換", mission: "if ($a == 0) だと $a が 'abc' の時にも true になるバグが起きます。=== を使って厳密に比較してください。", initialCode: "if ($val == 0) {\n    echo 'Zero';\n}", runner: (c) => c.includes("===") ? { success: true, log: "▶ 型も値も一致しません\n\n🏆 PHP/WP MASTER CLEAR!" } : { success: false, log: "🚨 Warning: 'abc' == 0 が true になる危険な比較です！" } },

  // --- HTML / CSS (31-35) ---
  { id: 31, category: 'html', title: "HTML：ナビゲーション要素のセマンティクス", mission: "メニューバーをただの <div> で作るのはバッドノウハウです。HTML5の適切な構造タグ <nav> に書き直してください。", initialCode: "<div class='menu'>\n  <a href='#'>Home</a>\n  <a href='#'>About</a>\n</div>", runner: (c) => c.includes("nav") ? { success: true, log: "▶ DOM Tree: Structural SEO Passed\n\n✨ SUCCESS: 検索エンジンに優しい適切な構造になりました！" } : { success: false, log: "🚨 Semantic Error: ナビゲーションを表す専用のHTML5タグを使ってください！" } },
  { id: 32, category: 'html', title: "HTML：重要テキストの強調表現", mission: "文字を太字にしたい時、ただの <b> タグを使うとSEO上の意味がありません。ブラウザに「重要」と伝える <strong> タグに変えてください。", initialCode: "ログイン時は <b>パスワードの管理</b> に注意してください。", runner: (c) => c.includes("strong") ? { success: true, log: "▶ Text Hierarchy: Perfect\n\n✨ SUCCESS: 機械読解的にも重要なテキストとして強調されました！" } : { success: false, log: "🚨 SEO Error: 単なる太字ではなく、重要性を意味するタグにリファクタリングしてください！" } },
  { id: 33, category: 'html', title: "CSS：モダンレイアウト (Flexboxの有効化)", mission: "要素を横並びにしたいです。対象のセレクタに、Flexboxを有効化する最重要プロパティを記述してください。", initialCode: ".flex-container {\n  /* ここに横並びを有効化するプロパティを記述 */\n  justify-content: space-between;\n}", runner: (c) => c.includes("display") && c.includes("flex") ? { success: true, log: "▶ Layout: Flexible Row Mode\n\n✨ SUCCESS: コンポーネントが美しく横一列に並びました！" } : { success: false, log: "🚨 Layout Error: 子要素を自在に並べるための親の魔法『display: flex;』が不足しています！" } },
  { id: 34, category: 'html', title: "CSS：レスポンシブデザインのブレイクポイント", mission: "スマホ画面（横幅768px以下）だけにスタイルを適応させるための「メディアクエリ（@media）」の条件文を完成させてください。", initialCode: "@media (max-width: ) {\n  .sidebar { display: none; }\n}", runner: (c) => c.includes("768") ? { success: true, log: "▶ Responsive Check: Mobile UI Test Passed\n\n✨ SUCCESS: スマートフォン表示時にサイドバーが自動で格納されます！" } : { success: false, log: "🚨 Responsive Error: 一般的なタブレット/スマホの境界値である『768px』が指定されていません！" } },
  { id: 35, category: 'html', title: "CSS：最優先フラグ (!important) の罠", mission: "他のスタイルを強制上書きしようとして効いていません。CSSの禁忌にして最強の優先フラグ『!important』をプロパティの末尾に付与して力技で解決してください。", initialCode: ".text-red {\n  color: red;\n}", runner: (c) => c.includes("important") ? { success: true, log: "▶ Style Priority: Enforced\n\n🏆 HTML/CSS MASTER CLEAR!!!! 全35ステージ完全制覇、本当にお見事でございます" } : { success: false, log: "🚨 Priority Error: 何が何でも強制上書きするフラグ『 !important; 』を付与してください！" } }
];

export interface CodeLabProps {
  isPreviewOnly?: boolean;
  isPreviewHidden?: boolean;
}

export default function CodeLab({ isPreviewOnly = false, isPreviewHidden = false }: CodeLabProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  
  const [code, setCode] = useState<string>("");
  const [terminalLog, setTerminalLog] = useState<string>("⏳ コードを修正して、下の「▶ RUN CODE」ボタンを押してください...");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const stage = CODE_STAGES[currentIdx];
  const lang = stage.category; 

  useEffect(() => {
    setCode(stage.initialCode);
    setTerminalLog(`⏳ サーバー準備完了 (${lang.toUpperCase()} 環境)。コードを記述してください。`);
    setIsSuccess(false);
  }, [currentIdx, stage.initialCode, lang]);

  // 💡 リアルタイム同期ロジック（メイン画面とポップアップ画面の通信）
  useEffect(() => {
    if (!isPreviewOnly) {
      localStorage.setItem('code_lab_sync_code', code);
    }
  }, [code, isPreviewOnly]);

  useEffect(() => {
    if (isPreviewOnly) {
      const synced = localStorage.getItem('code_lab_sync_code');
      if (synced !== null) setCode(synced);

      const handleStorage = (e: StorageEvent) => {
        if (e.key === 'code_lab_sync_code' && e.newValue !== null) {
          setCode(e.newValue);
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }
  }, [isPreviewOnly]);

  const handleRunDebug = () => {
    setIsRunning(true);
    setTerminalLog(`⚡ Compiling via ${lang.toUpperCase()} Virtual Backend...`);
    
    setTimeout(() => {
      try {
        const result = stage.runner(code);
        setTerminalLog(result.log);
        setIsSuccess(result.success);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        setTerminalLog(`🚨 Compile Error: ${errorMessage}`);
        setIsSuccess(false);
      }
      setIsRunning(false);
    }, 600);
  };

  const nextStage = () => {
    if (currentIdx < CODE_STAGES.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsSuccess(false);
      setTerminalLog("🏆 全35ステージ完全制覇！世界トップクラスのバグフィックス能力です！！！");
    }
  };

  // 💡 HTMLとPHPのステージの時だけ安全にタグ補完を動かす
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (editor: any, monaco: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editor.onDidChangeModelContent((e: any) => {
      const model = editor.getModel();
      if (!model) return;
      const currentLang = model.getLanguageId();
      if (currentLang !== 'html' && currentLang !== 'php') return;

      const changes = e.changes[0];
      
      if (changes && changes.text === '>') {
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
      }
    });
  };

  // 💡 プレビュー/出力のレンダリング
  const renderPreviewPanel = () => {
    if (lang === 'html') {
      return (
        <div className="w-full h-full bg-white text-left flex flex-col overflow-hidden">
          <div className="bg-[#f1f5f9] text-slate-700 text-[10px] font-mono px-3 py-1.5 border-b border-slate-300 flex items-center gap-2 select-none shrink-0">
            <span className="text-emerald-600 font-bold">🔒 Preview</span>
          </div>
          <iframe
            className="flex-1 w-full border-0 bg-white"
            srcDoc={code}
            title="preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      );
    } else {
      return (
        <div className="w-full h-full bg-[#141414] text-cyan-300 font-mono p-4 overflow-auto text-xs whitespace-pre-wrap flex flex-col">
          <div className="text-slate-500 mb-2 border-b border-[#222] pb-1 select-none">// Live Output Preview</div>
          <div className="flex-1 leading-relaxed">{terminalLog}</div>
        </div>
      );
    }
  };

  // 🚀 ポップアップ（プレビュー専用）モードの場合
  if (isPreviewOnly) {
    return (
      <div className="w-full h-full flex flex-col overflow-hidden bg-[#141414] text-white">
        <div className="bg-[#252526] text-slate-300 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#3c3c3c] flex justify-between items-center font-mono">
          <div className="flex items-center gap-2">
            <span>🌐 LIVE PREVIEW MONITOR ({lang.toUpperCase()})</span>
            <span className="text-[9px] bg-emerald-600/30 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30 animate-pulse">
              リアルタイム同期中
            </span>
          </div>
        </div>
        <div className="flex-1 bg-slate-900/20 p-0 flex flex-col h-full overflow-hidden">
          {renderPreviewPanel()}
        </div>
      </div>
    );
  }

  // Monaco Editor用に言語フォーマットをマッピング (js -> javascript)
  const editorLang = lang === 'js' ? 'javascript' : lang;
  
  const langBadgeColor = lang === 'js' ? 'bg-[#fbbf24] text-amber-950' : lang === 'python' ? 'bg-[#38bdf8] text-sky-950' : lang === 'php' ? 'bg-[#c084fc] text-fuchsia-950' : 'bg-[#ea580c] text-orange-50';

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] overflow-hidden select-none font-sans text-left">
      
      {/* 🌐 最上部ヘッダー */}
      <header className="bg-[#252526] border-b border-[#3c3c3c] px-4 py-2 flex justify-between items-center shrink-0 w-full z-10 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded font-mono">GACHI ALGORITHM ARENA</span>
          <h2 className="text-xs font-bold text-slate-200">💻 CodeLab - バグフィックス＆アルゴリズム 全35問</h2>
        </div>
      </header>

      {/* 👑 【上段】：全35問ストレートパノラマリストバー */}
      <div className="bg-[#1e1e1e] border-b border-[#3c3c3c] px-2 py-1.5 flex gap-2 overflow-x-auto text-xs items-center shrink-0 w-full scrollbar-hide">
        <span className="text-[10px] font-bold text-[#858585] uppercase font-mono px-2 shrink-0">SELECT STAGE:</span>
        {CODE_STAGES.map((s, idx) => (
          <button
            key={`stage-btn-${s.id}`}
            onClick={() => setCurrentIdx(idx)}
            className={`px-3 py-1 rounded font-mono text-[11px] border flex items-center gap-1.5 transition shrink-0 ${
              currentIdx === idx 
                ? 'bg-[#37373d] text-cyan-400 border-cyan-400 font-bold shadow-md' 
                : 'bg-[#141414] text-slate-400 border-transparent hover:bg-[#2d2d2d]'
            }`}
          >
            <span>#{s.id < 10 ? `0${s.id}` : s.id}</span>
            <span className={`text-[8px] font-black uppercase tracking-wider ${
              s.category === 'js' ? 'text-amber-400' : s.category === 'python' ? 'text-sky-400' : s.category === 'php' ? 'text-fuchsia-400' : 'text-orange-400'
            }`}>
              {s.category}
            </span>
          </button>
        ))}
      </div>

      {/* 👑 【中段】：メイン記述 ＆ ミッション説明エリア（※プレビュー非表示時は2カラムに変化！） */}
      <div className={`flex-1 grid ${isPreviewHidden ? 'grid-cols-2' : 'grid-cols-3'} gap-0 overflow-hidden w-full relative border-b border-[#2d2d2d] h-full`}>
        
        {/* 左側：エディタ領域 */}
        <main className="flex flex-col bg-[#1e1e1e] relative overflow-hidden h-full border-r border-[#3c3c3c]">
          <div className="bg-[#2d2d2d] text-slate-300 text-[11px] font-bold py-2 px-4 border-b border-[#3c3c3c] shrink-0 font-mono flex justify-between items-center">
            <span>STAGE {stage.id}: {stage.title}</span>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${langBadgeColor}`}>
              {lang} Environment
            </span>
          </div>
          
          <div className="flex-1 overflow-hidden relative w-full h-full">
            <Editor
              height="100%"
              language={editorLang}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                fontFamily: '"Consolas", "Courier New", monospace',
                minimap: { enabled: false },
                wordWrap: 'on',
                formatOnType: true,
                formatOnPaste: true,
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
                autoIndent: 'full',
                tabSize: 2,
                scrollBeyondLastLine: false,
                scrollbar: {
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10,
                }
              }}
            />
          </div>

          {/* 👑 ド派手な「MISSION CLEAR」大画面エフェクト！！！ */}
          {isSuccess && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
              <div className="bg-emerald-950 border-2 border-emerald-500 p-8 rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.5)] text-center transform scale-100 hover:scale-105 transition-transform duration-300 w-[80%] max-w-md">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-2">
                  MISSION CLEAR!!
                </h2>
                <p className="text-emerald-200 text-xs mb-6 font-bold tracking-widest">
                  完璧なバグフィックスです！次のステージもこの調子で攻略していきましょう！
                </p>
                <button 
                  onClick={nextStage} 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-black px-6 py-3 rounded-full text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all cursor-pointer"
                >
                  次のミッションへ ➔
                </button>
              </div>
            </div>
          )}
        </main>

        {/* 中央：現在のミッション説明 */}
        <aside className="bg-[#1e1e1e] border-r border-[#3c3c3c] flex flex-col shrink-0 h-full overflow-hidden">
          <div className="bg-[#1e1e1e] text-rose-400 font-bold text-[10px] px-3 py-2 uppercase tracking-wider select-none shrink-0 border-b border-[#2d2d2d] font-mono">
            🎯 MISSION DETAILS
          </div>
          <div className="p-5 bg-[#252526] flex-1 overflow-y-auto">
            <h3 className="text-white font-bold text-[14px] mb-3">{stage.title}</h3>
            <p className="text-slate-300 text-[13px] leading-relaxed font-bold bg-[#141414] p-4 border border-[#3c3c3c] rounded shadow-inner">
              {stage.mission}
            </p>
          </div>
        </aside>

        {/* 右側：ライブプレビュー（※ isPreviewHidden が true の時は消える！） */}
        {!isPreviewHidden && (
          <div className="flex flex-col h-full overflow-hidden bg-[#141414]">
            <div className="bg-[#252526] text-slate-300 font-bold text-[10px] px-3 py-1.5 uppercase tracking-wider select-none shrink-0 border-b border-[#3c3c3c] flex justify-between items-center font-mono">
              <span>🌐 LIVE PREVIEW</span>
            </div>
            <div className="flex-1 bg-slate-900/20 p-0 flex flex-col h-full overflow-hidden">
              {renderPreviewPanel()}
            </div>
          </div>
        )}

      </div>

      {/* 👑 【下段】：ガチターミナル ＆ 実行ボタンエリア */}
      <footer className="h-[220px] bg-[#1e1e1e] border-t border-[#3c3c3c] flex overflow-hidden shrink-0 w-full">
        {/* 左側：リアルターミナルログ */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-[12px] flex flex-col gap-1 border-r border-[#3c3c3c] text-left bg-[#141414]">
          <div className="text-slate-500 mb-1 border-b border-[#222] pb-1 select-none">CodePlayground Console v2.5 - Output Log</div>
          <div className={`leading-relaxed whitespace-pre-wrap ${
            terminalLog.includes('🚨') ? 'text-rose-400 font-bold' : 
            terminalLog.includes('✨') || terminalLog.includes('🏆') ? 'text-emerald-400 font-bold' : 
            'text-cyan-300'
          }`}>
            {terminalLog}
          </div>
        </div>

        {/* 右側：デバッグ実行ボタン専用パネル */}
        <div className="w-[240px] bg-[#1e1e1e] p-4 flex items-center justify-center shrink-0 border-l border-[#3c3c3c]">
          <button 
            onClick={handleRunDebug} 
            disabled={isRunning || isSuccess} 
            className={`w-full h-full font-black rounded-xl text-[13px] uppercase tracking-widest transition-all shadow-2xl flex flex-col items-center justify-center gap-2 cursor-pointer ${
              isRunning ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 
              isSuccess ? 'bg-emerald-600 text-white' : 'bg-gradient-to-br from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white active:scale-95'
            }`}
          >
            <span className="text-xl">{isRunning ? '⏳' : isSuccess ? '✔' : '⚡'}</span>
            <span>{isRunning ? 'Running...' : isSuccess ? 'Cleared' : 'RUN CODE'}</span>
          </button>
        </div>
      </footer>

    </div>
  );
}