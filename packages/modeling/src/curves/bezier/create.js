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
	let pointType = getPointType(points);

 	return {
		points: points,
		pointType: pointType,
		dimensions: pointType === 'float_single' ? 0 : points[0].length,
		permutations: getPermutations(points.length - 1),
		tangentPermutations: getPermutations(points.length - 2),
	};
}

const getPointType = function(points) {
	let firstPointType = null;
	points.forEach(point => {
		let pType = '';
		if (typeof (point) == 'number') {
			pType = 'float_single';
		} else {
			point = new Float32Array(point);
			if (point) {
				point.forEach(val => {
					if (isNaN(val)) {
						throw new Error('Bezier point values must all be numbers.');
					}
				});
				pType = 'float_' + point.length;
			} else {
				throw new Error('Bezier points must all be numbers or arrays of number.');
			}
		}
		if (firstPointType == null) {
			firstPointType = pType;
		} else {
			if (firstPointType !== pType) {
				throw new Error('Bezier points must be either all numbers or all arrays of numbers of the same size.');
			}
		}
	});
	return firstPointType;
}

const getPermutations = function(c) {
	let permutations = [];
	for (let i = 0; i <= c; i++) {
		permutations.push(factorial(c) / (factorial(i) * factorial(c - i)));
	}
	return permutations;
}

const factorial = function(b) {
	let out = 1;
	for (let i = 2; i <= b; i++) {
		out *= i;
	}
	return out;
}

module.exports = create
