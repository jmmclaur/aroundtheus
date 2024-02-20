const initialCards = [
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
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditSubmit = profileEditModal.querySelector("#edit-save-button");

/* Gallery Elements */
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".gallery__cards");
/* const addCardSubmit = addNewCardModal.querySelector("#add-save-button");
const addNewCardModal = document.querySelector("#profile-add-modal"); it doesn't work w/ these */

/* Add Button Elements */
const addCardForm = document.querySelector(".modal__card-form");
const addCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addNewCardModal.querySelector(".modal__close");

/* Card Form Element */
const cardPlaceInput = document.querySelector("#card-place-input");
const cardLinkInput = document.querySelector("#card-link-input");
/* new below */ const previewModal = document.querySelector("#preview-modal");
const modalPreviewImageElement = document.querySelector(
  ".modal__preview_image"
);
const trashCardButton = document.querySelector(".card__trash-button");
const trashCardCloseButton = document.querySelector(".trash-button");

/* ------------------------------------------------------------------------------ */

/* Edit Functions */
function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value.trim();
  profileDescription.textContent = profileDescriptionInput.value.trim();
  closePopUp(profileEditModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}

/* Card Functions */
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  /* new below, preview image still isn't popping up, trash button doesn't delete yet */
  function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(".card__title").textContent = cardData.place;
    const imageEl = cardElement.querySelector(".card__image");
    imageEl.style.backgroundImage = "url(${cardData.link})";

    imageEl.addEventListener("click", function () {
      modalPreviewImageElement.src = cardData.link;
      previewPicture({
        link: cardData.link,
        place: cardData.name,
      });
    });

    const cardDeleteButton = cardElement.querySelector(".card__trash-button");
    console.log(deleteButton);
    cardDeleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  return cardElement;
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const place = cardPlaceInput.value;
  const link = cardLinkInput.value;
  renderCard({ place, link }, cardListEl);
  closeModal(addNewCardModal);
}

function toggleModalWindow(modal) {
  modal.classList.toggle("modal_opened");
}

function renderCard(cardData, container) {
  container.prepend(cardData);
} /* new */

/* function previewPicture({ place, link }) {
  previewModal.classList.add("modal_opened");
} maybe take this out */
/* ------------------------------------------------------------------------------ */

/* Event Listener */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditModal.classList.add("modal_opened");
});
profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

addCardCloseButton.addEventListener("click", () => closeModal(addNewCardModal));
addCardButton.addEventListener("click", () => openModal(addNewCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

/* ------------------------------------------------------------------------------ */

/* Event Handler */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

/* ------------------------------------------------------------------------------ */

/* For Each */
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

/* ------------------------------------------------------------------------------ */
