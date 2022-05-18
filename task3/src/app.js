import routes from "./routes.js";
import { ErrorComponent } from "./components/error-components.js";


const parseLocation = () =>
  document.location.hash.slice(1).toLowerCase() || "/";   
  '/users'

const findComponentByPath = (path, routes) =>
  routes.find((route) => route.path.match(new RegExp(`^${path}$`))) ||
  undefined;

const router = () => {
  const path = parseLocation();


  // const object = {
  //   style: "red",
  //   render() {
  //     console.log(this);
  //   }
  // }

  // object.render();


  const { component = ErrorComponent } =
    findComponentByPath(path, routes) || {};  

  document.getElementById("app").innerHTML = component.render();
  component.script();


  
  // document.getElementById("added_script").src = component.script();
  
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);


