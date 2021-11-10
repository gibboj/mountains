import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  MountainRangeState,
  mountainRangeState,
} from "../Mountains/MountainState";
const ControlPanel = () => {
  const setNumberOfMountains = useSetRecoilState(mountainRangeState);
  const mountainRanges: MountainRangeState[] =
    useRecoilValue(mountainRangeState);
  const handleCloudAddButton = () => {
    console.log("add cloud");
  };

  const handleMountainAddButton = (index: number) => {
    setNumberOfMountains((oldList: MountainRangeState[]) =>
      oldList.map((v, i) =>
        i === index ? { ...v, mountainCount: v.mountainCount + 1 } : v
      )
    );
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
      {mountainRanges.map((x: MountainRangeState, i: number) => {
        return (
          <div key={`add_mt_btn_i${i}`}>
            Row {i} has {x.mountainCount} montains:
            <div
              className={"btn-white  w-full"}
              onClick={() => handleMountainAddButton(i)}
            >
              Add
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ControlPanel;
