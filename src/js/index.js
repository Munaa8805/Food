require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/recipe";
import List from "./model/list";
import Like from "./model/like";
import * as likesView from "./view/likesview";
import * as listView from "./view/listview";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe
} from "./view/recipeView";

// Wep app tolob
// Khailtiin query , ur dun
// nairlaga
// likelsan joruud
// zahialj baigaa buteegdehuunii nairlaga

const state = {};
/// like menu-g haana
likesView.toggleLikeMenu(0);
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
  if (!state.likes) state.likes = new Like();
  ///url deer ID bgaa esehiig shalgana.
  if (id) {
    //// 2. Joriin modeliig uusgej ogno
    state.recipe = new Recipe(id);

    //// 3. Delgetsiig  beltgene
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);

    //// 4. Joroo tataj abchirna
    await state.recipe.getRecipe();
    //// 5. Joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
    clearLoader();
    state.recipe.caclTime();
    state.recipe.calcHuniiToo();
    //// 6. Joriig delgetsend gargana
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe));

////
//// Nairlaganii controller heregtei
////

const controlList = () => {
  ///// Nairlaganii model-iig uusgene
  state.list = new List();
  ///// delgets tseberlene
  listView.clearItems();
  ///// Ug model ruu odoo baigaa joriig hiine.
  state.recipe.ingredients.forEach(n => {
    //// tuhain nairlagiig model ruu hiine
    const item = state.list.addItem(n);
    //// tuhain nairlagiig delgetsend gargana
    listView.renderItem(item);
  });
};

////
//// like controller
////
const controlLike = () => {
  ////Like -iin model uusgene
  if (!state.likes) state.likes = new Like();
  //// Delgetsend baigaa joriig id olj abah
  const currentRecipeId = state.likes.id;
  //// Ene joriig likes
  if (state.likes.isLiked(currentRecipeId)) {
    //// Likelsan bol like-ig boliulna
    state.likes.deleteLike(currentRecipeId);
    ////Haragdaj baigaa like-iig tsesnees ustganaa
    likesView.deleteLike(currentRecipeId);
    //// Like btn haragdaj bdliig boliulah
    likesView.toggleLikeBtn(false);
  } else {
    //// Like-laagui bol like hiine

    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    //// render like
    likesView.renderLike(newLike);
    // Like tobchiig lieklasan baidliig likelsan bolgoh
    likesView.toggleLikeBtn(true);
  }

  ///// like menu
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

////

elements.recipeDiv.addEventListener("click", e => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});
elements.shoppingList.addEventListener("click", e => {
  //// click hiisen LI elementiing data-itemID shuuj gargah
  const id = e.target.closest(".shopping__item").dataset.itemid;
  //// Model-oos ustaganaa
  state.list.deleteItem(id);
  //// delgetsees ustgana
  listView.deleteItem(id);
});
