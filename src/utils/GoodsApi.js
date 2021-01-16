/**
 * Имитация API
 *
 * @export
 * @class GoodsApi
 */
export default class GoodsApi {
  constructor(url) {
    this.url = url;
  }

  async getGoods() {
    if (!this._data) {
      const res = await fetch(this.url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Ошибка получения данных с сервера');
      }
      this._data = await res.json();
    }
    return this._data;
  }
}
