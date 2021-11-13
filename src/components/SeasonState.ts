import { atom, selector, GetRecoilValue } from "recoil";

export type SeasonState = {
  duration: number;
  name: string;
};

export const totalSeasonDuration = selector({
  key: "totalSeasonDuration",
  get: ({ get }: { get: GetRecoilValue }) => {
    const seasons = get(seasonState);
    return seasons.reduce((acc: number, s: SeasonState) => {
      acc += s.duration;
      console.log(acc, s.duration, s.name);
      return acc;
    }, 0);
  },
});

export const currentSeason = atom({
  key: "currentSeason",
  default: "spring",
});

export const getCurrentSeasonDuration = selector({
  key: "getCurrentSeasonDuration",
  get: ({ get }: { get: GetRecoilValue }) => {
    const seasons = get(seasonState);
    return seasons.find((s: SeasonState) => s.name === get(currentSeason))
      .duration;
  },
});

export const getAllSeasonDuration = selector({
  key: "getAllSeasonDuration",
  get: ({ get }: { get: GetRecoilValue }): number[] => {
    const seasons = get(seasonState);
    const durations = seasons.map((s: SeasonState) => s.duration);
    return durations;
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
