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
    const textAfterReg = document.querySelector(
      ".wrapper__content .registration"
    );

    form.style.display = "block";
    this.container.style.display = "none";

    if (textAfterReg) {
      textAfterReg.remove();
    }
  }

  closeForm(form) {
    
    const errors = document.querySelectorAll(".error");

    form.style.display = "none";
    this.container.style.display = "flex";
    form.querySelectorAll("input").forEach((input) => {
      input.value = "";
      input.style.border = "none";
    });
    for (let error of errors) {
      error.remove();
    }
  }
}
