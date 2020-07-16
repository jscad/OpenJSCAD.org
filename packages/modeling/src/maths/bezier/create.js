/**
 * Represents a bezier easing function.
 *
 * Math and explanation comes from {@link https://www.freecodecamp.org/news/nerding-out-with-bezier-curves-6e3c0bc48e2f/}
 *
 *
 * @example
 * const b = bezier.create([0,10]) // a linear progression from 0 to 10
 * const b = bezier.create([0, 0, 10, 10]) // a symmetrical cubic easing curve that starts slowly and ends slowly from 0 to 10
 * const b = bezier.create([0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * Usage:
 * let position = b.at(t) // where 0 < t < 1
 * let tangent = b.tangentAt(t) // where 0 < t < 1
 *
 * @typedef {Object} bezier
 */

/**
 * Creates an object representing a bezier easing curve. Can have both an arbitrary number of control points, and an arbitrary number of dimensions.
 *
 * @example
 * const b = bezier.create([0,10]) // a linear progression from 0 to 10
 * const b = bezier.create([0, 0, 10, 10]) // a symmetrical cubic easing curve that starts slowly and ends slowly from 0 to 10
 * const b = bezier.create([0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * Usage:
 * let position = b.at(t) // where 0 < t < 1
 * let tangent = b.tangentAt(t) // where 0 < t < 1
 *
 * @param {Array} points An array with at least 2 elements of either all numbers, or all arrays of numbers that are the same size.
 * @returns {bezier} a new bezier helper object
 * @alias module:modeling/maths/bezier.create
 */
const create = (points) => {
	if (points.length < 2) throw new Error('Bezier points must contain at least 2 values.')

	var firstPointType = null;
	var convertedPoints = [];

	points.forEach(point => {
		let pType = '';
		if (typeof(point) == 'number') {
			pType = 'float_single';
		} else {
			point = new Float32Array(point);
			if (point) {
				point.forEach(val => {
					if (isNaN(val)) {throw new Error('Bezier point values must all be numbers.');}
				});
				pType = 'float_' + point.length;
			} else {
				throw new Error('Bezier points must all be numbers or arrays of number.');
			}
		}
		if (firstPointType == null) {
			firstPointType = pType;
		} else {
			if (firstPointType != pType) {
				throw new Error('Bezier points must be either all numbers or all arrays of numbers of the same size.');
			}
		}
		convertedPoints.push(point);
	});

	points = convertedPoints;

	function getPermutations(c) {
		let permutations = [];
		for (let i = 0; i <= c; i++) {
			permutations.push(factorial(c) / (factorial(i) * factorial(c - i)));
		}
		return permutations;
	}

	function factorial(b) {
		let out = 1;
		for (let i = 2; i <= b; i++) {
			out *= i;
		}
		return out;
	}

	let out = {
		points: convertedPoints,
		pointType: firstPointType,
		permutations: getPermutations(convertedPoints.length - 1),
		tangentPermutations: getPermutations(convertedPoints.length - 2),
		bezierFunction: function (p, t) {
			var n = this.points.length - 1;
			var result = 0;
			for (var i = 0; i <= n; i++) {
				result += this.permutations[i] * Math.pow(1 - t, n - i) * Math.pow(t, i) * p[i];
			}
			return result;
		},
		bezierTangent: function(p, t) {
			// from https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-der.html
			var n = this.points.length - 1;
			var result = 0;
			for (var i = 0; i < n; i++) {
				let q = n * (p[i+1] - p[i]);
				result += this.tangentPermutations[i] * Math.pow(1 - t, n - 1 - i) * Math.pow(t, i) * q;
			}
			return result;
		},
		at: function(t) {
			if (t < 0 || t > 1) {
				throw new Error('Bezier at() input must be between 0 and 1');
			}
			return this.getValueAt(t);
		},
		tangentAt: function(t) {
			if (t < 0 || t > 1) {
				throw new Error('Bezier tangentAt() input must be between 0 and 1');
			}
			return this.getTangentAt(t);
		}
	};

	if (out.pointType == 'float_single') {
		out.getValueAt = function(t) {
			return this.bezierFunction(this.points, t);
		};
		out.getTangentAt = function(t) {
			return this.bezierTangent(this.points, t);
		};
	} else {
		out.dimensions = points[0].length;
		out.getValueAt = function(t) {
			var result = new Float32Array(this.dimensions);
			for (var i = 0; i < this.dimensions; i++) {
				singleDimensionPoints = new Float32Array(this.points.length);
				for (var j = 0; j < this.points.length; j++) {
					singleDimensionPoints[j] = this.points[j][i];
				}
				result[i] = this.bezierFunction(singleDimensionPoints, t);
			}
			return result;
		};
		out.getTangentAt = function(t) {
			var result = new Float32Array(this.dimensions);
			for (var i = 0; i < this.dimensions; i++) {
				singleDimensionPoints = new Float32Array(this.points.length);
				for (var j = 0; j < this.points.length; j++) {
					singleDimensionPoints[j] = this.points[j][i];
				}
				result[i] = this.bezierTangent(singleDimensionPoints, t);
			}
			return result;
		};
	}
 	return out
}

module.exports = create
