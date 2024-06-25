import { useStore } from "@tanstack/react-store";
import { Delete } from "./delete";
import { Move } from "./move";
import { store } from "../../../routeStore";
import { isRouteEnabled } from "../sidebar";
import { AnimatePresence } from "../../../components/AnimatePresence";
import { ValidRoute } from "../../../routerConfig";

export function HostingAdmin() {
    const sidebarState = useStore(store);

    if (
        !isRouteEnabled(location.pathname as ValidRoute, sidebarState.sidebar)
    ) {
        return (
            <AnimatePresence.Child parentId="2">
                <p key="/hosting/admin/404">404</p>
            </AnimatePresence.Child>
        );
    }

    return (
        <AnimatePresence.Child parentId="2">
            <div key="/hosting/admin">
                <h2>Admin Section</h2>
                <div>
                    {isRouteEnabled(
                        "/hosting/admin/move",
                        sidebarState.sidebar
                    ) && <Move />}
                    {isRouteEnabled(
                        "/hosting/admin/delete",
                        sidebarState.sidebar
                    ) && <Delete />}
                </div>
            </div>
        </AnimatePresence.Child>
    );
}
