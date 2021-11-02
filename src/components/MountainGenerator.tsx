import React, { useEffect, useState } from 'react'
import chroma from "chroma-js";
import { MorphingAnimation } from './MorphingAnimation'
import generateSnow from './SnowGenerator'
import { SNOW_COLOR_RANGE_BOTTOM, SNOW_COLOR_RANGE_TOP } from "../constants/colors"
import { SvgPath } from '../utilities/SvgPath';
import { getColorInRange } from '../utilities/Color';
import { useAnimationFrame } from '../useAnimationFrame';
import { ANIMATION_STATE, SeasonHelper } from '../constants/seasons';

type MountainRangeOptions = {
  canvasDimensions: { x: number, y: number },
  numberOfMountains: number,
  base: number,
  peakRange: Range,
  colorRange: Array<string>
  snowAnimation?: ANIMATION_STATE,
  seasonDuration: number
}

type Range = { bottom: number, top: number }
type MountainOptions = {
  i: number,
  base: number,
  peakRange: Range,
  xStep: number,
  mountainColor: string
  snowAnimation?: ANIMATION_STATE,
  seasonDuration: number
}

const MountainRange: React.FC<MountainRangeOptions> = function ({ canvasDimensions, numberOfMountains, peakRange, base, snowAnimation, colorRange, seasonDuration }) {
  const xStep = canvasDimensions.x / (numberOfMountains)
  const numMts = [...Array(numberOfMountains)]
  console.log("numMts", numMts)
  return (<g>
    {numMts.map((x, i) => <Mountain key={i} i={i} base={base} peakRange={peakRange} mountainColor={getColorInRange(colorRange)} xStep={xStep} snowAnimation={snowAnimation} seasonDuration={seasonDuration} />)}
  </g>
  )
}

const Mountain: React.FC<MountainOptions> = function ({ i, base, peakRange, xStep, mountainColor, snowAnimation, seasonDuration }) {
  const baseX = ((0.40 + Math.random()) * xStep)
  const baseY = base;
  const peakY = (Math.random() * (peakRange.top - peakRange.bottom)) + peakRange.bottom
  const peakX = (i + 0.5) * xStep
  const baseLeft = peakX - baseX;
  const baseRight = peakX + baseX;

  const [mountainPath, setMountainPath] = React.useState('')
  const [snowPaths, setSnowPaths] = React.useState<Array<string>>([20, 40, 60, 80, 100].map((val) => {
    return generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, val / 100)
  }))
  const [keyFrames, setKeyFrames] = React.useState<Array<number>>(snowPaths.reduce((acc, val, index) => {
    if (index > 0) {
      acc.push(index * (seasonDuration / (snowPaths.length - 1)))
    }
    return acc;
  }, [] as Array<number>))
  const [snowPath, setSnowPath] = React.useState('')
  const [snowPathTop, setSnowPathTop] = React.useState('')
  const [snowColor, setSnowColor] = React.useState(getColorInRange([SNOW_COLOR_RANGE_BOTTOM, SNOW_COLOR_RANGE_TOP]))
  const [animation, setAnimation] = React.useState<MorphingAnimation | null>(null)


  const setupAnimationForSeason = () => {
    if (snowAnimation !== ANIMATION_STATE.NONE && snowPaths.length > 0) {
      let anim = null;

      switch (snowAnimation) {
        case ANIMATION_STATE.BACKWARD: {
          anim = new MorphingAnimation(snowPaths, keyFrames)
          break;
        }
        case ANIMATION_STATE.FORWARD: {
          anim = new MorphingAnimation([...snowPaths].reverse(), keyFrames)
          break;
        }
      }
      if (anim) {
        setAnimation(anim)
        setSnowPath(anim.getPath(1))
        setSnowPathTop(anim.getPath(1000))
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
  }, [snowAnimation])

  useAnimationFrame(
    time => {
      var t = SeasonHelper.getTimeInSeason(time);
      animation && setSnowPath(animation.getPath(t))
      animation && setSnowPathTop(animation.getPath(t + seasonDuration * 0.2))
    }, [animation])

  return (
    <g key={`mountain_${i}`} stroke="null" >
      <path stroke="none" id={`mountain_${i}`} d={mountainPath} fill={mountainColor} />
      {snowAnimation !== ANIMATION_STATE.NONE && (
        <g>
          <path stroke="none" id={`mountain_${i}_snow`} d={snowPathTop} fill={chroma(snowColor).darken(0.2).hex()} />
          <path stroke="none" id={`mountain_${i}_snow_top`} d={snowPath} fill={snowColor} />
        </g>
      )}
    </g>
  );
}


export default MountainRange;