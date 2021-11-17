import React, { useEffect, useState } from "react";
import chroma from "chroma-js";
import { SNOW_COLOR_RANGE } from "../../constants/colors";
import { ANIMATION_STATE, SeasonHelper } from "../../constants/seasons";

import { getColorInRange } from "../../utilities/Color";
import { getRandomFromRange, Tuple } from "../../utilities/Math";
import { SvgPath } from "../../utilities/SvgPath";
import { MorphingAnimation } from "../MorphingAnimation";
import generateSnow from "./SnowGenerator";
import { useRecoilValue } from "recoil";
import {
  seasonState,
  getCurrentSeasonDuration,
  totalYearDuration,
  SeasonState,
  currentSeasonState,
} from "../SeasonState";
import { getSnowAnimationState } from "../SnowState";
import { loopState } from "../LoopState";
import { mountainRangeState } from "./MountainState";

type MountainOptions = {
  index: number;
  baseLine: number;
  peakRange: Tuple;
  xStep: number;

  colorCorrection: Array<[string, string]>;
  currentSeason?: string;
  range: number;
};

const ANIMATION_KEYS = [20, 50, 80, 100];
const WIDTH_VARIATION_RANGE: Tuple = [0.4, 1.4];

const Mountain: React.FC<MountainOptions> = function ({
  index,
  baseLine, // Base of the mountain y coordinate
  peakRange, // Range where peak of mountain should fall
  xStep, // Standard spacing for mountain
  colorCorrection,
  range,
}) {
  const seasonSnowState: number = useRecoilValue(getSnowAnimationState);
  const mountainRange = useRecoilValue(mountainRangeState);

  const [snowState] = React.useState<number>(() =>
    mountainRange[range]?.animation ? seasonSnowState : ANIMATION_STATE.NONE
  );
  const baseX = getRandomFromRange(WIDTH_VARIATION_RANGE) * xStep;
  const baseY = baseLine;
  const peakY = getRandomFromRange(peakRange);
  const peakX = (index + 0.5) * xStep;

  const baseLeft = peakX - baseX;
  const baseRight = peakX + baseX;
  const totalDuration = useRecoilValue(totalYearDuration);
  const seasonDuration = useRecoilValue(getCurrentSeasonDuration);

  const seasons = useRecoilValue(seasonState);

  const [mountainPath, setMountainPath] = useState("");
  const [mountainShadowPath, setMountainShadowPath] = useState("");
  const [colorRange] = useState(() =>
    SeasonHelper.getMountainColors(colorCorrection, seasons, totalDuration)
  );
  const [mountainColor, setMountainColor] = useState(
    getColorInRange({ range: colorRange.colors, domain: colorRange.position })
  );
  const loopTick = useRecoilValue(loopState);
  const [snowPaths, setSnowPaths] = useState<Array<string>>(
    (): Array<string> =>
      ANIMATION_KEYS.map((val) =>
        generateSnow(
          { x: peakX, y: peakY },
          { x: baseLeft, y: baseY },
          val / 100
        )
      )
  );
  const currentSeason = useRecoilValue(currentSeasonState);
  const [snowPath, setSnowPath] = React.useState("");
  const [snowColor] = React.useState(
    getColorInRange({ range: SNOW_COLOR_RANGE })
  );
  const [animation, setAnimation] = React.useState<MorphingAnimation | null>(
    null
  );

  function getKeyFrames(snowPaths: string[]): number[] {
    return snowPaths.reduce((acc, _, index) => {
      if (index > 0) {
        acc.push(index * (seasonDuration / (snowPaths.length - 1)));
      }
      return acc;
    }, [] as Array<number>);
  }

  const getAnimation = (keyFrames: number[]): MorphingAnimation | null => {
    switch (snowState) {
      case ANIMATION_STATE.BACKWARD: {
        return new MorphingAnimation(snowPaths, keyFrames);
      }
      case ANIMATION_STATE.FORWARD: {
        return new MorphingAnimation([...snowPaths].reverse(), keyFrames);
      }
      case ANIMATION_STATE.STOP_END: {
        return new MorphingAnimation([snowPaths[0]], []);
      }
      default:
        return null;
    }
  };

  useEffect(() => {
    setMountainPath(
      `${SvgPath.move(peakX, peakY)} ${SvgPath.lineTo(
        baseLeft,
        baseY
      )}  ${SvgPath.lineTo(baseRight, baseY)} Z`
    );
    setMountainShadowPath(
      `${SvgPath.move(peakX, peakY)} ${SvgPath.lineTo(
        baseRight,
        baseY
      )}  ${SvgPath.lineTo(peakX + baseX / 2, baseY)} Z`
    );

    setSnowPaths(
      ANIMATION_KEYS.map((val) =>
        generateSnow(
          { x: peakX, y: peakY },
          { x: baseLeft, y: baseY },
          val / 100
        )
      )
    );
  }, [xStep]);

  useEffect(() => {
    if (snowPaths.length === 0) {
      return;
    }

    const keyFrames = getKeyFrames(snowPaths);
    const anim = getAnimation(keyFrames);
    setAnimation(anim);
  }, [snowState, xStep, snowPaths, totalDuration, currentSeason]);

  function getTimeInSeason() {
    let timeInSeasonsPast = 0;

    const timeInYear = loopTick % totalDuration;
    let currentSeasonDuration = 0;
    seasons.some((s: SeasonState) => {
      if (s.name === currentSeason) {
        currentSeasonDuration = s.duration;
        return true;
      }
      timeInSeasonsPast += s.duration;
    });

    return Math.min(timeInYear - timeInSeasonsPast, currentSeasonDuration);
  }

  useEffect(() => {
    const timeInSeason = getTimeInSeason();

    const path = animation ? animation.getPath(timeInSeason) : "";
    const duration = totalDuration;
    setMountainColor(
      getColorInRange({
        range: colorRange.colors,
        domain: colorRange.position,
        percentage: (loopTick % duration) / duration,
      })
    );

    setSnowPath(path);
  }, [
    loopTick,
    animation,
    currentSeason,
    snowState,
    snowPath,
    snowPaths,
    seasons,
    xStep,
    totalDuration,
  ]);

  return (
    <g key={`mountain_${index}`}>
      <defs>
        <linearGradient
          id={`mountainColor_${index}`}
          gradientTransform="rotate(90)"
        >
          <stop offset="5%" stopColor={mountainColor} />
          <stop
            offset="95%"
            stopColor={chroma(mountainColor).darken(1).hex()}
          />
        </linearGradient>
      </defs>
      <path
        id={`mountain_${index}`}
        d={mountainPath}
        fill={`url(#mountainColor_${index})`}
      />
      {
        <g>
          <path
            id={`mountain_${index}_snow_top`}
            d={snowPath}
            fill={snowColor}
          />
        </g>
      }
      <path
        id={`mountain_${index}_darken`}
        d={mountainShadowPath}
        fill={chroma(mountainColor).darken(1).hex()}
        opacity={0.2}
      />
    </g>
  );
};
export default Mountain;
