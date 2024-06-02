export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, avatarSelector }) {
    this._title = document.querySelector(titleSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      title: this._title.textContent,
      description: this._description.textContent,
      avatar: this._avatar.src,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._title.textContent = data.title;
    this._description.textContent = data.description;
    this._avatar.src = data.avatar;
  }

  setAvatar({ avatar }) {
    this._avatar.src = avatar.avatar;
  }
}

//profile modal popping up now fixed this._userinfo to just const userinfo
//the edit avatar doesn't do anything yet, which is fine
//also need the avatar and initial cards to pull up

//add card form works and after refreshing the page the cards stay there and form is empty, call it good
//working on the profile form now 5.31.2024
