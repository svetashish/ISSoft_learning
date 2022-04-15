import { Form } from "./Form.js";
import { Error } from "./Error.js";
import { DataLayer } from "./DataLayer.js";
import { CloseModal } from "./closeModal.js";
import { CompareElements } from "./CompareElements.js";

export class RegistrartionForm extends Form {
  constructor (selector) {
    super(selector);
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);

    let arrayOfPasswords = this.passwords.map(element => element.value)
    let isPasswordsConfirm = new CompareElements(arrayOfPasswords); 

    if (isPasswordsConfirm.compare()) {
      const dataBase = new DataLayer(this.data, this.keyName);
      let isReg = dataBase.setData();

      console.log(dataBase);

      if (isReg) {
        const closeModal = new CloseModal(this.form.closest('.modal'));
        closeModal.closeForm();
        document.querySelector('.container')
          .insertAdjacentHTML('afterend', `<p class='registration'>${this.data.email} is successfully signed up</p>`);
      } else {
        if(!this.form.querySelector('.top')) {
          let errorMessage = new Error('Such user already signed up', false );
          document.querySelectorAll('h3')[1].after(errorMessage.addErrorToForm())
        }
      }
    } else {
      this.formElements
        .filter(element => element.type === 'password')
          .forEach(element => element.style.border = "1px solid red");

      if(!this.form.querySelector('.top')) {
        const errorMessage = new Error('The password does not match', false);
        this.form.querySelector('h3').after(errorMessage.addErrorToForm());  
      }   
    }
    this.buttonSubmit.disabled = super.disabledButton();
  };
}