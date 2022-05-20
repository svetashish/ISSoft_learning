import { PopUp } from "../common-classes/PopUp.js";
import { DataLayer } from "../common-classes/DataLayer.js";

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
  }

  handleSubmitForm(event) {
    event.preventDefault();

    const dataBase = new DataLayer();
    dataBase.deleteData(this.email, this.keyName);

    const closeModal = new PopUp();
    closeModal.closeForm(this.form.closest(".modal"));

    this.callBack();
  }

  handleClose(event) {
    event.stopPropagation();

    if (
      event.target === this.form.closest(".modal") ||
      event.target === this.buttonClose
    ) {
      const closeModal = new PopUp();
      closeModal.closeForm(this.form.closest(".modal"));
    }
  }
}
