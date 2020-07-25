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
 * @param {number} t The position that you want the bezier's tangent value at.
 * @param {Object} bezier An array with at least 2 elements of either all numbers, or all arrays of numbers that are the same size.
 * @returns {array | number} the tangent at the position.
 * @alias module:modeling/curves/bezier.tangentAt
 */
const valueAt = (t, bezier) => {
	if (t < 0 || t > 1) {
		throw new Error('Bezier valueAt() input must be between 0 and 1');
	}
	if (bezier.pointType === 'float_single') {
		return bezierFunction(bezier, bezier.points, t);
	} else {
		const result = [];
		for (let i = 0; i < bezier.dimensions; i++) {
			let singleDimensionPoints = [];
			for (var j = 0; j < bezier.points.length; j++) {
				singleDimensionPoints.push(bezier.points[j][i]);
			}
			result.push( bezierFunction(bezier, singleDimensionPoints, t) );
		}
		return result;
	}
}

const bezierFunction = function (bezier, p, t) {
	const n = p.length - 1;
	let result = 0;
	for (let i = 0; i <= n; i++) {
		result += bezier.permutations[i] * Math.pow(1 - t, n - i) * Math.pow(t, i) * p[i];
	}
	return result;
}

module.exports = valueAt;
