import chroma from "chroma-js";

export const getColorInRange = (range?: Array<string>) => {
  const scale = chroma.scale(range);
  return scale(Math.random()).hex();
}
