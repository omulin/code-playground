import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface LearningStep {
  step: number;
  title: string;
  category: 'HTML' | 'CSS' | 'JavaScript';
  description: string;
  behaviorNote: string; // 💡 タグの動き・仕組み解説
  codeAnswer: string;   // 👑 コードの正解例
  targetFile: 'html' | 'css' | 'js';
  targetKeyword: string;
  checkpoint: string;
}

// 👑 動きの解説と正解コード付き・白紙からビルドする全20ステップのマスターコース！
const LEARNING_STEPS: LearningStep[] = [
  // --- HTML (1-6) ---
  {
    step: 1,
    title: "STEP 1: DOCTYPE宣言を書く",
    category: "HTML",
    description: "Webページを作る際は、必ず1行目に文書型定義である DOCTYPE 宣言を書き、HTML文書であることをブラウザに伝えます。",
    behaviorNote: "ブラウザに対して「このファイルは最新のHTML5で書かれていますよ」と伝えるための最も最初の合図として機能します。",
    codeAnswer: "<!DOCTYPE html>",
    targetFile: 'html',
    targetKeyword: '<!DOCTYPE html>',
    checkpoint: "index.html に `<!DOCTYPE html>` を記述してください。"
  },
  {
    step: 2,
    title: "STEP 2: 基本構造（html・head・body）を作る",
    category: "HTML",
    description: "HTMLの骨組みとなるタグを組み立てます。<html>で全体を囲み、ページの裏側設定をする<head>と、目に見える部分を作る<body>を配置します。",
    behaviorNote: "<html>は全体の根っこ、<head>はページのタイトルやCSSの読み込み設定、<body>は画面に実際に映し出される領域になります。",
    codeAnswer: "<html>\n<head>\n  <title>タイトル</title>\n</head>\n<body>\n  \n</body>\n</html>",
    targetFile: 'html',
    targetKeyword: '<body>',
    checkpoint: "index.html に `<html>`、`<head>`、`<body>` タグを組み立ててください。"
  },
  {
    step: 3,
    title: "STEP 3: 看板見出し（<h1>）を置く",
    category: "HTML",
    description: "<body>の中に、ページのメインタイトルとなる見出しタグ（<h1>）を配置して文字を表示させます。",
    behaviorNote: "<h1>はページ内で最も重要で大きな見出しとしてブラウザに認識され、検索エンジンやユーザーに「ここがこのページの主題です」と伝えます。",
    codeAnswer: "<h1>My Portfolio</h1>",
    targetFile: 'html',
    targetKeyword: '<h1>',
    checkpoint: "<body>の中に `<h1>` タグを使ってタイトルを記述してください。"
  },
  {
    step: 4,
    title: "STEP 4: 紹介文の段落（<p>）を追加する",
    category: "HTML",
    description: "見出しの下に、説明文やプロフィール文を書くための段落タグ（<p>）を追加しましょう。",
    behaviorNote: "<p>（Paragraph）で囲んだテキストは、上下に適度な余白が空いたきれいな独立した文章のブロックとして表示されます。",
    codeAnswer: "<p>フロントエンドエンジニアの作品集です。</p>",
    targetFile: 'html',
    targetKeyword: '<p>',
    checkpoint: "`<p>` タグを使って文章の段落を追加してください。"
  },
  {
    step: 5,
    title: "STEP 5: リンク（<a>）を貼る",
    category: "HTML",
    description: "他のページやサイトへ飛ぶためのハイパーリンク（<a>タグ）と、行き先を指定する href 属性を書きます。",
    behaviorNote: "<a>タグ（Anchor）の href 属性にURLやファイルパスを指定することで、クリックしたユーザーを別の場所にジャンプさせることができます。",
    codeAnswer: "<a href=\"https://google.com\">Googleへ行く</a>",
    targetFile: 'html',
    targetKeyword: 'href=',
    checkpoint: "`<a href=\"...\">` のように href 属性を持ったリンクタグを配置してください。"
  },
  {
    step: 6,
    title: "STEP 6: パーツを囲むコンテナ（<div class>）を作る",
    category: "HTML",
    description: "デザインを適用するためのグループ化や枠組みとして最もよく使う `<div>` タグと `class` 属性を書きます。",
    targetFile: 'html',
    targetKeyword: 'class=',
    checkpoint: "`<div class=\"card\">` のようにクラス付きのdivタグを配置してください。",
    behaviorNote: "<div>自体には見た目の変化はありませんが、class名をつけることで、後からCSSでまとめてデザインやレイアウトを当てられるようになります。",
    codeAnswer: "<div class=\"card\">\n  <p>カードの中身</p>\n</div>"
  },

  // --- CSS (7-14) ---
  {
    step: 7,
    title: "STEP 7: 外部CSSの読み込み（<link>）",
    category: "HTML",
    description: "ここからデザインのCSS編！HTMLのヘッド内に、別ファイル（style.css）を読み込むためのlinkタグを書きます。",
    targetFile: 'html',
    targetKeyword: 'href="style.css"',
    checkpoint: "index.html の <head> 内に `<link rel=\"stylesheet\" href=\"style.css\">` を記述してください。",
    behaviorNote: "<link>タグによってHTMLと別ファイルのCSSが合体し、スタイルシートに書いたデザインがHTMLの要素に反映されるようになります。",
    codeAnswer: "<link rel=\"stylesheet\" href=\"style.css\">"
  },
  {
    step: 8,
    title: "STEP 8: 背景色を変える（background）",
    category: "CSS",
    description: "ここから「style.css」タブに切り替えて、真っ白な画面をダークトーンの背景色（background）に染めましょう。",
    targetFile: 'css',
    targetKeyword: 'background',
    checkpoint: "style.css の body{} の中に `background:` プロパティを記述してください。",
    behaviorNote: "bodyセレクタに対して background プロパティを指定すると、Webページ全体のキャンバスの背景色を自由に変えることができます。",
    codeAnswer: "body {\n  background: #1e1e1e;\n}"
  },
  {
    step: 9,
    title: "STEP 9: 文字の色と大きさを変える（color・font-size）",
    category: "CSS",
    description: "見出しやテキストの文字色（color）やフォントサイズ（font-size）を指定してデザインを整えます。",
    targetFile: 'css',
    targetKeyword: 'color',
    checkpoint: "style.css に `color:` プロパティを記述して文字色を変更してください。",
    behaviorNote: "colorプロパティで文字に鮮やかな色や白を指定し、font-sizeで文字の大きさをコントロールすることで視覚的な階層が生まれます。",
    codeAnswer: "h1 {\n  color: #06b6d4;\n  font-size: 2rem;\n}"
  },
  {
    step: 10,
    title: "STEP 10: ボックスの余白と角丸（padding・border-radius）",
    category: "CSS",
    description: "カード型のデザインを作るために、内側の余白を作る `padding` と、角を丸くする `border-radius` を書きます。",
    targetFile: 'css',
    targetKeyword: 'padding',
    checkpoint: "style.css に内側余白を作る `padding:` を記述してください。",
    behaviorNote: "paddingは要素の境界線から内側のテキストまでの距離を広げ、border-radiusは四隅の角をなめらかに丸めてデザインをおしゃれにします。",
    codeAnswer: ".card {\n  padding: 20px;\n  border-radius: 8px;\n  background: #2d2d2d;\n}"
  },
  {
    step: 11,
    title: "STEP 11: レイアウト崩れを防ぐ（box-sizing）",
    category: "CSS",
    description: "paddingを含めて要素の幅を計算させる、実務必須の設定『box-sizing: border-box;』を適用します。",
    targetFile: 'css',
    targetKeyword: 'box-sizing',
    checkpoint: "style.css に `box-sizing: border-box;` を記述してください。",
    behaviorNote: "通常はpaddingをつけると要素全体の幅が勝手に広がってレイアウトが崩れますが、border-boxを指定すると指定したwidthの中に余白が綺麗に収まるようになります。",
    codeAnswer: "* {\n  box-sizing: border-box;\n}"
  },
  {
    step: 12,
    title: "STEP 12: 要素を横並びにする（display: flex）",
    category: "CSS",
    description: "モダンWebの必須テクニック！親要素に `display: flex;` を指定して、縦に並ぶ要素を横一列に並べます。",
    targetFile: 'css',
    targetKeyword: 'display: flex',
    checkpoint: "style.css に `display: flex;` を指定して横並びを有効化してください。",
    behaviorNote: "親ボックスに display: flex を設定するだけで、中の子要素たちが自動的に縦方向から横方向へのスマートな並びに変化します。",
    codeAnswer: ".container {\n  display: flex;\n}"
  },
  {
    step: 13,
    title: "STEP 13: 横並びの間隔をあける（gap）",
    category: "CSS",
    description: "Flexboxで横並びにした要素と要素の間に、きれいな隙間（ギャップ）をスマートに開けるプロパティです。",
    targetFile: 'css',
    targetKeyword: 'gap:',
    checkpoint: "style.css に `gap:` プロパティで間隔を設定してください。",
    behaviorNote: "marginを個別に計算しなくても、gapを指定するだけで並んだ要素同士の間に均等な隙間を自動であけることができます。",
    codeAnswer: ".container {\n  display: flex;\n  gap: 15px;\n}"
  },
  {
    step: 14,
    title: "STEP 14: スマホ対応のメディアクエリ（@media）",
    category: "CSS",
    description: "画面幅が狭くなったとき（スマホ表示）にデザインを自動で切り替えるための `@media` ルールを記述します。",
    targetFile: 'css',
    targetKeyword: '@media',
    checkpoint: "style.css に `@media` クエリを記述してください。",
    behaviorNote: "「もし画面幅が768px以下になったら〜する」という条件分岐をCSSで書くことができ、レスポンシブ対応に絶対欠かせない機能です。",
    codeAnswer: "@media (max-width: 768px) {\n  body {\n    padding: 10px;\n  }\n}"
  },

  // --- JavaScript (15-20) ---
  {
    step: 15,
    title: "STEP 15: JSで変数を定義する（const）",
    category: "JavaScript",
    description: "ここから「script.js」タブ！データやメッセージを安全に保管するための変数宣言（const）をマスターします。",
    targetFile: 'js',
    targetKeyword: 'const',
    checkpoint: "script.js 内に `const` を使った変数宣言を記述してください。",
    behaviorNote: "constは一度入れた値を変更されない安全な箱（変数）として記憶させる現代JavaScriptの基本の書き方です。",
    codeAnswer: "const siteName = \"My Portfolio\";"
  },
  {
    step: 16,
    title: "STEP 16: 条件分岐を作る（if文）",
    category: "JavaScript",
    description: "「もし条件を満たしていたら〜する」というプログラムの判断ロジック（if文）を組み立てます。",
    targetFile: 'js',
    targetKeyword: 'if',
    checkpoint: "script.js 内に `if` 文による条件分岐を記述してください。",
    behaviorNote: "括弧 () の中の条件が true（正しい）の時だけ、その中身のブロック {} の処理が実行される仕組みを作ります。",
    codeAnswer: "const isLogged = true;\nif (isLogged) {\n  console.log(\"ログイン中\");\n}"
  },
  {
    step: 17,
    title: "STEP 17: HTMLの要素を取得する（getElementById）",
    category: "JavaScript",
    description: "JavaScriptからHTMLの特定のパーツを操作するために、ID名で要素を指名してキャッチします。",
    targetFile: 'js',
    targetKeyword: 'getElementById',
    checkpoint: "script.js に `document.getElementById` を記述してください。",
    behaviorNote: "HTML側に振られた id 属性を頼りに、そのパーツをJavaScriptの世界に引っ張り出して変数に格納することができます。",
    codeAnswer: "const titleEl = document.getElementById('title');"
  },
  {
    step: 18,
    title: "STEP 18: テキストを書き換える（textContent）",
    category: "JavaScript",
    description: "取得したHTML要素のなかの文字を、プログラム側から動的に書き換えるプロパティを使います。",
    targetFile: 'js',
    targetKeyword: 'textContent',
    checkpoint: "script.js に `textContent` を使って文字を書き換えるコードを書いてください。",
    behaviorNote: "取得した要素の textContent に新しい文字列を代入すると、ブラウザ上の表示テキストが一瞬で書き換わります。",
    codeAnswer: "const titleEl = document.getElementById('title');\ntitleEl.textContent = \"新しいタイトル！\";"
  },
  {
    step: 19,
    title: "STEP 19: クリックに反応させる（addEventListener）",
    category: "JavaScript",
    description: "ユーザーがボタンをクリックした瞬間に特定の処理を走らせる、動的Webの最重要メソッドです。",
    targetFile: 'js',
    targetKeyword: 'addEventListener',
    checkpoint: "script.js に `addEventListener` を記述してください。",
    behaviorNote: "「クリックされたら（click）、この関数を実行してね」というイベントの監視と予約を同時に登録できる超万能なメソッドです。",
    codeAnswer: "const btn = document.getElementById('btn');\nbtn.addEventListener('click', () => {\n  alert('ボタンが押されました！');\n});"
  },
  {
    step: 20,
    title: "STEP 20: 祝・ゼロからフロントエンドマスター完走！",
    category: "JavaScript",
    description: "全20ステップお疲れ様でした！最後にコンソールへ完了ログを出力して、すべてのカリキュラムをクリアしましょう！",
    targetFile: 'js',
    targetKeyword: 'console.log',
    checkpoint: "script.js に `console.log` を記述して完全クリアを掴み取ろう！",
    behaviorNote: "開発者ツールのコンソール画面に文字を出力し、プログラムが正常に動いているかを確認するための基本中の基本の命令です。",
    codeAnswer: "console.log(\"Frontend Master Completed!\");"
  }
];

export default function LearningLab() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  
  const [userHtml, setUserHtml] = useState<string>("");
  const [userCss, setUserCss] = useState<string>("");
  const [userJs, setUserJs] = useState<string>("");
  
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [isPassed, setIsPassed] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string>("");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentStep = LEARNING_STEPS[currentStepIdx];

  useEffect(() => {
    const savedStep = localStorage.getItem('learning_master_v3');
    if (savedStep) {
      const idx = parseInt(savedStep, 10);
      if (idx < LEARNING_STEPS.length) {
        setCurrentStepIdx(idx);
        setIsPassed(false);
        setErrorMessage("");
        setActiveTab(LEARNING_STEPS[idx].targetFile);
        return;
      }
    }
    setActiveTab(LEARNING_STEPS[0].targetFile);
  }, []);

  useEffect(() => {
    renderLivePreview(userHtml, userCss, userJs);
  }, [userHtml, userCss, userJs]);

  const handleStepChange = (idx: number) => {
    setCurrentStepIdx(idx);
    setIsPassed(false);
    setErrorMessage("");
    setActiveTab(LEARNING_STEPS[idx].targetFile);
    localStorage.setItem('learning_master_v3', idx.toString());
  };

  const renderLivePreview = (html: string, css: string, js: string) => {
    if (!iframeRef.current) return;
    let processedHtml = html
      .replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, `<style>${css}</style>`)
      .replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, `<script>${js}</script>`);

    iframeRef.current.src = "data:text/html;charset=utf-8," + encodeURIComponent(processedHtml);
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editor.onDidChangeModelContent((e: any) => {
      const currentLang = editor.getModel().getLanguageId();
      if (currentLang !== 'html') return;

      const changes = e.changes[0];
      if (changes.text === '>') {
        const position = editor.getPosition();
        const textUntilPosition = editor.getModel().getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });
        
        const match = textUntilPosition.match(/<([a-zA-Z0-9\-]+)[^>]*>$/);
        const voidElements = ['br', 'img', 'input', 'hr', 'meta', 'link'];
        
        if (match && !voidElements.includes(match[1])) {
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

  const handleCheckCode = () => {
    let codeToTest = "";
    let fileNameText = "";
    
    switch (currentStep.targetFile) {
      case 'html': codeToTest = userHtml; fileNameText = 'index.html'; break;
      case 'css': codeToTest = userCss; fileNameText = 'style.css'; break;
      case 'js': codeToTest = userJs; fileNameText = 'script.js'; break;
    }

    if (codeToTest.includes(currentStep.targetKeyword)) {
      setIsPassed(true);
      setErrorMessage("");
      localStorage.setItem('learning_master_v3', currentStepIdx.toString());
    } else {
      setIsPassed(false);
      setErrorMessage(`❌ エラー:「${fileNameText}」内にキーワード「 ${currentStep.targetKeyword} 」が見つかりません。`);
    }
  };

  const handleNext = () => {
    if (currentStepIdx + 1 < LEARNING_STEPS.length) {
      handleStepChange(currentStepIdx + 1);
    } else {
      alert("🎉 おめでとうございます！！全20ステップを完全走破しました！");
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) handleStepChange(currentStepIdx - 1);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] text-white overflow-hidden text-left font-sans">
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-6 py-2 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl">✨</span>
          <h1 className="text-sm font-black tracking-widest text-indigo-400">MASTER LAB : 動きの解説・正解付き全20ステップ</h1>
        </div>
        <div className="text-xs font-mono bg-[#111] px-4 py-1.5 rounded-full border border-[#3c3c3c] font-bold text-cyan-400">
          STEP: {currentStep.step} / 20 ({currentStep.category})
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden w-full">
        {/* 1列目：解説・動き・正解見本（32%） */}
        <div className="w-[32%] p-5 flex flex-col justify-between border-r border-[#3c3c3c] bg-[#1e1e1e] overflow-y-auto h-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                currentStep.category === 'HTML' ? 'bg-orange-600 text-white' :
                currentStep.category === 'CSS' ? 'bg-sky-600 text-white' : 'bg-yellow-500 text-black'
              }`}>
                {currentStep.category} コース
              </span>
            </div>

            <h2 className="text-base font-black text-slate-100 mb-2">{currentStep.title}</h2>
            <p className="text-[11px] text-[#cccccc] leading-relaxed bg-[#252526] border border-[#3c3c3c] p-3 rounded mb-3">
              {currentStep.description}
            </p>

            {/* 💡 動きの解説 */}
            <div className="bg-sky-950/30 border border-sky-900/60 p-3 rounded text-[11px] leading-relaxed text-sky-200 mb-3">
              <strong className="block text-sky-400 mb-1">💡 タグ・コードの動き:</strong>
              {currentStep.behaviorNote}
            </div>

            {/* 👑 正解コード見本 */}
            <div className="bg-[#141414] border border-[#3c3c3c] p-3 rounded font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto mb-3">
              <span className="text-[9px] text-emerald-500 font-bold block mb-1">📝 コードの正解例（参考）:</span>
              {currentStep.codeAnswer}
            </div>

            <div className="bg-indigo-950/35 border border-indigo-900 p-3 rounded text-[11px] leading-relaxed text-indigo-300 mb-2 shadow-inner">
              <strong className="block text-indigo-400 mb-1">🎯 クリア条件 ({currentStep.targetFile.toUpperCase()}):</strong>
              {currentStep.checkpoint}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#3c3c3c] shrink-0">
            <button onClick={handlePrev} disabled={currentStepIdx === 0} className={`flex-1 py-2 rounded text-[11px] font-bold border transition ${currentStepIdx === 0 ? 'border-[#3c3c3c] text-[#555] bg-transparent cursor-not-allowed' : 'border-[#444] hover:bg-[#333] text-slate-200 cursor-pointer'}`}>
              ◀ 戻る
            </button>
            {isPassed ? (
              <button onClick={handleNext} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] rounded cursor-pointer shadow-md transition">
                {currentStep.step === 20 ? "🏆 完走！" : "正解！次へ ➔"}
              </button>
            ) : (
              <button onClick={handleCheckCode} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[11px] rounded cursor-pointer shadow-md transition">
                🔍 判定する
              </button>
            )}
          </div>
        </div>

        {/* 2列目：マルチタブエディタ（36%） */}
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
              <Editor height="100%" language="html" theme="vs-dark" value={userHtml} onChange={(v) => setUserHtml(v || "")} onMount={handleEditorDidMount} options={{ fontSize: 13, minimap: { enabled: false }, wordWrap: 'on', tabSize: 2 }} />
            )}
            {activeTab === 'css' && (
              <Editor height="100%" language="css" theme="vs-dark" value={userCss} onChange={(v) => setUserCss(v || "")} options={{ fontSize: 13, minimap: { enabled: false }, wordWrap: 'on', tabSize: 2 }} />
            )}
            {activeTab === 'js' && (
              <Editor height="100%" language="javascript" theme="vs-dark" value={userJs} onChange={(v) => setUserJs(v || "")} options={{ fontSize: 13, minimap: { enabled: false }, wordWrap: 'on', tabSize: 2 }} />
            )}
          </div>

          {errorMessage && (
            <div className="bg-rose-950/80 border-t border-rose-900 text-rose-300 p-3 font-mono text-[11px] leading-relaxed shrink-0">
              {errorMessage}
            </div>
          )}
        </div>

        {/* 3列目：プレビュー（32%） */}
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