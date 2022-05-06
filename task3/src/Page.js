import { EditForm } from "./forms/EditForm.js";
import { PopUp } from "./PopUp.js";
import { DataLayer } from "./DataLayer.js";
import { Error } from "./Error.js";
import { removeAttribute } from "./helpers/removeAttribute.js";
import { createElements } from "./helpers/createElements.js";

export class Page {
  constructor(keyName, editParams) {
    this.keyName = keyName;
    this.editParams = editParams;
    this.container = document.querySelector(".container");
    this.buttonBack = document.querySelector(".back");
    this.buttonBack.addEventListener("click", () => this.handleBackClick());
    this.EditForm = new EditForm(
      ".modal-content__edit",
      this.keyName,
      this.editParams,
      // this.renderData,
    );
    window.addEventListener("unload", this.handleUnload.bind(this));
  }

  renderData() {
    const dataBase = new DataLayer();
    const [data, keys] = dataBase.getData(this.keyName);

    removeAttribute(".wrapper-data");

    const wrapperdata = document.createElement("div");
    wrapperdata.classList.add("wrapper-data");
    this.container.append(wrapperdata);

    keys.map((key) => {

      const user = document.createElement("div");
      user.classList.add("user");
      const userInfo = document.createElement("div");
      userInfo.classList.add("user_info");

      const userMail = document.createElement("div");
      userMail.classList.add("user_email");
      userMail.append(key);
      userInfo.append(userMail);

      const initialData = Object.entries(data[`${key}`]);
      this.editParams.map((item) =>
        createElements(item, userInfo, initialData)
      );

      const buttonEdit = document.createElement("button");
      buttonEdit.classList.add('btn-edit');
      const buttonDelete = document.createElement("button");
      buttonEdit.classList.add('btn-delete');

      buttonEdit.innerText = "Edit";
      buttonDelete.innerText = "Delete";
      buttonDelete.addEventListener("click", () =>
        this.handleDeleteClick(dataBase, data, key, this.keyName)
      );
      buttonEdit.addEventListener("click", () => this.handleEditClick(key));

      user.append(userInfo, buttonEdit, buttonDelete);
      wrapperdata.append(user);
    });
  }



  handleDeleteClick(dataBase, data, email, keyName) {
    removeAttribute(".error");
    const [object, arrayOfToken] = dataBase.getData("token");

    if (arrayOfToken.includes(email)) {
      const errorMessage = new Error(
        `${email}, you can\'t delete yourself! Please, choose another one.`,
        false
      );
      document.querySelector("h3").after(errorMessage.addErrorToForm());
    } else {
      dataBase.deleteData(data, email, keyName);

      this.renderData();
    }
  }

  handleEditClick(email) {
    const openPopUpEdit = new PopUp();
    openPopUpEdit.openForm(this.EditForm.form.closest(".modal"));
    this.EditForm.setInitialData(email);
  }

  handleBackClick() {
    window.location.href = "http://127.0.0.1:5500/issoft/task3";
    const dataBase = new DataLayer();
    dataBase.deleteTableOfData("token");
  }

  handleUnload() {
    const dataBase = new DataLayer();
    dataBase.deleteTableOfData("token");
  }
}
