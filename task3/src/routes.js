import { HomeComponent } from './components/home-component.js';
import { UserComponent } from './components/user-components.js';
import { guard } from './guards/guardTokenExist.js';

export default [
  { path: "/", component: HomeComponent, guards: [guard] },
  { path: "/users", component: UserComponent, guards: [guard] },
];