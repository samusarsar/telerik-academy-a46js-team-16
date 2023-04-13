import { renderFavoriteStatusForGif } from '../events/favorites-events.js';
import { loadTrendingGifs } from '../requests/request-service.js';

export const toMiniGifView = (gif) => `
  <div class="gif-box">
    <img class="mini-gif-img" data-gif-id="${gif.id}" src="${gif.images.fixed_height_downsampled.url}" alt="${gif.title}">
  </div>
`;

export const toDetailedGifView = (gif) => {
  return `
  <div class="info-container">
    <p>Uploaded by: <span><img src="${gif?.user?.avatar_url || '../images/anonymous-user-icon-2.jpg'}" ></span> ${gif.user?.display_name || gif.username || 'anonymous user'}</p>
    <p>Uploaded on: ${new Date(gif.import_datetime).toLocaleDateString()}</p>
  </div>
  <div class="gif-container">
    <h3>${gif.title}</h3>
    <img src="${gif.images.original.url}">
  </div>
  <div class="favorite-status-container">
    ${renderFavoriteStatusForGif(gif.id)}
  </div>
  `;
};

export const toMoreTrendingGifsView = async (counter) => `
  <div>
  ${(await loadTrendingGifs(counter)).map(toMiniGifView).join('')}
  </div>
`;
