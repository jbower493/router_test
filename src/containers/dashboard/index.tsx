import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";
import { MyAnimateChild } from "../../utils/MyAnimate";

function Dashboard() {
    return (
        <MyAnimateChild>
            <h1 key="/">Dashboard</h1>
        </MyAnimateChild>
    );
}

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Dashboard,
});
