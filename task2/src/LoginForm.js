import { Form } from "./Form.js";
import { CloseModal } from "./closeModal.js";
import { Error } from "./Error.js";
import { DataLayer } from "./DataLayer.js";

export class LoginForm extends Form {
  constructor(selector){
    super(selector);
    this.container = document.querySelector('.container');
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);
    
    console.log(this.data, 'какую дату передаем в DataLayer');
    const dataBase = new DataLayer(this.data, this.keyName);
    
    let isChecked = dataBase.checkData();
    
    console.log(dataBase, "isChecked", isChecked);

    if (isChecked) {
      const closeModal = new CloseModal(this.form.closest('.modal'));
      closeModal.closeForm();
      this.container.innerHTML = `<h2>Hello! My dear ${this.data.email}!</h2>`;
    } else {
      if(!this.form.querySelector('.top')) {
        const errorMessage = new Error('Incorrect email/password combination', false);
        document.querySelectorAll('h3')[0].after(errorMessage.addErrorToForm());
      }
    } 
  }
}