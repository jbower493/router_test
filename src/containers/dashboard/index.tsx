import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";
import { AnimatePresence } from "../../components/AnimatePresence";

function Dashboard() {
    return (
        <AnimatePresence.Child>
            <h1 key="/">Dashboard</h1>
        </AnimatePresence.Child>
    );
}

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Dashboard,
});
