import { Form } from "./Form.js";
import { CloseModal } from "./closeModal.js";
import { Error } from "./Error.js";
import { LocalStorage } from "./LocalStorage.js";

export class LoginForm extends Form {
  constructor(selector){
    super(selector);
    this.container = document.querySelector('.container');
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);
    
    const lsData = new LocalStorage(this.inputArray, this.form, this.data);
    let isChecked = lsData.getData();
    
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