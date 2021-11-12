import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import Mountain from "./Mountain";

import { ANIMATION_STATE } from "../../constants/seasons";
import { Tuple } from "../../utilities/Math";
import { MountainRangeState, mountainRangeState } from "./MountainState";
import usePrevious from "../../utilities/usePrevious";

type MountainRangeOptions = {
  base: number;
  index: number;
  canvasDimensions: { x: number; y: number };
  colorCorrection: Array<[string, string]>;
  peakRange: Tuple;
  numberOfMountains: number;
  currentSeason: string;
  snowAnimationState?: ANIMATION_STATE;
};

const MountainRange: React.FC<MountainRangeOptions> = function ({
  base,
  index, // use better
  canvasDimensions,
  colorCorrection,
  numberOfMountains,
  peakRange,
  currentSeason,
  snowAnimationState: snowAnimation,
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
    if (numberOfMountains > mountainOrder.length) {
      setMountainOrder([
        ...mountainOrder.slice(0, spot),
        mountainOrder.length,
        ...mountainOrder.slice(spot),
      ]);
    } else if (numberOfMountains < mountainOrder.length) {
      const a = mountainOrder.filter((a) => {
        return a !== mountainOrder.length - 1;
      });
      setMountainOrder(a);
    }
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
            index={x}
            baseLine={base}
            peakRange={peakRange}
            xStep={xStep}
            colorCorrection={colorCorrection}
            snowAnimation={snowAnimation}
            currentSeason={currentSeason}
          />
        );
      })}
    </g>
  );
};

export default MountainRange;
