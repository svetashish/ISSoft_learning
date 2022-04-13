import { Error } from "./Error.js";

export class LocalStorage {
  constructor(array) {
    this.arrData = array;
    this.email = array.find(element => element.name == "email").value;
    this.password = array.find(element => element.name == "password").value;
    this.localStorageValue = JSON.parse(localStorage.getItem('users'));
    this.users = Object.keys(this.localStorageValue);
    
  }

  setData() { 
    if (this.users.includes(this.email)) {
      let errorMessage = new Error('Such user already signed up', false );
      document.querySelectorAll('h3')[1].after(errorMessage.addErrorToForm());
    } else {
      this.localStorageValue[`${this.email}`] = {"password": `${this.password}`};
      localStorage.setItem('users', JSON.stringify(this.localStorageValue));    
    }
  }

  getData() {
    let isChecked = false;

    if(this.users.includes(this.email)) {
      isChecked = (this.localStorageValue[`${this.email}`].password === this.password) ? true : false;
    }   

    if (isChecked) {
      closeModal(this.form.closest('.modal')); 
      container.innerHTML = '<h2>Hello world!</h2>';
    } else {
      const errorMessage = new Error('Incorrect email/password combination', false);
      document.querySelectorAll('h3')[0].after(errorMessage.addErrorToForm());
    } 
  }
}