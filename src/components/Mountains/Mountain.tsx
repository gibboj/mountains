import React, { useEffect, useState } from "react";
import chroma from "chroma-js";
import { SNOW_COLOR_RANGE } from "../../constants/colors";
import { ANIMATION_STATE, SeasonHelper } from "../../constants/seasons";
import { useAnimationFrame } from "../../useAnimationFrame";
import { getColorInRange } from "../../utilities/Color";
import { getRandomFromRange, Tuple } from "../../utilities/Math";
import { SvgPath } from "../../utilities/SvgPath";
import { MorphingAnimation } from "../MorphingAnimation";
import generateSnow from "./SnowGenerator";

type MountainOptions = {
  index: number;
  baseLine: number;
  peakRange: Tuple;
  xStep: number;
  snowAnimation?: ANIMATION_STATE;
  colorCorrection: Array<[string, string]>;
  currentSeason: string;
};

const ANIMATION_KEYS = [20, 50, 80, 100];
const WIDTH_VARIATION_RANGE: Tuple = [0.4, 1.4];

const Mountain: React.FC<MountainOptions> = function ({
  index,
  baseLine, // Base of the mountain y coordinate
  peakRange, // Range where peak of mountain should fall
  xStep, // Standard spacing for mountain
  snowAnimation: snowAnimationState,
  colorCorrection,
  currentSeason,
}) {
  const baseX = getRandomFromRange(WIDTH_VARIATION_RANGE) * xStep;
  const baseY = baseLine;
  const peakY = getRandomFromRange(peakRange);
  const peakX = (index + 0.5) * xStep;

  const baseLeft = peakX - baseX;
  const baseRight = peakX + baseX;

  const [mountainPath, setMountainPath] = useState("");
  const [mountainShadowPath, setMountainShadowPath] = useState("");
  const [colorRange] = useState(() =>
    SeasonHelper.getMountainColors(colorCorrection)
  );
  const [mountainColor, setMountainColor] = useState(
    getColorInRange({ range: colorRange.colors, domain: colorRange.position })
  );

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

  const [snowPath, setSnowPath] = React.useState("");
  const [snowColor] = React.useState(
    getColorInRange({ range: SNOW_COLOR_RANGE })
  );
  const [animation, setAnimation] = React.useState<MorphingAnimation | null>(
    null
  );

  const setupAnimationForSeason = () => {
    if (snowPaths.length === 0) {
      return;
    }

    const keyFrames = getKeyFrames(snowPaths);
    const anim = getAnimation(keyFrames);
    setAnimation(anim);
  };

  function getKeyFrames(snowPaths: string[]): number[] {
    const seasonDuration = SeasonHelper.getSeasonDurationByName(currentSeason);
    return snowPaths.reduce((acc, _, index) => {
      if (index > 0) {
        acc.push(index * (seasonDuration / (snowPaths.length - 1)));
      }
      return acc;
    }, [] as Array<number>);
  }

  const getAnimation = (keyFrames: number[]): MorphingAnimation | undefined => {
    switch (snowAnimationState) {
      case ANIMATION_STATE.BACKWARD: {
        return new MorphingAnimation(snowPaths, keyFrames);
      }
      case ANIMATION_STATE.FORWARD: {
        return new MorphingAnimation([...snowPaths].reverse(), keyFrames);
      }
      case ANIMATION_STATE.STOP_END: {
        return new MorphingAnimation([snowPaths[0]], []);
      }
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
    setupAnimationForSeason();
  }, [currentSeason, snowPaths, snowAnimationState]);

  useAnimationFrame(
    (time) => {
      const t = SeasonHelper.getTimeInSeason(time);
      const path = animation ? animation.getPath(t) : "";
      const duration = SeasonHelper.getTotalDuration();
      setMountainColor(
        getColorInRange({
          range: colorRange.colors,
          domain: colorRange.position,
          percentage: (time % duration) / duration,
        })
      );

      setSnowPath(path);
    },
    [animation, currentSeason, snowAnimationState, xStep]
  );

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
