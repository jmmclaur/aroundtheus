export default class PopUp {
  constructor({ popUpSelector }) {
    this._popUpElement = document.querySelector(popUpSelector);
    //this._handleEscapeKey = this._handleEscapeKey.bind(this);
    this._closeButton = this._popUpElement.querySelector(".modal__close");
    this.close = this.close.bind(this);
  }

  /*
  _handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }; */

  //
  /*
  _handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      const modal = document.querySelector(".modal_opened");
      closeModal(modal);
    }
  } */

  open() {
    this._popUpElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscapeKey);
    document.addEventListener("mousedown", this._handleOutsideClick);
  }

  close() {
    this._popUpElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscapeKey);
    document.removeEventListener("mousedown", this._handleOutsideClick);
  }

  _handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOutsideClick = (evt) => {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
/*
let closeButton = document.getElementById("#modal-close-button");
if (closeButton) {
  let this._closeButton = closeButton.ariaValueMax;
} */

/*
  _handleOutsideClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }; */

/*
  setEventListeners() {
    document.addEventListener("keydown", (evt) => {
      this._handleEscapeKey(evt);
    });
    
    this._closeButton = this._popUpElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    //this._popUpElement.addEventListener("click", this._handleOutsideClick);
    this._popUpElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }  */
