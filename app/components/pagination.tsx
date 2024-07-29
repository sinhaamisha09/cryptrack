"use client";

import React from 'react';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
 
  const getPageNumbersToShow = () => {
    const pagesToShow = [];

    if (totalPages <= 4) { 
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
 
    pagesToShow.push(1, 2);
 
    if (currentPage > 4) {
      pagesToShow.push('...');
    }
 
    if (currentPage > 2 && currentPage < totalPages - 1) {
      pagesToShow.push(currentPage - 1, currentPage, currentPage + 1);
    } else if (currentPage <= 2) {
      pagesToShow.push(3, 4);  
    }

    // Always show the last 2 pages
    if (currentPage < totalPages - 3) {
      pagesToShow.push('...');
    }
    pagesToShow.push(totalPages - 1, totalPages);

    return Array.from(new Set(pagesToShow));  
  };

  const pagesToShow = getPageNumbersToShow();

  return (
    <div className="mt-4 flex justify-center items-center space-x-2">
      <button 
        onClick={() => paginate(1)} 
        className={`px-3 py-1 text-lg ${currentPage === 1 ? 'text-gray-400' : 'text-gray-600'}`}
        disabled={currentPage === 1}
      >
        &laquo; 
      </button>
      <button 
        onClick={() => paginate(currentPage - 1)} 
        className={`px-3 py-1 text-lg ${currentPage === 1 ? 'text-gray-400' : 'text-gray-600'}`}
        disabled={currentPage === 1}
      >
        &lsaquo;  
      </button>
      {pagesToShow.map((number, index) => (
        number === '...' ? (
          <span key={index} className="px-3 py-1 text-lg text-gray-500">...</span>
        ) : (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-3 py-1 text-lg ${currentPage === number ? 'text-gray-800 font-bold' : 'text-gray-600'}`}
          >
            {number}
          </button>
        )
      ))}
      <button 
        onClick={() => paginate(currentPage + 1)} 
        className={`px-3 py-1 text-lg ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-600'}`}
        disabled={currentPage === totalPages}
      >
        &rsaquo; 
      </button>
      <button 
        onClick={() => paginate(totalPages)} 
        className={`px-3 py-1 text-lg ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-600'}`}
        disabled={currentPage === totalPages}
      >
        &raquo;  
      </button>
    </div>
  );
};

export default Pagination;
