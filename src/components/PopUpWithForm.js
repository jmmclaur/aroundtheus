import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super({ popUpSelector });
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    //t his._inputEl = this._popUpElement.querySelectorAll(".modal__input");
    this._submitButton = this._popUpForm.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll(".modal__input");
    const formData = {};
    inputList.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  setEventListeners() {
    super.addEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
