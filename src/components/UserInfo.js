export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._title = document.querySelector(nameSelector);
    this._description = document.querySelector(aboutSelector);
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

  setUserInfo({ name, about, avatar }) {
    this._title.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
  }

  setAvatar({ avatar }) {
    this._avatar.src = avatar.avatar;
  }
}

/*
const userInfo = new UserInfo(
  ".modal__input_type_title",
  ".modal__input_type_description"
); */
//profile modal popping up now fixed this._userinfo to just const userinfo
//the edit avatar doesn't do anything yet, which is fine
//also need the avatar and initial cards to pull up

//add card form works and after refreshing the page the cards stay there and form is empty, call it good
//working on the profile form now 5.31.2024
