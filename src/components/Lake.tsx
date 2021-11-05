import React, { useState } from "react";
import { SeasonHelper } from "../constants/seasons";
import { useAnimationFrame } from "../useAnimationFrame";
import { getColorInRange } from "../utilities/Color";
import chroma from "chroma-js";
import { SvgPath } from "../utilities/SvgPath";

type LakeProps = {
  canvasDimensions: { x: number; y: number };
  surface: number;
  seasonDuration: number;
};
const Lake: React.FC<LakeProps> = function ({
  canvasDimensions,
  surface,
  seasonDuration,
}: LakeProps) {
  const [lakeColors] = useState(SeasonHelper.getLakeColors());
  const [lakeColorTop, setLakeColorTop] = useState<string>("");
  const [lakeColorBottom, setLakeColorBottom] = useState<string>("");
  const [waveHeight, setWaveHeight] = useState<number[]>([1, 2, 3]);
  const [waves] = useState<number[][]>(() =>
    generateWaves(surface, canvasDimensions)
  );

  const getPointOnSin = (time: number) => {
    return Math.sin((time % 31416) / 500) * 5 - 5;
  };

  useAnimationFrame(
    (time) => {
      const percentage = time / SeasonHelper.getTotalDuration();

      setLakeColorTop(
        getColorInRange({
          range: lakeColors.top,
          domain: lakeColors.position,
          percentage,
        })
      );

      setLakeColorBottom(
        getColorInRange({
          range: lakeColors.bottom,
          domain: lakeColors.position,
          percentage,
        })
      );
      setWaveHeight([
        getPointOnSin(time),
        getPointOnSin(time + 2500),
        getPointOnSin(time + 10000),
        getPointOnSin(time + 7000),
      ]);
    },
    [seasonDuration]
  );
  const waveLength = 0;
  let waveColor = lakeColorTop;
  if (lakeColorTop) {
    waveColor = chroma(waveColor).darken(0.2).hex();
  }
  return (
    <g>
      <defs>
        <linearGradient id="lakeGradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor={lakeColorTop} />
          <stop offset="95%" stopColor={lakeColorBottom} />
        </linearGradient>
        <linearGradient id="waveGradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor={waveColor} opacity={1} />
          <stop
            offset="95%"
            stopColor={lakeColorBottom}
            stopOpacity={0.2}
            opacity={0.2}
          />
        </linearGradient>
      </defs>

      <rect
        fill="url(#lakeGradient)"
        x="0"
        y={surface}
        width={canvasDimensions.x}
        height={canvasDimensions.y - surface}
      />
      {waves.map((wavePoints, index) => {
        const [p0x, p0y, p1x, p1y, p2x, p2y, waveRate] = wavePoints;
        const wH = waveRate % waveHeight.length;
        return (
          <g key={`${index}_wave`}>
            <path
              d={`
      ${SvgPath.move(p0x, p0y)}
      ${SvgPath.lineTo(p1x, waveHeight[wH] / 2 + p1y + 2)}
      ${SvgPath.lineTo(p2x, p2y)} Z`}
              fill="url(#waveGradient)"
            />
          </g>
        );
      })}
    </g>
  );
};

const generateWaves = (
  surface: number,
  canvasDimensions: { x: number; y: number }
): Array<Array<number>> => {
  const wavesRows = 5;
  const wavesCols = 12;
  const offset = 10;
  const cHeight = (canvasDimensions.y - surface - offset) / wavesRows;
  const cWidth = canvasDimensions.x / wavesCols;

  return [...Array(wavesRows * wavesCols)].map((_, index) => {
    const xPos =
      (index % wavesCols) * cWidth +
      (Math.random() * (cWidth / 2) - cWidth / 4);

    const yPos =
      Math.floor(index / wavesCols) * cHeight +
      surface +
      offset +
      (Math.random() * (cHeight / 2) - cHeight / 4);

    const width =
      Math.abs(Math.floor(index / wavesCols)) * 10 + 40; /* min-width */
    console.log("Width", width, "Cols", Math.floor(index / wavesCols));
    return [
      xPos,
      yPos,
      xPos + width / 2,
      yPos,
      xPos + width,
      yPos,
      Math.floor(Math.random() * 10),
    ];
  });
};
export default Lake;
