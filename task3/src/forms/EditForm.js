import { Form } from "./Form.js";
import { DataLayer } from "../DataLayer.js";
import { PopUp } from "../PopUp.js";

export class EditForm extends Form {
  constructor(selector, tableName, regData) {
    super(selector, tableName, regData);
    this.email = null;
    // this.submittedCallback = submittedCallback;
    // this.editParams = regData;
    // this.container = document.querySelector(".container");
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);

    const dataBase = new DataLayer();
    dataBase.setNewParams(this.data, this.keyName, this.email);

    const closeModal = new PopUp();
    closeModal.closeForm(this.form.closest(".modal"));
    // if (this.submittedCallback) {
    //   this.submittedCallback();
    // }
    window.location.reload(); //TODO  спросить про перерисовку после submit
  }

  setInitialData(email) {
    const dataBase = new DataLayer();
    const [dataObject, keys] = dataBase.getData(this.keyName);
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
