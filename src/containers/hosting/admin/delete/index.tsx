import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAdmin } from "..";
import { useStore } from "@tanstack/react-store";
import { store } from "../../../../routeStore";
import { isRouteEnabled } from "../../sidebar";
import { AnimatePresence } from "../../../../components/AnimatePresence";

export function Delete() {
    return <h3>Delete module</h3>;
}

function Gate() {
    const sidebarState = useStore(store);

    function getJsx() {
        if (!isRouteEnabled("/hosting/admin/delete", sidebarState.sidebar)) {
            return <p>404</p>;
        }

        return <HostingAdmin />;
    }

    return (
        <AnimatePresence.Child>
            <div key="/hosting/admin">{getJsx()}</div>
        </AnimatePresence.Child>
    );
}

export const hostingAdminDeleteRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "admin/delete",
    component: Gate,
});
