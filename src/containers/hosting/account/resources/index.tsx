import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAccount } from "..";

export function Resources() {
    return (
        <div>
            <h3>Resources module</h3>
        </div>
    );
}

export const hostingAccountResourcesRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "account/resources",
    component: HostingAccount,
});
