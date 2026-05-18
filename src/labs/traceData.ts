// 👑 他のファイルは一切見ない！このファイルの中で型定義を100%完結！
export interface TracePage {
  fileName: string;
  initialCode: string;
  correctCode: string;
  language: 'html' | 'css';
}

export interface TraceStage {
  id: number;
  title: string;
  category: 'HTML' | 'WordPress';
  description: string;
  mission: string;
  pages: TracePage[]; 
}

// 👑 画面側（TraceLab.tsx）が読み込む本物のデータ
export const TRACE_STAGES: TraceStage[] = [
  {
    id: 1,
    category: 'HTML',
    title: "1. カフェ告知チラシ（1枚完結・基本構造）",
    description: "1枚のチラシをWEBに落とし込む写経です。美しい見本コードを完全にトレースして、基本のボックスモデルを体に叩き込みましょう。",
    mission: "右側の見本コードと寸分違わぬコードをエディタに打ち込み、ライブプレビューにカフェのチラシを表示させてください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "\n<div class=\"cafe-flyer\">\n  \n</div>",
        correctCode: `<div class="cafe-flyer" style="background: #faf6f0; color: #433422; padding: 30px; border-radius: 12px; border: 4px double #8c6239; max-width: 400px; margin: auto; font-family: sans-serif; text-align: center;">\n  <span style="font-size: 12px; letter-spacing: 0.2em; color: #8c6239; font-weight: bold;">NEW OPEN</span>\n  <h1 style="font-size: 28px; margin: 10px 0; border-bottom: 2px solid #8c6239; padding-bottom: 10px;">MOON CAFE</h1>\n  <p style="font-size: 14px; line-height: 1.6; font-style: italic;">「月明かりのように心地よい空間で、最高の一杯を。」</p>\n  <div style="background: #fff; padding: 15px; margin: 20px 0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">\n    <h3 style="margin-top: 0; color: #8c6239; font-size: 16px;">☕ 本日の限定メニュー</h3>\n    <p style="font-size: 13px; margin: 5px 0;">深煎りムーンブレンド ... ¥550</p>\n    <p style="font-size: 13px; margin: 5px 0;">自家製ハニートースト ... ¥680</p>\n  </div>\n  <p style="font-size: 11px; color: #888; margin-bottom: 0;">営業時間: 11:00 - 20:00 / 水曜定休</p>\n</div>`
      }
    ]
  },
  {
    id: 2,
    category: 'HTML',
    title: "2. 複数ページ遷移（ルーティング実戦・2レイアウト）",
    description: "いよいよ本物仕様！トップ(index)と会社概要(about)の2つのファイルを同時に書き換え、ページ間をワープするリンクを繋ぎ込みます。",
    mission: "index.html と about.html の両方の写経を完成させ、プレビュー画面内のボタンで行き来できるかテストしてください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "\n<div class=\"page-box\" style=\"padding: 20px; color: #fff; text-align: center;\">\n  \n</div>",
        correctCode: `<div class="page-box" style="padding: 20px; color: #fff; text-align: center; font-family: sans-serif;">\n  <h1 style="color: #0ea5e9; font-size: 24px;">🚀 企業のメインWebトップ</h1>\n  <p style="font-size: 13px; color: #94a3b8; margin: 15px 0;">こちらは複数ページで構成された本格的なサイトの『トップ画面』です。</p>\n  <div style="margin-top: 25px;">\n    <a href="about.html" style="background: #0ea5e9; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: bold; display: inline-block; transition: 0.2s;">会社概要ページへ進む ➔</a>\n  </div>\n</div>`
      },
      {
        fileName: 'about.html',
        language: 'html',
        initialCode: "\n<div class=\"page-box\" style=\"padding: 20px; color: #fff; text-align: center;\">\n  \n</div>",
        correctCode: `<div class="page-box" style="padding: 20px; color: #fff; text-align: center; font-family: sans-serif;">\n  <h1 style="color: #a855f7; font-size: 24px;">🏢 会社概要 (About Us)</h1>\n  <p style="font-size: 13px; color: #94a3b8; margin: 15px 0;">私たちのビジョンや、オフィスのアクセス情報を掲載している第2のページです。</p>\n  <div style="margin-top: 25px;">\n    <a href="index.html" style="background: #374151; color: #cbd5e1; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 12px; display: inline-block;">⬅ トップページに戻る</a>\n  </div>\n</div>`
      }
    ]
  }
];