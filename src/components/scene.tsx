

import { useState } from "react";
import chroma from "chroma-js";
import MountainRange from "./MountainGenerator";
import Lake from "./Lake"
import { ANIMATION_STATE, Season, SeasonHelper } from "../constants/seasons";
import { useAnimationFrame } from "../useAnimationFrame";
import { Tuple } from '../utilities/Math';

const Scene = function () {
  const currentSeason = SeasonHelper.getCurrentSeason(1);


  const [seasonName, setSeasonName] = useState<string>(SeasonHelper.getCurrentSeason(1).name)
  const [snowState, setSnowState] = useState<ANIMATION_STATE>(ANIMATION_STATE.FORWARD)


  const [seasonDuration, setSeasonDuration] = useState<number>(SeasonHelper.getCurrentSeason(1).duration)
  const canvasDimensions = { x: window.document.documentElement.clientWidth, y: 400 }
  const mountainBase = 5 * (canvasDimensions.y / 6);
  const peakRange: Tuple = [canvasDimensions.y / 6, canvasDimensions.y / 2]

  useAnimationFrame((time) => {
    const newSeason = SeasonHelper.getCurrentSeason(time)
    if (newSeason.name !== seasonName) {
      setSeasonName(newSeason.name)
      setSnowState(newSeason.features.mountains.snowState)
      setSeasonDuration(newSeason.duration)
    }
  }, [seasonName, seasonDuration, snowState])

  return (
    <div className=" bg-blue-100">
      <div>Season: {seasonName}</div>
      <svg width={canvasDimensions.x} height={canvasDimensions.y} xmlns="http://www.w3.org/2000/svg" stroke="null" >

        {/* <MountainRange
          numberOfMountains={3}
          canvasDimensions={canvasDimensions}
          base={mountainBase}
          peakRange={[peakRange[0] - 50, peakRange[1] - 50]}
          snowAnimation={ANIMATION_STATE.NONE}
          colorRange={season.features.mountains.colorRange.map((c) => chroma(c).brighten(1).desaturate(0.3).hex())}
          seasonDuration={season.duration}

        /> */}

        <MountainRange
          numberOfMountains={1}
          canvasDimensions={canvasDimensions}
          base={mountainBase}
          peakRange={peakRange}
          snowAnimation={snowState}

          seasonDuration={seasonDuration}
        />

        <Lake surface={mountainBase} canvasDimensions={canvasDimensions} />
      </svg>
    </div >
  );
}


export default Scene;