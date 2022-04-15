import { DataLayer } from './src/DataLayer.js';
import { LoginForm } from './src/LoginForm.js';
import { RegistrartionForm } from './src/RegistrationForm.js';


let buttonLogin = document.querySelector('.login');
let buttonRegistration = document.querySelector('.registation');

let container = document.querySelector('.container');

const loginForm = new LoginForm('.modal-content__login');
const regForm = new RegistrartionForm('.modal-content__registration');

const openModal = (element) => {
  element.style.display = 'block';
  container.style.display = 'none';

  // const LS = new DataLayer({aaa: 18, bbb: 30}, 'check');
  // console.log(LS);
  
  if (document.querySelector('.wrapper__content .registration')){
    document.querySelector('.wrapper__content .registration').remove();
  }
};

buttonLogin.addEventListener('click', () => openModal(loginForm.form.closest('.modal')))
buttonRegistration.addEventListener('click', () => openModal(regForm.form.closest('.modal')))
