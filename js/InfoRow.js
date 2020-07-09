class InfoRow {
    constructor(key, value){        
        this._key = key;
        this._value = value;
        this._template = `<div class="info-row">
                            <span class="info-row__key"></span>
                            <span class="info-row__value"></span>
                          </div>`;
        this._view = this._createRow();
    }

    get view() {
        return this._view;
    }

    _createRow() {
        const element = document.createElement('div');        
        element.insertAdjacentHTML('afterbegin', this._template);
        const key = element.querySelector('.info-row__key');
        key.textContent = this._key + ':';
        const value = element.querySelector('.info-row__value');
        value.textContent = this._value;
        return element.firstChild;
    }
}