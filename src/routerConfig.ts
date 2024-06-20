import { ParseRoute } from "@tanstack/react-router";
import { routeTree } from "./main";

export type ValidRoute = ParseRoute<typeof routeTree>["fullPath"];
type RouterConfig = Record<ValidRoute, { enabled: boolean; label?: string }>;

export const brand: "Brand 1" | "Brand 2" = "Brand 2" as "Brand 1" | "Brand 2";

const brand1Config: RouterConfig = {
    "/": {
        enabled: true,
    },
    "/account": {
        enabled: true,
    },
    "/wallet": {
        enabled: true,
    },
    "/hosting": {
        enabled: true,
    },
    "/hosting/account/overview": {
        enabled: true,
        label: "Overview",
    },
    "/hosting/account/billing": {
        enabled: true,
        label: "Billing",
    },
    "/hosting/account/resources": {
        enabled: true,
        label: "Resources",
    },
    "/hosting/admin/move": {
        enabled: true,
        label: "Move",
    },
    "/hosting/admin/delete": {
        enabled: true,
        label: "Delete",
    },
};

const brand2Config: RouterConfig = {
    "/": {
        enabled: true,
    },
    "/account": {
        enabled: true,
    },
    "/wallet": {
        enabled: true,
    },
    "/hosting": {
        enabled: true,
    },
    "/hosting/account/overview": {
        enabled: true,
        label: "Overview",
    },
    "/hosting/account/billing": {
        enabled: true,
        label: "Billing",
    },
    "/hosting/account/resources": {
        enabled: false,
        label: "Resources",
    },
    "/hosting/admin/move": {
        enabled: false,
        label: "Move",
    },
    "/hosting/admin/delete": {
        enabled: true,
        label: "Delete",
    },
};

export const routerConfig = brand === "Brand 1" ? brand1Config : brand2Config;
