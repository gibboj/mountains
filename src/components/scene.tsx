import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import MountainRange from "./Mountains/MountainRange";
import {
  mountainRangeState,
  MountainRangeState,
} from "./Mountains/MountainState";
import {
  currentSeasonState,
  seasonState,
  SeasonState,
  totalYearDuration,
} from "./SeasonState";
import Lake from "./Lake";

import { useAnimationFrame } from "../useAnimationFrame";
import { Tuple } from "../utilities/Math";
import Clouds from "./Clouds";
import { loopState } from "./LoopState";

const Scene = function () {
  const currentSeason = useRecoilValue(currentSeasonState);
  const seasons: SeasonState[] = useRecoilValue<SeasonState[]>(seasonState);
  const setCurrentSeason = useSetRecoilState(currentSeasonState);
  const loopTick = useRecoilValue(loopState);
  const setLoop = useSetRecoilState(loopState);
  // const snowState = useRecoilValue(getSnowAnimationState);

  const [canvasDimensions, setCanvasDimension] = useState({
    x: window.document.documentElement.clientWidth,
    y: 500,
  });

  const totalDuration = useRecoilValue(totalYearDuration);

  const mountainRanges: Array<MountainRangeState> =
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

  useAnimationFrame((time) => {
    setLoop(time);
  }, []);

  useEffect(() => {
    let cumulativeTime = 0;
    const newSeason = seasons.find((season): SeasonState | undefined => {
      cumulativeTime += season.duration;
      if (loopTick % totalDuration < cumulativeTime) {
        return season;
      }
    }, 0);

    if (!newSeason) {
      throw new Error("No season found. This is unacceptable");
    }

    if (newSeason.name !== currentSeason) {
      setCurrentSeason(() => newSeason.name);
    }
  }, [loopTick, currentSeason, mountainRanges, totalDuration, seasons]);

  return (
    <div className=" bg-blue-100">
      <svg
        width={canvasDimensions.x}
        height={canvasDimensions.y}
        xmlns="http://www.w3.org/2000/svg"
        stroke="null"
      >
        <Clouds canvasDimensions={canvasDimensions} />

        {mountainRanges.map((range: MountainRangeState, i) => {
          const ccFactor = Math.max(0, range.mountainCount - i - 1);
          //{ snowState, i, currentSeason });
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
