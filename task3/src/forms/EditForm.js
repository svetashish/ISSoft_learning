import { Form } from "./Form.js";
import { PopUp } from "../common-classes/PopUp.js";
import { removeAttribute } from "../helpers/removeAttribute.js";

export class EditForm extends Form {
  constructor(selector, tableName, regData, submittedCallback) {
    super(selector, tableName, regData);
    this.email = null;
    this.submittedCallback = submittedCallback;
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);

    this.dataBase.setNewParams(this.data, this.keyName, this.email);

    const closeModal = new PopUp();
    closeModal.closeForm(this.form.closest(".modal"));

    removeAttribute(`[data-user = '${this.email}']`);

    if (this.submittedCallback) {
      this.submittedCallback();
    }
  }

  setInitialData(email) {
    const [dataObject, keys] = this.dataBase.getData(this.keyName);
    this.email = email;

    this.inputArray.map((input) => {
      const selectedUser = dataObject[`${email}`];

      if (Object.keys(selectedUser).includes(input.name)) {
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
      }
    });
  }
}
