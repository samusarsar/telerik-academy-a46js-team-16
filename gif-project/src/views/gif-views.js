import { renderFavoriteStatusForGif } from '../events/favorites-events.js';

export const toMiniGifView = (gif) => `
  <div class="gif-box">
    <img class="mini-gif-img" data-gif-id="${gif.id}" src="${gif.images.fixed_height_downsampled.url}" alt="${gif.title}">
  </div>
`;

export const toMoreMiniGifView = (gif) => `
  <img class="mini-gif-img" data-gif-id="${gif.id}" src="${gif.images.fixed_height_downsampled.url}" alt="${gif.title}">
`;

export const toDetailedGifView = (gif, relatedGifs) => {
  return `
  <div class="detailed-gif">
    <div class="info-container">
      <p>Uploaded by:</p>
      <p class="details"><span><img class="user-avatar" src="${gif?.user?.avatar_url ||
        '../images/anonymous-user-icon-2.jpg'}" ></span> ${gif.user?.display_name || gif.username || 'anonymous user'}</p>
      <p>Uploaded on:</p>
      <p class="details">${new Date(gif.import_datetime).toLocaleDateString()}</p>
    </div>
    <div class="gif-container">
      <div id="gif-header">
        <h3>${gif.title || '[untitled_GIF]'}</h3>
        <div class="favorite-status-container">
          ${renderFavoriteStatusForGif(gif.id)}
        </div>
      </div>
      <img src="${gif.images.original.url}">
    </div>
  </div>
  ${toRelatedGifsView(relatedGifs)}
`;
};

export const toRelatedGifsView = (gifs) => {
  const relatedGifsGrid = gifs.length ? `
    <div class="content">
      ${gifs.map(toMiniGifView)}
    </div>
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
