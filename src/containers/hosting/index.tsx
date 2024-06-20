import { Outlet, createRoute } from "@tanstack/react-router";
import { HostingSidebar } from "./sidebar";
import { rootRoute } from "../../main";
import { useEffect, useState } from "react";
import { store } from "../../routeStore";

function Hosting() {
    const [isLoading, setIsLoading] = useState(true);

    function updateStore() {
        store.setState((state) => {
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    "/hosting/account/overview": false,
                    "/hosting/account/billing": false,
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
        <div>
            <h1>Hosting</h1>
            {isLoading ? <p>Hosting page loading</p> : <HostingSidebar />}
            <hr />
            {isLoading ? <p>Hosting page loading</p> : <Outlet />}
        </div>
    );
}

export const hostingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/hosting",
    component: Hosting,
});
