import { API_KEY } from '../common/constants.js';

export const loadTrendingGifs = async () => {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&bundle=messaging_non_clips`;
  const data = await fetch(url);
  const dataJson = await data.json();
  const res = dataJson.data;
  return res;
};

export const uploadGif = async (file) => {
  const url = `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`;
  const formData = new FormData();
  formData.append('file', file);

  const request = await fetch(url, {
    method: 'post',
    body: formData,
  });

  return request;
};

export const searchGifs = async (searchTerm) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}`;
  const data = await fetch(url);
  const dataJson = await data.json();

  return dataJson.data;
};
