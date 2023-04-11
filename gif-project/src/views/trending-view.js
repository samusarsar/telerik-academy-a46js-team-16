import { loadTrendingGifs } from '../requests/request-service.js';
import { toMiniGifView } from './gif-views.js';

export const toTrendingView = async () => `
<div id="trending">
  <h1>Trending GIFs</h1>
  <div class="content">
    ${(await loadTrendingGifs()).map(toMiniGifView).join('')}
  </div>
</div>
`;
