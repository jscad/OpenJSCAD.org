// title: Rose Curve
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()

function main(params) {
	var radius = 50,
		height = 60,
		vec = new CSG.Vector3D(0, 5, 0),
		angle;

	angle = 360 / 5;
	var pent = CSG.Polygon.createFromPoints([
			vec,
			vec.rotateZ(1 * angle),
			vec.rotateZ(2 * angle),
			vec.rotateZ(3 * angle),
			vec.rotateZ(4 * angle)
		]).rotateY(90).setColor([1,0,0.1]);//.translate([0, radius, 0]);

	//rose: r = a * sin(k * fi)
	// k = 5 /3
	var k = 5 / 3;
	return pent.solidFromSlices({
		numslices: 300,
		loop: true,
		callback: function(t, slice) {
			var angle = t * Math.PI * 3,
				r = radius * Math.sin(k * angle),
				x = r * Math.cos(angle),
				y = r * Math.sin(angle),
				vec = new CSG.Vector3D(x, y, 0);
				//normal
				var x1 = radius * (k * Math.cos(k * angle) * Math.cos(angle) - Math.sin(angle) * Math.sin(k * angle)),
					y1 = radius * (k * Math.cos(k * angle) * Math.sin(angle) + Math.cos(angle) * Math.sin(k * angle)),
					turn = (new CSG.Vector2D(x1, y1)).angleDegrees();

			return this.rotateZ(turn).translate(vec);
		}
	});
}
