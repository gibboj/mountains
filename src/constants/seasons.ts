import { getColorInRange } from "../utilities/Color";
import { SPRING_MOUNTAIN_COLORS, WINTER_MOUNTAIN_COLORS } from "./colors";

export const WINTER_LENGTH = 2000;
export const SPRING_LENGTH = 5000;

export type Seasons = 'winter' | 'spring'

export enum ANIMATION_STATE {
  FORWARD,
  BACKWARD,
  STOP_START,
  STOP_END,
  NONE
}

export interface Season {
  name: Seasons,
  duration: number,
  features: {
    mountains: {
      snowState: ANIMATION_STATE,
      colorRange: Array<string>
    },
    lake: {
      colorRange: Array<string>
    }
  }
}

export const seasons: Array<Season> = [{
  name: 'winter',
  duration: WINTER_LENGTH,
  features: {
    mountains: {
      snowState: ANIMATION_STATE.FORWARD,
      colorRange: WINTER_MOUNTAIN_COLORS
    },
    lake: {
      colorRange: ['green', 'aqua']
    }
  }
},
{
  name: 'spring',
  duration: SPRING_LENGTH,
  features: {
    mountains: {
      snowState: ANIMATION_STATE.BACKWARD,
      colorRange: SPRING_MOUNTAIN_COLORS
    },
    lake: {
      colorRange: ['green', 'aqua']
    }
  },
}]

export class SeasonHelper {
  static getTotalDuration(): number {
    return seasons.reduce((acc: number, season: Season): number => {
      return acc + season.duration;
    }, 0)
  }

  static getSeasonDuration(time: number) {
    return this.getCurrentSeason(time).duration
  }

  static getTimeInSeason(time: number) {
    let cumulativeTime = 0;
    const total = this.getTotalDuration()
    let passedTime = cumulativeTime;
    seasons.forEach((season, index): number | undefined => {
      if ((time % total) < cumulativeTime + season.duration || index === seasons.length - 1) {
        passedTime = cumulativeTime;
        return;
      }
      cumulativeTime += season.duration;
    })

    return (time % total) - passedTime;
  }

  static getCurrentSeason(time: number): Season {
    let cumulativeTime = 0;
    const total = this.getTotalDuration()

    const currentSeason = seasons.find((season, index): Season | undefined => {
      cumulativeTime += season.duration;
      if ((time % total) < cumulativeTime) {
        return season;
      }
    }, 0)

    if (!currentSeason) {
      throw new Error("No season found. This is unacceptable")
    }
    return currentSeason;
  }

  static getMountainColors(time: number): Array<string> {
    const season = this.getCurrentSeason(time)
    const prevSeason = this.getPreviousSeason(time)
    const currColor = getColorInRange(season.features.mountains.colorRange)
    const nextColor = getColorInRange(prevSeason.features.mountains.colorRange)
    return [nextColor, currColor]
  }

  static getCurrentSeasonName(time: number): string {
    const season = this.getCurrentSeason(time)
    return season.name
  }

  static getNextSeason(time: number): Season {
    const season = this.getCurrentSeason(time)
    return this.getCurrentSeason(time + season.duration)
  }

  static getPreviousSeason(time: number): Season {
    const prevTime = (time - this.getTimeInSeason(time) - 1)
    return this.getCurrentSeason(prevTime < 0 ? prevTime + this.getTotalDuration() : prevTime)
  }
}