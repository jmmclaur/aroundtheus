//good to go 4.30
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import Section from "../components/Section.js";
//import PopUpWithImage from "../components/PopUpWithImage.js";
import { initialCards } from "../utils/constant.js";
import PopUpWithImage from "../components/PopUpWithImage.js";

/* ------------------------------------------------------------------------------ */

/* Profile Elements */
const profileEditButton = document.querySelector("#profile-edit-button");
//const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
//const profileEditForm = profileEditModal.querySelector(".modal__form");

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
  profileTitle: ".modal__input_type_title", //modal__input_type_title
  profileDescription: ".modal__input_type_description", //modal__input_type_description
});

/*
profileEditButton.addEventListener("click", () => {
  editModal.open();
}); */

addCardButton.addEventListener("click", () => {
  addModal.open();
});

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

const editModal = new PopUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addModal = new PopUpWithForm("#add-card-modal", handleAddCardSubmit);

editModal.setEventListeners();
addModal.setEventListeners();

//const user = new UserInfo("#profile-title-input", "#profile-description-input");

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({
    title: data.title,
    description: data.description,
  });
  editModal.close();
} //corrected layout of the edit modal before typing, but where does the info go?

function handleAddCardSubmit(data) {
  const name = data.name;
  const link = data.link;
  const newCard = renderCard({ name, link });
  cardSection.addItem(newCard);
  addModal.close();
}

profileEditButton.addEventListener("click", () => {
  editModal.open();
  const profileInfo = userInfo.getUserInfo();
  editModal.setInputValues(profileInfo);
  profileEditFormValidator.resetValidation();
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".gallery__cards"
);
cardSection.renderItems();
