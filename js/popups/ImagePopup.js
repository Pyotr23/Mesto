'use strict'
class ImagePopup extends Popup {
    withImage(link) {
        this._image = this._createImage(link);
        this._content.classList.add('popup__content_card-image');
        this._content.appendChild(this._image);
    }

    get image() {
        return this._image;
    }

    _createImage(link) {
        const image = this._createElement('img', 'popup__card-image');
        image.setAttribute('alt', '');
        image.setAttribute('src', link);
        return image;
    }
}