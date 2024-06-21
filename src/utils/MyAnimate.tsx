import { cloneElement, useLayoutEffect, useRef, useState } from "react";
import "./animate.css";

function haveAnyChildrenChangedKey(oldChildren, newChildren) {
  if (
    !oldChildren?.props?.children?.key &&
    !newChildren?.props?.children?.key
  ) {
    return !!(
      oldChildren?.key &&
      newChildren?.key &&
      oldChildren.key !== newChildren.key
    );
  }

  return haveAnyChildrenChangedKey(
    oldChildren?.props?.children,
    newChildren?.props?.children
  );
}

export function MyAnimate({ children }: { children: JSX.Element }) {
  const [state, setState] = useState<"entering" | "exiting" | "stable">(
    "stable"
  );

  const hasMounted = useRef(false);
  const currentChild = useRef<JSX.Element | null>(null);
  const exitingChild = useRef<JSX.Element | null>(null);
  const enteringChild = useRef<JSX.Element | null>(null);

  useLayoutEffect(() => {
    if (
      haveAnyChildrenChangedKey(currentChild.current, children) &&
      hasMounted.current
    ) {
      exitingChild.current = currentChild.current;
      enteringChild.current = children;
      setState("exiting");
    }
    currentChild.current = children;
  }, [children]);

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

// TODO:
// Have AnimatePresence provide a context
// The nested component to animate in/out would be a PresenceChild, which registers itself with the context on every render, and has a key
// Every time the key of the PresenceChild changes, the context would do the animate out thing
// To animate out, the AnimatePresence would render EITHER the outlet OR the exiting child
