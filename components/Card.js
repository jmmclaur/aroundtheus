export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //likeButton
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    //deleteButton
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    //imageClick
    this._cardElement
      .querySelector(".modal__preview-image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
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
      .content.querySelector(".element")
      .cloneNode(true);
    this._cardElement.querySelector("#card-image").src = this._link;
    this._cardElement.querySelector("#card-image").alt = this._name;
    this._cardElement.querySelector("#card-title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}

//card preview won't show up b/c the validation form isn't showing? something is listed wrong in html
// nope it was under the index.js up at the top of the page wrote FormValidator instead of validation

//issue w/ validation.js something at the bottom is not defined

// okay the above is fixed but the disable button isn't defined now. Where should I put that? this might be in my index.js file
