'use strict'
class FormValidator {
    constructor(form) {
        this._formView = form.view;
        this._button = form.submitButton;
        this._errorMessages = {
            empty: 'Это обязательное поле',
            wrongLength: 'Должно быть от 2 до 30 символов',
            wrongUrl: 'Здесь должна быть ссылка',
            wrongPattern: 'Введите данные в верном формате'
        }
    }

    _checkInputsValidity() {
        const [...inputs] = this._formView.elements;
        return inputs.every(this._isValidate);
    }

    _isValidate = (input) => {
        input.setCustomValidity("");

        if (input.validity.valueMissing) {
          input.setCustomValidity(this._errorMessages.empty);
          return false
        }

        if (input.validity.tooShort || input.validity.tooLong) {
          input.setCustomValidity(this._errorMessages.wrongLength);
          return false
        }

        if (input.validity.typeMismatch && input.type === 'url') {
          input.setCustomValidity(this._errorMessages.wrongUrl);
          return false
        }

        return input.checkValidity();
    }

    handleInput(event) {
        this._setErrorContent(event.target);
        this.setSubmitButtonState();
    }

    _setErrorContent(input) {
        this._isValidate(input);
        const errorElement = this._formView.querySelector(`#${input.name}-error`);
        errorElement.textContent = input.validationMessage;
    }

    setSubmitButtonState() {
        if (this._checkInputsValidity()) {
            this._button.removeAttribute('disabled');
            this._button.classList.add('popup__button_is-active');
        }
        else {
            this._button.setAttribute('disabled', '');
            this._button.classList.remove('popup__button_is-active');
        }
    }
}
