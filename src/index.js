import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modalWindow.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getProfileInfo, getCards, editProfileInfo, addNewCard, updateProfileAvatar } from "./components/api.js";

const popups = document.querySelectorAll('.popup');

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const buttonSaveProfileChanges = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupFormEditProfile = popupEditProfile.querySelector(".popup__form");
const inputName = popupFormEditProfile.querySelector(".popup__input_type_name");
const inputDescription = popupFormEditProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupAddCard = document.querySelector(".popup_type_new-card");

let userId;

const profileAvatar = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
const inputAvatarLink = formEditAvatar.querySelector("#input_avatar-link");

const profileImage = document.querySelector(".profile__image");

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');

  const buttonClosePopup = popup.querySelector('.popup__close');
  if (buttonClosePopup) buttonClosePopup.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) closePopup(popup);
  });
});

enableValidation(validationConfig);

Promise.all([getProfileInfo(), getCards()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileAvatar.style.backgroundImage = `url(${profile.avatar})`;
    userId = profile._id;

    cards.forEach((element) => {
      const templates = createCard(element, openImagePopup, userId);
      placesList.append(templates);
    });
  })
  .catch((err) => {
    console.log("Ошибка в Promise.all", err);
  });

  const popupImage = document.querySelector(".popup_type_image");
  const imageContent = popupImage.querySelector(".popup__image");
  const imageCaption = popupImage.querySelector(".popup__caption");

const openImagePopup = (element) => {
  imageContent.src = element.link;
  imageContent.alt = element.link;
  imageCaption.textContent = element.name;

  openPopup(popupImage);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const button = popupFormEditProfile.querySelector(".popup__button");
  const buttonText = button.textContent;

  button.textContent = "Сохранение...";

  editProfileInfo(inputName.value, inputDescription.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных профиля:", err);
    })
    .finally(() => {
      button.textContent = buttonText;
    });
};

popupFormEditProfile.addEventListener("submit", handleProfileFormSubmit);
buttonSaveProfileChanges.addEventListener("click", () => openPopup(popupAddCard));

editProfileButton.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;

  clearValidation(popupFormEditProfile, validationConfig);

  openPopup(popupEditProfile);
});

profileAvatar.addEventListener("click", () => openPopup(popupEditAvatar));

formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const avatarLink = inputAvatarLink.value;
  const button = formEditAvatar.querySelector(".popup__button");
  const buttonText = button.textContent;

  button.textContent = "Сохранение...";

  updateProfileAvatar(avatarLink)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;

      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      button.textContent = buttonText;
    });
});

const formNewCard = popupAddCard.querySelector(".popup__form");
const nameNewCard = formNewCard.querySelector(".popup__input_type_card-name");
const linkImageNewCard = formNewCard.querySelector(".popup__input_type_url");

const toggleButtonState = (popupElement, config) => {
  const formElement = popupElement.querySelector(".popup__form");
  const button = formElement.querySelector(config.submitButtonSelector);
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
}

const addNewCardForm = (evt) => {
  evt.preventDefault();

  const button = formNewCard.querySelector(".popup__button");
  const buttonText = button.textContent;

  button.textContent = "Сохранение...";

  addNewCard(nameNewCard.value, linkImageNewCard.value)
    .then((data) => {
      const element = createCard(data, openImagePopup, userId);
      placesList.prepend(element);

      formNewCard.reset();
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log("Ошибка добавления карточки:", err);
    })
    .finally(() => {
      button.textContent = buttonText;
      toggleButtonState(popupAddCard, validationConfig);
    });
}

formNewCard.addEventListener("submit", addNewCardForm);
