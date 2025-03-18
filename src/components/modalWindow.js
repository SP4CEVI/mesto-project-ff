export const openPopup = (popupElement) => {
  popupElement.classList.add("popup_is-opened");

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
