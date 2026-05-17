import { useState } from 'react';

export default function QuizLab() {
  const [score, setScore] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cyan-400">📝 Quiz Lab: IT基礎知識クイズ</h2>
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl space-y-4">
        <h3 className="font-bold text-md text-slate-200">【問題】Webサイトの「骨組み（テキストや構造）」を記述するための言語はどれ？</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => setScore(0)} className="p-3 bg-slate-950 border border-slate-800 hover:border-rose-500 rounded-lg text-left text-sm">A: Python</button>
          <button onClick={() => setScore(1)} className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500 rounded-lg text-left text-sm">B: HTML</button>
          <button onClick={() => setScore(0)} className="p-3 bg-slate-950 border border-slate-800 hover:border-rose-500 rounded-lg text-left text-sm">C: CSS</button>
          <button onClick={() => setScore(0)} className="p-3 bg-slate-950 border border-slate-800 hover:border-rose-500 rounded-lg text-left text-sm">D: SQL</button>
        </div>

        {score !== null && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            {score === 1 ? (
              <p className="text-emerald-400 font-bold text-sm">🎉 大正解！HTML（HyperText Markup Language）が正解です！</p>
            ) : (
              <p className="text-rose-400 font-bold text-sm">❌ 残念！CSSは見た目、Pythonはプログラム、HTMLが骨組みを担当します！</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}