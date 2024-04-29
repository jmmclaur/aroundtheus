// as of 4.22.2024 the like/trash buttons work, and I can open the modals for edit/add but clicking on close button doesn't work (it exits the entire dev window).
// and I need to test out the validator, right now it's commented out b/c it's causing issues

import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import popUpWithForm from "../components/PopUpWithForm.js";
import Section from "../components/Section.js";
import popUpWithImage from "../components/PopUpWithImage.js";
import { initialCards } from "../utils/constant.js";
import PopUpWithImage from "../components/PopUpWithImage.js";

/* ------------------------------------------------------------------------------ */

/* Profile Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
//const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
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
const addCardButton = document.querySelector(".profile__add-button"); //change from document to addCardModal
const addCardForm = document.querySelector("#add-card-form");
const addCardModal = document.querySelector("#add-card-modal");
//const addCardCloseButton = addCardModal.querySelector("button");
const addSubmitButton = addCardModal.querySelector(".modal__button");

/* Preview Elements */
//const previewCardModal = document.querySelector("#modal-preview");
const previewImage = document.querySelector(".modal__preview-image");
const previewDescription = document.querySelector(
  ".modal__preview-description"
);
//const previewTitle = document.querySelector(".modal-image");
//const previewCloseButton = previewCardModal.querySelector("button");

const cardSelector = "#card-template";
/* ------------------------------------------------------------------------------ */

/* Form Validators */
const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

/* ------------------------------------------------------------------------------ */

/* Functions */

profileEditForm.addEventListener("submit", handleProfileEditSubmit); //ok
addCardForm.addEventListener("submit", handleAddCardSubmit); //ok

/* ------------------------------------------------------------------------------ */

/* Event Listener */
profileEditButton.addEventListener("click", () => {
  profilePopUp.open();
}); //ok

addCardButton.addEventListener("click", () => {
  cardPopUp.open();
}); //ok

/* ------------------------------------------------------------------------------ */

/* Popup Escape */
function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
addCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
//previewCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
//popupWithImage.addEventListener("mousedown", closeModalOnRemoteClick);

/* ------------------------------------------------------------------------------ */

/* Restructuring */
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
}; //ok

const forms = document.querySelectorAll(config.formSelector); //ok

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
}); //ok

// let's try to figure out the preview stuff
function handleImageClick(name, link) {
  previewCardModal.open(name, link);
} //createCard and renderCard what should these be named as? Need to fix those along w/ the previewImageModal 4.28.2024
//something is wrong w/ card.getView, previewCardModal

const previewCardModal = new PopUpWithImage("#modal-preview");
previewCardModal.setEventListeners();
//this is brand new, let's replace const modalWithImage = new ModalWithImage format
//

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEl.append(card);
}); //ok

function renderCard(cardData) {
  const card = createCard(cardData, cardSelector, handleImageClick);
  return card.getView();
} //ok

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
} //ok

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({ name: data.title, description: data.description });
  profileEditModal.closest();
}

function handleAddCardSubmit(userInfo) {
  const name = userInfo.title;
  const link = userInfo.link;
  const createCard = renderCard({ name, link });
  cardSection.addItem(createCard);
  addCardModal.closest();
}

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  profileEditModal.open();
});

// so I need to remove the close buttons and from here, move event listeners (close buttons too) to popup.js, and some listeners into popupwithform.js

// sprint 8 refactoring
const profilePopUp = new popUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profilePopUp.setEventListeners(); //ok

const cardPopUp = new popUpWithForm("#add-card-modal", handleAddCardSubmit);
cardPopUp.setEventListeners(); //ok

// this is being replaced w/ previewCardModal at line115
/* const popupImage = new popUpWithImage("#modal-preview");
popupImage.setEventListeners(); //passing the wrong thing through here */

/* const previewCardModal = new previewCardModal("#modal-preview");
previewCardModal.setEventListeners(); */

/*const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
}); //ok */

/*const cardSection = new section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
); //ok */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".gallery__cards"
);
cardSection.renderItems();
