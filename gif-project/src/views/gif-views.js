import { renderFavoriteStatusForGif } from '../events/favorites-events.js';
import { loadTrendingGifs } from '../requests/request-service.js';

export const toMiniGifView = (gif) => `
  <div class="gif-box">
    <img class="mini-gif-img" data-gif-id="${gif.id}" src="${gif.images.fixed_height_downsampled.url}" alt="${gif.title}">
  </div>
`;

export const toMoreMiniGifView = (gif) => `
  <img class="mini-gif-img" data-gif-id="${gif.id}" src="${gif.images.fixed_height_downsampled.url}" alt="${gif.title}">
`;

export const toDetailedGifView = (gif) => {
  return `
  <div class="detailed-gif">
    <div class="info-container">
      <p>Uploaded by:</p>
      <p><span><img class="user-avatar" src="${gif?.user?.avatar_url ||
        '../images/anonymous-user-icon-2.jpg'}" ></span> ${gif.user?.display_name || gif.username || 'anonymous user'}</p>
      <p>Uploaded on:</p>
      <p>${new Date(gif.import_datetime).toLocaleDateString()}</p>
    </div>
    <div class="gif-container">
      <div id="gif-header">
        <h3>${gif.title}</h3>
        <div class="favorite-status-container">
          ${renderFavoriteStatusForGif(gif.id)}
        </div>
      </div>
      <img src="${gif.images.original.url}">
    </div>
  </div>
  `;
};

export const toMoreTrendingGifsView = async (counter) => `
  <div>
  ${(await loadTrendingGifs(counter)).map(toMiniGifView).join('')}
  </div>
`;
