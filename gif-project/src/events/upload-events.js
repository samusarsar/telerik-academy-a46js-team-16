import { CONTAINER_SELECTOR } from '../common/constants.js';
import { uploadGif } from '../requests/request-service.js';
import { toProfileView, toUploadViewError, toUploadViewSuccess } from '../views/profile-view.js';

export const renderUploadItems = async (file) => {
  const response = await uploadGif(file);
  console.log(response);
  const resText = JSON.parse(await response.text());
  if (response.ok) {
    if (window.localStorage.getItem('uploads')) {
      const uploads = JSON.parse(window.localStorage.getItem('uploads'));
      uploads.push(resText.data.id);
      window.localStorage.setItem('uploads', JSON.stringify(uploads));
    } else {
      window.localStorage.setItem('uploads', JSON.stringify([resText.data.id]));
    }
    document.querySelector(CONTAINER_SELECTOR).innerHTML = await toProfileView(2);
  } else {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = await toProfileView(3, resText.meta.description);
  }
};
