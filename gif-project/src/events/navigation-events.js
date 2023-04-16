import { ABOUT, CONTAINER_SELECTOR, HOME, PROFILE, TRENDING, FAVORITE, CONTENT_SELECTOR } from '../common/constants.js';
import { getFavorite } from '../data/favorites.js';
import { getGif, getRandomGif, loadTrendingGifs, searchGifs } from '../requests/request-service.js';
import { generateSearchGifsUrl, generateTrendingGifsUrl } from '../requests/url-generators.js';
import { toAboutView } from '../views/about-view.js';
import { toFavoriteView, toRandomGifView } from '../views/favorites-view.js';
import { toDetailedGifView } from '../views/gif-views.js';
import { toHomeView } from '../views/home-view.js';
import { toErrorView } from '../views/interface-views.js';
import { toProfileView } from '../views/profile-view.js';
import { toTrendingView } from '../views/trending-view.js';
import { applyInfiniteScroll, applyMasonry, setActiveNav } from './helpers.js';

export const loadPage = (page = '') => {

  switch (page) {

  case HOME:
    setActiveNav(HOME);
    return renderHome();
  case TRENDING:
    setActiveNav(TRENDING);
    return renderTrending();
  case FAVORITE:
    setActiveNav(FAVORITE);
    return renderFavorite();
  case PROFILE:
    setActiveNav(PROFILE);
    return renderProfile();
  case ABOUT:
    setActiveNav(ABOUT);
    return renderAbout();

  default: return null;
  }

};

export const renderHome = () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = toHomeView();
};

export const renderTrending = async () => {
  try {
    const data = await loadTrendingGifs();
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toTrendingView(data);

    const msnry = applyMasonry(CONTENT_SELECTOR);

    applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateTrendingGifsUrl);

  } catch (error) {
    console.log(error);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};

export const renderFavorite = async () => {
  try {
    if (getFavorite()) {
      const favoriteGif = await getGif(getFavorite());
      const searchTerm = favoriteGif.slug.split('-').slice(0, -1);
      const relatedGifs = await searchGifs(...searchTerm);
      document.querySelector(CONTAINER_SELECTOR).innerHTML = toFavoriteView(favoriteGif, relatedGifs);

      const msnry = applyMasonry(CONTENT_SELECTOR);

      applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateSearchGifsUrl, searchTerm);

    } else {

      const randomGif = await getRandomGif();
      const searchTerm = randomGif.slug.split('-').slice(0, -1);
      console.log(searchTerm);
      const relatedGifs = await searchGifs(...searchTerm);
      document.querySelector(CONTAINER_SELECTOR).innerHTML = toRandomGifView(randomGif, relatedGifs);

      const msnry = applyMasonry(CONTENT_SELECTOR);

      applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateSearchGifsUrl, searchTerm);
    }
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};

export const renderProfile = async () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = await toProfileView();
};

export const renderAbout = async () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = toAboutView();
};

export const renderGifDetails = async (gifId) => {
  try {
    const gif = await getGif(gifId);
    const searchTerm = gif.slug.split('-').slice(0, -1);
    const relatedGifs = await searchGifs(...searchTerm);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toDetailedGifView(gif, relatedGifs);

    const msnry = applyMasonry(CONTENT_SELECTOR);

    applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateSearchGifsUrl, searchTerm);

  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};
