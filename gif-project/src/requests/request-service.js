import { apiUrl } from '../common/constants.js';

export const loadTrendingGifs = async () => {
  const url = `https://api.giphy.com/v1/gifs/trending${apiUrl}&limit=25&bundle=messaging_non_clips`;
  const data = await fetch(url);
  const dataJson = await data.json();
  const res = dataJson.data;
  // console.log(res);
  return res;
};

// console.log(await loadTrendingGifs());
