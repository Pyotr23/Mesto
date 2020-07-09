'use strict'
class Form {
    constructor() {
        this._view = this._createForm();
    }

    get view() {
        return this._view;
    }

    _createForm() {
        const form = document.createElement('form');
        form.classList.add('popup__form');
        form.setAttribute('novalidate', '');
        return form;
    }

    withSubmitButton(buttonText) {
        const button = this._createButton();
        button.textContent = buttonText;
        this._submitButton = button;
    }

    get submitButton() {
        return this._submitButton;
    }

    _createButton() {
        const button = document.createElement('button');
        button.classList.add('button');
        button.classList.add('popup__button');
        button.setAttribute('type', 'submit');
        button.setAttribute('disabled', '');
        return button;
    }

    withStringInputs(stringInputs) {
        this._stringInputs = stringInputs;
    }

    get stringInputs() {
        return this._stringInputs;
    }

    set stringInputs(stringInputs) {
        this._stringInputs = stringInputs;
    }

    render() {
        this._stringInputs.forEach(si => {
            this._view.appendChild(si.input);
            this._view.appendChild(si.error);
        })
        this._view.appendChild(this._submitButton);
    }
}
