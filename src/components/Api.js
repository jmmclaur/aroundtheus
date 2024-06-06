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

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  setUserInfo(title, description, avatar) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: description,
        avatar: avatar,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  } //leave avatar alone it's fine

  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  async likeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  async dislikeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  async updateAvatar({ link }) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: link }),
    });
    return this.renderResult(res);
  } //what if I just use setAvatar instead of updateAvatar b/c they're the same thing
}

/*
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bba6e655-3c43-4bc9-84b1-5706718b60cd",
    "Content-Type": "application/json",
  },
}); */
