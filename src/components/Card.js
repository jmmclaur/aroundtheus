export default class Card {
  //good to go 4.30, idk what the reviewer means about changing profile elements in here
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLike
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this.id = data._id;
    this.isLiked = data.isLiked;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike(this);
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  /*
  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  } removing b/c updateIsLiked is used instead 
  need ot change handleLikeIcon to updateIsLiked in index*/

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  } //fixed delete card!! renamed from deletebutton 5.31.2024

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImageEl = this._cardElement.querySelector("#card-image");
    const cardTitleEl = this._cardElement.querySelector("#card-title");
    cardImageEl.src = this._data.link;
    cardImageEl.alt = this._data.name;
    cardTitleEl.textContent = this._data.name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__trash-button");
    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  } //removed the . before the boolean argument, likes appear after refresh
}
