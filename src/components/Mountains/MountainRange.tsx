import React, { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import Mountain from "./Mountain";

import { ANIMATION_STATE } from "../../constants/seasons";
import { Tuple } from "../../utilities/Math";
import { MountainRangeState, mountainRangeState } from "./MountainState";

type MountainRangeOptions = {
  base: number;
  index: number;
  canvasDimensions: { x: number; y: number };
  colorCorrection: Array<[string, string]>;
  peakRange: Tuple;
  numberOfMountains: number;
  seasonDuration: number;
  snowAnimation?: ANIMATION_STATE;
};

const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const MountainRange: React.FC<MountainRangeOptions> = function ({
  base,
  index, // use better
  canvasDimensions,
  colorCorrection,
  numberOfMountains,
  peakRange,
  seasonDuration,
  snowAnimation,
}) {
  const [xStep, setXStep] = useState(() => {
    return window.document.documentElement.clientWidth / numberOfMountains;
  });

  const [mountainOrder, setMountainOrder] = useState<number[]>(() =>
    [...Array(numberOfMountains)]
      .map((_, i) => i)
      .sort(() => (Math.random() < 0.5 ? -1 : 1))
  );

  const prevCanvasDims = usePrevious(canvasDimensions);

  const setNumberOfMountains = useSetRecoilState(mountainRangeState);

  useEffect(() => {
    setXStep(canvasDimensions.x / numberOfMountains);
  }, []);

  useEffect(() => {
    if (prevCanvasDims === undefined) {
      return;
    }

    const difference = canvasDimensions.x - prevCanvasDims.x;

    if (
      canvasDimensions.x > (mountainOrder.length + 0.5) * xStep &&
      difference > 0
    ) {
      addMountain();
    }
  }, [canvasDimensions]);
  useEffect(() => {
    const spot = Math.floor(Math.random() * mountainOrder.length);
    setXStep(canvasDimensions.x / numberOfMountains);
    setMountainOrder([
      ...mountainOrder.slice(0, spot),
      mountainOrder.length,
      ...mountainOrder.slice(spot),
    ]);
  }, [numberOfMountains]);

  function addMountain() {
    setNumberOfMountains((oldList: MountainRangeState[]) =>
      oldList.map((v, i) =>
        i === index ? { ...v, mountainCount: v.mountainCount + 1 } : v
      )
    );
  }

  return (
    <g>
      {mountainOrder.map((x) => {
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
