import { LoginForm } from "./src/LoginForm.js";
import { PopUp } from "./src/PopUp.js";
import { RegistrartionForm } from "./src/RegistrationForm.js";

const buttonLogin = document.querySelector(".login");
const buttonRegistration = document.querySelector(".registation");

const regData = ["email", "password"];
const editData = ["sex", "name", "birth", "number"];
const tableName = "users";

const loginForm = new LoginForm(".modal-content__login", tableName, regData);
const regForm = new RegistrartionForm(
  ".modal-content__registration",
  tableName,
  regData
);

const openPopUpLogin = new PopUp();
const openPopUpReg = new PopUp();

buttonLogin.addEventListener("click", () =>
  openPopUpLogin.openForm(loginForm.form.closest(".modal"))
);
buttonRegistration.addEventListener("click", () =>
  openPopUpReg.openForm(regForm.form.closest(".modal"))
);
