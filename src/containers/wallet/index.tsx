import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";
import { MyAnimateChild } from "../../utils/MyAnimate";

function Wallet() {
    return (
        <MyAnimateChild>
            <h1 key="/wallet">Wallet</h1>
        </MyAnimateChild>
    );
}

export const walletRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/wallet",
    component: Wallet,
});
