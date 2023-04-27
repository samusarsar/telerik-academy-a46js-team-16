import { CONTAINER_SELECTOR, SEARCH_CONTENT } from '../common/constants.js';
import { searchGifs } from '../requests/request-service.js';
import { generateSearchGifsUrl } from '../requests/url-generators.js';
import { toErrorView } from '../views/interface-views.js';
import { toSearchView } from '../views/search-view.js';
import { applyInfiniteScroll, applyMasonry, setActiveNav } from './helpers.js';

/**
 * @param {string} searchTerm Search term
 * Loads searched GIFs and renders Search page asynchronously.
 */
export const renderSearchItems = async (searchTerm) => {
  try {
    setActiveNav();
    const gifs = await searchGifs(searchTerm);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toSearchView(gifs, searchTerm);

    const msnry = applyMasonry(SEARCH_CONTENT);

    applyInfiniteScroll(SEARCH_CONTENT, msnry, generateSearchGifsUrl, searchTerm);

  } catch (error) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toErrorView();
  }
};
