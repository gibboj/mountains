import MountainControls from "./MountainControls";
import SeasonControls from "./SeasonControls";
const ControlPanel = () => {
  return (
    <div className={" text-white pt-8"}>
      <SeasonControls />
      <MountainControls />
    </div>
  );
};
export default ControlPanel;
