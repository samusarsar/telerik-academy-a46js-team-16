/**
 * Adds the previous page as a originPage property to the Local Storage.
 * @param {string} page - the previous page name
 * @param {string} value - the searchTerm of the previous page, if applicable
 */
export const setOriginPage = (page, value = null) => {
  if (value) {
    window.localStorage.setItem('originPage', JSON.stringify([page, value]));
  } else {
    window.localStorage.setItem('originPage', JSON.stringify([page]));
  }
};

/**
 * @return {array} An array containing the previous page name and value property, if applicable.
 */
export const getOriginPage = () => window.localStorage.originPage.split(',');
