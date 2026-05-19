export interface TracePage {
  fileName: string;
  initialCode: string;
  correctCode: string;
  language: 'html' | 'css';
}

export interface TraceStage {
  id: number;
  title: string;
  category: '初級：ガチ連動Webサイト' | '中級：ガチ連動Webサイト' | '上級：ガチ連動Webサイト';
  description: string;
  mission: string;
  pages: TracePage[]; 
}

// 👑 長文HTMLのダミーを自動生成する便利関数
export const generateHtmlSections = (count: number, prefix: string) => {
  let str = '';
  for (let i = 1; i <= count; i++) {
    str += `
    <section class="content-section section-${i}" id="sec-${i}">
      <h3 class="section-title">${prefix} モジュール 0${i}</h3>
      <div class="card-layout flex-box">
        <div class="image-area bg-color-${i % 5}">IMAGE ${i}</div>
        <div class="text-area">
          <h4 class="sub-title">セクション${i}の独自コンテンツ</h4>
          <p class="desc">これはセクション${i}専用のパラグラフです。見本コードを写経する際、idやclassの番号がそれぞれ異なることに注意して、正確にマークアップを行ってください。</p>
          <a href="#sec-${i+1}" class="btn-link">次のモジュールへ ➔</a>
        </div>
      </div>
    </section>`;
  }
  return str;
};

// 👑 長文CSSのダミーを自動生成する便利関数
export const generateCssRules = (count: number) => {
  let str = '';
  for (let i = 1; i <= count; i++) {
    str += `
/* Section ${i} Specific Styles */
.section-${i} {
  margin-bottom: ${20 + (i % 3) * 5}px;
  border-left: ${i % 2 === 0 ? '4px solid #3b82f6' : '4px solid #10b981'};
}
.bg-color-${i % 5} {
  background: hsl(${i * 45}, 70%, 20%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
#sec-${i} .sub-title {
  color: hsl(${i * 45}, 80%, 60%);
  font-size: 14px;
}`;
  }
  return str;
};