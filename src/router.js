import { createWebHistory, createRouter } from "vue-router";

import Sysinfo from "./SysInfo.vue"

const routes = [
  {
    path: "/",
    name: "Umolab Devices",
    component: Sysinfo,
    icon: "fas fa-home",
    ID: "HOME",
    visible: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
