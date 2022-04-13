export class Error {
  constructor (error, isPadding) {
    this.errorText = error;
    this.padding = isPadding;
  }  

  addErrorToForm () {
      const error = document.createElement('div');
      error.className = 'error';
      error.style.color = 'red';
      error.innerHTML = this.errorText;

      if (this.padding) {
        error.style.paddingTop = "5px";
        error.style.paddingLeft = "27%";
      }
      return error;
  }
}

