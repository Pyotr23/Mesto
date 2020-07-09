'use strict'
class FormDirector {
    constructor(formBuilder) {
        this._formBuilder = formBuilder;
    }

    getForm(stringInputs, buttonText) {        
        this._formBuilder.withStringInputs(stringInputs);
        this._formBuilder.withSubmitButton(buttonText);
        this._formBuilder.render();
        return this._formBuilder.form;
    }
}
