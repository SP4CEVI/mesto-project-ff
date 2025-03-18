import { updateButtonStatus } from "./validation";

export const openPopup = (popupElement, config) => {
  popupElement.classList.add("popup_is-opened");

  const inputList = Array.from(popupElement.querySelectorAll("input"));
  
  if (inputList.length > 0) {
    const button = popupElement.querySelector(".popup__button");
    updateButtonStatus(inputList, button, config);
  }

  document.addEventListener('keydown', handlekeyEscape);
}

export const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_is-opened");

  document.removeEventListener('keydown', handlekeyEscape);
}

const handlekeyEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
