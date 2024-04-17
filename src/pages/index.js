import Card from "../../components/Card.js";
import FormValidator from "../../components/FormValidator.js";
import "./index.css";
import UserInfo from "../../components/UserInfo.js";
import popUpWithForm from "../../components/popUpWithForm.js";
import Section from "../../components/Section.js";
import PopupWithImage from "../../components/popUpWithImage.js";
import { data } from "autoprefixer";
import {
  initialCards,
  profileAddButton,
  profileEditForm,
  profileAddForm,
} from "../../utils.js/constant.js";

/* ------------------------------------------------------------------------------ */

/* Functions */
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

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardButton.addEventListener("click", () => openModal(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

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
  closeModal(addCardModal);
});

previewCloseButton.addEventListener("click", () => {
  closeModal(previewCardModal);
});

/* ------------------------------------------------------------------------------ */

/* Popup Escape */
function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget //||
    //evt.target.classList.contains("modal__close") reviewer wants removed
  ) {
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
  const cardView = new createCard(cardData);
  cardListEl.append(cardView);
});

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
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
  addCardForm.reset();
}

// sprint 8 extra re-writes

function handleProfileEditSubmit() {
  filledUserInfo.setUserInfo();
  profilePopUp.close();
}

function handleProfileFormCreate(inputValues) {
  const cardElement = createCard(inputValues);
  newCards.addItem(cardElement);

  cardValidator.resetValidation();
  cardPopUp.close();
}

function handleImageClick(data) {
  previewPopUp.open(data);
}

export function createCard(data) {
  const createNewCard = new Card(data, "#cards-template", handleImageClick);
  return createNewCard.generateCard(data);
}

const newCards = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

newCards.renderItems();
const profilePopUp = new popUpWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

const cardPopUp = new popUpWithForm("#card-add-modal", handleProfileFormCreate);
const previewPopUp = new PopupWithImage("#preview-modal");
previewPopUp.setEventListeners();
const filledUserInfo = new UserInfo("#modal-user-input", "#modal-job-input");

profileEditButton.addEventListener("click", () => {
  profilePopUp.open();
  filledUserInfo.getUserInfo();
});

profileAddButton.addEventListener("click", () => {
  cardPopUp.open();
});

profilePopUp.setEventListeners();
cardPopUp.setEventListeners();

//Form Validator with Form Validator Class
const settings = {
  formElement: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const formValidator = new FormValidator(settings, profileEditForm);
const cardValidator = new FormValidator(settings, profileAddForm);
formValidator.enableValidation();
cardValidator.enableValidation();
