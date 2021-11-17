import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Tuple } from "../utilities/Math";
import { SvgPath } from "../utilities/SvgPath";
import { loopState } from "./LoopState";

type CloudProps = {
  canvasDimensions: { x: number; y: number };
};

type CloudPoints = {
  bottomLeft: Tuple;
  bumps: Tuple[];
};

const Clouds = ({ canvasDimensions }: CloudProps) => {
  const [cloudData] = useState<CloudPoints[]>(() => generateCloudPoints());
  const [cloudPaths, setCloudPaths] = useState<string[]>([]);
  const loopTick = useRecoilValue(loopState);

  useEffect(() => {
    setCloudPaths(generateClouds(loopTick));
  }, [loopTick]);

  const generateClouds = (time: number) => {
    const clouds = cloudData.map((cloud: CloudPoints) => {
      const timePos = (time % (canvasDimensions.x * 1000)) / 100;
      const p: Tuple = [cloud.bottomLeft[0] + timePos, cloud.bottomLeft[1]];

      const bump = cloud.bumps
        .map((b, index) => {
          const prev = index !== 0 ? cloud.bumps[index - 1] : [0, 0];
          const ctrlPt: Tuple =
            b[1] >= 0 ? [b[0], 0] : [(b[0] - prev[0]) / 2, b[1]];

          return SvgPath.quadCurve(b, ctrlPt);
        })
        .join(" ");
      return `${SvgPath.move(p)} ${bump} z`;
    });
    return clouds;
  };

  useEffect(() => {
    setCloudPaths(generateClouds(1));
  }, []);

  return (
    <g>
      {cloudPaths.map((c: string, i: number) => (
        <path key={`cloud_${i}`} d={c} fill={"white"} />
      ))}
    </g>
  );
};

const generateCloudPoints = (): CloudPoints[] => {
  const width = Math.random() * 50 + 150;
  const height = Math.random() * 30 + 100;
  const pos = [0, height + 150 * Math.random()];
  /**     ------
   *     |       \____
   *    /             \
   *  A-----------------
   */
  const numOfBumps = Math.floor(Math.random() * 3 + 4);
  const bumps = [] as Tuple[];
  const widthPart = width / (numOfBumps + 1);
  const peak = 2 * Math.floor(numOfBumps / 3);

  const prePeakHeightPart = height / (peak + 1);
  const postPeakHeightPart = height / (numOfBumps - peak + 2);
  let absPos: Tuple = [0, 0];

  for (let i = 0; i < numOfBumps; i++) {
    const postPeak = i >= peak ? -1 : 1;
    const heightPart = i >= peak ? postPeakHeightPart : prePeakHeightPart;
    const x = widthPart + ((Math.random() - 0.5) * widthPart) / 2;
    const y = -heightPart * postPeak + (Math.random() - 0.5) * (heightPart / 4);
    absPos = [absPos[0] + x, absPos[1] + y];
    bumps.push([x, y]);
  }

  bumps.push([width - absPos[0], -absPos[1]]);

  return [
    {
      bottomLeft: [pos[0] + 0, pos[1]],
      bumps,
    },
  ];
};

export default Clouds;
