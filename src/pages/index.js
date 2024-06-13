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
//.getInitialCards()
Promise.all(initialCards)
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

//trying something new below
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      title: data.name,
      description: data.about,
    });
    userInfo.setAvatar({ avatar: data.avatar });
  })
  .catch((err) => {
    console.log(err);
  }); //yay it works!! 6.10

/* original
  api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      title: data.name,
      description: data.about,
      avatar: data.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  }); */

//something new below
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
} //edit modal allows you to update, but form reset not working
//fixed the form so it is blank when modal opens 6.8.2024

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
} //avatar updates but resets afters refreshing the page

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

/* original, still doesn't work 6.12
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
} */

//trying the like again 6.10, 6.11

function handleLike(cardId) {
  if (cardId.isLiked) {
    api
      .dislikeCard(cardId.id)
      .then(() => {
        cardId.handleLikeIcon();
        cardId.isLiked = false; //do I need to define 'isLiked'?
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (!cardId.isLiked) {
    api
      .likeCard(cardId.id)
      .then(() => {
        cardId.handleLikeIcon();
        cardId.isLiked = true;
      })
      .catch((err) => {
        console.error(err);
      });
  }
} //6.11 new version still isn't working, id isn't defined idk why

/*try new below
const likeButton = document.querySelector(".card__like-button");
const numberOfLikesElement = document.querySelector(".number-of-likes");

let numberOfLikes = Number.parseInt(numberOfLikesElement.textContent, 10);
let isLiked = false;

const handleLike = () => {
  if (!isLiked) {
    likeButton.classList.add("isLiked");
    numberOfLikes++;
    numberOfLikesElement.textContent = numberOfLikes;
    isLiked = !isLiked;
  } else {
    likeButton.classList.remove("isLiked");
    numberOfLikes--;
    numberOfLikesElement.textContent = numberOfLikes;
    isLiked = !isLiked;
  }
};

likeButton.addEventListener("click", likeClick);
*/

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
//avatar updates but doesn't save, let's find out why 6.10

const editModal = new PopUpWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
); //originally editModal but switched and it says it is already declared?
//maybe I should use something other than profile-edit-modal?
//let's try profile-edit-form instead 6.8.2024, nope!

profileEditButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  editModal.open();
});
editModal.setEventListeners();
//profileEditForm.reset();

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
