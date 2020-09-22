(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.reglRenderer = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * converts input data to array if it is not already an array
 * @param {Array} array
 */
const toArray = (array) => {
  if (Array.isArray(array)) return array
  if (array === undefined || array === null) return []
  return [array]
}

/**
 * returns the first item of an array, or undefined if the array is empty or undefined
 * @param {Array} array
 */
const head = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined
  }
  return array[0]
}

/**
 * flatten the given argument into a single flat array
 * the argument can be composed of multiple depths of values and arrays
 * @param {Array} array
 */
const flatten = (array) => array.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), [])

/**
 * helper function to retrieve the nth element of an array
 * if the array is undefined or empty, returns undefined, otherwise returns the item at the given index
 * @param {Integer} index
 * @param {Array} array
 */
const nth = (index, array) => {
  if (!Array.isArray(array) || array.length < index) {
    return undefined
  }
  return array[index]
}

module.exports = { toArray, head, flatten, nth }

},{}],2:[function(require,module,exports){
var transform = require('./lib/projectMat4')

module.exports = unproject

/**
 * Unproject a point from screen space to 3D space.
 * The point should have its x and y properties set to
 * 2D screen space, and the z either at 0 (near plane)
 * or 1 (far plane). The provided matrix is assumed to already
 * be combined, i.e. projection * view.
 *
 * After this operation, the out vector's [x, y, z] components will
 * represent the unprojected 3D coordinate.
 *
 * @param  {vec3} out               the output vector
 * @param  {vec3} vec               the 2D space vector to unproject
 * @param  {vec4} viewport          screen x, y, width and height in pixels
 * @param  {mat4} invProjectionView combined projection and view matrix
 * @return {vec3}                   the output vector
 */
function unproject (out, vec, viewport, invProjectionView) {
  var viewX = viewport[0],
    viewY = viewport[1],
    viewWidth = viewport[2],
    viewHeight = viewport[3]

  var x = vec[0],
    y = vec[1],
    z = vec[2]

  x = x - viewX
  y = viewHeight - y - 1
  y = y - viewY

  out[0] = (2 * x) / viewWidth - 1
  out[1] = (2 * y) / viewHeight - 1
  out[2] = 2 * z - 1
  return transform(out, out, invProjectionView)
}

},{"./lib/projectMat4":3}],3:[function(require,module,exports){
module.exports = project

/**
 * Multiplies the input vec by the specified matrix, 
 * applying a W divide, and stores the result in out 
 * vector. This is useful for projection,
 * e.g. unprojecting a 2D point into 3D space.
 *
 * @method  prj
 * @param {vec3} out the output vector
 * @param {vec3} vec the input vector to project
 * @param {mat4} m the 4x4 matrix to multiply with 
 * @return {vec3} the out vector
 */
function project (out, vec, m) {
  var x = vec[0],
    y = vec[1],
    z = vec[2],
    a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3],
    a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7],
    a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11],
    a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15]

  var lw = 1 / (x * a03 + y * a13 + z * a23 + a33)

  out[0] = (x * a00 + y * a10 + z * a20 + a30) * lw
  out[1] = (x * a01 + y * a11 + z * a21 + a31) * lw
  out[2] = (x * a02 + y * a12 + z * a22 + a32) * lw
  return out
}

},{}],4:[function(require,module,exports){
module.exports = adjoint;

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};
},{}],5:[function(require,module,exports){
module.exports = clone;

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],6:[function(require,module,exports){
module.exports = copy;

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],7:[function(require,module,exports){
module.exports = create;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
    var out = new Float32Array(16);
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
    return out;
};
},{}],8:[function(require,module,exports){
module.exports = determinant;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};
},{}],9:[function(require,module,exports){
module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};
},{}],10:[function(require,module,exports){
module.exports = fromRotation

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotate(dest, dest, rad, axis)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function fromRotation(out, rad, axis) {
  var s, c, t
  var x = axis[0]
  var y = axis[1]
  var z = axis[2]
  var len = Math.sqrt(x * x + y * y + z * z)

  if (Math.abs(len) < 0.000001) {
    return null
  }

  len = 1 / len
  x *= len
  y *= len
  z *= len

  s = Math.sin(rad)
  c = Math.cos(rad)
  t = 1 - c

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c
  out[1] = y * x * t + z * s
  out[2] = z * x * t - y * s
  out[3] = 0
  out[4] = x * y * t - z * s
  out[5] = y * y * t + c
  out[6] = z * y * t + x * s
  out[7] = 0
  out[8] = x * z * t + y * s
  out[9] = y * z * t - x * s
  out[10] = z * z * t + c
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

},{}],11:[function(require,module,exports){
module.exports = fromRotationTranslation;

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};
},{}],12:[function(require,module,exports){
module.exports = fromScaling

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.scale(dest, dest, vec)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
function fromScaling(out, v) {
  out[0] = v[0]
  out[1] = 0
  out[2] = 0
  out[3] = 0
  out[4] = 0
  out[5] = v[1]
  out[6] = 0
  out[7] = 0
  out[8] = 0
  out[9] = 0
  out[10] = v[2]
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

},{}],13:[function(require,module,exports){
module.exports = fromTranslation

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.translate(dest, dest, vec)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromTranslation(out, v) {
  out[0] = 1
  out[1] = 0
  out[2] = 0
  out[3] = 0
  out[4] = 0
  out[5] = 1
  out[6] = 0
  out[7] = 0
  out[8] = 0
  out[9] = 0
  out[10] = 1
  out[11] = 0
  out[12] = v[0]
  out[13] = v[1]
  out[14] = v[2]
  out[15] = 1
  return out
}

},{}],14:[function(require,module,exports){
module.exports = fromXRotation

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateX(dest, dest, rad)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromXRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    out[0] = 1
    out[1] = 0
    out[2] = 0
    out[3] = 0
    out[4] = 0
    out[5] = c
    out[6] = s
    out[7] = 0
    out[8] = 0
    out[9] = -s
    out[10] = c
    out[11] = 0
    out[12] = 0
    out[13] = 0
    out[14] = 0
    out[15] = 1
    return out
}
},{}],15:[function(require,module,exports){
module.exports = fromYRotation

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateY(dest, dest, rad)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromYRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    out[0] = c
    out[1] = 0
    out[2] = -s
    out[3] = 0
    out[4] = 0
    out[5] = 1
    out[6] = 0
    out[7] = 0
    out[8] = s
    out[9] = 0
    out[10] = c
    out[11] = 0
    out[12] = 0
    out[13] = 0
    out[14] = 0
    out[15] = 1
    return out
}
},{}],16:[function(require,module,exports){
module.exports = fromZRotation

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateZ(dest, dest, rad)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromZRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad)

    // Perform axis-specific matrix multiplication
    out[0] = c
    out[1] = s
    out[2] = 0
    out[3] = 0
    out[4] = -s
    out[5] = c
    out[6] = 0
    out[7] = 0
    out[8] = 0
    out[9] = 0
    out[10] = 1
    out[11] = 0
    out[12] = 0
    out[13] = 0
    out[14] = 0
    out[15] = 1
    return out
}
},{}],17:[function(require,module,exports){
module.exports = frustum;

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};
},{}],18:[function(require,module,exports){
module.exports = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
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
    return out;
};
},{}],19:[function(require,module,exports){
module.exports = {
  create: require('./create')
  , clone: require('./clone')
  , copy: require('./copy')
  , identity: require('./identity')
  , transpose: require('./transpose')
  , invert: require('./invert')
  , adjoint: require('./adjoint')
  , determinant: require('./determinant')
  , multiply: require('./multiply')
  , translate: require('./translate')
  , scale: require('./scale')
  , rotate: require('./rotate')
  , rotateX: require('./rotateX')
  , rotateY: require('./rotateY')
  , rotateZ: require('./rotateZ')
  , fromRotation: require('./fromRotation')
  , fromRotationTranslation: require('./fromRotationTranslation')
  , fromScaling: require('./fromScaling')
  , fromTranslation: require('./fromTranslation')
  , fromXRotation: require('./fromXRotation')
  , fromYRotation: require('./fromYRotation')
  , fromZRotation: require('./fromZRotation')
  , fromQuat: require('./fromQuat')
  , frustum: require('./frustum')
  , perspective: require('./perspective')
  , perspectiveFromFieldOfView: require('./perspectiveFromFieldOfView')
  , ortho: require('./ortho')
  , lookAt: require('./lookAt')
  , str: require('./str')
}

},{"./adjoint":4,"./clone":5,"./copy":6,"./create":7,"./determinant":8,"./fromQuat":9,"./fromRotation":10,"./fromRotationTranslation":11,"./fromScaling":12,"./fromTranslation":13,"./fromXRotation":14,"./fromYRotation":15,"./fromZRotation":16,"./frustum":17,"./identity":18,"./invert":20,"./lookAt":21,"./multiply":22,"./ortho":23,"./perspective":24,"./perspectiveFromFieldOfView":25,"./rotate":26,"./rotateX":27,"./rotateY":28,"./rotateZ":29,"./scale":30,"./str":31,"./translate":32,"./transpose":33}],20:[function(require,module,exports){
module.exports = invert;

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
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

    return out;
};
},{}],21:[function(require,module,exports){
var identity = require('./identity');

module.exports = lookAt;

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < 0.000001 &&
        Math.abs(eyey - centery) < 0.000001 &&
        Math.abs(eyez - centerz) < 0.000001) {
        return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};
},{"./identity":18}],22:[function(require,module,exports){
module.exports = multiply;

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};
},{}],23:[function(require,module,exports){
module.exports = ortho;

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};
},{}],24:[function(require,module,exports){
module.exports = perspective;

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};
},{}],25:[function(require,module,exports){
module.exports = perspectiveFromFieldOfView;

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}


},{}],26:[function(require,module,exports){
module.exports = rotate;

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < 0.000001) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

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

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};
},{}],27:[function(require,module,exports){
module.exports = rotateX;

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
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
    return out;
};
},{}],28:[function(require,module,exports){
module.exports = rotateY;

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
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
    return out;
};
},{}],29:[function(require,module,exports){
module.exports = rotateZ;

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
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
    return out;
};
},{}],30:[function(require,module,exports){
module.exports = scale;

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],31:[function(require,module,exports){
module.exports = str;

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};
},{}],32:[function(require,module,exports){
module.exports = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};
},{}],33:[function(require,module,exports){
module.exports = transpose;

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};
},{}],34:[function(require,module,exports){
module.exports = add;

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0]
    out[1] = a[1] + b[1]
    out[2] = a[2] + b[2]
    return out
}
},{}],35:[function(require,module,exports){
module.exports = angle

var fromValues = require('./fromValues')
var normalize = require('./normalize')
var dot = require('./dot')

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
    var tempA = fromValues(a[0], a[1], a[2])
    var tempB = fromValues(b[0], b[1], b[2])
 
    normalize(tempA, tempA)
    normalize(tempB, tempB)
 
    var cosine = dot(tempA, tempB)

    if(cosine > 1.0){
        return 0
    } else {
        return Math.acos(cosine)
    }     
}

},{"./dot":45,"./fromValues":51,"./normalize":62}],36:[function(require,module,exports){
module.exports = ceil

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0])
  out[1] = Math.ceil(a[1])
  out[2] = Math.ceil(a[2])
  return out
}

},{}],37:[function(require,module,exports){
module.exports = clone;

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
    var out = new Float32Array(3)
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}
},{}],38:[function(require,module,exports){
module.exports = copy;

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}
},{}],39:[function(require,module,exports){
module.exports = create;

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
    var out = new Float32Array(3)
    out[0] = 0
    out[1] = 0
    out[2] = 0
    return out
}
},{}],40:[function(require,module,exports){
module.exports = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    out[0] = ay * bz - az * by
    out[1] = az * bx - ax * bz
    out[2] = ax * by - ay * bx
    return out
}
},{}],41:[function(require,module,exports){
module.exports = require('./distance')

},{"./distance":42}],42:[function(require,module,exports){
module.exports = distance;

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2]
    return Math.sqrt(x*x + y*y + z*z)
}
},{}],43:[function(require,module,exports){
module.exports = require('./divide')

},{"./divide":44}],44:[function(require,module,exports){
module.exports = divide;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
    out[0] = a[0] / b[0]
    out[1] = a[1] / b[1]
    out[2] = a[2] / b[2]
    return out
}
},{}],45:[function(require,module,exports){
module.exports = dot;

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
},{}],46:[function(require,module,exports){
module.exports = 0.000001

},{}],47:[function(require,module,exports){
module.exports = equals

var EPSILON = require('./epsilon')

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  var a0 = a[0]
  var a1 = a[1]
  var a2 = a[2]
  var b0 = b[0]
  var b1 = b[1]
  var b2 = b[2]
  return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)))
}

},{"./epsilon":46}],48:[function(require,module,exports){
module.exports = exactEquals

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
}

},{}],49:[function(require,module,exports){
module.exports = floor

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0])
  out[1] = Math.floor(a[1])
  out[2] = Math.floor(a[2])
  return out
}

},{}],50:[function(require,module,exports){
module.exports = forEach;

var vec = require('./create')()

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
function forEach(a, stride, offset, count, fn, arg) {
        var i, l
        if(!stride) {
            stride = 3
        }

        if(!offset) {
            offset = 0
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length)
        } else {
            l = a.length
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i] 
            vec[1] = a[i+1] 
            vec[2] = a[i+2]
            fn(vec, vec, arg)
            a[i] = vec[0] 
            a[i+1] = vec[1] 
            a[i+2] = vec[2]
        }
        
        return a
}
},{"./create":39}],51:[function(require,module,exports){
module.exports = fromValues;

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
    var out = new Float32Array(3)
    out[0] = x
    out[1] = y
    out[2] = z
    return out
}
},{}],52:[function(require,module,exports){
module.exports = {
  EPSILON: require('./epsilon')
  , create: require('./create')
  , clone: require('./clone')
  , angle: require('./angle')
  , fromValues: require('./fromValues')
  , copy: require('./copy')
  , set: require('./set')
  , equals: require('./equals')
  , exactEquals: require('./exactEquals')
  , add: require('./add')
  , subtract: require('./subtract')
  , sub: require('./sub')
  , multiply: require('./multiply')
  , mul: require('./mul')
  , divide: require('./divide')
  , div: require('./div')
  , min: require('./min')
  , max: require('./max')
  , floor: require('./floor')
  , ceil: require('./ceil')
  , round: require('./round')
  , scale: require('./scale')
  , scaleAndAdd: require('./scaleAndAdd')
  , distance: require('./distance')
  , dist: require('./dist')
  , squaredDistance: require('./squaredDistance')
  , sqrDist: require('./sqrDist')
  , length: require('./length')
  , len: require('./len')
  , squaredLength: require('./squaredLength')
  , sqrLen: require('./sqrLen')
  , negate: require('./negate')
  , inverse: require('./inverse')
  , normalize: require('./normalize')
  , dot: require('./dot')
  , cross: require('./cross')
  , lerp: require('./lerp')
  , random: require('./random')
  , transformMat4: require('./transformMat4')
  , transformMat3: require('./transformMat3')
  , transformQuat: require('./transformQuat')
  , rotateX: require('./rotateX')
  , rotateY: require('./rotateY')
  , rotateZ: require('./rotateZ')
  , forEach: require('./forEach')
}

},{"./add":34,"./angle":35,"./ceil":36,"./clone":37,"./copy":38,"./create":39,"./cross":40,"./dist":41,"./distance":42,"./div":43,"./divide":44,"./dot":45,"./epsilon":46,"./equals":47,"./exactEquals":48,"./floor":49,"./forEach":50,"./fromValues":51,"./inverse":53,"./len":54,"./length":55,"./lerp":56,"./max":57,"./min":58,"./mul":59,"./multiply":60,"./negate":61,"./normalize":62,"./random":63,"./rotateX":64,"./rotateY":65,"./rotateZ":66,"./round":67,"./scale":68,"./scaleAndAdd":69,"./set":70,"./sqrDist":71,"./sqrLen":72,"./squaredDistance":73,"./squaredLength":74,"./sub":75,"./subtract":76,"./transformMat3":77,"./transformMat4":78,"./transformQuat":79}],53:[function(require,module,exports){
module.exports = inverse;

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0]
  out[1] = 1.0 / a[1]
  out[2] = 1.0 / a[2]
  return out
}
},{}],54:[function(require,module,exports){
module.exports = require('./length')

},{"./length":55}],55:[function(require,module,exports){
module.exports = length;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return Math.sqrt(x*x + y*y + z*z)
}
},{}],56:[function(require,module,exports){
module.exports = lerp;

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2]
    out[0] = ax + t * (b[0] - ax)
    out[1] = ay + t * (b[1] - ay)
    out[2] = az + t * (b[2] - az)
    return out
}
},{}],57:[function(require,module,exports){
module.exports = max;

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
    out[0] = Math.max(a[0], b[0])
    out[1] = Math.max(a[1], b[1])
    out[2] = Math.max(a[2], b[2])
    return out
}
},{}],58:[function(require,module,exports){
module.exports = min;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
    out[0] = Math.min(a[0], b[0])
    out[1] = Math.min(a[1], b[1])
    out[2] = Math.min(a[2], b[2])
    return out
}
},{}],59:[function(require,module,exports){
module.exports = require('./multiply')

},{"./multiply":60}],60:[function(require,module,exports){
module.exports = multiply;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
    out[0] = a[0] * b[0]
    out[1] = a[1] * b[1]
    out[2] = a[2] * b[2]
    return out
}
},{}],61:[function(require,module,exports){
module.exports = negate;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
    out[0] = -a[0]
    out[1] = -a[1]
    out[2] = -a[2]
    return out
}
},{}],62:[function(require,module,exports){
module.exports = normalize;

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    var len = x*x + y*y + z*z
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len)
        out[0] = a[0] * len
        out[1] = a[1] * len
        out[2] = a[2] * len
    }
    return out
}
},{}],63:[function(require,module,exports){
module.exports = random;

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
    scale = scale || 1.0

    var r = Math.random() * 2.0 * Math.PI
    var z = (Math.random() * 2.0) - 1.0
    var zScale = Math.sqrt(1.0-z*z) * scale

    out[0] = Math.cos(r) * zScale
    out[1] = Math.sin(r) * zScale
    out[2] = z * scale
    return out
}
},{}],64:[function(require,module,exports){
module.exports = rotateX;

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c){
    var by = b[1]
    var bz = b[2]

    // Translate point to the origin
    var py = a[1] - by
    var pz = a[2] - bz

    var sc = Math.sin(c)
    var cc = Math.cos(c)

    // perform rotation and translate to correct position
    out[0] = a[0]
    out[1] = by + py * cc - pz * sc
    out[2] = bz + py * sc + pz * cc

    return out
}

},{}],65:[function(require,module,exports){
module.exports = rotateY;

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c){
    var bx = b[0]
    var bz = b[2]

    // translate point to the origin
    var px = a[0] - bx
    var pz = a[2] - bz
    
    var sc = Math.sin(c)
    var cc = Math.cos(c)
  
    // perform rotation and translate to correct position
    out[0] = bx + pz * sc + px * cc
    out[1] = a[1]
    out[2] = bz + pz * cc - px * sc
  
    return out
}

},{}],66:[function(require,module,exports){
module.exports = rotateZ;

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c){
    var bx = b[0]
    var by = b[1]

    //Translate point to the origin
    var px = a[0] - bx
    var py = a[1] - by
  
    var sc = Math.sin(c)
    var cc = Math.cos(c)

    // perform rotation and translate to correct position
    out[0] = bx + px * cc - py * sc
    out[1] = by + px * sc + py * cc
    out[2] = a[2]
  
    return out
}

},{}],67:[function(require,module,exports){
module.exports = round

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
function round(out, a) {
  out[0] = Math.round(a[0])
  out[1] = Math.round(a[1])
  out[2] = Math.round(a[2])
  return out
}

},{}],68:[function(require,module,exports){
module.exports = scale;

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b
    out[1] = a[1] * b
    out[2] = a[2] * b
    return out
}
},{}],69:[function(require,module,exports){
module.exports = scaleAndAdd;

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale)
    out[1] = a[1] + (b[1] * scale)
    out[2] = a[2] + (b[2] * scale)
    return out
}
},{}],70:[function(require,module,exports){
module.exports = set;

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
    out[0] = x
    out[1] = y
    out[2] = z
    return out
}
},{}],71:[function(require,module,exports){
module.exports = require('./squaredDistance')

},{"./squaredDistance":73}],72:[function(require,module,exports){
module.exports = require('./squaredLength')

},{"./squaredLength":74}],73:[function(require,module,exports){
module.exports = squaredDistance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2]
    return x*x + y*y + z*z
}
},{}],74:[function(require,module,exports){
module.exports = squaredLength;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return x*x + y*y + z*z
}
},{}],75:[function(require,module,exports){
module.exports = require('./subtract')

},{"./subtract":76}],76:[function(require,module,exports){
module.exports = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0]
    out[1] = a[1] - b[1]
    out[2] = a[2] - b[2]
    return out
}
},{}],77:[function(require,module,exports){
module.exports = transformMat3;

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
    var x = a[0], y = a[1], z = a[2]
    out[0] = x * m[0] + y * m[3] + z * m[6]
    out[1] = x * m[1] + y * m[4] + z * m[7]
    out[2] = x * m[2] + y * m[5] + z * m[8]
    return out
}
},{}],78:[function(require,module,exports){
module.exports = transformMat4;

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15]
    w = w || 1.0
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w
    return out
}
},{}],79:[function(require,module,exports){
module.exports = transformQuat;

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx
    return out
}
},{}],80:[function(require,module,exports){
(function(ja,N){"object"===typeof exports&&"undefined"!==typeof module?module.exports=N():"function"===typeof define&&define.amd?define(N):ja.createREGL=N()})(this,function(){function ja(a,b){this.id=Bb++;this.type=a;this.data=b}function N(a){if(0===a.length)return[];var b=a.charAt(0),c=a.charAt(a.length-1);if(1<a.length&&b===c&&('"'===b||"'"===b))return['"'+a.substr(1,a.length-2).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];if(b=/\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(a))return N(a.substr(0,
b.index)).concat(N(b[1])).concat(N(a.substr(b.index+b[0].length)));b=a.split(".");if(1===b.length)return['"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];a=[];for(c=0;c<b.length;++c)a=a.concat(N(b[c]));return a}function bb(a){return"["+N(a).join("][")+"]"}function Cb(){var a={"":0},b=[""];return{id:function(c){var e=a[c];if(e)return e;e=a[c]=b.length;b.push(c);return e},str:function(a){return b[a]}}}function Db(a,b,c){function e(){var b=window.innerWidth,e=window.innerHeight;a!==document.body&&
(e=a.getBoundingClientRect(),b=e.right-e.left,e=e.bottom-e.top);g.width=c*b;g.height=c*e;H(g.style,{width:b+"px",height:e+"px"})}var g=document.createElement("canvas");H(g.style,{border:0,margin:0,padding:0,top:0,left:0});a.appendChild(g);a===document.body&&(g.style.position="absolute",H(a.style,{margin:0,padding:0}));var d;a!==document.body&&"function"===typeof ResizeObserver?(d=new ResizeObserver(function(){setTimeout(e)}),d.observe(a)):window.addEventListener("resize",e,!1);e();return{canvas:g,
onDestroy:function(){d?d.disconnect():window.removeEventListener("resize",e);a.removeChild(g)}}}function Eb(a,b){function c(c){try{return a.getContext(c,b)}catch(g){return null}}return c("webgl")||c("experimental-webgl")||c("webgl-experimental")}function cb(a){return"string"===typeof a?a.split():a}function db(a){return"string"===typeof a?document.querySelector(a):a}function Fb(a){var b=a||{},c,e,g,d;a={};var r=[],n=[],u="undefined"===typeof window?1:window.devicePixelRatio,q=!1,t=function(a){},m=
function(){};"string"===typeof b?c=document.querySelector(b):"object"===typeof b&&("string"===typeof b.nodeName&&"function"===typeof b.appendChild&&"function"===typeof b.getBoundingClientRect?c=b:"function"===typeof b.drawArrays||"function"===typeof b.drawElements?(d=b,g=d.canvas):("gl"in b?d=b.gl:"canvas"in b?g=db(b.canvas):"container"in b&&(e=db(b.container)),"attributes"in b&&(a=b.attributes),"extensions"in b&&(r=cb(b.extensions)),"optionalExtensions"in b&&(n=cb(b.optionalExtensions)),"onDone"in
b&&(t=b.onDone),"profile"in b&&(q=!!b.profile),"pixelRatio"in b&&(u=+b.pixelRatio)));c&&("canvas"===c.nodeName.toLowerCase()?g=c:e=c);if(!d){if(!g){c=Db(e||document.body,t,u);if(!c)return null;g=c.canvas;m=c.onDestroy}void 0===a.premultipliedAlpha&&(a.premultipliedAlpha=!0);d=Eb(g,a)}return d?{gl:d,canvas:g,container:e,extensions:r,optionalExtensions:n,pixelRatio:u,profile:q,onDone:t,onDestroy:m}:(m(),t("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"),null)}
function Gb(a,b){function c(b){b=b.toLowerCase();var c;try{c=e[b]=a.getExtension(b)}catch(g){}return!!c}for(var e={},g=0;g<b.extensions.length;++g){var d=b.extensions[g];if(!c(d))return b.onDestroy(),b.onDone('"'+d+'" extension is not supported by the current WebGL context, try upgrading your system or a different browser'),null}b.optionalExtensions.forEach(c);return{extensions:e,restore:function(){Object.keys(e).forEach(function(a){if(e[a]&&!c(a))throw Error("(regl): error restoring extension "+
a);})}}}function A(a,b){for(var c=Array(a),e=0;e<a;++e)c[e]=b(e);return c}function eb(a){var b,c;b=(65535<a)<<4;a>>>=b;c=(255<a)<<3;a>>>=c;b|=c;c=(15<a)<<2;a>>>=c;b|=c;c=(3<a)<<1;return b|c|a>>>c>>1}function fb(){function a(a){a:{for(var b=16;268435456>=b;b*=16)if(a<=b){a=b;break a}a=0}b=c[eb(a)>>2];return 0<b.length?b.pop():new ArrayBuffer(a)}function b(a){c[eb(a.byteLength)>>2].push(a)}var c=A(8,function(){return[]});return{alloc:a,free:b,allocType:function(b,c){var d=null;switch(b){case 5120:d=
new Int8Array(a(c),0,c);break;case 5121:d=new Uint8Array(a(c),0,c);break;case 5122:d=new Int16Array(a(2*c),0,c);break;case 5123:d=new Uint16Array(a(2*c),0,c);break;case 5124:d=new Int32Array(a(4*c),0,c);break;case 5125:d=new Uint32Array(a(4*c),0,c);break;case 5126:d=new Float32Array(a(4*c),0,c);break;default:return null}return d.length!==c?d.subarray(0,c):d},freeType:function(a){b(a.buffer)}}}function X(a){return!!a&&"object"===typeof a&&Array.isArray(a.shape)&&Array.isArray(a.stride)&&"number"===
typeof a.offset&&a.shape.length===a.stride.length&&(Array.isArray(a.data)||G(a.data))}function gb(a,b,c,e,g,d){for(var r=0;r<b;++r)for(var n=a[r],u=0;u<c;++u)for(var q=n[u],t=0;t<e;++t)g[d++]=q[t]}function hb(a,b,c,e,g){for(var d=1,r=c+1;r<b.length;++r)d*=b[r];var n=b[c];if(4===b.length-c){var u=b[c+1],q=b[c+2];b=b[c+3];for(r=0;r<n;++r)gb(a[r],u,q,b,e,g),g+=d}else for(r=0;r<n;++r)hb(a[r],b,c+1,e,g),g+=d}function Fa(a){return Ga[Object.prototype.toString.call(a)]|0}function ib(a,b){for(var c=0;c<b.length;++c)a[c]=
b[c]}function jb(a,b,c,e,g,d,r){for(var n=0,u=0;u<c;++u)for(var q=0;q<e;++q)a[n++]=b[g*u+d*q+r]}function Hb(a,b,c,e){function g(b){this.id=u++;this.buffer=a.createBuffer();this.type=b;this.usage=35044;this.byteLength=0;this.dimension=1;this.dtype=5121;this.persistentData=null;c.profile&&(this.stats={size:0})}function d(b,c,k){b.byteLength=c.byteLength;a.bufferData(b.type,c,k)}function r(a,b,c,h,f,p){a.usage=c;if(Array.isArray(b)){if(a.dtype=h||5126,0<b.length)if(Array.isArray(b[0])){f=kb(b);for(var l=
h=1;l<f.length;++l)h*=f[l];a.dimension=h;b=Qa(b,f,a.dtype);d(a,b,c);p?a.persistentData=b:z.freeType(b)}else"number"===typeof b[0]?(a.dimension=f,f=z.allocType(a.dtype,b.length),ib(f,b),d(a,f,c),p?a.persistentData=f:z.freeType(f)):G(b[0])&&(a.dimension=b[0].length,a.dtype=h||Fa(b[0])||5126,b=Qa(b,[b.length,b[0].length],a.dtype),d(a,b,c),p?a.persistentData=b:z.freeType(b))}else if(G(b))a.dtype=h||Fa(b),a.dimension=f,d(a,b,c),p&&(a.persistentData=new Uint8Array(new Uint8Array(b.buffer)));else if(X(b)){f=
b.shape;var v=b.stride,l=b.offset,e=0,g=0,q=0,n=0;1===f.length?(e=f[0],g=1,q=v[0],n=0):2===f.length&&(e=f[0],g=f[1],q=v[0],n=v[1]);a.dtype=h||Fa(b.data)||5126;a.dimension=g;f=z.allocType(a.dtype,e*g);jb(f,b.data,e,g,q,n,l);d(a,f,c);p?a.persistentData=f:z.freeType(f)}else b instanceof ArrayBuffer&&(a.dtype=5121,a.dimension=f,d(a,b,c),p&&(a.persistentData=new Uint8Array(new Uint8Array(b))))}function n(c){b.bufferCount--;e(c);a.deleteBuffer(c.buffer);c.buffer=null;delete q[c.id]}var u=0,q={};g.prototype.bind=
function(){a.bindBuffer(this.type,this.buffer)};g.prototype.destroy=function(){n(this)};var t=[];c.profile&&(b.getTotalBufferSize=function(){var a=0;Object.keys(q).forEach(function(b){a+=q[b].stats.size});return a});return{create:function(m,e,d,h){function f(b){var m=35044,e=null,d=0,g=0,k=1;Array.isArray(b)||G(b)||X(b)||b instanceof ArrayBuffer?e=b:"number"===typeof b?d=b|0:b&&("data"in b&&(e=b.data),"usage"in b&&(m=lb[b.usage]),"type"in b&&(g=Ha[b.type]),"dimension"in b&&(k=b.dimension|0),"length"in
b&&(d=b.length|0));p.bind();e?r(p,e,m,g,k,h):(d&&a.bufferData(p.type,d,m),p.dtype=g||5121,p.usage=m,p.dimension=k,p.byteLength=d);c.profile&&(p.stats.size=p.byteLength*ha[p.dtype]);return f}b.bufferCount++;var p=new g(e);q[p.id]=p;d||f(m);f._reglType="buffer";f._buffer=p;f.subdata=function(b,c){var m=(c||0)|0,h;p.bind();if(G(b)||b instanceof ArrayBuffer)a.bufferSubData(p.type,m,b);else if(Array.isArray(b)){if(0<b.length)if("number"===typeof b[0]){var d=z.allocType(p.dtype,b.length);ib(d,b);a.bufferSubData(p.type,
m,d);z.freeType(d)}else if(Array.isArray(b[0])||G(b[0]))h=kb(b),d=Qa(b,h,p.dtype),a.bufferSubData(p.type,m,d),z.freeType(d)}else if(X(b)){h=b.shape;var e=b.stride,g=d=0,k=0,q=0;1===h.length?(d=h[0],g=1,k=e[0],q=0):2===h.length&&(d=h[0],g=h[1],k=e[0],q=e[1]);h=Array.isArray(b.data)?p.dtype:Fa(b.data);h=z.allocType(h,d*g);jb(h,b.data,d,g,k,q,b.offset);a.bufferSubData(p.type,m,h);z.freeType(h)}return f};c.profile&&(f.stats=p.stats);f.destroy=function(){n(p)};return f},createStream:function(a,b){var c=
t.pop();c||(c=new g(a));c.bind();r(c,b,35040,0,1,!1);return c},destroyStream:function(a){t.push(a)},clear:function(){J(q).forEach(n);t.forEach(n)},getBuffer:function(a){return a&&a._buffer instanceof g?a._buffer:null},restore:function(){J(q).forEach(function(b){b.buffer=a.createBuffer();a.bindBuffer(b.type,b.buffer);a.bufferData(b.type,b.persistentData||b.byteLength,b.usage)})},_initBuffer:r}}function Ib(a,b,c,e){function g(a){this.id=u++;n[this.id]=this;this.buffer=a;this.primType=4;this.type=this.vertCount=
0}function d(d,e,g,h,f,p,l){d.buffer.bind();var v;e?((v=l)||G(e)&&(!X(e)||G(e.data))||(v=b.oes_element_index_uint?5125:5123),c._initBuffer(d.buffer,e,g,v,3)):(a.bufferData(34963,p,g),d.buffer.dtype=v||5121,d.buffer.usage=g,d.buffer.dimension=3,d.buffer.byteLength=p);v=l;if(!l){switch(d.buffer.dtype){case 5121:case 5120:v=5121;break;case 5123:case 5122:v=5123;break;case 5125:case 5124:v=5125}d.buffer.dtype=v}d.type=v;e=f;0>e&&(e=d.buffer.byteLength,5123===v?e>>=1:5125===v&&(e>>=2));d.vertCount=e;e=
h;0>h&&(e=4,h=d.buffer.dimension,1===h&&(e=0),2===h&&(e=1),3===h&&(e=4));d.primType=e}function r(a){e.elementsCount--;delete n[a.id];a.buffer.destroy();a.buffer=null}var n={},u=0,q={uint8:5121,uint16:5123};b.oes_element_index_uint&&(q.uint32=5125);g.prototype.bind=function(){this.buffer.bind()};var t=[];return{create:function(a,b){function k(a){if(a)if("number"===typeof a)h(a),f.primType=4,f.vertCount=a|0,f.type=5121;else{var b=null,c=35044,e=-1,g=-1,m=0,n=0;if(Array.isArray(a)||G(a)||X(a))b=a;else if("data"in
a&&(b=a.data),"usage"in a&&(c=lb[a.usage]),"primitive"in a&&(e=Sa[a.primitive]),"count"in a&&(g=a.count|0),"type"in a&&(n=q[a.type]),"length"in a)m=a.length|0;else if(m=g,5123===n||5122===n)m*=2;else if(5125===n||5124===n)m*=4;d(f,b,c,e,g,m,n)}else h(),f.primType=4,f.vertCount=0,f.type=5121;return k}var h=c.create(null,34963,!0),f=new g(h._buffer);e.elementsCount++;k(a);k._reglType="elements";k._elements=f;k.subdata=function(a,b){h.subdata(a,b);return k};k.destroy=function(){r(f)};return k},createStream:function(a){var b=
t.pop();b||(b=new g(c.create(null,34963,!0,!1)._buffer));d(b,a,35040,-1,-1,0,0);return b},destroyStream:function(a){t.push(a)},getElements:function(a){return"function"===typeof a&&a._elements instanceof g?a._elements:null},clear:function(){J(n).forEach(r)}}}function nb(a){for(var b=z.allocType(5123,a.length),c=0;c<a.length;++c)if(isNaN(a[c]))b[c]=65535;else if(Infinity===a[c])b[c]=31744;else if(-Infinity===a[c])b[c]=64512;else{ob[0]=a[c];var e=Jb[0],g=e>>>31<<15,d=(e<<1>>>24)-127,e=e>>13&1023;b[c]=
-24>d?g:-14>d?g+(e+1024>>-14-d):15<d?g+31744:g+(d+15<<10)+e}return b}function na(a){return Array.isArray(a)||G(a)}function ka(a){return"[object "+a+"]"}function pb(a){return Array.isArray(a)&&(0===a.length||"number"===typeof a[0])}function qb(a){return Array.isArray(a)&&0!==a.length&&na(a[0])?!0:!1}function Y(a){return Object.prototype.toString.call(a)}function Ta(a){if(!a)return!1;var b=Y(a);return 0<=Kb.indexOf(b)?!0:pb(a)||qb(a)||X(a)}function rb(a,b){36193===a.type?(a.data=nb(b),z.freeType(b)):
a.data=b}function Ia(a,b,c,e,g,d){a="undefined"!==typeof w[a]?w[a]:S[a]*Z[b];d&&(a*=6);if(g){for(e=0;1<=c;)e+=a*c*c,c/=2;return e}return a*c*e}function Lb(a,b,c,e,g,d,r){function n(){this.format=this.internalformat=6408;this.type=5121;this.flipY=this.premultiplyAlpha=this.compressed=!1;this.unpackAlignment=1;this.colorSpace=37444;this.channels=this.height=this.width=0}function u(a,b){a.internalformat=b.internalformat;a.format=b.format;a.type=b.type;a.compressed=b.compressed;a.premultiplyAlpha=b.premultiplyAlpha;
a.flipY=b.flipY;a.unpackAlignment=b.unpackAlignment;a.colorSpace=b.colorSpace;a.width=b.width;a.height=b.height;a.channels=b.channels}function q(a,b){if("object"===typeof b&&b){"premultiplyAlpha"in b&&(a.premultiplyAlpha=b.premultiplyAlpha);"flipY"in b&&(a.flipY=b.flipY);"alignment"in b&&(a.unpackAlignment=b.alignment);"colorSpace"in b&&(a.colorSpace=Mb[b.colorSpace]);"type"in b&&(a.type=K[b.type]);var c=a.width,f=a.height,e=a.channels,d=!1;"shape"in b?(c=b.shape[0],f=b.shape[1],3===b.shape.length&&
(e=b.shape[2],d=!0)):("radius"in b&&(c=f=b.radius),"width"in b&&(c=b.width),"height"in b&&(f=b.height),"channels"in b&&(e=b.channels,d=!0));a.width=c|0;a.height=f|0;a.channels=e|0;c=!1;"format"in b&&(c=b.format,f=a.internalformat=B[c],a.format=M[f],c in K&&!("type"in b)&&(a.type=K[c]),c in V&&(a.compressed=!0),c=!0);!d&&c?a.channels=S[a.format]:d&&!c&&a.channels!==La[a.format]&&(a.format=a.internalformat=La[a.channels])}}function t(b){a.pixelStorei(37440,b.flipY);a.pixelStorei(37441,b.premultiplyAlpha);
a.pixelStorei(37443,b.colorSpace);a.pixelStorei(3317,b.unpackAlignment)}function m(){n.call(this);this.yOffset=this.xOffset=0;this.data=null;this.needsFree=!1;this.element=null;this.needsCopy=!1}function F(a,b){var c=null;Ta(b)?c=b:b&&(q(a,b),"x"in b&&(a.xOffset=b.x|0),"y"in b&&(a.yOffset=b.y|0),Ta(b.data)&&(c=b.data));if(b.copy){var f=g.viewportWidth,d=g.viewportHeight;a.width=a.width||f-a.xOffset;a.height=a.height||d-a.yOffset;a.needsCopy=!0}else if(!c)a.width=a.width||1,a.height=a.height||1,a.channels=
a.channels||4;else if(G(c))a.channels=a.channels||4,a.data=c,"type"in b||5121!==a.type||(a.type=Ga[Object.prototype.toString.call(c)]|0);else if(pb(c)){a.channels=a.channels||4;f=c;d=f.length;switch(a.type){case 5121:case 5123:case 5125:case 5126:d=z.allocType(a.type,d);d.set(f);a.data=d;break;case 36193:a.data=nb(f)}a.alignment=1;a.needsFree=!0}else if(X(c)){f=c.data;Array.isArray(f)||5121!==a.type||(a.type=Ga[Object.prototype.toString.call(f)]|0);var d=c.shape,e=c.stride,h,l,k,p;3===d.length?(k=
d[2],p=e[2]):p=k=1;h=d[0];l=d[1];d=e[0];e=e[1];a.alignment=1;a.width=h;a.height=l;a.channels=k;a.format=a.internalformat=La[k];a.needsFree=!0;h=p;c=c.offset;k=a.width;p=a.height;l=a.channels;for(var y=z.allocType(36193===a.type?5126:a.type,k*p*l),I=0,U=0;U<p;++U)for(var da=0;da<k;++da)for(var Ua=0;Ua<l;++Ua)y[I++]=f[d*da+e*U+h*Ua+c];rb(a,y)}else if(Y(c)===Va||Y(c)===Wa||Y(c)===sb)Y(c)===Va||Y(c)===Wa?a.element=c:a.element=c.canvas,a.width=a.element.width,a.height=a.element.height,a.channels=4;else if(Y(c)===
tb)a.element=c,a.width=c.width,a.height=c.height,a.channels=4;else if(Y(c)===ub)a.element=c,a.width=c.naturalWidth,a.height=c.naturalHeight,a.channels=4;else if(Y(c)===vb)a.element=c,a.width=c.videoWidth,a.height=c.videoHeight,a.channels=4;else if(qb(c)){f=a.width||c[0].length;d=a.height||c.length;e=a.channels;e=na(c[0][0])?e||c[0][0].length:e||1;h=Ma.shape(c);k=1;for(p=0;p<h.length;++p)k*=h[p];k=z.allocType(36193===a.type?5126:a.type,k);Ma.flatten(c,h,"",k);rb(a,k);a.alignment=1;a.width=f;a.height=
d;a.channels=e;a.format=a.internalformat=La[e];a.needsFree=!0}}function k(b,c,f,d,h){var g=b.element,k=b.data,l=b.internalformat,p=b.format,v=b.type,y=b.width,I=b.height;t(b);g?a.texSubImage2D(c,h,f,d,p,v,g):b.compressed?a.compressedTexSubImage2D(c,h,f,d,l,y,I,k):b.needsCopy?(e(),a.copyTexSubImage2D(c,h,f,d,b.xOffset,b.yOffset,y,I)):a.texSubImage2D(c,h,f,d,y,I,p,v,k)}function h(){return L.pop()||new m}function f(a){a.needsFree&&z.freeType(a.data);m.call(a);L.push(a)}function p(){n.call(this);this.genMipmaps=
!1;this.mipmapHint=4352;this.mipmask=0;this.images=Array(16)}function l(a,b,c){var f=a.images[0]=h();a.mipmask=1;f.width=a.width=b;f.height=a.height=c;f.channels=a.channels=4}function v(a,b){var c=null;if(Ta(b))c=a.images[0]=h(),u(c,a),F(c,b),a.mipmask=1;else if(q(a,b),Array.isArray(b.mipmap))for(var f=b.mipmap,d=0;d<f.length;++d)c=a.images[d]=h(),u(c,a),c.width>>=d,c.height>>=d,F(c,f[d]),a.mipmask|=1<<d;else c=a.images[0]=h(),u(c,a),F(c,b),a.mipmask=1;u(a,a.images[0])}function Q(b,c){for(var f=b.images,
d=0;d<f.length&&f[d];++d){var h=f[d],g=c,k=d,l=h.element,p=h.data,v=h.internalformat,y=h.format,I=h.type,U=h.width,da=h.height;t(h);l?a.texImage2D(g,k,y,y,I,l):h.compressed?a.compressedTexImage2D(g,k,v,U,da,0,p):h.needsCopy?(e(),a.copyTexImage2D(g,k,y,h.xOffset,h.yOffset,U,da,0)):a.texImage2D(g,k,y,U,da,0,y,I,p||null)}}function C(){var a=A.pop()||new p;n.call(a);for(var b=a.mipmask=0;16>b;++b)a.images[b]=null;return a}function va(a){for(var b=a.images,c=0;c<b.length;++c)b[c]&&f(b[c]),b[c]=null;A.push(a)}
function ea(){this.magFilter=this.minFilter=9728;this.wrapT=this.wrapS=33071;this.anisotropic=1;this.genMipmaps=!1;this.mipmapHint=4352}function mb(a,b){"min"in b&&(a.minFilter=O[b.min],0<=Nb.indexOf(a.minFilter)&&!("faces"in b)&&(a.genMipmaps=!0));"mag"in b&&(a.magFilter=T[b.mag]);var c=a.wrapS,f=a.wrapT;if("wrap"in b){var d=b.wrap;"string"===typeof d?c=f=la[d]:Array.isArray(d)&&(c=la[d[0]],f=la[d[1]])}else"wrapS"in b&&(c=la[b.wrapS]),"wrapT"in b&&(f=la[b.wrapT]);a.wrapS=c;a.wrapT=f;"anisotropic"in
b&&(a.anisotropic=b.anisotropic);if("mipmap"in b){c=!1;switch(typeof b.mipmap){case "string":a.mipmapHint=x[b.mipmap];c=a.genMipmaps=!0;break;case "boolean":c=a.genMipmaps=b.mipmap;break;case "object":a.genMipmaps=!1,c=!0}!c||"min"in b||(a.minFilter=9984)}}function Ra(c,f){a.texParameteri(f,10241,c.minFilter);a.texParameteri(f,10240,c.magFilter);a.texParameteri(f,10242,c.wrapS);a.texParameteri(f,10243,c.wrapT);b.ext_texture_filter_anisotropic&&a.texParameteri(f,34046,c.anisotropic);c.genMipmaps&&
(a.hint(33170,c.mipmapHint),a.generateMipmap(f))}function R(b){n.call(this);this.mipmask=0;this.internalformat=6408;this.id=P++;this.refCount=1;this.target=b;this.texture=a.createTexture();this.unit=-1;this.bindCount=0;this.texInfo=new ea;r.profile&&(this.stats={size:0})}function sa(b){a.activeTexture(33984);a.bindTexture(b.target,b.texture)}function za(){var b=W[0];b?a.bindTexture(b.target,b.texture):a.bindTexture(3553,null)}function D(b){var c=b.texture,f=b.unit,h=b.target;0<=f&&(a.activeTexture(33984+
f),a.bindTexture(h,null),W[f]=null);a.deleteTexture(c);b.texture=null;b.params=null;b.pixels=null;b.refCount=0;delete E[b.id];d.textureCount--}var x={"don't care":4352,"dont care":4352,nice:4354,fast:4353},la={repeat:10497,clamp:33071,mirror:33648},T={nearest:9728,linear:9729},O=H({mipmap:9987,"nearest mipmap nearest":9984,"linear mipmap nearest":9985,"nearest mipmap linear":9986,"linear mipmap linear":9987},T),Mb={none:0,browser:37444},K={uint8:5121,rgba4:32819,rgb565:33635,"rgb5 a1":32820},B={alpha:6406,
luminance:6409,"luminance alpha":6410,rgb:6407,rgba:6408,rgba4:32854,"rgb5 a1":32855,rgb565:36194},V={};b.ext_srgb&&(B.srgb=35904,B.srgba=35906);b.oes_texture_float&&(K.float32=K["float"]=5126);b.oes_texture_half_float&&(K.float16=K["half float"]=36193);b.webgl_depth_texture&&(H(B,{depth:6402,"depth stencil":34041}),H(K,{uint16:5123,uint32:5125,"depth stencil":34042}));b.webgl_compressed_texture_s3tc&&H(V,{"rgb s3tc dxt1":33776,"rgba s3tc dxt1":33777,"rgba s3tc dxt3":33778,"rgba s3tc dxt5":33779});
b.webgl_compressed_texture_atc&&H(V,{"rgb atc":35986,"rgba atc explicit alpha":35987,"rgba atc interpolated alpha":34798});b.webgl_compressed_texture_pvrtc&&H(V,{"rgb pvrtc 4bppv1":35840,"rgb pvrtc 2bppv1":35841,"rgba pvrtc 4bppv1":35842,"rgba pvrtc 2bppv1":35843});b.webgl_compressed_texture_etc1&&(V["rgb etc1"]=36196);var w=Array.prototype.slice.call(a.getParameter(34467));Object.keys(V).forEach(function(a){var b=V[a];0<=w.indexOf(b)&&(B[a]=b)});var wa=Object.keys(B);c.textureFormats=wa;var aa=[];
Object.keys(B).forEach(function(a){aa[B[a]]=a});var xa=[];Object.keys(K).forEach(function(a){xa[K[a]]=a});var ba=[];Object.keys(T).forEach(function(a){ba[T[a]]=a});var Da=[];Object.keys(O).forEach(function(a){Da[O[a]]=a});var fa=[];Object.keys(la).forEach(function(a){fa[la[a]]=a});var M=wa.reduce(function(a,c){var f=B[c];6409===f||6406===f||6409===f||6410===f||6402===f||34041===f||b.ext_srgb&&(35904===f||35906===f)?a[f]=f:32855===f||0<=c.indexOf("rgba")?a[f]=6408:a[f]=6407;return a},{}),L=[],A=[],
P=0,E={},ia=c.maxTextureUnits,W=Array(ia).map(function(){return null});H(R.prototype,{bind:function(){this.bindCount+=1;var b=this.unit;if(0>b){for(var c=0;c<ia;++c){var f=W[c];if(f){if(0<f.bindCount)continue;f.unit=-1}W[c]=this;b=c;break}r.profile&&d.maxTextureUnits<b+1&&(d.maxTextureUnits=b+1);this.unit=b;a.activeTexture(33984+b);a.bindTexture(this.target,this.texture)}return b},unbind:function(){--this.bindCount},decRef:function(){0>=--this.refCount&&D(this)}});r.profile&&(d.getTotalTextureSize=
function(){var a=0;Object.keys(E).forEach(function(b){a+=E[b].stats.size});return a});return{create2D:function(b,c){function e(a,b){var c=g.texInfo;ea.call(c);var f=C();"number"===typeof a?"number"===typeof b?l(f,a|0,b|0):l(f,a|0,a|0):a?(mb(c,a),v(f,a)):l(f,1,1);c.genMipmaps&&(f.mipmask=(f.width<<1)-1);g.mipmask=f.mipmask;u(g,f);g.internalformat=f.internalformat;e.width=f.width;e.height=f.height;sa(g);Q(f,3553);Ra(c,3553);za();va(f);r.profile&&(g.stats.size=Ia(g.internalformat,g.type,f.width,f.height,
c.genMipmaps,!1));e.format=aa[g.internalformat];e.type=xa[g.type];e.mag=ba[c.magFilter];e.min=Da[c.minFilter];e.wrapS=fa[c.wrapS];e.wrapT=fa[c.wrapT];return e}var g=new R(3553);E[g.id]=g;d.textureCount++;e(b,c);e.subimage=function(a,b,c,d){b|=0;c|=0;d|=0;var l=h();u(l,g);l.width=0;l.height=0;F(l,a);l.width=l.width||(g.width>>d)-b;l.height=l.height||(g.height>>d)-c;sa(g);k(l,3553,b,c,d);za();f(l);return e};e.resize=function(b,c){var f=b|0,d=c|0||f;if(f===g.width&&d===g.height)return e;e.width=g.width=
f;e.height=g.height=d;sa(g);for(var h=0;g.mipmask>>h;++h){var l=f>>h,y=d>>h;if(!l||!y)break;a.texImage2D(3553,h,g.format,l,y,0,g.format,g.type,null)}za();r.profile&&(g.stats.size=Ia(g.internalformat,g.type,f,d,!1,!1));return e};e._reglType="texture2d";e._texture=g;r.profile&&(e.stats=g.stats);e.destroy=function(){g.decRef()};return e},createCube:function(b,c,e,g,p,n){function m(a,b,c,f,d,e){var h,ma=x.texInfo;ea.call(ma);for(h=0;6>h;++h)D[h]=C();if("number"===typeof a||!a)for(a=a|0||1,h=0;6>h;++h)l(D[h],
a,a);else if("object"===typeof a)if(b)v(D[0],a),v(D[1],b),v(D[2],c),v(D[3],f),v(D[4],d),v(D[5],e);else if(mb(ma,a),q(x,a),"faces"in a)for(a=a.faces,h=0;6>h;++h)u(D[h],x),v(D[h],a[h]);else for(h=0;6>h;++h)v(D[h],a);u(x,D[0]);x.mipmask=ma.genMipmaps?(D[0].width<<1)-1:D[0].mipmask;x.internalformat=D[0].internalformat;m.width=D[0].width;m.height=D[0].height;sa(x);for(h=0;6>h;++h)Q(D[h],34069+h);Ra(ma,34067);za();r.profile&&(x.stats.size=Ia(x.internalformat,x.type,m.width,m.height,ma.genMipmaps,!0));m.format=
aa[x.internalformat];m.type=xa[x.type];m.mag=ba[ma.magFilter];m.min=Da[ma.minFilter];m.wrapS=fa[ma.wrapS];m.wrapT=fa[ma.wrapT];for(h=0;6>h;++h)va(D[h]);return m}var x=new R(34067);E[x.id]=x;d.cubeCount++;var D=Array(6);m(b,c,e,g,p,n);m.subimage=function(a,b,c,d,e){c|=0;d|=0;e|=0;var g=h();u(g,x);g.width=0;g.height=0;F(g,b);g.width=g.width||(x.width>>e)-c;g.height=g.height||(x.height>>e)-d;sa(x);k(g,34069+a,c,d,e);za();f(g);return m};m.resize=function(b){b|=0;if(b!==x.width){m.width=x.width=b;m.height=
x.height=b;sa(x);for(var c=0;6>c;++c)for(var f=0;x.mipmask>>f;++f)a.texImage2D(34069+c,f,x.format,b>>f,b>>f,0,x.format,x.type,null);za();r.profile&&(x.stats.size=Ia(x.internalformat,x.type,m.width,m.height,!1,!0));return m}};m._reglType="textureCube";m._texture=x;r.profile&&(m.stats=x.stats);m.destroy=function(){x.decRef()};return m},clear:function(){for(var b=0;b<ia;++b)a.activeTexture(33984+b),a.bindTexture(3553,null),W[b]=null;J(E).forEach(D);d.cubeCount=0;d.textureCount=0},getTexture:function(a){return null},
restore:function(){for(var b=0;b<ia;++b){var c=W[b];c&&(c.bindCount=0,c.unit=-1,W[b]=null)}J(E).forEach(function(b){b.texture=a.createTexture();a.bindTexture(b.target,b.texture);for(var c=0;32>c;++c)if(0!==(b.mipmask&1<<c))if(3553===b.target)a.texImage2D(3553,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,b.type,null);else for(var f=0;6>f;++f)a.texImage2D(34069+f,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,b.type,null);Ra(b.texInfo,b.target)})}}}function Ob(a,b,c,e,
g,d){function r(a,b,c){this.target=a;this.texture=b;this.renderbuffer=c;var f=a=0;b?(a=b.width,f=b.height):c&&(a=c.width,f=c.height);this.width=a;this.height=f}function n(a){a&&(a.texture&&a.texture._texture.decRef(),a.renderbuffer&&a.renderbuffer._renderbuffer.decRef())}function u(a,b,c){a&&(a.texture?a.texture._texture.refCount+=1:a.renderbuffer._renderbuffer.refCount+=1)}function q(b,c){c&&(c.texture?a.framebufferTexture2D(36160,b,c.target,c.texture._texture.texture,0):a.framebufferRenderbuffer(36160,
b,36161,c.renderbuffer._renderbuffer.renderbuffer))}function t(a){var b=3553,c=null,f=null,d=a;"object"===typeof a&&(d=a.data,"target"in a&&(b=a.target|0));a=d._reglType;"texture2d"===a?c=d:"textureCube"===a?c=d:"renderbuffer"===a&&(f=d,b=36161);return new r(b,c,f)}function m(a,b,c,f,d){if(c)return a=e.create2D({width:a,height:b,format:f,type:d}),a._texture.refCount=0,new r(3553,a,null);a=g.create({width:a,height:b,format:f});a._renderbuffer.refCount=0;return new r(36161,null,a)}function F(a){return a&&
(a.texture||a.renderbuffer)}function k(a,b,c){a&&(a.texture?a.texture.resize(b,c):a.renderbuffer&&a.renderbuffer.resize(b,c),a.width=b,a.height=c)}function h(){this.id=z++;w[this.id]=this;this.framebuffer=a.createFramebuffer();this.height=this.width=0;this.colorAttachments=[];this.depthStencilAttachment=this.stencilAttachment=this.depthAttachment=null}function f(a){a.colorAttachments.forEach(n);n(a.depthAttachment);n(a.stencilAttachment);n(a.depthStencilAttachment)}function p(b){a.deleteFramebuffer(b.framebuffer);
b.framebuffer=null;d.framebufferCount--;delete w[b.id]}function l(b){var f;a.bindFramebuffer(36160,b.framebuffer);var d=b.colorAttachments;for(f=0;f<d.length;++f)q(36064+f,d[f]);for(f=d.length;f<c.maxColorAttachments;++f)a.framebufferTexture2D(36160,36064+f,3553,null,0);a.framebufferTexture2D(36160,33306,3553,null,0);a.framebufferTexture2D(36160,36096,3553,null,0);a.framebufferTexture2D(36160,36128,3553,null,0);q(36096,b.depthAttachment);q(36128,b.stencilAttachment);q(33306,b.depthStencilAttachment);
a.checkFramebufferStatus(36160);a.isContextLost();a.bindFramebuffer(36160,Q.next?Q.next.framebuffer:null);Q.cur=Q.next;a.getError()}function v(a,b){function c(a,b){var d,h=0,g=0,k=!0,p=!0;d=null;var v=!0,n="rgba",q="uint8",r=1,ea=null,ba=null,Q=null,fa=!1;if("number"===typeof a)h=a|0,g=b|0||h;else if(a){"shape"in a?(g=a.shape,h=g[0],g=g[1]):("radius"in a&&(h=g=a.radius),"width"in a&&(h=a.width),"height"in a&&(g=a.height));if("color"in a||"colors"in a)d=a.color||a.colors,Array.isArray(d);if(!d){"colorCount"in
a&&(r=a.colorCount|0);"colorTexture"in a&&(v=!!a.colorTexture,n="rgba4");if("colorType"in a&&(q=a.colorType,!v))if("half float"===q||"float16"===q)n="rgba16f";else if("float"===q||"float32"===q)n="rgba32f";"colorFormat"in a&&(n=a.colorFormat,0<=C.indexOf(n)?v=!0:0<=va.indexOf(n)&&(v=!1))}if("depthTexture"in a||"depthStencilTexture"in a)fa=!(!a.depthTexture&&!a.depthStencilTexture);"depth"in a&&("boolean"===typeof a.depth?k=a.depth:(ea=a.depth,p=!1));"stencil"in a&&("boolean"===typeof a.stencil?p=
a.stencil:(ba=a.stencil,k=!1));"depthStencil"in a&&("boolean"===typeof a.depthStencil?k=p=a.depthStencil:(Q=a.depthStencil,p=k=!1))}else h=g=1;var M=null,z=null,w=null,R=null;if(Array.isArray(d))M=d.map(t);else if(d)M=[t(d)];else for(M=Array(r),d=0;d<r;++d)M[d]=m(h,g,v,n,q);h=h||M[0].width;g=g||M[0].height;ea?z=t(ea):k&&!p&&(z=m(h,g,fa,"depth","uint32"));ba?w=t(ba):p&&!k&&(w=m(h,g,!1,"stencil","uint8"));Q?R=t(Q):!ea&&!ba&&p&&k&&(R=m(h,g,fa,"depth stencil","depth stencil"));k=null;for(d=0;d<M.length;++d)u(M[d],
h,g),M[d]&&M[d].texture&&(p=Xa[M[d].texture._texture.format]*Na[M[d].texture._texture.type],null===k&&(k=p));u(z,h,g);u(w,h,g);u(R,h,g);f(e);e.width=h;e.height=g;e.colorAttachments=M;e.depthAttachment=z;e.stencilAttachment=w;e.depthStencilAttachment=R;c.color=M.map(F);c.depth=F(z);c.stencil=F(w);c.depthStencil=F(R);c.width=e.width;c.height=e.height;l(e);return c}var e=new h;d.framebufferCount++;c(a,b);return H(c,{resize:function(a,b){var f=Math.max(a|0,1),d=Math.max(b|0||f,1);if(f===e.width&&d===
e.height)return c;for(var h=e.colorAttachments,g=0;g<h.length;++g)k(h[g],f,d);k(e.depthAttachment,f,d);k(e.stencilAttachment,f,d);k(e.depthStencilAttachment,f,d);e.width=c.width=f;e.height=c.height=d;l(e);return c},_reglType:"framebuffer",_framebuffer:e,destroy:function(){p(e);f(e)},use:function(a){Q.setFBO({framebuffer:c},a)}})}var Q={cur:null,next:null,dirty:!1,setFBO:null},C=["rgba"],va=["rgba4","rgb565","rgb5 a1"];b.ext_srgb&&va.push("srgba");b.ext_color_buffer_half_float&&va.push("rgba16f","rgb16f");
b.webgl_color_buffer_float&&va.push("rgba32f");var ea=["uint8"];b.oes_texture_half_float&&ea.push("half float","float16");b.oes_texture_float&&ea.push("float","float32");var z=0,w={};return H(Q,{getFramebuffer:function(a){return"function"===typeof a&&"framebuffer"===a._reglType&&(a=a._framebuffer,a instanceof h)?a:null},create:v,createCube:function(a){function b(a){var f,d={color:null},h=0,g=null;f="rgba";var k="uint8",l=1;if("number"===typeof a)h=a|0;else if(a){"shape"in a?h=a.shape[0]:("radius"in
a&&(h=a.radius|0),"width"in a?h=a.width|0:"height"in a&&(h=a.height|0));if("color"in a||"colors"in a)g=a.color||a.colors,Array.isArray(g);g||("colorCount"in a&&(l=a.colorCount|0),"colorType"in a&&(k=a.colorType),"colorFormat"in a&&(f=a.colorFormat));"depth"in a&&(d.depth=a.depth);"stencil"in a&&(d.stencil=a.stencil);"depthStencil"in a&&(d.depthStencil=a.depthStencil)}else h=1;if(g)if(Array.isArray(g))for(a=[],f=0;f<g.length;++f)a[f]=g[f];else a=[g];else for(a=Array(l),g={radius:h,format:f,type:k},
f=0;f<l;++f)a[f]=e.createCube(g);d.color=Array(a.length);for(f=0;f<a.length;++f)l=a[f],h=h||l.width,d.color[f]={target:34069,data:a[f]};for(f=0;6>f;++f){for(l=0;l<a.length;++l)d.color[l].target=34069+f;0<f&&(d.depth=c[0].depth,d.stencil=c[0].stencil,d.depthStencil=c[0].depthStencil);if(c[f])c[f](d);else c[f]=v(d)}return H(b,{width:h,height:h,color:a})}var c=Array(6);b(a);return H(b,{faces:c,resize:function(a){var f=a|0;if(f===b.width)return b;var d=b.color;for(a=0;a<d.length;++a)d[a].resize(f);for(a=
0;6>a;++a)c[a].resize(f);b.width=b.height=f;return b},_reglType:"framebufferCube",destroy:function(){c.forEach(function(a){a.destroy()})}})},clear:function(){J(w).forEach(p)},restore:function(){Q.cur=null;Q.next=null;Q.dirty=!0;J(w).forEach(function(b){b.framebuffer=a.createFramebuffer();l(b)})}})}function Ya(){this.w=this.z=this.y=this.x=this.state=0;this.buffer=null;this.size=0;this.normalized=!1;this.type=5126;this.divisor=this.stride=this.offset=0}function Pb(a,b,c,e,g){function d(a){if(a!==h.currentVAO){var c=
b.oes_vertex_array_object;a?c.bindVertexArrayOES(a.vao):c.bindVertexArrayOES(null);h.currentVAO=a}}function r(c){if(c!==h.currentVAO){if(c)c.bindAttrs();else for(var d=b.angle_instanced_arrays,e=0;e<m.length;++e){var g=m[e];g.buffer?(a.enableVertexAttribArray(e),a.vertexAttribPointer(e,g.size,g.type,g.normalized,g.stride,g.offfset),d&&d.vertexAttribDivisorANGLE(e,g.divisor)):(a.disableVertexAttribArray(e),a.vertexAttrib4f(e,g.x,g.y,g.z,g.w))}h.currentVAO=c}}function n(){J(k).forEach(function(a){a.destroy()})}
function u(){this.id=++F;this.attributes=[];var a=b.oes_vertex_array_object;this.vao=a?a.createVertexArrayOES():null;k[this.id]=this;this.buffers=[]}function q(){b.oes_vertex_array_object&&J(k).forEach(function(a){a.refresh()})}var t=c.maxAttributes,m=Array(t);for(c=0;c<t;++c)m[c]=new Ya;var F=0,k={},h={Record:Ya,scope:{},state:m,currentVAO:null,targetVAO:null,restore:b.oes_vertex_array_object?q:function(){},createVAO:function(a){function b(a){for(var f=0;f<c.buffers.length;++f)c.buffers[f].destroy();
c.buffers.length=0;f=c.attributes;f.length=a.length;for(var d=0;d<a.length;++d){var h=a[d],e=f[d]=new Ya;Array.isArray(h)||G(h)||X(h)?(h=g.create(h,34962,!1,!0),e.buffer=g.getBuffer(h),e.size=e.buffer.dimension|0,e.normalized=!1,e.type=e.buffer.dtype,e.offset=0,e.stride=0,e.divisor=0,e.state=1,c.buffers.push(h)):g.getBuffer(h)?(e.buffer=g.getBuffer(h),e.size=e.buffer.dimension|0,e.normalized=!1,e.type=e.buffer.dtype,e.offset=0,e.stride=0,e.divisor=0,e.state=1):g.getBuffer(h.buffer)?(e.buffer=g.getBuffer(h.buffer),
e.size=(+h.size||e.buffer.dimension)|0,e.normalized=!!h.normalized||!1,e.type="type"in h?Ha[h.type]:e.buffer.dtype,e.offset=(h.offset||0)|0,e.stride=(h.stride||0)|0,e.divisor=(h.divisor||0)|0,e.state=1):"x"in h&&(e.x=+h.x||0,e.y=+h.y||0,e.z=+h.z||0,e.w=+h.w||0,e.state=2)}c.refresh();return b}var c=new u;e.vaoCount+=1;b.destroy=function(){c.destroy()};b._vao=c;b._reglType="vao";return b(a)},getVAO:function(a){return"function"===typeof a&&a._vao?a._vao:null},destroyBuffer:function(b){for(var c=0;c<
m.length;++c){var d=m[c];d.buffer===b&&(a.disableVertexAttribArray(c),d.buffer=null)}},setVAO:b.oes_vertex_array_object?d:r,clear:b.oes_vertex_array_object?n:function(){}};u.prototype.bindAttrs=function(){for(var c=b.angle_instanced_arrays,d=this.attributes,e=0;e<d.length;++e){var h=d[e];h.buffer?(a.enableVertexAttribArray(e),a.bindBuffer(34962,h.buffer.buffer),a.vertexAttribPointer(e,h.size,h.type,h.normalized,h.stride,h.offset),c&&c.vertexAttribDivisorANGLE(e,h.divisor)):(a.disableVertexAttribArray(e),
a.vertexAttrib4f(e,h.x,h.y,h.z,h.w))}for(c=d.length;c<t;++c)a.disableVertexAttribArray(c)};u.prototype.refresh=function(){var a=b.oes_vertex_array_object;a&&(a.bindVertexArrayOES(this.vao),this.bindAttrs(),h.currentVAO=this)};u.prototype.destroy=function(){if(this.vao){var a=b.oes_vertex_array_object;this===h.currentVAO&&(h.currentVAO=null,a.bindVertexArrayOES(null));a.deleteVertexArrayOES(this.vao);this.vao=null}k[this.id]&&(delete k[this.id],--e.vaoCount)};return h}function Qb(a,b,c,e){function g(a,
b,c,d){this.name=a;this.id=b;this.location=c;this.info=d}function d(a,b){for(var c=0;c<a.length;++c)if(a[c].id===b.id){a[c].location=b.location;return}a.push(b)}function r(c,f,d){d=35632===c?q:t;var e=d[f];if(!e){var g=b.str(f),e=a.createShader(c);a.shaderSource(e,g);a.compileShader(e);d[f]=e}return e}function n(a,b){this.id=k++;this.fragId=a;this.vertId=b;this.program=null;this.uniforms=[];this.attributes=[];e.profile&&(this.stats={uniformsCount:0,attributesCount:0})}function u(c,f,k){var m;m=r(35632,
c.fragId);var n=r(35633,c.vertId);f=c.program=a.createProgram();a.attachShader(f,m);a.attachShader(f,n);if(k)for(m=0;m<k.length;++m)n=k[m],a.bindAttribLocation(f,n[0],n[1]);a.linkProgram(f);n=a.getProgramParameter(f,35718);e.profile&&(c.stats.uniformsCount=n);var q=c.uniforms;for(m=0;m<n;++m)if(k=a.getActiveUniform(f,m))if(1<k.size)for(var u=0;u<k.size;++u){var t=k.name.replace("[0]","["+u+"]");d(q,new g(t,b.id(t),a.getUniformLocation(f,t),k))}else d(q,new g(k.name,b.id(k.name),a.getUniformLocation(f,
k.name),k));n=a.getProgramParameter(f,35721);e.profile&&(c.stats.attributesCount=n);c=c.attributes;for(m=0;m<n;++m)(k=a.getActiveAttrib(f,m))&&d(c,new g(k.name,b.id(k.name),a.getAttribLocation(f,k.name),k))}var q={},t={},m={},F=[],k=0;e.profile&&(c.getMaxUniformsCount=function(){var a=0;F.forEach(function(b){b.stats.uniformsCount>a&&(a=b.stats.uniformsCount)});return a},c.getMaxAttributesCount=function(){var a=0;F.forEach(function(b){b.stats.attributesCount>a&&(a=b.stats.attributesCount)});return a});
return{clear:function(){var b=a.deleteShader.bind(a);J(q).forEach(b);q={};J(t).forEach(b);t={};F.forEach(function(b){a.deleteProgram(b.program)});F.length=0;m={};c.shaderCount=0},program:function(a,b,d,e){var g=m[b];g||(g=m[b]={});var k=g[a];if(k&&!e)return k;b=new n(b,a);c.shaderCount++;u(b,d,e);k||(g[a]=b);F.push(b);return b},restore:function(){q={};t={};for(var a=0;a<F.length;++a)u(F[a],null,F[a].attributes.map(function(a){return[a.location,a.name]}))},shader:r,frag:-1,vert:-1}}function Rb(a,b,
c,e,g,d,r){function n(d){var g;g=null===b.next?5121:b.next.colorAttachments[0].texture._texture.type;var m=0,n=0,k=e.framebufferWidth,h=e.framebufferHeight,f=null;G(d)?f=d:d&&(m=d.x|0,n=d.y|0,k=(d.width||e.framebufferWidth-m)|0,h=(d.height||e.framebufferHeight-n)|0,f=d.data||null);c();d=k*h*4;f||(5121===g?f=new Uint8Array(d):5126===g&&(f=f||new Float32Array(d)));a.pixelStorei(3333,4);a.readPixels(m,n,k,h,6408,g,f);return f}function u(a){var c;b.setFBO({framebuffer:a.framebuffer},function(){c=n(a)});
return c}return function(a){return a&&"framebuffer"in a?u(a):n(a)}}function ta(a){return Array.prototype.slice.call(a)}function Aa(a){return ta(a).join("")}function Sb(){function a(){var a=[],b=[];return H(function(){a.push.apply(a,ta(arguments))},{def:function(){var d="v"+c++;b.push(d);0<arguments.length&&(a.push(d,"="),a.push.apply(a,ta(arguments)),a.push(";"));return d},toString:function(){return Aa([0<b.length?"var "+b.join(",")+";":"",Aa(a)])}})}function b(){function b(a,e){d(a,e,"=",c.def(a,
e),";")}var c=a(),d=a(),e=c.toString,g=d.toString;return H(function(){c.apply(c,ta(arguments))},{def:c.def,entry:c,exit:d,save:b,set:function(a,d,e){b(a,d);c(a,d,"=",e,";")},toString:function(){return e()+g()}})}var c=0,e=[],g=[],d=a(),r={};return{global:d,link:function(a){for(var b=0;b<g.length;++b)if(g[b]===a)return e[b];b="g"+c++;e.push(b);g.push(a);return b},block:a,proc:function(a,c){function d(){var a="a"+e.length;e.push(a);return a}var e=[];c=c||0;for(var g=0;g<c;++g)d();var g=b(),F=g.toString;
return r[a]=H(g,{arg:d,toString:function(){return Aa(["function(",e.join(),"){",F(),"}"])}})},scope:b,cond:function(){var a=Aa(arguments),c=b(),d=b(),e=c.toString,g=d.toString;return H(c,{then:function(){c.apply(c,ta(arguments));return this},"else":function(){d.apply(d,ta(arguments));return this},toString:function(){var b=g();b&&(b="else{"+b+"}");return Aa(["if(",a,"){",e(),"}",b])}})},compile:function(){var a=['"use strict";',d,"return {"];Object.keys(r).forEach(function(b){a.push('"',b,'":',r[b].toString(),
",")});a.push("}");var b=Aa(a).replace(/;/g,";\n").replace(/}/g,"}\n").replace(/{/g,"{\n");return Function.apply(null,e.concat(b)).apply(null,g)}}}function Oa(a){return Array.isArray(a)||G(a)||X(a)}function wb(a){return a.sort(function(a,c){return"viewport"===a?-1:"viewport"===c?1:a<c?-1:1})}function P(a,b,c,e){this.thisDep=a;this.contextDep=b;this.propDep=c;this.append=e}function ua(a){return a&&!(a.thisDep||a.contextDep||a.propDep)}function C(a){return new P(!1,!1,!1,a)}function L(a,b){var c=a.type;
return 0===c?(c=a.data.length,new P(!0,1<=c,2<=c,b)):4===c?(c=a.data,new P(c.thisDep,c.contextDep,c.propDep,b)):new P(3===c,2===c,1===c,b)}function Tb(a,b,c,e,g,d,r,n,u,q,t,m,F,k,h){function f(a){return a.replace(".","_")}function p(a,b,c){var d=f(a);Ka.push(a);Ca[d]=pa[d]=!!c;qa[d]=b}function l(a,b,c){var d=f(a);Ka.push(a);Array.isArray(c)?(pa[d]=c.slice(),Ca[d]=c.slice()):pa[d]=Ca[d]=c;ra[d]=b}function v(){var a=Sb(),c=a.link,d=a.global;a.id=ta++;a.batchId="0";var e=c(ka),f=a.shared={props:"a0"};
Object.keys(ka).forEach(function(a){f[a]=d.def(e,".",a)});var g=a.next={},h=a.current={};Object.keys(ra).forEach(function(a){Array.isArray(pa[a])&&(g[a]=d.def(f.next,".",a),h[a]=d.def(f.current,".",a))});var ca=a.constants={};Object.keys(Z).forEach(function(a){ca[a]=d.def(JSON.stringify(Z[a]))});a.invoke=function(b,d){switch(d.type){case 0:var e=["this",f.context,f.props,a.batchId];return b.def(c(d.data),".call(",e.slice(0,Math.max(d.data.length+1,4)),")");case 1:return b.def(f.props,d.data);case 2:return b.def(f.context,
d.data);case 3:return b.def("this",d.data);case 4:return d.data.append(a,b),d.data.ref}};a.attribCache={};var ya={};a.scopeAttrib=function(a){a=b.id(a);if(a in ya)return ya[a];var d=q.scope[a];d||(d=q.scope[a]=new ia);return ya[a]=c(d)};return a}function Q(a){var b=a["static"];a=a.dynamic;var c;if("profile"in b){var d=!!b.profile;c=C(function(a,b){return d});c.enable=d}else if("profile"in a){var e=a.profile;c=L(e,function(a,b){return a.invoke(b,e)})}return c}function z(a,b){var c=a["static"],d=a.dynamic;
if("framebuffer"in c){var e=c.framebuffer;return e?(e=n.getFramebuffer(e),C(function(a,b){var c=a.link(e),d=a.shared;b.set(d.framebuffer,".next",c);d=d.context;b.set(d,".framebufferWidth",c+".width");b.set(d,".framebufferHeight",c+".height");return c})):C(function(a,b){var c=a.shared;b.set(c.framebuffer,".next","null");c=c.context;b.set(c,".framebufferWidth",c+".drawingBufferWidth");b.set(c,".framebufferHeight",c+".drawingBufferHeight");return"null"})}if("framebuffer"in d){var f=d.framebuffer;return L(f,
function(a,b){var c=a.invoke(b,f),d=a.shared,e=d.framebuffer,c=b.def(e,".getFramebuffer(",c,")");b.set(e,".next",c);d=d.context;b.set(d,".framebufferWidth",c+"?"+c+".width:"+d+".drawingBufferWidth");b.set(d,".framebufferHeight",c+"?"+c+".height:"+d+".drawingBufferHeight");return c})}return null}function w(a,b,c){function d(a){if(a in e){var c=e[a];a=!0;var g=c.x|0,y=c.y|0,h,U;"width"in c?h=c.width|0:a=!1;"height"in c?U=c.height|0:a=!1;return new P(!a&&b&&b.thisDep,!a&&b&&b.contextDep,!a&&b&&b.propDep,
function(a,b){var d=a.shared.context,e=h;"width"in c||(e=b.def(d,".","framebufferWidth","-",g));var f=U;"height"in c||(f=b.def(d,".","framebufferHeight","-",y));return[g,y,e,f]})}if(a in f){var k=f[a];a=L(k,function(a,b){var c=a.invoke(b,k),d=a.shared.context,e=b.def(c,".x|0"),f=b.def(c,".y|0"),g=b.def('"width" in ',c,"?",c,".width|0:","(",d,".","framebufferWidth","-",e,")"),c=b.def('"height" in ',c,"?",c,".height|0:","(",d,".","framebufferHeight","-",f,")");return[e,f,g,c]});b&&(a.thisDep=a.thisDep||
b.thisDep,a.contextDep=a.contextDep||b.contextDep,a.propDep=a.propDep||b.propDep);return a}return b?new P(b.thisDep,b.contextDep,b.propDep,function(a,b){var c=a.shared.context;return[0,0,b.def(c,".","framebufferWidth"),b.def(c,".","framebufferHeight")]}):null}var e=a["static"],f=a.dynamic;if(a=d("viewport")){var g=a;a=new P(a.thisDep,a.contextDep,a.propDep,function(a,b){var c=g.append(a,b),d=a.shared.context;b.set(d,".viewportWidth",c[2]);b.set(d,".viewportHeight",c[3]);return c})}return{viewport:a,
scissor_box:d("scissor.box")}}function H(a,b){var c=a["static"];if("string"===typeof c.frag&&"string"===typeof c.vert){if(0<Object.keys(b.dynamic).length)return null;var c=b["static"],d=Object.keys(c);if(0<d.length&&"number"===typeof c[d[0]]){for(var e=[],f=0;f<d.length;++f)e.push([c[d[f]]|0,d[f]]);return e}}return null}function E(a,c,d){function e(a){if(a in f){var c=b.id(f[a]);a=C(function(){return c});a.id=c;return a}if(a in g){var d=g[a];return L(d,function(a,b){var c=a.invoke(b,d);return b.def(a.shared.strings,
".id(",c,")")})}return null}var f=a["static"],g=a.dynamic,h=e("frag"),ca=e("vert"),ya=null;ua(h)&&ua(ca)?(ya=t.program(ca.id,h.id,null,d),a=C(function(a,b){return a.link(ya)})):a=new P(h&&h.thisDep||ca&&ca.thisDep,h&&h.contextDep||ca&&ca.contextDep,h&&h.propDep||ca&&ca.propDep,function(a,b){var c=a.shared.shader,d;d=h?h.append(a,b):b.def(c,".","frag");var e;e=ca?ca.append(a,b):b.def(c,".","vert");return b.def(c+".program("+e+","+d+")")});return{frag:h,vert:ca,progVar:a,program:ya}}function G(a,b){function c(a,
b){if(a in e){var d=e[a]|0;return C(function(a,c){b&&(a.OFFSET=d);return d})}if(a in f){var h=f[a];return L(h,function(a,c){var d=a.invoke(c,h);b&&(a.OFFSET=d);return d})}return b&&g?C(function(a,b){a.OFFSET="0";return 0}):null}var e=a["static"],f=a.dynamic,g=function(){if("elements"in e){var a=e.elements;Oa(a)?a=d.getElements(d.create(a,!0)):a&&(a=d.getElements(a));var b=C(function(b,c){if(a){var d=b.link(a);return b.ELEMENTS=d}return b.ELEMENTS=null});b.value=a;return b}if("elements"in f){var c=
f.elements;return L(c,function(a,b){var d=a.shared,e=d.isBufferArgs,d=d.elements,f=a.invoke(b,c),g=b.def("null"),e=b.def(e,"(",f,")"),f=a.cond(e).then(g,"=",d,".createStream(",f,");")["else"](g,"=",d,".getElements(",f,");");b.entry(f);b.exit(a.cond(e).then(d,".destroyStream(",g,");"));return a.ELEMENTS=g})}return null}(),h=c("offset",!0);return{elements:g,primitive:function(){if("primitive"in e){var a=e.primitive;return C(function(b,c){return Sa[a]})}if("primitive"in f){var b=f.primitive;return L(b,
function(a,c){var d=a.constants.primTypes,e=a.invoke(c,b);return c.def(d,"[",e,"]")})}return g?ua(g)?g.value?C(function(a,b){return b.def(a.ELEMENTS,".primType")}):C(function(){return 4}):new P(g.thisDep,g.contextDep,g.propDep,function(a,b){var c=a.ELEMENTS;return b.def(c,"?",c,".primType:",4)}):null}(),count:function(){if("count"in e){var a=e.count|0;return C(function(){return a})}if("count"in f){var b=f.count;return L(b,function(a,c){return a.invoke(c,b)})}return g?ua(g)?g?h?new P(h.thisDep,h.contextDep,
h.propDep,function(a,b){return b.def(a.ELEMENTS,".vertCount-",a.OFFSET)}):C(function(a,b){return b.def(a.ELEMENTS,".vertCount")}):C(function(){return-1}):new P(g.thisDep||h.thisDep,g.contextDep||h.contextDep,g.propDep||h.propDep,function(a,b){var c=a.ELEMENTS;return a.OFFSET?b.def(c,"?",c,".vertCount-",a.OFFSET,":-1"):b.def(c,"?",c,".vertCount:-1")}):null}(),instances:c("instances",!1),offset:h}}function R(a,b){var c=a["static"],d=a.dynamic,e={};Ka.forEach(function(a){function b(f,h){if(a in c){var y=
f(c[a]);e[g]=C(function(){return y})}else if(a in d){var I=d[a];e[g]=L(I,function(a,b){return h(a,b,a.invoke(b,I))})}}var g=f(a);switch(a){case "cull.enable":case "blend.enable":case "dither":case "stencil.enable":case "depth.enable":case "scissor.enable":case "polygonOffset.enable":case "sample.alpha":case "sample.enable":case "depth.mask":return b(function(a){return a},function(a,b,c){return c});case "depth.func":return b(function(a){return $a[a]},function(a,b,c){return b.def(a.constants.compareFuncs,
"[",c,"]")});case "depth.range":return b(function(a){return a},function(a,b,c){a=b.def("+",c,"[0]");b=b.def("+",c,"[1]");return[a,b]});case "blend.func":return b(function(a){return[Ea["srcRGB"in a?a.srcRGB:a.src],Ea["dstRGB"in a?a.dstRGB:a.dst],Ea["srcAlpha"in a?a.srcAlpha:a.src],Ea["dstAlpha"in a?a.dstAlpha:a.dst]]},function(a,b,c){function d(a,e){return b.def('"',a,e,'" in ',c,"?",c,".",a,e,":",c,".",a)}a=a.constants.blendFuncs;var e=d("src","RGB"),f=d("dst","RGB"),e=b.def(a,"[",e,"]"),g=b.def(a,
"[",d("src","Alpha"),"]"),f=b.def(a,"[",f,"]");a=b.def(a,"[",d("dst","Alpha"),"]");return[e,f,g,a]});case "blend.equation":return b(function(a){if("string"===typeof a)return[W[a],W[a]];if("object"===typeof a)return[W[a.rgb],W[a.alpha]]},function(a,b,c){var d=a.constants.blendEquations,e=b.def(),f=b.def();a=a.cond("typeof ",c,'==="string"');a.then(e,"=",f,"=",d,"[",c,"];");a["else"](e,"=",d,"[",c,".rgb];",f,"=",d,"[",c,".alpha];");b(a);return[e,f]});case "blend.color":return b(function(a){return A(4,
function(b){return+a[b]})},function(a,b,c){return A(4,function(a){return b.def("+",c,"[",a,"]")})});case "stencil.mask":return b(function(a){return a|0},function(a,b,c){return b.def(c,"|0")});case "stencil.func":return b(function(a){return[$a[a.cmp||"keep"],a.ref||0,"mask"in a?a.mask:-1]},function(a,b,c){a=b.def('"cmp" in ',c,"?",a.constants.compareFuncs,"[",c,".cmp]",":",7680);var d=b.def(c,".ref|0");b=b.def('"mask" in ',c,"?",c,".mask|0:-1");return[a,d,b]});case "stencil.opFront":case "stencil.opBack":return b(function(b){return["stencil.opBack"===
a?1029:1028,Pa[b.fail||"keep"],Pa[b.zfail||"keep"],Pa[b.zpass||"keep"]]},function(b,c,d){function e(a){return c.def('"',a,'" in ',d,"?",f,"[",d,".",a,"]:",7680)}var f=b.constants.stencilOps;return["stencil.opBack"===a?1029:1028,e("fail"),e("zfail"),e("zpass")]});case "polygonOffset.offset":return b(function(a){return[a.factor|0,a.units|0]},function(a,b,c){a=b.def(c,".factor|0");b=b.def(c,".units|0");return[a,b]});case "cull.face":return b(function(a){var b=0;"front"===a?b=1028:"back"===a&&(b=1029);
return b},function(a,b,c){return b.def(c,'==="front"?',1028,":",1029)});case "lineWidth":return b(function(a){return a},function(a,b,c){return c});case "frontFace":return b(function(a){return xb[a]},function(a,b,c){return b.def(c+'==="cw"?2304:2305')});case "colorMask":return b(function(a){return a.map(function(a){return!!a})},function(a,b,c){return A(4,function(a){return"!!"+c+"["+a+"]"})});case "sample.coverage":return b(function(a){return["value"in a?a.value:1,!!a.invert]},function(a,b,c){a=b.def('"value" in ',
c,"?+",c,".value:1");b=b.def("!!",c,".invert");return[a,b]})}});return e}function sa(a,b){var c=a["static"],d=a.dynamic,e={};Object.keys(c).forEach(function(a){var b=c[a],d;if("number"===typeof b||"boolean"===typeof b)d=C(function(){return b});else if("function"===typeof b){var f=b._reglType;if("texture2d"===f||"textureCube"===f)d=C(function(a){return a.link(b)});else if("framebuffer"===f||"framebufferCube"===f)d=C(function(a){return a.link(b.color[0])})}else na(b)&&(d=C(function(a){return a.global.def("[",
A(b.length,function(a){return b[a]}),"]")}));d.value=b;e[a]=d});Object.keys(d).forEach(function(a){var b=d[a];e[a]=L(b,function(a,c){return a.invoke(c,b)})});return e}function J(a,c){var d=a["static"],e=a.dynamic,f={};Object.keys(d).forEach(function(a){var c=d[a],e=b.id(a),h=new ia;if(Oa(c))h.state=1,h.buffer=g.getBuffer(g.create(c,34962,!1,!0)),h.type=0;else{var y=g.getBuffer(c);if(y)h.state=1,h.buffer=y,h.type=0;else if("constant"in c){var I=c.constant;h.buffer="null";h.state=2;"number"===typeof I?
h.x=I:Ba.forEach(function(a,b){b<I.length&&(h[a]=I[b])})}else{var y=Oa(c.buffer)?g.getBuffer(g.create(c.buffer,34962,!1,!0)):g.getBuffer(c.buffer),k=c.offset|0,m=c.stride|0,da=c.size|0,n=!!c.normalized,l=0;"type"in c&&(l=Ha[c.type]);c=c.divisor|0;h.buffer=y;h.state=1;h.size=da;h.normalized=n;h.type=l||y.dtype;h.offset=k;h.stride=m;h.divisor=c}}f[a]=C(function(a,b){var c=a.attribCache;if(e in c)return c[e];var d={isStream:!1};Object.keys(h).forEach(function(a){d[a]=h[a]});h.buffer&&(d.buffer=a.link(h.buffer),
d.type=d.type||d.buffer+".dtype");return c[e]=d})});Object.keys(e).forEach(function(a){var b=e[a];f[a]=L(b,function(a,c){function d(a){c(y[a],"=",e,".",a,"|0;")}var e=a.invoke(c,b),f=a.shared,g=a.constants,h=f.isBufferArgs,f=f.buffer,y={isStream:c.def(!1)},I=new ia;I.state=1;Object.keys(I).forEach(function(a){y[a]=c.def(""+I[a])});var k=y.buffer,U=y.type;c("if(",h,"(",e,")){",y.isStream,"=true;",k,"=",f,".createStream(",34962,",",e,");",U,"=",k,".dtype;","}else{",k,"=",f,".getBuffer(",e,");","if(",
k,"){",U,"=",k,".dtype;",'}else if("constant" in ',e,"){",y.state,"=",2,";","if(typeof "+e+'.constant === "number"){',y[Ba[0]],"=",e,".constant;",Ba.slice(1).map(function(a){return y[a]}).join("="),"=0;","}else{",Ba.map(function(a,b){return y[a]+"="+e+".constant.length>"+b+"?"+e+".constant["+b+"]:0;"}).join(""),"}}else{","if(",h,"(",e,".buffer)){",k,"=",f,".createStream(",34962,",",e,".buffer);","}else{",k,"=",f,".getBuffer(",e,".buffer);","}",U,'="type" in ',e,"?",g.glTypes,"[",e,".type]:",k,".dtype;",
y.normalized,"=!!",e,".normalized;");d("size");d("offset");d("stride");d("divisor");c("}}");c.exit("if(",y.isStream,"){",f,".destroyStream(",k,");","}");return y})});return f}function D(a,b){var c=a["static"],d=a.dynamic;if("vao"in c){var e=c.vao;null!==e&&null===q.getVAO(e)&&(e=q.createVAO(e));return C(function(a){return a.link(q.getVAO(e))})}if("vao"in d){var f=d.vao;return L(f,function(a,b){var c=a.invoke(b,f);return b.def(a.shared.vao+".getVAO("+c+")")})}return null}function x(a){var b=a["static"],
c=a.dynamic,d={};Object.keys(b).forEach(function(a){var c=b[a];d[a]=C(function(a,b){return"number"===typeof c||"boolean"===typeof c?""+c:a.link(c)})});Object.keys(c).forEach(function(a){var b=c[a];d[a]=L(b,function(a,c){return a.invoke(c,b)})});return d}function la(a,b,d,e,g){function h(a){var b=n[a];b&&(Za[a]=b)}var k=H(a,b),m=z(a,g),n=w(a,m,g),l=G(a,g),Za=R(a,g),p=E(a,g,k);h("viewport");h(f("scissor.box"));var r=0<Object.keys(Za).length,m={framebuffer:m,draw:l,shader:p,state:Za,dirty:r,scopeVAO:null,
drawVAO:null,useVAO:!1,attributes:{}};m.profile=Q(a,g);m.uniforms=sa(d,g);m.drawVAO=m.scopeVAO=D(a,g);if(!m.drawVAO&&p.program&&!k&&c.angle_instanced_arrays){var t=!0;a=p.program.attributes.map(function(a){a=b["static"][a];t=t&&!!a;return a});if(t&&0<a.length){var v=q.getVAO(q.createVAO(a));m.drawVAO=new P(null,null,null,function(a,b){return a.link(v)});m.useVAO=!0}}k?m.useVAO=!0:m.attributes=J(b,g);m.context=x(e,g);return m}function T(a,b,c){var d=a.shared.context,e=a.scope();Object.keys(c).forEach(function(f){b.save(d,
"."+f);e(d,".",f,"=",c[f].append(a,b),";")});b(e)}function O(a,b,c,d){var e=a.shared,f=e.gl,g=e.framebuffer,h;Ja&&(h=b.def(e.extensions,".webgl_draw_buffers"));var k=a.constants,e=k.drawBuffer,k=k.backBuffer;a=c?c.append(a,b):b.def(g,".next");d||b("if(",a,"!==",g,".cur){");b("if(",a,"){",f,".bindFramebuffer(",36160,",",a,".framebuffer);");Ja&&b(h,".drawBuffersWEBGL(",e,"[",a,".colorAttachments.length]);");b("}else{",f,".bindFramebuffer(",36160,",null);");Ja&&b(h,".drawBuffersWEBGL(",k,");");b("}",
g,".cur=",a,";");d||b("}")}function S(a,b,c){var d=a.shared,e=d.gl,g=a.current,h=a.next,k=d.current,m=d.next,n=a.cond(k,".dirty");Ka.forEach(function(b){b=f(b);if(!(b in c.state)){var d,I;if(b in h){d=h[b];I=g[b];var l=A(pa[b].length,function(a){return n.def(d,"[",a,"]")});n(a.cond(l.map(function(a,b){return a+"!=="+I+"["+b+"]"}).join("||")).then(e,".",ra[b],"(",l,");",l.map(function(a,b){return I+"["+b+"]="+a}).join(";"),";"))}else d=n.def(m,".",b),l=a.cond(d,"!==",k,".",b),n(l),b in qa?l(a.cond(d).then(e,
".enable(",qa[b],");")["else"](e,".disable(",qa[b],");"),k,".",b,"=",d,";"):l(e,".",ra[b],"(",d,");",k,".",b,"=",d,";")}});0===Object.keys(c.state).length&&n(k,".dirty=false;");b(n)}function K(a,b,c,d){var e=a.shared,f=a.current,g=e.current,h=e.gl;wb(Object.keys(c)).forEach(function(e){var k=c[e];if(!d||d(k)){var m=k.append(a,b);if(qa[e]){var n=qa[e];ua(k)?m?b(h,".enable(",n,");"):b(h,".disable(",n,");"):b(a.cond(m).then(h,".enable(",n,");")["else"](h,".disable(",n,");"));b(g,".",e,"=",m,";")}else if(na(m)){var l=
f[e];b(h,".",ra[e],"(",m,");",m.map(function(a,b){return l+"["+b+"]="+a}).join(";"),";")}else b(h,".",ra[e],"(",m,");",g,".",e,"=",m,";")}})}function B(a,b){oa&&(a.instancing=b.def(a.shared.extensions,".angle_instanced_arrays"))}function V(a,b,c,d,e){function f(){return"undefined"===typeof performance?"Date.now()":"performance.now()"}function g(a){q=b.def();a(q,"=",f(),";");"string"===typeof e?a(l,".count+=",e,";"):a(l,".count++;");k&&(d?(t=b.def(),a(t,"=",r,".getNumPendingQueries();")):a(r,".beginQuery(",
l,");"))}function h(a){a(l,".cpuTime+=",f(),"-",q,";");k&&(d?a(r,".pushScopeStats(",t,",",r,".getNumPendingQueries(),",l,");"):a(r,".endQuery();"))}function m(a){var c=b.def(p,".profile");b(p,".profile=",a,";");b.exit(p,".profile=",c,";")}var n=a.shared,l=a.stats,p=n.current,r=n.timer;c=c.profile;var q,t;if(c){if(ua(c)){c.enable?(g(b),h(b.exit),m("true")):m("false");return}c=c.append(a,b);m(c)}else c=b.def(p,".profile");n=a.block();g(n);b("if(",c,"){",n,"}");a=a.block();h(a);b.exit("if(",c,"){",a,
"}")}function N(a,b,c,d,e){function f(a){switch(a){case 35664:case 35667:case 35671:return 2;case 35665:case 35668:case 35672:return 3;case 35666:case 35669:case 35673:return 4;default:return 1}}function g(c,d,e){function f(){b("if(!",l,".buffer){",m,".enableVertexAttribArray(",n,");}");var c=e.type,g;g=e.size?b.def(e.size,"||",d):d;b("if(",l,".type!==",c,"||",l,".size!==",g,"||",da.map(function(a){return l+"."+a+"!=="+e[a]}).join("||"),"){",m,".bindBuffer(",34962,",",U,".buffer);",m,".vertexAttribPointer(",
[n,g,c,e.normalized,e.stride,e.offset],");",l,".type=",c,";",l,".size=",g,";",da.map(function(a){return l+"."+a+"="+e[a]+";"}).join(""),"}");oa&&(c=e.divisor,b("if(",l,".divisor!==",c,"){",a.instancing,".vertexAttribDivisorANGLE(",[n,c],");",l,".divisor=",c,";}"))}function k(){b("if(",l,".buffer){",m,".disableVertexAttribArray(",n,");",l,".buffer=null;","}if(",Ba.map(function(a,b){return l+"."+a+"!=="+p[b]}).join("||"),"){",m,".vertexAttrib4f(",n,",",p,");",Ba.map(function(a,b){return l+"."+a+"="+
p[b]+";"}).join(""),"}")}var m=h.gl,n=b.def(c,".location"),l=b.def(h.attributes,"[",n,"]");c=e.state;var U=e.buffer,p=[e.x,e.y,e.z,e.w],da=["buffer","normalized","offset","stride"];1===c?f():2===c?k():(b("if(",c,"===",1,"){"),f(),b("}else{"),k(),b("}"))}var h=a.shared;d.forEach(function(d){var h=d.name,k=c.attributes[h],m;if(k){if(!e(k))return;m=k.append(a,b)}else{if(!e(yb))return;var n=a.scopeAttrib(h);m={};Object.keys(new ia).forEach(function(a){m[a]=b.def(n,".",a)})}g(a.link(d),f(d.info.type),
m)})}function wa(a,c,d,e,f){for(var g=a.shared,h=g.gl,k,m=0;m<e.length;++m){var n=e[m],l=n.name,p=n.info.type,r=d.uniforms[l],n=a.link(n)+".location",q;if(r){if(!f(r))continue;if(ua(r)){l=r.value;if(35678===p||35680===p)p=a.link(l._texture||l.color[0]._texture),c(h,".uniform1i(",n,",",p+".bind());"),c.exit(p,".unbind();");else if(35674===p||35675===p||35676===p)l=a.global.def("new Float32Array(["+Array.prototype.slice.call(l)+"])"),r=2,35675===p?r=3:35676===p&&(r=4),c(h,".uniformMatrix",r,"fv(",n,
",false,",l,");");else{switch(p){case 5126:k="1f";break;case 35664:k="2f";break;case 35665:k="3f";break;case 35666:k="4f";break;case 35670:k="1i";break;case 5124:k="1i";break;case 35671:k="2i";break;case 35667:k="2i";break;case 35672:k="3i";break;case 35668:k="3i";break;case 35673:k="4i";break;case 35669:k="4i"}c(h,".uniform",k,"(",n,",",na(l)?Array.prototype.slice.call(l):l,");")}continue}else q=r.append(a,c)}else{if(!f(yb))continue;q=c.def(g.uniforms,"[",b.id(l),"]")}35678===p?c("if(",q,"&&",q,
'._reglType==="framebuffer"){',q,"=",q,".color[0];","}"):35680===p&&c("if(",q,"&&",q,'._reglType==="framebufferCube"){',q,"=",q,".color[0];","}");l=1;switch(p){case 35678:case 35680:p=c.def(q,"._texture");c(h,".uniform1i(",n,",",p,".bind());");c.exit(p,".unbind();");continue;case 5124:case 35670:k="1i";break;case 35667:case 35671:k="2i";l=2;break;case 35668:case 35672:k="3i";l=3;break;case 35669:case 35673:k="4i";l=4;break;case 5126:k="1f";break;case 35664:k="2f";l=2;break;case 35665:k="3f";l=3;break;
case 35666:k="4f";l=4;break;case 35674:k="Matrix2fv";break;case 35675:k="Matrix3fv";break;case 35676:k="Matrix4fv"}c(h,".uniform",k,"(",n,",");if("M"===k.charAt(0)){var n=Math.pow(p-35674+2,2),t=a.global.def("new Float32Array(",n,")");c("false,(Array.isArray(",q,")||",q," instanceof Float32Array)?",q,":(",A(n,function(a){return t+"["+a+"]="+q+"["+a+"]"}),",",t,")")}else 1<l?c(A(l,function(a){return q+"["+a+"]"})):c(q);c(");")}}function aa(a,b,c,d){function e(f){var g=l[f];return g?g.contextDep&&d.contextDynamic||
g.propDep?g.append(a,c):g.append(a,b):b.def(m,".",f)}function f(){function a(){c(v,".drawElementsInstancedANGLE(",[p,r,u,q+"<<(("+u+"-5121)>>1)",t],");")}function b(){c(v,".drawArraysInstancedANGLE(",[p,q,r,t],");")}n?ba?a():(c("if(",n,"){"),a(),c("}else{"),b(),c("}")):b()}function g(){function a(){c(k+".drawElements("+[p,r,u,q+"<<(("+u+"-5121)>>1)"]+");")}function b(){c(k+".drawArrays("+[p,q,r]+");")}n?ba?a():(c("if(",n,"){"),a(),c("}else{"),b(),c("}")):b()}var h=a.shared,k=h.gl,m=h.draw,l=d.draw,
n=function(){var e=l.elements,f=b;if(e){if(e.contextDep&&d.contextDynamic||e.propDep)f=c;e=e.append(a,f)}else e=f.def(m,".","elements");e&&f("if("+e+")"+k+".bindBuffer(34963,"+e+".buffer.buffer);");return e}(),p=e("primitive"),q=e("offset"),r=function(){var e=l.count,f=b;if(e){if(e.contextDep&&d.contextDynamic||e.propDep)f=c;e=e.append(a,f)}else e=f.def(m,".","count");return e}();if("number"===typeof r){if(0===r)return}else c("if(",r,"){"),c.exit("}");var t,v;oa&&(t=e("instances"),v=a.instancing);
var u=n+".type",ba=l.elements&&ua(l.elements);oa&&("number"!==typeof t||0<=t)?"string"===typeof t?(c("if(",t,">0){"),f(),c("}else if(",t,"<0){"),g(),c("}")):f():g()}function xa(a,b,c,d,e){b=v();e=b.proc("body",e);oa&&(b.instancing=e.def(b.shared.extensions,".angle_instanced_arrays"));a(b,e,c,d);return b.compile().body}function ba(a,b,c,d){B(a,b);c.useVAO?c.drawVAO?b(a.shared.vao,".setVAO(",c.drawVAO.append(a,b),");"):b(a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);"):(b(a.shared.vao,".setVAO(null);"),
N(a,b,c,d.attributes,function(){return!0}));wa(a,b,c,d.uniforms,function(){return!0});aa(a,b,b,c)}function Da(a,b){var c=a.proc("draw",1);B(a,c);T(a,c,b.context);O(a,c,b.framebuffer);S(a,c,b);K(a,c,b.state);V(a,c,b,!1,!0);var d=b.shader.progVar.append(a,c);c(a.shared.gl,".useProgram(",d,".program);");if(b.shader.program)ba(a,c,b,b.shader.program);else{c(a.shared.vao,".setVAO(null);");var e=a.global.def("{}"),f=c.def(d,".id"),g=c.def(e,"[",f,"]");c(a.cond(g).then(g,".call(this,a0);")["else"](g,"=",
e,"[",f,"]=",a.link(function(c){return xa(ba,a,b,c,1)}),"(",d,");",g,".call(this,a0);"))}0<Object.keys(b.state).length&&c(a.shared.current,".dirty=true;")}function fa(a,b,c,d){function e(){return!0}a.batchId="a1";B(a,b);N(a,b,c,d.attributes,e);wa(a,b,c,d.uniforms,e);aa(a,b,b,c)}function M(a,b,c,d){function e(a){return a.contextDep&&g||a.propDep}function f(a){return!e(a)}B(a,b);var g=c.contextDep,h=b.def(),k=b.def();a.shared.props=k;a.batchId=h;var m=a.scope(),l=a.scope();b(m.entry,"for(",h,"=0;",
h,"<","a1",";++",h,"){",k,"=","a0","[",h,"];",l,"}",m.exit);c.needsContext&&T(a,l,c.context);c.needsFramebuffer&&O(a,l,c.framebuffer);K(a,l,c.state,e);c.profile&&e(c.profile)&&V(a,l,c,!1,!0);d?(c.useVAO?c.drawVAO?e(c.drawVAO)?l(a.shared.vao,".setVAO(",c.drawVAO.append(a,l),");"):m(a.shared.vao,".setVAO(",c.drawVAO.append(a,m),");"):m(a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);"):(m(a.shared.vao,".setVAO(null);"),N(a,m,c,d.attributes,f),N(a,l,c,d.attributes,e)),wa(a,m,c,d.uniforms,f),wa(a,l,
c,d.uniforms,e),aa(a,m,l,c)):(b=a.global.def("{}"),d=c.shader.progVar.append(a,l),k=l.def(d,".id"),m=l.def(b,"[",k,"]"),l(a.shared.gl,".useProgram(",d,".program);","if(!",m,"){",m,"=",b,"[",k,"]=",a.link(function(b){return xa(fa,a,c,b,2)}),"(",d,");}",m,".call(this,a0[",h,"],",h,");"))}function X(a,b){function c(a){return a.contextDep&&e||a.propDep}var d=a.proc("batch",2);a.batchId="0";B(a,d);var e=!1,f=!0;Object.keys(b.context).forEach(function(a){e=e||b.context[a].propDep});e||(T(a,d,b.context),
f=!1);var g=b.framebuffer,h=!1;g?(g.propDep?e=h=!0:g.contextDep&&e&&(h=!0),h||O(a,d,g)):O(a,d,null);b.state.viewport&&b.state.viewport.propDep&&(e=!0);S(a,d,b);K(a,d,b.state,function(a){return!c(a)});b.profile&&c(b.profile)||V(a,d,b,!1,"a1");b.contextDep=e;b.needsContext=f;b.needsFramebuffer=h;f=b.shader.progVar;if(f.contextDep&&e||f.propDep)M(a,d,b,null);else if(f=f.append(a,d),d(a.shared.gl,".useProgram(",f,".program);"),b.shader.program)M(a,d,b,b.shader.program);else{d(a.shared.vao,".setVAO(null);");
var g=a.global.def("{}"),h=d.def(f,".id"),k=d.def(g,"[",h,"]");d(a.cond(k).then(k,".call(this,a0,a1);")["else"](k,"=",g,"[",h,"]=",a.link(function(c){return xa(M,a,b,c,2)}),"(",f,");",k,".call(this,a0,a1);"))}0<Object.keys(b.state).length&&d(a.shared.current,".dirty=true;")}function Y(a,c){function d(b){var g=c.shader[b];g&&e.set(f.shader,"."+b,g.append(a,e))}var e=a.proc("scope",3);a.batchId="a2";var f=a.shared,g=f.current;T(a,e,c.context);c.framebuffer&&c.framebuffer.append(a,e);wb(Object.keys(c.state)).forEach(function(b){var d=
c.state[b].append(a,e);na(d)?d.forEach(function(c,d){e.set(a.next[b],"["+d+"]",c)}):e.set(f.next,"."+b,d)});V(a,e,c,!0,!0);["elements","offset","count","instances","primitive"].forEach(function(b){var d=c.draw[b];d&&e.set(f.draw,"."+b,""+d.append(a,e))});Object.keys(c.uniforms).forEach(function(d){e.set(f.uniforms,"["+b.id(d)+"]",c.uniforms[d].append(a,e))});Object.keys(c.attributes).forEach(function(b){var d=c.attributes[b].append(a,e),f=a.scopeAttrib(b);Object.keys(new ia).forEach(function(a){e.set(f,
"."+a,d[a])})});c.scopeVAO&&e.set(f.vao,".targetVAO",c.scopeVAO.append(a,e));d("vert");d("frag");0<Object.keys(c.state).length&&(e(g,".dirty=true;"),e.exit(g,".dirty=true;"));e("a1(",a.shared.context,",a0,",a.batchId,");")}function ha(a){if("object"===typeof a&&!na(a)){for(var b=Object.keys(a),c=0;c<b.length;++c)if(ga.isDynamic(a[b[c]]))return!0;return!1}}function ja(a,b,c){function d(a,b){g.forEach(function(c){var d=e[c];ga.isDynamic(d)&&(d=a.invoke(b,d),b(l,".",c,"=",d,";"))})}var e=b["static"][c];
if(e&&ha(e)){var f=a.global,g=Object.keys(e),h=!1,k=!1,m=!1,l=a.global.def("{}");g.forEach(function(b){var c=e[b];if(ga.isDynamic(c))"function"===typeof c&&(c=e[b]=ga.unbox(c)),b=L(c,null),h=h||b.thisDep,m=m||b.propDep,k=k||b.contextDep;else{f(l,".",b,"=");switch(typeof c){case "number":f(c);break;case "string":f('"',c,'"');break;case "object":Array.isArray(c)&&f("[",c.join(),"]");break;default:f(a.link(c))}f(";")}});b.dynamic[c]=new ga.DynamicVariable(4,{thisDep:h,contextDep:k,propDep:m,ref:l,append:d});
delete b["static"][c]}}var ia=q.Record,W={add:32774,subtract:32778,"reverse subtract":32779};c.ext_blend_minmax&&(W.min=32775,W.max=32776);var oa=c.angle_instanced_arrays,Ja=c.webgl_draw_buffers,pa={dirty:!0,profile:h.profile},Ca={},Ka=[],qa={},ra={};p("dither",3024);p("blend.enable",3042);l("blend.color","blendColor",[0,0,0,0]);l("blend.equation","blendEquationSeparate",[32774,32774]);l("blend.func","blendFuncSeparate",[1,0,1,0]);p("depth.enable",2929,!0);l("depth.func","depthFunc",513);l("depth.range",
"depthRange",[0,1]);l("depth.mask","depthMask",!0);l("colorMask","colorMask",[!0,!0,!0,!0]);p("cull.enable",2884);l("cull.face","cullFace",1029);l("frontFace","frontFace",2305);l("lineWidth","lineWidth",1);p("polygonOffset.enable",32823);l("polygonOffset.offset","polygonOffset",[0,0]);p("sample.alpha",32926);p("sample.enable",32928);l("sample.coverage","sampleCoverage",[1,!1]);p("stencil.enable",2960);l("stencil.mask","stencilMask",-1);l("stencil.func","stencilFunc",[519,0,-1]);l("stencil.opFront",
"stencilOpSeparate",[1028,7680,7680,7680]);l("stencil.opBack","stencilOpSeparate",[1029,7680,7680,7680]);p("scissor.enable",3089);l("scissor.box","scissor",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);l("viewport","viewport",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);var ka={gl:a,context:F,strings:b,next:Ca,current:pa,draw:m,elements:d,buffer:g,shader:t,attributes:q.state,vao:q,uniforms:u,framebuffer:n,extensions:c,timer:k,isBufferArgs:Oa},Z={primTypes:Sa,compareFuncs:$a,blendFuncs:Ea,
blendEquations:W,stencilOps:Pa,glTypes:Ha,orientationType:xb};Ja&&(Z.backBuffer=[1029],Z.drawBuffer=A(e.maxDrawbuffers,function(a){return 0===a?[0]:A(a,function(a){return 36064+a})}));var ta=0;return{next:Ca,current:pa,procs:function(){var a=v(),b=a.proc("poll"),d=a.proc("refresh"),f=a.block();b(f);d(f);var g=a.shared,h=g.gl,k=g.next,m=g.current;f(m,".dirty=false;");O(a,b);O(a,d,null,!0);var l;oa&&(l=a.link(oa));c.oes_vertex_array_object&&d(a.link(c.oes_vertex_array_object),".bindVertexArrayOES(null);");
for(var n=0;n<e.maxAttributes;++n){var p=d.def(g.attributes,"[",n,"]"),q=a.cond(p,".buffer");q.then(h,".enableVertexAttribArray(",n,");",h,".bindBuffer(",34962,",",p,".buffer.buffer);",h,".vertexAttribPointer(",n,",",p,".size,",p,".type,",p,".normalized,",p,".stride,",p,".offset);")["else"](h,".disableVertexAttribArray(",n,");",h,".vertexAttrib4f(",n,",",p,".x,",p,".y,",p,".z,",p,".w);",p,".buffer=null;");d(q);oa&&d(l,".vertexAttribDivisorANGLE(",n,",",p,".divisor);")}d(a.shared.vao,".currentVAO=null;",
a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);");Object.keys(qa).forEach(function(c){var e=qa[c],g=f.def(k,".",c),l=a.block();l("if(",g,"){",h,".enable(",e,")}else{",h,".disable(",e,")}",m,".",c,"=",g,";");d(l);b("if(",g,"!==",m,".",c,"){",l,"}")});Object.keys(ra).forEach(function(c){var e=ra[c],g=pa[c],l,n,p=a.block();p(h,".",e,"(");na(g)?(e=g.length,l=a.global.def(k,".",c),n=a.global.def(m,".",c),p(A(e,function(a){return l+"["+a+"]"}),");",A(e,function(a){return n+"["+a+"]="+l+"["+a+"];"}).join("")),
b("if(",A(e,function(a){return l+"["+a+"]!=="+n+"["+a+"]"}).join("||"),"){",p,"}")):(l=f.def(k,".",c),n=f.def(m,".",c),p(l,");",m,".",c,"=",l,";"),b("if(",l,"!==",n,"){",p,"}"));d(p)});return a.compile()}(),compile:function(a,b,c,d,e){var f=v();f.stats=f.link(e);Object.keys(b["static"]).forEach(function(a){ja(f,b,a)});Ub.forEach(function(b){ja(f,a,b)});c=la(a,b,c,d,f);Da(f,c);Y(f,c);X(f,c);return f.compile()}}}function zb(a,b){for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}var H=function(a,
b){for(var c=Object.keys(b),e=0;e<c.length;++e)a[c[e]]=b[c[e]];return a},Bb=0,ga={DynamicVariable:ja,define:function(a,b){return new ja(a,bb(b+""))},isDynamic:function(a){return"function"===typeof a&&!a._reglType||a instanceof ja},unbox:function(a,b){return"function"===typeof a?new ja(0,a):a},accessor:bb},ab={next:"function"===typeof requestAnimationFrame?function(a){return requestAnimationFrame(a)}:function(a){return setTimeout(a,16)},cancel:"function"===typeof cancelAnimationFrame?function(a){return cancelAnimationFrame(a)}:
clearTimeout},Ab="undefined"!==typeof performance&&performance.now?function(){return performance.now()}:function(){return+new Date},z=fb();z.zero=fb();var Vb=function(a,b){var c=1;b.ext_texture_filter_anisotropic&&(c=a.getParameter(34047));var e=1,g=1;b.webgl_draw_buffers&&(e=a.getParameter(34852),g=a.getParameter(36063));var d=!!b.oes_texture_float;if(d){d=a.createTexture();a.bindTexture(3553,d);a.texImage2D(3553,0,6408,1,1,0,6408,5126,null);var r=a.createFramebuffer();a.bindFramebuffer(36160,r);
a.framebufferTexture2D(36160,36064,3553,d,0);a.bindTexture(3553,null);if(36053!==a.checkFramebufferStatus(36160))d=!1;else{a.viewport(0,0,1,1);a.clearColor(1,0,0,1);a.clear(16384);var n=z.allocType(5126,4);a.readPixels(0,0,1,1,6408,5126,n);a.getError()?d=!1:(a.deleteFramebuffer(r),a.deleteTexture(d),d=1===n[0]);z.freeType(n)}}n=!0;"undefined"!==typeof navigator&&(/MSIE/.test(navigator.userAgent)||/Trident\//.test(navigator.appVersion)||/Edge/.test(navigator.userAgent))||(n=a.createTexture(),r=z.allocType(5121,
36),a.activeTexture(33984),a.bindTexture(34067,n),a.texImage2D(34069,0,6408,3,3,0,6408,5121,r),z.freeType(r),a.bindTexture(34067,null),a.deleteTexture(n),n=!a.getError());return{colorBits:[a.getParameter(3410),a.getParameter(3411),a.getParameter(3412),a.getParameter(3413)],depthBits:a.getParameter(3414),stencilBits:a.getParameter(3415),subpixelBits:a.getParameter(3408),extensions:Object.keys(b).filter(function(a){return!!b[a]}),maxAnisotropic:c,maxDrawbuffers:e,maxColorAttachments:g,pointSizeDims:a.getParameter(33901),
lineWidthDims:a.getParameter(33902),maxViewportDims:a.getParameter(3386),maxCombinedTextureUnits:a.getParameter(35661),maxCubeMapSize:a.getParameter(34076),maxRenderbufferSize:a.getParameter(34024),maxTextureUnits:a.getParameter(34930),maxTextureSize:a.getParameter(3379),maxAttributes:a.getParameter(34921),maxVertexUniforms:a.getParameter(36347),maxVertexTextureUnits:a.getParameter(35660),maxVaryingVectors:a.getParameter(36348),maxFragmentUniforms:a.getParameter(36349),glsl:a.getParameter(35724),
renderer:a.getParameter(7937),vendor:a.getParameter(7936),version:a.getParameter(7938),readFloat:d,npotTextureCube:n}},G=function(a){return a instanceof Uint8Array||a instanceof Uint16Array||a instanceof Uint32Array||a instanceof Int8Array||a instanceof Int16Array||a instanceof Int32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof Uint8ClampedArray},J=function(a){return Object.keys(a).map(function(b){return a[b]})},Ma={shape:function(a){for(var b=[];a.length;a=a[0])b.push(a.length);
return b},flatten:function(a,b,c,e){var g=1;if(b.length)for(var d=0;d<b.length;++d)g*=b[d];else g=0;c=e||z.allocType(c,g);switch(b.length){case 0:break;case 1:e=b[0];for(b=0;b<e;++b)c[b]=a[b];break;case 2:e=b[0];b=b[1];for(d=g=0;d<e;++d)for(var r=a[d],n=0;n<b;++n)c[g++]=r[n];break;case 3:gb(a,b[0],b[1],b[2],c,0);break;default:hb(a,b,0,c,0)}return c}},Ga={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,
"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121},Ha={int8:5120,int16:5122,int32:5124,uint8:5121,uint16:5123,uint32:5125,"float":5126,float32:5126},lb={dynamic:35048,stream:35040,"static":35044},Qa=Ma.flatten,kb=Ma.shape,ha=[];ha[5120]=1;ha[5122]=2;ha[5124]=4;ha[5121]=1;ha[5123]=2;ha[5125]=4;ha[5126]=4;var Sa={points:0,point:0,lines:1,line:1,triangles:4,triangle:4,"line loop":2,"line strip":3,"triangle strip":5,"triangle fan":6},ob=
new Float32Array(1),Jb=new Uint32Array(ob.buffer),Nb=[9984,9986,9985,9987],La=[0,6409,6410,6407,6408],S={};S[6409]=S[6406]=S[6402]=1;S[34041]=S[6410]=2;S[6407]=S[35904]=3;S[6408]=S[35906]=4;var Va=ka("HTMLCanvasElement"),Wa=ka("OffscreenCanvas"),sb=ka("CanvasRenderingContext2D"),tb=ka("ImageBitmap"),ub=ka("HTMLImageElement"),vb=ka("HTMLVideoElement"),Kb=Object.keys(Ga).concat([Va,Wa,sb,tb,ub,vb]),Z=[];Z[5121]=1;Z[5126]=4;Z[36193]=2;Z[5123]=2;Z[5125]=4;var w=[];w[32854]=2;w[32855]=2;w[36194]=2;w[34041]=
4;w[33776]=.5;w[33777]=.5;w[33778]=1;w[33779]=1;w[35986]=.5;w[35987]=1;w[34798]=1;w[35840]=.5;w[35841]=.25;w[35842]=.5;w[35843]=.25;w[36196]=.5;var E=[];E[32854]=2;E[32855]=2;E[36194]=2;E[33189]=2;E[36168]=1;E[34041]=4;E[35907]=4;E[34836]=16;E[34842]=8;E[34843]=6;var Wb=function(a,b,c,e,g){function d(a){this.id=q++;this.refCount=1;this.renderbuffer=a;this.format=32854;this.height=this.width=0;g.profile&&(this.stats={size:0})}function r(b){var c=b.renderbuffer;a.bindRenderbuffer(36161,null);a.deleteRenderbuffer(c);
b.renderbuffer=null;b.refCount=0;delete t[b.id];e.renderbufferCount--}var n={rgba4:32854,rgb565:36194,"rgb5 a1":32855,depth:33189,stencil:36168,"depth stencil":34041};b.ext_srgb&&(n.srgba=35907);b.ext_color_buffer_half_float&&(n.rgba16f=34842,n.rgb16f=34843);b.webgl_color_buffer_float&&(n.rgba32f=34836);var u=[];Object.keys(n).forEach(function(a){u[n[a]]=a});var q=0,t={};d.prototype.decRef=function(){0>=--this.refCount&&r(this)};g.profile&&(e.getTotalRenderbufferSize=function(){var a=0;Object.keys(t).forEach(function(b){a+=
t[b].stats.size});return a});return{create:function(b,c){function k(b,c){var d=0,e=0,m=32854;"object"===typeof b&&b?("shape"in b?(e=b.shape,d=e[0]|0,e=e[1]|0):("radius"in b&&(d=e=b.radius|0),"width"in b&&(d=b.width|0),"height"in b&&(e=b.height|0)),"format"in b&&(m=n[b.format])):"number"===typeof b?(d=b|0,e="number"===typeof c?c|0:d):b||(d=e=1);if(d!==h.width||e!==h.height||m!==h.format)return k.width=h.width=d,k.height=h.height=e,h.format=m,a.bindRenderbuffer(36161,h.renderbuffer),a.renderbufferStorage(36161,
m,d,e),g.profile&&(h.stats.size=E[h.format]*h.width*h.height),k.format=u[h.format],k}var h=new d(a.createRenderbuffer());t[h.id]=h;e.renderbufferCount++;k(b,c);k.resize=function(b,c){var d=b|0,e=c|0||d;if(d===h.width&&e===h.height)return k;k.width=h.width=d;k.height=h.height=e;a.bindRenderbuffer(36161,h.renderbuffer);a.renderbufferStorage(36161,h.format,d,e);g.profile&&(h.stats.size=E[h.format]*h.width*h.height);return k};k._reglType="renderbuffer";k._renderbuffer=h;g.profile&&(k.stats=h.stats);k.destroy=
function(){h.decRef()};return k},clear:function(){J(t).forEach(r)},restore:function(){J(t).forEach(function(b){b.renderbuffer=a.createRenderbuffer();a.bindRenderbuffer(36161,b.renderbuffer);a.renderbufferStorage(36161,b.format,b.width,b.height)});a.bindRenderbuffer(36161,null)}}},Xa=[];Xa[6408]=4;Xa[6407]=3;var Na=[];Na[5121]=1;Na[5126]=4;Na[36193]=2;var Ba=["x","y","z","w"],Ub="blend.func blend.equation stencil.func stencil.opFront stencil.opBack sample.coverage viewport scissor.box polygonOffset.offset".split(" "),
Ea={0:0,1:1,zero:0,one:1,"src color":768,"one minus src color":769,"src alpha":770,"one minus src alpha":771,"dst color":774,"one minus dst color":775,"dst alpha":772,"one minus dst alpha":773,"constant color":32769,"one minus constant color":32770,"constant alpha":32771,"one minus constant alpha":32772,"src alpha saturate":776},$a={never:512,less:513,"<":513,equal:514,"=":514,"==":514,"===":514,lequal:515,"<=":515,greater:516,">":516,notequal:517,"!=":517,"!==":517,gequal:518,">=":518,always:519},
Pa={0:0,zero:0,keep:7680,replace:7681,increment:7682,decrement:7683,"increment wrap":34055,"decrement wrap":34056,invert:5386},xb={cw:2304,ccw:2305},yb=new P(!1,!1,!1,function(){}),Xb=function(a,b){function c(){this.endQueryIndex=this.startQueryIndex=-1;this.sum=0;this.stats=null}function e(a,b,d){var e=r.pop()||new c;e.startQueryIndex=a;e.endQueryIndex=b;e.sum=0;e.stats=d;n.push(e)}if(!b.ext_disjoint_timer_query)return null;var g=[],d=[],r=[],n=[],u=[],q=[];return{beginQuery:function(a){var c=g.pop()||
b.ext_disjoint_timer_query.createQueryEXT();b.ext_disjoint_timer_query.beginQueryEXT(35007,c);d.push(c);e(d.length-1,d.length,a)},endQuery:function(){b.ext_disjoint_timer_query.endQueryEXT(35007)},pushScopeStats:e,update:function(){var a,c;a=d.length;if(0!==a){q.length=Math.max(q.length,a+1);u.length=Math.max(u.length,a+1);u[0]=0;var e=q[0]=0;for(c=a=0;c<d.length;++c){var k=d[c];b.ext_disjoint_timer_query.getQueryObjectEXT(k,34919)?(e+=b.ext_disjoint_timer_query.getQueryObjectEXT(k,34918),g.push(k)):
d[a++]=k;u[c+1]=e;q[c+1]=a}d.length=a;for(c=a=0;c<n.length;++c){var e=n[c],h=e.startQueryIndex,k=e.endQueryIndex;e.sum+=u[k]-u[h];h=q[h];k=q[k];k===h?(e.stats.gpuTime+=e.sum/1E6,r.push(e)):(e.startQueryIndex=h,e.endQueryIndex=k,n[a++]=e)}n.length=a}},getNumPendingQueries:function(){return d.length},clear:function(){g.push.apply(g,d);for(var a=0;a<g.length;a++)b.ext_disjoint_timer_query.deleteQueryEXT(g[a]);d.length=0;g.length=0},restore:function(){d.length=0;g.length=0}}};return function(a){function b(){if(0===
B.length)w&&w.update(),aa=null;else{aa=ab.next(b);t();for(var a=B.length-1;0<=a;--a){var c=B[a];c&&c(A,null,0)}k.flush();w&&w.update()}}function c(){!aa&&0<B.length&&(aa=ab.next(b))}function e(){aa&&(ab.cancel(b),aa=null)}function g(a){a.preventDefault();e();V.forEach(function(a){a()})}function d(a){k.getError();f.restore();D.restore();R.restore();x.restore();N.restore();T.restore();J.restore();w&&w.restore();O.procs.refresh();c();X.forEach(function(a){a()})}function r(a){function b(a){var c={},d=
{};Object.keys(a).forEach(function(b){var e=a[b];ga.isDynamic(e)?d[b]=ga.unbox(e,b):c[b]=e});return{dynamic:d,"static":c}}function c(a){for(;m.length<a;)m.push(null);return m}var d=b(a.context||{}),e=b(a.uniforms||{}),f=b(a.attributes||{}),g=b(function(a){function b(a){if(a in c){var d=c[a];delete c[a];Object.keys(d).forEach(function(b){c[a+"."+b]=d[b]})}}var c=H({},a);delete c.uniforms;delete c.attributes;delete c.context;delete c.vao;"stencil"in c&&c.stencil.op&&(c.stencil.opBack=c.stencil.opFront=
c.stencil.op,delete c.stencil.op);b("blend");b("depth");b("cull");b("stencil");b("polygonOffset");b("scissor");b("sample");"vao"in a&&(c.vao=a.vao);return c}(a));a={gpuTime:0,cpuTime:0,count:0};var d=O.compile(g,f,e,d,a),h=d.draw,k=d.batch,l=d.scope,m=[];return H(function(a,b){var d;if("function"===typeof a)return l.call(this,null,a,0);if("function"===typeof b)if("number"===typeof a)for(d=0;d<a;++d)l.call(this,null,b,d);else if(Array.isArray(a))for(d=0;d<a.length;++d)l.call(this,a[d],b,d);else return l.call(this,
a,b,0);else if("number"===typeof a){if(0<a)return k.call(this,c(a|0),a|0)}else if(Array.isArray(a)){if(a.length)return k.call(this,a,a.length)}else return h.call(this,a)},{stats:a})}function n(a,b){var c=0;O.procs.poll();var d=b.color;d&&(k.clearColor(+d[0]||0,+d[1]||0,+d[2]||0,+d[3]||0),c|=16384);"depth"in b&&(k.clearDepth(+b.depth),c|=256);"stencil"in b&&(k.clearStencil(b.stencil|0),c|=1024);k.clear(c)}function u(a){B.push(a);c();return{cancel:function(){function b(){var a=zb(B,b);B[a]=B[B.length-
1];--B.length;0>=B.length&&e()}var c=zb(B,a);B[c]=b}}}function q(){var a=S.viewport,b=S.scissor_box;a[0]=a[1]=b[0]=b[1]=0;A.viewportWidth=A.framebufferWidth=A.drawingBufferWidth=a[2]=b[2]=k.drawingBufferWidth;A.viewportHeight=A.framebufferHeight=A.drawingBufferHeight=a[3]=b[3]=k.drawingBufferHeight}function t(){A.tick+=1;A.time=z();q();O.procs.poll()}function m(){q();O.procs.refresh();w&&w.update()}function z(){return(Ab()-C)/1E3}a=Fb(a);if(!a)return null;var k=a.gl,h=k.getContextAttributes();k.isContextLost();
var f=Gb(k,a);if(!f)return null;var p=Cb(),l={vaoCount:0,bufferCount:0,elementsCount:0,framebufferCount:0,shaderCount:0,textureCount:0,cubeCount:0,renderbufferCount:0,maxTextureUnits:0},v=f.extensions,w=Xb(k,v),C=Ab(),E=k.drawingBufferWidth,L=k.drawingBufferHeight,A={tick:0,time:0,viewportWidth:E,viewportHeight:L,framebufferWidth:E,framebufferHeight:L,drawingBufferWidth:E,drawingBufferHeight:L,pixelRatio:a.pixelRatio},G=Vb(k,v),R=Hb(k,l,a,function(a){return J.destroyBuffer(a)}),J=Pb(k,v,G,l,R),P=
Ib(k,v,R,l),D=Qb(k,p,l,a),x=Lb(k,v,G,function(){O.procs.poll()},A,l,a),N=Wb(k,v,G,l,a),T=Ob(k,v,G,x,N,l),O=Tb(k,p,v,G,R,P,x,T,{},J,D,{elements:null,primitive:4,count:-1,offset:0,instances:-1},A,w,a),p=Rb(k,T,O.procs.poll,A,h,v,G),S=O.next,K=k.canvas,B=[],V=[],X=[],Y=[a.onDestroy],aa=null;K&&(K.addEventListener("webglcontextlost",g,!1),K.addEventListener("webglcontextrestored",d,!1));var Z=T.setFBO=r({framebuffer:ga.define.call(null,1,"framebuffer")});m();h=H(r,{clear:function(a){if("framebuffer"in
a)if(a.framebuffer&&"framebufferCube"===a.framebuffer_reglType)for(var b=0;6>b;++b)Z(H({framebuffer:a.framebuffer.faces[b]},a),n);else Z(a,n);else n(null,a)},prop:ga.define.bind(null,1),context:ga.define.bind(null,2),"this":ga.define.bind(null,3),draw:r({}),buffer:function(a){return R.create(a,34962,!1,!1)},elements:function(a){return P.create(a,!1)},texture:x.create2D,cube:x.createCube,renderbuffer:N.create,framebuffer:T.create,framebufferCube:T.createCube,vao:J.createVAO,attributes:h,frame:u,on:function(a,
b){var c;switch(a){case "frame":return u(b);case "lost":c=V;break;case "restore":c=X;break;case "destroy":c=Y}c.push(b);return{cancel:function(){for(var a=0;a<c.length;++a)if(c[a]===b){c[a]=c[c.length-1];c.pop();break}}}},limits:G,hasExtension:function(a){return 0<=G.extensions.indexOf(a.toLowerCase())},read:p,destroy:function(){B.length=0;e();K&&(K.removeEventListener("webglcontextlost",g),K.removeEventListener("webglcontextrestored",d));D.clear();T.clear();N.clear();x.clear();P.clear();R.clear();
J.clear();w&&w.clear();Y.forEach(function(a){a()})},_gl:k,_refresh:m,poll:function(){t();w&&w.update()},now:z,stats:l});a.onDone(null,h);return h}});

},{}],81:[function(require,module,exports){
// modified version of https://github.com/thibauts/vertices-bounding-box that also works with non nested positions
const boundingBox = (positions) => {
  if (positions.length === 0) {
    return [[0, 0, 0], [0, 0, 0]]
  }

  const nested = (Array.isArray(positions) && Array.isArray(positions[0]))

  const dimensions = nested ? positions[0].length : 3
  const min = new Array(dimensions)
  const max = new Array(dimensions)

  for (let i = 0; i < dimensions; i += 1) {
    min[i] = Infinity
    max[i] = -Infinity
  }

  if (nested) {
    positions.forEach((position) => {
      for (let i = 0; i < dimensions; i += 1) {
        const _position = nested ? position[i] : position
        max[i] = _position > max[i] ? _position : max[i] // position[i] > max[i] ? position[i] : max[i]
        min[i] = _position < min[i] ? _position : min[i] // min[i] = position[i] < min[i] ? position[i] : min[i]
      }
    })
  } else {
    for (let j = 0; j < positions.length; j += dimensions) {
      for (let i = 0; i < dimensions; i += 1) {
        const _position = positions[i + j] // nested ? positions[i] : position
        max[i] = _position > max[i] ? _position : max[i] // position[i] > max[i] ? position[i] : max[i]
        min[i] = _position < min[i] ? _position : min[i] // min[i] = position[i] < min[i] ? position[i] : min[i]
      }
    }
  }

  return [min, max]
}
module.exports = boundingBox

},{}],82:[function(require,module,exports){
const vec3 = require('gl-vec3')

const boundingBox = require('./boundingBox')

/*
 * Compute the bounds of the given geometries.
 * See geometry-utils-V2
 * @param  {geometry|Array} geometries - geometry or list of geometries to measure
 * @return {Object} the bounds of the given geometries
 * bounds: {
 *   dia: 40,
 *   center: [0,20,8],
 *   min: [9, -10, 0],
 *   max: [15, 10, 4]
 *   size: [6,20,4]
 * }
 */
const computeBounds = (geometries) => {
  let dia
  let center
  let bbox // min and max
  let size
  let min
  let max
  if (Array.isArray(geometries)) {
    geometries.forEach((geometry) => {
      let gbbox = boundingBox(geometry.positions)
      gbbox = gbbox.map((bounds) => vec3.transformMat4(bounds, bounds, geometry.transforms))
      if (bbox) {
        vec3.min(bbox[0], bbox[0], gbbox[0])
        vec3.max(bbox[1], bbox[1], gbbox[1])
      } else {
        bbox = gbbox
      }
    })

    min = vec3.min(vec3.create(), bbox[1], bbox[0])
    max = vec3.max(vec3.create(), bbox[1], bbox[0])

    size = vec3.subtract(vec3.create(), max, min)
    center = vec3.scale(vec3.create(), size, 0.5)
    center = vec3.add(center, min, center)
    // aproximate diamter
    dia = vec3.distance(center, max)
  } else {
    const geometry = geometries
    bbox = boundingBox(geometry.positions)
    bbox = bbox.map((bounds) => vec3.transformMat4(bounds, bounds, geometry.transforms))

    min = vec3.min(vec3.create(), bbox[1], bbox[0])
    max = vec3.max(vec3.create(), bbox[1], bbox[0])

    size = vec3.subtract(vec3.create(), max, min)
    center = vec3.scale(vec3.create(), size, 0.5)
    center = vec3.add(center, min, center)
    // aproximate diamter
    dia = vec3.distance(center, max)
  }

  const bounds = {
    dia,
    center: [...center],
    min: [...min],
    max: [...max],
    size: [...size]
  }
  return bounds
}

module.exports = computeBounds

},{"./boundingBox":81,"gl-vec3":52}],83:[function(require,module,exports){
const vec3 = require('gl-vec3')
const mat4 = require('gl-mat4')

const fromOrthographicToPerspective = (orthographicCamera) => {
  const { near, far, fov, zoom } = orthographicCamera
  console.log('fov', fov, 'zoom', zoom)
  // : fov / zoom
  // recompute projection matrix to use perspective camera projection matrix
  const { viewport } = orthographicCamera
  const projection = require('./perspectiveCamera').setProjection(orthographicCamera, { width: viewport[2], height: viewport[3] })
  const { projectionType } = require('./perspectiveCamera').cameraState
  return Object.assign({}, orthographicCamera, projection, { projectionType }, { near, far, fov })
}

const fromPerspectiveToOrthographic = (perspectiveCamera) => {
  const { fov, aspect } = perspectiveCamera

  // set the orthographic view rectangle to 0,0,width,height
  // see here : http://stackoverflow.com/questions/13483775/set-zoomvalue-of-a-perspective-equal-to-perspective
  // const target = perspectiveCamera.target === undefined ? vec3.create() : perspectiveCamera.target

  const distance = vec3.length(vec3.subtract([], perspectiveCamera.position, perspectiveCamera.target)) * 0.3
  const width = Math.tan(fov) * distance * aspect
  const height = Math.tan(fov) * distance

  // const halfWidth = width
  // const halfHeight = height

  // const left = halfWidth
  // const right = -halfWidth
  // const top = -halfHeight
  // const bottom = halfHeight

  // we need to compute zoom from distance ? or pass it from controls ?

  // we re-use near, far, & projection matrix of orthographicCamera
  const { near, far, viewport } = perspectiveCamera
  const fCam = { zoom: 1, near, far }
  const orthographicCamera = require('./orthographicCamera').cameraState
  const projection = require('./orthographicCamera').setProjection(fCam, { width, height })
  return Object.assign({}, orthographicCamera, perspectiveCamera, projection, { projectionType: orthographicCamera.projectionType, viewport })
  // return Object.assign({}, orthoCam, projection, {near, far, left, right, top, bottom, target})
}

const toPerspectiveView = ({ camera }) => {
  const offsetToTarget = vec3.distance(camera.position, camera.target)
  const distance = offsetToTarget
  const position = [distance, distance, distance]
  const view = mat4.lookAt(mat4.create(), position, camera.target, camera.up)

  return { view, position }
}

const toPresetView = (viewName, { camera }) => {
  const presets = {
    top: [0, 0, 1],
    bottom: [0, 0, -1],
    front: [0, 1, 0],
    back: [0, -1, 0],
    left: [1, 0, 0],
    right: [-1, 0, 0],
    undefined: [0, 0, 0]
  }

  const offsetToTarget = vec3.distance(camera.position, camera.target)
  const position = vec3.add([], presets[viewName].map((x) => x * offsetToTarget), camera.target)
  const view = mat4.lookAt(mat4.create(), position, camera.target, camera.up)

  return { view, position }
}

module.exports = {
  toPerspectiveView,
  toPresetView,
  fromOrthographicToPerspective,
  fromPerspectiveToOrthographic
}

},{"./orthographicCamera":84,"./perspectiveCamera":85,"gl-mat4":19,"gl-vec3":52}],84:[function(require,module,exports){
const mat4 = require('gl-mat4')

const cameraState = {
  view: mat4.identity(new Float32Array(16)),
  projection: mat4.identity(new Float32Array(16)),
  matrix: mat4.identity(new Float32Array(16)), // not sure if needed
  near: 1, // 0.01,
  far: 1300,
  up: [0, 0, 1],
  // distance: 10.0, // not sure if needed
  eye: new Float32Array(3), // same as position
  position: [150, 250, 200],
  target: [0, 0, 0],
  fov: Math.PI / 4,
  aspect: 1,
  viewport: [0, 0, 0, 0],
  zoom: 1,
  projectionType: 'orthographic'
}

const cameraProps = {}

const setProjection = (camera, input) => {
  const { width, height } = input
  // context.viewportWidth / context.viewportHeight,
  const aspect = width / height
  const viewport = [0, 0, width, height]
  const multiplier = camera.zoom

  const left = -width * multiplier
  const right = width * multiplier
  const bottom = -height * multiplier
  const top = height * multiplier

  const projection = mat4.ortho([], left, right, bottom, top, camera.near, camera.far)
  return { projection, aspect, viewport }
}

module.exports = { cameraState, cameraProps, setProjection }

},{"gl-mat4":19}],85:[function(require,module,exports){
const mat4 = require('gl-mat4')
const vec3 = require('gl-vec3')

const cameraState = {
  view: mat4.identity(new Float32Array(16)),
  projection: mat4.identity(new Float32Array(16)),
  matrix: mat4.identity(new Float32Array(16)), // not sure if needed
  near: 1, // 0.01,
  far: 18000,
  up: [0, 0, 1],
  // distance: 10.0, // not sure if needed
  eye: new Float32Array(3), // same as position
  position: [450, 550, 700],
  target: [0, 0, 0],
  fov: Math.PI / 4,
  aspect: 1,
  viewport: [0, 0, 0, 0],
  projectionType: 'perspective'
}

const cameraProps = {}
const defaults = Object.assign({}, cameraState, cameraProps)

const setProjection = (output, camera, input) => {
  // console.log('input', input, 'camera', camera)
  // context.viewportWidth / context.viewportHeight,
  const aspect = input.width / input.height

  const projection = mat4.perspective(mat4.identity([]), camera.fov, aspect,
    camera.near,
    camera.far)
  const viewport = [0, 0, input.width, input.height]

  // optional mutation
  const out = output || {}
  out.projection = projection
  out.aspect = aspect
  out.viewport = viewport

  return out
}

const update = (output, camera) => {
  if (!camera) {
    camera = output
  }
  const { position, target, up } = camera
  const offset = vec3.subtract([], position, target)
  const newPosition = vec3.add(vec3.create(), target, offset)
  const newView = mat4.lookAt(mat4.create(), newPosition, target, up)

  // optional mutation
  const out = output || {}
  out.position = newPosition
  out.view = newView
  return out
}

module.exports = { cameraState, cameraProps, defaults, setProjection, update }

},{"gl-mat4":19,"gl-vec3":52}],86:[function(require,module,exports){
const vec3 = require('gl-vec3')
const mat4 = require('gl-mat4')
const { max, min, sqrt, PI, sin, cos, atan2 } = Math

const computeBounds = require('../bound-utils/computeBounds')

// TODO: make it more data driven ?
/*
setFocus => modify the focusPoint input
rotate => modify the angle input

*/
/* cameras are assumed to have:
 projection
 view
 target (focal point)
 eye/position
 up
*/
// TODO:  multiple data, sometimes redundant, needs simplification
/*
- camera state
- camera props

- controls state
- controls props

- other

*/

const controlsProps = {
  limits: {
    minDistance: 0.01,
    maxDistance: 10000
  },
  drag: 0.27, // Decrease the momentum by 1% each iteration
  EPS: 0.000001,
  zoomToFit: {
    auto: true, // always tried to apply zoomTofit
    targets: 'all',
    tightness: 1.5 // how close should the fit be: the lower the tigher : 1 means very close, but fitting most of the time
  },
  // all these, not sure are needed in this shape
  userControl: {
    zoom: true,
    zoomSpeed: 1.0,
    rotate: true,
    rotateSpeed: 1.0,
    pan: true,
    panSpeed: 1.0
  },
  autoRotate: {
    enabled: false,
    speed: 2.0 // 30 seconds per round when fps is 60
  },
  autoAdjustPlanes: true // adjust near & far planes when zooming in &out
}

const controlsState = {
  // orbit controls state
  thetaDelta: 0,
  phiDelta: 0,
  scale: 1
}

const defaults = Object.assign({}, controlsState, controlsProps)

const update = ({ controls, camera }, output) => {
  // custom z up is settable, with inverted Y and Z (since we use camera[2] => up)
  const { EPS, drag } = controls
  const { position, target } = camera
  const up = controls.up ? controls.up : camera.up

  let curThetaDelta = controls.thetaDelta
  const curPhiDelta = controls.phiDelta
  const curScale = controls.scale

  const offset = vec3.subtract([], position, target)
  let theta
  let phi

  // console.log('target', target)
  // console.log(matrix)

  if (up[2] === 1) {
    // angle from z-axis around y-axis, upVector : z
    theta = atan2(offset[0], offset[1])
    // angle from y-axis
    phi = atan2(sqrt(offset[0] * offset[0] + offset[1] * offset[1]), offset[2])
  } else {
    // in case of y up
    theta = atan2(offset[0], offset[2])
    phi = atan2(sqrt(offset[0] * offset[0] + offset[2] * offset[2]), offset[1])
  // curThetaDelta = -(curThetaDelta)
  }

  if (controls.autoRotate.enabled && controls.userControl.rotate) {
    curThetaDelta += 2 * Math.PI / 60 / 60 * controls.autoRotate.speed
  }

  theta += curThetaDelta
  phi += curPhiDelta

  // restrict phi to be betwee EPS and PI-EPS
  phi = max(EPS, min(PI - EPS, phi))
  // multiply by scaling effect and restrict radius to be between desired limits
  const radius = max(controls.limits.minDistance, min(controls.limits.maxDistance, vec3.length(offset) * curScale))

  if (up[2] === 1) {
    offset[0] = radius * sin(phi) * sin(theta)
    offset[2] = radius * cos(phi)
    offset[1] = radius * sin(phi) * cos(theta)
  } else {
    offset[0] = radius * sin(phi) * sin(theta)
    offset[1] = radius * cos(phi)
    offset[2] = radius * sin(phi) * cos(theta)
  }

  const newPosition = vec3.add(vec3.create(), target, offset)
  const newView = mat4.lookAt(mat4.create(), newPosition, target, up)

  const dragEffect = 1 - max(min(drag, 1.0), 0.01)
  const positionChanged = vec3.distance(position, newPosition) > 0 // TODO optimise

  /* let newMatrix = mat4.create()
  newMatrix = mat4.lookAt(newMatrix, newPosition, target, up)
  newMatrix = mat4.translate(matrix, matrix, newPosition) */

  // update camera matrix
  // let quaternion = quatFromRotationMatrix(mat4.lookAt(mat4.create(), [0, 0, 0], target, up))
  // let newMatrix = composeMat4(mat4.create(), newPosition, quaternion, [1, 1, 1])

  // view = newMatrix

  /* if (output) {
    output.controls.thetaDelta = curThetaDelta * dragEffect
  } */

  return {
    // controls state
    controls: {
      thetaDelta: curThetaDelta * dragEffect,
      phiDelta: curPhiDelta * dragEffect,
      scale: 1,
      changed: positionChanged
    },
    // camera state
    camera: {
      position: newPosition,
      view: newView
    }
    // matrix: newMatrix
  }
}

/**
  * compute camera state to rotate the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} angle value of the angle to rotate
  * @return {Object} the updated camera data/state
*/
const rotate = ({ controls, camera, speed = 1 }, angle) => {
  let {
    thetaDelta,
    phiDelta
  } = controls

  if (controls.userControl.rotate) {
    thetaDelta += (angle[0] * speed)
    phiDelta += (angle[1] * speed)
  }

  return {
    controls: {
      thetaDelta,
      phiDelta
    },
    camera
  }
}

/**
  * compute camera state to zoom the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} zoomDelta value of the zoom
  * @return {Object} the updated camera data/state
*/
const zoom = ({ controls, camera, speed = 1 }, zoomDelta = 0) => {
  let { scale } = controls

  if (controls.userControl.zoom && camera && zoomDelta !== undefined && zoomDelta !== 0 && !isNaN(zoomDelta)) {
    const sign = Math.sign(zoomDelta) === 0 ? 1 : Math.sign(zoomDelta)
    zoomDelta = (zoomDelta / zoomDelta) * sign * speed// controls.userControl.zoomSpeed
    // adjust zoom scaling based on distance : the closer to the target, the lesser zoom scaling we apply
    // zoomDelta *= Math.exp(Math.max(camera.scale * 0.05, 1))
    // updated scale after we will apply the new zoomDelta to the current scale
    const newScale = (zoomDelta + controls.scale)
    // updated distance after the scale has been updated, used to prevent going outside limits
    const newDistance = vec3.distance(camera.position, camera.target) * newScale

    if (newDistance > controls.limits.minDistance && newDistance < controls.limits.maxDistance) {
      scale += zoomDelta
    }
    // for ortho cameras
    if (camera.projectionType === 'orthographic') {
      const distance = vec3.length(vec3.subtract([], camera.position, camera.target)) * 0.3
      const width = Math.tan(camera.fov) * distance * camera.aspect
      const height = Math.tan(camera.fov) * distance

      const projection = require('../cameras/orthographicCamera').setProjection(camera, { width, height })
      camera = projection
    }

    /* if (controls.autoAdjustPlanes) {
      // these are empirical values , after a LOT of testing
      const distance = vec3.squaredDistance(camera.target, camera.position)
      camera.near = Math.min(Math.max(5, distance * 0.0015), 100)
    } */
  }
  return { controls: { scale }, camera }
}

/**
  * compute camera state to pan the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} delta value of the raw pan delta
  * @return {Object} the updated camera data/state
*/
const pan = ({ controls, camera, speed = 1 }, delta) => {
  const unproject = require('camera-unproject')
  const { projection, view, viewport } = camera
  const combinedProjView = mat4.multiply([], projection, view)
  const invProjView = mat4.invert([], combinedProjView)

  const panStart = [
    viewport[2],
    viewport[3],
    0
  ]
  const panEnd = [
    viewport[2] - delta[0],
    viewport[3] + delta[1],
    0
  ]
  const unPanStart = unproject([], panStart, viewport, invProjView)
  const unPanEnd = unproject([], panEnd, viewport, invProjView)
  // TODO scale by the correct near/far value instead of 1000 ?
  // const planesDiff = camera.far - camera.near
  const offset = vec3.subtract([], unPanStart, unPanEnd).map((x) => x * speed * 250 * controls.scale)

  return {
    controls,
    camera: {
      position: vec3.add(vec3.create(), camera.position, offset),
      target: vec3.add(vec3.create(), camera.target, offset)
    }
  }
}

/**
  * compute camera state to 'fit' an object on screen
  * Note1: this is a non optimal but fast & easy implementation
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Object} entity an object containing a 'bounds' property for bounds information
  * @return {Object} the updated camera data/state
*/
const zoomToFit = ({ controls, camera, entities }) => {
  // our camera.fov is already in radian, no need to convert
  const { zoomToFit } = controls
  if (entities.length < 1 || zoomToFit.targets !== 'all') { //! == 'all' || entity === undefined || !entity.bounds) {
    return { controls, camera }
  }

  let bounds
  if (entities.length > 1) {
    // more than one entity, targeted, need to compute the overall bounds
    const geometries = entities.map((entity) => entity.geometry)
    bounds = computeBounds(geometries)
  } else {
    bounds = entities[0].bounds
  }

  // fixme: for now , we only use the first item
  const { fov, target, position } = camera
  const { tightness } = Object.assign({}, zoomToFit, controlsProps.zoomToFit)
  /*
    - x is scaleForIdealDistance
    - currentDistance is fixed
    - how many times currentDistance * x = idealDistance
    So
    x = idealDistance / currentDistance
  */
  const idealDistanceFromCamera = (bounds.dia * tightness) / Math.tan(fov / 2.0)
  const currentDistance = vec3.distance(target, position)
  const scaleForIdealDistance = idealDistanceFromCamera / currentDistance

  return {
    camera: { target: bounds.center },
    controls: { scale: scaleForIdealDistance }
  }
}

/**
  * compute controls state to 'reset it' to the given state
  * Note1: this is a non optimal but fast & easy implementation
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Object} desiredState the state to reset the camera to: defaults to default values
  * @return {Object} the updated camera data/state
*/
const reset = ({ controls, camera }, desiredState) => {
  const options = {
    camera: {
      position: desiredState.camera.position,
      target: desiredState.camera.target,
      projection: mat4.perspective([], camera.fov, camera.aspect, camera.near, camera.far),
      view: desiredState.camera.view
    },
    controls: {
      thetaDelta: desiredState.controls.thetaDelta,
      phiDelta: desiredState.controls.phiDelta,
      scale: desiredState.controls.scale
    }
  }
  return options
}

// FIXME: upgrade or obsolete
const setFocus = ({ controls, camera }, focusPoint) => {
  const sub = (a, b) => a.map((a1, i) => a1 - b[i])
  const add = (a, b) => a.map((a1, i) => a1 + b[i]) // NOTE: NO typedArray.map support on old browsers, polyfilled
  const camTarget = camera.target
  const diff = sub(focusPoint, camTarget) // [ focusPoint[0] - camTarget[0],
  const zOffset = [0, 0, diff[2] * 0.5]
  camera.target = add(camTarget, zOffset)
  camera.position = add(camera.position, zOffset)
  return camera

  // old 'zoom to fit' update code
  /* if (targetTgt && positionTgt) {
    const posDiff = vec3.subtract([], positionTgt, newPosition)
    const tgtDiff = vec3.subtract([], targetTgt, newTarget)
    // console.log('posDiff', newPosition, positionTgt, newTarget, targetTgt)
    if (vec3.length(posDiff) > 0.1 && vec3.length(tgtDiff) > 0.1) {
      newPosition = vec3.scaleAndAdd(newPosition, newPosition, posDiff, 0.1)
      newTarget = vec3.scaleAndAdd(newTarget, newTarget, tgtDiff, 0.1)
    }

    if (settings.autoAdjustPlanes) {
      var distance = vec3.squaredDistance(newTarget, newPosition)
      near = Math.min(Math.max(5, distance * 0.0015), 100) // these are empirical values , after a LOT of testing
      projection = mat4.perspective([], camera.fov, camera.aspect, camera.near, camera.far)
    }
  } */
}

module.exports = {
  controlsProps,
  controlsState,
  defaults,
  update,
  rotate,
  zoom,
  pan,
  zoomToFit,
  reset
}

},{"../bound-utils/computeBounds":82,"../cameras/orthographicCamera":84,"camera-unproject":2,"gl-mat4":19,"gl-vec3":52}],87:[function(require,module,exports){
const mat4 = require('gl-mat4')

const { flatten, toArray } = require('@jscad/array-utils')
const computeBounds = require('../bound-utils/computeBounds')
const { meshColor } = require('../rendering/renderDefaults')

const geom2ToGeometries = require('./geom2ToGeometries')
const geom3ToGeometries = require('./geom3ToGeometries')
const path2ToGeometries = require('./path2ToGeometries')

const entitiesFromSolids = (params, solids) => {
  const defaults = {
    color: meshColor,
    smoothNormals: true
  }
  const { color, smoothNormals } = Object.assign({}, defaults, params)

  solids = toArray(solids)
  const entities = solids.map((solid) => {
    let geometries
    let type
    if (!solid) {
      return null
    } else if (!(solid instanceof Object)) {
      return null
    } else if ('sides' in solid) {
      type = '2d'
      geometries = geom2ToGeometries({ color }, solid)
    } else if ('points' in solid) {
      type = '2d'
      geometries = path2ToGeometries({ color }, solid)
    } else if ('polygons' in solid) {
      type = '3d'
      geometries = geom3ToGeometries({
        smoothLighting: smoothNormals,
        normalThreshold: 0.3,
        color
      }, solid)
    } else {
      return null
    }

    // FIXME handle multiple geometries, i.e. when positions count is > 65535
    const geometry = flatten(geometries)[0]
    if (!geometry) return null

    // bounds
    const bounds = computeBounds(geometry) // FIXME : ACTUALLY deal with arrays as inputs see above
    if (bounds.dia <= 0.0) return null

    const matrix = mat4.copy(mat4.create(), solid.transforms) // mat4.identity([])
    const transforms = {
      matrix
    }

    const visuals = {
      drawCmd: 'drawMesh',
      show: true,
      // color: meshColor, // overrides colors in geometries
      transparent: geometry.isTransparent, // not sure
      useVertexColors: true
    }

    const entity = {
      type,
      geometry,
      transforms,
      bounds,
      visuals,
      isTransparent: geometry.isTransparent
    }
    return entity
  }).filter((entity) => entity !== null)
  return entities
}

module.exports = entitiesFromSolids

},{"../bound-utils/computeBounds":82,"../rendering/renderDefaults":101,"./geom2ToGeometries":88,"./geom3ToGeometries":89,"./path2ToGeometries":90,"@jscad/array-utils":1,"gl-mat4":19}],88:[function(require,module,exports){
const mat4 = require('gl-mat4')

/*
 * Convert the given solid into one or more geometries for rendering.
 * @param {Object} options - options for conversion
 * @param {Array} options.color - RGBA of solid
 * @param {geom2} solid - the solid to convert
 * @return {Array} list of new geometries
 */
const geom2ToGeometries = (options, solid) => {
  let { color } = options

  if ('color' in solid) color = solid.color

  const positions = []
  solid.sides.forEach((side) => {
    positions.push([side[0][0], side[0][1], 0])
    positions.push([side[1][0], side[1][1], 0])
  })
  const normals = positions.map((x) => [0, 0, -1])
  const indices = positions.map((x, i) => i) // FIXME: temporary, not really needed, need to change drawMesh
  const transforms = solid.transforms ? solid.transforms : mat4.create()

  return [{ positions, normals, transforms, color, indices }]
}

module.exports = geom2ToGeometries

},{"gl-mat4":19}],89:[function(require,module,exports){
const vec3 = require('gl-vec3')
const mat4 = require('gl-mat4')

const { toArray } = require('@jscad/array-utils')

/*
 * Convert the given solid into one or more geometries for rendering.
 * @param {Object} options - options for conversion
 * @param {Array} options.color - RGBA of solid
 * @param {Float} options.normalThreshold - threshold beyond which to split normals
 * @param {Boolean} options.smoothLighting - set to true in order to use interpolated vertex normals
 * this creates nice round spheres but does not represent the shape of the actual model
 * @param {path2} solid - the solid to convert
 * @return {Array} list of new geometries
 */
const geom3ToGeometries = (options, solid) => {
  let { smoothLighting, normalThreshold, color } = options

  return convert({ color, smoothLighting, normalThreshold }, solid)
}

/*
 * Convert the given geometry using the given options (see above for options)
 * @returns {Object} [{indices, positions, normals, colors}, ...]
 */
const convert = (options, geometry) => {
  let { color, smoothLighting, normalThreshold } = options

  const geometries = []

  const positions = []
  const colors = []
  const normals = []
  const indices = []

  if ('color' in geometry) color = geometry.color

  // flag for transparency
  let isTransparent = false

  const polygons = geometry.polygons
  const transforms = geometry.transforms ? geometry.transforms : mat4.create()

  let normalPositionLookup = []
  normalPositionLookup = {}
  let tupplesIndex = 0

  // FIXME this isn't going to work if the polygons are > 65000 (see below)

  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i]

    const faceColor = polygonColor(polygon, color)
    const normal = calculateNormal(polygon.vertices)

    if (faceColor && faceColor[3] !== 1) {
      isTransparent = true
    }

    const polygonIndices = []
    // we need unique tupples of normal + position , that gives us a specific index (indices)
    // if the angle between a given normal and another normal is less than X they are considered the same
    for (let j = 0; j < polygon.vertices.length; j++) {
      let index

      const vertex = polygon.vertices[j]
      const position = [vertex[0], vertex[1], vertex[2]]

      if (smoothLighting) {
        const candidateTupple = { normal, position }
        const existingTupple = fuzyNormalAndPositionLookup(normalPositionLookup, candidateTupple, normalThreshold)
        if (!existingTupple) {
          const existingPositing = normalPositionLookup[candidateTupple.position]
          const itemToAdd = [{ normal: candidateTupple.normal, index: tupplesIndex }]
          if (!existingPositing) {
            normalPositionLookup[candidateTupple.position] = itemToAdd
          } else {
            normalPositionLookup[candidateTupple.position] = normalPositionLookup[candidateTupple.position]
              .concat(itemToAdd)
          }
          index = tupplesIndex
          // normalPositionLookup.push(candidateTupple)
          // index = normalPositionLookup.length - 1
          if (faceColor) {
            colors.push(faceColor)
          }
          normals.push(normal)
          positions.push(position)
          tupplesIndex += 1
        } else {
          index = existingTupple.index
        }
      } else {
        if (faceColor) {
          colors.push(faceColor)
        }
        normals.push(normal)
        positions.push(position)
        index = positions.length - 1
      }

      polygonIndices.push(index)
    }

    for (let j = 2; j < polygonIndices.length; j++) {
      indices.push([polygonIndices[0], polygonIndices[j - 1], polygonIndices[j]])
    }

    // if too many vertices or we are at the end, start a new geometry
    if (positions.length > 65000 || i === polygons.length - 1) {
      // special case to deal with face color SPECICIALLY SET TO UNDEFINED
      if (faceColor === undefined) {
        geometries.push({
          indices,
          positions,
          transforms,
          normals,
          color,
          isTransparent
        })
      } else {
        geometries.push({
          indices,
          positions,
          transforms,
          normals,
          colors,
          isTransparent
        })
      }
    }
  }
  return geometries
}

/** determine if input is a hex (color) or not
 * @param  {Object} object a string, array, object , whatever
 * @returns {Boolean} wether the input is a hex string or not
 */
const isHexColor = (object) => {
  if (typeof sNum !== 'string') {
    return false
  }
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(object)
}

// modified from https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
const hexToRgbNormalized = (hex, alpha) => {
  hex = hex.replace('#', '')
  const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16)
  const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16)
  const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16)
  return (alpha ? [r, g, b, alpha] : [r, g, b, 255]).map((x) => x / 255)
}

/** outputs a normalized [0...1] range, 4 component array color
 * @param  {} input
 */
const normalizedColor = (input) => {
  if (isHexColor(input)) {
    return hexToRgbNormalized(input)
  } else if (Array.isArray(input) && input.length >= 3) {
    input = input.length < 4 ? [input[0], input[1], input[2], 1] : input.slice(0, 4)
    if (input[0] > 1 || input[1] > 1 || input[2] > 1) {
      return input.map((x) => x / 255)
    }
    return input
  }
}

/**
 * return the color information of a polygon
 * @param {Object} polygon a polygon
 * @param {Object} color a default color
 * @returns {Array}  `[r, g, b, a]`
 */
const polygonColor = (polygon, color) => {
  let faceColor = color

  if (polygon.color) {
    faceColor = polygon.color
  }
  // opaque is default
  if (faceColor && faceColor.length < 4) {
    faceColor.push(1.0)
  }
  return faceColor
}

/**
 * determine if the two given normals are 'similar' ie if the distance/angle between the
 * two is less than the given threshold
 * @param {Array} normal a 3 component array normal
 * @param {Array} otherNormal another 3 component array normal
 * @returns {Boolean} true if the two normals are similar
 */
const calculateNormal = (vertices) => {
  const ba = vec3.create()
  vec3.subtract(ba, vertices[1], vertices[0])
  const ca = vec3.create()
  vec3.subtract(ca, vertices[2], vertices[0])
  const normal = vec3.create()
  vec3.cross(normal, ba, ca)
  vec3.normalize(normal, normal)
  return normal
}

const areNormalsSimilar = (normal, otherNormal, threshold) => (vec3.distance(normal, otherNormal) <= threshold)

const fuzyNormalAndPositionLookup = (normalPositionLookup, toCompare, normalThreshold) => {
  const normalsCandidates = normalPositionLookup[toCompare.position]
  if (normalsCandidates) {
    // normalPositionLookup[toCompare.position] = normalPositionLookup[toCompare.position].concat([toCompare.normal])
    // get array of normals with same position
    for (let i = 0; i < normalsCandidates.length; i++) {
      const normal = normalsCandidates[i].normal
      const similarNormal = areNormalsSimilar(normal, toCompare.normal, normalThreshold)
      const similar = similarNormal
      if (similar) {
        return { tupple: { position: toCompare.position, normal }, index: normalsCandidates[i].index }
      }
    }
  }
  return undefined
}

module.exports = geom3ToGeometries

},{"@jscad/array-utils":1,"gl-mat4":19,"gl-vec3":52}],90:[function(require,module,exports){
const mat4 = require('gl-mat4')

/*
 * Convert the given solid into one or more geometries for rendering.
 * @param {Object} options - options for conversion
 * @param {Array} options.color - RGBA of solid
 * @param {path2} solid - the solid to convert
 * @return {Array} list of new geometries
 */
const path2ToGeometries = (options, solid) => {
  let { color } = options

  if ('color' in solid) color = solid.color

  const points = solid.points

  const positions = []
  let prevpoint
  points.forEach((point) => {
    if (prevpoint) {
      positions.push([prevpoint[0], prevpoint[1], 0])
      positions.push([point[0], point[1], 0])
    }
    prevpoint = point
  })
  // add the last segment if necessary
  if (solid.isClosed && prevpoint) {
    const point = points[0]
    positions.push([prevpoint[0], prevpoint[1], 0])
    positions.push([point[0], point[1], 0])
  }

  const normals = positions.map((x) => [0, 0, -1])
  const indices = positions.map((x, i) => i) // FIXME: temporary, not really needed, need to change drawMesh
  const transforms = solid.transforms ? solid.transforms : mat4.create()

  return [{ positions, normals, transforms, color, indices }]
}

module.exports = path2ToGeometries

},{"gl-mat4":19}],91:[function(require,module,exports){
module.exports = {
  prepareRender: require('./rendering/render'),
  drawCommands: {
    // draw commands should bootstrap themselves the first time they are run
    drawGrid: require('./rendering/commands/drawGrid/multi.js'),
    drawAxis: require('./rendering/commands/drawAxis'),
    drawMesh: require('./rendering/commands/drawMesh/index.js')
  },
  cameras: {
    camera: require('./cameras/camera'),
    orthographic: require('./cameras/orthographicCamera'),
    perspective: require('./cameras/perspectiveCamera')
  },
  controls: {
    orbit: require('./controls/orbitControls')
  },
  entitiesFromSolids: require('./geometry-utils-V2/entitiesFromSolids')

}

},{"./cameras/camera":83,"./cameras/orthographicCamera":84,"./cameras/perspectiveCamera":85,"./controls/orbitControls":86,"./geometry-utils-V2/entitiesFromSolids":87,"./rendering/commands/drawAxis":92,"./rendering/commands/drawGrid/multi.js":94,"./rendering/commands/drawMesh/index.js":96,"./rendering/render":99}],92:[function(require,module,exports){
const mat4 = require('gl-mat4')

const drawAxis = (regl, params) => {
  const defaults = {
    xColor: [1, 0, 0, 1],
    yColor: [0, 1, 0, 1],
    zColor: [0, 0, 1, 1],
    size: 10,
    lineWidth: 3, // FIXME/ linewidth has been "deprecated" in multiple browsers etc, need a workaround,
    alwaysVisible: true // to have the widget alway visible 'on top' of the rest of the scene
  }
  let { size, xColor, yColor, zColor, lineWidth, alwaysVisible } = Object.assign({}, defaults, params)

  if (lineWidth > regl.limits.lineWidthDims[1]) {
    lineWidth = regl.limits.lineWidthDims[1]
  }
  const points = [
    0, 0, 0,
    size, 0, 0
  ]

  const commandParams = {
    frag: `precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,
    vert: `
    precision mediump float;
    attribute vec3 position;
    uniform mat4 model, view, projection;
    void main() {
      gl_Position = projection * view * model * vec4(position, 1);
    }`,

    uniforms: {
      model: (context, props) => props && props.model ? props.model : mat4.identity([]),
      color: (context, props) => props.color,
      angle: (contet, props) => props.angle
    },
    attributes: {
      position: points
    },
    count: points.length / 3,
    primitive: 'line loop',
    lineWidth,
    depth: {
      enable: !alwaysVisible // disable depth testing to have the axis widget 'alway on top' of other items in the 3d viewer
    }
  }

  const xAxisModel = mat4.identity([])
  const yAxisModel = mat4.rotateZ(mat4.create(), mat4.identity([]), Math.PI / 2)
  const zAxisModel = mat4.rotateY(mat4.create(), mat4.identity([]), -Math.PI / 2)
  const single = regl(commandParams)
  return (props) => {
    const defaults = {
      model: mat4.identity([])
    }
    props = Object.assign({}, defaults, props)
    return single([
      { color: xColor, model: mat4.multiply(mat4.create(), props.model, xAxisModel) }, // X
      { color: yColor, model: mat4.multiply(mat4.create(), props.model, yAxisModel) }, // Y
      { color: zColor, model: mat4.multiply(mat4.create(), props.model, zAxisModel) } // Z
    ])
  }
}

module.exports = drawAxis

},{"gl-mat4":19}],93:[function(require,module,exports){
// const glslify = require('glslify')// -sync') // works in client & server
const mat4 = require('gl-mat4')
// const path = require('path')

const makeDrawGrid = (regl, params = {}) => {
  const positions = []
  const defaults = {
    visuals: {
      color: [1, 1, 1, 1],
      fadeOut: false
    },
    ticks: 1,
    size: [16, 16],
    centered: false,
    lineWidth: 2
  }
  const visuals = Object.assign({}, defaults.visuals, params.visuals || {})
  const { fadeOut, color } = visuals
  const { size, ticks, centered, lineWidth } = Object.assign({}, defaults, params)

  const width = size[0]
  const length = size[1]

  // if (false) {
  //   const halfWidth = width * 0.5
  //   const halfLength = length * 0.5
  //   // const gridLine =
  //   positions.push(-halfWidth, 0, 0)
  //   positions.push(halfWidth, 0, 0)
  // }

  if (centered) {
    const halfWidth = width * 0.5
    const halfLength = length * 0.5

    const remWidth = halfWidth % ticks
    const widthStart = -halfWidth + remWidth
    const widthEnd = -widthStart

    const remLength = halfLength % ticks
    const lengthStart = -halfLength + remLength
    const lengthEnd = -lengthStart

    const skipEvery = 0

    for (let i = widthStart, j = 0; i <= widthEnd; i += ticks, j += 1) {
      if (j % skipEvery !== 0) {
        positions.push(lengthStart, i, 0)
        positions.push(lengthEnd, i, 0)
        positions.push(lengthStart, i, 0)
      }
    }
    for (let i = lengthStart, j = 0; i <= lengthEnd; i += ticks, j += 1) {
      if (j % skipEvery !== 0) {
        positions.push(i, widthStart, 0)
        positions.push(i, widthEnd, 0)
        positions.push(i, widthStart, 0)
      }
    }
  } else {
    for (let i = -width * 0.5; i <= width * 0.5; i += ticks) {
      positions.push(-length * 0.5, i, 0)
      positions.push(length * 0.5, i, 0)
      positions.push(-length * 0.5, i, 0)
    }

    for (let i = -length * 0.5; i <= length * 0.5; i += ticks) {
      positions.push(i, -width * 0.5, 0)
      positions.push(i, width * 0.5, 0)
      positions.push(i, -width * 0.5, 0)
    }
  }
  return regl({
    vert: `precision mediump float;

    uniform float camNear, camFar;
    uniform mat4 model, view, projection;

    attribute vec3 position;
    varying vec3 fragNormal, fragPosition;
    varying vec4 worldPosition;

    //#pragma glslify: zBufferAdjust = require('./zBufferAdjust')

    void main() {
      //fragNormal = normal;
      fragPosition = position;
      worldPosition = model * vec4(position, 1);
      vec4 glPosition = projection * view * worldPosition;
      gl_Position = glPosition;
      //gl_Position = zBufferAdjust(glPosition, camNear, camFar);
    }`, // glslify(path.join(__dirname, '/../basic.vert')),
    frag: `precision mediump float;
    uniform vec4 color;
    varying vec3 fragNormal, fragPosition;
    varying vec4 worldPosition;

    uniform vec4 fogColor;
    uniform bool fadeOut;
    void main() {
      float dist = .5;
      if(fadeOut){
        dist = distance( vec2(0.,0.), vec2(worldPosition.x, worldPosition.y));
        dist *= 0.0025;
        dist = sqrt(dist);
        //dist = clamp(dist, 0.0, 1.0);
      }

      gl_FragColor = mix(color, fogColor, dist);
    }
    `, // glslify(path.join(__dirname, '/shaders/grid.frag')),

    attributes: {
      position: regl.buffer(positions)
    },
    count: positions.length / 3,
    uniforms: {
      model: (context, props) => props && props.model ? props.model : mat4.identity([]),
      color: (context, props) => props && props.color ? props.color : color,
      fogColor: (context, props) => props && props.color ? [props.color[0], props.color[1], props.color[2], 0]
        : [color[0], color[1], color[2], 0.0],
      fadeOut: (context, props) => props && props.fadeOut !== undefined ? props.fadeOut : fadeOut
    },
    lineWidth: (context, props) => Math.min((props && props.lineWidth ? props.lineWidth : lineWidth), regl.limits.lineWidthDims[1]),
    primitive: 'lines',
    cull: {
      enable: true,
      face: 'front'
    },
    polygonOffset: {
      enable: true,
      offset: {
        factor: 1,
        units: Math.random() * 10
      }
    },
    blend: {
      enable: true,
      func: {
        src: 'src alpha',
        dst: 'one minus src alpha'
      }
    }

  })
}

module.exports = makeDrawGrid

/* alternate rendering method

        let count = 80
        let offset = 10
        const datas = Array(80).fill(0)
          .map(function (v, i) {
            const model = mat4.translate(mat4.identity([]), mat4.identity([]), [0, i * offset - (count * 0.5 * offset), 0])
            return {
              color: gridColor, fadeOut, model
            }
          })
        const datas2 = Array(80).fill(0)
          .map(function (v, i) {
            let model
            model = mat4.rotateZ(mat4.identity([]), mat4.identity([]), 1.5708)
            model = mat4.translate(model, model, [0, i * offset - (count * 0.5 * offset), 0])
            return {
              color: gridColor, fadeOut, model
            }
          })

        count = 80
        offset = 1
        const datas3 = Array(80).fill(0)
          .map(function (v, i) {
            const model = mat4.translate(mat4.identity([]), mat4.identity([]), [0, i * offset - (count * 0.5 * offset), 0])
            return {
              color: subGridColor, fadeOut, model
            }
          })
        const datas4 = Array(80).fill(0)
          .map(function (v, i) {
            let model
            model = mat4.rotateZ(mat4.identity([]), mat4.identity([]), 1.5708)
            model = mat4.translate(model, model, [0, i * offset - (count * 0.5 * offset), 0])
            return {
              color: subGridColor, fadeOut, model
            }
          })
        // const model = mat4.translate(mat4.identity([]), mat4.identity([]), [0, 50, 0])
        drawGrid(datas)// {color: gridColor, fadeOut, model})
        drawGrid(datas2)

        drawGrid(datas3)// {color: gridColor, fadeOut, model})
        drawGrid(datas4) */

},{"gl-mat4":19}],94:[function(require,module,exports){
const makeDrawMultiGrid = (regl, params) => {
  const { size, ticks } = params
  const drawMainGrid = require('./index')(regl, { size, ticks: ticks[0] })
  const drawSubGrid = require('./index')(regl, { size, ticks: ticks[1] })
  const drawGrid = (props) => {
    drawMainGrid(props)
    drawSubGrid({ color: props.subColor, fadeOut: props.fadeOut })
  }
  return drawGrid
}

module.exports = makeDrawMultiGrid

},{"./index":93}],95:[function(require,module,exports){
const vColorFrag = `
precision mediump float;
uniform vec4 ucolor;

void main () {
  gl_FragColor = ucolor;
}
`
module.exports = { frag: vColorFrag }

},{}],96:[function(require,module,exports){
const mat4 = require('gl-mat4')

const { meshColor } = require('../../renderDefaults')

const drawMesh = (regl, params = { extras: {} }) => {
  const { buffer } = regl
  const defaults = {
    useVertexColors: true,
    dynamicCulling: false,
    geometry: undefined,
    type: '3d',
    primitive: 'triangles',
    color: meshColor
  }
  let { geometry, dynamicCulling, useVertexColors, type, primitive, color } = Object.assign({}, defaults, params)

  // let ambientOcclusion = vao(geometry.indices, geometry.positions, 64, 64)
  const ambientOcclusion = regl.buffer([])

  // vertex colors or not ?
  const hasIndices = !!(geometry.indices && geometry.indices.length > 0)
  const hasNormals = !!(geometry.normals && geometry.normals.length > 0)
  const hasVertexColors = !!(useVertexColors && geometry.colors && geometry.colors.length > 0)
  const cullFace = dynamicCulling ? (context, props) => {
    const isOdd = ([props.model[0], props.model[5], props.model[10]].filter((x) => x < 0).length) & 1 // count the number of negative components & deterine if that is odd or even
    return isOdd ? 'front' : 'back'
  } : 'back'

  const vert = hasVertexColors ? require('./vColorShaders').vert : require('./meshShaders').vert
  let frag = hasVertexColors ? require('./vColorShaders').frag : require('./meshShaders').frag

  if (type === '2d') {
    primitive = 'lines'
    if ('color' in geometry) color = geometry.color
    frag = require('./colorOnlyShaders').frag
  }
  // console.log('type', type, 'primitive', primitive, 'color', color, hasVertexColors)

  let commandParams = {
    vert,
    frag,

    uniforms: {
      model: (context, props) => props.model || props.transforms.matrix || mat4.identity([]), // props && props.model ? props.model : mat4.identity([]),
      ucolor: (context, props) => (props && props.color) ? props.color : color,
      // semi hack, woraround to enable/disable vertex colors!!!
      vColorToggler: (context, props) => (props && props.useVertexColors && props.useVertexColors === true) ? 1.0 : 0.0,
      // experimental
      unormal: (context, props) => {
        // BUG Issue #651 const model = props.model || props.transforms.matrix
        const model = mat4.create()
        const modelViewMatrix = mat4.multiply(mat4.create(), model, props.camera.view)
        const normalMatrix = mat4.create()
        mat4.invert(normalMatrix, modelViewMatrix)
        mat4.transpose(normalMatrix, normalMatrix)
        return normalMatrix
      }
    },
    attributes: {
      position: buffer(geometry.positions),
      ao: ambientOcclusion
    },
    cull: {
      enable: true,
      face: cullFace
    },
    depth: {
      enable: true
    },
    blend: {
      enable: true,

      func: { src: 'src alpha', dst: 'one minus src alpha' }
    },
    primitive: (context, props) => props && props.primitive ? props.primitive : primitive
  }

  if (geometry.cells) {
    commandParams.elements = geometry.cells
  } else if (hasIndices) {
    // FIXME: not entirely sure about all this
    const indices = geometry.indices
    /* let type
    if (indices instanceof Uint32Array && regl.hasExtension('oes_element_index_uint')) {
      type = 'uint32'
    }else if (indices instanceof Uint16Array) {
      type = 'uint16'
    } else {
      type = 'uint8'
    } */

    commandParams.elements = regl.elements({
      // type,
      data: indices
    })
  } else if (geometry.triangles) {
    commandParams.elements = geometry.triangles
  } else {
    commandParams.count = geometry.positions.length / 3
  }

  if (hasNormals) {
    commandParams.attributes.normal = buffer(geometry.normals)
  }
  if (hasVertexColors) {
    commandParams.attributes.color = buffer(geometry.colors)
  }

  // Splice in any extra params
  commandParams = Object.assign({}, commandParams, params.extras)
  return regl(commandParams)
}

module.exports = drawMesh

},{"../../renderDefaults":101,"./colorOnlyShaders":95,"./meshShaders":97,"./vColorShaders":98,"gl-mat4":19}],97:[function(require,module,exports){
const meshFrag = `
precision mediump float;
varying vec3 surfaceNormal;
uniform float ambientLightAmount;
uniform float diffuseLightAmount;
uniform vec4 ucolor;
uniform vec3 lightDirection;
uniform vec3 opacity;

varying vec4 _worldSpacePosition;

uniform vec2 printableArea;

vec4 errorColor = vec4(0.15, 0.15, 0.15, 0.3);

void main () {
  vec4 depth = gl_FragCoord;

  float v = 0.8; // shadow value
  vec4 endColor = ucolor;

  vec3 ambient = ambientLightAmount * endColor.rgb;
  float cosTheta = dot(surfaceNormal, lightDirection);
  vec3 diffuse = diffuseLightAmount * endColor.rgb * clamp(cosTheta , 0.0, 1.0 );

  float cosTheta2 = dot(surfaceNormal, vec3(-lightDirection.x, -lightDirection.y, lightDirection.z));
  vec3 diffuse2 = diffuseLightAmount * endColor.rgb * clamp(cosTheta2 , 0.0, 1.0 );

  gl_FragColor = vec4((ambient + diffuse + diffuse2 * v), endColor.a);
}`

const meshVert = `
precision mediump float;

uniform float camNear, camFar;
uniform mat4 model, view, projection;

attribute vec3 position, normal;

varying vec3 surfaceNormal, surfacePosition;
varying vec4 _worldSpacePosition;

void main() {
  surfacePosition = position;
  surfaceNormal = normal;
  vec4 worldSpacePosition = model * vec4(position, 1);
  _worldSpacePosition = worldSpacePosition;

  vec4 glPosition = projection * view * model * vec4(position, 1);
  gl_Position = glPosition;
}
`

module.exports = { vert: meshVert, frag: meshFrag }

},{}],98:[function(require,module,exports){
const vColorVert = `
precision mediump float;

uniform float camNear, camFar;
uniform mat4 model, view, projection, unormal;

attribute vec3 position, normal;
attribute vec4 color;

attribute float ao;
varying float ambientAo;

varying vec3 surfaceNormal, surfacePosition;
varying vec4 _worldSpacePosition;
varying vec4 vColor;

void main() {
  surfacePosition = position;
  surfaceNormal = (unormal * vec4(normal, 1.0)).xyz; //vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
  vec4 worldSpacePosition = model * vec4(position, 1);
  _worldSpacePosition = worldSpacePosition;
  //gl_Position = projection * view * worldSpacePosition;

  vColor = color;

  //ambientAo = (1. - ao) * (0.5 * max(normal.x, 0.) + 0.5);

  vec4 glPosition = projection * view * model * vec4(position, 1);
  gl_Position = glPosition;
  //gl_Position = zBufferAdjust(glPosition, camNear, camFar);
}
`
const vColorFrag = `
precision mediump float;
varying vec3 surfaceNormal, surfacePosition;

uniform float ambientLightAmount;
uniform float diffuseLightAmount;
uniform float specularLightAmount;

uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform vec3 opacity;
uniform float uMaterialShininess;

varying vec4 vColor;
uniform vec4 ucolor;
uniform float vColorToggler;

uniform vec2 printableArea;
vec4 errorColor = vec4(0.15, 0.15, 0.15, 0.3);//vec4(0.15, 0.15, 0.15, 0.3);
varying vec4 _worldSpacePosition;
varying float ambientAo;

void main () {
  vec4 depth = gl_FragCoord;
  vec4 endColor = vColor * vColorToggler + ucolor * (1.0 - vColorToggler);

  vec3 ambient = ambientLightAmount * endColor.rgb ; //ambientAo * 

  float diffuseWeight = dot(surfaceNormal, lightDirection);
  vec3 diffuse = diffuseLightAmount * endColor.rgb * clamp(diffuseWeight , 0.0, 1.0 );

  //specular
  
  vec4 specularColor = vec4(lightColor);
  vec3 eyeDirection = normalize(surfacePosition.xyz);
  vec3 reflectionDirection = reflect(-lightDirection, surfaceNormal);
  float specularLightWeight = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uMaterialShininess);
  vec3 specular = specularColor.rgb * specularLightWeight * specularLightAmount;

  /*float light2Multiplier = 0.2;
  float diffuseWeight2 = dot(surfaceNormal, vec3(-lightDirection.x, lightDirection.y, lightDirection.z));
  vec3 diffuse2 = diffuseLightAmount * endColor.rgb * clamp(diffuseWeight2 , 0.0, 1.0 ) * light2Multiplier;

  float light3Multiplier = 0.2;  
  float diffuseWeight3 = dot(surfaceNormal, vec3(lightDirection.x, -lightDirection.y, lightDirection.z));
  vec3 diffuse3 = diffuseLightAmount * endColor.rgb * clamp(diffuseWeight3 , 0.0, 1.0 ) * light3Multiplier;

  float light4Multiplier = 0.2;  
  float diffuseWeight4 = dot(surfaceNormal, vec3(-lightDirection.x, -lightDirection.y, lightDirection.z));
  vec3 diffuse4 = diffuseLightAmount * endColor.rgb * clamp(diffuseWeight4 , 0.0, 1.0 ) * light4Multiplier;*/
  
  gl_FragColor = vec4((ambient + diffuse + specular), endColor.a);
  //gl_FragColor = vec4((ambient + diffuse + diffuse2 + diffuse3 + diffuse4), endColor.a);
}
`

module.exports = { frag: vColorFrag, vert: vColorVert }

},{}],99:[function(require,module,exports){
const renderContext = require('./renderContext')
const renderDefaults = require('./renderDefaults')

const prepareRender = (params) => {
  const defaults = {
  // extensions:['oes_element_index_uint']
  }
  const options = Object.assign(
    {},
    defaults,
    params.glOptions,
    {
      // canvas: (element.nodeName.toLowerCase() === 'canvas') ? element : undefined,
      // container: (element.nodeName.toLowerCase() !== 'canvas') ? element : undefined
      onDone: (err, callback) => {
        if (err) {
          throw err
        }
      }
    }
  )
  // setup regl
  const regl = require('regl')(options)// , (width, height))
  // setup draw command cache
  // const drawCache = {}
  const drawCache2 = new Map()

  // create the main draw command
  const command = (props) => {
    // console.log('params in render', props)
    props.rendering = Object.assign({}, renderDefaults, props.rendering)

    // props is the first parameter, the second one is a function, doing the actual rendering
    renderContext(regl)(props, (context) => {
      regl.clear({
        color: props.rendering.background,
        depth: 1
      })
      // this whole thing is very inneficiant and innelegant ... improve in the future
      if (props.entities) {
        // we need to sort transparents vs non transparents: transparent objects should be rendered last
        // since you can see 'behind' transparent ones, so what is behind needs to already be rendered
        props.entities
          .sort((a, b) => {
            const aTransparent = 'transparent' in a.visuals ? a.visuals.transparent : false
            const bTransparent = 'transparent' in b.visuals ? b.visuals.transparent : false
            return (aTransparent === bTransparent) ? 0 : aTransparent ? 1 : -1
          })
          .forEach((entity) => {
            const { visuals } = entity
            if (visuals.drawCmd && visuals.show && props.drawCommands[visuals.drawCmd]) {
              let drawCmd
              if (visuals.cacheId) {
                drawCmd = drawCache2.get(visuals.cacheId)
              } else {
                visuals.cacheId = drawCache2.size
                drawCmd = props.drawCommands[visuals.drawCmd](regl, entity)
                drawCache2.set(visuals.cacheId, drawCmd)
              }
              // console.log('drawing with', drawCmd, entity)
              const drawParams = { // FIXME: horrible, tidy up !!: what is needed/should be passed to render pass ?
                ...entity,
                ...visuals,
                camera: props.camera
              }
              drawCmd(drawParams)
            }
          })
      }
    })
  }
  // actual render function
  return function render (data) {
    // important for stats, correct resizing etc
    regl.poll()
    command(data)// meh ??
    // tick += 0.01
  }
}

module.exports = prepareRender

},{"./renderContext":100,"./renderDefaults":101,"regl":80}],100:[function(require,module,exports){
const mat4 = require('gl-mat4')

/** function that injects most of the uniforms into the regl context:
 * ie keeps track of all regl global state.
 * @param  {} regl
 * @param  {} params={}
 */
const renderWrapper = (regl, params = {}) => {
  const { fbo } = params

  const commandParams = {
    cull: {
      enable: true
    },
    context: {
      lightDirection: [0.2, 0.2, 1]// [0.19, 0.47, 0.29]
    },
    uniforms: {
      view: (context, props) => props.camera.view,
      eye: (context, props) => props.camera.position,
      // projection: (context, props) => mat4.perspective([], props.camera.fov, context.viewportWidth/context.viewportHeight, props.camera.near, props.camera.far), //props.camera.projection,//context.viewportWidth also an alternative?
      projection: (context, props) => props.camera.projection,
      camNear: (context, props) => props.camera.near,
      camFar: (context, props) => props.camera.far,
      // accessories to the above
      invertedView: (context, props) => mat4.invert([], props.camera.view),
      // lighting stuff, needs cleanup
      lightPosition: (context, props) => props && props.rendering && props.rendering.lightPosition ? props.rendering.lightPosition : [100, 200, 100],
      lightDirection: (context, props) => props && props.rendering && props.rendering.lightDirection ? props.rendering.lightDirection : context.lightDirection || [0, 0, 0],
      lightView: (context) => mat4.lookAt([], context.lightDirection, [0.0, 0.0, 0.0], [0.0, 0.0, 1.0]),
      lightProjection: mat4.ortho([], -25, -25, -20, 20, -25, 25),
      lightColor: (context, props) => props && props.rendering && props.rendering.lightColor ? props.rendering.lightColor : [1, 0.8, 0],
      ambientLightAmount: (context, props) => props && props.rendering && props.rendering.ambientLightAmount ? props.rendering.ambientLightAmount : 0.3,
      diffuseLightAmount: (context, props) => props && props.rendering && props.rendering.diffuseLightAmount ? props && props.rendering && props.rendering.diffuseLightAmount : 0.89,
      specularLightAmount: (context, props) => props && props.rendering && props.rendering.specularLightAmount ? props.rendering.specularLightAmount : 0.16,
      uMaterialShininess: (context, props) => props && props.rendering && props.rendering.materialShininess ? props.rendering.materialShininess : 8.0,
      materialAmbient: [0.5, 0.8, 0.3],
      materialDiffuse: [0.5, 0.8, 0.3],
      materialSpecular: [0.5, 0.8, 0.3]
    },
    framebuffer: fbo
  }

  // it returns a function
  return regl(Object.assign({}, commandParams, params.extras))
}

module.exports = renderWrapper

},{"gl-mat4":19}],101:[function(require,module,exports){
module.exports = {
  background: [1, 1, 1, 1],
  meshColor: [0, 0.6, 1, 1], // default face color or line color
  lightColor: [1, 1, 1, 1], // note: for now there is a single preset light, not an entity
  lightDirection: [0.2, 0.2, 1],
  lightPosition: [100, 200, 100],
  ambientLightAmount: 0.3,
  diffuseLightAmount: 0.89,
  specularLightAmount: 0.16,
  materialShininess: 8.0
}

},{}]},{},[91])(91)
});
