import { cloneElement, useContext } from "react";
import "./AnimatePresence.css";
import { AnimatePresenceChild } from "./child";
import { AnimatePresenceContext } from "./context";
import { AnimatePresenceProvider } from "./provider";

/**
 * Current usage / requirements / caveats:
 *
 *
 * - All usage of "AnimatePresence" must be wrapped in 1 "AnimatePresence.Provider"
 *
 * - Can nest as many "AnimatePresence" inside each other as you want. But they must all have id's which get increasingly larger as you get more nested. Eg. if there's one at the top level, and two more inside of it, the 2 nested ones must have id's greater than the top level one.
 *
 * - "AnimatePresence.Child" must have only 1 direct child, with a unique key
 *
 * - All "AnimatePresence.Child" instances must have a "parentId" which matches the "id" of the closest "AnimatePresence" up the tree
 *
 * - All elements in between "AnimatePresence" and "AnimatePresence.Child" will not be rendered while "AnimatePresence.Child" is exiting, so you should only use components that render no dom elements in between the parent and child.
 *
 *
 *
 * Testing and fixes required:
 *
 *
 * Fixes:
 *
 * - Use another context, one for each level of "AnimatePresence", to auto increment the id's, so that we don't have to explicitly pass "id" and "parentId"
 *
 * - Have the "AnimatePresence.Child" create it's own key, so that the dom element to be exited doesn't have to have a unique key. The AnimatePresence.Child can then send this key back to "localSetCurrentChild" to be stored with the react element
 *
 * - Create a small abstraction on my thing, to include an outlet. Something like "AnimatedOutlet"
 *
 * Testing:
 *
 * - Test pending route (using "loader")
 *
 * - Test with suspense
 *
 */

function _AnimatePresence({
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
        // If another instance of "AnimatePresence" further up the tree is exiting, remove the outlet from this one to avoid the wrong stuff showing in this outlet
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

export const AnimatePresence = Object.assign(_AnimatePresence, {
    Child: AnimatePresenceChild,
    Provider: AnimatePresenceProvider,
});
