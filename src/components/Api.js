//6.10 let's fix  the like buttons

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getUserInfoAndCards() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  async addCard({ name, link }) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
    return this.renderResult(res);
  }

  //trying new below
  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    });
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.renderResult);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.renderResult);
  }

  async updateAvatar({ url }) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: url }),
    });
    return this.renderResult(res);
  }
}
