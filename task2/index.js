import { LoginForm } from './src/LoginForm.js';
import { RegistrartionForm } from './src/RegistrationForm.js';


const buttonLogin = document.querySelector('.login');
const buttonRegistration = document.querySelector('.registation');

const container = document.querySelector('.container');
const regData = {
  'email': '',
  'password': '',
};
const tableName = 'users';

const loginForm = new LoginForm('.modal-content__login', tableName, regData);
const regForm = new RegistrartionForm('.modal-content__registration', tableName, regData);

const openModal = (element) => {
  element.style.display = 'block';
  container.style.display = 'none';
  
  if (document.querySelector('.wrapper__content .registration')){
    document.querySelector('.wrapper__content .registration').remove();
  }
};

buttonLogin.addEventListener('click', () => openModal(loginForm.form.closest('.modal')))
buttonRegistration.addEventListener('click', () => openModal(regForm.form.closest('.modal')))
