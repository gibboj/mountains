import { Tuple } from "./Math"

/**
 * 
 * MoveTo: M, m
 * LineTo: L, l, H, h, V, v
 * Cubic Bézier Curve: C, c, S, s
 * Quadratic Bézier Curve: Q, q, T, t
 * Elliptical Arc Curve: A, a
 * ClosePath: Z, z
 */
export class SvgPath {
  // Limited svg path creation
  static move(point: Tuple): string;
  static move(x: number, y: number): string;
  static move(x: number | Tuple, y?: number) {
    if (typeof x === "number" && y !== undefined) {
      return `M ${x} ${y}`
    }

    return `M ${(x as Tuple)[0]} ${(x as Tuple)[1]}`
  }
  // absolute positioning
  static lineTo(point: Tuple): string;
  static lineTo(x: number, y: number): string;
  static lineTo(x: number | Tuple, y?: number) {
    if (typeof x === "number" && y !== undefined) {
      return `L ${x} ${y}`
    }

    return `L ${(x as Tuple)[0]} ${(x as Tuple)[1]}`
  }


  static curve(point: Tuple, ctl1: Tuple, ctl2?: Tuple,) {
    if (ctl2 === undefined) {
      return `S ${ctl1[0]} ${ctl1[1]} ${point[0]} ${point[1]}`
    }
    return `C ${ctl1[0]} ${ctl1[1]} ${ctl2[0]} ${ctl2[1]}, ${point[0]} ${point[1]}`
  }
}