import { toMiniGifView } from './gif-views.js';

export const toSearchView = (gifs, searchTerm) => `
    <div id="gifs">
        <h1>Gifs found for"${searchTerm}"</h1>
        <div class="content">
            ${(searchTerm || searchTerm.trim()) ? toSuccessfulSearchView(gifs) : toNotSuccessfulSearchView()}
        </div>
    </div>
`;

const toSuccessfulSearchView = (gifs) => gifs.map(toMiniGifView).join('\n') || `<p>No GIFs found</p>`;

const toNotSuccessfulSearchView = () => `<p>Enter words to search GIFs</p>`;

