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

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* Profile Elements */
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal"); //how is this used in index.js? maybe change editModal to profileEditModal
export const profileTitleInput = document.querySelector(
  ".modal__input_type_title"
);
export const profileDescriptionInput = document.querySelector(
  ".modal__input_type_description"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form"); //lets change #profile-edit-form to modal__form
//for some reason this changed the avatar? maybe there is a dif class for this in html

/* Gallery Elements */
/*export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild; //can take out
export const cardListEl = document.querySelector(".gallery__cards"); //can take out */

/* Add Button Elements */
export const addCardButton = document.querySelector(".profile__add-button");
export const addCardForm = document.querySelector("#add-card-form");
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardSubmit = addCardModal.querySelector(".modal__button");
//changed from addsubmitbutton to addcardsubmit to see if that changes anything
/* Preview Elements */
export const previewImage = document.querySelector(".modal__preview-image");
export const previewDescription = document.querySelector(
  ".modal__preview-description"
);

/* export const cardSelector = "#card-template"; //could take out */

/* Avatar Elements */
export const profileAvatarButton = document.querySelector(
  ".avatar__button" //#avatar-edit-button to .avatar__button, this makes the modal open, but it won't save
); //the avatar works now, it updates immediately when you hit submit 6.8.2024
export const profileAvatarModal = document.querySelector("#avatar-modal");
export const profileAvatarForm =
  profileAvatarModal.querySelector(".modal__form");

//all of the classes and ids seem fine in here 5.28.2024
