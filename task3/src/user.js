import { PageUsers } from "./pages/Page-users.js";
import "./style/user-page/page.css";

const editFormParams = ["sex", "name", "birth", "number"];
const renderData = 'users';
const renderedPage = new PageUsers(renderData, editFormParams);
renderedPage.renderData();
