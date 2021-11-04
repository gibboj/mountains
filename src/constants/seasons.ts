import { getColorInRange } from "../utilities/Color";
import {
  FALL_MOUNTAIN_COLORS,
  SPRING_MOUNTAIN_COLORS,
  SUMMER_MOUNTAIN_COLORS,
  WINTER_MOUNTAIN_COLORS,
} from "./colors";

export const WINTER_LENGTH = 12000;
export const SPRING_LENGTH = 12000;
export const SUMMER_LENGTH = 12000;
export const FALL_LENGTH = 15000;

export type Seasons = "winter" | "spring" | "summer" | "fall";

export enum ANIMATION_STATE {
  FORWARD,
  BACKWARD,
  STOP_START,
  STOP_END,
  NONE,
}

export interface Season {
  name: Seasons;
  duration: number;
  features: {
    mountains: {
      snowState: ANIMATION_STATE;
      colorRange: Array<string>;
    };
    lake: {
      colorRange: Array<string>;
    };
  };
}

export const seasons: Array<Season> = [
  {
    name: "winter",
    duration: WINTER_LENGTH,
    features: {
      mountains: {
        snowState: ANIMATION_STATE.FORWARD,
        colorRange: WINTER_MOUNTAIN_COLORS,
      },
      lake: {
        colorRange: ["e1f2f5", "c1dce0"],
      },
    },
  },
  {
    name: "spring",
    duration: SPRING_LENGTH,
    features: {
      mountains: {
        snowState: ANIMATION_STATE.BACKWARD,
        colorRange: SPRING_MOUNTAIN_COLORS,
      },
      lake: {
        colorRange: ["78ADC5", "4D8575"],
      },
    },
  },
  {
    name: "summer",
    duration: SUMMER_LENGTH,
    features: {
      mountains: {
        snowState: ANIMATION_STATE.NONE,
        colorRange: SUMMER_MOUNTAIN_COLORS,
      },
      lake: {
        colorRange: ["53ADDC", "214F99"],
      },
    },
  },
  {
    name: "fall",
    duration: FALL_LENGTH,
    features: {
      mountains: {
        snowState: ANIMATION_STATE.NONE,
        colorRange: FALL_MOUNTAIN_COLORS,
      },
      lake: {
        colorRange: ["91ACC3", "385275"],
      },
    },
  },
];

export class SeasonHelper {
  static getTotalDuration(): number {
    return seasons.reduce((acc: number, season: Season): number => {
      return acc + season.duration;
    }, 0);
  }

  static getSeasonDuration(time: number) {
    return this.getCurrentSeason(time).duration;
  }

  static getTimeInSeason(time: number) {
    let cumulativeTime = 0;
    const total = this.getTotalDuration();
    const excessTime = time % total;

    seasons.some((season) => {
      if (excessTime < cumulativeTime + season.duration) {
        return true;
      }
      cumulativeTime += season.duration;
    });
    // console.log((time % total) - cumulativeTime)
    return excessTime - cumulativeTime;
  }

  static getCurrentSeason(time: number): Season {
    let cumulativeTime = 0;
    const total = this.getTotalDuration();

    const currentSeason = seasons.find((season): Season | undefined => {
      cumulativeTime += season.duration;
      if (time % total < cumulativeTime) {
        return season;
      }
    }, 0);

    if (!currentSeason) {
      throw new Error("No season found. This is unacceptable");
    }

    return currentSeason;
  }

  static getMountainColors(): {
    colors: Array<string>;
    position: Array<number>;
  } {
    const colors = [];
    const position = [0];
    let timeProportion = 0;

    for (let s = 0; s < seasons.length; s++) {
      timeProportion += seasons[s].duration;
      colors.push(
        getColorInRange({ range: seasons[s].features.mountains.colorRange })
      );
      position.push(timeProportion / SeasonHelper.getTotalDuration());
    }
    colors.unshift(colors[colors.length - 1]);

    return { colors, position };
  }

  static getLakeColors(): {
    top: Array<string>;
    bottom: Array<string>;
    position: Array<number>;
  } {
    const colorsTop = [];
    const colorsBottom = [];
    const position = [0];
    let timeProportion = 0;

    for (let s = 0; s < seasons.length; s++) {
      timeProportion += seasons[s].duration;
      colorsTop.push(seasons[s].features.lake.colorRange[0]);
      colorsBottom.push(seasons[s].features.lake.colorRange[1]);
      position.push(timeProportion / SeasonHelper.getTotalDuration());
    }

    colorsTop.unshift(colorsTop[colorsTop.length - 1]);
    colorsBottom.unshift(colorsBottom[colorsBottom.length - 1]);
    return { top: colorsTop, bottom: colorsBottom, position };
  }

  static getCurrentSeasonName(time: number): string {
    const season = this.getCurrentSeason(time);
    return season.name;
  }

  static getNextSeason(time: number): Season {
    const season = this.getCurrentSeason(time);
    return this.getCurrentSeason(time + season.duration);
  }

  static getPreviousSeason(time: number): Season {
    const prevTime = time - this.getTimeInSeason(time) - 1;
    return this.getCurrentSeason(
      prevTime < 0 ? prevTime + this.getTotalDuration() : prevTime
    );
  }
}
