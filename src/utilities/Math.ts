export type Point = { x: number; y: number };
export type Tuple = [number, number];

export function intersection(
  p1: Tuple,
  p2: Tuple,
  p3: Tuple,
  p4: Tuple
): Tuple {
  const d =
    (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p1[0] - p2[0]);
  const num =
    ((p1[0] * p2[1] - p1[1] * p2[0]) * (p3[0] - p4[0]) -
      (p1[0] - p2[0]) * (p3[0] * p4[1] - p3[1] * p4[0])) /
    d;
  const den =
    ((p1[0] * p2[1] - p1[1] * p2[0]) * (p3[1] - p4[1]) -
      (p1[1] - p2[1]) * (p3[0] * p4[1] - p3[1] * p4[0])) /
    d;
  return [num, den];
}

interface getRandomFromRange {
  ([a, b]: Tuple): number;
  (a: number, b: number): number;
}

export function getRandomFromRange(a: number | Tuple, b?: number) {
  const x: number = b === undefined ? (a as Tuple)[0] : (a as number);
  const y: number = b === undefined ? (a as Tuple)[1] : (a as number);

  if (a === b) {
    return a;
  }
  const lower = x < y ? x : y;
  const upper = y < x ? x : y;
  return lower + Math.random() * (upper - lower);
}
