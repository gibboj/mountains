import React, { useState } from "react";
import ControlPanel from "./ControlPanel";

const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const a = drawerOpen
    ? "absolute transform translate-x-0 "
    : "transform -translate-x-full fixed right-0 left-0";

  const handleOpenDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <div
        className={"border-2 bg-green-50 absolute"}
        onClick={handleOpenDrawer}
      >
        Control Panel
      </div>
      <div
        style={{
          width: 180,
        }}
        className={`bg-gray-700 left-0 top-0 bottom-0  ease-in-out ${a} transition-transform  duration-500 py-2 px-4`}
      >
        <div className="text-white" onClick={handleOpenDrawer}>
          X
        </div>
        <ControlPanel />
      </div>
    </>
  );
};
export default Drawer;
