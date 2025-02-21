import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import "vue3-toastify/dist/index.css";
import Vue3Toastify from "vue3-toastify";

const pinia = createPinia();
pinia.use(piniaPersist); //

const app = createApp(App);
app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 7500,
  newestOnTop: true,
  position: "top-right",
});

app.use(router).mount("#app");
