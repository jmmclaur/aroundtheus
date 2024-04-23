// as of 4.22.2024 the like/trash buttons work, and I can open the modals for edit/add but clicking on close button doesn't work (it exits the entire dev window).
// and I need to test out the validator, right now it's commented out b/c it's causing issues

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import popUpWithForm from "../components/PopUpWithForm.js";
import section from "../components/Section.js";
import popUpWithImage from "../components/PopUpWithImage.js";
import { initialCards } from "../utils/constant.js";

/* import {
  initialCards,
  config,
  formValidators,
  profileEditButton,
  addCardButton,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constant.js";
// import { createCard, handleAddCardSubmit } from "../utils/utils.js";

/* ------------------------------------------------------------------------------ */

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
const addCardButton = document.querySelector(".profile__add-button"); //change from document to addCardModal
const addCardForm = document.querySelector("#add-card-form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector("button");
//const addSubmitButton = addCardModal.querySelector(".modal__button");

/* Preview Elements */
const previewCardModal = document.querySelector("#modal-preview");
const previewImage = document.querySelector(".modal__preview-image");
const previewDescription = document.querySelector(
  ".modal__preview-description"
);
const previewTitle = document.querySelector(".modal-image");
const previewCloseButton = previewCardModal.querySelector("button");

/* ------------------------------------------------------------------------------ */

/* Form Validators */
/*
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

/* ------------------------------------------------------------------------------ */

/* Functions */

profileEditForm.addEventListener("submit", handleProfileEditSubmit); //ok
//addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit); //ok

/* ------------------------------------------------------------------------------ */

/* Event Listener */
profileEditButton.addEventListener("click", () => {
  profilePopUp.open();
}); //ok

profileEditCloseButton.addEventListener("click", () => {
  close(profileEditModal);
});

addCardButton.addEventListener("click", () => {
  cardPopUp.open();
}); //ok

addCardCloseButton.addEventListener("click", () => {
  close(addCardModal);
});

previewCloseButton.addEventListener("click", () => {
  close(previewCardModal);
});

/* ------------------------------------------------------------------------------ */

/* Popup Escape */
function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
addCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
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
}; //ok

const forms = document.querySelectorAll(config.formSelector); //ok

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
}); //ok

/* const formList = document.querySelectorAll(".modal__form");

const formValidators = {};

const enableValidation = (formList) => {
  formList.forEach((form) => {
    const formValidator = new FormValidator(config, form);
    formValidator.enableValidation();
    formValidators[form.getAttribute("id")] = formValidator;
    return formValidators;
  });
};
enableValidation(formList); */

/* function handleImageClick(cardData) {
function handleImageClick(cardData) {
  openModal(previewCardModal);
  popUpImage.open(cardData);
  previewImage.src = cardData.link;
  previewImage.setAttribute("alt", cardData.name);
  previewDescription.textContent = cardData.name; 
} 

function handleImageClick(description, link) {
  previewDescription = description;
  previewImage = link;
  previewCardModal.open();
} 
*/

function handleImageClick(cardData) {
  previewImage.setAttribute("src", cardData.link);
  previewImage.setAttribute("alt", cardData.name);
  previewDescription.textContent = cardData.name;
  previewCardModal.open(cardData);
} //preview still isn't workings

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEl.append(card);
}); //ok

function renderCard(cardData) {
  const card = createCard(cardData);
  cardListEl.prepend(card);
} //ok

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
} //ok

function handleProfileEditSubmit() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profilePopUp.close();
} //ok

function handleAddCardSubmit(data) {
  data.preventDefault();
  const name = data.target.name.value;
  const link = data.target.link.value;
  //const card = createCard({ name, link });
  renderCard({ name, link });
  addCardForm.reset();
} //ok

// sprint 8 refactoring
const profilePopUp = new popUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profilePopUp.setEventListeners(); //ok

const cardPopUp = new popUpWithForm("#add-card-modal", handleAddCardSubmit);
cardPopUp.setEventListeners(); //ok

const popupWithImage = new popUpWithImage(".modal__preview-image");
popupWithImage.setEventListeners(); //ok

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
}); //ok

const cardSection = new section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
); //ok
