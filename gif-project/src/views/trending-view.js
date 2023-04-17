import { toMiniGifView } from './gif-views.js';
import { loaderEllipse } from './interface-views.js';

/**
 * Generates HTML for Trending page
 * @param {GIF[]} data array of trending GIFs
 * @return {string} HTML
 */
export const toTrendingView = (data) => `
  <div class="trending">
    <h1>Trending GIFs</h1>
    <div class="content">
      ${data.map(toMiniGifView).join('')}
    </div>
  </div>
  ${loaderEllipse()}
`;
