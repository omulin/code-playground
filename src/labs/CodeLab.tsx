import { useState, useEffect } from 'react';

type LangType = 'js' | 'python' | 'php';

interface BugStage {
  id: number;
  title: string;
  mission: string;
  hint: string;
  initialCode: string;
  correctExpected: string;
  runner: (code: string) => { success: boolean; log: string };
}

const STAGES: Record<LangType, BugStage[]> = {
  js: [
    { id: 1, title: "閉じカッコの迷子 (SyntaxError)", mission: "console.log の閉じカッコ ) やクォーテーションが壊れています。", hint: "文字列の始まりと終わりの種類を揃え、関数のカッコをきっちり閉じましょう。", initialCode: "console.log('Welcome to Playground;", correctExpected: "Welcome", runner: (c) => c.replace(/\s/g, "").includes("console.log('Welcome to PlayGround')") || c.replace(/\s/g, "").includes('console.log("Welcome to PlayGround")') ? { success: true, log: "▶ Welcome to PlayGround\n\n✨ SUCCESS!" } : { success: false, log: "🚨 SyntaxError: Missing ')' after argument list" } },
    { id: 2, title: "スコープの壁 (ReferenceError)", mission: "関数の中の変数 userName を外から強引に呼び出そうとしています。", hint: "変数を関数の外（グローバル空間）に出すか、関数を正しく実行しましょう。", initialCode: "function getUser() {\n  let userName = 'YUTO_CODE';\n}\nconsole.log(userName);", correctExpected: "", runner: (c) => !c.includes("function") && c.includes("userName") ? { success: true, log: "▶ YUTO_CODE\n\n✨ SUCCESS!" } : { success: false, log: "🚨 ReferenceError: userName is not defined" } },
    { id: 3, title: "存在しない配列要素 (Undefined)", mission: "3つの要素しかない配列から「ぶどう」を出したいのに虚無が出ます。", hint: "配列は1ではなく「0」から数えます。3番目の要素の添え字は何番？", initialCode: "const fruits = ['りんご', 'バナナ', 'ぶどう'];\nconsole.log(fruits);", correctExpected: "", runner: (c) => c.replace(/\s/g, "").includes("fruits") ? { success: true, log: "▶ ぶどう\n\n✨ SUCCESS!" } : { success: false, log: "▶ undefined\n\n⚠ ERROR: 配列の範囲外です" } },
    { id: 4, title: "定数への禁断の再代入 (TypeError)", mission: "const で作った定数の値を途中で書き換えようとして怒られています。", hint: "後から値を書き換える可能性のある変数は const ではなく let を使います。", initialCode: "const score = 100;\nscore = 120;\nconsole.log(score);", correctExpected: "", runner: (c) => c.includes("let score") ? { success: true, log: "▶ 120\n\n✨ SUCCESS!" } : { success: false, log: "🚨 TypeError: Assignment to constant variable." } },
    { id: 5, title: "文字と数値のガッチャンコ (Type Bug)", mission: "数値の 10 と 20 を足して 30 にしたいのに、なぜか「1020」になります。", hint: "片方が文字の '10' になっています。クォーテーションを外して純粋な数値にしましょう。", initialCode: "let a = '10';\nlet b = 20;\nconsole.log(a + b);", correctExpected: "", runner: (c) => !c.includes("'10'") && !c.includes('"10"') ? { success: true, log: "▶ 30\n\n✨ SUCCESS!" } : { success: false, log: "▶ 1020\n\n⚠ ERROR: 文字列結合になってしまっています" } },
    { id: 6, title: "非同期処理のすれ違い (Promise Bug)", mission: "データを待つ前にコンソールが走って [object Promise] が出ちゃいます。", hint: "非同期関数の前に await を付け、親関数に async を付与しましょう。", initialCode: "function fetchData() { return 'Data'; }\nconst res = fetchData();\nconsole.log(res);", correctExpected: "", runner: (c) => c.includes("await") ? { success: true, log: "▶ Data\n\n✨ SUCCESS!" } : { success: false, log: "▶ [object Promise]\n\n⚠ ERROR: データ同期が間に合っていません" } },
    { id: 7, title: "タイポの悲劇 (Property Error)", mission: "オブジェクト内の length を Lenth と打ち間違えてバグっています。", hint: "JavaScriptは1文字の大文字小文字、スペルミスも見逃してくれません。", initialCode: "const str = 'Hello';\nconsole.log(str.Lenth);", correctExpected: "", runner: (c) => c.includes(".length") ? { success: true, log: "▶ 5\n\n✨ SUCCESS!" } : { success: false, log: "▶ undefined" } },
    { id: 8, title: "魔の無限ループ (Call Stack Overflow)", mission: "終わりがないループに入り、ブラウザの心臓が止まりかけています！", hint: "whileの条件を途中で false にするか、カウンターを増やす処理（i++）が必要です。", initialCode: "let i = 0;\nwhile(i < 3) {\n  console.log('Loop');\n}", correctExpected: "", runner: (c) => c.includes("i++") || c.includes("i += 1") ? { success: true, log: "▶ Loop\n▶ Loop\n▶ Loop\n\n✨ SUCCESS: 脱出成功！" } : { success: false, log: "🚨 RangeError: Maximum call stack size exceeded (無限無限ループ)" } },
    { id: 9, title: "JSONパースの破綻 (JSON Error)", mission: "JSONの文字をパースしようとしていますが形式が不正でクラッシュします。", hint: "JSONのキーと値は必ずダブルクォーテーション「\"」で囲むルールです。", initialCode: "const data = JSON.parse('{ name: 'Yuto' }');", correctExpected: "", runner: (c) => c.includes('\\"name\\"') || c.includes('"{ \\"name\\": \\"Yuto\\" }"') || c.includes('"{""name"":""Yuto""}"') ? { success: true, log: "▶ { name: 'Yuto' }\n\n✨ SUCCESS!" } : { success: false, log: "🚨 SyntaxError: Unexpected token n in JSON at position 2" } },
    { id: 10, title: "【JS最終試練】DOMの幻影 (Null Error)", mission: "存在しない id='btn' を操作しようとして Null エラーが出ています。", hint: "HTMLに <button id='btn'> を作るか、取得するID名を実在するものに直して！", initialCode: "const target = document.getElementById('btmn');\ntarget.addEventListener('click', () => {});", correctExpected: "", runner: (c) => c.includes("'btn'") ? { success: true, log: "⚡ EventListener attached to #btn successfully!\n\n🏆 JAVASCRIPT MASTER CLEAR!" } : { success: false, log: "🚨 TypeError: Cannot read properties of null (reading 'addEventListener')" } }
  ],
  python: [
    { id: 1, title: "恐怖のインデント (IndentationError)", mission: "Pythonの命である、if文の下の「スペース4つ（字下げ）」がありません。", hint: "print の手前に半角スペースを4つ入れて、ブロックを明示しましょう。", initialCode: "if True:\nprint('Hello Python')", correctExpected: "", runner: (c) => c.includes("    print") || c.includes("\tprint") ? { success: true, log: "▶ Hello Python\n\n✨ SUCCESS!" } : { success: false, log: "🚨 IndentationError: expected an indented block after 'if' statement" } },
    { id: 2, title: "コロンの忘れ物 (SyntaxError)", mission: "for文やif文の行の末尾に必要な「あの記号」がありません。", hint: "Pythonの構文の区切りには、行末にコロン「:」が絶対に必要です。", initialCode: "for i in range(3)\n    print(i)", correctExpected: "", runner: (c) => c.includes("range(3):") ? { success: true, log: "▶ 0\n▶ 1\n▶ 2\n\n✨ SUCCESS!" } : { success: false, log: "🚨 SyntaxError: expected ':'" } },
    { id: 3, title: "文字と数字は足せない (TypeError)", mission: "文字列の「年齢: 」に数値の「20」をそのまま足そうとして怒られています。", hint: "数値を str(20) で囲って、文字列の型に変換してから結合しましょう。", initialCode: "age = 20\nprint('年齢: ' + age)", correctExpected: "", runner: (c) => c.includes("str(age)") || c.includes("str(20)") ? { success: true, log: "▶ 年齢: 20\n\n✨ SUCCESS!" } : { success: false, log: "🚨 TypeError: can only concatenate str (not 'int') to str" } },
    { id: 4, title: "辞書のキー迷子 (KeyError)", mission: "辞書（連想配列）の中にないキー「age」を呼び出そうとしています。", hint: "辞書の中に 'age': 20 を追加するか、実在する 'name' を呼び出して。", initialCode: "user = { 'name': 'Yuto' }\nprint(user['age'])", correctExpected: "", runner: (c) => c.includes("'age'") && c.includes("20") ? { success: true, log: "▶ 20\n\n✨ SUCCESS!" } : { success: false, log: "🚨 KeyError: 'age'" } },
    { id: 5, title: "インポートエラー (ModuleNotFoundError)", mission: "謎の「randommm」という存在しないモジュールを呼んでいます。", hint: "正しいモジュール名は「random」です。タイポを修正してください。", initialCode: "import randommm\nprint(randommm.randint(1, 10))", correctExpected: "", runner: (c) => c.includes("import random") && !c.includes("randommm") ? { success: true, log: "▶ 7 (ランダム数値)\n\n✨ SUCCESS!" } : { success: false, log: "🚨 ModuleNotFoundError: No module named 'randommm'" } },
    { id: 6, title: "タプルの書き換え禁止 (TypeError)", mission: "中身を変更できない「タプル( )」の値を書き換えようとしています。", hint: "値を変更したい場合はカッコを「[ ]」にして配列（リスト）に直します。", initialCode: "data = (1, 2, 3)\ndata = 99", correctExpected: "", runner: (c) => c.includes("") ? { success: true, log: "▶\n\n✨ SUCCESS!" } : { success: false, log: "🚨 TypeError: 'tuple' object does not support item assignment" } },
    { id: 7, title: "存在しないローカル変数 (UnboundLocalError)", mission: "関数の外の変数を、関数の中で宣言なしに書き換えようとしています。", hint: "関数内の先頭で「global count」と宣言して外の変数と同期させましょう。", initialCode: "count = 0\ndef add():\n    count += 1\nadd()", correctExpected: "", runner: (c) => c.includes("global count") ? { success: true, log: "⚡ グローバル変数のカウントに成功！\n\n✨ SUCCESS!" } : { success: false, log: "🚨 UnboundLocalError: local variable 'count' referenced before assignment" } },
    { id: 8, title: "ゼロ除算のタブー (ZeroDivisionError)", mission: "数学の世界の絶対タブー、数値を「0」で割る計算が走っています。", hint: "割る数を 0 以外（例: 2）に修正して、エラーを回避しましょう。", initialCode: "print(10 / 0)", correctExpected: "", runner: (c) => !c.includes("/ 0") && c.includes("/") ? { success: true, log: "▶ 5.0\n\n✨ SUCCESS!" } : { success: false, log: "🚨 ZeroDivisionError: division by zero" } },
    { id: 9, title: "リストの限界突破 (IndexError)", mission: "要素が2つしかないリストから、3番目（）を呼び出しています。", hint: "インデックスは0から始まるので、2つ目の要素はで呼び出せます。", initialCode: "items = ['PC', 'スマホ']\nprint(items)", correctExpected: "", runner: (c) => c.includes("items") ? { success: true, log: "▶ スマホ\n\n✨ SUCCESS!" } : { success: false, log: "🚨 IndexError: list index out of range" } },
    { id: 10, title: "【Python最終試練】型の落とし穴 (ValueError)", mission: "文字の「abc」を、強引に整数型 int() に変換しようとしています。", hint: "int()の中身を、数字に変形できる文字（例: '123'）に修正して！", initialCode: "num = int('abc')\nprint(num)", correctExpected: "", runner: (c) => c.includes("int('") && !c.includes("abc") ? { success: true, log: "▶ 123\n\n🏆 PYTHON MASTER CLEAR!" } : { success: false, log: "🚨 ValueError: invalid literal for int() with base 10: 'abc'" } }
  ],
  php: [
    { id: 1, title: "ドル記号の忘れ物 (Parse Error)", mission: "PHPの変数宣言に絶対に必要な「あのマーク」がありません。", hint: "PHPの変数は、アルファベットの前に必ず「$」を付けるルールです。", initialCode: "name = 'PHP_LAB';\necho $name;", correctExpected: "", runner: (c) => c.includes("$name =") ? { success: true, log: "▶ PHP_LAB\n\n✨ SUCCESS!" } : { success: false, log: "🚨 Parse error: syntax error, unexpected '='" } },
    { id: 2, title: "セミコロンの消滅 (Parse Error)", mission: "命令の終わりのセミコロン「;」がなく、PHPの処理が詰まっています。", hint: "PHPはJavaScriptと違って行末の「;」省略が絶対に許されません。", initialCode: "echo 'Hello' \necho 'World';", correctExpected: "", runner: (c) => c.includes("'Hello';") ? { success: true, log: "▶ HelloWorld\n\n✨ SUCCESS!" } : { success: false, log: "🚨 Parse error: syntax error, unexpected token 'echo'" } },
    { id: 3, title: "文字結合のドット違い (SyntaxError)", mission: "文字同士をくっつけるのに、JSのクセで「+」を使ってバグっています。", hint: "PHPで文字をガッチャンコする（結合する）記号は「 . (ドット)」です。", initialCode: "echo '✨ ' + 'Welcome';", correctExpected: "", runner: (c) => c.includes("'✨ ' .") ? { success: true, log: "▶ ✨ Welcome\n\n✨ SUCCESS!" } : { success: false, log: "🚨 Fatal error: Uncaught TypeError: Unsupported operand types" } },
    { id: 4, title: "配列の矢印の向き (Parse Error)", mission: "連想配列のキーと値を繋ぐ矢印がハイフンになっていて壊れています。", hint: "PHPの連想配列の矢印は「 => 」です。不等号の向きに注意して！", initialCode: "$user = [ 'id' -> 1 ];", correctExpected: "", runner: (c) => c.includes("=>") ? { success: true, log: "⚡ Array allocation success!\n\n✨ SUCCESS!" } : { success: false, log: "🚨 Parse error: syntax error, unexpected '?'" } },
    { id: 5, title: "関数の外の変数へのアクセス (Warning)", mission: "関数の外にある $globalData を、関数の中で認識できず虚無になります。", hint: "関数内の1行目で「global $globalData;」と宣言して外と接続して。", initialCode: "$globalData = 'INFO';\nfunction show() {\n    echo $globalData;\n}\nshow();", correctExpected: "", runner: (c) => c.includes("global $globalData") ? { success: true, log: "▶ INFO\n\n✨ SUCCESS!" } : { success: false, log: "⚠ Warning: Undefined variable $globalData" } },
    { id: 6, title: "アロー演算子の間違い (Fatal error)", mission: "クラスのメソッドを呼ぶのに、Java風の「.」を使って大爆発しています。", hint: "PHPでインスタンスのメソッドを呼び出す記号は「 -> 」です。", initialCode: "$app = new MyApp();\n$app.run();", correctExpected: "", runner: (c) => c.includes("->run()") ? { success: true, log: "▶ App is running...\n\n✨ SUCCESS!" } : { success: false, log: "🚨 Fatal error: Call to undefined function run()" } },
    { id: 7, title: "定数 define の罠 (Notice)", mission: "define で作った定数を、変数のクセで「$」を付けて呼んでしまいました。", hint: "define()で作った定数を呼び出すときは、頭の「$」は不要です。", initialCode: "define('VERSION', '1.0');\necho $VERSION;", correctExpected: "", runner: (c) => c.includes("echo VERSION") ? { success: true, log: "▶ 1.0\n\n✨ SUCCESS!" } : { success: false, log: "⚠ Warning: Undefined variable $VERSION" } },
    { id: 8, title: "文字列の中のシングルクォート崩壊", mission: "文章の中の「I'm」のせいで文字列の囲いが途中でぶった切れています。", hint: "「I\\'m」のようにバックスラッシュ（￥）を入れてエスケープして！", initialCode: "$txt = 'I'm a PHP Developer';\necho $txt;", correctExpected: "", runner: (c) => c.includes("I\\'m") || c.includes('"I\'m') ? { success: true, log: "▶ I'm a PHP Developer\n\n✨ SUCCESS!" } : { success: false, log: "🚨 Parse error: syntax error, unexpected identifier 'm'" } },
    { id: 9, title: "未定義の配列キー (Warning)", mission: "連想配列に存在しないキー「status」を echo しようとしています。", hint: "キーを実在する「title」に変えるか、キー自体を事前に定義しましょう。", initialCode: "$book = [ 'title' => 'WebBook' ];\necho $book['status'];", correctExpected: "", runner: (c) => c.includes("['title']") ? { success: true, log: "▶ WebBook\n\n✨ SUCCESS!" } : { success: false, log: "⚠ Warning: Undefined array key \"status\"" } },
    { id: 10, title: "【PHP最終試練】インクルードの消失 (Fatal error)", mission: "存在しない「header-file.php」を強引に require しようとしています。", hint: "読み込むファイル名を、実在する「header.php」に修正して！", initialCode: "require 'header-file.php';\necho 'PAGE_LOADED';", correctExpected: "", runner: (c) => c.includes("'header.php'") ? { success: true, log: "▶ [HEADER_LOADED] PAGE_LOADED\n\n🏆 PHP MASTER CLEAR!" } : { success: false, log: "🚨 Fatal error: Failed opening required 'header-file.php'" } }
  ]
};

export default function CodeLab() {
  const [lang, setLang] = useState<LangType>('js');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  
  const [code, setCode] = useState<string>("");
  const [terminalLog, setTerminalLog] = useState<string>("⏳ コードを修正して、下の「デバッグ実行」ボタンを押してください...");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const stage = STAGES[lang][currentIdx] || STAGES[lang];

  useEffect(() => {
    if (stage) {
      setCode(stage.initialCode);
      setTerminalLog("⏳ コードを修正して、下の「デバッグ実行」ボタンを押してください...");
      setIsSuccess(false);
      setShowAnswer(false);
    }
  }, [lang, currentIdx, stage]);

  const handleRunDebug = () => {
    setTerminalLog("⚡ debugger: コンパイル環境をエミュレート中...");
    setTimeout(() => {
      const result = stage.runner(code);
      setTerminalLog(result.log);
      setIsSuccess(result.success);
    }, 700);
  };

  const getLineNumbers = (text: string) => {
    const lines = text.split('\n').length;
    return Array.from({ length: Math.max(lines, 12) }, (_, i) => i + 1);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* 🌐 1階層：開発言語切り替えタブ */}
      <div className="flex bg-[#2d2d2d] border border-[#3c3c3c] p-1 rounded-lg w-fit">
        <button onClick={() => { setLang('js'); setCurrentIdx(0); }} className={`px-4 py-1.5 text-xs font-bold rounded transition ${lang === 'js' ? 'bg-[#0e639c] text-white' : 'text-slate-400 hover:text-slate-200'}`}>
          💛 JavaScript (10本)
        </button>
        <button onClick={() => { setLang('python'); setCurrentIdx(0); }} className={`px-4 py-1.5 text-xs font-bold rounded transition ${lang === 'python' ? 'bg-[#3776ab] text-white' : 'text-slate-400 hover:text-slate-200'}`}>
          💙 Python (10本)
        </button>
        <button onClick={() => { setLang('php'); setCurrentIdx(0); }} className={`px-4 py-1.5 text-xs font-bold rounded transition ${lang === 'php' ? 'bg-[#777bb4] text-white' : 'text-slate-400 hover:text-slate-200'}`}>
          💜 PHPテーマ開発 (10本)
        </button>
      </div>

      {/* 🎛️ 2階層：バグ選択ロードマップ */}
      <div className="bg-[#252526] border border-[#3c3c3c] p-2 rounded-lg flex items-center gap-1 overflow-x-auto text-xs">
        <span className="text-[10px] font-bold text-[#858585] uppercase tracking-wider mr-2 font-mono">エラー番号:</span>
        {STAGES[lang].map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentIdx(idx)}
            className={`px-2 py-0.5 rounded font-mono font-bold border transition ${currentIdx === idx ? 'bg-[#37373d] text-amber-400 border-amber-500 shadow-sm' : 'bg-[#1e1e1e] text-slate-400 border-transparent hover:border-slate-500'}`}
          >
            #{s.id}
          </button>
        ))}
      </div>

      {/* 📄 デバッグ仕様書 ＆ 動的解答 */}
      <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded-lg border-l-4 border-rose-500 space-y-3 text-xs">
        <div className="flex justify-between items-center">
          <div className="font-bold text-rose-400 font-mono flex items-center gap-1">⚠️ STAGE {stage.id}：{stage.title}</div>
          <button 
            onClick={() => setShowAnswer(!showAnswer)} 
            className="px-2 py-0.5 bg-[#252526] text-emerald-400 border border-[#3c3c3c] text-[10px] rounded font-bold hover:bg-[#333]"
          >
            {showAnswer ? '❌ 回答を閉じる' : '🔑 正解のヒント＆答えを見る'}
          </button>
        </div>
        
        <p className="text-slate-300 bg-[#252526] p-2.5 rounded border border-[#2b2b2b] leading-relaxed">{stage.mission}</p>
        
        {/* 💡 解答エリア */}
        {showAnswer && (
          <div className="bg-emerald-950/20 border border-emerald-900/60 p-3 rounded space-y-1.5 text-emerald-200">
            <div><strong className="text-emerald-400">💡 デバッグ解説：</strong>{stage.hint}</div>
            <div className="font-mono text-[11px] bg-black/30 p-2 rounded border border-emerald-900/40 whitespace-pre-wrap"><strong className="text-emerald-400 font-sans block mb-0.5">📋 模範アプローチ：</strong>{stage.answer || "初期コード内の記述エラーやタイポを修正して実行してください。"}</div>
          </div>
        )}
      </div>

      {/* 💻 エディタ ＆ ターミナル縦並び */}
      <div className="space-y-4">
        
        {/* 🛠️ 上段：テキストエディタ */}
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg flex flex-col overflow-hidden shadow-2xl">
          <div className="bg-[#2d2d2d] flex border-b border-[#252526] text-xs text-slate-400 select-none">
            <span className="px-4 py-2 bg-[#1e1e1e] text-yellow-500 font-bold border-t border-t-yellow-500 font-mono">
              {lang === 'js' ? '💛 debug_script.js' : lang === 'python' ? '💙 error_fix.py' : '💜 single_bug.php'}
            </span>
          </div>

          <div className="flex font-mono text-xs bg-[#1e1e1e] p-2 min-h-[160px]">
            <div className="w-8 text-right pr-2 text-[#5a5a5a] border-r border-[#2d2d2d] space-y-0.5 leading-relaxed pt-0.5 text-[11px] select-none font-mono">
              {getLineNumbers(code).map((num) => <div key={num}>{num}</div>)}
            </div>
            <textarea 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              className="flex-1 bg-transparent text-[#9cdcfe] pl-3 py-0.5 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left overflow-x-auto" 
              style={{ caretColor: '#fff' }} 
            />
          </div>
        </div>

        {/* 🚀 アクションボタン */}
        <button 
          onClick={handleRunDebug}
          className={`w-full text-white font-bold text-xs py-2.5 rounded transition shadow-md uppercase tracking-wider ${isSuccess ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'}`}
        >
          {isSuccess ? '🎉 クリア！お見事！' : '⚡ デバッグコンパイルを実行する (F5)'}
        </button>

        {/* 📟 下段：VS Code風出力ターミナルコンソール */}
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-[#252526] px-4 py-1.5 border-b border-[#2b2b2b] flex gap-4 text-xs font-sans text-slate-400 select-none">
            <span className="text-white border-b-2 border-cyan-500 pb-0.5 font-bold">デバッグコンソール</span>
            <span className="text-slate-500">ターミナル</span>
            <span className="text-slate-500">出力</span>
          </div>
          <div className="bg-[#1e1e1e] p-4 min-h-[110px] font-mono text-xs text-left overflow-y-auto whitespace-pre-wrap text-slate-300">
            {terminalLog}
          </div>
        </div>

      </div>
    </div>
  );
}