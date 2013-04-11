// title: Non Affine Transformation
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()

function main(params) {
	var radius = 20,
		height = 60,
		vec = new CSG.Vector3D(0, radius, 0),
		angle;

	angle = 360 / 7;
	var pol7 = CSG.Polygon.createFromPoints([
			vec,
			vec.rotateZ(1 * angle),
			vec.rotateZ(2 * angle),
			vec.rotateZ(3 * angle),
			vec.rotateZ(4 * angle),
			vec.rotateZ(5 * angle),
			vec.rotateZ(6 * angle)
	]);

	angle = 360 / 6;
	var hex = CSG.Polygon.createFromPoints([
			vec,
			vec.rotateZ(1 * angle),
			vec.rotateZ(2 * angle),
			vec.rotateZ(3 * angle),
			vec.rotateZ(4 * angle),
			vec.rotateZ(5 * angle)
	]);

	angle = 360 / 5;
	var pent = CSG.Polygon.createFromPoints([
			vec,
			vec.rotateZ(1 * angle),
			vec.rotateZ(2 * angle),
			vec.rotateZ(3 * angle),
			vec.rotateZ(4 * angle)
		]);

	angle = 360 / 4;
	var square = CSG.Polygon.createFromPoints([
			vec,
			vec.rotateZ(1 * angle),
			vec.rotateZ(2 * angle),
			vec.rotateZ(3 * angle)
		]);

	angle = 360 / 3;
	var triag = CSG.Polygon.createFromPoints([
			vec,
			vec.rotateZ(1 * angle),
			vec.rotateZ(2 * angle)
		]);

	var polygons = [pol7, hex, pent, square, triag, pol7, hex, pent, square, triag];

	return triag.solidFromSlices({
		numslices: polygons.length,
		callback: function(t, slice) {
			return polygons[slice].translate (
					[0,0,height * t]
				);
		}
	});
}
