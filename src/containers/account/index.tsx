import { createRoute } from "@tanstack/react-router";
import { useState } from "react";
import { rootRoute } from "../../main";
import { MyAnimate } from "../../utils/MyAnimate";

function Account() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <h1>Account</h1>
      <button type="button" onClick={() => setIsVisible((prev) => !prev)}>
        Toggle
      </button>
      <MyAnimate>
        <div key="1">
          {isVisible ? <h3 key="2">Animate</h3> : <h1 key="3">Other thing</h1>}
        </div>
      </MyAnimate>
    </div>
  );
}

export const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: Account,
});
