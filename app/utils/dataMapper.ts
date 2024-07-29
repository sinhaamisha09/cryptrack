import { CryptoAPIModel } from "../@types/apiModel";
import { CryptoUIModel } from "../@types/uiModel";

export const transformToUICrypto = (apiData: CryptoAPIModel): CryptoUIModel => ({
    id: apiData.id,
    rank: parseInt(apiData.rank, 10),
    symbol: apiData.symbol,
    name: apiData.name,
    supply: parseFloat(apiData.supply),
    maxSupply: apiData.maxSupply ? parseFloat(apiData.maxSupply) : null,
    marketCapUsd: parseFloat(apiData.marketCapUsd),
    volumeUsd24Hr: parseFloat(apiData.volumeUsd24Hr),
    priceUsd: parseFloat(apiData.priceUsd),
    changePercent24Hr: parseFloat(apiData.changePercent24Hr),
    vwap24Hr: parseFloat(apiData.vwap24Hr),
    explorer: apiData.explorer
  });