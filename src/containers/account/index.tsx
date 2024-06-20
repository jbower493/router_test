import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";

function Account() {
    return <h1>Account</h1>;
}

export const accountRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/account",
    component: Account,
});
