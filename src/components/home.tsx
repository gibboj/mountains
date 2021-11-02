
import React from "react"
import MountainRange from "./MountainGenerator";

const Home = function () {

  return (<div>
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
      </div>
      <div className="bg-red-500"></div>
    </div>
    <div>
      <div className="relative">
        <div className="absolute  bg-blue-100">
          <MountainRange numberOfMountains={5} canvasDimensions={{ x: window.document.documentElement.clientWidth, y: 400 }}>
          </MountainRange></div>
      </div>
    </div></div >
  );
}


export default Home;