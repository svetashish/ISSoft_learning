import { PopUp } from "../common-classes/PopUp.js";
import { DataLayer } from "../common-classes/DataLayer.js";
import { dataBaseApi } from "../api/api.js";

export class DeleteConfirmForm {
  constructor(selector, keyName, callBack) {
    this.form = document.querySelector(selector);
    this.keyName = keyName;
    this.email = null;
    this.callBackRender = callBack;
    this.buttonClose = this.form.querySelector(".close");
    this.setAddEventListener();
  }

  setEmail(email) {
    this.email = email;
  }

  setAddEventListener() {
    this.form.addEventListener("submit", this.handleSubmitForm.bind(this));
    this.buttonClose.addEventListener("click", this.handleClose.bind(this));
    window.addEventListener("click", this.handleClose.bind(this));
    window.addEventListener("keydown", this.handleClose.bind(this));
  }

  async handleSubmitForm(event) {
    event.preventDefault();

    try {
      await dataBaseApi.deleteData({
        email: this.email,
      });
    } catch (error) {
      console.error(error);
    }

    const closeModal = new PopUp();
    closeModal.closeForm(this.form.closest(".modal"));

    this.callBackRender();
  }

  handleClose(event) {
    event.stopPropagation();

    if (
      event.target === this.form.closest(".modal") ||
      event.target === this.buttonClose ||
      event.keyCode == 27
    ) {
      const closeModal = new PopUp();
      closeModal.closeForm(this.form.closest(".modal"));
    }
  }
}
