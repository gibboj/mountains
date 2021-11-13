import { useRecoilValue, useSetRecoilState } from "recoil";
import { Slider } from "@mui/material";
import PanelGroup from "./PanelGroup";

import { SeasonState, seasonState } from "../SeasonState";

const SeasonControls = () => {
  const allSeasons = useRecoilValue<SeasonState[]>(seasonState);
  const setSeasonState = useSetRecoilState(seasonState);

  function valueLabelFormat(value: number) {
    const units = ["sec", "min"];

    let unitIndex = 0;
    let scaledValue = value / 1000;
    if (scaledValue >= 60) {
      scaledValue = scaledValue / 60;
      unitIndex = 1;
    }

    return `${scaledValue} ${units[unitIndex]}`;
  }

  function calculateValue(value: number) {
    return value;
  }

  const handleChange = (
    event: Event,
    newValue: number | number[],
    index: number
  ) => {
    if (typeof newValue === "number") {
      setSeasonState((oldSeasons: SeasonState[]) => {
        const oldSeasonCopy = [...oldSeasons];
        oldSeasonCopy[index] = {
          ...oldSeasons[index],
          duration: newValue,
        };
        return oldSeasonCopy;
      });
    }
  };

  return (
    <PanelGroup title={"Seasons"}>
      {allSeasons.map((s: SeasonState, index: number) => {
        return (
          <div key={`duration_${s.name}`} className="p-2">
            <div className="flex justify-between">
              <h3>{s.name.toLocaleUpperCase()}</h3>
              <div className="text-sm">
                {valueLabelFormat(calculateValue(s.duration))}
              </div>
            </div>
            <Slider
              value={s.duration}
              min={1000}
              step={1000}
              max={60000}
              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
              onChange={(event: Event, newValue: number | number[]) =>
                handleChange(event, newValue, index)
              }
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
            />
          </div>
        );
      })}
    </PanelGroup>
  );
};
export default SeasonControls;
