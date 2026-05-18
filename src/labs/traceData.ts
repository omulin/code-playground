export interface TracePage {
  fileName: string;
  initialCode: string;
  correctCode: string; // ボスの元の変数名に完全統一！
  language: 'html' | 'css';
}

export interface TraceStage {
  id: number;
  title: string;
  category: 'HTML' | 'CSS' | 'WordPress'; // 👑 CSSカテゴリを正式に承認！
  description: string;
  mission: string;
  pages: TracePage[]; 
}

// 👑 画面側（TraceLab.tsx）が読み込む本物の全30問ガチデータ
export const TRACE_STAGES: TraceStage[] = [
  // ==========================================
  // 【1】HTML カテゴリ (10問)
  // ==========================================
  {
    id: 1,
    category: 'HTML',
    title: "HTML 01：カフェの告知チラシ（基本構造）",
    description: "1枚のWeb用告知チラシを作成します。見本コードをトレースして、基本タグとインラインスタイルの構造を学びましょう。",
    mission: "右側の見本コードと寸分違わぬコードをエディタに打ち込み、カフェのチラシを表示させてください。",
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
    title: "HTML 02：複数ページ遷移（リンクとルーティング）",
    description: "トップと会社概要の2つのファイルを書き換え、リンク間を行き来するルーティングを学びます。",
    mission: "index.html と about.html の両方の写経を完成させ、リンクで正常にワープできるかテストしてください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "\n<div class=\"page-box\" style=\"padding: 20px; color: #fff; text-align: center;\">\n  \n</div>",
        correctCode: `<div class="page-box" style="padding: 20px; color: #fff; text-align: center; font-family: sans-serif;">\n  <h1 style="color: #0ea5e9; font-size: 24px;">🚀 企業のメインWebトップ</h1>\n  <p style="font-size: 13px; color: #94a3b8; margin: 15px 0;">こちらは複数ページで構成された本格的なサイトの『トップ画面』です。</p>\n  <div style="margin-top: 25px;">\n    <a href="about.html" style="background: #0ea5e9; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: bold; display: inline-block;">会社概要ページへ進む ➔</a>\n  </div>\n</div>`
      },
      {
        fileName: 'about.html',
        language: 'html',
        initialCode: "\n<div class=\"page-box\" style=\"padding: 20px; color: #fff; text-align: center;\">\n  \n</div>",
        correctCode: `<div class="page-box" style="padding: 20px; color: #fff; text-align: center; font-family: sans-serif;">\n  <h1 style="color: #a855f7; font-size: 24px;">🏢 会社概要 (About Us)</h1>\n  <p style="font-size: 13px; color: #94a3b8; margin: 15px 0;">私たちのビジョンや、オフィスのアクセス情報を掲載している第2のページです。</p>\n  <div style="margin-top: 25px;">\n    <a href="index.html" style="background: #374151; color: #cbd5e1; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 12px; display: inline-block;">⬅ トップページに戻る</a>\n  </div>\n</div>`
      }
    ]
  },
  {
    id: 3,
    category: 'HTML',
    title: "HTML 03：プロフィールカード（構造設計）",
    description: "SNS風のカード構造です。丸型アバターやボタンリストを入れ子構造で美しく記述します。",
    mission: "セクション分けされたカード構造を正確に写経し、レイアウトを崩さずに描画させてください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div class=\"profile-card\">\n  \n</div>",
        correctCode: `<div class="profile-card" style="background: #1e293b; color: #fff; max-width: 320px; margin: auto; padding: 25px; border-radius: 16px; text-align: center; font-family: sans-serif;">\n  <div style="width: 80px; height: 80px; background: #38bdf8; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 32px;">🧑‍💻</div>\n  <h2 style="font-size: 18px; margin: 0 0 5px 0;">オムリン / Webエンジニア</h2>\n  <p style="font-size: 12px; color: #94a3b8; margin: 0 0 20px 0;">Next.jsとWordPressが大好きなクリエイターです。</p>\n  <div style="display: flex; flex-direction: column; gap: 8px;">\n    <button style="background: #334155; color: #fff; border: none; padding: 8px; border-radius: 6px; font-size: 12px;">ポートフォリオを見る</button>\n  </div>\n</div>`
      }
    ]
  },
  {
    id: 4,
    category: 'HTML',
    title: "HTML 04：ニュースリスト（ul/li構造）",
    description: "日付とカテゴリバッジを内包した、実戦でよく使われるお知らせ（News）のリストマークアップです。",
    mission: "ul, liタグを正しくネストし、構造化されたニュースリストを完成させましょう。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<ul class=\"news-list\">\n  \n</ul>",
        correctCode: `<ul class="news-list" style="list-style: none; padding: 0; max-width: 500px; margin: auto; font-family: sans-serif;">\n  <li style="display: flex; align-items: center; gap: 15px; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">\n    <span style="font-size: 12px; color: #64748b;">2026.05.18</span>\n    <span style="background: #ef4444; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: bold;">重要</span>\n    <a href="#" style="font-size: 13px; color: #1e293b; text-decoration: none;">システムメンテナンスに伴うサービス停止のお知らせ</a>\n  </li>\n</ul>`
      }
    ]
  },
  {
    id: 5,
    category: 'HTML',
    title: "HTML 05：お問い合わせフォーム（input/select）",
    description: "フォームの基本構成要素となる入力エリア、セレクトボックス、送信ボタンのHTML配置です。",
    mission: "各種フォーム用タグを正確にトレースし、入力フォーム的見た目を構築してください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<form class=\"contact-form\">\n  \n</form>",
        correctCode: `<form class="contact-form" style="background: #f8fafc; padding: 20px; border-radius: 8px; max-width: 400px; margin: auto; font-family: sans-serif; border: 1px solid #cbd5e1;">\n  <div style="margin-bottom: 15px; text-align: left;">\n    <label style="font-size: 12px; font-weight: bold; display: block; margin-bottom: 5px;">お名前</label>\n    <input type="text" placeholder="山田 太郎" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box;" />\n  </div>\n  <button type="button" style="width: 100%; background: #10b981; color: #fff; padding: 10px; border: none; border-radius: 4px; font-weight: bold;">送信する</button>\n</form>`
      }
    ]
  },
  {
    id: 6,
    category: 'HTML',
    title: "HTML 06：料金プラン表（table構造）",
    description: "料金プランを一覧化するためのテーブル構成です。セルの結合や見出しの配置を学びます。",
    mission: "table要素の親子構造を正しく記述し、整ったプライス表を完成させてください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<table>\n  \n</table>",
        correctCode: `<table style="width: 100%; max-width: 450px; margin: auto; border-collapse: collapse; font-family: sans-serif; font-size: 13px; text-align: center;">\n  <thead>\n    <tr style="background: #1e293b; color: #fff;">\n      <th style="padding: 10px; border: 1px solid #334155;">プラン</th>\n      <th style="padding: 10px; border: 1px solid #334155;">料金</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">ライト</td>\n      <td style="padding: 10px; border: 1px solid #e2e8f0; color: #0284c7;">¥980</td>\n    </tr>\n  </tbody>\n</table>`
      }
    ]
  },
  {
    id: 7,
    category: 'HTML',
    title: "HTML 07：ナビゲーションバー（header/nav）",
    description: "Webサイトの最上部によく配置される、ロゴとメニューが横並びになったヘッダーのマークアップです。",
    mission: "横配置スタイルを内包したナビゲーションバーをタイポなしで書き写してください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<header>\n  \n</header>",
        correctCode: `<header style="background: #fff; border-bottom: 2px solid #f1f5f9; padding: 15px 20px; font-family: sans-serif; display: flex; justify-content: space-between; align-items: center; max-width: 600px; margin: auto;">\n  <div style="font-weight: bold; font-size: 16px; color: #0f172a;">⚡ CodePlayground</div>\n  <nav style="display: flex; gap: 15px; font-size: 12px;">\n    <a href="#" style="color: #64748b; text-decoration: none;">ホーム</a>\n    <a href="#" style="color: #3b82f6; text-decoration: none; font-weight: bold;">マイページ</a>\n  </nav>\n</header>`
      }
    ]
  },
  {
    id: 8,
    category: 'HTML',
    title: "HTML 08：アコーディオンUI（details/summary）",
    description: "JSを使わずにHTML標準機能だけで開閉を実装できる、よくある質問（FAQ）用の便利タグです。",
    mission: "detailsとsummaryのマークアップをマスターし、ネイティブな開閉UIを実装しましょう。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div>\n  \n</div>",
        correctCode: `<div style="max-width: 450px; margin: auto; font-family: sans-serif;">\n  <details style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px;" open>\n    <summary style="font-weight: bold; font-size: 13px; cursor: pointer;">Q. 返金保証はありますか？</summary>\n    <p style="margin: 8px 0 0 0; font-size: 12px; color: #475569; line-height: 1.5;">A. はい、ご購入から14日以内であれば全額返金対応を行っております。</p>\n  </details>\n</div>`
      }
    ]
  },
  {
    id: 9,
    category: 'HTML',
    title: "HTML 09：進行の手順ステップ表示（円形バッジ）",
    description: "1, 2, 3とステップ順に沿って進行する進捗インジケーターのHTML表現です。",
    mission: "円形の数字バッジを内包した美しいステップレイアウトを模写してください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div>\n  \n</div>",
        correctCode: `<div style="max-width: 400px; margin: auto; font-family: sans-serif; display: flex; flex-direction: column; gap: 12px;">\n  <div style="display: flex; align-items: center; gap: 12px; background: #f1f5f9; padding: 10px; border-radius: 8px;">\n    <div style="background: #4f46e5; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;">01</div>\n    <span style="font-size: 13px; font-weight: bold;">アカウントを新規登録する</span>\n  </div>\n</div>`
      }
    ]
  },
  {
    id: 10,
    category: 'HTML',
    title: "HTML 10：サイトの定番フッター（footer/small）",
    description: "サイトの一番最下部を締めくくる、セマンティックな著作権表示（コピーライト）の構成です。",
    mission: "footerタグとsmallタグを使い、中央揃えの綺麗な定番フッターを配置しましょう。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<footer>\n  \n</footer>",
        correctCode: `<footer style="background: #0f172a; color: #94a3b8; padding: 20px; text-align: center; font-family: sans-serif; max-width: 600px; margin: auto; border-radius: 0 0 10px 10px;">\n  <small style="font-size: 10px; color: #475569;">&copy; 2026 CodePlayground. All Rights Reserved.</small>\n</footer>`
      }
    ]
  },

  // ==========================================
  // 【2】CSS カテゴリ (10問)
  // ==========================================
  {
    id: 11,
    category: 'CSS',
    title: "CSS 01：Flexboxによる要素の横並び（中央寄せ）",
    description: "現代のWebレイアウトで最も重要な『display: flex』の基本挙動と、中央寄せのテクニックを学びます。",
    mission: "3つのボックスが綺麗に真ん中で横一列に並ぶようにスタイルを写経してください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div style=\"\">\n  <div style=\"background: #ef4444; width: 40px; height: 40px;\"></div>\n  <div style=\"background: #3b82f6; width: 40px; height: 40px;\"></div>\n</div>",
        correctCode: `<div style="display: flex; justify-content: center; align-items: center; gap: 15px; background: #f1f5f9; padding: 20px; max-width: 400px; margin: auto;">\n  <div style="background: #ef4444; width: 40px; height: 40px; border-radius: 8px;"></div>\n  <div style="background: #3b82f6; width: 40px; height: 40px; border-radius: 8px;"></div>\n</div>`
      }
    ]
  },
  {
    id: 12,
    category: 'CSS',
    title: "CSS 02：Grid Layoutによる2カラム等幅分割",
    description: "要素をグリッド上にカチッと格子状に並べる『display: grid』と『fr』単位の基礎をトレースします。",
    mission: "カードが左右に美しい等幅で2枚ぴったり並ぶグリッド構造を完成させてください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div style=\"\">\n  <div style=\"background: #6366f1; color: white;\">A</div>\n  <div style=\"background: #ec4899; color: white;\">B</div>\n</div>",
        correctCode: `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 400px; margin: auto;">\n  <div style="background: #6366f1; color: white; padding: 15px; border-radius: 6px; text-align: center;">A</div>\n  <div style="background: #ec4899; color: white; padding: 15px; border-radius: 6px; text-align: center;">B</div>\n</div>`
      }
    ]
  },
  {
    id: 13,
    category: 'CSS',
    title: "CSS 03：美グラデーションボタン（光彩シャドウ）",
    description: "鮮やかな線形グラデーション『linear-gradient』を背景に指定した高級感あるボタンです。",
    mission: "美しい青から紫へのグラデーションとシャドウが効いたボタンを写経してください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<button style=\"\">送信</button>",
        correctCode: `<button style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #fff; border: none; padding: 12px 30px; font-size: 13px; font-weight: bold; border-radius: 50px; box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4); display: block; margin: auto;">プレミアム登録</button>`
      }
    ]
  },
  {
    id: 14,
    category: 'CSS',
    title: "CSS 04：ボックスシャドウ（浮き出る 3D 効果）",
    description: "『box-shadow』のぼかし具合と透明度を緻密に調整し、紙がふわっと浮き上がったような立体感を演出します。",
    mission: "影（シャドウ）の細かな数値を正確にトレースして、極上の立体カードを作ってください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div style=\"\">\n  カード\n</div>",
        correctCode: `<div style="background: #ffffff; color: #1e293b; width: 260px; padding: 30px; margin: 30px auto; border-radius: 16px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); border: 1px solid #f1f5f9;">✨ ふんわり浮き出る高級カード</div>`
      }
    ]
  },
  {
    id: 15,
    category: 'CSS',
    title: "CSS 05：テキストトリミング（3点リーダー省略）",
    description: "枠からはみ出た長文のテキストを自動的に『…』で省略させる、実務必須のCSS魔法です。",
    mission: "ellipsisを含む3つの属性を正しく組み合わせ、テキストを1行で綺麗に省略させてください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div style=\"width: 200px;\">\n  この文章は長いためはみ出します。\n</div>",
        correctCode: `<div style="width: 200px; margin: auto; font-family: sans-serif; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: #fee2e2; padding: 8px; color: #991b1b;">この文章は長いためはみ出します。</div>`
      }
    ]
  },
  {
    id: 16,
    category: 'CSS',
    title: "CSS 06：親要素に対する完全中央配置",
    description: "背景画像やおや要素に対して、子要素を完全に画面の「ド真ん中」に固定する位置決めの必勝パターンです。",
    mission: "positionプロパティとトランスフォームのパーセント数値を正確に記述してください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div style=\"position: relative; width: 100%; max-width: 360px; height: 100px; background: #334155; margin: auto;\">\n  <div style=\"\">ターゲット</div>\n</div>",
        correctCode: `<div style="position: relative; width: 100%; max-width: 360px; height: 100px; background: #334155; margin: auto; border-radius: 8px;">\n  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #f59e0b; color: #fff; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; white-space: nowrap;">🎯 完全中央配置</div>\n</div>`
      }
    ]
  },
  {
    id: 17,
    category: 'CSS',
    title: "CSS 07：アスペクト比の固定（aspect-ratio）",
    description: "モダンCSSの新常識！画像の横幅が変わっても、常に『16:9』などの黄金比を崩さずキープする指定方法です。",
    mission: "aspect-ratio属性をマスターし、映画のスクリーンのような比率のボックスを作ります。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div style=\"\">\n  シアター\n</div>",
        correctCode: `<div style="width: 100%; max-width: 340px; aspect-ratio: 16 / 9; background: #000; color: #fff; margin: auto; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 14px; border: 3px solid #3b82f6;">🎬 SCREEN: 16 / 9</div>`
      }
    ]
  },
  {
    id: 18,
    category: 'CSS',
    title: "CSS 08：すりガラス透過レイヤー（Glassmorphism）",
    description: "iOSデザインでおなじみの、背景をすりガラスのように透過＆ぼかす最新のCSSデザインです。",
    mission: "rgbaによる半透明と、blurによるボカシ効果の合わせ技を綺麗にトレースしてください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div style=\"background: repeating-linear-gradient(45deg, #ccc, #ccc 10px, #fff 10px, #fff 20px); padding: 20px;\">\n  <div style=\"\">\n    ボカシ\n  </div>\n</div>",
        correctCode: `<div style="background: repeating-linear-gradient(45deg, #cbd5e1, #cbd5e1 10px, #f8fafc 10px, #f8fafc 20px); padding: 30px; max-width: 360px; margin: auto; border-radius: 12px;">\n  <div style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.7); padding: 20px; border-radius: 8px; text-align: center; font-weight: bold; color: #1e293b;">🔮 Glassmorphism</div>\n</div>`
      }
    ]
  },
  {
    id: 19,
    category: 'CSS',
    title: "CSS 09：スタイリッシュな文字間隔",
    description: "ありきたりなh1を一瞬でおしゃれなブランドロゴに変える、文字の間隔（カーニング）とアンダーラインの引き方です。",
    mission: "letter-spacingとborderを組み合わせたエモい見出しを完成させてください。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<h1>\n  DESIGN\n</h1>",
        correctCode: `<h1 style="font-size: 20px; font-family: sans-serif; font-weight: 300; color: #0f172a; letter-spacing: 0.4em; text-align: center; margin: 20px auto; padding-bottom: 8px; border-bottom: 1px solid #0f172a; width: fit-content;">MINIMAL DESIGN</h1>`
      }
    ]
  },
  {
    id: 20,
    category: 'CSS',
    title: "CSS 10：長いURLのはみ出し自動改行",
    description: "英数字の連続や長いURLが、親要素の右端を突き破ってバグるのを防ぎ、安全に自動改行させる必須呪文です。",
    mission: "break-allプロパティを指定して、枠内にURLテキストをきれいに閉じ込めましょう。",
    pages: [
      {
        fileName: 'index.html',
        language: 'html',
        initialCode: "<div style=\"width: 160px; background: #f1f5f9;\">\n  https://codeplayground.app/labs/trace/mode/super/long/url/test/index.html\n</div>",
        correctCode: `<div style="width: 160px; background: #f1f5f9; padding: 10px; border: 1px solid #94a3b8; font-size:11px; font-family: monospace; word-break: break-all; color: #2563eb;">https://codeplayground.app/labs/trace/mode/super/long/url/test/index.html</div>`
      }
    ]
  },

  // ==========================================
  // 【3】WordPress カテゴリ (10問)
  // ==========================================
  {
    id: 21,
    category: 'WordPress',
    title: "WP 01：メインループ基本構造",
    description: "WordPress開発の全ての根底！投稿データが管理画面にある限り自動でループして出力するお決まりのPHPコードです。",
    mission: "WP開発で1億回書くことになる基本ループの構文を、タイポなしで正確に書き写してください。",
    pages: [
      {
        fileName: 'index.php',
        language: 'html',
        initialCode: "<?php\nif ( ):\n  while ( ):\n    \n  endwhile;\nendif;\n?>",
        correctCode: `<?php\nif ( have_posts() ) :\n  while ( have_posts() ) : the_post();\n    // 投稿内容を出力するコアエリア\n  endwhile;\nendif;\n?>`
      }
    ]
  },
  {
    id: 22,
    category: 'WordPress',
    title: "WP 02：ヘッダー・フッターの外部テンプレート読み込み",
    description: "共通パーツとなるheader.phpやfooter.phpを呼び出して、1つのサイトにガッチャンコする定番関数です。",
    mission: "WordPress固有のインクルード関数を正しく写経し、サイトの骨組みを完成させましょう。",
    pages: [
      {
        fileName: 'index.php',
        language: 'html',
        initialCode: "\n<main>\n  <p>コンテンツ</p>\n</main>",
        correctCode: `<?php get_header(); ?>\n\n<main>\n  <p>コンテンツ</p>\n</main>\n\n<?php get_footer(); ?>`
      }
    ]
  },
  {
    id: 23,
    category: 'WordPress',
    title: "WP 03：記事タイトルと本文の出力自動化",
    description: "管理画面の投稿一覧で入力した「タイトル」と「エディタの中身」をフロント側に展開するコア関数です。",
    mission: "the_で始まる2大出力関数をメインループ内に正確に配置して、記事を表示させてください。",
    pages: [
      {
        fileName: 'single.php',
        language: 'html',
        initialCode: "<article>\n  <h2><?php // タイトル ?></h2>\n  <div><?php // 本文 ?></div>\n</article>",
        correctCode: `<article>\n  <h2><?php the_title(); ?></h2>\n  <div><?php the_content(); ?></div>\n</article>`
      }
    ]
  },
  {
    id: 24,
    category: 'WordPress',
    title: "WP 04：スタイルシートへの絶対パス動的取得",
    description: "テーマの直下にあるstyle.cssへの絶対パス（URL）を、WordPress側から安全に自動取得してLinkさせる手法です。",
    mission: "テーマフォルダ内のCSSのURLを書き出すPHPの命令タグを正確にマークアップしてください。",
    pages: [
      {
        fileName: 'header.php',
        language: 'html',
        initialCode: "<link rel=\"stylesheet\" href=\"<?php // パス ?>/style.css\">",
        correctCode: `<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css">`
      }
    ]
  },
  {
    id: 25,
    category: 'WordPress',
    title: "WP 05：テーマ必須フックの埋め込み",
    description: "これが無いとプラグインが100%全滅する！プラグインのシステムコードを安全に流し込むための最重要関門です。",
    mission: "head閉じタグの直前と、body閉じタグ of 直前に、お決まりの必須フックを埋め込んでください。",
    pages: [
      {
        fileName: 'footer.php',
        language: 'html',
        initialCode: "  <footer>フッター</footer>\n  <?php // フッター必須フック ?>\n</body>\n</html>",
        correctCode: `  <footer>フッター</footer>\n  <?php wp_footer(); ?>\n</body>\n</html>`
      }
    ]
  },
  {
    id: 26,
    category: 'WordPress',
    title: "WP 06：看板アイキャッチ画像の条件分岐と出力",
    description: "ブログ記事の「サムネイル画像」が設定されているかをチェックし、あれば自動出力する実戦コードです。",
    mission: "has_post_thumbnailの条件分岐と、出力関数のコンビネーションを正確にトレースしてください。",
    pages: [
      {
        fileName: 'archive.php',
        language: 'html',
        initialCode: "<?php if ( ): ?>\n  <?php // サムネイル出力 ?>\n<?php endif; ?>",
        correctCode: `<?php if ( has_post_thumbnail() ) : ?>\n  <?php the_post_thumbnail('medium'); ?>\n<?php endif; ?>`
      }
    ]
  },
  {
    id: 27,
    category: 'WordPress',
    title: "WP 07：投稿日時のフォーマットカスタム出力",
    description: "「2026/05/18」など、自分の好きな形式で記事の投稿時間を表示させるカスタム出力タグです。",
    mission: "引数の中に年月日を表すフォーマット文字列（'Y/m/d'）を正しく指定して写経してください。",
    pages: [
      {
        fileName: 'loop-item.php',
        language: 'html',
        initialCode: "<span><?php the_time( ); ?></span>",
        correctCode: `<span><?php the_time('Y/m/d'); ?></span>`
      }
    ]
  },
  {
    id: 28,
    category: 'WordPress',
    title: "WP 08：条件分岐（フロントページかどうかの判定）",
    description: "「トップページだけに特大バナーを表示し、他の下層ページでは非表示にしたい」という時の一大定番条件分岐です。",
    mission: "is_front_page関数を使った、WordPressの条件分岐の閉じ方までを綺麗に模写してください。",
    pages: [
      {
        fileName: 'home.php',
        language: 'html',
        initialCode: "<?php if ( ): ?>\n  <h1>特大バナー</h1>\n<?php  ; ?>",
        correctCode: `<?php if ( is_front_page() || is_home() ) : ?>\n  <h1>特大バナー</h1>\n<?php endif; ?>`
      }
    ]
  },
  {
    id: 29,
    category: 'WordPress',
    title: "WP 09：カスタムサブループクエリ",
    description: "メインのページとは別に、「お知らせカテゴリの記事だけを新着3件、サイドバーに無理やり引っ張ってきて表示する」最強の特級呪文です。",
    mission: "引数の配列（args）と、new WP_Queryのセット、そしてループ終了後のリセット（reset_postdata）までを完璧に写経してください。",
    pages: [
      {
        fileName: 'sidebar.php',
        language: 'html',
        initialCode: "<?php\n$args = array('post_type' => 'news', 'posts_per_page' => 3);\n$the_query = \nif ( ):\n  while ( ): \n?>\n  <h3><?php the_title(); ?></h3>\n<?php \n  endwhile;\n  // ここでリセット\nendif;\n?>",
        correctCode: `<?php\n$args = array('post_type' => 'news', 'posts_per_page' => 3);\n$the_query = new WP_Query($args);\nif ( $the_query->have_posts() ) :\n  while ( $the_query->have_posts() ) : $the_query->the_post();\n    echo '<h3>' . get_the_title() . '</h3>';\n  endwhile;\n  wp_reset_postdata();\nendif;\n?>`
      }
    ]
  },
  {
    id: 30,
    category: 'WordPress',
    title: "WP 10：オリジナルテーマサポート機能の有効化",
    description: "テーマ開発の第1歩！「このオリジナルテーマはアイキャッチ画像機能やタイトルタグを自動生成します！」とWPコアに宣言するコードです。",
    mission: "functions.phpの超定番セットアップ関数を、最後のセミコロンまで完璧にトレースしてください。",
    pages: [
      {
        fileName: 'functions.php',
        language: 'html',
        initialCode: "<?php\nfunction my_theme_setup() {\n  \n}\nadd_action('after_setup_theme', 'my_theme_setup');",
        correctCode: `<?php\nfunction my_theme_setup() {\n  add_theme_support('post-thumbnails');\n  add_theme_support('title-tag');\n}\nadd_action('after_setup_theme', 'my_theme_setup');`
      }
    ]
  }
];