import React, { useEffect } from 'react'
import chroma from "chroma-js";
import { MorphingAnimation } from './MorphingAnimation'
import generateSnow from './SnowGenerator'

type MountainRangeOptions = {
  canvasDimensions: { x: number, y: number },
  numberOfMountains: number
}
type Range = { bottom: number, top: number }
type MountainOptions = {
  i: number,
  baseRange: Range,
  peakRange: Range,
  xStep: number
}

const numMts = [0, 1, 2, 3, 4, 5, 6];
const MountainRange: React.FC<MountainRangeOptions> = function ({ canvasDimensions, numberOfMountains }) {
  const baseRange = { bottom: 2 * (canvasDimensions.y / 3), top: 5 * (canvasDimensions.y / 6) };
  const peakRange = { bottom: canvasDimensions.y / 6, top: canvasDimensions.y / 2 };
  const xStep = canvasDimensions.x / (numberOfMountains)

  return (<svg width={canvasDimensions.x} height={canvasDimensions.y} xmlns="http://www.w3.org/2000/svg" stroke="null" >

    {numMts.map((x, i) => <Mountain key={i} i={i} baseRange={baseRange} peakRange={peakRange} xStep={xStep} />).sort((a, b) => 0.5 - Math.random())}
  </svg>
  )
}

const Mountain: React.FC<MountainOptions> = function ({ i, baseRange, peakRange, xStep }) {
  const [mountainPath, setMountainPath] = React.useState('')
  const [snowPath, setSnowPath] = React.useState('')
  const [snowPathTop, setSnowPathTop] = React.useState('')
  const [snowColor, setSnowColor] = React.useState(getRandomWhiteColor())
  const [snowColorTop, setSnowColorTop] = React.useState(getRandomWhiteColor())
  const [mountainColor, setMountainColor] = React.useState(getRandomColor())
  const [animation, setAnimation] = React.useState<MorphingAnimation | null>(null)

  const baseX = ((0.40 + Math.random()) * xStep)
  const baseY = baseRange.top;
  const peakY = (Math.random() * (peakRange.top - peakRange.bottom)) + peakRange.bottom
  const peakX = (i + 0.5) * xStep
  const baseLeft = peakX - baseX;
  const baseRight = peakX + baseX;

  useEffect(() => {
    const path = `M ${peakX},${peakY} L${baseLeft},${baseY} L${baseRight},${baseY} Z`

    const snowPath_100 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0.95)
    const snowPath_85 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0.85)
    const snowPath_70 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0.7)
    const snowPath_40 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0.4)
    const snowPath_20 = generateSnow({ x: peakX, y: peakY }, { x: baseLeft, y: baseY }, 0)

    const anim = new MorphingAnimation([snowPath_100, snowPath_85, snowPath_70, snowPath_40, snowPath_20], [10000, 15000, 20000, 30000])
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
      animation && setSnowPathTop(animation.getPath(t + 9000))
    })

  return (
    <g key={`mountain_${i}`} stroke="null" >
      <path stroke="none" id={`mountain_${i}`} d={mountainPath} fill={mountainColor} />
      <path stroke="none" id={`mountain_${i}_snow_2`} d={snowPathTop} fill={snowColorTop} />
      <path stroke="none" id={`mountain_${i}_snow`} d={snowPath} fill={snowColor} />
    </g>
  );
}

const getRandomColor = () => {
  const scale = chroma.scale(['C3E0E5', '274472']);
  return scale(Math.random()).hex();
}

const getRandomWhiteColor = () => {
  const scale = chroma.scale(['FDFDF4', 'E0EBE5']);
  return scale(Math.random()).hex();
}

export default MountainRange;