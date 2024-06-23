import { Outlet, createRoute } from "@tanstack/react-router";
import { HostingSidebar } from "./sidebar";
import { rootRoute } from "../../main";
import { useEffect, useState } from "react";
import { store } from "../../routeStore";
import { AnimatePresence } from "../../components/AnimatePresence";

function Hosting() {
    const [isLoading, setIsLoading] = useState(true);

    function updateStore() {
        store.setState((state) => {
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    "/hosting/account/overview": true,
                    "/hosting/account/billing": true,
                    "/hosting/account/resources": true,
                    "/hosting/admin/move": true,
                    "/hosting/admin/delete": true,
                },
            };
        });
    }

    useEffect(() => {
        setTimeout(() => {
            updateStore();
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <AnimatePresence.Child>
            <div key="/hosting">
                <h1>Hosting</h1>
                {isLoading ? <p>Hosting page loading</p> : <HostingSidebar />}
                <hr />
                {isLoading ? (
                    <p>Hosting page loading</p>
                ) : (
                    <AnimatePresence>
                        <Outlet />
                    </AnimatePresence>
                )}
                {/* {isLoading ? <p>Hosting page loading</p> : <h2>Not loading</h2>} */}
            </div>
        </AnimatePresence.Child>
    );
}

export const hostingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/hosting",
    component: Hosting,
});
