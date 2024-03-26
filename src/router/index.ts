import Home from "@/components/views/home.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NotFound from "@/components/views/notFound.vue";
import { AppRouteRecord } from "@/types/routerUtils";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/:pathMatch(.*)", name: "NotFound", component: NotFound },
] as const satisfies readonly AppRouteRecord[];
const router = createRouter({
  routes: routes as unknown as RouteRecordRaw[],
  history: createWebHistory("/"),
});
// type TRoutes = typeof routes;
// type TRouteNames = GetRouteNames<TRoutes>;
export default router;
