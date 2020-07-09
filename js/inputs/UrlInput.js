'use strict'
class UrlInput extends StringInput {
    constructor(name, placeholder, textContent) {
        super(name, placeholder, textContent);
        this._input.setAttribute('type', 'url');
    }
}