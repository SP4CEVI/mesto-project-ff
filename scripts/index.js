const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const deleteCard = (event) => {
    const elementDelete = event.target;
    elementDelete.closest(".places__item").remove();
}

const createCard = (element, {deleteCard}) => {
    const card = cardTemplate.cloneNode(true);
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");

    cardTitle.textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;

    const deleteButton = card.querySelector(".card__delete-button");

    deleteButton.addEventListener("click", (event) => {
        deleteCard(event);
    })

    return card;
}

initialCards.forEach((element) => {
    const card = createCard(element, {deleteCard});
    placesList.append(card);
});
