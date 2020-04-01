import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  //// ID damjuulahaar ustgana
  deleteItem(id) {
    ///// ID gedeg ID-tai ortsiin indeksiig massive-ees haij olno
    const index = this.items.findIndex(el => el.id === id);

    //// Ug index deerhi elementiig massive-aas ustgana
    this.items.splice(index, 1);
  }

  /////

  addItem(item) {
    let newItem = {
      id: uniqid(),
      item
    };
    this.items.push(newItem);
    return newItem;
  }
}
