import BaseComponent from './BaseComponent';

export default class Cart extends BaseComponent {
  composeTitle(data) {
    if (data.length) {
      const { sum, quantity } = data.reduce(
        (reducer, item) => {
          reducer.quantity += +item.quantity;
          reducer.sum += +item.quantity * +item.item.price;
          return reducer;
        },
        { sum: 0, quantity: 0 }
      );
      return `В корзине ${quantity} товаров на сумму ${sum}`;
    }
    return 'В корзине нет товаров';
  }

  renderItem(cartItem, index) {
    return `<span>№${index + 1} ${cartItem.item.productName}</span>
      ${+cartItem.quantity > 1 ? '<button class="grid__actionButton decreseCount">-</button>' : ''}
      <span> ${cartItem.quantity} </span>
      ${
        +cartItem.quantity < +cartItem.item.maxPerPerson && +cartItem.quantity < +cartItem.item.amount
          ? '<button class="grid__actionButton increaseCount">+</button>'
          : ''
      }
      <span> на сумму ${+cartItem.quantity * +cartItem.item.price} рублей </span>
      <button class="grid__actionButton deleteItem">удалить</button>`;
  }
}
