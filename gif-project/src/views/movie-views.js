import { renderFavoriteStatus } from '../events/favorites-events.js';

export const toMoviesFromCategoryView = (category, movies) => `
<div id="movies">
  <h1>${category.name} movies:</h1>
  <div class="content">
    ${movies.map(toMovieSimple).join('\n')}
  </div>
</div>
`;

export const toSingleMovieView = (movie) => `
<h1>${movie.title} (${movie.year})</h1>
<div id="single-movie">
  <div id="poster">
    <img src="${movie.poster}" alt="Poster for ${movie.title}">
  </div>
    ${toMovieDetailed(movie)}
</div>
`;

export const toMovieSimple = (movie) => `
<div class="movie-simple" id="${movie.id}">
  <h2>${movie.title}</h2>
  <h3>${movie.year}</h3>
  <img src="${movie.poster}" alt="Poster for ${movie.title}">
  <a class="movie-details" details="${movie.id}">View details</a>${renderFavoriteStatus(movie.id)}
</div>
`;

const toMovieDetailed = (movie) => `
<div id="movie-info">
   <p><strong>Genre:</strong> ${movie.genre}</p>
   <p><strong>Director:</strong> ${movie.director}</p>
   <p><strong>Staring:</strong> ${movie.stars.join(', ')}</p>
   <p><strong>Plot:</strong> ${movie.description}</p>
</div>
`;
