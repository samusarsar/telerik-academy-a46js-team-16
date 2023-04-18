import { renderFavoriteStatus } from '../events/favorites-events.js';
import { loaderEllipse } from './interface-views.js';

/**
 * Generates HTML for mini GIF view
 * @param {GIF} gif GIF object
 * @return {string} HTML
 */
export const toMiniGifView = (gif) => `
  <div class="gif-box">
    <img class="mini-gif-img" data-gif-id="${gif.id}" src="${gif.images.fixed_height_downsampled.url}" alt="${gif.title}">
  </div>
`;

/**
 * Generates HTML for detailed GIF view
 * @param {GIF} gif GIF object
 * @param {GIF[]} relatedGifs array of related GIFs
 * @return {string} HTML
 */
export const toDetailedGifView = (gif, relatedGifs) => {
  return `
  <div id="detailed-gif" data-gif-id="${gif.id}">
  <a href=# class="back">Go Back</a>
    <div class="gif-container">
      <div id="gif-header">
        <h3>${gif.title || '[untitled_GIF]'}</h3>
        <div class="favorite-status-container">
          ${renderFavoriteStatus(gif.id)}
        </div>
      </div>
      <img src="${gif.images.original.url}">
    </div>
    <div class="info-container">
    <p>Uploaded by:</p>
    <p class="details"><span><img class="user-avatar" src="${gif?.user?.avatar_url ||
      '../images/anonymous-user-icon-2.jpg'}" ></span> ${gif.user?.display_name || gif.username || 'anonymous user'}</p>
    <p>Uploaded on:</p>
    <p class="details">${new Date(gif.import_datetime).toLocaleDateString()}</p>
  </div>
  </div>
  ${toRelatedGifsView(relatedGifs)}
`;
};

/**
 * Generates HTML for related GIFs view
 * @param {GIF[]} gifs array of GIFs
 * @return {string} HTML
 */
export const toRelatedGifsView = (gifs) => {
  const relatedGifsGrid = gifs.length ? `
    <div class="content">
      ${gifs.map(toMiniGifView)}
    </div>
    ${loaderEllipse()}
    ` : `
    <div id="not-found">
      <p>Hmmm... Looks like there isn\'t any!</p>
    </div>
    `;

  const full = `
    <div id="related-gifs">
      <h2>Check out more GIFs like this:</h2>
      ${relatedGifsGrid}
    </div>
    `;

  return full;
};
