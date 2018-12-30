// title: Jar barrel
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()

// Here we define the user editable parameters:
function getParameterDefinitions() {
  return [
    { name: 'diameter', caption: 'Jar diameter:', type: 'float', default: 35 },
    { name: 'height', caption: 'Jar height:', type: 'float', default: 35 },
    { name: 'wallThick', caption: 'Jar wall thick:', type: 'float', default: 1 }
  ];
}

function main(params)
{
  var radius = params.diameter / 2;
  var thick = params.wallThick;
  var height = params.height;
  var bottomThick = 2 * thick;

  var jar = hexTwisted(radius, height, 60).subtract(
    hexTwisted( radius - thick, height - bottomThick, 60)
    	 //rotate because jar is already rotated on that level
    	 //otherwise will get holes
    	.rotateZ(60 * (bottomThick / height))
    	.translate([0,0,bottomThick]) //make jar bottom
  );
  return jar;
}

function hexTwisted(radius, height, twistangle) {
  twistangle = twistangle || 0;
  var sqrt3 = Math.sqrt(3) / 2;
  var cag = CAG.fromPoints([
      [radius, 0, 0],
      [radius / 2, radius * sqrt3, 0],
      [-radius / 2, radius * sqrt3, 0],
      [-radius, 0, 0],
      [-radius / 2, -radius * sqrt3, 0],
      [radius / 2, -radius * sqrt3, 0]
   ]).expand(4, CSG.defaultResolution2D);

	var flatBottom = CSG.Polygon.createFromPoints(
		cag.getOutlinePaths()[0].points
	);

  var hex = flatBottom.solidFromSlices({
	numslices: height
	,callback: function(t) {
		var coef = (t > 0.5 ? 1 - t : t) + 0.8;
		var polygon = this.rotateZ(t * twistangle)
						.translate([0, 0, height * t])
						.scale([coef, coef, 1]);
		return polygon;
    }
  });
   return hex;
}
