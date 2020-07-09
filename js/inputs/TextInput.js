'use strict'
class TextInput extends StringInput {
    constructor(name, placeholder, textContent) {
        super(name, placeholder, textContent);
        this._input.setAttribute('type', 'text');
        this._input.setAttribute('minlength', '2');
        this._input.setAttribute('maxlength', '30');
    }
}