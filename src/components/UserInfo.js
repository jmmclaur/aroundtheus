export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this.profileTitle = document.querySelector(".profile__title");
    this.profileDescription = document.querySelector(".profile__description");
    this._nameElement.value = this.profileTitle.textContent;
    this._jobElement.value = this.profileDescription.textContent;
  }

  setUserInfo(title, description) {
    title = this._nameElement.value;
    description = this._jobElement.value;
    this.profileTitle.textContent = title;
    this.profileDescription.textContent = description;
  }
}
