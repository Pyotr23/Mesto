'use strict'
class UserInfo {
    constructor(container, api) {
        this._container = container;
        this._api = api;
        this._setElements();
        this.load();
    }

    _setElements() {
        this._nameElement = this._container.querySelector('.user-info__name');
        this._jobElement = this._container.querySelector('.user-info__job'); 
        this._photoElement = this._container.querySelector('.user-info__photo');    
    }

    load() {     
        this._api.getUserInfo()
        .then(dto => this._set(dto))
        .catch(err => console.log(err));        
    }

    _set(dto) {            
        this._dto = dto;
        this.render();
    }

    update = (dto, closePopup) => {          
        this._api.updateUserInfo(dto)
        .then(() => this._api.updateUserPhoto(dto.avatar))
        .then(newUserInfo => this._set(newUserInfo))         
        .catch(err => console.log(err))
        .finally(closePopup);              
    }

    _isChangeDescription(dto) {
        return dto.name !== this._dto.name || dto.avatar !== this._dto.avatar
    }

    setPhoto(link) {        
        this._user.avatar = link;
    }

    get name() {
        return this._dto ? this._dto.name : '';        
    }

    get about() {
        return this._dto ? this._dto.about : '';         
    } 
    
    get avatar() {
        return this._dto ? this._dto.avatar : '';         
    }   
    
    get id() {
        return this._dto ? this._dto._id : '';       
    }

    render() {           
        this._nameElement.textContent = this._dto.name;
        this._jobElement.textContent = this._dto.about;
        this._photoElement.style.backgroundImage = `url(${this._dto.avatar})`;
    }
}
