require("@babel/polyfill");
import Search from "./model/search";

// Wep app tolob
// Khailtiin query , ur dun
// nairlaga
// likelsan joruud
// zahialj baigaa buteegdehuunii nairlaga

const state = {};
const controlSearch = async () => {
  //// 1. Web-ees hailtiin tulhuur ugiig gargaj abna
  const query = "pizza";

  if (query) {
    //// 2. Tuhain tulhuur ugeer haidag shineer hailtiin obektiig uusgej ogno
    state.search = new Search(query);

    //// 3. Hailt hiihed zoriulj delgetsiig beltgene

    //// 4. hailtiig guitsetgene
    await state.search.doSearch();

    //// 5. hailtiin ur dung delgetsend uzuulne
    console.log(state.search.result);
  } else {
    alert("Та хайлтын утга оруулна уу ");
  }
};
document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
