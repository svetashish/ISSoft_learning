let buttonLogin = document.querySelector('.login');
let buttonRegistration = document.querySelector('.registation');

let container = document.querySelector('.container');
let modal =  document.querySelectorAll('.modal');
let modalLogin = document.querySelector('.modal-window__login');
let modalRegistration = document.querySelector('.modal-window__registration');

let closeButton = document.querySelectorAll('.close');

if (modal.length > 0) {
  buttonLogin.addEventListener('click', () => {
    modal[0].style.display = 'block';
    container.style.display = 'none';
  });
  
  buttonRegistration.addEventListener('click', () => {
    modal[1].style.display = 'block';
    container.style.display = 'none';
  });

  for (let i = 0; i < modal.length; i++){
    closeButton[i].addEventListener('click', () => {
      modal[i].style.display = 'none';
      container.style.display = 'flex';
      });
  }
  window.onclick = function(event) {
    for (let i = 0; i < modal.length; i++){
      if (event.target == modal[i]) {
        modal[i].style.display = "none";
        container.style.display = 'flex';
      }
    }
  }
}
