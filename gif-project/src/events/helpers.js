/* eslint-disable no-undef */
import { GIF_BOX } from '../common/constants.js';
import { toMiniGifView } from '../views/gif-views.js';

/**
 * Adds 'active' class to navigation a element for a given page. Removes 'active' class from navigation a elements for the rest pages.
 * @param {string} page Page's data-page attribute
 */
export const setActiveNav = (page = null) => {
  const navs = document.querySelectorAll('a.nav-link');

  Array
    .from(navs)
    .forEach(element => element
      .getAttribute('data-page') === page ?
      element.classList.add('active') :
      element.classList.remove('active'),
    );
};

/**
 * Applies grid layout to the selected container using Masonry library
 * @param {string} container Container selector
 * @return {Masonry} Instance of Masonry class
 */
export const applyMasonry = (container) => {

  const content = document.querySelector(container);
  const msnry = new Masonry(content, {
    initLayout: false,
    itemSelector: GIF_BOX,
    columnWidth: 200,
    gutter: 10,
    fitWidth: true,
  });

  imagesLoaded(content, () => {
    msnry.layout();
  });

  return msnry;
};

/**
 * Adds infinite scroll feature to the selected container using Infinite Scroll library
 * @param {string} container Container selector
 * @param {Masonry} msnry Instance of Masonry class
 * @param {function} urlGeneratorFunction Function, that generates URL for the next page
 * @param {string} searchTerm Search word, if applied
 */
export const applyInfiniteScroll = (container, msnry, urlGeneratorFunction, searchTerm) => {

  const content = document.querySelector(container);

  const infScroll = new InfiniteScroll(content, {
    path: function() {
      return urlGeneratorFunction(this.pageIndex, searchTerm);
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
    const items = proxyElem.querySelectorAll(GIF_BOX);
    imagesLoaded( items, function() {
      infScroll.appendItems( items );
      msnry.appended( items );
    });
  });

  infScroll.loadNextPage();
};

export const applyFlickity = (selector) => {
  const content = document.querySelector(selector);

  imagesLoaded(content, () => {
    const flkty = new Flickity( content, {
      contain: true,
      pageDots: false,
      setGallerySize: false,
    });

    return flkty;
  });
};
