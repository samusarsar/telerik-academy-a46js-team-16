import { toMiniGifView } from './gif-views.js';

export const toTrendingView = async (data) => `
  <div class="trending">
    <h1>Trending GIFs</h1>
    <div class="content">
      ${data.map(toMiniGifView).join('')}
    </div>
  </div>
`;
