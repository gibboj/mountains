

import * as flubber from "flubber"

type Interpolator = (t: number) => any;
type MorphOptions = {
  maxSegmentLength?: number;
}
const defaultOptions = { maxSegmentLength: 2 }

export class MorphingAnimation {
  interpolators: Array<Interpolator>;
  keyFrames: Array<number>;
  paths: Array<string>;
  options: MorphOptions;
  constructor(paths: Array<string>, keyFrames: Array<number>, options: MorphOptions = defaultOptions) {
    this.interpolators = [] as Array<Interpolator>;
    this.paths = paths;
    this.keyFrames = keyFrames;

    if (keyFrames.length !== (paths.length - 1)) {
      throw new Error(`there should be one less keyFrame than paths length. Paths: ${paths.length} | KeyFrame: ${keyFrames.length}`)
    }

    this.options = Object.assign({}, defaultOptions, options)
  }

  getInterpolator(index: number) {
    if (index === undefined || index < 0) {
      return null;
    }
    if (this.interpolators[index]) {
      return this.interpolators[index]
    }

    const interpolator = flubber.interpolate(this.paths[index], this.paths[index + 1], this.options);
    // cache
    this.interpolators[index] = interpolator;
    return interpolator;
  }

  getPath(time: number) {
    const index = this.keyFrames.findIndex((val: number) => {
      return time < val
    })

    const interpolator = this.getInterpolator(index);
    if (interpolator) {
      const startTime = index > 0 ? this.keyFrames[index - 1] : 0
      const percentage = Math.min(1, (time - startTime) / (this.keyFrames[index] - startTime))

      return interpolator(percentage)
    }
    return this.paths[this.paths.length - 1]
  }
}