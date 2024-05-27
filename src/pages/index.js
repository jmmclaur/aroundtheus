//good to go 4.30, 5.19
import Api from "../components/Api.js";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constant.js";
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

/* Avatar Elements */
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const profileAvatarModal = document.querySelector("#avatar-modal");
const profileAvatarForm = profileAvatarModal.querySelector(".modal__form");

/* ------------------------------------------------------------------------------ */
/* API */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    authorization: "f0969997-b1fb-4c1c-9062-68f00b8d62d1",
    "Content-Type": "application/json",
  },
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  "#gallery__cards"
);
cardSection.renderItems();

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((card) => renderCard(card));
  })
  .catch((error) => {
    console.error(error);
  });

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      title: data.title,
      description: data.description,
      avatar: data.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  profileTitle: ".modal__input_type_title", //modal__input_type_title
  profileDescription: ".modal__input_type_description", //modal__input_type_description
  avatarSelector: ".profile__image",
}); //good

const editModal = new PopUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  config
);

const addModal = new PopUpWithForm(
  "#add-card-modal",
  handleAddCardSubmit,
  config
);

editModal.setEventListeners();
addModal.setEventListeners();

const previewCardModal = new PopUpWithImage("#modal-preview");
previewCardModal.setEventListeners();

export function renderCard(cardData) {
  const card = new Card(
    cardData,
    handleImageClick,
    handleDeleteCard,
    "#card-template"
  );
  const cardEl = card.getView();
  cardSection.addItem(cardEl);
}

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({
    title: data.title,
    description: data.description,
  });
  profileEditModal.close();
} //good

function handleAddCardSubmit(data) {
  const name = data.name;
  const link = data.link;
  const newCard = renderCard({ name, link });
  cardSection.addItem(newCard);
  addModal.close();
}

function handleImageClick({ name, link }) {
  PopUpWithImage.open(name, link);
}

function handleDeleteCard(cardId) {
  cardDeletePopup.open();
  cardDeletePopup.setSubmitAction(() => {
    cardDeletePopup.setLoading(true, "Deleting...");
    api
      .deleteCard(cardId)
      .then(() => {
        this.handleDeleteCard();
        cardDeletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeletePopup.setLoading(false, "Yes");
      });
  });
}

profileEditButton.addEventListener("click", () => {
  editModal.open();
  const profileInfo = userInfo.getUserInfo();
  editModal.setInputValues(profileInfo);
  profileEditFormValidator.resetValidation();
});

profileAddButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopUp.open();
});

addCardButton.addEventListener("click", () => {
  addModal.open();
});

const forms = document.querySelectorAll(config.formSelector);

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});

const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

/*
const confirmModal = new PoppWithConfirmation("#confirm-delete-modal");
confirmModal.setEventListeners(); */

//old stuff below can be cut out
//refactored to make everything look nicer, now see what's being called and what's not
//5.26.2024
