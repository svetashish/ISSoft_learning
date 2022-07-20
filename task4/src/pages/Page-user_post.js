import { Page } from "./Page.js";
import { PostForm } from "../forms/PostForm.js";
import { PopUp } from "../common-classes/PopUp.js";
import { dataBaseApi } from "../api/api.js";
import { createElementsDataUser } from "../helpers/createElementsDataUser.js";

export class PageUserPost extends Page {
  constructor(editParams) {
    super();
    this.editParams = editParams;
    this.email = null;
    this.PostForm = new PostForm(
      ".modal-content__post",
      this.editParams,
      this.renderData.bind(this)
    );
    this.buttonAllUsers = document.querySelector(".all_users");
    this.buttonAllUsers.addEventListener("click", () =>
      this.handleAllUsersClick()
    );
  }

  async renderData() {
    super.renderData();

    try {
      const ckeckedEmail = await dataBaseApi.checkTokenForDelete();
      const responsData = await dataBaseApi.getDataByEmail(
        ckeckedEmail.username
      );
      this.renderKey(responsData);
    } catch (error) {
      console.error(error);
    }
  }

  renderKey(data) {
    const someStr = this.editParams
      .map((item) => createElementsDataUser(item, data))
      .join("");

    const user = `
      <div class="user" data-user="${data.email}">
        <div class="wrapper user_info">
            <div class="user_info">
                <h3 class="user_email">${data.email}</h3>
                ${someStr}
                <button class="btn-create">Create post</button>
            </div>    
        </div>     
        <div class="all_posts">
        ${data.posts
          .map(
            (post) => `
            <div class="post">
                <h3 class="post_title">${post.title}</h3>
                <div class="post_description">${post.description}</div>
                <div class="post_photo">Photo</div>
            </div>`
          )
          .join(" ")}
        </div>
    </div>`;

    this.wrapperdata.insertAdjacentHTML("beforeend", user);
    
    this.wrapperdata
      .querySelector('.btn-create')
      .addEventListener("click", this.handlePostClick.bind(this));
  }

  handlePostClick() {
    const openPopUpPost = new PopUp();
    openPopUpPost.openForm(this.PostForm.form.closest(".modal"));
  }

  handleAllUsersClick() {
    //теряется токен

    window.location.hash = "/users";
  }
}
