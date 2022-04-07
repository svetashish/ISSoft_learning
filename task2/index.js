let buttonLogin = document.querySelector('.login');
let buttonRegistration = document.querySelector('.registation');

let container = document.querySelector('.container');
let modal =  document.querySelectorAll('.modal');
let modalLogin = document.querySelector('.modal-window__login');
let modalRegistration = document.querySelector('.modal-window__registration');

let closeButton = document.querySelectorAll('.close');

const openModal = (element) => {
  element.style.display = 'block';
  container.style.display = 'none';
};

const closeModal = (element) => {
  element.style.display = 'none';
  container.style.display = 'flex';
};

if (modal.length > 0) {
  buttonLogin.addEventListener('click', () => openModal(modal[0]))
  
  buttonRegistration.addEventListener('click', () => openModal(modal[1]))

  for (let i = 0; i < modal.length; i++){
    closeButton[i].addEventListener('click', () => closeModal(modal[i]));

    window.addEventListener('click', (event) => {
      for (let i = 0; i < modal.length; i++) {
        if (event.target == modal[i]) closeModal(modal[i])
      }
    })
  }
}
