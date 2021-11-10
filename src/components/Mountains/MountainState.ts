import { atom } from "recoil";

export type MountainRangeState = {
  mountainCount: number;
  animation: boolean;
};

export const mountainRangeState = atom({
  key: "mountainRangeState",
  default: [
    {
      mountainCount: 2,
      animation: false,
    },
    {
      mountainCount: 4,
      animation: false,
    },
    {
      mountainCount: 7,
      animation: true,
    },
  ],
});
