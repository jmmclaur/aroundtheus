export const initialCards = [
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
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditCloseButton =
  profileEditModal.querySelector(".modal__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form");

/* Gallery Elements */
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardListEl = document.querySelector(".gallery__cards");

/* Add Button Elements */
export const addCardButton = document.querySelector(".profile__add-button"); //change from document to addCardModal
export const addCardForm = document.querySelector("#add-card-form");
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardCloseButton = addCardModal.querySelector("button");
export const addSubmitButton = addCardModal.querySelector(".modal__button");

/* Preview Elements */
export const previewCardModal = document.querySelector("#modal-preview");
export const previewImage = document.querySelector(".modal__preview-image");
export const previewDescription = document.querySelector(
  ".modal__preview-description"
);
export const previewCloseButton = previewCardModal.querySelector("button");
