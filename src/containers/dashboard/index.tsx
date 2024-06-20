import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";

function Dashboard() {
    return <h1>Dashboard</h1>;
}

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Dashboard,
});
