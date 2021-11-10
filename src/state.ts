import { atom } from "recoil";
const numberOfMountains = atom({
  key: "numberOfMountains",
  default: [6, 3],
});

export default numberOfMountains;
