import { useState } from 'react';
import DesignLab from './labs/DesignLab';
import VisualLab from './labs/VisualLab';
import CodeLab from './labs/CodeLab';
import QuizLab from './labs/QuizLab';
import MissionLab from './labs/MissionLab'; // 👑 修行モード
import WorkLab from './labs/WorkLab';       // 👑 完全自由制作モード
import ProjectLab from './labs/ProjectLab';
import TraceLab from './labs/TraceLab';     // 👑 新章：写経＆マルチページ遷移ラボ

// 👑 型定義に 'trace' を安全に追加
type Mode = 'top' | 'design' | 'visual' | 'code' | 'quiz' | 'mission' | 'work' | 'project' | 'trace';

interface ProjectItem {
  name: string;
  code: string;
}

export default function App() {
  const [mode, setMode] = useState<Mode>('top');
  
  // 初期の実績ポートフォリオデータ
  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      name: 'Welcome_Site.html',
      code: `<div style="padding:20px; background:#1e1e1e; border:1px solid #3c3c3c; border-radius:4px; text-align:center; color:#4fc1ff; font-family:monospace;">console.log("Welcome to CodePlayground!");</div>`
    }
  ]);

  const addProject = (projectName: string, htmlContent: string) => {
    setProjects((prev) => [...prev, { name: projectName, code: htmlContent }]);
  };

  return (
    // 👑 限界突破ポイント：横幅（w-full）と縦幅（h-screen）を物理モニターの限界まで100%使い切るように外枠を最適化！
    <div className="w-full h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono flex flex-col select-none m-0 p-0 overflow-hidden">
      
      {/* 💻 最上部：VS Code風 タイトルバー */}
      <header className="bg-[#3c3c3c] text-[#a6a6a6] text-xs px-4 py-1.5 flex justify-between items-center border-b border-[#2b2b2b] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold">🔵</span>
          <span>CodePlayground - Visual Studio Code風モード</span>
        </div>
        <div className="text-[11px] text-[#808080]">App.tsx - workspace</div>
        <div className="flex gap-3 text-[11px]">
          <span>ファイル(F)</span><span>編集(E)</span><span>選択(S)</span>
        </div>
      </header>

      {/* 🗂️ メインレイアウト */}
      <div className="flex-1 flex overflow-hidden w-full">
        
        {/* 🎛️ 左端：アクティビティバー */}
        <aside className="w-12 bg-[#333333] border-r border-[#2b2b2b] flex flex-col items-center py-4 gap-6 text-xl text-[#858585] shrink-0">
          <button onClick={() => setMode('top')} className={`hover:text-white transition ${mode === 'top' ? 'text-cyan-400 border-l-2 border-cyan-400 w-full' : ''}`}>📁</button>
          <button onClick={() => setMode('mission')} className={`hover:text-white transition ${mode === 'mission' ? 'text-cyan-400 border-l-2 border-cyan-400 w-full' : ''}`}>📝</button>
          <button onClick={() => setMode('trace')} className={`hover:text-white transition ${mode === 'trace' ? 'text-amber-500 border-l-2 border-amber-500 w-full' : ''}`}>✍️</button>
          <button onClick={() => setMode('work')} className={`hover:text-white transition ${mode === 'work' ? 'text-cyan-400 border-l-2 border-cyan-400 w-full' : ''}`}>💼</button>
          <button onClick={() => setMode('visual')} className={`hover:text-white transition ${mode === 'visual' ? 'text-cyan-400 border-l-2 border-cyan-400 w-full' : ''}`}>👁️</button>
          <button onClick={() => setMode('design')} className={`hover:text-white transition ${mode === 'design' ? 'text-cyan-400 border-l-2 border-cyan-400 w-full' : ''}`}>🎨</button>
          <button onClick={() => setMode('code')} className={`hover:text-white transition ${mode === 'code' ? 'text-cyan-400 border-l-2 border-cyan-400 w-full' : ''}`}>💻</button>
          <button onClick={() => setMode('quiz')} className={`hover:text-white transition ${mode === 'quiz' ? 'text-cyan-400 border-l-2 border-cyan-400 w-full' : ''}`}>❓</button>
          <button onClick={() => setMode('project')} className={`hover:text-white transition ${mode === 'project' ? 'text-cyan-400 border-l-2 border-cyan-400 w-full' : ''}`}>🚀</button>
        </aside>

        {/* 📂 左サイドバー：ファイルエクスプローラー */}
        <nav className="w-60 bg-[#252526] border-r border-[#2b2b2b] p-4 hidden md:flex flex-col text-left text-xs text-[#cccccc] shrink-0">
          <div className="font-bold text-[10px] text-[#858585] uppercase tracking-wider mb-3">エクスプローラー</div>
          <div className="space-y-1">
            <div className="text-[#858585] font-bold">▼ src / labs</div>
            <button onClick={() => setMode('top')} className={`w-full text-left px-4 py-1.5 rounded hover:bg-[#37373d] block transition ${mode === 'top' ? 'bg-[#37373d] text-white font-bold' : ''}`}>🏠 Welcome.md</button>
            <button onClick={() => setMode('mission')} className={`w-full text-left px-4 py-1.5 rounded hover:bg-[#37373d] block transition ${mode === 'mission' ? 'bg-[#37373d] text-amber-400 font-bold border-l-2 border-amber-500' : ''}`}>📝 MissionLab.json (修行)</button>
            <button onClick={() => setMode('trace')} className={`w-full text-left px-4 py-1.5 rounded hover:bg-[#37373d] block transition ${mode === 'trace' ? 'bg-[#37373d] text-orange-400 font-bold border-l-2 border-orange-500' : ''}`}>✍️ TraceLab.tsx (写経トレース)</button>
            <button onClick={() => setMode('work')} className={`w-full text-left px-4 py-1.5 rounded hover:bg-[#37373d] block transition ${mode === 'work' ? 'bg-[#37373d] text-emerald-400 font-bold border-l-2 border-emerald-500' : ''}`}>💼 WorkLab.tsx (自由制作空間)</button>
            <button onClick={() => setMode('visual')} className={`w-full text-left px-4 py-1.5 rounded hover:bg-[#37373d] block transition ${mode === 'visual' ? 'bg-[#37373d] text-white' : ''}`}>👁️ VisualLab.tsx</button>
            <button onClick={() => setMode('design')} className={`w-full text-left px-4 py-1.5 rounded hover:bg-[#37373d] block transition ${mode === 'design' ? 'bg-[#37373d] text-white' : ''}`}>🎨 DesignLab.tsx</button>
            <button onClick={() => setMode('code')} className={`w-full text-left px-4 py-1.5 rounded hover:bg-[#37373d] block transition ${mode === 'code' ? 'bg-[#37373d] text-white' : ''}`}>💻 CodeLab.js</button>
            <button onClick={() => setMode('quiz')} className={`w-full text-left px-4 py-1.5 rounded hover:bg-[#37373d] block transition ${mode === 'quiz' ? 'bg-[#37373d] text-white' : ''}`}>❓ QuizLab.json</button>
            <button onClick={() => setMode('project')} className={`w-full text-left px-4 py-1.5 rounded hover:bg-[#37373d] block transition ${mode === 'project' ? 'bg-[#37373d] text-white' : ''}`}>🚀 ProjectLab.html</button>
          </div>
        </nav>

        {/* 📄 右側：メインコンテンツ表示エリア */}
        {/* 👑 修正ポイント：TraceLab表示時（mode === 'trace'）のみ、max-w制限や内側の余白パディングを100%解除（p-0）し、画面の限界までカード幅を広げる！ */}
        <main className={`flex-1 flex flex-col bg-[#1e1e1e] overflow-y-auto w-full ${mode === 'trace' ? 'p-0' : ''}`}>
          
          {/* 上部タブバー */}
          <div className="bg-[#2d2d2d] flex border-b border-[#2b2b2b] text-xs shrink-0">
            <div className="bg-[#1e1e1e] text-white px-4 py-2 border-t-2 border-cyan-400">
              {mode === 'top' ? 'Welcome.md' : `${mode.toUpperCase()}LAB.tsx`}
            </div>
          </div>

          {/* 👑 通常のラボは元の最大幅（max-w-5xl px-8）を維持し、TraceLabの時だけフルスクリーン化！ */}
          <div className={`w-full mx-auto flex-1 flex flex-col ${mode === 'trace' ? 'max-w-none p-0' : 'p-8 max-w-5xl'}`}>
            
            {/* 🏠 TOP MENU */}
            {mode === 'top' && (
              <div className="text-left space-y-8">
                <div>
                  <h2 className="text-3xl font-light text-white mb-2">Visual Studio Code <span className="text-[#858585] font-light">Mode</span></h2>
                  <p className="text-[#717171] text-sm font-mono">ゲーム感覚でIT技術を学び、ゼロから自由にモノづくりができる特別ワークスペース。</p>
                </div>
                
                <hr className="border-[#2b2b2b]" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">▼ Mainクリエイティブ（お仕事・自由制作）</h3>
                    <div className="space-y-2">
                      <button onClick={() => setMode('mission')} className="w-full text-left p-4 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded group transition">
                        <div className="text-xs font-bold text-amber-400 group-hover:text-amber-300 transition">📝 Mission Lab (全20ステージの修行)</div>
                        <div className="text-[11px] text-[#858585] mt-1">解説と答えを確認しながら、お題に沿ってHP制作・WPテーマ開発の基本をマスターする。</div>
                      </button>
                      
                      <button onClick={() => setMode('trace')} className="w-full text-left p-4 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded group transition">
                        <div className="text-xs font-bold text-orange-400 group-hover:text-orange-300 transition">✍️ Trace Lab (見本写経 × 複数ページ実戦)</div>
                        <div className="text-[11px] text-[#858585] mt-1">チラシ1枚サイズの見本を完コピ写経！複数ページをリンクで繋ぐマルチ画面遷移を体験。</div>
                      </button>

                      <button onClick={() => setMode('work')} className="w-full text-left p-4 bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded group transition">
                        <div className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition">💼 Work Lab (完全自由な一から制作スペース)</div>
                        <div className="text-[11px] text-[#858585] mt-1">縛りは一切なし。真っ白なエディタから、あなたの好きなサイトやブログを1から自由に創り上げる空間。</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#858585] uppercase tracking-wider">▼ Basicトレーニング（基礎・実験室）</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'visual', title: '👁️ Visual Lab', desc: 'ブロックを並び替えてWebのレイアウトを学ぶ' },
                        { id: 'design', title: '🎨 Design Lab', desc: 'ボタンやパーツの色・影をCSSコード化する' },
                        { id: 'code', title: '💻 Code Lab', desc: 'JavaScriptのバグを見つけて修正する' },
                        { id: 'quiz', title: '❓ Quiz Lab', desc: 'ITの必須基礎知識クイズに挑戦する' }
                      ].map((btn) => (
                        <button key={btn.id} onClick={() => setMode(btn.id as Mode)} className="text-left p-3 bg-[#252526]/60 hover:bg-[#2d2d2d] border border-[#2b2b2b] rounded group transition">
                          <div className="text-xs font-bold text-[#cccccc] group-hover:text-cyan-400 transition">{btn.title}</div>
                          <div className="text-[10px] text-[#717171] mt-1 leading-relaxed">{btn.desc}</div>
                        </button>
                      ))}
                    </div>
                    
                    <button onClick={() => setMode('project')} className="w-full text-left p-2.5 bg-[#252526]/30 hover:bg-[#2d2d2d] border border-[#2b2b2b] rounded text-[11px] text-slate-400 hover:text-white transition flex justify-between items-center">
                      <span>🚀 制作した実績ポートフォリオ（Project Lab）を見る</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 各ラボコンポーネントの呼び出し */}
            {mode === 'design' && <DesignLab />}
            {mode === 'visual' && <VisualLab />}
            {mode === 'code' && <CodeLab />}
            {mode === 'quiz' && <QuizLab />}
            {mode === 'trace' && <TraceLab />}
            {mode === 'mission' && <MissionLab onProjectAdded={addProject} />}
            {mode === 'work' && <WorkLab onProjectAdded={addProject} />}
            {mode === 'project' && <ProjectLab projects={projects} />}

          </div>
        </main>
      </div>

      {/* 📋 最下部：ステータスバー */}
      <footer className="bg-[#007acc] text-white text-[11px] px-4 py-1 flex justify-between items-center font-sans shrink-0">
        <div>✓ CodePlayground Workspace Connected (Tauri)</div>
        <div>TypeScript JSX</div>
      </footer>

    </div>
  );
}