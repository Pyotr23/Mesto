(function () {
  'use strict';
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