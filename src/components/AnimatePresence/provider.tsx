import { useRef, useState } from "react";
import { AnimatePresenceContext } from "./context";
import { States } from "./types";

export function AnimatePresenceProvider({
    children,
}: {
    children: JSX.Element;
}) {
    const [state, setState] = useState<Record<string, States>>({});

    const hasMounted = useRef<Record<string, boolean>>({});
    const currentChild = useRef<Record<string, JSX.Element | null>>({});
    const exitingChild = useRef<Record<string, JSX.Element | null>>({});

    function localSetCurrentChild(
        animatePresenceId: string,
        newCurrentChild: JSX.Element | null
    ) {
        // If the child changes, set it to exiting
        if (
            hasMounted.current[animatePresenceId] &&
            newCurrentChild?.key &&
            newCurrentChild.key !== currentChild.current[animatePresenceId]?.key
        ) {
            exitingChild.current[animatePresenceId] =
                currentChild.current[animatePresenceId];
            currentChild.current[animatePresenceId] = newCurrentChild;
            setState((prev) => ({ ...prev, [animatePresenceId]: "exiting" }));
            return;
        }

        // If it's not mounted yet, set it to mounted (we don't want to set things to "exiting" when they haven't mounted yet)
        if (
            !hasMounted.current[animatePresenceId] &&
            !currentChild.current[animatePresenceId] &&
            newCurrentChild
        ) {
            hasMounted.current[animatePresenceId] = true;
        }

        // Set current children on every render cycle of the "AnimatePresence.Child"
        currentChild.current[animatePresenceId] = newCurrentChild;
    }

    function localSetState(animatePresenceId: string, newState: States) {
        setState((prev) => ({
            ...prev,
            [animatePresenceId]: newState,
        }));
    }

    function localSetExitingChild(
        animatePresenceId: string,
        newExitingChild: JSX.Element | null
    ) {
        exitingChild.current[animatePresenceId] = newExitingChild;
    }

    function getIsParentExiting(animatePresenceId: string) {
        return Object.entries(state).some(
            ([id, localState]) =>
                id < animatePresenceId && localState === "exiting"
        );
    }

    return (
        <AnimatePresenceContext.Provider
            value={{
                setCurrentChild: localSetCurrentChild,
                state,
                setState: localSetState,
                hasMounted: hasMounted.current,
                currentChild: currentChild.current,
                exitingChild: exitingChild.current,
                setExitingChild: localSetExitingChild,
                getIsParentExiting,
            }}
        >
            {children}
        </AnimatePresenceContext.Provider>
    );
}
