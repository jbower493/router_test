import { Outlet } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Nav } from "./nav";
import { brand } from "./routerConfig";

export default function App2() {
  return (
    <div>
      <h1>{brand}</h1>
      <Nav />
      <hr />
      <Outlet />
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
