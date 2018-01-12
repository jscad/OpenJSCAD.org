// title: Spring
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()

function main(params) {
	var sqrt3 = Math.sqrt(3) / 2;
	var radius = 2;

	var hex = CSG.Polygon.createFromPoints([
			[radius, 0, 0],
			[radius / 2, radius * sqrt3, 0],
			[-radius / 2, radius * sqrt3, 0],
			[-radius, 0, 0],
			[-radius / 2, -radius * sqrt3, 0],
			[radius / 2, -radius * sqrt3, 0]
	]);
	var angle = 10, //generate slice every 10 deg
		springRadius = 10,
		loops = 5,
		loopGap = radius * 2 * sqrt3 + 2;//spring thick and gap
	return hex.solidFromSlices({
		numslices: 360 * loops / angle,
		callback: function(t, slice) {
			return this.translate([loopGap * loops * t, 0, 0]).rotate(
						[0,springRadius,0],
						[-1, 0, 0],
						angle * slice
					);
		}
	});
}
