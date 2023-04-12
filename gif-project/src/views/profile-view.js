import { loadUploadedGifs } from '../requests/request-service.js';
import { toMiniGifView } from './gif-views.js';

export const toUploadView = () => `
    <div id="upload-box">
    <h2>Add new GIFs to your collection:</h2>
        <form name="upload-form" method="post">
            <input id="file" type="file" name="file" required />
            <input type="submit" value="Upload" class="submit"/>
        </form>
    </div>
`;

export const toUploadViewSuccess = () => `
    <div id="upload-box">
    <h2>Add new GIFs to your collection:</h2>
        <form name="upload-form" method="post">
            <label> Select file to upload:
                <input id="file" type="file" name="file" required />
            </label>
            <input type="submit" value="Upload" class="submit"/>
        </form>
        <p>GIF successfully uploaded!</p>
    </div>
`;

export const toUploadViewError = (error) => `
    <div id="upload-box">
    <h2>Add new GIFs to your collection:</h2>
        <form name="upload-form" method="post">
            <label> Select file to upload:
                <input id="file" type="file" name="file" required />
            </label>
            <input type="submit" value="Upload" class="submit"/>
        </form>
        <p>Uh-oh! That didn\'t work out...</p>
        <p>"${error}"</p>
    </div>
`;

export const toProfileView = async (variant, error = null) => {
  let uploadViewVariant;
  switch (variant) {

  case 1:
    uploadViewVariant = toUploadView();
    break;
  case 2:
    uploadViewVariant = toUploadViewSuccess();
    break;
  case 3:
    uploadViewVariant = toUploadViewError(error);
    break;
  }

  return `
    <div id="profile-box">
        <h1>Welcome to your GIFlamingo nest!</h1>
        ${uploadViewVariant}
        <div id="uploaded">
            <h2>Check out what's already in your nest:</h2>
            <div class="content">
            ${(await loadUploadedGifs()).map(toMiniGifView).join('') || '<p>You haven\'t uploaded any GIFs yet.</p><p>Click above to upload your first!</p>'}
            </div>
        </div>
    </div>
    `;
};
