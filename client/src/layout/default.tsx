import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";

export function DefaultLayout(): ReactElement {
  return (
    <div className="size-full">
      <Outlet />
    </div>
  );
}
