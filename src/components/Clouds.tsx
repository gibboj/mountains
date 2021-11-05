import { Tuple } from "../utilities/Math";
import { SvgPath } from "../utilities/SvgPath";

type CloudProps = {
  canvasDimensions: { x: number; y: number };
};

type CloudPoints = {
  bottomLeft: Tuple;
  bottomRight: Tuple;
  bumps: Tuple[];
};
const Clouds = ({ canvasDimensions }: CloudProps) => {
  const cp = generateCloudPoints(canvasDimensions);
  const clouds = cp.map((cloud: CloudPoints, index) => {
    let p = cloud.bottomLeft;
    let a = cloud.bottomRight;
    let bump = cloud.bumps
      .map((b, index) => {
        const prev = index !== 0 ? cloud.bumps[index - 1] : p;
        const ctrlPt: Tuple =
          prev[1] < b[1]
            ? [Math.max(prev[0], b[0]), Math.min(prev[1], b[1])]
            : [Math.min(prev[0], b[0]), Math.min(prev[1], b[1])];
        return SvgPath.quadCurve(b, ctrlPt);
      })
      .join(" ");
    return (
      <path
        key={`cloud_${index}`}
        d={`${SvgPath.move(p)} ${bump} Z`}
        fill={"white"}
        stroke={"white"}
        strokeWidth={3}
      />
    );
  });

  return <g>{clouds}</g>;
};

const generateCloudPoints = (canvasDimensions: {
  x: number;
  y: number;
}): CloudPoints[] => {
  const pos = [Math.random() * canvasDimensions.x, 100];
  const width = Math.random() * 50 + 150;
  const height = Math.random() * 30 + 100;
  /**     ------
   *     |       \____
   *    /             \
   *  A-----------------
   */
  const numOfBumps = 7; //Math.floor(Math.random() * 3 + 8);
  let bumps = [] as Tuple[];
  let widthPart = width / numOfBumps;
  let heightPart = height / numOfBumps;
  const peak = 2 * Math.floor(numOfBumps / 3);

  for (let i = 0; i < numOfBumps; i++) {
    const postPeak = i >= peak ? numOfBumps - i - 1 : i;

    bumps.push([
      pos[0] + widthPart * i + (Math.random() * widthPart) / 2,
      pos[1] - heightPart * postPeak - Math.random() * heightPart,
    ]);
  }
  bumps.push([pos[0] + width, pos[1]]);

  return [
    {
      bottomLeft: [pos[0] + 0, pos[1]],
      bottomRight: [pos[0] + width, pos[1]],
      bumps,
    },
  ];
};

export default Clouds;
