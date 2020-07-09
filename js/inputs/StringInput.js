'use strict'
class StringInput {
    constructor(name, placeholder, value) {
        this._name = name;
        this._placeholder = placeholder;
        this._value = value;
        this._input = this.createInput();
        this._error = this.createError();          
    }

    get input() {
        return this._input;
    }

    get error() {
        return this._error;
    }

    createInput() {
        const input = document.createElement('input');        
        input.classList.add('popup__input');
        input.setAttribute('required', '');
        input.setAttribute('name', this._name);
        input.setAttribute('placeholder', this._placeholder); 
        input.value = this._value;         
        return input;         
    }

    createError() {  
        const error = document.createElement('error');
        error.classList.add('error');
        error.setAttribute('id', `${this._name}-error`);         
        return error;  
    }
}