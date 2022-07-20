import axios from "axios";

export class DownLoadForm {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.form.addEventListener("submit", this.handleSubmitForm.bind(this));
  }

  async handleSubmitForm(event) {
    event.preventDefault();
    await axios.post("http://localhost:3029/", new FormData(this.form));
  }
}
