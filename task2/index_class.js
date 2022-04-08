let buttonLogin = document.querySelector('.login');
let buttonRegistration = document.querySelector('.registation');

let container = document.querySelector('.container');
let modal = document.querySelectorAll('.modal');

let closeButton = document.querySelectorAll('.close');
let input = document.querySelectorAll('input');


class Form {
  constructor (selector){
    this.form = document.querySelector(selector);
    this.form.addEventListener('submit', event => {
      if (selector === ".modal-content__login") {
        this.handleLoginForm(event);
      } else {
        this.setInputData(event);
        // this.handleSubmitForm(event);
      }
    })
  }

  setInputData(event) {
    event.preventDefault();

    console.log(this.form);
    console.log(this.form.elements);
    console.log(this.form.querySelectorAll("input")); // ????  почему нет

    // console.log(Array.from(this.form.elements)
    // .filter(
    //   (element) =>
    //     element.tagName === 'input'
    // ));



    if (this.confirmPassword()) {
      Array.from(this.form.elements)
      .filter(element => element.className === "email" ||  element.className === 'password')
        .forEach(input => localStorage.setItem(`${input.className}`, `${input.value}`))

        closeModal(this.form.closest('.modal')) // как он видит closeModal ??
    } else {
      console.log("The password does not match");

     Array.from(this.form.elements)
      .filter(element => element.className === "confirm-password" ||  element.className === 'password')
        .forEach(element => element.style.border = "1px solid red")
    }
  };

  confirmPassword () {
    let isMatch = false;
    let arr = Array.from(this.form.elements)
      .filter(element => element.className === "confirm-password" ||  element.className === 'password')
     
    isMatch = (arr[0].value === arr[1].value) ? true : false;
    return isMatch
  };

  handleLoginForm(event) {
    event.preventDefault();
    const emailData = localStorage.getItem("email");
    const passwordData = localStorage.getItem("password");

    let isChecked = false;

    let loggingEmail = Array.from(this.form.elements)
      .find(element => element.className === "email")

    let loggingPassword = Array.from(this.form.elements)
      .find(element => element.className === "password")
    
      console.log("ls:", emailData,"logging:", loggingEmail.value);
      console.log("ls:", passwordData,"logging:", loggingPassword.value);

      isChecked = (loggingEmail.value === emailData && loggingPassword.value === passwordData) ? true : false
     

      if (isChecked) {
        closeModal(this.form.closest('.modal')); // как он видит closeModal ??
        container.innerHTML = '<h2>Hello world!</h2>'

      } else {
        if(loggingEmail.value !== emailData && loggingPassword.value !== passwordData) {
          loggingEmail.style.border = "1px solid red";
          loggingPassword.style.border = "1px solid red";

          console.log("both");
        } else {
          if(loggingEmail.value !== emailData) {
            loggingEmail.style.border = "1px solid red";
            console.log("email");
          } else {
            loggingPassword.style.border = "1px solid red";
            console.log("password");
          }
        }
      }
  }

  handleSubmitForm(event) {
    event.preventDefault();
    closeModal(this.form.closest('.modal')) // как он видит closeModal ??
  };
}



const loginForm = new Form(".modal-content__login");
const regForm = new Form(".modal-content__registration");


const openModal = (element) => {
  element.style.display = 'block';
  container.style.display = 'none';
};

const closeModal = (element) => {
  element.style.display = 'none';
  container.style.display = 'flex';
  element.querySelectorAll('input').forEach(input => input.value = "")    // ???
};

buttonLogin.addEventListener('click', () => openModal(loginForm.form.closest('.modal')))
buttonRegistration.addEventListener('click', () => openModal(regForm.form.closest('.modal')))

if (modal.length > 0) {
  for (let i = 0; i < modal.length; i++){
    closeButton[i].addEventListener('click', () => closeModal(modal[i]));

    window.addEventListener('click', (event) => {
      for (let i = 0; i < modal.length; i++) {
        if (event.target == modal[i]) closeModal(modal[i])
      }
    })
  }
}