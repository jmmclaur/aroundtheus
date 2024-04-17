import PopUp from "./PopUp.js";
export default class popUpWithForm extends PopUp {
  constructor(popUpSelector, handleFormSubmit) {
    super(popUpSelector);
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  open() {
    super.open();
  }
  close() {
    super.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
  _getInputValues() {
    const inputValues = {};
    const inputValueList = this._popUpForm.querySelectorAll(".modal__input");
    inputValueList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
}
