import React, { useEffect, useRef, useState } from "react";
import Mountain from "./Mountain";

import { ANIMATION_STATE } from "../../constants/seasons";
import { Tuple } from "../../utilities/Math";

type MountainRangeOptions = {
  base: number;
  canvasDimensions: { x: number; y: number };
  colorCorrection: Array<[string, string]>;
  numberOfMountains: number;
  peakRange: Tuple;
  seasonDuration: number;
  snowAnimation?: ANIMATION_STATE;
};

const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
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
  const [numOfMts, setNumOfMts] = useState(numberOfMountains);

  const [xStep, setXStep] = useState(() => {
    return window.document.documentElement.clientWidth / numberOfMountains;
  });

  const [mountianOrder, setMountainOrder] = useState<number[]>(() =>
    [...Array(numberOfMountains)]
      .map((_, i) => i)
      .sort(() => (Math.random() < 0.5 ? -1 : 1))
  );
  const prevCanvasDims = usePrevious(canvasDimensions);

  useEffect(() => {
    setXStep(canvasDimensions.x / numberOfMountains);
  }, []);

  useEffect(() => {
    if (prevCanvasDims === undefined) {
      return;
    }

    const difference = canvasDimensions.x - prevCanvasDims.x;

    if (
      canvasDimensions.x > (mountianOrder.length + 0.5) * xStep &&
      difference > 0
    ) {
      addMountain();
    }
  }, [canvasDimensions]);

  function addMountain(pos?: number) {
    setNumOfMts(numOfMts + 1);

    mountianOrder.splice(
      Math.floor(Math.random() * mountianOrder.length),
      0,
      pos ? pos : mountianOrder.length
    );
  }

  return (
    <g>
      {mountianOrder.map((x, i) => {
        return (
          <Mountain
            key={`mountain_elem_${x}`}
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
