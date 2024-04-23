//updated 4.19.2024, 4.22
//import { openModal, closeModal } from "../src/utils.js";

export default class PopUp {
  constructor({ popUpSelector }) {
    this._popUpElement = document.querySelector(popUpSelector);
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
  }

  _handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  //
  /*
  _handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      const modal = document.querySelector(".modal_opened");
      closeModal(modal);
    }
  } */

  close() {
    //closeModal(this._popUpElement);
    this._popUpElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", (evt) => {
      this._handleEscapeKey(evt);
    });
  }

  open() {
    //openModal(this._popUpElement);
    this._popUpElement.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscapeKey);
  }
  //

  _handleOutsideClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    document.addEventListener("keydown", (evt) => {
      this._handleEscapeKey(evt);
    });
    /*
    this._closeButton = this._popUpElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    //this._popUpElement.addEventListener("click", this._handleOutsideClick);
    this._popUpElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    }); */
  }
}
