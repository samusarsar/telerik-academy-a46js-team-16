import { FAVORITE_STATUS_CONTAINER } from '../common/constants.js';
import { getFavorites, removeFavorite, setFavorite } from '../data/favorites.js';
/**
 * Toggles favorite status for a given GIF
 * @param {*} id GIF's ID
 */
export const toggleFavoriteStatus = (id) => {
  const favorite = getFavorites();

  if (favorite.includes(id)) {
    removeFavorite(id);
  } else {
    setFavorite(id);
  }

  document.querySelector(FAVORITE_STATUS_CONTAINER).innerHTML = renderFavoriteStatus(id);
};

/**
 * Renders favorite status image for a given GIF
 * @param {string} id GIF's ID
 * @return {string} HTML img element
 */
export const renderFavoriteStatus = (id) => {
  const favorite = getFavorites();

  if (favorite.includes(id)) {
    return `<img src="../../images/heart-full.png" class="favorite-status" data-gif-id="${id}">`;
  } else {
    return `<img src="../../images/heart-empty.png" class="favorite-status" data-gif-id="${id}">`;
  }
};
