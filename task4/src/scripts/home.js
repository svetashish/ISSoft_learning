import { LoginForm } from "../forms/LoginForm.js";
import { PopUp } from "../common-classes/PopUp.js";
import { RegistrartionForm } from "../forms/RegistrationForm.js";
import "../style/srart-page/toggle-button.css";

const buttonLogin = document.querySelector(".login");
const buttonRegistration = document.querySelector(".registation");

const regData = ["email", "password"];
const loginForm = new LoginForm(".modal-content__login", regData);
const regForm = new RegistrartionForm(
  ".modal-content__registration",
  regData
);

const openedPopUpLogin = new PopUp();
const openedPopUpReg = new PopUp();

buttonLogin.addEventListener("click", () =>
  openedPopUpLogin.openForm(loginForm.form.closest(".modal"))
);
buttonRegistration.addEventListener("click", () =>
  openedPopUpReg.openForm(regForm.form.closest(".modal"))
);
