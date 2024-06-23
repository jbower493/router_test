import { Outlet } from "@tanstack/react-router";
import { Nav } from "./nav";
import { brand } from "./routerConfig";
import { AnimatePresence } from "./components/AnimatePresence";

export default function App() {
    return (
        <div>
            <h1>{brand}</h1>
            <Nav />
            <hr />
            <AnimatePresence.Provider>
                <AnimatePresence id="1">
                    <Outlet />
                </AnimatePresence>
            </AnimatePresence.Provider>
        </div>
    );
}
