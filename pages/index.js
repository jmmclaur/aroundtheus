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
//const profileEditSubmit = profileEditModal.querySelector("#edit-save-button");

/* Gallery Elements */
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".gallery__cards");

/* Add Button Elements */
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.querySelector("#add-card-form");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addNewCardModal.querySelector("button");
//const addCardSubmit = addNewCardModal.querySelector("#add-save-button");
const cardNameInput = document.querySelector(".modal__input_type_name");
const cardLinkInput = document.querySelector(".modal__input_type_url");
//const cardDeleteButton = document.querySelector("card__trash-button");
//const cardDeleteCloseButton = document.querySelector("trash-button");

//const modalForms = document.querySelectorAll(".modal__form");

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

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardButton.addEventListener("click", () => openModal(addNewCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

/*
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const data = { name, link };
  const newCard = getCardElement(data);
  cardListEl.prepend(newCard);
  e.target.reset();
  closeModal(addNewCardModal);
} */

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

/* Event Listener */
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

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
} //good

function renderCard(cardElement) {
  cardListElement.prepend(cardElement);
} //good

profileEditForm.addEventListener("submit", handleProfileEditSubmit); //something is wrong w/ this
addCardForm.addEventListener("submit", handleAddCardSubmit);
//the button isn't working

const handleImageClick = (cardData) => {
  previewImageElement.src = cardData._link;
  previewImageElement.alt = cardData._name;
  previewImageElementName.textContent = cardData._name;
  openModal(previewImageModal);
};

initialCards.forEach((cardData) => {
  const cardView = createCard(cardData);
  renderCard(cardView);
});

const profileEditFormValidator = new FormValidator(
  config,
  profileEditModalForm
);
profileEditFormValidator.enableValidation();

const addModalFormValidator = new FormValidator(config, addModalForm);
addModalFormValidator.enableValidation();

/*
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };
  const cardElement = createCard(newCard);
  renderCard(cardElement);
  closeModal(addModal);
  addModalForm.reset();
  addModalFormValidator.disableSubmitButton();
} */

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: addTitleInput.value, link: addUrlInput.value };
  const cardElement = createCard(newCard);
  renderCard(cardElement);
  closeModal(addModal);
  addModalForm.reset();
  addModalFormValidator.disableSubmitButton();
}