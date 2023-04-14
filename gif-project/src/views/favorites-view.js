import { toDetailedGifView } from './gif-views.js';

export const toFavoriteView = (favoriteGif, relatedGifs) => `
    <div class="favorite">
        <h1>Your favorite GIF:</h1>
    </div>
    ${toDetailedGifView(favoriteGif, relatedGifs)}
`;

export const toRandomGifView = (randomGif, relatedGifs) => `
  <div class="random">
      <h1>No 'fave' yet?</h1>
      <p>Browse GIFlamingo and click the heart icon next to your favorite GIF to make it yours!</p>
      <p>In the meantime, here's a random one you might like:</p>
  </div>
  ${toDetailedGifView(randomGif, relatedGifs)}
`;
