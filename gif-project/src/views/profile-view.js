import { loadUploadedGifs } from '../requests/request-service.js';
import { toMiniGifView } from './gif-views.js';

export const toUploadView = () => `
    <div id="upload-box">
        <form name="upload-form" method="post">
            <label> Select GIF to upload:
                <input id="file" type="file" name="file" required />
            </label>
            <input type="submit" value="Upload" class="submit"/>
        </form>
    </div>
`;

export const toUploadViewSuccess = () => `
    <div id="upload-box">
        <form name="upload-form" method="post">
            <label> Select GIF to upload:
                <input id="file" type="file" name="file" required />
            </label>
            <input type="submit" value="Upload" class="submit"/>
        </form>
        <p>GIF successfully uploaded!</p>
    </div>
`;

export const toUploadViewError = (error) => `
    <div id="upload-box">
        <form name="upload-form" method="post">
            <label> Select GIF to upload:
                <input id="file" type="file" name="file" required />
            </label>
            <input type="submit" value="Upload" class="submit"/>
        </form>
        <p>There was a problem uploading the GIF: ${error}</p>
    </div>
`;

export const toProfileView = async () => `
    <div id="profile-box">
        <h1>Welcome to your GIFlamingo nest, ${window.localStorage.getItem('username')}!</h1>
        <div id="uploader">
            <h2>Add new GIFs to your collection:</h2>
            <a class="to-upload">Upload GIF</a>
        </div>
        <div id="uploaded">
            <h2>Check out what's already in your nest:</h2>
            <div class="content">
            ${(await loadUploadedGifs()).map(toMiniGifView).join('') || '<p>You haven\'t uploaded any GIFs yet.</p><p>Click above to upload your first!</p>'}
            </div>
        </div>
    </div>
`;
