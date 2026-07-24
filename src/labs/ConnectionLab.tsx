import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { RefreshCw, CheckCircle2, Code2, Sliders, Layers, Globe, ShieldCheck, Zap } from 'lucide-react';

interface LPSection {
  id: string;
  name: string;
  tag: string;
  bg: string;
  color: string;
  padding: string;
  borderRadius: string;
  boxShadow: string;
  align: 'left' | 'center' | 'right';
  text: string;
  subText: string;
}

export default function ConnectionLab() {
  const [sections, setSections] = useState<LPSection[]>([
    {
      id: 'header',
      name: '1. ナビゲーションバー (ヘッダー)',
      tag: 'nav',
      bg: '#ffffff',
      color: '#0f172a',
      padding: '16px 32px',
      borderRadius: '0px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      align: 'left',
      text: '⚡ NextGen Cloud',
      subText: '機能 / 料金プラン / 導入事例 / お問い合わせ',
    },
    {
      id: 'hero',
      name: '2. ヒーローセクション (メイン訴求)',
      tag: 'header',
      bg: '#0f172a',
      color: '#ffffff',
      padding: '80px 32px',
      borderRadius: '0px',
      boxShadow: 'none',
      align: 'center',
      text: 'チームの生産性を、限界の先へ。',
      subText: '次世代のクラウドワークスペースで、あらゆる開発とデザインをシームレスに統合します。',
    },
    {
      id: 'features',
      name: '3. 特徴カード (3カラム紹介)',
      tag: 'div',
      bg: '#f8fafc',
      color: '#1e293b',
      padding: '48px 32px',
      borderRadius: '0px',
      boxShadow: 'inset 0 1px 0 0 #e2e8f0, inset 0 -1px 0 0 #e2e8f0',
      align: 'center',
      text: '選ばれる3つの理由',
      subText: '超高速なプレビュー / 完全なリアルタイム同期 / 直感的なカスタマイズ',
    },
    {
      id: 'cta',
      name: '4. CTA (コンバージョンバナー)',
      tag: 'section',
      bg: '#4f46e5',
      color: '#ffffff',
      padding: '64px 32px',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.3)',
      align: 'center',
      text: '今すぐ、無料で始めよう。',
      subText: '14日間の無料トライアル。クレジットカード不要。',
    },
    {
      id: 'footer',
      name: '5. フッター (サイト情報)',
      tag: 'footer',
      bg: '#0f172a',
      color: '#64748b',
      padding: '32px',
      borderRadius: '0px',
      boxShadow: 'none',
      align: 'center',
      text: '© 2026 NextGen Cloud Inc. All rights reserved.',
      subText: 'プライバシー規約 / 利用規約 / 運営会社',
    },
  ]);

  const [selectedId, setSelectedId] = useState<string>('hero');
  const [codeTab, setCodeTab] = useState<'css' | 'html'>('css');

  // Monacoエディタの連動・ハイライト用参照
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsCollection = useRef<any>(null);

  const selectedSection = sections.find(s => s.id === selectedId) || sections[1];

  const handleUpdate = (key: keyof LPSection, value: any) => {
    setSections(sections.map(s => {
      if (s.id === selectedId) {
        return { ...s, [key]: value };
      }
      return s;
    }));
  };

  const handleReset = () => {
    setSections([
      { id: 'header', name: '1. ナビゲーションバー (ヘッダー)', tag: 'nav', bg: '#ffffff', color: '#0f172a', padding: '16px 32px', borderRadius: '0px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', align: 'left', text: '⚡ NextGen Cloud', subText: '機能 / 料金プラン / 導入事例 / お問い合わせ' },
      { id: 'hero', name: '2. ヒーローセクション (メイン訴求)', tag: 'header', bg: '#0f172a', color: '#ffffff', padding: '80px 32px', borderRadius: '0px', boxShadow: 'none', align: 'center', text: 'チームの生産性を、限界の先へ。', subText: '次世代のクラウドワークスペースで、あらゆる開発とデザインをシームレスに統合します。' },
      { id: 'features', name: '3. 特徴カード (3カラム紹介)', tag: 'div', bg: '#f8fafc', color: '#1e293b', padding: '48px 32px', borderRadius: '0px', boxShadow: 'inset 0 1px 0 0 #e2e8f0, inset 0 -1px 0 0 #e2e8f0', align: 'center', text: '選ばれる3つの理由', subText: '超高速なプレビュー / 完全なリアルタイム同期 / 直感的なカスタマイズ' },
      { id: 'cta', name: '4. CTA (コンバージョンバナー)', tag: 'section', bg: '#4f46e5', color: '#ffffff', padding: '64px 32px', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.3)', align: 'center', text: '今すぐ、無料で始めよう。', subText: '14日間の無料トライアル。クレジットカード不要。' },
      { id: 'footer', name: '5. フッター (サイト情報)', tag: 'footer', bg: '#0f172a', color: '#64748b', padding: '32px', borderRadius: '0px', boxShadow: 'none', align: 'center', text: '© 2026 NextGen Cloud Inc. All rights reserved.', subText: 'プライバシー規約 / 利用規約 / 運営会社' },
    ]);
  };

  // CSSコードの生成
  const generateCss = () => {
    return sections.map(s => {
      const selector = s.id === 'header' ? 'nav.header' : s.id === 'hero' ? 'header.hero' : s.id === 'features' ? '.features-section' : s.id === 'cta' ? '.cta-banner' : 'footer';
      return `${selector} {
  background-color: ${s.bg};
  color: ${s.color};
  padding: ${s.padding};
  border-radius: ${s.borderRadius};
  box-shadow: ${s.boxShadow};
  text-align: ${s.align};
}`;
    }).join('\n\n');
  };

  // HTMLコードの生成
  const generateHtml = () => {
    return sections.map(s => {
      if (s.id === 'header') {
        return `<nav class="header">\n  <div class="logo">${s.text}</div>\n  <div class="links">${s.subText}</div>\n</nav>`;
      } else if (s.id === 'hero') {
        return `<header class="hero">\n  <h1>${s.text}</h1>\n  <p>${s.subText}</p>\n</header>`;
      } else if (s.id === 'features') {
        return `<div class="features-section">\n  <h3>${s.text}</h3>\n  <p>${s.subText}</p>\n</div>`;
      } else if (s.id === 'cta') {
        return `<section class="cta-banner">\n  <h2>${s.text}</h2>\n  <p>${s.subText}</p>\n</section>`;
      } else {
        return `<footer>\n  <div>${s.text}</div>\n  <div>${s.subText}</div>\n</footer>`;
      }
    }).join('\n\n');
  };

  // エディタのマウント時
  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    decorationsCollection.current = editor.createDecorationsCollection();
    highlightTargetCode(selectedId, codeTab);
  };

  // 選択されたパーツに対応する行をハイライト（色を変える）する関数
  const highlightTargetCode = (id: string, tab: 'css' | 'html') => {
    if (!editorRef.current || !monacoRef.current || !decorationsCollection.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    const content = model.getValue();
    const lines = content.split('\n');

    let keyword = '';
    if (tab === 'css') {
      if (id === 'header') keyword = 'nav.header';
      else if (id === 'hero') keyword = 'header.hero';
      else if (id === 'features') keyword = '.features-section';
      else if (id === 'cta') keyword = '.cta-banner';
      else if (id === 'footer') keyword = 'footer';
    } else {
      if (id === 'header') keyword = 'class="header"';
      else if (id === 'hero') keyword = 'class="hero"';
      else if (id === 'features') keyword = 'class="features-section"';
      else if (id === 'cta') keyword = 'class="cta-banner"';
      else if (id === 'footer') keyword = '<footer';
    }

    let startLine = 1;
    let endLine = 1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(keyword)) {
        startLine = i + 1;
        endLine = startLine;
        for (let j = i; j < lines.length; j++) {
          endLine = j + 1;
          if (tab === 'css' && lines[j].includes('}')) break;
          if (tab === 'html' && lines[j].includes('</')) break;
          if (tab === 'html' && j === i) break; // 単行の場合
        }
        break;
      }
    }

    // エディタ内にハイライトのデコレーション（背景色と左線の強調）を適用
    decorationsCollection.current.set([
      {
        range: new monacoRef.current.Range(startLine, 1, endLine, lines[endLine - 1]?.length + 1 || 1),
        options: {
          isWholeLine: true,
          className: 'bg-indigo-500/25 border-l-4 border-indigo-400 font-semibold',
        },
      },
    ]);

    editorRef.current.revealLineInCenter(startLine);
  };

  // 選択変更時やタブ変更時にハイライトを自動更新
  useEffect(() => {
    highlightTargetCode(selectedId, codeTab);
  }, [selectedId, codeTab, sections]);

  return (
    <div className="flex h-screen w-full bg-[#1e1e1e] text-white font-sans overflow-hidden">
      
      {/* 左カラム：セクション一覧 */}
      <div className="w-80 bg-[#252526] border-r border-[#3c3c3c] flex flex-col shrink-0 select-none">
        <div className="p-3 bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center justify-between text-xs font-bold text-indigo-300">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-indigo-400" />
            <span>本格コーポレートLP 構成</span>
          </div>
          <button onClick={handleReset} className="text-gray-400 hover:text-white flex items-center gap-1 text-[10px] cursor-pointer">
            <RefreshCw size={10} /> リセット
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            パーツをクリックすると、プレビューと右側のコード（HTML/CSS）の該当部分が連動してハイライトされます！
          </p>

          <div className="space-y-2 mt-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`w-full text-left px-3 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                  selectedId === s.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-[#1e1e1e] hover:bg-[#2d2d2d] text-gray-300 border border-[#3c3c3c]'
                }`}
              >
                <span className="truncate">{s.name}</span>
                <span className="text-[10px] font-mono opacity-70 bg-black/30 px-1.5 py-0.5 rounded">&lt;{s.tag}&gt;</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 中央カラム：リアルなLPプレビュー */}
      <div className="flex-1 bg-[#141414] flex flex-col h-full border-r border-[#3c3c3c] overflow-hidden">
        <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-bold text-gray-400 flex justify-between items-center shrink-0">
          <span className="flex items-center gap-1.5"><Globe size={14} className="text-sky-400" /> ライブWebサイト・プレビュー</span>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 size={12} /> リアルタイム連動中
          </span>
        </div>

        <div className="flex-1 p-8 overflow-y-auto flex justify-center bg-[#111113]">
          <div className="w-full max-w-2xl bg-white text-slate-900 rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col my-auto">
            
            <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-200 flex items-center gap-2 select-none">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="mx-auto bg-white px-4 py-0.5 rounded-md text-[11px] text-gray-500 font-mono border border-gray-200 w-64 text-center truncate">
                https://nextgen-cloud.example.com
              </div>
            </div>

            {sections.map(s => {
              const isSel = selectedId === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  style={{
                    backgroundColor: s.bg,
                    color: s.color,
                    padding: s.padding,
                    borderRadius: s.borderRadius,
                    boxShadow: s.boxShadow,
                    textAlign: s.align,
                  }}
                  className={`cursor-pointer transition-all relative group ${
                    isSel ? 'ring-4 ring-indigo-500 ring-inset z-10' : 'hover:opacity-95'
                  }`}
                >
                  <div className="absolute top-2 right-3 text-[9px] font-mono uppercase bg-black/10 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    クリックして選択 ({s.tag})
                  </div>

                  {s.id === 'header' && (
                    <div className="flex justify-between items-center w-full">
                      <div className="font-black text-base">{s.text}</div>
                      <div className="text-xs opacity-70 font-medium hidden sm:block">{s.subText}</div>
                    </div>
                  )}

                  {s.id === 'hero' && (
                    <div className="py-4 space-y-4">
                      <h1 className="text-2xl md:text-3xl font-black tracking-tight">{s.text}</h1>
                      <p className="text-sm opacity-80 max-w-md mx-auto">{s.subText}</p>
                      <div className="pt-2 flex justify-center gap-3">
                        <span className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-xs font-bold shadow">無料で始める</span>
                        <span className="bg-white/10 text-white px-5 py-2 rounded-lg text-xs font-bold border border-white/20">詳細を見る</span>
                      </div>
                    </div>
                  )}

                  {s.id === 'features' && (
                    <div className="space-y-4">
                      <h3 className="font-black text-lg mb-4">{s.text}</h3>
                      <div className="grid grid-cols-3 gap-3 text-left">
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                          <div className="text-indigo-600 mb-1"><Zap size={16} /></div>
                          <div className="font-bold text-xs">超高速描画</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">瞬時に反映されるライブプレビュー</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                          <div className="text-indigo-600 mb-1"><ShieldCheck size={16} /></div>
                          <div className="font-bold text-xs">安全な設計</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">ロバストな型安全性とエラー防止</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                          <div className="text-indigo-600 mb-1"><Layers size={16} /></div>
                          <div className="font-bold text-xs">柔軟な拡張</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">パーツの組み合わせは無限大</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {s.id === 'cta' && (
                    <div className="space-y-3 py-2">
                      <h2 className="text-xl font-black">{s.text}</h2>
                      <p className="text-xs opacity-90">{s.subText}</p>
                      <div className="inline-block bg-white text-indigo-900 font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg mt-2">
                        今すぐアカウントを作成 ➔
                      </div>
                    </div>
                  )}

                  {s.id === 'footer' && (
                    <div className="flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
                      <div>{s.text}</div>
                      <div className="opacity-75">{s.subText}</div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* 右カラム：いじるパレット ＆ HTML/CSSタブ付きコード出力 */}
      <div className="w-96 bg-[#252526] flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-[#3c3c3c] bg-[#2d2d2d] shrink-0 space-y-3 overflow-y-auto max-h-[40vh]">
          <div className="text-xs font-bold text-amber-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5"><Sliders size={14} /> 「{selectedSection.name}」をカスタマイズ</span>
            <span className="text-[10px] text-gray-400 font-mono">プロパティ</span>
          </div>

          <div>
            <label className="text-[10px] text-gray-400 font-bold block mb-1">メインテキスト</label>
            <input
              type="text"
              value={selectedSection.text}
              onChange={(e) => handleUpdate('text', e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#444] px-3 py-1.5 rounded text-xs text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-gray-400 font-bold block mb-1">背景色 (background)</label>
              <div className="flex items-center gap-2 bg-[#1e1e1e] border border-[#444] px-2 py-1 rounded">
                <input
                  type="color"
                  value={selectedSection.bg.startsWith('#') ? selectedSection.bg : '#ffffff'}
                  onChange={(e) => handleUpdate('bg', e.target.value)}
                  className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={selectedSection.bg}
                  onChange={(e) => handleUpdate('bg', e.target.value)}
                  className="w-full bg-transparent text-xs text-white outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-bold block mb-1">文字色 (color)</label>
              <div className="flex items-center gap-2 bg-[#1e1e1e] border border-[#444] px-2 py-1 rounded">
                <input
                  type="color"
                  value={selectedSection.color.startsWith('#') ? selectedSection.color : '#000000'}
                  onChange={(e) => handleUpdate('color', e.target.value)}
                  className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={selectedSection.color}
                  onChange={(e) => handleUpdate('color', e.target.value)}
                  className="w-full bg-transparent text-xs text-white outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-gray-400 font-bold block mb-1">内側余白 (padding)</label>
              <select
                value={selectedSection.padding}
                onChange={(e) => handleUpdate('padding', e.target.value)}
                className="w-full bg-[#1e1e1e] text-xs text-white border border-[#444] px-2 py-1.5 rounded outline-none font-mono cursor-pointer"
              >
                <option value="16px 32px">標準 (16px 32px)</option>
                <option value="48px 32px">ゆったり (48px)</option>
                <option value="80px 32px">大迫力ヒーロー (80px)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-bold block mb-1">文字揃え (align)</label>
              <div className="flex bg-[#1e1e1e] rounded border border-[#444] p-0.5">
                {(['left', 'center', 'right'] as const).map(a => (
                  <button
                    key={a}
                    onClick={() => handleUpdate('align', a)}
                    className={`flex-1 py-1 text-[10px] font-bold rounded transition cursor-pointer uppercase ${
                      selectedSection.align === a ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {a === 'left' ? '左' : a === 'center' ? '中央' : '右'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-gray-400 font-bold block mb-1">角丸 (border-radius)</label>
              <select
                value={selectedSection.borderRadius}
                onChange={(e) => handleUpdate('borderRadius', e.target.value)}
                className="w-full bg-[#1e1e1e] text-xs text-white border border-[#444] px-2 py-1.5 rounded outline-none font-mono cursor-pointer"
              >
                <option value="0px">カクカク (0px)</option>
                <option value="8px">少し丸い (8px)</option>
                <option value="16px">しっかり丸い (16px)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 font-bold block mb-1">影 (box-shadow)</label>
              <select
                value={selectedSection.boxShadow}
                onChange={(e) => handleUpdate('boxShadow', e.target.value)}
                className="w-full bg-[#1e1e1e] text-xs text-white border border-[#444] px-2 py-1.5 rounded outline-none font-mono cursor-pointer"
              >
                <option value="none">なし</option>
                <option value="0 1px 2px 0 rgba(0, 0, 0, 0.05)">ソフトな影</option>
                <option value="0 20px 25px -5px rgba(79, 70, 229, 0.3)">立体的なカラーシャドウ</option>
              </select>
            </div>
          </div>
        </div>

        {/* HTML / CSS 切り替えタブ付きコード出力 */}
        <div className="flex-1 flex flex-col overflow-hidden border-t border-[#3c3c3c]">
          <div className="bg-[#2d2d2d] px-2 flex items-center justify-between border-b border-[#3c3c3c] shrink-0">
            <div className="flex">
              <button
                onClick={() => setCodeTab('css')}
                className={`px-3 py-2 text-xs font-mono transition cursor-pointer ${
                  codeTab === 'css' ? 'bg-[#1e1e1e] text-indigo-400 font-bold border-t-2 border-indigo-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                style.css
              </button>
              <button
                onClick={() => setCodeTab('html')}
                className={`px-3 py-2 text-xs font-mono transition cursor-pointer ${
                  codeTab === 'html' ? 'bg-[#1e1e1e] text-orange-400 font-bold border-t-2 border-orange-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                index.html
              </button>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono pr-2">💡 選択中を自動ハイライト</span>
          </div>

          <div className="flex-1 relative w-full overflow-hidden">
            <Editor
              height="100%"
              language={codeTab}
              theme="vs-dark"
              value={codeTab === 'css' ? generateCss() : generateHtml()}
              onMount={handleEditorMount}
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