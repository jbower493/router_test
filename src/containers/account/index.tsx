import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";
import { MyAnimateChild } from "../../utils/MyAnimate";

function Account() {
    return (
        <MyAnimateChild>
            <h1 key="/account">Account</h1>
        </MyAnimateChild>
    );
}

export const accountRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/account",
    component: Account,
});
