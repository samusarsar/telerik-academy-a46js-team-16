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

/**
 * Loads selected page.
 * @param {string} page data-page attribute
 * @return {null} null if, such data-page attribute doesn't exist
 */
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

/**
 * Loads trending GIFs and trending searches and renders Home page asynchronously.
 */
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

/**
 * Loads trending GIFs and renders Trending page asynchronously.
 */
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

/**
 * Loads favorite or random GIF and related GIFs. Renders Favorite page asynchronously.
 */
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
      const relatedGifs = await searchGifs(...searchTerm);
      document.querySelector(CONTAINER_SELECTOR).innerHTML = toRandomGifView(randomGif, relatedGifs);

      const msnry = applyMasonry(CONTENT_SELECTOR);

      applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateSearchGifsUrl, searchTerm);
    }
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};

/**
 * Loads uploaded GIFs and renders Profile page asynchronously.
 */
export const renderProfile = async () => {
  try {
    const uploads = await loadUploadedGifs();
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toProfileView(uploads);
    if (uploads.length) applyMasonry(UPLOADED_CONTENT);
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};

/** Renders About page */
export const renderAbout = () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = toAboutView();
};

/**
 * Loads GIF details and related GIFs. Renders detailed GIF view page asynchronously.
 * @param {string} gifId GIF's ID
 */
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

/**
 * Loads random GIF and related GIFs. Renders LuckyGif page asynchronously.
 */
export const renderLuckyGif = async () => {
  try {
    const luckyGif = await getRandomGif();
    const searchTerm = luckyGif.slug.split('-');
    const relatedGifs = await searchGifs(...searchTerm);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toDetailedGifView(luckyGif, relatedGifs);

    const msnry = applyMasonry(CONTENT_SELECTOR);

    applyInfiniteScroll(CONTENT_SELECTOR, msnry, generateSearchGifsUrl, searchTerm);
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};
