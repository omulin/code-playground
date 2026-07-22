import { useState, useEffect, useRef } from 'react';

interface MissionLabProps {
  onProjectAdded: (projectName: string, htmlContent: string) => void;
}

type ProjectType = 'site' | 'wordpress';
type EditorTheme = 'vs-dark' | 'onedark' | 'github-dark';

const STAGES = {
  site: [
    { 
      id: 1, 
      title: "🚀 モダンテック・カフェ（LPヘッダー）", 
      client: "ココモコ店主", 
      desc: "ネオンブルーとディープグレーを使った、最先端のサイバーカフェ風ヘッダーカードを作ってみよう！", 
      hint: "HTMLの<img>のsrcに上部で取得した画像URLを貼ると写真が出現します。CSSのbox-shadowを調整してネオンの輝きをカスタマイズしてね！", 
      answer: "【HTML回答例】\n<div class=\"card\">\n  <h1>☕ Cafe MoCo</h1>\n  <p>未来を変える、極上の一杯。</p>\n  <img src=\"（画像URL）\" alt=\"カフェ\" />\n  <button class=\"btn\">メニューを見る</button>\n</div>", 
      initialCode: `<div class="card" data-code-target="card" data-css-target=".card">\n  <span class="tag" data-code-target="tag" data-css-target=".tag">DOCKING SUCCESS</span>\n  <h1 data-code-target="title" data-css-target="h1">☕ Cafe MoCo</h1>\n  <p data-code-target="text" data-css-target="p">最先端の空間で味わう、自家焙煎のハイテック・珈琲。</p>\n  <img src="" alt="カフェ新メニュー" data-code-target="image" data-css-target="img" />\n  <button class="btn" data-code-target="button" data-css-target=".btn">アクセスコードを入力</button>\n</div>`, 
      initialCss: `.card {\n  background: #0f172a;\n  padding: 32px;\n  text-align: center;\n  border-radius: 16px;\n  border: 1px solid #1e293b;\n  box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 15px rgba(14,165,233,0.15);\n}\n\n.tag {\n  background: rgba(14,165,233,0.1);\n  color: #38bdf8;\n  font-size: 10px;\n  font-weight: bold;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n\nh1 {\n  color: #ffffff;\n  font-size: 24px;\n  margin: 12px 0 6px 0;\n}\n\np {\n  color: #94a3b8;\n  font-size: 13px;\n  margin-bottom: 16px;\n  line-height: 1.6;\n}\n\nimg {\n  width: 100%;\n  max-width: 240px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n}\n\n.btn {\n  background: #0ea5e9;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: 0.2s;\n}\n\n.btn:hover {\n  background: #38bdf8;\n  transform: translateY(-2px);\n}` 
    },
    { 
      id: 2, 
      title: "🍡 高級モダン和風（お品書き）", 
      client: "京都 橘庵", 
      desc: "フォントを明朝体（serif）にし、ゴールド調のラインをあしらった気品溢れる和モダン和菓子店のメニューです。", 
      hint: "和風デザインは、余白を広く取り、背景に原色ではなく少し黄みがかった白（生成り色: #fcfaf2）を使うと高級感が出ます。",
      answer: "【CSSデザインのコツ】\nfont-family: serif; を指定すると文字が明朝体になり、一気に京都の老舗感が出ます。",
      initialCode: `<div class="washoku-box" data-code-target="box" data-css-target=".washoku-box">\n  <span class="sub-title" data-code-target="subtitle" data-css-target=".sub-title">📢 季節限定お品書き</span>\n  <h2 data-code-target="title" data-css-target="h2">特選 宇治抹茶大福</h2>\n  <p class="desc" data-code-target="desc" data-css-target=".desc">老舗がこだわり抜いた宇治抹茶を贅沢に練り込んだ濃厚餡。<br>とろける極上のお餅との調和をお楽しみください。</p>\n  <div class="line" data-code-target="line" data-css-target=".line"></div>\n  <div class="price" data-code-target="price" data-css-target=".price">一玉 四五〇円</div>\n</div>`, 
      initialCss: `.washoku-box {\n  background: #fcfaf2;\n  color: #2c2c2c;\n  padding: 30px;\n  border-radius: 4px;\n  border: 1px solid #e2ded0;\n  font-family: serif;\n  text-align: center;\n  box-shadow: 0 4px 20px rgba(0,0,0,0.05);\n}\n\n.sub-title {\n  font-size: 12px;\n  color: #869b74;\n  letter-spacing: 0.1em;\n}\n\nh2 {\n  font-size: 22px;\n  margin: 10px 0;\n  color: #1a2317;\n}\n\n.desc {\n  font-size: 13px;\n  color: #555;\n  line-height: 1.8;\n  text-align: left;\n  margin: 15px 0;\n}\n\n.line {\n  width: 40px;\n  height: 1px;\n  background: #d4af37;\n  margin: 15px auto;\n}\n\n.price {\n  font-size: 16px;\n  font-weight: bold;\n  color: #8c2727;\n}` 
    },
    { 
      id: 3, 
      title: "👕 アパレル・グリッド（商品一覧）", 
      client: "Nostalgia Fashion", 
      desc: "display: grid を使い、今風のアパレルECサイトのような、横並びでホバー時に浮き上がる商品ギャラリーです。", 
      hint: "grid-template-columns: repeat(2, 1fr); を指定することで、画面を綺麗に2等分して要素を並べることができます。",
      answer: "【CSS解説】\ngap: 12px; を入れるだけで、並べた商品ブロックの間に均等な隙間を自動で作ってくれます。",
      initialCode: `<div class="fashion-grid" data-code-target="grid" data-css-target=".fashion-grid">\n  <div class="product-item" data-code-target="item1" data-css-target=".product-item">\n    <div class="img-slot" data-code-target="slot1" data-css-target=".img-slot">👕</div>\n    <h4>Vintage T-Shirt</h4>\n    <p>¥4,900</p>\n  </div>\n  <div class="product-item" data-code-target="item2" data-css-target=".product-item">\n    <div class="img-slot" data-code-target="slot2" data-css-target=".img-slot">🧥</div>\n    <h4>Classic Outer</h4>\n    <p>¥12,800</p>\n  </div>\n</div>`, 
      initialCss: `.fashion-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n}\n\n.product-item {\n  background: #ffffff;\n  color: #1c1917;\n  padding: 16px;\n  border-radius: 8px;\n  border: 1px solid #e7e5e4;\n  text-align: center;\n  transition: all 0.2s;\n}\n\n.product-item:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.1);\n}\n\n.img-slot {\n  background: #f5f5f4;\n  font-size: 32px;\n  padding: 20px 0;\n  border-radius: 6px;\n}` 
    },
    { 
      id: 4, 
      title: "🖤 ミニマルダーク（プロフカード）", 
      client: "個人クリエイター", 
      desc: "無駄な装飾を一切省き、美しい細字と極薄の枠線だけで構成された海外のエンジニアに大人気のデザインです。", 
      hint: "黒（#000000）ではなく、わずかにグレーがかった『#09090b』などを背景に使うと目に優しく高級なダーク感が出ます。",
      answer: "【CSS解説】\nborder: 1px solid #27272a; のようにトーンの低い色で細く囲むのが、ミニマルに見せる極意です。",
      initialCode: `<div class="minimal-card" data-code-target="card" data-css-target=".minimal-card">\n  <div class="icon" data-code-target="icon" data-css-target=".icon">💻</div>\n  <h3 data-code-target="name" data-css-target="h3">YUTO.DEV</h3>\n  <p class="job" data-code-target="job" data-css-target=".job">Front-end Architect</p>\n  <p class="bio" data-code-target="bio" data-css-target=".bio">Less is more.<br>最小限のコードで最大限のパフォーマンスを追求するデジタル職人。</p>\n</div>`, 
      initialCss: `.minimal-card {\n  background: #09090b;\n  color: #fafafa;\n  padding: 30px;\n  border-radius: 12px;\n  border: 1px solid #27272a;\n  text-align: center;\n  max-width: 320px;\n}\n\n.icon {\n  font-size: 28px;\n  margin-bottom: 10px;\n}\n\nh3 {\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: 0.05em;\n}\n\n.job {\n  font-size: 11px;\n  color: #a1a1aa;\n  text-transform: uppercase;\n  margin-bottom: 16px;\n}\n\n.bio {\n  font-size: 12px;\n  color: #71717a;\n  line-height: 1.6;\n  text-align: left;\n}` 
    },
    { 
      id: 5, 
      title: "🌐 統合ランディングページ（LP構造）", 
      client: "TechNext株式会社", 
      desc: "ヘッダー、メインビジュアル、お知らせの3層構造を全て詰め込んだ、本格的なサイト制作の総合練習デザインです。", 
      hint: "構造を分かりやすくするために header, main, section タグで区切っています。それぞれの背景色にメリハリをつけましょう！",
      answer: "【HTMLのコツ】\n実際の現場のコーディングでも、このようにheaderやmainなどの「セクションタグ」を使って全体を組み立てます。",
      initialCode: `<div class="lp-wrapper" data-code-target="wrapper" data-css-target=".lp-wrapper">\n  <header class="lp-head" data-code-target="head" data-css-target=".lp-head">✨ TechNext Project</header>\n  <main class="lp-body" data-code-target="body" data-css-target=".lp-body">\n    <h2 data-code-target="h2" data-css-target="h2">未来のテクノロジーを、あなたの手に。</h2>\n    <p data-code-target="p" data-css-target="p">CodePlaygroundによる完全統合デザインモックアップ。</p>\n  </main>\n  <section class="lp-news" data-code-target="news" data-css-target=".lp-news">\n    <h5>📌 お知らせ</h5>\n    <p>全20ステージのMission Labが完全本実装されました！</p>\n  </section>\n</div>`, 
      initialCss: `.lp-wrapper {\n  background: #111;\n  color: #fff;\n  text-align: center;\n  font-family: sans-serif;\n  border-radius: 12px;\n  overflow: hidden;\n}\n\n.lp-head {\n  background: #1f2937;\n  padding: 12px;\n  font-size: 13px;\n  font-weight: bold;\n}\n\n.lp-body {\n  padding: 40px 20px;\n  background: linear-gradient(180deg, #1f2937, #111827);\n}\n\nh2 {\n  font-size: 20px;\n  color: #38bdf8;\n}\n\n.lp-news {\n  background: #111827;\n  padding: 15px;\n  border-top: 1px solid #1e293b;\n  text-align: left;\n  font-size: 12px;\n  color: #94a3b8;\n}` 
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
      initialCode: `<div class="wp-header" data-code-target="wpheader" data-css-target=".wp-header">\n  <h1 data-code-target="wph1" data-css-target="h1"><?php bloginfo('name'); ?></h1>\n  <p class="desc" data-code-target="wpdesc" data-css-target=".desc"><?php bloginfo('description'); ?></p>\n</div>`, 
      initialCss: `.wp-header {\n  text-align: center;\n  padding: 24px;\n  background: #ffffff;\n  color: #23282d;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.05);\n}\n\nh1 {\n  color: #0073aa;\n  font-size: 24px;\n}\n\n.desc {\n  color: #666;\n  font-size: 13px;\n  margin-top: 4px;\n}` 
    },
    { 
      id: 2, 
      title: "🐘 悪魔の召喚「メインループ」", 
      client: "NEWSサイトマスター", 
      desc: "WordPressテーマ開発の心臓。記事が1件でもある限り、自動で同じデザイン（HTML）を複製して並べ続ける基本ループです。", 
      hint: "if(have_posts()) で記事の有無をチェックし、while(have_posts()) で記事データを順に読み込み、the_post() で中身をセットします。", 
      answer: "【PHPループの鉄板構造】\n<?php if(have_posts()): while(have_posts()): the_post(); ?>\n  （繰り返したいHTML）\n<?php endwhile; endif; ?>", 
      initialCode: `<?php if(have_posts()): while(have_posts()): the_post(); ?>\n  <article class="post-card" data-code-target="card" data-css-target=".post-card">\n    <h2 data-code-target="h2" data-css-target="h2"><?php the_title(); ?></h2>\n    <p class="wp-notice" data-code-target="notice" data-css-target=".wp-notice">📢 裏側のデータベースから動的にマージされました</p>\n  </article>\n<?php endwhile; endif; ?>`, 
      initialCss: `.post-card {\n  background: #ffffff;\n  color: #333;\n  padding: 16px;\n  margin-bottom: 12px;\n  border-radius: 6px;\n  border-left: 5px solid #0073aa;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.02);\n}\n\nh2 {\n  font-size: 18px;\n  color: #23282d;\n}\n\n.wp-notice {\n  font-size: 11px;\n  color: #00a0d2;\n  font-weight: bold;\n  margin-top: 6px;\n}` 
    },
    { 
      id: 3, 
      title: "🐘 アイキャッチ画像（サムネイル）", 
      client: "旅行マガジン", 
      desc: "各ブログ記事に設定されたアイキャッチ画像を、テンプレート上で自動的に呼び出す専用タグの構築です。", 
      hint: "WordPressで投稿に設定されたサムネイル画像を引っ張るコマンドは『<?php the_post_thumbnail(); ?>』です。", 
      answer: "【PHPタグ】\nthe_post_thumbnail('thumbnail') や the_post_thumbnail('medium') で画像サイズを制御できます。", 
      initialCode: `<div class="blog-card" data-code-target="bcard" data-css-target=".blog-card">\n  <h3 data-code-target="h3" data-css-target="h3"><?php the_title(); ?></h3>\n  <div class="wp-thumbnail-area">\n    <div class="mock-img" data-code-target="mock" data-css-target=".mock-img">📸 ATTACHED IMAGE ACTIVE</div>\n  </div>\n</div>`, 
      initialCss: `.blog-card {\n  background: #ffffff;\n  color: #333;\n  padding: 20px;\n  border-radius: 8px;\n}\n\nh3 {\n  font-size: 16px;\n  color: #111;\n  margin-bottom: 10px;\n}\n\n.mock-img {\n  background: #f1f5f9;\n  color: #64748b;\n  font-size: 11px;\n  font-weight: bold;\n  padding: 40px 10px;\n  border-radius: 6px;\n  border: 2px dashed #cbd5e1;\n  text-align: center;\n}` 
    },
    { 
      id: 4, 
      title: "🐘 投稿日時のフォーマット変更", 
      client: "時事ニュース公式", 
      desc: "記事が書かれた日付を「2026年05月17日」のような指定した日本の表記形式で自動出力するカスタマイズです。", 
      hint: "the_time('Y年m月d日') のようにカッコの中にフォーマット文字列を渡すことで、日付の見た目を自由自在に変更できます。", 
      answer: "【日付フォーマット一覧】\nY: 4桁の年, m: 2桁の月, d: 2桁の日（例: 'Y.m.d' ➔ 2026.05.17）", 
      initialCode: `<div class="news-meta" data-code-target="meta" data-css-target=".news-meta">\n  <span class="date-tag" data-code-target="tag" data-css-target=".date-tag">📅 <?php the_time('Y年m月d日'); ?></span>\n  <h4 data-code-target="h4" data-css-target="h4"><?php the_title(); ?></h4>\n</div>`, 
      initialCss: `.news-meta {\n  background: #fff;\n  color: #222;\n  padding: 15px;\n  border-radius: 6px;\n}\n\n.date-tag {\n  font-size: 12px;\n  color: #e11d48;\n  font-weight: bold;\n  background: #fff1f2;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n\nh4 {\n  margin-top: 8px;\n  font-size: 15px;\n}` 
    },
    { 
      id: 5, 
      title: "🐘 本文（the_content）の出力制限", 
      client: "ガジェットレビュー", 
      desc: "管理画面の投稿エディタで書いた、写真や見出しを含んだ「本文のすべて」を丸ごと呼び出す最強のコアタグです。", 
      hint: "本文を表示させるコマンドは『<?php the_content(); ?>』です。これを入れるだけで裏側の全リッチテキストが展開されます。", 
      answer: "【PHP重要タグ】\n<?php the_content(); ?> は、ループ（while文）の中で必ず使用します。", 
      initialCode: `<div class="recipe-entry" data-code-target="recipe" data-css-target=".recipe-entry">\n  <h2 data-code-target="h2" data-css-target="h2"><?php the_title(); ?></h2>\n  <div class="entry-body" data-code-target="body" data-css-target=".entry-body">\n    <?php the_content(); ?>\n  </div>\n</div>`, 
      initialCss: `.recipe-entry {\n  background: #ffffff;\n  color: #333;\n  padding: 24px;\n  border-radius: 8px;\n}\n\nh2 {\n  font-size: 20px;\n  color: #0f172a;\n  border-bottom: 2px solid #cbd5e1;\n  padding-bottom: 8px;\n  margin-bottom: 12px;\n}\n\n.entry-body {\n  line-height: 1.8;\n  color: #334155;\n  font-size: 14px;\n}` 
    }
  ]
};

const THEMES: Record<EditorTheme, { name: string; bg: string; textHtml: string; textCss: string; border: string }> = {
  'vs-dark': { name: 'VS Dark', bg: '#1e1e1e', textHtml: '#9cdcfe', textCss: '#ce9178', border: '#3c3c3c' },
  'onedark': { name: 'One Dark Pro', bg: '#282c34', textHtml: '#e06c75', textCss: '#98c379', border: '#181a1f' },
  'github-dark': { name: 'GitHub Dark', bg: '#0d1117', textHtml: '#79c0ff', textCss: '#ffa657', border: '#30363d' }
};

export default function MissionLab({ onProjectAdded }: MissionLabProps) {
  const [projectType, setProjectType] = useState<ProjectType>('site');
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [workStatus, setWorkStatus] = useState<'idle' | 'coding' | 'done'>('idle');
  const [editorTheme, setEditorTheme] = useState<EditorTheme>('vs-dark');
  const [saveMessage, setSaveMessage] = useState<string>('');

  const [inspectedCodeTarget, setInspectedCodeTarget] = useState<string | null>(null);
  const [inspectedCssTarget, setInspectedCssTarget] = useState<string | null>(null);

  const currentStage = STAGES[projectType][currentStageIdx] || STAGES[projectType];
  const [codeValue, setCodeValue] = useState<string>('');
  const [cssValue, setCssValue] = useState<string>('');

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadStageCode(projectType, currentStageIdx);
  }, [projectType, currentStageIdx]);

  const loadStageCode = (type: ProjectType, stageIdx: number) => {
    const storageKey = `mission_${type}_stage_${stageIdx}`;
    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setCodeValue(parsed.code || '');
        setCssValue(parsed.css || '');
      } catch {
        setCodeValue(STAGES[type][stageIdx].initialCode || '');
        setCssValue(STAGES[type][stageIdx].initialCss || '');
      }
    } else {
      setCodeValue(STAGES[type][stageIdx].initialCode || '');
      setCssValue(STAGES[type][stageIdx].initialCss || '');
    }

    setWorkStatus('idle');
    setShowHint(false);
    setShowAnswer(false);
    setInspectedCodeTarget(null);
    setInspectedCssTarget(null);
  };

  const handleTempSave = () => {
    const storageKey = `mission_${projectType}_stage_${currentStageIdx}`;
    localStorage.setItem(storageKey, JSON.stringify({ code: codeValue, css: cssValue }));
    setSaveMessage('💾 一時保存しました！');
    setTimeout(() => setSaveMessage(''), 2500);
  };

  const handleReset = () => {
    if (window.confirm("このステージのコードを初期状態に戻しますか？（変更内容は消去されます）")) {
      const storageKey = `mission_${projectType}_stage_${currentStageIdx}`;
      localStorage.removeItem(storageKey);
      setCodeValue(currentStage.initialCode || '');
      setCssValue(currentStage.initialCss || '');
      setSaveMessage('🔄 初期状態にリセットしました');
      setTimeout(() => setSaveMessage(''), 2500);
    }
  };

  const handleFormatHtml = () => {
    let indent = 0;
    const formatted = codeValue
      .replace(/>\s*</g, '><')
      .split(/(<\/?[a-z0-9\-]+[^>]*>)/gi)
      .filter(Boolean)
      .map(part => {
        let trimmed = part.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('</') || trimmed.startsWith('?>')) {
          indent = Math.max(0, indent - 1);
        }
        const line = '  '.repeat(indent) + trimmed;
        if (
          trimmed.startsWith('<') && 
          !trimmed.startsWith('</') && 
          !trimmed.endsWith('/>') && 
          !trimmed.startsWith('<!') && 
          !trimmed.startsWith('<?') &&
          !trimmed.includes('</')
        ) {
          indent++;
        }
        return line;
      })
      .filter(line => line.length > 0)
      .join('\n');

    setCodeValue(formatted);
    setSaveMessage('✨ HTML/PHPを綺麗に整形しました！');
    setTimeout(() => setSaveMessage(''), 2500);
  };

  const handleFormatCss = () => {
    const cleaned = cssValue
      .replace(/\s+/g, ' ')
      .replace(/\{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*\}/g, '\n}\n\n')
      .trim();
    setCssValue(cleaned);
    setSaveMessage('✨ CSSを綺麗に整形しました！');
    setTimeout(() => setSaveMessage(''), 2500);
  };

  useEffect(() => {
    const container = previewRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const codeTargetEl = target.closest('[data-code-target]');
      const cssTargetEl = target.closest('[data-css-target]');
      
      if (codeTargetEl) {
        setInspectedCodeTarget(codeTargetEl.getAttribute('data-code-target'));
      } else {
        setInspectedCodeTarget(null);
      }

      if (cssTargetEl) {
        setInspectedCssTarget(cssTargetEl.getAttribute('data-css-target'));
      } else {
        setInspectedCssTarget(null);
      }
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [codeValue, cssValue]);

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
    return Array.from({ length: Math.max(lines, 12) }, (_, i) => i + 1);
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

  const currentTheme = THEMES[editorTheme];

  const isHtmlLineHighlighted = (lineText: string) => {
    if (!inspectedCodeTarget) return false;
    return lineText.includes(`data-code-target="${inspectedCodeTarget}"`);
  };

  const isCssLineHighlighted = (lineText: string) => {
    if (!inspectedCssTarget) return false;
    const trimmed = lineText.trim();
    return trimmed.startsWith(inspectedCssTarget) || trimmed === inspectedCssTarget;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] bg-[#1e1e1e] text-white text-left overflow-hidden p-3 gap-3">
      {/* トップコントロールバー */}
      <div className="flex justify-between items-center flex-wrap gap-2 shrink-0 bg-[#252526] border border-[#3c3c3c] px-4 py-2 rounded">
        <div className="flex items-center gap-3">
          <div className="flex bg-[#2d2d2d] border border-[#3c3c3c] p-0.5 rounded text-xs">
            <button onClick={() => { setProjectType('site'); setCurrentStageIdx(0); }} className={`px-3 py-1 rounded font-bold ${projectType === 'site' ? 'bg-[#0e639c] text-white' : 'text-slate-400'}`}>🌐 WEBバリエーション（全5種）</button>
            <button onClick={() => { setProjectType('wordpress'); setCurrentStageIdx(0); }} className={`px-3 py-1 rounded font-bold ${projectType === 'wordpress' ? 'bg-[#0073aa] text-white' : 'text-slate-400'}`}>💬 WordPress（全5種）</button>
          </div>

          <div className="flex gap-1 overflow-x-auto">
            {STAGES[projectType].map((stage, idx) => (
              <button key={stage.id} onClick={() => setCurrentStageIdx(idx)} className={`px-2 py-0.5 rounded font-mono font-bold text-xs border ${currentStageIdx === idx ? 'bg-[#37373d] text-cyan-400 border-cyan-500' : 'bg-[#1e1e1e] text-slate-400 border-transparent'}`}>#{stage.id}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveMessage && <span className="text-xs text-emerald-400 font-bold animate-pulse">{saveMessage}</span>}
          <button onClick={handleReset} className="bg-[#3a2222] hover:bg-[#4a2e2e] text-rose-300 text-xs px-2.5 py-1 rounded border border-rose-900 font-bold transition cursor-pointer">🔄 初期化</button>
          <button onClick={handleTempSave} className="bg-[#333] hover:bg-[#444] text-slate-200 text-xs px-3 py-1 rounded border border-[#555] font-bold transition cursor-pointer">💾 一時保存</button>
          
          <div className="flex items-center gap-1.5 bg-[#1e1e1e] border border-[#3c3c3c] px-2 py-1 rounded text-xs ml-2">
            <span className="text-slate-400 text-[10px] font-bold">🎨 テーマ:</span>
            {(Object.keys(THEMES) as EditorTheme[]).map((key) => (
              <button key={key} onClick={() => setEditorTheme(key)} className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${editorTheme === key ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-[#333]'}`}>{THEMES[key].name}</button>
            ))}
          </div>
        </div>
      </div>

      {/* 横3列（スリーカラム）のメインレイアウト */}
      <div className="flex-1 flex gap-3 overflow-hidden">
        
        {/* 1列目：解説・ヒント・正解例（28%） */}
        <div className="w-[28%] bg-[#252526] border border-[#3c3c3c] rounded p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3">
            <div className="border-l-4 border-amber-500 pl-3">
              <span className="text-[10px] bg-amber-950/80 text-amber-300 px-1.5 py-0.5 rounded font-bold">STAGE {currentStage.id}</span>
              <h2 className="text-sm font-black text-white mt-1">{currentStage.title}</h2>
              <p className="text-[11px] text-slate-400 mt-1">Client: {currentStage.client}</p>
            </div>

            <p className="text-[11px] text-slate-300 bg-[#1e1e1e] p-3 rounded border border-[#333] leading-relaxed">{currentStage.desc}</p>

            <div className="flex gap-2">
              <button onClick={() => { setShowHint(!showHint); setShowAnswer(false); }} className="flex-1 py-1.5 bg-[#1e1e1e] hover:bg-[#333] text-amber-400 border border-[#3c3c3c] text-[11px] rounded font-bold">💡 ヒント</button>
              <button onClick={() => { setShowAnswer(!showAnswer); setShowHint(false); }} className="flex-1 py-1.5 bg-[#1e1e1e] hover:bg-[#333] text-emerald-400 border border-[#3c3c3c] text-[11px] rounded font-bold">🔑 正解例</button>
            </div>

            {showHint && <div className="bg-amber-950/30 border border-amber-800 p-3 rounded text-[11px] text-amber-200 leading-relaxed">{currentStage.hint}</div>}
            {showAnswer && <div className="bg-emerald-950/30 border border-emerald-800 p-3 rounded text-[10px] text-emerald-200 font-mono whitespace-pre overflow-x-auto">{currentStage.answer}</div>}
          </div>

          <div className="pt-3 border-t border-[#3c3c3c] shrink-0">
            <button onClick={handleDeliver} className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white text-xs py-2.5 rounded font-bold cursor-pointer shadow-lg transition">
              {workStatus === 'coding' ? '⏳ 判定中...' : '✔ このコードを提出する'}
            </button>
          </div>
        </div>

        {/* 2列目：コードエディタ（HTML ＆ CSS上下分割）（42%） */}
        <div className="w-[42%] flex flex-col gap-3 overflow-hidden">
          
          {/* HTMLエディタ */}
          <div className="flex-1 border rounded flex flex-col overflow-hidden" style={{ backgroundColor: currentTheme.bg, borderColor: inspectedCodeTarget ? '#f59e0b' : currentTheme.border }}>
            <div className="bg-[#2d2d2d] text-xs text-amber-400 font-bold px-3 py-1.5 border-b border-[#252526] flex justify-between items-center shrink-0">
              <span className="text-[11px]">{projectType === 'site' ? '🌐 index.html' : '💬 single.php'}</span>
              <button onClick={handleFormatHtml} className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-amber-300 text-[10px] px-2 py-0.5 rounded border border-[#555] font-bold transition">🧹 整形</button>
            </div>
            
            {/* 👑 エディタ全体で一緒にスクロールする構造に変更 */}
            <div className="flex-1 flex font-mono text-xs overflow-auto relative" style={{ backgroundColor: currentTheme.bg }}>
              <div className="w-8 shrink-0 text-right pr-2 text-[#5a5a5a] border-r border-[#2d2d2d] select-text text-[10px] py-2 bg-[#252526]/30">
                {getLineNumbers(codeValue).map((num) => (
                  <div key={num} className={isHtmlLineHighlighted(codeValue.split('\n')[num - 1] || '') ? "bg-amber-500/40 text-amber-200 font-bold rounded" : ""}>{num}</div>
                ))}
              </div>
              <textarea 
                value={codeValue} 
                onChange={(e) => setCodeValue(e.target.value)} 
                className="flex-1 bg-transparent pl-3 py-2 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left select-text text-[11px]" 
                style={{ color: currentTheme.textHtml, caretColor: '#fff' }} 
              />
            </div>
          </div>

          {/* CSSエディタ */}
          <div className="flex-1 border rounded flex flex-col overflow-hidden" style={{ backgroundColor: currentTheme.bg, borderColor: inspectedCssTarget ? '#06b6d4' : currentTheme.border }}>
            <div className="bg-[#2d2d2d] text-xs text-cyan-400 font-bold px-3 py-1.5 border-b border-[#252526] flex justify-between items-center shrink-0">
              <span className="text-[11px]">📘 style.css</span>
              <button onClick={handleFormatCss} className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-cyan-300 text-[10px] px-2 py-0.5 rounded border border-[#555] font-bold transition">🧹 整形</button>
            </div>

            {/* 👑 エディタ全体で一緒にスクロールする構造に変更 */}
            <div className="flex-1 flex font-mono text-xs overflow-auto relative" style={{ backgroundColor: currentTheme.bg }}>
              <div className="w-8 shrink-0 text-right pr-2 text-[#5a5a5a] border-r border-[#2d2d2d] select-text text-[10px] py-2 bg-[#252526]/30">
                {getLineNumbers(cssValue).map((num) => (
                  <div key={num} className={isCssLineHighlighted(cssValue.split('\n')[num - 1] || '') ? "bg-cyan-500/40 text-cyan-200 font-bold rounded" : ""}>{num}</div>
                ))}
              </div>
              <textarea 
                value={cssValue} 
                onChange={(e) => setCssValue(e.target.value)} 
                className="flex-1 bg-transparent pl-3 py-2 w-full h-full outline-none resize-none leading-relaxed font-mono whitespace-pre text-left select-text text-[11px]" 
                style={{ color: currentTheme.textCss, caretColor: '#fff' }} 
              />
            </div>
          </div>

        </div>

        {/* 3列目：リアルタイムプレビュー（30%） */}
        <div className="w-[30%] bg-[#252526] border border-[#3c3c3c] rounded p-3 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-2 text-xs shrink-0 px-1">
            <span className="text-indigo-400 font-bold text-[11px]">🖥️ LIVE PREVIEW</span>
            {(inspectedCodeTarget || inspectedCssTarget) && (
              <button onClick={() => { setInspectedCodeTarget(null); setInspectedCssTarget(null); }} className="text-[9px] bg-amber-600 text-white px-2 py-0.5 rounded font-bold cursor-pointer">✕ 選択解除</button>
            )}
          </div>

          <div className="flex-1 flex flex-col overflow-hidden bg-[#1a1a1a] rounded border border-[#3c3c3c] p-4 relative">
            <style>{`
              [data-code-target], [data-css-target] {
                cursor: pointer;
                transition: outline 0.15s ease, background-color 0.15s ease;
              }
              [data-code-target]:hover, [data-css-target]:hover {
                outline: 2px dashed #06b6d4 !important;
                outline-offset: 4px;
                background-color: rgba(6, 182, 212, 0.08);
              }
              ${cssValue}
            `}</style>
            
            <div ref={previewRef} className="flex-1 text-left overflow-y-auto select-text">
              <div dangerouslySetInnerHTML={{ __html: renderPreview() }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}