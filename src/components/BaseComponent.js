

/**
 * на самом деле это больше BaseGrid, но т.к. нет других компонент - назван так
 * его можно бескночено расширять добавляя заголовки, виды событий и всякие разные обвески,
 * добавить нормальную работу с шаблонами
 *
 * @export
 * @class BaseComponent
 */
export default class BaseComponent {
  constructor({ container, itemActions, itemClassName }) {
    this.container = container;
    this.itemActions = itemActions;
    this.itemClassName = itemClassName;
  }

  /**
   * Вешает слушатели, тут только клик, но это возможно расширить
   */
  initActionHandlers() {
    this.container.addEventListener('click', (event) => {
      for (const action in this.itemActions) {
        if (event.target.classList.contains(this.itemActions[action].className)) {
          return this.itemActions[action].handler(
            event.target.closest(`.${this.itemClassName}`).getAttribute('data-id')
          );
        }
      }
    });
  }

  composeTitle(data) {
    return '';
  }

  renderItem(data) {
    return '';
  }

  render(data) {
    const heading = `<h3 class="table__heading">${this.composeTitle(data)}</h3>`;
    const items = data.reduce((reducer, item, id) => {
      reducer += `<div class="grid__row ${this.itemClassName}" data-id="${item.id}">${this.renderItem(
        item,
        id
      )}</div>`;
      return reducer;
    }, '');

    this.container.textContent = '';
    this.container.insertAdjacentHTML(
      'afterbegin',
      `${heading}
      <div class="grid">
         ${items}
      </div>`
    );
  }
}
