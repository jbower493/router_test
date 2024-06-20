import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAccount } from "..";
import { isRouteEnabled } from "../../sidebar";
import { useStore } from "@tanstack/react-store";
import { store } from "../../../../routeStore";

export function Billing() {
    return (
        <div>
            <h3>Billing module</h3>
        </div>
    );
}

function Gate() {
    const sidebarState = useStore(store);

    if (!isRouteEnabled("/hosting/account/billing", sidebarState.sidebar)) {
        return <p>404</p>;
    }

    return <HostingAccount />;
}

export const hostingAccountBillingRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "account/billing",
    component: Gate,
});
