import "@/styles/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import vScrollable from "@/directives/vscrollable";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.directive("scrollable", vScrollable);
app.mount("#app");
