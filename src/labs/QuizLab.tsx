import { useState, useEffect } from 'react';
// 👑 パスを実際のエクスプローラー上の小文字ファイル名（quizData1、quizData2）に完全一致させました！
import type { Question } from './quizTypes';
import { QUIZ_DATA_1 } from './quizData1'; // IT資格・WEBデザインなど
import { QUIZ_DATA_2 } from './quizData2'; // JavaScript・WordPress・視覚レイアウトなど

// すべての分割データをマージして200問フル稼働の土台を作る
const ALL_REAL_QUIZ_DATA: Question[] = [...QUIZ_DATA_1, ...QUIZ_DATA_2];

// 本物のカテゴリ型の定義
type RealCategory = 'all' | 'IT資格(過去問)' | 'WEBデザイン' | 'JavaScript' | 'WordPress' | '視覚レイアウト';

export default function QuizLab() {
  // --- 状態管理 ---
  const [selectedCategory, setSelectedCategory] = useState<RealCategory>('all');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [hasSavedProgress, setHasSavedProgress] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>("");

  // カテゴリ名（文字列）で厳密にフィルタリング
  const filteredQuiz = ALL_REAL_QUIZ_DATA.filter(q => 
    selectedCategory === 'all' ? true : q.category === selectedCategory
  );

  // ローカルストレージからセーブデータを検出
  useEffect(() => {
    const savedIdx = localStorage.getItem('quiz_current_idx');
    const savedScore = localStorage.getItem('quiz_score');
    const savedCat = localStorage.getItem('quiz_category');

    if (savedIdx && savedScore && savedCat) {
      setHasSavedProgress(true);
    }
  }, []);

  // クイズ開始・再開ロジック
  const startQuiz = (resume: boolean) => {
    if (resume) {
      const savedIdx = localStorage.getItem('quiz_current_idx');
      const savedScore = localStorage.getItem('quiz_score');
      const savedCat = localStorage.getItem('quiz_category');
      
      if (savedCat) setSelectedCategory(savedCat as RealCategory);
      if (savedIdx) setCurrentIdx(parseInt(savedIdx, 10));
      if (savedScore) setScore(parseInt(savedScore, 10));
    } else {
      localStorage.removeItem('quiz_current_idx');
      localStorage.removeItem('quiz_score');
      localStorage.setItem('quiz_category', selectedCategory);
      setCurrentIdx(0);
      setScore(0);
    }
    setQuizStarted(true);
    setIsAnswered(false);
    setSelectedAns(null);
  };

  // 回答送信処理
  const handleAnswerSubmit = (idx: number) => {
    if (isAnswered) return;
    setSelectedAns(idx);
    setIsAnswered(true);

    const isCorrect = idx === filteredQuiz[currentIdx].correctIdx;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    // バックグラウンド自動保存
    localStorage.setItem('quiz_current_idx', (currentIdx + 1).toString());
    localStorage.setItem('quiz_score', newScore.toString());
  };

  // 次の問題へ
  const handleNextQuestion = () => {
    if (currentIdx + 1 < filteredQuiz.length) {
      setCurrentIdx(prev => prev + 1);
      setIsAnswered(false);
      setSelectedAns(null);
    } else {
      alert(`お疲れ様でした！全問題をクリアしました！\nスコア: ${score} / ${filteredQuiz.length}`);
      clearSavedProgress();
    }
  };

  // 一時中断・進捗セーブ
  const handleSuspendQuiz = () => {
    localStorage.setItem('quiz_current_idx', currentIdx.toString());
    localStorage.setItem('quiz_score', score.toString());
    localStorage.setItem('quiz_category', selectedCategory);
    
    setSaveMessage("💾 進捗とカテゴリを安全に保存しました！");
    setTimeout(() => {
      setQuizStarted(false);
      setHasSavedProgress(true);
      setSaveMessage("");
    }, 1500);
  };

  const clearSavedProgress = () => {
    localStorage.removeItem('quiz_current_idx');
    localStorage.removeItem('quiz_score');
    localStorage.removeItem('quiz_category');
    setHasSavedProgress(false);
    setQuizStarted(false);
  };

  const currentQuestion = filteredQuiz[currentIdx];

  return (
    <div className="flex flex-col h-screen w-full bg-[#0f172a] text-white font-sans overflow-hidden items-center justify-center p-6 text-left">
      
      {!quizStarted ? (
        /* スタート ＆ カテゴリ選択画面 */
        <div className="bg-[#1e293b] border border-[#334155] p-8 rounded-2xl max-w-2xl w-full text-center shadow-2xl">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-2xl font-black text-cyan-400 mb-1">QUIZ LAB 200</h1>
          <p className="text-xs text-slate-400 mb-6">途中でいつでも中断・再開できるセーブ機能付き</p>

          {/* カテゴリ選択タブ（Grid配置） */}
          <div className="grid grid-cols-3 bg-[#141414] p-2 rounded-xl gap-2 border border-[#2d2d2d] mb-6">
            {(['all', 'IT資格(過去問)', 'WEBデザイン', 'JavaScript', 'WordPress', '視覚レイアウト'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all truncate ${selectedCategory === cat ? 'bg-cyan-600 text-white shadow font-black' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {cat === 'all' ? '全部まとめて挑戦' : cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 max-w-md mx-auto">
            {hasSavedProgress && (
              <button 
                onClick={() => startQuiz(true)}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl transition cursor-pointer shadow-lg"
              >
                ▶ 前回の続きから再開（{localStorage.getItem('quiz_category')}）
              </button>
            )}
            
            <button 
              onClick={() => startQuiz(false)}
              className="w-full bg-[#334155] hover:bg-[#475569] text-slate-200 font-bold py-2.5 rounded-xl transition cursor-pointer text-xs"
            >
              {hasSavedProgress ? "現在のカテゴリで最初から始める" : "このカテゴリでクイズを始める"}
            </button>
          </div>
        </div>
      ) : (
        
        /* クイズ本編画面 */
        <div className="bg-[#1e293b] border border-[#334155] p-8 rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col justify-between min-h-[520px]">
          
          <div className="flex justify-between items-center border-b border-[#334155] pb-4 mb-6 shrink-0">
            <span className="text-xs font-mono bg-cyan-950 text-cyan-400 px-3 py-1 rounded-full font-bold">
              {currentQuestion?.category} : {currentIdx + 1} / {filteredQuiz.length} 問
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              SCORE: {score} 正解
            </span>
            <button 
              onClick={handleSuspendQuiz}
              className="text-[11px] bg-rose-950 hover:bg-rose-900 text-rose-400 font-bold px-3 py-1 rounded-lg border border-rose-800 transition cursor-pointer"
            >
              ⏸ 中断して進捗を保存
            </button>
          </div>

          {saveMessage ? (
            <div className="flex-1 flex items-center justify-center text-center text-emerald-400 font-bold animate-pulse">
              {saveMessage}
            </div>
          ) : (
            <>
              {currentQuestion && (
                <div className="flex-1 mb-6">
                  <h2 className="text-sm font-bold text-slate-100 leading-relaxed mb-6">
                    {currentQuestion.question}
                  </h2>

                  <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((option, idx) => {
                      let btnStyle = "bg-[#141414] border-slate-700 hover:border-cyan-500 text-slate-300";
                      if (isAnswered) {
                        if (idx === currentQuestion.correctIdx) {
                          btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-400 font-bold shadow-md";
                        } else if (idx === selectedAns) {
                          btnStyle = "bg-rose-950 border-rose-500 text-rose-400";
                        } else {
                          btnStyle = "bg-[#141414] border-slate-800 text-slate-600 opacity-50 cursor-not-allowed";
                        }
                      }
                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleAnswerSubmit(idx)}
                          className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle} ${!isAnswered && 'cursor-pointer'}`}
                        >
                          <span>{idx + 1}. {option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {isAnswered && (
                <div className="mt-4 pt-4 border-t border-[#334155] shrink-0">
                  <div className="bg-[#141414] p-4 rounded-xl border border-slate-800 mb-4 text-xs text-slate-400 leading-relaxed">
                    <strong className="block text-cyan-400 mb-1">💡 解説:</strong>
                    {currentQuestion.explanation}
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition cursor-pointer text-xs tracking-wider"
                  >
                    {currentIdx + 1 === filteredQuiz.length ? "結果発表へ 🏁" : "次の問題へ進む ➔"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}