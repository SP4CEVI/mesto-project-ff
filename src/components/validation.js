const showError = (formElement, inputField, errorMessage, config) => {
  const errorField = formElement.querySelector(`.${inputField.id}-error`);

  inputField.classList.add(config.inputErrorClass);
  errorField.textContent = errorMessage;
  errorField.classList.add(config.errorClass);
};

const hideError = (formElement, inputField, config) => {
  const errorField = formElement.querySelector(`.${inputField.id}-error`);

  inputField.classList.remove(config.inputErrorClass);
  errorField.classList.remove(config.errorClass);

  errorField.textContent = "";
};

const validateField = (formElement, inputField, config) => {
  if (inputField.validity.patternMismatch) {
    inputField.setCustomValidity(inputField.dataset.errorMessage);
  } else {
    inputField.setCustomValidity("");
  }

  if (!inputField.validity.valid) {
    showError(formElement, inputField, inputField.validationMessage, config);
  } else {
    hideError(formElement, inputField, config);
  }
};

const invalidInput = (inputList) => {
  return inputList.some((inputField) => !inputField.validity.valid);
};

export const updateButtonStatus = (inputList, button, config) => {
  if (invalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListener = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const button = formElement.querySelector(config.submitButtonSelector);

  updateButtonStatus(inputList, button, config);

  inputList.forEach((inputField) => {
    inputField.addEventListener("input", () => {
      validateField(formElement, inputField, config);
      updateButtonStatus(inputList, button, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListener(formElement, config);
  });
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const button = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputField) => {
    hideError(formElement, inputField, config);
  });
  updateButtonStatus(inputList, button, config);
};
