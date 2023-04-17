import { renderProfile } from './navigation-events.js';

/**
 * Clears uploads property of the Locale Storage. Re-renders Profile page.
 */
export const clearUploadedItems = () => {
  window.localStorage.clear();
  renderProfile();
};
