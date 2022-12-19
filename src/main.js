import "tw-elements";
import { createApp } from "vue";
import vue3GoogleLogin from 'vue3-google-login';
import App from "./App.vue";
import "./index.css";
import { router } from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faGoogle
} from "@fortawesome/free-brands-svg-icons";
import {
	faBars, faChevronDown, faCircleArrowRight, faCoffee, faHouse,
	faPlus,
	faRightFromBracket, faStar, faUser, faUserSecret
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store";
library.add(
  faUserSecret,
  faCoffee,
  faBars,
  faHouse,
  faRightFromBracket,
  faUser,
  faChevronDown,
  faStar,
  faCircleArrowRight,
  faGoogle,
  faPlus
);

const app = createApp(App);
app.use(store);
app.use(vue3GoogleLogin, {
  clientId: '201177533359-bs5s8rqtqlnmjo9bj0c8qlj4vu2f12mh.apps.googleusercontent.com'
})
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
