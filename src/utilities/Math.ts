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
