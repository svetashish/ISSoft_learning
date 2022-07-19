import { PageUsers } from "../pages/Page-users.js";
import "../style/user-page/page.css";

const editFormParams = ["sex", "name", "birth", "number"];

const renderedPageUsers = new PageUsers(editFormParams);
renderedPageUsers.renderData();
