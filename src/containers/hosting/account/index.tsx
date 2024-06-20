import { useStore } from "@tanstack/react-store";
import { Billing } from "./billing";
import { Overview } from "./overview";
import { Resources } from "./resources";
import { store } from "../../../routeStore";
import { isRouteEnabled } from "../sidebar";

export function HostingAccount() {
    const sidebarState = useStore(store);

    return (
        <div>
            <h2>Account Section</h2>
            <div>
                {isRouteEnabled(
                    "/hosting/account/overview",
                    sidebarState.sidebar
                ) && <Overview />}
                {isRouteEnabled(
                    "/hosting/account/billing",
                    sidebarState.sidebar
                ) && <Billing />}
                {isRouteEnabled(
                    "/hosting/account/resources",
                    sidebarState.sidebar
                ) && <Resources />}
            </div>
        </div>
    );
}
