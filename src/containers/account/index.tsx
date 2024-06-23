import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../main";
import { useState } from "react";
import { AnimatePresence } from "../../components/AnimatePresence";

function Account() {
    const [count, setCount] = useState(0);

    return (
        <AnimatePresence.Child>
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
        </AnimatePresence.Child>
    );
}

export const accountRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/account",
    component: Account,
});
