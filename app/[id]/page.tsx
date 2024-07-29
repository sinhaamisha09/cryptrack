
'use client';

import React, { useState, useEffect } from 'react'; 
import { CryptoUIModel } from '../@types'; 
import CryptoDetail from '../components/cryptoDetailPage';
import CryptoChart from '../components/cryptoChart';
import { fetchCryptoDetails } from '../services/cryptoService';

const CryptoDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [crypto, setCrypto] = useState<CryptoUIModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cryptoData = await fetchCryptoDetails(id);
        setCrypto(cryptoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!crypto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 flex flex-col justify-center">
        <CryptoDetail crypto={crypto} />
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        <CryptoChart cryptoId={crypto.id} cryptoName={crypto.name} />
      </div>
    </div>
  );
};

export default CryptoDetailPage;
