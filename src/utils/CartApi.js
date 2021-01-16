/**
 * Имитация бекенда для корзины
 */
export default class CartApi {
  getCartData() {
    if (!this.data) {
      try {
        this.data = JSON.parse(localStorage.getItem('store-card-data')) || [];
      } catch (err) {
        // JSON.parse штука ненадёжная, так что лучше перестрахуемся
        this.data = [];
      }
    }
    return this.data;
  }

  saveCartData() {
    localStorage.setItem('store-card-data', JSON.stringify(this.data));
  }

  addToCart(id, quantity) {
    const cartItem = this.getItemById(id);

    if (!cartItem) {
      this.data.push({ id, quantity });
    } else {
      cartItem.quantity += quantity;
    }
  }

  decreseQuantity(id, count) {
    const cartItem = this.getItemById(id);

    if (cartItem) {
      if (cartItem.quantity === 1) {
        this.deleteFromCart(id);
      } else {
        cartItem.quantity -= count;
      }
    }
  }

  deleteFromCart(id) {
    this.data = this.data.filter((item) => item.id !== id);
  }

  getItemById(id) {
    return this.getCartData().find((item) => item.id === id);
  }

  reset() {
    this.data = [];
    this.saveCartData();
  }
}
