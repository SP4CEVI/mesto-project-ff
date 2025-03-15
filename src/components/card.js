import { addLike, deleteLike, deleteCard } from "./api.js";

const handleLike = (cardId, likeButton, counter) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    deleteLike(cardId)
      .then((newItem) => {
        likeButton.classList.remove("card__like-button_is-active");
        counter.textContent = newItem.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка при удалении лайка:", err);
      });
  } else {
    addLike(cardId)
      .then((newItem) => {
        likeButton.classList.add("card__like-button_is-active");
        counter.textContent = newItem.likes.length;
      })
      .catch((err) => {
        console.log("Ошибка при добавлении лайка:", err);
      });
  }
}

const buttonClick = (evt) => {
  const likeButton = evt.target;
  const cardElement = likeButton.closest('.places__item');
  const counter = cardElement.querySelector('.card_like-counter');
  const cardId = cardElement.dataset.cardId;

  handleLike(cardId, likeButton, counter);
}

export const createCard = (element, openImagePopup, userId) => {
  const templates = document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(true);

  templates.dataset.cardId = element._id;

  const cardTitle = templates.querySelector(".card__title");
  const cardImage = templates.querySelector(".card__image");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  const buttonLike = templates.querySelector(".card__like-button");
  const counter = templates.querySelector(".card_like-counter");

  counter.textContent = element.likes.length;

  if (element.likes.some((like) => like._id === userId)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", buttonClick);

  const deleteButton = templates.querySelector(".card__delete-button");

  if (element.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", () => {
    deleteCard(element._id)
      .then(() => {
        templates.remove();
      })
      .catch((err) => {
        console.log("Ошибка при удалении карточки:", err);
      });
  });

  cardImage.addEventListener("click", () => openImagePopup(element));

  return templates;
}
