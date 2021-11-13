import React, { useState, PropsWithChildren } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Collapse } from "@mui/material";

type PanelGroupProps = {
  title: string;
};

const PanelGroup: React.FC<PanelGroupProps> = function ({
  title,
  children,
}: PropsWithChildren<PanelGroupProps>) {
  const [panelOpen, togglePanel] = useState(false);
  const openPanel = () => {
    togglePanel(!panelOpen);
  };

  const rotate = !panelOpen ? "transform -rotate-90" : "";

  return (
    <div className="relative ">
      <div
        className="flex justify-between bg-gray-600 px-2 py-3 cursor-pointer"
        onClick={openPanel}
      >
        <h2 className="">{title}</h2>
        <KeyboardArrowDownIcon className={rotate} />
      </div>
      <Collapse in={panelOpen}>{children}</Collapse>
    </div>
  );
};
export default PanelGroup;
