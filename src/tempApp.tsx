import { useState } from "react";
import { Nav } from "./nav";
import { brand } from "./routerConfig";
import { MyAnimate } from "./utils/MyAnimate";
import { AnimatePresence, motion } from "framer-motion";

export default function App2() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <h1>{brand}</h1>
            <Nav />
            <hr />
            <button type="button" onClick={() => setIsVisible((prev) => !prev)}>
                Toggle
            </button>
            <MyAnimate>
                {isVisible && (
                    <h3
                    // style={{
                    //     transition: "opacity 1s ease-in-out",
                    //     opacity: isVisible ? 1 : 0,
                    // }}
                    >
                        Animate
                    </h3>
                )}
            </MyAnimate>
        </div>
    );
}

export function App() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <h1>{brand}</h1>
            <Nav />
            <hr />
            <button type="button" onClick={() => setIsVisible((prev) => !prev)}>
                Toggle
            </button>
            <AnimatePresence>
                {isVisible && (
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        Animate
                    </motion.h3>
                )}
            </AnimatePresence>
        </div>
    );
}
