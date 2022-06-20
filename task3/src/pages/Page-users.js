import { EditForm } from "../forms/EditForm.js";
import { PopUp } from "../common-classes/PopUp.js";
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
    const initialData = Object.entries(data[`${key}`]);

    const someStr = this.editParams
      .map((item) => createElementsDataUser(item, initialData)).join("");

    const user = `
      <div class="user" data-user="${key}">
        <div class="user_info">
          <div class="user_email">${key}</div>
          ${someStr}
        </div>
      <button class="btn-edit" data-edit="${key}">Edit</button>
      <button class="btn-delete" data-delete="${key}">Delete</button>
    </div>`;

    this.wrapperdata.insertAdjacentHTML("beforeend", user);

    this.wrapperdata
      .querySelector(`[data-edit="${key}"]`)
      .addEventListener("click", this.handleEditClick.bind(this, key));
    this.wrapperdata
      .querySelector(`[data-delete="${key}"]`)
      .addEventListener("click", this.handleDeleteClick.bind(this, key));
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
