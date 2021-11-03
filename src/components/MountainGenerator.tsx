import React from 'react'
import Mountain from "./Mountain";
import { getColorInRange } from '../utilities/Color';

import { ANIMATION_STATE } from '../constants/seasons';
import { Tuple } from '../utilities/Math';

type MountainRangeOptions = {
  canvasDimensions: { x: number, y: number },
  numberOfMountains: number,
  base: number,
  peakRange: Tuple,
  colorRange: Array<string>
  snowAnimation?: ANIMATION_STATE,
  seasonDuration: number
}


const MountainRange: React.FC<MountainRangeOptions> = function ({ canvasDimensions, numberOfMountains, peakRange, base, snowAnimation, colorRange, seasonDuration }) {
  const xStep = canvasDimensions.x / (numberOfMountains)
  const numMts = [...Array(numberOfMountains)]

  return (<g>
    {numMts.map((x, i) => {
      return (
        <Mountain
          key={`mountain_elem_${i}`}
          i={i}
          base={base}
          peakRange={peakRange}
          mountainColor={getColorInRange(colorRange)}
          xStep={xStep}
          snowAnimation={snowAnimation}
          seasonDuration={seasonDuration}
        />)
    })
    }
  </g>
  )
}



export default MountainRange;