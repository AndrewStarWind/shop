import BaseComponent from './BaseComponent';

export default class Goods extends BaseComponent {
  composeTitle(data) {
    return data.length
     ? `Имеющиеся категории товаров (${data.length})`
     : 'Всё раскупили, дружок';
  }

  renderItem(item) {
    return `
    <div class="grid__content">
      <span>
        Осталось ${+item.amount - (item.inCart || 0)} ${item.productName} по ${item.price} рублей
      </span>
    </div>
    <button class="grid__actionButton grid__actionButton_main addToCart">Добавить в корзину</button>`;
  }
}
