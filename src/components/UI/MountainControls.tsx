import { useSetRecoilState, useRecoilValue } from "recoil";
import PanelGroup from "./PanelGroup";
import { FormGroup, IconButton, FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  MountainRangeState,
  mountainRangeState,
} from "../Mountains/MountainState";
const MountainControls = () => {
  const setMountainRangeState = useSetRecoilState(mountainRangeState);

  const mountainRanges: MountainRangeState[] =
    useRecoilValue(mountainRangeState);

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
    <PanelGroup title={"Mountains"}>
      <h3 className="px-2 pt-2"> Ranges (back to front) </h3>
      {mountainRanges.map((x: MountainRangeState, i: number) => {
        const snowSwitch = (
          <Switch
            sx={{
              marginLeft: "16px",
            }}
            checked={x.animation}
            onChange={() => handleSnowAnimation(i)}
            size="small"
          />
        );
        const addButton = (
          <FormGroup
            sx={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "16px",
            }}
          >
            <IconButton
              color="primary"
              aria-label="remove"
              onClick={() => handleMountainRemoveButton(i)}
            >
              <RemoveIcon />
            </IconButton>
            <span className="text-lg"> {x.mountainCount}</span>
            <IconButton
              color="primary"
              onClick={() => handleMountainAddButton(i)}
              aria-label="add"
            >
              <AddIcon />
            </IconButton>
          </FormGroup>
        );

        return (
          <div key={`add_mt_btn_i${i}`} className="py-2">
            <FormControlLabel
              className="ml-0"
              value="start"
              control={snowSwitch}
              label="Show Snow"
              labelPlacement="start"
            />

            <FormControlLabel
              className="ml-0"
              value="top"
              control={addButton}
              label="# Mountains"
              labelPlacement="start"
            />
          </div>
        );
      })}
    </PanelGroup>
  );
};
export default MountainControls;
