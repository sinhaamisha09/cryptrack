"use client";

import { useEffect, useState } from 'react'; 
import { fetchCryptos } from '../services/cryptoService'; 
import { CryptoUIModel } from '../@types'; 
import { useLocalStorage } from './useLocalStorage';

export const useCryptos = () => {
  const [cryptos, setCryptos] = useState<CryptoUIModel[]>([]);
  const [sortColumn, setSortColumn] = useLocalStorage('sortColumn', 'name');
  const [sortOrder, setSortOrder] = useLocalStorage('sortOrder', 'asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCryptos(1000);
      setCryptos(data);
      setTotalItems(data.length);
    };

    fetchData();
  }, [currentPage]);

  const sortData = (data: CryptoUIModel[], column: string, order: string) => {
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

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedCryptos = sortData(cryptos, sortColumn, sortOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    cryptos:sortedCryptos,
    sortColumn,
    sortOrder,
    setSortColumn,
    setSortOrder,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setCryptos,
    sortData,
    handleSort,
    paginate,
    totalItems,
    setTotalItems,
  };

};
