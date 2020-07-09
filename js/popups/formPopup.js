'use strict'
class FormPopup extends Popup {
    withForm(formContainer) {
        this._form = formContainer;
        this._content.appendChild(this._form);
    }

    get form() {
        return this._form;
    }

    get inputs() {
        const [...inputs] = this._form.elements;
        return inputs;
    }

    setSubmitEventListener(action) {
        this._form.addEventListener('submit', action);
    }

    setInputEventListener(action) {
        this._form.addEventListener('input', action);
    }
}
