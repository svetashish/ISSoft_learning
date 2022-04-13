import { CloseModal } from './src/closeModal.js';
import { Form } from './src/Form.js';
import { LoginForm } from './src/LoginForm.js';
import { RegistrartionForm } from './src/RegistrationForm.js';

window.addEventListener('load', () => {
  if(!localStorage.key('users')) {
    localStorage.setItem('users', '{}')
  }
})

let buttonLogin = document.querySelector('.login');
let buttonRegistration = document.querySelector('.registation');
let closeButton = document.querySelectorAll('.close');

let container = document.querySelector('.container');
let modal = document.querySelectorAll('.modal');


const loginForm = new LoginForm(".modal-content__login");
const regForm = new RegistrartionForm(".modal-content__registration");

const openModal = (element) => {
  element.style.display = 'block';
  container.style.display = 'none';
  
  if(document.querySelector('.wrapper__content p')){
    document.querySelector('.wrapper__content p').remove();
  }
};


buttonLogin.addEventListener('click', () => openModal(loginForm.form.closest('.modal')))
buttonRegistration.addEventListener('click', () => openModal(regForm.form.closest('.modal')))

if (modal.length > 0) {
  for (let i = 0; i < modal.length; i++){
    closeButton[i].addEventListener('click', () => {
      const closeModal = new CloseModal(modal[i]);
      closeModal.closeForm()
    });

    window.addEventListener('click', (event) => {
      for (let i = 0; i < modal.length; i++) {
        if (event.target == modal[i]) { 
          const closeModal = new CloseModal(modal[i]);
          closeModal.closeForm()
        }
      }
    })
  }
}
