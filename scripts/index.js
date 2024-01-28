const initialCards = [
  {
    name: "Rocky Mountain National Park",
    link: "https://media.istockphoto.com/id/478656454/photo/maroon-bells-autumn-aspen-trees-lake-reflections-aspen-colorado.jpg?s=1024x1024&w=is&k=20&c=CrZVgb_84cwGhfGZwFFcDXZqSx9dLvCTMfy-oBXJKYU=",
  },
  {
    name: "Breckenridge",
    link: "https://media.istockphoto.com/id/1276445053/photo/breckenridge-colorado-usa-in-winter.jpg?s=1024x1024&w=is&k=20&c=-sZ8OKxjprRniFEYepOl0oBAOyP8bIohcwPNTzNzHVo=",
  },
  {
    name: "Frisco",
    link: "https://media.istockphoto.com/id/1097392008/photo/friends-hiking-in-the-muntains-on-winter-break.jpg?s=1024x1024&w=is&k=20&c=B6fiAv_Q9EJSsu8n4O_7J3p7HdTZGE0OtHFwJjEgeDY=",
  },
  {
    name: "Estes Park",
    link: "https://media.istockphoto.com/id/506187637/photo/north-american-elks.jpg?s=1024x1024&w=is&k=20&c=7Xx_HwEZu_FBzvn96jb75BrrO8i1H87Vu319_HsQQbc=",
  },
  {
    name: "Maroon Bells",
    link: "https://media.istockphoto.com/id/185850441/photo/maroon-bell-mountains.jpg?s=1024x1024&w=is&k=20&c=Kd0JaITNN87nUbBWMa6FojI6j23HnBMVQvaMKMUpXN8=",
  },
  {
    name: "Longs Peak",
    link: "https://media.istockphoto.com/id/914687774/photo/full-moon-in-longmont.jpg?s=1024x1024&w=is&k=20&c=K9XXTxZugTxlaS5w0OBtwCQhqtIIowMOZfpu1E4OkLQ=",
  },
];

console.log(initialCards);

/* Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").textContent.firstElementChild;
const cardListE1 = document.querySelector(".gallery__cards");

function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileName.textContent = "replacement name content";
  profileDescriptionInput.value = profileDescription.textContent;
  profileDescriptionInput.textContent = "replacement description content";
  profileEditModal.classList.add("modal_opened");
  console.log("button clicks");
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp();
});

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListE1.append(cardElement);
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageE1 = cardElement.querySelector(".card__image");
  const cardTextE1 = cardElement.querySelector(".card__text");
  cardTextE1.textContent = data.name;
  cardImageE1.src = data.link;
  cardImageE1.alt = data.name;
  return cardElement;
}
