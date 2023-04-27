import { toMiniGifView } from './gif-views.js';

/**
 * Generates HTML for Home page
 * @param {GIF[]} data array of trending GIFs
 * @param {string[]} terms search terms
 * @return {string} HTML
 */
export const toHomeView = (data, terms) => `
<div id="home">
  <h1 id="logo"><span>GIF</span>lamingo</h1>
  <h2>Your one-stop-shop for the best GIFs out there!</h2>
  <div id="carousel-header">
    <h3>Trending:</h3>
    <a class="view-trending" data-page="trending">View all</a>
  </div>
  <div id="trending-home">
    ${data.map(toMiniGifView).join('')}
  </div>
  <div id="trending-terms-header">
    <h3>Popular Searches:</h3>
  </div>
  <div id="terms-home">
    ${terms.map(toPopularSearchesView).join('')}
  </div>
  <div id="intro-header">
    <h3>Things to do:</h3>
  </div>
  <div id="intro">
    <div>
    <h4>Wondering what to do on here?</h4>
    <p>We've got you covered for all your GIF needs!</p>
    <ul>
      <li>Check out the newest, trending GIFs</li>
      <li>Search any specific GIF title that comes to mind</li>
      <li>Choose your favorite GIF to express yourself</li>
      <li>Upload your very own GIFs</li>
      <li>Show off your GIFlamingo Profile with all of your uploads</li>
    </ul>
    </div>
    <div id="lucky-box">
      <h4>Feeling lucky?</h4>
      <a class="lucky">GIF-me!</a>
    </div>
  </div>
</div>
`;

/**
 * Generates HTML for Popular Searches carousel
 * @param {string[]} term search terms
 * @return {string} HTML
 */
const toPopularSearchesView = (term) => `
  <div class="search-term">
    <p>${term}</p>
  </div>
`;
