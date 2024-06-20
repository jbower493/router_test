import { Link } from "@tanstack/react-router";
import { ValidRoute, routerConfig } from "../../routerConfig";
import { SidebarState, store } from "../../routeStore";
import { useStore } from "@tanstack/react-store";

type RouterConfigEntry = [
    keyof typeof routerConfig,
    (typeof routerConfig)[keyof typeof routerConfig]
];

function createLink([routeName, routeValue]: RouterConfigEntry) {
    return (
        <div key={routeName}>
            <Link to={routeName}>{routeValue.label}</Link>
        </div>
    );
}

type SectionName = "account" | "admin";

export function isRouteEnabled(
    route: ValidRoute,
    sidebarState: SidebarState
): boolean {
    return routerConfig[route].enabled && sidebarState[route];
}

function getSectionLinks(
    routerConfigEntries: RouterConfigEntry[],
    sectionName: SectionName,
    sidebarState: SidebarState
) {
    return routerConfigEntries
        .filter(
            ([key]) =>
                key.startsWith(`/hosting/${sectionName}/`) &&
                isRouteEnabled(key, sidebarState)
        )
        .map(createLink);
}

export function HostingSidebar() {
    const routerConfigEntries = Object.entries(
        routerConfig
    ) as RouterConfigEntry[];

    const sidebarState = useStore(store);

    const accountLinks = getSectionLinks(
        routerConfigEntries,
        "account",
        sidebarState.sidebar
    );
    const adminLinks = getSectionLinks(
        routerConfigEntries,
        "admin",
        sidebarState.sidebar
    );

    return (
        <div>
            <h3>Sidebar</h3>
            <div>
                <h4>Account</h4>
                {accountLinks}
            </div>
            <div>
                <h4>Admin</h4>
                {adminLinks}
            </div>
        </div>
    );
}
