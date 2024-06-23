import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    RouterProvider,
    createRootRoute,
    createRouter,
} from "@tanstack/react-router";
import { indexRoute } from "./containers/dashboard/index.tsx";
import { hostingRoute } from "./containers/hosting/index.tsx";
import { hostingAccountOverviewRoute } from "./containers/hosting/account/overview/index.tsx";
import { hostingAccountBillingRoute } from "./containers/hosting/account/billing/index.tsx";
import { hostingAccountResourcesRoute } from "./containers/hosting/account/resources/index.tsx";
import { hostingAdminMoveRoute } from "./containers/hosting/admin/move/index.tsx";
import { hostingAdminDeleteRoute } from "./containers/hosting/admin/delete/index.tsx";
import { accountRoute } from "./containers/account/index.tsx";
import { walletRoute } from "./containers/wallet/index.tsx";
import { AnimatePresence } from "./components/AnimatePresence";

export const rootRoute = createRootRoute({
    component: App,
    notFoundComponent: () => (
        <AnimatePresence.Child>
            <h1 key="root_not_found">404</h1>
        </AnimatePresence.Child>
    ),
});

export const routeTree = rootRoute.addChildren([
    indexRoute,
    accountRoute,
    walletRoute,
    hostingRoute.addChildren([
        hostingAccountOverviewRoute,
        hostingAccountBillingRoute,
        hostingAccountResourcesRoute,

        hostingAdminMoveRoute,
        hostingAdminDeleteRoute,
    ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
