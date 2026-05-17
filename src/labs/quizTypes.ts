export interface Question {
  id: number;
  category: 'IT資格(過去問)' | 'WEBデザイン' | 'JavaScript' | 'WordPress' | '視覚レイアウト';
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}