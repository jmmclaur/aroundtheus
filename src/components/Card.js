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

  //check out like on this page 6.10
  _setEventListeners() {
    /*this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLike(); //something is wrong here, took out this
      }); */
    this._likeButton.addEventListener("click", () => {
      this._handleLike(this._id);
    });
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._id);
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

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

    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }

  _renderLikes() {
    if (this.isLiked) {
      this._cardElement.classList.add(".card__like-button_active");
    } else {
      this._cardElement.classList.remove(".card__like-button_active");
    }
  }

  //what is needed with this method below?
  updateIsLiked(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  } //should I be using this instead of cardId?
}
//6.10 fix the like button, need to tell the server it's true

//something isn't right w/ the like/trash icons, but we need to see the cards first lol
//where are the initial cards called from? components, let's check it out
