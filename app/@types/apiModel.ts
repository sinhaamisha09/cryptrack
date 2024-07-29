
  export interface CryptoAPIModel {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string | null;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string;
  }
  export interface Data {
    data:CryptoAPIModel[];
    timestamp:number;
  }

export interface HistoricalAPIData {
  date: string;
  priceUsd: string;
}