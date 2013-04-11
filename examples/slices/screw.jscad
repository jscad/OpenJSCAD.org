// title: Screw
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()

function main(params) {
	var sqrt3 = Math.sqrt(3) / 2;
	var radius = 10;

	var hex = CSG.Polygon.createFromPoints([
			[radius, 0, 0],
			[radius / 2, radius * sqrt3, 0],
			[-radius / 2, radius * sqrt3, 0],
			[-radius, 0, 0],
			[-radius / 2, -radius * sqrt3, 0],
			[radius / 2, -radius * sqrt3, 0]
	]).setColor(
		[0, 0.8, 0]
	);
	var angle = 5;
	return hex.solidFromSlices({
		numslices: 720 / angle,
		callback: function(t, slice) {
			var coef = 1 - t * 0.8;
			return this.scale(coef).translate([radius * 4 * t, t * 15, 0]).rotate(
						[0,20,0],
						[-1, 0, 0],
						angle * slice
					);
		}
	});
}
