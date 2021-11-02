
import React from "react"
import MountainRange from "./MountainGenerator";

const Home = function () {

  return (
    <div className="px-28">
      <p className="text-xl grid">
        Hello. I am Kendra.<br />
        I'm a Frontend Web Developer.
      </p>
      <div className="btn-outline" >
        <img className="icon-sm" src="src/images/noun_arrows.svg" alt="Created by Colourcreatype" />
        <span className="font-semibold">View My Resume</span>
      </div>
    </div>
  );
}


export default Home;