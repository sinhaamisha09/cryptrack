"use client";

import { useEffect, useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.includes(id)) {
        updatedFavorites = prevFavorites.filter((favId) => favId !== id);
      } else {
        updatedFavorites = [...prevFavorites, id];
      }
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return { favorites, handleFavorite };
};
