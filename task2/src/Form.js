import { Error } from "./Error.js";
import { LocalStorage } from "./LocalStorage.js";

export class Form { 
  constructor (selector){
    this.form = document.querySelector(selector);
    this.form.addEventListener('submit', event => this.handleSubmitForm(selector, event));
    this.form.addEventListener('change', ({target}) => this.handleInput(target));
    // this.form.addEventListener('input', this.removeError)
  };
  
  handleSubmitForm(selector, event) {
      selector === ".modal-content__login" 
        ? this.handleLoginForm(event)
        : this.setInputData(event);
  };

  handleInput (target) {
    // if (this.form.querySelectorAll('.error')) {
    //   target.addEventListener('input', )
    // }
      
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
  };

  setInputData (event) {
    event.preventDefault();

    // console.log(this.form.querySelectorAll('.error'));

    if (this.confirmPassword()) {
      const inputArray = Array.from(this.form.elements)
        .filter(element => element.tagName === 'INPUT');

      const lsData = new LocalStorage(inputArray);
      lsData.setData();
   
      // closeModal(this.form.closest('.modal')); 

    } else {
      Array.from(this.form.elements)
        .filter(element => element.type === 'password')
          .forEach(element => element.style.border = "1px solid red");

      const errorMessage = new Error('The password does not match', false);
      this.form.querySelector('h3').after(errorMessage.addErrorToForm());     
    }
  };

  handleButtonSubmit() {
    
    let hasError = this.form.querySelectorAll('.error').length == 0 
      ? true 
      : false;
   
    return hasError;
  }

  confirmPassword () {
    let isMatch = false;

    let arr = Array.from(this.form.elements)
      .filter(element => element.type === 'password')
     
    isMatch = (arr[0].value === arr[1].value) ? true : false;
    return isMatch;
  };

  handleLoginForm(event) {
    event.preventDefault();

    const inputArray = Array.from(this.form.elements)
        .filter(element => element.tagName === 'INPUT');

    const lsData = new LocalStorage(inputArray);
    lsData.getData();
  }
}
