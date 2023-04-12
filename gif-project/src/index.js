import { HOME } from './common/constants.js';
import { loadPage, renderGifDetails } from './events/navigation-events.js';
import { renderSearchItems } from './events/search-events.js';
import { renderUploadItems } from './events/upload-events.js';

document.addEventListener('DOMContentLoaded', () => {
  // add global listener
  document.addEventListener('click', event => {

    // nav events
    if (event.target.classList.contains('nav-link')) {

      loadPage(event.target.getAttribute('data-page'));
    }

    if (event.target.classList.contains('submit')) {

      event.preventDefault();
      const fileInput = document.getElementById('file');
      const file = fileInput.files[0];
      renderUploadItems(file);
    }

    if(event.target.classList.contains('mini-gif-img')) {
      renderGifDetails(event.target.getAttribute('data-gif-id'));
    }
  });

  document.querySelector('input#search').addEventListener('input', event => {
    renderSearchItems(event.target.value);
  });


  loadPage(HOME);
});
