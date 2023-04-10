import { getCategories, getMoviesGeneralInfo, getMovieById, getCategory, searchMovies } from '../data/movies.js';

export const loadCategories = () => {
  const categories = getCategories();
  return categories;
};

export const loadCategory = (id = null) => {
  const category = getCategory(id);

  return category;
}

export const loadMovies = (categoryId = null) => {
  const movies = getMoviesGeneralInfo(categoryId);

  return movies;
};

export const loadSingleMovie = (id) => {
  const movie =  getMovieById(id);

  return movie;
};

export const loadSearchMovies = (searchTerm = '') => {
  const movies = searchMovies(searchTerm);
  
  return movies;
};
