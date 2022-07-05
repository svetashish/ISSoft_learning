import { Error } from "../common-classes/Error.js";
import { removeAttribute } from "../helpers/removeAttribute.js";
import { PopUp } from "../common-classes/PopUp.js";
import { DataLayer } from "../common-classes/DataLayer.js";

export class Form {
  constructor(selector, tableName, fields) {
    this.keyName = tableName;
    this.initialParams = fields;
    this.data = {};
    this.isSubmit = false;
    this.form = document.querySelector(selector);
    this.formElements = Array.from(this.form.elements);
    this.inputArray = this.formElements.filter(
      (element) => element.tagName === "INPUT"
    );
    this.passwords = this.formElements.filter(
      (element) => element.type === "password"
    );
    this.buttonSubmit = this.form.querySelector(".submit");
    this.buttonClose = this.form.querySelector(".close");
    this.setAddEventListener();
  }

  setAddEventListener() {
    this.form.addEventListener("submit", this.handleSubmitForm.bind(this));
    this.form.addEventListener("change", ({ target }) =>
      this.handleChangeInput(target)
    );
    this.form.addEventListener("input", ({ target }) =>
      this.handleInput(target)
    );
    this.buttonClose.addEventListener("click", this.handleClose.bind(this));
    window.addEventListener("click", this.handleClose.bind(this));
    window.addEventListener("keydown", this.handleClose.bind(this));
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

      if (!reg.test(inputValue)) {
        target.style.border = "1px solid red";
        const errorMessage = new Error("Incorrect format entering data", true);
        target.closest("div").after(errorMessage.addErrorToForm());
        this.buttonSubmit.disabled = true;
      }
    }
    this.data = this.setInitialParameters(this.initialParams);
  }

  setInitialParameters(params) {
    return params.reduce((acc, item) => {
      const couterElements = this.inputArray.filter(
        (element) => element.name == item
      );
      if (couterElements.length === 1) {
        return {
          ...acc,
          [item]: this.inputArray.find((element) => element.name == item).value,
        };
      } else {
        return {
          ...acc,
          [item]: couterElements.find((element) => element.checked === true)
            .value,
        };
      }
    }, {});
  }

  handleInput(target) {
    if (this.isSubmit)
      this.inputArray.forEach((element) => (element.style.border = "#000"));

    removeAttribute(".top", this.form);

    if (removeAttribute(".error", target.closest(".message-for-error"))) {
      target.style.border = "#000";
      this.buttonSubmit.disabled = false;
    }
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
