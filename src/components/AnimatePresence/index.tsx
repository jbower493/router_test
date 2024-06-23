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
    setCurrentChild: (newCurrentChild: JSX.Element | null) => void;
};

export const AnimatePresenceContext = createContext<TAnimatePresenceContext>({
    setCurrentChild: () => {},
});

export function _AnimatePresence({ children }: { children: JSX.Element }) {
    const [state, setState] = useState<States>("stable");

    const hasMounted = useRef(false);
    const currentChild = useRef<JSX.Element | null>(null);
    const exitingChild = useRef<JSX.Element | null>(null);

    function setCurrentChild(newCurrentChild: JSX.Element | null) {
        if (
            hasMounted.current &&
            newCurrentChild?.key &&
            newCurrentChild.key !== currentChild.current?.key
        ) {
            exitingChild.current = currentChild.current;
            currentChild.current = newCurrentChild;
            setState("exiting");
            return;
        }

        if (!hasMounted.current && !currentChild.current && newCurrentChild) {
            hasMounted.current = true;
        }

        currentChild.current = newCurrentChild;
    }

    const exitingChildElement = exitingChild?.current
        ? cloneElement(exitingChild.current, {
              className: "motion-out",
              onAnimationEnd: () => {
                  exitingChild.current = null;
                  setState("entering");
              },
          })
        : null;

    const childElement = children || null;

    const childToRender =
        state === "exiting" ? exitingChildElement : childElement;

    return (
        <AnimatePresenceContext.Provider
            value={{
                setCurrentChild,
            }}
        >
            {childToRender}
        </AnimatePresenceContext.Provider>
    );
}

function AnimatePresenceChild({ children }: { children: JSX.Element }) {
    const { setCurrentChild } = useContext(AnimatePresenceContext);

    useLayoutEffect(() => {
        setCurrentChild(children);
    });

    return cloneElement(children, {
        className: "motion-in",
    });
}

export const AnimatePresence = Object.assign(_AnimatePresence, {
    Child: AnimatePresenceChild,
});
