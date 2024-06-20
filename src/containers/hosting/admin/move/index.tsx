import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAdmin } from "..";
import { useStore } from "@tanstack/react-store";
import { store } from "../../../../routeStore";
import { isRouteEnabled } from "../../sidebar";

export function Move() {
    return <h3>Move module</h3>;
}

function Gate() {
    const sidebarState = useStore(store);

    if (!isRouteEnabled("/hosting/admin/move", sidebarState.sidebar)) {
        return <p>404</p>;
    }

    return <HostingAdmin />;
}

export const hostingAdminMoveRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "admin/move",
    component: Gate,
});
