import { renderUploads } from '../events/upload-events.js';

const toUploadView = () => `
    <div id="upload-box">
    <h2>Add new GIFs to your collection:</h2>
        <input id="file" type="file" name="file" required />
        <input type="submit" value="Upload" class="submit"/>
        <div id="upload-result"></div>
    </div>
`;

const toMyUploadsView = async () => `
    <div id="uploaded">
        <h2>Check out what's already in your nest:</h2>
        <div class="content">
        ${await renderUploads() || '<p>You haven\'t uploaded any GIFs yet.</p><p>Click above to upload your first!</p>'}
        </div>
        <div><a href=# class="empty-nest">Empty my nest</a></div>
    </div>
`;

export const toProfileView = async () => `
  <div id="profile">
    <h1>Welcome to your GIFlamingo nest!</h1>
    ${toUploadView()}
    ${await toMyUploadsView()}
  </div>
`;

export const toUploadViewSuccess = async () => {
  return `<p>GIF successfully uploaded!</p>`;
};

export const toUploadViewError = (error) => `<p>Uh-oh! That didn\'t work out...   ${error}</p>`;
