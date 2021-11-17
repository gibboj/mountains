import { getColorInRange } from "../utilities/Color";
import chroma from "chroma-js";
import {
  FALL_MOUNTAIN_COLORS,
  SPRING_MOUNTAIN_COLORS,
  SUMMER_MOUNTAIN_COLORS,
  WINTER_MOUNTAIN_COLORS,
} from "./colors";
import { SeasonState } from "../components/SeasonState";

export type Seasons = "winter" | "spring" | "summer" | "fall";

export enum ANIMATION_STATE {
  FORWARD,
  BACKWARD,
  STOP_START,
  STOP_END,
  NONE,
}

export interface SeasonColors {
  name: Seasons;
  mountains: {
    colorRange: Array<string>;
  };
  lake: {
    colorRange: Array<string>;
  };
}

export const seasonColors: Array<SeasonColors> = [
  {
    name: "winter",
    mountains: {
      colorRange: WINTER_MOUNTAIN_COLORS,
    },
    lake: {
      colorRange: ["e1f2f5", "c1dce0"],
    },
  },
  {
    name: "spring",

    mountains: {
      colorRange: SPRING_MOUNTAIN_COLORS,
    },
    lake: {
      colorRange: ["78ADC5", "4D8575"],
    },
  },
  {
    name: "summer",
    mountains: {
      colorRange: SUMMER_MOUNTAIN_COLORS,
    },
    lake: {
      colorRange: ["53ADDC", "214F99"],
    },
  },
  {
    name: "fall",
    mountains: {
      colorRange: FALL_MOUNTAIN_COLORS,
    },
    lake: {
      colorRange: ["91ACC3", "385275"],
    },
  },
];

export class SeasonHelper {
  static getMountainColors(
    colorCorrection: Array<[string, string]>,
    seasons: SeasonState[],
    totalDuration: number
  ): {
    colors: Array<string>;
    position: Array<number>;
  } {
    const colors = [];
    const position = [0];
    let timeProportion = 0;

    for (let s = 0; s < seasons.length; s++) {
      const seasonName = seasons[s].name;
      timeProportion += seasons[s].duration;

      const sColor = this.getSeasonColorBySeason(seasonName);
      let c = getColorInRange({
        range: sColor.mountains.colorRange,
      });
      colorCorrection.map(([modeChannel, adjustment]) => {
        c = chroma(c).set(modeChannel, adjustment).hex();
      });
      colors.push(c);

      position.push(timeProportion / totalDuration);
    }
    colors.unshift(colors[colors.length - 1]);

    return { colors, position };
  }
  static getSeasonColorBySeason(seasonName: string): SeasonColors {
    const sColor = seasonColors.find((s) => s.name === seasonName);
    if (!sColor) {
      throw new Error(`Mountain color not set for season: ${seasonName}`);
    }
    return sColor;
  }

  static getLakeColors(
    totalDuration: number,
    seasons: SeasonState[]
  ): {
    top: Array<string>;
    bottom: Array<string>;
    position: Array<number>;
  } {
    const colorsTop = [];
    const colorsBottom = [];
    const position = [0];
    let timeProportion = 0;

    for (let s = 0; s < seasons.length; s++) {
      const sColors = this.getSeasonColorBySeason(seasons[s].name);
      timeProportion += seasons[s].duration;
      colorsTop.push(sColors.lake.colorRange[0]);
      colorsBottom.push(sColors.lake.colorRange[1]);
      position.push(timeProportion / totalDuration);
    }

    colorsTop.unshift(colorsTop[colorsTop.length - 1]);
    colorsBottom.unshift(colorsBottom[colorsBottom.length - 1]);
    return { top: colorsTop, bottom: colorsBottom, position };
  }
}
