import { loadCategories } from "../requests/request-service.js";

export const toCategoriesView = (categories) => `
<div id="categories">
  <h1>Categories</h1>
  <div class="content">
    ${categories.map(toSingleCategoryView).join('\n')}
  </div>
</div>
`;

const toSingleCategoryView = (category) => `
  <div class="category-box">
    <h2>${category.name}</h2>
    <p>${loadCategories().find(c => c.name === category.name).moviesCount} movies</p>
    <a class="category-view" category="${category.id}">View category</a>
  </div>
`;
