import { ABOUT, CONTAINER_SELECTOR, HOME, PROFILE, TRENDING, FAVORITE, API_KEY } from '../common/constants.js';
import { getFavorite } from '../data/favorites.js';
import { getGif, getRandomGif, loadTrendingGifs, searchGifs } from '../requests/request-service.js';
import { toAboutView } from '../views/about-view.js';
import { toFavoriteView, toRandomGifView } from '../views/favorites-view.js';
import { toDetailedGifView, toMiniGifView } from '../views/gif-views.js';
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

    const infScroll = new InfiniteScroll(msnryContainer, {
      path: function() {
        return `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&bundle=messaging_non_clips&offset=${counter+=25}`;
      },
      responseBody: 'json',
      outlayer: msnry,
      status: '.page-load-status',
      scrollThreshold: 150,
    });

    const proxyElem = document.createElement('div');

    infScroll.on('load', function( body ) {
      const itemsHTML = body.data.map( toMiniGifView ).join('');
      proxyElem.innerHTML = itemsHTML;
      const items = proxyElem.querySelectorAll('.gif-box');
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
  let counter = 0;
  try {
    if (getFavorite()) {
      const favoriteGif = await getGif(getFavorite());
      const term = favoriteGif.slug.split('-');
      const relatedGifs = await searchGifs(...term);
      document.querySelector(CONTAINER_SELECTOR).innerHTML = toFavoriteView(favoriteGif, relatedGifs);

      const msnryContainer = document.querySelector('.content');
      const msnry = new Masonry(msnryContainer, {
        itemSelector: '.gif-box',
        columnWidth: 200,
        gutter: 10,
        fitWidth: true,
      });

      imagesLoaded(msnryContainer, () => {
        msnry.layout();
      });

      const infScroll = new InfiniteScroll(msnryContainer, {
        path: function() {
          return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term}&limit=20&offset=${counter+=20}`;
        },
        responseBody: 'json',
        outlayer: msnry,
        status: '.page-load-status',
        scrollThreshold: 150,
      });

      const proxyElem = document.createElement('div');

      infScroll.on('load', function( body ) {
        const itemsHTML = body.data.map( toMiniGifView ).join('');
        proxyElem.innerHTML = itemsHTML;
        const items = proxyElem.querySelectorAll('.gif-box');
        imagesLoaded( items, function() {
          infScroll.appendItems( items );
          msnry.appended( items );
        });
      });

      infScroll.loadNextPage();
    } else {
      const randomGif = await getRandomGif();
      const term = randomGif.slug.split('-');
      const relatedGifs = await searchGifs(...term);
      document.querySelector(CONTAINER_SELECTOR).innerHTML = toRandomGifView(randomGif, relatedGifs);

      const msnryContainer = document.querySelector('.content');
      const msnry = new Masonry(msnryContainer, {
        itemSelector: '.gif-box',
        columnWidth: 200,
        gutter: 10,
        fitWidth: true,
      });

      imagesLoaded(msnryContainer, () => {
        msnry.layout();
      });

      const infScroll = new InfiniteScroll(msnryContainer, {
        path: function() {
          return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term}&limit=20&offset=${counter+=20}`;
        },
        responseBody: 'json',
        outlayer: msnry,
        status: '.page-load-status',
        scrollThreshold: 150,
      });

      const proxyElem = document.createElement('div');

      infScroll.on('load', function( body ) {
        const itemsHTML = body.data.map( toMiniGifView ).join('');
        proxyElem.innerHTML = itemsHTML;
        const items = proxyElem.querySelectorAll('.gif-box');
        imagesLoaded( items, function() {
          infScroll.appendItems( items );
          msnry.appended( items );
        });
      });

      infScroll.loadNextPage();
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
  let counter = 0;
  try {
    const gif = await getGif(gifId);
    const term = gif.slug.split('-');
    const relatedGifs = await searchGifs(...term);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toDetailedGifView(gif, relatedGifs);

    const msnryContainer = document.querySelector('.content');
    const msnry = new Masonry(msnryContainer, {
      itemSelector: '.gif-box',
      columnWidth: 200,
      gutter: 10,
      fitWidth: true,
    });

    imagesLoaded(msnryContainer, () => {
      msnry.layout();
    });

    const infScroll = new InfiniteScroll(msnryContainer, {
      path: function() {
        return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term}&limit=20&offset=${counter+=20}`;
      },
      responseBody: 'json',
      outlayer: msnry,
      status: '.page-load-status',
      scrollThreshold: 150,
    });

    const proxyElem = document.createElement('div');

    infScroll.on('load', function( body ) {
      const itemsHTML = body.data.map( toMiniGifView ).join('');
      proxyElem.innerHTML = itemsHTML;
      const items = proxyElem.querySelectorAll('.gif-box');
      imagesLoaded( items, function() {
        infScroll.appendItems( items );
        msnry.appended( items );
      });
    });

    infScroll.loadNextPage();
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};
