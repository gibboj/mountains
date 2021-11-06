import React, { useState } from "react";
import Mountain from "./Mountain";

import { ANIMATION_STATE } from "../constants/seasons";
import { Tuple } from "../utilities/Math";

type MountainRangeOptions = {
  base: number;
  canvasDimensions: { x: number; y: number };
  colorCorrection: Array<[string, string]>;
  numberOfMountains: number;
  peakRange: Tuple;
  seasonDuration: number;
  snowAnimation?: ANIMATION_STATE;
};

const MountainRange: React.FC<MountainRangeOptions> = function ({
  base,
  canvasDimensions,
  colorCorrection,
  numberOfMountains,
  peakRange,
  seasonDuration,
  snowAnimation,
}) {
  const xStep = canvasDimensions.x / numberOfMountains;
  const [mountianOrder] = useState<number[]>(() =>
    [...Array(numberOfMountains)]
      .map((_, i) => i)
      .sort(() => (Math.random() < 0.5 ? -1 : 1))
  );
  return (
    <g>
      {mountianOrder.map((x, i) => {
        return (
          <Mountain
            key={`mountain_elem_${i}`}
            i={x}
            base={base}
            peakRange={peakRange}
            xStep={xStep}
            colorCorrection={colorCorrection}
            snowAnimation={snowAnimation}
            seasonDuration={seasonDuration}
          />
        );
      })}
    </g>
  );
};

export default MountainRange;
