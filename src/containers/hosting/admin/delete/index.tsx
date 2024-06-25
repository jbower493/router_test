import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAdmin } from "..";

export function Delete() {
    return <h3>Delete module</h3>;
}

export const hostingAdminDeleteRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "admin/delete",
    component: HostingAdmin,
});
