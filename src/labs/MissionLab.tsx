import { useState, useEffect } from 'react';

interface MissionLabProps {
  onProjectAdded: (projectName: string, htmlContent: string) => void;
}

type ProjectType = 'site' | 'wordpress';
type EditorTab = 'code' | 'css';

const STAGES = {
  site: [
    { id: 1, title: "カフェの簡易紹介ページ", client: "ココモコ店主", desc: "まずは基本！画像を表示させて、メニューを見るボタンを配置したシンプルな1枚ページを作ってね。", hint: "HTMLの <img> タグの 'src' の中身（ダブルクォーテーションの間）に、上部でコピーした長い画像URLを貼り付けましょう。CSSの color や background を変えると文字や背景の色が変わります！", answer: "【HTML回答例】\n<div class=\"card\">\n  <h1>☕ Cafe MoCo</h1>\n  <p>美味しい珈琲の店</p>\n  <img src=\"（ここにコピーしたURL）\" alt=\"カフェ\" />\n  <button class=\"btn\">メニューを見る</button>\n</div>", initialCode: `<div class="card">\n  <h1>☕ Cafe MoCo</h1>\n  <p>美味しい珈琲の店</p>\n  <img src="" alt="カフェ" />\n  <button class="btn">メニュー</button>\n</div>`, initialCss: `.card { background: #1e293b; padding: 20px; text-align: center; border-radius: 8px; }\nh1 { color: #f59e0b; }\nimg { max-width: 100%; border-radius: 4px; }\n.btn { background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }` },
    { id: 2, title: "美容室のLP（ヒーローエリア）", client: "Hair Salon DEAR", desc: "画面いっぱいに広がるおしゃれなメインビジュアルと、キャッチコピー、予約ボタンを作ってください。", hint: "大きなエリアを作るには、CSSで padding を大きめに設定するのがコツです。文字を中央に寄せるには text-align: center; を使いましょう。", answer: "【CSS回答例】\n.hero {\n  background: #2d3748;\n  padding: 80px 20px;\n  text-align: center;\n}", initialCode: `<div class="hero">\n  <h2>なりたい自分に、出会う場所。</h2>\n  <p>完全予約制のプライベートサロン</p>\n  <button class="reserve-btn">WEB予約する</button>\n</div>`, initialCss: `.hero { background: #2d3748; padding: 60px 20px; text-align: center; }\nh2 { font-size: 28px; color: #fff; }\n.reserve-btn { background: #ed64a6; color: #fff; border: none; padding: 12px 24px; border-radius: 50px; cursor: pointer; }` },
    { id: 3, title: "IT企業の採用ミニ特設サイト", client: "株式会社テックリード", desc: "求める人材像（3つのバッジ）を横並び（Flexbox）で配置した採用セクションを作ってください。", hint: "要素を横並びにするCSSは『display: flex;』です。等間隔の隙間は『gap: 15px;』のように指定します。", answer: "【CSS回答例】\n.badges {\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n}", initialCode: `<div class="recruit-box">\n  <h3>求める3つの素質</h3>\n  <div class="badges">\n    <span class="badge">自走力</span>\n    <span class="badge">挑戦心</span>\n    <span class="badge">協調性</span>\n  </div>\n</div>`, initialCss: `.recruit-box { background: #1a202c; padding: 30px; text-align: center; }\n.badges { display: flex; justify-content: center; gap: 15px; margin-top: 20px; }\n.badge { background: #4a5568; color: #63b3ed; padding: 8px 16px; border-radius: 4px; font-weight: bold; }` },
    { id: 4, title: "アパレルブランドの商品一覧", client: "Nostalgia Fashion", desc: "3つの商品を綺麗に横並びにして、ホバーしたときに少し浮き上がる（transform）アニメーションを付けて！", hint: "ホバー時の動きは『.item:hover』に書きます。上に浮かせるには『transform: translateY(-5px);』を使います。", answer: "【CSS回答例】\n.item:hover {\n  transform: translateY(-8px);\n}", initialCode: `<div class="products">\n  <div class="item">👕 T-Shirt</div>\n  <div class="item">🧥 Outer</div>\n  <div class="item">👖 Jeans</div>\n</div>`, initialCss: `.products { display: flex; gap: 20px; }\n.item { flex: 1; background: #2d3748; padding: 40px 10px; text-align: center; border-radius: 8px; transition: transform 0.2s; }\n.item:hover { transform: translateY(-5px); }` },
    { id: 5, title: "ガチの「お問合せフォーム」画面", client: "一般社団法人きずな", desc: "名前、メールアドレスの入力欄と送信ボタンを美しく並べたフォームを作ってね。", hint: "入力欄を縦に並べるには、全体のCSSに『display: flex; flex-direction: column;』を指定します。", answer: "【HTML回答例】\n<input type=\"text\" placeholder=\"お名前を入力\" />", initialCode: `<form class="form">\n  <label>お名前</label>\n  <input type="text" placeholder="山田太郎" />\n  <label>メールアドレス</label>\n  <input type="email" placeholder="example@test.com" />\n  <button type="button">この内容で送信する</button>\n</form>`, initialCss: `.form { background: #f7fafc; color: #2d3748; padding: 25px; border-radius: 8px; display: flex; flex-direction: column; gap: 10px; }\ninput { padding: 8px; border: 1px solid #cbd5e0; border-radius: 4px; }` },
    { id: 6, title: "料金プラン表", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 7, title: "モダンお品書き", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 8, title: "ポートフォリオギャラリー", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 9, title: "ダークモードプロフ", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 10, title: "【最終試練】統合制作", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" }
  ],
  wordpress: [
    { id: 1, title: "ブログタイトルの動的出力", client: "個人タクシー組合", desc: "サイト名と説明文をbloginfoタグを使って裏のデータから引っ張ってきて！", hint: "サイト名は『<?php bloginfo('name'); ?>』、説明文は『<?php bloginfo('description'); ?>』を使います。", answer: "<h1><?php bloginfo('name'); ?></h1>", initialCode: `<div class="wp-header">\n  <h1><?php bloginfo('name'); ?></h1>\n  <p><?php bloginfo('description'); ?></p>\n</div>`, initialCss: `.wp-header { text-align: center; padding: 20px; background: #fff; color: #333; border-bottom: 2px solid #0073aa; }` },
    { id: 2, title: "「メインループの構築」", client: "ガジェットBLOG", desc: "記事がある分だけ自動で繰り返すループ文を正しく書いて記事を表示させてください。", hint: "『if(have_posts()): while(have_posts()): the_post();』で始めて『endwhile; endif;』で閉じます。", answer: "<?php if(have_posts()): while(have_posts()): the_post(); ?>", initialCode: `<?php if(have_posts()): while(have_posts()): the_post(); ?>\n  <article class="post">\n    <h2><?php the_title(); ?></h2>\n  </article>\n<?php endwhile; endif; ?>`, initialCss: `.post { background: #fff; color: #222; padding: 15px; margin-bottom: 10px; border-left: 4px solid #0073aa; }` },
    { id: 3, title: "アイキャッチ画像の自動連動", client: "旅行メディア", desc: "専用のサムネイルタグを組み込もう。", hint: "アイキャッチ出力は『<?php the_post_thumbnail(); ?>』です。", answer: "<?php the_post_thumbnail('medium'); ?>", initialCode: `<div class="blog-card">\n  <h2><?php the_title(); ?></h2>\n  <div class="thumb">\n    <img src="" alt="アイキャッチ" />\n  </div>\n</div>`, initialCss: `.blog-card { background: #fff; padding: 20px; color:#333; }\n.thumb img { max-width: 150px; border-radius: 4px; }` },
    { id: 4, title: "投稿日時のフォーマット変更", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 5, title: "本文の出力と制限", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 6, title: "ナビメニュー配置", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 7, title: "カスタム投稿の呼び出し", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 8, title: "パンくずリスト設置", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 9, title: "条件分岐の出し分け", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" },
    { id: 10, title: "【最終試練】自作テーマ完成", client: "今後のアプデ", desc: "未解放", hint: "", answer: "", initialCode: "", initialCss: "" }
  ]
};

export default function MissionLab({ onProjectAdded }: MissionLabProps) {
  const [projectType, setProjectType] = useState<ProjectType>('site');
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<EditorTab>('code');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [workStatus, setWorkStatus] = useState<'idle' | 'coding' | 'done'>('idle');

  const currentStage = STAGES[projectType][currentStageIdx] || STAGES[projectType];
  const [codeValue, setCodeValue] = useState(currentStage.initialCode || '');
  const [cssValue, setCssValue] = useState(currentStage.initialCss || '');

  useEffect(() => {
    setCodeValue(currentStage.initialCode || '');
    setCssValue(currentStage.initialCss || '');
    setWorkStatus('idle');
    setShowHint(false);
    setShowAnswer(false);
  }, [projectType, currentStageIdx]);

  const renderPreview = () => {
    if (projectType === 'site') return codeValue;
    let rendered = codeValue;
    rendered = rendered.replace(/<\?php bloginfo\('name'\);\s*\?>/g, "☕ カフェ・ココモコ 公式ブログ").replace(/<\?php bloginfo\('description'\);\s*\?>/g, "こだわりの日常");
    return rendered;
  };

  // 入力された文字数に合わせて正確に行番号を計算するロジック
  const getLineNumbers = (text: string) => {
    const lines = text.split('\n').length;
    return Array.from({ length: Math.max(lines, 15) }, (_, i) => i + 1);
  };

  const handleDeliver = () => {
    setWorkStatus('coding');
    setTimeout(() => {
      setWorkStatus('done');
      // 👑 修正完了：onProjectAdded を安全に呼び出し
      if (currentStage && typeof onProjectAdded === 'function') {
        onProjectAdded(
          `[Mission-Stage${currentStage.id}] ${currentStage.title || '無題の課題'}`,
          `<style>${cssValue}</style>${renderPreview()}`
        );
      }
    }, 1800);
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex bg-[#2d2d2d] border border-[#3c3c3c] p-1 rounded w-fit text-xs">
        <button onClick={() => { setProjectType('site'); setCurrentStageIdx(0); }} className={`px-3 py-1 rounded font-bold ${projectType === 'site' ? 'bg-[#0e639c] text-white' : 'text-slate-400'}`}>🌐 HP制作ミッション</button>
        <button onClick={() => { setProjectType('wordpress'); setCurrentStageIdx(0); }} className={`px-3 py-1 rounded font-bold ${projectType === 'wordpress' ? 'bg-[#0073aa] text-white' : 'text-slate-400'}`}>💬 WordPressミッション</button>
      </div>

      <div className="bg-[#252526] border border-[#3c3c3c] p-2 rounded flex gap-1 overflow-x-auto text-xs">
        {STAGES[projectType].map((stage, idx) => (
          <button key={stage.id} onClick={() => setCurrentStageIdx(idx)} className={`px-2.5 py-0.5 rounded font-mono font-bold border ${currentStageIdx === idx ? 'bg-[#37373d] text-cyan-400 border-cyan-500' : 'bg-[#1e1e1e] text-slate-400 border-transparent'}`}>#{stage.id}</button>
        ))}
      </div>

      <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded border-l-4 border-amber-500 space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <div className="font-bold text-white">STAGE {currentStage.id}：{currentStage.title}</div>
          <div className="flex gap-2">
            <button onClick={() => { setShowHint(!showHint); setShowAnswer(false); }} className="px-2 py-0.5 bg-[#252526] text-amber-400 border border-[#3c3c3c] text-[10px] rounded">💡 ヒント</button>
            <button onClick={() => { setShowAnswer(!showAnswer); setShowHint(false); }} className="px-2 py-0.5 bg-[#252526] text-emerald-400 border border-[#3c3c3c] text-[10px] rounded">🔑 答え</button>
          </div>
        </div>
        <p className="text-slate-400 bg-[#252526] p-2 rounded border border-[#2b2b2b]">{currentStage.desc || "後半ステージは修行を進めると解放されます。"}</p>
        {showHint && <div className="bg-amber-950/20 border border-amber-800 p-2 rounded text-amber-200">{currentStage.hint || "コードを確認してみましょう！"}</div>}
        {showAnswer && <div className="bg-emerald-950/20 border border-emerald-800 p-2 rounded text-emerald-200 font-mono whitespace-pre">{currentStage.answer || "このステージの解答は準備中です！"}</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded flex overflow-hidden min-h-[350px]">
          <div className="bg-[#2d2d2d] flex flex-col text-xs text-slate-400 border-r border-[#252526] select-none">
            <button onClick={() => setActiveTab('code')} className={`px-4 py-2 text-left ${activeTab === 'code' ? 'bg-[#1e1e1e] text-amber-400 font-bold' : ''}`}>{projectType === 'site' ? 'index.html' : 'single.php'}</button>
            <button onClick={() => setActiveTab('css')} className={`px-4 py-2 text-left ${activeTab === 'css' ? 'bg-[#1e1e1e] text-cyan-400 font-bold' : ''}`}>style.css</button>
          </div>

          <div className="flex-1 flex font-mono text-xs bg-[#1e1e1e] p-2">
            <div className="w-8 text-right pr-2 text-[#5a5a5a] border-r border-[#2d2d2d] space-y-0.5 leading-relaxed pt-0.5 select-none text-[11px]">
              {getLineNumbers(activeTab === 'code' ? codeValue : cssValue).map((num) => <div key={num}>{num}</div>)}
            </div>
            {activeTab === 'code' ? (
              <textarea value={codeValue} onChange={(e) => setCodeValue(e.target.value)} className="flex-1 bg-transparent text-[#9cdcfe] pl-3 py-0.5 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left overflow-x-auto" style={{ caretColor: '#fff' }} />
            ) : (
              <textarea value={cssValue} onChange={(e) => setCssValue(e.target.value)} className="flex-1 bg-transparent text-[#ce9178] pl-3 py-0.5 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left overflow-x-auto" style={{ caretColor: '#fff' }} />
            )}
          </div>
        </div>

        <div className="bg-[#252526] border border-[#3c3c3c] p-4 rounded flex flex-col justify-between min-h-[350px]">
          <div className="flex-1 flex flex-col">
            <style>{cssValue}</style>
            <div className="flex-1 bg-[#1a1a1a] p-4 rounded border border-[#3c3c3c] text-left overflow-y-auto" dangerouslySetInnerHTML={{ __html: renderPreview() }} />
          </div>
          <button onClick={handleDeliver} className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white text-xs py-2 rounded mt-2 font-bold">{workStatus === 'coding' ? '⏳ 判定中...' : '✔ 課題を提出する'}</button>
        </div>
      </div>
    </div>
  );
}