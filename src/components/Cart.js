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
    return 'Корзина пуста';
  }

  renderItem(cartItem, index) {
    return `
      <div class="grid__content">
        <span>№${index + 1} ${cartItem.item.productName}</span>
        <button
        class="grid__actionButton decreseCount"
        ${+cartItem.quantity === 1 && 'disabled'}
        >-</button>
        <span> ${cartItem.quantity} </span>
        <button
          class="grid__actionButton increaseCount"
          ${
            (+cartItem.quantity >= +cartItem.item.maxPerPerson
            || +cartItem.quantity  >= +cartItem.item.amount)
            && 'disabled title="Превышено количество доступных товаров на пользователя"'
          }
        >+</button>
        <span> на сумму ${+cartItem.quantity * +cartItem.item.price} рублей </span>
      </div>
      <button class="grid__actionButton grid__actionButton_main deleteItem">удалить</button>`;
  }
}
