export default class PopUp {
  constructor(popUpSelector) {
    this._popUpElement = document.querySelector(popUpSelector);
    //this._handleEscClose = this._handleEscClose();
  }

  /*
  open() {
    this._popUpElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeKey);
  }

  close() {
    this._popUpElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeKey);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }; */

  //
  _handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      const modal = document.querySelector(".modal_opened");
      closeModal(modal);
    }
  }
  close() {
    this._popUpElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeKey);
  }
  open() {
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
    this._closeButton = this._popUpElement.querySelector(".modal__edit-close");
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popUpElement.addEventListener("click", this._handleOutsideClick);
    this._popUpElement.addEventListener("keydown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
