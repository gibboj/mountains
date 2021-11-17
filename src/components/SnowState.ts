import { atom, selector, GetRecoilValue } from "recoil";
import { ANIMATION_STATE } from "../constants/seasons";
import { currentSeasonState } from "./SeasonState";

type Validator = (...args: any[]) => boolean;

const validators: Record<string, Validator> = {
  season: (get: GetRecoilValue, season: string) => {
    return get(currentSeasonState) === season;
  },
};

interface ValidationObj {
  params: Parameters<<T>(...args: T[]) => boolean>;
  validator: Validator;
}

type SnowAnimation = {
  req: null | ValidationObj[];
  result: unknown;
  priority: number;
};

//type ValidationObj = { params: Type; validator: ValidationFn };
export const snowSeasonAnimation = atom({
  key: "snowSeasonAnimation",
  default: [
    {
      req: [{ params: ["winter"], validator: validators.season }],
      result: ANIMATION_STATE.FORWARD,
      priority: 1,
    },
    {
      req: [{ params: ["spring"], validator: validators.season }],
      result: ANIMATION_STATE.BACKWARD,
      priority: 1,
    },
    { req: null, result: ANIMATION_STATE.NONE, priority: 0 },
  ],
});

const sortByPriority = (a: SnowAnimation, b: SnowAnimation) => {
  if (a.priority === b.priority) return 0;
  else return a.priority > b.priority ? 1 : -1;
};

export const getSnowAnimationState = selector({
  key: "getSnowAnimationState",
  get: ({ get }: { get: GetRecoilValue }) => {
    const snowSeasonAnim: SnowAnimation[] = get(snowSeasonAnimation);
    [...snowSeasonAnim].sort(sortByPriority);
    const snowAnimation = snowSeasonAnim.find((anim) => {
      const req = anim.req;
      if (!req) return true;
      return (
        req &&
        req.reduce((acc: boolean, r: ValidationObj): boolean => {
          const isValid = r.validator(get, r.params);
          return acc && isValid;
        }, true)
      );
    });

    if (!snowAnimation) {
      throw new Error("no valid default provided for snow animation");
    }

    return snowAnimation.result;
  },
});
