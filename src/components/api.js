const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-34",
  headers: {
  authorization: "31ce7c2e-7f97-431b-842d-d4f07e8dff16",
    "Content-Type": "application/json",
  },
};

export const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

export const editProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};

export const updateProfileAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.log(err);
    });
};