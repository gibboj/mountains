import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import MenuIcon from "./MenuIcon";

const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const transforClasses = drawerOpen
    ? "absolute transform translate-x-0 "
    : "transform -translate-x-full fixed right-0 left-0";

  const handleOpenDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <MenuIcon onClick={handleOpenDrawer} />
      <div
        style={{
          width: 180,
        }}
        className={`${transforClasses} bg-gray-700 left-0 top-0 bottom-0  ease-in-out transition-transform  duration-500 py-2 px-4`}
      >
        <MenuIcon onClick={handleOpenDrawer} />
        <ControlPanel />
      </div>
    </>
  );
};
export default Drawer;
