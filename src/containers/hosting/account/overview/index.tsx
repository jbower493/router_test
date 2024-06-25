import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAccount } from "..";

export function Overview() {
    return (
        <div>
            <h3>Overview module</h3>
        </div>
    );
}

export const hostingAccountOverviewRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "account/overview",
    component: HostingAccount,
});
