import { Form } from "./Form.js";
import { PopUp } from "./PopUp.js";
import { Error } from "./Error.js";
import { DataLayer } from "./DataLayer.js";
import { EditForm } from "./EditForm.js";
import { Page } from "./Page.js";

export class LoginForm extends Form {
  constructor(selector, tableName, regData) {
    super(selector, tableName, regData);
    this.container = document.querySelector(".container");
    this.toggleWrapper = document.querySelector(".toggle-wrapper");
    this.toggleButton = this.toggleWrapper.querySelector(".check");
    this.toggleText = this.toggleWrapper.querySelector("label");
    this.toggleButton.addEventListener("click", () => this.handleToggleClick());
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);

    const dataBase = new DataLayer();
    const isChecked = dataBase.checkData(this.data, this.keyName);

    
    if (isChecked) {
      const closeModal = new PopUp();
      closeModal.closeForm(this.form.closest(".modal"));
     
      window.location.href = `http://127.0.0.1:5500/issoft/task3/user.html`;
      dataBase.setData(this.data, 'token');
    } else {
      if (!this.form.querySelector(".top")) {
        const errorMessage = new Error(
          "Incorrect email/password combination",
          false
        );
        this.form.querySelector("h3").after(errorMessage.addErrorToForm());
      }
    }   
  }

  handleInput(target) {
    super.handleInput(target);
    const closestPassword = this.form.querySelector(".password");

    if (this.toggleButton.checked && target == closestPassword) {
      this.toggleText.innerHTML = "Show password";
      closestPassword.type = "password";
      this.toggleButton.checked = false;
    }
  }

  handleToggleClick() {
    const closestPassword = this.form.querySelector(".password");
    if (this.toggleButton.checked && closestPassword.value) {
      this.toggleText.innerHTML = "Hide password";
      closestPassword.type = "text";
    } else {
      this.toggleText.innerHTML = "Show password";
      closestPassword.type = "password";
    }
  }
}