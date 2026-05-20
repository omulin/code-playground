import { useState, useEffect } from 'react';

// --- 1. WordPress写経レッスンの設計図 ---
interface WpLesson {
  id: number;
  title: string;
  description: string;
  fileName: string;
  code: string;
}

const WP_LESSONS: WpLesson[] = [
  {
    id: 1,
    title: "Step 1: 固定ページの作成",
    description: "まずは右パネルのボタンからWordPressを起動します。画面上部の黒いバーにある「＋ 新規」から「固定ページ」を開き、タイトルに『次世代LPプロジェクト』と入力してください。",
    fileName: "操作マニュアル 1",
    code: "/* \n【ミッション】\n1. 別タブでWPを開く\n2. 「＋ 新規」＞「固定ページ」を作成\n3. タイトルに「次世代LPプロジェクト」と入力\n\n※このステップはコピペ不要です！右の画面を操作してください。\n*/"
  },
  {
    id: 2,
    title: "Step 2: 【ノーコード】画像の挿入",
    description: "まずはWordPressの標準機能（ノーコード）の力を体験します！本文エリアの「＋」ボタンから『画像』ブロックを選び、「メディアライブラリ」から適当な画像を1枚選んで（またはPCからアップロードして）ページの一番上に配置してください。",
    fileName: "操作マニュアル 2",
    code: "/* \n【ミッション】\n1. 「＋」ボタンから『画像』ブロックを追加\n2. 好きな画像をページに配置する\n\nWordPress最大の強みである「直感的なメディア管理」を\nここで体験しておきましょう！\n*/"
  },
  {
    id: 3,
    title: "Step 3: 「カスタムHTML」の召喚",
    description: "画像の配置が終わったら、その画像の「下」に新しいブロックを追加します。「＋」ボタンを押し、検索窓に「html」と入力して『カスタムHTML』ブロックを呼び出してください。ここからがエンジニアの領域です！",
    fileName: "操作マニュアル 3",
    code: "/* \n【ミッション】\n1. 配置した画像の下に『カスタムHTML』ブロックを追加\n\nここからは「コピーして上書き」の連続で、\n一気にサイトを組み上げていきます！\n*/"
  },
  {
    id: 4,
    title: "Step 4: ヒーローセクション（骨組み）",
    description: "カスタムHTMLの中に、サイトの顔となる「ヒーローセクション」のHTMLを書きます。以下のコードをコピーして貼り付けてください。（※ブロック上部の「プレビュー」を押すと確認できます！）",
    fileName: "カスタムHTML",
    code: "<div class=\"lp-wrapper\">\n  \n  <section class=\"hero\">\n    <h1 class=\"hero-title\">次世代の学習体験を。</h1>\n    <p class=\"hero-sub\">コードを書きながら、実務のスキルを身につけよう。</p>\n    <a href=\"#pricing\" class=\"btn-primary\">今すぐ始める</a>\n  </section>\n</div>"
  },
  {
    id: 5,
    title: "Step 5: ヒーローセクション（デザイン）",
    description: "先ほどのコードを【全選択して消去（Ctrl+A ➔ Delete）】し、以下のコードに上書きしてください！一番上に `<style>` タグを追加し、背景に美しいグラデーションをかけました。",
    fileName: "カスタムHTML (上書き)",
    code: "<style>\n  /* ★ 追加: サイト全体の基本フォントと、ヒーロー画面の美しいグラデーション */\n  .lp-wrapper { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; }\n  .hero { \n    background: linear-gradient(135deg, #4f46e5, #0ea5e9); \n    color: white; padding: 120px 20px; text-align: center; \n    border-radius: 0 0 50px 50px; \n  }\n  .hero-title { font-size: 3rem; font-weight: 800; margin-bottom: 10px; color: white; }\n  .hero-sub { font-size: 1.2rem; opacity: 0.9; margin-bottom: 30px; }\n</style>\n\n<div class=\"lp-wrapper\">\n  <section class=\"hero\">\n    <h1 class=\"hero-title\">次世代の学習体験を。</h1>\n    <p class=\"hero-sub\">コードを書きながら、実務のスキルを身につけよう。</p>\n    <a href=\"#pricing\" class=\"btn-primary\">今すぐ始める</a>\n  </section>\n</div>"
  },
  {
    id: 6,
    title: "Step 6: 特徴セクション（骨組み）",
    description: "ふたたび【全選択して上書き】します。ヒーロー画面の下に、プロダクトの強みを伝える「選ばれる3つの理由」のHTMLを追加しました。",
    fileName: "カスタムHTML (上書き)",
    code: "<style>\n  .lp-wrapper { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; }\n  .hero { background: linear-gradient(135deg, #4f46e5, #0ea5e9); color: white; padding: 120px 20px; text-align: center; border-radius: 0 0 50px 50px; }\n  .hero-title { font-size: 3rem; font-weight: 800; margin-bottom: 10px; color: white; }\n  .hero-sub { font-size: 1.2rem; opacity: 0.9; margin-bottom: 30px; }\n</style>\n\n<div class=\"lp-wrapper\">\n  <section class=\"hero\">\n    <h1 class=\"hero-title\">次世代の学習体験を。</h1>\n    <p class=\"hero-sub\">コードを書きながら、実務のスキルを身につけよう。</p>\n    <a href=\"#pricing\" class=\"btn-primary\">今すぐ始める</a>\n  </section>\n\n  \n  <section class=\"features\">\n    <h2 class=\"section-title\">選ばれる3つの理由</h2>\n    <div class=\"feature-grid\">\n      <div class=\"feature-card\"><h3>🚀 爆速環境</h3><p>ブラウザだけで動く最強の環境</p></div>\n      <div class=\"feature-card\"><h3>💻 実務直結</h3><p>実際の現場と同じワークフロー</p></div>\n      <div class=\"feature-card\"><h3>🔥 楽しい</h3><p>ゲーム感覚でサクサク進める</p></div>\n    </div>\n  </section>\n</div>"
  },
  {
    id: 7,
    title: "Step 7: 特徴セクション（CSSグリッド）",
    description: "【全選択して上書き】します。特徴セクションが縦に並んでいてダサいので、CSSの `display: flex;` を使って横並びの美しいカード型デザインに進化させます！",
    fileName: "カスタムHTML (上書き)",
    code: "<style>\n  .lp-wrapper { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; }\n  .hero { background: linear-gradient(135deg, #4f46e5, #0ea5e9); color: white; padding: 120px 20px; text-align: center; border-radius: 0 0 50px 50px; }\n  .hero-title { font-size: 3rem; font-weight: 800; margin-bottom: 10px; color: white; }\n  .hero-sub { font-size: 1.2rem; opacity: 0.9; margin-bottom: 30px; }\n  /* ★ 追加: Flexboxでカードを横並びにし、ホバーで浮き上がるアニメーションを追加 */\n  .features { padding: 80px 20px; background: #f8fafc; text-align: center; }\n  .section-title { font-size: 2rem; margin-bottom: 40px; color: #1e293b; font-weight: bold; }\n  .feature-grid { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }\n  .feature-card { background: white; padding: 30px; border-radius: 15px; width: 280px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); transition: 0.3s; }\n  .feature-card:hover { transform: translateY(-10px); }\n  .feature-card h3 { color: #4f46e5; margin-bottom: 10px; }\n</style>\n\n<div class=\"lp-wrapper\">\n  <section class=\"hero\">\n    <h1 class=\"hero-title\">次世代の学習体験を。</h1>\n    <p class=\"hero-sub\">コードを書きながら、実務のスキルを身につけよう。</p>\n    <a href=\"#pricing\" class=\"btn-primary\">今すぐ始める</a>\n  </section>\n\n  <section class=\"features\">\n    <h2 class=\"section-title\">選ばれる3つの理由</h2>\n    <div class=\"feature-grid\">\n      <div class=\"feature-card\"><h3>🚀 爆速環境</h3><p>ブラウザだけで動く最強の環境</p></div>\n      <div class=\"feature-card\"><h3>💻 実務直結</h3><p>実際の現場と同じワークフロー</p></div>\n      <div class=\"feature-card\"><h3>🔥 楽しい</h3><p>ゲーム感覚でサクサク進める</p></div>\n    </div>\n  </section>\n</div>"
  },
  {
    id: 8,
    title: "Step 8: 料金表セクション（HTML＆CSS）",
    description: "【全選択して上書き】します。LPの核となる「料金表（Pricing）」と、美しいボタンの装飾CSSを追加しました。これで見た目上のHTML/CSSはほぼ完成形になります！",
    fileName: "カスタムHTML (上書き)",
    code: "<style>\n  /* CSSはStep 7のまま保持されています */\n  .lp-wrapper { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; }\n  .hero { background: linear-gradient(135deg, #4f46e5, #0ea5e9); color: white; padding: 120px 20px; text-align: center; border-radius: 0 0 50px 50px; }\n  .hero-title { font-size: 3rem; font-weight: 800; margin-bottom: 10px; color: white; }\n  .hero-sub { font-size: 1.2rem; opacity: 0.9; margin-bottom: 30px; }\n  .features { padding: 80px 20px; background: #f8fafc; text-align: center; }\n  .section-title { font-size: 2rem; margin-bottom: 40px; color: #1e293b; font-weight: bold; }\n  .feature-grid { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }\n  .feature-card { background: white; padding: 30px; border-radius: 15px; width: 280px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); transition: 0.3s; }\n  .feature-card:hover { transform: translateY(-10px); }\n  .feature-card h3 { color: #4f46e5; margin-bottom: 10px; }\n  \n  /* ★ 追加: 料金表とボタンのデザイン */\n  .pricing { padding: 80px 20px; text-align: center; }\n  .toggle-wrap { margin-bottom: 40px; }\n  .pricing-grid { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; }\n  .price-card { border: 1px solid #e2e8f0; padding: 40px; border-radius: 15px; width: 300px; background: white; }\n  .price-card.premium { border: 2px solid #0ea5e9; box-shadow: 0 20px 25px -5px rgba(14,165,233,0.1); transform: scale(1.05); }\n  .price-display { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin: 20px 0; }\n  .btn-primary { background: white; color: #4f46e5; padding: 15px 35px; border-radius: 30px; text-decoration: none; font-weight: bold; transition: 0.3s; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }\n  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(0,0,0,0.2); }\n  #planToggle { background: #1e293b; color: white; border: none; padding: 12px 24px; border-radius: 20px; cursor: pointer; font-weight: bold; transition: 0.3s; }\n  #planToggle:hover { background: #334155; transform: scale(1.05); }\n</style>\n\n<div class=\"lp-wrapper\">\n  <section class=\"hero\">\n    <h1 class=\"hero-title\">次世代の学習体験を。</h1>\n    <p class=\"hero-sub\">コードを書きながら、実務のスキルを身につけよう。</p>\n    <a href=\"#pricing\" class=\"btn-primary\">今すぐ始める</a>\n  </section>\n\n  <section class=\"features\">\n    <h2 class=\"section-title\">選ばれる3つの理由</h2>\n    <div class=\"feature-grid\">\n      <div class=\"feature-card\"><h3>🚀 爆速環境</h3><p>ブラウザだけで動く最強の環境</p></div>\n      <div class=\"feature-card\"><h3>💻 実務直結</h3><p>現場と同じワークフロー</p></div>\n      <div class=\"feature-card\"><h3>🔥 楽しい</h3><p>ゲーム感覚で進める</p></div>\n    </div>\n  </section>\n\n  \n  <section id=\"pricing\" class=\"pricing\">\n    <h2 class=\"section-title\">シンプルな料金体系</h2>\n    <div class=\"toggle-wrap\"><button id=\"planToggle\">年額プランに切り替え (20%OFF)</button></div>\n    <div class=\"pricing-grid\">\n      <div class=\"price-card\">\n        <h3>Basic</h3>\n        <div class=\"price-display\" data-monthly=\"¥1,000/月\" data-annual=\"¥9,600/年\">¥1,000/月</div>\n      </div>\n      <div class=\"price-card premium\">\n        <h3>Pro 👑</h3>\n        <div class=\"price-display\" data-monthly=\"¥3,000/月\" data-annual=\"¥28,800/年\">¥3,000/月</div>\n      </div>\n    </div>\n  </section>\n</div>"
  },
  {
    id: 9,
    title: "Step 9: JavaScriptで魔法をかける",
    description: "【全選択して上書き】します！これが最後のコード追加です。一番下に `<script>` を追加し、「ボタンを押すと月額・年額のテキストが瞬時に切り替わる」ギミックを仕込みました！",
    fileName: "カスタムHTML (上書き)",
    code: "<style>\n  /* CSSはStep 8のまま保持されています */\n  .lp-wrapper { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; }\n  .hero { background: linear-gradient(135deg, #4f46e5, #0ea5e9); color: white; padding: 120px 20px; text-align: center; border-radius: 0 0 50px 50px; }\n  .hero-title { font-size: 3rem; font-weight: 800; margin-bottom: 10px; color: white; }\n  .hero-sub { font-size: 1.2rem; opacity: 0.9; margin-bottom: 30px; }\n  .features { padding: 80px 20px; background: #f8fafc; text-align: center; }\n  .section-title { font-size: 2rem; margin-bottom: 40px; color: #1e293b; font-weight: bold; }\n  .feature-grid { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }\n  .feature-card { background: white; padding: 30px; border-radius: 15px; width: 280px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); transition: 0.3s; }\n  .feature-card:hover { transform: translateY(-10px); }\n  .feature-card h3 { color: #4f46e5; margin-bottom: 10px; }\n  .pricing { padding: 80px 20px; text-align: center; }\n  .toggle-wrap { margin-bottom: 40px; }\n  .pricing-grid { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; }\n  .price-card { border: 1px solid #e2e8f0; padding: 40px; border-radius: 15px; width: 300px; background: white; }\n  .price-card.premium { border: 2px solid #0ea5e9; box-shadow: 0 20px 25px -5px rgba(14,165,233,0.1); transform: scale(1.05); }\n  .price-display { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin: 20px 0; }\n  .btn-primary { background: white; color: #4f46e5; padding: 15px 35px; border-radius: 30px; text-decoration: none; font-weight: bold; transition: 0.3s; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }\n  .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(0,0,0,0.2); }\n  #planToggle { background: #1e293b; color: white; border: none; padding: 12px 24px; border-radius: 20px; cursor: pointer; font-weight: bold; transition: 0.3s; }\n  #planToggle:hover { background: #334155; transform: scale(1.05); }\n</style>\n\n<div class=\"lp-wrapper\">\n  <section class=\"hero\">\n    <h1 class=\"hero-title\">次世代の学習体験を。</h1>\n    <p class=\"hero-sub\">コードを書きながら、実務のスキルを身につけよう。</p>\n    <a href=\"#pricing\" class=\"btn-primary\">今すぐ始める</a>\n  </section>\n  <section class=\"features\">\n    <h2 class=\"section-title\">選ばれる3つの理由</h2>\n    <div class=\"feature-grid\">\n      <div class=\"feature-card\"><h3>🚀 爆速環境</h3><p>ブラウザだけで動く最強の環境</p></div>\n      <div class=\"feature-card\"><h3>💻 実務直結</h3><p>現場と同じワークフロー</p></div>\n      <div class=\"feature-card\"><h3>🔥 楽しい</h3><p>ゲーム感覚で進める</p></div>\n    </div>\n  </section>\n  <section id=\"pricing\" class=\"pricing\">\n    <h2 class=\"section-title\">シンプルな料金体系</h2>\n    <div class=\"toggle-wrap\"><button id=\"planToggle\">年額プランに切り替え (20%OFF)</button></div>\n    <div class=\"pricing-grid\">\n      <div class=\"price-card\">\n        <h3>Basic</h3>\n        <div class=\"price-display\" data-monthly=\"¥1,000/月\" data-annual=\"¥9,600/年\">¥1,000/月</div>\n      </div>\n      <div class=\"price-card premium\">\n        <h3>Pro 👑</h3>\n        <div class=\"price-display\" data-monthly=\"¥3,000/月\" data-annual=\"¥28,800/年\">¥3,000/月</div>\n      </div>\n    </div>\n  </section>\n</div>\n\n\n<script>\n  const btn = document.getElementById('planToggle');\n  const prices = document.querySelectorAll('.price-display');\n  let isAnnual = false;\n\n  btn.addEventListener('click', (e) => {\n    e.preventDefault();\n    isAnnual = !isAnnual;\n    btn.innerText = isAnnual ? \"月額プランに戻す\" : \"年額プランに切り替え (20%OFF)\";\n    \n    prices.forEach(p => {\n      p.innerText = isAnnual ? p.dataset.annual : p.dataset.monthly;\n    });\n  });\n</script>"
  },
  {
    id: 10,
    title: "Step 10: プレビュー＆ついに公開！",
    description: "お疲れ様でした！！WordPress右上の青い「公開」ボタンを押して、ページを確定させてください。「固定ページを表示」を押すと、標準ブロック（画像）とカスタムコードが完璧に融合した、プロ級のLPが完成しています！",
    fileName: "確認フェーズ",
    code: "/* \n🎉 圧倒的成長！大・大・大成功です！！！\n\nたった10回のステップで、\n1. WordPressの標準機能（メディア管理）\n2. HTMLによる構造化\n3. CSSによる高度なデザイン\n4. JSによる動的なUIギミック\n\n現場で求められる「全て」を体験しました。\nこれが本当のWeb制作です！\n*/"
  }
];

export default function WpTraceLab() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const lesson = WP_LESSONS[currentStep];

  // クリップボードにコードをコピーする関数
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lesson.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // 👑 完全日本語化されたシンプルなURL
  const targetUrl = "https://playground.wordpress.net/?theme=twentytwentyone&language=ja";

  return (
    <div className="flex flex-col h-screen w-full bg-[#141414] text-white font-sans overflow-hidden">
      
      {/* ヘッダー */}
      <header className="h-14 bg-[#1e1e1e] border-b border-[#3c3c3c] flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <span className="font-black text-cyan-400 text-lg tracking-wider">🐘 WP TRACE LAB</span>
          
          <div className="flex items-center bg-[#0a0a0a] border border-[#2d2d2d] rounded-xl p-1 gap-1">
            <button 
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${currentStep === 0 ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400 hover:text-white cursor-pointer'}`}
            >
              ◀ 前のステップ
            </button>
            <span className="text-xs px-2 text-slate-400 font-mono">Step {currentStep + 1} / {WP_LESSONS.length}</span>
            <button 
              onClick={() => setCurrentStep(prev => Math.min(WP_LESSONS.length - 1, prev + 1))}
              disabled={currentStep === WP_LESSONS.length - 1}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${currentStep === WP_LESSONS.length - 1 ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400 hover:text-white cursor-pointer'}`}
            >
              次のステップ ▶
            </button>
          </div>
        </div>
      </header>

      {/* メイン（3ペイン） */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 左：解説書（実務マニュアル） */}
        <div className="w-1/4 bg-[#1a1a1a] border-r border-[#2d2d2d] p-6 overflow-y-auto flex flex-col">
          <h2 className="text-lg font-bold text-cyan-400 mb-3">{lesson.title}</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6 whitespace-pre-wrap">{lesson.description}</p>
          
          {currentStep >= 3 && currentStep <= 8 && (
             <div className="bg-[#222] border-l-4 border-amber-500 p-4 rounded-r mt-auto">
               <span className="block text-[10px] font-bold text-amber-500 mb-1 tracking-wider">💡 アドバイス</span>
               <p className="text-xs text-slate-400">
                 コードが長くなってきました！元のコードを残したまま貼り付けるとエラーになるので、「Ctrl+A」で全選択してから「Ctrl+V（貼り付け）」で丸ごと上書きしましょう！
               </p>
             </div>
          )}
        </div>

        {/* 中央：コード見本 ＆ コピーボタン */}
        <div className="w-1/3 flex flex-col border-r border-[#2d2d2d] relative group">
          <div className="bg-[#1e1e1e] text-[10px] text-slate-400 font-bold px-4 py-2 border-b border-[#2d2d2d] uppercase tracking-widest flex justify-between items-center">
            <span>対象ファイル: {lesson.fileName}</span>
            
            <button 
              onClick={handleCopy}
              className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${isCopied ? 'bg-emerald-600 text-white' : 'bg-[#333] hover:bg-[#444] text-slate-300 cursor-pointer'}`}
            >
              {isCopied ? '✓ コピー完了！' : '📋 コードをコピー'}
            </button>
          </div>
          <pre className="flex-1 bg-[#141414] text-[#9cdcfe] font-mono text-xs p-6 overflow-auto select-text leading-relaxed">
            <code>{lesson.code}</code>
          </pre>
        </div>

        {/* 右：安全な別タブ起動パネル */}
        <div className="w-5/12 bg-[#111] flex flex-col relative">
          <div className="bg-[#1e1e1e] text-[10px] text-slate-400 font-bold px-4 py-2 border-b border-[#2d2d2d] uppercase tracking-widest">
            WordPress Sandbox Launcher
          </div>
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a293b] to-[#111]">
            <div className="w-20 h-20 bg-[#1e293b] border-2 border-cyan-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <span className="text-5xl">🐘</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">安全・確実なピュア環境</h3>
            <p className="text-xs text-slate-400 mb-8 max-w-sm leading-relaxed">
              自動構築を使わず、初期状態のWordPressを立ち上げます。プログラミングは「自分の手で操作する」のが一番の近道です。
            </p>

            <a 
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95 overflow-hidden flex items-center justify-center no-underline cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2">
                <span className="text-lg">🚀</span>
                <span>WP管理画面を開く (日本語)</span>
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}