'use strict'
class Popup {
    constructor(parentNode) {        
        this._parentNode = parentNode;
        this._template =   `<div class="popup popup_is-opened">
                                <div class="popup__content-container">
                                    <img src="./images/close.svg" alt="" class="popup__close">
                                    <div class="popup__content">                                    
                                    </div>
                                </div>
                            </div>`;
        this._container = this._createPopup();
        this._content = this._container.querySelector('.popup__content');
        this._setCloseEventListener();
    }

    renderPopup() {
        this._parentNode.appendChild(this._container);
    }

    get container() {
        return this._container;
    }

    get content() {
        return this._content;
    }    

    withTitle(titleName) {
        const title = this._createTitle(titleName);
        this._content.appendChild(title);
    }

    withSubtitle(subtitleName) {
        const subtitle = this._createSubtitle(subtitleName);
        this._content.appendChild(subtitle);
    }

    close = () => {
        this._parentNode.removeChild(this._container);
    }

    _createTitle(titleName) {
        const titleElement = this._createElement('h3', 'popup__title');
        titleElement.textContent = titleName;
        return titleElement;
    }

    _createSubtitle(subtitleName) {
        const titleElement = this._createElement('h4', 'popup__subtitle');
        titleElement.textContent = subtitleName;
        return titleElement;
    }

    _createPopup() {
        const element = document.createElement('div');        
        element.insertAdjacentHTML('afterbegin', this._template.trim());
        return element.firstChild;
    }

    _createElement(htmlTag, className) {
        const element = document.createElement(htmlTag);
        element.classList.add(className);
        return element;
    }

    _setCloseEventListener() {
        const closeButton = this._container.querySelector('.popup__close');
        closeButton.addEventListener('click', this.close);
    }
}
