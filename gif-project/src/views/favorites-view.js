import { toDetailedGifView, toMiniGifView } from './gif-views.js';

/**
 * Generates HTML for favorite GIFs grid view
 * @param {array} favoriteGifs array of favorite GIFs
 * @return {string} HTML for favorite GIFs grid view
 */
export const toFavoriteView = (favoriteGifs) => `
    <div id="favorites">
        <h1>Your favorite GIFs:</h1>
        <div class="content">
        ${favoriteGifs.map(toMiniGifView).join('')}
        </div>
    </div>
    <div><a href=# class="clear-favorites">Clear Favorites</a></div>
`;

/**
 * Generates HTML for random GIF view
 * @param {GIF} randomGif random GIF
 * @param {GIF[]} relatedGifs array of related GIFs
 * @return {string} HTML for random GIF view
 */
export const toRandomGifView = (randomGif, relatedGifs) => `
  <div class="random">
      <h1>No 'fave' yet?</h1>
      <p>You don't have any favorite GIFs yet... Here's a random one you might like!</p>
  </div>
  ${toDetailedGifView(randomGif, relatedGifs)}
`;
