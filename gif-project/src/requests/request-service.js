import { API_KEY } from '../common/constants.js';
// eslint-disable-next-line max-len
import { generateGetGifUrl, generateGetRandomGifUrl, generateLoadUploadedGifsUrl, generateSearchGifsUrl, generateTrendingGifsUrl, generateTrendingSearchesUrl, generateUploadGifUrl } from './url-generators.js';

/**
 * Makes GET request for trending GIFs from GIPHY API.
 * @param {number} offset starting position of the results
 * @return {GIF[]} for GIF object, see https://developers.giphy.com/docs/api/schema/#gif-object
 */
export const loadTrendingGifs = async (offset) => {
  const url = generateTrendingGifsUrl(offset);
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(JSON.parse(await data.text()).meta.description);
  }

  const dataJson = await data.json();
  const res = dataJson.data;
  return res;
};

/**
 * Makes POST request to GIPHY API to upload GIF.
 * @param {File} file Local file
 * @return {*} request response
 */
export const uploadGif = async (file) => {
  const url = generateUploadGifUrl();
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', API_KEY);

  const request = await fetch(url, {
    method: 'post',
    body: formData,
  });

  if (!request.ok) {
    throw new Error(JSON.parse(await request.text()).meta.description);
  }

  return request;
};

/**
 * Makes GET request for GIFs with a given search term from GIPHY API.
 * @param {*} searchTerm search term
 * @return {GIF[]} for GIF object, see https://developers.giphy.com/docs/api/schema/#gif-object
 */
export const searchGifs = async (searchTerm) => {
  const url = generateSearchGifsUrl(0, searchTerm);
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(JSON.parse(await data.text()).meta.description);
  }

  const dataJson = await data.json();

  return dataJson.data;
};

/**
 * Makes GET request for uploaded GIFs to GIPHY API.
 * @return {GIF[]} for GIF object, see https://developers.giphy.com/docs/api/schema/#gif-object
 */
export const loadUploadedGifs = async () => {
  const uploadCache = window.localStorage.getItem('uploads');
  if (uploadCache) {
    const ids = JSON.parse(uploadCache).join('%2C');
    const url = generateLoadUploadedGifsUrl(ids);
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error(JSON.parse(await data.text()).meta.description);
    }

    const dataJson = await data.json();

    return dataJson.data;
  } else {
    return [];
  }
};

/**
 * Makes GET request for a GIF's metadata to GIPHY API.
 * @param {string} gifId GIF ID
 * @return {GIF} for GIF object, see https://developers.giphy.com/docs/api/schema/#gif-object
 */
export const getGif = async (gifId) => {
  const url = generateGetGifUrl(gifId);
  const data = await fetch(url);
  const dataJson = await data.json();

  if (!data.ok) {
    throw new Error(dataJson.meta.msg);
  }

  return dataJson.data;
};

/**
 * Makes GET request for a random GIF to GIPHY API.
 * @return {GIF} for GIF object, see https://developers.giphy.com/docs/api/schema/#gif-object
 */
export const getRandomGif = async () => {
  const url = generateGetRandomGifUrl();
  const data = await fetch(url);
  const dataJson = await data.json();

  if (!data.ok) {
    throw new Error(dataJson.meta.msg);
  }

  return dataJson.data;
};

/**
 * Makes GET request for the most popular trending search terms to GIPHY API.
 * @return {String[]}
 */
export const getTrendingSearches = async () => {
  const url = generateTrendingSearchesUrl();
  const data = await fetch(url);
  const dataJson = await data.json();

  if (!data.ok) {
    throw new Error(dataJson.meta.msg);
  }

  return dataJson.data.slice(0, 15);
};
