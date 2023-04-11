import { HOME } from './common/constants.js';
import { loadPage } from './events/navigation-events.js';

document.addEventListener('DOMContentLoaded', () => {
  // add global listener
  document.addEventListener('click', event => {
    if (event.target.classList.contains('nav-link')) {

      loadPage(event.target.getAttribute('data-page'));
    }
  });


  loadPage(HOME);

});
