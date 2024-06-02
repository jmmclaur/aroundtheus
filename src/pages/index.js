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
}); //

let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: (data) => {
          const cardEl = renderCard(data); //cardData to data
          section.addItem(cardEl);
        },
      },
      ".gallery__cards"
    );
    section.renderItems();
  })
  .catch((error) => {
    console.log(error);
  }); //let's see if this format works better, okay error is gone now...

//okay rendering the cards is correct now, let's fix the add card submit!

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      title: data.title,
      description: data.description,
      avatar: data.avatar,
    }); //lets try it w/ data instead of userData
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  titleSelector: ".modal__input_type_title",
  descriptionSelector: ".modal__input_type_description",
  avatarSelector: "#avatar-picture", //.profile__image to #avatar-picture, yep now it's there but you still can't edit it, let's see why
}); //make sure these selectors are correct, something wrong w/ userinfo

function handleImageClick({ name, link }) {
  popupWithImage.open(name, link);
} //

function renderCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLike
  );
  return card.getView();
} //cardData to data

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

function handleAddCardSubmit(name, url) {
  addModal.setLoading(true);
  api
    .addCard(name, url)
    .then((data) => {
      //const name = name;
      //const link = link;
      const card = renderCard(data); //cardData to data
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
  profileAvatarPopUp.setLoading(true);
  api
    .updateAvatar(url) //userData to data, url to link << flip is around
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
} //this section has an error w/ deleting the card

function handleLike(cardId) {
  if (cardId._isLiked) {
    api
      .dislikeCard(cardId._id)
      .then(() => {
        cardId.handleLikeIcon(); //likeIcon to like
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
        cardId.handleLikeIcon(); //likeIcon to like
        cardId._isLiked = true;
      })
      .catch((err) => {
        console.error(err);
      });
  }
} //this section has an error w/ liking

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
