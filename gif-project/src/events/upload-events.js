import { loadUploadedGifs, uploadGif } from '../requests/request-service.js';
import { toMiniGifView } from '../views/gif-views.js';
import { toErrorView, toLoadView } from '../views/interface-views.js';
import { toUploadViewError, toUploadViewSuccess } from '../views/profile-view.js';

export const renderUploadItems = async (file) => {

  document.querySelector('#upload-result').innerHTML = toLoadView();

  try {
    const response = await uploadGif(file);

    const resText = JSON.parse(await response.text());
    if (window.localStorage.getItem('uploads')) {
      const uploads = JSON.parse(window.localStorage.getItem('uploads'));
      uploads.push(resText.data.id);
      window.localStorage.setItem('uploads', JSON.stringify(uploads));
    } else {
      window.localStorage.setItem('uploads', JSON.stringify([resText.data.id]));
    }

    document.querySelector('#upload-result').innerHTML = await toUploadViewSuccess();
    document.querySelector('#uploaded .content').innerHTML = await renderUploads();

  } catch (error) {
    document.querySelector('#upload-result').innerHTML = toUploadViewError(error.message);
  }
};

export const renderUploads = async () => {
  try {
    return (await loadUploadedGifs()).map(toMiniGifView).join('');
  } catch (error) {
    return toErrorView();
  };
};