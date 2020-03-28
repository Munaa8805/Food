require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/recipe";
import { renderRecipe, clearRecipe } from "./view/recipeView";

// Wep app tolob
// Khailtiin query , ur dun
// nairlaga
// likelsan joruud
// zahialj baigaa buteegdehuunii nairlaga

const state = {};
////
//// MVC- хайлтын контроллер
////
const controlSearch = async () => {
  //// 1. Web-ees hailtiin tulhuur ugiig gargaj abna
  const query = searchView.getInput();

  if (query) {
    //// 2. Tuhain tulhuur ugeer haidag shineer hailtiin obektiig uusgej ogno
    state.search = new Search(query);

    //// 3. Hailt hiihed zoriulj delgetsiig beltgene
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    //// 4. hailtiig guitsetgene
    await state.search.doSearch();

    //// 5. hailtiin ur dung delgetsend uzuulne
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй");
    else searchView.renderRecipes(state.search.result);
  } else {
    alert("Та хайлтын утга оруулна уу ");
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.pageButtons.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

///// recipe
///// жорын контроллер
////
const controlRecipe = async () => {
  //// 1. URL-aas ID salgaj abna
  const id = window.location.hash.replace("#", "");

  //// 2. Joriin modeliig uusgej ogno
  state.recipe = new Recipe(id);

  //// 3. Delgetsiig  beltgene
  clearRecipe();
  renderLoader(elements.recipeDiv);

  //// 4. Joroo tataj abchirna
  await state.recipe.getRecipe();
  //// 5. Joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
  clearLoader();
  state.recipe.caclTime();
  state.recipe.calcHuniiToo();
  //// 6. Joriig delgetsend gargana
  renderRecipe(state.recipe);
};
window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
