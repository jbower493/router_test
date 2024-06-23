import { createContext } from "react";
import { TAnimatePresenceContext } from "./types";

export const AnimatePresenceContext = createContext<TAnimatePresenceContext>({
    setCurrentChild: () => {},
    state: {},
    setState: () => {},
    hasMounted: {},
    currentChild: {},
    exitingChild: {},
    setExitingChild: () => {},
    getIsParentExiting: () => false,
});
