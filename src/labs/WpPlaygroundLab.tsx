import { useState, useEffect, useRef } from 'react';

type WpFileName = 'index.php' | 'functions.php' | 'sidebar.php';

interface WpStage {
  id: number;
  title: string;
  mission: string;
  hint: string;
  answerCode: string;
  files: Record<WpFileName, string>;
  activeFile: WpFileName;
  expectedKeyword: string;
  checkFile: WpFileName;
}

const WP_STAGES: WpStage[] = [
  {
    id: 1,
    title: "WP 01: WordPress化の第一歩（コアフックの設置）",
    mission: "静的なHTMLをWordPressテーマとして動かすための絶対ルールです。index.php の </head> 直前に wp_head(); を、</body> 直前に wp_footer(); をPHPタグで記述して、WordPressコアのシステムと接続してください。",
    hint: "<?php wp_head(); ?> や <?php wp_footer(); ?> を適切な位置に挿入しますわ！",
    answerCode: `\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>My First WP Theme</title>\n  <?php wp_head(); ?>\n</head>\n<body>\n  <div id="wrap">\n    <h1>WordPressテーマの世界へようこそ！</h1>\n  </div>\n  <?php wp_footer(); ?>\n</body>\n</html>`,
    activeFile: "index.php",
    checkFile: "index.php",
    expectedKeyword: "wp_footer",
    files: {
      "index.php": `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>My First WP Theme</title>\n  \n  \n</head>\n<body>\n  <div id="wrap">\n    <h1>WordPressテーマの世界へようこそ！</h1>\n    <p>まだこの状態では、ただの静的なHTMLですわ。</p>\n  </div>\n  \n  \n\n</body>\n</html>`,
      "functions.php": "<?php\n// テーマの機能を定義するファイルです\n",
      "sidebar.php": "\n<aside>\n  <h3>サイドバーメニュー</h3>\n</aside>"
    }
  },
  {
    id: 2,
    title: "WP 02: メインループ（動的な記事一覧の出力）",
    mission: "WordPressの心臓部、投稿記事を自動でループ出力するロジックを作ります。index.php 内に、記事があるか判定する if (have_posts()) と、ループを回す while (have_posts())、環境を整える the_post(); を記述してください。",
    hint: "if (have_posts()) : while (have_posts()) : the_post(); ... endwhile; endif; の伝統的な構文ですわ！",
    answerCode: `\n<?php get_header(); ?>\n<main>\n  <h2>最新の新着記事一覧</h2>\n\n  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>\n    <article>\n      <h3><?php the_title(); ?></h3>\n      <div><?php the_content(); ?></div>\n    </article>\n  <?php endwhile; endif; ?>\n\n</main>\n<?php get_footer(); ?>`,
    activeFile: "index.php",
    checkFile: "index.php",
    expectedKeyword: "the_post",
    files: {
      "index.php": `<?php get_header(); ?>\n<main>\n  <h2>最新の新着記事一覧</h2>\n\n  \n  \n    <article>\n      <h3><?php the_title(); ?></h3>\n      <div><?php the_content(); ?></div>\n    </article>\n  \n  \n\n</main>\n<?php get_footer(); ?>`,
      "functions.php": "<?php\n// テーマの拡張\n",
      "sidebar.php": "<aside>サイドバー</aside>"
    }
  },
  {
    id: 3,
    title: "WP 03: テンプレートパーツの切り離し（モジュール化）",
    mission: "運用性を高めるため、共通のサイドバーを別ファイルに切り離します。index.php の中から直接書かれているサイドバーを削除し、代わりに sidebar.php を動的に合体させる get_sidebar(); 関数を記述してください。",
    hint: "<?php get_sidebar(); ?> を呼び出すことで、別ファイルの sidebar.php がこの場所に召喚されますわ！",
    answerCode: `\n<?php wp_head(); ?>\n<div class="container" style="display:flex; gap:20px;">\n  <main style="flex:1;">\n    <h2>メインコンテンツ領域</h2>\n  </main>\n\n  <?php get_sidebar(); ?>\n</div>\n<?php wp_footer(); ?>`,
    activeFile: "index.php",
    checkFile: "index.php",
    expectedKeyword: "get_sidebar",
    files: {
      "index.php": `<?php wp_head(); ?>\n<div class="container" style="display:flex; gap:20px;">\n  <main style="flex:1;">\n    <h2>メインコンテンツ領域</h2>\n    <p>ここはメインの記事画面ですわ。</p>\n  </main>\n\n  \n  \n</div>\n<?php wp_footer(); ?>`,
      "functions.php": "<?php\n",
      "sidebar.php": `<aside style="width:250px; background:#252526; padding:15px; border-radius:8px;">\n  <h3 style="color:#61afef;">📬 仮想サイドバー</h3>\n  <ul>\n    <li>新着のブログ記事</li>\n    <li>プロフィール</li>\n  </ul>\n</aside>`
    }
  },
  {
    id: 4,
    title: "WP 04: functions.phpによるカスタムメニューの有効化",
    mission: "管理画面にメニュー設定機能を出現させます。functions.php を開き、WordPressにナビゲーションメニューの存在を登録する register_nav_menus(); 関数を記述してください。",
    hint: "register_nav_menus( array( 'main-menu' => 'Main Navigation' ) ); のように記述しますわ！",
    answerCode: `// 【functions.phpの正解コード見本】\n<?php\n// カスタムメニューをシステムに登録する\nregister_nav_menus( array(\n    'main-menu' => 'Main Navigation',\n) );`,
    activeFile: "functions.php",
    checkFile: "functions.php",
    expectedKeyword: "register_nav_menus",
    files: {
      "index.php": "<?php wp_head(); ?>\n<h1>メニュー登録の修行</h1>\n<?php wp_footer(); ?>",
      "functions.php": `<?php\n// 📝 ここにカスタムメニューをシステムに登録する関数を記述してください\n// 引数にはarrayでメニューの「識別子 => 表示名」を与えますわ！\n\n\n`,
      "sidebar.php": "<aside>サイドバー</aside>"
    }
  },
  {
    id: 5,
    title: "WP 05: 最終奥義（カスタムメニューの動的画面出力）",
    mission: "前のステージで有効化したメニューを、index.php のナビゲーションバー（<nav>内）に動的出力します。wp_nav_menu(); 関数を記述し、引数のテーマロケーションに 'main-menu' を指定してください。",
    hint: "wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); で、登録したメニューが画面に爆誕しますわ！",
    answerCode: `\n<?php wp_head(); ?>\n<header style="background:#2d2d2d; padding:15px;">\n  <nav class="global-navigation">\n    <?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>\n  </nav>\n</header>\n<?php wp_footer(); ?>`,
    activeFile: "index.php",
    checkFile: "index.php",
    expectedKeyword: "wp_nav_menu",
    files: {
      "index.php": `<?php wp_head(); ?>\n<header style="background:#2d2d2d; padding:15px;">\n  <div class="logo">PRO GLOBAL LOGO</div>\n  \n  <nav class="global-navigation">\n    \n    \n  </nav>\n</header>\n<main style="padding:20px;">\n  <h2>動的フルカスタムサイトが完成いたしました！</h2>\n</main>\n<?php wp_footer(); ?>`,
      "functions.php": `<?php\n// 前のステージで有効化したメニュー設定\nregister_nav_menus( array(\n    'main-menu' => 'Main Navigation',\n) );`,
      "sidebar.php": "<aside>サイドバー</aside>"
    }
  }
];

const THEME_PATH = '/var/www/html/wp-content/themes/playground-theme';

export default function WpPlaygroundLab() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  
  // 👑 対策①：初期値のクラッシュを絶対に防ぐ安全な空オブジェクト指定
  const [stageFiles, setStageFiles] = useState<Record<WpFileName, string>>({
    "index.php": "",
    "functions.php": "",
    "sidebar.php": ""
  });
  const [selectedFile, setSelectedFile] = useState<WpFileName>('index.php');

  const [terminalLog, setTerminalLog] = useState<string>("⏳ WordPress Playground (Wasm) を初期化中...");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isWpReady, setIsWpReady] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const stage = WP_STAGES[currentIdx] || WP_STAGES;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendPlaygroundAction = (action: any) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(action, '*');
    }
  };

  // 👑 対策②：マウント時（起動時）に一番最初のステージデータを安全に流し込む
  useEffect(() => {
    if (WP_STAGES[currentIdx]) {
      setStageFiles(WP_STAGES[currentIdx].files);
      setSelectedFile(WP_STAGES[currentIdx].activeFile);
    }
    setIsSuccess(false);
    setShowAnswer(false);
  }, [currentIdx]);

  // 🛠️ Wasm環境の起動 & 安全なオプショナルチェーニング（?.）によるファイル書き込み
  useEffect(() => {
    setIsWpReady(false);
    setTerminalLog("⚡ WebAssembly 仮想WordPressコンパイラを起動中...");

    const handleWpLoad = async () => {
      setTerminalLog("⚙️ 仮想テーマディレクトリ構造を初期化中...");
      
      const currentStage = WP_STAGES[currentIdx] || WP_STAGES;

      sendPlaygroundAction({
        type: 'importBlueprint',
        blueprint: {
          landingPage: '/',
          preferredVersion: { php: '8.1', wp: 'latest' },
          steps: [
            { step: 'mkdir', path: THEME_PATH },
            {
              step: 'writeFile',
              path: `${THEME_PATH}/style.css`,
              data: '/*\nTheme Name: Playground Theme\nAuthor: CodePlayground\nVersion: 1.0\n*/'
            },
            // 👑 対策③：万が一undefinedでも空文字にフォールバックしてクラッシュを完全回避！
            { step: 'writeFile', path: `${THEME_PATH}/index.php`, data: currentStage?.files?.['index.php'] || "" },
            { step: 'writeFile', path: `${THEME_PATH}/functions.php`, data: currentStage?.files?.['functions.php'] || "" },
            { step: 'writeFile', path: `${THEME_PATH}/sidebar.php`, data: currentStage?.files?.['sidebar.php'] || "" },
            { step: 'login', username: 'admin', password: 'password' },
            { step: 'activateTheme', themeId: 'playground-theme' }
          ]
        }
      });
      setIsWpReady(true);
      setTerminalLog("✨ WordPress Playground 起動成功！写経エディタが同期されました。");
    };

    const iframe = iframeRef.current;
    if (iframe) iframe.addEventListener('load', handleWpLoad);
    return () => { if (iframe) iframe.removeEventListener('load', handleWpLoad); };
  }, [currentIdx]);

  const handleCodeChange = (newCode: string) => {
    setStageFiles(prev => ({ ...prev, [selectedFile]: newCode }));
    if (!isWpReady) return;

    sendPlaygroundAction({
      type: 'runStep',
      step: { step: 'writeFile', path: `${THEME_PATH}/${selectedFile}`, data: newCode }
    });
    sendPlaygroundAction({
      type: 'runStep',
      step: { step: 'goTo', url: '/' }
    });
  };

  const handleRunTest = () => {
    setTerminalLog("⚡ WordPressコアフックおよびテーマの構文木を解析中...");
    const targetCode = stageFiles[stage.checkFile] || "";

    if (targetCode.includes(stage.expectedKeyword)) {
      setIsSuccess(true);
      setTerminalLog(`✨ SUCCESS: [${stage.checkFile}] 内に必須関数 '${stage.expectedKeyword}' を検知！正常にコンパイルされました。`);
    } else {
      setTerminalLog(`🚨 Error: 構文チェック失敗。${stage.checkFile} 内に、ミッションの必須キーワードが不足しています。`);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#141414] overflow-hidden text-left relative">
      
      {/* 上段：ステージ選択 */}
      <div className="bg-[#1e1e1e] border-b border-[#3c3c3c] px-3 py-2 flex gap-3 overflow-x-auto shrink-0 w-full scrollbar-hide">
        <span className="text-[10px] font-bold text-[#858585] uppercase font-mono px-2 shrink-0 flex items-center">WP STEPS:</span>
        {WP_STAGES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentIdx(idx)}
            className={`px-4 py-1.5 rounded-lg font-mono text-[11px] border flex items-center gap-2 transition shrink-0 ${
              currentIdx === idx ? 'bg-[#2d2d2d] text-cyan-400 border-cyan-500 font-bold shadow-lg shadow-black/40' : 'bg-[#141414] text-slate-400 border-transparent hover:bg-[#252526]'
            }`}
          >
            <span className="text-[9px] bg-cyan-950 px-1.5 py-0.5 rounded text-cyan-400 font-black">#0{s.id}</span>
            <span className="truncate max-w-[200px] font-bold">{s.title.split(":")}</span>
          </button>
        ))}
      </div>

      {/* 中段：複数ファイル切り替え × エディタ × Wasmプレビュー */}
      <div className="flex-1 flex overflow-hidden w-full border-b border-[#2d2d2d]">
        
        {/* 左側半分：エディタ領域 */}
        <div className="w-1/2 flex flex-col border-r border-[#2d2d2d] h-full bg-[#141414]">
          <div className="bg-[#1e1e1e] border-b border-[#2d2d2d] flex text-xs shrink-0 select-none justify-between items-center pr-3">
            <div className="flex">
              {(['index.php', 'functions.php', 'sidebar.php'] as WpFileName[]).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setSelectedFile(fileName)}
                  className={`px-4 py-2 border-r border-[#2b2b2b] font-mono transition-all text-[11px] flex items-center gap-1.5 ${
                    selectedFile === fileName 
                      ? 'bg-[#141414] text-amber-400 border-t-2 border-amber-500 font-bold' 
                      : 'bg-[#2d2d2d]/40 text-slate-500 hover:bg-[#2d2d2d]'
                  }`}
                >
                  <span>{fileName.endsWith('.php') ? '🐘' : '📄'}</span>
                  <span>{fileName}</span>
                  {stage?.checkFile === fileName && <span className="text-[8px] bg-rose-950 text-rose-400 px-1 rounded font-black">TARGET</span>}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-black px-2.5 py-1 rounded text-[10px] uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
            >
              {showAnswer ? '💡 カンペを閉じる' : '💡 正解コードを見る'}
            </button>
          </div>

          <textarea
            value={stageFiles[selectedFile] || ""}
            onChange={(e) => handleCodeChange(e.target.value)}
            disabled={!isWpReady}
            className="flex-1 bg-[#141414] text-[#dcdcaa] font-mono text-[13.5px] outline-none resize-none p-5 leading-relaxed h-full w-full select-text"
            spellCheck={false}
          />
        </div>

        {/* 右側半分：Wasm プレビュー */}
        <div className="w-1/2 flex flex-col h-full bg-[#1a1a1a]">
          <div className="bg-[#1e1e1e] text-cyan-400 font-bold text-[10px] px-3 py-2 border-b border-[#2d2d2d] font-mono flex justify-between items-center">
            <span>🖥️ LIVE PREVIEW (WP PLAYGROUND WASM)</span>
            <span className="text-[8px] bg-cyan-950 text-cyan-400 px-1 rounded font-black">AUTOMATIC RE-COMPILE</span>
          </div>
          <div className="flex-1 p-2 bg-[#111] flex relative h-full">
            <iframe
              ref={iframeRef}
              src="https://playground.wordpress.net/remote.html"
              className="w-full h-full bg-white rounded-lg shadow-2xl"
              title="WP Playground Live"
            />
            {!isWpReady && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-slate-300 text-xs font-mono p-4 text-center">
                <div className="space-y-2">
                  <div className="text-cyan-400 font-bold animate-pulse">⚙️ {terminalLog}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 下段：ターミナル */}
      <footer className="h-[220px] bg-[#0a0a0a] flex shrink-0 w-full">
        <div className="w-[380px] p-4 border-r border-[#2d2d2d] bg-[#1e1e1e] text-slate-300 flex flex-col overflow-hidden">
          <div className="text-rose-400 font-bold text-[10px] uppercase font-mono tracking-wider mb-1">🎯 STAGE MISSION</div>
          <div className="flex-1 overflow-y-auto text-[12px] leading-relaxed font-bold bg-[#141414] p-3 border border-[#2d2d2d] rounded">
            {stage?.mission}
            <div className="mt-2 pt-2 border-t border-[#222] text-[11px] text-amber-400/80 font-normal">
              💡 ヒント: {stage?.hint}
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-left">
          <div className="text-slate-500 mb-1 border-b border-[#222] pb-1 select-none font-mono">Tauri Virtual WP-Compiler Dashboard</div>
          <div className={`leading-relaxed whitespace-pre-wrap ${terminalLog.includes('🚨') ? 'text-rose-400 font-bold' : terminalLog.includes('✨') ? 'text-emerald-400 font-bold' : 'text-cyan-300'}`}>
            {terminalLog}
          </div>
        </div>

        <div className="w-[200px] p-4 bg-[#1e1e1e] flex items-center justify-center">
          <button
            onClick={handleRunTest}
            disabled={!isWpReady || isSuccess}
            className="w-full h-full font-black rounded-xl text-xs uppercase tracking-widest transition-all bg-gradient-to-br from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 active:scale-95 shadow-lg"
          >
            {isSuccess ? '✔ SUCCESS' : '▶ RUN TEST'}
          </button>
        </div>
      </footer>

      {/* カンペパネル */}
      {showAnswer && (
        <div className="absolute top-[85px] left-4 w-[46%] h-[60%] bg-[#1e1e1e] border-2 border-amber-500 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-40 flex flex-col overflow-hidden">
          <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#3c3c3c] flex justify-between items-center select-none shrink-0">
            <span className="text-xs font-mono font-black text-amber-400 flex items-center gap-1.5">
              <span>💡</span> {stage?.checkFile} の模範解答コード（写経見本）
            </span>
            <button onClick={() => setShowAnswer(false)} className="text-slate-400 hover:text-white text-sm font-bold font-mono px-1.5 cursor-pointer">✕</button>
          </div>
          <div className="flex-1 overflow-auto p-4 bg-[#0a0a0a] font-mono text-[12.5px] leading-relaxed text-emerald-400 whitespace-pre select-text selection:bg-slate-800 text-left">
            <code>{stage?.answerCode}</code>
          </div>
        </div>
      )}

      {/* ミッションクリアモーダル */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="bg-emerald-950 border-2 border-emerald-500 p-8 rounded-2xl text-center shadow-[0_0_50px_rgba(16,185,129,0.3)] max-w-sm">
            <div className="text-5xl mb-3 animate-bounce">🐘</div>
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 mb-2">STAGE CLEAR!!</h3>
            <p className="text-emerald-200 text-xs mb-6 font-bold leading-relaxed">素晴らしいわ、ボス！WordPressコアがコードの安全なインジェクトを確認いたしました！</p>
            <button 
              onClick={() => { if(currentIdx < WP_STAGES.length - 1) setCurrentIdx(currentIdx + 1); }} 
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-black py-2.5 rounded-full shadow-lg"
            >
              {currentIdx < WP_STAGES.length - 1 ? '次のステージへ進む' : '全WordPressステージ完全制覇！'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}