import { Form } from "./Form.js";
import { Error } from "../common-classes/Error.js";
import { DataLayer } from "../common-classes/DataLayer.js";
import { PopUp } from "../common-classes/PopUp.js";
import { compareElements } from "../helpers/compareElements.js";

export class RegistrartionForm extends Form {
  constructor(selector, tableName, regData) {
    super(selector, tableName, regData);
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);

    const arrayOfPasswords = this.passwords.map((element) => element.value);

    if (compareElements(arrayOfPasswords)) {
      const dataBase = new DataLayer();
      const isReg = dataBase.setData(this.data, this.keyName);
      

      if (isReg) {
       
        const closeModal = new PopUp();
        closeModal.closeForm(this.form.closest(".modal"));
        document
          .querySelector(".container")
          .insertAdjacentHTML(
            "afterend",
            `<p class='registration'>${this.data.email} is successfully signed up</p>`
          );
      } else {
        if (!this.form.querySelector(".top")) {
          const errorMessage = new Error("Such user already signed up", false);
          this.form.querySelector("h3").after(errorMessage.addErrorToForm());
        }
      }
    } else {
      this.formElements
        .filter((element) => element.type === "password")
        .forEach((element) => (element.style.border = "1px solid red"));

      if (!this.form.querySelector(".top")) {
        const errorMessage = new Error("The password does not match", false);
        this.form.querySelector("h3").after(errorMessage.addErrorToForm());
      }
    }
  }
}
