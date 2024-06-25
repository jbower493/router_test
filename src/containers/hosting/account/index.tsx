import { useStore } from "@tanstack/react-store";
import { Billing } from "./billing";
import { Overview } from "./overview";
import { Resources } from "./resources";
import { store } from "../../../routeStore";
import { isRouteEnabled } from "../sidebar";
import { AnimatePresence } from "../../../components/AnimatePresence";
import { useLocation } from "@tanstack/react-router";
import { ValidRoute } from "../../../routerConfig";

export function HostingAccount() {
    const sidebarState = useStore(store);
    const location = useLocation();

    if (
        !isRouteEnabled(location.pathname as ValidRoute, sidebarState.sidebar)
    ) {
        return (
            <AnimatePresence.Child parentId="2">
                <p key="/hosting/account/404">404</p>
            </AnimatePresence.Child>
        );
    }

    return (
        <AnimatePresence.Child parentId="2">
            <div key="/hosting/account">
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
        </AnimatePresence.Child>
    );
}
