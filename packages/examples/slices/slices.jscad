// title: Slices (single screw evolution)
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()

function main(params) {
	var sqrt3 = Math.sqrt(3) / 2;
	var radius = 20;

	var hex = CSG.Polygon.createFromPoints([
			[radius, 0, 0]
			,[radius + 3, 0, 3]
			,[radius, 0, 6]
	]);
	var angle = 5;
	return hex.solidFromSlices({
		numslices: 420 / angle,
		callback: function(t, slice) {
			return this.translate([0, 0, t * 8]).rotate(
						[0,0,0], //center
						[0, 0, 10], //direction
						angle * slice
					);
		}
	});
}
