import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import MountainRange from "./Mountains/MountainRange";
import {
  mountainRangeState,
  MountainRangeState,
} from "./Mountains/MountainState";
import { totalSeasonDuration } from "./SeasonState";
import Lake from "./Lake";
import { ANIMATION_STATE, SeasonHelper } from "../constants/seasons";
import { useAnimationFrame } from "../useAnimationFrame";
import { Tuple } from "../utilities/Math";
import Clouds from "./Clouds";

const Scene = function () {
  const [currentSeason, setCurrentSeasonName] = useState<string>(
    SeasonHelper.getCurrentSeason(1).name
  );

  const [snowState, setSnowState] = useState<ANIMATION_STATE>(
    ANIMATION_STATE.FORWARD
  );

  const [canvasDimensions, setCanvasDimension] = useState({
    x: window.document.documentElement.clientWidth,
    y: 500,
  });

  const totalDuration = useRecoilValue(totalSeasonDuration);

  const moutainRanges: Array<MountainRangeState> =
    useRecoilValue(mountainRangeState);

  useEffect(() => {
    const handleResize = () => {
      setCanvasDimension({
        x: window.document.documentElement.clientWidth,
        y: 500,
      });
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const mountainBase = 5 * (canvasDimensions.y / 6);
  const peakRange: Tuple = [
    canvasDimensions.y / 2,
    (2 * canvasDimensions.y) / 5,
  ];

  useAnimationFrame(
    (time) => {
      const newSeason = SeasonHelper.getCurrentSeason(time % totalDuration);
      if (newSeason.name !== currentSeason) {
        console.log(newSeason.name, currentSeason, totalDuration);
        setCurrentSeasonName(newSeason.name);
        setSnowState(newSeason.features.mountains.snowState);
      }
    },
    [currentSeason, snowState, moutainRanges]
  );

  return (
    <div className=" bg-blue-100">
      <svg
        width={canvasDimensions.x}
        height={canvasDimensions.y}
        xmlns="http://www.w3.org/2000/svg"
        stroke="null"
      >
        <Clouds canvasDimensions={canvasDimensions} />

        {moutainRanges.map((range: MountainRangeState, i) => {
          const ccFactor = Math.max(0, range.mountainCount - i - 1);
          return (
            <MountainRange
              key={`mountain_range_${i}`}
              index={i}
              numberOfMountains={range.mountainCount}
              canvasDimensions={canvasDimensions}
              base={mountainBase}
              peakRange={[peakRange[0] + 50 * i, peakRange[1] + 50 * i]}
              colorCorrection={[
                ["hsl.s", `/${ccFactor + 1}`],
                ["hsl.l", `*1.${ccFactor}`],
              ]}
              snowAnimationState={
                range.animation ? snowState : ANIMATION_STATE.NONE
              }
              currentSeason={currentSeason}
            />
          );
        })}

        <Lake
          surface={mountainBase}
          canvasDimensions={canvasDimensions}
          currentSeason={currentSeason}
        />
      </svg>
    </div>
  );
};

export default Scene;
