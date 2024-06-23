import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAccount } from "..";
import { useStore } from "@tanstack/react-store";
import { store } from "../../../../routeStore";
import { isRouteEnabled } from "../../sidebar";
import { AnimatePresence } from "../../../../components/AnimatePresence";

export function Resources() {
    return (
        <div>
            <h3>Resources module</h3>
        </div>
    );
}

function Gate() {
    const sidebarState = useStore(store);

    function getJsx() {
        if (
            !isRouteEnabled("/hosting/account/resources", sidebarState.sidebar)
        ) {
            return <p>404</p>;
        }

        return <HostingAccount />;
    }

    return (
        <AnimatePresence.Child>
            <div key="/hosting/account">{getJsx()}</div>
        </AnimatePresence.Child>
    );
}

export const hostingAccountResourcesRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "account/resources",
    component: Gate,
});
