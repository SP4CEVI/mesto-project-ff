import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modalWindow.js";

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const saveProfileChanges = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupFormEditProfile = popupEditProfile.querySelector(".popup__form");
const inputName = popupFormEditProfile.querySelector(".popup__input_type_name");
const inputDescription = popupFormEditProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupAddCard = document.querySelector(".popup_type_new-card");

const openImagePopup = (element) => {
  const popupImage = document.querySelector(".popup_type_image");
  const imageContent = popupImage.querySelector(".popup__image");
  const imageCaption = popupImage.querySelector(".popup__caption");

  imageContent.src = element.link;
  imageContent.alt = element.link;
  imageCaption.textContent = element.name;

  openPopup(popupImage);
};

const addTemplates = (cards) => {
  cards.forEach((element) => {
    const templates = createCard(element, openImagePopup);
    placesList.append(templates);
  });
}

addTemplates(initialCards);

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const popupElement = evt.target.closest(".popup");
  const nameValue = inputName.value;
  const descriptionValue = inputDescription.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closePopup(popupElement);
}

popupFormEditProfile.addEventListener("submit", handleFormSubmit);

saveProfileChanges.addEventListener("click", () => openPopup(popupAddCard));

editProfileButton.addEventListener("click", () => {
  openPopup(popupEditProfile, profileTitle, profileDescription, inputName, inputDescription);

  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  
  openPopup(popupEditProfile);
});

const formNewCard = popupAddCard.querySelector(".popup__form");
const nameNewCard = formNewCard.querySelector(".popup__input_type_card-name");
const linkNewCard = formNewCard.querySelector(".popup__input_type_url");

const newCardForm = (evt) => {
    evt.preventDefault();

    const newCard = {
        name: nameNewCard.value,
        link: linkNewCard.value,
    };

    const card = createCard(newCard, openImagePopup);
    placesList.prepend(card);
    formNewCard.reset();
    closePopup(popupAddCard);
}

formNewCard.addEventListener("submit", newCardForm)
