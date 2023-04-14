import { getFavorite } from '../data/favorites.js';
import { getGif, getRandomGif } from '../requests/request-service.js';
import { toDetailedGifView } from './gif-views.js';

export const toFavoriteView = (favoriteGif) =>  `
    <div id="favorite">
        <h1>Your favorite GIF:</h1>
    </div>
    ${toDetailedGifView(favoriteGif)}
`;


export const toRandomGifView = (randomGif) => `
  <div id="favorite">
      <h1>No 'fave' yet?</h1>
      <p>Browse GIFlamingo and click the heart icon next to your favorite GIF to make it yours!</p>
      <p>In the meantime, here's a random one you might like:</p>
  </div>
  ${toDetailedGifView(randomGif)}
`
