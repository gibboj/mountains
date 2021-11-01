
declare module 'flubber' {
  export function interpolate(fromShape: any, toShape: any, options?: { maxSegmentLength?: number, string?: boolean }): (t: number) => string;
}