export const openPopup = (element) => {
    element.classList.add("popup_is-opened");
    element.classList.add("popup_is-animated"); 
  
    const buttonClosePopup = element.querySelector(".popup__close");
  
    const clickClose = () => {
      closePopup(element);
    }
    
    buttonClosePopup.addEventListener("click", clickClose);
    
    const clickOverlay = (evt) => {
      if (evt.target === element) closePopup(element);
    }
  
    element.addEventListener("click", clickOverlay);

    document.addEventListener("keydown", handleKeyEscape);
  
    element._handleCloseClick = clickClose;
    element._handleOverlayClick = clickOverlay;
}

const handleKeyEscape = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    }
}  

export const closePopup = (element) => {
    element.classList.remove("popup_is-opened");
    element.classList.remove("popup_is-animated"); 
  
    const buttonClosePopup = element.querySelector(".popup__close");
  
    buttonClosePopup.removeEventListener("click",  element._handleCloseClick);
    element.removeEventListener("click", element._handleOverlayClick);
    document.removeEventListener("keydown", handleKeyEscape);
  
    delete element._handleCloseClick
    delete element._handleOverlayClick
  }
  
