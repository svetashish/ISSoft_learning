import { EditForm } from "../forms/EditForm.js";
import { PopUp } from "../common-classes/PopUp.js";
import { DataLayer } from "../common-classes/DataLayer.js";
import { Error } from "../common-classes/Error.js";
import { removeAttribute } from "../helpers/removeAttribute.js";
import { createElementsDataUser } from "../helpers/createElementsDataUser.js";
import { Page } from "./Page.js";
import { DeleteConfirmForm } from "../forms/DeleteConfirmForm.js";

export class PageUsers extends Page {
  constructor(keyName, editParams) {
    super(keyName, editParams);
    this.keyName = keyName;
    this.editParams = editParams;
    this.email = null;
    this.EditForm = new EditForm(
      ".modal-content__edit",
      this.keyName,
      this.editParams,
      this.renderData.bind(this)
    );
    this.deleteForm = new DeleteConfirmForm(
      ".modal-content__delete",
      this.keyName,
      this.renderData.bind(this)
    );
    window.addEventListener("storage", this.renderData.bind(this));
  }

  renderData() {
    super.renderData();

    const [data, keys] = this.dataBase.getData(this.keyName);
    keys.forEach((key) => this.renderKey(key));
  }

  renderKey(key) {
    this.email = key;

    const [data, keys] = this.dataBase.getData(this.keyName);

    const user = document.createElement("div");
    user.classList.add("user");
    user.setAttribute("data-user", `${key}`);
    const userInfo = document.createElement("div");
    userInfo.classList.add("user_info");

    const userMail = document.createElement("div");
    userMail.classList.add("user_email");
    userMail.append(key);
    userInfo.append(userMail);

    const initialData = Object.entries(data[`${key}`]);
    this.editParams.map((item) =>
      createElementsDataUser(item, userInfo, initialData)
    );

    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("btn-edit");
    const buttonDelete = document.createElement("button");
    buttonEdit.classList.add("btn-delete");

    buttonEdit.innerText = "Edit";
    buttonDelete.innerText = "Delete";
    buttonDelete.addEventListener("click", () => this.handleDeleteClick(key));
    buttonEdit.addEventListener("click", () => this.handleEditClick(key));

    user.append(userInfo, buttonEdit, buttonDelete);
    this.wrapperdata.append(user);
  }

  handleDeleteClick(email) {
    removeAttribute(".error");

    const [object, arrayOfToken] = this.dataBase.getData("token");

    if (arrayOfToken.includes(email)) {
      const errorMessage = new Error(
        `${email}, you can\'t delete yourself! Please, choose another one.`,
        false
      );
      document.querySelector("h3").after(errorMessage.addErrorToForm());
    } else {
      this.deleteForm.setEmail(email);
      const openedPopUpDelete = new PopUp();
      openedPopUpDelete.openForm(this.deleteForm.form.closest(".modal"));
    }
  }

  handleEditClick(email) {
    const openPopUpEdit = new PopUp();
    openPopUpEdit.openForm(this.EditForm.form.closest(".modal"));
    this.EditForm.setInitialData(email);
  }
}
  