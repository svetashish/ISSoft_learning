import { Error } from "./Error.js";
import { CloseModal } from "./closeModal.js";

export class LocalStorage {
  constructor(array, form, data) {
    this.arrData = array;
    this.data = data;
    this.localStorageValue = JSON.parse(localStorage.getItem('users'));
    this.users = Object.keys(this.localStorageValue);
    this.form = form;
    
  }

  setData() { 
    let regData = false;

    if (this.users.includes(this.data.email)) {
      regData = false;
    } else {
      regData = true;
      this.localStorageValue[`${this.data.email}`] = {"password": `${this.data.password}`};
      localStorage.setItem('users', JSON.stringify(this.localStorageValue));    
    }
    return regData;
  }

  getData() {
    let isChecked = false;

    if(this.users.includes(this.data.email)) {
      isChecked = (this.localStorageValue[`${this.data.email}`].password === this.data.password) ? true : false;
    }   
    return isChecked;
  }
}