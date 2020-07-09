'use strict'
class CardList {
    constructor (container, api, createCard, selectOwners) {
        this._container = container; 
        this._api = api;  
        this._createCard = createCard;
        this._selectOwners = selectOwners;
        this._initCardList();     
    }

    _render(cards) {
        cards.forEach(card => this._renderCard(card));
    }

    _renderCard(card) {
        this._container.appendChild(card.view);
    }

    addCard(name, link, closePopup) {        
        this._api.addCard(name, link)
        .then(dto => this._renderCard(this._createCard(dto))) 
        .catch(err => console.log(err)) 
        .finally(closePopup);       
    }   

    _initCardList = () => {    
        this._api.getInitialCards()
        .then(cardDtoes => this._render(this._randomCreateCards(cardDtoes)))
        .catch(err => console.log(err));
    }   

    _randomCreateCards = (cardDtoes) => {
        this._cards = [];  
        this._owners = [];       
        this._addOwnerName('Все');
        this._addOwnerName('Мои');
        // for (let i = 0; i < 3; i++) {
        //     const index = Math.floor(Math.random() * cardDtoes.length);      
        //     randomCards.push(this._createCard(cardDtoes[index]));
        //     cardDtoes.splice(index, 1);  
        // }   
        while (cardDtoes.length !== 0) {             
            const index = Math.floor(Math.random() * cardDtoes.length); 
            const cardDto = cardDtoes[index];      
            this._cards.push(this._createCard(cardDto));
            if (!this._owners.includes(cardDto.owner.name)) 
                this._addOwnerName(cardDto.owner.name);            
            cardDtoes.splice(index, 1);                
        }      
        console.log(this._owners);  
        return this._cards;
    }

    _addOwnerName = (name) => {
        const option = document.createElement('option');
        option.textContent = name;
        this._selectOwners.appendChild(option);
        this._owners.push(name);
    }
}
