//good to go 4.30

import Api from "../components/Api.js";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopUp from "../components/PopUp.js";
import PopUpWithForm from "../components/PopUpWithForm.js";
import Section from "../components/Section.js";
import {
  //initialCards,
  config,
  profileEditButton,
  profileEditModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  cardTemplate,
  cardListEl,
  addCardButton,
  addCardForm,
  addCardModal,
  addCardSubmit,
  previewImage,
  previewDescription,
  cardSelector,
  profileAvatarButton,
  profileAvatarModal,
  profileAvatarForm,
} from "../utils/constant.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithConfirmation from "../components/PopUpWithConfirmation.js";

//what if for addsubmitbutton we change to addcardsubmit? and same for the edit submit
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

api
  .getInitialCards()
  .then((cards) => {
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
  })
  .catch((error) => {
    console.log(error);
  });

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.this._title,
      about: data.description,
      avatar: data.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  }); //changing all title/description to name/about

const userInfo = new UserInfo({
  nameSelector: "#profile-title-input",
  aboutSelector: "#profile-description-input",
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
  return card.getView();
}

function handleProfileEditSubmit({ title, description }) {
  editModal.setLoading(true);
  api
    .setUserInfo(title, description) //so I need to set something for setUserInfo
    .then(() => {
      userInfo.setUserInfo({
        name: title,
        about: description,
      });
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

function handleAvatarSubmit(link) {
  profileAvatarPopUp.setLoading(true);
  api
    .updateAvatar(link)
    .then((data) => {
      userInfo.setAvatar(data);
      profileAvatarPopUp.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatarPopUp.setLoading(false);
    });
}

function handleDeleteCard(cardId) {
  cardDeletePopUp.open();
  cardDeletePopUp.setSubmitAction(() => {
    cardDeletePopUp.setLoading(true, "Deleting...");
    api
      .deleteCard(cardId)
      .then(() => {
        this.handleDeleteCard();
        cardDeletePopUp.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeletePopUp.setLoading(false, "Yes");
      });
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
  const { title, description } = userInfo.getUserInfo();
  profileTitleInput.value = title;
  profileDescriptionInput.value = description;
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
