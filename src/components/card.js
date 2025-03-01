export const createCard = (element, openImagePopup) => {
    const templates = document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(true);
  
    const cardTitle = templates.querySelector(".card__title");
    const cardImage = templates.querySelector(".card__image");
  
    cardTitle.textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;
    
    const deleteButton = templates.querySelector(".card__delete-button");
  
    deleteButton.addEventListener("click", () => {
      const removeElement = deleteButton.closest(".places__item");
      removeElement.remove();
    });

    const buttonLike = templates.querySelector(".card__like-button");
    
    if (buttonLike) {
      buttonLike.addEventListener("click", clickLike);
    }
  
    cardImage.addEventListener("click", () => openImagePopup(element));
  
    return templates;
};
  
const clickLike = (evt) => {
  if (evt.target && evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
};