export default class Utility {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.reverse().forEach((item) => this._renderer(item));
  }
  /*
  renderItems() {
    this._initialArray.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  } */

  addItem(element) {
    this._container.prepend(element);
  }
}
