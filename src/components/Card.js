export default class Card {
  //good to go 4.30, idk what the reviewer means about changing profile elements in here
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteButton,
    handleLike
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._handleLike = handleLike;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
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

  handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getElement();
    /*.querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true); */
    const cardImageEl = this._cardElement.querySelector("#card-image");
    const cardTitleEl = this._cardElement.querySelector("#card-title");
    cardImageEl.src = this._data.link;
    cardImageEl.alt = this._data.name;
    cardTitleEl.textContent = this._data.name;
    this._deleteButton = this._cardElement.querySelector(".card__trash-button");
    this._setEventListeners();
    return this._cardElement;
  }

  _renderLikes() {
    if (this._isLiked) {
      this.handleLikeIcon.classList.add(".card__like-button_active");
    } else {
      this.handleLikeIcon.classList.remove(".card__like-button_active");
    }
  }
}
