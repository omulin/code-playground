import { useState, useEffect } from 'react';

interface MissionLabProps {
  onProjectAdded: (projectName: string, htmlContent: string) => void;
}

type ProjectType = 'site' | 'wordpress';
type EditorTab = 'code' | 'css';

const STAGES = {
  site: [
    { 
      id: 1, 
      title: "🚀 モダンテック・カフェ（LPヘッダー）", 
      client: "ココモコ店主", 
      desc: "ネオンブルーとディープグレーを使った、最先端のサイバーカフェ風ヘッダーカードを作ってみよう！", 
      hint: "HTMLの<img>のsrcに上部で取得した画像URLを貼ると写真が出現します。CSSのbox-shadowを調整してネオンの輝きをカスタマイズしてね！", 
      answer: "【HTML回答例】\n<div class=\"card\">\n  <h1>☕ Cafe MoCo</h1>\n  <p>未来を変える、極上の一杯。</p>\n  <img src=\"（画像URL）\" alt=\"カフェ\" />\n  <button class=\"btn\">メニューを見る</button>\n</div>", 
      initialCode: `<div class="card">\n  <span class="tag">DOCKING SUCCESS</span>\n  <h1>☕ Cafe MoCo</h1>\n  <p>最先端の空間で味わう、自家焙煎のハイテック・珈琲。</p>\n  <img src="" alt="カフェ新メニュー" />\n  <button class="btn">アクセスコードを入力</button>\n</div>`, 
      initialCss: `.card { \n  background: #0f172a; \n  padding: 32px; \n  text-align: center; \n  border-radius: 16px; \n  border: 1px solid #1e293b;\n  box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 15px rgba(14,165,233,0.15);\n}\n.tag { background: rgba(14,165,233,0.1); color: #38bdf8; font-size: 10px; font-weight: bold; padding: 4px 8px; border-radius: 4px; }\nh1 { color: #ffffff; font-size: 24px; margin: 12px 0 6px 0; }\np { color: #94a3b8; font-size: 13px; margin-bottom: 16px; }\nimg { width: 100%; max-width: 240px; border-radius: 8px; margin-bottom: 16px; }\n.btn { background: #0ea5e9; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; }\n.btn:hover { background: #38bdf8; transform: translateY(-2px); }` 
    },
    { 
      id: 2, 
      title: "🍡 高級モダン和風（お品書き）", 
      client: "京都 橘庵", 
      desc: "フォントを明朝体（serif）にし、ゴールド調のラインをあしらった気品溢れる和モダン和菓子店のメニューです。", 
      hint: "和風デザインは、余白を広く取り、背景に原色ではなく少し黄みがかった白（生成り色: #fcfaf2）を使うと高級感が出ます。",
      answer: "【CSSデザインのコツ】\nfont-family: serif; を指定すると文字が明朝体になり、一気に京都の老舗感が出ます。",
      initialCode: `<div class="washoku-box">\n  <span class="sub-title">📢 季節限定お品書き</span>\n  <h2>特選 宇治抹茶大福</h2>\n  <p class="desc">老舗がこだわり抜いた宇治抹茶を贅沢に練り込んだ濃厚餡。とろける極上のお餅との調和をお楽しみください。</p>\n  <div class="line"></div>\n  <div class="price">一玉 四五〇円</div>\n</div>`, 
      initialCss: `.washoku-box { \n  background: #fcfaf2; \n  color: #2c2c2c; \n  padding: 30px; \n  border-radius: 4px; \n  border: 1px solid #e2ded0; \n  font-family: serif; \n  text-align: center; \n  box-shadow: 0 4px 20px rgba(0,0,0,0.05);\n}\n.sub-title { font-size: 12px; color: #869b74; letter-spacing: 0.1em; }\nh2 { font-size: 22px; margin: 10px 0; color: #1a2317; }\n.desc { font-size: 13px; color: #555; line-height: 1.8; text-align: left; margin: 15px 0; }\n.line { width: 40px; height: 1px; background: #d4af37; margin: 15px auto; }\n.price { font-size: 16px; font-weight: bold; color: #8c2727; }` 
    },
    { 
      id: 3, 
      title: "👕 アパレル・グリッド（商品一覧）", 
      client: "Nostalgia Fashion", 
      desc: "display: grid を使い、今風のアパレルECサイトのような、横並びでホバー時に浮き上がる商品ギャラリーです。", 
      hint: "grid-template-columns: repeat(2, 1fr); を指定することで、画面を綺麗に2等分して要素を並べることができます。",
      answer: "【CSS解説】\ngap: 12px; を入れるだけで、並べた商品ブロックの間に均等な隙間を自動で作ってくれます。",
      initialCode: `<div class="fashion-grid">\n  <div class="product-item">\n    <div class="img-slot">👕</div>\n    <h4>Vintage T-Shirt</h4>\n    <p>¥4,900</p>\n  </div>\n  <div class="product-item">\n    <div class="img-slot">🧥</div>\n    <h4>Classic Outer</h4>\n    <p>¥12,800</p>\n  </div>\n</div>`, 
      initialCss: `.fashion-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n}\n.product-item {\n  background: #ffffff;\n  color: #1c1917;\n  padding: 16px;\n  border-radius: 8px;\n  border: 1px solid #e7e5e4;\n  text-align: center;\n  transition: all 0.2s;\n}\n.product-item:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.1);\n}\n.img-slot { background: #f5f5f4; font-size: 32px; padding: 20px 0; border-radius: 6px; }` 
    },
    { 
      id: 4, 
      title: "🖤 ミニマルダーク（プロフカード）", 
      client: "個人クリエイター", 
      desc: "無駄な装飾を一切省き、美しい細字と極薄の枠線だけで構成された海外のエンジニアに大人気のデザインです。", 
      hint: "黒（#000000）ではなく、わずかにグレーがかった『#09090b』などを背景に使うと目に優しく高級なダーク感が出ます。",
      answer: "【CSS解説】\nborder: 1px solid #27272a; のようにトーンの低い色で細く囲むのが、ミニマルに見せる極意です。",
      initialCode: `<div class="minimal-card">\n  <div class="icon">💻</div>\n  <h3>YUTO.DEV</h3>\n  <p class="job">Front-end Architect</p>\n  <p class="bio">Less is more. 最小限のコードで最大限のパフォーマンスを追求するデジタル職人。</p>\n</div>`, 
      initialCss: `.minimal-card {\n  background: #09090b;\n  color: #fafafa;\n  padding: 30px;\n  border-radius: 12px;\n  border: 1px solid #27272a;\n  text-align: center;\n  max-width: 320px;\n}\n.icon { font-size: 28px; margin-bottom: 10px; }\nh3 { font-size: 20px; font-weight: 500; letter-spacing: 0.05em; }\n.job { font-size: 11px; color: #a1a1aa; text-transform: uppercase; margin-bottom: 16px; }\n.bio { font-size: 12px; color: #71717a; line-height: 1.6; text-align: left; }` 
    },
    { 
      id: 5, 
      title: "🌐 統合ランディングページ（LP構造）", 
      client: "TechNext株式会社", 
      desc: "ヘッダー、メインビジュアル、お知らせの3層構造を全て詰め込んだ、本格的なサイト制作の総合練習デザインです。", 
      hint: "構造を分かりやすくするために header, main, section タグで区切っています。それぞれの背景色にメリハリをつけましょう！",
      answer: "【HTMLのコツ】\n実際の現場のコーディングでも、このようにheaderやmainなどの「セクションタグ」を使って全体を組み立てます。",
      initialCode: `<div class="lp-wrapper">\n  <header class="lp-head">✨ TechNext Project</header>\n  <main class="lp-body">\n    <h2>未来のテクノロジーを、あなたの手に。</h2>\n    <p>CodePlaygroundによる完全統合デザインモックアップ。</p>\n  </main>\n  <section class="lp-news">\n    <h5>📌 お知らせ</h5>\n    <p>全20ステージのMission Labが完全本実装されました！</p>\n  </section>\n</div>`, 
      initialCss: `.lp-wrapper { background: #111; color: #fff; text-align: center; font-family: sans-serif; border-radius: 12px; overflow: hidden; }\n.lp-head { background: #1f2937; padding: 12px; font-size: 13px; font-weight: bold; }\n.lp-body { padding: 40px 20px; background: linear-gradient(180deg, #1f2937, #111827); }\nh2 { font-size: 20px; color: #38bdf8; }\n.lp-news { background: #111827; padding: 15px; border-top: 1px solid #1e293b; text-align: left; font-size: 12px; color: #94a3b8; }` 
    }
  ],
  wordpress: [
    { 
      id: 1, 
      title: "🐘 サイト基本情報の出力", 
      client: "ブログ運営者", 
      desc: "WordPressで最も使用する、データベースから「サイトのタイトル」と「キャッチフレーズ」を動的に引っ張ってくるテンプレートタグです。", 
      hint: "bloginfo()の中に 'name' や 'description' を指定すると、管理画面で設定した文言が自動的にHTMLへ注入されます。", 
      answer: "【PHP呪文】\n<?php bloginfo('name'); ?> ➔ サイトタイトル出力\n<?php bloginfo('description'); ?> ➔ 説明文出力", 
      initialCode: `<div class="wp-header">\n  \n  <h1><?php bloginfo('name'); ?></h1>\n  \n  <p class="desc"><?php bloginfo('description'); ?></p>\n</div>`, 
      initialCss: `.wp-header { text-align: center; padding: 24px; background: #ffffff; color: #23282d; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }\nh1 { color: #0073aa; font-size: 24px; }\n.desc { color: #666; font-size: 13px; margin-top: 4px; }` 
    },
    { 
      id: 2, 
      title: "🐘 悪魔の召喚「メインループ」", 
      client: "NEWSサイトマスター", 
      desc: "WordPressテーマ開発の心臓。記事が1件でもある限り、自動で同じデザイン（HTML）を複製して並べ続ける基本ループです。", 
      hint: "if(have_posts()) で記事の有無をチェックし、while(have_posts()) で記事データを順に読み込み、the_post() で中身をセットします。", 
      answer: "【PHPループの鉄板構造】\n<?php if(have_posts()): while(have_posts()): the_post(); ?>\n  （繰り返したいHTML）\n<?php endwhile; endif; ?>", 
      initialCode: `\n<?php if(have_posts()): while(have_posts()): the_post(); ?>\n  <article class="post-card">\n    <h2><?php the_title(); ?></h2>\n    <p class="wp-notice">📢 裏側のデータベースから動的にマージされました</p>\n  </article>\n<?php endwhile; endif; ?>`, 
      initialCss: `.post-card { background: #ffffff; color: #333; padding: 16px; margin-bottom: 12px; border-radius: 6px; border-left: 5px solid #0073aa; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }\nh2 { font-size: 18px; color: #23282d; }\n.wp-notice { font-size: 11px; color: #00a0d2; font-weight: bold; margin-top: 6px; }` 
    },
    { 
      id: 3, 
      title: "🐘 アイキャッチ画像（サムネイル）", 
      client: "旅行マガジン", 
      desc: "各ブログ記事に設定されたアイキャッチ画像を、テンプレート上で自動的に呼び出す専用タグの構築です。", 
      hint: "WordPressで投稿に設定されたサムネイル画像を引っ張るコマンドは『<?php the_post_thumbnail(); ?>』です。", 
      answer: "【PHPタグ】\nthe_post_thumbnail('thumbnail') や the_post_thumbnail('medium') で画像サイズを制御できます。", 
      initialCode: `<div class="blog-card">\n  <h3><?php the_title(); ?></h3>\n  <div class="wp-thumbnail-area">\n    \n    <div class="mock-img">📸 ATTACHED IMAGE ACTIVE</div>\n  </div>\n</div>`, 
      initialCss: `.blog-card { background: #ffffff; color: #333; padding: 20px; border-radius: 8px; }\nh3 { font-size: 16px; color: #111; margin-bottom: 10px; }\n.mock-img { background: #f1f5f9; color: #64748b; font-size: 11px; font-weight: bold; padding: 40px 10px; border-radius: 6px; border: 2px dashed #cbd5e1; text-align: center; }` 
    },
    { 
      id: 4, 
      title: "🐘 投稿日時のフォーマット変更", 
      client: "時事ニュース公式", 
      desc: "記事が書かれた日付を「2026年05月17日」のような指定した日本の表記形式で自動出力するカスタマイズです。", 
      hint: "the_time('Y年m月d日') のようにカッコの中にフォーマット文字列を渡すことで、日付の見た目を自由自在に変更できます。", 
      answer: "【日付フォーマット一覧】\nY: 4桁の年, m: 2桁の月, d: 2桁の日（例: 'Y.m.d' ➔ 2026.05.17）", 
      initialCode: `<div class="news-meta">\n  \n  <span class="date-tag">📅 <?php the_time('Y年m月d日'); ?></span>\n  <h4><?php the_title(); ?></h4>\n</div>`, 
      initialCss: `.news-meta { background: #fff; color: #222; padding: 15px; border-radius: 6px; }\n.date-tag { font-size: 12px; color: #e11d48; font-weight: bold; background: #fff1f2; padding: 2px 6px; border-radius: 4px; }\nh4 { margin-top: 8px; font-size: 15px; }` 
    },
    { 
      id: 5, 
      title: "🐘 本文（the_content）の出力制限", 
      client: "ガジェットレビュー", 
      desc: "管理画面の投稿エディタで書いた、写真や見出しを含んだ「本文のすべて」を丸ごと呼び出す最強のコアタグです。", 
      hint: "本文を表示させるコマンドは『<?php the_content(); ?>』です。これを入れるだけで裏側の全リッチテキストが展開されます。", 
      answer: "【PHP重要タグ】\n<?php the_content(); ?> は、ループ（while文）の中で必ず使用します。", 
      initialCode: `<div class="recipe-entry">\n  <h2><?php the_title(); ?></h2>\n  <div class="entry-body">\n    \n    <?php the_content(); ?>\n  </div>\n</div>`, 
      initialCss: `.recipe-entry { background: #ffffff; color: #333; padding: 24px; border-radius: 8px; }\nh2 { font-size: 20px; color: #0f172a; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 12px; }\n.entry-body { line-height: 1.8; color: #334155; font-size: 14px; }` 
    }
  ]
};

export default function MissionLab({ onProjectAdded }: MissionLabProps) {
  const [projectType, setProjectType] = useState<ProjectType>('site');
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<EditorTab>('code');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [workStatus, setWorkStatus] = useState<'idle' | 'coding' | 'done'>('idle');

  // ステージ数が減ったときのための安全ガード
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
    rendered = rendered.replace(/<\?php if\(have_posts\(\)\): while\(have_posts\(\)\): the_post\(\);\s*\?>/g, "");
    rendered = rendered.replace(/<\?php the_title\(\);\s*\?>/g, "本日のおすすめ：至高のカフェラテとショコラ");
    rendered = rendered.replace(/<\?php the_time\('Y\.m\.d'\);\s*\?>/g, "2026.05.17");
    rendered = rendered.replace(/<\?php the_time\('Y年m月d日'\);\s*\?>/g, "2026年05月17日");
    rendered = rendered.replace(/<\?php the_content\(\);\s*\?>/g, "厳選したアラビカ種の豆を深煎りし、濃厚なミルクと合わせました。一口飲むたびに広がる香ばしさをぜひお楽しみください。大人気クロワッサンとの相性も抜群です！");
    rendered = rendered.replace(/<\?php endwhile; endif;\s*\?>/g, "");
    return rendered;
  };

  const getLineNumbers = (text: string) => {
    const lines = text.split('\n').length;
    return Array.from({ length: Math.max(lines, 14) }, (_, i) => i + 1);
  };

  const handleDeliver = () => {
    setWorkStatus('coding');
    setTimeout(() => {
      setWorkStatus('done');
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
        <button onClick={() => { setProjectType('site'); setCurrentStageIdx(0); }} className={`px-3 py-1 rounded font-bold ${projectType === 'site' ? 'bg-[#0e639c] text-white' : 'text-slate-400'}`}>🌐 WEBバリエーション（全5種）</button>
        <button onClick={() => { setProjectType('wordpress'); setCurrentStageIdx(0); }} className={`px-3 py-1 rounded font-bold ${projectType === 'wordpress' ? 'bg-[#0073aa] text-white' : 'text-slate-400'}`}>💬 WordPressテーマ関数（全5種）</button>
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
            <button onClick={() => { setShowHint(!showHint); setShowAnswer(false); }} className="px-2 py-0.5 bg-[#252526] text-amber-400 border border-[#3c3c3c] text-[10px] rounded">💡 ヒント・解説</button>
            <button onClick={() => { setShowAnswer(!showAnswer); setShowHint(false); }} className="px-2 py-0.5 bg-[#252526] text-emerald-400 border border-[#3c3c3c] text-[10px] rounded">🔑 正解コード例</button>
          </div>
        </div>
        <p className="text-slate-400 bg-[#252526] p-2 rounded border border-[#2b2b2b]">{currentStage.desc}</p>
        {showHint && <div className="bg-amber-950/20 border border-amber-800 p-2 rounded text-amber-200">{currentStage.hint}</div>}
        {showAnswer && <div className="bg-emerald-950/20 border border-emerald-800 p-2 rounded text-emerald-200 font-mono whitespace-pre">{currentStage.answer}</div>}
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
          <button onClick={handleDeliver} className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white text-xs py-2 rounded mt-2 font-bold">{workStatus === 'coding' ? '⏳ 判定中...' : '✔ このバリエーションのコードを提出する'}</button>
        </div>
      </div>
    </div>
  );
}