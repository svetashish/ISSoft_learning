let buttonLogin = document.querySelector('.login');
let buttonRegistration = document.querySelector('.registation');

let container = document.querySelector('.container');
let modal =  document.querySelectorAll('.modal');
let forms = document.querySelectorAll('.modal-content');

let closeButton = document.querySelectorAll('.close');
let input = document.querySelectorAll('input');

// open/close modal

const openModal = (element) => {
  element.style.display = 'block';
  container.style.display = 'none';
};

const closeModal = (element) => {
  element.style.display = 'none';
  container.style.display = 'flex';
  element.querySelectorAll('input').forEach(input => input.value = "")    // ???
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

//input-ы  ввод данных

const handleOnChange = (event, element) => {
  element.value = event.target.value
  console.log(element.value);
} 

if (input.length > 0) {
  for (let i = 0; i < input.length; i++){
    input[i].addEventListener('change', () => handleOnChange(event, input[i]))
  }
};


// submit button

forms.forEach(form => form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('clic');
  closeModal(form.closest('.modal'))
}))