import { CLEAR_BUTTON, FILE_ID, FILE_NAME_ID, UPLOADED_CONTENT, UPLOAD_BOX, UPLOAD_RESULT } from '../common/constants.js';
import { loadUploadedGifs, uploadGif } from '../requests/request-service.js';
import { loaderEllipse } from '../views/interface-views.js';
import { toMyUploadsView, toUploadViewError, toUploadViewSuccess } from '../views/profile-view.js';
import { applyMasonry } from './helpers.js';

export const renderUploadItems = async (file) => {

  document.querySelector(UPLOAD_RESULT).innerHTML = loaderEllipse();

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

    const uploads = await loadUploadedGifs();
    document.querySelector(UPLOAD_RESULT).innerHTML = await toUploadViewSuccess();
    document.querySelector(UPLOADED_CONTENT).innerHTML = await toMyUploadsView(uploads);
    if (uploads.length > 0) applyMasonry(UPLOADED_CONTENT);
    clearFileInput();
  } catch (error) {
    document.querySelector(UPLOAD_RESULT).innerHTML = toUploadViewError(error.message);
  }
};

export const showFileName = () => {
  const fileInput = document.getElementById(FILE_ID);
  const filenameSpan = document.getElementById(FILE_NAME_ID);

  if (filenameSpan.textContent.length) {
    const clearButton = document.querySelector(CLEAR_BUTTON);
    filenameSpan.textContent = '';
    clearButton.remove();
    filenameSpan.style.display = 'none';
  }

  if (fileInput.files.length > 0) {
    const filename = fileInput.files[0].name;
    filenameSpan.textContent = filename;

    const clearButton = document.createElement('span');
    clearButton.classList.add('clear-button');
    clearButton.textContent = 'x';

    clearButton.addEventListener('click', () => {
      clearFileInput();
    });

    document.querySelector(UPLOAD_BOX)
      .insertBefore(clearButton, document.querySelector(UPLOAD_RESULT));

    clearButton.style.display = 'inline-block';
    filenameSpan.style.display = 'inline-block';
  } else {
    filenameSpan.textContent = '';
  }
};

const clearFileInput = () => {
  const fileInput = document.getElementById(FILE_ID);
  const filenameSpan = document.getElementById(FILE_NAME_ID);
  const clearButton = document.querySelector(CLEAR_BUTTON);

  fileInput.value= '';
  filenameSpan.textContent = '';
  clearButton.remove();
  filenameSpan.style.display = 'none';
};
