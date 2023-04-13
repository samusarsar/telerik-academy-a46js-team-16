import { loadUploadedGifs } from '../requests/request-service.js';
import { toMiniGifView } from './gif-views.js';

const toUploadView = () => `
    <div id="upload-box">
    <h2>Add new GIFs to your collection:</h2>
        <form name="upload-form" method="post">
            <input id="file" type="file" name="file" required />
            <input type="submit" value="Upload" class="submit"/>
        </form>
        <div id="upload-result"></div>
    </div>
`;

const toMyUploadsView = async () => `
    <div id="uploaded">
        <h2>Check out what's already in your nest:</h2>
        <div class="content">
        ${await renderUploads() || '<p>You haven\'t uploaded any GIFs yet.</p><p>Click above to upload your first!</p>'}
        </div>
        <a href=# class="empty-nest">Empty my nest</a>
    </div>
`;

export const toProfileView = async () => {
    return toUploadView() + '<br>' + await toMyUploadsView();
};


export const toUploadViewSuccess = async () => {
    return  `<p>GIF successfully uploaded!</p>`
};

export const toUploadViewError = (error) => `<p>Uh-oh! That didn\'t work out...   ${error}</p>`;




export const renderUploads = async () => (await loadUploadedGifs()).map(toMiniGifView).join(''); //TODO