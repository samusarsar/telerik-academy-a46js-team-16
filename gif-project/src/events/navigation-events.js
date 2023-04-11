import { CONTAINER_SELECTOR } from '../common/constants.js';
import { toTrendingView } from '../views/trending-view.js';


// // // public API
// export const loadPage = (page = '') => {


//   switch (page) {

//   case TRENDING:
//     setActiveNav(TRENDING);
//     return renderTrending();

//     /* if the app supports error logging, use default to log mapping errors */
//   default: return null;
//   }

// };

export const renderTrending = async () => {
  document.querySelector(CONTAINER_SELECTOR).innerHTML = await toTrendingView();
};

renderTrending();
