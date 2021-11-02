

import MountainRange from "./MountainGenerator";
import Lake from "./Lake"
import { SPRING_MOUNTAIN_COLORS, WINTER_MOUNTAIN_COLORS } from "../constants/colors";
import chroma from "chroma-js";
import { ANIMATION_STATE, Season, SeasonHelper } from "../constants/seasons";
import { useAnimationFrame } from "../useAnimationFrame";
import { useState } from "react";

const Scene = function () {
  const [season, setSeason] = useState<Season>(SeasonHelper.getCurrentSeason(0))
  const canvasDimensions = { x: window.document.documentElement.clientWidth, y: 400 }
  const mountainBase = 5 * (canvasDimensions.y / 6);
  const peakRange = { bottom: canvasDimensions.y / 6, top: canvasDimensions.y / 2 };

  useAnimationFrame((time) => {
    const seasonName = SeasonHelper.getCurrentSeason(time).name
    if (seasonName !== season.name) {
      setSeason(SeasonHelper.getCurrentSeason(time))
    }
  })

  return (
    <div className=" bg-blue-100">
      <div>Season: {season.name}</div>
      <svg width={canvasDimensions.x} height={canvasDimensions.y} xmlns="http://www.w3.org/2000/svg" stroke="null" >

        <MountainRange
          numberOfMountains={3}
          canvasDimensions={canvasDimensions}
          base={mountainBase}
          peakRange={{ bottom: peakRange.bottom - 50, top: peakRange.top - 50 }}
          snowAnimation={ANIMATION_STATE.NONE}
          colorRange={season.features.mountains.colorRange.map((c) => chroma(c).brighten(1).desaturate(0.3).hex())}
          seasonDuration={season.duration}

        />

        <MountainRange
          numberOfMountains={7}
          canvasDimensions={canvasDimensions}
          base={mountainBase}
          peakRange={peakRange}
          snowAnimation={season.features.mountains.snowState}
          colorRange={season.features.mountains.colorRange}
          seasonDuration={season.duration}
        />

        <Lake surface={mountainBase} canvasDimensions={canvasDimensions} />
      </svg>
    </div >
  );
}


export default Scene;