import { Form } from "./Form.js";
import { PopUp } from "../common-classes/PopUp.js";
import { Error } from "../common-classes/Error.js";
import { dataBaseApi } from "../api/api.js";

export class LoginForm extends Form {
  constructor(selector, tableName, regData) {
    super(selector, tableName, regData);
    this.container = document.querySelector(".container");
    this.toggleWrapper = document.querySelector(".toggle-wrapper");
    this.toggleButton = this.toggleWrapper.querySelector(".check");
    this.toggleText = this.toggleWrapper.querySelector("label");
    this.toggleButton.addEventListener("click", () => this.handleToggleClick());
  }

  async handleSubmitForm(event) {
    super.handleSubmitForm(event);

    try {
      const token = await dataBaseApi.login({
        email: this.inputArray[0].value,
        password: this.inputArray[1].value,
      });

      localStorage.setItem('token', JSON.stringify(token));
    
      if (token) {
        const closeModal = new PopUp();
        closeModal.closeForm(this.form.closest(".modal"));
        window.location.hash = "/user/posts";
      } else {
        if (!this.form.querySelector(".top")) {
          const errorMessage = new Error(
            "Incorrect email/password combination",
            false
          );
          this.form.querySelector("h3").after(errorMessage.addErrorToForm());
        }
      }
    } catch (error) {
      console.error(error);
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
