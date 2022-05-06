import { Page } from "./src/Page.js";

const editFormParams = ["sex", "name", "birth", "number"];
const renderedPage = new Page('users', editFormParams);
renderedPage.renderData();

