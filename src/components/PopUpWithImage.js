import Popup from "./PopUp.js";

export default class PopUpWithImage extends Popup {
  constructor(popUpSelector) {
    super({ name, link, popUpSelector });
    this._image = this._popUpElement.querySelector(".modal__preview-image");
    this._text = this._popUpElement.querySelector(".modal__text");
    this._name = name;
    this._link = link;
  }

  open(name, link) {
    this._popUpElement.querySelector("#card-title"); //maybe change id
    const popUpImage = this._popUpElement.querySelector("#card-image"); //maybe change id
    popUpImage.alt = name;
    popUpImage.src = link;
    super.open();
  }
}

/*
  open(data) {
    this.modalImage.src = data._link;
    this.imageText.alt = data._name;
    this.imageText.textContent = data._name;
    super.openModal();
  } */
