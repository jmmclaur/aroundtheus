export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._title = document.querySelector(profileTitle);
    this._description = document.querySelector(profileDescription);
  }

  getUserInfo() {
    const userInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._title.textContent = data.title;
    this._description.textContent = data.description;
  }
}
