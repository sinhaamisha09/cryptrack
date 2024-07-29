
import { CryptoUIModel } from '../@types';

type UpdateCryptosCallback = (updatedPrices: Record<string, string>) => void;

export const initializeWebSocket = (cryptoList: string[], updateCryptos: UpdateCryptosCallback) => {
  const assets = cryptoList.join(',');
  const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets}`);

  ws.onmessage = (event) => {
    const updatedPrices = JSON.parse(event.data);
    updateCryptos(updatedPrices);
  };

  return () => {
    ws.close();
  };
};
