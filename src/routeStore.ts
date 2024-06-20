import { Store } from "@tanstack/store";
import { routerConfig } from "./routerConfig";

export type SidebarState = Record<keyof typeof routerConfig, boolean>;

const sidebarInitialState: SidebarState = {
    "/": true,
    "/account": true,
    "/wallet": true,
    "/hosting": true,
    "/hosting/account/billing": true,
    "/hosting/account/overview": true,
    "/hosting/account/resources": true,
    "/hosting/admin/delete": true,
    "/hosting/admin/move": true,
};

export const store = new Store({
    sidebar: sidebarInitialState,
});
