"use client"; 
 
import React from 'react';
import { CryptoUIModel } from '../@types'; 
import { formatNumber } from '../utils/formatNumber';

interface CryptoDetailProps {
  crypto: CryptoUIModel;
}

const CryptoDetail: React.FC<CryptoDetailProps> = ({ crypto }) => {
  return ( 
    <div className="p-6 shadow-lg rounded-lg">
      <div className="mb-6">
        <div className="text-5xl font-extrabold  mb-2">
          {crypto.symbol} {/* Club symbol */}
        </div>
        <div className="text-2xl font-semibold  ">
          {crypto.name} {/* Crypto name */}
        </div>
      </div>
      <div className="text-xl text-gray-800"> 
        <p className="mb-3">
          <span className="font-semibold text-gray-600">Crypto Ranking:</span> <span className="font-medium">{crypto.rank}</span>
        </p>
        <p className="mb-3">
          <span className="font-semibold text-gray-600">Price:</span> <span className="font-medium text-green-600">${crypto.priceUsd.toFixed(2)}</span>
        </p>
        <p className="mb-3">
          <span className="font-semibold text-gray-600">Market Cap:</span> <span className="font-medium text-blue-600">{`$ ${formatNumber(crypto.marketCapUsd)}`}</span>
        </p>
        <p className="mb-3">
          <span className="font-semibold text-gray-600">Change Percent (24hr):</span> <span className={`font-medium ${crypto.changePercent24Hr >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {crypto.changePercent24Hr.toFixed(2)}%
          </span>
        </p>
        <p>
          <a
            href={crypto.explorer}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            View on Explorer
          </a>
        </p>
      </div>
    </div>
  );
};

export default CryptoDetail;

