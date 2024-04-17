import Popup from "./PopUp.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._modalImage = this._popUpElement.querySelector(".card__image-preview");
    this._imageText = this._popUpElement.querySelector(".modal__text");
  }

  openModal() {
    super.openModal();
  }

  /*
  open(data) {
    this.modalImage.src = data._link;
    this.imageText.alt = data._name;
    this.imageText.textContent = data._name;
    super.openModal();
  } */
}
