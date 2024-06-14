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

  setUserInfo({ title, description }) {
    this._title.textContent = title;
    this._description.textContent = description;
  } //split the sections 6.9

  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  } //split the sections 6.9

  /*
  getAvatar({ avatar }) {
    //this._avatar.src = avatar; get needs to get info 6.14
  } changing getAvatar in index.js to setAvatar, that seemed to work */
}

//add card form works and after refreshing the page the cards stay there and form is empty, call it good
//working on the profile form now 5.31.2024
