import { API_KEY } from '../common/constants.js';
// eslint-disable-next-line max-len
import { generateGetGifUrl, generateGetRandomGifUrl, generateLoadUploadedGifsUrl, generateSearchGifsUrl, generateTrendingGifsUrl, generateTrendingSearchesUrl, generateUploadGifUrl } from './url-generators.js';

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

export const searchGifs = async (searchTerm) => {
  const url = generateSearchGifsUrl(0, searchTerm);
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(JSON.parse(await data.text()).meta.description);
  }

  const dataJson = await data.json();

  return dataJson.data;
};

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
 * @param {string} gifId GIF ID
 * @return
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

export const getRandomGif = async () => {
  const url = generateGetRandomGifUrl();
  const data = await fetch(url);
  const dataJson = await data.json();

  if (!data.ok) {
    throw new Error(dataJson.meta.msg);
  }

  return dataJson.data;
};

export const getTrendingSearches = async () => {
  const url = generateTrendingSearchesUrl();
  const data = await fetch(url);
  const dataJson = await data.json();

  if (!data.ok) {
    throw new Error(dataJson.meta.msg);
  }

  return dataJson.data.slice(0, 15);
};
