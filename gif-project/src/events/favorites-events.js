import { getFavorite, removeFavorite, setFavorite } from '../data/favorites.js';

export const toggleFavoriteStatus = (id) => {
  const favorite = getFavorite();

  if (favorite === id) {
    removeFavorite();
  } else {
    setFavorite(id);
  }

  document.querySelector(`.favorite-status-container`).innerHTML = renderFavoriteStatusForGif(id);
};

export const renderFavoriteStatusForGif = (id) => {
  const favorite = getFavorite();

  if (favorite === id) {
    return `<img src="../../images/heart-full.png" class="favorite-status" data-gif-id="${id}">`;
  } else {
    return `<img src="../../images/heart-empty.png" class="favorite-status" data-gif-id="${id}">`;
  }
};


