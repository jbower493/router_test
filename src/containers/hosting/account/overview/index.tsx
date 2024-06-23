import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAccount } from "..";
import { useStore } from "@tanstack/react-store";
import { store } from "../../../../routeStore";
import { isRouteEnabled } from "../../sidebar";
import { AnimatePresence } from "../../../../components/AnimatePresence";

export function Overview() {
    return (
        <div>
            <h3>Overview module</h3>
        </div>
    );
}

function Gate() {
    const sidebarState = useStore(store);

    function getJsx() {
        if (
            !isRouteEnabled("/hosting/account/overview", sidebarState.sidebar)
        ) {
            return <p>404</p>;
        }

        return <HostingAccount />;
    }

    return (
        <AnimatePresence.Child parentId="2">
            <div key="/hosting/account">{getJsx()}</div>
        </AnimatePresence.Child>
    );
}

export const hostingAccountOverviewRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "account/overview",
    component: Gate,
});
