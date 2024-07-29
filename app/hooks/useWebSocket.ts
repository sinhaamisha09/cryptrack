"use client";

import { useEffect } from 'react';
import { CryptoUIModel } from '../@types/uiModel';  
import { initializeWebSocket } from '../services/websocketService';

type UpdateCryptosCallback = (updatedPrices: Record<string, string>) => void;


export const useWebSocket = (
  cryptoList: string[], 
  setCryptos: React.Dispatch<React.SetStateAction<CryptoUIModel[]>>
) => {
  useEffect(() => {
    const updateCryptos: UpdateCryptosCallback = (updatedPrices) => {
      setCryptos((prevCryptos) =>
        prevCryptos.map((crypto) =>
          updatedPrices[crypto.id] ? { ...crypto, priceUsd: parseFloat(updatedPrices[crypto.id]) } : crypto
        )
      );
    };

    // Initialize WebSocket with the current list of cryptocurrencies
    const cleanupWebSocket = initializeWebSocket(cryptoList, updateCryptos);

    // Clean up WebSocket connection on component unmount
    return () => {
      cleanupWebSocket();
    };
  }, [cryptoList, setCryptos]);
};
