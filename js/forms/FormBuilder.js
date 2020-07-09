'use strict'
class FormBuilder {
    constructor(form) {
        this._form = form;
    }

    withSubmitButton(buttonText) {
        this._form.withSubmitButton(buttonText);
    }

    withStringInputs(stringInputs) {
        this._form.stringInputs = stringInputs;
    }

    render() {
        this._form.render();
    }

    get form() {
        return this._form;
    }
}
