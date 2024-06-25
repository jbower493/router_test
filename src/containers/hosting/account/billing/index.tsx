import { createRoute } from "@tanstack/react-router";
import { hostingRoute } from "../..";
import { HostingAccount } from "..";
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

export const hostingAccountBillingRoute = createRoute({
    getParentRoute: () => hostingRoute,
    path: "account/billing",
    component: HostingAccount,
});
