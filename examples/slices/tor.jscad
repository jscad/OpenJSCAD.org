// -- Tor (multi-color)
//    by Eduard Bespalov

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
	]);
	var angle = 5;
	return hex.solidFromSlices({
		numslices: 360 / angle,
		loop: true,
		callback: function(t, slice) {
			var red = (t > 0.5 ? (1 - t) : t) * 2,
				green = t,
				blue = 1 - t;
			return this.rotate(
					[0,20,0], [-1, 0, 0], angle * slice
				).setColor(
					[red, green, blue]
				);
		}
	});
}
