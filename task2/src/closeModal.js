export class CloseModal {
  constructor(form) {
    this.form = form;
    this.container = document.querySelector('.container');
    this.errors = document.querySelectorAll('.error');
  }

  closeForm() {
    this.form.style.display = 'none';
    this.container.style.display = 'flex';
    this.form.querySelectorAll('input')
      .forEach(input => {
        input.value = "";
        input.style.border = '1px solid #000';
      });  
      
    for (let error of this.errors) {
        error.remove();
    }    
  }
}