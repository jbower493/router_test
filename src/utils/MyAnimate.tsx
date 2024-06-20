import { cloneElement, useLayoutEffect, useRef, useState } from "react";
import "./animate.css";

export function MyAnimate({ children }: { children: JSX.Element }) {
  const [, force] = useState(false);
  const [state, setState] = useState<"entering" | "exiting" | "stable">(
    "stable"
  );

  const hasMounted = useRef(false);
  const currentChild = useRef<JSX.Element | null>(null);
  const exitingChild = useRef<JSX.Element | null>(null);
  const enteringChild = useRef<JSX.Element | null>(null);

  useLayoutEffect(() => {
    if (children.key !== currentChild.current?.key && hasMounted.current) {
      exitingChild.current = currentChild.current;
      enteringChild.current = children;
      setState("exiting");
    }
    currentChild.current = children;
  }, [children?.key]);

  useLayoutEffect(() => {
    hasMounted.current = true;
  }, []);

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

  return state === "exiting" ? exitingChildElement : childElement;
}
