import { RouteRecordRaw } from "vue-router";

type AppRouteRecord = Omit<RouteRecordRaw, "name" | "children"> & {
  name: string;
  children?: readonly AppRouteRecord[];
};
type GetRouteName<T extends AppRouteRecord> = T extends {
  children: readonly AppRouteRecord[];
}
  ? T["name"] | GetRoutesNames<T["children"]>
  : T["name"];
type GetRoutesNames<T extends readonly AppRouteRecord[]> = GetRouteName<
  T[number]
>;

export { type AppRouteRecord, type GetRouteName, type GetRoutesNames };
