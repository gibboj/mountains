import React, { useEffect } from 'react'
import chroma from "chroma-js";
import { MorphingAnimation } from './MorphingAnimation'
import generateSnow from './SnowGenerator'
import { SNOW_COLOR_RANGE_BOTTOM, SNOW_COLOR_RANGE_TOP } from "../constants/colors"
import { SvgPath } from '../utilities/SvgPath';

type MountainRangeOptions = {
  canvasDimensions: { x: number, y: number },
  numberOfMountains: number,
  base: number,
  peakRange: Range,
}
type Range = { bottom: number, top: number }
type MountainOptions = {
  i: number,
  base: number,
  peakRange: Range,
  xStep: number
}
const NUMBER_OF_MOUNTAINS = 6;

const numMts = [...Array(NUMBER_OF_MOUNTAINS)];
const MountainRange: React.FC<MountainRangeOptions> = function ({ canvasDimensions, numberOfMountains, peakRange, base }) {
  const xStep = canvasDimensions.x / (numberOfMountains)
  return (<g>
    {numMts.map((x, i) => <Mountain key={i} i={i} base={base} peakRange={peakRange} xStep={xStep} />).sort((a, b) => 0.5 - Math.random())}
  </g>
  )
}

const Mountain: React.FC<MountainOptions> = function ({ i, base, peakRange, xStep }) {
  const [mountainPath, setMountainPath] = React.useState('')
  const [snowPath, setSnowPath] = React.useState('')
  const [snowPathTop, setSnowPathTop] = React.useState('')
  const [snowColor, setSnowColor] = React.useState(getRandomWhiteColor())
  const [snowColorTop, setSnowColorTop] = React.useState(getRandomWhiteColor())
  const [mountainColor, setMountainColor] = React.useState(getRandomColor())
  const [animation, setAnimation] = React.useState<MorphingAnimation | null>(null)

  const baseX = ((0.40 + Math.random()) * xStep)
  const baseY = base;
  const peakY = (Math.random() * (peakRange.top - peakRange.bottom)) + peakRange.bottom
  const peakX = (i + 0.5) * xStep
  const baseLeft = peakX - baseX;
  const baseRight = peakX + baseX;

  useEffect(() => {
    const path = `${SvgPath.move(peakX, peakY)} ${SvgPath.lineTo(baseLeft, baseY)}  ${SvgPath.lineTo(baseRight, baseY)} Z`

    // Make constants & loop
    const snowPath_100 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0.95)
    const snowPath_85 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0.85)
    const snowPath_70 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0.7)
    const snowPath_40 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0.4)
    const snowPath_20 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0)

    const anim = new MorphingAnimation([snowPath_100, snowPath_85, snowPath_70, snowPath_40, snowPath_20], [10000, 15000, 20000, 25000])
    setAnimation(anim)
    setSnowPath(anim.getPath(1))
    setSnowPathTop(anim.getPath(1000))
    setMountainPath(path)
  }, [])

  const useAnimationFrame = (callback: FrameRequestCallback) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef<number>(-1);
    const previousTimeRef = React.useRef<number>();

    const animate = (time: number) => {
      if (previousTimeRef.current != undefined) {
        callback(time)
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, [animation]); // Make sure the effect runs only once
  }

  useAnimationFrame(
    time => {
      var t = time % 30000;
      animation && setSnowPath(animation.getPath(t))
      animation && setSnowPathTop(animation.getPath(t + 7000))
    })

  return (
    <g key={`mountain_${i}`} stroke="null" >
      <path stroke="none" id={`mountain_${i}`} d={mountainPath} fill={mountainColor} />
      <path stroke="none" id={`mountain_${i}_snow`} d={snowPathTop} fill={chroma(snowColor).darken(0.2).hex()} />
      <path stroke="none" id={`mountain_${i}_snow_top`} d={snowPath} fill={snowColor} />
    </g>
  );
}

const getRandomColor = () => {
  const scale = chroma.scale(['C3E0E5', '274472']);
  return scale(Math.random()).hex();
}

const getRandomWhiteColor = () => {
  const scale = chroma.scale([SNOW_COLOR_RANGE_BOTTOM, SNOW_COLOR_RANGE_TOP]);
  return scale(Math.random()).hex();
}

export default MountainRange;