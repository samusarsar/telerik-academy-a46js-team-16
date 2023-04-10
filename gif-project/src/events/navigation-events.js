import { CONTAINER_SELECTOR, HOME, CATEGORIES, FAVORITES, ABOUT } from '../common/constants.js';
import { getFavorites } from '../data/favorites.js';
import { loadCategories, loadCategory, loadMovies, loadSingleMovie } from '../requests/request-service.js';
import { toAboutView } from '../views/about-view.js';
import { toCategoriesView } from '../views/category-view.js';
import { toFavoritesView } from '../views/favorites-view.js';
import { toHomeView } from '../views/home-view.js';
import { toMoviesFromCategoryView, toSingleMovieView } from '../views/movie-views.js';
import { q, setActiveNav } from './helpers.js';


// public API
export const loadPage = (page = '') => {

  switch (page) {

    case HOME:
      setActiveNav(HOME);
      return renderHome();
    case CATEGORIES:
      setActiveNav(CATEGORIES);
      return renderCategories();
    case FAVORITES:
      setActiveNav(FAVORITES);
      return renderFavorites();
    case ABOUT:
      setActiveNav(ABOUT);
      return renderAbout();
      
    /* if the app supports error logging, use default to log mapping errors */
    default: return null;
  }

};

export const renderMovieDetails = (id = null) => {
  const movie = loadSingleMovie(id);
  q(CONTAINER_SELECTOR).innerHTML = toSingleMovieView(movie);
};

export const renderCategory = (categoryId = null) => {
  const category = loadCategory(categoryId);
  const movies = loadMovies(categoryId);
  q(CONTAINER_SELECTOR).innerHTML = toMoviesFromCategoryView(category, movies);
};

// private functions

const renderHome = () => {
  q(CONTAINER_SELECTOR).innerHTML = toHomeView();
};

const renderCategories = () => {
  const categories = loadCategories();
  q(CONTAINER_SELECTOR).innerHTML = toCategoriesView(categories);
};

const renderFavorites = () => {
  const favorites = getFavorites().filter(m => m).map(loadSingleMovie);
  q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(favorites);
};

const renderAbout = () => {
  q(CONTAINER_SELECTOR).innerHTML = toAboutView();
};
