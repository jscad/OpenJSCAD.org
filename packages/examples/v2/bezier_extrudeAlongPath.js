const jscad = require('@jscad/modeling')
const {
	colors, connectors, geometries, maths, primitives, text, utils,
	booleans, expansions, extrusions, hulls, measurements, transforms
} = jscad

const { cuboid, sphere, cylinder, circle, star } = require('@jscad/modeling').primitives
const { translate, rotate, scale, transform } = transforms
const { slice, extrudeLinear } = extrusions


console.log('jscad', jscad)

const main = () => {
	return [
		box4x4([-8,-4,2], [1,0,0]),
		box4x4([8,4,12], [0,1,0]),
		tube([
			[6,4,12],
			[-3,4,12],
			[4,-4,2],
			[-6,-4,2]
		]),
		tube([
			[8,2,12],
			[8,-6,12],
			[8,0,0],
			[-8,4,2],
			[-8,-2,2]
		]),
	]
}

function tube(bezierControlPoints) {
	// Create the initial slice
	let circ = circle({radius: 1, segments:32});
	let l = bezierControlPoints.length - 1;
	let circPoints = geometries.geom2.toPoints(circ);
	let tubeSlice = slice.fromPoints(circPoints);

	// Rotate it close to the direction we are going in.  Rotation gets funky around 180˚
	let bezierDelta = maths.vec3.fromArray([
		bezierControlPoints[l][0] - bezierControlPoints[0][0],
		bezierControlPoints[l][1] - bezierControlPoints[0][1],
		bezierControlPoints[l][2] - bezierControlPoints[0][2]
	]);
	tubeSlice = slice.transform(fromVectors(maths.vec3.fromArray([0,0,1]),bezierDelta), tubeSlice);

	// Create the bezier function
	var tubeCurve = maths.bezier.create(bezierControlPoints);

	// ...and extrude.
	let tube = extrusions.extrudeFromSlices({
			numberOfSlices: 60,
			isCapped: true,
			callback: function (progress, count, base) {
				let positionArray = tubeCurve.at(progress);
				let tangentArray = tubeCurve.tangentAt(progress);
				let rotationMatrix = fromVectors(bezierDelta, maths.vec3.fromArray(tangentArray));
				let translationMatrix = maths.mat4.fromTranslation(positionArray);
        		let sliceAtProgress = slice.transform(maths.mat4.multiply(translationMatrix, rotationMatrix), base);
		        return sliceAtProgress
			}
		}, tubeSlice);
	return tube;
}


function fromVectors(srcVector, targetVector)
{
	// From https://gist.github.com/kevinmoran/b45980723e53edeb8a5a43c49f134724
	srcVector = maths.vec3.normalize(srcVector);
	targetVector = maths.vec3.normalize(targetVector);

    let axis = maths.vec3.cross( targetVector, srcVector );
    let cosA = maths.vec3.dot( targetVector, srcVector );
    let k = 1 / (1 + cosA);

 	R = maths.mat4.fromValues(
		(axis[0]*axis[0]*k)+cosA, (axis[1]*axis[0]*k)-axis[2], (axis[2]*axis[0]*k)+axis[1], 0,
		(axis[0]*axis[1]*k)+axis[2], (axis[1]*axis[1]*k)+cosA, (axis[2]*axis[1]*k)-axis[0], 0,
		(axis[0]*axis[2]*k)-axis[1], (axis[1]*axis[2]*k)+axis[0], (axis[2]*axis[2]*k)+cosA, 0,
		0,0,0,1
	);

	return R
}


function box4x4(translation, color) {
	let b = cuboid({size:[4,4,4]});
	return colors.colorize(color, translate(translation, b));
}


module.exports = { main }
