import chroma from "chroma-js";

export const getColorInRange = (range: Array<string>, percentage?: number) => {
  const scale = chroma.scale(range);
  const p = percentage !== undefined ? percentage : Math.random()
  return scale(p).hex();
}
