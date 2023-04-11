import { CONTAINER_SELECTOR } from '../common/constants.js';
import { uploadGif } from '../requests/request-service.js';
import { toUploadViewError, toUploadViewSuccess } from '../views/profile-view.js';

export const renderUploadItems = async (file) => {
  const response = await uploadGif(file);
  console.log(response);
  if (response.ok) {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = await toUploadViewSuccess();
  } else {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = await toUploadViewError(JSON.parse(await response.text()).meta.description);
  }
};
