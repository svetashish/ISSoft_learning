import { EditForm } from "../forms/EditForm.js";
import { PopUp } from "../common-classes/PopUp.js";
import { Error } from "../common-classes/Error.js";
import { removeAttribute } from "../helpers/removeAttribute.js";
import { createElementsDataUser } from "../helpers/createElementsDataUser.js";
import { Page } from "./Page.js";
import { DeleteConfirmForm } from "../forms/DeleteConfirmForm.js";
import { DownLoadForm } from "../forms/DownLoadForm.js";
import { dataBaseApi } from "../api/api.js";

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
    this.downloadForm = new DownLoadForm(".download-form");
    window.addEventListener("storage", this.renderData.bind(this));
  }

  async renderData() {
    super.renderData();

    try {
      const responsData = await dataBaseApi.getData();
      responsData.forEach((item) => this.renderKey(item));
    } catch (error) {
      console.error(error);
    }
  }

  renderKey(data) {
    const someStr = this.editParams
      .map((item) => createElementsDataUser(item, data))
      .join("");

    const user = `
      <div style="background: antiquewhite;" class="user" data-user="${data.email}">
       <div class="user_info">
          <div class="user_email">${data.email}</div>
          ${someStr}
        </div>
      <button class="btn-edit" data-edit="${data.email}">Edit</button>
      <button class="btn-delete" data-delete="${data.email}">Delete</button>
    </div>`;

    this.wrapperdata.insertAdjacentHTML("beforeend", user);

    this.wrapperdata
      .querySelector(`[data-edit="${data.email}"]`)
      .addEventListener("click", this.handleEditClick.bind(this, data.email));
    this.wrapperdata
      .querySelector(`[data-delete="${data.email}"]`)
      .addEventListener("click", this.handleDeleteClick.bind(this, data.email));
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
