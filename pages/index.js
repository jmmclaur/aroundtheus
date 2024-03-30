import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Profile Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

/* Gallery Elements */
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".gallery__cards");

/* Add Button Elements */
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.querySelector("#add-card-form");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addNewCardModal.querySelector("button");
const cardNameInput = document.querySelector(".modal__input_type_name");
const cardLinkInput = document.querySelector(".modal__input_type_url");

/* Preview Elements */
const previewCardModal = document.querySelector("#modal-preview");
const previewImage = document.querySelector(".modal__preview-image");
const previewDescription = document.querySelector(
  ".modal__preview-description"
);
const previewCloseButton = previewCardModal.querySelector("button");

/* ------------------------------------------------------------------------------ */

/* Functions */
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  } //good
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
} //good
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
} //good

profileEditForm.addEventListener("click", handleProfileEditSubmit);
profileEditButton.addEventListener("click", () => openModal(profileEditModal));
addCardButton.addEventListener("click", () => openModal(addNewCardModal));
addNewCardModal.addEventListener("click", handleAddCardSubmit);
addCardForm.addEventListener("click", handleAddCardSubmit);

//

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewCardModal);
    previewImage.src = data.link;
    previewDescription.textContent = data.name;
    previewImage.alt = `${data.name}`;
  });

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  return cardElement;
}

/* ------------------------------------------------------------------------------ */

/* Buttons */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addCardCloseButton.addEventListener("click", () => {
  closeModal(addNewCardModal);
});

previewCloseButton.addEventListener("click", () => {
  closeModal(previewCardModal);
});

/* ------------------------------------------------------------------------------ */

/* For Each */
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

/* ------------------------------------------------------------------------------ */

/* Popup Escape */
function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
}

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
addNewCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
previewCardModal.addEventListener("mousedown", closeModalOnRemoteClick);

/* ------------------------------------------------------------------------------ */

/* Restructuring */
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileEditFormValidator = new FormValidator(
  config,
  profileEditModalForm
);
profileEditFormValidator.enableValidation();

const addModalFormValidator = new FormValidator(config, addModalForm);
addModalFormValidator.enableValidation();

//new below this line

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = addCardForm.querySelector("#modal-name");
  const cardLinkInput = addCardForm.querySelector("#modal-url");
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const cardElement = new Card(
    { name, link },
    "#card-template",
    handleImageClick
  );
  cardListEl.prepend(cardElement.getView());
  addCardForm.reset();
  closeModal(addNewCardModal);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleImageClick(cardData) {
  openPopUp(previewImageModal);
  previewImage.src = cardData.link;
  previewImageTitle.textContent = cardData.name;
  previewImage.setAttribute("alt", cardData.name);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardListEl.append(card.getView());
});
