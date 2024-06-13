//good to go 4.30, submission attempt Sprint 9 #1 6.5.2024

import Api from "../components/Api.js";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopUp from "../components/PopUp.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import Section from "../components/Section.js";
import {
  initialCards,
  config,
  profileEditButton,
  profileEditModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  //cardTemplate,
  //cardListEl,
  addCardButton,
  addCardForm,
  addCardModal,
  addCardSubmit,
  previewImage,
  previewDescription,
  //cardSelector,
  profileAvatarButton,
  profileAvatarModal,
  profileAvatarForm,
  cardDeleteButton,
  cardDeleteModal,
  cardDeleteForm,
} from "../utils/constant.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithConfirmation from "../components/PopUpWithConfirmation.js";

/* ------------------------------------------------------------------------------ */
/* API */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bba6e655-3c43-4bc9-84b1-5706718b60cd",
    "Content-Type": "application/json",
  },
});

let section;

api;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cards, data]) => {
    section = new Section(
      {
        items: cards,
        renderer: (data) => {
          const cardEl = renderCard(data);
          section.addItem(cardEl);
        },
      },
      ".gallery__cards"
    );
    section.renderItems();

    userInfo.setUserInfo({
      title: data.name,
      description: data.about,
    });

    userInfo.setAvatar({ avatar: data.avatar });
  }
);

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

function handleImageClick({ name, link }) {
  popupWithImage.open(name, link);
}

function renderCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLike
  );
  console.log(card);
  return card.getView();
}

function handleProfileEditSubmit({ title, description }) {
  editModal.setLoading(true);
  api
    .setUserInfo(title, description)
    .then(() => {
      userInfo.setUserInfo({ name: title, about: description });
      editModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModal.setLoading(false);
    });
}

function handleAddCardSubmit(name, url) {
  addModal.setLoading(true);
  api
    .addCard(name, url)
    .then((data) => {
      const card = renderCard(data);
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

function handleAvatarSubmit(url) {
  profileAvatarPopUp.setLoading(true);
  api
    .updateAvatar(url)
    .then((data) => {
      userInfo.getAvatar(data);
      profileAvatarPopUp.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatarPopUp.setLoading(false);
    });
}

function handleDeleteCard(card) {
  cardDeletePopUp.open();
  cardDeletePopUp.setSubmitAction(() => {
    cardDeletePopUp.setLoading(true, "Deleting...");
    api
      .deleteCard(card.id)
      .then(() => {
        card.handleDeleteCard();
        cardDeletePopUp.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeletePopUp.setLoading(false, "Yes");
      });
  });
} //fixed the delete!!!

function handleLike(cardInstance) {
  if (cardInstance.isLiked) {
    api
      .dislikeCard(cardInstance.id)
      .then(() => {
        cardInstance.handleLikeIcon();
        cardInstance.isLiked = false;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (!cardInstance.isLiked) {
    api
      .likeCard(cardInstance.id)
      .then(() => {
        cardInstance.handleLikeIcon();
        cardInstance.isLiked = true;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, profileAvatarForm);
avatarFormValidator.enableValidation();

const profileAvatarPopUp = new PopUpWithForm(
  "#avatar-modal",
  handleAvatarSubmit,
  profileAvatarButton
);

profileAvatarButton.addEventListener("click", () => {
  profileAvatarPopUp.open();
});
profileAvatarPopUp.setEventListeners();

const editModal = new PopUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileEditButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  editModal.open();
});
editModal.setEventListeners();

const addModal = new PopUpWithForm("#add-card-modal", handleAddCardSubmit);

addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addModal.open();
});
addModal.setEventListeners();

const popupWithImage = new PopUpWithImage("#modal-preview");
popupWithImage.addEventListeners();

const cardDeletePopUp = new PopUpWithConfirmation("#delete-modal");
cardDeletePopUp.setEventListeners();
