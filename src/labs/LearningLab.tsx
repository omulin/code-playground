import { useState, useEffect, useRef } from 'react';

// --- 1. ミッションの設計図（Schema） ---
interface Mission {
  id: number;
  title: string;
  description: string;
  hint: string;
  initialCode: string;
  expectedKeyword: string;
  validationMode: 'exact' | 'include';
}

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Mission 1: 見出しを作ろう",
    description: "Webページの一番大きな見出しを作ります。<h1>タグを使って、「Hello World」と画面に表示させてみましょう！必ず </h1> で閉じてくださいね。",
    hint: "<h1>Hello World</h1> と記述します。",
    initialCode: "<!DOCTYPE html>\n<html>\n<body>\n\n  \n\n</body>\n</html>",
    expectedKeyword: "<h1>HelloWorld</h1>",
    validationMode: 'exact'
  },
  {
    id: 2,
    title: "Mission 2: 段落の文章を書こう",
    description: "普通の文章を書くときは <p> タグ（Paragraph）を使います。「Web制作を学ぶ」という文章を書いてみましょう。",
    hint: "<p>Web制作を学ぶ</p> と書きます。",
    initialCode: "<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World</h1>\n  \n\n</body>\n</html>",
    expectedKeyword: "<p>Web制作を学ぶ</p>",
    validationMode: 'exact'
  },
  {
    id: 3,
    title: "Mission 3: 文字の色を赤くしよう",
    description: "CSSを使って文字に色をつけます。<style>タグの中で、h1のcolorを「red」に指定してください。",
    hint: "h1 { color: red; } と書きます。",
    initialCode: "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    /* ここにCSSを書いてね */\n    \n  </style>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>",
    expectedKeyword: "h1{color:red;}",
    validationMode: 'include'
  },
  {
    id: 4,
    title: "Mission 4: 背景色をダークにしよう",
    description: "画面全体の背景色を変えるには body に対してCSSをあてます。背景色（background-color）を「#222222」にしてみましょう。",
    hint: "body { background-color: #222222; } と書きます。",
    initialCode: "<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    h1 { color: red; }\n    /* ここに背景のCSSを書いてね */\n    \n  </style>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>",
    expectedKeyword: "body{background-color:#222222;}",
    validationMode: 'include'
  },
  {
    id: 5,
    title: "Mission 5: クリックボタンを置こう",
    description: "画面にボタンを配置します。<button>タグを使って、文字が「押してね」となるボタンを作ってください。",
    hint: "<button>押してね</button> と書きます。",
    initialCode: "<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World</h1>\n  \n\n</body>\n</html>",
    expectedKeyword: "<button>押してね</button>",
    validationMode: 'exact'
  },
  {
    id: 6,
    title: "Mission 6: ボタンにIDをつけよう",
    description: "JavaScriptからボタンを特定できるように、ボタンに id=\"my-btn\" という属性を追加してください。",
    hint: "<button id=\"my-btn\">押してね</button> とします。",
    initialCode: "<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World</h1>\n  \n  <button>押してね</button>\n</body>\n</html>",
    expectedKeyword: "<buttonid=\"my-btn\">押してね</button>",
    validationMode: 'exact'
  },
 {
    id: 7,
    title: "Mission 7: JavaScriptに関数を作ろう",
    description: "ボタンを押したときに動かす『命令の塊（関数）』を作ります。sayHelloという名前の関数を作って、その中で alert('Hello') が実行されるようにしてみましょう！",
    hint: "function sayHello() {\n  alert('Hello');\n} \nと記述します。これで画面読み込み時に暴発しなくなります！",
    initialCode: "<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World</h1>\n  <button id=\"my-btn\">押してね</button>\n\n  <script>\n    /* ここに関数を書いてね */\n    \n  </script>\n</body>\n</html>",
    expectedKeyword: "functionsayhello(){alert('hello')}",
    validationMode: 'include'
  },
  {
    id: 8,
    title: "Mission 8: 最後の仕上げ！イベント接続",
    description: "今度は、ボタンをクリックした（onclick）ときに、先ほど作った関数「sayHello()」が呼び出されるようにします。buttonタグの属性に onclick=\"sayHello()\" を組み込んでみましょう！",
    hint: "<button id=\"my-btn\" onclick=\"sayHello()\">押してね</button> と書きます。これでボタンを押した時だけアラートが出ます！",
    initialCode: "<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World</h1>\n  \n  <button id=\"my-btn\">押してね</button>\n\n  <script>\n    function sayHello() {\n      alert('Hello');\n    }\n  </script>\n</body>\n</html>",
    expectedKeyword: "onclick=\"sayhello()\"", // 👑 7番で作った関数をここで呼び出す！
    validationMode: 'include'
  }
];

export default function LearningLab() {
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [code, setCode] = useState(MISSIONS.initialCode);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentMission = MISSIONS[currentMissionIdx];

  // ミッションが切り替わったらエディタをリセット
  useEffect(() => {
    setCode(MISSIONS[currentMissionIdx].initialCode);
    setStatus("idle");
  }, [currentMissionIdx]);

  // 👑 修正: コードが本当に「書き換えられた時」だけリセットがかかるように関数を分離
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setStatus("idle"); // ユーザーが文字を入力した時だけ idle に戻す
  };

  // リアルタイムプレビューの更新はコードの変更のみを監視
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = "data:text/html;charset=utf-8," + encodeURIComponent(code);
    }
  }, [code]);

  // 判定エンジン
  const handleValidate = () => {
    const clean = (str: string) => str.replace(/[\s;]/g, '').toLowerCase().replace(/"/g, "'");
    const normalizedUser = clean(code);
    const normalizedTarget = clean(currentMission.expectedKeyword);

    if (normalizedUser.includes(normalizedTarget)) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const nextMission = () => {
    if (currentMissionIdx < MISSIONS.length - 1) {
      setCurrentMissionIdx(currentMissionIdx + 1);
    }
  };

  const prevMission = () => {
    if (currentMissionIdx > 0) {
      setCurrentMissionIdx(currentMissionIdx - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#141414] text-white font-sans overflow-hidden">
      
      {/* ヘッダー */}
      <header className="h-14 bg-[#1e1e1e] border-b border-[#3c3c3c] flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <span className="font-black text-indigo-400 text-lg tracking-wider">LEARNING LAB</span>
          
          <div className="flex items-center bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-1 gap-1">
            <button 
              type="button"
              onClick={prevMission} 
              disabled={currentMissionIdx === 0}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${currentMissionIdx === 0 ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400 hover:text-white cursor-pointer'}`}
            >
              ◀ 前へ
            </button>
            
            <select 
              value={currentMissionIdx} 
              onChange={(e) => setCurrentMissionIdx(Number(e.target.value))}
              className="bg-[#141414] text-xs font-mono text-cyan-400 border border-[#3c3c3c] rounded px-2 py-1 mx-1 outline-none cursor-pointer focus:border-cyan-500"
            >
              {MISSIONS.map((m, index) => (
                <option key={m.id} value={index}>
                  Mission {index + 1}: {m.title.split(": ")}
                </option>
              ))}
            </select>

            <button 
              type="button"
              onClick={nextMission} 
              disabled={currentMissionIdx === MISSIONS.length - 1}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${currentMissionIdx === MISSIONS.length - 1 ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400 hover:text-white cursor-pointer'}`}
            >
              次へ ▶
            </button>
          </div>
        </div>

        {status === "success" && (
          <button type="button" onClick={nextMission} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded shadow-lg animate-pulse cursor-pointer">
            {currentMissionIdx === MISSIONS.length - 1 ? "🎉 全ミッションクリア！" : "次のミッションへ ➔"}
          </button>
        )}
      </header>

      {/* メインビュー */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 左：指示書 */}
        <div className="w-1/4 bg-[#1a1a1a] border-r border-[#2d2d2d] flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">{currentMission.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">{currentMission.description}</p>
            
            <div className="bg-[#222] border-l-4 border-amber-500 p-4 rounded-r">
              <span className="block text-[10px] font-bold text-amber-500 mb-1 tracking-wider">💡 HINT</span>
              <p className="text-xs text-slate-400 font-mono whitespace-pre-wrap">{currentMission.hint}</p>
            </div>
          </div>
          
          <div className="p-4 border-t border-[#2d2d2d] bg-[#141414]">
             <button 
                type="button"
                onClick={handleValidate}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow-lg transition-all active:scale-95 text-sm cursor-pointer"
              >
                コードを判定する
              </button>
              
              {status === "error" && (
                <div className="mt-3 text-center text-xs text-red-400 font-bold animate-bounce">
                  ❌ まだ正解ではありません。閉じタグや文字を確認してみてね！
                </div>
              )}
              {status === "success" && (
                <div className="mt-3 text-center text-xs text-emerald-400 font-bold">
                  ✨ CLEAR!! 完璧です！
                </div>
              )}
          </div>
        </div>

        {/* 中央：エディタ */}
        <div className="w-1/2 flex flex-col border-r border-[#2d2d2d]">
          <div className="bg-[#1e1e1e] text-[10px] text-slate-500 font-bold px-4 py-2 border-b border-[#2d2d2d] uppercase tracking-widest">
            Editor
          </div>
          {/* 👑 修正: onChange を新設した handleCodeChange に変更 */}
          <textarea 
            value={code} 
            onChange={(e) => handleCodeChange(e.target.value)} 
            className="flex-1 bg-[#141414] text-[#dcdcaa] font-mono text-[14px] p-6 outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* 右：プレビュー */}
        <div className="w-1/4 bg-[#111] flex flex-col relative">
          <div className="bg-[#1e1e1e] text-[10px] text-slate-500 font-bold px-4 py-2 border-b border-[#2d2d2d] uppercase tracking-widest">
            <span>Preview</span>
          </div>
          <div className="flex-1 p-2">
            <iframe ref={iframeRef} className="w-full h-full bg-white rounded shadow-inner" title="Preview" />
          </div>
        </div>

      </div>
    </div>
  );
}