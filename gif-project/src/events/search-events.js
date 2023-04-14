import { CONTAINER_SELECTOR } from '../common/constants.js';
import { searchGifs } from '../requests/request-service.js';
import { toErrorView } from '../views/interface-views.js';
import { toSearchView } from '../views/search-view.js';
import { setActiveNav } from './helpers.js';

export const renderSearchItems = async (searchTerm) => {
  try {
    setActiveNav();
    const gifs = await searchGifs(searchTerm);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toSearchView(gifs, searchTerm);
    const msnryContainer = document.querySelector('#gifs>.content');
    imagesLoaded(msnryContainer, () => {
      const msnry = new Masonry(msnryContainer, {
        itemSelector: '.gif-box',
        columnWidth: 200,
        gutter: 10,
        fitWidth: true,
      });
    });
  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};
