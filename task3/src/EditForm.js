import { Form } from "./Form.js";
import { DataLayer } from "./DataLayer.js";


export class EditForm extends Form {
  constructor(selector, tableName, regData, email) {
    super(selector, tableName, regData);
    this.email = email;  
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);
    console.log(this.data);

    const dataBase = new DataLayer();
    dataBase.setNewParams(this.data, this.keyName, this.email);
    const sth = new FormData(this.form)
    console.log(sth );

  }
}