import { useState } from "react";
import MountainRange from "./MountainGenerator";
import Lake from "./Lake";
import { ANIMATION_STATE, SeasonHelper } from "../constants/seasons";
import { useAnimationFrame } from "../useAnimationFrame";
import { Tuple } from "../utilities/Math";
import Clouds from "./Clouds";

const Scene = function () {
  const [seasonName, setSeasonName] = useState<string>(
    SeasonHelper.getCurrentSeason(1).name
  );

  const [snowState, setSnowState] = useState<ANIMATION_STATE>(
    ANIMATION_STATE.FORWARD
  );

  const [seasonDuration, setSeasonDuration] = useState<number>(
    SeasonHelper.getCurrentSeason(1).duration
  );

  const canvasDimensions = {
    x: window.document.documentElement.clientWidth,
    y: 500,
  };

  const mountainBase = 5 * (canvasDimensions.y / 6);
  const peakRange: Tuple = [
    canvasDimensions.y / 2,
    (2 * canvasDimensions.y) / 5,
  ];

  useAnimationFrame(
    (time) => {
      const newSeason = SeasonHelper.getCurrentSeason(time);
      if (newSeason.name !== seasonName) {
        setSeasonName(newSeason.name);
        setSnowState(newSeason.features.mountains.snowState);
        setSeasonDuration(newSeason.duration);
      }
    },
    [seasonName, seasonDuration, snowState]
  );

  return (
    <div className=" bg-blue-100">
      <svg
        width={canvasDimensions.x}
        height={canvasDimensions.y}
        xmlns="http://www.w3.org/2000/svg"
        stroke="null"
      >
        <MountainRange
          numberOfMountains={3}
          canvasDimensions={canvasDimensions}
          base={mountainBase}
          peakRange={[peakRange[0] - 50, peakRange[1] - 50]}
          colorCorrection={[
            ["hsl.s", "/2"],
            ["hsl.l", "*1.2"],
          ]}
          snowAnimation={ANIMATION_STATE.NONE}
          seasonDuration={seasonDuration}
        />
        <Clouds canvasDimensions={canvasDimensions} />
        <MountainRange
          numberOfMountains={6}
          canvasDimensions={canvasDimensions}
          base={mountainBase}
          peakRange={peakRange}
          colorCorrection={[]}
          snowAnimation={snowState}
          seasonDuration={seasonDuration}
        />

        <Lake
          surface={mountainBase}
          canvasDimensions={canvasDimensions}
          seasonDuration={seasonDuration}
        />
      </svg>
    </div>
  );
};

export default Scene;
