import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAccount } from "..";
import { useStore } from "@tanstack/react-store";
import { store } from "../../../../routeStore";
import { isRouteEnabled } from "../../sidebar";

export function Overview() {
    return (
        <div>
            <h3>Overview module</h3>
        </div>
    );
}

function Gate() {
    const sidebarState = useStore(store);

    if (!isRouteEnabled("/hosting/account/overview", sidebarState.sidebar)) {
        return <p>404</p>;
    }

    return <HostingAccount />;
}

export const hostingAccountOverviewRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "account/overview",
    component: Gate,
});
