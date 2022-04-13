import { Form } from './src/Form.js';

let buttonLogin = document.querySelector('.login');
let buttonRegistration = document.querySelector('.registation');

let container = document.querySelector('.container');
let modal = document.querySelectorAll('.modal');

let closeButton = document.querySelectorAll('.close');
let input = document.querySelectorAll('input');
let emptyField = document.querySelectorAll('.empty-field');



const loginForm = new Form(".modal-content__login");
const regForm = new Form(".modal-content__registration");

const openModal = (element) => {
  element.style.display = 'block';
  container.style.display = 'none';
};

const closeModal = (element) => {
  element.style.display = 'none';
  container.style.display = 'flex';
  element.querySelectorAll('input')
    .forEach(input => {
      input.value = "";
      input.style.border = '1px solid #000';
    });    // ???

    const errors = document.querySelectorAll('.error')
    for (let error of errors) {
      error.remove();
    }

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