export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, avatarSelector }) {
    this._title = document.querySelector(titleSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._title.textContent = data.title;
    this._description.textContent = data.description;
    this._avatar.src = data.avatar;
  }

  getUserInfo() {
    return this._userInfo;
  }

  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
