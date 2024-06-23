import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";
import { AnimatePresence } from "../../components/AnimatePresence";

function Wallet() {
    return (
        <AnimatePresence.Child>
            <h1 key="/wallet">Wallet</h1>
        </AnimatePresence.Child>
    );
}

export const walletRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/wallet",
    component: Wallet,
});
