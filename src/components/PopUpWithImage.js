import Popup from "./PopUp.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.modalImage = document.querySelector(".card__image-preview");
    this.imageText = document.querySelector(".modal__text");
  }

  open(data) {
    this.modalImage.src = data._link;
    this.imageText.alt = data._name;
    this.imageText.textContent = data._name;
    super.open();
  }
}
