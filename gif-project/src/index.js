import { HOME } from './common/constants.js';
import { loadPage } from './events/navigation-events.js';
import { renderSearchItems } from './events/search-events.js';

document.addEventListener('DOMContentLoaded', () => {
  // add global listener
  document.addEventListener('click', event => {

    // nav events
    if (event.target.classList.contains('nav-link')) {

      loadPage(event.target.getAttribute('data-page'));
    }
  });

  document.querySelector('input#search').addEventListener('input', event => {
    renderSearchItems(event.target.value)
  })


  loadPage(HOME);

});
