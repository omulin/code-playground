interface ProjectItem {
  name: string;
  code: string;
}

interface ProjectLabProps {
  projects?: ProjectItem[]; // オプショナルにしておく
}

export default function ProjectLab({ 
  projects = [
    { 
      name: "サンプル実績 01：LPヘッダーバナー", 
      code: "<div style='padding: 12px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border-radius: 8px; text-align: center;'><b>✨ 特別キャンペーン実施中！</b></div>" 
    },
    { 
      name: "サンプル実績 02：お申し込みボタン", 
      code: "<div style='text-align: center;'><button style='background: #10b981; color: white; padding: 10px 20px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer;'>今すぐ無料で始める</button></div>" 
    }
  ] 
}: ProjectLabProps) {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-cyan-400">🚀 Project Lab: あなたの制作実績ポートフォリオ</h2>
      <p className="text-sm text-slate-400">これまでのWork体験で、あなたが実際にコードを書いて納品した成果物一覧です。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-lg">
            <div className="flex justify-between items-start border-b border-slate-800 pb-2 mb-4">
              <div>
                <h4 className="font-bold text-sm text-white">{proj.name}</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">保存先: .exe ローカル環境</p>
              </div>
              <span className="text-xs text-cyan-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">#{idx + 1}</span>
            </div>

            {/* 納品したコードの見た目をそのまま再現 */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-900 min-h-[140px] flex items-center justify-center overflow-hidden mb-3">
              <div className="w-full scale-90" dangerouslySetInnerHTML={{ __html: proj.code }} />
            </div>

            <details className="mt-2">
              <summary className="text-[11px] text-slate-500 cursor-pointer hover:text-slate-300 outline-none select-none">💻 この実績のソースコードを見る</summary>
              <pre className="bg-slate-950 text-emerald-400 p-2 rounded text-[10px] font-mono overflow-x-auto mt-2 max-h-24 border border-slate-900 text-left">
                {proj.code}
              </pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}