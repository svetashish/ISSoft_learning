export class Error {
  constructor (errorMessage, isBottom) {
    this.errorMessage = errorMessage;
    this.position = isBottom;
  }  

  addErrorToForm () {
    const error = document.createElement('div');
    error.style.color = 'red';
    error.innerHTML = this.errorMessage;
    error.className = 'error';
     
    if(this.position) {
      error.style.paddingTop = "5px";
      error.style.paddingLeft = "27%";
    } else {
      error.classList.add("top");
      error.style.fontSize = "14px";
    }
    return error;
  }
}
