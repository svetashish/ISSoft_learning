import { removeAttribute } from '../helpers/removeAttribute.js'
export class PopUp {
  container = document.querySelector(".container");

  constructor() {
    if (PopUp.instance) {
      return PopUp.instance;
    } else {
      PopUp.instance = this;
      return PopUp.instance;
    }
  }

  openForm(form) {
    form.style.display = "block";
    this.container.style.display = "none";

    removeAttribute( ".wrapper__content .registration")
  }

  closeForm(form) {
    form.style.display = "none";
    this.container.style.display = "flex";
    form.querySelectorAll("input").forEach((input) => {
      if(input.name !== 'sex'){
        input.value = "";
        input.style.border = "none";
      } 
    });
    removeAttribute(".error")
  }
}
