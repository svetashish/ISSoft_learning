import { EditForm } from "./EditForm.js";
import { PopUp } from "./PopUp.js";
import { DataLayer } from "./DataLayer.js";
import { Error } from "./Error.js";
import { removeAttribute } from "./helpers/removeAttribute.js";

export class Page {
  constructor(keyName, container) {
    this.keyName = keyName;
    this.container = container;
    this.buttonBack = document.querySelector(".back");
    this.buttonBack.addEventListener("click", () => this.handleBackClick());
  }

  renderData() {
    const dataBase = new DataLayer();
    const [data, keys] = dataBase.getData(this.keyName);

    [".wrapper-data", ".error"].map((param) => removeAttribute(param));

    const wrapperdata = document.createElement("div");
    wrapperdata.classList.add("wrapper-data");
    this.container.append(wrapperdata);

    keys.map((key) => {
      const user = document.createElement("div");
      user.classList.add("user");
      const userName = document.createElement("div");
      userName.classList.add("user-name");
      const buttonEdit = document.createElement("button");
      const buttonDelete = document.createElement("button");

      userName.append(key);
      buttonEdit.innerText = "Edit";
      buttonDelete.innerText = "Delete";
      buttonDelete.addEventListener("click", () =>
        this.handleDeleteClick(dataBase, data, key, this.keyName)
      );
      buttonEdit.addEventListener("click", () => this.handleEditClick(key));

      user.append(userName, buttonEdit, buttonDelete);
      wrapperdata.append(user);
    });
  }

  handleDeleteClick(dataBase, data, id, keyName) {
    const [object, arrayOfToken] = dataBase.getData("token");

    if (arrayOfToken.includes(id)) {
      const errorMessage = new Error(
        `${id}, you can\'t delete yourself! Please, choose another one.`,
        false
      );
      document.querySelector("h3").after(errorMessage.addErrorToForm());
    } else {
      dataBase.deleteData(data, id, keyName);

      this.renderData();
    }
  }

  handleEditClick(email) {
  

    const editForm = new EditForm(
      ".modal-content__edit",
      this.keyName,
      ["sex", "name", "birth", "number"],
      email
    );

    const openPopUpEdit = new PopUp();
    openPopUpEdit.openForm(editForm.form.closest(".modal"));
  }

  handleBackClick() {
    window.location.href = "http://127.0.0.1:5500/issoft/task3";
    const dataBase = new DataLayer();
    dataBase.deleteTableOfData("token");
  }
}
