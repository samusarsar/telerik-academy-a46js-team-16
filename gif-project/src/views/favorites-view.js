import { toDetailedGifView } from './gif-views.js';

/**
 * Generates HTML for favorite GIF view
 * @param {GIF} favoriteGif favorite GIF
 * @param {GIF[]} relatedGifs array of related GIFs
 * @return {string} HTML for favorite GIF view
 */
export const toFavoriteView = (favoriteGif, relatedGifs) => `
    <div class="favorite">
        <h1>Your favorite GIF:</h1>
    </div>
    ${toDetailedGifView(favoriteGif, relatedGifs)}
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
      <p>Browse GIFlamingo and click the heart icon next to your favorite GIF to make it yours!</p>
      <p>In the meantime, here's a random one you might like:</p>
  </div>
  ${toDetailedGifView(randomGif, relatedGifs)}
`;
