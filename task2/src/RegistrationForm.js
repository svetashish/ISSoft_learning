import { Form } from "./Form.js";
import { Error } from "./Error.js";
import { LocalStorage } from "./LocalStorage.js";
import { CloseModal } from "./closeModal.js";

export class RegistrartionForm extends Form {
  constructor (selector) {
    super(selector);
  }

  handleSubmitForm(event) {
    super.handleSubmitForm(event);

    if (this.confirmPassword()) {
      const lsData = new LocalStorage(this.inputArray, this.form, this.data);
      const lsData2 = new LocalStorage(this.inputArray, this.form, this.data);
      let isReg = lsData.setData();

      console.log(lsData, "lsData");
      console.log(lsData2, "lsData2");
      console.log(_.isEqual(lsData, lsData2), 'равенство');
    
      if (isReg) {
        const closeModal = new CloseModal(this.form.closest('.modal'));
        closeModal.closeForm();
        document.querySelector('.container')
          .insertAdjacentHTML('afterend', `<p>${this.data.email} is successfully signed up</p>`);
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
    super.disabledButton();
  };


  confirmPassword () {
    let isMatch = false;

    let arr = this.formElements
      .filter(element => element.type === 'password')
     
    isMatch = (arr[0].value === arr[1].value) ? true : false;
    return isMatch;
  };
}