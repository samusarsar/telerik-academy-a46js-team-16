import { API_KEY } from '../common/constants.js';

/**
 * Generates URL for Trending Endpoint
 * @param {number} offset starting position of the results
 * @return {string} URL
 */
export const generateTrendingGifsUrl = (offset = 0) => `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&bundle=messaging_non_clips&offset=${offset*25}`;
/**
 * Generates URL for Upload Endpoint
 * @return {string} URL
 */
export const generateUploadGifUrl = () => `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`;

/**
 * Generates URL for Search Endpoint
 * @param {number} offset starting position of the results
 * @param {string} searchTerm search term
 * @return {string} URL
 */
export const generateSearchGifsUrl = (offset = 0, searchTerm) => `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=20&offset=${offset*20}`;

/**
 * Generates URL for Get GIFs by ID Endpoint
 * @param {string} ids
 * @return {string} URL
 */
export const generateCachedGifsUrl = (ids) => `https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${ids}`;

/**
 * Generates URL for Get GIF by ID Endpoint
 * @param {string} gifId GIF's ID
 * @return {string} URL
 */
export const generateGetGifUrl = (gifId) => `https://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`;

/**
 * Generates URL for Random Endpoint
 * @return {string} URL
 */
export const generateGetRandomGifUrl = () => `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

/**
 * Generates URL for Trending Endpoint
 * @return {string} URL
 */
export const generateTrendingSearchesUrl = () => `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`;
