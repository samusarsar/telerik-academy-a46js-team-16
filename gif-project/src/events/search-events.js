import { API_KEY, CONTAINER_SELECTOR } from '../common/constants.js';
import { searchGifs } from '../requests/request-service.js';
import { toMiniGifView } from '../views/gif-views.js';
import { toErrorView } from '../views/interface-views.js';
import { toSearchView } from '../views/search-view.js';
import { setActiveNav } from './helpers.js';

export const renderSearchItems = async (searchTerm) => {
  let counter = 0;

  try {
    setActiveNav();
    const gifs = await searchGifs(searchTerm);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toSearchView(gifs, searchTerm);

    const msnryContainer = document.querySelector('#gifs>.content');

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
        return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=20&offset=${counter+=20}`;
      },
      responseBody: 'json',
      outlayer: msnry,
      status: '.page-load-status',
      history: false,
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
