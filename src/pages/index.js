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
import PopUpWithConfirmation from "../components/PopUpWithConfirmation.js";

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

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "f0969997-b1fb-4c1c-9062-68f00b8d62d1",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  "#gallery__cards"
);
cardSection.renderItems();

let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const sectionCard = renderCard(cardData);
          section.addItem(sectionCard);
        },
      },
      ".gallery__list "
    );
    section.renderItems();
  })
  .catch((error) => {
    console.error("Error fetching initial cards", error);
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
  profileTitle: ".modal__input_type_title",
  profileDescription: ".modal__input_type_description",
  avatarSelector: ".profile__image",
});

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

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLike
  );
  return card.getView();
}

function handleProfileEditSubmit({ title, description }) {
  editModal.setLoading(true);
  api
    .updateUserInfo(title, description)
    .then(() => {
      userInfo.setUserInfo({ title: title, description: description });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModal.setLoading(false);
      editModal.close();
    });
}

/*
function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({
    title: data.title,
    description: data.description,
  });
  profileEditModal.close();
} //good */

function handleAddCardSubmit(data) {
  addModal.setLoading(true);
  api
    .addCard(data)
    .then((cardData) => {
      //const name = data.name;
      //const link = data.link;
      const card = renderCard(cardData);
      section.addItem(card);
      addModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addModal.setLoading(false);
    });
}

function handleImageClick({ name, link }) {
  popupWithImage.open(name, link);
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

function handleAvatarSubmit(link) {
  profileAvatarPopup.setLoading(true);
  api
    .updateAvatar(link)
    .then((userData) => {
      userInfo.setAvatar(userData);
      profileAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatarPopup.setLoading(false);
    });
}

function handleLike(cardId) {
  if (cardId._isLiked) {
    api
      .dislikeCard(cardId._id)
      .then(() => {
        cardId.handleLikeIcon();
        cardId._isLiked = false;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (!cardId._isLiked) {
    api
      .likeCard(cardId._id)
      .then(() => {
        cardId.handleLikeIcon();
        cardId._isLiked = true;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

profileEditButton.addEventListener("click", () => {
  editModal.open();
  const profileInfo = userInfo.getUserInfo();
  editModal.setInputValues(profileInfo);
  profileEditFormValidator.resetValidation();
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

const avatarFormValidator = new FormValidator(config, profileAvatarForm);
avatarFormValidator.enableValidation();

const profileAvatarPopup = new PopUpWithForm(
  "#profile-avatar-modal",
  handleAvatarSubmit,
  profileAvatarButton
);

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addModal.open();
});
addModal.setEventListeners();

/*
addCardButton.addEventListener("click", () => {
  addModal.open();
}); */

profileAvatarButton.addEventListener("click", () => {
  profileAvatarPopup.open();
});
profileAvatarPopup.setEventListeners();

const popupWithImage = new PopUpWithImage("#preview-card-modal");
popupWithImage.addEventListeners();

const cardDeletePopup = new PopUpWithConfirmation("#delete-card-modal");
cardDeletePopup.setEventListeners();

//old stuff below can be cut out
//refactored to make everything look nicer, now see what's being called and what's not
//5.26.2024
