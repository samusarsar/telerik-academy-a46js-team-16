import { getFavorite } from '../data/favorites.js';
import { getGif, getRandomGif } from '../requests/request-service.js';
import { toDetailedGifView } from './gif-views.js';

export const toFavoriteView = async () => `
    <div id="favorite">
        <h1>Your favorite GIF:</h1>
        ${toDetailedGifView(await getGif(getFavorite()))}
    </div>
`;

export const toRandomGifView = async () => `
    <div id="favorite">
        <h1>No 'fave' yet?</h1>
        <p>Browse GIFlamingo and click the heart icon next to your favorite GIF to make it yours!</p>
        <p>In the meantime, here's a random on you might like:</p>
        ${toDetailedGifView(await getRandomGif())}
    </div>
`;
