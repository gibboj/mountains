type Point = { x: number, y: number }
type Tuple = [number, number]

const generateSnow = (peakPoint: Point, basePoint: Point, position: number = 0.7) => {
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
  const D: Tuple = [basePoint.x, basePoint.y + h * position]
  const E: Tuple = [peakPoint.x, basePoint.y + h * position]
  const A: Tuple = [peakPoint.x, peakPoint.y];
  const B: Tuple = [basePoint.x, basePoint.y];
  const F = intersection(A, B, E, D)
  const G: Tuple = [E[0] + (E[0] - F[0]), E[1]];

  const curves = createSnowCurve(G, F, h, position)
  return `M ${peakPoint.x},${peakPoint.y} L${G[0]},${G[1]} ${curves} L${F[0]},${F[1]} Z`;
}

function createSnowCurve(a: Tuple, b: Tuple, heightOfMountain: number, position: number) {
  let drips = 7;

  const dripWidth = (b[0] - a[0]) / drips;
  const dripHeight = heightOfMountain

  let path = ``

  const [aX, aY] = a;

  for (let i = 1; i < drips + 1; i++) {
    const dW = i * dripWidth + (Math.random() - 0.5) * dripWidth * 0.3;
    const dH = dripHeight * (1 - position) * (0.1 + Math.random() * 0.2);
    if (i === 1) {
      path += `C ${aX} ${aY - dH} ${aX + dW} ${aY - dH} , ${aX + dW} ${aY} `
    } else if (i === drips + 1) {
      path += `S ${aX + dW} ${aY + Math.pow(-1, i) * dH}, ${b[0]} ${aY} `
    } else {
      path += `S ${aX + dW} ${aY + Math.pow(-1, i) * dH}, ${a[0] + dW} ${a[1]} `
    }
  }
  return path;
}

function intersection(p1: Tuple, p2: Tuple, p3: Tuple, p4: Tuple): Tuple {
  const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p1[0] - p2[0]);
  const num = ((p1[0] * p2[1] - p1[1] * p2[0]) * (p3[0] - p4[0]) - (p1[0] - p2[0]) * (p3[0] * p4[1] - p3[1] * p4[0])) / d;
  const den = ((p1[0] * p2[1] - p1[1] * p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] * p4[1] - p3[1] * p4[0])) / d;
  return [num, den]
}

export default generateSnow;