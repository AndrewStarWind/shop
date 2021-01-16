import DataStorage from './utils/DataStorage';
import Goods from './components/Goods';
import Cart from './components/Cart';
import { errorHandler } from './utils/common';

import './index.css';

(async () => {
  const storage = new DataStorage();
  const addItem = (id) => {
    try {
      storage.addToCart(id, 1);
      renderItems();
    } catch (err) {
      errorHandler(err);
    }
  };
  
  const renderItems = async () => {
    try {
      const data = await storage.getData();
  
      goods.render(data.goodsItems);
      cart.render(data.cartItems);
    } catch (err) {
      errorHandler(err);
    }
  };
  const goods = new Goods({
    container: document.querySelector('.table_type_goods'),
    itemClassName: 'good',
    itemActions: [
      {
        className: 'addToCart',
        handler: addItem,
      },
    ],
  });
  const cart = new Cart({
    container: document.querySelector('.table_type_cart'),
    itemClassName: 'cart-item',
    itemActions: [
      {
        className: 'decreseCount',
        handler: (id) => {
          storage.removeFromCart(id, 1);
          renderItems();
        },
      },
      {
        className: 'increaseCount',
        handler: addItem,
      },
      {
        className: 'deleteItem',
        handler: (id) => {
          storage.removeFromCart(id);
          renderItems();
        },
      },
    ],
  });
  
  try {
    await storage.checkDataForValidity();
  } catch(err) {
    errorHandler(err);
  } finally {
    goods.initActionHandlers();
    cart.initActionHandlers();
    renderItems();
    window.addEventListener('beforeunload', () => storage.saveCart());
  }
})();
