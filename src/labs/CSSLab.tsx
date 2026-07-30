import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Sparkles, CheckCircle2, RotateCcw, Save, Layout, HelpCircle, Lightbulb, EyeOff, Copy, Check } from 'lucide-react';

interface CssStage {
  id: number;
  title: string;
  mission: string;
  hint: string;
  initialCss: string;
  correctCode: string;
  targetStyle: React.CSSProperties;
  checkCondition: (css: string) => boolean;
}

// 🌟 全40問のステージデータ
const CSS_STAGES: CssStage[] = [
  {
    id: 1,
    title: 'ステージ 1：背景色の指定',
    mission: '要素の背景色（background-color）を落ち着いたダークグレー（#1e293b）にしてください。',
    hint: '`background-color: #1e293b;` を指定します。',
    initialCss: '.target-box {\n  /* 背景色を指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #1e293b;\n}',
    targetStyle: { backgroundColor: '#1e293b' },
    checkCondition: (css) => css.includes('background-color:#1e293b') || css.includes('background:#1e293b')
  },
  {
    id: 2,
    title: 'ステージ 2：文字色の指定',
    mission: 'テキストの色（color）を鮮やかな白色（#ffffff）にしてください。',
    hint: '`color: #ffffff;` を指定します。',
    initialCss: '.target-box {\n  background-color: #0f172a;\n  /* 文字色を指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #0f172a;\n  color: #ffffff;\n}',
    targetStyle: { backgroundColor: '#0f172a', color: '#ffffff' },
    checkCondition: (css) => css.includes('color:#ffffff') || css.includes('color:#fff')
  },
  {
    id: 3,
    title: 'ステージ 3：フォントサイズの調整',
    mission: 'フォントサイズ（font-size）を 18px に指定してください。',
    hint: '`font-size: 18px;` を指定します。',
    initialCss: '.target-box {\n  /* フォントサイズを指定しよう */\n}',
    correctCode: '.target-box {\n  font-size: 18px;\n}',
    targetStyle: { fontSize: '18px' },
    checkCondition: (css) => css.includes('font-size:18px')
  },
  {
    id: 4,
    title: 'ステージ 4：太字（font-weight）',
    mission: '文字の太さ（font-weight）を太字（bold）にしてください。',
    hint: '`font-weight: bold;` を指定します。',
    initialCss: '.target-box {\n  /* 太字にしよう */\n}',
    correctCode: '.target-box {\n  font-weight: bold;\n}',
    targetStyle: { fontWeight: 'bold' },
    checkCondition: (css) => css.includes('font-weight:bold') || css.includes('font-weight:700')
  },
  {
    id: 5,
    title: 'ステージ 5：ボックスの幅と高さ',
    mission: '幅（width）を 260px、高さ（height）を 130px に設定してください。',
    hint: '`width: 260px;` と `height: 130px;` を記述します。',
    initialCss: '.target-box {\n  background-color: #3b82f6;\n  /* 幅と高さを指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #3b82f6;\n  width: 260px;\n  height: 130px;\n}',
    targetStyle: { backgroundColor: '#3b82f6', width: '260px', height: '130px' },
    checkCondition: (css) => css.includes('width:260px') && css.includes('height:130px')
  },
  {
    id: 6,
    title: 'ステージ 6：角丸（border-radius）',
    mission: 'カードの角を滑らかにするため、角丸（border-radius）を 16px にしてください。',
    hint: '`border-radius: 16px;` を指定します。',
    initialCss: '.target-box {\n  background-color: #8b5cf6;\n  /* 角丸を指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #8b5cf6;\n  border-radius: 16px;\n}',
    targetStyle: { backgroundColor: '#8b5cf6', borderRadius: '16px' },
    checkCondition: (css) => css.includes('border-radius:16px')
  },
  {
    id: 7,
    title: 'ステージ 7：内側余白（padding）',
    mission: 'カード内部の余白（padding）を 24px に設定してください。',
    hint: '`padding: 24px;` を指定します。',
    initialCss: '.target-box {\n  background-color: #06b6d4;\n  /* 内側余白を指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #06b6d4;\n  padding: 24px;\n}',
    targetStyle: { backgroundColor: '#06b6d4', padding: '24px' },
    checkCondition: (css) => css.includes('padding:24px')
  },
  {
    id: 8,
    title: 'ステージ 8：境界線（border）',
    mission: '2px の実線で、白色（#ffffff）の枠線を引いてください。',
    hint: '`border: 2px solid #ffffff;` と記述します。',
    initialCss: '.target-box {\n  background-color: #ef4444;\n  /* 枠線を指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #ef4444;\n  border: 2px solid #ffffff;\n}',
    targetStyle: { backgroundColor: '#ef4444', border: '2px solid #ffffff' },
    checkCondition: (css) => css.includes('border:2pxsolid#ffffff') || (css.includes('border:2px') && css.includes('solid'))
  },
  {
    id: 9,
    title: 'ステージ 9：ドロップシャドウ（立体感）',
    mission: '美しい影をつけるため `box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);` を指定してください。',
    hint: '指定された `box-shadow` の数値をそのまま記述します。',
    initialCss: '.target-box {\n  background-color: #ffffff;\n  color: #1e293b;\n  /* 影を指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #ffffff;\n  color: #1e293b;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);\n}',
    targetStyle: { backgroundColor: '#ffffff', color: '#1e293b', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)' },
    checkCondition: (css) => css.includes('box-shadow')
  },
  {
    id: 10,
    title: 'ステージ 10：グラデーション背景',
    mission: '`background: linear-gradient(135deg, #3b82f6, #ec4899);` でグラデーションを適用してください。',
    hint: '`background` プロパティに `linear-gradient` を指定します。',
    initialCss: '.target-box {\n  /* グラデーションを指定しよう */\n}',
    correctCode: '.target-box {\n  background: linear-gradient(135deg, #3b82f6, #ec4899);\n}',
    targetStyle: { background: 'linear-gradient(135deg, #3b82f6, #ec4899)' },
    checkCondition: (css) => css.includes('linear-gradient')
  },
  {
    id: 11,
    title: 'ステージ 11：フレックスボックス有効化',
    mission: '`display: flex;` を指定して、フレックスコンテナに変更してください。',
    hint: '`display: flex;` を記述します。',
    initialCss: '.target-box {\n  /* フレックスボックスにしよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n}',
    targetStyle: { display: 'flex' },
    checkCondition: (css) => css.includes('display:flex')
  },
  {
    id: 12,
    title: 'ステージ 12：主軸中央寄せ（justify-content）',
    mission: '`justify-content: center;` を使って、子要素を水平方向の中央に配置してください。',
    hint: '`display: flex;` と合わせて `justify-content: center;` を指定します。',
    initialCss: '.target-box {\n  display: flex;\n  /* 水平中央揃えを指定しよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n  justify-content: center;\n}',
    targetStyle: { display: 'flex', justifyContent: 'center' },
    checkCondition: (css) => css.includes('display:flex') && css.includes('justify-content:center')
  },
  {
    id: 13,
    title: 'ステージ 13：【超頻出】カードの均等配置（space-between）',
    mission: '`justify-content: space-between;` を使って、子要素を左右両端に均等に配置してください。',
    hint: '`justify-content: space-between;` を指定します。',
    initialCss: '.target-box {\n  display: flex;\n  /* 左右両端に均等配置しよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n  justify-content: space-between;\n}',
    targetStyle: { display: 'flex', justifyContent: 'space-between' },
    checkCondition: (css) => css.includes('display:flex') && css.includes('justify-content:space-between')
  },
  {
    id: 14,
    title: 'ステージ 14：均等な隙間配置（space-around）',
    mission: '`justify-content: space-around;` を使って、子要素のまわりに均等なスペースを設けて配置してください。',
    hint: '`justify-content: space-around;` を指定します。',
    initialCss: '.target-box {\n  display: flex;\n  /* まわりに均等なスペースを開けよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n  justify-content: space-around;\n}',
    targetStyle: { display: 'flex', justifyContent: 'space-around' },
    checkCondition: (css) => css.includes('display:flex') && css.includes('justify-content:space-around')
  },
  {
    id: 15,
    title: 'ステージ 15：交差軸中央寄せ（align-items）',
    mission: '`align-items: center;` を使って、垂直方向（縦方向）の中央に配置してください。',
    hint: '`display: flex;` と合わせて `align-items: center;` を指定します。',
    initialCss: '.target-box {\n  display: flex;\n  /* 垂直中央揃えを指定しよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n  align-items: center;\n}',
    targetStyle: { display: 'flex', alignItems: 'center' },
    checkCondition: (css) => css.includes('display:flex') && css.includes('align-items:center')
  },
  {
    id: 16,
    title: 'ステージ 16：【究極基本】完全中央配置（縦横マスター）',
    mission: '`justify-content: center;` と `align-items: center;` の両方を使って、完全中央に配置してください。',
    hint: '両方のプロパティを記述します。',
    initialCss: '.target-box {\n  display: flex;\n  /* 縦横両方の中央揃えを指定しよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}',
    targetStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    checkCondition: (css) => css.includes('display:flex') && css.includes('justify-content:center') && css.includes('align-items:center')
  },
  {
    id: 17,
    title: 'ステージ 17：縦方向への並び替え（column）',
    mission: '`flex-direction: column;` を使って、子要素の並び順を上から下の縦方向へ変更してください。',
    hint: '`flex-direction: column;` を指定します。',
    initialCss: '.target-box {\n  display: flex;\n  /* 縦方向に並べよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n  flex-direction: column;\n}',
    targetStyle: { display: 'flex', flexDirection: 'column' },
    checkCondition: (css) => css.includes('display:flex') && css.includes('flex-direction:column')
  },
  {
    id: 18,
    title: 'ステージ 18：【必須】要素の隙間（gap）',
    mission: '`gap: 16px;` を使って、並んだ子要素同士の隙間を 16px に設定してください。',
    hint: '`gap: 16px;` を指定します。',
    initialCss: '.target-box {\n  display: flex;\n  /* 子要素の間に隙間をあけよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n  gap: 16px;\n}',
    targetStyle: { display: 'flex', gap: '16px' },
    checkCondition: (css) => css.includes('display:flex') && css.includes('gap:16px')
  },
  {
    id: 19,
    title: 'ステージ 19：フレックスの折り返し（wrap）',
    mission: '`flex-wrap: wrap;` を指定して、入り切らない子要素が次の行に折り返されるようにしてください。',
    hint: '`flex-wrap: wrap;` を指定します。',
    initialCss: '.target-box {\n  display: flex;\n  /* 折り返しを有効にしよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n  flex-wrap: wrap;\n}',
    targetStyle: { display: 'flex', flexWrap: 'wrap' },
    checkCondition: (css) => css.includes('display:flex') && css.includes('flex-wrap:wrap')
  },
  {
    id: 20,
    title: 'ステージ 20：テキストのセンタリング',
    mission: '`text-align: center;` を使って、テキストを中央揃えにしてください。',
    hint: '`text-align: center;` を指定します。',
    initialCss: '.target-box {\n  /* テキストを中央に寄せよう */\n}',
    correctCode: '.target-box {\n  text-align: center;\n}',
    targetStyle: { textAlign: 'center' },
    checkCondition: (css) => css.includes('text-align:center')
  },
  {
    id: 21,
    title: 'ステージ 21：行間の調整（line-height）',
    mission: '行間（line-height）を 1.6 に設定してください。',
    hint: '`line-height: 1.6;` を指定します。',
    initialCss: '.target-box {\n  /* 行間を調整しよう */\n}',
    correctCode: '.target-box {\n  line-height: 1.6;\n}',
    targetStyle: { lineHeight: 1.6 },
    checkCondition: (css) => css.includes('line-height:1.6')
  },
  {
    id: 22,
    title: 'ステージ 22：要素の不透明度（opacity）',
    mission: '要素の不透明度（opacity）を 0.75 に設定してください。',
    hint: '`opacity: 0.75;` を指定します。',
    initialCss: '.target-box {\n  background-color: #2563eb;\n  /* 透明度をつけよう */\n}',
    correctCode: '.target-box {\n  background-color: #2563eb;\n  opacity: 0.75;\n}',
    targetStyle: { backgroundColor: '#2563eb', opacity: 0.75 },
    checkCondition: (css) => css.includes('opacity:0.75')
  },
  {
    id: 23,
    title: 'ステージ 23：マウスカーソルの変更（pointer）',
    mission: '`cursor: pointer;` を指定してください。',
    hint: '`cursor: pointer;` を指定します。',
    initialCss: '.target-box {\n  /* カーソルを変更しよう */\n}',
    correctCode: '.target-box {\n  cursor: pointer;\n}',
    targetStyle: { cursor: 'pointer' },
    checkCondition: (css) => css.includes('cursor:pointer')
  },
  {
    id: 24,
    title: 'ステージ 24：滑らかなアニメーション（transition）',
    mission: '`transition: all 0.3s ease;` を指定してください。',
    hint: '`transition: all 0.3s ease;` を記述します。',
    initialCss: '.target-box {\n  background-color: #f59e0b;\n  /* トランジションを追加しよう */\n}',
    correctCode: '.target-box {\n  background-color: #f59e0b;\n  transition: all 0.3s ease;\n}',
    targetStyle: { backgroundColor: '#f59e0b', transition: 'all 0.3s ease' },
    checkCondition: (css) => css.includes('transition')
  },
  {
    id: 25,
    title: 'ステージ 25：最大幅の制限（max-width）',
    mission: '要素の最大幅（max-width）を 320px に制限してください。',
    hint: '`max-width: 320px;` を指定します。',
    initialCss: '.target-box {\n  background-color: #10b981;\n  /* 最大幅を制限しよう */\n}',
    correctCode: '.target-box {\n  background-color: #10b981;\n  max-width: 320px;\n}',
    targetStyle: { backgroundColor: '#10b981', maxWidth: '320px' },
    checkCondition: (css) => css.includes('max-width:320px')
  },
  {
    id: 26,
    title: 'ステージ 26：CSS Gridの基本',
    mission: '`display: grid;` を指定してグリッドレイアウトを有効にしてください。',
    hint: '`display: grid;` を記述します。',
    initialCss: '.target-box {\n  /* グリッドレイアウトにしよう */\n}',
    correctCode: '.target-box {\n  display: grid;\n}',
    targetStyle: { display: 'grid' },
    checkCondition: (css) => css.includes('display:grid')
  },
  {
    id: 27,
    title: 'ステージ 27：グリッドの列指定',
    mission: '`grid-template-columns: repeat(2, 1fr);` を指定してください。',
    hint: '`grid-template-columns: repeat(2, 1fr);` を記述します。',
    initialCss: '.target-box {\n  display: grid;\n  /* 2カラムの列を指定しよう */\n}',
    correctCode: '.target-box {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}',
    targetStyle: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' },
    checkCondition: (css) => css.includes('display:grid') && css.includes('grid-template-columns')
  },
  {
    id: 28,
    title: 'ステージ 28：上下左右のパディング個別指定',
    mission: '上下に 12px、左右に 24px のパディングを指定してください。',
    hint: '`padding: 12px 24px;` と指定します。',
    initialCss: '.target-box {\n  background-color: #0284c7;\n  /* パディングを個別に指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #0284c7;\n  padding: 12px 24px;\n}',
    targetStyle: { backgroundColor: '#0284c7', padding: '12px 24px' },
    checkCondition: (css) => css.includes('padding:12px24px')
  },
  {
    id: 29,
    title: 'ステージ 29：文字間隔（letter-spacing）',
    mission: '文字の間隔（letter-spacing）を 1.5px 広げてください。',
    hint: '`letter-spacing: 1.5px;` を指定します。',
    initialCss: '.target-box {\n  /* 文字間隔を広げよう */\n}',
    correctCode: '.target-box {\n  letter-spacing: 1.5px;\n}',
    targetStyle: { letterSpacing: '1.5px' },
    checkCondition: (css) => css.includes('letter-spacing:1.5px')
  },
  {
    id: 30,
    title: 'ステージ 30：テキスト下線',
    mission: '`text-decoration: underline;` を指定してテキストに下線を引いてください。',
    hint: '`text-decoration: underline;` を指定します。',
    initialCss: '.target-box {\n  /* 下線を引こう */\n}',
    correctCode: '.target-box {\n  text-decoration: underline;\n}',
    targetStyle: { textDecoration: 'underline' },
    checkCondition: (css) => css.includes('text-decoration:underline')
  },
  {
    id: 31,
    title: 'ステージ 31：大文字変換',
    mission: '`text-transform: uppercase;` を使ってすべて大文字にしてください。',
    hint: '`text-transform: uppercase;` を指定します。',
    initialCss: '.target-box {\n  /* 大文字に変換しよう */\n}',
    correctCode: '.target-box {\n  text-transform: uppercase;\n}',
    targetStyle: { textTransform: 'uppercase' },
    checkCondition: (css) => css.includes('text-transform:uppercase')
  },
  {
    id: 32,
    title: 'ステージ 32：アウトラインの削除',
    mission: '`outline: none;` を指定してください。',
    hint: '`outline: none;` を指定します。',
    initialCss: '.target-box {\n  /* アウトラインを消そう */\n}',
    correctCode: '.target-box {\n  outline: none;\n}',
    targetStyle: { outline: 'none' },
    checkCondition: (css) => css.includes('outline:none')
  },
  {
    id: 33,
    title: 'ステージ 33：ボックスサイジング',
    mission: '`box-sizing: border-box;` を指定してください。',
    hint: '`box-sizing: border-box;` を指定します。',
    initialCss: '.target-box {\n  /* ボックスサイジングを指定しよう */\n}',
    correctCode: '.target-box {\n  box-sizing: border-box;\n}',
    targetStyle: { boxSizing: 'border-box' },
    checkCondition: (css) => css.includes('box-sizing:border-box')
  },
  {
    id: 34,
    title: 'ステージ 34：オーバーフロー制御',
    mission: '`overflow: hidden;` を指定してください。',
    hint: '`overflow: hidden;` を指定します。',
    initialCss: '.target-box {\n  /* はみ出しを隠そう */\n}',
    correctCode: '.target-box {\n  overflow: hidden;\n}',
    targetStyle: { overflow: 'hidden' },
    checkCondition: (css) => css.includes('overflow:hidden')
  },
  {
    id: 35,
    title: 'ステージ 35：要素の非表示',
    mission: '`display: none;` を指定してください。',
    hint: '`display: none;` を指定します。',
    initialCss: '.target-box {\n  background-color: #ef4444;\n  /* 非表示にしよう */\n}',
    correctCode: '.target-box {\n  background-color: #ef4444;\n  display: none;\n}',
    targetStyle: { backgroundColor: '#ef4444', display: 'none' },
    checkCondition: (css) => css.includes('display:none')
  },
  {
    id: 36,
    title: 'ステージ 36：ブロック要素化',
    mission: '`display: block;` を指定してください。',
    hint: '`display: block;` を指定します。',
    initialCss: '.target-box {\n  /* ブロック要素にしよう */\n}',
    correctCode: '.target-box {\n  display: block;\n}',
    targetStyle: { display: 'block' },
    checkCondition: (css) => css.includes('display:block')
  },
  {
    id: 37,
    title: 'ステージ 37：インラインブロック化',
    mission: '`display: inline-block;` を指定してください。',
    hint: '`display: inline-block;` を指定します。',
    initialCss: '.target-box {\n  /* インラインブロックにしよう */\n}',
    correctCode: '.target-box {\n  display: inline-block;\n}',
    targetStyle: { display: 'inline-block' },
    checkCondition: (css) => css.includes('display:inline-block')
  },
  {
    id: 38,
    title: 'ステージ 38：最小幅の指定',
    mission: '最小幅（min-width）を 200px に指定してください。',
    hint: '`min-width: 200px;` を指定します。',
    initialCss: '.target-box {\n  background-color: #6366f1;\n  /* 最小幅を指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #6366f1;\n  min-width: 200px;\n}',
    targetStyle: { backgroundColor: '#6366f1', minWidth: '200px' },
    checkCondition: (css) => css.includes('min-width:200px')
  },
  {
    id: 39,
    title: 'ステージ 39：最小高さの指定',
    mission: '最小高さ（min-height）を 100px に指定してください。',
    hint: '`min-height: 100px;` を指定します。',
    initialCss: '.target-box {\n  background-color: #ec4899;\n  /* 最小高さを指定しよう */\n}',
    correctCode: '.target-box {\n  background-color: #ec4899;\n  min-height: 100px;\n}',
    targetStyle: { backgroundColor: '#ec4899', minHeight: '100px' },
    checkCondition: (css) => css.includes('min-height:100px')
  },
  {
    id: 40,
    title: 'ステージ 40：【最終試練】実務カードコンポーネントの構築',
    mission: 'フレックスボックスによる縦横中央揃え、グラデーション背景、角丸20px、太字、立体的な影をすべて組み合わせて実務レベルのカードを完成させよう！',
    hint: 'これまでの総集編です。複数のプロパティを組み合わせて記述します。',
    initialCss: '.target-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  /* 実務カードを完成させよう */\n}',
    correctCode: '.target-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: linear-gradient(135deg, #3b82f6, #8b5cf6);\n  border-radius: 20px;\n  font-weight: bold;\n  box-shadow: 0 10px 25px rgba(0,0,0,0.3);\n}',
    targetStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '20px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' },
    checkCondition: (css) => css.includes('display:flex') && css.includes('linear-gradient') && css.includes('border-radius:20px')
  }
];

export interface CssLabProps {
  isPreviewOnly?: boolean;
  isPreviewHidden?: boolean;
}

export default function CSSLab({ isPreviewOnly = false, isPreviewHidden = false }: CssLabProps) {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const stage = CSS_STAGES[currentStageIdx] || CSS_STAGES[0];

  const storageKey = `css_lab_stage_${stage.id}_code`;
  const [userCss, setUserCss] = useState<string>(() => {
    return localStorage.getItem(storageKey) || stage.initialCss;
  });

  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [showAnswerModal, setShowAnswerModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem(`css_lab_stage_${stage.id}_code`);
    const initial = saved || stage.initialCss;
    setUserCss(initial);
    setIsPassed(false);
    setShowHintModal(false);
    setShowAnswerModal(false);
  }, [currentStageIdx, stage]);

  // 💡 リアルタイム同期ロジック（ポーリング対応で別ウィンドウにも秒速反映）
  useEffect(() => {
    if (!isPreviewOnly) {
      localStorage.setItem(`css_lab_stage_${stage.id}_sync_code`, userCss);
    }
  }, [userCss, isPreviewOnly, stage.id]);

  useEffect(() => {
    if (isPreviewOnly) {
      const interval = setInterval(() => {
        const synced = localStorage.getItem(`css_lab_stage_${stage.id}_sync_code`);
        if (synced !== null && synced !== userCss) {
          setUserCss(synced);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPreviewOnly, stage.id, userCss]);

  // 💡 「コードを判定する」ボタンを押したときの処理
  const handleManualCheck = () => {
    const passed = stage.checkCondition(userCss.replace(/\s+/g, ''));
    if (passed) {
      setIsPassed(true);
      if (!isPreviewOnly) {
        setShowModal(true);
      }
    } else {
      setIsPassed(false);
      alert("❌ まだ条件を満たしていません。コードやヒントを確認してください。");
    }
  };

  const handleEditorChange = (val: string | undefined) => {
    setUserCss(val || '');
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, userCss);
    setSaveNotification("💾 セーブしました！");
    setTimeout(() => setSaveNotification(""), 2000);
  };

  const handleReset = () => {
    if (window.confirm("このステージのコードを初期状態に戻しますか？")) {
      localStorage.removeItem(storageKey);
      setUserCss(stage.initialCss);
      setIsPassed(false);
      setSaveNotification("🗑️ 初期化しました");
      setTimeout(() => setSaveNotification(""), 2000);
    }
  };

  const copyAnswerToClipboard = () => {
    navigator.clipboard.writeText(stage.correctCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // 🚀 ポップアップ（プレビュー専用）モードの場合
  if (isPreviewOnly) {
    return (
      <div className="flex flex-col h-full w-full bg-[#141414] text-white">
        <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-bold text-gray-400 flex justify-between items-center shrink-0 font-mono">
          <span className="flex items-center gap-1.5">🌐 LIVE PREVIEW MONITOR (CSS DOJO)</span>
          <span className="text-[9px] bg-emerald-600/30 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30 animate-pulse">
            リアルタイム同期中
          </span>
        </div>
        <div className="flex-1 p-6 bg-[#1a1a1a] flex items-center justify-center overflow-auto">
          <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300 w-full max-w-md h-80">
            <div className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 border-b border-slate-200">
              🖥️ あなたのプレビュー結果
            </div>
            <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
              <style>{`
                .target-box {
                  width: 220px;
                  height: 110px;
                  background-color: #3b82f6;
                  border-radius: 12px;
                  color: #fff;
                  font-weight: bold;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                ${userCss}
              `}</style>
              <div className="target-box">
                Your Element
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#1e1e1e] text-white font-sans overflow-hidden relative">
      
      {/* 🎉 クリアお祝いポップアップ */}
      {showModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl flex flex-col items-center text-center">
            <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/30 mb-4 text-emerald-400">
              <Sparkles size={48} className="animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">🎉 STAGE {stage.id} クリア！</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              素晴らしい！指定されたCSS要件を完璧に満たしました。
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-[#333] hover:bg-[#444] text-gray-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                確認する
              </button>
              <button 
                onClick={() => {
                  setShowModal(false);
                  if (currentStageIdx + 1 < CSS_STAGES.length) {
                    setCurrentStageIdx(prev => prev + 1);
                  } else {
                    alert("🏆 全40ステージ完全制覇おめでとうございます！CSSマスターです！");
                  }
                }}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl shadow-lg cursor-pointer"
              >
                次のステージへ ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💡 ヒント表示モーダル */}
      {showHintModal && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] border border-amber-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-3">
              <Lightbulb size={20} /> ステージ {stage.id} のヒント
            </div>
            <p className="text-sm text-gray-200 leading-relaxed bg-[#1e1e1e] p-4 rounded-xl border border-[#3c3c3c] mb-6 font-mono">
              {stage.hint}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 👁️ 正解コード確認・表示モーダル */}
      {showAnswerModal && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252526] border border-rose-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <EyeOff size={20} /> ステージ {stage.id} の模範解答
              </div>
              <button
                onClick={copyAnswerToClipboard}
                className="flex items-center gap-1 bg-[#333] hover:bg-[#444] text-gray-200 px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedCode ? 'コピー完了' : 'コードをコピー'}
              </button>
            </div>

            <p className="text-xs text-gray-400 mb-3">
              💡 解答を見て構造を理解したら、エディタにご自身のキーボードで入力して練習しましょう！
            </p>

            <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-xl p-4 mb-6 font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed select-all">
              {stage.correctCode}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowAnswerModal(false)}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 左カラム：ミッション＆ステージ選択 */}
      <div className="w-80 bg-[#252526] border-r border-[#3c3c3c] flex flex-col shrink-0 select-none">
        <div className="p-3 bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center justify-between text-xs font-bold text-indigo-400">
          <div className="flex items-center gap-2">
            <Layout size={16} />
            <span>CSS Dojo (全40問)</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={handleSave} className="p-1 hover:bg-[#333] text-gray-300 rounded cursor-pointer" title="セーブ">
              <Save size={14} />
            </button>
            <button onClick={handleReset} className="p-1 hover:bg-[#333] text-gray-300 rounded cursor-pointer" title="初期化">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {saveNotification && (
          <div className="bg-emerald-950/80 text-emerald-400 text-[11px] font-bold py-1 px-3 text-center border-b border-emerald-900 animate-pulse">
            {saveNotification}
          </div>
        )}

        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">クエスト選択 (1〜40)</span>
            <select
              value={currentStageIdx}
              onChange={(e) => setCurrentStageIdx(parseInt(e.target.value, 10))}
              className="w-full bg-[#1e1e1e] text-indigo-300 text-xs font-bold px-3 py-2 rounded border border-[#444] cursor-pointer outline-none"
            >
              {CSS_STAGES.map((s, idx) => (
                <option key={s.id} value={idx}>Stage {s.id}: {s.title}</option>
              ))}
            </select>
          </div>

          <div className="bg-indigo-950/40 border border-indigo-800/40 p-3 rounded-lg space-y-2">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5">
              <HelpCircle size={14} /> ミッション内容
            </div>
            <p className="text-gray-300 leading-relaxed">{stage.mission}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setShowHintModal(true)}
              className="py-2.5 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-700/50 text-amber-300 rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Lightbulb size={14} /> ヒント
            </button>
            <button
              onClick={() => setShowAnswerModal(true)}
              className="py-2.5 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <EyeOff size={14} /> 回答を見る
            </button>
          </div>

          <div className="border-t border-[#3c3c3c] pt-3 space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">判定ステータス</span>
            <button
              onClick={handleManualCheck}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs"
            >
              <CheckCircle2 size={15} /> コードを判定する
            </button>
            {isPassed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-400 p-3 rounded-lg flex items-center gap-2 font-bold animate-pulse">
                <CheckCircle2 size={18} /> Accepted (AC) - 合格！
              </div>
            ) : (
              <div className="bg-amber-950/40 border border-amber-800/60 text-amber-400 p-3 rounded-lg flex items-center gap-2 font-bold">
                ✍️ 未判定 / 要件未達
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 💻 中央カラム：CSSエディタ */}
      <div className={`flex flex-col h-full border-r border-[#3c3c3c] shrink-0 bg-[#252526] ${isPreviewHidden ? 'flex-1' : 'w-[420px]'}`}>
        <div className="bg-[#2d2d2d] border-b border-[#3c3c3c] px-4 py-2 text-xs font-bold text-amber-400 flex justify-between items-center">
          <span>✍️ CSS Editor (style.css)</span>
          <span className="text-[10px] text-gray-400 font-mono">Monaco Editor</span>
        </div>
        <div className="flex-1 relative w-full overflow-hidden">
          <Editor
            height="100%"
            language="css"
            theme="vs-dark"
            value={userCss}
            onChange={handleEditorChange}
            options={{
              fontSize: 12,
              minimap: { enabled: false },
              wordWrap: 'on',
              formatOnType: true,
              formatOnPaste: true,
            }}
          />
        </div>
      </div>

      {/* 🖼️ 右カラム：ターゲット vs ライブプレビュー（※ isPreviewHidden が true の時は消える！） */}
      {!isPreviewHidden && (
        <div className="flex-1 bg-[#141414] flex flex-col h-full overflow-hidden">
          <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] text-xs font-bold text-gray-400 flex justify-between items-center shrink-0">
            <span>👀 ターゲット (お手本) ＆ プレビュー比較</span>
            <span className="text-[10px] text-indigo-400 font-mono">Live Judge System</span>
          </div>

          <div className="flex-1 p-6 grid grid-rows-2 gap-4 bg-[#1a1a1a] overflow-auto">
            {/* お手本ビュー */}
            <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
              <div className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 border-b border-slate-200">
                ✨ ターゲット（目指す見た目）
              </div>
              <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
                <div 
                  style={{
                    width: '220px',
                    height: '110px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...stage.targetStyle
                  }}
                >
                  Target Element
                </div>
              </div>
            </div>

            {/* ユーザーのプレビュー */}
            <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
              <div className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 border-b border-slate-200">
                🖥️ あなたのプレビュー結果
              </div>
              <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
                <style>{`
                  .target-box {
                    width: 220px;
                    height: 110px;
                    background-color: #3b82f6;
                    border-radius: 12px;
                    color: #fff;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  ${userCss}
                `}</style>
                <div className="target-box">
                  Your Element
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}