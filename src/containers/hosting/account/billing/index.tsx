import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAccount } from "..";
import { isRouteEnabled } from "../../sidebar";
import { useStore } from "@tanstack/react-store";
import { store } from "../../../../routeStore";
import { AnimatePresence } from "../../../../components/AnimatePresence";
import { useState } from "react";

export function Billing() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div>
            <h3>Billing module</h3>
            <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
                Toggle dropdown
            </button>
            {isDropdownOpen ? <div>The dropdown is open</div> : null}
        </div>
    );
}

function Gate() {
    const sidebarState = useStore(store);

    function getJsx() {
        if (!isRouteEnabled("/hosting/account/billing", sidebarState.sidebar)) {
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

export const hostingAccountBillingRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "account/billing",
    component: Gate,
});
