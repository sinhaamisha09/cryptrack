"use client";

import { selector } from 'recoil';
import { cryptosState, sortColumnState, sortOrderState } from './atoms';
import { CryptoUIModel } from '../@types';
import { sortData } from '../utils';

export const sortedCryptosState = selector<CryptoUIModel[]>({
  key: 'sortedCryptosState',
  get: ({ get }) => {
    const cryptos = get(cryptosState);
    const sortColumn = get(sortColumnState);
    const sortOrder = get(sortOrderState);
    return sortData(cryptos, sortColumn, sortOrder);
  },
});
