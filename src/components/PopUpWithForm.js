import PopUp from "./PopUp.js";

export default class PopUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super({ popUpSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._submitButton = this._popUpForm.querySelector(".modal__button");
  }

  _getInputValues() {
    this._inputList = this._popUpForm.querySelectorAll(".modal__input");
    const formData = {};
    this._inputList.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  reset() {
    this._popUpForm.reset();
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
    this._popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues()); //what is wrong?
    });
  }

  close() {
    this._popUpForm.reset();
    super.close();
  }
}
