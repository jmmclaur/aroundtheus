import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import popUpWithForm from "../components/PopUpWithForm.js";
import section from "../components/Section.js";
import popUpWithImage from "../components/PopUpWithImage.js";
// import { data } from "autoprefixer";
import { initialCards } from "../utils.js/constant.js";

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
//const previewTitle = document.querySelector(".modal-image");
const previewCloseButton = previewCardModal.querySelector("button");

/* ------------------------------------------------------------------------------ */

/* Functions */
/*
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}
*/

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

/* ------------------------------------------------------------------------------ */

/* Event Listener */
/* profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
}); */

profileEditButton.addEventListener("click", () => {
  profilePopUp.openModal();
});

profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

addCardButton.addEventListener("click", () => {
  cardPopUp.openModal();
});

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

previewCloseButton.addEventListener("click", () => {
  closeModal(previewCardModal);
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
};

const formList = document.querySelectorAll(".modal__form");

const formValidators = {};

const enableValidation = (formList) => {
  formList.forEach((form) => {
    const formValidator = new FormValidator(config, form);
    formValidator.enableValidation();
    formValidators[form.getAttribute("id")] = formValidator;
    return formValidators;
  });
};
enableValidation(formList);

function handleImageClick(cardData) {
  openModal(previewCardModal);
  previewImage.src = cardData.link;
  previewImage.setAttribute("alt", cardData.name);
  previewDescription.textContent = cardData.name;
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEl.append(card);
});

function renderCard(cardData) {
  const card = createCard(cardData);
  cardListEl.prepend(card);
} //idk if I need this

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
}

function handleAddCardSubmit(data) {
  data.preventDefault();
  const name = data.target.name.value;
  const link = data.target.link.value;
  const card = createCard({ name, link });
  cardListEl.prepend(card);
  closeModal(addCardModal);
  formValidators["add-card-form"].disableSubmitButton();
  renderCard({ name, link });
  addCardForm.reset();
}

// sprint 8 refactoring
const profilePopUp = new popUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profilePopUp.setEventListeners(); //id ok

const cardPopUp = new popUpWithForm("#add-card-modal", handleAddCardSubmit);
cardPopUp.setEventListeners(); //id ok

const popUpImage = new popUpWithImage(".modal__preview-image");
popUpImage.setEventListeners(); //class ok

const UserInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
}); //class ok

const cardSection = new section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
); //class ok
