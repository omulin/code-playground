import React, { useState } from 'react';
import { DockviewReact, type DockviewReadyEvent, type IDockviewPanelProps } from 'dockview-react';
import 'dockview-react/dist/styles/dockview.css';
import { HelpCircle, Code2, GitCommit, Eye, Settings, FileCode, MonitorPlay, Target, BookOpen, Briefcase, Layout } from 'lucide-react';

// すべてのLabをインポート（※ CodeLab だけ前回 export default に変更した場合は {} を外しています）
import  QuizLab  from './labs/QuizLab';
import CodeLab from './labs/CodeLab';
import  TraceLab  from './labs/TraceLab';
import  VisualLab  from './labs/VisualLab';
import  DesignLab  from './labs/DesignLab';
import  LearningLab  from './labs/LearningLab';
import  MissionLab  from './labs/MissionLab';
import  ProjectLab  from './labs/ProjectLab';
import  WorkLab  from './labs/WorkLab';
import  WpPlaygroundLab  from './labs/WpPlaygroundLab';
import  WpTraceLab  from './labs/WpTraceLab';

// パネルに表示するコンポーネントを全登録
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
};

export default function App() {
  const [api, setApi] = useState<DockviewReadyEvent['api']>();
  const [activeMenu, setActiveMenu] = useState('explorer');

  const onReady = (event: DockviewReadyEvent) => {
    setApi(event.api);
    // 初期表示するタブ
    event.api.addPanel({ id: 'code_panel', component: 'code', title: 'CodeLab.tsx' });
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

  // サイドバーのメニュー項目のコンポーネント化（コードをスッキリさせるため）
  const SidebarItem = ({ id, comp, title, Icon, color }: { id: string, comp: string, title: string, Icon: any, color: string }) => (
    <div 
      className="px-4 py-1.5 cursor-pointer flex items-center gap-2 hover:bg-[#2a2d2e] transition-colors" 
      onClick={() => openFile(id, comp, title)}
    >
      <Icon size={16} className={color} />
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
          >
            <Eye size={22} />
          </button>
          <div className="flex-1"></div>
          <button className="p-2 text-[#858585] hover:text-white rounded hover:bg-[#444444]">
            <Settings size={22} />
          </button>
        </div>

        {/* サイドバー: エクスプローラー */}
        {activeMenu === 'explorer' && (
          <div className="w-56 bg-[#252526] border-r border-[#3c3c3c] flex flex-col flex-shrink-0 select-none">
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#bbbbbb] border-b border-[#3c3c3c]">
              Explorer
            </div>
            <div className="flex-1 py-2 text-sm overflow-y-auto">
              <SidebarItem id="code_panel" comp="code" title="CodeLab.tsx" Icon={Code2} color="text-[#4ec9b0]" />
              <SidebarItem id="quiz_panel" comp="quiz" title="QuizLab.tsx" Icon={HelpCircle} color="text-[#569cd6]" />
              <SidebarItem id="trace_panel" comp="trace" title="TraceLab.tsx" Icon={GitCommit} color="text-[#ce9178]" />
              <SidebarItem id="visual_panel" comp="visual" title="VisualLab.tsx" Icon={Eye} color="text-[#dcdcaa]" />
              <SidebarItem id="design_panel" comp="design" title="DesignLab.tsx" Icon={Layout} color="text-[#c586c0]" />
              <SidebarItem id="learning_panel" comp="learning" title="LearningLab.tsx" Icon={BookOpen} color="text-[#4fc1ff]" />
              <SidebarItem id="mission_panel" comp="mission" title="MissionLab.tsx" Icon={Target} color="text-[#f48771]" />
              <SidebarItem id="project_panel" comp="project" title="ProjectLab.tsx" Icon={Briefcase} color="text-[#d7ba7d]" />
              <SidebarItem id="work_panel" comp="work" title="WorkLab.tsx" Icon={MonitorPlay} color="text-[#9cdcfe]" />
              <SidebarItem id="wp_playground_panel" comp="wpPlayground" title="WpPlaygroundLab.tsx" Icon={FileCode} color="text-[#4ec9b0]" />
              <SidebarItem id="wp_trace_panel" comp="wpTrace" title="WpTraceLab.tsx" Icon={GitCommit} color="text-[#ce9178]" />
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