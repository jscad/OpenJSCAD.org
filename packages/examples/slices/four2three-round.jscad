// title: Four to three (sides)
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()

function getParameterDefinitions() {
  return [
	{ name: 'radius', caption: 'Radius:', type: 'float', default: 10 },
	{ name: 'height', caption: 'Height:', type: 'float', default: 35 },
	{ name: 'twist', caption: 'Twist:', type: 'int', default: 90}
  ];
}

function main(params) {
	var thing = thingTwisted(params.radius, params.height, params.twist);
	return thing;
}

function thingTwisted(radius, height, twistangle) {
  twistangle = twistangle || 0;

	var cag = CAG.fromPoints([
		[-radius, -radius, 0],
		[radius, -radius, 0],
		[radius, radius, 0]
	]).expand(2, CSG.defaultResolution2D);

	var flatBottom = CSG.Polygon.createFromPoints(
		cag.getOutlinePaths()[0].points
	);

  var thing = flatBottom.solidFromSlices({
	numslices: height
	,callback: function(t) {
		var coef = 1 - t;
		if (coef < 0.01) coef = 0.01;//must not collapse polygon
		var h = height * t;
		var cag = CAG.fromPoints([
			[-radius, -radius, h],
			[radius, -radius, h],
	 		[radius * coef, radius, h],
			[-radius * coef, radius, h]
		]).expand(2, CSG.defaultResolution2D)
			.rotate([0,0,0], [0,0,1], twistangle * t);

		return CSG.Polygon.createFromPoints(
			cag.getOutlinePaths()[0].points
		).translate([0, 0, h]);
	}
  });
   return thing;
}
