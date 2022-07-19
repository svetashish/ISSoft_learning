import { PageUserPost } from "../pages/Page-user_post";
import "../style/user-page/page.css";
import "../style/user-page/posts.css";

const editFormParams = ["title", "description", "image"];
const renderedPagePosts = new PageUserPost(editFormParams);
renderedPagePosts.renderData();
