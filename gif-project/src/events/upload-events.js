import { uploadGif } from '../requests/request-service.js';
import { renderUploads, toUploadViewError, toUploadViewSuccess } from '../views/profile-view.js';

export const renderUploadItems = async (file) => {

  //TODO Loading

  try {
    const response = await uploadGif(file);

    if (!response.ok) {
      document.querySelector("#upload-result").innerHTML = toUploadViewError(await response.text());
      return;
    }

    const resText = JSON.parse(await response.text());
    if (window.localStorage.getItem('uploads')) {
      const uploads = JSON.parse(window.localStorage.getItem('uploads'));
      uploads.push(resText.data.id);
      window.localStorage.setItem('uploads', JSON.stringify(uploads));
    } else {
      window.localStorage.setItem('uploads', JSON.stringify([resText.data.id]));
    }

    document.querySelector('#upload-result').innerHTML = await toUploadViewSuccess();
    document.querySelector("#uploaded .content").innerHTML = await renderUploads();

  } catch (error) {
    console.log(error)  //TODO
  }

};
