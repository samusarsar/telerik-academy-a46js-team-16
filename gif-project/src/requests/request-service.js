import { API_KEY } from '../common/constants.js';

export const loadTrendingGifs = async (counter = 0) => {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&bundle=messaging_non_clips&offset=${counter}`;
  const data = await fetch(url);

  if (!data.ok) {
    throw new Error(JSON.parse(await data.text()).meta.description);
  }

  const dataJson = await data.json();
  const res = dataJson.data;
  return res;
};

export const uploadGif = async (file) => {
  const url = `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`;
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
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}`;
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
    const url = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${ids}`;
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
 * 
 * @param {string} gifId GIF ID
 * @returns 
 */
export const getGif = async (gifId) => {
  const url = `https://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`;
  const data = await fetch(url);
  const dataJson = await data.json();

  if (!data.ok) {
    throw new Error(dataJson.meta.msg);
  }

  return dataJson.data;
};

export const getRandomGif = async () => {
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
  const data = await fetch(url);
  const dataJson = await data.json();

  if (!data.ok) {
    throw new Error(dataJson.meta.msg);
  }

  return dataJson.data;
};
