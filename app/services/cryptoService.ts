import { transformToUICrypto } from '../utils/dataMapper';
import { CryptoAPIModel, CryptoUIModel, Data, HistoricalAPIData, HistoricalUIData } from '../@types';

export const fetchCryptos = async (pageCount:number): Promise<CryptoUIModel[]> => {
  const response = await fetch(`https://api.coincap.io/v2/assets?limit=${pageCount}`);
  const data: Data = await response.json();
  return data.data.map(transformToUICrypto);
};

export const fetchCryptoDetails = async (id: string): Promise<CryptoUIModel> => {
  const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
  const data: { data: CryptoAPIModel } = await response.json();
  return transformToUICrypto(data.data)
};


export const fetchCryptoHistory = async (
  id: string,
  interval: string = 'd1',
  start?: number,
  end?: number
): Promise<HistoricalUIData[]> => {
  let url = `https://api.coincap.io/v2/assets/${id}/history?interval=${interval}`;
  if (start && end) {
    url += `&start=${start}&end=${end}`;
  }

  const response = await fetch(url);
  const data: { data: HistoricalUIData[] } = await response.json();
  return data.data.map((item) => ({
    date: new Date(item.date),
    priceUsd: Number(item.priceUsd),
  }));
};
