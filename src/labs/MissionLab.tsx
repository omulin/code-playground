import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Sparkles, CheckCircle2, RotateCcw, Save, Layout, HelpCircle, Lightbulb, EyeOff, Copy, Check } from 'lucide-react';

interface MissionStage {
  id: number;
  title: string;
  mission: string;
  hint: string;
  initialCode: string;
  correctCode: string;
  checkCondition: (code: string) => boolean;
}

// 🌟 全6問の本格的なサイト制作・模写ミッションステージデータ
const MISSION_STAGES: MissionStage[] = [
  {
    id: 1,
    title: 'ステージ 1：モダン・プロフィールカードの模写',
    mission: 'DOCTYPE宣言から始まる完全なHTMLとCSSを記述し、右側の「目指すお手本」と同じ洗練されたプロフィールカード（アバター画像、名前、紹介文、フォローボタン）を完成させてください。',
    hint: '<!DOCTYPE html> から書き始め、<head> 内の <style> タグでカードのデザイン（背景色、角丸、影、Flexbox）を指定します。',
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>プロフィール</title>
  <style>
    /* ここにCSSを書こう */
  </style>
</head>
<body>
  <!-- ここにHTMLを書こう -->
</body>
</html>`,
    correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>プロフィール</title>
  <style>
    body {
      background-color: #0f172a;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      font-family: sans-serif;
    }
    .card {
      background: #1e293b;
      color: #ffffff;
      padding: 32px;
      border-radius: 24px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
      width: 300px;
      text-align: center;
    }
    .avatar {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #3b82f6, #ec4899);
      border-radius: 50%;
      margin: 0 auto 16px;
    }
    h2 { margin: 0 0 8px; font-size: 20px; }
    p { color: #94a3b8; font-size: 14px; margin: 0 0 20px; }
    .btn {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="avatar"></div>
    <h2>山田 太郎</h2>
    <p>フロントエンドエンジニア。UI/UXデザインとReactが大好きです。</p>
    <button class="btn">フォローする</button>
  </div>
</body>
</html>`,
    checkCondition: (code) => {
      const lower = code.toLowerCase();
      return lower.includes('<!doctype html>') && lower.includes('<style>') && lower.includes('.card') && lower.includes('button');
    }
  },
  {
    id: 2,
    title: 'ステージ 2：3カラム・サービス紹介セクションの模写',
    mission: 'Flexbox (`display: flex; gap;`) を活用し、横並びに美しく並んだ3つのサービス紹介カードセクションを構築してください。',
    hint: '親要素に `display: flex; justify-content: center; gap: 20px;` を指定し、それぞれのカードに背景色やパディングを設定します。',
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>サービス紹介</title>
  <style>
    body { background: #f8fafc; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .container {
      /* ここにFlexboxレイアウトを書こう */
    }
    .service-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      width: 200px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="service-card"><h3>Web制作</h3><p>高品質なサイト構築</p></div>
    <div class="service-card"><h3>UIデザイン</h3><p>洗練されたインターフェース</p></div>
    <div class="service-card"><h3>SEO対策</h3><p>検索上位表示の最適化</p></div>
  </div>
</body>
</html>`,
    correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>サービス紹介</title>
  <style>
    body { background: #f8fafc; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .container {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    .service-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      width: 200px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      border-top: 4px solid #3b82f6;
    }
    h3 { margin-top: 0; color: #1e293b; }
    p { color: #64748b; font-size: 13px; margin-bottom: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="service-card"><h3>Web制作</h3><p>高品質なサイト構築</p></div>
    <div class="service-card"><h3>UIデザイン</h3><p>洗練されたインターフェース</p></div>
    <div class="service-card"><h3>SEO対策</h3><p>検索上位表示の最適化</p></div>
  </div>
</body>
</html>`,
    checkCondition: (code) => {
      const lower = code.toLowerCase();
      return lower.includes('display: flex') && lower.includes('gap:') && lower.includes('.service-card');
    }
  },
  {
    id: 3,
    title: 'ステージ 3：モダンLPのヒーローエリア模写',
    mission: '大画面の背景グラデーション、キャッチコピー、CTAボタンが中央に配置されたLPの顔（ヒーローエリア）を完全再現してください。',
    hint: '全画面に広がるコンテナに `background: linear-gradient(...)` を設定し、テキストは `text-align: center; color: white;` で中央に寄せます。',
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ヒーローエリア</title>
  <style>
    /* ここにヒーローエリアのスタイルを書こう */
  </style>
</head>
<body>
  <section class="hero">
    <h1>未来を変えるプログラミング学習</h1>
    <p>ゼロから実践的なスキルを身につけよう</p>
    <a href="#" class="cta-btn">無料で始める</a>
  </section>
</body>
</html>`,
    correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ヒーローエリア</title>
  <style>
    body { margin: 0; font-family: sans-serif; }
    .hero {
      background: linear-gradient(135deg, #1e1b4b, #3b82f6);
      color: white;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0 20px;
    }
    h1 { font-size: 36px; margin-bottom: 12px; font-weight: 900; }
    p { font-size: 16px; color: #cbd5e1; margin-bottom: 32px; }
    .cta-btn {
      background: #10b981;
      color: white;
      padding: 14px 32px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: bold;
      box-shadow: 0 10px 20px rgba(16, 185, 129, 0.4);
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>未来を変えるプログラミング学習</h1>
    <p>ゼロから実践的なスキルを身につけよう</p>
    <a href="#" class="cta-btn">無料で始める</a>
  </section>
</body>
</html>`,
    checkCondition: (code) => {
      const lower = code.toLowerCase();
      return lower.includes('linear-gradient') && lower.includes('.hero') && lower.includes('cta-btn');
    }
  },
  {
    id: 4,
    title: 'ステージ 4：料金プラン・プライシングカードの模写',
    mission: 'SaaSサービスなどでよく見られる「おすすめプラン（強調枠・ボーダー・影）」を含むプライシングカードの並びを再現してください。',
    hint: '特定のカードクラス（例: `.featured`）に特別な背景色やシャドウ、ボーダーを指定して目立たせます。',
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>料金プラン</title>
  <style>
    body { background: #0f172a; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; color: white; }
    .pricing-grid { display: flex; gap: 24px; }
    .plan { background: #1e293b; padding: 32px; border-radius: 16px; width: 220px; text-align: center; }
  </style>
</head>
<body>
  <div class="pricing-grid">
    <div class="plan"><h3>スタンダード</h3><p class="price">¥980</p></div>
    <div class="plan featured"><h3>プロ</h3><p class="price">¥2,980</p></div>
  </div>
</body>
</html>`,
    correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>料金プラン</title>
  <style>
    body { background: #0f172a; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; color: white; }
    .pricing-grid { display: flex; gap: 24px; align-items: center; }
    .plan { background: #1e293b; padding: 32px; border-radius: 16px; width: 220px; text-align: center; box-shadow: 0 10px 15px rgba(0,0,0,0.3); }
    .featured { background: linear-gradient(135deg, #3b82f6, #6366f1); transform: scale(1.05); border: 2px solid #93c5fd; }
    .price { font-size: 28px; font-weight: bold; margin: 16px 0; color: #38bdf8; }
    .featured .price { color: #ffffff; }
    h3 { margin: 0; }
  </style>
</head>
<body>
  <div class="pricing-grid">
    <div class="plan"><h3>スタンダード</h3><p class="price">¥980</p></div>
    <div class="plan featured"><h3>プロ</h3><p class="price">¥2,980</p></div>
  </div>
</body>
</html>`,
    checkCondition: (code) => {
      const lower = code.toLowerCase();
      return lower.includes('.featured') && lower.includes('.pricing-grid') && lower.includes('transform');
    }
  },
  {
    id: 5,
    title: 'ステージ 5：モダンなデザインのお問い合わせフォームの模写',
    mission: '美しくスタイリングされたインプット欄、テキストエリア、送信ボタンを持つお問い合わせフォームカードを作成してください。',
    hint: 'inputやtextareaに `width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #444;` などを適用します。',
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>お問合せ</title>
  <style>
    body { background: #f1f5f9; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .form-box { background: white; padding: 32px; border-radius: 16px; width: 340px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="form-box">
    <h2>お問い合わせ</h2>
    <input type="text" placeholder="お名前">
    <textarea placeholder="メッセージ"></textarea>
    <button>送信する</button>
  </div>
</body>
</html>`,
    correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>お問合せ</title>
  <style>
    body { background: #f1f5f9; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .form-box { background: white; padding: 32px; border-radius: 16px; width: 340px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    h2 { margin-top: 0; color: #1e293b; margin-bottom: 20px; font-size: 22px; }
    input, textarea { width: 100%; padding: 12px; margin-bottom: 16px; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box; font-size: 14px; }
    textarea { height: 100px; resize: none; }
    button { width: 100%; background: #3b82f6; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div class="form-box">
    <h2>お問い合わせ</h2>
    <input type="text" placeholder="お名前">
    <textarea placeholder="メッセージ"></textarea>
    <button>送信する</button>
  </div>
</body>
</html>`,
    checkCondition: (code) => {
      const lower = code.toLowerCase();
      return lower.includes('input') && lower.includes('textarea') && lower.includes('box-sizing');
    }
  },
  {
    id: 6,
    title: 'ステージ 6：【最終試練】ブログ記事グリッドの完全模写',
    mission: '画像サムネイル、カテゴリタグ、記事タイトル、抜粋文、著者情報が含まれるブログカードが2列に並ぶグリッドレイアウトを完全再現しよう！',
    hint: 'グリッドやフレックスの折り返し構造、カード内の各要素のパディングや文字色を細部までお手本に合わせて構築します。',
    initialCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ブログ記事</title>
  <style>
    body { background: #f8fafc; font-family: sans-serif; padding: 40px; display: flex; justify-content: center; margin: 0; }
    .blog-grid { display: flex; gap: 24px; }
    .blog-card { background: white; border-radius: 12px; width: 260px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  </style>
</head>
<body>
  <div class="blog-grid">
    <div class="blog-card">
      <div class="thumb"></div>
      <div class="content"><h3>HTML/CSSの極意</h3><p>基礎からしっかりと学べる実践ガイド。</p></div>
    </div>
    <div class="blog-card">
      <div class="thumb"></div>
      <div class="content"><h3>React超入門</h3><p>モダンなUIコンポーネントを作ろう。</p></div>
    </div>
  </div>
</body>
</html>`,
    correctCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ブログ記事</title>
  <style>
    body { background: #f8fafc; font-family: sans-serif; padding: 40px; display: flex; justify-content: center; margin: 0; }
    .blog-grid { display: flex; gap: 24px; }
    .blog-card { background: white; border-radius: 12px; width: 260px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .thumb { height: 140px; background: linear-gradient(135deg, #cbd5e1, #64748b); }
    .content { padding: 20px; }
    h3 { margin: 0 0 8px; font-size: 16px; color: #1e293b; }
    p { margin: 0; color: #64748b; font-size: 13px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="blog-grid">
    <div class="blog-card">
      <div class="thumb"></div>
      <div class="content"><h3>HTML/CSSの極意</h3><p>基礎からしっかりと学べる実践ガイド。</p></div>
    </div>
    <div class="blog-card">
      <div class="thumb"></div>
      <div class="content"><h3>React超入門</h3><p>モダンなUIコンポーネントを作ろう。</p></div>
    </div>
  </div>
</body>
</html>`,
    checkCondition: (code) => {
      const lower = code.toLowerCase();
      return lower.includes('.blog-card') && lower.includes('.thumb') && lower.includes('.content');
    }
  }
];

export default function MissionLab() {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const stage = MISSION_STAGES[currentStageIdx] || MISSION_STAGES[0];

  const storageKey = `mission_lab_stage_${stage.id}_code`;
  const [userCode, setUserCode] = useState<string>(() => {
    return localStorage.getItem(storageKey) || stage.initialCode;
  });

  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [showAnswerModal, setShowAnswerModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem(`mission_lab_stage_${stage.id}_code`);
    setUserCode(saved || stage.initialCode);
    checkPass(saved || stage.initialCode, false);
    setShowHintModal(false);
    setShowAnswerModal(false);
  }, [currentStageIdx]);

  const checkPass = (code: string, triggerPopup = true) => {
    const passed = stage.checkCondition(code);
    if (passed) {
      if (!isPassed && triggerPopup) {
        setShowModal(true);
      }
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  };

  const handleEditorChange = (val: string | undefined) => {
    const code = val || '';
    setUserCode(code);
    checkPass(code, true);
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, userCode);
    setSaveNotification("💾 セーブしました！");
    setTimeout(() => setSaveNotification(""), 2000);
  };

  const handleReset = () => {
    if (window.confirm("このステージのコードを初期状態に戻しますか？")) {
      localStorage.removeItem(storageKey);
      setUserCode(stage.initialCode);
      checkPass(stage.initialCode, false);
      setSaveNotification("🗑️ 初期化しました");
      setTimeout(() => setSaveNotification(""), 2000);
    }
  };

  const copyAnswerToClipboard = () => {
    navigator.clipboard.writeText(stage.correctCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex h-screen w-full bg-[#1e1e1e] text-white font-sans overflow-hidden relative">
      
      {/* 🎉 クリアお祝いポップアップ */}
      {showModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl flex flex-col items-center text-center">
            <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/30 mb-4 text-emerald-400">
              <Sparkles size={48} className="animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">🎉 MISSION {stage.id} CLEAR！</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              素晴らしい！お手本通りの本格的なWebサイト・コンポーネントを見事に再現できました。
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-[#333] hover:bg-[#444] text-gray-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                確認する
              </button>
              <button 
                onClick={() => {
                  setShowModal(false);
                  if (currentStageIdx + 1 < MISSION_STAGES.length) {
                    setCurrentStageIdx(prev => prev + 1);
                  } else {
                    alert("🏆 すべてのサイト制作ミッションを完全制覇しました！プロの腕前です！");
                  }
                }}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl shadow-lg cursor-pointer"
              >
                次のミッションへ ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💡 ヒント表示モーダル */}
      {showHintModal && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] border border-amber-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-3">
              <Lightbulb size={20} /> ミッション {stage.id} のヒント
            </div>
            <p className="text-sm text-gray-200 leading-relaxed bg-[#1e1e1e] p-4 rounded-xl border border-[#3c3c3c] mb-6 font-mono">
              {stage.hint}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 👁️ 模範解答確認用モーダル */}
      {showAnswerModal && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] border border-rose-500/40 rounded-2xl p-6 max-w-xl w-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <EyeOff size={20} /> ミッション {stage.id} の模範解答
              </div>
              <button
                onClick={copyAnswerToClipboard}
                className="flex items-center gap-1 bg-[#333] hover:bg-[#444] text-gray-200 px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedCode ? 'コピー完了' : 'コードをコピー'}
              </button>
            </div>

            <p className="text-xs text-gray-400 mb-3">
              💡 解答の構造を確認し、エディタに自分でタイピングして再現してみましょう！
            </p>

            <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-xl p-4 mb-6 font-mono text-xs text-indigo-400 whitespace-pre-wrap leading-relaxed select-all max-h-[300px] overflow-y-auto">
              {stage.correctCode}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowAnswerModal(false)}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 左カラム：ミッション＆クエスト選択 */}
      <div className="w-80 bg-[#252526] border-r border-[#3c3c3c] flex flex-col shrink-0 select-none">
        <div className="p-3 bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center justify-between text-xs font-bold text-indigo-400">
          <div className="flex items-center gap-2">
            <Layout size={16} />
            <span>Mission Lab (全6問)</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleSave} className="p-1 hover:bg-[#333] text-gray-300 rounded cursor-pointer" title="セーブ">
              <Save size={14} />
            </button>
            <button onClick={handleReset} className="p-1 hover:bg-[#333] text-gray-300 rounded cursor-pointer" title="初期化">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {saveNotification && (
          <div className="bg-emerald-950/80 text-emerald-400 text-[11px] font-bold py-1 px-3 text-center border-b border-emerald-900 animate-pulse">
            {saveNotification}
          </div>
        )}

        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">ミッション選択 (1〜6)</span>
            <select
              value={currentStageIdx}
              onChange={(e) => setCurrentStageIdx(parseInt(e.target.value, 10))}
              className="w-full bg-[#1e1e1e] text-indigo-300 text-xs font-bold px-3 py-2 rounded border border-[#444] cursor-pointer outline-none"
            >
              {MISSION_STAGES.map((s, idx) => (
                <option key={s.id} value={idx}>Mission {s.id}: {s.title}</option>
              ))}
            </select>
          </div>

          <div className="bg-indigo-950/40 border border-indigo-800/40 p-3 rounded-lg space-y-2">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5">
              <HelpCircle size={14} /> 制作ミッション概要
            </div>
            <p className="text-gray-300 leading-relaxed">{stage.mission}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setShowHintModal(true)}
              className="py-2.5 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-700/50 text-amber-300 rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Lightbulb size={14} /> ヒント
            </button>
            <button
              onClick={() => setShowAnswerModal(true)}
              className="py-2.5 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <EyeOff size={14} /> 回答
            </button>
          </div>

          <div className="border-t border-[#3c3c3c] pt-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">判定ステータス</span>
            {isPassed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-400 p-3 rounded-lg flex items-center gap-2 font-bold animate-pulse">
                <CheckCircle2 size={18} /> Accepted (AC) - 合格！
              </div>
            ) : (
              <div className="bg-amber-950/40 border border-amber-800/60 text-amber-400 p-3 rounded-lg flex items-center gap-2 font-bold">
                ✍️ Writing Code... (要件未達)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 💻 中央カラム：HTML/CSSフルエディタ */}
      <div className="w-[420px] bg-[#252526] flex flex-col h-full border-r border-[#3c3c3c] shrink-0">
        <div className="bg-[#2d2d2d] border-b border-[#3c3c3c] px-4 py-2 text-xs font-bold text-indigo-400 flex justify-between items-center">
          <span>✍️ Full Stack Editor (index.html)</span>
          <span className="text-[10px] text-gray-400 font-mono">Monaco Editor</span>
        </div>
        <div className="flex-1 relative w-full overflow-hidden">
          <Editor
            height="100%"
            language="html"
            theme="vs-dark"
            value={userCode}
            onChange={handleEditorChange}
            options={{
              fontSize: 12,
              minimap: { enabled: false },
              wordWrap: 'on',
            }}
          />
        </div>
      </div>

      {/* 🖼️ 右カラム：お手本 ＆ ライブプレビュー比較 */}
      <div className="flex-1 bg-[#141414] flex flex-col h-full overflow-hidden">
        <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-bold text-gray-400 flex justify-between items-center shrink-0">
          <span>👀 ターゲット (完成形お手本) ＆ ライブプレビュー</span>
          <span className="text-[10px] text-indigo-400 font-mono">Site Copy Judge</span>
        </div>

        <div className="flex-1 p-6 grid grid-rows-2 gap-4 bg-[#1a1a1a] overflow-auto">
          {/* お手本プレビュー */}
          <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
            <div className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 border-b border-slate-200">
              ✨ ターゲット（目指す完成形）
            </div>
            <div className="flex-1 bg-white overflow-auto">
              <iframe
                srcDoc={stage.correctCode}
                title="Target Preview"
                className="w-full h-full border-0 pointer-events-none"
                sandbox="allow-same-origin"
              />
            </div>
          </div>

          {/* ユーザープレビュー */}
          <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
            <div className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 border-b border-slate-200">
              🖥️ あなたのプレビュー結果
            </div>
            <div className="flex-1 bg-white overflow-auto">
              <iframe
                srcDoc={userCode}
                title="User Preview"
                className="w-full h-full border-0"
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}