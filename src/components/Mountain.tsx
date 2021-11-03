import React, { useEffect, useState } from "react";
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
  snowAnimation?: ANIMATION_STATE,
  seasonDuration: number
}

const ANIMATION_OFFSET = 1000;
const ANIMATION_KEYS = [20, 50, 80, 100];
const Mountain: React.FC<MountainOptions> = function ({ i, base, peakRange, xStep, snowAnimation, seasonDuration }) {
  const baseX = ((0.40 + Math.random()) * xStep)
  const baseY = base;
  const peakY = (Math.random() * (peakRange[1] - peakRange[0])) + peakRange[0]
  const peakX = (i + 0.5) * xStep
  const baseLeft = peakX - baseX;
  const baseRight = peakX + baseX;
  const [azimuth, setAzimuth] = useState(180)
  const [mountainPath, setMountainPath] = useState('')
  const [colorRange] = useState(() => SeasonHelper.getMountainColors())
  const [mountainColor, setMountainColor] = useState(getColorInRange({ range: colorRange.colors, domain: colorRange.position }));

  const [snowPaths] = useState<Array<string>>((): Array<string> => ANIMATION_KEYS.map((val) => generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, val / 100)))

  const [snowPath, setSnowPath] = React.useState('')
  const [snowColor, setSnowColor] = React.useState(getColorInRange({ range: [SNOW_COLOR_RANGE_BOTTOM, SNOW_COLOR_RANGE_TOP] }))
  const [animation, setAnimation] = React.useState<MorphingAnimation | null>(null)

  const setupAnimationForSeason = () => {
    if (snowPaths.length === 0) {
      return
    }
    let anim = null;
    let newKeyFrames = snowPaths.reduce((acc, val, index) => {
      if (index > 0) {
        acc.push(index * ((seasonDuration) / (snowPaths.length - 1)))
      }
      return acc;
    }, [] as Array<number>)

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
    setAnimation(anim)

  }

  useEffect(() => {
    setMountainPath(
      `${SvgPath.move(peakX, peakY)} ${SvgPath.lineTo(baseLeft, baseY)}  ${SvgPath.lineTo(baseRight, baseY)} Z`
    )
    setupAnimationForSeason()
  }, [])

  useEffect(() => {
    setupAnimationForSeason()
  }, [seasonDuration, snowAnimation])

  useAnimationFrame(
    time => {
      var t = SeasonHelper.getTimeInSeason(time);

      setMountainColor(getColorInRange({
        range: colorRange.colors,
        domain: colorRange.position,
        percentage: time / SeasonHelper.getTotalDuration()
      }))

      const path = animation ? animation.getPath(t) : ''
      setSnowPath(path)
      // animation && setSnowPathTop(animation.getPath(t + seasonDuration * 0.2))
    }, [animation, seasonDuration, snowAnimation])

  return (
    <g key={`mountain_${i}`} stroke="null" >
      {/* <filter id="lightMe1">

        <feDiffuseLighting in="SourceGraphic" result="light"
          lighting-color="#fcfbc2">

          <fePointLight x={azimuth} y={0} z={200} />
        </feDiffuseLighting>

        <feComposite in="SourceGraphic" in2="light"
          operator="arithmetic" k1="1" k2="0.2" k3="0" k4="0" />
      </filter> */}

      <path stroke={mountainColor} strokeWidth={3} id={`mountain_${i}`} d={mountainPath} fill={mountainColor} />
      {(
        <g>
          {/* <path stroke="none" id={`mountain_${i}_snow`} d={snowPathTop} fill={chroma(snowColor).darken(0.2).hex()} /> */}
          <path id={`mountain_${i}_snow_top`} d={snowPath} fill={snowColor} />
        </g>
      )}
    </g>
  );
}
export default Mountain