import PopUp from "./PopUp.js";

export default class PopUpWithImage extends PopUp {
  constructor(popUpSelector) {
    super({ popUpSelector });
    this._image = this._popUpElement.querySelector(".modal__preview-image");
    this._caption = this._popUpElement.querySelector(
      ".modal__preview-description"
    );
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
