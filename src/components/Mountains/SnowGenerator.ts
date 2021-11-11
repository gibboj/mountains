import { intersection, Point, Tuple } from "../../utilities/Math";
import { SvgPath } from "../../utilities/SvgPath";
const SNOW_DRIPS = 7;
const SNOW_DEPTH_PERCENTAGE = 0.05;
const generateSnow = (peakPoint: Point, basePoint: Point, position = 0.7) => {
  /** position of the snow line on a scale of  0 to 1, 1 being the peak */
  /**
   *        A
   *       /|\
   * D __F/_|E\G__
   *     /  |  \
   *    /   |   \
   *   -----C-----
   *  B
   *
   * A = peakPoint
   * B = basePoint
   * C = peakPoint.x, basePoint.y
   */

  const h = peakPoint.y - basePoint.y;
  const halfWidth = peakPoint.x - basePoint.x;

  const depthOfSnowY = Math.abs(h * SNOW_DEPTH_PERCENTAGE);
  const depthOfSnowX = Math.abs(depthOfSnowY * (halfWidth / h));

  const A: Tuple = [peakPoint.x, peakPoint.y];
  const B: Tuple = [basePoint.x, basePoint.y];
  const D: Tuple = [basePoint.x, basePoint.y + h * position];
  const E: Tuple = [peakPoint.x, basePoint.y + h * position];
  const F = intersection(A, B, E, D);
  const G: Tuple = [E[0] + (E[0] - F[0]), E[1]];
  const Fprime = [F[0] - depthOfSnowX, F[1]] as Tuple;
  const Gprime = [G[0] + depthOfSnowX, G[1]] as Tuple;
  const curves = createSnowCurve(
    Fprime,
    Gprime,
    h,
    position,
    halfWidth + depthOfSnowX * 2
  );
  const Aprime = [peakPoint.x, peakPoint.y - depthOfSnowY] as Tuple;
  return `${SvgPath.move(Aprime)} ${SvgPath.lineTo(
    Fprime
  )} ${curves} ${SvgPath.lineTo(Gprime)}  Z`;
};

function createSnowCurve(
  a: Tuple,
  b: Tuple,
  heightOfMountain: number,
  position: number,
  halfWidth: number
) {
  let drips = Math.max(SNOW_DRIPS, halfWidth / 70);
  drips = drips % 3 ? drips + 3 - (drips % 3) : drips;
  const dripWidth = (b[0] - a[0]) / drips;
  const dripHeight = heightOfMountain;

  let path = ``;

  const [aX, aY] = a;

  for (let i = 1; i < drips + 1; i++) {
    // magic jiggle;
    const dW = i * dripWidth + (Math.random() - 0.5) * dripWidth * 0.3;
    // magic jiggle;
    const dH = dripHeight * (1 - position) * (0.1 + Math.random() * 0.2);
    if (i === 1) {
      // first point in curve needs an extra control point
      path += SvgPath.curve([aX + dW, aY], [aX, aY - dH], [aX + dW, aY - dH]);
    } else {
      const endPoint: Tuple = i === drips + 1 ? [b[0], aY] : [aX + dW, aY];
      path += SvgPath.curve(endPoint, [aX + dW, aY + Math.pow(-1, i) * dH]);
    }
  }
  return path;
}

export default generateSnow;
