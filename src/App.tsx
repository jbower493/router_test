import { Outlet } from "@tanstack/react-router";
import { Nav } from "./nav";
import { brand } from "./routerConfig";
import {
    AnimatePresence,
    AnimatePresenceProvider,
} from "./components/AnimatePresence";

export default function App() {
    return (
        <div>
            <h1>{brand}</h1>
            <Nav />
            <hr />
            <AnimatePresenceProvider>
                <AnimatePresence id="1">
                    <Outlet />
                </AnimatePresence>
            </AnimatePresenceProvider>
        </div>
    );
}
