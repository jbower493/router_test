import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAdmin } from "..";

export function Move() {
    return <h3>Move module</h3>;
}

export const hostingAdminMoveRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "admin/move",
    component: HostingAdmin,
});
