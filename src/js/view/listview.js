import { elements } from "./base";

export const renderItem = item => {
  const html = `  
    <li class="shopping__item" data-itemid=${item.id}>
    <p class="shopping__description">${item.item}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>`;
  elements.shoppingList.insertAdjacentHTML("beforeend", html);
};
export const clearItems = () => {
  elements.shoppingList.innerHTML = "";
};

//// delete item

export const deleteItem = id => {
  ////Hiaj olno
  const item = document.querySelector(`[data-itemid="${id}"]`);

  //// odoo ustgana delgetsees
  item.parentElement.removeChild(item);
};
