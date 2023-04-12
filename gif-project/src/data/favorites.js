const favorite = window.localStorage.favorite;

export const setFavorite = (id) => {
  window.localStorage.setItem('favorite', id);
};

export const removeFavorite = () => {
  window.localStorage.removeItem('favorite');
};

export const getFavorite = () => favorite;
