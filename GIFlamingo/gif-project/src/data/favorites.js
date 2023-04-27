import { FAVORITES } from '../common/constants.js';

/**
 * Adds GIF ID to array of favorite GIFs' IDs to the Local Storage.
 * @param {string} id - GIF's ID
 */
export const setFavorite = (id) => {
  if (!window.localStorage.favorites || !JSON.parse(window.localStorage.favorites).length) {
    window.localStorage.favorites = JSON.stringify([id]);
  } else {
    const favorites = JSON.parse(window.localStorage.getItem(FAVORITES));
    favorites.push(id);
    window.localStorage.setItem(FAVORITES, JSON.stringify(favorites));
  };
};

/**
 * Deletes a GIF ID from favorites property of the Locale Storage.
 * @param {string} id - GIF's ID
 */
export const removeFavorite = (id) => {
  const favorites = JSON.parse(window.localStorage.favorites);
  favorites.splice(favorites.indexOf(id), 1);
  window.localStorage.setItem(FAVORITES, JSON.stringify(favorites));
};

/**
 * Deletes all GIF IDs from favorites property of the Locale Storage.
 */
export const removeAllFavorites = () => {
  window.localStorage.setItem(FAVORITES, JSON.stringify([]));
};

/**
 * @return {array} An array with all favorite GIFs' IDs.
 */
export const getFavorites = () => {
  if (window.localStorage.favorites) {
    return JSON.parse(window.localStorage.favorites);
  } else {
    return [];
  }
};
