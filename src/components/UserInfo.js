export default class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._title = document.querySelector(titleSelector);
    this._description = document.querySelector(descriptionSelector);
  }
  //the user title/description might be labelled incorrectly
  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return this._userData;
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
/*
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
  } */
