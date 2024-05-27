export default class Api {
  constructor(options) {
    // Constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "f0969997-b1fb-4c1c-9062-68f00b8d62d1",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/user`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Function to fetch user info and cards together
  fetchData() {
    const userInfoPromise = this.getUserInfo();
    const cardsPromise = this.getInitialCards();

    return Promise.all([userInfoPromise, cardsPromise]);
  }

  deleteCard() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "4a5b23f0-f2a7-4209-a8e7-d3bcf73a20e6",
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Problem");
          return;
        }
        return res.json();
        // return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
