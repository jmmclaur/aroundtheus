export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    console.log(name + link);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle(".card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      //where is this._cardSelector defined?
      //.content.querySelector(".element") //what is element? it's not in hemlt
      .content.querySelector(".card") //instead of element let's use .card
      .cloneNode(true);
    this._cardElement.querySelector("#card-image").src = this._link;
    this._cardElement.querySelector("#card-image").alt = this._name;
    this._cardElement.querySelector("#card-title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
