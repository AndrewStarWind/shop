import GoodsApi from './GoodsApi';
import CartApi from './CartApi';

/**
 * Класс для взаимодействия между источниками данных
 * @export
 * @class DataStorage
 */
export default class DataStorage {
  constructor() {
    this.goodsApi = new GoodsApi('data/goods.json');
    this.cartApi = new CartApi();
  }

  /**
   * Проверяет данные корзины на актуальность
   *
   * @memberof DataStorage
   */
  async checkDataForValidity() {
    const goods = await this.goodsApi.getGoods();
    const cartItems = JSON.parse(JSON.stringify(this.cartApi.getCartData()));
    const isValid = cartItems.every((cartItem) => {
      const goodsItem = goods.find((goodsItem => goodsItem.id === cartItem.id));
      const quantity = +cartItem.quantity;

      return goodsItem && quantity <= +goodsItem.amount && quantity <=+goodsItem.maxPerPerson;
    });

    if (!isValid) {
      this.cartApi.reset();
      throw new Error('Данные в корзине устарели. Корзина будет очищена.')
    }
  }

  /**
   * Получает и мутирует данные для отображения
   */
  async getData() {
    const goods = await this.goodsApi.getGoods();

    // допускаем, что это вернул бекенд и делаем глубокое копирование,
    // чтобы не было лишней связи
    const cartItems = JSON.parse(JSON.stringify(this.cartApi.getCartData()));
    const goodsItems = goods.map((item) => {
      const itemInCart = cartItems.find((itemInCart) => itemInCart.id === item.id);
      const newItem = {
        ...item,
        ...{ inCart: itemInCart?.quantity || 0 },
      };

      if (itemInCart) {
        itemInCart.item = { ...newItem };
      }
      return newItem;
    });

    this.cartItems = cartItems;
    this.goodsItems = goodsItems;
    return {
      cartItems: this.cartItems,
      goodsItems: this.getGoodsForDisplay()
    };
  }

  /**
   * Возвращает массив товаров для отображения
   */
  getGoodsForDisplay() {
    return this.goodsItems.filter((item) => +item.amount - item.inCart);
  }

  /**
   * Обработчик добавления в корзину
   * @param {*} id 
   * @param {*} count 
   */
  addToCart(id, count) {
    const cartItem = this.cartItems.find((item) => item.id === id);

    if (cartItem && cartItem.quantity >= cartItem.item.maxPerPerson) {
      throw new Error('Превышена квота на товары');
    }
    this.cartApi.addToCart(id, count);
  }

  /**
   * Обработчик удаления из корзины
   * @param {*} id 
   * @param {*} count 
   */
  removeFromCart(id, count) {
    return count
     ? this.cartApi.decreseQuantity(id, count)
     : this.cartApi.deleteFromCart(id, count);
  }

  /**
   * Вызывает метод сохранения корзины
   * @param {*} data 
   */
  saveCart() {
    this.cartApi.saveCartData();
  }
}
