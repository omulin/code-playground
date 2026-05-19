import { traceDataBeginner } from './traceDataBeginner';
import { traceDataMiddle } from './traceDataMiddle';
import { traceDataAdvanced } from './traceDataAdvanced';

// 👑 TraceLab.tsx がエラーを出さないように、ここで型を再エクスポートしておきます！
export type { TracePage, TraceStage } from './traceTypes';

// 👑 3つのファイルのデータを合体させて、1つの巨大な30問配列として吐き出します！
export const TRACE_STAGES = [
  ...traceDataBeginner,
  ...traceDataMiddle,
  ...traceDataAdvanced
];