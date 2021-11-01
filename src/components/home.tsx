
import React from "react"

import { MorphingAnimation } from "./MorphingAnimation";

const animations = {
  highMountain: {
    keyFrame: [5000, 6000],
    paths: [
      "m72.41382,13.37441l13.42676,-16.68143l24.95121,16.85963c-0.43348,1.86658 6.37286,19.97925 -0.95871,19.41376c-7.33158,-0.56549 -5.93079,-9.0183 -11.29054,-8.45703c-5.35975,0.56126 -1.27695,14.78737 -9.62484,13.53262c-8.3479,-1.25476 -2.31739,-21.48923 -6.72163,-20.55883c-4.40424,0.9304 -5.40934,14.66612 -14.32061,14.90514c-8.91127,0.23902 2.62824,-16.30819 4.53836,-19.01385z",
      "m59,30l26,-30l43,31.50747c2.38342,1.3032 5.53239,25.60076 -5.74742,25.61091c-11.27982,0.01015 -11.08434,-23.9139 -19.74122,-24.23162c-8.65689,-0.31772 1.53995,52.8154 -13.00511,50.99727c-14.54505,-1.81813 -3.72583,-41.48916 -18.27088,-40.27707c-14.54506,1.21208 -3.43752,31.28579 -17.98257,30.67974c-14.54506,-0.60604 2.90993,-38.84333 4.82005,-41.54899z",

      "m29.03369,68.45873l56.80689,-70.76575l95.93688,68.69044c-0.21674,0.93329 5.46096,20.57594 -7.7517,24.42168c-13.21266,3.84574 -27.85095,-15.14767 -31.51674,-15.43042c-7.33157,-0.56549 -12.69133,18.58724 -20.02291,19.1485c-7.33157,0.56126 -9.44594,-15.63506 -17.79383,-16.88981c-8.3479,-1.25476 -9.6413,20.76415 -21.65115,20.84948c-12.00985,0.08533 -15.21707,-29.43957 -23.33467,-30.72851c-8.1176,-1.28894 -16.05206,27.0987 -27.98593,26.94933c-11.93387,-0.14938 -3.64191,-24.8921 -2.68685,-26.24493z",

    ]
  },
  lowMountain: {
    keyFrame: [4000],
    paths: [
      "m180.423,26.7873c1.96231,-2.70567 25.78981,-19.43198 25.78981,-19.43198c0,0 25.12529,17.10558 27.57384,18.40878c2.44855,1.3032 15.04989,19.04451 8.22377,20.00705c-6.82613,0.96253 -11.70467,-9.62819 -19.32827,-9.9459c-7.6236,-0.31771 -4.76717,27.73602 -13.67793,26.23535c-8.91076,-1.50067 -4.78002,-25.93359 -13.37332,-25.03897c-8.5933,0.89462 -13.69017,18.26991 -23.23585,15.7591c-9.54568,-2.5108 6.06563,-23.28777 8.02794,-25.99343z",
      "m347.46364,102.50912l-142.20854,-96.28198l-131.45798,96.55384l273.66651,-0.27186z"]
  }
}

const useAnimationFrame = (callback: FrameRequestCallback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef<number>(-1);
  const previousTimeRef = React.useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {

      callback(time)
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
}

const Home = function () {
  const paths = animations.highMountain.paths
  const duration = 30000;
  const [highMountainPath, setHighMountainPath] = React.useState(animations.highMountain.paths[0])
  const [lowMountainPath, setLowMountainPath] = React.useState(animations.lowMountain.paths[0])

  const highMountain = new MorphingAnimation(animations.highMountain.paths, animations.highMountain.keyFrame)

  const lowMountain = new MorphingAnimation(animations.lowMountain.paths, animations.lowMountain.keyFrame)

  useAnimationFrame(time => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    var t = time % duration;
    setHighMountainPath(highMountain.getPath(t))
    setLowMountainPath(lowMountain.getPath(t))
  })


  return (
    <div className="grid grid-cols-center gap-2">
      <div className="bg-red-500"></div>
      <div>
        <p className="text-xl grid">
          Hello. I am Kendra.<br />
          I'm a Frontend Web Developer.
        </p>
        <div className="btn-outline" >
          <img className="icon-sm" src="src/images/noun_arrows.svg" alt="Created by Colourcreatype" />
          <span className="font-semibold">View My Resume</span>
        </div>
        <div className="relative">
          <div className="absolute">{getLowMountain(lowMountainPath)}</div>
          <div className="absolute">{getHighMountain(highMountainPath)}</div>
        </div>
      </div>

      <div className="bg-red-500"></div>
    </div>
  );
}



const getHighMountain = (path: string) => (
  <svg width="351" height="107" xmlns="http://www.w3.org/2000/svg" stroke="null" >
    <g stroke="null">
      <path stroke="#000" id="all_mountains" d="m39,57.88484l47.29322,-58.19186c14.51423,10.50249 76.30046,54.64083 90.81469,65.14332l58.79704,41.51975l-77.92214,-0.14108l-58.00442,0.08896l-51.45218,0.17686l-49.34572,-0.22888l39.81951,-48.36707z" fill="#173d54" />

      <path
        id="highMountain"
        stroke="white" fill="white"
        strokeWidth="0"
        d={path}
      />
    </g>
  </svg>)

const getLowMountain = (path: string) => (
  <svg width="351" height="107" xmlns="http://www.w3.org/2000/svg" stroke="null" >
    <g stroke="null">
      <path stroke="#000" id="all_mountains" d="m350.46364,106.50912l-142.20854,-96.28198l-131.45798,96.55384l273.66651,-0.27186z" fill="#386781" />
      <path
        id="lowMountain"
        stroke="green" fill="#e8fffe"
        strokeWidth="0"
        d={path}
      />
    </g>
  </svg>)




export default Home;