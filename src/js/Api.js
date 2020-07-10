'use strict'
export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
   
    _getRequestResult(method, notBaseUrl, body) {
        return fetch(this._baseUrl + notBaseUrl, { 
            method: method,
            headers: this._headers,
            body: JSON.stringify(body)
        })            
        .then(res => {
            if (res.ok)             
                return res.json();
            return Promise.reject();
        })    
    }
  
    getInitialCards() {
        return this._getRequestResult('GET', '/cards');              
    }   
    
    getUserInfo() {
        return this._getRequestResult('GET', '/users/me');             
    }

    updateUserInfo(dto) {
        return this._getRequestResult('PATCH', '/users/me', dto);        
    }

    updateUserPhoto(link) {
        return this._getRequestResult('PATCH', '/users/me/avatar', { avatar: link });        
    }

    addCard(name, link) {  
        return this._getRequestResult('POST', '/cards', { 
            name: name,
            link: link
        });      
    }

    deleteCard(cardId) {
        return this._getRequestResult('DELETE', `/cards/${cardId}`);         
    }

    setLike(cardId) {
        return this._getRequestResult('PUT', `/cards/like/${cardId}`);
    }

    removeLike(cardId) {
        return this._getRequestResult('DELETE', `/cards/like/${cardId}`);
    }
}    