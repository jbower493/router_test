import { Outlet } from "@tanstack/react-router";
import { Nav } from "./nav";
import { brand } from "./routerConfig";
import { MyAnimate } from "./utils/MyAnimate";

export default function App() {
    return (
        <div>
            <h1>{brand}</h1>
            <Nav />
            <hr />
            <MyAnimate>
                <Outlet />
            </MyAnimate>
        </div>
    );
}
