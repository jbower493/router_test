import { useStore } from "@tanstack/react-store";
import { Delete } from "./delete";
import { Move } from "./move";
import { store } from "../../../routeStore";
import { isRouteEnabled } from "../sidebar";

export function HostingAdmin() {
    const sidebarState = useStore(store);

    return (
        <div>
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
    );
}
