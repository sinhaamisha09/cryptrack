import Link from "next/link";
import { CryptoUIModel } from "../@types"; 
import FavoriteButton from "../components/favoriteButton"; 
import { formatNumber } from "../utils/formatNumber";
 
export const fieldsConfig = {
  FAVORITE_RANK: {
    field: 'rank',
    label: 'Ranking',
    className: 'favorite-rank-column p-2',
    formatter: (crypto: CryptoUIModel, handleFavorite: (id: string) => void, favorites: string[]) => (
      <div className="flex items-center space-x-2">
        <FavoriteButton
          isFavorite={favorites.includes(crypto.id)}
          onClick={() => handleFavorite(crypto.id)}
        />
        <span>{crypto.rank}</span>
      </div>
    )
  }, 
  SYMBOL: {
    field: 'symbol',
    label: 'Crypto Coin',
    className: 'crypto-column p-2',
    formatter: (crypto: CryptoUIModel) => crypto.name ? (
      <div>
        <Link href={`/${crypto.id}`} className="font-bold">{crypto.symbol}</Link>
        <span className="block text-gray-600">{crypto.name}</span>
      </div>
    ) : '-'
  },
  PRICE_USD: {
    field: 'priceUsd',
    label: 'Price',
    className: 'crypto-column p-2',
    formatter: (crypto: CryptoUIModel) => crypto.priceUsd ? `$ ${formatNumber(Number((crypto.priceUsd).toFixed(2))) }` : '-'//Number(crypto.priceUsd).toFixed(2),
  },

  CHANGE_PERCENT_24HR: {
    field: 'changePercent24Hr',
    label: 'Change in 24hr (%)',
    className: 'crypto-column p-2',
    formatter: (crypto: CryptoUIModel) => {
      const change = crypto.changePercent24Hr;
      const isNegative = change < 0;
      const arrow = isNegative ? '↓' : '↑';
      const color = isNegative ? 'text-red-600' : 'text-green-600';
      return change ?  (
        <span className={`flex items-center ${color}`}>
          {arrow} {change.toFixed(2)}%
        </span>
      ): '-';
    }
  },
  MARKET_CAP_USD: {
    field: 'marketCapUsd',
    label: 'Market Cap',
    className: 'crypto-column p-2',
    formatter: (crypto: CryptoUIModel) => crypto.marketCapUsd ? `$  ${formatNumber((crypto.marketCapUsd))}`:  '-',
  }, 
};
