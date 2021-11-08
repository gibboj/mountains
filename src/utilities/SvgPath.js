"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgPath = void 0;
/**
 *
 * MoveTo: M, m
 * LineTo: L, l, H, h, V, v
 * Cubic Bézier Curve: C, c, S, s
 * Quadratic Bézier Curve: Q, q, T, t
 * Elliptical Arc Curve: A, a
 * ClosePath: Z, z
 */
var SvgPath = /** @class */ (function () {
    function SvgPath() {
    }
    SvgPath.move = function (x, y) {
        if (typeof x === "number" && y !== undefined) {
            return "M " + x + " " + y;
        }
        return "M " + x[0] + " " + x[1];
    };
    SvgPath.lineTo = function (x, y) {
        if (typeof x === "number" && y !== undefined) {
            return "L " + x + "," + y;
        }
        return "L " + x[0] + "," + x[1];
    };
    SvgPath.curve = function (point, ctl1, ctl2) {
        if (ctl2 === undefined) {
            return "S " + ctl1[0] + " " + ctl1[1] + " " + point[0] + " " + point[1];
        }
        return "C " + ctl1[0] + " " + ctl1[1] + " " + ctl2[0] + " " + ctl2[1] + ",\n     " + point[0] + " " + point[1];
    };
    SvgPath.quadCurve = function (point, ctl1) {
        return "q " + ctl1[0] + " " + ctl1[1] + " " + point[0] + " " + point[1];
    };
    return SvgPath;
}());
exports.SvgPath = SvgPath;
