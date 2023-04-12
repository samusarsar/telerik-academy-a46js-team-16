import { renderProfile } from './navigation-events.js';

export const clearUploadedItems = () => {
  window.localStorage.clear();
  renderProfile();
};
