import { ABOUT, CONTAINER_SELECTOR, HOME, PROFILE, TRENDING, FAVORITE, CONTENT_SELECTOR, TRENDING_HOME, TERMS_HOME, UPLOADED_CONTENT } from '../common/constants.js';
import { getFavorite } from '../data/favorites.js';
import { getGif, getRandomGif, getTrendingSearches, loadTrendingGifs, loadUploadedGifs, searchGifs } from '../requests/request-service.js';
import { generateSearchGifsUrl, generateTrendingGifsUrl } from '../requests/url-generators.js';
import { toAboutView } from '../views/about-view.js';
import { toFavoriteView, toRandomGifView } from '../views/favorites-view.js';
import { toDetailedGifView } from '../views/gif-views.js';
import { toHomeView } from '../views/home-view.js';
import { toErrorView } from '../views/interface-views.js';
import { toProfileView } from '../views/profile-view.js';
import { toTrendingView } from '../views/trending-view.js';
import { applyFlickity, applyInfiniteScroll, applyMasonry, setActiveNav } from './helpers.js';

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

export const renderHome = async () => {
  try {
    const data = await loadTrendingGifs();
    const terms = await getTrendingSearches();
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toHomeView(data, terms);

    applyFlickity(TRENDING_HOME);
    applyFlickity(TERMS_HOME);
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};

export const renderTrending = async () => {
  try {
    const data = await loadTrendingGifs();
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toTrendingView(data);

    const msnry = applyMasonry(CONTENT_SELECTOR);

    applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateTrendingGifsUrl);

  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};

export const renderFavorite = async () => {
  try {
    if (getFavorite()) {
      const favoriteGif = await getGif(getFavorite());
      const searchTerm = favoriteGif.slug.split('-');
      const relatedGifs = await searchGifs(...searchTerm);
      document.querySelector(CONTAINER_SELECTOR).innerHTML = toFavoriteView(favoriteGif, relatedGifs);

      const msnry = applyMasonry(CONTENT_SELECTOR);

      applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateSearchGifsUrl, searchTerm);

    } else {

      const randomGif = await getRandomGif();
      const searchTerm = randomGif.slug.split('-');
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
  try {
    const uploads = await loadUploadedGifs();
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toProfileView(uploads);
    if (uploads.length) applyMasonry(UPLOADED_CONTENT);
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};

export const renderAbout = () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = toAboutView();
};

export const renderGifDetails = async (gifId) => {
  try {
    const gif = await getGif(gifId);
    const searchTerm = gif.slug.split('-');
    const relatedGifs = await searchGifs(...searchTerm);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toDetailedGifView(gif, relatedGifs);

    const msnry = applyMasonry(CONTENT_SELECTOR);

    applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateSearchGifsUrl, searchTerm);

  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};

export const renderLuckyGif = async () => {
  try {
    const luckyGif = await getRandomGif();
    const searchTerm = luckyGif.slug.split('-').slice(0, -1);
    const relatedGifs = await searchGifs(...searchTerm);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toDetailedGifView(luckyGif, relatedGifs);

    const msnry = applyMasonry(CONTENT_SELECTOR);

    applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateSearchGifsUrl, searchTerm);
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};
