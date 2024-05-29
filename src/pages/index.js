//good to go 4.30

import Api from "../components/Api.js";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
//import PopUp from "../components/PopUp.js";
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
}); //

let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      { items: cards, renderer: renderCard },
      ".gallery__list "
    );
    section.renderItems();
  })
  .catch((error) => {
    console.error(error);
  }); //let's see if this format works better, okay error is gone now...

/*
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
    //something is wrong w/ catch
    console.error("Error fetching initial cards", error);
  }); //something is wrong w/ this and prepend? */

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      title: userData.title,
      description: userData.description,
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  titleSelector: ".modal__input_type_title",
  descriptionSelector: ".modal__input_type_description",
  avatarSelector: ".profile__image",
}); //make sure these selectors are correct, something wrong w/ userinfo

function handleImageClick({ name, link }) {
  popupWithImage.open(name, link);
} //

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLike
  );
  return card.getView();
} //

function handleProfileEditSubmit(data) {
  editModal.setLoading(true);
  api
    .updateUserInfo(data.title, data.description)
    .then((cards) => {
      userInfo.setUserInfo(cards);
      editModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModal.setLoading(false);
    });
} //

function handleAddCardSubmit(name, link) {
  addModal.setLoading(true);
  api
    .addCard(name, link)
    .then((cardData) => {
      //const name = name;
      //const link = link;
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
} //

function handleAvatarSubmit(url) {
  profileAvatarPopup.setLoading(true);
  api
    .updateAvatar(url)
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

const profileAvatarPopup = new PopUpWithForm(
  "#avatar-modal",
  handleAvatarSubmit,
  profileAvatarButton
);

profileAvatarButton.addEventListener("click", () => {
  profileAvatarPopup.open();
});
profileAvatarPopup.setEventListeners();

const editModal = new PopUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileEditButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  //const profileEditModal = userInfo.getUserInfo(); //profile info should be something else
  //editModal.setInputValues(profileEditModal); //maybe profileeditmodal instead of profileinfo?
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  editModal.open(); //think I'm on the right track for title and description
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

////////
//corrected editmodalpopup to editmodal
//corrected addmodalpopup to addmodal

//now need to get initial cards, avatar, forms, popup cards

/* function openPreviewModal(data) {
  previewImagePopup.open(data);
} */
