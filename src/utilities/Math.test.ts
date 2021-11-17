import { getRandomFromRange } from "./Math";
test("getRandomFromRange, individual ", () => {
  const a = 0;
  const b = 1;
  const random = getRandomFromRange(a, b);
  expect(random >= a && random <= b).toBeTruthy();
});

test("getRandomFromRange, tuple", () => {
  const a = 1;
  const b = 0;
  const random = getRandomFromRange([1, 0]);
  expect(random >= b && random <= a).toBeTruthy();
});
