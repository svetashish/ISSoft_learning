import { removeAttribute } from "../helpers/removeAttribute.js";

export class Page {
  constructor() {
    this.container = document.querySelector(".container");
    this.buttonBack = document.querySelector(".back");
    this.buttonBack.addEventListener("click", () => this.handleBackClick());
    this.wrapperdata;

    window.addEventListener("click", this.handleCheckToken.bind(this));
  }

  renderData() {
    removeAttribute(".wrapper-data");
    this.wrapperdata = document.createElement("div");
    this.wrapperdata.classList.add("wrapper-data");
    this.container.append(this.wrapperdata);
  }

  handleBackClick() {
    localStorage.removeItem("token");
  }

  handleCheckToken() {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.hash = "/";
    }
  }
}
