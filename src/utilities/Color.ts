import chroma from "chroma-js";

type ColorRangeOptions = { range: Array<string>, percentage?: number, domain?: Array<number> }

export const getColorInRange = ({ range, domain, percentage }: ColorRangeOptions) => {
  const scale = chroma.scale(range);
  if (domain) {
    scale.domain(domain)
  }
  const p = percentage !== undefined ? percentage : Math.random()
  return scale(p).hex();
}
