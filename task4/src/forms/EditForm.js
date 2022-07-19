import { Form } from "./Form.js";
import { PopUp } from "../common-classes/PopUp.js";
import { removeAttribute } from "../helpers/removeAttribute.js";
import { dataBaseApi } from "../api/api.js";

export class EditForm extends Form {
  constructor(selector, regData, submittedCallback) {
    super(selector, regData);
    this.email = null;
    this.submittedCallback = submittedCallback;
  }

  async handleSubmitForm(event) {
    super.handleSubmitForm(event);

    try {
      await dataBaseApi.updateData({
        email: this.email,
        ...this.data,
      });
    } catch (error) {
      console.error(error);
    }

    const closeModal = new PopUp();
    closeModal.closeForm(this.form.closest(".modal"));

    removeAttribute(`[data-user = '${this.email}']`);

    if (this.submittedCallback) {
      this.submittedCallback();
    }
  }

  async setInitialData(email) {
    try {
      const responsData = await dataBaseApi.getData();
      this.email = email;

      const selectedUser = responsData.filter(
        ({ email }) => email === this.email
      )[0];

      this.inputArray.map((input) => {
        if (input.name !== "sex") {
          const fieldValue = input.name;
          input.value = selectedUser[`${fieldValue}`];
        } else {
          if (selectedUser["sex"] === "female") {
            this.inputArray.find(
              (input) => input.value === "female"
            ).checked = true;
          } else {
            if (selectedUser["sex"] === "male" || !selectedUser["sex"]) {
              this.inputArray.find(
                (input) => input.value === "male"
              ).checked = true;
            }
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
