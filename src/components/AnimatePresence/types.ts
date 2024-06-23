export type States = "entering" | "exiting" | "stable";

export type TAnimatePresenceContext = {
    setCurrentChild: (
        animatePresenceId: string,
        newCurrentChild: JSX.Element | null
    ) => void;
    state: Record<string, States>;
    setState: (animatePresenceId: string, newState: States) => void;
    hasMounted: Record<string, boolean>;
    currentChild: Record<string, JSX.Element | null>;
    exitingChild: Record<string, JSX.Element | null>;
    setExitingChild: (
        animatePresenceId: string,
        newExitingChild: JSX.Element | null
    ) => void;
    getIsParentExiting: (animatePresenceId: string) => boolean;
};
