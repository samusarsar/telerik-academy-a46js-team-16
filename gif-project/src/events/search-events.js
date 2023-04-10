import { toSearchView } from "../views/search-view.js";
import { CONTAINER_SELECTOR } from "../common/constants.js";
import { loadSearchMovies } from "../requests/request-service.js";
import { q } from "./helpers.js";

export const renderSearchItems = (searchTerm) => {
  const foundMovies = loadSearchMovies(searchTerm);
  q(CONTAINER_SELECTOR).innerHTML = toSearchView(foundMovies, searchTerm);
};
