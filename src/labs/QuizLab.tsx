import { useState } from 'react';

interface Question {
  id: number;
  category: 'HTML/CSS' | 'JavaScript' | 'WordPress' | 'DevTools/Git';
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const QUIZ_DATA: Question[] = [
  {
    id: 1,
    category: 'HTML/CSS',
    question: "display: inline; が指定された要素の「特徴」として『正しい』ものはどれですか？",
    options: [
      "width（横幅）や height（高さ）を指定してサイズを自由に変えられる",
      "上下の margin（外側余白）が適用されない",
      "自動的に改行され、画面の横幅いっぱいに広がる",
      "background-color（背景色）を設定することができない"
    ],
    correctIdx: 1,
    explanation: "inline要素（spanやaタグなど）はテキストの一部として扱われるため、上下のmarginや、width/heightのサイズ指定が効かないという重要な特性を持っています。"
  },
  {
    id: 2,
    category: 'HTML/CSS',
    question: "CSSで「縦に並んだ2つの要素」の間枠で、上の要素の margin-bottom: 30px; と下の要素の margin-top: 20px; が重なったとき、実際の要素間の隙間は何ピクセルになりますか？",
    options: ["10px", "20px", "30px", "50px"],
    correctIdx: 2,
    explanation: "これは「マージンの相殺（Margin Collapse）」と呼ばれる現象です。ブロック要素が縦に並んだとき、マージンは足し算（50px）されず、値の大きい方（30px）の隙間だけが適用されます。"
  },
  {
    id: 3,
    category: 'JavaScript',
    question: "JavaScriptにおいて、「 5 == '5' 」と「 5 === '5' 」を実行したときの結果の組み合わせとして正しいものはどれですか？",
    options: [
      "両方とも true になる",
      "両方とも false になる",
      "前者が true、後者が false になる",
      "前者が false、後者が true になる"
    ],
    correctIdx: 2,
    explanation: "「==」はデータの「型」を自動で変換して中身だけを比べる（true）のに対し、「===」は型（数値か文字か）まで厳密に比べる（false）ため、実務ではバグを防ぐために常に「===」を使うのが鉄則です。"
  },
  {
    id: 4,
    category: 'JavaScript',
    question: "JavaScriptの配列（Array）の「末尾」に、新しい要素を1つ追加するための正しいメソッドはどれですか？",
    options: ["array.add()", "array.push()", "array.append()", "array.concat()"],
    correctIdx: 1,
    explanation: "配列の最後にデータを追加するのは `push()` です。逆に、配列の先頭に追加する場合は `unshift()`、末尾から削除する場合は `pop()` を使用します。"
  },
  {
    id: 5,
    category: 'WordPress',
    question: "WordPressテーマ開発において、裏側のデータベースから「記事のデータがまだ残っているか」をチェックしてループを回すための必須関数はどれですか？",
    options: ["get_posts()", "query_posts()", "have_posts()", "the_post()"],
    correctIdx: 2,
    explanation: "メインループの条件式で使うのは `have_posts()` です。「もし記事があるなら（if）、ある限り繰り返す（while）」のセットの中に組み込んで使用します。"
  },
  {
    id: 6,
    category: 'WordPress',
    question: "WordPressで既存のテーマを安全にカスタマイズ（改造）するために作る「子テーマ」において、テーマ名や親テーマの情報を記述する絶対に欠かせないファイルはどれですか？",
    options: ["index.php", "functions.php", "style.css", "screenshot.png"],
    correctIdx: 2,
    explanation: "子テーマを作る際は、`style.css` の冒頭にコメント形式で `Template: 親テーマのフォルダ名` を記述することで、WordPressがそれを子テーマとして認識するようになります。"
  },
  {
    id: 7,
    category: 'DevTools/Git',
    question: "Gitを使って開発中、別の作業をするために「今の未コミットの変更を一時的にどこか安全な場所に退避（貯金）させたい」ときに使う超重要コマンドはどれですか？",
    options: ["git checkout", "git stash", "git revert", "git reset"],
    correctIdx: 1,
    explanation: "作業を一時保存するコマンドは `git stash` です。退避させた作業を元に戻したいときは `git stash pop` を実行すれば一瞬で復活します。"
  },
  {
    id: 8,
    category: 'DevTools/Git',
    question: "WEB制作中、「コードを書き換えたのに、ブラウザのキャッシュのせいで古い見た目のまま変わらない」という現象を破壊し、強制的に最新状態を読み込ませる「スーパーリロード」のショートカットキー（Windows/Google Chrome）はどれですか？",
    options: ["Ctrl + R", "F5", "Ctrl + Shift + R", "Alt + F4"],
    correctIdx: 2,
    explanation: "通常の更新（F5）だとブラウザが保存した古いデータ（キャッシュ）を読み込んでしまうため、制作現場ではキャッシュを完全に無視して新しくダウンロードし直す `Ctrl + Shift + R`（Macは `Cmd + Shift + R`）を1日100回くらい叩きます。"
  },
  {
    id: 9,
    category: 'HTML/CSS',
    question: "WEBサイトをスマホやタブレット、PCなど様々な画面幅に対応させる（レスポンシブWebデザイン）際、CSSのレイアウトが切り替わる基準となる「画面幅の境界線」のことを何と呼びますか？",
    options: ["グリッドライン", "メディアビュー", "ブレイクポイント", "ビューポート"],
    correctIdx: 2,
    explanation: "切り替える境界線のことを「ブレイクポイント」と呼びます。CSSの `@media (max-width: 768px)` のように記述して、スマホとPCの表示を切り分けます。"
  },
  {
    id: 10,
    category: 'WordPress',
    question: "【最終試練】WordPressサイトの最重要ファイルであり、データベース（MySQL）への接続パスワードや、セキュリティ用の暗号化キーがすべて生データで記録されているファイル名はどれですか？",
    options: ["wp-settings.php", "wp-config.php", "functions.php", ".htaccess"],
    correctIdx: 1,
    explanation: "WordPressの心臓部にあたる設定ファイルが `wp-config.php` です。このファイルが漏洩したり、記述を1文字でもミスするとサイトが完全に真っ白（データベース接続確立のエラー）になって爆発します。"
  }
];

export default function QuizLab() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const q = QUIZ_DATA[currentIdx] || QUIZ_DATA;

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedIdx === null || isAnswered) return;
    setIsAnswered(true);
    if (selectedIdx === q.correctIdx) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_DATA.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg p-6 max-w-2xl mx-auto shadow-2xl text-left font-sans select-none">
      
      {/* 🔮 タイトルエリア */}
      <div className="border-b border-[#3c3c3c] pb-3 mb-5 flex justify-between items-center">
        <div>
          <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-bold font-mono mr-2">LAB 04</span>
          <span className="text-xs font-bold text-slate-400">❓ Quiz Lab：フロントエンド＆WP 現場エンジニア試験</span>
        </div>
        {!quizFinished && (
          <span className="text-xs font-mono font-bold text-slate-500">Q. {q.id} / {QUIZ_DATA.length}</span>
        )}
      </div>

      {!quizFinished ? (
        <div className="space-y-6">
          
          {/* 問題文 */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#2d2d2d] text-cyan-400">{q.category}</span>
            <h3 className="text-sm font-bold text-white leading-relaxed pt-1">{q.question}</h3>
          </div>

          {/* 選択肢リスト */}
          <div className="space-y-2">
            {q.options.map((option, idx) => {
              let btnStyle = "bg-[#252526] text-slate-300 border-[#3c3c3c] hover:bg-[#2d2d2d]";
              
              if (selectedIdx === idx) {
                btnStyle = "bg-[#0e639c]/30 text-cyan-400 border-cyan-500 font-bold";
              }
              
              if (isAnswered) {
                if (idx === q.correctIdx) {
                  btnStyle = "bg-emerald-950/40 text-emerald-400 border-emerald-500 font-bold";
                } else if (selectedIdx === idx) {
                  btnStyle = "bg-rose-950/40 text-rose-400 border-rose-500 line-through";
                } else {
                  btnStyle = "bg-[#1a1a1a] text-slate-600 border-transparent opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full text-left p-3.5 text-xs rounded border transition flex items-start gap-3 leading-relaxed ${btnStyle}`}
                >
                  <span className="font-mono bg-black/40 px-1.5 py-0.5 rounded text-[10px] text-slate-400 select-none">{idx + 1}</span>
                  <span className="flex-1">{option}</span>
                </button>
              );
            })}
          </div>

          {/* アクションボタン */}
          <div>
            {!isAnswered ? (
              <button
                disabled={selectedIdx === null}
                onClick={handleCheckAnswer}
                className={`w-full text-white font-bold text-xs py-2.5 rounded uppercase tracking-wider transition ${selectedIdx !== null ? 'bg-purple-600 hover:bg-purple-500 cursor-pointer' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
              >
                ✔ 選択した回答をロックして判定
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white font-bold text-xs py-2.5 rounded uppercase tracking-wider transition"
              >
                {currentIdx + 1 === QUIZ_DATA.length ? '🏁 最終試験を終了してスコアを見る' : '➡ 次の現場トラブルへ進む'}
              </button>
            )}
          </div>

          {/* 💡 動的解説（回答後に出現） */}
          {isAnswered && (
            <div className={`p-4 rounded border text-xs leading-relaxed transition ${selectedIdx === q.correctIdx ? 'bg-emerald-950/10 border-emerald-900/60 text-emerald-300' : 'bg-rose-950/10 border-rose-900/60 text-rose-300'}`}>
              <div className="font-bold mb-1 font-sans flex items-center gap-1">
                {selectedIdx === q.correctIdx ? '⭕ CORRECT!! 正解です！' : '❌ WRONG!! ミスを検出しました。'}
              </div>
              <p className="text-slate-400">{q.explanation}</p>
            </div>
          )}

        </div>
      ) : (
        // 🏁 試験結果画面
        <div className="text-center py-6 space-y-6">
          <div className="text-4xl">🏆</div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">エンジニア試験、全ての全工程が終了！</h3>
            <p className="text-xs text-slate-500 font-mono">あなたの現場サバイバルレート結果</p>
          </div>

          <div className="bg-black/30 inline-block p-6 rounded-xl border border-[#3c3c3c] font-mono">
            <div className="text-xs text-slate-400">正解数 / 総トラブル数</div>
            <div className="text-4xl font-bold mt-1 text-purple-400">{score} <span className="text-sm text-slate-500">/ {QUIZ_DATA.length}</span></div>
            <div className="text-[11px] text-slate-400 mt-2 font-sans bg-purple-950/20 px-3 py-1 rounded border border-purple-900/40">
              {score === QUIZ_DATA.length ? "👑 神！現場リーダー級の完璧な知識量です！" : score >= 7 ? "✨ 合格！実務に出てすぐに活躍できるレベルです！" : "⏳ 要復習！もう一度各ラボを回って知識を固めよう！"}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="block mx-auto px-6 py-2 bg-[#2d2d2d] hover:bg-[#37373d] text-slate-300 hover:text-white font-bold text-xs rounded border border-[#3c3c3c] transition"
          >
            🔄 知識を再テストする
          </button>
        </div>
      )}

    </div>
  );
}