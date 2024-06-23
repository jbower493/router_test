import { cloneElement, useContext, useLayoutEffect } from "react";
import { AnimatePresenceContext } from "./context";

export function AnimatePresenceChild({
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
