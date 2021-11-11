import { useSetRecoilState, useRecoilValue } from "recoil";
import PanelGroup from "./PanelGroup";
import { IconButton, FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
//import { AddIcon, RemoveIcon } from "@mui/icons-material";
import {
  MountainRangeState,
  mountainRangeState,
} from "../Mountains/MountainState";
const ControlPanel = () => {
  const setMountainRangeState = useSetRecoilState(mountainRangeState);

  const mountainRanges: MountainRangeState[] =
    useRecoilValue(mountainRangeState);

  const handleCloudAddButton = () => {
    console.log("add cloud");
  };

  const handleSnowAnimation = (index: number) => {
    setMountainRangeState((oldList: MountainRangeState[]) =>
      oldList.map((v, i) =>
        i === index ? { ...v, animation: !v.animation } : v
      )
    );
  };
  const handleMountainAddButton = (index: number) => {
    setMountainRangeState((oldList: MountainRangeState[]) =>
      oldList.map((v, i) =>
        i === index ? { ...v, mountainCount: v.mountainCount + 1 } : v
      )
    );
  };

  const handleMountainRemoveButton = (index: number) => {
    setMountainRangeState((oldList: MountainRangeState[]) =>
      oldList.map((v, i) =>
        i === index ? { ...v, mountainCount: v.mountainCount - 1 } : v
      )
    );
  };

  return (
    <div className={" text-white pt-8"}>
      {/* <h1 className="  pt-8">Clouds</h1>
      <div className={" w-full  btn-white"} onClick={handleCloudAddButton}>
        Add
      </div> */}
      <PanelGroup title={"Mountains"}>
        <h2 className=""> Back Row </h2>
        {mountainRanges.map((x: MountainRangeState, i: number) => {
          const snowSwitch = (
            <Switch
              checked={x.animation}
              onChange={() => handleSnowAnimation(i)}
              size="small"
              label={<label>Animation</label>}
            />
          );

          return (
            <div key={`add_mt_btn_i${i}`} className="py-2">
              <FormControlLabel
                className="ml-0"
                value="top"
                control={snowSwitch}
                label="Animations"
                labelPlacement="start"
              />
              <label className="block">Count</label>
              <IconButton
                variant="contained"
                onClick={() => handleMountainAddButton(i)}
                aria-label="delete"
              >
                <AddIcon />
              </IconButton>
              <span className="px-4"> {x.mountainCount}</span>
              <IconButton onClick={() => handleMountainRemoveButton(i)}>
                <RemoveIcon />
              </IconButton>
            </div>
          );
        })}
        <h2 className="text-left"> Front Row </h2>
      </PanelGroup>
    </div>
  );
};
export default ControlPanel;
