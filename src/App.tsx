import { useState } from 'react';
import { DockviewReact, type DockviewReadyEvent, type IDockviewPanelProps } from 'dockview-react';
import 'dockview-react/dist/styles/dockview.css';
import { HelpCircle, Code2, GitCommit, Eye, Settings, FileCode, MonitorPlay, Target, BookOpen, Briefcase, Layout, ChevronDown, ChevronRight, Folder, Link2, Sparkles } from 'lucide-react';

// 各Labのインポート
import QuizLab from './labs/QuizLab';
import CodeLab from './labs/CodeLab';
import TraceLab from './labs/TraceLab';
import VisualLab from './labs/VisualLab';
import DesignLab from './labs/DesignLab';
import LearningLab from './labs/LearningLab';
import MissionLab from './labs/MissionLab';
import ProjectLab from './labs/ProjectLab';
import WorkLab from './labs/WorkLab';
import WpPlaygroundLab from './labs/WpPlaygroundLab';
import WpTraceLab from './labs/WpTraceLab';
import ConnectionLab from './labs/ConnectionLab';

// パネルに表示するコンポーネントの登録
const components = {
  quiz: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><QuizLab /></div>,
  code: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><CodeLab /></div>,
  trace: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><TraceLab /></div>,
  visual: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><VisualLab /></div>,
  design: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><DesignLab /></div>,
  learning: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><LearningLab /></div>,
  mission: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><MissionLab /></div>,
  project: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><ProjectLab /></div>,
  work: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><WorkLab /></div>,
  wpPlayground: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><WpPlaygroundLab /></div>,
  wpTrace: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><WpTraceLab /></div>,
  connection: (props: IDockviewPanelProps) => <div className="h-full overflow-auto"><ConnectionLab /></div>,
};

export default function App() {
  const [api, setApi] = useState<DockviewReadyEvent['api']>();
  const [activeMenu, setActiveMenu] = useState('explorer');

  // カテゴリフォルダの開閉状態（新規フォルダ用を追加）
  const [openFolders, setOpenFolders] = useState({
    beginnerNew: true,
    beginner: true,
    design: true,
    intermediate: true,
    wp: true,
    practice: true,
  });

  const toggleFolder = (key: keyof typeof openFolders) => {
    setOpenFolders(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const onReady = (event: DockviewReadyEvent) => {
    setApi(event.api);
    // 初回起動時は直感的に学べる接続ラボをデフォルト表示
    event.api.addPanel({ id: 'connection_panel', component: 'connection', title: '構造とデザイン接続.tsx' });
  };

  const openFile = (id: string, component: string, title: string) => {
    if (!api) return;
    const existingPanel = api.getPanel(id);
    if (existingPanel) {
      existingPanel.api.setActive();
      return;
    }
    api.addPanel({ id, component, title });
  };

  const SidebarItem = ({ id, comp, title, Icon, color }: { id: string, comp: string, title: string, Icon: any, color: string }) => (
    <div 
      className="pl-6 pr-4 py-1.5 cursor-pointer flex items-center gap-2 hover:bg-[#2a2d2e] transition-colors text-xs" 
      onClick={() => openFile(id, comp, title)}
    >
      <Icon size={14} className={color} />
      <span className="truncate">{title}</span>
    </div>
  );

  const FolderHeader = ({ title, isOpen, onClick }: { title: string, isOpen: boolean, onClick: () => void }) => (
    <div 
      className="px-3 py-1.5 cursor-pointer flex items-center gap-1.5 hover:bg-[#2a2d2e] transition-colors text-xs font-bold text-gray-300 select-none"
      onClick={onClick}
    >
      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      <Folder size={14} className="text-yellow-500" />
      <span className="truncate">{title}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden text-[#cccccc] bg-[#1e1e1e]">
      <div className="flex flex-1 overflow-hidden">
        
        {/* 左端: アクティビティバー */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-[#3c3c3c] flex-shrink-0 select-none">
          <button 
            className={`p-2 rounded hover:bg-[#444444] ${activeMenu === 'explorer' ? 'text-white border-l-2 border-[#007acc] bg-[#2a2d2e]' : 'text-[#858585]'}`}
            onClick={() => setActiveMenu('explorer')}
            title="エクスプローラー"
          >
            <Eye size={22} />
          </button>
          <div className="flex-1"></div>
          <button className="p-2 text-[#858585] hover:text-white rounded hover:bg-[#444444]" title="設定">
            <Settings size={22} />
          </button>
        </div>

        {/* サイドバー: エクスプローラー */}
        {activeMenu === 'explorer' && (
          <div className="w-64 bg-[#252526] border-r border-[#3c3c3c] flex flex-col flex-shrink-0 select-none">
            <div className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#bbbbbb] border-b border-[#3c3c3c] flex justify-between items-center">
              <span>エクスプローラー</span>
              <span className="text-[10px] text-indigo-400 font-mono">学習ラボ一覧</span>
            </div>
            
            <div className="flex-1 py-2 overflow-y-auto">
              
              {/* 🌟 0. 始めたばかりの人・触ったことない人向け（新設） */}
              <FolderHeader 
                title="✨ 始めたばかりの人向け" 
                isOpen={openFolders.beginnerNew} 
                onClick={() => toggleFolder('beginnerNew')} 
              />
              {openFolders.beginnerNew && (
                <div className="py-0.5">
                  <SidebarItem id="connection_panel" comp="connection" title="構造とデザイン接続.tsx" Icon={Link2} color="text-[#3b82f6]" />
                </div>
              )}

              {/* 1. 初心者向け */}
              <FolderHeader 
                title="🌱 初心者向け" 
                isOpen={openFolders.beginner} 
                onClick={() => toggleFolder('beginner')} 
              />
              {openFolders.beginner && (
                <div className="py-0.5">
                  <SidebarItem id="learning_panel" comp="learning" title="コード学習ラボ.tsx" Icon={BookOpen} color="text-[#4fc1ff]" />
                  <SidebarItem id="trace_panel" comp="trace" title="トレース.tsx" Icon={GitCommit} color="text-[#ce9178]" />
                  <SidebarItem id="quiz_panel" comp="quiz" title="確認クイズ.tsx" Icon={HelpCircle} color="text-[#569cd6]" />
                </div>
              )}

              {/* 2. デザイン */}
              <FolderHeader 
                title="🎨 デザイン" 
                isOpen={openFolders.design} 
                onClick={() => toggleFolder('design')} 
              />
              {openFolders.design && (
                <div className="py-0.5">
                  <SidebarItem id="design_panel" comp="design" title="デザイン学習.tsx" Icon={Layout} color="text-[#c586c0]" />
                  <SidebarItem id="visual_panel" comp="visual" title="ビジュアル学習.tsx" Icon={Eye} color="text-[#dcdcaa]" />
                </div>
              )}

              {/* 3. 中級者向け */}
              <FolderHeader 
                title="⚡ 中級者向け" 
                isOpen={openFolders.intermediate} 
                onClick={() => toggleFolder('intermediate')} 
              />
              {openFolders.intermediate && (
                <div className="py-0.5">
                  <SidebarItem id="code_panel" comp="code" title="コードエディタ.tsx" Icon={Code2} color="text-[#4ec9b0]" />
                  <SidebarItem id="mission_panel" comp="mission" title="ミッション挑戦.tsx" Icon={Target} color="text-[#f48771]" />
                </div>
              )}

              {/* 4. WPのこと */}
              <FolderHeader 
                title="🌐 WPのこと" 
                isOpen={openFolders.wp} 
                onClick={() => toggleFolder('wp')} 
              />
              {openFolders.wp && (
                <div className="py-0.5">
                  <SidebarItem id="wp_playground_panel" comp="wpPlayground" title="WPプレイグラウンド.tsx" Icon={FileCode} color="text-[#4ec9b0]" />
                  <SidebarItem id="wp_trace_panel" comp="wpTrace" title="WPコード追跡.tsx" Icon={GitCommit} color="text-[#ce9178]" />
                </div>
              )}

              {/* 5. 実践 */}
              <FolderHeader 
                title="🔥 実践" 
                isOpen={openFolders.practice} 
                onClick={() => toggleFolder('practice')} 
              />
              {openFolders.practice && (
                <div className="py-0.5">
                  <SidebarItem id="project_panel" comp="project" title="プロジェクト保管.tsx" Icon={Briefcase} color="text-[#d7ba7d]" />
                  <SidebarItem id="work_panel" comp="work" title="実務ワーク.tsx" Icon={MonitorPlay} color="text-[#9cdcfe]" />
                </div>
              )}

            </div>
          </div>
        )}

        {/* メイン画面: Dockview */}
        <div className="flex-1 bg-[#1e1e1e]">
          <DockviewReact components={components} onReady={onReady} className="dockview-theme-vs-dark" />
        </div>
      </div>

      {/* 下部: ステータスバー */}
      <div className="h-6 bg-[#007acc] text-white text-xs px-3 flex items-center justify-between select-none flex-shrink-0">
        <div className="flex items-center gap-4"><span>Code Playground</span></div>
        <div className="flex items-center gap-4"><span>React</span><span>Dockview</span></div>
      </div>
    </div>
  );
}