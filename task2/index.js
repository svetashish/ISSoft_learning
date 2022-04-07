let buttonLogin = document.querySelector('.login');
let buttonRegistration = document.querySelector('.registation');

let wrapper =  document.querySelector('.wrapper');
let container =document.querySelector('.container');
let modalLogin = document.querySelector('.modal-window__login');
let modalRegistration = document.querySelector('.modal-window__registration');



buttonLogin.addEventListener('click', () => {
  wrapper.style.backgroundColor = 'rgba(138, 133, 133, 0.849)';
  modalLogin.style.display = 'flex';
  container.style.display = 'none';
})

buttonRegistration.addEventListener('click', () => {
  wrapper.style.backgroundColor = 'rgba(138, 133, 133, 0.849)';
  modalRegistration.style.display = 'flex';
  container.style.display = 'none';
})