import { Page } from "./src/Page.js";

const container = document.querySelector(".container");

const renderPage = new Page('users', container);
renderPage.renderData();

