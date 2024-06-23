import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";
import { MyAnimateChild } from "../../utils/MyAnimate";
import { useState } from "react";

function Account() {
    const [count, setCount] = useState(0);

    return (
        <MyAnimateChild>
            <div key="/account">
                <h1>Account</h1>
                <button
                    type="button"
                    onClick={() => setCount((prev) => prev + 1)}
                >
                    Increment
                </button>
                <div>Count: {count}</div>
            </div>
        </MyAnimateChild>
    );
}

export const accountRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/account",
    component: Account,
});
