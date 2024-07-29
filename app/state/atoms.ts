"use client";

import { atom } from 'recoil';
import { CryptoUIModel } from '../@types';

export const cryptosState = atom<CryptoUIModel[]>({
  key: 'cryptosState',
  default: [],
});

export const sortColumnState = atom<string>({
  key: 'sortColumnState',
  default: 'name',
});

export const sortOrderState = atom<string>({
  key: 'sortOrderState',
  default: 'asc',
});

export const favoritesState = atom<string[]>({
  key: 'favoritesState',
  default: [],
});

export const currentPageState = atom<number>({
  key: 'currentPageState',
  default: 1,
});
