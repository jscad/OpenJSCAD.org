const jscad = require('@jscad/modeling')
const {
	color, connectors, geometries, maths, primitives, text, utils,
	booleans, expansions, extrusions, hulls, measurements, transforms
} = jscad

const { cuboid, sphere, cylinder, circle, star } = require('@jscad/modeling').primitives
const { translate, rotate, scale } = transforms
const { slice } = extrusions

const main = () => {
	return [
		extrudeWobble(30)
	]
}

function extrudeWobble(height) {
	var squareSlice = slice.fromPoints([[10, 10], [-10, 10], [-10, -10], [10, -10]]);

	var xCurve = maths.bezier.create([1, 2, 0.4, 1]);
	var yCurve = maths.bezier.create([1, 2, 0.5]);

	let wobble = extrusions.extrudeFromSlices({
			numberOfSlices: 20,
			isCapped: true,
			callback: function (progress, count, base) {
        		let newslice = slice.transform(maths.mat4.fromTranslation([0, 0, height * progress]), base);
        		newslice = slice.transform(maths.mat4.fromScaling([
     				xCurve.at(progress),
		        	yCurve.at(progress),
		        	1
		        ]), newslice);
		        return newslice
			}
		}, squareSlice);
	return wobble;
}

module.exports = { main }
