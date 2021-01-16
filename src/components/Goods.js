import BaseComponent from './BaseComponent';

export default class Goods extends BaseComponent {
  composeTitle(data) {
    return data.length
     ? `Имеющиеся категории товаров (${data.length})`
     : 'Всё раскупили, дружок';
  }

  renderItem(item) {
    return `
      <span>
        Осталось ${+item.amount - (item.inCart || 0)} ${item.productName} по ${item.price} рублей
      </span>
      <button
        class="grid__actionButton addToCart"
        ${item.inCart >= +item.maxPerPerson ? 'disabled title="Превышено количество позиций на пользовтеля"' : ''}>
        Добавить в корзину
      </button>`;
  }
}
