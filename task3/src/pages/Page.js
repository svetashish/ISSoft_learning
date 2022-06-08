import { DataLayer } from "../common-classes/DataLayer.js";
import { removeAttribute } from "../helpers/removeAttribute.js";

export class Page {
  constructor() {
    this.dataBase = new DataLayer();
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
    this.dataBase.deleteTableOfData("token");
  }

  handleCheckToken() {
    if (!this.dataBase.getData("token")[1].length) {
      window.location.hash = "/";
    }
  }
}
