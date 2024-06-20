import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";

function Wallet() {
    return <h1>Wallet</h1>;
}

export const walletRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/wallet",
    component: Wallet,
});
