import { EditForm } from "../forms/EditForm.js";
import { PopUp } from "../common-classes/PopUp.js";
import { DataLayer } from "../common-classes/DataLayer.js";
import { Error } from "../common-classes/Error.js";
import { removeAttribute } from "../helpers/removeAttribute.js";
import { createElements } from "../helpers/createElements.js";
import { Page } from "./Page.js";

export class PageUsers extends Page {
  constructor(keyName, editParams) {
    super(keyName, editParams);
    this.keyName = keyName;
    this.editParams = editParams;
    this.EditForm = new EditForm(
      ".modal-content__edit",
      this.keyName,
      this.editParams,
      this.renderKey.bind(this),
    );
  }

  renderData() {
    super.renderData();
    const dataBase = new DataLayer();
    const [data, keys] = dataBase.getData(this.keyName);

    keys.forEach((key) => this.renderKey(key));
  }

  renderKey(key) {

    const dataBase = new DataLayer();
    const [data, keys] = dataBase.getData(this.keyName);
  
    const user = document.createElement("div");
    user.classList.add("user");
    user.setAttribute('data-user', `${key}`);
    const userInfo = document.createElement("div");
    userInfo.classList.add("user_info");


    const userMail = document.createElement("div");
    userMail.classList.add("user_email");
    userMail.append(key);
    userInfo.append(userMail);

    const initialData = Object.entries(data[`${key}`]);
    this.editParams.map((item) => createElements(item, userInfo, initialData));

    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("btn-edit");
    const buttonDelete = document.createElement("button");
    buttonEdit.classList.add("btn-delete");

    buttonEdit.innerText = "Edit";
    buttonDelete.innerText = "Delete";
    buttonDelete.addEventListener("click", () =>
      this.handleDeleteClick(dataBase, data, key, this.keyName)
    );
    buttonEdit.addEventListener("click", () => this.handleEditClick(key));

    user.append(userInfo, buttonEdit, buttonDelete);
    this.wrapperdata.append(user);
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
}
