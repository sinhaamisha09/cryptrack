import { CryptoUIModel } from '../@types';

export const sortData = (data: CryptoUIModel[], column: string, order: string) => {
  return [...data].sort((a, b) => {
    const aValue = a[column as keyof CryptoUIModel];
    const bValue = b[column as keyof CryptoUIModel];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const aNumber = parseFloat(aValue);
      const bNumber = parseFloat(bValue);
      if (!isNaN(aNumber) && !isNaN(bNumber)) {
        return order === 'asc' ? aNumber - bNumber : bNumber - aNumber;
      }
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });
};
