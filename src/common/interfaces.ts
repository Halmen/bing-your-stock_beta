export interface Ticker {
  displaySymbol: string;
  companyName?: string;
}

export interface StockCandle {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
}
