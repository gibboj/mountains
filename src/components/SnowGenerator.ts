

import { intersection, Point, Tuple } from "../utilities/Math";
import { SvgPath } from "../utilities/SvgPath";
const SNOW_DRIPS = 7;

const generateSnow = (peakPoint: Point, basePoint: Point, position: number = 0.7) => {
  //console.log(peakPoint)
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
  const h = (peakPoint.y - basePoint.y);
  const A: Tuple = [peakPoint.x, peakPoint.y];
  const B: Tuple = [basePoint.x, basePoint.y];
  const D: Tuple = [basePoint.x, basePoint.y + h * position]
  const E: Tuple = [peakPoint.x, basePoint.y + h * position]
  const F = intersection(A, B, E, D)
  const G: Tuple = [E[0] + (E[0] - F[0]), E[1]];

  const curves = createSnowCurve(G, F, h, position)
  return `${SvgPath.move(A)} ${SvgPath.lineTo(G)} ${curves} ${SvgPath.lineTo(F)}  Z`;
}

function createSnowCurve(a: Tuple, b: Tuple, heightOfMountain: number, position: number) {
  let drips = SNOW_DRIPS;

  const dripWidth = (b[0] - a[0]) / drips;
  const dripHeight = heightOfMountain

  let path = ``

  const [aX, aY] = a;

  for (let i = 1; i < drips + 1; i++) {
    const dW = i * dripWidth + (Math.random() - 0.5) * dripWidth * 0.3 // magic jiggle;
    const dH = dripHeight * (1 - position) * (0.1 + Math.random() * 0.2) //magic jiggle;
    if (i === 1) {
      // first point in curve needs an extra control point
      path += SvgPath.curve([aX + dW, aY], [aX, aY - dH], [aX + dW, aY - dH])
    } else {
      const endPoint: Tuple = (i === drips + 1) ? [b[0], aY] : [aX + dW, aY]
      path += SvgPath.curve(endPoint, [aX + dW, aY + Math.pow(-1, i) * dH])
    }
  }
  return path;
}


export default generateSnow;