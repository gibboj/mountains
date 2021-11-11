import { useState } from "react";
import ControlPanel from "./ControlPanel";
import MenuIcon from "./MenuIcon";

const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const transforClasses = drawerOpen
    ? "transform translate-x-0"
    : "transform -translate-x-full right-0 left-0";

  const handleOpenDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <MenuIcon onClick={handleOpenDrawer} />
      <div
        style={{
          width: 210,
        }}
        className={`${transforClasses} bg-gray-700 left-0 
          top-0 bottom-0 fixed ease-in-out transition-transform 
          duration-500 `}
      >
        <MenuIcon onClick={handleOpenDrawer} />
        <ControlPanel />
      </div>
    </>
  );
};
export default Drawer;
