import {
    cloneElement,
    createContext,
    useContext,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import "./AnimatePresence.css";

type States = "entering" | "exiting" | "stable";
type TAnimatePresenceContext = {
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

        if (
            !hasMounted.current[animatePresenceId] &&
            !currentChild.current[animatePresenceId] &&
            newCurrentChild
        ) {
            hasMounted.current[animatePresenceId] = true;
        }

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

export function _AnimatePresence({
    children,
    id,
}: {
    children: JSX.Element;
    id: string;
}) {
    const {
        state,
        setState,
        exitingChild,
        setExitingChild,
        getIsParentExiting,
        currentChild,
    } = useContext(AnimatePresenceContext);

    const exitingChildElement = exitingChild[id]
        ? cloneElement(exitingChild[id]!, {
              className: "motion-out",
              onAnimationEnd: () => {
                  setExitingChild(id, null);
                  setState(id, "entering");
              },
          })
        : null;

    function getChildrenToRender() {
        if (getIsParentExiting(id)) {
            return cloneElement(currentChild[id] || <></>);
        }

        if (state[id] === "exiting") {
            return exitingChildElement;
        }

        return children || null;
    }

    return getChildrenToRender();
}

function AnimatePresenceChild({
    children,
    parentId,
}: {
    children: JSX.Element;
    parentId: string;
}) {
    const { setCurrentChild } = useContext(AnimatePresenceContext);

    useLayoutEffect(() => {
        setCurrentChild(parentId, children);
    });

    return cloneElement(children, {
        className: "motion-in",
    });
}

export const AnimatePresence = Object.assign(_AnimatePresence, {
    Child: AnimatePresenceChild,
});
