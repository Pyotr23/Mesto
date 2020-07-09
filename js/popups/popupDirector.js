'use strict'
class PopupDirector {
    renderImagePopup(link, popup) {        
        popup.withImage(link);
        popup.renderPopup();
    }

    renderLikesPopup(dto, popup) {
        dto.likes.forEach(user => popup.withBadge(user.name, user.avatar));
        popup.withoutCloseButton();
        popup.renderPopup();
    }

    renderInfoPopup(dto, popup) {         
        popup.withTitle(dto.name); 
        popup.withInfoRows([ new InfoRow('Дата публикации', this._getDateTime(new Date(dto.createdAt))), 
            new InfoRow('Лайков', dto.likes.length)]);  
        popup.withSubtitle('Об авторе');   
        popup.withBadge(dto.owner.name, dto.owner.avatar);
        popup.withInfoRows([ new InfoRow('Профессия', dto.owner.about)]); 
        popup.withoutCloseButton();       
        popup.renderPopup();
    }

    _getDateTime(date) {
        const hours = this._getTwoSymbolsValue(date.getHours());
        const minutes = this._getTwoSymbolsValue(date.getMinutes());
        const day = this._getTwoSymbolsValue(date.getDate());
        const month = this._getTwoSymbolsValue(parseInt(date.getMonth(), 10) + 1);
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}.${month}.${year}`;
    }

    _getTwoSymbolsValue(value) {        
        return value.toString().length === 1 
            ? 0 + value.toString()
            : value;
    }

    renderAddCardPopup(addCard, formContainer, popup, formValidator) {        
        popup.withTitle('Новое место');
        popup.withForm(formContainer);        
        popup.renderPopup();         
        popup.setSubmitEventListener((event) => this._addCard(event, addCard, popup));
        popup.setInputEventListener((event) => formValidator.handleInput(event));
        formValidator.setSubmitButtonState();
    }

    _addCard = (event, addCard, popup) => {
        event.preventDefault();
        const [...inputs] = popup.inputs;             
        event.submitter.textContent = 'Загрузка...';
        event.submitter.setAttribute('disable', 'true');  
        const name = inputs.find(input => input.name === 'name').value; 
        const link = inputs.find(input => input.name === 'link').value;
        addCard(name, link, () => popup.close());              
    }

    renderEditUserPopup(userInfo, formContainer, popup, formValidator) {            
        popup.withTitle('Редактировать профиль');
        popup.withForm(formContainer);        
        popup.renderPopup();        
        popup.setSubmitEventListener((event) => this._editUserInfo(event, userInfo.update.bind(userInfo), popup));
        popup.setInputEventListener((event) => formValidator.handleInput(event));
        formValidator.setSubmitButtonState();
    }

    _editUserInfo(event, changeUserInfo, popup) {
        event.preventDefault();        
        const [...inputs] = popup.inputs;
        event.submitter.textContent = 'Загрузка...';
        event.submitter.setAttribute('disable', 'true');
        const name = inputs.find(input => input.name === 'name').value; 
        const about = inputs.find(input => input.name === 'about').value;   
        const avatar = inputs.find(input => input.name === 'avatar').value; 
        changeUserInfo({ 
            name: name, 
            about: about,
            avatar: avatar
        }, () => popup.close());                       
    }
}