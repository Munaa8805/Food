require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";

// Wep app tolob
// Khailtiin query , ur dun
// nairlaga
// likelsan joruud
// zahialj baigaa buteegdehuunii nairlaga

const state = {};
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
