import { Error } from "./Error.js";
import { PopUp } from "./PopUp.js";

export class Form {
  constructor(selector, tableName, fields) {
    this.keyName = tableName;
    this.initialParams = fields;
    this.data = {};
    this.isSubmit = false;
    this.form = document.querySelector(selector);
    this.formElements = Array.from(this.form.elements);

    this.form.addEventListener("submit", (event) =>
      this.handleSubmitForm(event)
    );
    this.form.addEventListener("change", ({ target }) =>
      this.handleChangeInput(target)
    );
    this.form.addEventListener("input", ({ target }) =>
      this.handleInput(target)
    );
    this.inputArray = this.formElements.filter(
      (element) => element.tagName === "INPUT"
    );
    this.passwords = this.formElements.filter(
      (element) => element.type === "password"
    );
    this.buttonSubmit = this.formElements.find(
      (element) => element.type === "submit"
    );
    this.buttonClose = this.form.querySelector(".close");
    this.buttonClose.addEventListener("click", (event) =>
      this.handleClose(event)
    );
    window.addEventListener("click", (event) => this.handleClose(event));
  }

  //TODO объединение eventListeners ?????
  // setAddEventListener(element, eventName, callBack){
  //   element.addEventListener(eventName, callBack);
  // }

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
    this.data = this.setInitialParametrs(this.initialParams);

    console.log(this.data);
  }

  setInitialParametrs(params) {
    return params.reduce((acc, item) => {
      const couterElements = this.inputArray.filter(
        (element) => element.name == item
      );
      console.log(couterElements);

      if (couterElements.length === 1) {
        return {
          ...acc,
          [item]: this.inputArray.find((element) => element.name == item).value,
        };
      } else {
        return {
          ...acc,
          [item]: couterElements.find((element) => element.checked === true).value,
        };
      }
    }, {});
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
    event.stopPropagation();

    if (
      event.target === this.form.closest(".modal") ||
      event.target === this.buttonClose
    ) {
      const closeModal = new PopUp();
      closeModal.closeForm(this.form.closest(".modal"));  
      
    // TODO ничего не происходит 

      // this.form.removeEventListener("submit", (event) =>
      // this.handleSubmitForm(event))
 
      console.log("зашли сюда");
    }
  }

  disabledButton() {
    const hasError =
      this.form.querySelectorAll(".error").length == 0 ? false : true;
    return hasError;
  }
}
