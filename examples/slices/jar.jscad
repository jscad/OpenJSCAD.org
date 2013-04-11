// title: Jar
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

  var bounds = flatBottom.boundingBox();
  //save bounds to remove barrel effect created by rotation
  var bottomBounds = {
  	x: Math.abs(bounds[1].x - bounds[0].x),
  	y: Math.abs(bounds[1].y - bounds[0].y)
  };


  var hex = flatBottom.solidFromSlices({
	numslices: height
	,callback: function(t) {
		var polygon = this.rotateZ(t * twistangle).translate([0, 0, height * t]);
		var bounds = polygon.boundingBox();

		var xScale = Math.max(1, Math.abs(bounds[1].x - bounds[0].x)/bottomBounds.x);
		var yScale = Math.max(1, Math.abs(bounds[1].y - bounds[0].y)/bottomBounds.y);

		return polygon.scale(1/ Math.max(xScale, yScale));
    }
  });
   return hex;
}
