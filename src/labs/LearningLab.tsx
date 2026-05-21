import { useState, useEffect, useRef } from 'react';

interface LearningStep {
  step: number;
  title: string;
  category: 'HTML' | 'CSS' | 'JavaScript' | 'DevTools & Git' | 'Modern Dev';
  description: string;
  htmlSample: string;
  cssSample: string;
  checkpoint: string;
  targetKeyword: string;
  targetFile: 'html' | 'css';
}

// 👑 フロントエンド・マスターロードマップ（1〜30 完全版データ）
const LEARNING_STEPS: LearningStep[] = [
  // --- 前半戦（1〜15）のデータ構造を維持 ---
  {
    step: 1,
    title: "HTMLの基本構造とDOCTYPE宣言",
    category: "HTML",
    description: "すべてのWebページの土台となるコードです。1行目にDOCTYPE宣言を書き、<html>タグで全体を囲みましょう。",
    htmlSample: `<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>`,
    cssSample: `/* まだCSSは使いません */`,
    checkpoint: "HTMLエディタに `<!DOCTYPE html>` を含む構造を入力して「判定」を押してください。",
    targetKeyword: "<!DOCTYPE html>",
    targetFile: 'html'
  },
  {
    step: 2,
    title: "セマンティックなマークアップ（見出しと段落）",
    category: "HTML",
    description: "テキストの意味に合わせた正しいタグ選びを学びます。見出しには <h1>〜<h6>、段落には <p> を使用します。",
    htmlSample: `<h1>主要な大見出し</h1>\n<p>ここには詳細な説明文章を記述します。</p>`,
    cssSample: `/* まだCSSは使いません */`,
    checkpoint: "HTMLエディタで、段落を表す `<p>` タグを使って文章を記述してみましょう。",
    targetKeyword: "<p>",
    targetFile: 'html'
  },
  {
    step: 3,
    title: "リンクの配置 (aタグ)",
    category: "HTML",
    description: "ページ移動を行うハイパーリンク（aタグ）です。href属性に行き先のURLを指定します。",
    htmlSample: `<a href="https://google.com">Googleへジャンプ</a>`,
    cssSample: `/* まだCSSは使いません */`,
    checkpoint: "HTMLエディタにリンクを作成するために `href=` 属性を記述してください。",
    targetKeyword: "href=",
    targetFile: 'html'
  },
  {
    step: 4,
    title: "箇条書きリストの構築 (ul・li)",
    category: "HTML",
    description: "順序のない箇条書きは <ul> タグを使い、中身の項目は <li> タグで配置します。",
    htmlSample: `<ul>\n  <li>リンゴ</li>\n  <li>バナナ</li>\n</ul>`,
    cssSample: `/* まだCSSは使いません */`,
    checkpoint: "HTMLエディタに箇条書きのリストを作るために `<ul>` タグを入力してください。",
    targetKeyword: "<ul>",
    targetFile: 'html'
  },
  {
    step: 5,
    title: "フォームと入力部品 (input)",
    category: "HTML",
    description: "ユーザーがテキストを入力するための入力部品（inputタグ）の基本構成です。",
    htmlSample: `<input type="text" placeholder="例：山田太郎" />`,
    cssSample: `/* まだCSSは使いません */`,
    checkpoint: "HTMLエディタに入力欄を作るために `type=\"text\"` を持つinputタグを入力してください。",
    targetKeyword: "type=\"text\"",
    targetFile: 'html'
  },
  {
    step: 6,
    title: "実務の鉄則！外部CSSファイルの読み込み",
    category: "CSS",
    description: "プロの現場ではCSSは別ファイル(style.css)で管理します。HTML側の<head>内に、CSSを合体させるための<link>タグを書きましょう！",
    htmlSample: `<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>CSSで色が変わるよ</h1>\n</body>\n</html>`,
    cssSample: `h1 {\n  color: #06b6d4;\n}`,
    checkpoint: "HTMLエディタ側に、外部CSSを読み込むための `<link rel=\"stylesheet\" href=\"style.css\">` を記述してください！",
    targetKeyword: `href="style.css"`,
    targetFile: 'html'
  },
  {
    step: 7,
    title: "外部ファイル(style.css)へスタイルを記述する",
    category: "CSS",
    description: "HTMLとCSSがリンクされたので、ここからは「style.css」タブに切り替えて、文字色を変えるCSSを直接書き込んでいきましょう！",
    htmlSample: `<link rel="stylesheet" href="style.css">\n<h1>シアン色に変えてみよう</h1>`,
    cssSample: `h1 {\n  color: #06b6d4;\n}`,
    checkpoint: "「style.css」タブに切り替え、文字色を変更する `color` プロパティを記述してください。",
    targetKeyword: "color",
    targetFile: 'css'
  },
  {
    step: 8,
    title: "ボックスモデル（内側余白 Padding）",
    category: "CSS",
    description: "デザインの命である余白です。境界線の内側にある「中身のテキストから境界線までの余白」を padding と呼び、style.cssに記述します。",
    htmlSample: `<link rel="stylesheet" href="style.css">\n<div class="box">余白ボックス</div>`,
    cssSample: `.box {\n  background: #334155;\n  padding: 20px;\n}`,
    checkpoint: "「style.css」タブに、内側の余白を設定する `padding` プロパティを記述してください。",
    targetKeyword: "padding",
    targetFile: 'css'
  },
  {
    step: 9,
    title: "レイアウト崩れを防ぐ box-sizing",
    category: "CSS",
    description: "指定した幅（width）の内側に余白や境界線を収め、全体の横幅が勝手に膨らむのを固定する実務必須の設定です。",
    htmlSample: `<link rel="stylesheet" href="style.css">\n<div class="card">Card</div>`,
    cssSample: `.card {\n  box-sizing: border-box;\n  width: 300px;\n}`,
    checkpoint: "「style.css」タブに、幅の計算を狂わせないための `border-box` を入力してください。",
    targetKeyword: "border-box",
    targetFile: 'css'
  },
  {
    step: 10,
    title: "要素の絶対配置 (Position: absolute)",
    category: "CSS",
    description: "要素を通常の位置関係から切り離し、自由な位置に重ねてピン留めする技術です。",
    htmlSample: `<link rel="stylesheet" href="style.css">\n<div class="badge">NEW</div>`,
    cssSample: `.badge {\n  position: absolute;\n  top: 10px;\n}`,
    checkpoint: "「style.css」タブに、絶対配置を行うための `absolute` を入力してください。",
    targetKeyword: "absolute",
    targetFile: 'css'
  },
  {
    step: 11,
    title: "モダンレイアウトの王様 Flexbox",
    category: "CSS",
    description: "要素を横並びにする現代Webの必須スキルです。並べたい要素の親ボックスに指定します。",
    htmlSample: `<link rel="stylesheet" href="style.css">\n<div class="flex-box">\n  <div>A</div><div>B</div>\n</div>`,
    cssSample: `.flex-box {\n  display: flex;\n}`,
    checkpoint: "「style.css」タブに、横並びを発動させる `display: flex` を入力してください。",
    targetKeyword: "display: flex",
    targetFile: 'css'
  },
  {
    step: 12,
    title: "Flexboxの配置調整 (space-between)",
    category: "CSS",
    description: "横並びにした子要素を、左右の端に綺麗にパッと分散配置するための軸制御です。",
    htmlSample: `<link rel="stylesheet" href="style.css">\n<div class="menu"><span>Logo</span><span>Menu</span></div>`,
    cssSample: `.menu {\n  display: flex;\n  justify-content: space-between;\n}`,
    checkpoint: "「style.css」タブに、均等分散を行う `space-between` を入力してください。",
    targetKeyword: "space-between",
    targetFile: 'css'
  },
  {
    step: 13,
    title: "画面幅で切り替えるメディアクエリ",
    category: "CSS",
    description: "スマホとPCでデザインを切り替えるレスポンシブの核となるCSS構文です。",
    htmlSample: `<link rel="stylesheet" href="style.css">\n<p>画面幅を変えてみよう</p>`,
    cssSample: `@media (max-width: 768px) {\n  body { background: #eee; }\n}`,
    checkpoint: "「style.css」タブに、メディアクエリのトリガーとなる `@media` を記述してください。",
    targetKeyword: "@media",
    targetFile: 'css'
  },
  {
    step: 14,
    title: "JavaScriptの変数宣言 (const)",
    category: "JavaScript",
    description: "ここからJSです。一度代入したら中身を変更できない、最も安全でモダンな変数宣言のキーワードです。",
    htmlSample: `<script>\n  const userName = "ボス";\n  document.write(userName);\n</script>`,
    cssSample: `/* CSSは使いません */`,
    checkpoint: "HTMLエディタ内の<script>内に、変数を作るための `const` を入力してください。",
    targetKeyword: "const",
    targetFile: 'html'
  },
  {
    step: 15,
    title: "条件分岐 (if文)",
    category: "JavaScript",
    description: "「もし〇〇ならこの処理」というプログラムの判断ロジックを作ります。",
    htmlSample: `<script>\n  const score = 100;\n  if (score === 100) { document.write("満点！"); }\n</script>`,
    cssSample: `/* CSSは使いません */`,
    checkpoint: "HTMLエディタ内に、条件分岐の処理を作成するための `if` 文を記述してください。",
    targetKeyword: "if",
    targetFile: 'html'
  },

  // 👑 【ここから後半戦突入！！ STEP 16 〜 STEP 30】
  {
    step: 16,
    title: "JavaScriptのアロー関数構文",
    category: "JavaScript",
    description: "モダン開発において function キーワードはほぼ使いません。矢印 `=>` を使ったスマートな関数定義をマスターします。",
    htmlSample: `<script>\n  const greet = () => {\n    document.write("ハロー！");\n  };\n  greet();\n</script>`,
    cssSample: `/* 不要 */`,
    checkpoint: "HTMLタブ内のスクリプトに、アロー関数のシグネチャである `=>` 演算子を入力してください。",
    targetKeyword: "=>",
    targetFile: 'html'
  },
  {
    step: 17,
    title: "クリックイベントの検知 (addEventListener)",
    category: "JavaScript",
    description: "ボタンを押したときにJavaScriptを動かす、動的Webのすべての基本となる超重要メソッドです。",
    htmlSample: `<button id="btn">Click Me</button>\n<script>\n  const targetBtn = document.getElementById('btn');\n  targetBtn.addEventListener('click', () => {\n    alert('Clicked!');\n  });\n</script>`,
    cssSample: `/* 不要 */`,
    checkpoint: "イベントを安全に検知・登録するために `addEventListener` メソッドを正確に記述してください。",
    targetKeyword: "addEventListener",
    targetFile: 'html'
  },
  {
    step: 18,
    title: "配列の高速加工ループ処理 (mapメソッド)",
    category: "JavaScript",
    description: "React等のモダンフロント開発で最も多用される高階関数です。配列のデータを一括で加工・ループ展開します。",
    htmlSample: `<script>\n  const numbers =;\n  const doubled = numbers.map(n => n * 2);\n  document.write(doubled.join(', '));\n</script>`,
    cssSample: `/* 不要 */`,
    checkpoint: "配列要素をマッピング加工処理するために `map` メソッドを入力してください。",
    targetKeyword: ".map",
    targetFile: 'html'
  },
  {
    step: 19,
    title: "配列の条件間引き抽出 (filterメソッド)",
    category: "JavaScript",
    description: "配列の中から、条件に合致したデータ（trueを返したもの）だけを集めて新しい配列を作る超便利メソッドです。",
    htmlSample: `<script>\n  const ages =;\n  const adults = ages.filter(age => age >= 20);\n  document.write(adults.join('-'));\n</script>`,
    cssSample: `/* 不要 */`,
    checkpoint: "特定の条件でデータを絞り込むために `filter` メソッドを入力してください。",
    targetKeyword: ".filter",
    targetFile: 'html'
  },
  {
    step: 20,
    title: "非同期通信の救世主 (async / await)",
    category: "JavaScript",
    description: "外部サーバーからデータを取ってくる処理（非同期処理）を、上から下に同期処理のように綺麗に書くための仕組みです。",
    htmlSample: `<script>\n  async function loadData() {\n    const res = await fetch('https://api.github.com');\n    console.log("Loaded");\n  }\n</script>`,
    cssSample: `/* 不要 */`,
    checkpoint: "非同期プロミスの完了を待つために `await` キーワードをエディタに入力してください。",
    targetKeyword: "await",
    targetFile: 'html'
  },
  {
    step: 21,
    title: "JSONデータのパースとオブジェクト化",
    category: "JavaScript",
    description: "API通信で送られてくるデータはただの文字列です。それをJavaScriptのプログラムで扱えるようにオブジェクトに復元します。",
    htmlSample: `<script>\n  const jsonText = '{"name":"Boss"}';\n  const obj = JSON.parse(jsonText);\n  document.write(obj.name);\n</script>`,
    cssSample: `/* 不要 */`,
    checkpoint: "JSON文字列をオブジェクトデータに解析逆変換する `JSON.parse` を入力してください。",
    targetKeyword: "JSON.parse",
    targetFile: 'html'
  },
  {
    step: 22,
    title: "ブラウザへの進捗永続保存 (localStorage)",
    category: "JavaScript",
    description: "サーバーを使わずに、ユーザーのPCブラウザにデータを半永久的にセーブ・記憶させる実務で超多用されるAPIです。",
    htmlSample: `<script>\n  localStorage.setItem('user_mode', 'dark');\n  document.write("Saved Progress");\n</script>`,
    cssSample: `/* 不要 */`,
    checkpoint: "ブラウザのローカルメモリにキーと値をセーブ保存する `localStorage` を記述してください。",
    targetKeyword: "localStorage",
    targetFile: 'html'
  },
  {
    step: 23,
    title: "F12開発者ツールの Console デバッグ",
    category: "DevTools & Git",
    description: "ここからはプロの開発環境です。プログラムにエラーがないか、どんな中身が入っているかを Console タブに出力して調査します。",
    htmlSample: `<script>\n  const debugVal = "🚀 SYSTEM NORMAL";\n  console.log(debugVal);\n</script>`,
    cssSample: `/* 不要 */`,
    checkpoint: "開発者ツールのコンソールログへデバッグ出力を行う `console.log` を記述してください。",
    targetKeyword: "console.log",
    targetFile: 'html'
  },
  {
    step: 24,
    title: "Gitによるソースコード変更履歴のインデックス登録",
    category: "DevTools & Git",
    description: "チーム開発の絶対標準「Git」。新しく作ったファイルを次のコミット（保存）の対象として準備エリアへ乗せるコマンドを学びます。",
    htmlSample: `\ngit add .`,
    cssSample: `/* 不要 */`,
    checkpoint: "すべての変更ファイルをステージングエリアへ一括追加登録するコマンド `git add .` を入力してください。",
    targetKeyword: "git add .",
    targetFile: 'html'
  },
  {
    step: 25,
    title: "Gitによるメッセージ付きコミット（履歴確定）",
    category: "DevTools & Git",
    description: "ステージングに載せた変更に対して「何を変えたか」という説明メッセージを添えて、ローカルリポジトリに永久保存します。",
    htmlSample: `git commit -m "feat: complete learning engine"`,
    cssSample: `/* 不要 */`,
    checkpoint: "メッセージを伴うコミットを確定させるコマンド `git commit -m` を正確に入力してください。",
    targetKeyword: "git commit -m",
    targetFile: 'html'
  },
  {
    step: 26,
    title: "Gitによるリモートリポジトリへの同期 (Push)",
    category: "DevTools & Git",
    description: "手元のパソコンにコミットした変更履歴を、GitHubなどのクラウドサーバー側へアップロードしてチームに共有するコマンドです。",
    htmlSample: `git push origin main`,
    cssSample: `/* 不要 */`,
    checkpoint: "オリジンのメインブランチに差分を送信するコマンド `git push origin main` を記述してください。",
    targetKeyword: "git push origin",
    targetFile: 'html'
  },
  {
    step: 27,
    title: "モダンビルドツール Vite による爆速起動環境",
    category: "Modern Dev",
    description: "現在のフロントエンドはwebpackに代わり「Vite（ヴィート）」が標準です。開発サーバーを立ち上げる実務コマンドです。",
    htmlSample: `npm run dev`,
    cssSample: `/* 不要 */`,
    checkpoint: "ローカルにローカルホストの開発用ライブサーバーを爆速起動する `npm run dev` を記述してください。",
    targetKeyword: "npm run dev",
    targetFile: 'html'
  },
  {
    step: 28,
    title: "パッケージ管理ツールによる外部ライブラリ導入",
    category: "Modern Dev",
    description: "ReactやTailwindCSS、アイコンライブラリなど、世界中のプロが作った便利なパーツを自分のプロジェクトにインストールするコマンドです。",
    htmlSample: `npm install tailwindcss`,
    cssSample: `/* 不要 */`,
    checkpoint: "Nodeパッケージマネージャーからライブラリをインストールする `npm install` コマンドを入力してください。",
    targetKeyword: "npm install",
    targetFile: 'html'
  },
  {
    step: 29,
    title: "TypeScriptによる型の定義 (Interface)",
    category: "Modern Dev",
    description: "JavaScriptの弱点だった「バグの気づきにくさ」を解消する開発の主役です。データ構造の『設計図（型）』を定義します。",
    htmlSample: `\ninterface UserProfile {\n  id: number;\n  name: string;\n}`,
    cssSample: `/* 不要 */`,
    checkpoint: "TypeScriptにおいて強固なカスタム型オブジェクトの設計図を定義する `interface` を入力してください。",
    targetKeyword: "interface",
    targetFile: 'html'
  },
  {
    step: 30,
    title: "祝・フロントエンドマスター！最終確認ビルド",
    category: "Modern Dev",
    description: "全30ステップ完走、おめでとうございます！最後に、書いた全コードを本番用の1ファイルに最適化・圧縮ビルドして出荷（デプロイ）するコマンドです！",
    htmlSample: `npm run build`,
    cssSample: `/* 完走おめでとうございます！ */`,
    checkpoint: "プロジェクトを本番公開用のアセットにコンパイル・最適化書き出しする `npm run build` を入力して、完全合格を掴み取りましょう！",
    targetKeyword: "npm run build",
    targetFile: 'html'
  }
];

export default function LearningLab() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [userHtml, setUserHtml] = useState<string>("");
  const [userCss, setUserCss] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'index.html' | 'style.css'>('index.html');

  const [isPassed, setIsPassed] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<string>("");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentStep = LEARNING_STEPS[currentStepIdx];

  // 進捗自動ロード（中断から完全再開）
  useEffect(() => {
    const savedStep = localStorage.getItem('learning_step_idx');
    if (savedStep) {
      const idx = parseInt(savedStep, 10);
      if (idx < LEARNING_STEPS.length) setCurrentStepIdx(idx);
    }
  }, []);

  // ステップ変更時にワークスペースを完全初期化
  useEffect(() => {
    setUserHtml("");
    setUserCss("");
    setIsPassed(false);
    setErrorMessage("");
    setActiveTab('index.html');
    renderLivePreview("", "");
  }, [currentStepIdx]);

  const handleHtmlChange = (val: string) => {
    setUserHtml(val);
    renderLivePreview(val, userCss);
  };

  const handleCssChange = (val: string) => {
    setUserCss(val);
    renderLivePreview(userHtml, val);
  };

  // 外部CSSファイルをリアルタイムリンク結合するiframeシミュレーター
  const renderLivePreview = (html: string, css: string) => {
    if (!iframeRef.current) return;
    
    let combinedBlob = html;
    if (html.includes('style.css')) {
      combinedBlob = html + `<style>${css}</style>`;
    }

    const baseTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>body { font-family: sans-serif; padding: 15px; margin: 0; background: #fff; color: #111; }</style>
      </head>
      <body>${combinedBlob}</body>
      </html>
    `;
    iframeRef.current.src = "data:text/html;charset=utf-8," + encodeURIComponent(baseTemplate);
  };

  // Progate風厳密テスト判定
  const handleCheckCode = () => {
    const codeToTest = currentStep.targetFile === 'html' ? userHtml : userCss;
    const fileNameText = currentStep.targetFile === 'html' ? 'index.html' : 'style.css';

    if (codeToTest.includes(currentStep.targetKeyword)) {
      setIsPassed(true);
      setErrorMessage("");
      // 合格時にその場自動バックグラウンドセーブ
      localStorage.setItem('learning_step_idx', currentStepIdx.toString());
    } else {
      setIsPassed(false);
      setErrorMessage(`❌ クリティカルエラー:「${fileNameText}」内にキーワード「 ${currentStep.targetKeyword} 」が見つかりません。条件を再確認してください。`);
    }
  };

  const handleNext = () => {
    if (currentStepIdx + 1 < LEARNING_STEPS.length) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      localStorage.setItem('learning_step_idx', nextIdx.toString());
    } else {
      alert("🎉 おめでとうございます！！全30ステップを完全走破し、フロントエンド・プロフェッショナルマスターの称号を獲得しました！");
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      localStorage.setItem('learning_step_idx', prevIdx.toString());
    }
  };

  const handleSaveAndExit = () => {
    localStorage.setItem('learning_step_idx', currentStepIdx.toString());
    setSaveStatus("💾 現在の進捗（STEP " + currentStep.step + " / 30）をLocalStorageに永続セーブしました！");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#111827] text-white overflow-hidden text-left font-sans">
      {/* トップバー */}
      <div className="bg-[#1f2937] border-b border-slate-700 px-6 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl">🎓</span>
          <h1 className="text-base font-black tracking-widest text-indigo-400">LEARNING LAB : INTERACTIVE COMPLETE</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {saveStatus && <span className="text-xs text-emerald-400 font-bold animate-pulse">{saveStatus}</span>}
          <button onClick={handleSaveAndExit} className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-600 cursor-pointer">
            💾 中断セーブ
          </button>
          <div className="text-xs font-mono bg-slate-900 px-4 py-1.5 rounded-full border border-slate-700 font-bold">
            STEP: {currentStep.step} / 30
          </div>
        </div>
      </div>

      {/* メインレイアウト（3列） */}
      <div className="flex-1 flex overflow-hidden w-full">
        
        {/* 1列目：問題解説・判定トリガー（30%） */}
        <div className="w-[30%] p-5 flex flex-col justify-between border-r border-slate-800 bg-[#111827] overflow-y-auto h-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                currentStep.category === 'HTML' ? 'bg-orange-600 text-white' :
                currentStep.category === 'CSS' ? 'bg-sky-600 text-white' :
                currentStep.category === 'JavaScript' ? 'bg-yellow-500 text-black' : 
                currentStep.category === 'DevTools & Git' ? 'bg-purple-600 text-white' : 'bg-pink-600 text-white'
              }`}>
                {currentStep.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">STAGE {currentStep.step}</span>
            </div>

            <h2 className="text-base font-black text-slate-100 mb-3">{currentStep.title}</h2>
            <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 p-3 rounded-xl mb-3">
              {currentStep.description}
            </p>

            <div className="bg-indigo-950/40 border border-indigo-900/60 p-3 rounded-xl text-[11px] leading-relaxed text-indigo-200 mb-3">
              <strong className="block text-indigo-400 mb-0.5">🎯 クリア条件（編集対象: {currentStep.targetFile.toUpperCase()}）:</strong>
              {currentStep.checkpoint}
            </div>

            <div className="bg-[#0a0f1d] border border-slate-800 p-3 rounded-xl font-mono text-[10px] text-slate-400 whitespace-pre overflow-x-auto mb-2">
              <span className="text-[9px] text-orange-400 font-bold block mb-1">💡 HTML お手本:</span>
              {currentStep.htmlSample}
            </div>
            {currentStep.step >= 6 && (
              <div className="bg-[#0a0f1d] border border-slate-800 p-3 rounded-xl font-mono text-[10px] text-slate-400 whitespace-pre overflow-x-auto">
                <span className="text-[9px] text-sky-400 font-bold block mb-1">💡 style.css お手本:</span>
                {currentStep.cssSample}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 shrink-0">
            <button onClick={handlePrev} disabled={currentStepIdx === 0} className={`flex-1 py-2 rounded-lg text-[11px] font-bold border ${currentStepIdx === 0 ? 'border-slate-800 text-slate-600 bg-transparent cursor-not-allowed' : 'border-slate-700 hover:bg-slate-800 text-slate-200 cursor-pointer'}`}>
              ◀ 戻る
            </button>
            {isPassed ? (
              <button onClick={handleNext} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] rounded-lg cursor-pointer shadow-md">
                {currentStep.step === 30 ? "🏆 全コード完走！" : "正解！次へ ➔"}
              </button>
            ) : (
              <button onClick={handleCheckCode} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[11px] rounded-lg cursor-pointer shadow-md">
                🔍 判定する
              </button>
            )}
          </div>
        </div>

        {/* 2列目：マルチタブコードエディタ（38%） */}
        <div className="w-[38%] bg-[#0f1420] flex flex-col h-full border-r border-slate-900">
          <div className="bg-[#161d30] border-b border-slate-900 flex text-xs shrink-0 items-center justify-between pr-3">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('index.html')} 
                className={`px-4 py-2 font-mono text-[11px] transition-all cursor-pointer ${activeTab === 'index.html' ? 'bg-[#0a0f1d] text-orange-400 border-t-2 border-orange-500 font-bold' : 'bg-[#1e2937]/40 text-slate-500'}`}
              >
                🌐 index.html
              </button>
              {currentStep.step >= 6 && (
                <button 
                  onClick={() => setActiveTab('style.css')} 
                  className={`px-4 py-2 font-mono text-[11px] transition-all cursor-pointer ${activeTab === 'style.css' ? 'bg-[#0a0f1d] text-sky-400 border-t-2 border-sky-500 font-bold' : 'bg-[#1e2937]/40 text-slate-500'}`}
                >
                  📘 style.css
                </button>
              )}
            </div>
            {isPassed && <span className="text-[9px] bg-emerald-950 border border-emerald-500 text-emerald-400 px-1.5 py-0.5 rounded font-black">PASSED</span>}
          </div>
          
          {activeTab === 'index.html' ? (
            <textarea
              value={userHtml}
              onChange={(e) => handleHtmlChange(e.target.value)}
              disabled={isPassed && currentStep.targetFile === 'html'}
              placeholder=""
              className="flex-1 p-5 font-mono text-xs leading-relaxed outline-none resize-none bg-[#0a0f1d] text-orange-300 select-text"
            />
          ) : (
            <textarea
              value={userCss}
              onChange={(e) => handleCssChange(e.target.value)}
              disabled={isPassed && currentStep.targetFile === 'css'}
              placeholder="/* style.css タブにタイピングしてください */"
              className="flex-1 p-5 font-mono text-xs leading-relaxed outline-none resize-none bg-[#0a0f1d] text-sky-300 select-text"
            />
          )}

          {errorMessage && (
            <div className="bg-rose-950/80 border-t border-rose-800 text-rose-300 p-3 font-mono text-[11px] leading-relaxed">
              {errorMessage}
            </div>
          )}
        </div>

        {/* 3列目：ライブブラウザプレビュー（32%） */}
        <div className="w-[32%] bg-[#1a1a1a] flex flex-col h-full">
          <div className="bg-[#161d30] px-4 py-2 text-[10px] font-mono text-indigo-400 border-b border-slate-900 flex justify-between items-center font-bold tracking-wider">
            <span>🖥️ LIVE BROWSER PREVIEW</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-950 border border-indigo-800">REALTIME</span>
          </div>
          <div className="flex-1 p-2 bg-[#111] h-full">
            <iframe 
              ref={iframeRef} 
              className="w-full h-full bg-white rounded-lg shadow-inner border-0" 
              title="Learning Sandbox" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}