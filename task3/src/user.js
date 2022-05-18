import { PageUsers } from "./pages/Page-users.js";

const editFormParams = ["sex", "name", "birth", "number"];
const renderData = 'users';
const renderedPage = new PageUsers(renderData, editFormParams);
renderedPage.renderData();
