import routes from "./routes.js";
import { ErrorComponent } from "./components/error-components.js";
import './style/scope.css'

const parseLocation = () =>
  document.location.hash.slice(1).toLowerCase() || "/";

const findComponentByPath = (path, routes) =>
  routes.find((route) => route.path.match(new RegExp(`^${path}$`))) ||
  undefined;

const router = () => {
  const path = parseLocation();

  const { component = ErrorComponent, guards } =
    findComponentByPath(path, routes) || {};

  guards.map(guard => guard()) 
  console.log(guards.map(guard => guard()));
  document.getElementById("app").innerHTML = component.render();
  component.script();
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
