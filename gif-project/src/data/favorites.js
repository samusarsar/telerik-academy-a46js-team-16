/**
 * Adds GIF ID as a favorite property to the Local Storage
 * @param {string} id - Gif's ID
 */
export const setFavorite = (id) => {
  window.localStorage.setItem('favorite', id);
};

/**
 * Clears favorite property of the Locale Storage
 */
export const removeFavorite = () => {
  window.localStorage.removeItem('favorite');
};

/**
 * @return {string}  Favorite GIF's ID
 */
export const getFavorite = () => window.localStorage.favorite;
