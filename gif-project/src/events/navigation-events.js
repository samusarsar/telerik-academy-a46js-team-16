import { CONTAINER_SELECTOR, HOME, TRENDING } from '../common/constants.js';
import { toHomeView } from '../views/home-view.js';
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


// renderTrending();
