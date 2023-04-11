import { CONTAINER_SELECTOR } from "../common/constants.js";
import { searchGifs } from "../requests/request-service.js"
import { toSearchView } from "../views/search-view.js";

export const renderSearchItems = async (searchTerm) => {
    const gifs = await searchGifs(searchTerm);

    document.querySelector(CONTAINER_SELECTOR).innerHTML = toSearchView(gifs, searchTerm); 
};