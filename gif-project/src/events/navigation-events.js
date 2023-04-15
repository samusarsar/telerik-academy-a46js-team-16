import { ABOUT, CONTAINER_SELECTOR, HOME, PROFILE, TRENDING, FAVORITE, API_KEY, CONTENT_SELECTOR } from '../common/constants.js';
import { getFavorite } from '../data/favorites.js';
import { getGif, getRandomGif, loadTrendingGifs, searchGifs } from '../requests/request-service.js';
import { generateSearchGifsUrl, generateTrendingGifsUrl } from '../requests/url-generators.js';
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
  try {
    const data = await loadTrendingGifs();
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toTrendingView(data);

    const content = document.querySelector(CONTENT_SELECTOR);
    const msnry = new Masonry(content, {
      itemSelector: '.gif-box',
      columnWidth: 200,
      gutter: 10,
      fitWidth: true,
    });

    imagesLoaded(content, () => {
      msnry.layout();
    });

    const infScroll = new InfiniteScroll(content, {
      path: function() {
        return generateTrendingGifsUrl(this.loadCount+1);
      },
      responseBody: 'json',
      outlayer: msnry,
      status: '.page-load-status',
      scrollThreshold: 250,
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
  try {
    if (getFavorite()) {
      const favoriteGif = await getGif(getFavorite());
      const searchTerm = favoriteGif.slug.split('-');
      const relatedGifs = await searchGifs(...searchTerm);
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
          return generateSearchGifsUrl(searchTerm, this.loadCount+1);
        },
        responseBody: 'json',
        outlayer: msnry,
        status: '.page-load-status',
        scrollThreshold: 250,
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
      const searchTerm = randomGif.slug.split('-');
      const relatedGifs = await searchGifs(...searchTerm);
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
          return generateSearchGifsUrl(searchTerm, this.loadCount+1);
        },
        responseBody: 'json',
        outlayer: msnry,
        status: '.page-load-status',
        scrollThreshold: 250,
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
  try {
    const gif = await getGif(gifId);
    const searchTerm = gif.slug.split('-');
    const relatedGifs = await searchGifs(...searchTerm);
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
        return generateSearchGifsUrl(searchTerm, this.loadCount+1);
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
