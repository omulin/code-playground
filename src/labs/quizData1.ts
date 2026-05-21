import type { Question } from './quizTypes';

export const QUIZ_DATA_1: Question[] = [
  // ==========================================
  // 🎖️ IT資格・国家試験（ITパスポート・基本情報）
  // ==========================================
  {
    id: 1,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】DNS（Domain Name System）の主たる役割として、適切なものはどれですか？",
    options: [
      "ドメイン名とIPアドレスを互いに変換する",
      "ネットワーク上の複合機の共有を制御する",
      "WebブラウザとWebサーバー間の通信を暗号化する",
      "サーバーのCPUやメモリの負荷を分散する"
    ],
    correctIdx: 0,
    explanation: "DNSは、人間が理解しやすい「google.com」のようなドメイン名と、コンピュータが識別する「142.250.X.X」のようなIPアドレスを翻訳・紐付ける仕組みです。"
  },
  {
    id: 2,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】公開鍵暗号方式において、送信者が「受信者の公開鍵」を使って暗号化したメッセージを、受信者が復号するために使用する鍵はどれですか？",
    options: ["送信者の公開鍵", "送信者の秘密鍵", "受信者の公開鍵", "受信者の秘密鍵"],
    correctIdx: 3,
    explanation: "公開鍵暗号方式では、誰でも使える『受信者の公開鍵』で暗号化したデータは、ペアとなる世界に一つだけの『受信者の秘密鍵』でしか開けることができません。"
  },
  {
    id: 3,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】個人情報保護法において、個人情報取扱事業者が個人情報を取得した際、原則として本人に通知または公表しなければならないものはどれですか？",
    options: ["事業者の昨年度の売上高", "個人情報の利用目的", "管理責任者の自宅住所", "暗号化に使用しているアルゴリズム名"],
    correctIdx: 1,
    explanation: "個人情報を取得した場合は、何のためにそのデータを使うのかという「利用目的」を、本人に通知または公表しなければならないと法律で定められています。"
  },
  {
    id: 4,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】データベースのトランザクション処理において、処理が途中で失敗した際に、状態を処理開始前の正常な状態に『巻き戻す』操作を何と呼びますか？",
    options: ["コミット (Commit)", "ロールバック (Rollback)", "チェックポイント (Checkpoint)", "バックアップ (Backup)"],
    correctIdx: 1,
    explanation: "処理を完全に確定させることを「コミット」と呼ぶのに対し、エラーが起きた際にすべての処理を取り消して元の状態に巻き戻すことを「ロールバック」と言います。"
  },
  {
    id: 5,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】情報セキュリティの3要素（機密性、完全性、可用性）のうち、「認められた人だけが情報にアクセスできる状態を確保すること」に該当するものはどれですか？",
    options: ["機密性 (Confidentiality)", "完全性 (Integrity)", "可用性 (Availability)", "責任追跡性 (Accountability)"],
    correctIdx: 0,
    explanation: "機密性はアクセス権を持つ人だけが情報に触れられる状態、完全性はデータが改ざんされていない状態、可用性は必要な時にいつでも使える状態を指します。"
  },
  {
    id: 6,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】マルチタスクOSにおいて、複数のプロセスが互いに相手の管理する資源の解放を待ち続け、どちらも先に進めなくなってしまう現象を何と呼びますか？",
    options: ["スラッシング", "デッドロック", "セマフォ", "ページフォールト"],
    correctIdx: 1,
    explanation: "互いに相手がロックしているリソースが解放されるのを永遠に待ち続けてしまう膠着状態のことを「デッドロック」と呼びます。"
  },
  {
    id: 7,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】企業が保有する機密情報や個人情報を狙い、技術的な手法ではなく、人間の心理的な隙や騙しのテクニックを用いてパスワード等を盗み出す手口を何と呼びますか？",
    options: ["ソーシャルエンジニアリング", "ブルートフォースアタック", "クロスサイトスクリプティング", "SQLインジェクション"],
    correctIdx: 0,
    explanation: "肩越しにパスワードを盗み見たり（ショルダーハッキング）、関係者を装って電話で聞き出したりする人間的な攻撃手法を「ソーシャルエンジニアリング」と呼びます。"
  },
  {
    id: 8,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】ネットワークの通信プロトコルOSI参照モデルにおいて、ルーターが稼働し、IPアドレスを元にデータの最適な経路選択（ルーティング）を行うレイヤーはどれですか？",
    options: ["物理層 (第1層)", "データリンク層 (第2層)", "ネットワーク層 (第3層)", "トランスポート層 (第4層)"],
    correctIdx: 2,
    explanation: "ルーターやIPアドレスが属するのは「ネットワーク層（第3層）」です。MACアドレスやスイッチが属するのはデータリンク層（第2層）になります。"
  },
  {
    id: 9,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】インターネット上の通信において、データを暗号化して送受信し、第三者による盗聴や改ざんを防ぐためのプロトコル（URLが https:// で始まるもの）はどれですか？",
    options: ["FTP", "SMTP", "HTTP", "HTTPS (SSL/TLS)"],
    correctIdx: 3,
    explanation: "HTTPSは、従来のHTTPにSSL/TLSによる暗号化と通信相手の認証（証明書）を組み合わせた、現在のWeb通信の標準安全プロトコルです。"
  },
  {
    id: 10,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】システム開発における「アジャイル開発」の特徴として、最も適切なものはどれですか？",
    options: [
      "開発工程を上流から下流へ厳密に一方向で進める",
      "小さな単位で「計画・開発・テスト・リリース」を繰り返す",
      "仕様変更は最初の設計段階以降、一切認めない",
      "全てのモジュールが完成するまでシステムを一切動かさない"
    ],
    correctIdx: 1,
    explanation: "アジャイル開発は、変化の激しい要件に対して、短いサイクル（イテレーション）で開発とリリースを繰り返す、柔軟性の高い開発手法です。"
  },
  {
    id: 11,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】パスワードの破り方のうち、理論上あり得るすべての文字の組み合わせを片っ端から試していく、いわゆる「総当たり攻撃」を何と呼びますか？",
    options: ["辞書攻撃", "ブルートフォースアタック", "フィッシング攻撃", "中間者攻撃"],
    correctIdx: 1,
    explanation: "すべての組み合わせを総当たりで試す攻撃を「ブルートフォースアタック」と呼びます。「辞書攻撃」は実在する単語を組み合わせて試す手法です。"
  },
  {
    id: 12,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】関係データベース（RDB）の操作において、2つのテーブルから共通の列（外部キーなど）を基準にして、データを横に結合して1つの表にする操作を何と呼びますか？",
    options: ["選択 (Selection)", "射影 (Projection)", "結合 (Join)", "和 (Union)"],
    correctIdx: 2,
    explanation: "SQLの `JOIN` 句に相当する、複数のテーブルを結びつけて情報を統合するリレーショナル代数の操作を「結合」と呼びます。"
  },
  {
    id: 13,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】ソフトウェアのソースコードを無償で一般公開し、誰でも自由に改良や再配布ができるようにしたソフトウェアを総称して何と呼びますか？",
    options: ["シェアウェア", "フリーウェア", "オープンソースソフトウェア (OSS)", "プロプライエタリソフトウェア"],
    correctIdx: 2,
    explanation: "LinuxやWordPressのように、ソースコードが公開され改変・配布の自由が認められているものを「OSS（オープンソースソフトウェア）」と呼びます。"
  },
  {
    id: 14,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】ソフトウェアテストにおいて、プログラムの内部構造（コードの分岐やロジック）を意識せず、仕様書通りの入力に対して正しい出力が得られるかを確認する手法を何と呼びますか？",
    options: ["ホワイトボックステスト", "ブラックボックステスト", "回帰テスト", "静的解析テスト"],
    correctIdx: 1,
    explanation: "中身のコードを見ずに外側の仕様（機能）だけをテストする手法が「ブラックボックステスト」です。中のロジックを網羅するテストは「ホワイトボックス」と呼ばれます。"
  },
  {
    id: 15,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】PCやスマホなどの端末が、社内ネットワークやインターネットに接続する際、プライベートIPアドレスを自動的に割り当ててくれるプロトコルはどれですか？",
    options: ["DNS", "DHCP", "NTP", "IMAP"],
    correctIdx: 1,
    explanation: "DHCP（Dynamic Host Configuration Protocol）は、ネットワークに接続した端末に対してIPアドレスなどの設定情報を自動で貸し出す仕組みです。"
  },
  {
    id: 16,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】CPUの性能指標の一つで、1秒間に実行できる「クロック（周期的な信号）」の回数を表し、単位として主に「GHz」などが使われるものはどれですか？",
    options: ["キャッシュメモリ", "クロック周波数", "バス幅", "MIPS"],
    correctIdx: 1,
    explanation: "クロック周波数が高いほど、CPUは1秒間に多くの命令を処理できるため、処理スピードの重要な指標となります。"
  },
  {
    id: 17,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】フィッシング詐欺などの対策として有効な、ログイン時に通常のパスワードだけでなく、スマホのSMSに送られるワンタイムコード等を要求する仕組みを何と呼びますか？",
    options: ["多要素認証 (MFA)", "シングルサインオン (SSO)", "生体認証", "リスクベース認証"],
    correctIdx: 0,
    explanation: "知識（パスワード）、所持（スマホ）、生体（指紋）など、異なる複数の要素を組み合わせてセキュリティを高める手法を「多要素認証（MFA）」と言います。"
  },
  {
    id: 18,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】プログラムの設計書作成において、長方形やひし形などの記号を使って、処理の分岐や繰り返しといったアルゴリズムの「流れ」を視覚的に表現した図を何と呼びますか？",
    options: ["ER図", "ユースケース図", "フローチャート（流れ図）", "シーケンス図"],
    correctIdx: 2,
    explanation: "処理の手順や条件分岐を矢印と記号で上から順に追いかけられるように記述した図を「フローチャート」と呼びます。"
  },
  {
    id: 19,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】電子メールの送信時に、宛先（To）のほかに「参考として同じ内容を共有したい人」を指定し、他の受信者にもそのメールアドレスが全員に見える状態の送信設定はどれですか？",
    options: ["Bcc", "Cc", "Subject", "Reply-To"],
    correctIdx: 1,
    explanation: "Cc（Carbon Copy）は全員にアドレスが公開されます。一方、Bcc（Blind Carbon Copy）は他の受信者にアドレスが隠される設定です。"
  },
  {
    id: 20,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】ITサービスマネジメントのベストプラクティス（成功事例）を集めたフレームワークで、サービスデスクの運用やインシデント管理などの標準基準となっているものはどれですか？",
    options: ["ITIL (Information Technology Infrastructure Library)", "SLA (Service Level Agreement)", "COBIT", "ISO 9001"],
    correctIdx: 0,
    explanation: "ITIL（アイティル）は、ITサービス運営の運用プロセスを体系化した世界標準の教科書・フレームワークです。"
  },
  {
    id: 21,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】インターネット上で、実在する本物のWebサイトそっくりの偽サイトを作成し、そこに誘導してクレジットカード番号やパスワードを盗み出す詐欺行為を何と呼びますか？",
    options: ["ランサムウェア", "フィッシング", "スパイウェア", "DoS攻撃"],
    correctIdx: 1,
    explanation: "銀行やECサイトの偽メールから偽サイトへ「釣る」ように誘導する詐欺を「フィッシング（Phishing）」と呼びます。"
  },
  {
    id: 22,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】システム全体の処理能力を高める手法のうち、サーバーの台数を「増やす」ことで負荷を分散させ、システム全体の並列処理能力を上げるアプローチを何と呼びますか？",
    options: ["スケールアップ", "スケールアウト", "リファクタリング", "プロビジョニング"],
    correctIdx: 1,
    explanation: "サーバーの台数を増やして横に並べるのが「スケールアウト」です。これに対し、1台のサーバー自体のCPUやメモリを増強して縦に強くするのを「スケールアップ」と言います。"
  },
  {
    id: 23,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】コンピュータの主記憶装置（メインメモリ）に保存されているデータを、電源を切っても消えないようにハードディスクやSSDなどの外部記憶装置に保存する操作を一般に何と呼びますか？",
    options: ["ロード", "セーブ（書き込み）", "シャットダウン", "初期化"],
    correctIdx: 1,
    explanation: "揮発性メモリ（電源を切ると消える）の内容を、不揮発性ストレージ（消えない）に移して固定化することを「セーブ・保存」と言います。"
  },
  {
    id: 24,
    category: 'IT資格(過去問)',
    question: "【基本情報技術者】プログラムの実行時に、ソースコードを1行ずつ機械語に翻訳しながら即座に実行していく方式のプログラム言語（Python、Ruby、JavaScriptなど）を何と呼びますか？",
    options: ["コンパイラ型言語", "インタプリタ型言語", "アセンブリ言語", "マークアップ言語"],
    correctIdx: 1,
    explanation: "1行ずつ翻訳実行する方式を「インタプリタ」と呼びます。逆に、実行前にまとめてすべてのコードを翻訳して実行ファイルを作る方式を「コンパイラ型（C言語など）」と呼びます。"
  },
  {
    id: 25,
    category: 'IT資格(過去問)',
    question: "【ITパスポート】社内のネットワーク（LAN）と外部のインターネットの境界線上に配置され、不正な通信を遮断して内部システムを守る「防火壁」の役割を持つシステムは何ですか？",
    options: ["プロキシサーバー", "ルーター", "ファイアウォール", "ゲートウェイ"],
    correctIdx: 2,
    explanation: "ファイアウォール（Firewall）は、あらかじめ設定したルールに基づいて、通過させる通信と遮断する通信を厳密に制御する盾の役割を担います。"
  },

  // ==========================================
  // 🎨 WEBデザイン・コーディング
  // ==========================================
  {
    id: 26,
    category: 'WEBデザイン',
    question: "【Webクリエイター】HTML5において、Webサイトの「主要なナビゲーション（リンクの集まり）」を表すために最も適したセマンティックタグはどれですか？",
    options: ["<section>", "<nav>", "<aside>", "<menu>"],
    correctIdx: 1,
    explanation: "サイトのメニューやナビゲーションバーには、構造を意味的に正しく伝えるために `<nav>` タグを使用するのがHTML5の標準ルールです。"
  },
  {
    id: 27,
    category: 'WEBデザイン',
    question: "【CSS設計】CSSの命名規則「BEM（Block Element Modifier）」において、「.card__title--large」というクラス名の「--large」が表している要素はどれですか？",
    options: ["枠組み（Block）", "パーツ（Element）", "状態やスタイル（Modifier）", "アニメーション（Animation）"],
    correctIdx: 2,
    explanation: "BEMでは、アンダースコア2つ（__）が中身の要素（Element）を表し、ハイフン2つ（--）が「大きい」「赤い」といった見た目のバリエーションや状態（Modifier）を表します。"
  },
  {
    id: 28,
    category: 'WEBデザイン',
    question: "【WebUI】Webサイトにおいて、現在のページ位置を「トップ ＞ カテゴリ ＞ 詳細」のように階層構造のテキストリンクで表現したナビゲーションUIを何と呼びますか？",
    options: ["ハンバーガーメニュー", "ファーストビュー", "パンくずリスト", "フッターナビ"],
    correctIdx: 2,
    explanation: "童話『ヘンゼルとグレーテル』で道迷い防止に落としたパンくずに由来し、ユーザーがサイトのどこにいるのかを迷わずに伝えるUIを「パンくずリスト」と呼びます。"
  },
  {
    id: 29,
    category: 'WEBデザイン',
    question: "【CSS】レスポンシブWebデザインにおいて、画面サイズ（ブラウザの横幅）に応じてCSSの適用スタイルを切り替えるために使用する記述（ルール）は何ですか？",
    options: ["@import", "@media (メディアクエリ)", "@keyframes", "@font-face"],
    correctIdx: 1,
    explanation: "`@media (max-width: 768px)` のように書くメディアクエリを使用することで、PC、タブレット、スマホそれぞれの画面幅に最適なデザインを1つのCSSで切り替えることができます。"
  },
  {
    id: 30,
    category: 'WEBデザイン',
    question: "【配色】Webデザインのカラー設計において、サイト全体の印象を最も大きく決定づけ、全体の約25%程度を占めるべきとされる色のことを何と呼びますか？",
    options: ["ベースカラー", "メインカラー（ブランドカラー）", "アクセントカラー", "モノトーンカラー"],
    correctIdx: 1,
    explanation: "一般的な配色比率は「ベース（70%）」「メイン（25%）」「アクセント（5%）」とされており、テーマや企業のアイデンティティを伝える主役の色がメインカラーです。"
  },
  {
    id: 31,
    category: 'WEBデザイン',
    question: "【HTML】検索エンジンのクローラーに対して、ページの「著者」や「要約（ディスクリプション）」、「キーワード」などの機械的な情報を伝えるために `<head>` タグ内に記述する要素は何ですか？",
    options: ["<link>", "<script>", "<meta>", "<style>"],
    correctIdx: 2,
    explanation: "`<meta name=\"description\" content=\"...\">` のように指定するmetaタグは、画面には直接映りませんが、SEOやブラウザへの挙動指示において極めて重要な役割を持ちます。"
  },
  {
    id: 32,
    category: 'WEBデザイン',
    question: "【CSS】ボックスモデルにおいて、要素の境界線（border）の内側にある「中身のテキストから境界線までの余白」を制御するCSSプロパティはどれですか？",
    options: ["margin", "padding", "border-width", "outline"],
    correctIdx: 1,
    explanation: "内側の余白を「padding」、境界線の外側にある他の要素との間の余白を「margin」で制御します。ここを混同するとレイアウトが崩れる原因になります。"
  },
  {
    id: 33,
    category: 'WEBデザイン',
    question: "【画像フォーマット】背景を透明（透過）にすることができ、写真よりも色数が少ないロゴやイラスト、図解などをWebページに劣化なしで配置するのに最適な画像形式はどれですか？",
    options: ["JPEG", "PNG", "GIF", "BMP"],
    correctIdx: 1,
    explanation: "PNGは可逆圧縮フォーマットで、アルファチャンネル（透過）をサポートしているため、Webサイトのロゴやアイコンの切り抜き配置に最も適しています。"
  },
  {
    id: 34,
    category: 'WEBデザイン',
    question: "【SEO】画像を表示できない環境や、検索エンジンのロボットに対して「その画像が何を表しているか」を正しいテキストで伝えるために、`<img>` タグに必ず設定すべき属性は何ですか？",
    options: ["title属性", "src属性", "alt属性 (代替テキスト)", "id属性"],
    correctIdx: 2,
    explanation: "alt属性（Alternative text）を適切に書くことで、画像の読み込みエラー時や視覚障害者向けのスクリーンリーダー、検索エンジンのクローラーに画像の意味を伝えることができます。"
  },
  {
    id: 35,
    category: 'WEBデザイン',
    question: "【CSS】要素の配置において、基準となる親要素に対して「完全に絶対的な位置（上から50px、右から20pxなど）」にパーツをピン留め固定したい場合、子要素に指定する `position` の値は何ですか？",
    options: ["static", "relative", "absolute", "fixed"],
    correctIdx: 2,
    explanation: "親要素に `position: relative;` を指定した状態で、子要素に `position: absolute;` を設定すると、親を基準とした絶対配置のレイアウトを自由自在に組むことができます。"
  },
  {
    id: 36,
    category: 'WEBデザイン',
    question: "【フォント】Webデザインにおいて、PCやスマホに内蔵されているフォントではなく、インターネット経由でフォントデータを読み込み、ユーザーの端末に依存せず同じフォントを表示させる仕組みを何と呼びますか？",
    options: ["システムフォント", "Webフォント (Google Fonts等)", "ビットマップフォント", "オープンタイプフォント"],
    correctIdx: 1,
    explanation: "Webフォントを使うと、ユーザーのPCにそのフォントが入っていなくても、意図した通りの美しいタイポグラフィ（文字デザイン）を完全に統一して表現できます。"
  },
  {
    id: 37,
    category: 'WEBデザイン',
    question: "【CSS】複数行にわたる文章において、行と行の間の「行間（上下のスペース）」を調整するために使用するCSSプロパティはどれですか？",
    options: ["letter-spacing", "word-spacing", "line-height", "font-size"],
    correctIdx: 2,
    explanation: "`line-height: 1.6;` のように倍率や数値で指定するこのプロパティは、文章の読みやすさ（可読性）を上げるためにデザイン上で極めて重要な要素です。"
  },
  {
    id: 38,
    category: 'WEBデザイン',
    question: "【HTML】フォーム部品において、複数の選択肢の中から「1つだけ」を選ばせたい場合に使用する、inputタグの `type` 属性値は何ですか？",
    options: ["checkbox", "radio", "text", "submit"],
    correctIdx: 1,
    explanation: "1つだけを選ばせる場合は「radio（ラジオボタン）」を使用します。複数選択を許可する場合は「checkbox（チェックボックス）」が適しています。"
  },
  {
    id: 39,
    category: 'WEBデザイン',
    question: "【アクセシビリティ】Webサイトを閲覧する際、極端に色が薄い文字などが見づらくなるのを防ぐために、テキスト色と背景色の間に一定以上の「明暗の差」を持たせる基準指標を何と呼びますか？",
    options: ["グラデーション", "コントラスト比", "彩度", "透過度"],
    correctIdx: 1,
    explanation: "W3Cのガイドラインでは、通常のテキストで「4.5:1」以上のコントラスト比を確保することが推奨されており、誰もが情報を読み取れる優しい設計の基本です。"
  },
  {
    id: 40,
    category: 'WEBデザイン',
    question: "【CSS】特定の要素に対してマウスカーソルが乗った時（ホバー時）だけのスタイルを指定したい場合に、セレクタの末尾に付与する疑似クラスは何ですか？",
    options: [":focus", ":active", ":hover", ":visited"],
    correctIdx: 2,
    explanation: "`.btn:hover { background: red; }` のように記述する `:hover` を使うことで、ボタンにマウスが乗った時に色を変えるといったインタラクティブな演出を追加できます。"
  },
  {
    id: 41,
    category: 'WEBデザイン',
    question: "【HTML】ページ内の特定の場所（例えばフッターや料金表セクション）に、一瞬でスクロール移動する「ページ内リンク（アンカーリンク）」を実装する際、リンク先の要素の何属性とaタグのhrefを結びつけますか？",
    options: ["class属性", "id属性", "name属性", "rel属性"],
    correctIdx: 1,
    explanation: "移動先の要素に `<section id=\"pricing\">` とIDを振り、リンク側を `<a href=\"#pricing\">` とシャープ付きで指定することで、ページ内スクロールリンクが成立します。"
  },
  {
    id: 42,
    category: 'WEBデザイン',
    question: "【デザイン原則】関連する情報や要素同士を物理的に近づけてグループ化し、視覚的に「これらは仲間である」とユーザーに一瞬で理解させる、デザインの4大原則の1つは何ですか？",
    options: ["整列 (Alignment)", "近接 (Proximity)", "反復 (Repetition)", "コントラスト (Contrast)"],
    correctIdx: 1,
    explanation: "「近接」の原則を使い、関係のある要素の距離を近づけ、関係ない要素との間に余白を開けることで、見やすいレイアウトが生まれます。"
  },
  {
    id: 43,
    category: 'WEBデザイン',
    question: "【HTML】Webサイトのフッター部分に記述することが多い、サイトの著作権の所有者や発行年を表す「© 2026 Boss All Rights Reserved.」のような表記を何と呼びますか？",
    options: ["ライセンス表記", "コピーライト表記", "サイトマップ", "ディスクリプション"],
    correctIdx: 1,
    explanation: "サイトのコンテンツの著作権が誰に帰属しているかを明示するための記述を「コピーライト（著作権）表記」と呼びます。"
  },
  {
    id: 44,
    category: 'WEBデザイン',
    question: "【CSS】はみ出た要素の扱いを設定する `overflow` プロパティにおいて、親要素のボックスの幅や高さを超えてはみ出した中身を「非表示（バッサリ切り取る）」にしたい場合の値は何ですか？",
    options: ["visible", "scroll", "auto", "hidden"],
    correctIdx: 3,
    explanation: "`overflow: hidden;` を指定すると、ボックスからはみ出た部分が非表示になります。丸みのあるカードの中に画像を収める際などに重宝します。"
  },
  {
    id: 45,
    category: 'WEBデザイン',
    question: "【UX】ユーザーがWebサイトを開いた際、最初に画面に表示されるスクロールを一切していない状態の「最上部エリア（第一印象を決めるメインビジュアルなど）」を業界用語で何と呼びますか？",
    options: ["フッタービュー", "サイドバー", "ファーストビュー (Above the fold)", "ランディングエリア"],
    correctIdx: 2,
    explanation: "ファーストビューは、ユーザーがサイトに滞在し続けるか、離脱するかを判断する最も重要な3秒間を決める、サイトの顔となるエリアです。"
  },
  {
    id: 46,
    category: 'WEBデザイン',
    question: "【CSS】最新のモダンなレイアウト手法で、行（横）と列（縦）の2次元のマス目をベースにして、まるでパズルをはめるように複雑なWebデザインを自由にレイアウトできるCSSプロパティは何ですか？",
    options: ["display: block", "display: flex", "display: grid", "display: inline-block"],
    correctIdx: 2,
    explanation: "1次元（横一列など）の並びを得意とする `flex` に対して、縦横のグリッド（マス目）で全体の配置をカチッと制御できるのが `display: grid` です。"
  },
  {
    id: 47,
    category: 'WEBデザイン',
    question: "【画像フォーマット】近年Webサイトで急速に普及している、数式で描画されるため「どれだけ拡大・縮小しても画像が一切ぼやけず、画質が劣化しない」ロゴやアイコンに最適なベクター画像形式はどれですか？",
    options: ["JPEG", "PNG", "SVG", "WebP"],
    correctIdx: 2,
    explanation: "SVG（Scalable Vector Graphics）は、拡大してもドットのギザギザが出ないため、高解像度のディスプレイやレスポンシブなアイコン配置に最適です。"
  },
  {
    id: 48,
    category: 'WEBデザイン',
    question: "【HTML】文章の中で「特に重要なキーワードやフレーズ」であることをブラウザや検索エンジンに伝えるために使用する、デフォルトで文字が太字になるセマンティックタグはどれですか？",
    options: ["<b>", "<i>", "<strong>", "<em>"],
    correctIdx: 2,
    explanation: "単に見ためを太字にする `<b>` と違い、`<strong>` タグは「構造的・意味的に重要である」という強調の意味を検索エンジンに正しく伝える役割を持ちます。"
  },
  {
    id: 49,
    category: 'WEBデザイン',
    question: "【CSS】複数の要素が重なり合う際、どの要素を「手前（前面）」に出すかという重なりの順序（Z軸の優先度）を数値で指定するCSSプロパティは何ですか？",
    options: ["index-level", "z-index", "layer-order", "float-priority"],
    correctIdx: 1,
    explanation: "`z-index: 999;` のように大きな数値を指定した要素が手前に表示されます。ただし、`position` プロパティ（relativeやabsolute等）と併用しないと効かない仕様です。"
  },
  {
    id: 50,
    category: 'WEBデザイン',
    question: "【WebUI】スマホ向けのWebサイト等でよく見られる、3本の横線が並んだアイコン（クリックするとメニューが横からスライドして出てくるUIボタン）を、その形状から何と呼びますか？",
    options: ["サンドイッチメニュー", "ピザボタン", "ハンバーガーメニュー", "トースト通知"],
    correctIdx: 2,
    explanation: "横3本線がハンバーガーのバンズとパティに似ていることから「ハンバーガーメニュー」と呼ばれ、限られた画面幅を有効に使うスマホデザインの定番です。"
  },
// ==========================================
  // 🎨 WEBデザイン・コーディング（続き）
  // ==========================================
  {
    id: 51,
    category: 'WEBデザイン',
    question: "【HTML】Webサイトにおいて、文章の「大見出し」を定義するタグであり、SEOの観点からも1ページ内に原則1つだけ配置することが推奨されているタグはどれですか？",
    options: ["<heading>", "<head>", "<h1>", "<title>"],
    correctIdx: 2,
    explanation: "見出しタグは `<h1>` から `<h6>` まであり、そのページの中で最も重要なタイトルや大見出しには `<h1>` を割り当てるのがセマンティックWebの基本ルールです。"
  },
  {
    id: 52,
    category: 'WEBデザイン',
    question: "【CSS】レスポンシブ対応において、画像の幅を「親要素の幅に合わせて自動で縮小させ、かつ画像本来のサイズよりは大きくしない」ために、実務でほぼ100%画像に指定されるモダンCSSの組み合わせはどれですか？",
    options: [
      "width: 100%; height: 100%;",
      "max-width: 100%; height: auto;",
      "min-width: 320px; width: auto;",
      "object-fit: cover; width: 100vw;"
    ],
    correctIdx: 1,
    explanation: "`max-width: 100%;` と `height: auto;` を指定することで、縦横比（アスペクト比）を崩さずに、親ボックスの縮小に合わせて画像が綺麗に縮んでくれます。"
  },
  {
    id: 53,
    category: 'WEBデザイン',
    question: "【WebUI】スマートフォンサイト等で、画面を下にスクロールしても画面の最上部、または最下部にずっと張り付いたまま固定されているナビゲーションバーのUIを何と呼びますか？",
    options: ["モーダルウィンドウ", "トグルナビゲーション", "スティッキーヘッダー（固定ヘッダー）", "ドロップダウンメニュー"],
    correctIdx: 2,
    explanation: "スクロールしても常に視界に入り、他のページへの移動を邪魔しないようにピン留めされたUIを、スティッキー（固定）ヘッダー/フッターと呼びます。"
  },
  {
    id: 54,
    category: 'WEBデザイン',
    question: "【CSS】テキストやブロック要素を完全に「非表示」にし、存在そのものをブラウザのレイアウト空間から消し去る（余白も残さない）プロパティと値の組み合わせはどれですか？",
    options: ["visibility: hidden;", "opacity: 0;", "display: none;", "hidden: true;"],
    correctIdx: 2,
    explanation: "`visibility: hidden` や `opacity: 0` は見えなくなるだけで「元の透明な余白」が残りますが、`display: none` は要素の存在ごと完全に詰めて消し去ります。"
  },
  {
    id: 55,
    category: 'WEBデザイン',
    question: "【配色】Webデザインにおける配色ルールのうち、ボタンやリンクなど、ユーザーの視線を最も引きつけたい「重要なコンバージョンポイント」にピンポイントで使用する色の名称は何ですか？",
    options: ["ベースカラー", "メインカラー", "アクセントカラー", "ナチュラルカラー"],
    correctIdx: 2,
    explanation: "全体のごくわずか（約5%）に強烈な「アクセントカラー」を配置することで、ユーザーは迷うことなくクリックすべき場所を視覚的に認知できます。"
  },
  {
    id: 56,
    category: 'WEBデザイン',
    question: "【HTML】番号の付かない「箇条書き（ドット付きのリスト）」を作成する際、親要素として全体を包むべき正しいHTMLタグはどれですか？",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    correctIdx: 1,
    explanation: "順序のないリストは `<ul>（Unordered List）` を使い、順序のある番号付きリストは `<ol>（Ordered List）` を使います。中身の項目はどちらも `<li>` です。"
  },
  {
    id: 57,
    category: 'WEBデザイン',
    question: "【CSS】CSSでグラデーションの背景を設定したい場合、`background-image` プロパティのバリューとして使用する、線形グラデーションを作るための関数名は何ですか？",
    options: ["radial-gradient()", "linear-gradient()", "mix-blend-mode()", "color-linear()"],
    correctIdx: 1,
    explanation: "`linear-gradient(direction, color1, color2)` のように指定することで、指定した方向に向かって美しく変化する背景色をコードだけで実装できます。"
  },
  {
    id: 58,
    category: 'WEBデザイン',
    question: "【画像フォーマット】Googleが開発した次世代の軽量画像形式で、JPEGやPNGと同等以上の画質を保ちながら、データサイズを劇的に小さくしてWebサイトの表示速度を爆速にする拡張子は何ですか？",
    options: ["WebP (.webp)", "SVG (.svg)", "TIFF (.tiff)", "AVIF (.avif)"],
    correctIdx: 0,
    explanation: "現在のモダンWeb制作では、サイトの軽量化とスピード改善（コアウェブバイタル対策）のために、画像をWebPに変換して掲載するのが標準となっています。"
  },
  {
    id: 59,
    category: 'WEBデザイン',
    question: "【HTML】ページ内のコンテンツが、本編とは直接関係のない「サイドバーの情報」や「補足コラム、広告」であることをブラウザや検索エンジンに明示するHTML5のセマンティックタグは何ですか？",
    options: ["<section>", "<article>", "<aside>", "<main>"],
    correctIdx: 2,
    explanation: "メインコンテンツから分離した、補足情報や周辺のレイアウトエリアには `<aside>` タグを割り当てるのが意味的に正しいコーディングです。"
  },
  {
    id: 60,
    category: 'WEBデザイン',
    question: " miniatures と呼ばれる、要素を横並びにするCSSプロパティ `display: flex;` の初期状態において、子要素を「右寄せ」や「中央揃え」、「均等配置」など、横方向の揃え位置を自由にコントロールするプロパティは何ですか？",
    options: ["align-items", "justify-content", "flex-direction", "align-content"],
    correctIdx: 1,
    explanation: "主軸方向（デフォルトは横方向）の揃えを制御するのは `justify-content` です。垂直方向（縦方向）の揃えを制御するのは `align-items` になります。"
  },
  {
    id: 61,
    category: 'WEBデザイン',
    question: "【タイポグラフィ】文字の読みやすさを調整する技法のうち、特定の文字と文字の間の隙間を個別に検知して、視覚的に等間隔に見えるように詰める文字詰め調整を何と呼びますか？",
    options: ["トラッキング", "カーニング", "リーディング", "フォントサイズ変更"],
    correctIdx: 1,
    explanation: "全体の文字間を一律で開けるのをトラッキングと呼ぶのに対し、特定の文字ペア（「ト」と「ー」など）の隙間を個別に調整して詰める職人技を「カーニング」と呼びます。"
  },
  {
    id: 62,
    category: 'WEBデザイン',
    question: "【CSS】ボックスモデルにおいて、要素の『外側の余白』を意味し、隣り合う要素との間のディスタンス（距離）をあけるために使用するCSSプロパティはどれですか？",
    options: ["padding", "margin", "border", "gap"],
    correctIdx: 1,
    explanation: "要素自身の内側の肉厚な余白は `padding`、要素と要素がぶつかり合わないように外側に敷く境界線を超えた余白は `margin` で指定します。"
  },
  {
    id: 63,
    category: 'WEBデザイン',
    question: "【HTML】Webフォームにおいて、複数行の長文（お問い合わせ内容やレビュー文など）をユーザーに入力させたい場合に使用するHTMLタグは何ですか？",
    options: ["<input type=\"text\">", "<input type=\"textarea\">", "<textarea>", "<input-form>"],
    correctIdx: 2,
    explanation: "通常の1行テキストは `<input type=\"text\">` ですが、折り返しができる複数行の入力エリアを作りたい場合は独立した `<textarea>` タグを使用します。"
  },
  {
    id: 64,
    category: 'WEBデザイン',
    question: "【CSS】要素の角を丸めて「角丸デザイン」にしたり、正方形の要素の値を `50%` に設定することで完全な「正円（アイコンなど）」を作り出すことができるCSSプロパティは何ですか？",
    options: ["border-style", "border-radius", "box-shadow", "clip-path"],
    correctIdx: 1,
    explanation: "`border-radius` を使用すると、ボタンの端を丸くしたり、プロフィール画像を綺麗に丸く切り抜いたりする表現がCSSだけで簡単に行えます。"
  },
  {
    id: 65,
    category: 'WEBデザイン',
    question: "【HTML】クリックした際、他のWebサイトにジャンプしたり、ページ内の別セクションにジャンプしたりする「超リンク（ハイパーリンク）」を作成するaタグにおいて、遷移先のURLを指定する必須の属性は何ですか？",
    options: ["src属性", "href属性", "link属性", "target属性"],
    correctIdx: 1,
    explanation: "`<a href=\"https://...\">リンクテキスト</a>` のように、`href（Hypertext Reference）` 属性にジャンプ先のURLをセットすることでリンクとして機能します。"
  },
  {
    id: 66,
    category: 'WEBデザイン',
    question: "【CSS】背景画像をボックスに表示する際、画像がボックスの縦横比と合わなくても、画像を一切歪ませずに「ボックス全体を完全に覆い尽くすように自動でトリミング拡大・縮小」させる値はどれですか？",
    options: ["background-size: contain;", "background-size: cover;", "background-size: 100% 100%;", "background-size: auto;"],
    correctIdx: 1,
    explanation: "`cover` を指定すると、縦横比を維持したまま、背景エリアに隙間ができないように画像を画面いっぱいに広げてくれます。隙間なく全体を収めるのは `contain` です。"
  },
  {
    id: 67,
    category: 'WEBデザイン',
    question: "【HTML】Webサイトの最も下部に配置され、コピーライト表記やプライバシーポリシーへのリンク、簡易的なサイトマップなどをまとめるために使用するHTML5のタグは何ですか？",
    options: ["<bottom>", "<header>", "<ending>", "<footer>"],
    correctIdx: 3,
    explanation: "サイトのフット（足元）を意味するセマンティック要素が `<footer>` です。反対に、サイトのロゴやヘッダーナビを包むのは `<header>` になります。"
  },
  {
    id: 68,
    category: 'WEBデザイン',
    question: "【CSS】文字の太さ（ウェイト）を変更するCSSプロパティであり、一般的な太字（ボールド）に指定したい場合にバリューとして設定する値はどれですか？",
    options: ["font-style: bold;", "font-weight: bold;", "text-decoration: bold;", "font-size: large;"],
    correctIdx: 1,
    explanation: "文字の太さは `font-weight` プロパティで制御します。値には `bold` などのキーワードのほか、`400`（通常）や `700`（太字）といった数値も指定できます。"
  },
  {
    id: 69,
    category: 'WEBデザイン',
    question: "【HTML】表データ（テーブル）を作成するHTMLにおいて、表の「行（横一列）」を定義するために、中身のセル要素を包み込むタグはどれですか？",
    options: ["<table>", "<td>", "<th>", "<tr>"],
    correctIdx: 3,
    explanation: "`<tr>（Table Row）` で行（横の並び）を作り、その中に実際のデータセルである `<td>（Table Data）` や見出しセル `<th>（Table Header）` を配置します。"
  },
  {
    id: 70,
    category: 'WEBデザイン',
    question: "【CSS】マウスカーソルを当てたときの要素の挙動（アニメーションなど）において、変化にかかる時間（例: 0.3秒かけてフワッと色が変わる）を定義するCSSプロパティは何ですか？",
    options: ["animation-delay", "transition", "transform", "speed-rate"],
    correctIdx: 1,
    explanation: "`transition: background-color 0.3s;` のように書くことで、急激な色の変化をなめらかなアニメーションに変換し、心地よいUI（UX）を提供できます。"
  },
  {
    id: 71,
    category: 'WEBデザイン',
    question: "【WEBフォント】文字のデザインにおいて、文字の線の端に「ウロコ」と呼ばれる小さな飾りや突出した飾りのない、Web画面で最もすっきりと読みやすいゴシック体に近いフォント系統の総称は何ですか？",
    options: ["serif (明朝体系)", "sans-serif (ゴシック体系)", "monospace (等幅フォント)", "cursive (筆記体系)"],
    correctIdx: 1,
    explanation: "フランス語で「〜がない」を意味する sans が付き、飾りのないフォントを `sans-serif` と呼びます。飾りがある明朝体やローマン体は `serif` と呼ばれます。"
  },
  {
    id: 72,
    category: 'WEBデザイン',
    question: "【HTML】他の要素をグループ化するための「ただの透明な箱」であり、意味を持たないが、CSSのスタイルを適用したりJavaScriptで操作したりするために実務で最も多用されるブロック要素のタグは何ですか？",
    options: ["<span>", "<section>", "<div>", "<box>"],
    correctIdx: 2,
    explanation: "意味を持たない純粋なコンテナが `<div>（Division）` です。同じく意味を持たないインライン用の要素には `<span>` が使われます。"
  },
  {
    id: 73,
    category: 'WEBデザイン',
    question: "【CSS】リンクの下線を消したり、箇条書きの先頭の黒丸（・）を消し去ってメニューバーに加工したりする際、装飾をリセットするために使用するプロパティは何ですか？",
    options: ["text-style: none;", "list-style: none;", "border: none;", "display: inline;"],
    correctIdx: 1,
    explanation: "`<ul>` や `<li>` の先頭のマーカーを消すには `list-style: none;` を使用します。aタグの下線を消す場合は `text-decoration: none;` を使用します。"
  },
  {
    id: 74,
    category: 'WEBデザイン',
    question: "【HTML】外部にある独立したCSSファイルを、HTMLファイルに結びつけて読み込ませる（適用する）ために、`<head>` タグ内に記述する正しい要素タグはどれですか？",
    options: ["<script>", "<style>", "<link rel=\"stylesheet\" href=\"...\">", "<import>"],
    correctIdx: 2,
    explanation: "外部CSSファイルの読み込みには `<link>` タグを使用し、`rel=\"stylesheet\"` 属性でそれがスタイルシートであることをブラウザに伝えます。"
  },
  {
    id: 75,
    category: 'WEBデザイン',
    question: "【WEBデザイン原則】デザインにおいて、すべての要素の配置を適当に置くのではなく、見えない直線（グリッド）を意識して縦や横のラインをキチッと綺麗に揃える原則を何と呼びますか？",
    options: ["近接 (Proximity)", "整列 (Alignment)", "反復 (Repetition)", "コントラスト (Contrast)"],
    correctIdx: 1,
    explanation: "「整列」を徹底することで、要素間に明確な秩序とつながりが生まれ、ユーザーがストレスなく視線を誘導できる美しい画面が構築されます。"
  },
  {
    id: 76,
    category: 'WEBデザイン',
    question: "【CSS】テキストの文字同士の間隔（文字間）を広げたり狭めたりして、タイポグラフィの美しさや読みやすさを細かく調整するCSSプロパティはどれですか？",
    options: ["line-height", "letter-spacing", "text-indent", "font-variant"],
    correctIdx: 1,
    explanation: "`letter-spacing: 0.05em;` のように指定することで、フォント特有の詰まり感を解消し、ゆったりとした洗練された印象のデザインに仕上げることができます。"
  },
  {
    id: 77,
    category: 'WEBデザイン',
    question: "【HTML】Webフォームにおいて、複数の選択肢の中から「ユーザーにチェックを入れさせ、複数選択を可能にする」ためのチェック用の四角いボックスを作るinputタグの属性値は何ですか？",
    options: ["type=\"radio\"", "type=\"checkbox\"", "type=\"select\"", "type=\"box\""],
    correctIdx: 1,
    explanation: "「checkbox」は複数選択が可能な四角いボタンになります。1つしか選べない丸いボタンは「radio」です。"
  },
  {
    id: 78,
    category: 'WEBデザイン',
    question: "【CSS】要素の背景に「色」を設定するCSSプロパティであり、16進数のカラーコード（#ffffff等）やカラー名、RGB値などを用いて背景を一色に染めるプロパティは何ですか？",
    options: ["color", "background-color", "background-image", "fill-color"],
    correctIdx: 1,
    explanation: "文字色を変えるのが `color`、ボックスの背景の色を変えるのが `background-color` です。混同しやすいので注意が必要です。"
  },
  {
    id: 79,
    category: 'WEBデザイン',
    question: "【WebUI】Webサイトでボタンや特定の画像リンクをクリックした際、画面全体が薄暗くなり、その最前面にポップアップ形式でフワッと浮き上がってくる独立した子ウィンドウUIを何と呼びますか？",
    options: ["アコーディオンメニュー", "ドロップダウンリスト", "モーダルウィンドウ", "ツールチップ"],
    correctIdx: 2,
    explanation: "ユーザーに「閉じる」アクションを起こすまで他の操作をロックさせ、重要なお知らせやフォームを表示するUIを「モーダルウィンドウ」と呼びます。"
  },
  {
    id: 80,
    category: 'WEBデザイン',
    question: "【HTML】HTMLドキュメントの最も最初の1行目に必ず記述し、ブラウザに対して「このファイルは最新のHTML5の基準で記述されたドキュメントである」と伝える宣言を何と呼びますか？",
    options: ["<html>", "<head>", "<!DOCTYPE html>", "<?xml version=\"1.0\"?>"],
    correctIdx: 2,
    explanation: "`<!DOCTYPE html>`宣言を先頭に置くことで、ブラウザは「標準モード」という正しい仕様でHTMLを解釈し、デザインのズレを防止してくれます。"
  },
  {
    id: 81,
    category: 'WEBデザイン',
    question: "【CSS】要素に影を落とし、立体感やカードが宙に浮いているようなモダンな視覚効果を演出するために、実務でデザイン上非常によく使われるCSSプロパティは何ですか？",
    options: ["text-shadow", "box-shadow", "filter: drop-shadow()", "border-shadow"],
    correctIdx: 1,
    explanation: "`box-shadow: 水平方向 垂直方向 ぼかし 陰の広がり 色;` のように記述し、マテリアルデザインのような浮遊感のあるリッチなカードUIを作ることができます。"
  },
  {
    id: 82,
    category: 'WEBデザイン',
    question: "【HTML】aタグを使って外部サイトへのリンクを作る際、現在のタブを上書きせず、ブラウザの「新しい別タブ」でページを安全に開かせるために設定する属性と値の組み合わせはどれですか？",
    options: ["target=\"_blank\"", "target=\"_new\"", "rel=\"external\"", "href=\"_window\""],
    correctIdx: 0,
    explanation: "`target=\"_blank\"` を指定することで別タブが開きます。なお、セキュリティ対策として `rel=\"noopener noreferrer\"` を併記するのが現在の開発の鉄則です。"
  },
  {
    id: 83,
    category: 'WEBデザイン',
    question: "【WEBデザイン原則】ユーザーに情報の重要度を瞬時に理解させるため、文字の大きさや色、太さに圧倒的な「差（メリハリ）」をつけて視覚的優先度を明確にする原則はどれですか？",
    options: ["整列", "反復", "コントラスト（対比）", "近接"],
    correctIdx: 2,
    explanation: "見出しを特大に、本文を適度な大きさにするといった「コントラスト」を意識することで、ユーザーはページをスクロールしながら内容を瞬時にスキャンできます。"
  },
  {
    id: 84,
    category: 'WEBデザイン',
    question: "【HTML】Webサイトの中で、ひと繋がりの「意味のある独立したセクション・章（ニュース1件、ブログ記事のまとまり等）」であることを表すHTML5のマークアップタグは何ですか？",
    options: ["<div>", "<section>", "<article>", "<block>"],
    correctIdx: 1,
    explanation: "テーマ性のある一般的なセクションには `<section>`、それ自体が完全に自己完結しているニュース単体やブログ記事全体には `<article>` を使います。"
  },
  {
    id: 85,
    category: 'WEBデザイン',
    question: "【CSS】親要素に `display: flex;` を当てて要素を横並びにした際、画面幅が狭くなっても子要素を縮ませず、自動的に「次の行へ折り返して配置」させたい場合に親要素に指定するプロパティは何ですか？",
    options: ["flex-direction: row-reverse;", "flex-wrap: wrap;", "justify-content: space-around;", "align-content: flex-start;"],
    correctIdx: 1,
    explanation: "Flexboxのデフォルトは `flex-wrap: nowrap`（絶対に折り返さない）なため、レスポンシブで画面幅に応じてカードを次の行に落としたい場合は `wrap` の指定が必須です。"
  },
  {
    id: 86,
    category: 'WEBデザイン',
    question: "【WEBUI】質問をクリックすると、その下に隠れていた回答エリアがパタパタとアコーディオンのように縦にスライドして展開する、FAQページ定番のUIを何と呼びますか？",
    options: ["タブメニュー", "スライダー", "アコーディオン（トグルメニュー）", "ツールチップ"],
    correctIdx: 2,
    explanation: "楽器のアコーディオンの蛇腹の伸縮に似ていることからそう呼ばれ、最初の画面の縦幅をコンパクトに抑えつつ、多くの情報をスッキリ収納できるUIです。"
  },
  {
    id: 87,
    category: 'WEBデザイン',
    question: "【HTML】Webブラウザのタブに表示されるサイトのタイトルや、検索エンジンの検索結果にリンクとして青字で表示される、SEO上最も重要なHTMLタグは何ですか？",
    options: ["<h1>", "<meta name=\"title\">", "<title>", "<head-title>"],
    correctIdx: 2,
    explanation: "`<head>` の中に入れる `<title>` タグに書かれた文言は、そのページが何について書かれているかを伝える、Web上で最も重要なテキストデータです。"
  },
  {
    id: 88,
    category: 'WEBデザイン',
    question: "【CSS】要素の配置において、スクロールをいくらしても、ブラウザの「画面の特定の絶対位置（画面の右下にある、トップに戻るボタンなど）」に完全に固定してピン留めするpositionの値は何ですか？",
    options: ["static", "relative", "absolute", "fixed"],
    correctIdx: 3,
    explanation: "`position: fixed;` を指定すると、要素はスクロールの動き（ドキュメントのフロー）から完全に離脱し、指定した画面の座標（bottom: 20px等）に固定され続けます。"
  },
  {
    id: 89,
    category: 'WEBデザイン',
    question: "【画像最適化】Webサイトの読み込みスピードを上げるため、画像素材を表示サイズに合わせて縮小したり、画質を保ったままデータサイズを極限まで削る一連のエンジニアリング作業を何と呼びますか？",
    options: ["画像エンコード", "画像最適化（コンプレス・圧縮）", "リサイズ", "レンダリング"],
    correctIdx: 1,
    explanation: "スマホで撮った重い写真をそのままサイトに上げると表示が激重になるため、解像度を下げ、WebPなどの最新形式に「圧縮（最適化）」して配置するのがプロの鉄則です。"
  },
  {
    id: 90,
    category: 'WEBデザイン',
    question: "【HTML】Webページ内に画像を読み込んで表示させる際、必ず使用する空要素（閉じタグのない要素）のHTMLタグは何ですか？",
    options: ["<picture>", "<media>", "<img>", "<source>"],
    correctIdx: 2,
    explanation: "`<img src=\"画像のパス\" alt=\"説明\">` のように記述します。終了タグ（`</img>`）が存在しない独立した仕様の要素です。"
  },
  {
    id: 91,
    category: 'WEBデザイン',
    question: "【CSS】文字の色（フォントカラー）を自由に変更したい場合に、セレクタに対して指定する正しいCSSプロパティはどれですか？",
    options: ["font-color", "text-color", "color", "text-style"],
    correctIdx: 2,
    explanation: "文字色を変えるプロパティは、シンプルに `color` 単体です。`font-color` などのプロパティはCSSには存在しないため、初心者が非常によく間違えるトラップです。"
  },
  {
    id: 92,
    category: 'WEBデザイン',
    question: "【WEBデザイン原則】サイト内の同じ役割のパーツ（見出しのデザイン、ボタンの形、フォントの種類など）に一貫性を持たせ、同じルールを何度も「繰り返す」デザインの原則は何ですか？",
    options: ["整列", "反復 (Repetition)", "コントラスト", "近接"],
    correctIdx: 1,
    explanation: "「反復」を適用することで、ユーザーの中に「この青い四角はクリックできるボタンだ」という学習と安心感が生まれ、サイトの回遊性が飛躍的に向上します。"
  },
  {
    id: 93,
    category: 'WEBデザイン',
    question: "【HTML】順序が意味を持つ「番号付きの箇条書きリスト（1. 2. 3....）」を作成したい場合に、全体を包み込む正しい親要素タグはどれですか？",
    options: ["<ul>", "<ol>", "<li>", "<numbered-list>"],
    correctIdx: 1,
    explanation: "`<ol>（Ordered List）` を使用すると、ブラウザが自動的に先頭に「1.」「2.」「3.」と連番を振ってくれます。料理のレシピや手順のマークアップに最適です。"
  },
  {
    id: 94,
    category: 'WEBデザイン',
    question: "【CSS】Flexboxレイアウトにおいて、親要素に `display: flex;` をかけた際、中身の要素を横並びではなく「縦一列（上から下へ）」に整列する方向に変更するプロパティは何ですか？",
    options: ["flex-wrap: column;", "flex-direction: column;", "justify-content: center;", "align-items: stretch;"],
    correctIdx: 1,
    explanation: "整列の主軸の向きを決める `flex-direction` の初期値は `row（横並び）` です。これを `column` に変更することで、Flexboxの強力な整列機能を縦並びUIにもそのまま適用できます。"
  },
  {
    id: 95,
    category: 'WEBデザイン',
    question: "【WebUI】入力フォームなどで、入力項目欄の中に最初から薄いグレーの文字で表示されている、入力例やヒントを表す「例：山田太郎」といったテキスト属性を何と呼びますか？",
    options: ["value属性", "placeholder属性", "hint属性", "label属性"],
    correctIdx: 1,
    explanation: "`<input placeholder=\"例：yamada@example.com\">` のように指定するplaceholderは、ユーザーが文字を入力し始めた瞬間に自動的に消える便利な案内UIです。"
  },
  {
    id: 96,
    category: 'WEBデザイン',
    question: "HTML5において、Webサイトのヘッダー情報（サイトロゴやメインの案内ナビゲーション）を包む、セマンティックな最上部エリアのタグは何ですか？",
    options: ["<top>", "<head>", "<header>", "<main>"],
    correctIdx: 2,
    explanation: "画面の上部に位置する導入・ナビゲーションエリアには `<header>` タグを使います。機械的なメタ情報を詰め込む `<head>` タグとは全く別物です。"
  },
  {
    id: 97,
    category: 'WEBデザイン',
    question: "【CSS】背景に画像を敷く際、デフォルトの状態だと画像がボックスより小さい場合に「格子状に無限にリピート（繰り返し）表示」されてしまいます。これを1枚だけ表示させたい場合の値は何ですか？",
    options: ["background-repeat: no-repeat;", "background-repeat: initial;", "background-repeat: single;", "background-repeat: fixed;"],
    correctIdx: 0,
    explanation: "`background-repeat: no-repeat;` を指定することで画像の繰り返しがオフになり、背景に意図した位置に1枚だけ綺麗に画像を配置することができます。"
  },
  {
    id: 98,
    category: 'WEBデザイン',
    question: "【HTML】段落（文章のひとかたまり）を表すタグであり、前後に自動的に適度な一行分の余白が生まれる、テキストマークアップで最も基本となるタグは何ですか？",
    options: ["<text>", "<p>", "<span>", "<br>"],
    correctIdx: 1,
    explanation: "`<p>（Paragraph）` タグは段落を表し、文章を読みやすく構造化するための主役タグです。単なる改行である `<br>` の多用は現在のWeb制作では非推奨です。"
  },
  {
    id: 99,
    category: 'WEBデザイン',
    question: "【CSS】レスポンシブWebデザインにおいて、PC用デザインからスマホ用デザインへと切り替える「特定の境界線のドット幅（例: 768px）」のことを何と呼びますか？",
    options: ["ボーダーライン", "ブレイクポイント", "スイッチングピクセル", "メディア限界値"],
    correctIdx: 1,
    explanation: "メディアクエリで条件分岐させる画面幅の境目のことを「ブレイクポイント」と呼び、一般的なタブレットサイズ（768px）やスマホサイズ（480px）が基準として使われます。"
  },
  {
    id: 100,
    category: 'WEBデザイン',
    question: "【WEBUI】Webサイトのヘッダーにあるロゴなどをクリックした際、現在のページがどこであっても、サイトの最も最初のトップページに一瞬で戻れるように設定するリンクの `href` の値は何ですか？",
    options: ["href=\"#top\"", "href=\"/\"", "href=\"index.html\"", "href=\"#\""],
    correctIdx: 1,
    explanation: "ルート（最上層）を表す `\"/\"`（スラッシュ）をhrefリンクに指定することで、ドメインのトップページへ確実にユーザーを戻すことができます。"
  }
];
