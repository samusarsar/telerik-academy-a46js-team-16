import { toMiniGifView } from './gif-views.js';
import { loaderEllipse } from './interface-views.js';

/**
 * Generates HTML for Search page
 * @param {GIF[]} gifs array of GIF objects
 * @param {string} searchTerm search term
 * @return {string} HTML
 */
export const toSearchView = (gifs, searchTerm) => `
    <div id="gifs">
        <h1>Gifs found for "${searchTerm}"</h1>
        <div class="content">
            ${(searchTerm || searchTerm.trim()) ? toSuccessfulSearchView(gifs) : toNotSuccessfulSearchView()}
        </div>
    </div>
    ${loaderEllipse()}
`;

/**
 * Generates HTML for Successful search message
 * @param {GIF[]} gifs array of GIF objects
 * @return {string} HTML
 */
const toSuccessfulSearchView = (gifs) => gifs.map(toMiniGifView).join('\n') || `<p>No GIFs found</p>`;

/**
 * Generates HTML for Unsuccessful search message
 * @return {string} HTML
 */
const toNotSuccessfulSearchView = () => `<p>Enter words to search GIFs</p>`;
