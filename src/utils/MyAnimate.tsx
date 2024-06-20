import { cloneElement, useLayoutEffect, useRef, useState } from "react";
import "./animate.css";

export function MyAnimate({ children }: { children: any }) {
    const [, force] = useState(false);

    const hasMounted = useRef(false);
    const hasUnmounted = useRef(false);
    const currentChild = useRef(null);
    const exitingChild = useRef(null);

    useLayoutEffect(() => {
        hasMounted.current = true;
    }, []);

    useLayoutEffect(() => {
        if (!children && hasMounted) {
            exitingChild.current = currentChild.current;
            hasUnmounted.current = true;
            force((prev) => !prev);
        }
        currentChild.current = children;
    }, [children]);

    const exitingChildElement = exitingChild.current
        ? cloneElement(exitingChild.current, {
              className: "motion-out",
              onAnimationEnd: () => {
                  exitingChild.current = null;
                  force((prev) => !prev);
              },
          })
        : null;

    const childElement = children
        ? cloneElement(children, {
              className: hasUnmounted.current ? "motion-in" : "",
          })
        : null;

    return childElement || exitingChildElement;
}
