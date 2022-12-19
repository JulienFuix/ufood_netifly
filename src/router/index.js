import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import Register from "@/components/Register";
import Login from "@/components/loginPage";
import UnRegisterPage from "@/components/UnRegisterPage";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      { path: "/restaurants/:id", name: "Restaurant", component: Restaurant },
    ],
  },
  {
    path: "/restaurants/:id",
    name: "Restaurant",
    component: Restaurant,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/noregister",
    name: "unRegister",
    component: UnRegisterPage,
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
