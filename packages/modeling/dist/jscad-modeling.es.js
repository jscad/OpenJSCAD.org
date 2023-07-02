/**
 * Constructive Solid Geometry (CSG) Library for JSCAD
 * @jscad/modeling
 * Version 2.10.0
 * MIT License
 */

/**
 * @alias module:modeling/colors.cssColors
 * @see CSS color table from http://www.w3.org/TR/css3-color/
 * @enum {Array}
 * @example
 * let newShape = colorize(cssColors.red, oldShape)
 */
const cssColors = {
  // basic color keywords
  black: [0 / 255, 0 / 255, 0 / 255],
  silver: [192 / 255, 192 / 255, 192 / 255],
  gray: [128 / 255, 128 / 255, 128 / 255],
  white: [255 / 255, 255 / 255, 255 / 255],
  maroon: [128 / 255, 0 / 255, 0 / 255],
  red: [255 / 255, 0 / 255, 0 / 255],
  purple: [128 / 255, 0 / 255, 128 / 255],
  fuchsia: [255 / 255, 0 / 255, 255 / 255],
  green: [0 / 255, 128 / 255, 0 / 255],
  lime: [0 / 255, 255 / 255, 0 / 255],
  olive: [128 / 255, 128 / 255, 0 / 255],
  yellow: [255 / 255, 255 / 255, 0 / 255],
  navy: [0 / 255, 0 / 255, 128 / 255],
  blue: [0 / 255, 0 / 255, 255 / 255],
  teal: [0 / 255, 128 / 255, 128 / 255],
  aqua: [0 / 255, 255 / 255, 255 / 255],
  // extended color keywords
  aliceblue: [240 / 255, 248 / 255, 255 / 255],
  antiquewhite: [250 / 255, 235 / 255, 215 / 255],
  // 'aqua': [ 0 / 255, 255 / 255, 255 / 255 ],
  aquamarine: [127 / 255, 255 / 255, 212 / 255],
  azure: [240 / 255, 255 / 255, 255 / 255],
  beige: [245 / 255, 245 / 255, 220 / 255],
  bisque: [255 / 255, 228 / 255, 196 / 255],
  // 'black': [ 0 / 255, 0 / 255, 0 / 255 ],
  blanchedalmond: [255 / 255, 235 / 255, 205 / 255],
  // 'blue': [ 0 / 255, 0 / 255, 255 / 255 ],
  blueviolet: [138 / 255, 43 / 255, 226 / 255],
  brown: [165 / 255, 42 / 255, 42 / 255],
  burlywood: [222 / 255, 184 / 255, 135 / 255],
  cadetblue: [95 / 255, 158 / 255, 160 / 255],
  chartreuse: [127 / 255, 255 / 255, 0 / 255],
  chocolate: [210 / 255, 105 / 255, 30 / 255],
  coral: [255 / 255, 127 / 255, 80 / 255],
  cornflowerblue: [100 / 255, 149 / 255, 237 / 255],
  cornsilk: [255 / 255, 248 / 255, 220 / 255],
  crimson: [220 / 255, 20 / 255, 60 / 255],
  cyan: [0 / 255, 255 / 255, 255 / 255],
  darkblue: [0 / 255, 0 / 255, 139 / 255],
  darkcyan: [0 / 255, 139 / 255, 139 / 255],
  darkgoldenrod: [184 / 255, 134 / 255, 11 / 255],
  darkgray: [169 / 255, 169 / 255, 169 / 255],
  darkgreen: [0 / 255, 100 / 255, 0 / 255],
  darkgrey: [169 / 255, 169 / 255, 169 / 255],
  darkkhaki: [189 / 255, 183 / 255, 107 / 255],
  darkmagenta: [139 / 255, 0 / 255, 139 / 255],
  darkolivegreen: [85 / 255, 107 / 255, 47 / 255],
  darkorange: [255 / 255, 140 / 255, 0 / 255],
  darkorchid: [153 / 255, 50 / 255, 204 / 255],
  darkred: [139 / 255, 0 / 255, 0 / 255],
  darksalmon: [233 / 255, 150 / 255, 122 / 255],
  darkseagreen: [143 / 255, 188 / 255, 143 / 255],
  darkslateblue: [72 / 255, 61 / 255, 139 / 255],
  darkslategray: [47 / 255, 79 / 255, 79 / 255],
  darkslategrey: [47 / 255, 79 / 255, 79 / 255],
  darkturquoise: [0 / 255, 206 / 255, 209 / 255],
  darkviolet: [148 / 255, 0 / 255, 211 / 255],
  deeppink: [255 / 255, 20 / 255, 147 / 255],
  deepskyblue: [0 / 255, 191 / 255, 255 / 255],
  dimgray: [105 / 255, 105 / 255, 105 / 255],
  dimgrey: [105 / 255, 105 / 255, 105 / 255],
  dodgerblue: [30 / 255, 144 / 255, 255 / 255],
  firebrick: [178 / 255, 34 / 255, 34 / 255],
  floralwhite: [255 / 255, 250 / 255, 240 / 255],
  forestgreen: [34 / 255, 139 / 255, 34 / 255],
  // 'fuchsia': [ 255 / 255, 0 / 255, 255 / 255 ],
  gainsboro: [220 / 255, 220 / 255, 220 / 255],
  ghostwhite: [248 / 255, 248 / 255, 255 / 255],
  gold: [255 / 255, 215 / 255, 0 / 255],
  goldenrod: [218 / 255, 165 / 255, 32 / 255],
  // 'gray': [ 128 / 255, 128 / 255, 128 / 255 ],
  // 'green': [ 0 / 255, 128 / 255, 0 / 255 ],
  greenyellow: [173 / 255, 255 / 255, 47 / 255],
  grey: [128 / 255, 128 / 255, 128 / 255],
  honeydew: [240 / 255, 255 / 255, 240 / 255],
  hotpink: [255 / 255, 105 / 255, 180 / 255],
  indianred: [205 / 255, 92 / 255, 92 / 255],
  indigo: [75 / 255, 0 / 255, 130 / 255],
  ivory: [255 / 255, 255 / 255, 240 / 255],
  khaki: [240 / 255, 230 / 255, 140 / 255],
  lavender: [230 / 255, 230 / 255, 250 / 255],
  lavenderblush: [255 / 255, 240 / 255, 245 / 255],
  lawngreen: [124 / 255, 252 / 255, 0 / 255],
  lemonchiffon: [255 / 255, 250 / 255, 205 / 255],
  lightblue: [173 / 255, 216 / 255, 230 / 255],
  lightcoral: [240 / 255, 128 / 255, 128 / 255],
  lightcyan: [224 / 255, 255 / 255, 255 / 255],
  lightgoldenrodyellow: [250 / 255, 250 / 255, 210 / 255],
  lightgray: [211 / 255, 211 / 255, 211 / 255],
  lightgreen: [144 / 255, 238 / 255, 144 / 255],
  lightgrey: [211 / 255, 211 / 255, 211 / 255],
  lightpink: [255 / 255, 182 / 255, 193 / 255],
  lightsalmon: [255 / 255, 160 / 255, 122 / 255],
  lightseagreen: [32 / 255, 178 / 255, 170 / 255],
  lightskyblue: [135 / 255, 206 / 255, 250 / 255],
  lightslategray: [119 / 255, 136 / 255, 153 / 255],
  lightslategrey: [119 / 255, 136 / 255, 153 / 255],
  lightsteelblue: [176 / 255, 196 / 255, 222 / 255],
  lightyellow: [255 / 255, 255 / 255, 224 / 255],
  // 'lime': [ 0 / 255, 255 / 255, 0 / 255 ],
  limegreen: [50 / 255, 205 / 255, 50 / 255],
  linen: [250 / 255, 240 / 255, 230 / 255],
  magenta: [255 / 255, 0 / 255, 255 / 255],
  // 'maroon': [ 128 / 255, 0 / 255, 0 / 255 ],
  mediumaquamarine: [102 / 255, 205 / 255, 170 / 255],
  mediumblue: [0 / 255, 0 / 255, 205 / 255],
  mediumorchid: [186 / 255, 85 / 255, 211 / 255],
  mediumpurple: [147 / 255, 112 / 255, 219 / 255],
  mediumseagreen: [60 / 255, 179 / 255, 113 / 255],
  mediumslateblue: [123 / 255, 104 / 255, 238 / 255],
  mediumspringgreen: [0 / 255, 250 / 255, 154 / 255],
  mediumturquoise: [72 / 255, 209 / 255, 204 / 255],
  mediumvioletred: [199 / 255, 21 / 255, 133 / 255],
  midnightblue: [25 / 255, 25 / 255, 112 / 255],
  mintcream: [245 / 255, 255 / 255, 250 / 255],
  mistyrose: [255 / 255, 228 / 255, 225 / 255],
  moccasin: [255 / 255, 228 / 255, 181 / 255],
  navajowhite: [255 / 255, 222 / 255, 173 / 255],
  // 'navy': [ 0 / 255, 0 / 255, 128 / 255 ],
  oldlace: [253 / 255, 245 / 255, 230 / 255],
  // 'olive': [ 128 / 255, 128 / 255, 0 / 255 ],
  olivedrab: [107 / 255, 142 / 255, 35 / 255],
  orange: [255 / 255, 165 / 255, 0 / 255],
  orangered: [255 / 255, 69 / 255, 0 / 255],
  orchid: [218 / 255, 112 / 255, 214 / 255],
  palegoldenrod: [238 / 255, 232 / 255, 170 / 255],
  palegreen: [152 / 255, 251 / 255, 152 / 255],
  paleturquoise: [175 / 255, 238 / 255, 238 / 255],
  palevioletred: [219 / 255, 112 / 255, 147 / 255],
  papayawhip: [255 / 255, 239 / 255, 213 / 255],
  peachpuff: [255 / 255, 218 / 255, 185 / 255],
  peru: [205 / 255, 133 / 255, 63 / 255],
  pink: [255 / 255, 192 / 255, 203 / 255],
  plum: [221 / 255, 160 / 255, 221 / 255],
  powderblue: [176 / 255, 224 / 255, 230 / 255],
  // 'purple': [ 128 / 255, 0 / 255, 128 / 255 ],
  // 'red': [ 255 / 255, 0 / 255, 0 / 255 ],
  rosybrown: [188 / 255, 143 / 255, 143 / 255],
  royalblue: [65 / 255, 105 / 255, 225 / 255],
  saddlebrown: [139 / 255, 69 / 255, 19 / 255],
  salmon: [250 / 255, 128 / 255, 114 / 255],
  sandybrown: [244 / 255, 164 / 255, 96 / 255],
  seagreen: [46 / 255, 139 / 255, 87 / 255],
  seashell: [255 / 255, 245 / 255, 238 / 255],
  sienna: [160 / 255, 82 / 255, 45 / 255],
  // 'silver': [ 192 / 255, 192 / 255, 192 / 255 ],
  skyblue: [135 / 255, 206 / 255, 235 / 255],
  slateblue: [106 / 255, 90 / 255, 205 / 255],
  slategray: [112 / 255, 128 / 255, 144 / 255],
  slategrey: [112 / 255, 128 / 255, 144 / 255],
  snow: [255 / 255, 250 / 255, 250 / 255],
  springgreen: [0 / 255, 255 / 255, 127 / 255],
  steelblue: [70 / 255, 130 / 255, 180 / 255],
  tan: [210 / 255, 180 / 255, 140 / 255],
  // 'teal': [ 0 / 255, 128 / 255, 128 / 255 ],
  thistle: [216 / 255, 191 / 255, 216 / 255],
  tomato: [255 / 255, 99 / 255, 71 / 255],
  turquoise: [64 / 255, 224 / 255, 208 / 255],
  violet: [238 / 255, 130 / 255, 238 / 255],
  wheat: [245 / 255, 222 / 255, 179 / 255],
  // 'white': [ 255 / 255, 255 / 255, 255 / 255 ],
  whitesmoke: [245 / 255, 245 / 255, 245 / 255],
  // 'yellow': [ 255 / 255, 255 / 255, 0 / 255 ],
  yellowgreen: [154 / 255, 205 / 255, 50 / 255]
};

/**
 * Converts a CSS color name to RGB color.
 *
 * @param {String} s - the CSS color name
 * @return {Array} the RGB color, or undefined if not found
 * @alias module:modeling/colors.colorNameToRgb
 * @example
 * let mySphere = colorize(colorNameToRgb('lightblue'), sphere())
 */
const colorNameToRgb = (s) => cssColors[s.toLowerCase()];

/**
 * Flatten the given list of arguments into a single flat array.
 * The arguments can be composed of multiple depths of objects and arrays.
 * @param {Array} arr - list of arguments
 * @returns {Array} a flat list of arguments
 * @alias module:modeling/utils.flatten
 */
const flatten = (arr) => arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);

/**
 * Performs a shallow clone of the given geometry.
 * @param {geom2} geometry - the geometry to clone
 * @returns {geom2} new geometry
 * @alias module:modeling/geometries/geom2.clone
 */
const clone$b = (geometry) => Object.assign({}, geometry);

/**
 * Adds the two matrices (A+B).
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} a - first operand
 * @param {mat4} b - second operand
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.add
 */
const add$2 = (out, a, b) => {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out
};

/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * See fromValues().
 * @typedef {Array} mat4
 */

/**
 * Creates a new identity matrix.
 *
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.create
 */
const create$c = () => [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];

/**
 * Creates a clone of the given matrix.
 *
 * @param {mat4} matrix - matrix to clone
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.clone
 */
const clone$a = (matrix) => {
  const out = create$c();
  out[0] = matrix[0];
  out[1] = matrix[1];
  out[2] = matrix[2];
  out[3] = matrix[3];
  out[4] = matrix[4];
  out[5] = matrix[5];
  out[6] = matrix[6];
  out[7] = matrix[7];
  out[8] = matrix[8];
  out[9] = matrix[9];
  out[10] = matrix[10];
  out[11] = matrix[11];
  out[12] = matrix[12];
  out[13] = matrix[13];
  out[14] = matrix[14];
  out[15] = matrix[15];
  return out
};

/**
 * Creates a copy of the given matrix.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to copy
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.copy
 */
const copy$5 = (out, matrix) => {
  out[0] = matrix[0];
  out[1] = matrix[1];
  out[2] = matrix[2];
  out[3] = matrix[3];
  out[4] = matrix[4];
  out[5] = matrix[5];
  out[6] = matrix[6];
  out[7] = matrix[7];
  out[8] = matrix[8];
  out[9] = matrix[9];
  out[10] = matrix[10];
  out[11] = matrix[11];
  out[12] = matrix[12];
  out[13] = matrix[13];
  out[14] = matrix[14];
  out[15] = matrix[15];
  return out
};

/**
 * Creates an inverted copy of the given matrix.
 * @author Julian Lloyd
 * code from https://github.com/jlmakes/rematrix/blob/master/src/index.js
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to invert
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.invert
 */
const invert$2 = (out, matrix) => {
  const a00 = matrix[0];
  const a01 = matrix[1];
  const a02 = matrix[2];
  const a03 = matrix[3];
  const a10 = matrix[4];
  const a11 = matrix[5];
  const a12 = matrix[6];
  const a13 = matrix[7];
  const a20 = matrix[8];
  const a21 = matrix[9];
  const a22 = matrix[10];
  const a23 = matrix[11];
  const a30 = matrix[12];
  const a31 = matrix[13];
  const a32 = matrix[14];
  const a33 = matrix[15];

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  let det =
    b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return out
};

/**
 * Returns whether the matrices have exactly the same elements in the same position.
 *
 * @param {mat4} a - first matrix
 * @param {mat4} b - second matrix
 * @returns {Boolean} true if the matrices are equal
 * @alias module:modeling/maths/mat4.equals
 */
const equals$8 = (a, b) => (
  a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] &&
  a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] &&
  a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
  a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15]
);

/**
 * Epsilon used during determination of near zero distances.
 * This should be 1 / spacialResolution.
 * @default
 * @alias module:modeling/maths.EPS
 * @example
 * const { EPS } = maths.constants
 */
const EPS = 1e-5;

/**
 * Smaller epsilon used for measuring near zero distances.
 * @default
 * @alias module:modeling/maths.NEPS
 * @example
 * const { NEPS } = maths.constants
 */
const NEPS = 1e-13;
// NEPS is derived from a series of tests to determine the optimal precision
// for comparing coplanar polygons, as provided by the sphere primitive at high
// segmentation. NEPS is for 64-bit Number values.

/**
 * The TAU property represents the ratio of the circumference of a circle to its radius.
 * Approximately 6.28318530717958647692
 * @alias module:modeling/maths.TAU
 * @default
 * @example
 * const { TAU } = maths.constants
 */
const TAU = Math.PI * 2;

var constants = /*#__PURE__*/Object.freeze({
  __proto__: null,
  EPS: EPS,
  NEPS: NEPS,
  TAU: TAU
});

/*
 * Returns zero if n is within epsilon of zero, otherwise return n
 */
const rezero = (n) => Math.abs(n) < NEPS ? 0 : n;

/**
 * Return Math.sin but accurate for TAU / 4 rotations.
 * Fixes rounding errors when sin should be 0.
 *
 * @param {Number} radians - angle in radians
 * @returns {Number} sine of the given angle
 * @alias module:modeling/utils.sin
 * @example
 * sin(TAU / 2) == 0
 * sin(TAU) == 0
 */
const sin = (radians) => rezero(Math.sin(radians));

/**
 * Return Math.cos but accurate for TAU / 4 rotations.
 * Fixes rounding errors when cos should be 0.
 *
 * @param {Number} radians - angle in radians
 * @returns {Number} cosine of the given angle
 * @alias module:modeling/utils.cos
 * @example
 * cos(TAU * 0.25) == 0
 * cos(TAU * 0.75) == 0
 */
const cos = (radians) => rezero(Math.cos(radians));

/**
 * Set a matrix to the identity transform.
 *
 * @param {mat4} out - receiving matrix
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.identity
 */
const identity = (out) => {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
};

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotate(dest, dest, rad, axis)
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} rad - angle to rotate the matrix by
 * @param {vec3} axis - axis of which to rotate around
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromRotation
 * @example
 * let matrix = fromRotation(create(), TAU / 4, [0, 0, 3])
 */
const fromRotation = (out, rad, axis) => {
  let [x, y, z] = axis;
  const lengthSquared = x * x + y * y + z * z;

  if (Math.abs(lengthSquared) < EPS) {
    // axis is 0,0,0 or almost
    return identity(out)
  }

  const len = 1 / Math.sqrt(lengthSquared);
  x *= len;
  y *= len;
  z *= len;

  const s = sin(rad);
  const c = cos(rad);
  const t = 1 - c;

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
};

/**
 * Creates a matrix from a vector scaling.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.scale(dest, dest, vec)
 *
 * @param {mat4} out - receiving matrix
 * @param {vec3} vector - X, Y, Z factors by which to scale
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromScaling
 * @example
 * let matrix = fromScaling([1, 2, 0.5])
 */
const fromScaling = (out, vector) => {
  out[0] = vector[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = vector[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = vector[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
};

/**
 * Creates a matrix from the given Tait–Bryan angles.
 *
 * Tait-Bryan Euler angle convention using active, intrinsic rotations around the axes in the order z-y-x.
 * @see https://en.wikipedia.org/wiki/Euler_angles
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} yaw - Z rotation in radians
 * @param {Number} pitch - Y rotation in radians
 * @param {Number} roll - X rotation in radians
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromTaitBryanRotation
 * @example
 * let matrix = fromTaitBryanRotation(create(), TAU / 4, 0, TAU / 2)
 */
const fromTaitBryanRotation = (out, yaw, pitch, roll) => {
  // precompute sines and cosines of Euler angles
  const sy = sin(yaw);
  const cy = cos(yaw);
  const sp = sin(pitch);
  const cp = cos(pitch);
  const sr = sin(roll);
  const cr = cos(roll);

  // create and populate rotation matrix
  // left-hand-rule rotation
  // const els = [
  //  cp*cy, sr*sp*cy - cr*sy, sr*sy + cr*sp*cy, 0,
  //  cp*sy, cr*cy + sr*sp*sy, cr*sp*sy - sr*cy, 0,
  //  -sp, sr*cp, cr*cp, 0,
  //  0, 0, 0, 1
  // ]
  // right-hand-rule rotation
  out[0] = cp * cy;
  out[1] = cp * sy;
  out[2] = -sp;
  out[3] = 0;
  out[4] = sr * sp * cy - cr * sy;
  out[5] = cr * cy + sr * sp * sy;
  out[6] = sr * cp;
  out[7] = 0;
  out[8] = sr * sy + cr * sp * cy;
  out[9] = cr * sp * sy - sr * cy;
  out[10] = cr * cp;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
};

/**
 * Creates a matrix from a vector translation.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.translate(dest, dest, vec)
 *
 * @param {mat4} out - receiving matrix
 * @param {vec3} vector - offset (vector) of translation
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromTranslation
 * @example
 * let matrix = fromTranslation(create(), [1, 2, 3])
 */
const fromTranslation = (out, vector) => {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = vector[0];
  out[13] = vector[1];
  out[14] = vector[2];
  out[15] = 1;
  return out
};

/**
 * Create a matrix with the given values.
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromValues
 * @example
 * let matrix = fromValues(
 *   1, 0, 0, 1,
 *   0, 1, 0, 0,
 *   0, 0, 1, 0,
 *   0, 0, 0, 1
 * )
 */
const fromValues$4 = (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) => {
  const out = create$c();
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out
};

/**
 * Calculates the absolute coordinates of the give vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector of reference
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.abs
 */
const abs$1 = (out, vector) => {
  out[0] = Math.abs(vector[0]);
  out[1] = Math.abs(vector[1]);
  out[2] = Math.abs(vector[2]);
  return out
};

/**
 * Adds the coordinates of two vectors (A+B).
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.add
 */
const add$1 = (out, a, b) => {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out
};

/**
 * Calculates the dot product of two vectors.
 *
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {Number} dot product
 * @alias module:modeling/maths/vec3.dot
 */
const dot$2 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/**
 * Calculate the angle between two vectors.
 *
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {Number} angle (radians)
 * @alias module:modeling/maths/vec3.angle
 */
const angle = (a, b) => {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const bx = b[0];
  const by = b[1];
  const bz = b[2];
  const mag1 = Math.sqrt(ax * ax + ay * ay + az * az);
  const mag2 = Math.sqrt(bx * bx + by * by + bz * bz);
  const mag = mag1 * mag2;
  const cosine = mag && dot$2(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1))
};

/**
 * Represents a three dimensional vector.
 * See fromValues().
 * @typedef {Array} vec3
 */

/**
 * Creates a new vector initialized to [0,0,0].
 *
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.create
 */
const create$b = () => [0, 0, 0];

/**
 * Create a clone of the given vector.
 *
 * @param {vec3} vector - vector to clone
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.clone
 */
const clone$9 = (vector) => {
  const out = create$b();
  out[0] = vector[0];
  out[1] = vector[1];
  out[2] = vector[2];
  return out
};

/**
 * Create a copy of the given vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to copy
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.copy
 */
const copy$4 = (out, vector) => {
  out[0] = vector[0];
  out[1] = vector[1];
  out[2] = vector[2];
  return out
};

/**
 * Computes the cross product of the given vectors (AxB).
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.cross
 */
const cross$1 = (out, a, b) => {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const bx = b[0];
  const by = b[1];
  const bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out
};

/**
 * Calculates the Euclidian distance between the given vectors.
 *
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {Number} distance
 * @alias module:modeling/maths/vec3.distance
 */
const distance$1 = (a, b) => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  const z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z)
};

/**
 * Divides the coordinates of two vectors (A/B).
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - dividend vector
 * @param {vec3} b - divisor vector
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.divide
 */
const divide$1 = (out, a, b) => {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out
};

/**
 * Compare the given vectors for equality.
 *
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {Boolean} true if a and b are equal
 * @alias module:modeling/maths/vec3.equals
 */
const equals$7 = (a, b) => (a[0] === b[0]) && (a[1] === b[1]) && (a[2] === b[2]);

/**
 * Creates a vector from a single scalar value.
 * All components of the resulting vector have the given value.
 *
 * @param {vec3} out - receiving vector
 * @param {Number} scalar
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.fromScalar
 */
const fromScalar$2 = (out, scalar) => {
  out[0] = scalar;
  out[1] = scalar;
  out[2] = scalar;
  return out
};

/**
 * Creates a new vector initialized with the given values.
 *
 * @param {Number} x - X component
 * @param {Number} y - Y component
 * @param {Number} z - Z component
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.fromValues
 */
const fromValues$3 = (x, y, z) => {
  const out = create$b();
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out
};

/**
 * Create a new vector by extending a 2D vector with a Z value.
 *
 * @param {vec3} out - receiving vector
 * @param {Array} vector - 2D vector of values
 * @param {Number} [z=0] - Z value
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.fromVec2
 */
const fromVec2 = (out, vector, z = 0) => {
  out[0] = vector[0];
  out[1] = vector[1];
  out[2] = z;
  return out
};

/**
 * Calculates the length of a vector.
 *
 * @param {vec3} vector - vector to calculate length of
 * @returns {Number} length
 * @alias module:modeling/maths/vec3.length
 */
const length$1 = (vector) => {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  return Math.sqrt(x * x + y * y + z * z)
};

/**
 * Performs a linear interpolation between two vectors.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @param {Number} t - interpolant (0.0 to 1.0) applied between the two inputs
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.lerp
 */
const lerp$1 = (out, a, b, t) => {
  out[0] = a[0] + t * (b[0] - a[0]);
  out[1] = a[1] + t * (b[1] - a[1]);
  out[2] = a[2] + t * (b[2] - a[2]);
  return out
};

/**
 * Returns the maximum coordinates of the given vectors.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.max
 */
const max$2 = (out, a, b) => {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out
};

/**
 * Returns the minimum coordinates of the given vectors.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.min
 */
const min$2 = (out, a, b) => {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out
};

/**
 * Multiply the coordinates of the given vectors (A*B).
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.multiply
 */
const multiply$2 = (out, a, b) => {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out
};

/**
 * Negates the coordinates of the given vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to negate
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.negate
 */
const negate$1 = (out, vector) => {
  out[0] = -vector[0];
  out[1] = -vector[1];
  out[2] = -vector[2];
  return out
};

/**
 * Normalize the given vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to normalize
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.normalize
 */
const normalize$1 = (out, vector) => {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  let len = x * x + y * y + z * z;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  return out
};

/**
 * Create a new vector that is orthogonal to the given vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector of reference
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.orthogonal
 */
const orthogonal = (out, vector) => {
  const bV = abs$1(create$b(), vector);
  const b0 = 0 + ((bV[0] < bV[1]) && (bV[0] < bV[2]));
  const b1 = 0 + ((bV[1] <= bV[0]) && (bV[1] < bV[2]));
  const b2 = 0 + ((bV[2] <= bV[0]) && (bV[2] <= bV[1]));

  return cross$1(out, vector, [b0, b1, b2])
};

/**
 * Rotate the given vector around the given origin, X axis only.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to rotate
 * @param {vec3} origin - origin of the rotation
 * @param {Number} radians - angle of rotation
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.rotateX
 */
const rotateX$2 = (out, vector, origin, radians) => {
  const p = [];
  const r = [];

  // translate point to the origin
  p[0] = vector[0] - origin[0];
  p[1] = vector[1] - origin[1];
  p[2] = vector[2] - origin[2];

  // perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(radians) - p[2] * Math.sin(radians);
  r[2] = p[1] * Math.sin(radians) + p[2] * Math.cos(radians);

  // translate to correct position
  out[0] = r[0] + origin[0];
  out[1] = r[1] + origin[1];
  out[2] = r[2] + origin[2];

  return out
};

/**
 * Rotate the given vector around the given origin, Y axis only.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to rotate
 * @param {vec3} origin - origin of the rotation
 * @param {Number} radians - angle of rotation
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.rotateY
 */
const rotateY$2 = (out, vector, origin, radians) => {
  const p = [];
  const r = [];

  // translate point to the origin
  p[0] = vector[0] - origin[0];
  p[1] = vector[1] - origin[1];
  p[2] = vector[2] - origin[2];

  // perform rotation
  r[0] = p[2] * Math.sin(radians) + p[0] * Math.cos(radians);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(radians) - p[0] * Math.sin(radians);

  // translate to correct position
  out[0] = r[0] + origin[0];
  out[1] = r[1] + origin[1];
  out[2] = r[2] + origin[2];

  return out
};

/**
 * Rotate the given vector around the given origin, Z axis only.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to rotate
 * @param {vec3} origin - origin of the rotation
 * @param {Number} radians - angle of rotation in radians
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.rotateZ
 */
const rotateZ$2 = (out, vector, origin, radians) => {
  const p = [];
  const r = [];
  // Translate point to the origin
  p[0] = vector[0] - origin[0];
  p[1] = vector[1] - origin[1];

  // perform rotation
  r[0] = (p[0] * Math.cos(radians)) - (p[1] * Math.sin(radians));
  r[1] = (p[0] * Math.sin(radians)) + (p[1] * Math.cos(radians));

  // translate to correct position
  out[0] = r[0] + origin[0];
  out[1] = r[1] + origin[1];
  out[2] = vector[2];

  return out
};

/**
 * Scales the coordinates of the given vector by a scalar number.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to scale
 * @param {Number} amount - amount to scale the vector by
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.scale
 */
const scale$3 = (out, vector, amount) => {
  out[0] = vector[0] * amount;
  out[1] = vector[1] * amount;
  out[2] = vector[2] * amount;
  return out
};

/**
 * Snaps the coordinates of the given vector to the given epsilon.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to snap
 * @param {Number} epsilon - epsilon of precision, less than 0
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.snap
 */
const snap$2 = (out, vector, epsilon) => {
  out[0] = Math.round(vector[0] / epsilon) * epsilon + 0;
  out[1] = Math.round(vector[1] / epsilon) * epsilon + 0;
  out[2] = Math.round(vector[2] / epsilon) * epsilon + 0;
  return out
};

/**
 * Calculates the squared distance between two vectors.
 *
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {Number} squared distance
 * @alias module:modeling/maths/vec3.squaredDistance
 */
const squaredDistance$1 = (a, b) => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  const z = b[2] - a[2];
  return x * x + y * y + z * z
};

/**
 * Calculates the squared length of the given vector.
 *
 * @param {vec3} vector - vector to calculate squared length of
 * @returns {Number} squared length
 * @alias module:modeling/maths/vec3.squaredLength
 */
const squaredLength$1 = (vector) => {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  return x * x + y * y + z * z
};

/**
 * Subtracts the coordinates of two vectors (A-B).
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} a - minuend vector
 * @param {vec3} b - subtrahend vector
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.subtract
 */
const subtract$3 = (out, a, b) => {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out
};

/**
 * Convert the given vector to a representative string.
 * @param {vec3} vec - vector of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/vec3.toString
 */
const toString$b = (vec) => `[${vec[0].toFixed(7)}, ${vec[1].toFixed(7)}, ${vec[2].toFixed(7)}]`;

/**
 * Transforms the given vector using the given matrix.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to transform
 * @param {mat4} matrix - transform matrix
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.transform
 */
const transform$c = (out, vector, matrix) => {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  let w = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
  w = w || 1.0;
  out[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w;
  out[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w;
  out[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w;
  return out
};

/**
 * Represents a three dimensional vector.
 * @see {@link vec3} for data structure information.
 * @module modeling/maths/vec3
 */

var index$s = /*#__PURE__*/Object.freeze({
  __proto__: null,
  abs: abs$1,
  add: add$1,
  angle: angle,
  clone: clone$9,
  copy: copy$4,
  create: create$b,
  cross: cross$1,
  distance: distance$1,
  divide: divide$1,
  dot: dot$2,
  equals: equals$7,
  fromScalar: fromScalar$2,
  fromValues: fromValues$3,
  fromVec2: fromVec2,
  length: length$1,
  lerp: lerp$1,
  max: max$2,
  min: min$2,
  multiply: multiply$2,
  negate: negate$1,
  normalize: normalize$1,
  orthogonal: orthogonal,
  rotateX: rotateX$2,
  rotateY: rotateY$2,
  rotateZ: rotateZ$2,
  scale: scale$3,
  snap: snap$2,
  squaredDistance: squaredDistance$1,
  squaredLength: squaredLength$1,
  subtract: subtract$3,
  toString: toString$b,
  transform: transform$c
});

/**
 * Create a matrix that rotates the given source to the given target vector.
 *
 * Each vector must be a directional vector with a length greater than zero.
 * @see https://gist.github.com/kevinmoran/b45980723e53edeb8a5a43c49f134724
 * @param {mat4} out - receiving matrix
 * @param {vec3} source - source vector
 * @param {vec3} target - target vector
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromVectorRotation
 * @example
 * let matrix = fromVectorRotation(create(), [1, 2, 2], [-3, 3, 12])
 */
const fromVectorRotation = (out, source, target) => {
  const sourceNormal = normalize$1(create$b(), source);
  const targetNormal = normalize$1(create$b(), target);

  const axis = cross$1(create$b(), targetNormal, sourceNormal);
  const cosA = dot$2(targetNormal, sourceNormal);
  if (cosA === -1.0) return fromRotation(out, Math.PI, orthogonal(axis, sourceNormal))

  const k = 1 / (1 + cosA);
  out[0] = (axis[0] * axis[0] * k) + cosA;
  out[1] = (axis[1] * axis[0] * k) - axis[2];
  out[2] = (axis[2] * axis[0] * k) + axis[1];
  out[3] = 0;

  out[4] = (axis[0] * axis[1] * k) + axis[2];
  out[5] = (axis[1] * axis[1] * k) + cosA;
  out[6] = (axis[2] * axis[1] * k) - axis[0];
  out[7] = 0;

  out[8] = (axis[0] * axis[2] * k) - axis[1];
  out[9] = (axis[1] * axis[2] * k) + axis[0];
  out[10] = (axis[2] * axis[2] * k) + cosA;
  out[11] = 0;

  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
};

/**
 * Creates a matrix from the given angle around the X axis.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateX(dest, dest, radians)
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromXRotation
 * @example
 * let matrix = fromXRotation(create(), TAU / 4)
 */
const fromXRotation = (out, radians) => {
  const s = sin(radians);
  const c = cos(radians);

  // Perform axis-specific matrix multiplication
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
};

/**
 * Creates a matrix from the given angle around the Y axis.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateY(dest, dest, radians)
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromYRotation
 * @example
 * let matrix = fromYRotation(create(), TAU / 4)
 */
const fromYRotation = (out, radians) => {
  const s = sin(radians);
  const c = cos(radians);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
};

/**
 * Creates a matrix from the given angle around the Z axis.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateZ(dest, dest, radians)
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromZRotation
 * @example
 * let matrix = fromZRotation(create(), TAU / 4)
 */
const fromZRotation = (out, radians) => {
  const s = sin(radians);
  const c = cos(radians);

  // Perform axis-specific matrix multiplication
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
};

/**
 * Determine whether the given matrix is the identity transform.
 * This is equivalent to (but much faster than):
 *
 *     mat4.equals(mat4.create(), matrix)
 *
 * @param {mat4} matrix - the matrix
 * @returns {Boolean} true if matrix is the identity transform
 * @alias module:modeling/maths/mat4.isIdentity
 * @example
 * if (mat4.isIdentity(myMatrix)) ...
 */
const isIdentity = (matrix) => (
  matrix[0] === 1 && matrix[1] === 0 && matrix[2] === 0 && matrix[3] === 0 &&
  matrix[4] === 0 && matrix[5] === 1 && matrix[6] === 0 && matrix[7] === 0 &&
  matrix[8] === 0 && matrix[9] === 0 && matrix[10] === 1 && matrix[11] === 0 &&
  matrix[12] === 0 && matrix[13] === 0 && matrix[14] === 0 && matrix[15] === 1
);

/**
 * Determine whether the given matrix is only translate and/or scale.
 * This code returns true for TAU / 2 rotation as it can be interpreted as scale.
 *
 * @param {mat4} matrix - the matrix
 * @returns {Boolean} true if matrix is for translate and/or scale
 * @alias module:modeling/maths/mat4.isOnlyTransformScale
 */
const isOnlyTransformScale = (matrix) => (

  // TODO check if it is worth the effort to add recognition of 90 deg rotations

  isZero(matrix[1]) && isZero(matrix[2]) && isZero(matrix[3]) &&
  isZero(matrix[4]) && isZero(matrix[6]) && isZero(matrix[7]) &&
  isZero(matrix[8]) && isZero(matrix[9]) && isZero(matrix[11]) &&
  matrix[15] === 1
);

const isZero = (num) => Math.abs(num) < Number.EPSILON;

/**
 * Determine whether the given matrix is a mirroring transformation.
 *
 * @param {mat4} matrix - matrix of reference
 * @returns {Boolean} true if matrix is a mirroring transformation
 * @alias module:modeling/maths/mat4.isMirroring
 */
const isMirroring = (matrix) => {
  // const xVector = [matrix[0], matrix[4], matrix[8]]
  // const yVector = [matrix[1], matrix[5], matrix[9]]
  // const zVector = [matrix[2], matrix[6], matrix[10]]

  // for a true orthogonal, non-mirrored base, xVector.cross(yVector) == zVector
  // If they have an opposite direction then we are mirroring
  // calculate xVector.cross(yVector)
  const x = matrix[4] * matrix[9] - matrix[8] * matrix[5];
  const y = matrix[8] * matrix[1] - matrix[0] * matrix[9];
  const z = matrix[0] * matrix[5] - matrix[4] * matrix[1];
  // calculate dot(cross, zVector)
  const d = x * matrix[2] + y * matrix[6] + z * matrix[10];
  return (d < 0)
};

/**
 * Create a matrix for mirroring about the given plane.
 *
 * @param {mat4} out - receiving matrix
 * @param {vec4} plane - plane of which to mirror the matrix
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.mirrorByPlane
 */
const mirrorByPlane = (out, plane) => {
  const [nx, ny, nz, w] = plane;

  out[0] = (1.0 - 2.0 * nx * nx);
  out[1] = (-2.0 * ny * nx);
  out[2] = (-2.0 * nz * nx);
  out[3] = 0;
  out[4] = (-2.0 * nx * ny);
  out[5] = (1.0 - 2.0 * ny * ny);
  out[6] = (-2.0 * nz * ny);
  out[7] = 0;
  out[8] = (-2.0 * nx * nz);
  out[9] = (-2.0 * ny * nz);
  out[10] = (1.0 - 2.0 * nz * nz);
  out[11] = 0;
  out[12] = (2.0 * nx * w);
  out[13] = (2.0 * ny * w);
  out[14] = (2.0 * nz * w);
  out[15] = 1;

  return out
};

/**
 * Multiplies the two matrices.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} a - first operand
 * @param {mat4} b - second operand
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.multiply
 */
const multiply$1 = (out, a, b) => {
  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[4];
  const a11 = a[5];
  const a12 = a[6];
  const a13 = a[7];
  const a20 = a[8];
  const a21 = a[9];
  const a22 = a[10];
  const a23 = a[11];
  const a30 = a[12];
  const a31 = a[13];
  const a32 = a[14];
  const a33 = a[15];

  // Cache only the current line of the second matrix
  let b0 = b[0];
  let b1 = b[1];
  let b2 = b[2];
  let b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out
};

/**
 * Rotates a matrix by the given angle about the given axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @param {vec3} axis - axis to rotate around
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotate
 */
const rotate$2 = (out, matrix, radians, axis) => {
  let [x, y, z] = axis;
  const lengthSquared = x * x + y * y + z * z;

  if (Math.abs(lengthSquared) < EPS) {
    // axis is 0,0,0 or almost
    return copy$5(out, matrix)
  }

  const len = 1 / Math.sqrt(lengthSquared);
  x *= len;
  y *= len;
  z *= len;

  const s = sin(radians);
  const c = cos(radians);
  const t = 1 - c;

  const a00 = matrix[0];
  const a01 = matrix[1];
  const a02 = matrix[2];
  const a03 = matrix[3];
  const a10 = matrix[4];
  const a11 = matrix[5];
  const a12 = matrix[6];
  const a13 = matrix[7];
  const a20 = matrix[8];
  const a21 = matrix[9];
  const a22 = matrix[10];
  const a23 = matrix[11];

  // Construct the elements of the rotation matrix
  const b00 = x * x * t + c;
  const b01 = y * x * t + z * s;
  const b02 = z * x * t - y * s;
  const b10 = x * y * t - z * s;
  const b11 = y * y * t + c;
  const b12 = z * y * t + x * s;
  const b20 = x * z * t + y * s;
  const b21 = y * z * t - x * s;
  const b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (matrix !== out) { // If the source and destination differ, copy the unchanged last row
    out[12] = matrix[12];
    out[13] = matrix[13];
    out[14] = matrix[14];
    out[15] = matrix[15];
  }
  return out
};

/**
 * Rotates a matrix by the given angle around the X axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotateX
 */
const rotateX$1 = (out, matrix, radians) => {
  const s = sin(radians);
  const c = cos(radians);
  const a10 = matrix[4];
  const a11 = matrix[5];
  const a12 = matrix[6];
  const a13 = matrix[7];
  const a20 = matrix[8];
  const a21 = matrix[9];
  const a22 = matrix[10];
  const a23 = matrix[11];

  if (matrix !== out) { // If the source and destination differ, copy the unchanged rows
    out[0] = matrix[0];
    out[1] = matrix[1];
    out[2] = matrix[2];
    out[3] = matrix[3];
    out[12] = matrix[12];
    out[13] = matrix[13];
    out[14] = matrix[14];
    out[15] = matrix[15];
  }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out
};

/**
 * Rotates a matrix by the given angle around the Y axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotateY
 */
const rotateY$1 = (out, matrix, radians) => {
  const s = sin(radians);
  const c = cos(radians);
  const a00 = matrix[0];
  const a01 = matrix[1];
  const a02 = matrix[2];
  const a03 = matrix[3];
  const a20 = matrix[8];
  const a21 = matrix[9];
  const a22 = matrix[10];
  const a23 = matrix[11];

  if (matrix !== out) { // If the source and destination differ, copy the unchanged rows
    out[4] = matrix[4];
    out[5] = matrix[5];
    out[6] = matrix[6];
    out[7] = matrix[7];
    out[12] = matrix[12];
    out[13] = matrix[13];
    out[14] = matrix[14];
    out[15] = matrix[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out
};

/**
 * Rotates a matrix by the given angle around the Z axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotateZ
 */
const rotateZ$1 = (out, matrix, radians) => {
  const s = sin(radians);
  const c = cos(radians);
  const a00 = matrix[0];
  const a01 = matrix[1];
  const a02 = matrix[2];
  const a03 = matrix[3];
  const a10 = matrix[4];
  const a11 = matrix[5];
  const a12 = matrix[6];
  const a13 = matrix[7];

  if (matrix !== out) { // If the source and destination differ, copy the unchanged last row
    out[8] = matrix[8];
    out[9] = matrix[9];
    out[10] = matrix[10];
    out[11] = matrix[11];
    out[12] = matrix[12];
    out[13] = matrix[13];
    out[14] = matrix[14];
    out[15] = matrix[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out
};

/**
 * Scales the matrix by the given dimensions.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to scale
 * @param {vec3} dimensions - dimensions to scale the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.scale
 */
const scale$2 = (out, matrix, dimensions) => {
  const x = dimensions[0];
  const y = dimensions[1];
  const z = dimensions[2];

  out[0] = matrix[0] * x;
  out[1] = matrix[1] * x;
  out[2] = matrix[2] * x;
  out[3] = matrix[3] * x;
  out[4] = matrix[4] * y;
  out[5] = matrix[5] * y;
  out[6] = matrix[6] * y;
  out[7] = matrix[7] * y;
  out[8] = matrix[8] * z;
  out[9] = matrix[9] * z;
  out[10] = matrix[10] * z;
  out[11] = matrix[11] * z;
  out[12] = matrix[12];
  out[13] = matrix[13];
  out[14] = matrix[14];
  out[15] = matrix[15];
  return out
};

/**
 * Subtracts matrix b from matrix a. (A-B)
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} a - first operand
 * @param {mat4} b - second operand
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.subtract
 */
const subtract$2 = (out, a, b) => {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out
};

/**
 * Return a string representing the given matrix.
 *
 * @param {mat4} mat - matrix of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/mat4.toString
 */
const toString$a = (mat) => mat.map((n) => n.toFixed(7)).toString();

/**
 * Translate the matrix by the given offset vector.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to translate
 * @param {vec3} offsets - offset vector to translate by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.translate
 */
const translate$1 = (out, matrix, offsets) => {
  const x = offsets[0];
  const y = offsets[1];
  const z = offsets[2];
  let a00;
  let a01;
  let a02;
  let a03;
  let a10;
  let a11;
  let a12;
  let a13;
  let a20;
  let a21;
  let a22;
  let a23;

  if (matrix === out) {
  // 0-11 assignments are unnecessary
    out[12] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12];
    out[13] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13];
    out[14] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14];
    out[15] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
  } else {
    a00 = matrix[0]; a01 = matrix[1]; a02 = matrix[2]; a03 = matrix[3];
    a10 = matrix[4]; a11 = matrix[5]; a12 = matrix[6]; a13 = matrix[7];
    a20 = matrix[8]; a21 = matrix[9]; a22 = matrix[10]; a23 = matrix[11];

    out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
    out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
    out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + matrix[12];
    out[13] = a01 * x + a11 * y + a21 * z + matrix[13];
    out[14] = a02 * x + a12 * y + a22 * z + matrix[14];
    out[15] = a03 * x + a13 * y + a23 * z + matrix[15];
  }

  return out
};

/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * @see {@link mat4} for data structure information.
 * @module modeling/maths/mat4
 */

var index$r = /*#__PURE__*/Object.freeze({
  __proto__: null,
  add: add$2,
  clone: clone$a,
  copy: copy$5,
  create: create$c,
  invert: invert$2,
  equals: equals$8,
  fromRotation: fromRotation,
  fromScaling: fromScaling,
  fromTaitBryanRotation: fromTaitBryanRotation,
  fromTranslation: fromTranslation,
  fromValues: fromValues$4,
  fromVectorRotation: fromVectorRotation,
  fromXRotation: fromXRotation,
  fromYRotation: fromYRotation,
  fromZRotation: fromZRotation,
  identity: identity,
  isIdentity: isIdentity,
  isOnlyTransformScale: isOnlyTransformScale,
  isMirroring: isMirroring,
  mirrorByPlane: mirrorByPlane,
  multiply: multiply$1,
  rotate: rotate$2,
  rotateX: rotateX$1,
  rotateY: rotateY$1,
  rotateZ: rotateZ$1,
  scale: scale$2,
  subtract: subtract$2,
  toString: toString$a,
  translate: translate$1
});

/**
 * Represents a 2D geometry consisting of outlines, where each outline is an ordered list of points.
 * @typedef {Object} geom2
 * @property {Array} outlines - list of polygon outlines
 * @property {mat4} transforms - transforms to apply to the geometry, see transform()
 * @example
 * // data structure
 * {
 *   "outlines": [[[-1,-1],[1,-1],[1,1],[-1,1]]],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
 * }
 */

/**
 * Create a new 2D geometry composed of polygon outlines.
 * @param {Array} [outlines] - list of outlines where each outline is an array of points
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.create
 * @example
 * let myShape = create([ [[-1,-1], [1,-1], [1,1], [-1,1]] ])
 */
const create$a = (outlines = []) => ({
  outlines,
  transforms: create$c()
});

/**
 * Calculates the absolute coordinates of the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector of reference
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.abs
 */
const abs = (out, vector) => {
  out[0] = Math.abs(vector[0]);
  out[1] = Math.abs(vector[1]);
  return out
};

/**
 * Adds the coordinates of two vectors (A+B).
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.add
 */
const add = (out, a, b) => {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out
};

/**
 * Calculate the angle of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} angle in radians
 * @alias module:modeling/maths/vec2.angleRadians
 */
const angleRadians = (vector) => Math.atan2(vector[1], vector[0]); // y=sin, x=cos

/**
 * Calculate the angle of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} angle in degrees
 * @alias module:modeling/maths/vec2.angleDegrees
 */
const angleDegrees = (vector) => angleRadians(vector) * 57.29577951308232;

/**
 * Represents a two dimensional vector.
 * See fromValues().
 * @typedef {Array} vec2
 */

/**
 * Creates a new vector, initialized to [0,0].
 *
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.create
 */
const create$9 = () => [0, 0];

/**
 * Create a clone of the given vector.
 *
 * @param {vec2} vector - vector to clone
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.clone
 */
const clone$8 = (vector) => {
  const out = create$9();
  out[0] = vector[0];
  out[1] = vector[1];
  return out
};

/**
 * Create a copy of the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - source vector
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.copy
 */
const copy$3 = (out, vector) => {
  out[0] = vector[0];
  out[1] = vector[1];
  return out
};

/**
 * Computes the cross product (3D) of two vectors.
 *
 * @param {vec3} out - receiving vector (3D)
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec3} out
 * @alias module:modeling/maths/vec2.cross
 */
const cross = (out, a, b) => {
  out[0] = 0;
  out[1] = 0;
  out[2] = a[0] * b[1] - a[1] * b[0];
  return out
};

/**
 * Calculates the distance between two vectors.
 *
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {Number} distance
 * @alias module:modeling/maths/vec2.distance
 */
const distance = (a, b) => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  return Math.sqrt(x * x + y * y)
};

/**
 * Divides the coordinates of two vectors (A/B).
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.divide
 */
const divide = (out, a, b) => {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out
};

/**
 * Calculates the dot product of two vectors.
 *
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {Number} dot product
 * @alias module:modeling/maths/vec2.dot
 */
const dot$1 = (a, b) => a[0] * b[0] + a[1] * b[1];

/**
 * Compare the given vectors for equality.
 *
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {Boolean} true if a and b are equal
 * @alias module:modeling/maths/vec2.equals
 */
const equals$6 = (a, b) => (a[0] === b[0]) && (a[1] === b[1]);

/**
 * Create a new vector in the direction of the given angle.
 *
 * @param {vec2} out - receiving vector
 * @param {Number} radians - angle in radians
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.fromAngleRadians
 */
const fromAngleRadians = (out, radians) => {
  out[0] = cos(radians);
  out[1] = sin(radians);
  return out
};

/**
 * Create a new vector in the direction of the given angle.
 *
 * @param {vec2} out - receiving vector
 * @param {Number} degrees - angle in degrees
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.fromAngleDegrees
 */
const fromAngleDegrees = (out, degrees) => fromAngleRadians(out, degrees * 0.017453292519943295);

/**
 * Create a vector from a single scalar value.
 *
 * @param {vec2} out - receiving vector
 * @param {Number} scalar - the scalar value
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.fromScalar
 */
const fromScalar$1 = (out, scalar) => {
  out[0] = scalar;
  out[1] = scalar;
  return out
};

/**
 * Creates a new vector initialized with the given values.
 *
 * @param {Number} x - X coordinate
 * @param {Number} y - Y coordinate
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.fromValues
 */
const fromValues$2 = (x, y) => {
  const out = create$9();
  out[0] = x;
  out[1] = y;
  return out
};

/**
 * Calculates the length of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} length
 * @alias module:modeling/maths/vec2.length
 */
const length = (vector) => Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);

/**
 * Performs a linear interpolation between two vectors.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @param {Number} t - interpolation amount between the two vectors
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.lerp
 */
const lerp = (out, a, b, t) => {
  const ax = a[0];
  const ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out
};

/**
 * Returns the maximum coordinates of two vectors.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.max
 */
const max$1 = (out, a, b) => {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out
};

/**
 * Returns the minimum coordinates of two vectors.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.min
 */
const min$1 = (out, a, b) => {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out
};

/**
 * Multiplies the coordinates of two vectors (A*B).
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.multiply
 */
const multiply = (out, a, b) => {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out
};

/**
 * Negates the coordinates of the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to negate
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.negate
 */
const negate = (out, vector) => {
  out[0] = -vector[0];
  out[1] = -vector[1];
  return out
};

/**
 * Rotates the given vector by the given angle.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to rotate
 * @param {vec2} origin - origin of the rotation
 * @param {Number} radians - angle of rotation (radians)
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.rotate
 */
const rotate$1 = (out, vector, origin, radians) => {
  const x = vector[0] - origin[0];
  const y = vector[1] - origin[1];
  const c = Math.cos(radians);
  const s = Math.sin(radians);

  out[0] = x * c - y * s + origin[0];
  out[1] = x * s + y * c + origin[1];

  return out
};

/**
 * Calculates the normal of the given vector.
 * The normal value is the given vector rotated 90 degrees.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - given value
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.normal
 */
const normal = (out, vector) => rotate$1(out, vector, create$9(), (TAU / 4));

/**
 * Normalize the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to normalize
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.normalize
 */
const normalize = (out, vector) => {
  const x = vector[0];
  const y = vector[1];
  let len = x * x + y * y;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }
  out[0] = x * len;
  out[1] = y * len;
  return out
};

/**
 * Scales the coordinates of the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to scale
 * @param {Number} amount - amount to scale
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.scale
 */
const scale$1 = (out, vector, amount) => {
  out[0] = vector[0] * amount;
  out[1] = vector[1] * amount;
  return out
};

/**
 * Snaps the coordinates of the given vector to the given epsilon.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to snap
 * @param {Number} epsilon - epsilon of precision, less than 0
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.snap
 */
const snap$1 = (out, vector, epsilon) => {
  out[0] = Math.round(vector[0] / epsilon) * epsilon + 0;
  out[1] = Math.round(vector[1] / epsilon) * epsilon + 0;
  return out
};

/**
 * Calculates the squared distance between the given vectors.
 *
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {Number} squared distance
 * @alias module:modeling/maths/vec2.squaredDistance
 */
const squaredDistance = (a, b) => {
  const x = b[0] - a[0];
  const y = b[1] - a[1];
  return x * x + y * y
};

/**
 * Calculates the squared length of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} squared length
 * @alias module:modeling/maths/vec2.squaredLength
 */
const squaredLength = (vector) => {
  const x = vector[0];
  const y = vector[1];
  return x * x + y * y
};

/**
 * Subtracts the coordinates of two vectors (A-B).
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.subtract
 */
const subtract$1 = (out, a, b) => {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out
};

/**
 * Convert the given vector to a representative string.
 *
 * @param {vec2} vector - vector of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/vec2.toString
 */
const toString$9 = (vector) => `[${vector[0].toFixed(7)}, ${vector[1].toFixed(7)}]`;

/**
 * Transforms the given vector using the given matrix.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.transform
 */
const transform$b = (out, vector, matrix) => {
  const x = vector[0];
  const y = vector[1];
  out[0] = matrix[0] * x + matrix[4] * y + matrix[12];
  out[1] = matrix[1] * x + matrix[5] * y + matrix[13];
  return out
};

/**
 * Represents a two dimensional vector.
 * @module modeling/maths/vec2
 */

var index$q = /*#__PURE__*/Object.freeze({
  __proto__: null,
  abs: abs,
  add: add,
  angle: angleRadians,
  angleDegrees: angleDegrees,
  angleRadians: angleRadians,
  clone: clone$8,
  copy: copy$3,
  create: create$9,
  cross: cross,
  distance: distance,
  divide: divide,
  dot: dot$1,
  equals: equals$6,
  fromAngleDegrees: fromAngleDegrees,
  fromAngleRadians: fromAngleRadians,
  fromScalar: fromScalar$1,
  fromValues: fromValues$2,
  length: length,
  lerp: lerp,
  max: max$1,
  min: min$1,
  multiply: multiply,
  negate: negate,
  normal: normal,
  normalize: normalize,
  rotate: rotate$1,
  scale: scale$1,
  snap: snap$1,
  squaredDistance: squaredDistance,
  squaredLength: squaredLength,
  subtract: subtract$1,
  toString: toString$9,
  transform: transform$b
});

/*
 * Create a list of edges which SHARE points.
 * This allows the edges to be traversed in order.
 */
const toSharedPoints = (sides) => {
  const unique = new Map(); // {key: point}
  const getUniquePoint = (point) => {
    const key = point.toString();
    if (unique.has(key)) {
      return unique.get(key)
    } else {
      unique.set(key, point);
      return point
    }
  };

  return sides.map((side) => side.map(getUniquePoint))
};

/*
 * Convert a list of sides into a map from point to edges.
 */
const toPointMap = (sides) => {
  const pointMap = new Map();
  // first map to edges with shared vertices
  const edges = toSharedPoints(sides);
  // construct adjacent edges map
  edges.forEach((edge) => {
    if (pointMap.has(edge[0])) {
      pointMap.get(edge[0]).push(edge);
    } else {
      pointMap.set(edge[0], [edge]);
    }
  });
  return pointMap
};

/**
 * Create a new 2D geometry from a list of sides.
 * @param {Array} sides - list of sides to create outlines from
 * @returns {geom2} a new geometry
 *
 * @example
 * let geometry = fromSides([[[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 0]]])
 */
const fromSides = (sides) => {
  const pointMap = toPointMap(sides); // {point: [edges]}
  const outlines = [];
  while (true) {
    let startSide;
    for (const [point, edges] of pointMap) {
      startSide = edges.shift();
      if (!startSide) {
        pointMap.delete(point);
        continue
      }
      break
    }
    if (startSide === undefined) break // all starting sides have been visited

    const connectedPoints = [];
    const startPoint = startSide[0];
    while (true) {
      connectedPoints.push(startSide[0]);
      const nextPoint = startSide[1];
      if (nextPoint === startPoint) break // the outline has been closed
      const nextPossibleSides = pointMap.get(nextPoint);
      if (!nextPossibleSides) {
        throw new Error(`geometry is not closed at point ${nextPoint}`)
      }
      const nextSide = popNextSide(startSide, nextPossibleSides);
      if (nextPossibleSides.length === 0) {
        pointMap.delete(nextPoint);
      }
      startSide = nextSide;
    } // inner loop

    // due to the logic of fromPoints()
    // move the first point to the last
    if (connectedPoints.length > 0) {
      connectedPoints.push(connectedPoints.shift());
    }
    outlines.push(connectedPoints);
  } // outer loop
  pointMap.clear();
  return create$a(outlines)
};

// find the first counter-clockwise edge from startSide and pop from nextSides
const popNextSide = (startSide, nextSides) => {
  if (nextSides.length === 1) {
    return nextSides.pop()
  }
  const v0 = create$9();
  const startAngle = angleDegrees(subtract$1(v0, startSide[1], startSide[0]));
  let bestAngle;
  let bestIndex;
  nextSides.forEach((nextSide, index) => {
    const nextAngle = angleDegrees(subtract$1(v0, nextSide[1], nextSide[0]));
    let angle = nextAngle - startAngle;
    if (angle < -180) angle += 360;
    if (angle >= 180) angle -= 360;
    if (bestIndex === undefined || angle > bestAngle) {
      bestIndex = index;
      bestAngle = angle;
    }
  });
  const nextSide = nextSides[bestIndex];
  nextSides.splice(bestIndex, 1); // remove side from list
  return nextSide
};

/**
 * Create a new 2D geometry from the given compact binary data.
 * @param {Array} data - compact binary data
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.fromCompactBinary
 */
const fromCompactBinary$2 = (data) => {
  if (data[0] !== 0) throw new Error('invalid compact binary data')

  const created = create$a();

  created.transforms = clone$a(data.slice(1, 17));

  for (let i = 21; i < data.length;) {
    const length = data[i++]; // number of points for this polygon
    if (length < 0 || i + length * 2 > data.length) {
      throw new Error('invalid compact binary data')
    }
    const outline = [];
    for (let j = 0; j < length; j++) {
      const x = data[i + j * 2];
      const y = data[i + j * 2 + 1];
      outline.push(fromValues$2(x, y));
    }
    created.outlines.push(outline);
    i += length * 2;
  }

  // transfer known properties, i.e. color
  if (data[17] >= 0) {
    created.color = [data[17], data[18], data[19], data[20]];
  }
  // TODO: how about custom properties or fields ?
  return created
};

/**
 * Determine if the given object is a 2D geometry.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true, if the object matches a geom2 based object
 * @alias module:modeling/geometries/geom2.isA
 */
const isA$5 = (object) => {
  if (object && typeof object === 'object') {
    if ('outlines' in object && 'transforms' in object) {
      if (Array.isArray(object.outlines) && 'length' in object.transforms) {
        return true
      }
    }
  }
  return false
};

/**
 * Reverses the given geometry so that the outline points are flipped in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {geom2} geometry - the geometry to reverse
 * @returns {geom2} the new reversed geometry
 * @alias module:modeling/geometries/geom2.reverse
 *
 * @example
 * let newGeometry = reverse(geometry)
 */
const reverse$5 = (geometry) => {
  const reversed = clone$b(geometry);
  reversed.outlines = reversed.outlines.map((outline) => outline.slice().reverse());
  return reversed
};

/*
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toOutlines().
 * @param {geom2} geometry - the geometry to transform
 * @returns {geom2} the given geometry
 *
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms$2 = (geometry) => {
  if (isIdentity(geometry.transforms)) return geometry

  // apply transforms to each side
  geometry.outlines = geometry.outlines.map((outline) => outline.map((point) => transform$b(create$9(), point, geometry.transforms)));
  geometry.transforms = create$c();
  return geometry
};

/**
 * Create the outline(s) of the given geometry.
 * @param {geom2} geometry - geometry to create outlines from
 * @returns {Array} an array of outlines, where each outline is an array of ordered points
 * @alias module:modeling/geometries/geom2.toOutlines
 *
 * @example
 * let geometry = subtract(rectangle({size: [5, 5]}), rectangle({size: [3, 3]}))
 * let outlines = toOutlines(geometry) // returns two outlines
 */
const toOutlines = (geometry) => applyTransforms$2(geometry).outlines;

/**
 * Produces an array of points from the given geometry.
 * The returned array should not be modified as the points are shared with the geometry.
 * NOTE: The points returned do NOT define an order. Use toOutlines() for ordered points.
 * @param {geom2} geometry - the geometry
 * @returns {Array} an array of points
 * @alias module:modeling/geometries/geom2.toPoints
 *
 * @example
 * let sharedPoints = toPoints(geometry)
 */
const toPoints$3 = (geometry) => {
  const points = [];
  toOutlines(geometry).forEach((outline) => {
    outline.forEach((point) => {
      points.push(point);
    });
  });
  return points
};

/**
 * Produces an array of sides from the given geometry.
 * The returned array should not be modified as the data is shared with the geometry.
 * NOTE: The sides returned do NOT define an order. Use toOutlines() for ordered points.
 * @param {geom2} geometry - the geometry
 * @returns {Array} an array of sides
 * @alias module:modeling/geometries/geom2.toSides
 *
 * @example
 * let sharedSides = toSides(geometry)
 */
const toSides = (geometry) => {
  const sides = [];
  toOutlines(geometry).forEach((outline) => {
    outline.forEach((point, i) => {
      const j = (i + 1) % outline.length;
      sides.push([point, outline[j]]);
    });
  });
  return sides
};

/**
 * Create a string representing the contents of the given geometry.
 * @param {geom2} geometry - the geometry
 * @returns {String} a representative string
 * @alias module:modeling/geometries/geom2.toString
 *
 * @example
 * console.out(toString(geometry))
 */
const toString$8 = (geometry) => {
  const outlines = toOutlines(geometry);
  let result = 'geom2 (' + outlines.length + ' outlines):\n[\n';
  outlines.forEach((outline) => {
    result += '  [' + outline.map(toString$9).join() + ']\n';
  });
  result += ']\n';
  return result
};

/**
 * Produces a compact binary representation from the given geometry.
 * @param {geom2} geometry - the geometry
 * @returns {TypedArray} compact binary representation
 * @alias module:modeling/geometries/geom2.toCompactBinary
 */
const toCompactBinary$2 = (geometry) => {
  const transforms = geometry.transforms;
  let color = [-1, -1, -1, -1];
  if (geometry.color) color = geometry.color;

  // Compute array size
  let size = 21;
  geometry.outlines.forEach((outline) => {
    size += 2 * outline.length + 1;
  });

  // FIXME why Float32Array?
  const compacted = new Float32Array(size); // type + transforms + color + points

  compacted[0] = 0; // type code: 0 => geom2, 1 => geom3 , 2 => path2

  compacted[1] = transforms[0];
  compacted[2] = transforms[1];
  compacted[3] = transforms[2];
  compacted[4] = transforms[3];
  compacted[5] = transforms[4];
  compacted[6] = transforms[5];
  compacted[7] = transforms[6];
  compacted[8] = transforms[7];
  compacted[9] = transforms[8];
  compacted[10] = transforms[9];
  compacted[11] = transforms[10];
  compacted[12] = transforms[11];
  compacted[13] = transforms[12];
  compacted[14] = transforms[13];
  compacted[15] = transforms[14];
  compacted[16] = transforms[15];

  compacted[17] = color[0];
  compacted[18] = color[1];
  compacted[19] = color[2];
  compacted[20] = color[3];

  let index = 21;
  geometry.outlines.forEach((outline) => {
    compacted[index++] = outline.length;
    outline.forEach((point) => {
      compacted[index++] = point[0];
      compacted[index++] = point[1];
    });
  });

  // TODO: how about custom properties or fields ?
  return compacted
};

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the outlines, as this function only adjusts the transforms.
 * The transforms are applied when accessing the outlines via toOutlines().
 * @param {mat4} matrix - the matrix to transform with
 * @param {geom2} geometry - the geometry to transform
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.transform
 *
 * @example
 * let newGeometry = transform(fromZRotation(TAU / 4), geometry)
 */
const transform$a = (matrix, geometry) => {
  const transforms = multiply$1(create$c(), matrix, geometry.transforms);
  return Object.assign({}, geometry, { transforms })
};

/**
 * Calculate the intersect point of the two line segments (p1-p2 and p3-p4).
 * If the endpointTouch parameter is false, intersections at segment end points are excluded.
 * Note: If the line segments do NOT intersect then undefined is returned.
 * @see http://paulbourke.net/geometry/pointlineplane/
 * @param {vec2} p1 - first point of first line segment
 * @param {vec2} p2 - second point of first line segment
 * @param {vec2} p3 - first point of second line segment
 * @param {vec2} p4 - second point of second line segment
 * @param {Boolean} endpointTouch - include intersections at segment endpoints
 * @returns {vec2} intersection point of the two line segments, or undefined
 * @alias module:modeling/maths/utils.intersect
 */
const intersect$1 = (p1, p2, p3, p4, endpointTouch = true) => {
  // Check if none of the lines are of length 0
  if ((p1[0] === p2[0] && p1[1] === p2[1]) || (p3[0] === p4[0] && p3[1] === p4[1])) {
    return undefined
  }

  const denominator = ((p4[1] - p3[1]) * (p2[0] - p1[0]) - (p4[0] - p3[0]) * (p2[1] - p1[1]));

  // Lines are parallel
  if (Math.abs(denominator) < Number.MIN_VALUE) {
    return undefined
  }

  const ua = ((p4[0] - p3[0]) * (p1[1] - p3[1]) - (p4[1] - p3[1]) * (p1[0] - p3[0])) / denominator;
  const ub = ((p2[0] - p1[0]) * (p1[1] - p3[1]) - (p2[1] - p1[1]) * (p1[0] - p3[0])) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return undefined
  }

  // is the intersection at the end of a segment
  if (!endpointTouch && (ua === 0 || ua === 1 || ub === 0 || ub === 1)) {
    return undefined
  }

  // Return the x and y coordinates of the intersection
  const x = p1[0] + ua * (p2[0] - p1[0]);
  const y = p1[1] + ua * (p2[1] - p1[1]);

  return [x, y]
};

/**
 * Determine if the given object is a valid geom2.
 * Checks for closedness, self-edges, and valid data points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom2.validate
 */
const validate$4 = (object) => {
  if (!isA$5(object)) {
    throw new Error('invalid geom2 structure')
  }

  object.outlines.forEach((outline, i) => {
    if (outline.length < 3) {
      throw new Error(`geom2 outline ${i} must contain at least 3 points`)
    }
    // check for duplicate points
    for (let i = 0; i < outline.length; i++) {
      const j = (i + 1) % outline.length;
      if (equals$6(outline[i], outline[j])) {
        throw new Error(`geom2 outline ${i} found duplicate point ${outline[i]}`)
      }
    }
  });

  // check for self-intersection
  toOutlines(object).forEach((outline, i) => {
    // check for intersection between [a1, a2] and [b1, b2]
    for (let a1 = 0; a1 < outline.length; a1++) {
      const a2 = (a1 + 1) % outline.length;
      for (let b1 = 0; b1 < outline.length; b1++) {
        const b2 = (b1 + 1) % outline.length;
        if (a1 !== b1) {
          const int = intersect$1(outline[a1], outline[a2], outline[b1], outline[b2], false);
          if (int) {
            throw new Error(`geom2 outline ${i} self intersection at ${int}`)
          }
        }
      }
    }
  });

  // check transforms
  if (!object.transforms.every(Number.isFinite)) {
    throw new Error(`geom2 invalid transforms ${object.transforms}`)
  }
};

/**
 * Represents a 2D geometry consisting of outlines, where each outline is an ordered list of points.
 * The outline is always closed between the first and last points.
 * @see {@link geom2} for data structure information.
 * @module modeling/geometries/geom2
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * let myShape = geometries.geom2.create([ [[-1,-1], [1,-1], [1,1], [-1,1]] ])
 */

var index$p = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clone: clone$b,
  create: create$a,
  fromSides: fromSides,
  fromCompactBinary: fromCompactBinary$2,
  isA: isA$5,
  reverse: reverse$5,
  toOutlines: toOutlines,
  toPoints: toPoints$3,
  toSides: toSides,
  toString: toString$8,
  toCompactBinary: toCompactBinary$2,
  transform: transform$a,
  validate: validate$4
});

/**
 * Performs a shallow clone of the given geometry.
 * @param {geom3} geometry - the geometry to clone
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.clone
 */
const clone$7 = (geometry) => Object.assign({}, geometry);

/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @typedef {Object} geom3
 * @property {Array} polygons - list of polygons, each polygon containing three or more vertices
 * @property {mat4} transforms - transforms to apply to the polygons, see transform()
 * @example
 * {
 *   "polygons": [
 *     {"vertices": [[-1,-1,-1], [-1,-1,1], [-1,1,1], [-1,1,-1]]},
 *     {"vertices": [[1,-1,-1], [1,1,-1], [1,1,1], [1,-1,1]]},
 *     {"vertices": [[-1,-1,-1], [1,-1,-1], [1,-1,1], [-1,-1,1]]},
 *     {"vertices": [[-1,1,-1], [-1,1,1], [1,1,1], [1,1,-1]]},
 *     {"vertices": [[-1,-1,-1], [-1,1,-1], [1,1,-1], [1,-1,-1]]},
 *     {"vertices": [[-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]]}
 *   ],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 * }
 */

/**
 * Create a new 3D geometry composed of the given polygons.
 * @param {Array} [polygons] - list of polygons, or undefined
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.create
 */
const create$8 = (polygons) => {
  if (polygons === undefined) {
    polygons = []; // empty contents
  }
  return {
    polygons,
    transforms: create$c()
  }
};

/**
 * Represents a convex 3D polygon. The vertices used to initialize a polygon must
 * be coplanar and form a convex shape. The vertices do not have to be `vec3`
 * instances but they must behave similarly.
 * @typedef {Object} poly3
 * @property {Array} vertices - list of ordered vertices (3D)
 * @example
 * {"vertices": [[0,0,0], [4,0,0], [4,3,12]]}
 */

/**
 * Creates a new 3D polygon with initial values.
 *
 * @param {Array} [vertices] - a list of vertices (3D)
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.create
 * @example
 * const polygon = create([[1, 0], [0, 1], [0, 0]])
 */
const create$7 = (vertices) => {
  if (vertices === undefined || vertices.length < 3) {
    vertices = []; // empty contents
  }
  return { vertices }
};

/**
 * Create a deep clone of the given polygon
 *
 * @param {poly3} [out] - receiving polygon
 * @param {poly3} polygon - polygon to clone
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.clone
 */
const clone$6 = (...params) => {
  let out;
  let poly3;
  if (params.length === 1) {
    out = create$7();
    poly3 = params[0];
  } else {
    out = params[0];
    poly3 = params[1];
  }
  // deep clone of vertices
  out.vertices = poly3.vertices.map((vec) => clone$9(vec));
  return out
};

/**
 * Create a polygon from the given vertices and plane.
 * NOTE: No checks are performed on the parameters.
 * @param {Array} vertices - list of vertices (3D)
 * @param {plane} plane - plane of the polygon
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.fromVerticesAndPlane
 */
const fromVerticesAndPlane = (vertices, plane) => {
  const poly = create$7(vertices);
  poly.plane = plane; // retain the plane for later use
  return poly
};

/**
 * Represents a four dimensional vector.
 * See fromValues().
 * @typedef {Array} vec4
 */

/**
 * Creates a new vector initialized to [0,0,0,0].
 *
 * @returns {vec4} a new vector
 * @alias module:modeling/maths/vec4.create
 */
const create$6 = () => [0, 0, 0, 0];

/**
 * Create a clone of the given vector.
 *
 * @param {vec4} vector - source vector
 * @returns {vec4} a new vector
 * @alias module:modeling/maths/vec4.clone
 */
const clone$5 = (vector) => {
  const out = create$6();
  out[0] = vector[0];
  out[1] = vector[1];
  out[2] = vector[2];
  out[3] = vector[3];
  return out
};

/**
 * Create a copy of the given vector.
 *
 * @param {vec4} out - receiving vector
 * @param {vec4} vector - source vector
 * @returns {vec4} out
 * @alias module:modeling/maths/vec4.copy
 */
const copy$2 = (out, vector) => {
  out[0] = vector[0];
  out[1] = vector[1];
  out[2] = vector[2];
  out[3] = vector[3];
  return out
};

/**
 * Compare the given vectors for equality.
 *
 * @param {vec4} a - first vector
 * @param {vec4} b - second vector
 * @return {Boolean} true if vectors are equal
 * @alias module:modeling/maths/vec4.equals
 */
const equals$5 = (a, b) => ((a[0] === b[0]) && (a[1] === b[1]) && (a[2] === b[2]) && (a[3] === b[3]));

/**
 * Flip the given plane.
 *
 * @param {plane} out - receiving plane
 * @param {plane} plane - plane to flip
 * @return {plane} out
 * @alias module:modeling/maths/plane.flip
 */
const flip = (out, plane) => {
  out[0] = -plane[0];
  out[1] = -plane[1];
  out[2] = -plane[2];
  out[3] = -plane[3];
  return out
};

/**
 * Represents a plane in 3D coordinate space as determined by a normal (perpendicular to the plane)
 * and distance from 0,0,0.
 *
 * The contents of the array are a normal [0,1,2] and a distance [3].
 * @see https://en.wikipedia.org/wiki/Hesse_normal_form
 * @typedef {Array} plane
 */

/**
 * Create a new plane from the given normal and point values.
 *
 * @param {plane} out - receiving plane
 * @param {vec3} normal - directional vector
 * @param {vec3} point - origin of plane
 * @returns {plane} out
 * @alias module:modeling/maths/plane.fromNormalAndPoint
 */
const fromNormalAndPoint = (out, normal, point) => {
  const u = normalize$1(create$b(), normal);
  const w = dot$2(point, u);

  out[0] = u[0];
  out[1] = u[1];
  out[2] = u[2];
  out[3] = w;
  return out
};

/**
 * Creates a new vector with the given values.
 *
 * @param {Number} x - X component
 * @param {Number} y - Y component
 * @param {Number} z - Z component
 * @param {Number} w - W component
 * @returns {vec4} a new vector
 * @alias module:modeling/maths/vec4.fromValues
 */
const fromValues$1 = (x, y, z, w) => {
  const out = create$6();
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out
};

/**
 * Create a plane from the given points.
 *
 * @param {plane} out - receiving plane
 * @param {Array} vertices - points on the plane
 * @returns {plane} out
 * @alias module:modeling/maths/plane.fromPoints
 */
const fromPoints$4 = (out, ...vertices) => {
  const len = vertices.length;

  // Calculate normal vector for a single vertex
  // Inline to avoid allocations
  const ba = create$b();
  const ca = create$b();
  const vertexNormal = (index) => {
    const a = vertices[index];
    const b = vertices[(index + 1) % len];
    const c = vertices[(index + 2) % len];
    subtract$3(ba, b, a); // ba = b - a
    subtract$3(ca, c, a); // ca = c - a
    cross$1(ba, ba, ca); // ba = ba x ca
    normalize$1(ba, ba);
    return ba
  };

  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  if (len === 3) {
    // optimization for triangles, which are always coplanar
    copy$4(out, vertexNormal(0));
  } else {
    // sum of vertex normals
    vertices.forEach((v, i) => {
      add$1(out, out, vertexNormal(i));
    });
    // renormalize normal vector
    normalize$1(out, out);
  }
  out[3] = dot$2(out, vertices[0]);
  return out
};

/**
 * Create a new plane from the given points like fromPoints,
 * but allow the vectors to be on one point or one line.
 * In such a case, a random plane through the given points is constructed.
 *
 * @param {plane} out - receiving plane
 * @param {vec3} a - 3D point
 * @param {vec3} b - 3D point
 * @param {vec3} c - 3D point
 * @returns {plane} out
 * @alias module:modeling/maths/plane.fromPointsRandom
 */
const fromPointsRandom = (out, a, b, c) => {
  let ba = subtract$3(create$b(), b, a);
  let ca = subtract$3(create$b(), c, a);
  if (length$1(ba) < EPS) {
    ba = orthogonal(ba, ca);
  }
  if (length$1(ca) < EPS) {
    ca = orthogonal(ca, ba);
  }
  let normal = cross$1(create$b(), ba, ca);
  if (length$1(normal) < EPS) {
    // this would mean that ba == ca.negated()
    ca = orthogonal(ca, ba);
    normal = cross$1(normal, ba, ca);
  }
  normal = normalize$1(normal, normal);
  const w = dot$2(normal, a);

  out[0] = normal[0];
  out[1] = normal[1];
  out[2] = normal[2];
  out[3] = w;
  return out
};

/**
 * Project the given point on to the given plane.
 *
 * @param {plane} plane - plane of reference
 * @param {vec3} point - point of reference
 * @return {vec3} projected point on plane
 * @alias module:modeling/maths/plane.projectionOfPoint
 */
const projectionOfPoint = (plane, point) => {
  const a = point[0] * plane[0] + point[1] * plane[1] + point[2] * plane[2] - plane[3];
  const x = point[0] - a * plane[0];
  const y = point[1] - a * plane[1];
  const z = point[2] - a * plane[2];
  return fromValues$3(x, y, z)
};

/**
 * Calculate the distance to the given point.
 *
 * @param {plane} plane - plane of reference
 * @param {vec3} point - point of reference
 * @return {Number} signed distance to point
 * @alias module:modeling/maths/plane.signedDistanceToPoint
 */
const signedDistanceToPoint = (plane, point) => dot$2(plane, point) - plane[3];

/**
 * Convert the given vector to a representative string.
 *
 * @param {vec4} vec - vector to convert
 * @returns {String} representative string
 * @alias module:modeling/maths/vec4.toString
 */
const toString$7 = (vec) => `(${vec[0].toFixed(9)}, ${vec[1].toFixed(9)}, ${vec[2].toFixed(9)}, ${vec[3].toFixed(9)})`;

/**
 * Transform the given plane using the given matrix
 *
 * @param {plane} out - receiving plane
 * @param {plane} plane - plane to transform
 * @param {mat4} matrix - matrix to transform with
 * @return {plane} out
 * @alias module:modeling/maths/plane.transform
 */
const transform$9 = (out, plane, matrix) => {
  const isMirror = isMirroring(matrix);
  // get two vectors in the plane:
  const r = orthogonal(create$b(), plane);
  const u = cross$1(r, plane, r);
  const v = cross$1(create$b(), plane, u);
  // get 3 points in the plane:
  let point1 = fromScalar$2(create$b(), plane[3]);
  multiply$2(point1, point1, plane);
  let point2 = add$1(create$b(), point1, u);
  let point3 = add$1(create$b(), point1, v);
  // transform the points:
  point1 = transform$c(point1, point1, matrix);
  point2 = transform$c(point2, point2, matrix);
  point3 = transform$c(point3, point3, matrix);
  // and create a new plane from the transformed points:
  fromPoints$4(out, point1, point2, point3);
  if (isMirror) {
    // the transform is mirroring so flip the plane
    flip(out, out);
  }
  return out
};

/**
 * Represents a plane in 3D coordinate space as determined by a normal (perpendicular to the plane)
 * and distance from 0,0,0.
 * @see {@link plane} for data structure information.
 * @module modeling/maths/plane
 */

var index$o = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clone: clone$5,
  copy: copy$2,
  create: create$6,
  equals: equals$5,
  flip: flip,
  fromNormalAndPoint: fromNormalAndPoint,
  fromValues: fromValues$1,
  fromPoints: fromPoints$4,
  fromPointsRandom: fromPointsRandom,
  projectionOfPoint: projectionOfPoint,
  signedDistanceToPoint: signedDistanceToPoint,
  toString: toString$7,
  transform: transform$9
});

/**
 * Invert the give polygon to face the opposite direction.
 *
 * @param {poly3} polygon - the polygon to invert
 * @returns {poly3} a new poly3
 * @alias module:modeling/geometries/poly3.invert
 */
const invert$1 = (polygon) => {
  const vertices = polygon.vertices.slice().reverse();
  const inverted = create$7(vertices);
  if (polygon.plane) {
    // Flip existing plane to save recompute
    inverted.plane = flip(create$6(), polygon.plane);
  }
  return inverted
};

/**
 * Determine if the given object is a polygon.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a poly3
 * @alias module:modeling/geometries/poly3.isA
 */
const isA$4 = (object) => {
  if (object && typeof object === 'object') {
    if ('vertices' in object) {
      if (Array.isArray(object.vertices)) {
        return true
      }
    }
  }
  return false
};

/**
 * Check whether the given polygon is convex.
 * @param {poly3} polygon - the polygon to interrogate
 * @returns {Boolean} true if convex
 * @alias module:modeling/geometries/poly3.isConvex
 */
const isConvex$1 = (polygon) => areVerticesConvex(polygon.vertices);

const areVerticesConvex = (vertices) => {
  const numVertices = vertices.length;
  if (numVertices > 2) {
    // note: plane ~= normal vertex
    const normal = fromPoints$4(create$6(), ...vertices);
    let prevPrevPos = vertices[numVertices - 2];
    let prevPos = vertices[numVertices - 1];
    for (let i = 0; i < numVertices; i++) {
      const pos = vertices[i];
      if (!isConvexVertex(prevPrevPos, prevPos, pos, normal)) {
        return false
      }
      prevPrevPos = prevPos;
      prevPos = pos;
    }
  }
  return true
};

// calculate whether three vertices form a convex corner
//  prevVertex, vertex, nextVertex: the 3 coordinates (Vector3D instances)
//  normal: the normal vector of the plane
const isConvexVertex = (prevVertex, vertex, nextVertex, normal) => {
  const crossProduct = cross$1(
    create$b(),
    subtract$3(create$b(), vertex, prevVertex),
    subtract$3(create$b(), nextVertex, vertex)
  );
  const crossDotNormal = dot$2(crossProduct, normal);
  return crossDotNormal >= 0
};

const plane = (polygon) => {
  if (!polygon.plane) {
    polygon.plane = fromPoints$4(create$6(), ...polygon.vertices);
  }
  return polygon.plane
};

/**
 * Measure the area of the given polygon.
 * @see 2000 softSurfer http://geomalgorithms.com
 * @param {poly3} polygon - the polygon to measure
 * @return {Number} area of the polygon
 * @alias module:modeling/geometries/poly3.measureArea
 */
const measureArea$2 = (polygon) => {
  const n = polygon.vertices.length;
  if (n < 3) {
    return 0 // degenerate polygon
  }
  const vertices = polygon.vertices;

  // calculate a normal vector
  const normal = plane(polygon);

  // determine direction of projection
  const ax = Math.abs(normal[0]);
  const ay = Math.abs(normal[1]);
  const az = Math.abs(normal[2]);

  if (ax + ay + az === 0) {
    // normal does not exist
    return 0
  }

  let coord = 3; // ignore Z coordinates
  if ((ax > ay) && (ax > az)) {
    coord = 1; // ignore X coordinates
  } else
  if (ay > az) {
    coord = 2; // ignore Y coordinates
  }

  let area = 0;
  let h = 0;
  let i = 1;
  let j = 2;
  switch (coord) {
    case 1: // ignore X coordinates
      // compute area of 2D projection
      for (i = 1; i < n; i++) {
        h = i - 1;
        j = (i + 1) % n;
        area += (vertices[i][1] * (vertices[j][2] - vertices[h][2]));
      }
      area += (vertices[0][1] * (vertices[1][2] - vertices[n - 1][2]));
      // scale to get area
      area /= (2 * normal[0]);
      break

    case 2: // ignore Y coordinates
      // compute area of 2D projection
      for (i = 1; i < n; i++) {
        h = i - 1;
        j = (i + 1) % n;
        area += (vertices[i][2] * (vertices[j][0] - vertices[h][0]));
      }
      area += (vertices[0][2] * (vertices[1][0] - vertices[n - 1][0]));
      // scale to get area
      area /= (2 * normal[1]);
      break

    case 3: // ignore Z coordinates
    default:
      // compute area of 2D projection
      for (i = 1; i < n; i++) {
        h = i - 1;
        j = (i + 1) % n;
        area += (vertices[i][0] * (vertices[j][1] - vertices[h][1]));
      }
      area += (vertices[0][0] * (vertices[1][1] - vertices[n - 1][1]));
      // scale to get area
      area /= (2 * normal[2]);
      break
  }
  return area
};

/**
 * @param {poly3} polygon - the polygon to measure
 * @returns {Array} an array of two vectors (3D);  minimum and maximum coordinates
 * @alias module:modeling/geometries/poly3.measureBoundingBox
 */
const measureBoundingBox$2 = (polygon) => {
  const vertices = polygon.vertices;
  const numVertices = vertices.length;
  const min = numVertices === 0 ? create$b() : clone$9(vertices[0]);
  const max = clone$9(min);
  for (let i = 1; i < numVertices; i++) {
    min$2(min, min, vertices[i]);
    max$2(max, max, vertices[i]);
  }
  return [min, max]
};

/**
 * Calculates the dot product of the given vectors.
 *
 * @param {vec4} a - first vector
 * @param {vec4} b - second vector
 * @returns {Number} dot product
 * @alias module:modeling/maths/vec4.dot
 */
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];

/**
 * Create a new vector from the given scalar value.
 *
 * @param {vec4} out - receiving vector
 * @param  {Number} scalar
 * @returns {vec4} out
 * @alias module:modeling/maths/vec4.fromScalar
 */
const fromScalar = (out, scalar) => {
  out[0] = scalar;
  out[1] = scalar;
  out[2] = scalar;
  out[3] = scalar;
  return out
};

/**
 * Transform the given vector using the given matrix.
 *
 * @param {vec4} out - receiving vector
 * @param {vec4} vector - vector to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {vec4} out
 * @alias module:modeling/maths/vec4.transform
 */
const transform$8 = (out, vector, matrix) => {
  const [x, y, z, w] = vector;

  out[0] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w;
  out[1] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w;
  out[2] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w;
  out[3] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w;
  return out
};

/**
 * Represents a four dimensional vector.
 * @see {@link vec4} for data structure information.
 * @module modeling/maths/vec4
 */

var index$n = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clone: clone$5,
  copy: copy$2,
  create: create$6,
  dot: dot,
  equals: equals$5,
  fromScalar: fromScalar,
  fromValues: fromValues$1,
  toString: toString$7,
  transform: transform$8
});

const cache$3 = new WeakMap();

/**
 * Measure the bounding sphere of the given polygon.
 * @param {poly3} polygon - the polygon to measure
 * @returns {vec4} the computed bounding sphere; center vertex (3D) and radius
 * @alias module:modeling/geometries/poly3.measureBoundingSphere
 */
const measureBoundingSphere$1 = (polygon) => {
  const boundingSphere = cache$3.get(polygon);
  if (boundingSphere) return boundingSphere

  const vertices = polygon.vertices;
  const out = create$6();

  if (vertices.length === 0) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out
  }

  // keep a list of min/max vertices by axis
  let minx = vertices[0];
  let miny = minx;
  let minz = minx;
  let maxx = minx;
  let maxy = minx;
  let maxz = minx;

  vertices.forEach((v) => {
    if (minx[0] > v[0]) minx = v;
    if (miny[1] > v[1]) miny = v;
    if (minz[2] > v[2]) minz = v;
    if (maxx[0] < v[0]) maxx = v;
    if (maxy[1] < v[1]) maxy = v;
    if (maxz[2] < v[2]) maxz = v;
  });

  out[0] = (minx[0] + maxx[0]) * 0.5; // center of sphere
  out[1] = (miny[1] + maxy[1]) * 0.5;
  out[2] = (minz[2] + maxz[2]) * 0.5;
  const x = out[0] - maxx[0];
  const y = out[1] - maxy[1];
  const z = out[2] - maxz[2];
  out[3] = Math.sqrt(x * x + y * y + z * z); // radius of sphere

  cache$3.set(polygon, out);

  return out
};

/**
 * Measure the signed volume of the given polygon, which must be convex.
 * The volume is that formed by the tetrahedron connected to the axis [0,0,0],
 * and will be positive or negative based on the rotation of the vertices.
 * @see http://chenlab.ece.cornell.edu/Publication/Cha/icip01_Cha.pdf
 * @param {poly3} polygon - the polygon to measure
 * @return {Number} volume of the polygon
 * @alias module:modeling/geometries/poly3.measureSignedVolume
 */
const measureSignedVolume = (polygon) => {
  let signedVolume = 0;
  const vertices = polygon.vertices;
  // calculate based on triangular polygons
  const cross = create$b();
  for (let i = 0; i < vertices.length - 2; i++) {
    cross$1(cross, vertices[i + 1], vertices[i + 2]);
    signedVolume += dot$2(vertices[0], cross);
  }
  signedVolume /= 6;
  return signedVolume
};

/**
 * Return the given polygon as a list of vertices.
 * NOTE: The returned array should not be modified as the vertices are shared with the geometry.
 * @param {poly3} polygon - the polygon
 * @return {Array} list of vertices (3D)
 * @alias module:modeling/geometries/poly3.toVertices
 */
const toVertices$1 = (polygon) => polygon.vertices;

/**
 * Convert the given polygon to a readable string.
 * @param {poly3} polygon - the polygon to convert
 * @return {String} the string representation
 * @alias module:modeling/geometries/poly3.toString
 */
const toString$6 = (polygon) => `poly3: [${polygon.vertices.map(toString$b).join(', ')}]`;

/**
 * Transform the given polygon using the given matrix.
 * @param {mat4} matrix - the matrix to transform with
 * @param {poly3} polygon - the polygon to transform
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.transform
 */
const transform$7 = (matrix, polygon) => {
  const vertices = polygon.vertices.map((vertex) => transform$c(create$b(), vertex, matrix));
  if (isMirroring(matrix)) {
    // reverse the order to preserve the orientation
    vertices.reverse();
  }
  return create$7(vertices)
};

/**
 * Determine if the given object is a valid polygon.
 * Checks for valid data structure, convex polygons, and duplicate vertices.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/poly3.validate
 */
const validate$3 = (object) => {
  if (!isA$4(object)) {
    throw new Error('invalid poly3 structure')
  }

  // check for empty polygon
  if (object.vertices.length < 3) {
    throw new Error(`poly3 not enough vertices ${object.vertices.length}`)
  }
  // check area
  if (measureArea$2(object) <= 0) {
    throw new Error('poly3 area must be greater than zero')
  }

  // check for duplicate vertices
  for (let i = 0; i < object.vertices.length; i++) {
    if (equals$7(object.vertices[i], object.vertices[(i + 1) % object.vertices.length])) {
      throw new Error(`poly3 duplicate vertex ${object.vertices[i]}`)
    }
  }

  // check convexity
  if (!isConvex$1(object)) {
    throw new Error('poly3 must be convex')
  }

  // check for infinity, nan
  object.vertices.forEach((vertex) => {
    if (!vertex.every(Number.isFinite)) {
      throw new Error(`poly3 invalid vertex ${vertex}`)
    }
  });

  // check that vertices are co-planar
  if (object.vertices.length > 3) {
    const normal = plane(object);
    object.vertices.forEach((vertex) => {
      const dist = Math.abs(signedDistanceToPoint(normal, vertex));
      if (dist > NEPS) {
        throw new Error(`poly3 must be coplanar: vertex ${vertex} distance ${dist}`)
      }
    });
  }
};

/**
 * Represents a convex 3D polygon consisting of a list of ordered vertices.
 * @see {@link poly3} for data structure information.
 * @module modeling/geometries/poly3
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const polygon = geometries.poly3.create([[0,0,0], [4,0,0], [4,3,12]])
 */

var index$m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clone: clone$6,
  create: create$7,
  fromVerticesAndPlane: fromVerticesAndPlane,
  invert: invert$1,
  isA: isA$4,
  isConvex: isConvex$1,
  measureArea: measureArea$2,
  measureBoundingBox: measureBoundingBox$2,
  measureBoundingSphere: measureBoundingSphere$1,
  measureSignedVolume: measureSignedVolume,
  plane: plane,
  toVertices: toVertices$1,
  toString: toString$6,
  transform: transform$7,
  validate: validate$3
});

/**
 * Construct a new 3D geometry from a list of vertices.
 * The list of vertices should contain sub-arrays, each defining a single polygon of vertices.
 * In addition, the vertices should follow the right-hand rule for rotation in order to
 * define an external facing polygon.
 * @param {Array} listOfVertices - list of lists, where each list is a set of vertices to construct a polygon
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromPoints
 */
const fromPoints$3 = (listOfLists) => {
  if (!Array.isArray(listOfLists)) {
    throw new Error('the given vertices must be an array')
  }

  const polygons = listOfLists.map((vertices, index) => {
    // TODO catch the error, and rethrow with index
    return create$7(vertices)
  });
  return create$8(polygons)
};

/**
 * Construct a new 3D geometry from the given compact binary data.
 * @param {TypedArray} data - compact binary data
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromCompactBinary
 */
const fromCompactBinary$1 = (data) => {
  if (data[0] !== 1) throw new Error('invalid compact binary data')

  const created = create$8();

  created.transforms = clone$a(data.slice(1, 17));

  const numberOfVertices = data[21];
  let ci = 22;
  let vi = data.length - (numberOfVertices * 3);
  while (vi < data.length) {
    const verticesPerPolygon = data[ci];
    ci++;

    const vertices = [];
    for (let i = 0; i < verticesPerPolygon; i++) {
      vertices.push(fromValues$3(data[vi], data[vi + 1], data[vi + 2]));
      vi += 3;
    }
    created.polygons.push(create$7(vertices));
  }

  // transfer known properties, i.e. color
  if (data[17] >= 0) {
    created.color = [data[17], data[18], data[19], data[20]];
  }
  // TODO: how about custom properties or fields ?
  return created
};

/*
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toPolygons.
 * @param {geom3} geometry - the geometry to transform
 * @returns {geom3} the given geometry
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms$1 = (geometry) => {
  if (isIdentity(geometry.transforms)) return geometry

  // apply transforms to each polygon
  geometry.polygons = geometry.polygons.map((polygon) => transform$7(geometry.transforms, polygon));
  // reset transforms
  geometry.transforms = create$c();
  return geometry
};

/**
 * Produces an array of polygons from the given geometry, after applying transforms.
 * The returned array should not be modified as the polygons are shared with the geometry.
 * @param {geom3} geometry - the geometry
 * @returns {Array} an array of polygons
 * @alias module:modeling/geometries/geom3.toPolygons
 *
 * @example
 * let sharedPolygons = toPolygons(geometry)
 */
const toPolygons$1 = (geometry) => applyTransforms$1(geometry).polygons;

/**
 * Invert the given geometry, transposing solid and empty space.
 * @param {geom3} geometry - the geometry to invert
 * @return {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.invert
 */
const invert = (geometry) => {
  const polygons = toPolygons$1(geometry);
  const newPolygons = polygons.map((polygon) => invert$1(polygon));
  return create$8(newPolygons)
};

/**
 * Determine if the given object is a 3D geometry.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a geom3
 * @alias module:modeling/geometries/geom3.isA
 */
const isA$3 = (object) => {
  if (object && typeof object === 'object') {
    if ('polygons' in object && 'transforms' in object) {
      if (Array.isArray(object.polygons) && 'length' in object.transforms) {
        return true
      }
    }
  }
  return false
};

/**
 * Return the given geometry as a list of points, after applying transforms.
 * The returned array should not be modified as the points are shared with the geometry.
 * @param {geom3} geometry - the geometry
 * @return {Array} list of points, where each sub-array represents a polygon
 * @alias module:modeling/geometries/geom3.toPoints
 */
const toPoints$2 = (geometry) => {
  const polygons = toPolygons$1(geometry);
  return polygons.map((polygon) => toVertices$1(polygon))
};

/**
 * Create a string representing the contents of the given geometry.
 * @param {geom3} geometry - the geometry
 * @returns {String} a representative string
 * @alias module:modeling/geometries/geom3.toString
 *
 * @example
 * console.out(toString(geometry))
 */
const toString$5 = (geometry) => {
  const polygons = toPolygons$1(geometry);
  let result = 'geom3 (' + polygons.length + ' polygons):\n';
  polygons.forEach((polygon) => {
    result += '  ' + toString$6(polygon) + '\n';
  });
  return result
};

/**
 * Return the given geometry in compact binary representation.
 * @param {geom3} geometry - the geometry
 * @return {TypedArray} compact binary representation
 * @alias module:modeling/geometries/geom3.toCompactBinary
 */
const toCompactBinary$1 = (geometry) => {
  const polygons = geometry.polygons;
  const transforms = geometry.transforms;

  const numberOfPolygons = polygons.length;
  const numberOfVertices = polygons.reduce((count, polygon) => count + polygon.vertices.length, 0);
  let color = [-1, -1, -1, -1];
  if (geometry.color) color = geometry.color;

  // FIXME why Float32Array?
  const compacted = new Float32Array(1 + 16 + 4 + 1 + numberOfPolygons + (numberOfVertices * 3));
  // type + transforms + color + numberOfPolygons + numberOfVerticesPerPolygon[] + vertices data[]

  compacted[0] = 1; // type code: 0 => geom2, 1 => geom3 , 2 => path2

  compacted[1] = transforms[0];
  compacted[2] = transforms[1];
  compacted[3] = transforms[2];
  compacted[4] = transforms[3];
  compacted[5] = transforms[4];
  compacted[6] = transforms[5];
  compacted[7] = transforms[6];
  compacted[8] = transforms[7];
  compacted[9] = transforms[8];
  compacted[10] = transforms[9];
  compacted[11] = transforms[10];
  compacted[12] = transforms[11];
  compacted[13] = transforms[12];
  compacted[14] = transforms[13];
  compacted[15] = transforms[14];
  compacted[16] = transforms[15];

  compacted[17] = color[0];
  compacted[18] = color[1];
  compacted[19] = color[2];
  compacted[20] = color[3];

  compacted[21] = numberOfVertices;

  let ci = 22;
  let vi = ci + numberOfPolygons;
  polygons.forEach((polygon) => {
    const vertices = toVertices$1(polygon);
    // record the number of vertices per polygon
    compacted[ci] = vertices.length;
    ci++;
    // convert the vertices
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
      compacted[vi + 0] = vertex[0];
      compacted[vi + 1] = vertex[1];
      compacted[vi + 2] = vertex[2];
      vi += 3;
    }
  });
  // TODO: how about custom properties or fields ?
  return compacted
};

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the polygons, as this function only adjusts the transforms.
 * See applyTransforms() for the actual application of the transforms to the polygons.
 * @param {mat4} matrix - the matrix to transform with
 * @param {geom3} geometry - the geometry to transform
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.transform
 *
 * @example
 * let newGeometry = transform(fromXRotation(TAU / 4), geometry)
 */
const transform$6 = (matrix, geometry) => {
  const transforms = multiply$1(create$c(), matrix, geometry.transforms);
  return Object.assign({}, geometry, { transforms })
};

/**
 * Determine if the given object is a valid 3D geometry.
 * Checks for valid data structure, convex polygon faces, and manifold edges.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom3.validate
 */
const validate$2 = (object) => {
  if (!isA$3(object)) {
    throw new Error('invalid geom3 structure')
  }

  // check polygons
  object.polygons.forEach(validate$3);
  validateManifold(object);

  // check transforms
  if (!object.transforms.every(Number.isFinite)) {
    throw new Error(`geom3 invalid transforms ${object.transforms}`)
  }

  // TODO: check for self-intersecting
};

/*
 * Check manifold edge condition: Every edge is in exactly 2 faces
 */
const validateManifold = (object) => {
  // count of each edge
  const edgeCount = new Map();
  object.polygons.forEach(({ vertices }) => {
    vertices.forEach((v, i) => {
      const v1 = `${v}`;
      const v2 = `${vertices[(i + 1) % vertices.length]}`;
      // sort for undirected edge
      const edge = `${v1}/${v2}`;
      const count = edgeCount.has(edge) ? edgeCount.get(edge) : 0;
      edgeCount.set(edge, count + 1);
    });
  });

  // check that edges are always matched
  const nonManifold = [];
  edgeCount.forEach((count, edge) => {
    const complementEdge = edge.split('/').reverse().join('/');
    const complementCount = edgeCount.get(complementEdge);
    if (count !== complementCount) {
      nonManifold.push(edge.replace('/', ' -> '));
    }
  });
  if (nonManifold.length > 0) {
    throw new Error(`non-manifold edges ${nonManifold.length}\n${nonManifold.join('\n')}`)
  }
};

/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @see {@link geom3} for data structure information.
 * @module modeling/geometries/geom3
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const myShape = geometries.geom3.fromPoints([
 *   [[-1,-1,-1], [-1,-1,1], [-1,1,1], [-1,1,-1]],
 *   [[1,-1,-1], [1,1,-1], [1,1,1], [1,-1,1]],
 *   [[-1,-1,-1], [1,-1,-1], [1,-1,1], [-1,-1,1]]
 *   [[-1,1,-1], [-1,1,1], [1,1,1], [1,1,-1]],
 *   [[-1,-1,-1], [-1,1,-1], [1,1,-1], [1,-1,-1]],
 *   [[-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]]
 * ])
 */

var index$l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clone: clone$7,
  create: create$8,
  fromPoints: fromPoints$3,
  fromCompactBinary: fromCompactBinary$1,
  invert: invert,
  isA: isA$3,
  toPoints: toPoints$2,
  toPolygons: toPolygons$1,
  toString: toString$5,
  toCompactBinary: toCompactBinary$1,
  transform: transform$6,
  validate: validate$2
});

/**
 * Performs a shallow clone of the give geometry.
 * @param {path2} geometry - the geometry to clone
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.clone
 */
const clone$4 = (geometry) => Object.assign({}, geometry);

/**
 * Close the given geometry.
 * @param {path2} geometry - the path to close
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.close
 */
const close = (geometry) => {
  if (geometry.isClosed) return geometry

  const cloned = clone$4(geometry);
  cloned.isClosed = true;

  if (cloned.points.length > 1) {
    // make sure the paths are formed properly
    const points = cloned.points;
    const p0 = points[0];
    let pn = points[points.length - 1];
    while (distance(p0, pn) < (EPS * EPS)) {
      points.pop();
      if (points.length === 1) break
      pn = points[points.length - 1];
    }
  }
  return cloned
};

/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @typedef {Object} path2
 * @property {Array} points - list of ordered points
 * @property {Boolean} isClosed - true if the path is closed where start and end points are the same
 * @property {mat4} transforms - transforms to apply to the points, see transform()
 * @example
 * {
 *   "points": [[0,0], [4,0], [4,3]],
 *   "isClosed": true,
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 * }
 */

/**
 * Create an empty, open path.
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.create
 *
 * @example
 * let newPath = create()
 */
const create$5 = (points) => {
  if (points === undefined) {
    points = [];
  }
  return {
    points: points,
    isClosed: false,
    transforms: create$c()
  }
};

/**
 * Create a new path from the given points.
 * The points must be provided an array of points,
 * where each point is an array of two numbers.
 * @param {Object} options - options for construction
 * @param {Boolean} [options.closed=false] - if the path should be open or closed
 * @param {Array} points - array of points (2D) from which to create the path
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.fromPoints
 *
 * @example:
 * my newPath = fromPoints({closed: true}, [[10, 10], [-10, 10]])
 */
const fromPoints$2 = (options, points) => {
  const defaults = { closed: false };
  let { closed } = Object.assign({}, defaults, options);

  let created = create$5();
  created.points = points.map((point) => clone$8(point));

  // check if first and last points are equal
  if (created.points.length > 1) {
    const p0 = created.points[0];
    const pn = created.points[created.points.length - 1];
    if (distance(p0, pn) < (EPS * EPS)) {
      // and close automatically
      closed = true;
    }
  }
  if (closed === true) created = close(created);

  return created
};

/*
 * Apply the transforms of the given geometry.
 * NOTE: This function must be called BEFORE exposing any data. See toPoints.
 * @param {path} geometry - the geometry to transform
 * @returns {path} the given geometry
 * @example
 * geometry = applyTransforms(geometry)
 */
const applyTransforms = (geometry) => {
  if (isIdentity(geometry.transforms)) return geometry

  geometry.points = geometry.points.map((point) => transform$b(create$9(), point, geometry.transforms));
  geometry.transforms = create$c();
  return geometry
};

/**
 * Produces an array of points from the given geometry.
 * The returned array should not be modified as the data is shared with the geometry.
 * @param {path2} geometry - the geometry
 * @returns {Array} an array of points
 * @alias module:modeling/geometries/path2.toPoints
 *
 * @example
 * let sharedPoints = toPoints(geometry)
 */
const toPoints$1 = (geometry) => applyTransforms(geometry).points;

/**
 * Append a series of points to the given geometry that represent an arc.
 * This implementation follows the SVG specifications.
 * @see http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
 * @param {Object} options - options for construction
 * @param {vec2} options.endpoint - end point of arc (REQUIRED)
 * @param {vec2} [options.radius=[0,0]] - radius of arc (X and Y)
 * @param {Number} [options.xaxisRotation=0] - rotation (RADIANS) of the X axis of the arc with respect to the X axis of the coordinate system
 * @param {Boolean} [options.clockwise=false] - draw an arc clockwise with respect to the center point
 * @param {Boolean} [options.large=false] - draw an arc longer than TAU / 2 radians
 * @param {Number} [options.segments=16] - number of segments per full rotation
 * @param {path2} geometry - the path of which to append the arc
 * @returns {path2} a new path with the appended points
 * @alias module:modeling/geometries/path2.appendArc
 *
 * @example
 * let myShape = fromPoints({}, [[27.5,-22.96875]]);
 * myShape = appendPoints([[27.5,-3.28125]], myShape);
 * myShape = appendArc({endpoint: [12.5, -22.96875], radius: [15, -19.6875]}, myShape);
 */
const appendArc = (options, geometry) => {
  const defaults = {
    radius: [0, 0], // X and Y radius
    xaxisRotation: 0,
    clockwise: false,
    large: false,
    segments: 16
  };
  let { endpoint, radius, xaxisRotation, clockwise, large, segments } = Object.assign({}, defaults, options);

  // validate the given options
  if (!Array.isArray(endpoint)) throw new Error('endpoint must be an array of X and Y values')
  if (endpoint.length < 2) throw new Error('endpoint must contain X and Y values')
  endpoint = clone$8(endpoint);

  if (!Array.isArray(radius)) throw new Error('radius must be an array of X and Y values')
  if (radius.length < 2) throw new Error('radius must contain X and Y values')

  if (segments < 4) throw new Error('segments must be four or more')

  const decimals = 100000;

  // validate the given geometry
  if (geometry.isClosed) {
    throw new Error('the given path cannot be closed')
  }

  const points = toPoints$1(geometry);
  if (points.length < 1) {
    throw new Error('the given path must contain one or more points (as the starting point for the arc)')
  }

  let xRadius = radius[0];
  let yRadius = radius[1];
  const startpoint = points[points.length - 1];

  // round to precision in order to have determinate calculations
  xRadius = Math.round(xRadius * decimals) / decimals;
  yRadius = Math.round(yRadius * decimals) / decimals;
  endpoint = fromValues$2(Math.round(endpoint[0] * decimals) / decimals, Math.round(endpoint[1] * decimals) / decimals);

  const sweepFlag = !clockwise;
  let newPoints = [];
  if ((xRadius === 0) || (yRadius === 0)) {
    // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes:
    // If rx = 0 or ry = 0, then treat this as a straight line from (x1, y1) to (x2, y2) and stop
    newPoints.push(endpoint);
  } else {
    xRadius = Math.abs(xRadius);
    yRadius = Math.abs(yRadius);

    // see http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes :
    const phi = xaxisRotation;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const minusHalfDistance = subtract$1(create$9(), startpoint, endpoint);
    scale$1(minusHalfDistance, minusHalfDistance, 0.5);
    // F.6.5.1:
    // round to precision in order to have determinate calculations
    const x = Math.round((cosPhi * minusHalfDistance[0] + sinPhi * minusHalfDistance[1]) * decimals) / decimals;
    const y = Math.round((-sinPhi * minusHalfDistance[0] + cosPhi * minusHalfDistance[1]) * decimals) / decimals;
    const startTranslated = fromValues$2(x, y);
    // F.6.6.2:
    const bigLambda = (startTranslated[0] * startTranslated[0]) / (xRadius * xRadius) + (startTranslated[1] * startTranslated[1]) / (yRadius * yRadius);
    if (bigLambda > 1.0) {
      // F.6.6.3:
      const sqrtBigLambda = Math.sqrt(bigLambda);
      xRadius *= sqrtBigLambda;
      yRadius *= sqrtBigLambda;
      // round to precision in order to have determinate calculations
      xRadius = Math.round(xRadius * decimals) / decimals;
      yRadius = Math.round(yRadius * decimals) / decimals;
    }
    // F.6.5.2:
    let multiplier1 = Math.sqrt((xRadius * xRadius * yRadius * yRadius - xRadius * xRadius * startTranslated[1] * startTranslated[1] - yRadius * yRadius * startTranslated[0] * startTranslated[0]) / (xRadius * xRadius * startTranslated[1] * startTranslated[1] + yRadius * yRadius * startTranslated[0] * startTranslated[0]));
    if (sweepFlag === large) multiplier1 = -multiplier1;
    const centerTranslated = fromValues$2(xRadius * startTranslated[1] / yRadius, -yRadius * startTranslated[0] / xRadius);
    scale$1(centerTranslated, centerTranslated, multiplier1);
    // F.6.5.3:
    let center = fromValues$2(cosPhi * centerTranslated[0] - sinPhi * centerTranslated[1], sinPhi * centerTranslated[0] + cosPhi * centerTranslated[1]);
    center = add(center, center, scale$1(create$9(), add(create$9(), startpoint, endpoint), 0.5));

    // F.6.5.5:
    const vector1 = fromValues$2((startTranslated[0] - centerTranslated[0]) / xRadius, (startTranslated[1] - centerTranslated[1]) / yRadius);
    const vector2 = fromValues$2((-startTranslated[0] - centerTranslated[0]) / xRadius, (-startTranslated[1] - centerTranslated[1]) / yRadius);
    const theta1 = angleRadians(vector1);
    const theta2 = angleRadians(vector2);
    let deltatheta = theta2 - theta1;
    deltatheta = deltatheta % TAU;
    if ((!sweepFlag) && (deltatheta > 0)) {
      deltatheta -= TAU;
    } else if ((sweepFlag) && (deltatheta < 0)) {
      deltatheta += TAU;
    }

    // Ok, we have the center point and angle range (from theta1, deltatheta radians) so we can create the ellipse
    let numSteps = Math.ceil(Math.abs(deltatheta) / TAU * segments) + 1;
    if (numSteps < 1) numSteps = 1;
    for (let step = 1; step < numSteps; step++) {
      const theta = theta1 + step / numSteps * deltatheta;
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      // F.6.3.1:
      const point = fromValues$2(cosPhi * xRadius * cosTheta - sinPhi * yRadius * sinTheta, sinPhi * xRadius * cosTheta + cosPhi * yRadius * sinTheta);
      add(point, point, center);
      newPoints.push(point);
    }
    // ensure end point is precisely what user gave as parameter
    if (numSteps) newPoints.push(options.endpoint);
  }
  newPoints = points.concat(newPoints);
  const result = fromPoints$2({}, newPoints);
  return result
};

/**
 * Concatenate the given paths.
 *
 * If both contain the same point at the junction, merge it into one.
 * A concatenation of zero paths is an empty, open path.
 * A concatenation of one closed path to a series of open paths produces a closed path.
 * A concatenation of a path to a closed path is an error.
 * @param {...path2} paths - the paths to concatenate
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.concat
 *
 * @example
 * let newPath = concat(fromPoints({}, [[1, 2]]), fromPoints({}, [[3, 4]]))
 */
const concat = (...paths) => {
  // Only the last path can be closed, producing a closed path.
  let isClosed = false;
  let newPoints = [];
  paths.forEach((path, i) => {
    const tmp = toPoints$1(path).slice();
    if (newPoints.length > 0 && tmp.length > 0 && equals$6(tmp[0], newPoints[newPoints.length - 1])) tmp.shift();
    if (tmp.length > 0 && isClosed) {
      throw new Error(`Cannot concatenate to a closed path; check the ${i}th path`)
    }
    isClosed = path.isClosed;
    newPoints = newPoints.concat(tmp);
  });
  return fromPoints$2({ closed: isClosed }, newPoints)
};

/**
 * Append the given list of points to the end of the given geometry.
 * @param {Array} points - the points (2D) to append to the given path
 * @param {path2} geometry - the given path
 * @returns {path2} a new path with the appended points
 * @alias module:modeling/geometries/path2.appendPoints
 * @example
 * let newPath = appendPoints([[3, 4], [4, 5]], oldPath)
 */
const appendPoints = (points, geometry) => concat(geometry, create$5(points));

/**
 * Append a series of points to the given geometry that represent a Bézier curve.
 * The Bézier curve starts at the last point in the given geometry, and ends at the last control point.
 * The other control points are intermediate control points to transition the curve from start to end points.
 * The first control point may be null to ensure a smooth transition occurs. In this case,
 * the second to last point of the given geometry is mirrored into the control points of the Bézier curve.
 * In other words, the trailing gradient of the geometry matches the new gradient of the curve.
 * @param {Object} options - options for construction
 * @param {Array} options.controlPoints - list of control points (2D) for the Bézier curve
 * @param {Number} [options.segment=16] - number of segments per 360 rotation
 * @param {path2} geometry - the path of which to append points
 * @returns {path2} a new path with the appended points
 * @alias module:modeling/geometries/path2.appendBezier
 *
 * @example
 * let myShape = fromPoints({}, [[10,-20]])
 * myShape = appendBezier({controlPoints: [[10,-10],[25,-10],[25,-20]]}, myShape);
 * myShape = appendBezier({controlPoints: [null, [25,-30],[40,-30],[40,-20]]}, myShape)
 */
const appendBezier = (options, geometry) => {
  const defaults = {
    segments: 16
  };
  let { controlPoints, segments } = Object.assign({}, defaults, options);

  // validate the given options
  if (!Array.isArray(controlPoints)) throw new Error('controlPoints must be an array of one or more points')
  if (controlPoints.length < 1) throw new Error('controlPoints must be an array of one or more points')

  if (segments < 4) throw new Error('segments must be four or more')

  // validate the given geometry
  if (geometry.isClosed) {
    throw new Error('the given geometry cannot be closed')
  }

  const points = toPoints$1(geometry);
  if (points.length < 1) {
    throw new Error('the given path must contain one or more points (as the starting point for the bezier curve)')
  }

  // make a copy of the control points
  controlPoints = controlPoints.slice();

  // special handling of null control point (only first is allowed)
  const firstControlPoint = controlPoints[0];
  if (firstControlPoint === null) {
    if (controlPoints.length < 2) {
      throw new Error('a null control point must be passed with one more control points')
    }
    // special handling of a previous bezier curve
    let lastBezierControlPoint = points[points.length - 2];
    if ('lastBezierControlPoint' in geometry) {
      lastBezierControlPoint = geometry.lastBezierControlPoint;
    }
    if (!Array.isArray(lastBezierControlPoint)) {
      throw new Error('the given path must contain TWO or more points if given a null control point')
    }
    // replace the first control point with the mirror of the last bezier control point
    const controlPoint = scale$1(create$9(), points[points.length - 1], 2);
    subtract$1(controlPoint, controlPoint, lastBezierControlPoint);

    controlPoints[0] = controlPoint;
  }

  // add a control point for the previous end point
  controlPoints.unshift(points[points.length - 1]);

  const bezierOrder = controlPoints.length - 1;
  const factorials = [];
  let fact = 1;
  for (let i = 0; i <= bezierOrder; ++i) {
    if (i > 0) fact *= i;
    factorials.push(fact);
  }

  const binomials = [];
  for (let i = 0; i <= bezierOrder; ++i) {
    const binomial = factorials[bezierOrder] / (factorials[i] * factorials[bezierOrder - i]);
    binomials.push(binomial);
  }

  const v0 = create$9();
  const v1 = create$9();
  const v3 = create$b();
  const getPointForT = (t) => {
    let tk = 1; // = pow(t,k)
    let oneMinusTNMinusK = Math.pow(1 - t, bezierOrder); // = pow( 1-t, bezierOrder - k)
    const invOneMinusT = (t !== 1) ? (1 / (1 - t)) : 1;
    const point = create$9(); // 0, 0, 0
    for (let k = 0; k <= bezierOrder; ++k) {
      if (k === bezierOrder) oneMinusTNMinusK = 1;
      const bernsteinCoefficient = binomials[k] * tk * oneMinusTNMinusK;
      const derivativePoint = scale$1(v0, controlPoints[k], bernsteinCoefficient);
      add(point, point, derivativePoint);
      tk *= t;
      oneMinusTNMinusK *= invOneMinusT;
    }
    return point
  };

  const newPoints = [];
  const newPointsT = [];
  const numSteps = bezierOrder + 1;
  for (let i = 0; i < numSteps; ++i) {
    const t = i / (numSteps - 1);
    const point = getPointForT(t);
    newPoints.push(point);
    newPointsT.push(t);
  }

  // subdivide each segment until the angle becomes small enough:
  let subdivideBase = 1;
  const maxAngle = TAU / segments;
  const maxSinAngle = Math.sin(maxAngle);
  while (subdivideBase < newPoints.length - 1) {
    const dir1 = subtract$1(v0, newPoints[subdivideBase], newPoints[subdivideBase - 1]);
    normalize(dir1, dir1);
    const dir2 = subtract$1(v1, newPoints[subdivideBase + 1], newPoints[subdivideBase]);
    normalize(dir2, dir2);
    const sinAngle = cross(v3, dir1, dir2); // the sine of the angle
    if (Math.abs(sinAngle[2]) > maxSinAngle) {
      // angle is too big, we need to subdivide
      const t0 = newPointsT[subdivideBase - 1];
      const t1 = newPointsT[subdivideBase + 1];
      const newt0 = t0 + (t1 - t0) * 1 / 3;
      const newt1 = t0 + (t1 - t0) * 2 / 3;
      const point0 = getPointForT(newt0);
      const point1 = getPointForT(newt1);
      // remove the point at subdivideBase and replace with 2 new points:
      newPoints.splice(subdivideBase, 1, point0, point1);
      newPointsT.splice(subdivideBase, 1, newt0, newt1);
      // reevaluate the angles, starting at the previous junction since it has changed:
      subdivideBase--;
      if (subdivideBase < 1) subdivideBase = 1;
    } else {
      ++subdivideBase;
    }
  }

  // append to the new points to the given path
  // but skip the first new point because it is identical to the last point in the given path
  newPoints.shift();
  const result = appendPoints(newPoints, geometry);
  result.lastBezierControlPoint = controlPoints[controlPoints.length - 2];
  return result
};

/**
  * Determine if the given paths are equal.
  * For closed paths, this includes equality under point order rotation.
  * @param {path2} a - the first path to compare
  * @param {path2} b - the second path to compare
  * @returns {Boolean}
  * @alias module:modeling/geometries/path2.equals
  */
const equals$4 = (a, b) => {
  if (a.isClosed !== b.isClosed) {
    return false
  }
  if (a.points.length !== b.points.length) {
    return false
  }

  const aPoints = toPoints$1(a);
  const bPoints = toPoints$1(b);

  // closed paths might be equal under graph rotation
  // so try comparison by rotating across all points
  const length = aPoints.length;
  let offset = 0;
  do {
    let unequal = false;
    for (let i = 0; i < length; i++) {
      if (!equals$6(aPoints[i], bPoints[(i + offset) % length])) {
        unequal = true;
        break
      }
    }
    if (unequal === false) {
      return true
    }
    // unequal open paths should only be compared once, never rotated
    if (!a.isClosed) {
      return false
    }
  } while (++offset < length)
  return false
};

/**
 * Create a new path from the given compact binary data.
 * @param {TypedArray} data - compact binary data
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.fromCompactBinary
 */
const fromCompactBinary = (data) => {
  if (data[0] !== 2) throw new Error('invalid compact binary data')

  const created = create$5();

  created.transforms = clone$a(data.slice(1, 17));

  created.isClosed = !!data[17];

  for (let i = 22; i < data.length; i += 2) {
    const point = fromValues$2(data[i], data[i + 1]);
    created.points.push(point);
  }
  // transfer known properties, i.e. color
  if (data[18] >= 0) {
    created.color = [data[18], data[19], data[20], data[21]];
  }
  // TODO: how about custom properties or fields ?
  return created
};

/**
 * Determine if the given object is a path2 geometry.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a path2
 * @alias module:modeling/geometries/path2.isA
 */
const isA$2 = (object) => {
  if (object && typeof object === 'object') {
    // see create for the required attributes and types
    if ('points' in object && 'transforms' in object && 'isClosed' in object) {
      // NOTE: transforms should be a TypedArray, which has a read-only length
      if (Array.isArray(object.points) && 'length' in object.transforms) {
        return true
      }
    }
  }
  return false
};

/**
 * Reverses the path so that the points are in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {path2} geometry - the path to reverse
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.reverse
 *
 * @example
 * let newPath = reverse(myPath)
 */
const reverse$4 = (geometry) => {
  // NOTE: this only updates the order of the points
  const cloned = clone$4(geometry);
  cloned.points = geometry.points.slice().reverse();
  return cloned
};

/**
 * Create a string representing the contents of the given path.
 * @param {path2} geometry - the path
 * @returns {String} a representative string
 * @alias module:modeling/geometries/path2.toString
 *
 * @example
 * console.out(toString(path))
 */
const toString$4 = (geometry) => {
  const points = toPoints$1(geometry);
  let result = 'path (' + points.length + ' points, ' + geometry.isClosed + '):\n[\n';
  points.forEach((point) => {
    result += '  ' + toString$9(point) + ',\n';
  });
  result += ']\n';
  return result
};

/**
 * Produce a compact binary representation from the given path.
 * @param {path2} geometry - the path geometry
 * @returns {TypedArray} compact binary representation
 * @alias module:modeling/geometries/path2.toCompactBinary
 */
const toCompactBinary = (geometry) => {
  const points = geometry.points;
  const transforms = geometry.transforms;
  let color = [-1, -1, -1, -1];
  if (geometry.color) color = geometry.color;

  // FIXME why Float32Array?
  const compacted = new Float32Array(1 + 16 + 1 + 4 + (points.length * 2)); // type + transforms + isClosed + color + points data

  compacted[0] = 2; // type code: 0 => geom2, 1 => geom3 , 2 => path2

  compacted[1] = transforms[0];
  compacted[2] = transforms[1];
  compacted[3] = transforms[2];
  compacted[4] = transforms[3];
  compacted[5] = transforms[4];
  compacted[6] = transforms[5];
  compacted[7] = transforms[6];
  compacted[8] = transforms[7];
  compacted[9] = transforms[8];
  compacted[10] = transforms[9];
  compacted[11] = transforms[10];
  compacted[12] = transforms[11];
  compacted[13] = transforms[12];
  compacted[14] = transforms[13];
  compacted[15] = transforms[14];
  compacted[16] = transforms[15];

  compacted[17] = geometry.isClosed ? 1 : 0;

  compacted[18] = color[0];
  compacted[19] = color[1];
  compacted[20] = color[2];
  compacted[21] = color[3];

  for (let j = 0; j < points.length; j++) {
    const ci = j * 2 + 22;
    const point = points[j];
    compacted[ci] = point[0];
    compacted[ci + 1] = point[1];
  }
  // TODO: how about custom properties or fields ?
  return compacted
};

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the points, as this function only adjusts the transforms.
 * The transforms are applied when accessing the points via toPoints().
 * @param {mat4} matrix - the matrix to transform with
 * @param {path2} geometry - the geometry to transform
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.transform
 *
 * @example
 * let newPath = transform(fromZRotation(TAU / 8), path)
 */
const transform$5 = (matrix, geometry) => {
  const transforms = multiply$1(create$c(), matrix, geometry.transforms);
  return Object.assign({}, geometry, { transforms })
};

/**
 * Determine if the given object is a valid path2.
 * Checks for valid data points, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/path2.validate
 */
const validate$1 = (object) => {
  if (!isA$2(object)) {
    throw new Error('invalid path2 structure')
  }

  // check for duplicate points
  if (object.points.length > 1) {
    for (let i = 0; i < object.points.length; i++) {
      if (equals$6(object.points[i], object.points[(i + 1) % object.points.length])) {
        throw new Error(`path2 duplicate points ${object.points[i]}`)
      }
    }
  }

  // check for infinity, nan
  object.points.forEach((point) => {
    if (!point.every(Number.isFinite)) {
      throw new Error(`path2 invalid point ${point}`)
    }
  });

  // check transforms
  if (!object.transforms.every(Number.isFinite)) {
    throw new Error(`path2 invalid transforms ${object.transforms}`)
  }
};

/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @see {@link path2} for data structure information.
 * @module modeling/geometries/path2
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * let myShape = geometries.path2.fromPoints({ closed: true }, [[0,0], [4,0], [4,3]])
 */

var index$k = /*#__PURE__*/Object.freeze({
  __proto__: null,
  appendArc: appendArc,
  appendBezier: appendBezier,
  appendPoints: appendPoints,
  clone: clone$4,
  close: close,
  concat: concat,
  create: create$5,
  equals: equals$4,
  fromPoints: fromPoints$2,
  fromCompactBinary: fromCompactBinary,
  isA: isA$2,
  reverse: reverse$4,
  toPoints: toPoints$1,
  toString: toString$4,
  toCompactBinary: toCompactBinary,
  transform: transform$5,
  validate: validate$1
});

const colorGeom2 = (color, object) => {
  const newGeom2 = clone$b(object);
  newGeom2.color = color;
  return newGeom2
};

const colorGeom3 = (color, object) => {
  const newGeom3 = clone$7(object);
  newGeom3.color = color;
  return newGeom3
};

const colorPath2 = (color, object) => {
  const newPath2 = clone$4(object);
  newPath2.color = color;
  return newPath2
};

const colorPoly3 = (color, object) => {
  const newPoly = clone$6(object);
  newPoly.color = color;
  return newPoly
};

/**
 * Assign the given color to the given objects.
 * @param {Array} color - RGBA color values, where each value is between 0 and 1.0
 * @param {Object|Array} objects - the objects of which to apply the given color
 * @return {Object|Array} new object, or list of new objects with an additional attribute 'color'
 * @alias module:modeling/colors.colorize
 *
 * @example
 * let redSphere = colorize([1,0,0], sphere()) // red
 * let greenCircle = colorize([0,1,0,0.8], circle()) // green transparent
 * let blueArc = colorize([0,0,1], arc()) // blue
 * let wildCylinder = colorize(colorNameToRgb('fuchsia'), cylinder()) // CSS color
 */
const colorize = (color, ...objects) => {
  if (!Array.isArray(color)) throw new Error('color must be an array')
  if (color.length < 3) throw new Error('color must contain R, G and B values')
  if (color.length === 3) color = [color[0], color[1], color[2], 1.0]; // add alpha

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    if (isA$5(object)) return colorGeom2(color, object)
    if (isA$3(object)) return colorGeom3(color, object)
    if (isA$2(object)) return colorPath2(color, object)
    if (isA$4(object)) return colorPoly3(color, object)

    object.color = color;
    return object
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Converts CSS color notations (string of hex values) to RGB values.
 *
 * @see https://www.w3.org/TR/css-color-3/
 * @param {String} notation - color notation
 * @return {Array} RGB color values
 * @alias module:modeling/colors.hexToRgb
 *
 * @example
 * let mySphere = colorize(hexToRgb('#000080'), sphere()) // navy blue
 */
const hexToRgb = (notation) => {
  notation = notation.replace('#', '');
  if (notation.length < 6) throw new Error('the given notation must contain 3 or more hex values')

  const r = parseInt(notation.substring(0, 2), 16) / 255;
  const g = parseInt(notation.substring(2, 4), 16) / 255;
  const b = parseInt(notation.substring(4, 6), 16) / 255;
  if (notation.length >= 8) {
    const a = parseInt(notation.substring(6, 8), 16) / 255;
    return [r, g, b, a]
  }
  return [r, g, b]
};

/**
 * Convert hue values to a color component (ie one of r, g, b)
 * @param  {Number} p
 * @param  {Number} q
 * @param  {Number} t
 * @return {Number} color component
 * @alias module:modeling/colors.hueToColorComponent
 */
const hueToColorComponent = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
};

/**
 * Converts HSL color values to RGB color values.
 *
 * @see http://en.wikipedia.org/wiki/HSL_color_space
 * @param {...Number|Array} values - HSL or HSLA color values
 * @return {Array} RGB or RGBA color values
 * @alias module:modeling/colors.hslToRgb
 *
 * @example
 * let mySphere = colorize(hslToRgb([0.9166666666666666, 1, 0.5]), sphere())
 */
const hslToRgb = (...values) => {
  values = flatten(values);
  if (values.length < 3) throw new Error('values must contain H, S and L values')

  const h = values[0];
  const s = values[1];
  const l = values[2];

  let r = l; // default is achromatic
  let g = l;
  let b = l;

  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToColorComponent(p, q, h + 1 / 3);
    g = hueToColorComponent(p, q, h);
    b = hueToColorComponent(p, q, h - 1 / 3);
  }

  if (values.length > 3) {
    // add alpha value if provided
    const a = values[3];
    return [r, g, b, a]
  }
  return [r, g, b]
};

/**
 * Converts HSV color values to RGB color values.
 *
 * @see http://en.wikipedia.org/wiki/HSV_color_space.
 * @param {...Number|Array} values - HSV or HSVA color values
 * @return {Array} RGB or RGBA color values
 * @alias module:modeling/colors.hsvToRgb
 *
 * @example
 * let mySphere = colorize(hsvToRgb([0.9166666666666666, 1, 1]), sphere())
 */
const hsvToRgb = (...values) => {
  values = flatten(values);
  if (values.length < 3) throw new Error('values must contain H, S and V values')

  const h = values[0];
  const s = values[1];
  const v = values[2];

  let r = 0;
  let g = 0;
  let b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break
    case 1:
      r = q;
      g = v;
      b = p;
      break
    case 2:
      r = p;
      g = v;
      b = t;
      break
    case 3:
      r = p;
      g = q;
      b = v;
      break
    case 4:
      r = t;
      g = p;
      b = v;
      break
    case 5:
      r = v;
      g = p;
      b = q;
      break
  }

  if (values.length > 3) {
    // add alpha value if provided
    const a = values[3];
    return [r, g, b, a]
  }
  return [r, g, b]
};

/**
 * Convert the given RGB color values to CSS color notation (string)
 * @see https://www.w3.org/TR/css-color-3/
 * @param {...Number|Array} values - RGB or RGBA color values
 * @return {String} CSS color notation
 * @alias module:modeling/colors.rgbToHex
 */
const rgbToHex = (...values) => {
  values = flatten(values);
  if (values.length < 3) throw new Error('values must contain R, G and B values')

  const r = values[0] * 255;
  const g = values[1] * 255;
  const b = values[2] * 255;

  let s = `#${Number(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).substring(1, 7)}`;

  if (values.length > 3) {
    // convert alpha to opacity
    s = s + Number(values[3] * 255).toString(16);
  }
  return s
};

/**
 * Converts an RGB color value to HSL.
 *
 * @see http://en.wikipedia.org/wiki/HSL_color_space.
 * @see http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * @param {...Number|Array} values - RGB or RGBA color values
 * @return {Array} HSL or HSLA color values
 * @alias module:modeling/colors.rgbToHsl
 */
const rgbToHsl = (...values) => {
  values = flatten(values);
  if (values.length < 3) throw new Error('values must contain R, G and B values')

  const r = values[0];
  const g = values[1];
  const b = values[2];

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break
      case g:
        h = (b - r) / d + 2;
        break
      case b:
        h = (r - g) / d + 4;
        break
    }
    h /= 6;
  }

  if (values.length > 3) {
    // add alpha value if provided
    const a = values[3];
    return [h, s, l, a]
  }
  return [h, s, l]
};

/**
 * Converts an RGB color value to HSV.
 *
 * @see http://en.wikipedia.org/wiki/HSV_color_space.
 * @param {...Number|Array} values - RGB or RGBA color values
 * @return {Array} HSV or HSVA color values
 * @alias module:modeling/colors.rgbToHsv
 */
const rgbToHsv = (...values) => {
  values = flatten(values);
  if (values.length < 3) throw new Error('values must contain R, G and B values')

  const r = values[0];
  const g = values[1];
  const b = values[2];

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  const v = max;

  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break
      case g:
        h = (b - r) / d + 2;
        break
      case b:
        h = (r - g) / d + 4;
        break
    }
    h /= 6;
  }

  if (values.length > 3) {
    // add alpha if provided
    const a = values[3];
    return [h, s, v, a]
  }
  return [h, s, v]
};

/**
 * All shapes (primitives or the results of operations) can be assigned a color (RGBA).
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/colors
 * @example
 * import { colors } from '@jscad/modeling'
 * const { colorize, cssColors } = colors
 */

var index$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  colorNameToRgb: colorNameToRgb,
  colorize: colorize,
  cssColors: cssColors,
  hexToRgb: hexToRgb,
  hslToRgb: hslToRgb,
  hsvToRgb: hsvToRgb,
  hueToColorComponent: hueToColorComponent,
  rgbToHex: rgbToHex,
  rgbToHsl: rgbToHsl,
  rgbToHsv: rgbToHsv
});

/**
 * Represents a Bézier easing function.
 * @typedef {Object} bezier
 * @property {Array} points - The control points for the Bézier curve. The first and last point will also be the start and end of the curve
 * @property {string} pointType - A reference to the type and dimensionality of the points that the curve was created from
 * @property {number} dimensions - The dimensionality of the bezier
 * @property {Array} permutations - A pre-calculation of the bezier algorithm's co-efficients
 * @property {Array} tangentPermutations - A pre-calculation of the bezier algorithm's tangent co-efficients
 *
 */

/**
 * Creates an object representing a bezier easing curve.
 * Curves can have both an arbitrary number of control points, and an arbitrary number of dimensions.
 *
 * @example
 * const b = bezier.create([0,10]) // a linear progression from 0 to 10
 * const b = bezier.create([0, 0, 10, 10]) // a symmetrical cubic easing curve that starts slowly and ends slowly from 0 to 10
 * const b = bezier.create([0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * // Usage
 * let position = bezier.valueAt(t,b) // where 0 < t < 1
 * let tangent = bezier.tangentAt(t,b) // where 0 < t < 1
 *
 * @param {Array} points An array with at least 2 elements of either all numbers, or all arrays of numbers that are the same size.
 * @returns {bezier} a new bezier data object
 * @alias module:modeling/curves/bezier.create
 */
const create$4 = (points) => {
  if (!Array.isArray(points)) throw new Error('Bezier points must be a valid array/')
  if (points.length < 2) throw new Error('Bezier points must contain at least 2 values.')
  const pointType = getPointType(points);

  return {
    points: points,
    pointType: pointType,
    dimensions: pointType === 'float_single' ? 0 : points[0].length,
    permutations: getPermutations(points.length - 1),
    tangentPermutations: getPermutations(points.length - 2)
  }
};

const getPointType = function (points) {
  let firstPointType = null;
  points.forEach((point) => {
    let pType = '';
    if (Number.isFinite(point)) {
      pType = 'float_single';
    } else if (Array.isArray(point)) {
      point.forEach((val) => {
        if (!Number.isFinite(val)) throw new Error('Bezier point values must all be numbers.')
      });
      pType = 'float_' + point.length;
    } else throw new Error('Bezier points must all be numbers or arrays of number.')
    if (firstPointType == null) {
      firstPointType = pType;
    } else {
      if (firstPointType !== pType) {
        throw new Error('Bezier points must be either all numbers or all arrays of numbers of the same size.')
      }
    }
  });
  return firstPointType
};

const getPermutations = function (c) {
  const permutations = [];
  for (let i = 0; i <= c; i++) {
    permutations.push(factorial(c) / (factorial(i) * factorial(c - i)));
  }
  return permutations
};

const factorial = function (b) {
  let out = 1;
  for (let i = 2; i <= b; i++) {
    out *= i;
  }
  return out
};

/**
 * Calculates the value at a specific position along a bezier easing curve.
 * For multidimensional curves, the tangent is the slope of each dimension at that point.
 * See the example called extrudeAlongPath.js to see this in use.
 * Math and explanation comes from {@link https://www.freecodecamp.org/news/nerding-out-with-bezier-curves-6e3c0bc48e2f/}
 *
 * @example
 * const b = bezier.create([0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * let position = bezier.valueAt(t,b) // where 0 < t < 1
 *
 * @param {number} t : the position of which to calculate the value; 0 < t < 1
 * @param {Object} bezier : a Bézier curve created with bezier.create().
 * @returns {array | number} the value at the requested position.
 * @alias module:modeling/curves/bezier.valueAt
 */
const valueAt = (t, bezier) => {
  if (t < 0 || t > 1) {
    throw new Error('Bezier valueAt() input must be between 0 and 1')
  }
  if (bezier.pointType === 'float_single') {
    return bezierFunction(bezier, bezier.points, t)
  } else {
    const result = [];
    for (let i = 0; i < bezier.dimensions; i++) {
      const singleDimensionPoints = [];
      for (let j = 0; j < bezier.points.length; j++) {
        singleDimensionPoints.push(bezier.points[j][i]);
      }
      result.push(bezierFunction(bezier, singleDimensionPoints, t));
    }
    return result
  }
};

const bezierFunction = function (bezier, p, t) {
  const n = p.length - 1;
  let result = 0;
  for (let i = 0; i <= n; i++) {
    result += bezier.permutations[i] * Math.pow(1 - t, n - i) * Math.pow(t, i) * p[i];
  }
  return result
};

/**
 * Calculates the tangent at a specific position along a bezier easing curve.
 * For multidimensional curves, the tangent is the slope of each dimension at that point.
 * See the example called extrudeAlongPath.js
 *
 * @example
 * const b = bezier.create([[0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * let tangent = bezier.tangentAt(t, b)
 *
 * @param {number} t : the position of which to calculate the bezier's tangent value; 0 < t < 1
 * @param {Object} bezier : an array with at least 2 elements of either all numbers, or all arrays of numbers that are the same size.
 * @return {array | number} the tangent at the requested position.
 * @alias module:modeling/curves/bezier.tangentAt
 */
const tangentAt = (t, bezier) => {
  if (t < 0 || t > 1) {
    throw new Error('Bezier tangentAt() input must be between 0 and 1')
  }
  if (bezier.pointType === 'float_single') {
    return bezierTangent(bezier, bezier.points, t)
  } else {
    const result = [];
    for (let i = 0; i < bezier.dimensions; i++) {
      const singleDimensionPoints = [];
      for (let j = 0; j < bezier.points.length; j++) {
        singleDimensionPoints.push(bezier.points[j][i]);
      }
      result.push(bezierTangent(bezier, singleDimensionPoints, t));
    }
    return result
  }
};

const bezierTangent = function (bezier, p, t) {
  // from https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-der.html
  const n = p.length - 1;
  let result = 0;
  for (let i = 0; i < n; i++) {
    const q = n * (p[i + 1] - p[i]);
    result += bezier.tangentPermutations[i] * Math.pow(1 - t, n - 1 - i) * Math.pow(t, i) * q;
  }
  return result
};

/**
 * Represents a bezier easing function.
 * @see {@link bezier} for data structure information.
 * @module modeling/curves/bezier
 * @example
 * import { curves } from '@jscad/modeling'
 * const { bezier } = curves
 */

var index$i = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$4,
  valueAt: valueAt,
  tangentAt: tangentAt
});

/**
 * Curves are n-dimensional mathematical constructs that define a path from vertex 0 to vertex 1.
 * @module modeling/curves
 * @example
 * import { curves } from '@jscad/modeling'
 * const { bezier } = curves
 */

var index$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  bezier: index$i
});

/**
 * Calculate the area under the given points.
 * @param {Array} points - list of 2D points
 * @return {Number} area under the given points
 * @alias module:modeling/maths/utils.area
 */
const area$1 = (points) => {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i][0] * points[j][1];
    area -= points[j][0] * points[i][1];
  }
  return (area / 2.0)
};

/**
 * Measure the area under the given polygon.
 *
 * @param {poly2} polygon - the polygon to measure
 * @return {Number} the area of the polygon
 * @alias module:modeling/geometries/poly2.measureArea
 */
const measureArea$1 = (polygon) => area$1(polygon.points);

/**
 * Represents a 2D polygon consisting of a list of ordered points
 * which is closed between start and end points.
 * @see https://en.wikipedia.org/wiki/Polygon
 * @typedef {Object} poly2
 * @property {Array} points - list of ordered points (2D)
 */

/**
 * Creates a new polygon with initial values.
 *
 * @param {Array} [points] - list of points (2D)
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.create
 *
 * @example
 * let polygon = create([[0,0], [4,0], [4,3]])
 */
const create$3 = (points) => {
  if (points === undefined || points.length < 3) {
    points = []; // empty contents
  }
  return { points }
};

/**
 * Reverse the direction of points in the given polygon, rotating the opposite direction.
 *
 * @param {poly2} polygon - the polygon to reverse
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.reverse
 */
const reverse$3 = (polygon) => {
  const points = polygon.points.slice().reverse();
  return create$3(points)
};

/**
 * Determine if the given points are inside the given polygon.
 *
 * @param {Array} points - a list of points, where each point is an array with X and Y values
 * @param {poly2} polygon - a 2D polygon
 * @return {number} 1 if all points are inside, 0 if some or none are inside
 * @alias module:modeling/geometries/poly2.arePointsInside
 */
const arePointsInside = (points, polygon) => {
  if (points.length === 0) return 0 // nothing to check

  if (polygon.points.length < 3) return 0 // nothing can be inside an empty polygon

  if (measureArea$1(polygon) < 0) {
    polygon = reverse$3(polygon); // CCW is required
  }

  const sum = points.reduce((acc, point) => acc + isPointInside(point, polygon.points), 0);
  return sum === points.length ? 1 : 0
};

/*
 * Determine if the given point is inside the polygon.
 *
 * @see http://erich.realtimerendering.com/ptinpoly/ (Crossings Test)
 * @param {Array} point - an array with X and Y values
 * @param {Array} polygon - a list of points, where each point is an array with X and Y values
 * @return {Integer} 1 if the point is inside, 0 if outside
 */
const isPointInside = (point, polygon) => {
  const numPoints = polygon.length;

  const tx = point[0];
  const ty = point[1];

  let vtx0 = polygon[numPoints - 1];
  let vtx1 = polygon[0];

  let yFlag0 = (vtx0[1] > ty);

  let insideFlag = 0;

  let i = 0;
  for (let j = (numPoints + 1); --j;) {
    /*
     * check if Y endpoints straddle (are on opposite sides) of point's Y
     * if so, +X ray could intersect this edge.
     */
    const yFlag1 = (vtx1[1] > ty);
    if (yFlag0 !== yFlag1) {
      /*
       * check if X endpoints are on same side of the point's X
       * if so, it's easy to test if edge hits or misses.
       */
      const xFlag0 = (vtx0[0] > tx);
      const xFlag1 = (vtx1[0] > tx);
      if (xFlag0 && xFlag1) {
        /* if edge's X values are both right of the point, then the point must be inside */
        insideFlag = !insideFlag;
      } else {
        /*
         * if X endpoints straddle the point, then
         * compute the intersection of polygon edge with +X ray
         * if intersection >= point's X then the +X ray hits it.
         */
        if ((vtx1[0] - (vtx1[1] - ty) * (vtx0[0] - vtx1[0]) / (vtx0[1] - vtx1[1])) >= tx) {
          insideFlag = !insideFlag;
        }
      }
    }
    /* move to next pair of points, retaining info as possible */
    yFlag0 = yFlag1;
    vtx0 = vtx1;
    vtx1 = polygon[++i];
  }
  return insideFlag
};

/**
 * Create a shallow clone of the given polygon.
 *
 * @param {poly2} polygon - polygon to clone
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.clone
 */
const clone$3 = (polygon) => Object.assign({}, polygon);

/**
 * Determine if the given object is a 2D polygon.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a poly2
 * @alias module:modeling/geometries/poly2.isA
 */
const isA$1 = (object) => {
  if (object && typeof object === 'object') {
    if ('points' in object) {
      if (Array.isArray(object.points)) {
        return true
      }
    }
  }
  return false
};

/**
 * Check whether the given polygon is convex.
 * @param {poly2} polygon - the polygon to interrogate
 * @returns {Boolean} true if convex
 * @alias module:modeling/geometries/poly2.isConvex
 */
const isConvex = (polygon) => {
  const numPoints = polygon.points.length;
  if (numPoints > 2) {
    const points = polygon.points;
    let prev = 0;
    let curr = 0;
    for (let i = 0; i < numPoints; i++) {
      curr = crossBetweenSegments(points[i], points[(i + 1) % numPoints], points[(i + 2) % numPoints]);
      if (curr !== 0) {
        // sum angle of crosses, looking for a change in direction
        if (curr * prev < 0) {
          return false
        }
        prev = curr;
      }
    }
  }
  return true
};

/*
 * Calculate cross product between two consecutive line segments; p1 -> p2, p2 -> p3.
 */
const crossBetweenSegments = (p1, p2, p3) => {
  const X1 = p2[0] - p1[0];
  const Y1 = p2[1] - p1[1];
  const X2 = p3[0] - p1[0];
  const Y2 = p3[1] - p1[1];

  return (X1 * Y2 - Y1 * X2)
};

/**
 * Check whether the given polygon is simple, i.e. does not intersect itself.
 * @see https://en.wikipedia.org/wiki/Simple_polygon
 * @param {poly2} polygon - the polygon to interrogate
 * @returns {Boolean} true if simple
 * @alias module:modeling/geometries/poly2.isSimple
 */
const isSimple = (polygon) => {
  const numPoints = polygon.points.length;
  if (numPoints < 3) return false // only polygons with an areas are simple

  if (numPoints === 3) return true // triangles are simple

  const points = polygon.points;

  // proof one: there are N unique points
  const found = new Set();
  points.forEach((v) => found.add(v.toString()));
  if (found.size !== numPoints) return false

  // proof two: line segments do not cross
  for (let i = 0; i < numPoints; i++) {
    for (let j = i + 2; j < numPoints; j++) {
      const k = (j + 1) % numPoints;
      if (i !== k) {
        const s0 = points[i];
        const s1 = points[(i + 1) % numPoints];
        const z0 = points[j];
        const z1 = points[k];
        const ip = intersect$1(s0, s1, z0, z1);
        if (ip) return false
      }
    }
  }
  return true
};

/**
 * @param {poly2} polygon - the polygon to measure
 * @returns {Array} an array of two vectors (2D);  minimum and maximum coordinates
 * @alias module:modeling/geometries/poly2.measureBoundingBox
 */
const measureBoundingBox$1 = (polygon) => {
  const points = polygon.points;
  const numPoints = points.length;
  const min = numPoints === 0 ? create$9() : clone$8(points[0]);
  const max = clone$8(min);
  for (let i = 1; i < numPoints; i++) {
    min$1(min, min, points[i]);
    max$1(max, max, points[i]);
  }
  return [min, max]
};

/**
 * Return the given polygon as a list of points.
 * NOTE: The returned array should not be modified as the points are shared with the geometry.
 * @param {poly2} polygon - the polygon
 * @return {Array} list of points (2D)
 * @alias module:modeling/geometries/poly2.toPoints
 */
const toPoints = (polygon) => polygon.points;

/**
 * Convert the given polygon to a readable string.
 * @param {poly2} polygon - the polygon to convert
 * @return {String} the string representation
 * @alias module:modeling/geometries/poly2.toString
 */
const toString$3 = (polygon) => `poly2: [${polygon.points.map(toString$9).join(', ')}]`;

/**
 * Transform the given polygon using the given matrix.
 * @param {mat4} matrix - the matrix to transform with
 * @param {poly2} polygon - the polygon to transform
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.transform
 */
const transform$4 = (matrix, polygon) => {
  const points = polygon.points.map((point) => transform$b(create$9(), point, matrix));
  if (isMirroring(matrix)) {
    // reverse the order to preserve the orientation
    points.reverse();
  }
  return create$3(points)
};

/**
 * Determine if the given object is a valid polygon.
 * Checks for valid data structure, convex polygons, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/poly2.validate
 */
const validate = (object) => {
  if (!isA$1(object)) {
    throw new Error('invalid poly2 structure')
  }

  // check for empty polygon
  if (object.points.length < 3) {
    throw new Error(`poly2 not enough points ${object.points.length}`)
  }
  // check area
  if (measureArea$1(object) <= 0) {
    throw new Error('poly2 area must be greater than zero')
  }

  // check for duplicate points
  for (let i = 0; i < object.points.length; i++) {
    if (equals$6(object.points[i], object.points[(i + 1) % object.points.length])) {
      throw new Error(`poly2 duplicate point at ${i}: [${object.points[i]}]`)
    }
  }

  // check for infinity, nan
  object.points.forEach((point) => {
    if (point.length !== 2) {
      throw new Error(`poly2 invalid point ${point}`)
    }
    if (!point.every(Number.isFinite)) {
      throw new Error(`poly2 invalid point ${point}`)
    }
  });
};

/**
 * Represents a 2D polygon consisting of a list of ordered points.
 * @see {@link poly2} for data structure information.
 * @module modeling/geometries/poly2
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const p1 = geometries.poly2.create([[0,0], [4,0], [4,3]])
 */

var index$g = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arePointsInside: arePointsInside,
  clone: clone$3,
  create: create$3,
  isA: isA$1,
  isConvex: isConvex,
  isSimple: isSimple,
  measureArea: measureArea$1,
  measureBoundingBox: measureBoundingBox$1,
  reverse: reverse$3,
  toPoints: toPoints,
  toString: toString$3,
  transform: transform$4,
  validate: validate
});

/**
 * Calculate the plane of the given slice.
 * NOTE: The slice (and all vertices) are assumed to be planar from the beginning.
 * @param {slice} slice - the slice
 * @returns {plane} the plane of the slice
 * @alias module:modeling/geometries/slice.calculatePlane
 *
 * @example
 * let myPlane = calculatePlane(slice)
 */
const calculatePlane = (slice) => {
  if (slice.contours < 1) throw new Error('slices must have at least one contour to calculate a plane')

  // find the middle of the slice, which will lie on the plane by definition
  const middle = create$b();
  let n = 0; // number of vertices
  slice.contours.forEach((contour) => {
    contour.forEach((vertex) => {
      add$1(middle, middle, vertex);
      n++;
    });
  });
  scale$3(middle, middle, 1 / n);

  // find the farthest edge from the middle, which will be on an outside edge
  let farthestContour;
  let farthestBefore;
  let farthestVertex;
  let distance = 0;
  slice.contours.forEach((contour) => {
    let prev = contour[contour.length - 1];
    contour.forEach((vertex) => {
      // make sure that the farthest edge is not a self-edge
      if (!equals$7(prev, vertex)) {
        const d = squaredDistance$1(middle, vertex);
        if (d > distance) {
          farthestContour = contour;
          farthestBefore = prev;
          farthestVertex = vertex;
          distance = d;
        }
      }
      prev = vertex;
    });
  });

  // find the after vertex
  let farthestAfter;
  let prev = farthestContour[farthestContour.length - 1];
  for (let i = 0; i < farthestContour.length; i++) {
    const vertex = farthestContour[i];
    if (!equals$7(prev, vertex) && equals$7(prev, farthestVertex)) {
      farthestAfter = vertex;
      break
    }
    prev = vertex;
  }

  return fromPoints$4(create$6(), farthestBefore, farthestVertex, farthestAfter)
};

/**
 * Create a deep clone of the given slice.
 *
 * @param {slice} slice - slice to clone
 * @returns {slice} a new slice
 * @alias module:modeling/geometries/slice.clone
 */
const clone$2 = (slice) => Object.assign({}, slice);

/**
 * Represents a 3D geometry consisting of a list of contours,
 * where each contour consists of a list of planar vertices.
 * @typedef {Object} slice
 * @property {Array} contours - list of contours, each contour containing a list of 3D vertices
 * @example
 * {"contours": [[[0,0,1], [4,0,1], [4,3,1]]]}
 */

/**
 * Creates a new slice from the given contours.
 *
 * @param {Array} [contours] - a list of contours, where each contour contains a list of vertices (3D)
 * @returns {slice} a new slice
 * @alias module:modeling/geometries/slice.create
 * @example
 * const slice = create([ [[0,0,1], [4,0,1], [4,3,1]] ])
 */
const create$2 = (contours = []) => ({ contours });

/**
 * Determine if the given slices have the same contours.
 * @param {slice} a - the first slice to compare
 * @param {slice} b - the second slice to compare
 * @returns {Boolean} true if the slices are equal
 * @alias module:modeling/geometries/slice.equals
 */
const equals$3 = (a, b) => {
  if (a.contours.length !== b.contours.length) {
    return false
  }

  const len = a.contours.length;
  for (let i = 0; i < len; i++) {
    const aVertex = a.contours[i];
    for (let j = 0; j < len; j++) {
      const bVertex = b.contours[j];
      if (!equals$7(aVertex, bVertex)) {
        return false
      }
    }
  }

  return true
};

/**
 * Create a slice from a geom2.
 *
 * @param {Object} geometry - the 2D geometry to create a slice from
 * @returns {slice} a new slice
 * @alias module:modeling/geometries/slice.fromGeom2
 */
const fromGeom2 = (geometry) => {
  // Convert from 2D points to 3D vertices
  const contours = toOutlines(geometry).map((outline) => outline.map((point) => fromVec2(create$b(), point)));
  return create$2(contours)
};

/**
 * Create a slice from the given vertices.
 *
 * @param {Array} vertices - list of vertices, where each vertex is either 2D or 3D
 * @returns {slice} a new slice
 * @alias module:modeling/geometries/slice.fromVertices
 *
 * @example
 * const vertices = [
 *   [0,  0, 3],
 *   [0, 10, 3],
 *   [0, 10, 6]
 * ]
 * const slice = fromVertices(vertices)
 */
const fromVertices = (vertices) => {
  if (!Array.isArray(vertices)) throw new Error('the given vertices must be an array')
  if (vertices.length < 3) throw new Error('the given vertices must contain THREE or more vertices')

  // Convert from 2D points to 3D vertices if needed
  const cloned = vertices.map((vertex) => {
    if (vertex.length === 3) {
      return vertex
    } else {
      return fromVec2(create$b(), vertex)
    }
  });
  // create a slice with one contour containing all vertices
  return create$2([cloned])
};

/**
 * Determine if the given object is a slice.
 * @param {slice} object - the object to interrogate
 * @returns {Boolean} true if the object matches a slice
 * @alias module:modeling/geometries/slice.isA
 */
const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('contours' in object) {
      if (Array.isArray(object.contours)) {
        return true
      }
    }
  }
  return false
};

/**
 * Reverse the edges of the given slice.
 *
 * @param {slice} slice - slice to reverse
 * @returns {slice} reverse of the slice
 * @alias module:modeling/geometries/slice.reverse
 */
const reverse$2 = (slice) => {
  // reverse each contour
  const contours = slice.contours.map((contour) => contour.slice().reverse());
  return create$2(contours)
};

/**
 * Produces an array of edges from the given slice.
 * The returned array should not be modified as the data is shared with the slice.
 * @param {slice} slice - the slice
 * @returns {Array} an array of edges, each edge contains an array of two vertices (3D)
 * @alias module:modeling/geometries/slice.toEdges
 *
 * @example
 * let sharedEdges = toEdges(slice)
 */
const toEdges = (slice) => {
  const edges = [];
  slice.contours.forEach((contour) => {
    contour.forEach((vertex, i) => {
      const next = contour[(i + 1) % contour.length];
      edges.push([vertex, next]);
    });
  });
  return edges
};

/**
 * Produces an array of vertices from the given slice.
 * The returned array should not be modified as the data is shared with the slice.
 * @param {slice} slice - the slice
 * @returns {Array} an array of 3D vertices
 * @alias module:modeling/geometries/slice.toVertices
 *
 * @example
 * let sharedVertices = toVertices(slice)
 */
const toVertices = (slice) => {
  const vertices = [];
  slice.contours.forEach((contour) => {
    contour.forEach((vertex) => {
      vertices.push(vertex);
    });
  });
  return vertices
};

class Node$2 {
  constructor (i, x, y) {
    // vertex index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertex nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
  }
}

/*
 * create a node and optionally link it with previous one (in a circular doubly linked list)
 */
const insertNode = (i, x, y, last) => {
  const p = new Node$2(i, x, y);

  if (!last) {
    p.prev = p;
    p.next = p;
  } else {
    p.next = last.next;
    p.prev = last;
    last.next.prev = p;
    last.next = p;
  }

  return p
};

/*
 * remove a node and join prev with next nodes
 */
const removeNode = (p) => {
  p.next.prev = p.prev;
  p.prev.next = p.next;

  if (p.prevZ) p.prevZ.nextZ = p.nextZ;
  if (p.nextZ) p.nextZ.prevZ = p.prevZ;
};

/*
 * check if a point lies within a convex triangle
 */
const pointInTriangle = (ax, ay, bx, by, cx, cy, px, py) => (
  (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
      (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
      (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0
);

/*
 * signed area of a triangle
 */
const area = (p, q, r) => (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

/*
 * create a circular doubly linked list from polygon points in the specified winding order
 */
const linkedPolygon = (data, start, end, dim, clockwise) => {
  let last;

  if (clockwise === (signedArea$1(data, start, end, dim) > 0)) {
    for (let i = start; i < end; i += dim) {
      last = insertNode(i, data[i], data[i + 1], last);
    }
  } else {
    for (let i = end - dim; i >= start; i -= dim) {
      last = insertNode(i, data[i], data[i + 1], last);
    }
  }

  if (last && equals$2(last, last.next)) {
    removeNode(last);
    last = last.next;
  }

  return last
};

/*
 * eliminate colinear or duplicate points
 */
const filterPoints = (start, end) => {
  if (!start) return start
  if (!end) end = start;

  let p = start;
  let again;
  do {
    again = false;

    if (!p.steiner && (equals$2(p, p.next) || area(p.prev, p, p.next) === 0)) {
      removeNode(p);
      p = end = p.prev;
      if (p === p.next) break
      again = true;
    } else {
      p = p.next;
    }
  } while (again || p !== end)

  return end
};

/*
 * go through all polygon nodes and cure small local self-intersections
 */
const cureLocalIntersections = (start, triangles, dim) => {
  let p = start;
  do {
    const a = p.prev;
    const b = p.next.next;

    if (!equals$2(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
      triangles.push(a.i / dim);
      triangles.push(p.i / dim);
      triangles.push(b.i / dim);

      // remove two nodes involved
      removeNode(p);
      removeNode(p.next);

      p = start = b;
    }

    p = p.next;
  } while (p !== start)

  return filterPoints(p)
};

/*
 * check if a polygon diagonal intersects any polygon segments
 */
const intersectsPolygon = (a, b) => {
  let p = a;
  do {
    if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
        intersects(p, p.next, a, b)) return true
    p = p.next;
  } while (p !== a)

  return false
};

/*
 * check if a polygon diagonal is locally inside the polygon
 */
const locallyInside = (a, b) => area(a.prev, a, a.next) < 0
  ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0
  : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;

/*
 * check if the middle point of a polygon diagonal is inside the polygon
 */
const middleInside = (a, b) => {
  let p = a;
  let inside = false;
  const px = (a.x + b.x) / 2;
  const py = (a.y + b.y) / 2;
  do {
    if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
        (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x)) { inside = !inside; }
    p = p.next;
  } while (p !== a)

  return inside
};

/*
 * link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two
 * if one belongs to the outer ring and another to a hole, it merges it into a single ring
 */
const splitPolygon = (a, b) => {
  const a2 = new Node$2(a.i, a.x, a.y);
  const b2 = new Node$2(b.i, b.x, b.y);
  const an = a.next;
  const bp = b.prev;

  a.next = b;
  b.prev = a;

  a2.next = an;
  an.prev = a2;

  b2.next = a2;
  a2.prev = b2;

  bp.next = b2;
  b2.prev = bp;

  return b2
};

/*
 * check if a diagonal between two polygon nodes is valid (lies in polygon interior)
 */
const isValidDiagonal = (a, b) => a.next.i !== b.i &&
    a.prev.i !== b.i &&
    !intersectsPolygon(a, b) && // doesn't intersect other edges
    (
      locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
        (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
        equals$2(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0
    );

/*
 * check if two segments intersect
 */
const intersects = (p1, q1, p2, q2) => {
  const o1 = Math.sign(area(p1, q1, p2));
  const o2 = Math.sign(area(p1, q1, q2));
  const o3 = Math.sign(area(p2, q2, p1));
  const o4 = Math.sign(area(p2, q2, q1));

  if (o1 !== o2 && o3 !== o4) return true // general case

  if (o1 === 0 && onSegment(p1, p2, q1)) return true // p1, q1 and p2 are colinear and p2 lies on p1q1
  if (o2 === 0 && onSegment(p1, q2, q1)) return true // p1, q1 and q2 are colinear and q2 lies on p1q1
  if (o3 === 0 && onSegment(p2, p1, q2)) return true // p2, q2 and p1 are colinear and p1 lies on p2q2
  if (o4 === 0 && onSegment(p2, q1, q2)) return true // p2, q2 and q1 are colinear and q1 lies on p2q2

  return false
};

/*
 * for colinear points p, q, r, check if point q lies on segment pr
 */
const onSegment = (p, q, r) => q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y);

const signedArea$1 = (data, start, end, dim) => {
  let sum = 0;
  for (let i = start, j = end - dim; i < end; i += dim) {
    sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
    j = i;
  }

  return sum
};

/*
 * check if two points are equal
 */
const equals$2 = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

/*
 * link every hole into the outer loop, producing a single-ring polygon without holes
 *
 * Original source from https://github.com/mapbox/earcut
 * Copyright (c) 2016 Mapbox
 */
const eliminateHoles = (data, holeIndices, outerNode, dim) => {
  const queue = [];

  for (let i = 0, len = holeIndices.length; i < len; i++) {
    const start = holeIndices[i] * dim;
    const end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
    const list = linkedPolygon(data, start, end, dim, false);
    if (list === list.next) list.steiner = true;
    queue.push(getLeftmost(list));
  }

  queue.sort((a, b) => a.x - b.x); // compare X

  // process holes from left to right
  for (let i = 0; i < queue.length; i++) {
    outerNode = eliminateHole(queue[i], outerNode);
    outerNode = filterPoints(outerNode, outerNode.next);
  }

  return outerNode
};

/*
 * find a bridge between vertices that connects hole with an outer ring and link it
 */
const eliminateHole = (hole, outerNode) => {
  const bridge = findHoleBridge(hole, outerNode);
  if (!bridge) {
    return outerNode
  }

  const bridgeReverse = splitPolygon(bridge, hole);

  // filter colinear points around the cuts
  const filteredBridge = filterPoints(bridge, bridge.next);
  filterPoints(bridgeReverse, bridgeReverse.next);

  // Check if input node was removed by the filtering
  return outerNode === bridge ? filteredBridge : outerNode
};

/*
 * David Eberly's algorithm for finding a bridge between hole and outer polygon
 */
const findHoleBridge = (hole, outerNode) => {
  let p = outerNode;
  const hx = hole.x;
  const hy = hole.y;
  let qx = -Infinity;
  let m;

  // find a segment intersected by a ray from the hole's leftmost point to the left
  // segment's endpoint with lesser x will be potential connection point
  do {
    if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
      const x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
      if (x <= hx && x > qx) {
        qx = x;
        if (x === hx) {
          if (hy === p.y) return p
          if (hy === p.next.y) return p.next
        }

        m = p.x < p.next.x ? p : p.next;
      }
    }

    p = p.next;
  } while (p !== outerNode)

  if (!m) return null

  if (hx === qx) return m // hole touches outer segment; pick leftmost endpoint

  // look for points inside the triangle of hole point, segment intersection and endpoint
  // if there are no points found, we have a valid connection
  // otherwise choose the point of the minimum angle with the ray as connection point

  const stop = m;
  const mx = m.x;
  const my = m.y;
  let tanMin = Infinity;

  p = m;

  do {
    if (hx >= p.x && p.x >= mx && hx !== p.x &&
        pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
      const tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

      if (locallyInside(p, hole) && (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
        m = p;
        tanMin = tan;
      }
    }

    p = p.next;
  } while (p !== stop)

  return m
};

/*
 * whether sector in vertex m contains sector in vertex p in the same coordinates
 */
const sectorContainsSector = (m, p) => area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;

/*
 * find the leftmost node of a polygon ring
 */
const getLeftmost = (start) => {
  let p = start;
  let leftmost = start;
  do {
    if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p;
    p = p.next;
  } while (p !== start)

  return leftmost
};

// Simon Tatham's linked list merge sort algorithm
// https://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
const linkedListSort = (list, fn) => {
  let i, p, q, e, numMerges;
  let inSize = 1;

  do {
    p = list;
    list = null;
    let tail = null;
    numMerges = 0;

    while (p) {
      numMerges++;
      q = p;
      let pSize = 0;
      for (i = 0; i < inSize; i++) {
        pSize++;
        q = q.nextZ;
        if (!q) break
      }

      let qSize = inSize;

      while (pSize > 0 || (qSize > 0 && q)) {
        if (pSize !== 0 && (qSize === 0 || !q || fn(p) <= fn(q))) {
          e = p;
          p = p.nextZ;
          pSize--;
        } else {
          e = q;
          q = q.nextZ;
          qSize--;
        }

        if (tail) tail.nextZ = e;
        else list = e;

        e.prevZ = tail;
        tail = e;
      }

      p = q;
    }

    tail.nextZ = null;
    inSize *= 2;
  } while (numMerges > 1)

  return list
};

/*
 * An implementation of the earcut polygon triangulation algorithm.
 *
 * Original source from https://github.com/mapbox/earcut
 * Copyright (c) 2016 Mapbox
 *
 * @param {data} A flat array of vertex coordinates.
 * @param {holeIndices} An array of hole indices if any.
 * @param {dim} The number of coordinates per vertex in the input array.
 */
const triangulate = (data, holeIndices, dim = 2) => {
  const hasHoles = holeIndices && holeIndices.length;
  const outerLen = hasHoles ? holeIndices[0] * dim : data.length;
  let outerNode = linkedPolygon(data, 0, outerLen, dim, true);
  const triangles = [];

  if (!outerNode || outerNode.next === outerNode.prev) return triangles

  let minX, minY, maxX, maxY, invSize;

  if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

  // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
  if (data.length > 80 * dim) {
    minX = maxX = data[0];
    minY = maxY = data[1];

    for (let i = dim; i < outerLen; i += dim) {
      const x = data[i];
      const y = data[i + 1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }

    // minX, minY and invSize are later used to transform coords into integers for z-order calculation
    invSize = Math.max(maxX - minX, maxY - minY);
    invSize = invSize !== 0 ? 1 / invSize : 0;
  }

  earcutLinked(outerNode, triangles, dim, minX, minY, invSize);

  return triangles
};

/*
 * main ear slicing loop which triangulates a polygon (given as a linked list)
 */
const earcutLinked = (ear, triangles, dim, minX, minY, invSize, pass) => {
  if (!ear) return

  // interlink polygon nodes in z-order
  if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

  let stop = ear;
  let prev;
  let next;

  // iterate through ears, slicing them one by one
  while (ear.prev !== ear.next) {
    prev = ear.prev;
    next = ear.next;

    if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
      // cut off the triangle
      triangles.push(prev.i / dim);
      triangles.push(ear.i / dim);
      triangles.push(next.i / dim);

      removeNode(ear);

      // skipping the next vertex leads to less sliver triangles
      ear = next.next;
      stop = next.next;

      continue
    }

    ear = next;

    // if we looped through the whole remaining polygon and can't find any more ears
    if (ear === stop) {
      // try filtering points and slicing again
      if (!pass) {
        earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

        // if this didn't work, try curing all small self-intersections locally
      } else if (pass === 1) {
        ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
        earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

        // as a last resort, try splitting the remaining polygon into two
      } else if (pass === 2) {
        splitEarcut(ear, triangles, dim, minX, minY, invSize);
      }

      break
    }
  }
};

/*
 * check whether a polygon node forms a valid ear with adjacent nodes
 */
const isEar = (ear) => {
  const a = ear.prev;
  const b = ear;
  const c = ear.next;

  if (area(a, b, c) >= 0) return false // reflex, can't be an ear

  // now make sure we don't have other points inside the potential ear
  let p = ear.next.next;

  while (p !== ear.prev) {
    if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) {
      return false
    }
    p = p.next;
  }

  return true
};

const isEarHashed = (ear, minX, minY, invSize) => {
  const a = ear.prev;
  const b = ear;
  const c = ear.next;

  if (area(a, b, c) >= 0) return false // reflex, can't be an ear

  // triangle bbox; min & max are calculated like this for speed
  const minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x);
  const minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y);
  const maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x);
  const maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

  // z-order range for the current triangle bbox
  const minZ = zOrder(minTX, minTY, minX, minY, invSize);
  const maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);

  let p = ear.prevZ;
  let n = ear.nextZ;

  // look for points inside the triangle in both directions
  while (p && p.z >= minZ && n && n.z <= maxZ) {
    if (p !== ear.prev && p !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
      area(p.prev, p, p.next) >= 0) return false
    p = p.prevZ;

    if (n !== ear.prev && n !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
      area(n.prev, n, n.next) >= 0) return false
    n = n.nextZ;
  }

  // look for remaining points in decreasing z-order
  while (p && p.z >= minZ) {
    if (p !== ear.prev && p !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
      area(p.prev, p, p.next) >= 0) return false
    p = p.prevZ;
  }

  // look for remaining points in increasing z-order
  while (n && n.z <= maxZ) {
    if (n !== ear.prev && n !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
      area(n.prev, n, n.next) >= 0) return false
    n = n.nextZ;
  }

  return true
};

/*
 * try splitting polygon into two and triangulate them independently
 */
const splitEarcut = (start, triangles, dim, minX, minY, invSize) => {
  // look for a valid diagonal that divides the polygon into two
  let a = start;
  do {
    let b = a.next.next;
    while (b !== a.prev) {
      if (a.i !== b.i && isValidDiagonal(a, b)) {
        // split the polygon in two by the diagonal
        let c = splitPolygon(a, b);

        // filter colinear points around the cuts
        a = filterPoints(a, a.next);
        c = filterPoints(c, c.next);

        // run earcut on each half
        earcutLinked(a, triangles, dim, minX, minY, invSize);
        earcutLinked(c, triangles, dim, minX, minY, invSize);
        return
      }

      b = b.next;
    }

    a = a.next;
  } while (a !== start)
};

/*
 * interlink polygon nodes in z-order
 */
const indexCurve = (start, minX, minY, invSize) => {
  let p = start;
  do {
    if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
    p.prevZ = p.prev;
    p.nextZ = p.next;
    p = p.next;
  } while (p !== start)

  p.prevZ.nextZ = null;
  p.prevZ = null;

  linkedListSort(p, (p) => p.z);
};

/*
 * z-order of a point given coords and inverse of the longer side of data bbox
 */
const zOrder = (x, y, minX, minY, invSize) => {
  // coords are transformed into non-negative 15-bit integer range
  x = 32767 * (x - minX) * invSize;
  y = 32767 * (y - minY) * invSize;

  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;

  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;

  return x | (y << 1)
};

/**
 * Compare two normals (unit vectors) for near equality.
 * @param {vec3} a - normal a
 * @param {vec3} b - normal b
 * @returns {Boolean} true if a and b are nearly equal
 * @alias module:modeling/maths/utils.aboutEqualNormals
 */
const aboutEqualNormals = (a, b) => (Math.abs(a[0] - b[0]) <= NEPS && Math.abs(a[1] - b[1]) <= NEPS && Math.abs(a[2] - b[2]) <= NEPS);

/**
 * Get the X coordinate of a point with a certain Y coordinate, interpolated between two points.
 * Interpolation is robust even if the points have the same Y coordinate
 * @param {vec2} point1
 * @param {vec2} point2
 * @param {Number} y
 * @return {Array} X and Y of interpolated point
 * @alias module:modeling/maths/utils.interpolateBetween2DPointsForY
 */
const interpolateBetween2DPointsForY = (point1, point2, y) => {
  let f1 = y - point1[1];
  let f2 = point2[1] - point1[1];
  if (f2 < 0) {
    f1 = -f1;
    f2 = -f2;
  }
  let t;
  if (f1 <= 0) {
    t = 0.0;
  } else if (f1 >= f2) {
    t = 1.0;
  } else if (f2 < 1e-10) { // FIXME Should this be EPS?
    t = 0.5;
  } else {
    t = f1 / f2;
  }
  const result = point1[0] + t * (point2[0] - point1[0]);
  return result
};

const solve2Linear = (a, b, c, d, u, v) => {
  const det = a * d - b * c;
  const invdet = 1.0 / det;
  let x = u * d - b * v;
  let y = -u * c + a * v;
  x *= invdet;
  y *= invdet;
  return [x, y]
};

/*
 * Class that defines the formula for convertion to/from orthonomal basis vectors.
 * @see https://www.kristakingmath.com/blog/orthonormal-basis-for-a-vector-set
 */
class OrthonormalFormula {
  /**
   * Construct the standard basis formula from the given plane.
   * @param {plane} the plane of which to convert vertices to/from the orthonormal basis
   */
  constructor (plane) {
    // plane normal is one component
    this.plane = plane;
    // orthogonal vector to plane normal is one component
    const rightVector = orthogonal(create$b(), plane);
    this.v = normalize$1(rightVector, cross$1(rightVector, plane, rightVector));
    // cross between plane normal and orthogonal vector is one component
    this.u = cross$1(create$b(), this.v, plane);

    this.planeOrigin = scale$3(create$b(), plane, plane[3]);
    this.basisMap = new Map();
  }

  /**
   * Convert the basis formula to a projection matrix.
   * return {mat4} matrix which can be used to convert 3D vertices to 2D points
   */
  getProjectionMatrix () {
    return fromValues$4(
      this.u[0], this.v[0], this.plane[0], 0,
      this.u[1], this.v[1], this.plane[1], 0,
      this.u[2], this.v[2], this.plane[2], 0,
      0, 0, -this.plane[3], 1
    )
  }

  /**
   * Convert the basis formula to an inverse projection matrix.
   * return {mat4} matrix which can be used to convert 2D points to 3D vertices
   */
  getInverseProjectionMatrix () {
    return fromValues$4(
      this.u[0], this.u[1], this.u[2], 0,
      this.v[0], this.v[1], this.v[2], 0,
      this.plane[0], this.plane[1], this.plane[2], 0,
      this.planeOrigin[0], this.planeOrigin[1], this.planeOrigin[2], 1
    )
  }

  /**
   * Convert the given 3D vertex to a 2D point which exists in the orthonormal basis
   * @param {vec3} - 3D vertex which lies within the original basis (set)
   * @return {vec2} - 2D point which lies within the orthonormal basis
   */
  to2D (vertex) {
    const point = fromValues$2(dot$2(vertex, this.u), dot$2(vertex, this.v));
    this.basisMap.set(point, vertex);
    return point
  }

  /**
   * Convert the given 2D point to a 3D vertex which exists in the original basis (set)
   * @param {vec2} - 2D point which lies within the orthonormal basis
   * @return {vec3} - 3D vertex which lies within the original basis (set)
   */
  to3D (point) {
    // return the original vertex if possible, i.e. no floating point error
    const original = this.basisMap.get(point);
    if (original) return original

    // calculate a new 3D vertex from the orthonormal basis formula
    const v1 = scale$3(create$b(), this.u, point[0]);
    const v2 = scale$3(create$b(), this.v, point[1]);
    const v3 = add$1(v1, v1, this.planeOrigin);
    const v4 = add$1(v2, v2, v3);
    return v4
  }
}

/**
 * Utility functions for maths.
 * @module modeling/maths/utils
 * @example
 * import { maths } from '@jscad/modeling'
 * const { aboutEqualNormals, area, intersect, solve2Linear } = maths.utils
 */

var index$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  cos: cos,
  sin: sin,
  aboutEqualNormals: aboutEqualNormals,
  area: area$1,
  interpolateBetween2DPointsForY: interpolateBetween2DPointsForY,
  intersect: intersect$1,
  solve2Linear: solve2Linear,
  OrthonormalFormula: OrthonormalFormula
});

/*
 * Constructs a polygon hierarchy of solids and holes.
 * The hierarchy is represented as a forest of trees. All trees shall be depth at most 2.
 * If a solid exists inside the hole of another solid, it will be split out as its own root.
 *
 * @param {geom2} geometry
 * @returns {Array} an array of polygons with associated holes
 * @alias module:modeling/geometries/geom2.toTree
 *
 * @example
 * const geometry = subtract(rectangle({size: [5, 5]}), rectangle({size: [3, 3]}))
 * console.log(assignHoles(geometry))
 * [{
 *   "solid": [[-2.5,-2.5],[2.5,-2.5],[2.5,2.5],[-2.5,2.5]],
 *   "holes": [[[-1.5,1.5],[1.5,1.5],[1.5,-1.5],[-1.5,-1.5]]]
 * }]
 */
const assignHoles = (geometry) => {
  const outlines = toOutlines(geometry);
  const solids = []; // solid indices
  const holes = []; // hole indices
  outlines.forEach((outline, i) => {
    const a = area$1(outline);
    if (a < 0) {
      holes.push(i);
    } else if (a > 0) {
      solids.push(i);
    }
  });

  // for each hole, determine what solids it is inside of
  const children = []; // child holes of solid[i]
  const parents = []; // parent solids of hole[i]
  solids.forEach((s, i) => {
    const solid = outlines[s];
    children[i] = [];
    holes.forEach((h, j) => {
      const hole = outlines[h];
      // check if a point of hole j is inside solid i
      if (arePointsInside([hole[0]], create$3(solid))) {
        children[i].push(h);
        if (!parents[j]) parents[j] = [];
        parents[j].push(i);
      }
    });
  });

  // check if holes have multiple parents and choose one with fewest children
  holes.forEach((h, j) => {
    // ensure at least one parent exists
    if (parents[j] && parents[j].length > 1) {
      // the solid directly containing this hole
      const directParent = minIndex(parents[j], (p) => children[p].length);
      parents[j].forEach((p, i) => {
        if (i !== directParent) {
          // Remove hole from skip level parents
          children[p] = children[p].filter((c) => c !== h);
        }
      });
    }
  });

  // map indices back to points
  return children.map((holes, i) => ({
    solid: outlines[solids[i]],
    holes: holes.map((h) => outlines[h])
  }))
};

/*
 * Find the item in the list with smallest score(item).
 * If the list is empty, return undefined.
 */
const minIndex = (list, score) => {
  let bestIndex;
  let best;
  list.forEach((item, index) => {
    const value = score(item);
    if (best === undefined || value < best) {
      bestIndex = index;
      best = value;
    }
  });
  return bestIndex
};

/*
 * Constructs a polygon hierarchy which associates holes with their outer solids.
 * This class maps a 3D polygon onto a 2D space using an orthonormal basis.
 * It tracks the mapping so that points can be reversed back to 3D losslessly.
 */
class PolygonHierarchy {
  constructor (slice) {
    this.plane = calculatePlane(slice);

    // create an orthonormal basis
    // choose an arbitrary right hand vector, making sure it is somewhat orthogonal to the plane normal
    const rightVector = orthogonal(create$b(), this.plane);
    const perp = cross$1(create$b(), this.plane, rightVector);
    this.v = normalize$1(perp, perp);
    this.u = cross$1(create$b(), this.v, this.plane);

    // map from 2D to original 3D points
    this.basisMap = new Map();

    // project slice onto 2D plane
    const projected = slice.contours.map((part) => part.map((v) => this.to2D(v)));

    // compute polygon hierarchies, assign holes to solids
    const geometry = create$a(projected);
    this.roots = assignHoles(geometry);
  }

  /*
   * project a 3D point onto the 2D plane
   */
  to2D (vector3) {
    const vector2 = fromValues$2(dot$2(vector3, this.u), dot$2(vector3, this.v));
    this.basisMap.set(vector2, vector3);
    return vector2
  }

  /*
   * un-project a 2D point back into 3D
   */
  to3D (vector2) {
    // use a map to get the original 3D, no floating point error
    const original = this.basisMap.get(vector2);
    if (original) {
      return original
    } else {
      console.log('Warning: point not in original slice');
      const v1 = scale$3(create$b(), this.u, vector2[0]);
      const v2 = scale$3(create$b(), this.v, vector2[1]);

      const planeOrigin = scale$3(create$b(), this.plane, this.plane[3]);
      const v3 = add$1(v1, v1, planeOrigin);
      return add$1(v2, v2, v3)
    }
  }
}

/**
 * Return a list of polygons which are enclosed by the slice.
 * @param {slice} slice - the slice
 * @return {Array} a list of polygons (3D)
 * @alias module:modeling/geometries/slice.toPolygons
 */
const toPolygons = (slice) => {
  const hierarchy = new PolygonHierarchy(slice);

  const polygons = [];
  hierarchy.roots.forEach(({ solid, holes }) => {
    // hole indices
    let index = solid.length;
    const holesIndex = [];
    holes.forEach((hole, i) => {
      holesIndex.push(index);
      index += hole.length;
    });

    // compute earcut triangulation for each solid
    const vertices = [solid, ...holes].flat();
    const data = vertices.flat();
    // Get original 3D vertex by index
    const getVertex = (i) => hierarchy.to3D(vertices[i]);
    const indices = triangulate(data, holesIndex);
    for (let i = 0; i < indices.length; i += 3) {
      // Map back to original vertices
      const tri = indices.slice(i, i + 3).map(getVertex);
      polygons.push(fromVerticesAndPlane(tri, hierarchy.plane));
    }
  });

  return polygons
};

/**
 * Convert the given slice to a readable string.
 * @param {slice} slice - the slice
 * @return {String} the string representation
 * @alias module:modeling/geometries/slice.toString
 */
const toString$2 = (slice) => {
  let result = 'slice (' + slice.contours.length + ' contours):\n[\n';
  slice.contours.forEach((contour) => {
    result += '  [' + contour.map(toString$b).join() + '],\n';
  });
  result += ']\n';
  return result
};

/**
 * Transform the given slice using the given matrix.
 * @param {mat4} matrix - transform matrix
 * @param {slice} slice - slice to transform
 * @returns {slice} the transformed slice
 * @alias module:modeling/geometries/slice.transform
 *
 * @example
 * let matrix = mat4.fromTranslation([1, 2, 3])
 * let newSlice = transform(matrix, oldSlice)
 */
const transform$3 = (matrix, slice) => {
  const contours = slice.contours.map((contour) => contour.map((vertex) => transform$c(create$b(), vertex, matrix)));
  return create$2(contours)
};

/**
 * Represents a 3D geometry consisting of a list of contours, where each contour consists of a list of planar vertices.
 * @see {@link slice} for data structure information.
 * @module modeling/geometries/slice
 *
 * @example
 * import { geometries } from '@jscad/modeling'
 * const slice = geometries.slice.create([[[0,0,0], [4,0,0], [4,3,12]]])
 */

var index$e = /*#__PURE__*/Object.freeze({
  __proto__: null,
  calculatePlane: calculatePlane,
  clone: clone$2,
  create: create$2,
  equals: equals$3,
  fromGeom2: fromGeom2,
  fromVertices: fromVertices,
  isA: isA,
  reverse: reverse$2,
  toEdges: toEdges,
  toVertices: toVertices,
  toPolygons: toPolygons,
  toString: toString$2,
  transform: transform$3
});

/**
 * Geometries are objects that represent the contents of primitives or the results of operations.
 * Note: Geometries are considered immutable, so never change the contents directly.
 *
 * @see {@link geom2} - 2D geometry consisting of 2D outlines
 * @see {@link geom3} - 3D geometry consisting of polygons
 * @see {@link path2} - 2D geometry consisting of ordered points
 * @see {@link poly2} - 2D polygon consisting of ordered vertices
 * @see {@link poly3} - 3D polygon consisting of ordered vertices
 * @see {@link slice} - 3D geometry consisting of 3D outlines
 *
 * @module modeling/geometries
 * @example
 * import { geometries } from '@jscad/modeling'
 * const { geom2, geom3, path2, poly2, poly3 } = geometries
 */

var index$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  geom2: index$p,
  geom3: index$l,
  path2: index$k,
  poly2: index$g,
  poly3: index$m,
  slice: index$e
});

/**
 * Represents an unbounded line in 2D space, positioned at a point of origin.
 * A line is parametrized by a normal vector (perpendicular to the line,
 * rotated 90 degrees counterclockwise) and distance from the origin.
 *
 * Equation: A Point (P) is on Line (L) if dot(L.normal, P) == L.distance
 *
 * The contents of the array are a normal [0,1] and a distance [2].
 * @typedef {Array} line2
 */

/**
 * Create a line, positioned at 0,0, and running along the X axis.
 *
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.create
 */
const create$1 = () => [0, 1, 0]; // normal and distance

/**
 * Create a clone of the given line.
 *
 * @param {line2} line - line to clone
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.clone
 */
const clone$1 = (line) => {
  const out = create$1();
  out[0] = line[0];
  out[1] = line[1];
  out[2] = line[2];
  return out
};

/**
 * Return the direction of the given line.
 *
 * @param {line2} line - line of reference
 * @return {vec2} a vector in the direction of the line
 * @alias module:modeling/maths/line2.direction
 */
const direction$1 = (line) => {
  const vector = normal(create$9(), line);
  negate(vector, vector);
  return vector
};

/**
 * Return the origin of the given line.
 *
 * @param {line2} line - line of reference
 * @return {vec2} the origin of the line
 * @alias module:modeling/maths/line2.origin
 */
const origin$1 = (line) => scale$1(create$9(), line, line[2]);

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {line2} line - line of reference
 * @param {vec2} point - point of reference
 * @returns {vec2} closest point
 * @alias module:modeling/maths/line2.closestPoint
 */
const closestPoint$1 = (line, point) => {
  // linear function of AB
  const a = origin$1(line);
  const b = direction$1(line);
  const m1 = (b[1] - a[1]) / (b[0] - a[0]);
  const t1 = a[1] - m1 * a[0];
  // linear function of PC
  const m2 = -1 / m1; // perpendicular
  const t2 = point[1] - m2 * point[0];
  // c.x * m1 + t1 === c.x * m2 + t2
  const x = (t2 - t1) / (m1 - m2);
  const y = m1 * x + t1;

  const closest = fromValues$2(x, y);
  return closest
};

/**
 * Copy the given line to the receiving line.
 *
 * @param {line2} out - receiving line
 * @param {line2} line - line to copy
 * @returns {line2} out
 * @alias module:modeling/maths/line2.copy
 */
const copy$1 = (out, line) => {
  out[0] = line[0];
  out[1] = line[1];
  out[2] = line[2];
  return out
};

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {line2} line - line of reference
 * @param {vec2} point - point of reference
 * @return {Number} distance between line and point
 * @alias module:modeling/maths/line2.distanceToPoint
 */
const distanceToPoint$1 = (line, point) => {
  let distance = dot$1(point, line);
  distance = Math.abs(distance - line[2]);
  return distance
};

/**
 * Compare the given lines for equality.
 *
 * @param {line2} line1 - first line to compare
 * @param {line2} line2 - second line to compare
 * @return {Boolean} true if lines are equal
 * @alias module:modeling/maths/line2.equals
 */
const equals$1 = (line1, line2) => (line1[0] === line2[0]) && (line1[1] === line2[1] && (line1[2] === line2[2]));

/**
 * Create a new line that passes through the given points.
 *
 * @param {line2} out - receiving line
 * @param {vec2} point1 - start point of the line
 * @param {vec2} point2 - end point of the line
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.fromPoints
 */
const fromPoints$1 = (out, point1, point2) => {
  const vector = subtract$1(create$9(), point2, point1); // directional vector

  normal(vector, vector);
  normalize(vector, vector); // normalized

  const distance = dot$1(point1, vector);

  out[0] = vector[0];
  out[1] = vector[1];
  out[2] = distance;
  return out
};

/**
 * Creates a new line initialized with the given values.
 *
 * @param {Number} x - X coordinate of the unit normal
 * @param {Number} y - Y coordinate of the unit normal
 * @param {Number} d - distance of the line from [0,0]
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.fromValues
 */
const fromValues = (x, y, d) => {
  const out = create$1();
  out[0] = x;
  out[1] = y;
  out[2] = d;
  return out
};

/**
 * Return the point of intersection between the given lines.
 *
 * NOTES:
 * The point will have Infinity values if the lines are parallel.
 * The point will have NaN values if the lines are the same.
 *
 * @param {line2} line1 - line of reference
 * @param {line2} line2 - line of reference
 * @return {vec2} the point of intersection
 * @alias module:modeling/maths/line2.intersectPointOfLines
 */
const intersectPointOfLines = (line1, line2) => {
  const point = solve2Linear(line1[0], line1[1], line2[0], line2[1], line1[2], line2[2]);
  return clone$8(point)
};

/**
 * Create a new line in the opposite direction as the given.
 *
 * @param {line2} out - receiving line
 * @param {line2} line - line to reverse
 * @returns {line2} out
 * @alias module:modeling/maths/line2.reverse
 */
const reverse$1 = (out, line) => {
  const normal = negate(create$9(), line);
  const distance = -line[2];
  return copy$1(out, fromValues(normal[0], normal[1], distance))
};

/**
 * Return a string representing the given line.
 *
 * @param {line2} line - line of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/line2.toString
 */
const toString$1 = (line) => `line2: (${line[0].toFixed(7)}, ${line[1].toFixed(7)}, ${line[2].toFixed(7)})`;

/**
 * Transforms the given line using the given matrix.
 *
 * @param {line2} out - receiving line
 * @param {line2} line - line to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {line2} out
 * @alias module:modeling/maths/line2.transform
 */
const transform$2 = (out, line, matrix) => {
  const org = origin$1(line);
  const dir = direction$1(line);

  transform$b(org, org, matrix);
  transform$b(dir, dir, matrix);

  return fromPoints$1(out, org, dir)
};

/**
 * Determine the X coordinate of the given line at the Y coordinate.
 *
 * The X coordinate will be Infinity if the line is parallel to the X axis.
 *
 * @param {line2} line - line of reference
 * @param {Number} y - Y coordinate on the line
 * @return {Number} the X coordinate on the line
 * @alias module:modeling/maths/line2.xAtY
 */
const xAtY = (line, y) => {
  let x = (line[2] - (line[1] * y)) / line[0];
  if (Number.isNaN(x)) {
    const org = origin$1(line);
    x = org[0];
  }
  return x
};

/**
 * Represents an unbounded line in 2D space, positioned at a point of origin.
 * @see {@link line2} for data structure information.
 * @module modeling/maths/line2
 */

var index$c = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clone: clone$1,
  closestPoint: closestPoint$1,
  copy: copy$1,
  create: create$1,
  direction: direction$1,
  distanceToPoint: distanceToPoint$1,
  equals: equals$1,
  fromPoints: fromPoints$1,
  fromValues: fromValues,
  intersectPointOfLines: intersectPointOfLines,
  origin: origin$1,
  reverse: reverse$1,
  toString: toString$1,
  transform: transform$2,
  xAtY: xAtY
});

/**
 * Represents an unbounded line in 3D space, positioned at a point of origin.
 * A line is parametrized by a point of origin and a directional vector.
 *
 * The array contents are two 3D vectors; origin [0,0,0] and directional vector [0,0,1].
 * @see https://en.wikipedia.org/wiki/Hesse_normal_form
 * @typedef {Array} line3
 */

/**
 * Create a line, positioned at 0,0,0 and lying on the X axis.
 *
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.create
 */
const create = () => [
  fromValues$3(0, 0, 0), // origin
  fromValues$3(0, 0, 1) // direction
];

/**
 * Create a clone of the given line.
 *
 * @param {line3} line - line to clone
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.clone
 */
const clone = (line) => {
  const out = create();
  copy$4(out[0], line[0]);
  copy$4(out[1], line[1]);
  return out
};

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {line3} line - line of reference
 * @param {vec3} point - point of reference
 * @returns {vec3} a point
 * @alias module:modeling/maths/line3.closestPoint
 */
const closestPoint = (line, point) => {
  const lPoint = line[0];
  const lDirection = line[1];

  const a = dot$2(subtract$3(create$b(), point, lPoint), lDirection);
  const b = dot$2(lDirection, lDirection);
  const t = a / b;

  const closestPoint = scale$3(create$b(), lDirection, t);
  add$1(closestPoint, closestPoint, lPoint);
  return closestPoint
};

/**
 * Copy the given line into the receiving line.
 *
 * @param {line3} out - receiving line
 * @param {line3} line - line to copy
 * @returns {line3} out
 * @alias module:modeling/maths/line3.copy
 */
const copy = (out, line) => {
  copy$4(out[0], line[0]);
  copy$4(out[1], line[1]);
  return out
};

/**
 * Return the direction of the given line.
 *
 * @param {line3} line - line for reference
 * @return {vec3} the relative vector in the direction of the line
 * @alias module:modeling/maths/line3.direction
 */
const direction = (line) => line[1];

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {line3} line - line of reference
 * @param {vec3} point - point of reference
 * @return {Number} distance between line and point
 * @alias module:modeling/maths/line3.distanceToPoint
 */
const distanceToPoint = (line, point) => {
  const closest = closestPoint(line, point);
  const distanceVector = subtract$3(create$b(), point, closest);
  return length$1(distanceVector)
};

/**
 * Compare the given lines for equality.
 *
 * @param {line3} line1 - first line to compare
 * @param {line3} line2 - second line to compare
 * @return {Boolean} true if lines are equal
 * @alias module:modeling/maths/line3.equals
 */
const equals = (line1, line2) => {
  // compare directions (unit vectors)
  if (!equals$7(line1[1], line2[1])) return false

  // compare points
  if (!equals$7(line1[0], line2[0])) return false

  // why would lines with the same slope (direction) and different points be equal?
  // let distance = distanceToPoint(line1, line2[0])
  // if (distance > EPS) return false

  return true
};

/**
 * Create a line from the given point (origin) and direction.
 *
 * The point can be any random point on the line.
 * The direction must be a vector with positive or negative distance from the point.
 *
 * See the logic of fromPoints() for appropriate values.
 *
 * @param {line3} out - receiving line
 * @param {vec3} point - start point of the line segment
 * @param {vec3} direction - direction of the line segment
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPointAndDirection
 */
const fromPointAndDirection = (out, point, direction) => {
  const unit = normalize$1(create$b(), direction);

  copy$4(out[0], point);
  copy$4(out[1], unit);
  return out
};

/**
 * Create a line the intersection of the given planes.
 *
 * @param {line3} out - receiving line
 * @param {plane} plane1 - first plane of reference
 * @param {plane} plane2 - second plane of reference
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPlanes
 */
const fromPlanes = (out, plane1, plane2) => {
  let direction = cross$1(create$b(), plane1, plane2);
  let length = length$1(direction);
  if (length < EPS) {
    throw new Error('parallel planes do not intersect')
  }
  length = (1.0 / length);
  direction = scale$3(direction, direction, length);

  const absX = Math.abs(direction[0]);
  const absY = Math.abs(direction[1]);
  const absZ = Math.abs(direction[2]);
  let origin;
  let r;
  if ((absX >= absY) && (absX >= absZ)) {
    // find a point p for which x is zero
    r = solve2Linear(plane1[1], plane1[2], plane2[1], plane2[2], plane1[3], plane2[3]);
    origin = fromValues$3(0, r[0], r[1]);
  } else if ((absY >= absX) && (absY >= absZ)) {
    // find a point p for which y is zero
    r = solve2Linear(plane1[0], plane1[2], plane2[0], plane2[2], plane1[3], plane2[3]);
    origin = fromValues$3(r[0], 0, r[1]);
  } else {
    // find a point p for which z is zero
    r = solve2Linear(plane1[0], plane1[1], plane2[0], plane2[1], plane1[3], plane2[3]);
    origin = fromValues$3(r[0], r[1], 0);
  }
  return fromPointAndDirection(out, origin, direction)
};

/**
 * Create a line that passes through the given points.
 *
 * @param {line3} out - receiving line
 * @param {vec3} point1 - start point of the line segment
 * @param {vec3} point2 - end point of the line segment
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPoints
 */
const fromPoints = (out, point1, point2) => {
  const direction = subtract$3(create$b(), point2, point1);
  return fromPointAndDirection(out, point1, direction)
};

/**
 * Determine the closest point on the given plane to the given line.
 *
 * NOTES:
 * The point of intersection will be invalid if the line is parallel to the plane, e.g. NaN.
 *
 * @param {line3} line - line of reference
 * @param {plane} plane - plane of reference
 * @returns {vec3} a point on the line
 * @alias module:modeling/maths/line3.intersectPointOfLineAndPlane
 */
const intersectPointOfLineAndPlane = (line, plane) => {
  // plane: plane.normal * p = plane.w
  const pNormal = plane;
  const pw = plane[3];

  const lPoint = line[0];
  const lDirection = line[1];

  // point: p = line.point + labda * line.direction
  const labda = (pw - dot$2(pNormal, lPoint)) / dot$2(pNormal, lDirection);

  return add$1(create$b(), lPoint, scale$3(create$b(), lDirection, labda))
};

/**
 * Return the origin of the given line.
 *
 * @param {line3} line - line of reference
 * @return {vec3} the origin of the line
 * @alias module:modeling/maths/line3.origin
 */
const origin = (line) => line[0];

/**
 * Create a line in the opposite direction as the given.
 *
 * @param {line3} out - receiving line
 * @param {line3} line - line to reverse
 * @returns {line3} out
 * @alias module:modeling/maths/line3.reverse
 */
const reverse = (out, line) => {
  const point = clone$9(line[0]);
  const direction = negate$1(create$b(), line[1]);
  return fromPointAndDirection(out, point, direction)
};

/**
 * Return a string representing the given line.
 *
 * @param {line3} line - line of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/line3.toString
 */
const toString = (line) => {
  const point = line[0];
  const direction = line[1];
  return `line3: point: (${point[0].toFixed(7)}, ${point[1].toFixed(7)}, ${point[2].toFixed(7)}) direction: (${direction[0].toFixed(7)}, ${direction[1].toFixed(7)}, ${direction[2].toFixed(7)})`
};

/**
 * Transforms the given line using the given matrix.
 *
 * @param {line3} out - line to update
 * @param {line3} line - line to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.transform
 */
const transform$1 = (out, line, matrix) => {
  const point = line[0];
  const direction = line[1];
  const pointPlusDirection = add$1(create$b(), point, direction);

  const newPoint = transform$c(create$b(), point, matrix);
  const newPointPlusDirection = transform$c(pointPlusDirection, pointPlusDirection, matrix);
  const newDirection = subtract$3(newPointPlusDirection, newPointPlusDirection, newPoint);

  return fromPointAndDirection(out, newPoint, newDirection)
};

/**
 * Represents an unbounded line in 3D space, positioned at a point of origin.
 * @see {@link line3} for data structure information.
 * @module modeling/maths/line3
 */

var index$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clone: clone,
  closestPoint: closestPoint,
  copy: copy,
  create: create,
  direction: direction,
  distanceToPoint: distanceToPoint,
  equals: equals,
  fromPlanes: fromPlanes,
  fromPointAndDirection: fromPointAndDirection,
  fromPoints: fromPoints,
  intersectPointOfLineAndPlane: intersectPointOfLineAndPlane,
  origin: origin,
  reverse: reverse,
  toString: toString,
  transform: transform$1
});

/**
 * Maths are computational units for fundamental Euclidean geometry. All maths operate upon array data structures.
 * Note: Maths data structures are considered immutable, so never change the contents directly.
 * @see Most computations are based upon the glMatrix library (glmatrix.net)
 * @module modeling/maths
 * @example
 * import { maths } from '@jscad/modeling'
 * const { constants, line2, line3, mat4, plane, utils, vec2, vec3, vec4 } = maths
 */

var index$a = /*#__PURE__*/Object.freeze({
  __proto__: null,
  constants: constants,
  line2: index$c,
  line3: index$b,
  mat4: index$r,
  plane: index$o,
  utils: index$f,
  vec2: index$q,
  vec3: index$s,
  vec4: index$n
});

const cache$2 = new WeakMap();

/*
 * Measure the area of the given geometry.
 * NOTE: paths are infinitely narrow and do not have an area
 *
 * @param {path2} geometry - geometry to measure
 * @returns {Number} area of the geometry
 */
const measureAreaOfPath2 = () => 0;

/*
 * Measure the area of the given geometry.
 * For a counterclockwise rotating geometry (about Z) the area is positive, otherwise negative.
 *
 * @see http://paulbourke.net/geometry/polygonmesh/
 * @param {geom2} geometry - 2D geometry to measure
 * @returns {Number} area of the geometry
 */
const measureAreaOfGeom2 = (geometry) => {
  let area = cache$2.get(geometry);
  if (area) return area

  const sides = toSides(geometry);
  area = sides.reduce((area, side) => area + (side[0][0] * side[1][1] - side[0][1] * side[1][0]), 0);
  area *= 0.5;

  cache$2.set(geometry, area);

  return area
};

/*
 * Measure the area of the given geometry.
 *
 * @param {geom3} geometry - 3D geometry to measure
 * @returns {Number} area of the geometry
 */
const measureAreaOfGeom3 = (geometry) => {
  let area = cache$2.get(geometry);
  if (area) return area

  const polygons = toPolygons$1(geometry);
  area = polygons.reduce((area, polygon) => area + measureArea$2(polygon), 0);

  cache$2.set(geometry, area);

  return area
};

/**
 * Measure the area of the given geometries.
 * @param {...Objects} geometries - the geometries to measure
 * @return {Number|Array} the area, or a list of areas for each geometry
 * @alias module:modeling/measurements.measureArea
 *
 * @example
 * let area = measureArea(sphere())
 */
const measureArea = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (isA$2(geometry)) return measureAreaOfPath2()
    if (isA$5(geometry)) return measureAreaOfGeom2(geometry)
    if (isA$3(geometry)) return measureAreaOfGeom3(geometry)
    return 0
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Measure the total (aggregate) area for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {Number} the total surface area for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateArea
 *
 * @example
 * let totalArea = measureAggregateArea(sphere(),cube())
 */
const measureAggregateArea = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('measureAggregateArea: no geometries supplied')
  const areas = measureArea(geometries);
  if (geometries.length === 1) {
    return areas
  }
  const result = 0;
  return areas.reduce((result, area) => result + area, result)
};

const cache$1 = new WeakMap();

/*
 * Measure the min and max bounds of the given (path2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfPath2 = (geometry) => {
  let boundingBox = cache$1.get(geometry);
  if (boundingBox) return boundingBox

  const points = toPoints$1(geometry);

  let minPoint;
  if (points.length === 0) {
    minPoint = create$9();
  } else {
    minPoint = clone$8(points[0]);
  }
  let maxPoint = clone$8(minPoint);

  points.forEach((point) => {
    min$1(minPoint, minPoint, point);
    max$1(maxPoint, maxPoint, point);
  });
  minPoint = [minPoint[0], minPoint[1], 0];
  maxPoint = [maxPoint[0], maxPoint[1], 0];

  boundingBox = [minPoint, maxPoint];

  cache$1.set(geometry, boundingBox);

  return boundingBox
};

/*
 * Measure the min and max bounds of the given (geom2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom2 = (geometry) => {
  let boundingBox = cache$1.get(geometry);
  if (boundingBox) return boundingBox

  const points = toPoints$3(geometry);

  let minPoint;
  if (points.length === 0) {
    minPoint = create$9();
  } else {
    minPoint = clone$8(points[0]);
  }
  let maxPoint = clone$8(minPoint);

  points.forEach((point) => {
    min$1(minPoint, minPoint, point);
    max$1(maxPoint, maxPoint, point);
  });

  minPoint = [minPoint[0], minPoint[1], 0];
  maxPoint = [maxPoint[0], maxPoint[1], 0];

  boundingBox = [minPoint, maxPoint];

  cache$1.set(geometry, boundingBox);

  return boundingBox
};

/*
 * Measure the min and max bounds of the given (geom3) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom3 = (geometry) => {
  let boundingBox = cache$1.get(geometry);
  if (boundingBox) return boundingBox

  const polygons = toPolygons$1(geometry);

  let minVertex = create$b();
  if (polygons.length > 0) {
    const vertices = toVertices$1(polygons[0]);
    copy$4(minVertex, vertices[0]);
  }
  let maxVertex = clone$9(minVertex);

  polygons.forEach((polygon) => {
    toVertices$1(polygon).forEach((vertex) => {
      min$2(minVertex, minVertex, vertex);
      max$2(maxVertex, maxVertex, vertex);
    });
  });

  minVertex = [minVertex[0], minVertex[1], minVertex[2]];
  maxVertex = [maxVertex[0], maxVertex[1], maxVertex[2]];

  boundingBox = [minVertex, maxVertex];

  cache$1.set(geometry, boundingBox);

  return boundingBox
};

/**
 * Measure the min and max bounds of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds, or a list of bounds for each geometry
 * @alias module:modeling/measurements.measureBoundingBox
 *
 * @example
 * let bounds = measureBoundingBox(sphere())
 */
const measureBoundingBox = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (isA$2(geometry)) return measureBoundingBoxOfPath2(geometry)
    if (isA$5(geometry)) return measureBoundingBoxOfGeom2(geometry)
    if (isA$3(geometry)) return measureBoundingBoxOfGeom3(geometry)
    return [[0, 0, 0], [0, 0, 0]]
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Measure the aggregated minimum and maximum bounds for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for the group of geometry, i.e. [[x,y,z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureAggregateBoundingBox
 *
 * @example
 * let bounds = measureAggregateBoundingBox(sphere(),cube())
 */
const measureAggregateBoundingBox = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('measureAggregateBoundingBox: no geometries supplied')
  const bounds = measureBoundingBox(geometries);
  if (geometries.length === 1) {
    return bounds
  }
  const result = [[Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE], [-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE]];
  return bounds.reduce((result, item) => {
    result = [min$2(result[0], result[0], item[0]), max$2(result[1], result[1], item[1])];
    return result
  }, result)
};

const calculateEpsilonFromBounds = (bounds, dimensions) => {
  let total = 0;
  for (let i = 0; i < dimensions; i++) {
    total += bounds[1][i] - bounds[0][i];
  }
  return EPS * total / dimensions
};

/**
 * Measure the aggregated Epsilon for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Number} the aggregated Epsilon for the whole group of geometries
 * @alias module:modeling/measurements.measureAggregateEpsilon
 *
 * @example
 * let groupEpsilon = measureAggregateEpsilon(sphere(),cube())
 */
const measureAggregateEpsilon = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('measureAggregateEpsilon: no geometries supplied')
  const bounds = measureAggregateBoundingBox(geometries);

  let dimensions = 0;
  dimensions = geometries.reduce((dimensions, geometry) => {
    if (isA$2(geometry) || isA$5(geometry)) return Math.max(dimensions, 2)
    if (isA$3(geometry)) return Math.max(dimensions, 3)
    return 0
  }, dimensions);
  return calculateEpsilonFromBounds(bounds, dimensions)
};

const cache = new WeakMap();

/*
 * Measure the volume of the given geometry.
 * NOTE: paths are infinitely narrow and do not have a volume
 *
 * @param {Path2} geometry - geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolumeOfPath2 = () => 0;

/*
 * Measure the volume of the given geometry.
 * NOTE: 2D geometry are infinitely thin and do not have a volume
 *
 * @param {Geom2} geometry - 2D geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolumeOfGeom2 = () => 0;

/*
 * Measure the volume of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {Number} volume of the geometry
 */
const measureVolumeOfGeom3 = (geometry) => {
  let volume = cache.get(geometry);
  if (volume) return volume

  const polygons = toPolygons$1(geometry);
  volume = polygons.reduce((volume, polygon) => volume + measureSignedVolume(polygon), 0);

  cache.set(geometry, volume);

  return volume
};

/**
 * Measure the volume of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Number|Array} the volume, or a list of volumes for each geometry
 * @alias module:modeling/measurements.measureVolume
 *
 * @example
 * let volume = measureVolume(sphere())
 */
const measureVolume = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (isA$2(geometry)) return measureVolumeOfPath2()
    if (isA$5(geometry)) return measureVolumeOfGeom2()
    if (isA$3(geometry)) return measureVolumeOfGeom3(geometry)
    return 0
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Measure the total (aggregate) volume for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {Number} the volume for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateVolume
 *
 * @example
 * let totalVolume = measureAggregateVolume(sphere(),cube())
 */
const measureAggregateVolume = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('measureAggregateVolume: no geometries supplied')
  const volumes = measureVolume(geometries);
  if (geometries.length === 1) {
    return volumes
  }
  const result = 0;
  return volumes.reduce((result, volume) => result + volume, result)
};

const cacheOfBoundingSpheres = new WeakMap();

/*
 * Measure the bounding sphere of the given (path2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfPath2 = (geometry) => {
  let boundingSphere = cacheOfBoundingSpheres.get(geometry);
  if (boundingSphere !== undefined) return boundingSphere

  const centroid = create$b();
  let radius = 0;

  const points = toPoints$1(geometry);

  if (points.length > 0) {
    // calculate the centroid of the geometry
    let numPoints = 0;
    const temp = create$b();
    points.forEach((point) => {
      add$1(centroid, centroid, fromVec2(temp, point, 0));
      numPoints++;
    });
    scale$3(centroid, centroid, 1 / numPoints);

    // find the farthest point from the centroid
    points.forEach((point) => {
      radius = Math.max(radius, squaredDistance(centroid, point));
    });
    radius = Math.sqrt(radius);
  }

  boundingSphere = [centroid, radius];
  cacheOfBoundingSpheres.set(geometry, boundingSphere);

  return boundingSphere
};

/*
 * Measure the bounding sphere of the given (geom2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom2 = (geometry) => {
  let boundingSphere = cacheOfBoundingSpheres.get(geometry);
  if (boundingSphere !== undefined) return boundingSphere

  const centroid = create$b();
  let radius = 0;

  const points = toPoints$3(geometry);

  if (points.length > 0) {
    // calculate the centroid of the geometry
    let numPoints = 0;
    const temp = create$b();
    points.forEach((point) => {
      add$1(centroid, centroid, fromVec2(temp, point, 0));
      numPoints++;
    });
    scale$3(centroid, centroid, 1 / numPoints);

    // find the farthest point from the centroid
    points.forEach((point) => {
      radius = Math.max(radius, squaredDistance(centroid, point));
    });
    radius = Math.sqrt(radius);
  }

  boundingSphere = [centroid, radius];
  cacheOfBoundingSpheres.set(geometry, boundingSphere);

  return boundingSphere
};

/*
 * Measure the bounding sphere of the given (geom3) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom3 = (geometry) => {
  let boundingSphere = cacheOfBoundingSpheres.get(geometry);
  if (boundingSphere !== undefined) return boundingSphere

  const centroid = create$b();
  let radius = 0;

  const polygons = toPolygons$1(geometry);

  if (polygons.length > 0) {
    // calculate the centroid of the geometry
    let numVertices = 0;
    polygons.forEach((polygon) => {
      toVertices$1(polygon).forEach((vertex) => {
        add$1(centroid, centroid, vertex);
        numVertices++;
      });
    });
    scale$3(centroid, centroid, 1 / numVertices);

    // find the farthest vertex from the centroid
    polygons.forEach((polygon) => {
      toVertices$1(polygon).forEach((vertex) => {
        radius = Math.max(radius, squaredDistance$1(centroid, vertex));
      });
    });
    radius = Math.sqrt(radius);
  }

  boundingSphere = [centroid, radius];
  cacheOfBoundingSpheres.set(geometry, boundingSphere);

  return boundingSphere
};

/**
 * Measure the (approximate) bounding sphere of the given geometries.
 * @see https://en.wikipedia.org/wiki/Bounding_sphere
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the bounding sphere for each geometry, i.e. [centroid, radius]
 * @alias module:modeling/measurements.measureBoundingSphere
 *
 * @example
 * let bounds = measureBoundingSphere(cube())
 */
const measureBoundingSphere = (...geometries) => {
  geometries = flatten(geometries);

  const results = geometries.map((geometry) => {
    if (isA$2(geometry)) return measureBoundingSphereOfPath2(geometry)
    if (isA$5(geometry)) return measureBoundingSphereOfGeom2(geometry)
    if (isA$3(geometry)) return measureBoundingSphereOfGeom3(geometry)
    return [[0, 0, 0], 0]
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Measure the center of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the center vertex for each geometry, i.e. [X, Y, Z]
 * @alias module:modeling/measurements.measureCenter
 *
 * @example
 * let center = measureCenter(sphere())
 */
const measureCenter = (...geometries) => {
  geometries = flatten(geometries);

  const results = geometries.map((geometry) => {
    const bounds = measureBoundingBox(geometry);
    return [
      (bounds[0][0] + ((bounds[1][0] - bounds[0][0]) / 2)),
      (bounds[0][1] + ((bounds[1][1] - bounds[0][1]) / 2)),
      (bounds[0][2] + ((bounds[1][2] - bounds[0][2]) / 2))
    ]
  });
  return results.length === 1 ? results[0] : results
};

const cacheOfCenterOfMass = new WeakMap();

/*
 * Measure the center of mass for the given geometry.
 *
 * @see http://paulbourke.net/geometry/polygonmesh/
 * @return {Array} the center of mass for the geometry
 */
const measureCenterOfMassGeom2 = (geometry) => {
  let centerOfMass = cacheOfCenterOfMass.get(geometry);
  if (centerOfMass !== undefined) return centerOfMass

  const sides = toSides(geometry);

  let area = 0;
  let x = 0;
  let y = 0;
  if (sides.length > 0) {
    for (let i = 0; i < sides.length; i++) {
      const p1 = sides[i][0];
      const p2 = sides[i][1];

      const a = p1[0] * p2[1] - p1[1] * p2[0];
      area += a;
      x += (p1[0] + p2[0]) * a;
      y += (p1[1] + p2[1]) * a;
    }
    area /= 2;

    const f = 1 / (area * 6);
    x *= f;
    y *= f;
  }

  centerOfMass = fromValues$3(x, y, 0);

  cacheOfCenterOfMass.set(geometry, centerOfMass);
  return centerOfMass
};

/*
 * Measure the center of mass for the given geometry.
 * @return {Array} the center of mass for the geometry
 */
const measureCenterOfMassGeom3 = (geometry) => {
  let centerOfMass = cacheOfCenterOfMass.get(geometry);
  if (centerOfMass !== undefined) return centerOfMass

  centerOfMass = create$b(); // 0, 0, 0

  const polygons = toPolygons$1(geometry);
  if (polygons.length === 0) return centerOfMass

  let totalVolume = 0;
  const vector = create$b(); // for speed
  polygons.forEach((polygon) => {
    // calculate volume and center of each tetrahedron
    const vertices = polygon.vertices;
    for (let i = 0; i < vertices.length - 2; i++) {
      cross$1(vector, vertices[i + 1], vertices[i + 2]);
      const volume = dot$2(vertices[0], vector) / 6;

      totalVolume += volume;

      add$1(vector, vertices[0], vertices[i + 1]);
      add$1(vector, vector, vertices[i + 2]);
      const weightedCenter = scale$3(vector, vector, 1 / 4 * volume);

      add$1(centerOfMass, centerOfMass, weightedCenter);
    }
  });
  scale$3(centerOfMass, centerOfMass, 1 / totalVolume);

  cacheOfCenterOfMass.set(geometry, centerOfMass);
  return centerOfMass
};

/**
 * Measure the center of mass for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the center of mass for each geometry, i.e. [X, Y, Z]
 * @alias module:modeling/measurements.measureCenterOfMass
 *
 * @example
 * let center = measureCenterOfMass(sphere())
 */
const measureCenterOfMass = (...geometries) => {
  geometries = flatten(geometries);

  const results = geometries.map((geometry) => {
    // NOTE: center of mass for geometry path2 is not possible
    if (isA$5(geometry)) return measureCenterOfMassGeom2(geometry)
    if (isA$3(geometry)) return measureCenterOfMassGeom3(geometry)
    return [0, 0, 0]
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Measure the dimensions of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the dimensions for each geometry, i.e. [width, depth, height]
 * @alias module:modeling/measurements.measureDimensions
 *
 * @example
 * let dimensions = measureDimensions(sphere())
 */
const measureDimensions = (...geometries) => {
  geometries = flatten(geometries);

  const results = geometries.map((geometry) => {
    const boundingBox = measureBoundingBox(geometry);
    return [
      boundingBox[1][0] - boundingBox[0][0],
      boundingBox[1][1] - boundingBox[0][1],
      boundingBox[1][2] - boundingBox[0][2]
    ]
  });
  return results.length === 1 ? results[0] : results
};

/*
 * Measure the epsilon of the given (path2) geometry.
 * @return {Number} the epsilon (precision) of the geometry
 */
const measureEpsilonOfPath2 = (geometry) => calculateEpsilonFromBounds(measureBoundingBox(geometry), 2);

/*
 * Measure the epsilon of the given (geom2) geometry.
 * @return {Number} the epsilon (precision) of the geometry
 */
const measureEpsilonOfGeom2 = (geometry) => calculateEpsilonFromBounds(measureBoundingBox(geometry), 2);

/*
 * Measure the epsilon of the given (geom3) geometry.
 * @return {Float} the epsilon (precision) of the geometry
 */
const measureEpsilonOfGeom3 = (geometry) => calculateEpsilonFromBounds(measureBoundingBox(geometry), 3);

/**
 * Measure the epsilon of the given geometries.
 * Epsilon values are used in various functions to determine minimum distances between vertices, planes, etc.
 * @param {...Object} geometries - the geometries to measure
 * @return {Number|Array} the epsilon, or a list of epsilons for each geometry
 * @alias module:modeling/measurements.measureEpsilon
 *
 * @example
 * let epsilon = measureEpsilon(sphere())
 */
const measureEpsilon = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (isA$2(geometry)) return measureEpsilonOfPath2(geometry)
    if (isA$5(geometry)) return measureEpsilonOfGeom2(geometry)
    if (isA$3(geometry)) return measureEpsilonOfGeom3(geometry)
    return 0
  });
  return results.length === 1 ? results[0] : results
};

/**
 * All shapes (primitives or the results of operations) can be measured, e.g. calculate volume, etc.
 * @module modeling/measurements
 * @example
 * import { measureArea, measureBoundingBox, measureVolume } from '@jscad/modeling/measurements')
 */

var index$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  measureAggregateArea: measureAggregateArea,
  measureAggregateBoundingBox: measureAggregateBoundingBox,
  measureAggregateEpsilon: measureAggregateEpsilon,
  measureAggregateVolume: measureAggregateVolume,
  measureArea: measureArea,
  measureBoundingBox: measureBoundingBox,
  measureBoundingSphere: measureBoundingSphere,
  measureCenter: measureCenter,
  measureCenterOfMass: measureCenterOfMass,
  measureDimensions: measureDimensions,
  measureEpsilon: measureEpsilon,
  measureVolume: measureVolume
});

// verify that the array has the given dimension, and contains Number values
const isNumberArray = (array, dimension) => {
  if (Array.isArray(array) && array.length >= dimension) {
    return array.every((n) => Number.isFinite(n))
  }
  return false
};

// verify that the value is a Number greater than the constant
const isGT = (value, constant) => (Number.isFinite(value) && value > constant);

// verify that the value is a Number greater than or equal to the constant
const isGTE = (value, constant) => (Number.isFinite(value) && value >= constant);

/**
 * Construct an arc in two dimensional space where all points are at the same distance from the center.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of arc
 * @param {Number} [options.radius=1] - radius of arc
 * @param {Number} [options.startAngle=0] - starting angle of the arc, in radians
 * @param {Number} [options.endAngle=TAU] - ending angle of the arc, in radians
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Boolean} [options.makeTangent=false] - adds line segments at both ends of the arc to ensure that the gradients at the edges are tangent
 * @returns {path2} new 2D path
 * @alias module:modeling/primitives.arc
 */
const arc = (options) => {
  const defaults = {
    center: [0, 0],
    radius: 1,
    startAngle: 0,
    endAngle: TAU,
    makeTangent: false,
    segments: 32
  };
  let { center, radius, startAngle, endAngle, makeTangent, segments } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isGT(radius, 0)) throw new Error('radius must be greater than zero')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be positive')
  if (!isGTE(endAngle, 0)) throw new Error('endAngle must be positive')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  startAngle = startAngle % TAU;
  endAngle = endAngle % TAU;

  let rotation = TAU;
  if (startAngle < endAngle) {
    rotation = endAngle - startAngle;
  }
  if (startAngle > endAngle) {
    rotation = endAngle + (TAU - startAngle);
  }

  const minAngle = Math.acos(((radius * radius) + (radius * radius) - (EPS * EPS)) / (2 * radius * radius));

  const centerV = clone$8(center);
  let point;
  const pointArray = [];
  if (rotation < minAngle) {
    // there is no rotation, just a single point
    point = fromAngleRadians(create$9(), startAngle);
    scale$1(point, point, radius);
    add(point, point, centerV);
    pointArray.push(point);
  } else {
    // note: add one additional step to achieve full rotation
    const numSteps = Math.max(1, Math.floor(segments * (rotation / TAU))) + 1;
    let edgeStepSize = numSteps * 0.5 / rotation; // step size for half a degree
    if (edgeStepSize > 0.25) edgeStepSize = 0.25;

    const totalSteps = makeTangent ? (numSteps + 2) : numSteps;
    for (let i = 0; i <= totalSteps; i++) {
      let step = i;
      if (makeTangent) {
        step = (i - 1) * (numSteps - 2 * edgeStepSize) / numSteps + edgeStepSize;
        if (step < 0) step = 0;
        if (step > numSteps) step = numSteps;
      }
      const angle = startAngle + (step * (rotation / numSteps));
      point = fromAngleRadians(create$9(), angle);
      scale$1(point, point, radius);
      add(point, point, centerV);
      pointArray.push(point);
    }
  }
  return fromPoints$2({ closed: false }, pointArray)
};

/**
 * Construct an axis-aligned ellipse in two dimensional space.
 * @see https://en.wikipedia.org/wiki/Ellipse
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of ellipse
 * @param {Array} [options.radius=[1,1]] - radius of ellipse, along X and Y
 * @param {Number} [options.startAngle=0] - start angle of ellipse, in radians
 * @param {Number} [options.endAngle=TAU] - end angle of ellipse, in radians
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.ellipse
 * @example
 * let myshape = ellipse({radius: [5,10]})
 */
const ellipse = (options) => {
  const defaults = {
    center: [0, 0],
    radius: [1, 1],
    startAngle: 0,
    endAngle: TAU,
    segments: 32
  };
  let { center, radius, startAngle, endAngle, segments } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isNumberArray(radius, 2)) throw new Error('radius must be an array of X and Y values')
  if (!radius.every((n) => n > 0)) throw new Error('radius values must be greater than zero')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be positive')
  if (!isGTE(endAngle, 0)) throw new Error('endAngle must be positive')
  if (!isGTE(segments, 3)) throw new Error('segments must be three or more')

  startAngle = startAngle % TAU;
  endAngle = endAngle % TAU;

  let rotation = TAU;
  if (startAngle < endAngle) {
    rotation = endAngle - startAngle;
  }
  if (startAngle > endAngle) {
    rotation = endAngle + (TAU - startAngle);
  }

  const minRadius = Math.min(radius[0], radius[1]);
  const minAngle = Math.acos(((minRadius * minRadius) + (minRadius * minRadius) - (EPS * EPS)) /
                            (2 * minRadius * minRadius));
  if (rotation < minAngle) throw new Error('startAngle and endAngle do not define a significant rotation')

  segments = Math.floor(segments * (rotation / TAU));

  const centerV = clone$8(center);
  const step = rotation / segments; // radians per segment

  const points = [];
  segments = (rotation < TAU) ? segments + 1 : segments;
  for (let i = 0; i < segments; i++) {
    const angle = (step * i) + startAngle;
    const point = fromValues$2(radius[0] * cos(angle), radius[1] * sin(angle));
    add(point, centerV, point);
    points.push(point);
  }
  if (rotation < TAU) points.push(centerV);
  return create$a([points])
};

/**
 * Construct a circle in two dimensional space where all points are at the same distance from the center.
 * @see [ellipse]{@link module:modeling/primitives.ellipse} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of circle
 * @param {Number} [options.radius=1] - radius of circle
 * @param {Number} [options.startAngle=0] - start angle of circle, in radians
 * @param {Number} [options.endAngle=TAU] - end angle of circle, in radians
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.circle
 * @example
 * let myshape = circle({radius: 10})
 */
const circle = (options) => {
  const defaults = {
    center: [0, 0],
    radius: 1,
    startAngle: 0,
    endAngle: TAU,
    segments: 32
  };
  let { center, radius, startAngle, endAngle, segments } = Object.assign({}, defaults, options);

  if (!isGT(radius, 0)) throw new Error('radius must be greater than zero')

  radius = [radius, radius];

  return ellipse({ center, radius, startAngle, endAngle, segments })
};

/**
 * Construct an axis-aligned solid cuboid in three dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cuboid
 * @param {Array} [options.size=[2,2,2]] - dimensions of cuboid; width, depth, height
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.cuboid
 *
 * @example
 * let myshape = cuboid(size: [5, 10, 5]})
 */
const cuboid = (options) => {
  const defaults = {
    center: [0, 0, 0],
    size: [2, 2, 2]
  };
  const { center, size } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 3)) throw new Error('center must be an array of X, Y and Z values')
  if (!isNumberArray(size, 3)) throw new Error('size must be an array of width, depth and height values')
  if (!size.every((n) => n > 0)) throw new Error('size values must be greater than zero')

  const result = create$8(
    // adjust a basic shape to size
    [
      [[0, 4, 6, 2], [-1, 0, 0]],
      [[1, 3, 7, 5], [+1, 0, 0]],
      [[0, 1, 5, 4], [0, -1, 0]],
      [[2, 6, 7, 3], [0, +1, 0]],
      [[0, 2, 3, 1], [0, 0, -1]],
      [[4, 5, 7, 6], [0, 0, +1]]
    ].map((info) => {
      const vertices = info[0].map((i) => {
        const pos = [
          center[0] + (size[0] / 2) * (2 * !!(i & 1) - 1),
          center[1] + (size[1] / 2) * (2 * !!(i & 2) - 1),
          center[2] + (size[2] / 2) * (2 * !!(i & 4) - 1)
        ];
        return pos
      });
      return create$7(vertices)
    })
  );
  return result
};

/**
 * Construct an axis-aligned solid cube in three dimensional space with six square faces.
 * @see [cuboid]{@link module:modeling/primitives.cuboid} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cube
 * @param {Number} [options.size=2] - dimension of cube
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.cube
 * @example
 * let myshape = cube({size: 10})
 */
const cube = (options) => {
  const defaults = {
    center: [0, 0, 0],
    size: 2
  };
  let { center, size } = Object.assign({}, defaults, options);

  if (!isGT(size, 0)) throw new Error('size must be greater than zero')

  size = [size, size, size];

  return cuboid({ center, size })
};

/**
 * Construct a Z axis-aligned elliptic cylinder in three dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Number} [options.height=2] - height of cylinder
 * @param {Array} [options.startRadius=[1,1]] - radius of rounded start, must be two dimensional array
 * @param {Number} [options.startAngle=0] - start angle of cylinder, in radians
 * @param {Array} [options.endRadius=[1,1]] - radius of rounded end, must be two dimensional array
 * @param {Number} [options.endAngle=TAU] - end angle of cylinder, in radians
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new geometry
 * @alias module:modeling/primitives.cylinderElliptic
 *
 * @example
 * let myshape = cylinderElliptic({height: 2, startRadius: [10,5], endRadius: [8,3]})
 */
const cylinderElliptic = (options) => {
  const defaults = {
    center: [0, 0, 0],
    height: 2,
    startRadius: [1, 1],
    startAngle: 0,
    endRadius: [1, 1],
    endAngle: TAU,
    segments: 32
  };
  let { center, height, startRadius, startAngle, endRadius, endAngle, segments } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 3)) throw new Error('center must be an array of X, Y and Z values')
  if (!isGT(height, 0)) throw new Error('height must be greater then zero')
  if (!isNumberArray(startRadius, 2)) throw new Error('startRadius must be an array of X and Y values')
  if (!startRadius.every((n) => n >= 0)) throw new Error('startRadius values must be positive')
  if (!isNumberArray(endRadius, 2)) throw new Error('endRadius must be an array of X and Y values')
  if (!endRadius.every((n) => n >= 0)) throw new Error('endRadius values must be positive')
  if (endRadius.every((n) => n === 0) && startRadius.every((n) => n === 0)) throw new Error('at least one radius must be positive')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be positive')
  if (!isGTE(endAngle, 0)) throw new Error('endAngle must be positive')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  startAngle = startAngle % TAU;
  endAngle = endAngle % TAU;

  let rotation = TAU;
  if (startAngle < endAngle) {
    rotation = endAngle - startAngle;
  }
  if (startAngle > endAngle) {
    rotation = endAngle + (TAU - startAngle);
  }

  const minRadius = Math.min(startRadius[0], startRadius[1], endRadius[0], endRadius[1]);
  const minAngle = Math.acos(((minRadius * minRadius) + (minRadius * minRadius) - (EPS * EPS)) /
                            (2 * minRadius * minRadius));
  if (rotation < minAngle) throw new Error('startAngle and endAngle do not define a significant rotation')

  const slices = Math.floor(segments * (rotation / TAU));

  const start = fromValues$3(0, 0, -(height / 2));
  const end = fromValues$3(0, 0, height / 2);
  const ray = subtract$3(create$b(), end, start);

  const axisX = fromValues$3(1, 0, 0);
  const axisY = fromValues$3(0, 1, 0);

  const v1 = create$b();
  const v2 = create$b();
  const v3 = create$b();
  const genVertex = (stack, slice, radius) => {
    const angle = slice * rotation + startAngle;
    scale$3(v1, axisX, radius[0] * cos(angle));
    scale$3(v2, axisY, radius[1] * sin(angle));
    add$1(v1, v1, v2);

    scale$3(v3, ray, stack);
    add$1(v3, v3, start);
    return add$1(create$b(), v1, v3)
  };

  // adjust the vertices to center
  const fromVertices = (...vertices) => {
    const newVertices = vertices.map((vertex) => add$1(create$b(), vertex, center));
    return create$7(newVertices)
  };

  const polygons = [];
  for (let i = 0; i < slices; i++) {
    const t0 = i / slices;
    let t1 = (i + 1) / slices;
    // fix rounding error when rotating TAU radians
    if (rotation === TAU && i === slices - 1) t1 = 0;

    if (endRadius[0] === startRadius[0] && endRadius[1] === startRadius[1]) {
      polygons.push(fromVertices(start, genVertex(0, t1, endRadius), genVertex(0, t0, endRadius)));
      polygons.push(fromVertices(genVertex(0, t1, endRadius), genVertex(1, t1, endRadius), genVertex(1, t0, endRadius), genVertex(0, t0, endRadius)));
      polygons.push(fromVertices(end, genVertex(1, t0, endRadius), genVertex(1, t1, endRadius)));
    } else {
      if (startRadius[0] > 0 && startRadius[1] > 0) {
        polygons.push(fromVertices(start, genVertex(0, t1, startRadius), genVertex(0, t0, startRadius)));
      }
      if (startRadius[0] > 0 || startRadius[1] > 0) {
        polygons.push(fromVertices(genVertex(0, t0, startRadius), genVertex(0, t1, startRadius), genVertex(1, t0, endRadius)));
      }
      if (endRadius[0] > 0 && endRadius[1] > 0) {
        polygons.push(fromVertices(end, genVertex(1, t0, endRadius), genVertex(1, t1, endRadius)));
      }
      if (endRadius[0] > 0 || endRadius[1] > 0) {
        polygons.push(fromVertices(genVertex(1, t0, endRadius), genVertex(0, t1, startRadius), genVertex(1, t1, endRadius)));
      }
    }
  }
  if (rotation < TAU) {
    polygons.push(fromVertices(start, genVertex(0, 0, startRadius), end));
    polygons.push(fromVertices(genVertex(0, 0, startRadius), genVertex(1, 0, endRadius), end));
    polygons.push(fromVertices(start, end, genVertex(0, 1, startRadius)));
    polygons.push(fromVertices(genVertex(0, 1, startRadius), end, genVertex(1, 1, endRadius)));
  }
  const result = create$8(polygons);
  return result
};

/**
 * Construct a Z axis-aligned cylinder in three dimensional space.
 * @see [cylinderElliptic]{@link module:modeling/primitives.cylinderElliptic} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Number} [options.height=2] - height of cylinder
 * @param {Number} [options.radius=1] - radius of cylinder (at both start and end)
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new geometry
 * @alias module:modeling/primitives.cylinder
 *
 * @example
 * let myshape = cylinder({height: 2, radius: 10})
 */
const cylinder = (options) => {
  const defaults = {
    center: [0, 0, 0],
    height: 2,
    radius: 1,
    segments: 32
  };
  const { center, height, radius, segments } = Object.assign({}, defaults, options);

  if (!isGT(radius, 0)) throw new Error('radius must be greater than zero')

  const newOptions = {
    center,
    height,
    startRadius: [radius, radius],
    endRadius: [radius, radius],
    segments
  };

  return cylinderElliptic(newOptions)
};

/**
 * Construct an axis-aligned ellipsoid in three dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of ellipsoid
 * @param {Array} [options.radius=[1,1,1]] - radius of ellipsoid, along X, Y and Z
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Array} [options.axes] -  an array with three vectors for the x, y and z base vectors
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.ellipsoid
 *
 * @example
 * let myshape = ellipsoid({radius: [5, 10, 20]})
*/
const ellipsoid = (options) => {
  const defaults = {
    center: [0, 0, 0],
    radius: [1, 1, 1],
    segments: 32,
    axes: [[1, 0, 0], [0, -1, 0], [0, 0, 1]]
  };
  const { center, radius, segments, axes } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 3)) throw new Error('center must be an array of X, Y and Z values')
  if (!isNumberArray(radius, 3)) throw new Error('radius must be an array of X, Y and Z values')
  if (!radius.every((n) => n > 0)) throw new Error('radius values must be greater than zero')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  const xVector = scale$3(create$b(), normalize$1(create$b(), axes[0]), radius[0]);
  const yVector = scale$3(create$b(), normalize$1(create$b(), axes[1]), radius[1]);
  const zVector = scale$3(create$b(), normalize$1(create$b(), axes[2]), radius[2]);

  const qSegments = Math.round(segments / 4);
  let prevCylinderVertex;
  const polygons = [];
  const p1 = create$b();
  const p2 = create$b();
  for (let slice1 = 0; slice1 <= segments; slice1++) {
    const angle = TAU * slice1 / segments;
    const cylinderVertex = add$1(create$b(), scale$3(p1, xVector, cos(angle)), scale$3(p2, yVector, sin(angle)));
    if (slice1 > 0) {
      let prevCosPitch, prevSinPitch;
      for (let slice2 = 0; slice2 <= qSegments; slice2++) {
        const pitch = TAU / 4 * slice2 / qSegments;
        const cosPitch = cos(pitch);
        const sinPitch = sin(pitch);
        if (slice2 > 0) {
          let vertices = [];
          let vertex;
          vertex = subtract$3(create$b(), scale$3(p1, prevCylinderVertex, prevCosPitch), scale$3(p2, zVector, prevSinPitch));
          vertices.push(add$1(vertex, vertex, center));
          vertex = subtract$3(create$b(), scale$3(p1, cylinderVertex, prevCosPitch), scale$3(p2, zVector, prevSinPitch));
          vertices.push(add$1(vertex, vertex, center));
          if (slice2 < qSegments) {
            vertex = subtract$3(create$b(), scale$3(p1, cylinderVertex, cosPitch), scale$3(p2, zVector, sinPitch));
            vertices.push(add$1(vertex, vertex, center));
          }
          vertex = subtract$3(create$b(), scale$3(p1, prevCylinderVertex, cosPitch), scale$3(p2, zVector, sinPitch));
          vertices.push(add$1(vertex, vertex, center));

          polygons.push(create$7(vertices));

          vertices = [];
          vertex = add$1(create$b(), scale$3(p1, prevCylinderVertex, prevCosPitch), scale$3(p2, zVector, prevSinPitch));
          vertices.push(add$1(create$b(), center, vertex));
          vertex = add$1(vertex, scale$3(p1, cylinderVertex, prevCosPitch), scale$3(p2, zVector, prevSinPitch));
          vertices.push(add$1(create$b(), center, vertex));
          if (slice2 < qSegments) {
            vertex = add$1(vertex, scale$3(p1, cylinderVertex, cosPitch), scale$3(p2, zVector, sinPitch));
            vertices.push(add$1(create$b(), center, vertex));
          }
          vertex = add$1(vertex, scale$3(p1, prevCylinderVertex, cosPitch), scale$3(p2, zVector, sinPitch));
          vertices.push(add$1(create$b(), center, vertex));
          vertices.reverse();

          polygons.push(create$7(vertices));
        }
        prevCosPitch = cosPitch;
        prevSinPitch = sinPitch;
      }
    }
    prevCylinderVertex = cylinderVertex;
  }
  return create$8(polygons)
};

/**
 * Construct a polyhedron in three dimensional space from the given set of 3D vertices and faces.
 * The faces can define outward or inward facing polygons (orientation).
 * However, each face must define a counterclockwise rotation of vertices which follows the right hand rule.
 * @param {Object} options - options for construction
 * @param {Array} options.points - list of points in 3D space
 * @param {Array} options.faces - list of faces, where each face is a set of indexes into the points
 * @param {Array} [options.colors=undefined] - list of RGBA colors to apply to each face
 * @param {String} [options.orientation='outward'] - orientation of faces
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.polyhedron
 *
 * @example
 * let myPoints = [ [10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10] ]
 * let myFaces = [ [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3] ]
 * let myShape = polyhedron({points: myPoints, faces: myFaces, orientation: 'inward'})
 */
const polyhedron = (options) => {
  const defaults = {
    points: [],
    faces: [],
    colors: undefined,
    orientation: 'outward'
  };
  const { points, faces, colors, orientation } = Object.assign({}, defaults, options);

  if (!(Array.isArray(points) && Array.isArray(faces))) {
    throw new Error('points and faces must be arrays')
  }
  if (points.length < 3) {
    throw new Error('three or more points are required')
  }
  if (faces.length < 1) {
    throw new Error('one or more faces are required')
  }
  if (colors) {
    if (!Array.isArray(colors)) {
      throw new Error('colors must be an array')
    }
    if (colors.length !== faces.length) {
      throw new Error('faces and colors must have the same length')
    }
  }
  points.forEach((vertex, i) => {
    if (!isNumberArray(vertex, 3)) throw new Error(`vertex ${i} must be an array of X, Y, Z values`)
  });
  faces.forEach((face, i) => {
    if (face.length < 3) throw new Error(`face ${i} must contain 3 or more indexes`)
    if (!isNumberArray(face, face.length)) throw new Error(`face ${i} must be an array of numbers`)
  });

  // invert the faces if orientation is inwards, as all internals expect outward facing polygons
  if (orientation !== 'outward') {
    faces.forEach((face) => face.reverse());
  }

  const polygons = faces.map((face, findex) => {
    const polygon = create$7(face.map((pindex) => points[pindex]));
    if (colors && colors[findex]) polygon.color = colors[findex];
    return polygon
  });

  return create$8(polygons)
};

/**
 * Construct a geodesic sphere based on icosahedron symmetry.
 * @param {Object} [options] - options for construction
 * @param {Number} [options.radius=1] - target radius of sphere
 * @param {Number} [options.frequency=6] - subdivision frequency per face, multiples of 6
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.geodesicSphere
 *
 * @example
 * let myshape = geodesicSphere({radius: 15, frequency: 18})
 */
const geodesicSphere = (options) => {
  const defaults = {
    radius: 1,
    frequency: 6
  };
  let { radius, frequency } = Object.assign({}, defaults, options);

  if (!isGT(radius, 0)) throw new Error('radius must be greater than zero')
  if (!isGTE(frequency, 6)) throw new Error('frequency must be six or more')

  // adjust the frequency to base 6
  frequency = Math.floor(frequency / 6);

  const ci = [ // hard-coded data of icosahedron (20 faces, all triangles)
    [0.850651, 0.000000, -0.525731],
    [0.850651, -0.000000, 0.525731],
    [-0.850651, -0.000000, 0.525731],
    [-0.850651, 0.000000, -0.525731],
    [0.000000, -0.525731, 0.850651],
    [0.000000, 0.525731, 0.850651],
    [0.000000, 0.525731, -0.850651],
    [0.000000, -0.525731, -0.850651],
    [-0.525731, -0.850651, -0.000000],
    [0.525731, -0.850651, -0.000000],
    [0.525731, 0.850651, 0.000000],
    [-0.525731, 0.850651, 0.000000]];

  const ti = [[0, 9, 1], [1, 10, 0], [6, 7, 0], [10, 6, 0], [7, 9, 0], [5, 1, 4], [4, 1, 9], [5, 10, 1], [2, 8, 3], [3, 11, 2], [2, 5, 4],
    [4, 8, 2], [2, 11, 5], [3, 7, 6], [6, 11, 3], [8, 7, 3], [9, 8, 4], [11, 10, 5], [10, 11, 6], [8, 9, 7]];

  const geodesicSubDivide = (p, frequency, offset) => {
    const p1 = p[0];
    const p2 = p[1];
    const p3 = p[2];
    let n = offset;
    const c = [];
    const f = [];

    //           p3
    //           /\
    //          /__\     frequency = 3
    //      i  /\  /\
    //        /__\/__\       total triangles = 9 (frequency*frequency)
    //       /\  /\  /\
    //     0/__\/__\/__\
    //    p1 0   j      p2

    for (let i = 0; i < frequency; i++) {
      for (let j = 0; j < frequency - i; j++) {
        const t0 = i / frequency;
        const t1 = (i + 1) / frequency;
        const s0 = j / (frequency - i);
        const s1 = (j + 1) / (frequency - i);
        const s2 = frequency - i - 1 ? j / (frequency - i - 1) : 1;
        const q = [];

        q[0] = mix3(mix3(p1, p2, s0), p3, t0);
        q[1] = mix3(mix3(p1, p2, s1), p3, t0);
        q[2] = mix3(mix3(p1, p2, s2), p3, t1);

        // -- normalize
        for (let k = 0; k < 3; k++) {
          const r = length$1(q[k]);
          for (let l = 0; l < 3; l++) {
            q[k][l] /= r;
          }
        }
        c.push(q[0], q[1], q[2]);
        f.push([n, n + 1, n + 2]); n += 3;

        if (j < frequency - i - 1) {
          const s3 = frequency - i - 1 ? (j + 1) / (frequency - i - 1) : 1;
          q[0] = mix3(mix3(p1, p2, s1), p3, t0);
          q[1] = mix3(mix3(p1, p2, s3), p3, t1);
          q[2] = mix3(mix3(p1, p2, s2), p3, t1);

          // -- normalize
          for (let k = 0; k < 3; k++) {
            const r = length$1(q[k]);
            for (let l = 0; l < 3; l++) {
              q[k][l] /= r;
            }
          }
          c.push(q[0], q[1], q[2]);
          f.push([n, n + 1, n + 2]); n += 3;
        }
      }
    }
    return { vertices: c, triangles: f, offset: n }
  };

  const mix3 = (a, b, f) => {
    const _f = 1 - f;
    const c = [];
    for (let i = 0; i < 3; i++) {
      c[i] = a[i] * _f + b[i] * f;
    }
    return c
  };

  let vertices = [];
  let faces = [];
  let offset = 0;

  for (let i = 0; i < ti.length; i++) {
    const g = geodesicSubDivide([ci[ti[i][0]], ci[ti[i][1]], ci[ti[i][2]]], frequency, offset);
    vertices = vertices.concat(g.vertices);
    faces = faces.concat(g.triangles);
    offset = g.offset;
  }

  let geometry = polyhedron({ points: vertices, faces: faces, orientation: 'inward' });
  if (radius !== 1) geometry = transform$6(fromScaling(create$c(), [radius, radius, radius]), geometry);
  return geometry
};

/**
 * Construct a new line in two dimensional space from the given points.
 * The points must be provided as an array, where each element is a 2D point.
 * @param {Array} points - array of points from which to create the path
 * @returns {path2} new 2D path
 * @alias module:modeling/primitives.line
 *
 * @example
 * let myshape = line([[10, 10], [-10, 10]])
 */
const line = (points) => {
  if (!Array.isArray(points)) throw new Error('points must be an array')

  return fromPoints$2({}, points)
};

/**
 * Construct a polygon in two dimensional space from a list of points, or a list of points and paths.
 * NOTE: The ordering of points is VERY IMPORTANT.
 * @param {Object} options - options for construction
 * @param {Array} options.points - points of the polygon : either flat or nested array of 2D points
 * @param {Array} [options.paths] - paths of the polygon : either flat or nested array of point indexes
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.polygon
 *
 * @example
 * let roof = [[10,11], [0,11], [5,20]]
 * let wall = [[0,0], [10,0], [10,10], [0,10]]
 *
 * let poly = polygon({ points: roof })
 * or
 * let poly = polygon({ points: [roof, wall] })
 * or
 * let poly = polygon({ points: roof, paths: [0, 1, 2] })
 * or
 * let poly = polygon({ points: [roof, wall], paths: [[0, 1, 2], [3, 4, 5, 6]] })
 */
const polygon = (options) => {
  const defaults = {
    points: [],
    paths: []
  };
  const { points, paths } = Object.assign({}, defaults, options);

  if (!(Array.isArray(points) && Array.isArray(paths))) throw new Error('points and paths must be arrays')

  let listOfPolys = points;
  if (Array.isArray(points[0])) {
    if (!Array.isArray(points[0][0])) {
      // points is an array of something... convert to list
      listOfPolys = [points];
    }
  }

  listOfPolys.forEach((list, i) => {
    if (!Array.isArray(list)) throw new Error('list of points ' + i + ' must be an array')
    if (list.length < 3) throw new Error('list of points ' + i + ' must contain three or more points')
    list.forEach((point, j) => {
      if (!Array.isArray(point)) throw new Error('list of points ' + i + ', point ' + j + ' must be an array')
      if (point.length < 2) throw new Error('list of points ' + i + ', point ' + j + ' must contain by X and Y values')
    });
  });

  let listOfPaths = paths;
  if (paths.length === 0) {
    // create a list of paths based on the points
    let count = 0;
    listOfPaths = listOfPolys.map((list) => list.map((point) => count++));
  }

  // flatten the listOfPoints for indexed access
  const allPoints = [];
  listOfPolys.forEach((list) => list.forEach((point) => allPoints.push(point)));

  const outlines = [];
  listOfPaths.forEach((path) => {
    const setOfPoints = path.map((index) => allPoints[index]);
    outlines.push(setOfPoints);
  });
  return create$a(outlines)
};

/**
 * Construct an axis-aligned rectangle in two dimensional space with four sides at right angles.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rectangle, width and length
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.rectangle
 *
 * @example
 * let myshape = rectangle({size: [10, 20]})
 */
const rectangle = (options) => {
  const defaults = {
    center: [0, 0],
    size: [2, 2]
  };
  const { center, size } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isNumberArray(size, 2)) throw new Error('size must be an array of X and Y values')
  if (!size.every((n) => n > 0)) throw new Error('size values must be greater than zero')

  const point = [size[0] / 2, size[1] / 2];
  const swapped = [point[0], -point[1]];

  const points = [
    subtract$1(create$9(), center, point),
    add(create$9(), center, swapped),
    add(create$9(), center, point),
    subtract$1(create$9(), center, swapped)
  ];
  return create$a([points])
};

const createCorners = (center, size, radius, segments, slice, positive) => {
  const pitch = (TAU / 4) * slice / segments;
  const cosPitch = cos(pitch);
  const sinPitch = sin(pitch);

  const layerSegments = segments - slice;
  let layerRadius = radius * cosPitch;
  let layerOffset = size[2] - (radius - (radius * sinPitch));
  if (!positive) layerOffset = (radius - (radius * sinPitch)) - size[2];

  layerRadius = layerRadius > EPS ? layerRadius : 0;

  const corner0 = add$1(create$b(), center, [size[0] - radius, size[1] - radius, layerOffset]);
  const corner1 = add$1(create$b(), center, [radius - size[0], size[1] - radius, layerOffset]);
  const corner2 = add$1(create$b(), center, [radius - size[0], radius - size[1], layerOffset]);
  const corner3 = add$1(create$b(), center, [size[0] - radius, radius - size[1], layerOffset]);
  const corner0Vertices = [];
  const corner1Vertices = [];
  const corner2Vertices = [];
  const corner3Vertices = [];
  for (let i = 0; i <= layerSegments; i++) {
    const radians = layerSegments > 0 ? TAU / 4 * i / layerSegments : 0;
    // FIXME allocate only once
    const point2d = fromAngleRadians(create$9(), radians);
    scale$1(point2d, point2d, layerRadius);
    const point3d = fromVec2(create$b(), point2d);
    corner0Vertices.push(add$1(create$b(), corner0, point3d));
    rotateZ$2(point3d, point3d, [0, 0, 0], TAU / 4);
    corner1Vertices.push(add$1(create$b(), corner1, point3d));
    rotateZ$2(point3d, point3d, [0, 0, 0], TAU / 4);
    corner2Vertices.push(add$1(create$b(), corner2, point3d));
    rotateZ$2(point3d, point3d, [0, 0, 0], TAU / 4);
    corner3Vertices.push(add$1(create$b(), corner3, point3d));
  }
  if (!positive) {
    corner0Vertices.reverse();
    corner1Vertices.reverse();
    corner2Vertices.reverse();
    corner3Vertices.reverse();
    return [corner3Vertices, corner2Vertices, corner1Vertices, corner0Vertices]
  }
  return [corner0Vertices, corner1Vertices, corner2Vertices, corner3Vertices]
};

const stitchCorners = (previousCorners, currentCorners) => {
  const polygons = [];
  for (let i = 0; i < previousCorners.length; i++) {
    const previous = previousCorners[i];
    const current = currentCorners[i];
    for (let j = 0; j < (previous.length - 1); j++) {
      polygons.push(create$7([previous[j], previous[j + 1], current[j]]));

      if (j < (current.length - 1)) {
        polygons.push(create$7([current[j], previous[j + 1], current[j + 1]]));
      }
    }
  }
  return polygons
};

const stitchWalls = (previousCorners, currentCorners) => {
  const polygons = [];
  for (let i = 0; i < previousCorners.length; i++) {
    let previous = previousCorners[i];
    let current = currentCorners[i];
    const p0 = previous[previous.length - 1];
    const c0 = current[current.length - 1];

    const j = (i + 1) % previousCorners.length;
    previous = previousCorners[j];
    current = currentCorners[j];
    const p1 = previous[0];
    const c1 = current[0];

    polygons.push(create$7([p0, p1, c1, c0]));
  }
  return polygons
};

const stitchSides = (bottomCorners, topCorners) => {
  // make a copy and reverse the bottom corners
  bottomCorners = [bottomCorners[3], bottomCorners[2], bottomCorners[1], bottomCorners[0]];
  bottomCorners = bottomCorners.map((corner) => corner.slice().reverse());

  const bottomVertices = [];
  bottomCorners.forEach((corner) => {
    corner.forEach((vertex) => bottomVertices.push(vertex));
  });

  const topVertices = [];
  topCorners.forEach((corner) => {
    corner.forEach((vertex) => topVertices.push(vertex));
  });

  const polygons = [];
  for (let i = 0; i < topVertices.length; i++) {
    const j = (i + 1) % topVertices.length;
    polygons.push(create$7([bottomVertices[i], bottomVertices[j], topVertices[j], topVertices[i]]));
  }
  return polygons
};

/**
 * Construct an axis-aligned solid cuboid in three dimensional space with rounded corners.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of rounded cube
 * @param {Array} [options.size=[2,2,2]] - dimension of rounded cube; width, depth, height
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.roundedCuboid
 *
 * @example
 * let myCube = roundedCuboid({size: [10, 20, 10], roundRadius: 2, segments: 16})
 */
const roundedCuboid = (options) => {
  const defaults = {
    center: [0, 0, 0],
    size: [2, 2, 2],
    roundRadius: 0.2,
    segments: 32
  };
  let { center, size, roundRadius, segments } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 3)) throw new Error('center must be an array of X, Y and Z values')
  if (!isNumberArray(size, 3)) throw new Error('size must be an array of X, Y and Z values')
  if (!size.every((n) => n > 0)) throw new Error('size values must be greater than zero')
  if (!isGT(roundRadius, 0)) throw new Error('roundRadius must be greater than zero')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  size = size.map((v) => v / 2); // convert to radius

  if (roundRadius > (size[0] - EPS) ||
      roundRadius > (size[1] - EPS) ||
      roundRadius > (size[2] - EPS)) throw new Error('roundRadius must be smaller then the radius of all dimensions')

  segments = Math.floor(segments / 4);

  let prevCornersPos = null;
  let prevCornersNeg = null;
  let polygons = [];
  for (let slice = 0; slice <= segments; slice++) {
    const cornersPos = createCorners(center, size, roundRadius, segments, slice, true);
    const cornersNeg = createCorners(center, size, roundRadius, segments, slice, false);

    if (slice === 0) {
      polygons = polygons.concat(stitchSides(cornersNeg, cornersPos));
    }

    if (prevCornersPos) {
      polygons = polygons.concat(stitchCorners(prevCornersPos, cornersPos),
        stitchWalls(prevCornersPos, cornersPos));
    }
    if (prevCornersNeg) {
      polygons = polygons.concat(stitchCorners(prevCornersNeg, cornersNeg),
        stitchWalls(prevCornersNeg, cornersNeg));
    }

    if (slice === segments) {
      // add the top
      let vertices = cornersPos.map((corner) => corner[0]);
      polygons.push(create$7(vertices));
      // add the bottom
      vertices = cornersNeg.map((corner) => corner[0]);
      polygons.push(create$7(vertices));
    }

    prevCornersPos = cornersPos;
    prevCornersNeg = cornersNeg;
  }

  return create$8(polygons)
};

/**
 * Construct a Z axis-aligned solid cylinder in three dimensional space with rounded ends.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Number} [options.height=2] - height of cylinder
 * @param {Number} [options.radius=1] - radius of cylinder
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.roundedCylinder
 *
 * @example
 * let myshape = roundedCylinder({ height: 10, radius: 2, roundRadius: 0.5 })
 */
const roundedCylinder = (options) => {
  const defaults = {
    center: [0, 0, 0],
    height: 2,
    radius: 1,
    roundRadius: 0.2,
    segments: 32
  };
  const { center, height, radius, roundRadius, segments } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 3)) throw new Error('center must be an array of X, Y and Z values')
  if (!isGT(height, 0)) throw new Error('height must be greater then zero')
  if (!isGT(radius, 0)) throw new Error('radius must be greater then zero')
  if (!isGT(roundRadius, 0)) throw new Error('roundRadius must be greater then zero')
  if (roundRadius > (radius - EPS)) throw new Error('roundRadius must be smaller then the radius')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  const start = [0, 0, -(height / 2)];
  const end = [0, 0, height / 2];
  const direction = subtract$3(create$b(), end, start);
  const length = length$1(direction);

  if ((2 * roundRadius) > (length - EPS)) throw new Error('height must be larger than twice roundRadius')

  let defaultNormal;
  if (Math.abs(direction[0]) > Math.abs(direction[1])) {
    defaultNormal = fromValues$3(0, 1, 0);
  } else {
    defaultNormal = fromValues$3(1, 0, 0);
  }

  const zVector = scale$3(create$b(), normalize$1(create$b(), direction), roundRadius);
  const xVector = scale$3(create$b(), normalize$1(create$b(), cross$1(create$b(), zVector, defaultNormal)), radius);
  const yVector = scale$3(create$b(), normalize$1(create$b(), cross$1(create$b(), xVector, zVector)), radius);

  add$1(start, start, zVector);
  subtract$3(end, end, zVector);

  const qSegments = Math.floor(0.25 * segments);

  const fromVertices = (vertices) => {
    // adjust the vertices to center
    const newVertices = vertices.map((vertex) => add$1(vertex, vertex, center));
    return create$7(newVertices)
  };

  const polygons = [];
  const v1 = create$b();
  const v2 = create$b();
  let prevCylinderVertex;
  for (let slice1 = 0; slice1 <= segments; slice1++) {
    const angle = TAU * slice1 / segments;
    const cylinderVertex = add$1(create$b(), scale$3(v1, xVector, cos(angle)), scale$3(v2, yVector, sin(angle)));
    if (slice1 > 0) {
      // cylinder wall
      let vertices = [];
      vertices.push(add$1(create$b(), start, cylinderVertex));
      vertices.push(add$1(create$b(), start, prevCylinderVertex));
      vertices.push(add$1(create$b(), end, prevCylinderVertex));
      vertices.push(add$1(create$b(), end, cylinderVertex));
      polygons.push(fromVertices(vertices));

      let prevCosPitch, prevSinPitch;
      let vertex;
      for (let slice2 = 0; slice2 <= qSegments; slice2++) {
        const pitch = TAU / 4 * slice2 / qSegments;
        const cosPitch = cos(pitch);
        const sinPitch = sin(pitch);
        if (slice2 > 0) {
          // cylinder rounding, start
          vertices = [];
          vertex = add$1(create$b(), start, subtract$3(v1, scale$3(v1, prevCylinderVertex, prevCosPitch), scale$3(v2, zVector, prevSinPitch)));
          vertices.push(vertex);
          vertex = add$1(create$b(), start, subtract$3(v1, scale$3(v1, cylinderVertex, prevCosPitch), scale$3(v2, zVector, prevSinPitch)));
          vertices.push(vertex);
          if (slice2 < qSegments) {
            vertex = add$1(create$b(), start, subtract$3(v1, scale$3(v1, cylinderVertex, cosPitch), scale$3(v2, zVector, sinPitch)));
            vertices.push(vertex);
          }
          vertex = add$1(create$b(), start, subtract$3(v1, scale$3(v1, prevCylinderVertex, cosPitch), scale$3(v2, zVector, sinPitch)));
          vertices.push(vertex);

          polygons.push(fromVertices(vertices));

          // cylinder rounding, end
          vertices = [];
          vertex = add$1(create$b(), scale$3(v1, prevCylinderVertex, prevCosPitch), scale$3(v2, zVector, prevSinPitch));
          add$1(vertex, vertex, end);
          vertices.push(vertex);
          vertex = add$1(create$b(), scale$3(v1, cylinderVertex, prevCosPitch), scale$3(v2, zVector, prevSinPitch));
          add$1(vertex, vertex, end);
          vertices.push(vertex);
          if (slice2 < qSegments) {
            vertex = add$1(create$b(), scale$3(v1, cylinderVertex, cosPitch), scale$3(v2, zVector, sinPitch));
            add$1(vertex, vertex, end);
            vertices.push(vertex);
          }
          vertex = add$1(create$b(), scale$3(v1, prevCylinderVertex, cosPitch), scale$3(v2, zVector, sinPitch));
          add$1(vertex, vertex, end);
          vertices.push(vertex);
          vertices.reverse();

          polygons.push(fromVertices(vertices));
        }
        prevCosPitch = cosPitch;
        prevSinPitch = sinPitch;
      }
    }
    prevCylinderVertex = cylinderVertex;
  }
  return create$8(polygons)
};

/**
 * Construct an axis-aligned rectangle in two dimensional space with rounded corners.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rounded rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rounded rectangle; width and length
 * @param {Number} [options.roundRadius=0.2] - round radius of corners
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.roundedRectangle
 *
 * @example
 * let myshape = roundedRectangle({size: [10, 20], roundRadius: 2})
 */
const roundedRectangle = (options) => {
  const defaults = {
    center: [0, 0],
    size: [2, 2],
    roundRadius: 0.2,
    segments: 32
  };
  let { center, size, roundRadius, segments } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isNumberArray(size, 2)) throw new Error('size must be an array of X and Y values')
  if (!size.every((n) => n > 0)) throw new Error('size values must be greater than zero')
  if (!isGT(roundRadius, 0)) throw new Error('roundRadius must be greater than zero')
  if (!isGTE(segments, 4)) throw new Error('segments must be four or more')

  size = size.map((v) => v / 2); // convert to radius

  if (roundRadius > (size[0] - EPS) ||
      roundRadius > (size[1] - EPS)) throw new Error('roundRadius must be smaller then the radius of all dimensions')

  const cornerSegments = Math.floor(segments / 4);

  // create sets of points that define the corners
  const corner0 = add(create$9(), center, [size[0] - roundRadius, size[1] - roundRadius]);
  const corner1 = add(create$9(), center, [roundRadius - size[0], size[1] - roundRadius]);
  const corner2 = add(create$9(), center, [roundRadius - size[0], roundRadius - size[1]]);
  const corner3 = add(create$9(), center, [size[0] - roundRadius, roundRadius - size[1]]);
  const corner0Points = [];
  const corner1Points = [];
  const corner2Points = [];
  const corner3Points = [];
  for (let i = 0; i <= cornerSegments; i++) {
    const radians = TAU / 4 * i / cornerSegments;
    const point = fromAngleRadians(create$9(), radians);
    scale$1(point, point, roundRadius);
    corner0Points.push(add(create$9(), corner0, point));
    rotate$1(point, point, create$9(), TAU / 4);
    corner1Points.push(add(create$9(), corner1, point));
    rotate$1(point, point, create$9(), TAU / 4);
    corner2Points.push(add(create$9(), corner2, point));
    rotate$1(point, point, create$9(), TAU / 4);
    corner3Points.push(add(create$9(), corner3, point));
  }

  const points = corner0Points.concat(corner1Points, corner2Points, corner3Points);
  return create$a([points])
};

/**
 * Construct a sphere in three dimensional space where all vertices are at the same distance from the center.
 * @see [ellipsoid]{@link module:modeling/primitives.ellipsoid} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of sphere
 * @param {Number} [options.radius=1] - radius of sphere
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Array} [options.axes] -  an array with three vectors for the x, y and z base vectors
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.sphere
 *
 * @example
 * let myshape = sphere({radius: 5})
 */
const sphere = (options) => {
  const defaults = {
    center: [0, 0, 0],
    radius: 1,
    segments: 32,
    axes: [[1, 0, 0], [0, -1, 0], [0, 0, 1]]
  };
  let { center, radius, segments, axes } = Object.assign({}, defaults, options);

  if (!isGT(radius, 0)) throw new Error('radius must be greater than zero')

  radius = [radius, radius, radius];

  return ellipsoid({ center, radius, segments, axes })
};

/**
 * Construct an axis-aligned square in two dimensional space with four equal sides at right angles.
 * @see [rectangle]{@link module:modeling/primitives.rectangle} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of square
 * @param {Number} [options.size=2] - dimension of square
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.square
 *
 * @example
 * let myshape = square({size: 10})
 */
const square = (options) => {
  const defaults = {
    center: [0, 0],
    size: 2
  };
  let { center, size } = Object.assign({}, defaults, options);

  if (!isGT(size, 0)) throw new Error('size must be greater than zero')

  size = [size, size];

  return rectangle({ center, size })
};

// @see http://www.jdawiseman.com/papers/easymath/surds_star_inner_radius.html
const getRadiusRatio = (vertices, density) => {
  if (vertices > 0 && density > 1 && density < vertices / 2) {
    return Math.cos(Math.PI * density / vertices) / Math.cos(Math.PI * (density - 1) / vertices)
  }
  return 0
};

const getPoints = (vertices, radius, startAngle, center) => {
  const a = TAU / vertices;

  const points = [];
  for (let i = 0; i < vertices; i++) {
    const point = fromAngleRadians(create$9(), a * i + startAngle);
    scale$1(point, point, radius);
    add(point, center, point);
    points.push(point);
  }
  return points
};

/**
 * Construct a star in two dimensional space.
 * @see https://en.wikipedia.org/wiki/Star_polygon
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of star
 * @param {Number} [options.vertices=5] - number of vertices (P) on the star
 * @param {Number} [options.density=2] - density (Q) of star
 * @param {Number} [options.outerRadius=1] - outer radius of vertices
 * @param {Number} [options.innerRadius=0] - inner radius of vertices, or zero to calculate
 * @param {Number} [options.startAngle=0] - starting angle for first vertex, in radians
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.star
 *
 * @example
 * let star1 = star({vertices: 8, outerRadius: 10}) // star with 8/2 density
 * let star2 = star({vertices: 12, outerRadius: 40, innerRadius: 20}) // star with given radius
 */
const star = (options) => {
  const defaults = {
    center: [0, 0],
    vertices: 5,
    outerRadius: 1,
    innerRadius: 0,
    density: 2,
    startAngle: 0
  };
  let { center, vertices, outerRadius, innerRadius, density, startAngle } = Object.assign({}, defaults, options);

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isGTE(vertices, 2)) throw new Error('vertices must be two or more')
  if (!isGT(outerRadius, 0)) throw new Error('outerRadius must be greater than zero')
  if (!isGTE(innerRadius, 0)) throw new Error('innerRadius must be greater than zero')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be greater than zero')

  // force integers
  vertices = Math.floor(vertices);
  density = Math.floor(density);

  startAngle = startAngle % TAU;

  if (innerRadius === 0) {
    if (!isGTE(density, 2)) throw new Error('density must be two or more')
    innerRadius = outerRadius * getRadiusRatio(vertices, density);
  }

  const centerV = clone$8(center);

  const outerPoints = getPoints(vertices, outerRadius, startAngle, centerV);
  const innerPoints = getPoints(vertices, innerRadius, startAngle + Math.PI / vertices, centerV);

  const allPoints = [];
  for (let i = 0; i < vertices; i++) {
    allPoints.push(outerPoints[i]);
    allPoints.push(innerPoints[i]);
  }

  return create$a([allPoints])
};

/**
 * Mirror the given objects using the given options.
 * @param {Object} options - options for mirror
 * @param {Array} [options.origin=[0,0,0]] - the origin of the plane
 * @param {Array} [options.normal=[0,0,1]] - the normal vector of the plane
 * @param {...Object} objects - the objects to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirror
 *
 * @example
 * let myshape = mirror({normal: [0,0,10]}, cube({center: [0,0,15], radius: [20, 25, 5]}))
 */
const mirror = (options, ...objects) => {
  const defaults = {
    origin: [0, 0, 0],
    normal: [0, 0, 1] // Z axis
  };
  const { origin, normal } = Object.assign({}, defaults, options);

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const planeOfMirror = fromNormalAndPoint(create$6(), normal, origin);
  // verify the plane, i.e. check that the given normal was valid
  if (Number.isNaN(planeOfMirror[0])) {
    throw new Error('the given origin and normal do not define a proper plane')
  }

  const matrix = mirrorByPlane(create$c(), planeOfMirror);

  const results = objects.map((object) => {
    if (isA$2(object)) return transform$5(matrix, object)
    if (isA$5(object)) return transform$a(matrix, object)
    if (isA$3(object)) return transform$6(matrix, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Mirror the given objects about the X axis.
 * @param {...Object} objects - the objects to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorX
 */
const mirrorX = (...objects) => mirror({ normal: [1, 0, 0] }, objects);

/**
 * Mirror the given objects about the Y axis.
 * @param {...Object} objects - the geometries to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorY
 */
const mirrorY = (...objects) => mirror({ normal: [0, 1, 0] }, objects);

/**
 * Mirror the given objects about the Z axis.
 * @param {...Object} objects - the geometries to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorZ
 */
const mirrorZ = (...objects) => mirror({ normal: [0, 0, 1] }, objects);

// https://en.wikipedia.org/wiki/Greatest_common_divisor#Using_Euclid's_algorithm
const gcd = (a, b) => {
  if (a === b) { return a }
  if (a < b) { return gcd(b, a) }
  if (b === 1) { return 1 }
  if (b === 0) { return a }
  return gcd(b, a % b)
};

const lcm = (a, b) => (a * b) / gcd(a, b);

// Return a set of edges that encloses the same area by splitting
// the given edges to have newLength total edges.
const repartitionEdges = (newLength, edges) => {
  // NOTE: This implementation splits each edge evenly.
  const multiple = newLength / edges.length;
  if (multiple === 1) {
    return edges
  }

  const divisor = fromValues$3(multiple, multiple, multiple);

  const newEdges = [];
  edges.forEach((edge) => {
    const increment = subtract$3(create$b(), edge[1], edge[0]);
    divide$1(increment, increment, divisor);

    // repartition the edge
    let prev = edge[0];
    for (let i = 1; i <= multiple; ++i) {
      const next = add$1(create$b(), prev, increment);
      newEdges.push([prev, next]);
      prev = next;
    }
  });
  return newEdges
};

const EPSAREA = (EPS * EPS / 2) * Math.sin(Math.PI / 3);

/*
 * Extrude (build) walls between the given slices.
 * Each wall consists of two triangles, which may be invalid if slices are overlapping.
 */
const extrudeWalls = (slice0, slice1) => {
  let edges0 = toEdges(slice0);
  let edges1 = toEdges(slice1);

  if (edges0.length !== edges1.length) {
    // different shapes, so adjust one or both to the same number of edges
    const newLength = lcm(edges0.length, edges1.length);
    if (newLength !== edges0.length) edges0 = repartitionEdges(newLength, edges0);
    if (newLength !== edges1.length) edges1 = repartitionEdges(newLength, edges1);
  }

  const walls = [];
  edges0.forEach((edge0, i) => {
    const edge1 = edges1[i];

    const poly0 = create$7([edge0[0], edge0[1], edge1[1]]);
    const poly0area = measureArea$2(poly0);
    if (Number.isFinite(poly0area) && poly0area > EPSAREA) walls.push(poly0);

    const poly1 = create$7([edge0[0], edge1[1], edge1[0]]);
    const poly1area = measureArea$2(poly1);
    if (Number.isFinite(poly1area) && poly1area > EPSAREA) walls.push(poly1);
  });
  return walls
};

const defaultCallback = (progress, index, base) => {
  let baseSlice = null;
  if (isA$5(base)) baseSlice = fromGeom2(base);
  if (isA$4(base)) baseSlice = fromVertices(toVertices$1(base));

  return progress === 0 || progress === 1 ? transform$3(fromTranslation(create$c(), [0, 0, progress]), baseSlice) : null
};

/**
 * Extrude a solid from the slices as returned by the callback function.
 * @see slice
 *
 * @param {Object} options - options for extrude
 * @param {Integer} [options.numberOfSlices=2] the number of slices to be generated by the callback
 * @param {Boolean} [options.capStart=true] the solid should have a cap at the start
 * @param {Boolean} [options.capEnd=true] the solid should have a cap at the end
 * @param {Boolean} [options.close=false] the solid should have a closing section between start and end
 * @param {Boolean} [options.repair=true] - repair gaps in the geometry
 * @param {Function} [options.callback] the callback function that generates each slice
 * @param {Object} base - the base object which is used to create slices (see the example for callback information)
 * @return {geom3} the extruded shape
 * @alias module:modeling/extrusions.extrudeFromSlices
 *
 * @example
 * // Parameters:
 * //   progress : the percent complete [0..1]
 * //   index : the index of the current slice [0..numberOfSlices - 1]
 * //   base : the base object as given
 * // Return Value:
 * //   slice or null (to skip)
 * const callback = (progress, index, base) => {
 *   ...
 *   return slice
 * }
 */
const extrudeFromSlices = (options, base) => {
  const defaults = {
    numberOfSlices: 2,
    capStart: true,
    capEnd: true,
    close: false,
    callback: defaultCallback
  };
  const { numberOfSlices, capStart, capEnd, close, callback: generate } = Object.assign({ }, defaults, options);

  if (numberOfSlices < 2) throw new Error('numberOfSlices must be 2 or more')

  const sMax = numberOfSlices - 1;

  let startSlice = null;
  let endSlice = null;
  let prevSlice = null;
  let polygons = [];
  for (let s = 0; s < numberOfSlices; s++) {
    // invoke the callback function to get the next slice
    // NOTE: callback can return null to skip the slice
    const currentSlice = generate(s / sMax, s, base);

    if (currentSlice) {
      if (!isA(currentSlice)) throw new Error('the callback function must return slice objects')

      if (currentSlice.contours.length === 0) throw new Error('the callback function must return slices with one or more contours')

      if (prevSlice) {
        polygons = polygons.concat(extrudeWalls(prevSlice, currentSlice));
      }

      // save start and end slices for caps if necessary
      if (s === 0) startSlice = currentSlice;
      if (s === (numberOfSlices - 1)) endSlice = currentSlice;

      prevSlice = currentSlice;
    }
  }

  if (capEnd) {
    // create a cap at the end
    const endPolygons = toPolygons(endSlice);
    polygons = polygons.concat(endPolygons);
  }
  if (capStart) {
    // create a cap at the start
    const startPolygons = toPolygons(startSlice).map(invert$1);
    polygons = polygons.concat(startPolygons);
  }
  if (!capStart && !capEnd) {
    // create walls between end and start slices
    if (close && !equals$3(endSlice, startSlice)) {
      polygons = polygons.concat(extrudeWalls(endSlice, startSlice));
    }
  }
  return create$8(polygons)
};

/**
 * Rotate extrude the given geometry using the given options.
 *
 * @param {Object} options - options for extrusion
 * @param {Number} [options.angle=TAU] - angle of the extrusion (RADIANS)
 * @param {Number} [options.startAngle=0] - start angle of the extrusion (RADIANS)
 * @param {String} [options.overflow='cap'] - what to do with points outside of bounds (+ / - x) :
 * defaults to capping those points to 0 (only supported behaviour for now)
 * @param {Number} [options.segments=12] - number of segments of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded geometry
 * @alias module:modeling/extrusions.extrudeRotate
 *
 * @example
 * const myshape = extrudeRotate({segments: 8, angle: TAU / 2}, circle({size: 3, center: [4, 0]}))
 */
const extrudeRotate = (options, geometry) => {
  const defaults = {
    segments: 12,
    startAngle: 0,
    angle: TAU,
    overflow: 'cap'
  };
  let { segments, startAngle, angle, overflow } = Object.assign({}, defaults, options);

  if (segments < 3) throw new Error('segments must be greater then 3')

  startAngle = Math.abs(startAngle) > TAU ? startAngle % TAU : startAngle;
  angle = Math.abs(angle) > TAU ? angle % TAU : angle;

  let endAngle = startAngle + angle;
  endAngle = Math.abs(endAngle) > TAU ? endAngle % TAU : endAngle;

  if (endAngle < startAngle) {
    const x = startAngle;
    startAngle = endAngle;
    endAngle = x;
  }
  let totalRotation = endAngle - startAngle;
  if (totalRotation <= 0.0) totalRotation = TAU;

  if (Math.abs(totalRotation) < TAU) {
    // adjust the segments to achieve the total rotation requested
    const anglePerSegment = TAU / segments;
    segments = Math.floor(Math.abs(totalRotation) / anglePerSegment);
    if (Math.abs(totalRotation) > (segments * anglePerSegment)) segments++;
  }

  // convert geometry to an array of sides, easier to deal with
  let shapeSides = toSides(geometry);
  if (shapeSides.length === 0) throw new Error('the given geometry cannot be empty')

  // determine if the extrusion can be computed in the first place
  // ie all the points have to be either x > 0 or x < 0

  // generic solution to always have a valid solid, even if points go beyond x/ -x
  // 1. split points up between all those on the 'left' side of the axis (x<0) & those on the 'right' (x>0)
  // 2. for each set of points do the extrusion operation IN OPPOSITE DIRECTIONS
  // 3. union the two resulting solids

  // 1. alt : OR : just cap of points at the axis ?

  const pointsWithNegativeX = shapeSides.filter((s) => (s[0][0] < 0));
  const pointsWithPositiveX = shapeSides.filter((s) => (s[0][0] >= 0));
  const arePointsWithNegAndPosX = pointsWithNegativeX.length > 0 && pointsWithPositiveX.length > 0;

  // FIXME actually there are cases where setting X=0 will change the basic shape
  // - Alternative #1 : don't allow shapes with both negative and positive X values
  // - Alternative #2 : remove one half of the shape (costly)
  if (arePointsWithNegAndPosX && overflow === 'cap') {
    if (pointsWithNegativeX.length > pointsWithPositiveX.length) {
      shapeSides = shapeSides.map((side) => {
        let point0 = side[0];
        let point1 = side[1];
        point0 = [Math.min(point0[0], 0), point0[1]];
        point1 = [Math.min(point1[0], 0), point1[1]];
        return [point0, point1]
      });
      // recreate the geometry from the (-) capped points
      geometry = reverse$5(fromSides(shapeSides));
      geometry = mirrorX(geometry);
    } else if (pointsWithPositiveX.length >= pointsWithNegativeX.length) {
      shapeSides = shapeSides.map((side) => {
        let point0 = side[0];
        let point1 = side[1];
        point0 = [Math.max(point0[0], 0), point0[1]];
        point1 = [Math.max(point1[0], 0), point1[1]];
        return [point0, point1]
      });
      // recreate the geometry from the (+) capped points
      geometry = fromSides(shapeSides);
    }
  }

  const rotationPerSlice = totalRotation / segments;
  const isCapped = Math.abs(totalRotation) < TAU;
  let baseSlice = fromGeom2(geometry);
  baseSlice = reverse$2(baseSlice);

  const matrix = create$c();
  const createSlice = (progress, index, base) => {
    let Zrotation = rotationPerSlice * index + startAngle;
    // fix rounding error when rotating TAU radians
    if (totalRotation === TAU && index === segments) {
      Zrotation = startAngle;
    }
    multiply$1(matrix, fromZRotation(matrix, Zrotation), fromXRotation(create$c(), TAU / 4));

    return transform$3(matrix, base)
  };

  options = {
    numberOfSlices: segments + 1,
    capStart: isCapped,
    capEnd: isCapped,
    close: !isCapped,
    callback: createSlice
  };
  return extrudeFromSlices(options, baseSlice)
};

/**
 * Rotate the given objects using the given options.
 * @param {Array} angles - angle (RADIANS) of rotations about X, Y, and Z axis
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotate
 *
 * @example
 * const newSphere = rotate([TAU / 8, 0, 0], sphere())
 */
const rotate = (angles, ...objects) => {
  if (!Array.isArray(angles)) throw new Error('angles must be an array')

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  // adjust the angles if necessary
  angles = angles.slice(); // don't modify the original
  while (angles.length < 3) angles.push(0);

  const yaw = angles[2];
  const pitch = angles[1];
  const roll = angles[0];

  const matrix = fromTaitBryanRotation(create$c(), yaw, pitch, roll);

  const results = objects.map((object) => {
    if (isA$2(object)) return transform$5(matrix, object)
    if (isA$5(object)) return transform$a(matrix, object)
    if (isA$3(object)) return transform$6(matrix, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Rotate the given objects about the X axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about X
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateX
 */
const rotateX = (angle, ...objects) => rotate([angle, 0, 0], objects);

/**
 * Rotate the given objects about the Y axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Y
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateY
 */
const rotateY = (angle, ...objects) => rotate([0, angle, 0], objects);

/**
 * Rotate the given objects about the Z axis, using the given options.
 * @param {Number} angle - angle (RADIANS) of rotations about Z
 * @param {...Object} objects - the objects to rotate
 * @return {Object|Array} the rotated object, or a list of rotated objects
 * @alias module:modeling/transforms.rotateZ
 */
const rotateZ = (angle, ...objects) => rotate([0, 0, angle], objects);

/**
 * Translate the given objects using the given options.
 * @param {Array} offset - offset (vector) of which to translate the objects
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translate
 *
 * @example
 * const newSphere = translate([5, 0, 10], sphere())
 */
const translate = (offset, ...objects) => {
  if (!Array.isArray(offset)) throw new Error('offset must be an array')

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  // adjust the offset if necessary
  offset = offset.slice(); // don't modify the original
  while (offset.length < 3) offset.push(0);

  const matrix = fromTranslation(create$c(), offset);

  const results = objects.map((object) => {
    if (isA$2(object)) return transform$5(matrix, object)
    if (isA$5(object)) return transform$a(matrix, object)
    if (isA$3(object)) return transform$6(matrix, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Translate the given objects along the X axis using the given options.
 * @param {Number} offset - X offset of which to translate the objects
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateX
 */
const translateX = (offset, ...objects) => translate([offset, 0, 0], objects);

/**
 * Translate the given objects along the Y axis using the given options.
 * @param {Number} offset - Y offset of which to translate the geometries
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateY
 */
const translateY = (offset, ...objects) => translate([0, offset, 0], objects);

/**
 * Translate the given objects along the Z axis using the given options.
 * @param {Number} offset - Z offset of which to translate the geometries
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateZ
 */
const translateZ = (offset, ...objects) => translate([0, 0, offset], objects);

/**
 * Construct a torus by revolving a small circle (inner) about the circumference of a large (outer) circle.
 * @param {Object} [options] - options for construction
 * @param {Number} [options.innerRadius=1] - radius of small (inner) circle
 * @param {Number} [options.outerRadius=4] - radius of large (outer) circle
 * @param {Integer} [options.innerSegments=32] - number of segments to create per rotation
 * @param {Integer} [options.outerSegments=32] - number of segments to create per rotation
 * @param {Integer} [options.innerRotation=0] - rotation of small (inner) circle in radians
 * @param {Number} [options.outerRotation=TAU] - rotation (outer) of the torus (RADIANS)
 * @param {Number} [options.startAngle=0] - start angle of the torus (RADIANS)
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.torus
 *
 * @example
 * let myshape = torus({ innerRadius: 10, outerRadius: 100 })
 */
const torus = (options) => {
  const defaults = {
    innerRadius: 1,
    innerSegments: 32,
    outerRadius: 4,
    outerSegments: 32,
    innerRotation: 0,
    startAngle: 0,
    outerRotation: TAU
  };
  const { innerRadius, innerSegments, outerRadius, outerSegments, innerRotation, startAngle, outerRotation } = Object.assign({}, defaults, options);

  if (!isGT(innerRadius, 0)) throw new Error('innerRadius must be greater than zero')
  if (!isGTE(innerSegments, 3)) throw new Error('innerSegments must be three or more')
  if (!isGT(outerRadius, 0)) throw new Error('outerRadius must be greater than zero')
  if (!isGTE(outerSegments, 3)) throw new Error('outerSegments must be three or more')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be positive')
  if (!isGT(outerRotation, 0)) throw new Error('outerRotation must be greater than zero')

  if (innerRadius >= outerRadius) throw new Error('inner circle is two large to rotate about the outer circle')

  let innerCircle = circle({ radius: innerRadius, segments: innerSegments });

  if (innerRotation !== 0) {
    innerCircle = rotate([0, 0, innerRotation], innerCircle);
  }

  innerCircle = translate([outerRadius, 0], innerCircle);

  const extrudeOptions = {
    startAngle: startAngle,
    angle: outerRotation,
    segments: outerSegments
  };
  return extrudeRotate(extrudeOptions, innerCircle)
};

// returns angle C
const solveAngleFromSSS = (a, b, c) => Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));

// returns side c
const solveSideFromSAS = (a, C, b) => {
  if (C > NEPS) {
    return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C))
  }

  // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
  return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12))
};

// AAA is when three angles of a triangle, but no sides
const solveAAA = (angles) => {
  const eps = Math.abs(angles[0] + angles[1] + angles[2] - Math.PI);
  if (eps > NEPS) throw new Error('AAA triangles require angles that sum to PI')

  const A = angles[0];
  const B = angles[1];
  const C = Math.PI - A - B;

  // Note: This is not 100% proper but...
  // default the side c length to 1
  // solve the other lengths
  const c = 1;
  const a = (c / Math.sin(C)) * Math.sin(A);
  const b = (c / Math.sin(C)) * Math.sin(B);
  return createTriangle(A, B, C, a, b, c)
};

// AAS is when two angles and one side are known, and the side is not between the angles
const solveAAS = (values) => {
  const A = values[0];
  const B = values[1];
  const C = Math.PI + NEPS - A - B;

  if (C < NEPS) throw new Error('AAS triangles require angles that sum to PI')

  const a = values[2];
  const b = (a / Math.sin(A)) * Math.sin(B);
  const c = (a / Math.sin(A)) * Math.sin(C);
  return createTriangle(A, B, C, a, b, c)
};

// ASA is when two angles and the side between the angles are known
const solveASA = (values) => {
  const A = values[0];
  const B = values[2];
  const C = Math.PI + NEPS - A - B;

  if (C < NEPS) throw new Error('ASA triangles require angles that sum to PI')

  const c = values[1];
  const a = (c / Math.sin(C)) * Math.sin(A);
  const b = (c / Math.sin(C)) * Math.sin(B);
  return createTriangle(A, B, C, a, b, c)
};

// SAS is when two sides and the angle between them are known
const solveSAS = (values) => {
  const c = values[0];
  const B = values[1];
  const a = values[2];

  const b = solveSideFromSAS(c, B, a);

  const A = solveAngleFromSSS(b, c, a); // solve for A
  const C = Math.PI - A - B;
  return createTriangle(A, B, C, a, b, c)
};

// SSA is when two sides and an angle that is not the angle between the sides are known
const solveSSA = (values) => {
  const c = values[0];
  const a = values[1];
  const C = values[2];

  const A = Math.asin(a * Math.sin(C) / c);
  const B = Math.PI - A - C;

  const b = (c / Math.sin(C)) * Math.sin(B);
  return createTriangle(A, B, C, a, b, c)
};

// SSS is when we know three sides of the triangle
const solveSSS = (lengths) => {
  const a = lengths[1];
  const b = lengths[2];
  const c = lengths[0];
  if (((a + b) <= c) || ((b + c) <= a) || ((c + a) <= b)) {
    throw new Error('SSS triangle is incorrect, as the longest side is longer than the sum of the other sides')
  }

  const A = solveAngleFromSSS(b, c, a); // solve for A
  const B = solveAngleFromSSS(c, a, b); // solve for B
  const C = Math.PI - A - B;
  return createTriangle(A, B, C, a, b, c)
};

const createTriangle = (A, B, C, a, b, c) => {
  const p0 = fromValues$2(0, 0); // everything starts from 0, 0
  const p1 = fromValues$2(c, 0);
  const p2 = fromValues$2(a, 0);
  add(p2, rotate$1(p2, p2, [0, 0], Math.PI - B), p1);
  return create$a([[p0, p1, p2]])
};

/**
 * Construct a triangle in two dimensional space from the given options.
 * The triangle is always constructed CCW from the origin, [0, 0, 0].
 * @see https://www.mathsisfun.com/algebra/trig-solving-triangles.html
 * @param {Object} [options] - options for construction
 * @param {String} [options.type='SSS'] - type of triangle to construct; A ~ angle, S ~ side
 * @param {Array} [options.values=[1,1,1]] - angle (radians) of corners or length of sides
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.triangle
 *
 * @example
 * let myshape = triangle({type: 'AAS', values: [degToRad(62), degToRad(35), 7]})
 */
const triangle = (options) => {
  const defaults = {
    type: 'SSS',
    values: [1, 1, 1]
  };
  let { type, values } = Object.assign({}, defaults, options);

  if (typeof (type) !== 'string') throw new Error('triangle type must be a string')
  type = type.toUpperCase();
  if (!((type[0] === 'A' || type[0] === 'S') &&
        (type[1] === 'A' || type[1] === 'S') &&
        (type[2] === 'A' || type[2] === 'S'))) throw new Error('triangle type must contain three letters; A or S')

  if (!isNumberArray(values, 3)) throw new Error('triangle values must contain three values')
  if (!values.every((n) => n > 0)) throw new Error('triangle values must be greater than zero')

  switch (type) {
    case 'AAA':
      return solveAAA(values)
    case 'AAS':
      return solveAAS(values)
    case 'ASA':
      return solveASA(values)
    case 'SAS':
      return solveSAS(values)
    case 'SSA':
      return solveSSA(values)
    case 'SSS':
      return solveSSS(values)
    default:
      throw new Error('invalid triangle type, try again')
  }
};

/**
 * Primitives provide the building blocks for complex parts.
 * Each primitive is a geometrical object that can be described mathematically, and therefore precise.
 * Primitives can be logically combined, transformed, extruded, etc.
 * @module modeling/primitives
 * @example
 * import { cube, ellipse, star } = require('@jscad/modeling/primitives')
 */

var index$8 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arc: arc,
  circle: circle,
  cube: cube,
  cuboid: cuboid,
  cylinder: cylinder,
  cylinderElliptic: cylinderElliptic,
  ellipse: ellipse,
  ellipsoid: ellipsoid,
  geodesicSphere: geodesicSphere,
  line: line,
  polygon: polygon,
  polyhedron: polyhedron,
  rectangle: rectangle,
  roundedCuboid: roundedCuboid,
  roundedCylinder: roundedCylinder,
  roundedRectangle: roundedRectangle,
  sphere: sphere,
  square: square,
  star: star,
  torus: torus,
  triangle: triangle
});

// -- data source from from http://paulbourke.net/dataformats/hershey/
// -- reduced to save some bytes...
// { [ascii code]: [width, x, y, ...] } - undefined value as path separator
const simplex = {
  height: 14,
  32: [16],
  33: [10, 5, 21, 5, 7, undefined, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2],
  34: [16, 4, 21, 4, 14, undefined, 12, 21, 12, 14],
  35: [21, 11, 25, 4, -7, undefined, 17, 25, 10, -7, undefined, 4, 12, 18, 12, undefined, 3, 6, 17, 6],
  36: [20, 8, 25, 8, -4, undefined, 12, 25, 12, -4, undefined, 17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3],
  37: [24, 21, 21, 3, 0, undefined, 8, 21, 10, 19, 10, 17, 9, 15, 7, 14, 5, 14, 3, 16, 3, 18, 4, 20, 6, 21, 8, 21, 10, 20, 13, 19, 16, 19, 19, 20, 21, 21, undefined, 17, 7, 15, 6, 14, 4, 14, 2, 16, 0, 18, 0, 20, 1, 21, 3, 21, 5, 19, 7, 17, 7],
  38: [26, 23, 12, 23, 13, 22, 14, 21, 14, 20, 13, 19, 11, 17, 6, 15, 3, 13, 1, 11, 0, 7, 0, 5, 1, 4, 2, 3, 4, 3, 6, 4, 8, 5, 9, 12, 13, 13, 14, 14, 16, 14, 18, 13, 20, 11, 21, 9, 20, 8, 18, 8, 16, 9, 13, 11, 10, 16, 3, 18, 1, 20, 0, 22, 0, 23, 1, 23, 2],
  39: [10, 5, 19, 4, 20, 5, 21, 6, 20, 6, 18, 5, 16, 4, 15],
  40: [14, 11, 25, 9, 23, 7, 20, 5, 16, 4, 11, 4, 7, 5, 2, 7, -2, 9, -5, 11, -7],
  41: [14, 3, 25, 5, 23, 7, 20, 9, 16, 10, 11, 10, 7, 9, 2, 7, -2, 5, -5, 3, -7],
  42: [16, 8, 21, 8, 9, undefined, 3, 18, 13, 12, undefined, 13, 18, 3, 12],
  43: [26, 13, 18, 13, 0, undefined, 4, 9, 22, 9],
  44: [10, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4],
  45: [26, 4, 9, 22, 9],
  46: [10, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2],
  47: [22, 20, 25, 2, -7],
  48: [20, 9, 21, 6, 20, 4, 17, 3, 12, 3, 9, 4, 4, 6, 1, 9, 0, 11, 0, 14, 1, 16, 4, 17, 9, 17, 12, 16, 17, 14, 20, 11, 21, 9, 21],
  49: [20, 6, 17, 8, 18, 11, 21, 11, 0],
  50: [20, 4, 16, 4, 17, 5, 19, 6, 20, 8, 21, 12, 21, 14, 20, 15, 19, 16, 17, 16, 15, 15, 13, 13, 10, 3, 0, 17, 0],
  51: [20, 5, 21, 16, 21, 10, 13, 13, 13, 15, 12, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4],
  52: [20, 13, 21, 3, 7, 18, 7, undefined, 13, 21, 13, 0],
  53: [20, 15, 21, 5, 21, 4, 12, 5, 13, 8, 14, 11, 14, 14, 13, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4],
  54: [20, 16, 18, 15, 20, 12, 21, 10, 21, 7, 20, 5, 17, 4, 12, 4, 7, 5, 3, 7, 1, 10, 0, 11, 0, 14, 1, 16, 3, 17, 6, 17, 7, 16, 10, 14, 12, 11, 13, 10, 13, 7, 12, 5, 10, 4, 7],
  55: [20, 17, 21, 7, 0, undefined, 3, 21, 17, 21],
  56: [20, 8, 21, 5, 20, 4, 18, 4, 16, 5, 14, 7, 13, 11, 12, 14, 11, 16, 9, 17, 7, 17, 4, 16, 2, 15, 1, 12, 0, 8, 0, 5, 1, 4, 2, 3, 4, 3, 7, 4, 9, 6, 11, 9, 12, 13, 13, 15, 14, 16, 16, 16, 18, 15, 20, 12, 21, 8, 21],
  57: [20, 16, 14, 15, 11, 13, 9, 10, 8, 9, 8, 6, 9, 4, 11, 3, 14, 3, 15, 4, 18, 6, 20, 9, 21, 10, 21, 13, 20, 15, 18, 16, 14, 16, 9, 15, 4, 13, 1, 10, 0, 8, 0, 5, 1, 4, 3],
  58: [10, 5, 14, 4, 13, 5, 12, 6, 13, 5, 14, undefined, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2],
  59: [10, 5, 14, 4, 13, 5, 12, 6, 13, 5, 14, undefined, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4],
  60: [24, 20, 18, 4, 9, 20, 0],
  61: [26, 4, 12, 22, 12, undefined, 4, 6, 22, 6],
  62: [24, 4, 18, 20, 9, 4, 0],
  63: [18, 3, 16, 3, 17, 4, 19, 5, 20, 7, 21, 11, 21, 13, 20, 14, 19, 15, 17, 15, 15, 14, 13, 13, 12, 9, 10, 9, 7, undefined, 9, 2, 8, 1, 9, 0, 10, 1, 9, 2],
  64: [27, 18, 13, 17, 15, 15, 16, 12, 16, 10, 15, 9, 14, 8, 11, 8, 8, 9, 6, 11, 5, 14, 5, 16, 6, 17, 8, undefined, 12, 16, 10, 14, 9, 11, 9, 8, 10, 6, 11, 5, undefined, 18, 16, 17, 8, 17, 6, 19, 5, 21, 5, 23, 7, 24, 10, 24, 12, 23, 15, 22, 17, 20, 19, 18, 20, 15, 21, 12, 21, 9, 20, 7, 19, 5, 17, 4, 15, 3, 12, 3, 9, 4, 6, 5, 4, 7, 2, 9, 1, 12, 0, 15, 0, 18, 1, 20, 2, 21, 3, undefined, 19, 16, 18, 8, 18, 6, 19, 5],
  65: [18, 9, 21, 1, 0, undefined, 9, 21, 17, 0, undefined, 4, 7, 14, 7],
  66: [21, 4, 21, 4, 0, undefined, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, undefined, 4, 11, 13, 11, 16, 10, 17, 9, 18, 7, 18, 4, 17, 2, 16, 1, 13, 0, 4, 0],
  67: [21, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5],
  68: [21, 4, 21, 4, 0, undefined, 4, 21, 11, 21, 14, 20, 16, 18, 17, 16, 18, 13, 18, 8, 17, 5, 16, 3, 14, 1, 11, 0, 4, 0],
  69: [19, 4, 21, 4, 0, undefined, 4, 21, 17, 21, undefined, 4, 11, 12, 11, undefined, 4, 0, 17, 0],
  70: [18, 4, 21, 4, 0, undefined, 4, 21, 17, 21, undefined, 4, 11, 12, 11],
  71: [21, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 18, 8, undefined, 13, 8, 18, 8],
  72: [22, 4, 21, 4, 0, undefined, 18, 21, 18, 0, undefined, 4, 11, 18, 11],
  73: [8, 4, 21, 4, 0],
  74: [16, 12, 21, 12, 5, 11, 2, 10, 1, 8, 0, 6, 0, 4, 1, 3, 2, 2, 5, 2, 7],
  75: [21, 4, 21, 4, 0, undefined, 18, 21, 4, 7, undefined, 9, 12, 18, 0],
  76: [17, 4, 21, 4, 0, undefined, 4, 0, 16, 0],
  77: [24, 4, 21, 4, 0, undefined, 4, 21, 12, 0, undefined, 20, 21, 12, 0, undefined, 20, 21, 20, 0],
  78: [22, 4, 21, 4, 0, undefined, 4, 21, 18, 0, undefined, 18, 21, 18, 0],
  79: [22, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21],
  80: [21, 4, 21, 4, 0, undefined, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 14, 17, 12, 16, 11, 13, 10, 4, 10],
  81: [22, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, undefined, 12, 4, 18, -2],
  82: [21, 4, 21, 4, 0, undefined, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, 4, 11, undefined, 11, 11, 18, 0],
  83: [20, 17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3],
  84: [16, 8, 21, 8, 0, undefined, 1, 21, 15, 21],
  85: [22, 4, 21, 4, 6, 5, 3, 7, 1, 10, 0, 12, 0, 15, 1, 17, 3, 18, 6, 18, 21],
  86: [18, 1, 21, 9, 0, undefined, 17, 21, 9, 0],
  87: [24, 2, 21, 7, 0, undefined, 12, 21, 7, 0, undefined, 12, 21, 17, 0, undefined, 22, 21, 17, 0],
  88: [20, 3, 21, 17, 0, undefined, 17, 21, 3, 0],
  89: [18, 1, 21, 9, 11, 9, 0, undefined, 17, 21, 9, 11],
  90: [20, 17, 21, 3, 0, undefined, 3, 21, 17, 21, undefined, 3, 0, 17, 0],
  91: [14, 4, 25, 4, -7, undefined, 5, 25, 5, -7, undefined, 4, 25, 11, 25, undefined, 4, -7, 11, -7],
  92: [14, 0, 21, 14, -3],
  93: [14, 9, 25, 9, -7, undefined, 10, 25, 10, -7, undefined, 3, 25, 10, 25, undefined, 3, -7, 10, -7],
  94: [16, 6, 15, 8, 18, 10, 15, undefined, 3, 12, 8, 17, 13, 12, undefined, 8, 17, 8, 0],
  95: [16, 0, -2, 16, -2],
  96: [10, 6, 21, 5, 20, 4, 18, 4, 16, 5, 15, 6, 16, 5, 17],
  97: [19, 15, 14, 15, 0, undefined, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3],
  98: [19, 4, 21, 4, 0, undefined, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3],
  99: [18, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3],
  100: [19, 15, 21, 15, 0, undefined, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3],
  101: [18, 3, 8, 15, 8, 15, 10, 14, 12, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3],
  102: [12, 10, 21, 8, 21, 6, 20, 5, 17, 5, 0, undefined, 2, 14, 9, 14],
  103: [19, 15, 14, 15, -2, 14, -5, 13, -6, 11, -7, 8, -7, 6, -6, undefined, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3],
  104: [19, 4, 21, 4, 0, undefined, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0],
  105: [8, 3, 21, 4, 20, 5, 21, 4, 22, 3, 21, undefined, 4, 14, 4, 0],
  106: [10, 5, 21, 6, 20, 7, 21, 6, 22, 5, 21, undefined, 6, 14, 6, -3, 5, -6, 3, -7, 1, -7],
  107: [17, 4, 21, 4, 0, undefined, 14, 14, 4, 4, undefined, 8, 8, 15, 0],
  108: [8, 4, 21, 4, 0],
  109: [30, 4, 14, 4, 0, undefined, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0, undefined, 15, 10, 18, 13, 20, 14, 23, 14, 25, 13, 26, 10, 26, 0],
  110: [19, 4, 14, 4, 0, undefined, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0],
  111: [19, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3, 16, 6, 16, 8, 15, 11, 13, 13, 11, 14, 8, 14],
  112: [19, 4, 14, 4, -7, undefined, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3],
  113: [19, 15, 14, 15, -7, undefined, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3],
  114: [13, 4, 14, 4, 0, undefined, 4, 8, 5, 11, 7, 13, 9, 14, 12, 14],
  115: [17, 14, 11, 13, 13, 10, 14, 7, 14, 4, 13, 3, 11, 4, 9, 6, 8, 11, 7, 13, 6, 14, 4, 14, 3, 13, 1, 10, 0, 7, 0, 4, 1, 3, 3],
  116: [12, 5, 21, 5, 4, 6, 1, 8, 0, 10, 0, undefined, 2, 14, 9, 14],
  117: [19, 4, 14, 4, 4, 5, 1, 7, 0, 10, 0, 12, 1, 15, 4, undefined, 15, 14, 15, 0],
  118: [16, 2, 14, 8, 0, undefined, 14, 14, 8, 0],
  119: [22, 3, 14, 7, 0, undefined, 11, 14, 7, 0, undefined, 11, 14, 15, 0, undefined, 19, 14, 15, 0],
  120: [17, 3, 14, 14, 0, undefined, 14, 14, 3, 0],
  121: [16, 2, 14, 8, 0, undefined, 14, 14, 8, 0, 6, -4, 4, -6, 2, -7, 1, -7],
  122: [17, 14, 14, 3, 0, undefined, 3, 14, 14, 14, undefined, 3, 0, 14, 0],
  123: [14, 9, 25, 7, 24, 6, 23, 5, 21, 5, 19, 6, 17, 7, 16, 8, 14, 8, 12, 6, 10, undefined, 7, 24, 6, 22, 6, 20, 7, 18, 8, 17, 9, 15, 9, 13, 8, 11, 4, 9, 8, 7, 9, 5, 9, 3, 8, 1, 7, 0, 6, -2, 6, -4, 7, -6, undefined, 6, 8, 8, 6, 8, 4, 7, 2, 6, 1, 5, -1, 5, -3, 6, -5, 7, -6, 9, -7],
  124: [8, 4, 25, 4, -7],
  125: [14, 5, 25, 7, 24, 8, 23, 9, 21, 9, 19, 8, 17, 7, 16, 6, 14, 6, 12, 8, 10, undefined, 7, 24, 8, 22, 8, 20, 7, 18, 6, 17, 5, 15, 5, 13, 6, 11, 10, 9, 6, 7, 5, 5, 5, 3, 6, 1, 7, 0, 8, -2, 8, -4, 7, -6, undefined, 8, 8, 6, 6, 6, 4, 7, 2, 8, 1, 9, -1, 9, -3, 8, -5, 7, -6, 5, -7],
  126: [24, 3, 6, 3, 8, 4, 11, 6, 12, 8, 12, 10, 11, 14, 8, 16, 7, 18, 7, 20, 8, 21, 10, undefined, 3, 8, 4, 10, 6, 11, 8, 11, 10, 10, 14, 7, 16, 6, 18, 6, 20, 7, 21, 10, 21, 12]
};

const defaultsVectorParams = {
  xOffset: 0,
  yOffset: 0,
  input: '?',
  align: 'left',
  font: simplex,
  height: 14, // old vector_xxx simplex font height
  lineSpacing: 30/14, // old vector_xxx ratio
  letterSpacing: 0, // proportion of font size, i.e. CSS em
  extrudeOffset: 0
};

// vectorsXXX parameters handler
const vectorParams = (options, input) => {
  if (!input && typeof options === 'string') {
    options = { input: options };
  }
  options = options || {};
  const params = Object.assign({}, defaultsVectorParams, options);
  params.input = input || params.input;
  return params
};

/**
 * Represents a character as an anonymous object containing a list of 2D paths.
 * @typedef {Object} VectorChar
 * @property {number} width - character width
 * @property {number} height - character height (uppercase)
 * @property {Array} paths - list of 2D paths
 */

/**
 * Construct a {@link VectorChar} from an ASCII character whose code is between 31 and 127.
 * If the character is not supported it is replaced by a question mark.
 *
 * @param {Object} [options] - options for construction
 * @param {number} [options.xOffset=0] - x offset
 * @param {number} [options.yOffset=0] - y offset
 * @param {number} [options.height=21] - font size/character height (uppercase height)
 * @param {number} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
 * @param {String} [options.input='?'] - ascii character (ignored/overwritten if provided as second parameter)
 * @param {String} [character='?'] - ascii character
 * @returns {VectorChar} a new vertor char object
 * @alias module:modeling/text.vectorChar
 *
 * @example
 * let mycharacter = vectorChar()
 * or
 * let mycharacter = vectorChar('A')
 * or
 * let mycharacter = vectorChar({ xOffset: 57 }, 'C')
 * or
 * let mycharacter = vectorChar({ xOffset: 78, input: '!' })
 */
const vectorChar = (options, character) => {
  const {
    xOffset, yOffset, input, font, height, extrudeOffset
  } = vectorParams(options, character);

  let code = input.charCodeAt(0);
  if (!code || !font[code]) {
    code = 63; // invalid character so use ?
  }

  const glyph = [].concat(font[code]);
  const ratio = (height - extrudeOffset) / font.height;
  const extrudeYOffset = (extrudeOffset / 2);
  const width = glyph.shift() * ratio;

  const paths = [];
  let polyline = [];
  for (let i = 0, il = glyph.length; i < il; i += 2) {
    const gx = ratio * glyph[i] + xOffset;
    const gy = ratio * glyph[i + 1] + yOffset + extrudeYOffset;
    if (glyph[i] !== undefined) {
      polyline.push([gx, gy]);
      continue
    }
    paths.push(fromPoints$2({}, polyline));
    polyline = [];
    i--;
  }
  if (polyline.length) {
    paths.push(fromPoints$2({}, polyline));
  }

  return { width, height, paths }
};

/**
 * Represents a line of characters as an anonymous object containing a list of VectorChar.
 * @typedef {Object} VectorLine
 * @property {number} width - sum of character width and letter spacing
 * @property {number} height - maximum height of character heights
 * @property {Array} characters - list of vector characters
 */

const matrix = create$c();

const translateLine = (options, line) => {
  const { x, y } = Object.assign({ x: 0, y: 0 }, options);

  identity(matrix);
  translate$1(matrix, matrix, [x, y, 0]);

  line.chars = line.chars.map((vchar) => {
    vchar.paths = vchar.paths.map((path) => {
      return transform$5(matrix, path)
    });
    return vchar
  });
  return line
};

/**
 * Construct an array of character segments from an ascii string whose characters code is between 31 and 127,
 * if one character is not supported it is replaced by a question mark.
 * @param {Object|String} [options] - options for construction or ascii string
 * @param {Float} [options.xOffset=0] - x offset
 * @param {Float} [options.yOffset=0] - y offset
 * @param {Float} [options.height=14] - height of requested characters (uppercase height), i.e. font height in points
 * @param {Float} [options.lineSpacing=30/14] - line spacing expressed as a percentage of height
 * @param {Float} [options.letterSpacing=0] - extra letter spacing, expressed as a proportion of height, i.e. like CSS em
 * @param {String} [options.align='left'] - multi-line text alignment: left, center, right
 * @param {Float} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
 * @param {String} [options.input='?'] - ascii string (ignored/overwrited if provided as seconds parameter)
 * @param {String} [text='?'] - ascii string
 * @returns {Array} list of vector line objects, where each line contains a list of vector character objects
 * @alias module:modeling/text.vectorText
 *
 * @example
 * let mylines = vectorText()
 * or
 * let mylines = vectorText('OpenJSCAD')
 * or
 * let mylines = vectorText({ yOffset: -50 }, 'OpenJSCAD')
 * or
 * let mylines = vectorText({ yOffset: -80, input: 'OpenJSCAD' })
 */
const vectorText = (options, text) => {
  const {
    xOffset, yOffset, input, font, height, align, extrudeOffset, lineSpacing, letterSpacing
  } = vectorParams(options, text);

  // NOTE: Just like CSS letter-spacing, the spacing could be positive or negative
  const extraLetterSpacing = (height * letterSpacing);

  // manage the list of lines
  let maxWidth = 0; // keep track of max width for final alignment
  let line = { width: 0, height: 0, chars: [] };
  let lines = [];

  const pushLine = () => {
    maxWidth = Math.max(maxWidth, line.width);

    if (line.chars.length) lines.push(line);
    line = { width: 0, height: 0, chars: [] };
  };

  // convert the text into a list of vector lines
  let x = xOffset;
  let y = yOffset;
  let vchar;
  let il = input.length;
  for (let i = 0; i < il; i++) {
    const character = input[i];
    if (character === '\n') {
      pushLine();

      // reset x and y for a new line
      x = xOffset;
      y -= height * lineSpacing;
      continue
    }
    // convert the character
    vchar = vectorChar({ xOffset: x, yOffset: y, font, height, extrudeOffset }, character);

    let width = vchar.width + extraLetterSpacing;
    x += width;

    // update current line
    line.width += width;
    line.height = Math.max(line.height, vchar.height);
    if (character !== ' ') {
      line.chars = line.chars.concat(vchar);
    }
  }
  if (line.chars.length) pushLine();

  // align all lines as requested
  lines = lines.map((line) => {
    const diff = maxWidth - line.width;
    if (align === 'right') {
      return translateLine({ x: diff }, line)
    } else if (align === 'center') {
      return translateLine({ x: diff / 2 }, line)
    } else {
      return line
    }
  });
  return lines
};

/**
 * Texts provide sets of segments for each character or text strings.
 * The segments can be used to create outlines for both 2D and 3D geometry.
 * Note: Only ASCII characters are supported.
 * @module modeling/text
 * @example
 * import { vectorChar, vectorText } from '@jscad/modeling/text'
 */

var index$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  vectorChar: vectorChar,
  vectorText: vectorText
});

// list of supported geometries

/**
 * @param {Array} shapes - list of shapes to compare
 * @returns {Boolean} true if the given shapes are of the same type
 * @alias module:modeling/utils.areAllShapesTheSameType
 */
const areAllShapesTheSameType = (shapes) => {
  let previousType;
  for (const shape of shapes) {
    let currentType = 0;
    if (isA$5(shape)) currentType = 1;
    if (isA$3(shape)) currentType = 2;
    if (isA$2(shape)) currentType = 3;

    if (previousType && currentType !== previousType) return false
    previousType = currentType;
  }
  return true
};

/**
 * Convert the given angle (degrees) to radians.
 * @param {Number} degrees - angle in degrees
 * @returns {Number} angle in radians
 * @alias module:modeling/utils.degToRad
 */
const degToRad = (degrees) => degrees * 0.017453292519943295;

/**
 * @alias module:modeling/utils.fnNumberSort
 */
const fnNumberSort = (a, b) => a - b;

/**
 * Insert the given element into the give array using the compareFunction.
 * @alias module:modeling/utils.insertSorted
 */
const insertSorted = (array, element, compareFunc) => {
  let leftBound = 0;
  let rightBound = array.length;
  while (rightBound > leftBound) {
    const testIndex = Math.floor((leftBound + rightBound) / 2);
    const testElement = array[testIndex];
    const compareResult = compareFunc(element, testElement);
    if (compareResult > 0) { // element > testElement
      leftBound = testIndex + 1;
    } else {
      rightBound = testIndex;
    }
  }
  array.splice(leftBound, 0, element);
};

/**
 * Build an array of at minimum a specified length from an existing array and a padding value. IF the array is already larger than the target length, it will not be shortened.
 * @param {Array} anArray - the source array to copy into the result.
 * @param {*} padding - the value to add to the new array to reach the desired length.
 * @param {Number} targetLength - The desired length of the return array.
 * @returns {Array} an array of at least 'targetLength' length
 * @alias module:modeling/utils.padArrayToLength
 */
const padArrayToLength = (anArray, padding, targetLength) => {
  anArray = anArray.slice();
  while (anArray.length < targetLength) {
    anArray.push(padding);
  }
  return anArray
};

/**
 * Calculate the number of segments from the given radius based on minimum length or angle.
 * @param {Number} radius - radius of the requested shape
 * @param {Number} minimumLength - minimum length of segments; length > 0
 * @param {Number} minimumAngle - minimum angle (radians) between segments; 0 > angle < TAU
 * @returns {Number} number of segments to complete the radius
 * @alias module:modeling/utils.radiusToSegments
 */
const radiusToSegments = (radius, minimumLength, minimumAngle) => {
  const ss = minimumLength > 0 ? radius * TAU / minimumLength : 0;
  const as = minimumAngle > 0 ? TAU / minimumAngle : 0;
  // minimum segments is four(4) for round primitives
  return Math.ceil(Math.max(ss, as, 4))
};

/**
 * Convert the given angle (radians) to degrees.
 * @param {Number} radians - angle in radians
 * @returns {Number} angle in degrees
 * @alias module:modeling/utils.radToDeg
 */
const radToDeg = (radians) => radians * 57.29577951308232;

/**
 * Utility functions of various sorts.
 * @module modeling/utils
 * @example
 * import { flatten, insertSorted } from '@jscad/modeling/utils'
 */

var index$6 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  areAllShapesTheSameType: areAllShapesTheSameType,
  degToRad: degToRad,
  flatten: flatten,
  fnNumberSort: fnNumberSort,
  insertSorted: insertSorted,
  padArrayToLength: padArrayToLength,
  radiusToSegments: radiusToSegments,
  radToDeg: radToDeg
});

const INTERSECTION = 0;
const UNION = 1;
const DIFFERENCE = 2;
const XOR = 3;

/*
 * Follows "An implementation of top-down splaying"
 * by D. Sleator <sleator@cs.cmu.edu> March 1992
 *
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/splay-tree
 */

const DEFAULT_COMPARE = (a, b) => a > b ? 1 : a < b ? -1 : 0;

class Node$1 {
  constructor (key, data) {
    this.key = key;
    this.data = data;
    this.left = null;
    this.right = null;
    this.next = null;
  }
}

/**
 * Simple top down splay, not requiring i to be in the tree t.
 */
const splay = (i, t, comparator) => {
  const N = new Node$1(null, null);
  let l = N;
  let r = N;

  while (true) {
    const cmp = comparator(i, t.key);
    // if (i < t.key) {
    if (cmp < 0) {
      if (t.left === null) break
      // if (i < t.left.key) {
      if (comparator(i, t.left.key) < 0) {
        const y = t.left; /* rotate right */
        t.left = y.right;
        y.right = t;
        t = y;
        if (t.left === null) break
      }
      r.left = t; /* link right */
      r = t;
      t = t.left;
    // } else if (i > t.key) {
    } else if (cmp > 0) {
      if (t.right === null) break
      // if (i > t.right.key) {
      if (comparator(i, t.right.key) > 0) {
        const y = t.right; /* rotate left */
        t.right = y.left;
        y.left = t;
        t = y;
        if (t.right === null) break
      }
      l.right = t; /* link left */
      l = t;
      t = t.right;
    } else break
  }
  /* assemble */
  l.right = t.left;
  r.left = t.right;
  t.left = N.right;
  t.right = N.left;
  return t
};

const insert = (i, data, t, comparator) => {
  const node = new Node$1(i, data);

  if (t === null) {
    node.left = node.right = null;
    return node
  }

  t = splay(i, t, comparator);
  const cmp = comparator(i, t.key);
  if (cmp < 0) {
    node.left = t.left;
    node.right = t;
    t.left = null;
  } else if (cmp >= 0) {
    node.right = t.right;
    node.left = t;
    t.right = null;
  }
  return node
};

const split = (key, v, comparator) => {
  let left = null;
  let right = null;
  if (v) {
    v = splay(key, v, comparator);

    const cmp = comparator(v.key, key);
    if (cmp === 0) {
      left = v.left;
      right = v.right;
    } else if (cmp < 0) {
      right = v.right;
      v.right = null;
      left = v;
    } else {
      left = v.left;
      v.left = null;
      right = v;
    }
  }
  return { left, right }
};

const merge = (left, right, comparator) => {
  if (right === null) return left
  if (left === null) return right

  right = splay(left.key, right, comparator);
  right.left = left;
  return right
};

/**
 * Prints level of the tree
 */
const printRow = (root, prefix, isTail, out, printNode) => {
  if (root) {
    out(`${prefix}${isTail ? '└── ' : '├── '}${printNode(root)}\n`);
    const indent = prefix + (isTail ? '    ' : '│   ');
    if (root.left) printRow(root.left, indent, false, out, printNode);
    if (root.right) printRow(root.right, indent, true, out, printNode);
  }
};

class Tree$1 {
  constructor (comparator = DEFAULT_COMPARE) {
    this._comparator = comparator;
    this._root = null;
    this._size = 0;
  }

  /**
   * Inserts a key, allows duplicates
   */
  insert (key, data) {
    this._size++;
    this._root = insert(key, data, this._root, this._comparator);
    return this._root
  }

  /**
   * Adds a key, if it is not present in the tree
   */
  add (key, data) {
    const node = new Node$1(key, data);

    if (this._root === null) {
      node.left = node.right = null;
      this._size++;
      this._root = node;
    }

    const comparator = this._comparator;
    const t = splay(key, this._root, comparator);
    const cmp = comparator(key, t.key);
    if (cmp === 0) this._root = t;
    else {
      if (cmp < 0) {
        node.left = t.left;
        node.right = t;
        t.left = null;
      } else if (cmp > 0) {
        node.right = t.right;
        node.left = t;
        t.right = null;
      }
      this._size++;
      this._root = node;
    }

    return this._root
  }

  /**
   * @param {Key} key
   * @return {Node|null}
   */
  remove (key) {
    this._root = this._remove(key, this._root, this._comparator);
  }

  /**
   * Deletes i from the tree if it's there
   */
  _remove (i, t, comparator) {
    let x;
    if (t === null) return null
    t = splay(i, t, comparator);
    const cmp = comparator(i, t.key);
    if (cmp === 0) { /* found it */
      if (t.left === null) {
        x = t.right;
      } else {
        x = splay(i, t.left, comparator);
        x.right = t.right;
      }
      this._size--;
      return x
    }
    return t /* It wasn't there */
  }

  /**
   * Removes and returns the node with smallest key
   */
  pop () {
    let node = this._root;
    if (node) {
      while (node.left) node = node.left;
      this._root = splay(node.key, this._root, this._comparator);
      this._root = this._remove(node.key, this._root, this._comparator);
      return { key: node.key, data: node.data }
    }
    return null
  }

  /**
   * Find without splaying
   */
  findStatic (key) {
    let current = this._root;
    const compare = this._comparator;
    while (current) {
      const cmp = compare(key, current.key);
      if (cmp === 0) return current
      else if (cmp < 0) current = current.left;
      else current = current.right;
    }
    return null
  }

  find (key) {
    if (this._root) {
      this._root = splay(key, this._root, this._comparator);
      if (this._comparator(key, this._root.key) !== 0) return null
    }
    return this._root
  }

  contains (key) {
    let current = this._root;
    const compare = this._comparator;
    while (current) {
      const cmp = compare(key, current.key);
      if (cmp === 0) return true
      else if (cmp < 0) current = current.left;
      else current = current.right;
    }
    return false
  }

  forEach (visitor, ctx) {
    let current = this._root;
    const Q = []; /* Initialize stack s */
    let done = false;

    while (!done) {
      if (current !== null) {
        Q.push(current);
        current = current.left;
      } else {
        if (Q.length !== 0) {
          current = Q.pop();
          visitor.call(ctx, current);

          current = current.right;
        } else done = true;
      }
    }
    return this
  }

  /**
   * Walk key range from `low` to `high`. Stops if `fn` returns a value.
   */
  range (low, high, fn, ctx) {
    const Q = [];
    const compare = this._comparator;
    let node = this._root;
    let cmp;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        node = node.left;
      } else {
        node = Q.pop();
        cmp = compare(node.key, high);
        if (cmp > 0) {
          break
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node)) return this // stop if smth is returned
        }
        node = node.right;
      }
    }
    return this
  }

  /**
   * Returns array of keys
   */
  keys () {
    const keys = [];
    this.forEach(({ key }) => keys.push(key));
    return keys
  }

  /**
   * Returns array of all the data in the nodes
   */
  values () {
    const values = [];
    this.forEach(({ data }) => values.push(data));
    return values
  }

  min () {
    if (this._root) return this.minNode(this._root).key
    return null
  }

  max () {
    if (this._root) return this.maxNode(this._root).key
    return null
  }

  minNode (t = this._root) {
    if (t) while (t.left) t = t.left;
    return t
  }

  maxNode (t = this._root) {
    if (t) while (t.right) t = t.right;
    return t
  }

  /**
   * Returns node at given index
   */
  at (index) {
    let current = this._root;
    let done = false;
    let i = 0;
    const Q = [];

    while (!done) {
      if (current) {
        Q.push(current);
        current = current.left;
      } else {
        if (Q.length > 0) {
          current = Q.pop();
          if (i === index) return current
          i++;
          current = current.right;
        } else done = true;
      }
    }
    return null
  }

  next (d) {
    let root = this._root;
    let successor = null;

    if (d.right) {
      successor = d.right;
      while (successor.left) successor = successor.left;
      return successor
    }

    const comparator = this._comparator;
    while (root) {
      const cmp = comparator(d.key, root.key);
      if (cmp === 0) break
      else if (cmp < 0) {
        successor = root;
        root = root.left;
      } else root = root.right;
    }

    return successor
  }

  prev (d) {
    let root = this._root;
    let predecessor = null;

    if (d.left !== null) {
      predecessor = d.left;
      while (predecessor.right) predecessor = predecessor.right;
      return predecessor
    }

    const comparator = this._comparator;
    while (root) {
      const cmp = comparator(d.key, root.key);
      if (cmp === 0) break
      else if (cmp < 0) root = root.left;
      else {
        predecessor = root;
        root = root.right;
      }
    }
    return predecessor
  }

  clear () {
    this._root = null;
    this._size = 0;
    return this
  }

  toList () {
    return toList(this._root)
  }

  /**
   * Bulk-load items. Both array have to be same size
   */
  load (keys, values = [], presort = false) {
    let size = keys.length;
    const comparator = this._comparator;

    // sort if needed
    if (presort) sort(keys, values, 0, size - 1, comparator);

    if (this._root === null) { // empty tree
      this._root = loadRecursive(keys, values, 0, size);
      this._size = size;
    } else { // that re-builds the whole tree from two in-order traversals
      const mergedList = mergeLists(this.toList(), createList(keys, values), comparator);
      size = this._size + size;
      this._root = sortedListToBST({ head: mergedList }, 0, size);
    }
    return this
  }

  isEmpty () { return this._root === null }

  size () { return this._size }
  root () { return this._root }

  toString (printNode = (n) => String(n.key)) {
    const out = [];
    printRow(this._root, '', true, (v) => out.push(v), printNode);
    return out.join('')
  }

  update (key, newKey, newData) {
    const comparator = this._comparator;
    let { left, right } = split(key, this._root, comparator);
    if (comparator(key, newKey) < 0) {
      right = insert(newKey, newData, right, comparator);
    } else {
      left = insert(newKey, newData, left, comparator);
    }
    this._root = merge(left, right, comparator);
  }

  split (key) {
    return split(key, this._root, this._comparator)
  }

  * [Symbol.iterator] () {
    let n = this.minNode();
    while (n) {
      yield n;
      n = this.next(n);
    }
  }
}

const loadRecursive = (keys, values, start, end) => {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const key = keys[middle];
    const data = values[middle];
    const node = new Node$1(key, data);
    node.left = loadRecursive(keys, values, start, middle);
    node.right = loadRecursive(keys, values, middle + 1, end);
    return node
  }
  return null
};

const createList = (keys, values) => {
  const head = new Node$1(null, null);
  let p = head;
  for (let i = 0; i < keys.length; i++) {
    p = p.next = new Node$1(keys[i], values[i]);
  }
  p.next = null;
  return head.next
};

const toList = (root) => {
  let current = root;
  const Q = [];
  let done = false;

  const head = new Node$1(null, null);
  let p = head;

  while (!done) {
    if (current) {
      Q.push(current);
      current = current.left;
    } else {
      if (Q.length > 0) {
        current = p = p.next = Q.pop();
        current = current.right;
      } else done = true;
    }
  }
  p.next = null; // that'll work even if the tree was empty
  return head.next
};

const sortedListToBST = (list, start, end) => {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const left = sortedListToBST(list, start, middle);

    const root = list.head;
    root.left = left;

    list.head = list.head.next;

    root.right = sortedListToBST(list, middle + 1, end);
    return root
  }
  return null
};

const mergeLists = (l1, l2, compare) => {
  const head = new Node$1(null, null); // dummy
  let p = head;

  let p1 = l1;
  let p2 = l2;

  while (p1 !== null && p2 !== null) {
    if (compare(p1.key, p2.key) < 0) {
      p.next = p1;
      p1 = p1.next;
    } else {
      p.next = p2;
      p2 = p2.next;
    }
    p = p.next;
  }

  if (p1 !== null) {
    p.next = p1;
  } else if (p2 !== null) {
    p.next = p2;
  }

  return head.next
};

const sort = (keys, values, left, right, compare) => {
  if (left >= right) return

  const pivot = keys[(left + right) >> 1];
  let i = left - 1;
  let j = right + 1;

  while (true) {
    do i++; while (compare(keys[i], pivot) < 0)
    do j--; while (compare(keys[j], pivot) > 0)
    if (i >= j) break

    let tmp = keys[i];
    keys[i] = keys[j];
    keys[j] = tmp;

    tmp = values[i];
    values[i] = values[j];
    values[j] = tmp;
  }

  sort(keys, values, left, j, compare);
  sort(keys, values, j + 1, right, compare);
};

const NORMAL = 0;
const NON_CONTRIBUTING = 1;
const SAME_TRANSITION = 2;
const DIFFERENT_TRANSITION = 3;

/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

/**
 * @param {SweepEvent} event
 * @param {SweepEvent} prev
 * @param {Operation} operation
 */
const computeFields = (event, prev, operation) => {
  // compute inOut and otherInOut fields
  if (prev === null) {
    event.inOut = false;
    event.otherInOut = true;

  // previous line segment in sweepline belongs to the same polygon
  } else {
    if (event.isSubject === prev.isSubject) {
      event.inOut = !prev.inOut;
      event.otherInOut = prev.otherInOut;

    // previous line segment in sweepline belongs to the clipping polygon
    } else {
      event.inOut = !prev.otherInOut;
      event.otherInOut = prev.isVertical() ? !prev.inOut : prev.inOut;
    }

    // compute prevInResult field
    if (prev) {
      event.prevInResult = (!inResult(prev, operation) || prev.isVertical()) ? prev.prevInResult : prev;
    }
  }

  // check if the line segment belongs to the Boolean operation
  const isInResult = inResult(event, operation);
  if (isInResult) {
    event.resultTransition = determineResultTransition(event, operation);
  } else {
    event.resultTransition = 0;
  }
};

const inResult = (event, operation) => {
  switch (event.type) {
    case NORMAL:
      switch (operation) {
        case INTERSECTION:
          return !event.otherInOut
        case UNION:
          return event.otherInOut
        case DIFFERENCE:
          // return (event.isSubject && !event.otherInOut) ||
          //         (!event.isSubject && event.otherInOut)
          return (event.isSubject && event.otherInOut) ||
                  (!event.isSubject && !event.otherInOut)
        case XOR:
          return true
      }
      break
    case SAME_TRANSITION:
      return operation === INTERSECTION || operation === UNION
    case DIFFERENT_TRANSITION:
      return operation === DIFFERENCE
    case NON_CONTRIBUTING:
      return false
  }
  return false
};

const determineResultTransition = (event, operation) => {
  const thisIn = !event.inOut;
  const thatIn = !event.otherInOut;

  let isIn;
  switch (operation) {
    case INTERSECTION:
      isIn = thisIn && thatIn;
      break
    case UNION:
      isIn = thisIn || thatIn;
      break
    case XOR:
      isIn = thisIn ^ thatIn;
      break
    case DIFFERENCE:
      if (event.isSubject) {
        isIn = thisIn && !thatIn;
      } else {
        isIn = thatIn && !thisIn;
      }
      break
  }
  return isIn ? +1 : -1
};

class SweepEvent {
  /**
   * Sweepline event
   *
   * @class {SweepEvent}
   * @param {Array.<Number>} point
   * @param {Boolean} left
   * @param {SweepEvent=} otherEvent
   * @param {Boolean} isSubject
   * @param {Number} edgeType
   */
  constructor (point, left, otherEvent, isSubject, edgeType) {
    /**
     * Is left endpoint?
     * @type {Boolean}
     */
    this.left = left;

    /**
     * @type {Array.<Number>}
     */
    this.point = point;

    /**
     * Other edge reference
     * @type {SweepEvent}
     */
    this.otherEvent = otherEvent;

    /**
     * Belongs to source or clipping polygon
     * @type {Boolean}
     */
    this.isSubject = isSubject;

    /**
     * Edge contribution type
     * @type {Number}
     */
    this.type = edgeType || NORMAL;

    /**
     * In-out transition for the sweepline crossing polygon
     * @type {Boolean}
     */
    this.inOut = false;

    /**
     * @type {Boolean}
     */
    this.otherInOut = false;

    /**
     * Previous event in result?
     * @type {SweepEvent}
     */
    this.prevInResult = null;

    /**
     * Type of result transition (0 = not in result, +1 = out-in, -1, in-out)
     * @type {Number}
     */
    this.resultTransition = 0;

    // connection step

    /**
     * @type {Number}
     */
    this.otherPos = -1;

    /**
     * @type {Number}
     */
    this.outputContourId = -1;

    this.isExteriorRing = true; // TODO: Looks unused, remove?
  }

  /**
   * @param {Array.<Number>} p
   * @return {Boolean}
   */
  isBelow (p) {
    const p0 = this.point;
    const p1 = this.otherEvent.point;
    return this.left
      ? (p0[0] - p[0]) * (p1[1] - p[1]) - (p1[0] - p[0]) * (p0[1] - p[1]) > 0
      // signedArea(this.point, this.otherEvent.point, p) > 0 :
      : (p1[0] - p[0]) * (p0[1] - p[1]) - (p0[0] - p[0]) * (p1[1] - p[1]) > 0
    // signedArea(this.otherEvent.point, this.point, p) > 0
  }

  /**
   * @param {Array.<Number>} p
   * @return {Boolean}
   */
  isAbove (p) {
    return !this.isBelow(p)
  }

  /**
   * @return {Boolean}
   */
  isVertical () {
    return this.point[0] === this.otherEvent.point[0]
  }

  /**
   * Does event belong to result?
   * @return {Boolean}
   */
  get inResult () {
    return this.resultTransition !== 0
  }

  clone () {
    const copy = new SweepEvent(
      this.point, this.left, this.otherEvent, this.isSubject, this.type);

    copy.contourId = this.contourId;
    copy.resultTransition = this.resultTransition;
    copy.prevInResult = this.prevInResult;
    copy.isExteriorRing = this.isExteriorRing;
    copy.inOut = this.inOut;
    copy.otherInOut = this.otherInOut;

    return copy
  }
}

const orient2d = (ax, ay, bx, by, cx, cy) => (ay - cy) * (bx - cx) - (ax - cx) * (by - cy);

/**
 * Signed area of the triangle (p0, p1, p2)
 * @param {Array.<Number>} p0
 * @param {Array.<Number>} p1
 * @param {Array.<Number>} p2
 * @return {Number}
 */
const signedArea = (p0, p1, p2) => {
  const res = orient2d(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]);
  if (res > 0) return -1
  if (res < 0) return 1
  return 0
};

/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

/**
 * @param {SweepEvent} e1
 * @param {SweepEvent} e2
 * @return {Number}
 */
const compareEvents = (e1, e2) => {
  const p1 = e1.point;
  const p2 = e2.point;

  // Different x-coordinate
  if (p1[0] > p2[0]) return 1
  if (p1[0] < p2[0]) return -1

  // Different points, but same x-coordinate
  // Event with lower y-coordinate is processed first
  if (p1[1] !== p2[1]) return p1[1] > p2[1] ? 1 : -1

  return specialCases(e1, e2, p1)
};

const specialCases = (e1, e2, p1, p2) => {
  // Same coordinates, but one is a left endpoint and the other is
  // a right endpoint. The right endpoint is processed first
  if (e1.left !== e2.left) { return e1.left ? 1 : -1 }

  // const p2 = e1.otherEvent.point, p3 = e2.otherEvent.point
  // const sa = (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1])
  // Same coordinates, both events
  // are left endpoints or right endpoints.
  // not collinear
  if (signedArea(p1, e1.otherEvent.point, e2.otherEvent.point) !== 0) {
    // the event associate to the bottom segment is processed first
    return (!e1.isBelow(e2.otherEvent.point)) ? 1 : -1
  }

  return (!e1.isSubject && e2.isSubject) ? 1 : -1
};

/**
 * @param {SweepEvent} se
 * @param {Array.<Number>} p
 * @param {Queue} queue
 * @return {Queue}
 */
const divideSegment = (se, p, queue) => {
  const r = new SweepEvent(p, false, se, se.isSubject);
  const l = new SweepEvent(p, true, se.otherEvent, se.isSubject);

  r.contourId = l.contourId = se.contourId;

  // avoid a rounding error. The left event would be processed after the right event
  if (compareEvents(l, se.otherEvent) > 0) {
    se.otherEvent.left = true;
    l.left = false;
  }

  // avoid a rounding error. The left event would be processed after the right event
  // if (compareEvents(se, r) > 0) {}

  se.otherEvent.otherEvent = l;
  se.otherEvent = r;

  queue.push(l);
  queue.push(r);

  return queue
};

/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

/**
 * Finds the magnitude of the cross product of two vectors (if we pretend
 * they're in three dimensions)
 *
 * @param {Object} a First vector
 * @param {Object} b Second vector
 * @private
 * @returns {Number} The magnitude of the cross product
 */
const crossProduct = (a, b) => (a[0] * b[1]) - (a[1] * b[0]);

/**
 * Finds the intersection (if any) between two line segments a and b, given the
 * line segments' end points a1, a2 and b1, b2.
 *
 * This algorithm is based on Schneider and Eberly.
 * http://www.cimec.org.ar/~ncalvo/Schneider_Eberly.pdf
 * Page 244.
 *
 * @param {Array.<Number>} a1 point of first line
 * @param {Array.<Number>} a2 point of first line
 * @param {Array.<Number>} b1 point of second line
 * @param {Array.<Number>} b2 point of second line
 * @param {Boolean=} noEndpointTouch whether to skip single touchpoints (meaning connected segments) as intersections
 * @returns {Array.<Array.<Number>>|Null} If the lines intersect, the point of
 * intersection. If they overlap, the two end points of the overlapping segment.
 * Otherwise, null.
 */
const segmentIntersection = (a1, a2, b1, b2, noEndpointTouch) => {
  // The algorithm expects our lines in the form P + sd, where P is a point,
  // s is on the interval [0, 1], and d is a vector.
  // We are passed two points. P can be the first point of each pair. The
  // vector, then, could be thought of as the distance (in x and y components)
  // from the first point to the second point.
  // So first, let's make our vectors:
  const va = [a2[0] - a1[0], a2[1] - a1[1]];
  const vb = [b2[0] - b1[0], b2[1] - b1[1]];
  // We also define a function to convert back to regular point form:

  const toPoint = (p, s, d) => [
    p[0] + s * d[0],
    p[1] + s * d[1]
  ];

  // The rest is pretty much a straight port of the algorithm.
  const e = [b1[0] - a1[0], b1[1] - a1[1]];
  let kross = crossProduct(va, vb);
  let sqrKross = kross * kross;
  const sqrLenA = dot$1(va, va);
  // const sqrLenB  = dotProduct(vb, vb)

  // Check for line intersection. This works because of the properties of the
  // cross product -- specifically, two vectors are parallel if and only if the
  // cross product is the 0 vector. The full calculation involves relative error
  // to account for possible very small line segments. See Schneider & Eberly
  // for details.
  if (sqrKross > 0/* EPS * sqrLenB * sqLenA */) {
    // If they're not parallel, then (because these are line segments) they
    // still might not actually intersect. This code checks that the
    // intersection point of the lines is actually on both line segments.
    const s = crossProduct(e, vb) / kross;
    if (s < 0 || s > 1) {
      // not on line segment a
      return null
    }
    const t = crossProduct(e, va) / kross;
    if (t < 0 || t > 1) {
      // not on line segment b
      return null
    }
    if (s === 0 || s === 1) {
      // on an endpoint of line segment a
      return noEndpointTouch ? null : [toPoint(a1, s, va)]
    }
    if (t === 0 || t === 1) {
      // on an endpoint of line segment b
      return noEndpointTouch ? null : [toPoint(b1, t, vb)]
    }
    return [toPoint(a1, s, va)]
  }

  // If we've reached this point, then the lines are either parallel or the
  // same, but the segments could overlap partially or fully, or not at all.
  // So we need to find the overlap, if any. To do that, we can use e, which is
  // the (vector) difference between the two initial points. If this is parallel
  // with the line itself, then the two lines are the same line, and there will
  // be overlap.
  // const sqrLenE = dotProduct(e, e)
  kross = crossProduct(e, va);
  sqrKross = kross * kross;

  if (sqrKross > 0 /* EPS * sqLenB * sqLenE */) {
  // Lines are just parallel, not the same. No overlap.
    return null
  }

  const sa = dot$1(va, e) / sqrLenA;
  const sb = sa + dot$1(va, vb) / sqrLenA;
  const smin = Math.min(sa, sb);
  const smax = Math.max(sa, sb);

  // this is, essentially, the FindIntersection acting on floats from
  // Schneider & Eberly, just inlined into this function.
  if (smin <= 1 && smax >= 0) {
    // overlap on an end point
    if (smin === 1) {
      return noEndpointTouch ? null : [toPoint(a1, smin > 0 ? smin : 0, va)]
    }

    if (smax === 0) {
      return noEndpointTouch ? null : [toPoint(a1, smax < 1 ? smax : 1, va)]
    }

    if (noEndpointTouch && smin === 0 && smax === 1) return null

    // There's overlap on a segment -- two points of intersection. Return both.
    return [
      toPoint(a1, smin > 0 ? smin : 0, va),
      toPoint(a1, smax < 1 ? smax : 1, va)
    ]
  }

  return null
};

/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

/**
 * @param {SweepEvent} se1
 * @param {SweepEvent} se2
 * @param {Queue} queue
 * @return {Number}
 */
const possibleIntersection = (se1, se2, queue) => {
  // that disallows self-intersecting polygons,
  // did cost us half a day, so I'll leave it
  // out of respect
  // if (se1.isSubject === se2.isSubject) return
  const inter = segmentIntersection(
    se1.point, se1.otherEvent.point,
    se2.point, se2.otherEvent.point
  );

  const nIntersections = inter ? inter.length : 0;
  if (nIntersections === 0) return 0 // no intersection

  // the line segments intersect at an endpoint of both line segments
  if ((nIntersections === 1) &&
      (equals$6(se1.point, se2.point) ||
       equals$6(se1.otherEvent.point, se2.otherEvent.point))) {
    return 0
  }

  if (nIntersections === 2 && se1.isSubject === se2.isSubject) {
    return 0
  }

  // The line segments associated to se1 and se2 intersect
  if (nIntersections === 1) {
    // if the intersection point is not an endpoint of se1
    if (!equals$6(se1.point, inter[0]) && !equals$6(se1.otherEvent.point, inter[0])) {
      divideSegment(se1, inter[0], queue);
    }

    // if the intersection point is not an endpoint of se2
    if (!equals$6(se2.point, inter[0]) && !equals$6(se2.otherEvent.point, inter[0])) {
      divideSegment(se2, inter[0], queue);
    }
    return 1
  }

  // The line segments associated to se1 and se2 overlap
  const events = [];
  let leftCoincide = false;
  let rightCoincide = false;

  if (equals$6(se1.point, se2.point)) {
    leftCoincide = true; // linked
  } else if (compareEvents(se1, se2) === 1) {
    events.push(se2, se1);
  } else {
    events.push(se1, se2);
  }

  if (equals$6(se1.otherEvent.point, se2.otherEvent.point)) {
    rightCoincide = true;
  } else if (compareEvents(se1.otherEvent, se2.otherEvent) === 1) {
    events.push(se2.otherEvent, se1.otherEvent);
  } else {
    events.push(se1.otherEvent, se2.otherEvent);
  }

  if ((leftCoincide && rightCoincide) || leftCoincide) {
    // both line segments are equal or share the left endpoint
    se2.type = NON_CONTRIBUTING;
    se1.type = (se2.inOut === se1.inOut) ? SAME_TRANSITION : DIFFERENT_TRANSITION;

    if (leftCoincide && !rightCoincide) {
      // honestly no idea, but changing events selection from [2, 1]
      // to [0, 1] fixes the overlapping self-intersecting polygons issue
      divideSegment(events[1].otherEvent, events[0].point, queue);
    }
    return 2
  }

  // the line segments share the right endpoint
  if (rightCoincide) {
    divideSegment(events[0], events[1].point, queue);
    return 3
  }

  // no line segment includes totally the other one
  if (events[0] !== events[3].otherEvent) {
    divideSegment(events[0], events[1].point, queue);
    divideSegment(events[1], events[2].point, queue);
    return 3
  }

  // one line segment includes the other one
  divideSegment(events[0], events[1].point, queue);
  divideSegment(events[3].otherEvent, events[2].point, queue);

  return 3
};

/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

/**
 * @param {SweepEvent} le1
 * @param {SweepEvent} le2
 * @return {Number}
 */
const compareSegments = (le1, le2) => {
  if (le1 === le2) return 0

  // Segments are not collinear
  if (signedArea(le1.point, le1.otherEvent.point, le2.point) !== 0 ||
    signedArea(le1.point, le1.otherEvent.point, le2.otherEvent.point) !== 0) {
    // If they share their left endpoint use the right endpoint to sort
    if (equals$6(le1.point, le2.point)) return le1.isBelow(le2.otherEvent.point) ? -1 : 1

    // Different left endpoint: use the left endpoint to sort
    if (le1.point[0] === le2.point[0]) return le1.point[1] < le2.point[1] ? -1 : 1

    // has the line segment associated to e1 been inserted
    // into S after the line segment associated to e2 ?
    if (compareEvents(le1, le2) === 1) return le2.isAbove(le1.point) ? -1 : 1

    // The line segment associated to e2 has been inserted
    // into S after the line segment associated to e1
    return le1.isBelow(le2.point) ? -1 : 1
  }

  if (le1.isSubject === le2.isSubject) { // same polygon
    let p1 = le1.point;
    let p2 = le2.point;
    if (p1[0] === p2[0] && p1[1] === p2[1]/* equals(le1.point, le2.point) */) {
      p1 = le1.otherEvent.point;
      p2 = le2.otherEvent.point;
      if (p1[0] === p2[0] && p1[1] === p2[1]) return 0
      else return le1.contourId > le2.contourId ? 1 : -1
    }
  } else { // Segments are collinear, but belong to separate polygons
    return le1.isSubject ? -1 : 1
  }

  return compareEvents(le1, le2) === 1 ? 1 : -1
};

/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

const subdivideSegments = (eventQueue, subject, clipping, sbbox, cbbox, operation) => {
  const sweepLine = new Tree$1(compareSegments);
  const sortedEvents = [];

  const rightBound = Math.min(sbbox[2], cbbox[2]);

  let prev, next, begin;

  while (eventQueue.length !== 0) {
    let event = eventQueue.pop();
    sortedEvents.push(event);

    // optimization by bboxes for intersection and difference goes here
    if ((operation === INTERSECTION && event.point[0] > rightBound) ||
        (operation === DIFFERENCE && event.point[0] > sbbox[2])) {
      break
    }

    if (event.left) {
      next = prev = sweepLine.insert(event);
      begin = sweepLine.minNode();

      if (prev !== begin) prev = sweepLine.prev(prev);
      else prev = null;

      next = sweepLine.next(next);

      const prevEvent = prev ? prev.key : null;
      let prevprevEvent;
      computeFields(event, prevEvent, operation);
      if (next) {
        if (possibleIntersection(event, next.key, eventQueue) === 2) {
          computeFields(event, prevEvent, operation);
          computeFields(next.key, event, operation);
        }
      }

      if (prev) {
        if (possibleIntersection(prev.key, event, eventQueue) === 2) {
          let prevprev = prev;
          if (prevprev !== begin) prevprev = sweepLine.prev(prevprev);
          else prevprev = null;

          prevprevEvent = prevprev ? prevprev.key : null;
          computeFields(prevEvent, prevprevEvent, operation);
          computeFields(event, prevEvent, operation);
        }
      }
    } else {
      event = event.otherEvent;
      next = prev = sweepLine.find(event);

      if (prev && next) {
        if (prev !== begin) prev = sweepLine.prev(prev);
        else prev = null;

        next = sweepLine.next(next);
        sweepLine.remove(event);

        if (next && prev) {
          possibleIntersection(prev.key, next.key, eventQueue);
        }
      }
    }
  }
  return sortedEvents
};

class Contour {
  constructor () {
    this.points = [];
    this.holeIds = [];
    this.holeOf = null;
    this.depth = null;
  }

  isExterior () {
    return this.holeOf == null
  }
}

/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

/**
 * @param {Array.<SweepEvent>} sortedEvents
 * @return {Array.<SweepEvent>}
 */
const orderEvents = (sortedEvents) => {
  let event, i, len, tmp;
  const resultEvents = [];
  for (i = 0, len = sortedEvents.length; i < len; i++) {
    event = sortedEvents[i];
    if ((event.left && event.inResult) ||
      (!event.left && event.otherEvent.inResult)) {
      resultEvents.push(event);
    }
  }
  // Due to overlapping edges the resultEvents array can be not wholly sorted
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (i = 0, len = resultEvents.length; i < len; i++) {
      if ((i + 1) < len &&
        compareEvents(resultEvents[i], resultEvents[i + 1]) === 1) {
        tmp = resultEvents[i];
        resultEvents[i] = resultEvents[i + 1];
        resultEvents[i + 1] = tmp;
        sorted = false;
      }
    }
  }

  for (i = 0, len = resultEvents.length; i < len; i++) {
    event = resultEvents[i];
    event.otherPos = i;
  }

  // imagine, the right event is found in the beginning of the queue,
  // when his left counterpart is not marked yet
  for (i = 0, len = resultEvents.length; i < len; i++) {
    event = resultEvents[i];
    if (!event.left) {
      tmp = event.otherPos;
      event.otherPos = event.otherEvent.otherPos;
      event.otherEvent.otherPos = tmp;
    }
  }

  return resultEvents
};

/**
 * @param {Number} pos
 * @param {Array.<SweepEvent>} resultEvents
 * @param {Object>} processed
 * @return {Number}
 */
const nextPos = (pos, resultEvents, processed, origPos) => {
  let newPos = pos + 1;
  const p = resultEvents[pos].point;
  let p1;
  const length = resultEvents.length;

  if (newPos < length) { p1 = resultEvents[newPos].point; }

  while (newPos < length && p1[0] === p[0] && p1[1] === p[1]) {
    if (!processed[newPos]) {
      return newPos
    } else {
      newPos++;
    }
    if (newPos < length) {
      p1 = resultEvents[newPos].point;
    }
  }

  newPos = pos - 1;

  while (processed[newPos] && newPos > origPos) {
    newPos--;
  }

  return newPos
};

const initializeContourFromContext = (event, contours, contourId) => {
  const contour = new Contour();
  if (event.prevInResult != null) {
    const prevInResult = event.prevInResult;
    // Note that it is valid to query the "previous in result" for its output contour id,
    // because we must have already processed it (i.e., assigned an output contour id)
    // in an earlier iteration, otherwise it wouldn't be possible that it is "previous in
    // result".
    const lowerContourId = prevInResult.outputContourId;
    const lowerResultTransition = prevInResult.resultTransition;
    if (lowerContourId < 0) {
      contour.holeOf = null;
      contour.depth = 0;
    } else if (lowerResultTransition > 0) {
      // We are inside. Now we have to check if the thing below us is another hole or
      // an exterior contour.
      const lowerContour = contours[lowerContourId];
      if (lowerContour.holeOf != null) {
        // The lower contour is a hole => Connect the new contour as a hole to its parent,
        // and use same depth.
        const parentContourId = lowerContour.holeOf;
        contours[parentContourId].holeIds.push(contourId);
        contour.holeOf = parentContourId;
        contour.depth = contours[lowerContourId].depth;
      } else {
        // The lower contour is an exterior contour => Connect the new contour as a hole,
        // and increment depth.
        contours[lowerContourId].holeIds.push(contourId);
        contour.holeOf = lowerContourId;
        contour.depth = contours[lowerContourId].depth + 1;
      }
    } else {
      // We are outside => this contour is an exterior contour of same depth.
      contour.holeOf = null;
      contour.depth = contours[lowerContourId].depth;
    }
  } else {
    // There is no lower/previous contour => this contour is an exterior contour of depth 0.
    contour.holeOf = null;
    contour.depth = 0;
  }
  return contour
};

/**
 * @param {Array.<SweepEvent>} sortedEvents
 * @return {Array.<*>} polygons
 */
const connectEdges = (sortedEvents) => {
  const resultEvents = orderEvents(sortedEvents);
  const len = resultEvents.length;

  // "false"-filled array
  const processed = {};
  const contours = [];

  for (let i = 0; i < len; i++) {
    if (processed[i]) {
      continue
    }

    const contourId = contours.length;
    const contour = initializeContourFromContext(resultEvents[i], contours, contourId);

    // Helper function that combines marking an event as processed with assigning its output contour ID
    const markAsProcessed = (pos) => {
      processed[pos] = true;
      if (pos < resultEvents.length && resultEvents[pos]) {
        resultEvents[pos].outputContourId = contourId;
      }
    };

    let pos = i;
    const origPos = i;

    const initial = resultEvents[i].point;
    contour.points.push(initial);

    while (true) {
      markAsProcessed(pos);

      pos = resultEvents[pos].otherPos;

      markAsProcessed(pos);
      contour.points.push(resultEvents[pos].point);

      pos = nextPos(pos, resultEvents, processed, origPos);

      if (pos === origPos || pos >= resultEvents.length || !resultEvents[pos]) {
        break
      }
    }

    contours.push(contour);
  }

  return contours
};

/*
 * The smallest and simplest binary heap priority queue in JavaScript
 * Copyright (c) 2017, Vladimir Agafonkin
 * https://github.com/mourner/tinyqueue
 */

class Queue {
  constructor (data, compare) {
    this.data = data;
    this.length = this.data.length;
    this.compare = compare;

    if (this.length > 0) {
      for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
    }
  }

  push (item) {
    this.data.push(item);
    this._up(this.length++);
  }

  pop () {
    if (this.length === 0) return undefined

    const top = this.data[0];
    const bottom = this.data.pop();

    if (--this.length > 0) {
      this.data[0] = bottom;
      this._down(0);
    }

    return top
  }

  peek () {
    return this.data[0]
  }

  _up (pos) {
    const { data, compare } = this;
    const item = data[pos];

    while (pos > 0) {
      const parent = (pos - 1) >> 1;
      const current = data[parent];
      if (compare(item, current) >= 0) break
      data[pos] = current;
      pos = parent;
    }

    data[pos] = item;
  }

  _down (pos) {
    const { data, compare } = this;
    const halfLength = this.length >> 1;
    const item = data[pos];

    while (pos < halfLength) {
      let bestChild = (pos << 1) + 1; // initially it is the left child
      const right = bestChild + 1;

      if (right < this.length && compare(data[right], data[bestChild]) < 0) {
        bestChild = right;
      }
      if (compare(data[bestChild], item) >= 0) break

      data[pos] = data[bestChild];
      pos = bestChild;
    }

    data[pos] = item;
  }
}

/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

const max = Math.max;
const min = Math.min;

let contourId = 0;

const processPolygon = (contourOrHole, isSubject, depth, queue, bbox, isExteriorRing) => {
  const len = contourOrHole.length - 1;
  let s1, s2, e1, e2;
  for (let i = 0; i < len; i++) {
    s1 = contourOrHole[i];
    s2 = contourOrHole[i + 1];
    e1 = new SweepEvent(s1, false, undefined, isSubject);
    e2 = new SweepEvent(s2, false, e1, isSubject);
    e1.otherEvent = e2;

    if (s1[0] === s2[0] && s1[1] === s2[1]) {
      continue // skip collapsed edges, or it breaks
    }

    e1.contourId = e2.contourId = depth;
    if (!isExteriorRing) {
      e1.isExteriorRing = false;
      e2.isExteriorRing = false;
    }
    if (compareEvents(e1, e2) > 0) {
      e2.left = true;
    } else {
      e1.left = true;
    }

    const x = s1[0];
    const y = s1[1];
    bbox[0] = min(bbox[0], x);
    bbox[1] = min(bbox[1], y);
    bbox[2] = max(bbox[2], x);
    bbox[3] = max(bbox[3], y);

    // Pushing it so the queue is sorted from left to right,
    // with object on the left having the highest priority.
    queue.push(e1);
    queue.push(e2);
  }
};

const fillQueue = (subject, clipping, sbbox, cbbox, operation) => {
  const eventQueue = new Queue([], compareEvents);
  let polygonSet, isExteriorRing, i, ii, j, jj; //, k, kk

  for (i = 0, ii = subject.length; i < ii; i++) {
    polygonSet = subject[i];
    for (j = 0, jj = polygonSet.length; j < jj; j++) {
      isExteriorRing = j === 0;
      if (isExteriorRing) contourId++;
      processPolygon(polygonSet[j], true, contourId, eventQueue, sbbox, isExteriorRing);
    }
  }

  for (i = 0, ii = clipping.length; i < ii; i++) {
    polygonSet = clipping[i];
    for (j = 0, jj = polygonSet.length; j < jj; j++) {
      isExteriorRing = j === 0;
      if (operation === DIFFERENCE) isExteriorRing = false;
      if (isExteriorRing) contourId++;
      processPolygon(polygonSet[j], false, contourId, eventQueue, cbbox, isExteriorRing);
    }
  }

  return eventQueue
};

/*
 * Implementation of the Martinez 2D polygon clipping algorithm.
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 *
 * Adapted for JSCAD by @platypii
 */

const EMPTY = [];

/*
 * Fast path for trivial operations like intersection with empty geometry
 * Returns null if operation is non-trivial
 */
const trivialOperation = (subject, clipping, operation) => {
  let result = null;
  if (subject.length * clipping.length === 0) {
    if (operation === INTERSECTION) {
      return EMPTY
    } else if (operation === DIFFERENCE) {
      result = subject;
    } else if (operation === UNION ||
               operation === XOR) {
      result = (subject.length === 0) ? clipping : subject;
    }
  }
  if (result === EMPTY) {
    return create$a()
  } else if (result) {
    return fromOutlines(result.flat())
  } else {
    return null
  }
};

/*
 * Fast path for non-intersecting subjects
 * Returns null if operation is non-trivial
 */
const compareBBoxes = (subject, clipping, sbbox, cbbox, operation) => {
  let result = null;
  if (sbbox[0] > cbbox[2] ||
      cbbox[0] > sbbox[2] ||
      sbbox[1] > cbbox[3] ||
      cbbox[1] > sbbox[3]) {
    if (operation === INTERSECTION) {
      result = EMPTY;
    } else if (operation === DIFFERENCE) {
      result = subject;
    } else if (operation === UNION ||
               operation === XOR) {
      result = subject.concat(clipping);
    }
  }
  if (result === EMPTY) {
    return create$a()
  } else if (result) {
    return fromOutlines(result.flat())
  } else {
    return null
  }
};

/*
 * Convert from geom2 to martinez data structure
 */
const toMartinez = (geometry) => {
  const outlines = [];
  toOutlines(geometry).forEach((outline) => {
    // Martinez expects first point == last point
    if (equals$6(outline[0], outline[outline.length - 1])) {
      outlines.push(outline);
    } else {
      outlines.push([...outline, outline[0]]);
    }
  });
  return [outlines]
};

/*
 * Convert martinez data structure to geom2
 */
const fromOutlines = (outlines) => {
  outlines.forEach((outline) => {
    if (equals$6(outline[0], outline[outline.length - 1])) {
      outline.pop(); // first == last point
    }
  });
  // Martinez sometime returns empty outlines, filter them out
  outlines = outlines.filter((o) => o.length >= 3);
  return create$a(outlines)
};

const boolean = (subjectGeom, clippingGeom, operation) => {
  // Convert from geom2 to outlines
  const subject = toMartinez(subjectGeom);
  const clipping = toMartinez(clippingGeom);

  let trivial = trivialOperation(subject, clipping, operation);
  if (trivial) {
    return trivial
  }
  const sbbox = [Infinity, Infinity, -Infinity, -Infinity];
  const cbbox = [Infinity, Infinity, -Infinity, -Infinity];

  const eventQueue = fillQueue(subject, clipping, sbbox, cbbox, operation);

  trivial = compareBBoxes(subject, clipping, sbbox, cbbox, operation);
  if (trivial) {
    return trivial
  }
  const sortedEvents = subdivideSegments(eventQueue, subject, clipping, sbbox, cbbox, operation);

  const contours = connectEdges(sortedEvents);

  // Convert contours to geom2
  const polygons = [];
  for (let i = 0; i < contours.length; i++) {
    const contour = contours[i];
    if (contour.isExterior()) {
      // The exterior ring goes first
      const rings = [contour.points];
      // Followed by holes if any
      for (let j = 0; j < contour.holeIds.length; j++) {
        const holeId = contour.holeIds[j];
        const holePoints = contours[holeId].points;
        const hole = [];
        for (let k = holePoints.length - 2; k >= 0; k--) {
          hole.push(holePoints[k]);
        }
        rings.push(hole);
      }
      polygons.push(rings);
    }
  }

  if (polygons) {
    return fromOutlines(polygons.flat())
  } else {
    return create$a()
  }
};

/*
 * Return a new 2D geometry representing space in both the first geometry and
 * in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of 2D geometries
 * @returns {geom2} new 2D geometry
 */
const intersectGeom2 = (...geometries) => {
  geometries = flatten(geometries);

  let newGeometry = geometries.shift();
  geometries.forEach((geometry) => {
    newGeometry = boolean(newGeometry, geometry, INTERSECTION);
  });

  return newGeometry
};

/*
 * Retesselation for a set of COPLANAR polygons.
 * @param {poly3[]} sourcePolygons - list of polygons
 * @returns {poly3[]} new set of polygons
 */
const reTesselateCoplanarPolygons = (sourcePolygons) => {
  if (sourcePolygons.length < 2) return sourcePolygons

  const destPolygons = [];
  const numPolygons = sourcePolygons.length;
  const plane$1 = plane(sourcePolygons[0]);
  const orthonormalFormula = new OrthonormalFormula(plane$1);
  const polygonVertices2d = []; // array of array of Vector2D
  const polygonTopVertexIndexes = []; // array of indexes of topmost vertex per polygon
  const topy2polygonIndexes = new Map();
  const yCoordinateToPolygonIndexes = new Map();

  // convert all polygon vertices to 2D
  // Make a list of all encountered y coordinates
  // And build a map of all polygons that have a vertex at a certain y coordinate:
  const yCoordinateBins = new Map();
  const yCoordinateBinningFactor = 10 / EPS;
  for (let polygonIndex = 0; polygonIndex < numPolygons; polygonIndex++) {
    const poly3d = sourcePolygons[polygonIndex];
    let vertices2d = [];
    let numVertices = poly3d.vertices.length;
    let minIndex = -1;
    if (numVertices > 0) {
      let miny;
      let maxy;
      for (let i = 0; i < numVertices; i++) {
        let pos2d = orthonormalFormula.to2D(poly3d.vertices[i]);
        // perform binning of y coordinates: If we have multiple vertices very
        // close to each other, give them the same y coordinate:
        const yCoordinateBin = Math.floor(pos2d[1] * yCoordinateBinningFactor);
        let newY;
        if (yCoordinateBins.has(yCoordinateBin)) {
          newY = yCoordinateBins.get(yCoordinateBin);
        } else if (yCoordinateBins.has(yCoordinateBin + 1)) {
          newY = yCoordinateBins.get(yCoordinateBin + 1);
        } else if (yCoordinateBins.has(yCoordinateBin - 1)) {
          newY = yCoordinateBins.get(yCoordinateBin - 1);
        } else {
          newY = pos2d[1];
          yCoordinateBins.set(yCoordinateBin, pos2d[1]);
        }
        pos2d = fromValues$2(pos2d[0], newY);
        vertices2d.push(pos2d);
        const y = pos2d[1];
        if ((i === 0) || (y < miny)) {
          miny = y;
          minIndex = i;
        }
        if ((i === 0) || (y > maxy)) {
          maxy = y;
        }
        let polygonIndexes = yCoordinateToPolygonIndexes.get(y);
        if (!polygonIndexes) {
          polygonIndexes = {}; // PERF
          yCoordinateToPolygonIndexes.set(y, polygonIndexes);
        }
        polygonIndexes[polygonIndex] = true;
      }
      if (miny >= maxy) {
        // degenerate polygon, all vertices have same y coordinate. Just ignore it from now:
        vertices2d = [];
        numVertices = 0;
        minIndex = -1;
      } else {
        let polygonIndexes = topy2polygonIndexes.get(miny);
        if (!polygonIndexes) {
          polygonIndexes = [];
          topy2polygonIndexes.set(miny, polygonIndexes);
        }
        polygonIndexes.push(polygonIndex);
      }
    } // if(numVertices > 0)
    // reverse the vertex order:
    vertices2d.reverse();
    minIndex = numVertices - minIndex - 1;
    polygonVertices2d.push(vertices2d);
    polygonTopVertexIndexes.push(minIndex);
  }

  const yCoordinates = [];
  yCoordinateToPolygonIndexes.forEach((polylist, y) => yCoordinates.push(y));
  yCoordinates.sort(fnNumberSort);

  // Now we will iterate over all y coordinates, from lowest to highest y coordinate
  // activePolygons: source polygons that are 'active', i.e. intersect with our y coordinate
  //   Is sorted so the polygons are in left to right order
  // Each element in activePolygons has these properties:
  //        polygonIndex: the index of the source polygon (i.e. an index into the sourcePolygons
  //                      and polygonVertices2d arrays)
  //        leftVertexIndex: the index of the vertex at the left side of the polygon (lowest x)
  //                         that is at or just above the current y coordinate
  //        rightVertexIndex: ditto at right hand side of polygon
  //        topLeft, bottomLeft: coordinates of the left side of the polygon crossing the current y coordinate
  //        topRight, bottomRight: coordinates of the right hand side of the polygon crossing the current y coordinate
  let activePolygons = [];
  let prevOutPolygonRow = [];
  for (let yIndex = 0; yIndex < yCoordinates.length; yIndex++) {
    const newOutPolygonRow = [];
    const yCoordinate = yCoordinates[yIndex];

    // update activePolygons for this y coordinate:
    // - Remove any polygons that end at this y coordinate
    // - update leftVertexIndex and rightVertexIndex (which point to the current vertex index
    //   at the left and right side of the polygon
    // Iterate over all polygons that have a corner at this y coordinate:
    const polygonIndexesWithCorner = yCoordinateToPolygonIndexes.get(yCoordinate);
    for (let activePolygonIndex = 0; activePolygonIndex < activePolygons.length; ++activePolygonIndex) {
      const activePolygon = activePolygons[activePolygonIndex];
      const polygonIndex = activePolygon.polygonIndex;
      if (polygonIndexesWithCorner[polygonIndex]) {
        // this active polygon has a corner at this y coordinate:
        const vertices2d = polygonVertices2d[polygonIndex];
        const numVertices = vertices2d.length;
        let newLeftVertexIndex = activePolygon.leftVertexIndex;
        let newRightVertexIndex = activePolygon.rightVertexIndex;
        // See if we need to increase leftVertexIndex or decrease rightVertexIndex:
        while (true) {
          let nextLeftVertexIndex = newLeftVertexIndex + 1;
          if (nextLeftVertexIndex >= numVertices) nextLeftVertexIndex = 0;
          if (vertices2d[nextLeftVertexIndex][1] !== yCoordinate) break
          newLeftVertexIndex = nextLeftVertexIndex;
        }
        let nextRightVertexIndex = newRightVertexIndex - 1;
        if (nextRightVertexIndex < 0) nextRightVertexIndex = numVertices - 1;
        if (vertices2d[nextRightVertexIndex][1] === yCoordinate) {
          newRightVertexIndex = nextRightVertexIndex;
        }
        if ((newLeftVertexIndex !== activePolygon.leftVertexIndex) && (newLeftVertexIndex === newRightVertexIndex)) {
          // We have increased leftVertexIndex or decreased rightVertexIndex, and now they point to the same vertex
          // This means that this is the bottom point of the polygon. We'll remove it:
          activePolygons.splice(activePolygonIndex, 1);
          --activePolygonIndex;
        } else {
          activePolygon.leftVertexIndex = newLeftVertexIndex;
          activePolygon.rightVertexIndex = newRightVertexIndex;
          activePolygon.topLeft = vertices2d[newLeftVertexIndex];
          activePolygon.topRight = vertices2d[newRightVertexIndex];
          let nextLeftVertexIndex = newLeftVertexIndex + 1;
          if (nextLeftVertexIndex >= numVertices) nextLeftVertexIndex = 0;
          activePolygon.bottomLeft = vertices2d[nextLeftVertexIndex];
          let nextRightVertexIndex = newRightVertexIndex - 1;
          if (nextRightVertexIndex < 0) nextRightVertexIndex = numVertices - 1;
          activePolygon.bottomRight = vertices2d[nextRightVertexIndex];
        }
      } // if polygon has corner here
    } // for activePolygonIndex
    let nextYcoordinate;
    if (yIndex >= yCoordinates.length - 1) {
      // last row, all polygons must be finished here:
      activePolygons = [];
      nextYcoordinate = null;
    } else { // yIndex < yCoordinates.length-1
      nextYcoordinate = Number(yCoordinates[yIndex + 1]);
      const middleYcoordinate = 0.5 * (yCoordinate + nextYcoordinate);
      // update activePolygons by adding any polygons that start here:
      const startingPolygonIndexes = topy2polygonIndexes.get(yCoordinate);
      for (const polygonIndexKey in startingPolygonIndexes) {
        const polygonIndex = startingPolygonIndexes[polygonIndexKey];
        const vertices2d = polygonVertices2d[polygonIndex];
        const numVertices = vertices2d.length;
        const topVertexIndex = polygonTopVertexIndexes[polygonIndex];
        // the top of the polygon may be a horizontal line. In that case topVertexIndex can point to any point on this line.
        // Find the left and right topmost vertices which have the current y coordinate:
        let topLeftVertexIndex = topVertexIndex;
        while (true) {
          let i = topLeftVertexIndex + 1;
          if (i >= numVertices) i = 0;
          if (vertices2d[i][1] !== yCoordinate) break
          if (i === topVertexIndex) break // should not happen, but just to prevent endless loops
          topLeftVertexIndex = i;
        }
        let topRightVertexIndex = topVertexIndex;
        while (true) {
          let i = topRightVertexIndex - 1;
          if (i < 0) i = numVertices - 1;
          if (vertices2d[i][1] !== yCoordinate) break
          if (i === topLeftVertexIndex) break // should not happen, but just to prevent endless loops
          topRightVertexIndex = i;
        }
        let nextLeftVertexIndex = topLeftVertexIndex + 1;
        if (nextLeftVertexIndex >= numVertices) nextLeftVertexIndex = 0;
        let nextRightVertexIndex = topRightVertexIndex - 1;
        if (nextRightVertexIndex < 0) nextRightVertexIndex = numVertices - 1;
        const newActivePolygon = {
          polygonIndex,
          leftVertexIndex: topLeftVertexIndex,
          rightVertexIndex: topRightVertexIndex,
          topLeft: vertices2d[topLeftVertexIndex],
          topRight: vertices2d[topRightVertexIndex],
          bottomLeft: vertices2d[nextLeftVertexIndex],
          bottomRight: vertices2d[nextRightVertexIndex]
        };
        insertSorted(activePolygons, newActivePolygon, (el1, el2) => {
          const x1 = interpolateBetween2DPointsForY(el1.topLeft, el1.bottomLeft, middleYcoordinate);
          const x2 = interpolateBetween2DPointsForY(el2.topLeft, el2.bottomLeft, middleYcoordinate);
          if (x1 > x2) return 1
          if (x1 < x2) return -1
          return 0
        });
      } // for(let polygonIndex in startingPolygonIndexes)
    } //  yIndex < yCoordinates.length-1

    // Now activePolygons is up to date
    // Build the output polygons for the next row in newOutPolygonRow:
    for (const activePolygonKey in activePolygons) {
      const activePolygon = activePolygons[activePolygonKey];

      let x = interpolateBetween2DPointsForY(activePolygon.topLeft, activePolygon.bottomLeft, yCoordinate);
      const topLeft = fromValues$2(x, yCoordinate);
      x = interpolateBetween2DPointsForY(activePolygon.topRight, activePolygon.bottomRight, yCoordinate);
      const topRight = fromValues$2(x, yCoordinate);
      x = interpolateBetween2DPointsForY(activePolygon.topLeft, activePolygon.bottomLeft, nextYcoordinate);
      const bottomLeft = fromValues$2(x, nextYcoordinate);
      x = interpolateBetween2DPointsForY(activePolygon.topRight, activePolygon.bottomRight, nextYcoordinate);
      const bottomRight = fromValues$2(x, nextYcoordinate);
      const outPolygon = {
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
        leftLine: fromPoints$1(create$1(), topLeft, bottomLeft),
        rightLine: fromPoints$1(create$1(), bottomRight, topRight)
      };
      if (newOutPolygonRow.length > 0) {
        const prevOutPolygon = newOutPolygonRow[newOutPolygonRow.length - 1];
        const d1 = distance(outPolygon.topLeft, prevOutPolygon.topRight);
        const d2 = distance(outPolygon.bottomLeft, prevOutPolygon.bottomRight);
        if ((d1 < EPS) && (d2 < EPS)) {
          // we can join this polygon with the one to the left:
          outPolygon.topLeft = prevOutPolygon.topLeft;
          outPolygon.leftLine = prevOutPolygon.leftLine;
          outPolygon.bottomLeft = prevOutPolygon.bottomLeft;
          newOutPolygonRow.splice(newOutPolygonRow.length - 1, 1);
        }
      }
      newOutPolygonRow.push(outPolygon);
    } // for(activePolygon in activePolygons)
    if (yIndex > 0) {
      // try to match the new polygons against the previous row:
      const prevContinuedIndexes = new Set();
      const matchedIndexes = new Set();
      for (let i = 0; i < newOutPolygonRow.length; i++) {
        const thisPolygon = newOutPolygonRow[i];
        for (let ii = 0; ii < prevOutPolygonRow.length; ii++) {
          if (!matchedIndexes.has(ii)) { // not already processed?
            // We have a match if the sidelines are equal or if the top coordinates
            // are on the sidelines of the previous polygon
            const prevPolygon = prevOutPolygonRow[ii];
            if (distance(prevPolygon.bottomLeft, thisPolygon.topLeft) < EPS) {
              if (distance(prevPolygon.bottomRight, thisPolygon.topRight) < EPS) {
                // Yes, the top of this polygon matches the bottom of the previous:
                matchedIndexes.add(ii);
                // Now check if the joined polygon would remain convex:
                const v1 = direction$1(thisPolygon.leftLine);
                const v2 = direction$1(prevPolygon.leftLine);
                const d1 = v1[0] - v2[0];

                const v3 = direction$1(thisPolygon.rightLine);
                const v4 = direction$1(prevPolygon.rightLine);
                const d2 = v3[0] - v4[0];

                const leftLineContinues = Math.abs(d1) < EPS;
                const rightLineContinues = Math.abs(d2) < EPS;
                const leftLineIsConvex = leftLineContinues || (d1 >= 0);
                const rightLineIsConvex = rightLineContinues || (d2 >= 0);
                if (leftLineIsConvex && rightLineIsConvex) {
                  // yes, both sides have convex corners:
                  // This polygon will continue the previous polygon
                  thisPolygon.outPolygon = prevPolygon.outPolygon;
                  thisPolygon.leftLineContinues = leftLineContinues;
                  thisPolygon.rightLineContinues = rightLineContinues;
                  prevContinuedIndexes.add(ii);
                }
                break
              }
            }
          } // if(!prevContinuedIndexes.has(ii))
        } // for ii
      } // for i
      for (let ii = 0; ii < prevOutPolygonRow.length; ii++) {
        if (!prevContinuedIndexes.has(ii)) {
          // polygon ends here
          // Finish the polygon with the last point(s):
          const prevPolygon = prevOutPolygonRow[ii];
          prevPolygon.outPolygon.rightPoints.push(prevPolygon.bottomRight);
          if (distance(prevPolygon.bottomRight, prevPolygon.bottomLeft) > EPS) {
            // polygon ends with a horizontal line:
            prevPolygon.outPolygon.leftPoints.push(prevPolygon.bottomLeft);
          }
          // reverse the left half so we get a counterclockwise circle:
          prevPolygon.outPolygon.leftPoints.reverse();
          const points2d = prevPolygon.outPolygon.rightPoints.concat(prevPolygon.outPolygon.leftPoints);
          const vertices3d = points2d.map((point2d) => orthonormalFormula.to3D(point2d));
          const polygon = fromVerticesAndPlane(vertices3d, plane$1); // TODO support shared

          // if we let empty polygon out, next retesselate will crash
          if (polygon.vertices.length) destPolygons.push(polygon);
        }
      }
    } // if(yIndex > 0)
    for (let i = 0; i < newOutPolygonRow.length; i++) {
      const thisPolygon = newOutPolygonRow[i];
      if (!thisPolygon.outPolygon) {
        // polygon starts here:
        thisPolygon.outPolygon = {
          leftPoints: [],
          rightPoints: []
        };
        thisPolygon.outPolygon.leftPoints.push(thisPolygon.topLeft);
        if (distance(thisPolygon.topLeft, thisPolygon.topRight) > EPS) {
          // we have a horizontal line at the top:
          thisPolygon.outPolygon.rightPoints.push(thisPolygon.topRight);
        }
      } else {
        // continuation of a previous row
        if (!thisPolygon.leftLineContinues) {
          thisPolygon.outPolygon.leftPoints.push(thisPolygon.topLeft);
        }
        if (!thisPolygon.rightLineContinues) {
          thisPolygon.outPolygon.rightPoints.push(thisPolygon.topRight);
        }
      }
    }
    prevOutPolygonRow = newOutPolygonRow;
  } // for yIndex
  return destPolygons
};

const coplanar$1 = (plane1, plane2) => {
  // expect the same distance from the origin, within tolerance
  if (Math.abs(plane1[3] - plane2[3]) < 0.00000015) {
    return aboutEqualNormals(plane1, plane2)
  }
  return false
};

/*
  After boolean operations all coplanar polygon fragments are joined by a retesselating
  operation. geom3.reTesselate(geom).
  Retesselation is done through a linear sweep over the polygon surface.
  The sweep line passes over the y coordinates of all vertices in the polygon.
  Polygons are split at each sweep line, and the fragments are joined horizontally and vertically into larger polygons
  (making sure that we will end up with convex polygons).
*/
const retessellate = (geometry) => {
  if (geometry.isRetesselated) {
    return geometry
  }

  const polygons = toPolygons$1(geometry);
  const polygonsPerPlane = []; // elements: [plane, [poly3...]]
  polygons.forEach((polygon) => {
    const mapping = polygonsPerPlane.find((element) => coplanar$1(element[0], plane(polygon)));
    if (mapping) {
      const polygons = mapping[1];
      polygons.push(polygon);
    } else {
      polygonsPerPlane.push([plane(polygon), [polygon]]);
    }
  });

  let destPolygons = [];
  polygonsPerPlane.forEach((mapping) => {
    const sourcePolygons = mapping[1];
    const retesselatedPolygons = reTesselateCoplanarPolygons(sourcePolygons);
    destPolygons = destPolygons.concat(retesselatedPolygons);
  });

  const result = create$8(destPolygons);
  result.isRetesselated = true;

  return result
};

// # class Node
// Holds a node in a BSP tree.
// A BSP tree is built from a collection of polygons by picking a polygon to split along.
// Polygons are not stored directly in the tree, but in PolygonTreeNodes, stored in this.polygontreenodes.
// Those PolygonTreeNodes are children of the owning Tree.polygonTree.
// This is not a leafy BSP tree since there is no distinction between internal and leaf nodes.
class Node {
  constructor (parent) {
    this.plane = null;
    this.front = null;
    this.back = null;
    this.polygontreenodes = [];
    this.parent = parent;
  }

  // Convert solid space to empty space and empty space to solid space.
  invert () {
    const queue = [this];
    let node;
    for (let i = 0; i < queue.length; i++) {
      node = queue[i];
      if (node.plane) node.plane = flip(create$6(), node.plane);
      if (node.front) queue.push(node.front);
      if (node.back) queue.push(node.back);
      const temp = node.front;
      node.front = node.back;
      node.back = temp;
    }
  }

  // clip polygontreenodes to our plane
  // calls remove() for all clipped PolygonTreeNodes
  clipPolygons (polygonTreeNodes, alsoRemoveCoplanarFront) {
    let current = { node: this, polygonTreeNodes };
    let node;
    const stack = [];

    do {
      node = current.node;
      polygonTreeNodes = current.polygonTreeNodes;

      if (node.plane) {
        const plane = node.plane;

        const backNodes = [];
        const frontNodes = [];
        const coplanarFrontNodes = alsoRemoveCoplanarFront ? backNodes : frontNodes;
        polygonTreeNodes.forEach((treeNode) => {
          if (!treeNode.isRemoved()) {
            // split this polygon tree node using the plane
            // NOTE: children are added to the tree if there are spanning polygons
            treeNode.splitByPlane(plane, coplanarFrontNodes, backNodes, frontNodes, backNodes);
          }
        });

        if (node.front && (frontNodes.length > 0)) {
          // add front node for further splitting
          stack.push({ node: node.front, polygonTreeNodes: frontNodes });
        }
        const numBackNodes = backNodes.length;
        if (node.back && (numBackNodes > 0)) {
          // add back node for further splitting
          stack.push({ node: node.back, polygonTreeNodes: backNodes });
        } else {
          // remove all back nodes from processing
          for (let i = 0; i < numBackNodes; i++) {
            backNodes[i].remove();
          }
        }
      }
      current = stack.pop();
    } while (current !== undefined)
  }

  // Remove all polygons in this BSP tree that are inside the other BSP tree
  // `tree`.
  clipTo (tree, alsoRemoveCoplanarFront) {
    let node = this;
    const stack = [];
    do {
      if (node.polygontreenodes.length > 0) {
        tree.rootnode.clipPolygons(node.polygontreenodes, alsoRemoveCoplanarFront);
      }
      if (node.front) stack.push(node.front);
      if (node.back) stack.push(node.back);
      node = stack.pop();
    } while (node !== undefined)
  }

  addPolygonTreeNodes (newPolygonTreeNodes) {
    let current = { node: this, polygonTreeNodes: newPolygonTreeNodes };
    const stack = [];
    do {
      const node = current.node;
      const polygonTreeNodes = current.polygonTreeNodes;
      const len = polygonTreeNodes.length;

      if (len === 0) {
        current = stack.pop();
        continue
      }
      if (!node.plane) {
        let index = 0; // default
        index = Math.floor(len / 2);
        // index = len >> 1
        // index = Math.floor(Math.random() * len)
        const bestPoly = polygonTreeNodes[index].getPolygon();
        node.plane = plane(bestPoly);
      }
      const frontNodes = [];
      const backNodes = [];
      for (let i = 0; i < len; ++i) {
        polygonTreeNodes[i].splitByPlane(node.plane, node.polygontreenodes, backNodes, frontNodes, backNodes);
      }

      if (frontNodes.length > 0) {
        if (!node.front) node.front = new Node(node);

        // unable to split by any of the current nodes
        const stopCondition = len === frontNodes.length && backNodes.length === 0;
        if (stopCondition) node.front.polygontreenodes = frontNodes;
        else stack.push({ node: node.front, polygonTreeNodes: frontNodes });
      }
      if (backNodes.length > 0) {
        if (!node.back) node.back = new Node(node);

        // unable to split by any of the current nodes
        const stopCondition = len === backNodes.length && frontNodes.length === 0;

        if (stopCondition) node.back.polygontreenodes = backNodes;
        else stack.push({ node: node.back, polygonTreeNodes: backNodes });
      }

      current = stack.pop();
    } while (current !== undefined)
  }
}

const splitLineSegmentByPlane = (plane, p1, p2) => {
  const direction = subtract$3(create$b(), p2, p1);
  let lambda = (plane[3] - dot$2(plane, p1)) / dot$2(plane, direction);
  if (Number.isNaN(lambda)) lambda = 0;
  if (lambda > 1) lambda = 1;
  if (lambda < 0) lambda = 0;

  scale$3(direction, direction, lambda);
  add$1(direction, p1, direction);
  return direction
};

// Returns object:
// .type:
//   0: coplanar-front
//   1: coplanar-back
//   2: front
//   3: back
//   4: spanning
// In case the polygon is spanning, returns:
// .front: a Polygon3 of the front part
// .back: a Polygon3 of the back part
const splitPolygonByPlane = (splane, polygon) => {
  const result = {
    type: null,
    front: null,
    back: null
  };
  // cache in local lets (speedup):
  const vertices = polygon.vertices;
  const numVertices = vertices.length;
  const pplane = plane(polygon);
  if (equals$5(pplane, splane)) {
    result.type = 0;
  } else {
    let hasFront = false;
    let hasBack = false;
    const vertexIsBack = [];
    const MINEPS = -EPS;
    for (let i = 0; i < numVertices; i++) {
      const t = dot$2(splane, vertices[i]) - splane[3];
      const isback = (t < MINEPS);
      vertexIsBack.push(isback);
      if (t > EPS) hasFront = true;
      if (t < MINEPS) hasBack = true;
    }
    if ((!hasFront) && (!hasBack)) {
      // all points coplanar
      const t = dot$2(splane, pplane);
      result.type = (t >= 0) ? 0 : 1;
    } else if (!hasBack) {
      result.type = 2;
    } else if (!hasFront) {
      result.type = 3;
    } else {
      // spanning
      result.type = 4;
      const frontVertices = [];
      const backVertices = [];
      let isback = vertexIsBack[0];
      for (let vertexIndex = 0; vertexIndex < numVertices; vertexIndex++) {
        const vertex = vertices[vertexIndex];
        let nextVertexIndex = vertexIndex + 1;
        if (nextVertexIndex >= numVertices) nextVertexIndex = 0;
        const nextIsBack = vertexIsBack[nextVertexIndex];
        if (isback === nextIsBack) {
          // line segment is on one side of the plane:
          if (isback) {
            backVertices.push(vertex);
          } else {
            frontVertices.push(vertex);
          }
        } else {
          // line segment intersects plane:
          const nextPoint = vertices[nextVertexIndex];
          const intersectionPoint = splitLineSegmentByPlane(splane, vertex, nextPoint);
          if (isback) {
            backVertices.push(vertex);
            backVertices.push(intersectionPoint);
            frontVertices.push(intersectionPoint);
          } else {
            frontVertices.push(vertex);
            frontVertices.push(intersectionPoint);
            backVertices.push(intersectionPoint);
          }
        }
        isback = nextIsBack;
      } // for vertexIndex
      // remove duplicate vertices:
      const EPS_SQUARED = EPS * EPS;
      if (backVertices.length >= 3) {
        let prevVertex = backVertices[backVertices.length - 1];
        for (let vertexIndex = 0; vertexIndex < backVertices.length; vertexIndex++) {
          const vertex = backVertices[vertexIndex];
          if (squaredDistance$1(vertex, prevVertex) < EPS_SQUARED) {
            backVertices.splice(vertexIndex, 1);
            vertexIndex--;
          }
          prevVertex = vertex;
        }
      }
      if (frontVertices.length >= 3) {
        let prevVertex = frontVertices[frontVertices.length - 1];
        for (let vertexIndex = 0; vertexIndex < frontVertices.length; vertexIndex++) {
          const vertex = frontVertices[vertexIndex];
          if (squaredDistance$1(vertex, prevVertex) < EPS_SQUARED) {
            frontVertices.splice(vertexIndex, 1);
            vertexIndex--;
          }
          prevVertex = vertex;
        }
      }
      if (frontVertices.length >= 3) {
        result.front = fromVerticesAndPlane(frontVertices, pplane);
      }
      if (backVertices.length >= 3) {
        result.back = fromVerticesAndPlane(backVertices, pplane);
      }
    }
  }
  return result
};

// # class PolygonTreeNode
// This class manages hierarchical splits of polygons.
// At the top is a root node which does not hold a polygon, only child PolygonTreeNodes.
// Below that are zero or more 'top' nodes; each holds a polygon.
// The polygons can be in different planes.
// splitByPlane() splits a node by a plane. If the plane intersects the polygon,
// two new child nodes are created holding the split polygon.
// getPolygons() retrieves the polygons from the tree. If for PolygonTreeNode the polygon is split but
// the two split parts (child nodes) are still intact, then the unsplit polygon is returned.
// This ensures that we can safely split a polygon into many fragments. If the fragments are untouched,
// getPolygons() will return the original unsplit polygon instead of the fragments.
// remove() removes a polygon from the tree. Once a polygon is removed, the parent polygons are invalidated
// since they are no longer intact.
class PolygonTreeNode {
  // constructor creates the root node
  constructor (parent, polygon) {
    this.parent = parent;
    this.children = [];
    this.polygon = polygon;
    this.removed = false; // state of branch or leaf
  }

  // fill the tree with polygons. Should be called on the root node only; child nodes must
  // always be a derivate (split) of the parent node.
  addPolygons (polygons) {
    // new polygons can only be added to root node; children can only be split polygons
    if (!this.isRootNode()) {
      throw new Error('Assertion failed')
    }
    const _this = this;
    polygons.forEach((polygon) => {
      _this.addChild(polygon);
    });
  }

  // remove a node
  // - the siblings become toplevel nodes
  // - the parent is removed recursively
  remove () {
    if (!this.removed) {
      this.removed = true;
      this.polygon = null;

      // remove ourselves from the parent's children list:
      const parentschildren = this.parent.children;
      const i = parentschildren.indexOf(this);
      if (i < 0) throw new Error('Assertion failed')
      parentschildren.splice(i, 1);

      // invalidate the parent's polygon, and of all parents above it:
      this.parent.recursivelyInvalidatePolygon();
    }
  }

  isRemoved () {
    return this.removed
  }

  isRootNode () {
    return !this.parent
  }

  // invert all polygons in the tree. Call on the root node
  invert () {
    if (!this.isRootNode()) throw new Error('Assertion failed') // can only call this on the root node
    this.invertSub();
  }

  getPolygon () {
    if (!this.polygon) throw new Error('Assertion failed') // doesn't have a polygon, which means that it has been broken down
    return this.polygon
  }

  getPolygons (result) {
    let children = [this];
    const queue = [children];
    let i, j, l, node;
    for (i = 0; i < queue.length; ++i) { // queue size can change in loop, don't cache length
      children = queue[i];
      for (j = 0, l = children.length; j < l; j++) { // ok to cache length
        node = children[j];
        if (node.polygon) {
          // the polygon hasn't been broken yet. We can ignore the children and return our polygon:
          result.push(node.polygon);
        } else {
          // our polygon has been split up and broken, so gather all subpolygons from the children
          if (node.children.length > 0) queue.push(node.children);
        }
      }
    }
  }

  // split the node by a plane; add the resulting nodes to the frontNodes and backNodes array
  // If the plane doesn't intersect the polygon, the 'this' object is added to one of the arrays
  // If the plane does intersect the polygon, two new child nodes are created for the front and back fragments,
  //  and added to both arrays.
  splitByPlane (plane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes) {
    if (this.children.length) {
      const queue = [this.children];
      let i;
      let j;
      let l;
      let node;
      let nodes;
      for (i = 0; i < queue.length; i++) { // queue.length can increase, do not cache
        nodes = queue[i];
        for (j = 0, l = nodes.length; j < l; j++) { // ok to cache length
          node = nodes[j];
          if (node.children.length > 0) {
            queue.push(node.children);
          } else {
            // no children. Split the polygon:
            node._splitByPlane(plane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes);
          }
        }
      }
    } else {
      this._splitByPlane(plane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes);
    }
  }

  // only to be called for nodes with no children
  _splitByPlane (splane, coplanarFrontNodes, coplanarBackNodes, frontNodes, backNodes) {
    const polygon = this.polygon;
    if (polygon) {
      const bound = measureBoundingSphere$1(polygon);
      const sphereRadius = bound[3] + EPS; // ensure radius is LARGER then polygon
      const sphereCenter = bound;
      const d = dot$2(splane, sphereCenter) - splane[3];
      if (d > sphereRadius) {
        frontNodes.push(this);
      } else if (d < -sphereRadius) {
        backNodes.push(this);
      } else {
        const splitResult = splitPolygonByPlane(splane, polygon);
        switch (splitResult.type) {
          case 0:
            // coplanar front:
            coplanarFrontNodes.push(this);
            break

          case 1:
            // coplanar back:
            coplanarBackNodes.push(this);
            break

          case 2:
            // front:
            frontNodes.push(this);
            break

          case 3:
            // back:
            backNodes.push(this);
            break

          case 4:
            // spanning:
            if (splitResult.front) {
              const frontNode = this.addChild(splitResult.front);
              frontNodes.push(frontNode);
            }
            if (splitResult.back) {
              const backNode = this.addChild(splitResult.back);
              backNodes.push(backNode);
            }
            break
        }
      }
    }
  }

  // PRIVATE methods from here:
  // add child to a node
  // this should be called whenever the polygon is split
  // a child should be created for every fragment of the split polygon
  // returns the newly created child
  addChild (polygon) {
    const newChild = new PolygonTreeNode(this, polygon);
    this.children.push(newChild);
    return newChild
  }

  invertSub () {
    let children = [this];
    const queue = [children];
    let i, j, l, node;
    for (i = 0; i < queue.length; i++) {
      children = queue[i];
      for (j = 0, l = children.length; j < l; j++) {
        node = children[j];
        if (node.polygon) {
          node.polygon = invert$1(node.polygon);
        }
        if (node.children.length > 0) queue.push(node.children);
      }
    }
  }

  // private method
  // remove the polygon from the node, and all parent nodes above it
  // called to invalidate parents of removed nodes
  recursivelyInvalidatePolygon () {
    this.polygon = null;
    if (this.parent) {
      this.parent.recursivelyInvalidatePolygon();
    }
  }

  clear () {
    let children = [this];
    const queue = [children];
    for (let i = 0; i < queue.length; ++i) { // queue size can change in loop, don't cache length
      children = queue[i];
      const l = children.length;
      for (let j = 0; j < l; j++) {
        const node = children[j];
        if (node.polygon) {
          node.polygon = null;
        }
        if (node.parent) {
          node.parent = null;
        }
        if (node.children.length > 0) queue.push(node.children);
        node.children = [];
      }
    }
  }

  toString () {
    let result = '';
    let children = [this];
    const queue = [children];
    let i, j, l, node;
    for (i = 0; i < queue.length; ++i) { // queue size can change in loop, don't cache length
      children = queue[i];
      const prefix = ' '.repeat(i);
      for (j = 0, l = children.length; j < l; j++) { // ok to cache length
        node = children[j];
        result += `${prefix}PolygonTreeNode (${node.isRootNode()}): ${node.children.length}`;
        if (node.polygon) {
          result += `\n ${prefix}polygon: ${node.polygon.vertices}\n`;
        } else {
          result += '\n';
        }
        if (node.children.length > 0) queue.push(node.children);
      }
    }
    return result
  }
}

// # class Tree
// This is the root of a BSP tree.
// This separate class for the root of the tree in order to hold the PolygonTreeNode root.
// The actual tree is kept in this.rootnode
class Tree {
  constructor (polygons) {
    this.polygonTree = new PolygonTreeNode();
    this.rootnode = new Node(null);
    if (polygons) this.addPolygons(polygons);
  }

  invert () {
    this.polygonTree.invert();
    this.rootnode.invert();
  }

  // Remove all polygons in this BSP tree that are inside the other BSP tree
  // `tree`.
  clipTo (tree, alsoRemoveCoplanarFront = false) {
    this.rootnode.clipTo(tree, alsoRemoveCoplanarFront);
  }

  allPolygons () {
    const result = [];
    this.polygonTree.getPolygons(result);
    return result
  }

  addPolygons (polygons) {
    const polygonTreeNodes = new Array(polygons.length);
    for (let i = 0; i < polygons.length; i++) {
      polygonTreeNodes[i] = this.polygonTree.addChild(polygons[i]);
    }
    this.rootnode.addPolygonTreeNodes(polygonTreeNodes);
  }

  clear () {
    this.polygonTree.clear();
  }

  toString () {
    return 'Tree: ' + this.polygonTree.toString('')
  }
}

/*
 * Determine if the given geometries overlap by comparing min and max bounds.
 * NOTE: This is used in union for performance gains.
 * @param {geom3} geometry1 - geometry for comparison
 * @param {geom3} geometry2 - geometry for comparison
 * @returns {boolean} true if the geometries overlap
 */
const mayOverlap = (geometry1, geometry2) => {
  // FIXME accessing the data structure of the geometry should not be allowed
  if ((geometry1.polygons.length === 0) || (geometry2.polygons.length === 0)) {
    return false
  }

  const bounds1 = measureBoundingBox(geometry1);
  const min1 = bounds1[0];
  const max1 = bounds1[1];

  const bounds2 = measureBoundingBox(geometry2);
  const min2 = bounds2[0];
  const max2 = bounds2[1];

  if ((min2[0] - max1[0]) > EPS) return false
  if ((min1[0] - max2[0]) > EPS) return false
  if ((min2[1] - max1[1]) > EPS) return false
  if ((min1[1] - max2[1]) > EPS) return false
  if ((min2[2] - max1[2]) > EPS) return false
  if ((min1[2] - max2[2]) > EPS) return false
  return true
};

/*
 * Return a new 3D geometry representing the space in both the first geometry and
 * the second geometry. None of the given geometries are modified.
 * @param {geom3} geometry1 - a geometry
 * @param {geom3} geometry2 - a geometry
 * @returns {geom3} new 3D geometry
 */
const intersectGeom3Sub = (geometry1, geometry2) => {
  if (!mayOverlap(geometry1, geometry2)) {
    return create$8() // empty geometry
  }

  const a = new Tree(toPolygons$1(geometry1));
  const b = new Tree(toPolygons$1(geometry2));

  a.invert();
  b.clipTo(a);
  b.invert();
  a.clipTo(b);
  b.clipTo(a);
  a.addPolygons(b.allPolygons());
  a.invert();

  const newPolygons = a.allPolygons();
  return create$8(newPolygons)
};

/*
 * Return a new 3D geometry representing space in both the first geometry and
 * in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom3} geometries - list of 3D geometries
 * @returns {geom3} new 3D geometry
 */
const intersectGeom3 = (...geometries) => {
  geometries = flatten(geometries);

  let newGeometry = geometries.shift();
  geometries.forEach((geometry) => {
    newGeometry = intersectGeom3Sub(newGeometry, geometry);
  });

  newGeometry = retessellate(newGeometry);
  return newGeometry
};

/**
 * Return a new geometry representing space in both the first geometry and
 * all subsequent geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 * @alias module:modeling/booleans.intersect
 *
 * @example
 * let myshape = intersect(cube({size: [5,5,5]}), cube({size: [5,5,5], center: [5,5,5]}))
 *
 * @example
 * +-------+
 * |       |
 * |   A   |
 * |    +--+----+   =   +--+
 * +----+--+    |       +--+
 *      |   B   |
 *      |       |
 *      +-------+
 */
const intersect = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('only intersect of the types are supported')
  }

  const geometry = geometries[0];
  // if (path.isA(geometry)) return intersectPath(matrix, geometries)
  if (isA$5(geometry)) return intersectGeom2(geometries)
  if (isA$3(geometry)) return intersectGeom3(geometries)
  return geometry
};

// returns array numerically sorted and duplicates removed
const sortNb = (array) => array.sort((a, b) => a - b).filter((item, pos, ary) => !pos || item !== ary[pos - 1]);

const insertMapping = (map, vertex, index) => {
  const key = `${vertex}`;
  const mapping = map.get(key);
  if (mapping === undefined) {
    map.set(key, [index]);
  } else {
    mapping.push(index);
  }
};

const findMapping = (map, vertex) => {
  const key = `${vertex}`;
  return map.get(key)
};

const scissionGeom3 = (geometry) => {
  // construit table de correspondance entre polygones
  // build polygons lookup table
  const eps = measureEpsilon(geometry);
  const polygons = toPolygons$1(geometry);
  const pl = polygons.length;

  const indexesPerVertex = new Map();
  const temp = create$b();
  polygons.forEach((polygon, index) => {
    polygon.vertices.forEach((vertex) => {
      insertMapping(indexesPerVertex, snap$2(temp, vertex, eps), index);
    });
  });

  const indexesPerPolygon = polygons.map((polygon) => {
    let indexes = [];
    polygon.vertices.forEach((vertex) => {
      indexes = indexes.concat(findMapping(indexesPerVertex, snap$2(temp, vertex, eps)));
    });
    return { e: 1, d: sortNb(indexes) } // for each polygon, push the list of indexes
  });

  indexesPerVertex.clear();

  // regroupe les correspondances des polygones se touchant
  // boucle ne s'arrêtant que quand deux passages retournent le même nb de polygones
  // merge lookup data from linked polygons as long as possible
  let merges = 0;
  const ippl = indexesPerPolygon.length;
  for (let i = 0; i < ippl; i++) {
    const mapi = indexesPerPolygon[i];
    // merge mappings if necessary
    if (mapi.e > 0) {
      const indexes = new Array(pl);
      indexes[i] = true; // include ourself
      do {
        merges = 0;
        // loop through the known indexes
        indexes.forEach((e, j) => {
          const mapj = indexesPerPolygon[j];
          // merge this mapping if necessary
          if (mapj.e > 0) {
            mapj.e = -1; // merged
            for (let d = 0; d < mapj.d.length; d++) {
              indexes[mapj.d[d]] = true;
            }
            merges++;
          }
        });
      } while (merges > 0)
      mapi.indexes = indexes;
    }
  }

  // construit le tableau des geometry à retourner
  // build array of geometry to return
  const newgeometries = [];
  for (let i = 0; i < ippl; i++) {
    if (indexesPerPolygon[i].indexes) {
      const newpolygons = [];
      indexesPerPolygon[i].indexes.forEach((e, p) => newpolygons.push(polygons[p]));
      newgeometries.push(create$8(newpolygons));
    }
  }

  return newgeometries
};

/**
 * Scission (divide) the given geometry into the component pieces.
 *
 * @param {...Object} objects - list of geometries
 * @returns {Array} list of pieces from each geometry
 * @alias module:modeling/booleans.scission
 *
 * @example
 * let figure = use('./my.stl')
 * let pieces = scission(figure)
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   +---+            | A +---+
 * |   |    +---+   =   |   |    +---+
 * +---+    |   |       +---+    |   |
 *      +---+   |            +---+   |
 *      |       |            |    B  |
 *      +-------+            +-------+
 */
const scission = (...objects) => {
  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    // if (path2.isA(object)) return path2.transform(matrix, object)
    // if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (isA$3(object)) return scissionGeom3(object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/*
 * Return a new 2D geometry representing space in the first geometry but
 * not in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of geometries
 * @returns {geom2} new 2D geometry
 */
const subtractGeom2 = (...geometries) => {
  geometries = flatten(geometries);

  let newGeometry = geometries.shift();
  geometries.forEach((geometry) => {
    newGeometry = boolean(newGeometry, geometry, DIFFERENCE);
  });

  return newGeometry
};

/*
 * Return a new 3D geometry representing the space in the first geometry but not
 * in the second geometry. None of the given geometries are modified.
 * @param {geom3} geometry1 - a geometry
 * @param {geom3} geometry2 - a geometry
 * @returns {geom3} new 3D geometry
 */
const subtractGeom3Sub = (geometry1, geometry2) => {
  if (!mayOverlap(geometry1, geometry2)) {
    return clone$7(geometry1)
  }

  const a = new Tree(toPolygons$1(geometry1));
  const b = new Tree(toPolygons$1(geometry2));

  a.invert();
  a.clipTo(b);
  b.clipTo(a, true);
  a.addPolygons(b.allPolygons());
  a.invert();

  const newPolygons = a.allPolygons();
  return create$8(newPolygons)
};

/*
 * Return a new 3D geometry representing space in this geometry but not in the given geometries.
 * Neither this geometry nor the given geometries are modified.
 * @param {...geom3} geometries - list of geometries
 * @returns {geom3} new 3D geometry
 */
const subtractGeom3 = (...geometries) => {
  geometries = flatten(geometries);

  let newGeometry = geometries.shift();
  geometries.forEach((geometry) => {
    newGeometry = subtractGeom3Sub(newGeometry, geometry);
  });

  newGeometry = retessellate(newGeometry);
  return newGeometry
};

/**
 * Return a new geometry representing space in the first geometry but
 * not in all subsequent geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 * @alias module:modeling/booleans.subtract
 *
 * @example
 * let myshape = subtract(cuboid({size: [5,5,5]}), cuboid({size: [5,5,5], center: [5,5,5]}))
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   A   |            |       |
 * |    +--+----+   =   |    +--+
 * +----+--+    |       +----+
 *      |   B   |
 *      |       |
 *      +-------+
 */
const subtract = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('only subtract of the types are supported')
  }

  const geometry = geometries[0];
  // if (path.isA(geometry)) return subtractPath(matrix, geometries)
  if (isA$5(geometry)) return subtractGeom2(geometries)
  if (isA$3(geometry)) return subtractGeom3(geometries)
  return geometry
};

/*
 * Return a new 2D geometry representing the total space in the given 2D geometries.
 * @param {...geom2} geometries - list of 2D geometries to union
 * @returns {geom2} new 2D geometry
 */
const unionGeom2 = (...geometries) => {
  geometries = flatten(geometries);

  let newGeometry = geometries.shift();
  geometries.forEach((geometry) => {
    newGeometry = boolean(newGeometry, geometry, UNION);
  });

  return newGeometry
};

/*
 * Return a new 3D geometry representing the space in the given geometries.
 * @param {geom3} geometry1 - geometry to union
 * @param {geom3} geometry2 - geometry to union
 * @returns {geom3} new 3D geometry
 */
const unionGeom3Sub = (geometry1, geometry2) => {
  if (!mayOverlap(geometry1, geometry2)) {
    return unionForNonIntersecting(geometry1, geometry2)
  }

  const a = new Tree(toPolygons$1(geometry1));
  const b = new Tree(toPolygons$1(geometry2));

  a.clipTo(b, false);
  // b.clipTo(a, true); // ERROR: doesn't work
  b.clipTo(a);
  b.invert();
  b.clipTo(a);
  b.invert();

  const newPolygons = a.allPolygons().concat(b.allPolygons());
  return create$8(newPolygons)
};

// Like union, but when we know that the two solids are not intersecting
// Do not use if you are not completely sure that the solids do not intersect!
const unionForNonIntersecting = (geometry1, geometry2) => {
  let newpolygons = toPolygons$1(geometry1);
  newpolygons = newpolygons.concat(toPolygons$1(geometry2));
  return create$8(newpolygons)
};

/*
 * Return a new 3D geometry representing the space in the given 3D geometries.
 * @param {...objects} geometries - list of geometries to union
 * @returns {geom3} new 3D geometry
 */
const unionGeom3 = (...geometries) => {
  geometries = flatten(geometries);

  // combine geometries in a way that forms a balanced binary tree pattern
  let i;
  for (i = 1; i < geometries.length; i += 2) {
    geometries.push(unionGeom3Sub(geometries[i - 1], geometries[i]));
  }
  let newGeometry = geometries[i - 1];
  newGeometry = retessellate(newGeometry);
  return newGeometry
};

/**
 * Return a new geometry representing the total space in the given geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {geom2|geom3} a new geometry
 * @alias module:modeling/booleans.union
 *
 * @example
 * let myshape = union(cube({size: [5,5,5]}), cube({size: [5,5,5], center: [5,5,5]}))
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   A   |            |       |
 * |    +--+----+   =   |       +----+
 * +----+--+    |       +----+       |
 *      |   B   |            |       |
 *      |       |            |       |
 *      +-------+            +-------+
 */
const union = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('only unions of the same type are supported')
  }

  const geometry = geometries[0];
  // if (path.isA(geometry)) return unionPath(matrix, geometries)
  if (isA$5(geometry)) return unionGeom2(geometries)
  if (isA$3(geometry)) return unionGeom3(geometries)
  return geometry
};

/**
 * All shapes (primitives or the results of operations) can be passed to boolean functions
 * to perform logical operations, e.g. remove a hole from a board.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/booleans
 * @example
 * import { booleans } from '@jscad/modeling'
 * const { intersect, scission, subtract, union } = booleans
 */

var index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  intersect: intersect,
  scission: scission,
  subtract: subtract,
  union: union
});

/*
 * Create a set of offset points from the given points using the given options (if any).
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {Integer} [options.closed=false] - is the last point connected back to the first point?
 * @param {Array} points - array of 2D points
 * @returns {Array} new set of offset points, plus points for each rounded corner
 */
const offsetFromPoints = (options, points) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    closed: false,
    segments: 16
  };
  let { delta, corners, closed, segments } = Object.assign({ }, defaults, options);

  if (Math.abs(delta) < EPS) return points

  let rotation = options.closed ? area$1(points) : 1.0; // + counter clockwise, - clockwise
  if (rotation === 0) rotation = 1.0;

  // use right hand normal?
  const orientation = ((rotation > 0) && (delta >= 0)) || ((rotation < 0) && (delta < 0));
  delta = Math.abs(delta); // sign is no longer required

  let previousSegment = null;
  let newPoints = [];
  const newCorners = [];
  const of = create$9();
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const p0 = points[i];
    const p1 = points[j];
    // calculate the unit normal
    orientation ? subtract$1(of, p0, p1) : subtract$1(of, p1, p0);
    normal(of, of);
    normalize(of, of);
    // calculate the offset vector
    scale$1(of, of, delta);
    // calculate the new points (edge)
    const n0 = add(create$9(), p0, of);
    const n1 = add(create$9(), p1, of);

    const currentSegment = [n0, n1];
    if (previousSegment != null) {
      if (closed || (!closed && j !== 0)) {
        // check for intersection of new line segments
        const ip = intersect$1(previousSegment[0], previousSegment[1], currentSegment[0], currentSegment[1], true);
        if (ip) {
          // adjust the previous points
          newPoints.pop();
          // adjust current points
          currentSegment[0] = ip;
        } else {
          newCorners.push({ c: p0, s0: previousSegment, s1: currentSegment });
        }
      }
    }
    previousSegment = [n0, n1];

    if (j === 0 && !closed) continue

    newPoints.push(currentSegment[0]);
    newPoints.push(currentSegment[1]);
  }
  // complete the closure if required
  if (closed && previousSegment != null) {
    // check for intersection of closing line segments
    const n0 = newPoints[0];
    const n1 = newPoints[1];
    const ip = intersect$1(previousSegment[0], previousSegment[1], n0, n1, true);
    if (ip) {
      // adjust the previous points
      newPoints[0] = ip;
      newPoints.pop();
    } else {
      const p0 = points[0];
      const currentSegment = [n0, n1];
      newCorners.push({ c: p0, s0: previousSegment, s1: currentSegment });
    }
  }

  // generate corners if necessary

  if (corners === 'edge') {
    // map for fast point index lookup
    const pointIndex = new Map(); // {point: index}
    newPoints.forEach((point, index) => pointIndex.set(point, index));

    // create edge corners
    const line0 = create$1();
    const line1 = create$1();
    newCorners.forEach((corner) => {
      fromPoints$1(line0, corner.s0[0], corner.s0[1]);
      fromPoints$1(line1, corner.s1[0], corner.s1[1]);
      const ip = intersectPointOfLines(line0, line1);
      if (Number.isFinite(ip[0]) && Number.isFinite(ip[1])) {
        const p0 = corner.s0[1];
        const i = pointIndex.get(p0);
        newPoints[i] = ip;
        newPoints[(i + 1) % newPoints.length] = undefined;
      } else {
        // parallel segments, drop one
        const p0 = corner.s1[0];
        const i = pointIndex.get(p0);
        newPoints[i] = undefined;
      }
    });
    newPoints = newPoints.filter((p) => p !== undefined);
  }

  if (corners === 'round') {
    // create rounded corners
    let cornerSegments = Math.floor(segments / 4);
    const v0 = create$9();
    newCorners.forEach((corner) => {
      // calculate angle of rotation
      let rotation = angleRadians(subtract$1(v0, corner.s1[0], corner.c));
      rotation -= angleRadians(subtract$1(v0, corner.s0[1], corner.c));
      if (orientation && rotation < 0) {
        rotation = rotation + Math.PI;
        if (rotation < 0) rotation = rotation + Math.PI;
      }
      if ((!orientation) && rotation > 0) {
        rotation = rotation - Math.PI;
        if (rotation > 0) rotation = rotation - Math.PI;
      }

      if (rotation !== 0.0) {
        // generate the segments
        cornerSegments = Math.floor(segments * (Math.abs(rotation) / TAU));
        const step = rotation / cornerSegments;
        const start = angleRadians(subtract$1(v0, corner.s0[1], corner.c));
        const cornerPoints = [];
        for (let i = 1; i < cornerSegments; i++) {
          const radians = start + (step * i);
          const point = fromAngleRadians(create$9(), radians);
          scale$1(point, point, delta);
          add(point, point, corner.c);
          cornerPoints.push(point);
        }
        if (cornerPoints.length > 0) {
          const p0 = corner.s0[1];
          let i = newPoints.findIndex((point) => equals$6(p0, point));
          i = (i + 1) % newPoints.length;
          newPoints.splice(i, 0, ...cornerPoints);
        }
      } else {
        // parallel segments, drop one
        const p0 = corner.s1[0];
        const i = newPoints.findIndex((point) => equals$6(p0, point));
        newPoints.splice(i, 1);
      }
    });
  }
  return newPoints
};

/*
 * Expand the given geometry (geom2) using the given options (if any).
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+/-) of expansion
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {geom2} geometry - the geometry to expand
 * @returns {geom2} expanded geometry
 */
const expandGeom2 = (options, geometry) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    segments: 16
  };
  const { delta, corners, segments } = Object.assign({ }, defaults, options);

  if (!(corners === 'edge' || corners === 'chamfer' || corners === 'round')) {
    throw new Error('corners must be "edge", "chamfer", or "round"')
  }

  // convert the geometry to outlines, and generate offsets from each
  const outlines = toOutlines(geometry);
  const newOutlines = outlines.map((outline) => {
    options = {
      delta,
      corners,
      closed: true,
      segments
    };
    return offsetFromPoints(options, outline)
  });

  // create a composite geometry from the new outlines
  return create$a(newOutlines)
};

// Extrude a polygon in the direction of the offset vector.
// Returns (geom3) a new geometry
const extrudePolygon = (offsetVector, polygon1) => {
  const direction = dot$2(plane(polygon1), offsetVector);
  if (direction > 0) {
    polygon1 = invert$1(polygon1);
  }

  const newPolygons = [polygon1];

  const polygon2 = transform$7(fromTranslation(create$c(), offsetVector), polygon1);
  const numVertices = polygon1.vertices.length;
  for (let i = 0; i < numVertices; i++) {
    const nexti = (i < (numVertices - 1)) ? i + 1 : 0;
    const sideFacePolygon = create$7([
      polygon1.vertices[i],
      polygon2.vertices[i],
      polygon2.vertices[nexti],
      polygon1.vertices[nexti]
    ]);
    newPolygons.push(sideFacePolygon);
  }
  newPolygons.push(invert$1(polygon2));

  return create$8(newPolygons)
};

/*
 * Collect all planes adjacent to each vertex
 */
const mapPlaneToVertex = (map, vertex, plane) => {
  const key = vertex.toString();
  if (!map.has(key)) {
    const entry = [vertex, [plane]];
    map.set(key, entry);
  } else {
    const planes = map.get(key)[1];
    planes.push(plane);
  }
};

/*
 * Collect all planes adjacent to each edge.
 * Combine undirected edges, no need for duplicate cylinders.
 */
const mapPlaneToEdge = (map, edge, plane) => {
  const key0 = edge[0].toString();
  const key1 = edge[1].toString();
  // Sort keys to make edges undirected
  const key = key0 < key1 ? `${key0},${key1}` : `${key1},${key0}`;
  if (!map.has(key)) {
    const entry = [edge, [plane]];
    map.set(key, entry);
  } else {
    const planes = map.get(key)[1];
    planes.push(plane);
  }
};

const addUniqueAngle = (map, angle) => {
  const i = map.findIndex((item) => item === angle);
  if (i < 0) {
    map.push(angle);
  }
};

/*
 * Create the expanded shell of the solid:
 * All faces are extruded to 2 times delta
 * Cylinders are constructed around every side
 * Spheres are placed on every vertex
 * the result is a true expansion of the solid
 * @param  {Number} delta
 * @param  {Integer} segments
 */
const expandShell = (options, geometry) => {
  const defaults = {
    delta: 1,
    segments: 12
  };
  const { delta, segments } = Object.assign({ }, defaults, options);

  let result = create$8();
  const vertices2planes = new Map(); // {vertex: [vertex, [plane, ...]]}
  const edges2planes = new Map(); // {edge: [[vertex, vertex], [plane, ...]]}

  const v1 = create$b();
  const v2 = create$b();

  // loop through the polygons
  // - extruded the polygon, and add to the composite result
  // - add the plane to the unique vertex map
  // - add the plane to the unique edge map
  const polygons = toPolygons$1(geometry);
  polygons.forEach((polygon, index) => {
    const extrudeVector = scale$3(create$b(), plane(polygon), 2 * delta);
    const translatedPolygon = transform$7(fromTranslation(create$c(), scale$3(create$b(), extrudeVector, -0.5)), polygon);
    const extrudedFace = extrudePolygon(extrudeVector, translatedPolygon);
    result = unionGeom3Sub(result, extrudedFace);

    const vertices = polygon.vertices;
    for (let i = 0; i < vertices.length; i++) {
      mapPlaneToVertex(vertices2planes, vertices[i], plane(polygon));
      const j = (i + 1) % vertices.length;
      const edge = [vertices[i], vertices[j]];
      mapPlaneToEdge(edges2planes, edge, plane(polygon));
    }
  });

  // now construct a cylinder on every side
  // The cylinder is always an approximation of a true cylinder, having polygons
  // around the sides. We will make sure though that the cylinder will have an edge at every
  // face that touches this side. This ensures that we will get a smooth fill even
  // if two edges are at, say, 10 degrees and the segments is low.
  edges2planes.forEach((item) => {
    const edge = item[0];
    const planes = item[1];
    const startVertex = edge[0];
    const endVertex = edge[1];

    // our x,y and z vectors:
    const zBase = subtract$3(create$b(), endVertex, startVertex);
    normalize$1(zBase, zBase);
    const xBase = planes[0];
    const yBase = cross$1(create$b(), xBase, zBase);

    // make a list of angles that the cylinder should traverse:
    let angles = [];

    // first of all equally spaced around the cylinder:
    for (let i = 0; i < segments; i++) {
      addUniqueAngle(angles, (i * TAU / segments));
    }

    // and also at every normal of all touching planes:
    for (let i = 0, iMax = planes.length; i < iMax; i++) {
      const planeNormal = planes[i];
      const si = dot$2(yBase, planeNormal);
      const co = dot$2(xBase, planeNormal);
      let angle = Math.atan2(si, co);

      if (angle < 0) angle += TAU;
      addUniqueAngle(angles, angle);
      angle = Math.atan2(-si, -co);
      if (angle < 0) angle += TAU;
      addUniqueAngle(angles, angle);
    }

    // this will result in some duplicate angles but we will get rid of those later.
    angles = angles.sort(fnNumberSort);

    // Now construct the cylinder by traversing all angles:
    const numAngles = angles.length;
    let prevP1;
    let prevP2;
    const startFaceVertices = [];
    const endFaceVertices = [];
    const polygons = [];
    for (let i = -1; i < numAngles; i++) {
      const angle = angles[(i < 0) ? (i + numAngles) : i];
      const si = Math.sin(angle);
      const co = Math.cos(angle);
      scale$3(v1, xBase, co * delta);
      scale$3(v2, yBase, si * delta);
      add$1(v1, v1, v2);
      const p1 = add$1(create$b(), startVertex, v1);
      const p2 = add$1(create$b(), endVertex, v1);
      let skip = false;
      if (i >= 0) {
        if (distance$1(p1, prevP1) < EPS) {
          skip = true;
        }
      }
      if (!skip) {
        if (i >= 0) {
          startFaceVertices.push(p1);
          endFaceVertices.push(p2);
          const vertices = [prevP2, p2, p1, prevP1];
          const polygon = create$7(vertices);
          polygons.push(polygon);
        }
        prevP1 = p1;
        prevP2 = p2;
      }
    }
    endFaceVertices.reverse();
    polygons.push(create$7(startFaceVertices));
    polygons.push(create$7(endFaceVertices));

    const cylinder = create$8(polygons);
    result = unionGeom3Sub(result, cylinder);
  });

  // build spheres at each unique vertex
  // We will try to set the x and z axis to the normals of 2 planes
  // This will ensure that our sphere tesselation somewhat matches 2 planes
  vertices2planes.forEach((item) => {
    const vertex = item[0];
    const planes = item[1];
    // use the first normal to be the x axis of our sphere:
    const xaxis = planes[0];
    // and find a suitable z axis. We will use the normal which is most perpendicular to the x axis:
    let bestzaxis = null;
    let bestzaxisOrthogonality = 0;
    for (let i = 1; i < planes.length; i++) {
      const normal = planes[i];
      const cross = cross$1(v1, xaxis, normal);
      const crossLength = length$1(cross);
      if (crossLength > 0.05) { // FIXME why 0.05?
        if (crossLength > bestzaxisOrthogonality) {
          bestzaxisOrthogonality = crossLength;
          bestzaxis = normal;
        }
      }
    }
    if (!bestzaxis) {
      bestzaxis = orthogonal(v1, xaxis);
    }
    const yaxis = cross$1(v1, xaxis, bestzaxis);
    normalize$1(yaxis, yaxis);
    const zaxis = cross$1(v2, yaxis, xaxis);
    const corner = sphere({
      center: [vertex[0], vertex[1], vertex[2]],
      radius: delta,
      segments: segments,
      axes: [xaxis, yaxis, zaxis]
    });
    result = unionGeom3Sub(result, corner);
  });
  return retessellate(result)
};

/*
 * Expand the given geometry (geom3) using the given options (if any).
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+/-) of expansion
 * @param {String} [options.corners='round'] - type corner to create during of expansion; round
 * @param {Integer} [options.segments=12] - number of segments when creating round corners
 * @param {geom3} geometry - the geometry to expand
 * @returns {geom3} expanded geometry
 */
const expandGeom3 = (options, geometry) => {
  const defaults = {
    delta: 1,
    corners: 'round',
    segments: 12
  };
  const { delta, corners, segments } = Object.assign({ }, defaults, options);

  if (!(corners === 'round')) {
    throw new Error('corners must be "round" for 3D geometries')
  }

  const polygons = toPolygons$1(geometry);
  if (polygons.length === 0) throw new Error('the given geometry cannot be empty')

  options = { delta, corners, segments };
  const expanded = expandShell(options, geometry);
  return union(geometry, expanded)
};

const createGeometryFromClosedOffsets = (paths) => {
  let { external, internal } = paths;
  if (area$1(external) < 0) {
    external = external.reverse();
  } else {
    internal = internal.reverse();
  }
  return create$a([external, internal])
};

const createGeometryFromExpandedOpenPath = (paths, segments, corners, delta) => {
  const { points, external, internal } = paths;
  const capSegments = Math.floor(segments / 2); // rotation is 180 degrees
  const e2iCap = [];
  const i2eCap = [];
  if (corners === 'round' && capSegments > 0) {
    // added round caps to the geometry
    const step = Math.PI / capSegments;
    const eCorner = points[points.length - 1];
    const e2iStart = angleRadians(subtract$1(create$9(), external[external.length - 1], eCorner));
    const iCorner = points[0];
    const i2eStart = angleRadians(subtract$1(create$9(), internal[0], iCorner));
    for (let i = 1; i < capSegments; i++) {
      let radians = e2iStart + (step * i);
      let point = fromAngleRadians(create$9(), radians);
      scale$1(point, point, delta);
      add(point, point, eCorner);
      e2iCap.push(point);

      radians = i2eStart + (step * i);
      point = fromAngleRadians(create$9(), radians);
      scale$1(point, point, delta);
      add(point, point, iCorner);
      i2eCap.push(point);
    }
  }
  const allPoints = [];
  allPoints.push(...external, ...e2iCap, ...internal.reverse(), ...i2eCap);
  return create$a([allPoints])
};

/*
 * Expand the given geometry (path2) using the given options (if any).
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+) of expansion
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {path2} geometry - the geometry to expand
 * @returns {geom2} expanded geometry
 */
const expandPath2 = (options, geometry) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    segments: 16
  };

  options = Object.assign({ }, defaults, options);
  const { delta, corners, segments } = options;

  if (delta <= 0) throw new Error('the given delta must be positive for paths')

  if (!(corners === 'edge' || corners === 'chamfer' || corners === 'round')) {
    throw new Error('corners must be "edge", "chamfer", or "round"')
  }

  const closed = geometry.isClosed;
  const points = toPoints$1(geometry);
  if (points.length === 0) throw new Error('the given geometry cannot be empty')

  const paths = {
    points: points,
    external: offsetFromPoints({ delta, corners, segments, closed }, points),
    internal: offsetFromPoints({ delta: -delta, corners, segments, closed }, points)
  };

  if (geometry.isClosed) {
    return createGeometryFromClosedOffsets(paths)
  } else {
    return createGeometryFromExpandedOpenPath(paths, segments, corners, delta)
  }
};

/**
 * Expand the given geometry using the given options.
 * Both internal and external space is expanded for 2D and 3D shapes.
 *
 * Note: Contract is expand using a negative delta.
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+/-) of expansion
 * @param {String} [options.corners='edge'] - type of corner to create after expanding; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {...Objects} objects - the geometries to expand
 * @return {Object|Array} new geometry, or list of new geometries
 * @alias module:modeling/expansions.expand
 *
 * @example
 * let newArc = expand({delta: 5, corners: 'edge'}, arc({}))
 * let newSquare = expand({delta: 5, corners: 'chamfer'}, square({size: 30}))
 * let newSphere = expand({delta: 2, corners: 'round'}, cuboid({size: [20, 25, 5]}))
 */
const expand = (options, ...objects) => {
  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    if (isA$2(object)) return expandPath2(options, object)
    if (isA$5(object)) return expandGeom2(options, object)
    if (isA$3(object)) return expandGeom3(options, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/*
 * Create an offset geometry from the given geom2 using the given options (if any).
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {geom2} geometry - geometry from which to create the offset
 * @returns {geom2} offset geometry, plus rounded corners
 */
const offsetGeom2 = (options, geometry) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    segments: 0
  };
  const { delta, corners, segments } = Object.assign({ }, defaults, options);

  if (!(corners === 'edge' || corners === 'chamfer' || corners === 'round')) {
    throw new Error('corners must be "edge", "chamfer", or "round"')
  }

  // convert the geometry to outlines, and generate offsets from each
  const outlines = toOutlines(geometry);
  const newOutlines = outlines.map((outline) => {
    const level = outlines.reduce((acc, polygon) => acc + arePointsInside(outline, create$3(polygon)), 0);
    const outside = (level % 2) === 0;

    options = {
      delta: outside ? delta : -delta,
      corners,
      closed: true,
      segments
    };
    return offsetFromPoints(options, outline)
  });

  // create a composite geometry from the new outlines
  return create$a(newOutlines)
};

/*
 * Create an offset geometry from the given path using the given options (if any).
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {path2} geometry - geometry from which to create the offset
 * @returns {path2} offset geometry, plus rounded corners
 */
const offsetPath2 = (options, geometry) => {
  const defaults = {
    delta: 1,
    corners: 'edge',
    closed: geometry.isClosed,
    segments: 16
  };
  const { delta, corners, closed, segments } = Object.assign({ }, defaults, options);

  if (!(corners === 'edge' || corners === 'chamfer' || corners === 'round')) {
    throw new Error('corners must be "edge", "chamfer", or "round"')
  }

  options = { delta, corners, closed, segments };
  const newPoints = offsetFromPoints(options, toPoints$1(geometry));
  return fromPoints$2({ closed: closed }, newPoints)
};

/**
 * Create offset geometry from the given geometry using the given options.
 * Offsets from internal and external space are created.
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type of corner to create after offseting; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {...Object} objects - the geometries to offset
 * @return {Object|Array} new geometry, or list of new geometries
 * @alias module:modeling/expansions.offset
 *
 * @example
 * let small = offset({ delta: -4, corners: 'chamfer' }, square({size: 40})) // contract
 */
const offset = (options, ...objects) => {
  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    if (isA$2(object)) return offsetPath2(options, object)
    if (isA$5(object)) return offsetGeom2(options, object)
    // if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/**
 * All shapes (primitives or the results of operations) can be expanded (or contracted.)
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/expansions
 * @example
 * import { expansions } from '@jscad/modeling'
 * const { expand, offset } = expansions'
 */

var index$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  expand: expand,
  offset: offset
});

/*
 * Extrude the given geometry using the given options.
 *
 * @param {Object} [options] - options for extrude
 * @param {Array} [options.offset] - the direction of the extrusion as a 3D vector
 * @param {Number} [options.twistAngle] - the final rotation (RADIANS) about the origin
 * @param {Integer} [options.twistSteps] - the number of steps created to produce the twist (if any)
 * @param {Boolean} [options.repair] - repair gaps in the geometry
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded 3D geometry
*/
const extrudeLinearGeom2 = (options, geometry) => {
  const defaults = {
    offset: [0, 0, 1],
    twistAngle: 0,
    twistSteps: 12,
    repair: true
  };
  let { offset, twistAngle, twistSteps, repair } = Object.assign({ }, defaults, options);

  if (twistSteps < 1) throw new Error('twistSteps must be 1 or more')

  if (twistAngle === 0) {
    twistSteps = 1;
  }

  // convert to vector in order to perform transforms
  const offsetV = clone$9(offset);

  let baseSlice = fromGeom2(geometry);
  if (offsetV[2] < 0) baseSlice = reverse$2(baseSlice);

  const matrix = create$c();
  const createTwist = (progress, index, base) => {
    const Zrotation = index / twistSteps * twistAngle;
    const Zoffset = scale$3(create$b(), offsetV, index / twistSteps);
    multiply$1(matrix, fromZRotation(matrix, Zrotation), fromTranslation(create$c(), Zoffset));

    return transform$3(matrix, base)
  };

  options = {
    numberOfSlices: twistSteps + 1,
    capStart: true,
    capEnd: true,
    repair,
    callback: createTwist
  };
  return extrudeFromSlices(options, baseSlice)
};

/*
 * Extrude the given geometry using the given options.
 *
 * @param {Object} [options] - options for extrude
 * @param {Array} [options.offset] - the direction of the extrusion as a 3D vector
 * @param {Number} [options.twistAngle] - the final rotation (RADIANS) about the origin
 * @param {Integer} [options.twistSteps] - the number of steps created to produce the twist (if any)
 * @param {path2} geometry - the geometry to extrude
 * @returns {geom3} the extruded 3D geometry
*/
const extrudeLinearPath2 = (options, geometry) => {
  if (!geometry.isClosed) throw new Error('extruded path must be closed')
  // Convert path2 to geom2
  const points = toPoints$1(geometry);
  const geometry2 = create$a([points]);
  return extrudeLinearGeom2(options, geometry2)
};

/**
 * Extrude the given geometry in an upward linear direction using the given options.
 * Accepts path2 or geom2 objects as input. Paths must be closed.
 *
 * @param {Object} options - options for extrude
 * @param {Number} [options.height=1] the height of the extrusion
 * @param {Number} [options.twistAngle=0] the final rotation (RADIANS) about the origin of the shape (if any)
 * @param {Integer} [options.twistSteps=1] the resolution of the twist about the axis (if any)
 * @param {...Object} objects - the geometries to extrude
 * @return {Object|Array} the extruded geometry, or a list of extruded geometry
 * @alias module:modeling/extrusions.extrudeLinear
 *
 * @example
 * let myshape = extrudeLinear({height: 10}, rectangle({size: [20, 25]}))
 */
const extrudeLinear = (options, ...objects) => {
  const defaults = {
    height: 1,
    twistAngle: 0,
    twistSteps: 1,
    repair: true
  };
  const { height, twistAngle, twistSteps, repair } = Object.assign({ }, defaults, options);

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  options = { offset: [0, 0, height], twistAngle, twistSteps, repair };

  const results = objects.map((object) => {
    if (isA$2(object)) return extrudeLinearPath2(options, object)
    if (isA$5(object)) return extrudeLinearGeom2(options, object)
    // if (geom3.isA(object)) return geom3.extrude(options, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/*
 * Expand and extrude the given geometry (path2).
 * @See expand for addition options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {path2} geometry - the geometry to extrude
 * @return {geom3} the extruded geometry
 */
const extrudeRectangularPath2 = (options, geometry) => {
  const defaults = {
    size: 1,
    height: 1
  };
  const { size, height } = Object.assign({ }, defaults, options);

  options.delta = size;
  options.offset = [0, 0, height];

  const points = toPoints$1(geometry);
  if (points.length === 0) throw new Error('the given geometry cannot be empty')

  const newGeometry = expand(options, geometry);
  return extrudeLinearGeom2(options, newGeometry)
};

/*
 * Expand and extrude the given geometry (geom2).
 * @see expand for additional options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @return {geom3} the extruded geometry
 */
const extrudeRectangularGeom2 = (options, geometry) => {
  const defaults = {
    size: 1,
    height: 1
  };
  const { size, height } = Object.assign({ }, defaults, options);

  options.delta = size;
  options.offset = [0, 0, height];

  // convert the geometry to outlines
  const outlines = toOutlines(geometry);
  if (outlines.length === 0) throw new Error('the given geometry cannot be empty')

  // create a composite geometry
  let expanded = [];
  outlines.forEach((outline) => {
    if (area$1(outline) < 0) {
      outline = outline.slice().reverse(); // all outlines must wind counterclockwise
    }
    // expand the outline
    const part = expand(options, fromPoints$2({ closed: true }, outline));
    expanded = expanded.concat(toOutlines(part));
  });
  const newGeometry = create$a(expanded);

  return extrudeLinearGeom2(options, newGeometry)
};

/**
 * Extrude the given geometry by following the outline(s) with a rectangle.
 * @See expand for addition options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {...Object} objects - the geometries to extrude
 * @return {Object|Array} the extruded object, or a list of extruded objects
 * @alias module:modeling/extrusions.extrudeRectangular
 *
 * @example
 * let myWalls = extrudeRectangular({size: 1, height: 3}, square({size: 20}))
 * let myWalls = extrudeRectangular({size: 1, height: 300, twistAngle: TAU / 2}, square({size: 20}))
 */
const extrudeRectangular = (options, ...objects) => {
  const defaults = {
    size: 1,
    height: 1
  };
  const { size, height } = Object.assign({}, defaults, options);

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  if (size <= 0) throw new Error('size must be positive')
  if (height <= 0) throw new Error('height must be positive')

  const results = objects.map((object) => {
    if (isA$2(object)) return extrudeRectangularPath2(options, object)
    if (isA$5(object)) return extrudeRectangularGeom2(options, object)
    // if (geom3.isA(object)) return geom3.transform(matrix, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

const projectGeom3 = (options, geometry) => {
  // create a plane from the options, and verify
  const projPlane = fromNormalAndPoint(create$6(), options.axis, options.origin);
  if (Number.isNaN(projPlane[0]) || Number.isNaN(projPlane[1]) || Number.isNaN(projPlane[2]) || Number.isNaN(projPlane[3])) {
    throw new Error('project: invalid axis or origin')
  }

  const epsilon = measureEpsilon(geometry);
  const epsilonArea = (epsilon * epsilon * Math.sqrt(3) / 4);

  if (epsilon === 0) return create$a()

  // project the polygons to the plane
  const polygons = toPolygons$1(geometry);
  let projPolys = [];
  for (let i = 0; i < polygons.length; i++) {
    const newVertices = polygons[i].vertices.map((v) => projectionOfPoint(projPlane, v));
    const newPoly = create$7(newVertices);
    // only keep projections that face the same direction as the plane
    const newPlane = plane(newPoly);
    if (!aboutEqualNormals(projPlane, newPlane)) continue
    // only keep projections that have a measurable area
    if (measureArea$2(newPoly) < epsilonArea) continue
    projPolys.push(newPoly);
  }

  // rotate the polygons to lay on X/Y axes if necessary
  if (!aboutEqualNormals(projPlane, [0, 0, 1])) {
    const rotation = fromVectorRotation(create$c(), projPlane, [0, 0, 1]);
    projPolys = projPolys.map((p) => transform$7(rotation, p));
  }

  // sort the polygons to allow the union to ignore small pieces efficiently
  projPolys = projPolys.sort((a, b) => measureArea$2(b) - measureArea$2(a));

  // convert polygons to geometry, and union all pieces into a single geometry
  const projGeoms = projPolys.map((p) => {
    // This clones the points from vec3 to vec2
    const cloned = p.vertices.map(clone$8);
    return create$a([cloned])
  });

  return unionGeom2(projGeoms)
};

/**
 * Project the given 3D geometry on to the given plane.
 * @param {Object} options - options for project
 * @param {Array} [options.axis=[0,0,1]] the axis of the plane (default is Z axis)
 * @param {Array} [options.origin=[0,0,0]] the origin of the plane
 * @param {...Object} objects - the list of 3D geometry to project
 * @return {geom2|Array} the projected 2D geometry, or a list of 2D projected geometry
 * @alias module:modeling/extrusions.project
 *
 * @example
 * let myshape = project({}, sphere({radius: 20, segments: 5}))
 */
const project = (options, ...objects) => {
  const defaults = {
    axis: [0, 0, 1], // Z axis
    origin: [0, 0, 0]
  };
  const { axis, origin } = Object.assign({ }, defaults, options);

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  options = { axis, origin };

  const results = objects.map((object) => {
    // if (path.isA(object)) return project(options, object)
    // if (geom2.isA(object)) return project(options, object)
    if (isA$3(object)) return projectGeom3(options, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/**
 * All 2D shapes (primitives or the results of operations) can be extruded in various ways.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/extrusions
 * @example
 * import { extrusions } from '@jscad/modeling'
 * const { extrudeFromSlices, extrudeLinear, extrudeRectangular, extrudeRotate, project } = extrusions
 */

var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  extrudeFromSlices: extrudeFromSlices,
  extrudeLinear: extrudeLinear,
  extrudeRectangular: extrudeRectangular,
  extrudeRotate: extrudeRotate,
  project: project
});

/*
 * Create a convex hull of the given set of points, where each point is an array of [x,y].
 * Uses https://en.wikipedia.org/wiki/Graham_scan
 * @param {Array} uniquePoints - list of UNIQUE points from which to create a hull
 * @returns {Array} a list of points that form the hull
 */
const hullPoints2 = (uniquePoints) => {
  // find min point
  let min = fromValues$2(Infinity, Infinity);
  uniquePoints.forEach((point) => {
    if (point[1] < min[1] || (point[1] === min[1] && point[0] < min[0])) {
      min = point;
    }
  });

  // gather information for sorting by polar coordinates (point, angle, distSq)
  const points = [];
  uniquePoints.forEach((point) => {
    // use faster fakeAtan2 instead of Math.atan2
    const angle = fakeAtan2(point[1] - min[1], point[0] - min[0]);
    const distSq = squaredDistance(point, min);
    points.push({ point, angle, distSq });
  });

  // sort by polar coordinates
  points.sort((pt1, pt2) => pt1.angle < pt2.angle
    ? -1
    : pt1.angle > pt2.angle
      ? 1
      : pt1.distSq < pt2.distSq ? -1 : pt1.distSq > pt2.distSq ? 1 : 0);

  const stack = []; // start with empty stack
  points.forEach((point) => {
    let cnt = stack.length;
    while (cnt > 1 && ccw(stack[cnt - 2], stack[cnt - 1], point.point) <= Number.EPSILON) {
      stack.pop(); // get rid of colinear and interior (clockwise) points
      cnt = stack.length;
    }
    stack.push(point.point);
  });

  return stack
};

// returns: < 0 clockwise, 0 colinear, > 0 counter-clockwise
const ccw = (v1, v2, v3) => (v2[0] - v1[0]) * (v3[1] - v1[1]) - (v2[1] - v1[1]) * (v3[0] - v1[0]);

// Returned "angle" is really 1/tan (inverse of slope) made negative to increase with angle.
// This function is strictly for sorting in this algorithm.
const fakeAtan2 = (y, x) => {
  // The "if" is a special case for when the minimum vector found in loop above is present.
  // We need to ensure that it sorts as the minimum point. Otherwise, this becomes NaN.
  if (y === 0 && x === 0) {
    return -Infinity
  } else {
    return -x / y
  }
};

/*
 * Return the unique vertices of a geometry
 */
const toUniquePoints = (geometries) => {
  const found = new Set();
  const uniquePoints = [];

  const addPoint = (point) => {
    const key = point.toString();
    if (!found.has(key)) {
      uniquePoints.push(point);
      found.add(key);
    }
  };

  geometries.forEach((geometry) => {
    if (isA$5(geometry)) {
      toPoints$3(geometry).forEach(addPoint);
    } else if (isA$3(geometry)) {
      // points are grouped by polygon
      toPoints$2(geometry).forEach((points) => points.forEach(addPoint));
    } else if (isA$2(geometry)) {
      toPoints$1(geometry).forEach(addPoint);
    }
  });

  return uniquePoints
};

/*
 * Create a convex hull of the given geometries (path2).
 * @param {...geometries} geometries - list of path2 geometries
 * @returns {path2} new geometry
 */
const hullPath2 = (...geometries) => {
  geometries = flatten(geometries);

  // extract the unique points from the geometries
  const unique = toUniquePoints(geometries);

  const hullPoints = hullPoints2(unique);

  // assemble a new geometry from the list of points
  return fromPoints$2({ closed: true }, hullPoints)
};

/*
 * Create a convex hull of the given geom2 geometries.
 * @param {...geometries} geometries - list of geom2 geometries
 * @returns {geom2} new geometry
 */
const hullGeom2 = (...geometries) => {
  geometries = flatten(geometries);

  // extract the unique points from the geometries
  const unique = toUniquePoints(geometries);

  const hullPoints = hullPoints2(unique);

  // NOTE: more than three points are required to create a new geometry
  if (hullPoints.length < 3) return create$a()

  // assemble a new geometry from the list of points
  return create$a([hullPoints])
};

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

const distanceSquared = (p, a, b) => {
  // == parallelogram solution
  //
  //            s
  //      __a________b__
  //       /   |    /
  //      /   h|   /
  //     /_____|__/
  //    p
  //
  //  s = b - a
  //  area = s * h
  //  |ap x s| = s * h
  //  h = |ap x s| / s
  //
  const ab = [];
  const ap = [];
  const cr = [];
  subtract$3(ab, b, a);
  subtract$3(ap, p, a);
  const area = squaredLength$1(cross$1(cr, ap, ab));
  const s = squaredLength$1(ab);
  if (s === 0) {
    throw Error('a and b are the same point')
  }
  return area / s
};

const pointLineDistance = (point, a, b) => Math.sqrt(distanceSquared(point, a, b));

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */
class VertexList {
  constructor () {
    this.head = null;
    this.tail = null;
  }

  clear () {
    this.head = this.tail = null;
  }

  /**
   * Inserts a `node` before `target`, it's assumed that
   * `target` belongs to this doubly linked list
   *
   * @param {*} target
   * @param {*} node
   */
  insertBefore (target, node) {
    node.prev = target.prev;
    node.next = target;
    if (!node.prev) {
      this.head = node;
    } else {
      node.prev.next = node;
    }
    target.prev = node;
  }

  /**
   * Inserts a `node` after `target`, it's assumed that
   * `target` belongs to this doubly linked list
   *
   * @param {Vertex} target
   * @param {Vertex} node
   */
  insertAfter (target, node) {
    node.prev = target;
    node.next = target.next;
    if (!node.next) {
      this.tail = node;
    } else {
      node.next.prev = node;
    }
    target.next = node;
  }

  /**
   * Appends a `node` to the end of this doubly linked list
   * Note: `node.next` will be unlinked from `node`
   * Note: if `node` is part of another linked list call `addAll` instead
   *
   * @param {*} node
   */
  add (node) {
    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    node.prev = this.tail;
    // since node is the new end it doesn't have a next node
    node.next = null;
    this.tail = node;
  }

  /**
   * Appends a chain of nodes where `node` is the head,
   * the difference with `add` is that it correctly sets the position
   * of the node list `tail` property
   *
   * @param {*} node
   */
  addAll (node) {
    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    node.prev = this.tail;

    // find the end of the list
    while (node.next) {
      node = node.next;
    }
    this.tail = node;
  }

  /**
   * Deletes a `node` from this linked list, it's assumed that `node` is a
   * member of this linked list
   *
   * @param {*} node
   */
  remove (node) {
    if (!node.prev) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }

    if (!node.next) {
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
    }
  }

  /**
   * Removes a chain of nodes whose head is `a` and whose tail is `b`,
   * it's assumed that `a` and `b` belong to this list and also that `a`
   * comes before `b` in the linked list
   *
   * @param {*} a
   * @param {*} b
   */
  removeChain (a, b) {
    if (!a.prev) {
      this.head = b.next;
    } else {
      a.prev.next = b.next;
    }

    if (!b.next) {
      this.tail = a.prev;
    } else {
      b.next.prev = a.prev;
    }
  }

  first () {
    return this.head
  }

  isEmpty () {
    return !this.head
  }
}

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

class Vertex {
  constructor (point, index) {
    this.point = point;
    // index in the input array
    this.index = index;
    // vertex is a double linked list node
    this.next = null;
    this.prev = null;
    // the face that is able to see this point
    this.face = null;
  }
}

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

class HalfEdge {
  constructor (vertex, face) {
    this.vertex = vertex;
    this.face = face;
    this.next = null;
    this.prev = null;
    this.opposite = null;
  }

  head () {
    return this.vertex
  }

  tail () {
    return this.prev
      ? this.prev.vertex
      : null
  }

  length () {
    if (this.tail()) {
      return distance$1(
        this.tail().point,
        this.head().point
      )
    }
    return -1
  }

  lengthSquared () {
    if (this.tail()) {
      return squaredDistance$1(
        this.tail().point,
        this.head().point
      )
    }
    return -1
  }

  setOpposite (edge) {
    this.opposite = edge;
    edge.opposite = this;
  }
}

const VISIBLE = 0;
const NON_CONVEX = 1;
const DELETED = 2;

class Face {
  constructor () {
    this.normal = [];
    this.centroid = [];
    // signed distance from face to the origin
    this.offset = 0;
    // pointer to the vertex in a double linked list this face can see
    this.outside = null;
    this.mark = VISIBLE;
    this.edge = null;
    this.nVertices = 0;
  }

  getEdge (i) {
    if (typeof i !== 'number') {
      throw Error('requires a number')
    }
    let it = this.edge;
    while (i > 0) {
      it = it.next;
      i -= 1;
    }
    while (i < 0) {
      it = it.prev;
      i += 1;
    }
    return it
  }

  computeNormal () {
    const e0 = this.edge;
    const e1 = e0.next;
    let e2 = e1.next;
    const v2 = subtract$3([], e1.head().point, e0.head().point);
    const t = [];
    const v1 = [];

    this.nVertices = 2;
    this.normal = [0, 0, 0];
    while (e2 !== e0) {
      copy$4(v1, v2);
      subtract$3(v2, e2.head().point, e0.head().point);
      add$1(this.normal, this.normal, cross$1(t, v1, v2));
      e2 = e2.next;
      this.nVertices += 1;
    }
    this.area = length$1(this.normal);
    // normalize the vector, since we've already calculated the area
    // it's cheaper to scale the vector using this quantity instead of
    // doing the same operation again
    this.normal = scale$3(this.normal, this.normal, 1 / this.area);
  }

  computeNormalMinArea (minArea) {
    this.computeNormal();
    if (this.area < minArea) {
      // compute the normal without the longest edge
      let maxEdge;
      let maxSquaredLength = 0;
      let edge = this.edge;

      // find the longest edge (in length) in the chain of edges
      do {
        const lengthSquared = edge.lengthSquared();
        if (lengthSquared > maxSquaredLength) {
          maxEdge = edge;
          maxSquaredLength = lengthSquared;
        }
        edge = edge.next;
      } while (edge !== this.edge)

      const p1 = maxEdge.tail().point;
      const p2 = maxEdge.head().point;
      const maxVector = subtract$3([], p2, p1);
      const maxLength = Math.sqrt(maxSquaredLength);
      // maxVector is normalized after this operation
      scale$3(maxVector, maxVector, 1 / maxLength);
      // compute the projection of maxVector over this face normal
      const maxProjection = dot$2(this.normal, maxVector);
      // subtract the quantity maxEdge adds on the normal
      scale$3(maxVector, maxVector, -maxProjection);
      add$1(this.normal, this.normal, maxVector);
      // renormalize `this.normal`
      normalize$1(this.normal, this.normal);
    }
  }

  computeCentroid () {
    this.centroid = [0, 0, 0];
    let edge = this.edge;
    do {
      add$1(this.centroid, this.centroid, edge.head().point);
      edge = edge.next;
    } while (edge !== this.edge)
    scale$3(this.centroid, this.centroid, 1 / this.nVertices);
  }

  computeNormalAndCentroid (minArea) {
    if (typeof minArea !== 'undefined') {
      this.computeNormalMinArea(minArea);
    } else {
      this.computeNormal();
    }
    this.computeCentroid();
    this.offset = dot$2(this.normal, this.centroid);
  }

  distanceToPlane (point) {
    return dot$2(this.normal, point) - this.offset
  }

  /**
   * @private
   *
   * Connects two edges assuming that prev.head().point === next.tail().point
   *
   * @param {HalfEdge} prev
   * @param {HalfEdge} next
   */
  connectHalfEdges (prev, next) {
    let discardedFace;
    if (prev.opposite.face === next.opposite.face) {
      // `prev` is remove a redundant edge
      const oppositeFace = next.opposite.face;
      let oppositeEdge;
      if (prev === this.edge) {
        this.edge = next;
      }
      if (oppositeFace.nVertices === 3) {
        // case:
        // remove the face on the right
        //
        //       /|\
        //      / | \ the face on the right
        //     /  |  \ --> opposite edge
        //    / a |   \
        //   *----*----*
        //  /     b  |  \
        //           ▾
        //      redundant edge
        //
        // Note: the opposite edge is actually in the face to the right
        // of the face to be destroyed
        oppositeEdge = next.opposite.prev.opposite;
        oppositeFace.mark = DELETED;
        discardedFace = oppositeFace;
      } else {
        // case:
        //          t
        //        *----
        //       /| <- right face's redundant edge
        //      / | opposite edge
        //     /  |  ▴   /
        //    / a |  |  /
        //   *----*----*
        //  /     b  |  \
        //           ▾
        //      redundant edge
        oppositeEdge = next.opposite.next;
        // make sure that the link `oppositeFace.edge` points correctly even
        // after the right face redundant edge is removed
        if (oppositeFace.edge === oppositeEdge.prev) {
          oppositeFace.edge = oppositeEdge;
        }

        //       /|   /
        //      / | t/opposite edge
        //     /  | / ▴  /
        //    / a |/  | /
        //   *----*----*
        //  /     b     \
        oppositeEdge.prev = oppositeEdge.prev.prev;
        oppositeEdge.prev.next = oppositeEdge;
      }
      //       /|
      //      / |
      //     /  |
      //    / a |
      //   *----*----*
      //  /     b  ▴  \
      //           |
      //     redundant edge
      next.prev = prev.prev;
      next.prev.next = next;

      //       / \  \
      //      /   \->\
      //     /     \<-\ opposite edge
      //    / a     \  \
      //   *----*----*
      //  /     b  ^  \
      next.setOpposite(oppositeEdge);

      oppositeFace.computeNormalAndCentroid();
    } else {
      // trivial case
      //        *
      //       /|\
      //      / | \
      //     /  |--> next
      //    / a |   \
      //   *----*----*
      //    \ b |   /
      //     \  |--> prev
      //      \ | /
      //       \|/
      //        *
      prev.next = next;
      next.prev = prev;
    }
    return discardedFace
  }

  mergeAdjacentFaces (adjacentEdge, discardedFaces) {
    const oppositeEdge = adjacentEdge.opposite;
    const oppositeFace = oppositeEdge.face;

    discardedFaces.push(oppositeFace);
    oppositeFace.mark = DELETED;

    // find the chain of edges whose opposite face is `oppositeFace`
    //
    //                ===>
    //      \         face         /
    //       * ---- * ---- * ---- *
    //      /     opposite face    \
    //                <===
    //
    let adjacentEdgePrev = adjacentEdge.prev;
    let adjacentEdgeNext = adjacentEdge.next;
    let oppositeEdgePrev = oppositeEdge.prev;
    let oppositeEdgeNext = oppositeEdge.next;

    // left edge
    while (adjacentEdgePrev.opposite.face === oppositeFace) {
      adjacentEdgePrev = adjacentEdgePrev.prev;
      oppositeEdgeNext = oppositeEdgeNext.next;
    }
    // right edge
    while (adjacentEdgeNext.opposite.face === oppositeFace) {
      adjacentEdgeNext = adjacentEdgeNext.next;
      oppositeEdgePrev = oppositeEdgePrev.prev;
    }
    // adjacentEdgePrev  \         face         / adjacentEdgeNext
    //                    * ---- * ---- * ---- *
    // oppositeEdgeNext  /     opposite face    \ oppositeEdgePrev

    // fix the face reference of all the opposite edges that are not part of
    // the edges whose opposite face is not `face` i.e. all the edges that
    // `face` and `oppositeFace` do not have in common
    let edge;
    for (edge = oppositeEdgeNext; edge !== oppositeEdgePrev.next; edge = edge.next) {
      edge.face = this;
    }

    // make sure that `face.edge` is not one of the edges to be destroyed
    // Note: it's important for it to be a `next` edge since `prev` edges
    // might be destroyed on `connectHalfEdges`
    this.edge = adjacentEdgeNext;

    // connect the extremes
    // Note: it might be possible that after connecting the edges a triangular
    // face might be redundant
    let discardedFace;
    discardedFace = this.connectHalfEdges(oppositeEdgePrev, adjacentEdgeNext);
    if (discardedFace) {
      discardedFaces.push(discardedFace);
    }
    discardedFace = this.connectHalfEdges(adjacentEdgePrev, oppositeEdgeNext);
    if (discardedFace) {
      discardedFaces.push(discardedFace);
    }

    this.computeNormalAndCentroid();
    // TODO: additional consistency checks
    return discardedFaces
  }

  collectIndices () {
    const indices = [];
    let edge = this.edge;
    do {
      indices.push(edge.head().index);
      edge = edge.next;
    } while (edge !== this.edge)
    return indices
  }

  static createTriangle (v0, v1, v2, minArea = 0) {
    const face = new Face();
    const e0 = new HalfEdge(v0, face);
    const e1 = new HalfEdge(v1, face);
    const e2 = new HalfEdge(v2, face);

    // join edges
    e0.next = e2.prev = e1;
    e1.next = e0.prev = e2;
    e2.next = e1.prev = e0;

    // main half edge reference
    face.edge = e0;
    face.computeNormalAndCentroid(minArea);
    return face
  }
}

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

// merge types
// non-convex with respect to the large face
const MERGE_NON_CONVEX_WRT_LARGER_FACE = 1;
const MERGE_NON_CONVEX = 2;

class QuickHull {
  constructor (points) {
    if (!Array.isArray(points)) {
      throw TypeError('input is not a valid array')
    }
    if (points.length < 4) {
      throw Error('cannot build a simplex out of <4 points')
    }

    this.tolerance = -1;

    // buffers
    this.nFaces = 0;
    this.nPoints = points.length;

    this.faces = [];
    this.newFaces = [];
    // helpers
    //
    // let `a`, `b` be `Face` instances
    // let `v` be points wrapped as instance of `Vertex`
    //
    //     [v, v, ..., v, v, v, ...]
    //      ^             ^
    //      |             |
    //  a.outside     b.outside
    //
    this.claimed = new VertexList();
    this.unclaimed = new VertexList();

    // vertices of the hull(internal representation of points)
    this.vertices = [];
    for (let i = 0; i < points.length; i += 1) {
      this.vertices.push(new Vertex(points[i], i));
    }
    this.discardedFaces = [];
    this.vertexPointIndices = [];
  }

  addVertexToFace (vertex, face) {
    vertex.face = face;
    if (!face.outside) {
      this.claimed.add(vertex);
    } else {
      this.claimed.insertBefore(face.outside, vertex);
    }
    face.outside = vertex;
  }

  /**
   * Removes `vertex` for the `claimed` list of vertices, it also makes sure
   * that the link from `face` to the first vertex it sees in `claimed` is
   * linked correctly after the removal
   *
   * @param {Vertex} vertex
   * @param {Face} face
   */
  removeVertexFromFace (vertex, face) {
    if (vertex === face.outside) {
      // fix face.outside link
      if (vertex.next && vertex.next.face === face) {
        // face has at least 2 outside vertices, move the `outside` reference
        face.outside = vertex.next;
      } else {
        // vertex was the only outside vertex that face had
        face.outside = null;
      }
    }
    this.claimed.remove(vertex);
  }

  /**
   * Removes all the visible vertices that `face` is able to see which are
   * stored in the `claimed` vertext list
   *
   * @param {Face} face
   * @return {Vertex|undefined} If face had visible vertices returns
   * `face.outside`, otherwise undefined
   */
  removeAllVerticesFromFace (face) {
    if (face.outside) {
      // pointer to the last vertex of this face
      // [..., outside, ..., end, outside, ...]
      //          |           |      |
      //          a           a      b
      let end = face.outside;
      while (end.next && end.next.face === face) {
        end = end.next;
      }
      this.claimed.removeChain(face.outside, end);
      //                            b
      //                       [ outside, ...]
      //                            |  removes this link
      //     [ outside, ..., end ] -┘
      //          |           |
      //          a           a
      end.next = null;
      return face.outside
    }
  }

  /**
   * Removes all the visible vertices that `face` is able to see, additionally
   * checking the following:
   *
   * If `absorbingFace` doesn't exist then all the removed vertices will be
   * added to the `unclaimed` vertex list
   *
   * If `absorbingFace` exists then this method will assign all the vertices of
   * `face` that can see `absorbingFace`, if a vertex cannot see `absorbingFace`
   * it's added to the `unclaimed` vertex list
   *
   * @param {Face} face
   * @param {Face} [absorbingFace]
   */
  deleteFaceVertices (face, absorbingFace) {
    const faceVertices = this.removeAllVerticesFromFace(face);
    if (faceVertices) {
      if (!absorbingFace) {
        // mark the vertices to be reassigned to some other face
        this.unclaimed.addAll(faceVertices);
      } else {
        // if there's an absorbing face try to assign as many vertices
        // as possible to it

        // the reference `vertex.next` might be destroyed on
        // `this.addVertexToFace` (see VertexList#add), nextVertex is a
        // reference to it
        let nextVertex;
        for (let vertex = faceVertices; vertex; vertex = nextVertex) {
          nextVertex = vertex.next;
          const distance = absorbingFace.distanceToPlane(vertex.point);

          // check if `vertex` is able to see `absorbingFace`
          if (distance > this.tolerance) {
            this.addVertexToFace(vertex, absorbingFace);
          } else {
            this.unclaimed.add(vertex);
          }
        }
      }
    }
  }

  /**
   * Reassigns as many vertices as possible from the unclaimed list to the new
   * faces
   *
   * @param {Faces[]} newFaces
   */
  resolveUnclaimedPoints (newFaces) {
    // cache next vertex so that if `vertex.next` is destroyed it's still
    // recoverable
    let vertexNext = this.unclaimed.first();
    for (let vertex = vertexNext; vertex; vertex = vertexNext) {
      vertexNext = vertex.next;
      let maxDistance = this.tolerance;
      let maxFace;
      for (let i = 0; i < newFaces.length; i += 1) {
        const face = newFaces[i];
        if (face.mark === VISIBLE) {
          const dist = face.distanceToPlane(vertex.point);
          if (dist > maxDistance) {
            maxDistance = dist;
            maxFace = face;
          }
          if (maxDistance > 1000 * this.tolerance) {
            break
          }
        }
      }

      if (maxFace) {
        this.addVertexToFace(vertex, maxFace);
      }
    }
  }

  /**
   * Computes the extremes of a tetrahedron which will be the initial hull
   *
   * @return {number[]} The min/max vertices in the x,y,z directions
   */
  computeExtremes () {
    const min = [];
    const max = [];

    // min vertex on the x,y,z directions
    const minVertices = [];
    // max vertex on the x,y,z directions
    const maxVertices = [];

    let i, j;

    // initially assume that the first vertex is the min/max
    for (i = 0; i < 3; i += 1) {
      minVertices[i] = maxVertices[i] = this.vertices[0];
    }
    // copy the coordinates of the first vertex to min/max
    for (i = 0; i < 3; i += 1) {
      min[i] = max[i] = this.vertices[0].point[i];
    }

    // compute the min/max vertex on all 6 directions
    for (i = 1; i < this.vertices.length; i += 1) {
      const vertex = this.vertices[i];
      const point = vertex.point;
      // update the min coordinates
      for (j = 0; j < 3; j += 1) {
        if (point[j] < min[j]) {
          min[j] = point[j];
          minVertices[j] = vertex;
        }
      }
      // update the max coordinates
      for (j = 0; j < 3; j += 1) {
        if (point[j] > max[j]) {
          max[j] = point[j];
          maxVertices[j] = vertex;
        }
      }
    }

    // compute epsilon
    this.tolerance = 3 * Number.EPSILON * (
      Math.max(Math.abs(min[0]), Math.abs(max[0])) +
      Math.max(Math.abs(min[1]), Math.abs(max[1])) +
      Math.max(Math.abs(min[2]), Math.abs(max[2]))
    );
    return [minVertices, maxVertices]
  }

  /**
   * Compues the initial tetrahedron assigning to its faces all the points that
   * are candidates to form part of the hull
   */
  createInitialSimplex () {
    const vertices = this.vertices;
    const [min, max] = this.computeExtremes();
    let v2, v3;
    let i, j;

    // Find the two vertices with the greatest 1d separation
    // (max.x - min.x)
    // (max.y - min.y)
    // (max.z - min.z)
    let maxDistance = 0;
    let indexMax = 0;
    for (i = 0; i < 3; i += 1) {
      const distance = max[i].point[i] - min[i].point[i];
      if (distance > maxDistance) {
        maxDistance = distance;
        indexMax = i;
      }
    }
    const v0 = min[indexMax];
    const v1 = max[indexMax];

    // the next vertex is the one farthest to the line formed by `v0` and `v1`
    maxDistance = 0;
    for (i = 0; i < this.vertices.length; i += 1) {
      const vertex = this.vertices[i];
      if (vertex !== v0 && vertex !== v1) {
        const distance = pointLineDistance(
          vertex.point, v0.point, v1.point
        );
        if (distance > maxDistance) {
          maxDistance = distance;
          v2 = vertex;
        }
      }
    }

    // the next vertex is the one farthest to the plane `v0`, `v1`, `v2`
    // normalize((v2 - v1) x (v0 - v1))
    const normal = fromPoints$4([], v0.point, v1.point, v2.point);
    // distance from the origin to the plane
    const distPO = dot$2(v0.point, normal);
    maxDistance = -1;
    for (i = 0; i < this.vertices.length; i += 1) {
      const vertex = this.vertices[i];
      if (vertex !== v0 && vertex !== v1 && vertex !== v2) {
        const distance = Math.abs(dot$2(normal, vertex.point) - distPO);
        if (distance > maxDistance) {
          maxDistance = distance;
          v3 = vertex;
        }
      }
    }

    // initial simplex
    // Taken from http://everything2.com/title/How+to+paint+a+tetrahedron
    //
    //                              v2
    //                             ,|,
    //                           ,7``\'VA,
    //                         ,7`   |, `'VA,
    //                       ,7`     `\    `'VA,
    //                     ,7`        |,      `'VA,
    //                   ,7`          `\         `'VA,
    //                 ,7`             |,           `'VA,
    //               ,7`               `\       ,..ooOOTK` v3
    //             ,7`                  |,.ooOOT''`    AV
    //           ,7`            ,..ooOOT`\`           /7
    //         ,7`      ,..ooOOT''`      |,          AV
    //        ,T,..ooOOT''`              `\         /7
    //     v0 `'TTs.,                     |,       AV
    //            `'TTs.,                 `\      /7
    //                 `'TTs.,             |,    AV
    //                      `'TTs.,        `\   /7
    //                           `'TTs.,    |, AV
    //                                `'TTs.,\/7
    //                                     `'T`
    //                                       v1
    //
    const faces = [];
    if (dot$2(v3.point, normal) - distPO < 0) {
      // the face is not able to see the point so `planeNormal`
      // is pointing outside the tetrahedron
      faces.push(
        Face.createTriangle(v0, v1, v2),
        Face.createTriangle(v3, v1, v0),
        Face.createTriangle(v3, v2, v1),
        Face.createTriangle(v3, v0, v2)
      );

      // set the opposite edge
      for (i = 0; i < 3; i += 1) {
        const j = (i + 1) % 3;
        // join face[i] i > 0, with the first face
        faces[i + 1].getEdge(2).setOpposite(faces[0].getEdge(j));
        // join face[i] with face[i + 1], 1 <= i <= 3
        faces[i + 1].getEdge(1).setOpposite(faces[j + 1].getEdge(0));
      }
    } else {
      // the face is able to see the point so `planeNormal`
      // is pointing inside the tetrahedron
      faces.push(
        Face.createTriangle(v0, v2, v1),
        Face.createTriangle(v3, v0, v1),
        Face.createTriangle(v3, v1, v2),
        Face.createTriangle(v3, v2, v0)
      );

      // set the opposite edge
      for (i = 0; i < 3; i += 1) {
        const j = (i + 1) % 3;
        // join face[i] i > 0, with the first face
        faces[i + 1].getEdge(2).setOpposite(faces[0].getEdge((3 - i) % 3));
        // join face[i] with face[i + 1]
        faces[i + 1].getEdge(0).setOpposite(faces[j + 1].getEdge(1));
      }
    }

    // the initial hull is the tetrahedron
    for (i = 0; i < 4; i += 1) {
      this.faces.push(faces[i]);
    }

    // initial assignment of vertices to the faces of the tetrahedron
    for (i = 0; i < vertices.length; i += 1) {
      const vertex = vertices[i];
      if (vertex !== v0 && vertex !== v1 && vertex !== v2 && vertex !== v3) {
        maxDistance = this.tolerance;
        let maxFace;
        for (j = 0; j < 4; j += 1) {
          const distance = faces[j].distanceToPlane(vertex.point);
          if (distance > maxDistance) {
            maxDistance = distance;
            maxFace = faces[j];
          }
        }

        if (maxFace) {
          this.addVertexToFace(vertex, maxFace);
        }
      }
    }
  }

  reindexFaceAndVertices () {
    // remove inactive faces
    const activeFaces = [];
    for (let i = 0; i < this.faces.length; i += 1) {
      const face = this.faces[i];
      if (face.mark === VISIBLE) {
        activeFaces.push(face);
      }
    }
    this.faces = activeFaces;
  }

  collectFaces (skipTriangulation) {
    const faceIndices = [];
    for (let i = 0; i < this.faces.length; i += 1) {
      if (this.faces[i].mark !== VISIBLE) {
        throw Error('attempt to include a destroyed face in the hull')
      }
      const indices = this.faces[i].collectIndices();
      if (skipTriangulation) {
        faceIndices.push(indices);
      } else {
        for (let j = 0; j < indices.length - 2; j += 1) {
          faceIndices.push(
            [indices[0], indices[j + 1], indices[j + 2]]
          );
        }
      }
    }
    return faceIndices
  }

  /**
   * Finds the next vertex to make faces with the current hull
   *
   * - let `face` be the first face existing in the `claimed` vertex list
   *  - if `face` doesn't exist then return since there are no vertices left
   *  - otherwise for each `vertex` that face sees find the one furthest away
   *  from `face`
   *
   * @return {Vertex|undefined} Returns undefined when there are no more
   * visible vertices
   */
  nextVertexToAdd () {
    if (!this.claimed.isEmpty()) {
      let eyeVertex, vertex;
      let maxDistance = 0;
      const eyeFace = this.claimed.first().face;
      for (vertex = eyeFace.outside; vertex && vertex.face === eyeFace; vertex = vertex.next) {
        const distance = eyeFace.distanceToPlane(vertex.point);
        if (distance > maxDistance) {
          maxDistance = distance;
          eyeVertex = vertex;
        }
      }
      return eyeVertex
    }
  }

  /**
   * Computes a chain of half edges in ccw order called the `horizon`, for an
   * edge to be part of the horizon it must join a face that can see
   * `eyePoint` and a face that cannot see `eyePoint`
   *
   * @param {number[]} eyePoint - The coordinates of a point
   * @param {HalfEdge} crossEdge - The edge used to jump to the current `face`
   * @param {Face} face - The current face being tested
   * @param {HalfEdge[]} horizon - The edges that form part of the horizon in
   * ccw order
   */
  computeHorizon (eyePoint, crossEdge, face, horizon) {
    // moves face's vertices to the `unclaimed` vertex list
    this.deleteFaceVertices(face);

    face.mark = DELETED;

    let edge;
    if (!crossEdge) {
      edge = crossEdge = face.getEdge(0);
    } else {
      // start from the next edge since `crossEdge` was already analyzed
      // (actually `crossEdge.opposite` was the face who called this method
      // recursively)
      edge = crossEdge.next;
    }

    // All the faces that are able to see `eyeVertex` are defined as follows
    //
    //       v    /
    //           / <== visible face
    //          /
    //         |
    //         | <== not visible face
    //
    //  dot(v, visible face normal) - visible face offset > this.tolerance
    //
    do {
      const oppositeEdge = edge.opposite;
      const oppositeFace = oppositeEdge.face;
      if (oppositeFace.mark === VISIBLE) {
        if (oppositeFace.distanceToPlane(eyePoint) > this.tolerance) {
          this.computeHorizon(eyePoint, oppositeEdge, oppositeFace, horizon);
        } else {
          horizon.push(edge);
        }
      }
      edge = edge.next;
    } while (edge !== crossEdge)
  }

  /**
   * Creates a face with the points `eyeVertex.point`, `horizonEdge.tail` and
   * `horizonEdge.tail` in ccw order
   *
   * @param {Vertex} eyeVertex
   * @param {HalfEdge} horizonEdge
   * @return {HalfEdge} The half edge whose vertex is the eyeVertex
   */
  addAdjoiningFace (eyeVertex, horizonEdge) {
    // all the half edges are created in ccw order thus the face is always
    // pointing outside the hull
    // edges:
    //
    //                  eyeVertex.point
    //                       / \
    //                      /   \
    //                  1  /     \  0
    //                    /       \
    //                   /         \
    //                  /           \
    //          horizon.tail --- horizon.head
    //                        2
    //
    const face = Face.createTriangle(
      eyeVertex,
      horizonEdge.tail(),
      horizonEdge.head()
    );
    this.faces.push(face);
    // join face.getEdge(-1) with the horizon's opposite edge
    // face.getEdge(-1) = face.getEdge(2)
    face.getEdge(-1).setOpposite(horizonEdge.opposite);
    return face.getEdge(0)
  }

  /**
   * Adds horizon.length faces to the hull, each face will be 'linked' with the
   * horizon opposite face and the face on the left/right
   *
   * @param {Vertex} eyeVertex
   * @param {HalfEdge[]} horizon - A chain of half edges in ccw order
   */
  addNewFaces (eyeVertex, horizon) {
    this.newFaces = [];
    let firstSideEdge, previousSideEdge;
    for (let i = 0; i < horizon.length; i += 1) {
      const horizonEdge = horizon[i];
      // returns the right side edge
      const sideEdge = this.addAdjoiningFace(eyeVertex, horizonEdge);
      if (!firstSideEdge) {
        firstSideEdge = sideEdge;
      } else {
        // joins face.getEdge(1) with previousFace.getEdge(0)
        sideEdge.next.setOpposite(previousSideEdge);
      }
      this.newFaces.push(sideEdge.face);
      previousSideEdge = sideEdge;
    }
    firstSideEdge.next.setOpposite(previousSideEdge);
  }

  /**
   * Computes the distance from `edge` opposite face's centroid to
   * `edge.face`
   *
   * @param {HalfEdge} edge
   * @return {number}
   * - A positive number when the centroid of the opposite face is above the
   *   face i.e. when the faces are concave
   * - A negative number when the centroid of the opposite face is below the
   *   face i.e. when the faces are convex
   */
  oppositeFaceDistance (edge) {
    return edge.face.distanceToPlane(edge.opposite.face.centroid)
  }

  /**
   * Merges a face with none/any/all its neighbors according to the strategy
   * used
   *
   * if `mergeType` is MERGE_NON_CONVEX_WRT_LARGER_FACE then the merge will be
   * decided based on the face with the larger area, the centroid of the face
   * with the smaller area will be checked against the one with the larger area
   * to see if it's in the merge range [tolerance, -tolerance] i.e.
   *
   *    dot(centroid smaller face, larger face normal) - larger face offset > -tolerance
   *
   * Note that the first check (with +tolerance) was done on `computeHorizon`
   *
   * If the above is not true then the check is done with respect to the smaller
   * face i.e.
   *
   *    dot(centroid larger face, smaller face normal) - smaller face offset > -tolerance
   *
   * If true then it means that two faces are non-convex (concave), even if the
   * dot(...) - offset value is > 0 (that's the point of doing the merge in the
   * first place)
   *
   * If two faces are concave then the check must also be done on the other face
   * but this is done in another merge pass, for this to happen the face is
   * marked in a temporal NON_CONVEX state
   *
   * if `mergeType` is MERGE_NON_CONVEX then two faces will be merged only if
   * they pass the following conditions
   *
   *    dot(centroid smaller face, larger face normal) - larger face offset > -tolerance
   *    dot(centroid larger face, smaller face normal) - smaller face offset > -tolerance
   *
   * @param {Face} face
   * @param {number} mergeType - Either MERGE_NON_CONVEX_WRT_LARGER_FACE or
   * MERGE_NON_CONVEX
   */
  doAdjacentMerge (face, mergeType) {
    let edge = face.edge;
    let convex = true;
    let it = 0;
    do {
      if (it >= face.nVertices) {
        throw Error('merge recursion limit exceeded')
      }
      const oppositeFace = edge.opposite.face;
      let merge = false;

      // Important notes about the algorithm to merge faces
      //
      // - Given a vertex `eyeVertex` that will be added to the hull
      //   all the faces that cannot see `eyeVertex` are defined as follows
      //
      //      dot(v, not visible face normal) - not visible offset < tolerance
      //
      // - Two faces can be merged when the centroid of one of these faces
      // projected to the normal of the other face minus the other face offset
      // is in the range [tolerance, -tolerance]
      // - Since `face` (given in the input for this method) has passed the
      // check above we only have to check the lower bound e.g.
      //
      //      dot(v, not visible face normal) - not visible offset > -tolerance
      //
      if (mergeType === MERGE_NON_CONVEX) {
        if (this.oppositeFaceDistance(edge) > -this.tolerance ||
            this.oppositeFaceDistance(edge.opposite) > -this.tolerance) {
          merge = true;
        }
      } else {
        if (face.area > oppositeFace.area) {
          if (this.oppositeFaceDistance(edge) > -this.tolerance) {
            merge = true;
          } else if (this.oppositeFaceDistance(edge.opposite) > -this.tolerance) {
            convex = false;
          }
        } else {
          if (this.oppositeFaceDistance(edge.opposite) > -this.tolerance) {
            merge = true;
          } else if (this.oppositeFaceDistance(edge) > -this.tolerance) {
            convex = false;
          }
        }
      }

      if (merge) {
        // when two faces are merged it might be possible that redundant faces
        // are destroyed, in that case move all the visible vertices from the
        // destroyed faces to the `unclaimed` vertex list
        const discardedFaces = face.mergeAdjacentFaces(edge, []);
        for (let i = 0; i < discardedFaces.length; i += 1) {
          this.deleteFaceVertices(discardedFaces[i], face);
        }
        return true
      }

      edge = edge.next;
      it += 1;
    } while (edge !== face.edge)
    if (!convex) {
      face.mark = NON_CONVEX;
    }
    return false
  }

  /**
   * Adds a vertex to the hull with the following algorithm
   *
   * - Compute the `horizon` which is a chain of half edges, for an edge to
   *   belong to this group it must be the edge connecting a face that can
   *   see `eyeVertex` and a face which cannot see `eyeVertex`
   * - All the faces that can see `eyeVertex` have its visible vertices removed
   *   from the claimed VertexList
   * - A new set of faces is created with each edge of the `horizon` and
   *   `eyeVertex`, each face is connected with the opposite horizon face and
   *   the face on the left/right
   * - The new faces are merged if possible with the opposite horizon face first
   *   and then the faces on the right/left
   * - The vertices removed from all the visible faces are assigned to the new
   *   faces if possible
   *
   * @param {Vertex} eyeVertex
   */
  addVertexToHull (eyeVertex) {
    const horizon = [];

    this.unclaimed.clear();

    // remove `eyeVertex` from `eyeVertex.face` so that it can't be added to the
    // `unclaimed` vertex list
    this.removeVertexFromFace(eyeVertex, eyeVertex.face);
    this.computeHorizon(eyeVertex.point, null, eyeVertex.face, horizon);
    this.addNewFaces(eyeVertex, horizon);

    // first merge pass
    // Do the merge with respect to the larger face
    for (let i = 0; i < this.newFaces.length; i += 1) {
      const face = this.newFaces[i];
      if (face.mark === VISIBLE) {
        while (this.doAdjacentMerge(face, MERGE_NON_CONVEX_WRT_LARGER_FACE)) {} // eslint-disable-line no-empty
      }
    }

    // second merge pass
    // Do the merge on non-convex faces (a face is marked as non-convex in the
    // first pass)
    for (let i = 0; i < this.newFaces.length; i += 1) {
      const face = this.newFaces[i];
      if (face.mark === NON_CONVEX) {
        face.mark = VISIBLE;
        while (this.doAdjacentMerge(face, MERGE_NON_CONVEX)) {} // eslint-disable-line no-empty
      }
    }

    // reassign `unclaimed` vertices to the new faces
    this.resolveUnclaimedPoints(this.newFaces);
  }

  build () {
    let eyeVertex;
    this.createInitialSimplex();
    while ((eyeVertex = this.nextVertexToAdd())) {
      this.addVertexToHull(eyeVertex);
    }
    this.reindexFaceAndVertices();
  }
}

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

const runner = (points, options = {}) => {
  const instance = new QuickHull(points);
  instance.build();
  return instance.collectFaces(options.skipTriangulation)
};

/*
 * Create a convex hull of the given geometries (geom3).
 * @param {...geometries} geometries - list of geom3 geometries
 * @returns {geom3} new geometry
 */
const hullGeom3 = (...geometries) => {
  geometries = flatten(geometries);

  if (geometries.length === 1) return geometries[0]

  // extract the unique vertices from the geometries
  const unique = toUniquePoints(geometries);

  const faces = runner(unique, { skipTriangulation: true });

  const polygons = faces.map((face) => {
    const vertices = face.map((index) => unique[index]);
    return create$7(vertices)
  });

  return create$8(polygons)
};

/**
 * Create a convex hull of the given geometries.
 * The given geometries should be of the same type, either geom2 or geom3 or path2.
 * @param {...Objects} geometries - list of geometries from which to create a hull
 * @returns {geom2|geom3} new geometry
 * @alias module:modeling/hulls.hull
 *
 * @example
 * let myshape = hull(rectangle({center: [-5,-5]}), ellipse({center: [5,5]}))
 *
 * @example
 * +-------+           +-------+
 * |       |           |        \
 * |   A   |           |         \
 * |       |           |          \
 * +-------+           +           \
 *                  =   \           \
 *       +-------+       \           +
 *       |       |        \          |
 *       |   B   |         \         |
 *       |       |          \        |
 *       +-------+           +-------+
 */
const hull = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('only hulls of the same type are supported')
  }

  const geometry = geometries[0];
  if (isA$2(geometry)) return hullPath2(geometries)
  if (isA$5(geometry)) return hullGeom2(geometries)
  if (isA$3(geometry)) return hullGeom3(geometries)

  // FIXME should this throw an error for unknown geometries?
  return geometry
};

/**
 * Create a chain of hulled geometries from the given geometries.
 * Essentially hull A+B, B+C, C+D, etc., then union the results.
 * The given geometries should be of the same type, either geom2 or geom3 or path2.
 *
 * @param {...Objects} geometries - list of geometries from which to create a hull
 * @returns {geom2|geom3} new geometry
 * @alias module:modeling/hulls.hullChain
 *
 * @example
 * let newShape = hullChain(rectangle({center: [-5,-5]}), circle({center: [0,0]}), rectangle({center: [5,5]}))
 *
 * @example
 * +-------+   +-------+     +-------+   +------+
 * |       |   |       |     |        \ /       |
 * |   A   |   |   C   |     |         |        |
 * |       |   |       |     |                  |
 * +-------+   +-------+     +                  +
 *                       =   \                 /
 *       +-------+            \               /
 *       |       |             \             /
 *       |   B   |              \           /
 *       |       |               \         /
 *       +-------+                +-------+
 */
const hullChain = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length < 2) throw new Error('wrong number of arguments')

  const hulls = [];
  for (let i = 1; i < geometries.length; i++) {
    hulls.push(hull(geometries[i - 1], geometries[i]));
  }
  return union(hulls)
};

/**
 * All shapes (primitives or the results of operations) can be passed to hull functions
 * to determine the convex hull of all points.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/hulls
 * @example
 * const { hull, hullChain } = require('@jscad/modeling').hulls
 */

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hull: hull,
  hullChain: hullChain
});

const isValidPoly3 = (epsilon, polygon) => {
  const area = Math.abs(measureArea$2(polygon));
  return (Number.isFinite(area) && area > epsilon)
};

/*
 * Snap the given list of polygons to the epsilon.
 */
const snapPolygons = (epsilon, polygons) => {
  let newPolygons = polygons.map((polygon) => {
    const snapVertices = polygon.vertices.map((vertex) => snap$2(create$b(), vertex, epsilon));
    // only retain unique vertices
    const newVertices = [];
    for (let i = 0; i < snapVertices.length; i++) {
      const j = (i + 1) % snapVertices.length;
      if (!equals$7(snapVertices[i], snapVertices[j])) newVertices.push(snapVertices[i]);
    }
    const newPolygon = create$7(newVertices);
    if (polygon.color) newPolygon.color = polygon.color;
    return newPolygon
  });
  // snap can produce polygons with zero (0) area, remove those
  const epsilonArea = (epsilon * epsilon * Math.sqrt(3) / 4);
  newPolygons = newPolygons.filter((polygon) => isValidPoly3(epsilonArea, polygon));
  return newPolygons
};

// create a set of edges from the given polygon, and link the edges as well
const createEdges = (polygon) => {
  const vertices = toVertices$1(polygon);
  const edges = [];
  for (let i = 0; i < vertices.length; i++) {
    const j = (i + 1) % vertices.length;
    const edge = {
      v1: vertices[i],
      v2: vertices[j]
    };
    edges.push(edge);
  }
  // link the edges together
  for (let i = 0; i < edges.length; i++) {
    const j = (i + 1) % vertices.length;
    edges[i].next = edges[j];
    edges[j].prev = edges[i];
  }
  return edges
};

const insertEdge = (edges, edge) => {
  const key = `${edge.v1}:${edge.v2}`;
  edges.set(key, edge);
};

const deleteEdge = (edges, edge) => {
  const key = `${edge.v1}:${edge.v2}`;
  edges.delete(key);
};

const findOppositeEdge = (edges, edge) => {
  const key = `${edge.v2}:${edge.v1}`; // NOTE: OPPOSITE OF INSERT KEY
  return edges.get(key)
};

// calculate the two adjoining angles between the opposing edges
const calculateAnglesBetween = (current, opposite, normal) => {
  let v0 = current.prev.v1;
  let v1 = current.prev.v2;
  let v2 = opposite.next.v2;
  const angle1 = calculateAngle(v0, v1, v2, normal);

  v0 = opposite.prev.v1;
  v1 = opposite.prev.v2;
  v2 = current.next.v2;
  const angle2 = calculateAngle(v0, v1, v2, normal);

  return [angle1, angle2]
};

const v1 = create$b();
const v2 = create$b();

const calculateAngle = (prevVertex, midVertex, nextVertex, normal) => {
  const d0 = subtract$3(v1, midVertex, prevVertex);
  const d1 = subtract$3(v2, nextVertex, midVertex);
  cross$1(d0, d0, d1);
  return dot$2(d0, normal)
};

// create a polygon starting from the given edge (if possible)
const createPolygonAnd = (edge) => {
  let polygon;
  const vertices = [];
  while (edge.next) {
    const next = edge.next;

    vertices.push(edge.v1);

    edge.v1 = null;
    edge.v2 = null;
    edge.next = null;
    edge.prev = null;

    edge = next;
  }
  if (vertices.length > 0) polygon = create$7(vertices);
  return polygon
};

/*
 * Merge COPLANAR polygons that share common edges.
 * @param {poly3[]} sourcePolygons - list of polygons
 * @returns {poly3[]} new set of polygons
 */
const mergeCoplanarPolygons = (sourcePolygons) => {
  if (sourcePolygons.length < 2) return sourcePolygons

  const normal = sourcePolygons[0].plane;
  const polygons = sourcePolygons.slice();
  const edgeList = new Map();

  while (polygons.length > 0) { // NOTE: the length of polygons WILL change
    const polygon = polygons.shift();
    const edges = createEdges(polygon);
    for (let i = 0; i < edges.length; i++) {
      const current = edges[i];
      const opposite = findOppositeEdge(edgeList, current);
      if (opposite) {
        const angles = calculateAnglesBetween(current, opposite, normal);
        if (angles[0] >= 0 && angles[1] >= 0) {
          const edge1 = opposite.next;
          const edge2 = current.next;
          // adjust the edges, linking together opposing polygons
          current.prev.next = opposite.next;
          current.next.prev = opposite.prev;

          opposite.prev.next = current.next;
          opposite.next.prev = current.prev;

          // remove the opposing edges
          current.v1 = null;
          current.v2 = null;
          current.next = null;
          current.prev = null;

          deleteEdge(edgeList, opposite);

          opposite.v1 = null;
          opposite.v2 = null;
          opposite.next = null;
          opposite.prev = null;

          const mergeEdges = (list, e1, e2) => {
            const newEdge = {
              v1: e2.v1,
              v2: e1.v2,
              next: e1.next,
              prev: e2.prev
            };
            // link in newEdge
            e2.prev.next = newEdge;
            e1.next.prev = newEdge;
            // remove old edges
            deleteEdge(list, e1);
            e1.v1 = null;
            e1.v2 = null;
            e1.next = null;
            e1.prev = null;

            deleteEdge(list, e2);
            e2.v1 = null;
            e2.v2 = null;
            e2.next = null;
            e2.prev = null;
          };

          if (angles[0] === 0.0) {
            mergeEdges(edgeList, edge1, edge1.prev);
          }
          if (angles[1] === 0.0) {
            mergeEdges(edgeList, edge2, edge2.prev);
          }
        }
      } else {
        if (current.next) insertEdge(edgeList, current);
      }
    }
  }

  // build a set of polygons from the remaining edges
  const destPolygons = [];
  edgeList.forEach((edge) => {
    const polygon = createPolygonAnd(edge);
    if (polygon) destPolygons.push(polygon);
  });

  edgeList.clear();

  return destPolygons
};

const coplanar = (plane1, plane2) => {
  // expect the same distance from the origin, within tolerance
  if (Math.abs(plane1[3] - plane2[3]) < 0.00000015) {
    return aboutEqualNormals(plane1, plane2)
  }
  return false
};

const mergePolygons = (epsilon, polygons) => {
  const polygonsPerPlane = []; // elements: [plane, [poly3...]]
  polygons.forEach((polygon) => {
    const mapping = polygonsPerPlane.find((element) => coplanar(element[0], plane(polygon)));
    if (mapping) {
      const polygons = mapping[1];
      polygons.push(polygon);
    } else {
      polygonsPerPlane.push([plane(polygon), [polygon]]);
    }
  });

  let destPolygons = [];
  polygonsPerPlane.forEach((mapping) => {
    const sourcePolygons = mapping[1];
    const retesselatedPolygons = mergeCoplanarPolygons(sourcePolygons);
    destPolygons = destPolygons.concat(retesselatedPolygons);
  });
  return destPolygons
};

const getTag = (vertex) => `${vertex}`;

const addSide = (sideMap, vertextag2sidestart, vertextag2sideend, vertex0, vertex1, polygonIndex) => {
  const startTag = getTag(vertex0);
  const endTag = getTag(vertex1);
  const newSideTag = `${startTag}/${endTag}`;
  const reverseSideTag = `${endTag}/${startTag}`;
  if (sideMap.has(reverseSideTag)) {
    // remove the opposing side from mappings
    deleteSide(sideMap, vertextag2sidestart, vertextag2sideend, vertex1, vertex0, null);
    return null
  }
  // add the side to the mappings
  const newSideObj = {
    vertex0: vertex0,
    vertex1: vertex1,
    polygonIndex
  };
  if (!(sideMap.has(newSideTag))) {
    sideMap.set(newSideTag, [newSideObj]);
  } else {
    sideMap.get(newSideTag).push(newSideObj);
  }
  if (vertextag2sidestart.has(startTag)) {
    vertextag2sidestart.get(startTag).push(newSideTag);
  } else {
    vertextag2sidestart.set(startTag, [newSideTag]);
  }
  if (vertextag2sideend.has(endTag)) {
    vertextag2sideend.get(endTag).push(newSideTag);
  } else {
    vertextag2sideend.set(endTag, [newSideTag]);
  }
  return newSideTag
};

const deleteSide = (sidemap, vertextag2sidestart, vertextag2sideend, vertex0, vertex1, polygonIndex) => {
  const startTag = getTag(vertex0);
  const endTag = getTag(vertex1);
  const sideTag = `${startTag}/${endTag}`;
  let idx = -1;
  const sideObjs = sidemap.get(sideTag);
  for (let i = 0; i < sideObjs.length; i++) {
    const sideObj = sideObjs[i];
    let sideTag = getTag(sideObj.vertex0);
    if (sideTag !== startTag) continue
    sideTag = getTag(sideObj.vertex1);
    if (sideTag !== endTag) continue
    if (polygonIndex !== null) {
      if (sideObj.polygonIndex !== polygonIndex) continue
    }
    idx = i;
    break
  }
  sideObjs.splice(idx, 1);
  if (sideObjs.length === 0) {
    sidemap.delete(sideTag);
  }

  // adjust start and end lists
  idx = vertextag2sidestart.get(startTag).indexOf(sideTag);
  vertextag2sidestart.get(startTag).splice(idx, 1);
  if (vertextag2sidestart.get(startTag).length === 0) {
    vertextag2sidestart.delete(startTag);
  }

  idx = vertextag2sideend.get(endTag).indexOf(sideTag);
  vertextag2sideend.get(endTag).splice(idx, 1);
  if (vertextag2sideend.get(endTag).length === 0) {
    vertextag2sideend.delete(endTag);
  }
};

/*
  Suppose we have two polygons ACDB and EDGF:

   A-----B
   |     |
   |     E--F
   |     |  |
   C-----D--G

  Note that vertex E forms a T-junction on the side BD. In this case some STL slicers will complain
  that the solid is not watertight. This is because the watertightness check is done by checking if
  each side DE is matched by another side ED.

  This function will return a new solid with ACDB replaced by ACDEB

  Note that this can create polygons that are slightly non-convex (due to rounding errors).
  Therefore, the result should not be used for further CSG operations!

  Note this function is meant to be used to preprocess geometries when triangulation is required, i.e. AMF, STL, etc.
  Do not use the results in other operations.
*/

/*
 * Insert missing vertices for T-junctions, which creates polygons that can be triangulated.
 * @param {Array} polygons - the original polygons which may or may not have T-junctions
 * @return original polygons (if no T-junctions found) or new polygons with updated vertices
 */
const insertTjunctions = (polygons) => {
  // STEP 1 : build a map of 'unmatched' sides from the polygons
  // i.e. side AB in one polygon does not have a matching side BA in another polygon
  const sideMap = new Map();
  for (let polygonIndex = 0; polygonIndex < polygons.length; polygonIndex++) {
    const polygon = polygons[polygonIndex];
    const numVertices = polygon.vertices.length;
    if (numVertices >= 3) {
      let vertex = polygon.vertices[0];
      let vertexTag = getTag(vertex);
      for (let vertexIndex = 0; vertexIndex < numVertices; vertexIndex++) {
        let nextVertexIndex = vertexIndex + 1;
        if (nextVertexIndex === numVertices) nextVertexIndex = 0;

        const nextVertex = polygon.vertices[nextVertexIndex];
        const nextVertexTag = getTag(nextVertex);

        const sideTag = `${vertexTag}/${nextVertexTag}`;
        const reverseSideTag = `${nextVertexTag}/${vertexTag}`;
        if (sideMap.has(reverseSideTag)) {
          // this side matches the same side in another polygon. Remove from sidemap
          // FIXME is this check necessary? there should only be ONE(1) opposing side
          // FIXME assert ?
          const ar = sideMap.get(reverseSideTag);
          ar.splice(-1, 1);
          if (ar.length === 0) {
            sideMap.delete(reverseSideTag);
          }
        } else {
          const sideobj = {
            vertex0: vertex,
            vertex1: nextVertex,
            polygonIndex
          };
          if (!(sideMap.has(sideTag))) {
            sideMap.set(sideTag, [sideobj]);
          } else {
            sideMap.get(sideTag).push(sideobj);
          }
        }
        vertex = nextVertex;
        vertexTag = nextVertexTag;
      }
    } else {
      console.warn('warning: invalid polygon found during insertTjunctions');
    }
  }

  if (sideMap.size > 0) {
    // STEP 2 : create a list of starting sides and ending sides
    const vertextag2sidestart = new Map();
    const vertextag2sideend = new Map();
    const sidesToCheck = new Map();
    for (const [sidetag, sideObjs] of sideMap) {
      sidesToCheck.set(sidetag, true);
      sideObjs.forEach((sideObj) => {
        const starttag = getTag(sideObj.vertex0);
        const endtag = getTag(sideObj.vertex1);
        if (vertextag2sidestart.has(starttag)) {
          vertextag2sidestart.get(starttag).push(sidetag);
        } else {
          vertextag2sidestart.set(starttag, [sidetag]);
        }
        if (vertextag2sideend.has(endtag)) {
          vertextag2sideend.get(endtag).push(sidetag);
        } else {
          vertextag2sideend.set(endtag, [sidetag]);
        }
      });
    }

    // STEP 3 : if sideMap is not empty
    const newPolygons = polygons.slice(0); // make a copy in order to replace polygons inline
    while (true) {
      if (sideMap.size === 0) break

      for (const sideTag of sideMap.keys()) {
        sidesToCheck.set(sideTag, true);
      }

      let doneSomething = false;
      while (true) {
        const sideTags = Array.from(sidesToCheck.keys());
        if (sideTags.length === 0) break // sidesToCheck is empty, we're done!
        const sideTagToCheck = sideTags[0];
        let doneWithSide = true;
        if (sideMap.has(sideTagToCheck)) {
          const sideObjs = sideMap.get(sideTagToCheck);
          const sideObj = sideObjs[0];
          for (let directionIndex = 0; directionIndex < 2; directionIndex++) {
            const startVertex = (directionIndex === 0) ? sideObj.vertex0 : sideObj.vertex1;
            const endVertex = (directionIndex === 0) ? sideObj.vertex1 : sideObj.vertex0;
            const startVertexTag = getTag(startVertex);
            const endVertexTag = getTag(endVertex);
            let matchingSides = [];
            if (directionIndex === 0) {
              if (vertextag2sideend.has(startVertexTag)) {
                matchingSides = vertextag2sideend.get(startVertexTag);
              }
            } else {
              if (vertextag2sidestart.has(startVertexTag)) {
                matchingSides = vertextag2sidestart.get(startVertexTag);
              }
            }
            for (let matchingSideIndex = 0; matchingSideIndex < matchingSides.length; matchingSideIndex++) {
              const matchingSideTag = matchingSides[matchingSideIndex];
              const matchingSide = sideMap.get(matchingSideTag)[0];
              const matchingSideStartVertex = (directionIndex === 0) ? matchingSide.vertex0 : matchingSide.vertex1;
              (directionIndex === 0) ? matchingSide.vertex1 : matchingSide.vertex0;
              const matchingSideStartVertexTag = getTag(matchingSideStartVertex);
              if (matchingSideStartVertexTag === endVertexTag) {
                // matchingSide cancels sideTagToCheck
                deleteSide(sideMap, vertextag2sidestart, vertextag2sideend, startVertex, endVertex, null);
                deleteSide(sideMap, vertextag2sidestart, vertextag2sideend, endVertex, startVertex, null);
                doneWithSide = false;
                directionIndex = 2; // skip reverse direction check
                doneSomething = true;
                break
              } else {
                const startPos = startVertex;
                const endPos = endVertex;
                const checkPos = matchingSideStartVertex;
                const direction = subtract$3(create$b(), checkPos, startPos);
                // Now we need to check if endPos is on the line startPos-checkPos:
                const t = dot$2(subtract$3(create$b(), endPos, startPos), direction) / dot$2(direction, direction);
                if ((t > 0) && (t < 1)) {
                  const closestVertex = scale$3(create$b(), direction, t);
                  add$1(closestVertex, closestVertex, startPos);
                  const distanceSquared = squaredDistance$1(closestVertex, endPos);
                  if (distanceSquared < (EPS * EPS)) {
                    // Yes it's a t-junction! We need to split matchingSide in two:
                    const polygonIndex = matchingSide.polygonIndex;
                    const polygon = newPolygons[polygonIndex];
                    // find the index of startVertexTag in polygon:
                    const insertionVertexTag = getTag(matchingSide.vertex1);
                    let insertionVertexTagIndex = -1;
                    for (let i = 0; i < polygon.vertices.length; i++) {
                      if (getTag(polygon.vertices[i]) === insertionVertexTag) {
                        insertionVertexTagIndex = i;
                        break
                      }
                    }
                    // split the side by inserting the vertex:
                    const newVertices = polygon.vertices.slice(0);
                    newVertices.splice(insertionVertexTagIndex, 0, endVertex);
                    const newPolygon = create$7(newVertices);

                    newPolygons[polygonIndex] = newPolygon;

                    // remove the original sides from our maps
                    deleteSide(sideMap, vertextag2sidestart, vertextag2sideend, matchingSide.vertex0, matchingSide.vertex1, polygonIndex);
                    const newSideTag1 = addSide(sideMap, vertextag2sidestart, vertextag2sideend, matchingSide.vertex0, endVertex, polygonIndex);
                    const newSideTag2 = addSide(sideMap, vertextag2sidestart, vertextag2sideend, endVertex, matchingSide.vertex1, polygonIndex);
                    if (newSideTag1 !== null) sidesToCheck.set(newSideTag1, true);
                    if (newSideTag2 !== null) sidesToCheck.set(newSideTag2, true);
                    doneWithSide = false;
                    directionIndex = 2; // skip reverse direction check
                    doneSomething = true;
                    break
                  } // if(distanceSquared < 1e-10)
                } // if( (t > 0) && (t < 1) )
              } // if(endingSideStartVertexTag === endVertexTag)
            } // for matchingSideIndex
          } // for directionIndex
        } // if(sideTagToCheck in sideMap)
        if (doneWithSide) {
          sidesToCheck.delete(sideTagToCheck);
        }
      }
      if (!doneSomething) break
    }
    polygons = newPolygons;
  }
  sideMap.clear();

  return polygons
};

const triangulatePolygon = (epsilon, polygon, triangles) => {
  const nv = polygon.vertices.length;
  if (nv > 3) {
    if (nv > 4) {
      // split the polygon using a midpoint
      const midpoint = [0, 0, 0];
      polygon.vertices.forEach((vertex) => add$1(midpoint, midpoint, vertex));
      snap$2(midpoint, divide$1(midpoint, midpoint, [nv, nv, nv]), epsilon);
      for (let i = 0; i < nv; i++) {
        const poly = create$7([midpoint, polygon.vertices[i], polygon.vertices[(i + 1) % nv]]);
        if (polygon.color) poly.color = polygon.color;
        triangles.push(poly);
      }
      return
    }
    // exactly 4 vertices, use simple triangulation
    const poly0 = create$7([polygon.vertices[0], polygon.vertices[1], polygon.vertices[2]]);
    const poly1 = create$7([polygon.vertices[0], polygon.vertices[2], polygon.vertices[3]]);
    if (polygon.color) {
      poly0.color = polygon.color;
      poly1.color = polygon.color;
    }
    triangles.push(poly0, poly1);
    return
  }
  // exactly 3 vertices, so return the original
  triangles.push(polygon);
};

/*
 * Convert the given polygons into a list of triangles (polygons with 3 vertices).
 * NOTE: this is possible because poly3 is CONVEX by definition
 */
const triangulatePolygons = (epsilon, polygons) => {
  const triangles = [];
  polygons.forEach((polygon) => {
    triangulatePolygon(epsilon, polygon, triangles);
  });
  return triangles
};

/*
 */
const generalizePath2 = (options, geometry) => geometry;

/*
 */
const generalizeGeom2 = (options, geometry) => geometry;

/*
 */
const generalizeGeom3 = (options, geometry) => {
  const defaults = {
    snap: false,
    simplify: false,
    triangulate: false
  };
  const { snap, simplify, triangulate } = Object.assign({}, defaults, options);

  const epsilon = measureEpsilon(geometry);
  let polygons = toPolygons$1(geometry);

  // snap the given geometry if requested
  if (snap) {
    polygons = snapPolygons(epsilon, polygons);
  }

  // simplify the polygons if requested
  if (simplify) {
    // TODO implement some mesh decimations
    polygons = mergePolygons(epsilon, polygons);
  }

  // triangulate the polygons if requested
  if (triangulate) {
    polygons = insertTjunctions(polygons);
    polygons = triangulatePolygons(epsilon, polygons);
  }

  // FIXME replace with geom3.cloneShallow() when available
  const clone = Object.assign({}, geometry);
  clone.polygons = polygons;

  return clone
};

/**
 * Apply various modifications in proper order to produce a generalized geometry.
 * @param {Object} options - options for modifications
 * @param {Boolean} [options.snap=false] the geometries should be snapped to epsilons
 * @param {Boolean} [options.simplify=false] the geometries should be simplified
 * @param {Boolean} [options.triangulate=false] the geometries should be triangulated
 * @param {...Object} geometries - the geometries to generalize
 * @return {Object|Array} the modified geometry, or a list of modified geometries
 * @alias module:modeling/modifiers.generalize
 */
const generalize = (options, ...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (isA$2(geometry)) return generalizePath2(options, geometry)
    if (isA$5(geometry)) return generalizeGeom2(options, geometry)
    if (isA$3(geometry)) return generalizeGeom3(options, geometry)
    throw new Error('invalid geometry')
  });
  return results.length === 1 ? results[0] : results
};

const snapPath2 = (geometry) => {
  const epsilon = measureEpsilon(geometry);
  const points = toPoints$1(geometry);
  const newPoints = points.map((point) => snap$1(create$9(), point, epsilon));
  // snap can produce duplicate points, remove those
  return create$5(newPoints)
};

const snapGeom2 = (geometry) => {
  const epsilon = measureEpsilon(geometry);
  const outlines = toOutlines(geometry);
  let newOutlines = outlines.map((outline) => {
    let prev = snap$1(create$9(), outline[outline.length - 1], epsilon);
    const newOutline = [];
    outline.forEach((point) => {
      const snapped = snap$1(create$9(), point, epsilon);
      // remove duplicate points
      if (!equals$6(prev, snapped)) {
        newOutline.push(snapped);
      }
      prev = snapped;
    });
    return newOutline
  });
  // remove zero-area outlines
  newOutlines = newOutlines.filter((outline) => measureArea$1(create$3(outline)));
  return create$a(newOutlines)
};

const snapGeom3 = (geometry) => {
  const epsilon = measureEpsilon(geometry);
  const polygons = toPolygons$1(geometry);
  const newPolygons = snapPolygons(epsilon, polygons);
  return create$8(newPolygons)
};

/**
 * Snap the given geometries to the overall precision (epsilon) of the geometry.
 * @see measurements.measureEpsilon()
 * @param {...Object} geometries - the geometries to snap
 * @return {Object|Array} the snapped geometry, or a list of snapped geometries
 * @alias module:modeling/modifiers.snap
 */
const snap = (...geometries) => {
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (isA$2(geometry)) return snapPath2(geometry)
    if (isA$5(geometry)) return snapGeom2(geometry)
    if (isA$3(geometry)) return snapGeom3(geometry)
    return geometry
  });
  return results.length === 1 ? results[0] : results
};

/**
 * All shapes (primitives or the results of operations) can be modified to correct issues, etc.
 * In all cases, these functions returns the results, and never changes the original geometry.
 * @module modeling/modifiers
 * @example
 * import { generalize, snap } from '@jscad/modeling/modifiers'
 */

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  generalize: generalize,
  snap: snap
});

const validateOptions = (options) => {
  if (!Array.isArray(options.modes) || options.modes.length > 3) throw new Error('align(): modes must be an array of length <= 3')
  options.modes = padArrayToLength(options.modes, 'none', 3);
  if (options.modes.filter((mode) => ['center', 'max', 'min', 'none'].includes(mode)).length !== 3) throw new Error('align(): all modes must be one of "center", "max" or "min"')

  if (!Array.isArray(options.relativeTo) || options.relativeTo.length > 3) throw new Error('align(): relativeTo must be an array of length <= 3')
  options.relativeTo = padArrayToLength(options.relativeTo, 0, 3);
  if (options.relativeTo.filter((alignVal) => (Number.isFinite(alignVal) || alignVal == null)).length !== 3) throw new Error('align(): all relativeTo values must be a number, or null.')

  if (typeof options.grouped !== 'boolean') throw new Error('align(): grouped must be a boolean value.')

  return options
};

const populateRelativeToFromBounds = (relativeTo, modes, bounds) => {
  for (let i = 0; i < 3; i++) {
    if (relativeTo[i] == null) {
      if (modes[i] === 'center') {
        relativeTo[i] = (bounds[0][i] + bounds[1][i]) / 2;
      } else if (modes[i] === 'max') {
        relativeTo[i] = bounds[1][i];
      } else if (modes[i] === 'min') {
        relativeTo[i] = bounds[0][i];
      }
    }
  }
  return relativeTo
};

const alignGeometries = (geometry, modes, relativeTo) => {
  const bounds = measureAggregateBoundingBox(geometry);
  const translation = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    if (modes[i] === 'center') {
      translation[i] = relativeTo[i] - (bounds[0][i] + bounds[1][i]) / 2;
    } else if (modes[i] === 'max') {
      translation[i] = relativeTo[i] - bounds[1][i];
    } else if (modes[i] === 'min') {
      translation[i] = relativeTo[i] - bounds[0][i];
    }
  }

  return translate(translation, geometry)
};

/**
 * Align the boundaries of the given geometries using the given options.
 * @param {Object} options - options for aligning
 * @param {Array} [options.modes = ['center', 'center', 'min']] - the point on the geometries to align to for each axis. Valid options are "center", "max", "min", and "none".
 * @param {Array} [options.relativeTo = [0,0,0]] - The point one each axis on which to align the geometries upon.  If the value is null, then the corresponding value from the group's bounding box is used.
 * @param {Boolean} [options.grouped = false] - if true, transform all geometries by the same amount, maintaining the relative positions to each other.
 * @param {...Object} geometries - the geometries to align
 * @return {Object|Array} the aligned geometry, or a list of aligned geometries
 * @alias module:modeling/transforms.align
 *
 * @example
 * let alignedGeometries = align({modes: ['min', 'center', 'none'], relativeTo: [10, null, 10], grouped: true }, geometries)
 */
const align = (options, ...geometries) => {
  const defaults = {
    modes: ['center', 'center', 'min'],
    relativeTo: [0, 0, 0],
    grouped: false
  };
  options = Object.assign({}, defaults, options);

  options = validateOptions(options);
  let { modes, relativeTo, grouped } = options;
  geometries = flatten(geometries);
  if (geometries.length === 0) throw new Error('align(): No geometries were provided to act upon')

  if (relativeTo.filter((val) => val == null).length) {
    const bounds = measureAggregateBoundingBox(geometries);
    relativeTo = populateRelativeToFromBounds(relativeTo, modes, bounds);
  }
  if (grouped) {
    geometries = alignGeometries(geometries, modes, relativeTo);
  } else {
    geometries = geometries.map((geometry) => alignGeometries(geometry, modes, relativeTo));
  }
  return geometries.length === 1 ? geometries[0] : geometries
};

const centerGeometry = (options, object) => {
  const defaults = {
    axes: [true, true, true],
    relativeTo: [0, 0, 0]
  };
  const { axes, relativeTo } = Object.assign({}, defaults, options);

  const bounds = measureBoundingBox(object);
  const offset = [0, 0, 0];
  if (axes[0]) offset[0] = relativeTo[0] - (bounds[0][0] + ((bounds[1][0] - bounds[0][0]) / 2));
  if (axes[1]) offset[1] = relativeTo[1] - (bounds[0][1] + ((bounds[1][1] - bounds[0][1]) / 2));
  if (axes[2]) offset[2] = relativeTo[2] - (bounds[0][2] + ((bounds[1][2] - bounds[0][2]) / 2));
  return translate(offset, object)
};

/**
 * Center the given objects using the given options.
 * @param {Object} options - options for centering
 * @param {Array} [options.axes=[true,true,true]] - axis of which to center, true or false
 * @param {Array} [options.relativeTo=[0,0,0]] - relative point of which to center the objects
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.center
 *
 * @example
 * let myshape = center({axes: [true,false,false]}, sphere()) // center about the X axis
 */
const center = (options, ...objects) => {
  const defaults = {
    axes: [true, true, true],
    relativeTo: [0, 0, 0]
  // TODO: Add additional 'methods' of centering: midpoint, centroid
  };
  const { axes, relativeTo } = Object.assign({}, defaults, options);

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')
  if (relativeTo.length !== 3) throw new Error('relativeTo must be an array of length 3')

  options = { axes, relativeTo };

  const results = objects.map((object) => {
    if (isA$2(object)) return centerGeometry(options, object)
    if (isA$5(object)) return centerGeometry(options, object)
    if (isA$3(object)) return centerGeometry(options, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Center the given objects about the X axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerX
 */
const centerX = (...objects) => center({ axes: [true, false, false] }, objects);

/**
 * Center the given objects about the Y axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerY
 */
const centerY = (...objects) => center({ axes: [false, true, false] }, objects);

/**
 * Center the given objects about the Z axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerZ
 */
const centerZ = (...objects) => center({ axes: [false, false, true] }, objects);

/**
 * Scale the given objects using the given options.
 * @param {Array} factors - X, Y, Z factors by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scale
 *
 * @example
 * let myshape = scale([5, 0, 10], sphere())
 */
const scale = (factors, ...objects) => {
  if (!Array.isArray(factors)) throw new Error('factors must be an array')

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  // adjust the factors if necessary
  factors = factors.slice(); // don't modify the original
  while (factors.length < 3) factors.push(1);

  if (factors[0] <= 0 || factors[1] <= 0 || factors[2] <= 0) throw new Error('factors must be positive')

  const matrix = fromScaling(create$c(), factors);

  const results = objects.map((object) => {
    if (isA$2(object)) return transform$5(matrix, object)
    if (isA$5(object)) return transform$a(matrix, object)
    if (isA$3(object)) return transform$6(matrix, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/**
 * Scale the given objects about the X axis using the given options.
 * @param {Number} factor - X factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleX
 */
const scaleX = (factor, ...objects) => scale([factor, 1, 1], objects);

/**
 * Scale the given objects about the Y axis using the given options.
 * @param {Number} factor - Y factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleY
 */
const scaleY = (factor, ...objects) => scale([1, factor, 1], objects);

/**
 * Scale the given objects about the Z axis using the given options.
 * @param {Number} factor - Z factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleZ
 */
const scaleZ = (factor, ...objects) => scale([1, 1, factor], objects);

/**
 * Transform the given objects using the given matrix.
 * @param {mat4} matrix - a transformation matrix
 * @param {...Object} objects - the objects to transform
 * @return {Object|Array} the transformed object, or a list of transformed objects
 * @alias module:modeling/transforms.transform
 *
 * @example
 * const newSphere = transform(mat4.rotateX(TAU / 8), sphere())
 */
const transform = (matrix, ...objects) => {
  // TODO how to check that the matrix is REAL?

  objects = flatten(objects);
  if (objects.length === 0) throw new Error('wrong number of arguments')

  const results = objects.map((object) => {
    if (isA$2(object)) return transform$5(matrix, object)
    if (isA$5(object)) return transform$a(matrix, object)
    if (isA$3(object)) return transform$6(matrix, object)
    return object
  });
  return results.length === 1 ? results[0] : results
};

/**
 * All shapes (primitives or the results of operations) can be transformed, such as scaled or rotated.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/transforms
 * @example
 * import { center, rotateX, translate } from '@jscad/modeling/transforms'
 */

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  align: align,
  center: center,
  centerX: centerX,
  centerY: centerY,
  centerZ: centerZ,
  mirror: mirror,
  mirrorX: mirrorX,
  mirrorY: mirrorY,
  mirrorZ: mirrorZ,
  rotate: rotate,
  rotateX: rotateX,
  rotateY: rotateY,
  rotateZ: rotateZ,
  scale: scale,
  scaleX: scaleX,
  scaleY: scaleY,
  scaleZ: scaleZ,
  translate: translate,
  translateX: translateX,
  translateY: translateY,
  translateZ: translateZ,
  transform: transform
});

export { index$5 as booleans, index$j as colors, index$h as curves, index$4 as expansions, index$3 as extrusions, index$d as geometries, index$2 as hulls, index$a as maths, index$9 as measurements, index$1 as modifiers, index$8 as primitives, index$7 as text, index as transforms, index$6 as utils };
