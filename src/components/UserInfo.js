export default class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    this.profileTitle = document.querySelector(".profile__title"); //does this match? yes
    this.profileDescription = document.querySelector(".profile__description"); //ditto, yes
    this._titleElement.value = this.profileTitle.textContent;
    this._descriptionElement.value = this.profileDescription.textContent;
  }

  setUserInfo({ title, description }) {
    title = this._titleElement.value;
    description = this._descriptionElement.value;
    this.profileTitle.textContent = title;
    this.profileDescription.textContent = description;
  }
}
