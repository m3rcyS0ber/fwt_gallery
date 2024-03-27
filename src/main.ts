import "@/styles/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import vscrollable from "@/directives/vscrollable";
import vClickOutside from "@/directives/vClickOutside";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.directive("scrollable", vscrollable);
app.directive("click-outside", vClickOutside);
app.mount("#app");
