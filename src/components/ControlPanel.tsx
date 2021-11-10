import React from "react";
const ControlPanel = () => {
  const handleCloudAddButton = () => {
    console.log("add cloud");
  };

  const handleMountainAddButton = () => {
    console.log("add mountain");
  };

  return (
    <div className={"text-right"}>
      <h1 className=" text-white pt-8">Clouds</h1>
      <div
        className={" w-full text-white btn-white"}
        onClick={handleCloudAddButton}
      >
        Add
      </div>
      <h1 className=" text-white pt-8">Mountains</h1>
      <div className={"btn-white  w-full"} onClick={handleMountainAddButton}>
        Add
      </div>
    </div>
  );
};
export default ControlPanel;
