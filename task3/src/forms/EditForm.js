import { Form } from "./Form.js";
import { DataLayer } from "../common-classes/DataLayer.js";
import { PopUp } from "../common-classes/PopUp.js";
import { removeAttribute } from "../helpers/removeAttribute.js";

export class EditForm extends Form {
  constructor(selector, tableName, regData, submittedCallback) {
    super(selector, tableName, regData);
    this.email = null;
    console.log(this.email, 'this.email edit');
    this.submittedCallback = submittedCallback;
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);

    const dataBase = new DataLayer();
    dataBase.setNewParams(this.data, this.keyName, this.email);

    const closeModal = new PopUp();
    closeModal.closeForm(this.form.closest(".modal"));

    removeAttribute(`[data-user = '${this.email}']`);

    if (this.submittedCallback) {
      this.submittedCallback(this.email)
    }
  }

  setInitialData(email) {
    const dataBase = new DataLayer();
    const [dataObject, keys] = dataBase.getData(this.keyName);
    this.email = email;
    console.log(this.email, 'this.email edit one more');

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
