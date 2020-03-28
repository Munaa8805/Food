require("@babel/polyfill");
import { elements } from "./base";
//// Private function
const renderRecipe = recipe => {
  const markup = `  
  <li>
    <a class="results__link results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

//// public function

export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  //// page = 2 , start = 10 , end =20
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;
  //// ur dung delgets ruu gargaj baigaa
  recipes.slice(start, end).forEach(renderRecipe);
  //// huudasnii tovchiig gargana
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

/// type ===> 'prev' , 'next'
const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
<span>Хуудас ${page}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
</button>`;
///////
const renderButtons = (currentPage, totalPages) => {
  let buttonHTML;
  if (currentPage === 1 && totalPages > 1) {
    //// 1 r huudas deer bn 2r huudas gedeg tobchiig garga
    buttonHTML = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    //// goliin huudasuud
    buttonHTML = createButton(currentPage - 1, "prev", "left");
    buttonHTML += createButton(currentPage + 1, "next", "right");
  } else if ((currentPage = totalPages)) {
    //// hamgiin suuliin huudas bn. omnoh ruu shiljuuleh tobch bn
    buttonHTML = createButton(currentPage - 1, "prev", "left");
  }
  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHTML);
};
