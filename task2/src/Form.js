import { Error } from "./Error.js";

export class Form { 
  constructor (selector){
    this.form = document.querySelector(selector);
    this.formElements = Array.from(this.form.elements);
    this.form.addEventListener('submit', event => this.handleSubmitForm(event));
    this.form.addEventListener('change', ({target}) => this.handleChangeInput(target));
    this.form.addEventListener('input', ({target}) => this.handleInput(target))
    this.inputArray = this.formElements.filter(element => element.tagName === 'INPUT');
    this.buttonSubmit = this.formElements.find(element => element.type === 'submit');
    this.data = {
      'email': '',
      'password': '',
    };
  };
  
  handleSubmitForm(event) {
    event.preventDefault();
  };

  handleChangeInput (target) {
         
    this.data.email = this.inputArray.find(element => element.name == "email").value;
    this.data.password = this.inputArray.find(element => element.name == "password").value;

    if (target.hasAttribute('data-reg')) {
      const inputValue = target.value;
      const inputReg = target.getAttribute('data-reg');
      const reg = new RegExp(inputReg);

      const errors = target.closest('.message-for-error').querySelectorAll('.error');
      for (let error of errors) {
        error.remove();
      }
  
      if (!reg.test(inputValue)) {
        target.style.border = "1px solid red";
        const errorMessage = new Error('Incorrect format entering data', true);
        target.closest('div').after(errorMessage.addErrorToForm());
      }
    }

    this.disabledButton()
  };

  handleInput(target) {
    if(this.form.querySelectorAll('.top').length !== 0) {
     this.form.querySelector('.top').remove() 
    }

    if (target.closest('.message-for-error').querySelector('.error')) {
      target.closest('.message-for-error').querySelector('.error').remove();
      target.style.border = '#000';
    }
  }

  disabledButton() {
    
    let hasError = this.form.querySelectorAll('.error').length == 0 
      ? true 
      : false;
   
      this.buttonSubmit.disabled = hasError === true ? false : true;   
  }
}
