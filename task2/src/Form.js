import { Error } from "./Error.js";
import { PopUp } from "./PopUp.js";

export class Form {
  constructor(selector, tableName, regData) {
    this.keyName = tableName;
    this.data = regData;
    this.isSubmit = false;
    this.form = document.querySelector(selector);
    this.formElements = Array.from(this.form.elements);
    this.form.addEventListener('submit', event => this.handleSubmitForm(event));
    this.form.addEventListener('change', ({target}) => this.handleChangeInput(target));
    this.form.addEventListener('input', ({target}) => this.handleInput(target));
    this.inputArray = this.formElements.filter(element => element.tagName === 'INPUT');
    this.passwords = this.formElements.filter(element => element.type === 'password');
    this.buttonSubmit = this.formElements.find(element => element.type === 'submit');
    this.buttonClose = this.form.querySelector('.close');
    this.buttonClose.addEventListener('click', (event) => this.handleClose(event));
    window.addEventListener('click', (event) => this.handleClose(event));
  }

  handleSubmitForm(event) {
    event.preventDefault();
    this.isSubmit = true;

  }

  handleChangeInput(target) {
    if (target.hasAttribute("data-reg")) {
      const inputValue = target.value;
      const inputReg = target.getAttribute("data-reg");
      const reg = new RegExp(inputReg);

      const errors = target
        .closest(".message-for-error")
        .querySelectorAll(".error");
      for (let error of errors) {
        error.remove();
      }

      if (!reg.test(inputValue)) {
        target.style.border = "1px solid red";
        const errorMessage = new Error("Incorrect format entering data", true);
        target.closest("div").after(errorMessage.addErrorToForm());
      }
    }

    const keysData = Object.keys(this.data);

    this.data.email = this.inputArray.find(
      (element) => element.name == keysData[0]
    ).value;
    this.data.password = this.inputArray.find(
      (element) => element.name == keysData[1]
    ).value;
  }

  handleInput(target) {
    this.buttonSubmit.disabled = false;

    if (this.isSubmit)
      this.inputArray.forEach((element) => (element.style.border = "#000"));

    if (this.form.querySelectorAll(".top").length !== 0)
      this.form.querySelector(".top").remove();

    if (target.closest(".message-for-error").querySelector(".error")) {
      target.closest(".message-for-error").querySelector(".error").remove();
      target.style.border = "#000";
    }
  }

  handleClose(event) {
    event.stopPropagation()
    if (event.target === this.form.closest(".modal") || event.target === this.buttonClose) {
      const closeModal = new PopUp();
      closeModal.closeForm(this.form.closest(".modal"));
    }
  }

  disabledButton() {
    const hasError =
      this.form.querySelectorAll(".error").length == 0 ? false : true;
    return hasError;
  }
}
