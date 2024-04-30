export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._title = document.querySelector(profileTitle);
    this._description = document.querySelector(profileDescription);
  }
  //the user title/description might be labeled incorrectly
  getUserInfo() {
    this._userData = {
      title: this._title.textContent,
      description: this._description.textContent,
    };
    return this._userData;
  }

  setUserInfo({ title, description }) {
    this._title.textContent = title;
    this._description.textContent = description;
  }
}
