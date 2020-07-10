import './style.css'
import UserInfo from './js/UserInfo'
import CardList from './js/cardList'
import FormValidator from './js/FormValidator'
import Api from './js/Api'
import FormPopup from './js/popups/formPopup'
import ImagePopup from './js/popups/ImagePopup'
import InfoPopup from './js/popups/InfoPopup'
import PopupDirector from './js/popups/popupDirector'
import TextInput from './js/inputs/TextInput'
import UrlInput from './js/inputs/UrlInput'
import Form from './js/forms/Form'
import FormBuilder from './js/forms/FormBuilder'
import FormDirector from './js/forms/FormDirector'
import Card from './js/cards/Card'
import OwnCard from './js/cards/OwnCard'

(function () {
  'use strict';
  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: '24e96659-b7fc-4d52-a3f3-ac251a10cc64',
      'Content-Type': 'application/json'           
    }
  });
  const rootContainer = document.querySelector('.root');  
  const userInfo = new UserInfo(document.querySelector('.user-info'), api);
  const selectOwners = document.querySelector('.card-filter__select');
  const cardList = new CardList(document.querySelector('.places-list'), api, createCard, selectOwners);
  const openAddCardPopupButton = document.querySelector('.user-info__button');
  const editUserButton = document.querySelector('.button_place_user-info');  
  
  const showImage = (url) => {
    const imagePopup = new ImagePopup(rootContainer);    
    const popupDirector = new PopupDirector();
    popupDirector.renderImagePopup(url, imagePopup);
  }

  const showLikesTimeout = (event, dto) => setTimeout(showLikesPopup, 1500, event, dto); 
  
  const showLikesPopup = (event, dto) => {
    event.stopPropagation();
    if (dto.likes.length === 0)
      return;
    const infoPopup = new InfoPopup(rootContainer);    
    const popupDirector = new PopupDirector();
    popupDirector.renderLikesPopup(dto, infoPopup);    
  }

  const openCardInfo = (event, dto) => {    
    const infoPopup = new InfoPopup(rootContainer);    
    const popupDirector = new PopupDirector();
    popupDirector.renderInfoPopup(dto, infoPopup);
    event.stopPropagation();
  }

  const openAddCardPopup = () => {
    const form = new Form();
    const submitButtonText = '+';
    const stringInputs = [ new TextInput('name', 'Название', ''), new UrlInput('link', 'Ссылка на картинку', '') ];
    const formBuilder = new FormBuilder(form);
    const formDirector = new FormDirector(formBuilder);
    const filledForm = formDirector.getForm(stringInputs, submitButtonText);
    const formValidator = new FormValidator(filledForm);
    const formPopup = new FormPopup(rootContainer);    
    const popupDirector = new PopupDirector();
    popupDirector.renderAddCardPopup(cardList.addCard.bind(cardList), filledForm.view, formPopup, formValidator);
  } 

  const openEditUserPopup = () => {    
    const form = new Form();
    const submitButtonText = 'Сохранить';
    const stringInputs = [
      new TextInput('name', 'Полное имя', userInfo.name),
      new TextInput('about', 'Профессия', userInfo.about),
      new UrlInput('avatar', 'Ссылка на аватар', userInfo.avatar)
    ];
    const formBuilder = new FormBuilder(form);
    const formDirector = new FormDirector(formBuilder);
    const filledForm = formDirector.getForm(stringInputs, submitButtonText);
    const formValidator = new FormValidator(filledForm);
    const formPopup = new FormPopup(rootContainer);    
    const popupDirector = new PopupDirector();
    popupDirector.renderEditUserPopup(userInfo, filledForm.view, formPopup, formValidator);
  }   

  function createCard(dto) {    
    return isOwnCard(dto) 
      ? new OwnCard(dto, api, userInfo.id, showImage, openCardInfo, showLikesTimeout)
      : new Card(dto, api, userInfo.id, showImage, openCardInfo, showLikesTimeout);      
  }  

  const isOwnCard = (dto) => !dto.owner._id || userInfo.id === dto.owner._id;

  openAddCardPopupButton.addEventListener('click', openAddCardPopup);
  editUserButton.addEventListener('click', openEditUserPopup);
})()