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

/* Elements */
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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".gallery__cards");

/* ------------------------------------------------------------------------------ */

/* Functions */

function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}
function handleprofileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value.trim();
  profileDescription.textContent = profileDescriptionInput.value.trim();
  closePopUp();
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  return cardElement;
}

/* ------------------------------------------------------------------------------ */

/* Event Listener */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditModal.classList.add("modal_opened");
}); /* this is fine */

profileEditCloseButton.addEventListener("click", () =>
  profileEditModal.classList.remove("modal_opened")
); /* this is fine */

profileEditSubmit.addEventListener("submit", () => {
  profileTitle.textContent = profileTitleInput.value.trim();
  profileDescription.textContent = profileDescriptionInput.value.trim();
  closeModal();
});

/* ------------------------------------------------------------------------------ */

/* For Each */

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
/* something here is affecting the gallery, pulls up 'undefined' 
too many cardData's*/

/* ------------------------------------------------------------------------------ */

/* Event Handlers */
profileEditForm.addEventListener("submit", handleprofileEditSubmit);