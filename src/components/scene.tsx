

import MountainRange from "./MountainGenerator";
import Lake from "./Lake"
const Scene = function () {
  const canvasDimensions = { x: window.document.documentElement.clientWidth, y: 400 }
  const mountainBase = 5 * (canvasDimensions.y / 6);
  const peakRange = { bottom: canvasDimensions.y / 6, top: canvasDimensions.y / 2 };

  return (
    <div className=" bg-blue-100">
      <svg width={canvasDimensions.x} height={canvasDimensions.y} xmlns="http://www.w3.org/2000/svg" stroke="null" >
        <MountainRange numberOfMountains={5} canvasDimensions={canvasDimensions} base={mountainBase} peakRange={peakRange}>
        </MountainRange>
        <Lake surface={mountainBase} canvasDimensions={canvasDimensions} />
      </svg>
    </div>
  );
}


export default Scene;