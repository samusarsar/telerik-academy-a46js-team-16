// eslint-disable-next-line max-len
import { BACK, CONTAINER_FAVORITE, CONTAINER_RANDOM, CONTAINER_SELECTOR, DATA_GIF_ID, DATA_PAGE, EMPTY_NEST, FAV_BUBBLE, FAV_STATUS, FILE_ID, GIFS, HOME, LUCKY, MINI_GIF_IMG, NAV_LINK, PROFILE, SEARCH_BAR, SEARCH_TERM, SUBMIT, TRENDING, UPLOAD_INPUT, UPLOAD_LABEL, VIEW_TRENDING } from './common/constants.js';
import { getOriginPage, setOriginPage } from './data/navigation.js';
import { toggleFavoriteStatus } from './events/favorites-events.js';
import { loadPage, renderFavorite, renderGifDetails, renderLuckyGif } from './events/navigation-events.js';
import { clearUploadedItems } from './events/profile-events.js';
import { renderSearchItems } from './events/search-events.js';
import { renderUploadItems, showFileName } from './events/upload-events.js';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', event => {

    if (event.target.classList.contains(NAV_LINK)) {

      loadPage(event.target.getAttribute(DATA_PAGE));
    }

    if (event.target.classList.contains(VIEW_TRENDING)) {

      loadPage(event.target.getAttribute(DATA_PAGE));
    }

    if (!(event.target === document.querySelector(SEARCH_BAR))) {
      if (document.querySelector(SEARCH_BAR).value) {
        document.querySelector(SEARCH_BAR).value = '';
      }
    }

    if (event.target.classList.contains(SEARCH_TERM)) {
      const term = event.target.textContent.trim();

      document.querySelector(SEARCH_BAR).value = term;
      renderSearchItems(term);
    }

    if (event.target.classList.contains(LUCKY)) {
      setOriginPage(HOME);

      renderLuckyGif();
    }

    if (event.target.classList.contains(FAV_BUBBLE)) {
      const origin = document.querySelector(CONTAINER_SELECTOR).firstElementChild.getAttribute('id');

      if (origin === GIFS) {
        const term = document.querySelector(CONTAINER_SELECTOR).firstElementChild.firstElementChild.textContent.split(`"`)[1];
        setOriginPage(origin, term);
      } else if (origin === HOME || origin === TRENDING || origin === PROFILE) {
        setOriginPage(origin);
      }

      loadPage(event.target.getAttribute(DATA_PAGE));
    }

    if (event.target.classList.contains(UPLOAD_LABEL)) {
      const fileInput = document.querySelector(UPLOAD_INPUT);
      fileInput.addEventListener('change', showFileName);
    }

    if (event.target.classList.contains(SUBMIT)) {

      event.preventDefault();
      const fileInput = document.getElementById(FILE_ID);
      const file = fileInput.files[0];
      renderUploadItems(file);
    }

    if (event.target.classList.contains(EMPTY_NEST)) {
      clearUploadedItems();
    }

    if (event.target.classList.contains(MINI_GIF_IMG)) {
      const origin = document.querySelector(CONTAINER_SELECTOR).firstElementChild.getAttribute('id');

      if (origin === GIFS) {
        const term = document.querySelector(CONTAINER_SELECTOR).firstElementChild.firstElementChild.textContent.split(`"`)[1];
        setOriginPage(origin, term);
      } else if (origin === HOME || origin === TRENDING || origin === PROFILE) {
        setOriginPage(origin);
      }

      renderGifDetails(event.target.getAttribute(DATA_GIF_ID));
    }

    if (event.target.classList.contains(FAV_STATUS)) {
      toggleFavoriteStatus(event.target.getAttribute(DATA_GIF_ID));

      if (document.querySelector(CONTAINER_FAVORITE) || document.querySelector(CONTAINER_RANDOM)) {
        renderFavorite();
      }
    }

    if (event.target.classList.contains(BACK)) {
      const originPage = JSON.parse(getOriginPage());
      console.log(originPage);
      if (originPage.length === 1) {
        loadPage(originPage[0]);
      } else {
        renderSearchItems(originPage[1]);
      }
    }

  });

  document.querySelector(SEARCH_BAR).addEventListener('input', event => {
    renderSearchItems(event.target.value);
  });

  loadPage(HOME);
});
