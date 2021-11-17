import { atom, selector, GetRecoilValue } from "recoil";

export type SeasonState = {
  duration: number;
  name: string;
};

export const totalYearDuration = selector({
  key: "totalYearDuration",
  get: ({ get }: { get: GetRecoilValue }) => {
    const seasons = get(seasonState);
    return seasons.reduce((acc: number, s: SeasonState) => {
      acc += s.duration;
      return acc;
    }, 0);
  },
});

export const currentSeasonState = atom({
  key: "currentSeasonState",
  default: "winter",
});

export const getCurrentSeasonDuration = selector({
  key: "getCurrentSeasonDuration",
  get: ({ get }: { get: GetRecoilValue }) => {
    const seasons: SeasonState[] = get(seasonState);
    const currentSeason: SeasonState | undefined = seasons.find(
      (s: SeasonState) => s.name === get(currentSeasonState)
    );
    if (!currentSeason) {
      throw new Error("Season: current season does not exist in seasons");
    }
    return currentSeason.duration;
  },
});

export const seasonState = atom({
  key: "seasonState",
  default: [
    {
      duration: 10000,
      name: "winter",
    },
    {
      duration: 11000,
      name: "spring",
    },
    {
      duration: 12000,
      name: "summer",
    },
    {
      duration: 13000,
      name: "fall",
    },
  ],
});
