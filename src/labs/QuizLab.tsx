import { useState } from 'react';
// 👑 厳格ルール(verbatimModuleSyntax)に完全対応
import type { Question } from './quizTypes';
import { QUIZ_DATA_1 } from './quizData1';
import { QUIZ_DATA_2 } from './quizData2';

const ALL_QUIZ_DATA: Question[] = [...QUIZ_DATA_1, ...QUIZ_DATA_2];

type FilterCategory = 'ALL' | 'IT資格(過去問)' | 'WEBデザイン' | 'JavaScript' | 'WordPress' | '視覚レイアウト';

export default function QuizLab() {
  const [currentCategory, setCurrentCategory] = useState<FilterCategory>('ALL');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  
  const [quizPhase, setQuizPhase] = useState<'select' | 'playing' | 'result' | 'review'>('select');
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [reviewIdx, setReviewIdx] = useState<number>(0);

  const startQuiz = (category: FilterCategory) => {
    setCurrentCategory(category);
    let filtered = ALL_QUIZ_DATA;
    if (category !== 'ALL') {
      filtered = ALL_QUIZ_DATA.filter(q => q.category === category);
    }
    
    setActiveQuestions(filtered);
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setWrongQuestions([]);
    setQuizPhase('playing');
  };

  // 👑 修正箇所：選択画面などで配列が空のときも、絶対にクラッシュしないよう安全ガードを実装！
  const currentQuestion = quizPhase === 'review' 
    ? (wrongQuestions[reviewIdx] || null)
    : (activeQuestions[currentIdx] || null);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedIdx === null || isAnswered || !currentQuestion) return;
    setIsAnswered(true);

    if (quizPhase === 'playing') {
      if (selectedIdx === currentQuestion.correctIdx) {
        setScore(prev => prev + 1);
      } else {
        setWrongQuestions(prev => [...prev, currentQuestion]);
      }
    }
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setIsAnswered(false);

    if (quizPhase === 'playing') {
      if (currentIdx + 1 < activeQuestions.length) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setQuizPhase('result');
      }
    } else if (quizPhase === 'review') {
      if (currentQuestion && selectedIdx === currentQuestion.correctIdx) {
        const updated = wrongQuestions.filter((_, i) => i !== reviewIdx);
        setWrongQuestions(updated);
        if (updated.length === 0) {
          setQuizPhase('result');
          return;
        }
        if (reviewIdx >= updated.length) {
          setReviewIdx(0);
        }
      } else {
        if (reviewIdx + 1 < wrongQuestions.length) {
          setReviewIdx(prev => prev + 1);
        } else {
          setReviewIdx(0);
        }
      }
    }
  };

  const renderVisualBlocks = () => {
    if (!currentQuestion || currentQuestion.category !== '視覚レイアウト') return null;

    let containerStyle: React.CSSProperties = {
      display: 'flex',
      gap: '10px',
      background: '#141414',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #333',
      justifyContent: 'flex-start',
      width: '100%',
      minHeight: '100px',
      alignItems: 'center'
    };

    if (currentQuestion.id === 162) {
      containerStyle.flexDirection = isAnswered && selectedIdx === currentQuestion.correctIdx ? 'column-reverse' : 'column';
      containerStyle.alignItems = 'flex-start';
    }

    return (
      <div className="mb-4 space-y-2">
        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">👁️ LAYOUT LAB SIMULATOR:</span>
        <div style={containerStyle} className="transition-all duration-500">
          <div className="px-4 py-2 bg-rose-600 rounded text-white font-bold font-mono text-xs shadow-md">🟥 A (赤)</div>
          <div className="px-4 py-2 bg-sky-600 rounded text-white font-bold font-mono text-xs shadow-md">🟦 B (青)</div>
          <div className="px-4 py-2 bg-emerald-600 rounded text-white font-bold font-mono text-xs shadow-md">🟩 C (緑)</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg p-6 max-w-2xl mx-auto shadow-2xl text-left font-sans select-none">
      <div className="border-b border-[#3c3c3c] pb-3 mb-5 flex justify-between items-center">
        <div>
          <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-bold font-mono mr-2">LAB 04</span>
          <span className="text-xs font-bold text-slate-300">
            {quizPhase === 'review' ? '🔄 弱点克服：見直しモード' : '❓ Quiz Lab：統合型IT資格・実務試験スタジアム'}
          </span>
        </div>
        {quizPhase === 'playing' && (
          <span className="text-xs font-mono font-bold text-slate-500">問題: {currentIdx + 1} / {activeQuestions.length}</span>
        )}
        {quizPhase === 'review' && (
          <span className="text-xs font-mono font-bold text-rose-400">残り: {wrongQuestions.length}問</span>
        )}
      </div>

      {quizPhase === 'select' && (
        <div className="space-y-6">
          <div className="text-center py-2 space-y-1">
            <h3 className="text-sm font-bold text-white">挑戦するジャンルを選択してください</h3>
            <p className="text-xs text-slate-500">全200問規模データバンクより抽出</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button onClick={() => startQuiz('ALL')} className="p-4 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded-xl text-left transition"><div className="text-xs font-bold text-white">🏆 総合ガチ試練（全混ぜ）</div></button>
            <button onClick={() => startQuiz('IT資格(過去問)')} className="p-4 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded-xl text-left transition"><div className="text-xs font-bold text-purple-400">🎖️ IT資格国家試験対策</div></button>
            <button onClick={() => startQuiz('WEBデザイン')} className="p-4 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded-xl text-left transition"><div className="text-xs font-bold text-cyan-400">🎨 WEBデザイン・コーディング</div></button>
            <button onClick={() => startQuiz('JavaScript')} className="p-4 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded-xl text-left transition"><div className="text-xs font-bold text-yellow-400">🟦 JavaScript集得マスター</div></button>
            <button onClick={() => startQuiz('WordPress')} className="p-4 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded-xl text-left transition"><div className="text-xs font-bold text-sky-400">🐘 WordPress実務カスタム</div></button>
            <button onClick={() => startQuiz('視覚レイアウト')} className="p-4 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded-xl text-left transition"><div className="text-xs font-bold text-emerald-400">👁️ 視覚・四角レイアウト【新型】</div></button>
          </div>
        </div>
      )}

      {(quizPhase === 'playing' || quizPhase === 'review') && currentQuestion && (
        <div className="space-y-4">
          {renderVisualBlocks()}
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#2d2d2d] text-purple-400">{currentQuestion.category}</span>
            <h3 className="text-xs font-bold text-white leading-relaxed pt-1">
              {quizPhase === 'review' && <span className="text-rose-400 font-mono mr-1">[要復習]</span>}
              {currentQuestion.question}
            </h3>
          </div>

          <div className="space-y-2">
            {currentQuestion.options.map((option, idx) => {
              let btnStyle = "bg-[#252526] text-slate-300 border-[#3c3c3c] hover:bg-[#2d2d2d]";
              if (selectedIdx === idx) btnStyle = "bg-[#0e639c]/20 text-cyan-400 border-cyan-500 font-bold";
              if (isAnswered) {
                if (idx === currentQuestion.correctIdx) btnStyle = "bg-emerald-950/40 text-emerald-400 border-emerald-500 font-bold";
                else if (selectedIdx === idx) btnStyle = "bg-rose-950/40 text-rose-400 border-rose-500 line-through";
                else btnStyle = "bg-[#1a1a1a] text-slate-600 border-transparent opacity-30";
              }
              return (
                <button key={idx} disabled={isAnswered} onClick={() => handleOptionClick(idx)} className={`w-full text-left p-3 text-xs rounded border transition flex items-start gap-2.5 leading-relaxed ${btnStyle}`}>
                  <span className="font-mono bg-black/40 px-1.5 py-0.5 rounded text-[10px] text-slate-400">{idx + 1}</span>
                  <span className="flex-1">{option}</span>
                </button>
              );
            })}
          </div>

          <div>
            {!isAnswered ? (
              <button disabled={selectedIdx === null} onClick={handleCheckAnswer} className={`w-full text-white font-bold text-xs py-2 rounded uppercase transition ${selectedIdx !== null ? 'bg-purple-600' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>✔ 回答を確定する</button>
            ) : (
              <button onClick={handleNext} className="w-full bg-[#0e639c] text-white font-bold text-xs py-2 rounded transition">
                {quizPhase === 'review' ? (selectedIdx === currentQuestion.correctIdx ? '🎉 クリア！次へ' : '➡ 次の復習問題へ') : (currentIdx + 1 === activeQuestions.length ? '🏁 スコア画面へ' : '➡ 次の問題へ')}
              </button>
            )}
          </div>

          {isAnswered && (
            <div className="p-4 rounded border text-xs leading-relaxed transition bg-black/20 border-slate-700">
              <p className="text-slate-400 font-sans">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}

      {quizPhase === 'result' && (
        <div className="text-center py-6 space-y-6">
          <div className="text-4xl">📊</div>
          <h3 className="text-sm font-bold text-white">{currentCategory} 結果</h3>
          <div className="bg-black/30 inline-block p-5 rounded-xl border border-[#3c3c3c] font-mono min-w-[240px]">
            <div className="text-3xl font-bold text-purple-400">{score} <span className="text-xs text-slate-500">/ {activeQuestions.length}</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
            {wrongQuestions.length > 0 && (
              <button onClick={() => { setReviewIdx(0); setQuizPhase('review'); setSelectedIdx(null); setIsAnswered(false); }} className="flex-1 px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded border border-rose-700 transition">🔥 間違えた問題を見直す ({wrongQuestions.length}問)</button>
            )}
            <button onClick={() => setQuizPhase('select')} className="flex-1 px-4 py-2 bg-[#2d2d2d] text-slate-300 font-bold text-xs rounded border border-[#3c3c3c] transition">🔄 別のジャンルへ</button>
          </div>
        </div>
      )}
    </div>
  );
}