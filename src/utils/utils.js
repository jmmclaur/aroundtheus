import {
  cardList,
  formValidators,
  profileInputName,
  profileInputDescription,
} from "./constant.js";

import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopUpWithImage.js";

export function createNewCard(cardData, template) {
  return new Card(cardData, template, handleImageClick).generateCard();
}

export function placeNewCard(cardData, wrapper) {
  const newCard = createNewCard(cardData, "#card-template");
  wrapper.prepend(newCard);
}

export function handleImageClick(name, link) {
  const popupWithImage = new PopupWithImage(name, link, "#preview-image-modal");
  popupWithImage.setEventListeners();
  popupWithImage.open(name, link);
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", handleModalCloseClick);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", handleModalCloseClick);
}

export function handleModalCloseClick(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__exit-button")
  ) {
    closeModal(evt.currentTarget);
  }
}

export const handleCardAddSubmit = (cardInfo) => {
  const newCardInfo = {
    name: cardInfo.title,
    link: cardInfo.link,
  };
  placeNewCard(newCardInfo, cardList);
  formValidators["card-add-form"].disableButton();
};

export const userInfo = new UserInfo("#profile-name", "#profile-description");

export const initializeProfileEditForm = (userInfo) => {
  const userData = userInfo.getUserInfo();
  profileInputName.value = userData.name;
  profileInputDescription.value = userData.job;
};

export const handleProfileFormSubmit = (userInput) => {
  const newUserInfo = {
    name: userInput.name,
    job: userInput.job,
  };
  userInfo.setUserInfo(newUserInfo);
};
