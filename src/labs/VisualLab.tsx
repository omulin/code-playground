import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Plus, Trash2, ArrowUp, ArrowDown, Copy, Check, Layout, Type, Square, MousePointer, Move, Save, RefreshCw, Sliders } from 'lucide-react';

interface CanvasElement {
  id: string;
  type: 'heading' | 'paragraph' | 'button' | 'card';
  text: string;
  bg: string;
  color: string;
  padding: string;
  radius: string;
  x: number;
  y: number;
  width: string;
  // 🌟 CSS道場で学ぶプロパティを追加
  boxShadow: string;
  border: string;
  display: 'block' | 'flex';
  justifyContent: 'flex-start' | 'center' | 'space-between' | 'space-around';
  alignItems: 'flex-start' | 'center';
  gap: string;
}

const INITIAL_ELEMENTS: CanvasElement[] = [
  { 
    id: '1', 
    type: 'card', 
    text: '✨ 特別キャンペーン実施中！', 
    bg: '#3b82f6', 
    color: '#ffffff', 
    padding: '20px', 
    radius: '16px', 
    x: 30, 
    y: 30, 
    width: '320px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px'
  },
  { 
    id: '2', 
    type: 'heading', 
    text: 'こんにちは、未来のエンジニアへ', 
    bg: 'transparent', 
    color: '#f8fafc', 
    padding: '8px', 
    radius: '0px', 
    x: 30, 
    y: 160, 
    width: '340px',
    boxShadow: 'none',
    border: 'none',
    display: 'block',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '0px'
  },
  { 
    id: '3', 
    type: 'paragraph', 
    text: 'カードを自由に重ねて、CSSの仕組みを視覚的に学ぼう！', 
    bg: 'transparent', 
    color: '#94a3b8', 
    padding: '4px', 
    radius: '0px', 
    x: 30, 
    y: 220, 
    width: '320px',
    boxShadow: 'none',
    border: 'none',
    display: 'block',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '0px'
  },
  { 
    id: '4', 
    type: 'button', 
    text: '今すぐ始める ➔', 
    bg: '#10b981', 
    color: '#ffffff', 
    padding: '12px 24px', 
    radius: '8px', 
    x: 30, 
    y: 290, 
    width: '180px',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    border: 'none',
    display: 'block',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '0px'
  },
];

export default function VisualLab() {
  const [elements, setElements] = useState<CanvasElement[]>(() => {
    const saved = localStorage.getItem('visual_lab_elements_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ELEMENTS;
  });

  const [selectedId, setSelectedId] = useState<string>('1');
  const [copied, setCopied] = useState<boolean>(false);
  const [codeTab, setCodeTab] = useState<'html' | 'css'>('html');
  const [saveNotification, setSaveNotification] = useState<string>('');

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (elements.length > 0 && !elements.some(el => el.id === selectedId)) {
      setSelectedId(elements[0].id);
    } else if (elements.length === 0) {
      setSelectedId('');
    }
  }, [elements]);

  const selectedElement = elements.find(el => el.id === selectedId) || null;

  const handleManualSave = () => {
    localStorage.setItem('visual_lab_elements_v2', JSON.stringify(elements));
    setSaveNotification("💾 セーブしました！");
    setTimeout(() => setSaveNotification(""), 2500);
  };

  const handleReset = () => {
    if (window.confirm("🚨 レイアウトを初期状態に戻しますか？")) {
      localStorage.removeItem('visual_lab_elements_v2');
      setElements(INITIAL_ELEMENTS);
      setSelectedId('1');
      setSaveNotification("🗑️ 初期化しました");
      setTimeout(() => setSaveNotification(""), 2500);
    }
  };

  const handleAddElement = (type: CanvasElement['type']) => {
    const newId = Date.now().toString();
    let defaultText = '新しいテキスト';
    let defaultBg = '#1e293b';
    let defaultColor = '#ffffff';
    let defaultPadding = '16px';
    let defaultRadius = '8px';
    let defaultWidth = '260px';
    let defaultShadow = '0 8px 20px rgba(0,0,0,0.2)';

    if (type === 'heading') {
      defaultText = '新しい見出し';
      defaultBg = 'transparent';
      defaultColor = '#ffffff';
      defaultWidth = '300px';
      defaultShadow = 'none';
    } else if (type === 'button') {
      defaultText = 'ボタン';
      defaultBg = '#6366f1';
      defaultWidth = '150px';
    } else if (type === 'card') {
      defaultText = 'カードコンテンツ';
      defaultBg = '#334155';
      defaultWidth = '280px';
    }

    const newEl: CanvasElement = {
      id: newId,
      type,
      text: defaultText,
      bg: defaultBg,
      color: defaultColor,
      padding: defaultPadding,
      radius: defaultRadius,
      x: 40 + (elements.length * 15) % 150,
      y: 40 + (elements.length * 15) % 150,
      width: defaultWidth,
      boxShadow: defaultShadow,
      border: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '8px'
    };

    setElements([...elements, newEl]);
    setSelectedId(newId);
  };

  const handleUpdateSelected = (key: keyof CanvasElement, value: any) => {
    if (!selectedElement) return;
    setElements(elements.map(el => {
      if (el.id === selectedId) {
        return { ...el, [key]: value };
      }
      return el;
    }));
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = elements.filter(el => el.id !== id);
    setElements(filtered);
    if (selectedId === id) {
      setSelectedId(filtered.length > 0 ? filtered[filtered.length - 1].id : '');
    }
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const newElements = [...elements];
    const targetIdx = direction === 'up' ? index + 1 : index - 1;
    if (targetIdx < 0 || targetIdx >= newElements.length) return;
    const temp = newElements[index];
    newElements[index] = newElements[targetIdx];
    newElements[targetIdx] = temp;
    setElements(newElements);
  };

  const handleMouseDown = (e: React.MouseEvent, el: CanvasElement) => {
    e.stopPropagation();
    setSelectedId(el.id);
    setDraggingId(el.id);
    const targetNode = e.currentTarget as HTMLElement;
    const rect = targetNode.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingId) return;
    const container = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - container.left - dragOffset.x;
    const newY = e.clientY - container.top - dragOffset.y;

    setElements(elements.map(el => {
      if (el.id === draggingId) {
        return {
          ...el,
          x: Math.max(0, Math.round(newX)),
          y: Math.max(0, Math.round(newY)),
        };
      }
      return el;
    }));
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const generateCode = () => {
    let htmlContent = '<div class="artboard">\n';
    let cssContent = '.artboard {\n  position: relative;\n  width: 100%;\n  height: 500px;\n  background: #ffffff;\n  font-family: sans-serif;\n  overflow: hidden;\n}\n\n';

    elements.forEach((el, idx) => {
      const className = `layer-${idx + 1}`;
      if (el.type === 'heading') {
        htmlContent += `  <h2 class="${className}">${el.text}</h2>\n`;
      } else if (el.type === 'paragraph') {
        htmlContent += `  <p class="${className}">${el.text}</p>\n`;
      } else if (el.type === 'button') {
        htmlContent += `  <button class="${className}">${el.text}</button>\n`;
      } else if (el.type === 'card') {
        htmlContent += `  <div class="${className}">\n    <span>${el.text}</span>\n  </div>\n`;
      }

      cssContent += `.${className} {\n`;
      cssContent += `  position: absolute;\n`;
      cssContent += `  left: ${el.x}px;\n`;
      cssContent += `  top: ${el.y}px;\n`;
      cssContent += `  width: ${el.width};\n`;
      if (el.bg !== 'transparent') cssContent += `  background-color: ${el.bg};\n`;
      cssContent += `  color: ${el.color};\n`;
      cssContent += `  padding: ${el.padding};\n`;
      if (el.radius !== '0px') cssContent += `  border-radius: ${el.radius};\n`;
      if (el.border !== 'none') cssContent += `  border: ${el.border};\n`;
      if (el.boxShadow !== 'none') cssContent += `  box-shadow: ${el.boxShadow};\n`;
      
      if (el.display === 'flex') {
        cssContent += `  display: flex;\n`;
        cssContent += `  justify-content: ${el.justifyContent};\n`;
        cssContent += `  align-items: ${el.alignItems};\n`;
        if (el.gap !== '0px') cssContent += `  gap: ${el.gap};\n`;
      }

      if (el.type === 'button') cssContent += `  cursor: pointer; font-weight: bold;\n`;
      cssContent += `  z-index: ${idx + 1};\n`;
      cssContent += `}\n\n`;
    });

    htmlContent += '</div>';
    return { html: htmlContent, css: cssContent };
  };

  const { html, css } = generateCode();

  const handleCopyCode = () => {
    const textToCopy = codeTab === 'html' ? html : css;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen w-full bg-[#1e1e1e] text-white font-sans overflow-hidden">
      
      {/* 🎨 左カラム：ツール＆パーツ追加パネル */}
      <div className="w-64 bg-[#252526] border-r border-[#3c3c3c] flex flex-col shrink-0 select-none">
        <div className="p-3 bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center justify-between text-xs font-bold text-indigo-300">
          <div className="flex items-center gap-2">
            <Layout size={16} className="text-indigo-400" />
            <span>ツールボックス</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleManualSave}
              className="flex items-center gap-1 bg-[#1e293b] hover:bg-[#334155] border border-indigo-500/50 text-indigo-200 px-2 py-1 rounded-[4px] text-[11px] cursor-pointer transition-colors"
              title="セーブ"
            >
              <Save size={11} /> セーブ
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 bg-rose-950/50 hover:bg-rose-900 border border-rose-500/50 text-rose-200 px-2 py-1 rounded-[4px] text-[11px] cursor-pointer transition-colors"
              title="初期化"
            >
              <RefreshCw size={11} /> 初期化
            </button>
          </div>
        </div>

        {saveNotification && (
          <div className="bg-emerald-950/80 text-emerald-400 text-[11px] font-bold py-1 px-3 text-center border-b border-emerald-900 animate-pulse">
            {saveNotification}
          </div>
        )}

        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">パーツを追加</span>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleAddElement('heading')} className="flex flex-col items-center justify-center p-3 bg-[#1e1e1e] hover:bg-[#333] border border-[#3c3c3c] rounded-lg transition text-xs gap-1.5 cursor-pointer">
                <Type size={18} className="text-orange-400" />
                <span className="font-bold">見出し</span>
              </button>
              <button onClick={() => handleAddElement('paragraph')} className="flex flex-col items-center justify-center p-3 bg-[#1e1e1e] hover:bg-[#333] border border-[#3c3c3c] rounded-lg transition text-xs gap-1.5 cursor-pointer">
                <Type size={16} className="text-sky-400" />
                <span className="font-bold">文章</span>
              </button>
              <button onClick={() => handleAddElement('button')} className="flex flex-col items-center justify-center p-3 bg-[#1e1e1e] hover:bg-[#333] border border-[#3c3c3c] rounded-lg transition text-xs gap-1.5 cursor-pointer">
                <MousePointer size={18} className="text-emerald-400" />
                <span className="font-bold">ボタン</span>
              </button>
              <button onClick={() => handleAddElement('card')} className="flex flex-col items-center justify-center p-3 bg-[#1e1e1e] hover:bg-[#333] border border-[#3c3c3c] rounded-lg transition text-xs gap-1.5 cursor-pointer">
                <Square size={18} className="text-indigo-400" />
                <span className="font-bold">カード</span>
              </button>
            </div>
          </div>

          <div className="border-t border-[#3c3c3c] pt-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">レイヤー一覧 (上ほど前面)</span>
            <div className="space-y-1.5">
              {elements.length === 0 ? (
                <div className="text-center text-xs text-gray-500 py-4">レイヤーがありません</div>
              ) : (
                [...elements].reverse().map((el, revIdx) => {
                  const actualIdx = elements.length - 1 - revIdx;
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={`group px-3 py-2 rounded text-xs flex items-center justify-between cursor-pointer transition ${
                        selectedId === el.id ? 'bg-indigo-600/30 border border-indigo-500 font-bold text-white' : 'bg-[#1e1e1e] hover:bg-[#2d2d2d] text-gray-300'
                      }`}
                    >
                      <span className="truncate flex-1">#{actualIdx + 1} {el.type.toUpperCase()}: {el.text}</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); handleMoveOrder(actualIdx, 'up'); }} className="p-1 hover:text-indigo-400" title="前面へ"><ArrowUp size={12} /></button>
                        <button onClick={(e) => { e.stopPropagation(); handleMoveOrder(actualIdx, 'down'); }} className="p-1 hover:text-indigo-400" title="背面へ"><ArrowDown size={12} /></button>
                        <button onClick={(e) => handleDelete(el.id, e)} className="p-1 hover:text-rose-400" title="削除"><Trash2 size={12} /></button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🖼️ 中央カラム：フリーキャンバス */}
      <div className="flex-1 bg-[#141414] flex flex-col h-full border-r border-[#3c3c3c] overflow-hidden">
        <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-bold text-gray-400 flex justify-between items-center shrink-0">
          <span>🖥️ フリーレイアウト・キャンバス (ドラッグで移動・重ね合わせ可能)</span>
          <span className="text-[10px] text-indigo-400 font-mono">パーツ数: {elements.length}</span>
        </div>

        <div className="flex-1 p-8 overflow-auto flex items-center justify-center bg-[#1a1a1a]">
          <div 
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-[600px] h-[500px] bg-white rounded-2xl shadow-2xl relative overflow-hidden border border-gray-300 select-none"
          >
            {elements.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-xs gap-2">
                <Move size={24} className="text-gray-500 animate-bounce" />
                <span>パーツがありません。左のパネルから追加してください。</span>
              </div>
            ) : (
              elements.map((el, idx) => {
                const isSelected = selectedId === el.id;
                return (
                  <div
                    key={el.id}
                    onMouseDown={(e) => handleMouseDown(e, el)}
                    style={{
                      position: 'absolute',
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      width: el.width,
                      backgroundColor: el.bg,
                      color: el.color,
                      padding: el.padding,
                      borderRadius: el.radius,
                      boxShadow: el.boxShadow,
                      border: el.border,
                      display: el.display,
                      justifyContent: el.justifyContent,
                      alignItems: el.alignItems,
                      gap: el.gap,
                      zIndex: idx + 1,
                    }}
                    className={`cursor-move transition-shadow ${
                      isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 shadow-xl' : 'hover:opacity-95 shadow-md'
                    }`}
                  >
                    {el.type === 'heading' && <h2 className="text-xl font-black pointer-events-none">{el.text}</h2>}
                    {el.type === 'paragraph' && <p className="text-sm pointer-events-none">{el.text}</p>}
                    {el.type === 'button' && <button className="font-bold w-full text-center pointer-events-none">{el.text}</button>}
                    {el.type === 'card' && (
                      <>
                        <span className="text-sm font-medium pointer-events-none">{el.text}</span>
                        <span className="text-xs opacity-80 pointer-events-none">➔</span>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ⚙️ 右カラム：プロパティ ＆ CSS学習用詳細設定 ＆ タブ付きコード出力 */}
      <div className="w-[420px] bg-[#252526] flex flex-col h-full shrink-0">
        
        {/* 選択パーツの詳細プロパティ編集 */}
        <div className="p-4 border-b border-[#3c3c3c] bg-[#2d2d2d] overflow-y-auto max-h-[360px] shrink-0">
          <div className="text-xs font-bold text-amber-400 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5"><Sliders size={14} /> CSSプロパティ学習設定</span>
            <span className="text-[10px] text-gray-400 font-mono">
              {selectedElement ? `ID: ${selectedId}` : '未選択'}
            </span>
          </div>

          {selectedElement ? (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-gray-400 font-bold block mb-1">表示テキスト</label>
                <input
                  type="text"
                  value={selectedElement.text}
                  onChange={(e) => handleUpdateSelected('text', e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-[#444] px-3 py-1.5 rounded text-xs text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold block mb-1">X座標 (left)</label>
                  <input
                    type="number"
                    value={selectedElement.x}
                    onChange={(e) => handleUpdateSelected('x', parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-[#1e1e1e] border border-[#444] px-3 py-1.5 rounded text-xs text-white outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold block mb-1">Y座標 (top)</label>
                  <input
                    type="number"
                    value={selectedElement.y}
                    onChange={(e) => handleUpdateSelected('y', parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-[#1e1e1e] border border-[#444] px-3 py-1.5 rounded text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold block mb-1">横幅 (width)</label>
                  <input
                    type="text"
                    value={selectedElement.width}
                    onChange={(e) => handleUpdateSelected('width', e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-[#444] px-3 py-1.5 rounded text-xs text-white outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold block mb-1">角丸 (border-radius)</label>
                  <input
                    type="text"
                    value={selectedElement.radius}
                    onChange={(e) => handleUpdateSelected('radius', e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-[#444] px-3 py-1.5 rounded text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              {/* 🌟 CSS道場プロパティ：影 (box-shadow) と枠線 (border) */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold block mb-1">影 (box-shadow)</label>
                  <input
                    type="text"
                    value={selectedElement.boxShadow}
                    onChange={(e) => handleUpdateSelected('boxShadow', e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-[#444] px-3 py-1.5 rounded text-xs text-white outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold block mb-1">枠線 (border)</label>
                  <input
                    type="text"
                    value={selectedElement.border}
                    onChange={(e) => handleUpdateSelected('border', e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-[#444] px-3 py-1.5 rounded text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              {/* 🌟 CSS道場プロパティ：Flexbox & 均等配置設定 */}
              <div className="bg-[#1e1e1e] p-2.5 rounded border border-[#444] space-y-2">
                <div className="font-bold text-indigo-400 flex items-center justify-between">
                  <span>フレックスボックス (Flexbox)</span>
                  <select
                    value={selectedElement.display}
                    onChange={(e) => handleUpdateSelected('display', e.target.value)}
                    className="bg-[#252526] text-white px-2 py-0.5 rounded text-[10px] border border-[#555] cursor-pointer"
                  >
                    <option value="block">display: block</option>
                    <option value="flex">display: flex</option>
                  </select>
                </div>

                {selectedElement.display === 'flex' && (
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <div>
                      <label className="text-[9px] text-gray-400 block mb-0.5">均等・左右(justify)</label>
                      <select
                        value={selectedElement.justifyContent}
                        onChange={(e) => handleUpdateSelected('justifyContent', e.target.value)}
                        className="w-full bg-[#252526] text-white px-1.5 py-1 rounded text-[10px] border border-[#555] cursor-pointer"
                      >
                        <option value="flex-start">flex-start</option>
                        <option value="center">center</option>
                        <option value="space-between">space-between</option>
                        <option value="space-around">space-around</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] text-gray-400 block mb-0.5">縦中央(align)</label>
                      <select
                        value={selectedElement.alignItems}
                        onChange={(e) => handleUpdateSelected('alignItems', e.target.value)}
                        className="w-full bg-[#252526] text-white px-1.5 py-1 rounded text-[10px] border border-[#555] cursor-pointer"
                      >
                        <option value="flex-start">flex-start</option>
                        <option value="center">center</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] text-gray-400 block mb-0.5">隙間(gap)</label>
                      <input
                        type="text"
                        value={selectedElement.gap}
                        onChange={(e) => handleUpdateSelected('gap', e.target.value)}
                        className="w-full bg-[#252526] text-white px-1.5 py-1 rounded text-[10px] border border-[#555] font-mono text-center"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold block mb-1">背景色</label>
                  <div className="flex items-center gap-2 bg-[#1e1e1e] border border-[#444] px-2 py-1 rounded">
                    <input
                      type="color"
                      value={selectedElement.bg === 'transparent' ? '#ffffff' : selectedElement.bg}
                      onChange={(e) => handleUpdateSelected('bg', e.target.value)}
                      className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={selectedElement.bg}
                      onChange={(e) => handleUpdateSelected('bg', e.target.value)}
                      className="w-full bg-transparent text-xs text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-bold block mb-1">文字色</label>
                  <div className="flex items-center gap-2 bg-[#1e1e1e] border border-[#444] px-2 py-1 rounded">
                    <input
                      type="color"
                      value={selectedElement.color}
                      onChange={(e) => handleUpdateSelected('color', e.target.value)}
                      className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={selectedElement.color}
                      onChange={(e) => handleUpdateSelected('color', e.target.value)}
                      className="w-full bg-transparent text-xs text-white outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-xs text-gray-500 py-6">
              キャンバス上のパーツを選択してください
            </div>
          )}
        </div>

        {/* 💡 HTML / CSS タブ付きコード出力エリア */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-[#1e1e1e] border-b border-[#3c3c3c] flex justify-between items-center px-2 shrink-0">
            <div className="flex">
              <button
                onClick={() => setCodeTab('html')}
                className={`px-3 py-2 text-xs font-mono transition-all cursor-pointer ${
                  codeTab === 'html' ? 'bg-[#252526] text-orange-400 font-bold border-t-2 border-orange-500' : 'text-gray-400 hover:bg-[#2d2d2d]'
                }`}
              >
                index.html
              </button>
              <button
                onClick={() => setCodeTab('css')}
                className={`px-3 py-2 text-xs font-mono transition-all cursor-pointer ${
                  codeTab === 'css' ? 'bg-[#252526] text-sky-400 font-bold border-t-2 border-sky-500' : 'text-gray-400 hover:bg-[#2d2d2d]'
                }`}
              >
                style.css
              </button>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 bg-[#333] hover:bg-[#444] text-gray-200 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer mr-2"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {copied ? 'コピー完了' : `${codeTab === 'html' ? 'HTML' : 'CSS'}コピー`}
            </button>
          </div>

          <div className="flex-1 relative w-full overflow-hidden">
            <Editor
              height="100%"
              language={codeTab}
              theme="vs-dark"
              value={codeTab === 'html' ? html : css}
              options={{
                fontSize: 11,
                minimap: { enabled: false },
                readOnly: true,
                wordWrap: 'on',
              }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}