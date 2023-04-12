import { ABOUT, CONTAINER_SELECTOR, HOME, PROFILE, TRENDING } from '../common/constants.js';
import { getGif } from '../requests/request-service.js';
import { toAboutView } from '../views/about-view.js';
import { toDetailedGifView } from '../views/gif-views.js';
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

export const renderProfile = async () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = await toProfileView(1);
};

export const renderAbout = async () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = await toAboutView();
};

export const renderGifDetails = async (gifId) => {
  const gif = await getGif(gifId);

  document.querySelector(CONTAINER_SELECTOR).innerHTML = toDetailedGifView(gif);
}


// renderTrending();
