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
const addSubmitButton = addCardModal.querySelector(".modal__button");

/* Preview Elements */
const previewImage = document.querySelector(".modal__preview-image");
const previewDescription = document.querySelector(
  ".modal__preview-description"
);

const cardSelector = "#card-template";
/* ------------------------------------------------------------------------------ */

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit); //ok
addCardForm.addEventListener("submit", handleAddCardSubmit); //ok

profileEditButton.addEventListener("click", () => {
  profilePopUp.open();
});

addCardButton.addEventListener("click", () => {
  cardPopUp.open();
});

function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
addCardModal.addEventListener("mousedown", closeModalOnRemoteClick);

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

const forms = document.querySelectorAll(config.formSelector);

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});

function handleImageClick(name, link) {
  previewCardModal.open(name, link);
}

const previewCardModal = new PopUpWithImage("#modal-preview");
previewCardModal.setEventListeners();

function renderCard(cardData) {
  const addCard = new Card(cardData, cardSelector, handleImageClick);
  return addCard.getView();
}

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
} //ok why do the cards disappear when we block this section? */
//maybe the initialCards is impacting it?

//need to rename ModalWithForm to PopUpWithForm
const editModal = new popUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addModal = new popUpWithForm("#add-card-modal", handleAddCardSubmit);

editModal.setEventListeners();
addModal.setEventListeners();

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({ title: data.title, description: data.description });
  editModal.close();
} //editModal needs to be defined

function handleAddCardSubmit(userInfo) {
  const name = userInfo.title;
  const link = userInfo.link;
  const createCard = renderCard({ name, link });
  cardSection.addItem(createCard);
  addModal.close();
} //addModal needs to be defined

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  profileEditModal.open();
});

const profilePopUp = new popUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profilePopUp.setEventListeners();

const cardPopUp = new popUpWithForm("#add-card-modal", handleAddCardSubmit);
cardPopUp.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".gallery__cards"
);
cardSection.renderItems();
