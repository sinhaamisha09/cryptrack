"use client";

import React from 'react';
import HeartIcon from '../../public/icons/likeIcon.svg';
import HeartOutlineIcon from '../../public/icons/heartRed.svg';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onClick }) => (
  <button onClick={onClick} className="btn btn-ghost">
    {isFavorite ? (
      <HeartIcon className="w-5 h-5 text-red-500" />
    ) : (
      <HeartOutlineIcon className="w-5 h-5" />
    )}
  </button>
);

export default FavoriteButton;
