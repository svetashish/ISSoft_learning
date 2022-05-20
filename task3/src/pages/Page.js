import { DataLayer } from "../common-classes/DataLayer.js";
import { removeAttribute } from "../helpers/removeAttribute.js";


export class Page {
  constructor() {
    this.container = document.querySelector(".container");
    this.buttonBack = document.querySelector(".back");
    this.buttonBack.addEventListener("click", () => this.handleBackClick());
    this.wrapperdata;

    window.addEventListener("unload", this.handleUnload.bind(this));
  }

  renderData() {
    removeAttribute(".wrapper-data");

    this.wrapperdata = document.createElement("div");
    this.wrapperdata.classList.add("wrapper-data");
    this.container.append(this.wrapperdata);
  }

  handleBackClick() {
    const dataBase = new DataLayer();
    dataBase.deleteTableOfData("token");
  }

  handleUnload() {
    //TODO не понимаю зачем я удаляю таблицу с токеном, эмм

    // const dataBase = new DataLayer();
    // dataBase.deleteTableOfData("token");
  }
}
