import { toMiniGifView } from './gif-views.js';

export const toSearchView = (gifs, searchTerm) => {
  if (!searchTerm || !searchTerm.trim()) {
    return `<div id="gifs">
        <h1>Gifs found for"${searchTerm}"</h1>
        <div class="content">
            <p>Enter words to search GIFs</p>
        </div>
    </div>
`;
  } return `<div id="gifs">
    <h1>Gifs found for"${searchTerm}"</h1>
    <div class="content">
        ${gifs.map(toMiniGifView).join('\n') || `<p>No GIFs found</p>`}
    </div>
</div>
`;
};
