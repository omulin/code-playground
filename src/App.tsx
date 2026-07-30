import { useState, useEffect } from 'react';
import { HelpCircle, Code2, GitCommit, Eye, Settings, FileCode, MonitorPlay, Target, BookOpen, Briefcase, Layout, Link2, Award, Folder, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

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
import CSSLab from './labs/CSSLab';
import HtmlLab from './labs/HtmlLab';

export default function App() {
  // 💡 修正：最初からURLパラメータを読み込んで初期値を決定する（チラつき防止）
  const [isPopupMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('lab');
  });

  const [activeComponent, setActiveComponent] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lab') || 'css';
  });

  const [activeTitle, setActiveTitle] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const titleParam = params.get('title');
    return titleParam ? decodeURIComponent(titleParam) : 'CSS道場.tsx';
  });
  
  const [isPreviewOnly] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('preview') === 'true';
  });

  const [isPreviewHidden, setIsPreviewHidden] = useState(false);
  const [activePopupWindow, setActivePopupWindow] = useState<any>(null);
  
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);

  const [openFolders, setOpenFolders] = useState({
    root: true,
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

  const selectFile = (component: string, title: string) => {
    setActiveComponent(component);
    setActiveTitle(title);
  };

  const openPopup = async (comp: string, title: string) => {
    const url = `index.html?lab=${comp}&title=${encodeURIComponent(title)}&preview=true`;
    setIsPreviewHidden(true);
    
    try {
      const tauriWebview: any = await import('@tauri-apps/api/webviewWindow').catch(() => null);

      if (tauriWebview && tauriWebview.WebviewWindow) {
        const webview = new tauriWebview.WebviewWindow(`popup-${Date.now()}`, {
          url: url,
          title: `${title} - Live Preview`,
          width: 800,
          height: 1000,
        });
        
        setActivePopupWindow(webview);

        webview.once('tauri://error', function (e: any) {
          console.error('ウィンドウ作成エラー:', e);
          alert('別ウィンドウの作成がブロックされました。Tauriの設定を確認してください。');
        });
      } else {
        const win = window.open(url, '_blank', 'width=800,height=1000');
        setActivePopupWindow(win);
      }
    } catch (error) {
      console.error('ポップアップエラー:', error);
      const win = window.open(url, '_blank', 'width=800,height=1000');
      setActivePopupWindow(win);
    }
  };

  const restorePreview = () => {
    setIsPreviewHidden(false);
    if (activePopupWindow) {
      try {
        if (typeof activePopupWindow.close === 'function') {
          activePopupWindow.close();
        }
      } catch (e) {
        console.error('ウィンドウを閉じる際にエラーが発生しました', e);
      }
      setActivePopupWindow(null);
    }
  };

  const renderLab = () => {
    switch (activeComponent) {
      case 'quiz': return <QuizLab />;
      case 'code': return <CodeLab />;
      case 'trace': return <TraceLab isPreviewOnly={isPreviewOnly} isPreviewHidden={isPreviewHidden} />;
      case 'visual': return <VisualLab />;
      case 'design': return <DesignLab />;
      case 'learning': return <LearningLab />;
      case 'mission': return <MissionLab />;
      case 'project': return <ProjectLab />;
      case 'work': return <WorkLab onProjectAdded={() => {}} />;
      case 'wpPlayground': return <WpPlaygroundLab />;
      case 'wpTrace': return <WpTraceLab />;
      case 'connection': return <ConnectionLab />;
      case 'css': return <CSSLab />;
      case 'html': return <HtmlLab />;
      default: return <CSSLab />;
    }
  };

  const SidebarItem = ({ comp, title, Icon, color }: { comp: string, title: string, Icon: any, color: string }) => {
    const isSelected = activeComponent === comp;
    return (
      <div 
        className={`pl-8 pr-2 py-1.5 cursor-pointer flex items-center justify-between transition-colors text-xs group ${isSelected ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e] text-[#cccccc]'}`} 
        onClick={() => selectFile(comp, title)}
      >
        <div className="flex items-center gap-2 truncate">
          <Icon size={14} className={color} />
          <span className="truncate">{title}</span>
        </div>
        <button 
          title="別ウィンドウでプレビューを開く"
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#444444] rounded text-gray-300 hover:text-white transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            openPopup(comp, title);
          }}
        >
          <ExternalLink size={13} />
        </button>
      </div>
    );
  };

  const FolderHeader = ({ title, isOpen, onClick, isRoot = false }: { title: string, isOpen: boolean, onClick: () => void, isRoot?: boolean }) => (
    <div 
      className={`px-3 py-1.5 cursor-pointer flex items-center gap-1.5 hover:bg-[#2a2d2e] transition-colors text-xs select-none ${isRoot ? 'font-bold text-white bg-[#252526]' : 'font-semibold text-gray-300 pl-4'}`}
      onClick={onClick}
    >
      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      <Folder size={14} className={isRoot ? "text-blue-400" : "text-yellow-500"} />
      <span className="truncate">{title}</span>
    </div>
  );

  // 💡 ポップアップモードの場合、最初からプレビュー（または指定Lab）だけを全画面表示
  if (isPopupMode) {
    return (
      <div className="flex flex-col h-screen w-screen overflow-hidden text-[#cccccc] bg-[#1e1e1e]">
        {!isPreviewOnly && (
          <div className="h-9 bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center px-4 text-xs text-gray-300 gap-2 flex-shrink-0 justify-between">
            <div className="flex items-center gap-2">
              <FileCode size={14} className="text-indigo-400" />
              <span className="font-bold">{activeTitle}</span>
              <span className="text-[10px] bg-indigo-900 text-indigo-200 px-1.5 py-0.5 rounded">ポップアップ画面</span>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-auto h-full">
          {renderLab()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden text-[#cccccc] bg-[#1e1e1e]">
      <div className="flex flex-1 overflow-hidden">
        
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-[#3c3c3c] flex-shrink-0 select-none">
          <button 
            className={`p-2 rounded hover:bg-[#444444] ${isExplorerOpen ? 'text-white border-l-2 border-[#007acc] bg-[#2a2d2e]' : 'text-[#858585]'}`}
            onClick={() => setIsExplorerOpen(!isExplorerOpen)}
            title="エクスプローラーの表示/非表示"
          >
            <Eye size={22} />
          </button>
          <div className="flex-1"></div>
          <button className="p-2 text-[#858585] hover:text-white rounded hover:bg-[#444444]" title="設定">
            <Settings size={22} />
          </button>
        </div>

        {isExplorerOpen && (
          <div className="w-64 bg-[#252526] border-r border-[#3c3c3c] flex flex-col flex-shrink-0 select-none">
            <div className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#bbbbbb] border-b border-[#3c3c3c] flex justify-between items-center">
              <span>エクスプローラー</span>
              <span className="text-[10px] text-indigo-400 font-mono">学習ラボ一覧</span>
            </div>
            
            <div className="flex-1 py-1 overflow-y-auto">
              <FolderHeader title="CODE-PLAYGROUND" isOpen={openFolders.root} onClick={() => toggleFolder('root')} isRoot={true} />

              {openFolders.root && (
                <div className="py-1">
                  <FolderHeader title="✨ 始めたばかりの人向け" isOpen={openFolders.beginnerNew} onClick={() => toggleFolder('beginnerNew')} />
                  {openFolders.beginnerNew && (
                    <SidebarItem comp="connection" title="構造とデザイン接続.tsx" Icon={Link2} color="text-[#3b82f6]" />
                  )}

                  <FolderHeader title="🌱 初心者向け" isOpen={openFolders.beginner} onClick={() => toggleFolder('beginner')} />
                  {openFolders.beginner && (
                    <>
                      <SidebarItem comp="learning" title="コード学習ラボ.tsx" Icon={BookOpen} color="text-[#4fc1ff]" />
                      <SidebarItem comp="trace" title="トレース.tsx" Icon={GitCommit} color="text-[#ce9178]" />
                      <SidebarItem comp="quiz" title="確認クイズ.tsx" Icon={HelpCircle} color="text-[#569cd6]" />
                    </>
                  )}

                  <FolderHeader title="🎨 デザイン" isOpen={openFolders.design} onClick={() => toggleFolder('design')} />
                  {openFolders.design && (
                    <>
                      <SidebarItem comp="design" title="デザイン学習.tsx" Icon={Layout} color="text-[#c586c0]" />
                      <SidebarItem comp="visual" title="ビジュアル学習.tsx" Icon={Eye} color="text-[#dcdcaa]" />
                    </>
                  )}

                  <FolderHeader title="⚡ 中級者向け" isOpen={openFolders.intermediate} onClick={() => toggleFolder('intermediate')} />
                  {openFolders.intermediate && (
                    <>
                      <SidebarItem comp="css" title="CSS道場.tsx" Icon={Award} color="text-[#f59e0b]" />
                      <SidebarItem comp="html" title="HTML道場.tsx" Icon={FileCode} color="text-[#ea580c]" />
                      <SidebarItem comp="mission" title="ミッション挑戦.tsx" Icon={Target} color="text-[#f48771]" />
                    </>
                  )}

                  <FolderHeader title="🌐 WPのこと" isOpen={openFolders.wp} onClick={() => toggleFolder('wp')} />
                  {openFolders.wp && (
                    <>
                      <SidebarItem comp="wpPlayground" title="WPプレイグラウンド.tsx" Icon={FileCode} color="text-[#4ec9b0]" />
                      <SidebarItem comp="wpTrace" title="WPコード追跡.tsx" Icon={GitCommit} color="text-[#ce9178]" />
                    </>
                  )}

                  <FolderHeader title="🔥 実践" isOpen={openFolders.practice} onClick={() => toggleFolder('practice')} />
                  {openFolders.practice && (
                    <>
                      <SidebarItem comp="code" title="コードエディタ(アルゴリズム).tsx" Icon={Code2} color="text-[#4ec9b0]" />
                      <SidebarItem comp="project" title="プロジェクト保管.tsx" Icon={Briefcase} color="text-[#d7ba7d]" />
                      <SidebarItem comp="work" title="実務ワーク.tsx" Icon={MonitorPlay} color="text-[#9cdcfe]" />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 bg-[#1e1e1e] flex flex-col h-full overflow-hidden">
          <div className="h-9 bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center px-4 text-xs text-gray-300 gap-2 flex-shrink-0 justify-between">
            <div className="flex items-center gap-2">
              <FileCode size={14} className="text-indigo-400" />
              <span>{activeTitle}</span>
            </div>
            
            {!isPreviewHidden ? (
              <button 
                onClick={() => openPopup(activeComponent, activeTitle)}
                className="flex items-center gap-1.5 px-2 py-1 bg-[#3c3c3c] hover:bg-[#4c4c4c] text-white rounded text-[11px] transition-colors shadow"
                title="プレビューを別ウィンドウに分離する"
              >
                <ExternalLink size={12} />
                <span className="font-bold">別窓でプレビュー</span>
              </button>
            ) : (
              <button 
                onClick={restorePreview}
                className="flex items-center gap-1.5 px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] transition-colors shadow"
                title="プレビューをメイン画面に戻す（ポップアップは閉じます）"
              >
                <MonitorPlay size={12} />
                <span className="font-bold">プレビューを戻す</span>
              </button>
            )}

          </div>
          <div className="flex-1 overflow-auto h-full">
            {renderLab()}
          </div>
        </div>
      </div>

      <div className="h-6 bg-[#007acc] text-white text-xs px-3 flex items-center justify-between select-none flex-shrink-0">
        <div className="flex items-center gap-4"><span>Code Playground</span></div>
        <div className="flex items-center gap-4"><span>React</span><span>Single View</span></div>
      </div>
    </div>
  );
}