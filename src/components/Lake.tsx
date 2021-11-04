import React, { useState } from "react";
import { SeasonHelper } from "../constants/seasons";
import { useAnimationFrame } from "../useAnimationFrame";
import { getColorInRange } from "../utilities/Color";

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
  const [lakeColorTop, setLakeColorTop] = useState<string>();
  const [lakeColorBottom, setLakeColorBottom] = useState<string>();

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
    },
    [seasonDuration]
  );

  return (
    <svg>
      <defs>
        <linearGradient id="lakeGradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor={lakeColorTop} />
          <stop offset="95%" stopColor={lakeColorBottom} />
        </linearGradient>
      </defs>
      <rect
        fill="url(#lakeGradient)"
        x="0"
        y={surface}
        width={canvasDimensions.x}
        height={canvasDimensions.y - surface}
      />
    </svg>
  );
};
export default Lake;
