import { useState } from 'react';

export default function CodeLab() {
  const [codeAnswer, setCodeAnswer] = useState('');
  const [codeSuccess, setCodeSuccess] = useState<boolean | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cyan-400">💻 Code Lab: バグ修正デバッグ体験</h2>
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl space-y-4">
        <p className="text-sm text-slate-300">以下のJavaScriptコードにはバグがあります。ボタンをクリックしたときに「正しくアラートを出す」ように、空欄を埋めて修正してください！</p>
        
        <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
          <div><span className="text-purple-400">const</span> button = document.querySelector(<span className="text-emerald-400">'.btn'</span>);</div>
          <div className="flex items-center gap-2">
            button.
            <input 
              type="text" 
              placeholder="ここに正しい命令を入力" 
              value={codeAnswer} 
              onChange={(e) => setCodeAnswer(e.target.value)}
              className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-cyan-400 w-48 font-mono text-xs outline-none"
            />
            (<span className="text-emerald-400">'click'</span>, () =&gt; &#123;
          </div>
          <div className="pl-4">alert(<span className="text-emerald-400">'こんにちは！'</span>);</div>
          <div>&#125;);</div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCodeSuccess(codeAnswer.trim() === 'addEventListener')}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-lg"
          >
            🚀 コードを実行してテストする
          </button>
          {codeSuccess === true && <span className="text-emerald-400 font-bold text-sm">✅ 正解！バグが修正され、ボタンが命を持ちました！</span>}
          {codeSuccess === false && <span className="text-rose-400 font-bold text-sm">❌ 惜しい！イベントを監視する正しいメソッド名を入れてみよう。（ヒント: addEvent...）</span>}
        </div>
      </div>
    </div>
  );
}