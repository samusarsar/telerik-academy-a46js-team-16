import { ABOUT, CONTAINER_SELECTOR, HOME, PROFILE, TRENDING, FAVORITE, API_KEY } from '../common/constants.js';
import { getFavorite } from '../data/favorites.js';
import { getGif, getRandomGif, loadTrendingGifs } from '../requests/request-service.js';
import { toAboutView } from '../views/about-view.js';
import { toFavoriteView, toRandomGifView } from '../views/favorites-view.js';
import { toDetailedGifView, toMiniGifView, toMoreTrendingGifsView } from '../views/gif-views.js';
import { toHomeView } from '../views/home-view.js';
import { toErrorView } from '../views/interface-views.js';
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
  let counter = 0;

  try {
    const data = await loadTrendingGifs(counter++);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toTrendingView(data);

    const msnryContainer = document.querySelector('.trending>.content');
    const msnry = new Masonry(msnryContainer, {
      itemSelector: '.gif-box',
      columnWidth: 200,
      gutter: 10,
      fitWidth: true,
    });

    imagesLoaded(msnryContainer, () => {
      msnry.layout();
    });

    let infScroll = new InfiniteScroll(msnryContainer, {
      // options
      path: function() {
        return `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&bundle=messaging_non_clips&offset=${counter+=25}`;
      },
      // append: '.post',
      responseBody: 'json',
      outlayer: msnry,
      status: '.page-load-status',
      // prefill: true,
      scrollThreshold: 0,
    });

    const proxyElem = document.createElement('div');

    infScroll.on('load', function( body ) {
      const itemsHTML = body.data.map( toMiniGifView ).join('');
      proxyElem.innerHTML = itemsHTML;
      let items = proxyElem.querySelectorAll('.gif-box');
      imagesLoaded( items, function() {
        infScroll.appendItems( items );
        msnry.appended( items );
      });
    });

    infScroll.loadNextPage();

  } catch (error) {
    console.log(error);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};

export const renderFavorite = async () => {
  try {
    if (getFavorite()) {
      const favoriteGif = await getGif(getFavorite());
      document.querySelector(CONTAINER_SELECTOR).innerHTML = toFavoriteView(favoriteGif);
    } else {
      const randomGif = await getRandomGif();
      document.querySelector(CONTAINER_SELECTOR).innerHTML = toRandomGifView(randomGif);
    }
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
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
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};
