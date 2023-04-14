import { CONTAINER_FAVORITE, CONTAINER_RANDOM, DATA_GIF_ID, DATA_PAGE, EMPTY_NEST, FAV_BUBBLE, FAV_STATUS, FILE, HOME, MINI_GIF_IMG, NAV_LINK, SEARCH_BAR, SUBMIT } from './common/constants.js';
import { toggleFavoriteStatus } from './events/favorites-events.js';
import { loadPage, renderFavorite, renderGifDetails } from './events/navigation-events.js';
import { clearUploadedItems } from './events/profile-events.js';
import { renderSearchItems } from './events/search-events.js';
import { renderUploadItems } from './events/upload-events.js';

document.addEventListener('DOMContentLoaded', () => {
  // add global listener
  document.addEventListener('click', event => {

    // nav events
    if (event.target.classList.contains(NAV_LINK)) {

      loadPage(event.target.getAttribute(DATA_PAGE));
    }

    if (event.target.classList.contains(FAV_BUBBLE)) {

      loadPage(event.target.getAttribute(DATA_PAGE));
    }

    if (event.target.classList.contains(SUBMIT)) {

      event.preventDefault();
      const fileInput = document.getElementById(FILE);
      const file = fileInput.files[0];
      renderUploadItems(file);
    }

    if (event.target.classList.contains(EMPTY_NEST)) {
      clearUploadedItems();
    }

    if (event.target.classList.contains(MINI_GIF_IMG)) {
      renderGifDetails(event.target.getAttribute(DATA_GIF_ID));
    }

    if (event.target.classList.contains(FAV_STATUS)) {
      toggleFavoriteStatus(event.target.getAttribute(DATA_GIF_ID));

      if (document.querySelector(CONTAINER_FAVORITE) || document.querySelector(CONTAINER_RANDOM)) {
        renderFavorite();
      }
    }
  });

  document.querySelector(SEARCH_BAR).addEventListener('input', event => {
    renderSearchItems(event.target.value);
  });

  loadPage(HOME);
});
