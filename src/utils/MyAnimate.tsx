import {
    cloneElement,
    createContext,
    useContext,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import "./animate.css";

function hasChildChanged(
    oldChildren: JSX.Element | null,
    newChildren: JSX.Element | null
) {
    return !!(
        oldChildren?.key &&
        newChildren?.key &&
        oldChildren.key !== newChildren.key
    );
}

type States = "entering" | "exiting" | "stable";
type TAnimateContext = {
    setExitingChild: (newExitingChild: JSX.Element | null) => void;
    setState: (newState: States) => void;
};

export const AnimateContext = createContext<TAnimateContext>({
    setExitingChild: () => {},
    setState: () => {},
});

export function MyAnimate({ children }: { children: JSX.Element }) {
    const [state, setState] = useState<States>("stable");

    const exitingChild = useRef<JSX.Element | null>(null);

    const exitingChildElement = exitingChild?.current
        ? cloneElement(exitingChild.current, {
              className: "motion-out",
              onAnimationEnd: () => {
                  exitingChild.current = null;
                  setState("entering");
              },
          })
        : null;

    const childElement = children
        ? cloneElement(children, {
              className: "motion-in",
          })
        : null;

    return (
        <AnimateContext.Provider
            value={{
                setExitingChild: (newExitingChild) => {
                    exitingChild.current = newExitingChild;
                },
                setState,
            }}
        >
            {state === "exiting" ? exitingChildElement : childElement}
        </AnimateContext.Provider>
    );
}

export function MyAnimateChild({ children }: { children: JSX.Element }) {
    const animateContext = useContext(AnimateContext);

    const hasMounted = useRef(false);
    const currentChild = useRef<JSX.Element | null>(null);

    useLayoutEffect(() => {
        if (
            hasChildChanged(currentChild.current, children) &&
            hasMounted.current
        ) {
            animateContext.setExitingChild(currentChild.current);
            animateContext.setState("exiting");
        }
        currentChild.current = children;
    }, [children]);

    useLayoutEffect(() => {
        hasMounted.current = true;
    }, []);

    return cloneElement(children, {
        className: "motion-in",
    });
}
