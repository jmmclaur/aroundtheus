import PopUp from "./PopUp.js";

export default class popUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super({ popUpSelector });
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closeModal();
    });
  }

  close() {
    this._popupForm.removeEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    this._popupForm.reset();
    super.closeModal();
  }
}
