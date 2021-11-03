import chroma from "chroma-js";
import React, { useEffect } from "react";
import { SNOW_COLOR_RANGE_BOTTOM, SNOW_COLOR_RANGE_TOP } from "../constants/colors";
import { ANIMATION_STATE, SeasonHelper } from "../constants/seasons";
import { useAnimationFrame } from "../useAnimationFrame";
import { getColorInRange } from "../utilities/Color";
import { Tuple } from "../utilities/Math";
import { SvgPath } from "../utilities/SvgPath";
import { MorphingAnimation } from "./MorphingAnimation";
import generateSnow from "./SnowGenerator";

type MountainOptions = {
  i: number,
  base: number,
  peakRange: Tuple,
  xStep: number,
  mountainColor: string
  snowAnimation?: ANIMATION_STATE,
  seasonDuration: number
}
const ANIMATION_OFFSET = 1000;

const Mountain: React.FC<MountainOptions> = function ({ i, base, peakRange, xStep, mountainColor, snowAnimation, seasonDuration }) {
  const baseX = ((0.40 + Math.random()) * xStep)
  const baseY = base;
  const peakY = (Math.random() * (peakRange[1] - peakRange[0])) + peakRange[0]
  const peakX = (i + 0.5) * xStep
  const baseLeft = peakX - baseX;
  const baseRight = peakX + baseX;

  const [mountainPath, setMountainPath] = React.useState('')
  const [snowPaths, setSnowPaths] = React.useState<Array<string>>((): Array<string> => {
    return [20, 50, 80, 100].map((val) => {
      return generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, val / 100)
    })
  })
  const [keyFrames, setKeyFrames] = React.useState<Array<number>>(() => snowPaths.reduce((acc, val, index) => {
    if (index > 0) {
      acc.push(index * ((seasonDuration) / (snowPaths.length - 1)))
    }
    return acc;
  }, [] as Array<number>))
  const [snowPath, setSnowPath] = React.useState('')
  const [snowPathTop, setSnowPathTop] = React.useState('')
  const [snowColor, setSnowColor] = React.useState(getColorInRange([SNOW_COLOR_RANGE_BOTTOM, SNOW_COLOR_RANGE_TOP]))
  const [animation, setAnimation] = React.useState<MorphingAnimation | null>(null)

  const setupAnimationForSeason = () => {
    if (snowPaths.length > 0) {
      let anim = null;
      let newKeyFrames = snowPaths.reduce((acc, val, index) => {
        if (index > 0) {
          acc.push(index * ((seasonDuration) / (snowPaths.length - 1)))
        }
        return acc;
      }, [] as Array<number>)
      setKeyFrames(newKeyFrames)
      switch (snowAnimation) {
        case ANIMATION_STATE.BACKWARD: {
          anim = new MorphingAnimation(snowPaths, newKeyFrames)
          break;
        }
        case ANIMATION_STATE.FORWARD: {
          anim = new MorphingAnimation([...snowPaths].reverse(), newKeyFrames)
          break;
        }
        case ANIMATION_STATE.STOP_END: {
          anim = new MorphingAnimation([snowPaths[0]], [])
          break;
        }
      }
      if (anim) {
        setAnimation(anim)
      }
    }
  }

  useEffect(() => {
    setMountainPath(`${SvgPath.move(peakX, peakY)} ${SvgPath.lineTo(baseLeft, baseY)}  ${SvgPath.lineTo(baseRight, baseY)} Z`)

    if (snowAnimation !== ANIMATION_STATE.NONE) {
      setupAnimationForSeason()
    }
  }, [])

  useEffect(() => {
    setupAnimationForSeason()
  }, [snowAnimation, seasonDuration])

  useAnimationFrame(
    time => {
      var t = SeasonHelper.getTimeInSeason(time);

      animation && setSnowPath(animation.getPath(t))
      // animation && setSnowPathTop(animation.getPath(t + seasonDuration * 0.2))
    }, [animation])

  return (
    <g key={`mountain_${i}`} stroke="null" >
      <path stroke="none" id={`mountain_${i}`} d={mountainPath} fill={mountainColor} />
      {snowAnimation !== ANIMATION_STATE.NONE && (
        <g>
          {/* <path stroke="none" id={`mountain_${i}_snow`} d={snowPathTop} fill={chroma(snowColor).darken(0.2).hex()} /> */}
          <path stroke="none" id={`mountain_${i}_snow_top`} d={snowPath} fill={snowColor} />
        </g>
      )}
    </g>
  );
}
export default Mountain