export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, avatarSelector }) {
    this._title = document.querySelector(titleSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  //new phrasing below 6.5
  getUserInfo() {
    return {
      title: this._title.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({ title, description, avatar }) {
    this._title.textContent = title;
    this._description.textContent = description;
    this._avatar.src = avatar;
  }

  getAvatar({ avatar }) {
    this._avatar.src = avatar;
  }

  /*
  updateAvatar(newAvatar) {
    this._avatar.src = newAvatar;
  } */
}

//add card form works and after refreshing the page the cards stay there and form is empty, call it good
//working on the profile form now 5.31.2024
