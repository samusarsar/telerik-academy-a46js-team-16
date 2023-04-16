import { API_KEY } from '../common/constants.js';

export const generateTrendingGifsUrl = (offset = 0) => `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&bundle=messaging_non_clips&offset=${offset*25}`;

export const generateUploadGifUrl = () => `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`;

export const generateSearchGifsUrl = (offset = 0, searchTerm) => `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=20&offset=${offset*20}`;

export const generateLoadUploadedGifsUrl = (ids) => `https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${ids}`;

export const generateGetGifUrl = (gifId) => `https://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`;

export const generateGetRandomGifUrl = () => `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

export const generateTrendingSearchesUrl = () => `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`;
