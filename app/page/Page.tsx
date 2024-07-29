"use client";
 
import { useCryptos } from '../hooks/useCryptos';
import { useWebSocket } from '../hooks/useWebSocket'; 
import TableBody from '../components/tableBody';
import Pagination from '../components/pagination';
import TableHeader from '../components/tableHeader';  
import { useFavorites } from '../hooks/useFavorites';
import { fieldsConfig } from '../config/table.config';
import { useMemo, useState } from 'react'; 
import ThemeSwitcher from '../components/themeSwitcher';
 
const Page = () => {
  const {
    cryptos,
    sortColumn,
    sortOrder,
    currentPage,
    totalItems,
    itemsPerPage,
    setCryptos,
    paginate,
    handleSort,
  } = useCryptos();
  const { favorites, handleFavorite } = useFavorites(); 
  const cryptoList = cryptos.map(crypto => crypto.name.toLowerCase());
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  useWebSocket(cryptoList, setCryptos);
 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cryptos.slice(indexOfFirstItem, indexOfLastItem);

  const filteredData = useMemo(() => {
    const filtered = showOnlyFavorites
      ? cryptos.filter(crypto => favorites.includes(crypto.id))
      : cryptos;

    // Sort the filtered data based on the sortColumn and sortOrder
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });

    // Return paginated data
    return sorted.slice(indexOfFirstItem, indexOfLastItem);
  }, [showOnlyFavorites, cryptos, favorites, sortColumn, sortOrder, currentPage, itemsPerPage]);

  return (
    <> 
      <div className="text-left mb-8 pt-6">
        <h1 className="text-4xl font-bold">CryptoInsights Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2 mb-6">Unlock the power of cryptocurrency data with CryptoInsights. Track market trends, favorite your top coins, and stay updated with real-time changes.</p>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <button
            className={`btn border ${showOnlyFavorites ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white'} bg-transparent py-2 px-4 rounded-md`}
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          >
            {showOnlyFavorites ? 'Show All' : 'Show Favorites'}
          </button>
        </div> 
      </div>
      <table className="table w-full table-fixed">
        <TableHeader 
          fieldsConfig={fieldsConfig}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
        <TableBody
          fieldsConfig={fieldsConfig}
          data={filteredData}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      </table>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};

export default Page;
