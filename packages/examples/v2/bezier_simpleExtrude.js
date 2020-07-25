const jscad = require('@jscad/modeling')
const {
	color, curves, connectors, geometries, maths, primitives, text, utils,
	booleans, expansions, extrusions, hulls, measurements, transforms
} = jscad

const { cuboid, sphere, cylinder, circle, star } = require('@jscad/modeling').primitives
const { bezier } = curves
const { slice } = extrusions

const main = () => {
	return [
		extrudeWobble(30)
	]
}

function extrudeWobble(height) {
	var squareSlice = slice.fromPoints([[10, 10], [-10, 10], [-10, -10], [10, -10]]);

	var xCurve = bezier.create([1, 2, 0.4, 1]);
	var yCurve = bezier.create([1, 2, 0.5]);

	let wobble = extrusions.extrudeFromSlices({
			numberOfSlices: 20,
			isCapped: true,
			callback: function (progress, count, base) {
        		let newslice = slice.transform(maths.mat4.fromTranslation([0, 0, height * progress]), base);
        		newslice = slice.transform(maths.mat4.fromScaling([
     				bezier.valueAt(progress, xCurve),
		        	bezier.valueAt(progress, yCurve),
		        	1
		        ]), newslice);
		        return newslice
			}
		}, squareSlice);
	return wobble;
}

module.exports = { main }
