import { ABOUT, CONTAINER_SELECTOR, HOME, PROFILE, TRENDING, FAVORITE } from '../common/constants.js';
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
    document.querySelector(CONTAINER_SELECTOR).innerHTML = await toTrendingView(data);
    const msnryContainer = document.querySelector('.trending>.content');
    imagesLoaded(msnryContainer, () => {
      const msnry = new Masonry(msnryContainer, {
        itemSelector: '.gif-box',
        columnWidth: 200,
        gutter: 10,
        fitWidth: true,
      });
    });

    // infinite scroll
    const trending = document.querySelector('.trending');
    document.addEventListener('scroll', async () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

      if ((scrollTop + clientHeight) > (scrollHeight)) {
        const div = document.createElement('div');
        div.className = 'content';
        div.innerHTML = (await loadTrendingGifs(counter++)).map(toMiniGifView).join('');
        trending.appendChild(div);
        imagesLoaded(div, () => {
          const msnry = new Masonry(div, {
            itemSelector: '.gif-box',
            columnWidth: 200,
            gutter: 10,
            fitWidth: true,
          });
        });
      }
    });
  } catch (error) {
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
  // const msnryContainer = document.querySelector('#uploaded>.content');
  // imagesLoaded(msnryContainer, () => {
  //   const msnry = new Masonry(msnryContainer, {
  //     itemSelector: '.gif-box',
  //     columnWidth: 200,
  //     gutter: 10,
  //     fitWidth: true,
  //   });
  // })
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

export const renderMoreGifs = async (counter) => {
  const moreGifs = await toMoreTrendingGifsView(counter);
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', `${counter}`);
  document.querySelector('.content').appendChild(newDiv);
  document.querySelector(`#${counter}`).innerHTML = moreGifs;
};
