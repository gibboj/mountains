import {
  SeasonHelper,
  SPRING_LENGTH,
  SUMMER_LENGTH,
  FALL_LENGTH,
  WINTER_LENGTH,
} from "./seasons";

test("getTimeInSeason", () => {
  expect(SeasonHelper.getTimeInSeason(WINTER_LENGTH - 1)).toBe(
    WINTER_LENGTH - 1
  );
  expect(SeasonHelper.getTimeInSeason(WINTER_LENGTH + SPRING_LENGTH - 1)).toBe(
    SPRING_LENGTH - 1
  );
  expect(
    SeasonHelper.getTimeInSeason(
      WINTER_LENGTH + SPRING_LENGTH + SUMMER_LENGTH - 1
    )
  ).toBe(SUMMER_LENGTH - 1);
});

test("getCurrentSeason", () => {
  expect(SeasonHelper.getCurrentSeason(1).name).toBe("winter");
  expect(SeasonHelper.getCurrentSeason(WINTER_LENGTH + 10).name).toBe("spring");
  expect(
    SeasonHelper.getCurrentSeason(WINTER_LENGTH + SPRING_LENGTH + 10).name
  ).toBe("summer");
  expect(
    SeasonHelper.getCurrentSeason(
      WINTER_LENGTH + SPRING_LENGTH + SUMMER_LENGTH + 10
    ).name
  ).toBe("fall");
  expect(
    SeasonHelper.getCurrentSeason(
      WINTER_LENGTH + SPRING_LENGTH + SUMMER_LENGTH + FALL_LENGTH + 10
    ).name
  ).toBe("winter");
});

test("getNextSeason", () => {
  expect(SeasonHelper.getNextSeason(1).name).toBe("spring");
  expect(SeasonHelper.getNextSeason(WINTER_LENGTH + 1).name).toBe("summer");
  expect(
    SeasonHelper.getNextSeason(WINTER_LENGTH + SPRING_LENGTH + 1).name
  ).toBe("fall");
  expect(
    SeasonHelper.getNextSeason(
      WINTER_LENGTH + SPRING_LENGTH + SUMMER_LENGTH + 1
    ).name
  ).toBe("winter");
});

test("getPrevSeason", () => {
  expect(SeasonHelper.getPreviousSeason(1).name).toBe("fall");
  expect(SeasonHelper.getPreviousSeason(WINTER_LENGTH + 1).name).toBe("winter");
  expect(
    SeasonHelper.getPreviousSeason(WINTER_LENGTH + SPRING_LENGTH + 1).name
  ).toBe("spring");
});
