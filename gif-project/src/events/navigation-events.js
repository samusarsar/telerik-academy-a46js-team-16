import { ABOUT, CONTAINER_SELECTOR, HOME, PROFILE, TRENDING, FAVORITE } from '../common/constants.js';
import { getFavorite } from '../data/favorites.js';
import { getGif } from '../requests/request-service.js';
import { toAboutView } from '../views/about-view.js';
import { toFavoriteView, toRandomGifView } from '../views/favorites-view.js';
import { toDetailedGifView, toMoreTrendingGifsView } from '../views/gif-views.js';
import { toHomeView } from '../views/home-view.js';
import { toProfileView } from '../views/profile-view.js';
import { toTrendingView } from '../views/trending-view.js';
import { setActiveNav } from './helpers.js';

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

    /* if the app supports error logging, use default to log mapping errors */
    default: return null;
  }

};

export const renderHome = () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = toHomeView();
};

export const renderTrending = async () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = await toTrendingView();
};

export const renderFavorite = async () => {
  getFavorite() ?
    document.querySelector(CONTAINER_SELECTOR).innerHTML = await toFavoriteView() :
    document.querySelector(CONTAINER_SELECTOR).innerHTML = await toRandomGifView();
};

export const renderProfile = async () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = await toProfileView();
};

export const renderAbout = async () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = await toAboutView();
};

export const renderGifDetails = async (gifId) => {

  try {
    const gif = await getGif(gifId);

    document.querySelector(CONTAINER_SELECTOR).innerHTML = toDetailedGifView(gif);
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = `<p>Can not load page, error: ${error.message}</p>`; //TODO
  }

};

export const renderMoreGifs = async (counter) => {
  const moreGifs = await toMoreTrendingGifsView(counter);
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', `${counter}`);
  document.querySelector('.content').appendChild(newDiv);
  document.querySelector(`#${counter}`).innerHTML = moreGifs;
};
