import { HOME } from './common/constants.js';
import { toggleFavoriteStatus } from './events/favorites-events.js';
import { q } from './events/helpers.js';
import { loadPage, renderCategory, renderMovieDetails } from './events/navigation-events.js';
import { renderSearchItems } from './events/search-events.js';


document.addEventListener('DOMContentLoaded', () => {

  // add global listener
  document.addEventListener('click', event => {

    // nav events
    if (event.target.classList.contains('nav-link')) {

      loadPage(event.target.getAttribute('data-page'));
    }

    // show category events
    if (event.target.classList.contains('category-view')) {
      renderCategory(+event.target.getAttribute('category'));
    }

    // show movie events
    if (event.target.classList.contains('movie-details')) {
      renderMovieDetails(+event.target.getAttribute('details'));
    }

    // toggle favorite event
    if (event.target.classList.contains('favorite')) {
      toggleFavoriteStatus(+event.target.getAttribute('data-movie-id'));
    }

  });

  // search events
  q('input#search').addEventListener('input', event => {
    renderSearchItems(event.target.value);
  });

  loadPage(HOME);

});