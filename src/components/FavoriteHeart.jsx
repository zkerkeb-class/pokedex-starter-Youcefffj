import React from 'react';
import '../style/FavoriteHeart.css';

function FavoriteHeart({ isFavorite, onClick }) {
  return (
    <div className="heart-container" onClick={onClick}>
      {isFavorite ? (
        <span className="heart filled">❤️</span>
      ) : (
        <span className="heart">🤍</span>
      )}
    </div>
  );
}

export default FavoriteHeart; 