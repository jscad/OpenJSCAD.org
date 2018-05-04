// title      : S Hook
// author     : Joost Nieuwenhuijse
// license    : MIT License
// description: a simple S-hook design
// file       : s-hook.jscad

// Here we define the user editable parameters:

function getParameterDefinitions () {
  return [
    { name: 'topdiameter', caption: 'Inner diameter of top hook:', type: 'float', initial: 16.7, step: 0.1 },
    { name: 'clampfactor', caption: 'Snugness of top hook (0 - 100):', type: 'float', initial: 25, min: 0, max: 100 },
    { name: 'cliplength', caption: 'Top hook clip length:', type: 'float', initial: 5 },
    { name: 'bottomdiameter', caption: 'Inner diameter of bottom hook:', type: 'float', initial: 20 },
    { name: 'height', caption: 'Outer height of the hook:', type: 'float', initial: 60 },
    { name: 'thickness', caption: 'Thickness:', type: 'float', initial: 5 },
    { name: 'width', caption: 'Width:', type: 'float', initial: 7 },
    { name: 'rounded', type: 'choice', caption: 'Rounded edges', values: [0, 1], captions: ['No', 'Yes (rendering will take a long time!)'], initial: 0 },
    { name: 'roundness', caption: 'Diameter of rounded edges (if enabled):', type: 'float', initial: 1.5, step: 0.1 },
    { name: 'buildwidth', caption: 'Width (x) of build area (to print multiple copies):', type: 'float', initial: 90 },
    { name: 'builddepth', caption: 'Depth (y) of build area (to print multiple copies):', type: 'float', initial: 90 }
  ];
}

function main (params) {
  if (OpenJsCad.log) OpenJsCad.log('start');

  var pathresolution = 16;
  var expandresolution = 6;

  // construct the 2D path:
  var topradius = params.topdiameter / 2;
  var bottomradius = params.bottomdiameter / 2;
  var halfthickness = params.thickness / 2;
  topradius += halfthickness;
  bottomradius += halfthickness;

  var roundness = params.roundness;
  if (params.rounded !== 1) {
    roundness = 0;
  }
  roundness = Math.min(roundness, halfthickness - 0.1, params.width / 2 - 0.1);
  if (roundness < 0) roundness = 0;

  var clampfactor = params.clampfactor / 100;
  if (clampfactor < 0) clampfactor = 0;
  if (clampfactor >= 1) clampfactor = 1;
  clampfactor *= (topradius - halfthickness) / topradius;

  var topstartangle = -180 * Math.acos(1 - 2 * clampfactor) / Math.PI;
  var tophookcenter = new CSG.Vector2D(topradius, 0);
  var tophookstart = tophookcenter.plus(CSG.Vector2D.fromAngleDegrees(topstartangle).times(topradius));
  var circledistance = params.height - topradius - bottomradius - 2 * params.thickness;
  if (circledistance < 0) circledistance = 0;
  var bottomhookcenter = new CSG.Vector2D(-bottomradius, -circledistance);
  var gravityangle = 90 - tophookcenter.minus(bottomhookcenter).angleDegrees();

  var path = new CSG.Path2D();

  // top hook curve:
  if (params.cliplength > 0) {
    var clipstart = new CSG.Vector2D([0, -1]).times(params.cliplength).plus(tophookstart);
    path = path.appendPoint(clipstart);
  }
  var topcurvepath = CSG.Path2D.arc({
    center: tophookcenter,
    radius: topradius,
    startangle: topstartangle,
    endangle: 180,
    resolution: pathresolution,
    maketangent: true
  });
  path = path.concat(topcurvepath);

  // straight middle part:
  if (circledistance > 0) {
    path = path.appendPoint([0, -circledistance]);
  }

  // bottom hook curve:
  var bottomcurvepath = CSG.Path2D.arc({
    center: bottomhookcenter,
    radius: bottomradius,
    startangle: 0,
    endangle: -180 - gravityangle,
    resolution: pathresolution,
    maketangent: true
  });
  path = path.concat(bottomcurvepath);

  // center around origin, and rotate as it would hang under gravity:
  var centerpoint = tophookcenter.plus(bottomhookcenter).times(0.5);
  var matrix = CSG.Matrix4x4.translation(centerpoint.negated().toVector3D(0));
  matrix = matrix.multiply(CSG.Matrix4x4.rotationZ(gravityangle));
  path = path.transform(matrix);

  // extrude the path to create a 3D solid
  var hook = path.rectangularExtrude(2 * (halfthickness - roundness), params.width - 2 * roundness, pathresolution, true);
  hook = hook.translate([0, 0, -params.width / 2 + roundness]);

  // expand to create rounded corners:
  if (roundness > 0) {
    hook = hook.expand(roundness, expandresolution);
  }
  // hook = hook.toPointCloud(0.1);

  // determine how many objects will fit in the build area:
  var bounds = hook.getBounds();
  var objsize = bounds[1].minus(bounds[0]);
  var margin = 5; // distance between the copies
  var numx = Math.floor((params.buildwidth + margin) / (objsize.x + margin));
  var numy = Math.floor((params.builddepth + margin) / (objsize.y + margin));
  if (numx < 1) numx = 1;
  if (numy < 1) numy = 1;

  // and make the copies:
  var result = new CSG();
  for (var x = 0; x < numx; x++) {
    var deltax = ((1 - numx) / 2 + x) * (objsize.x + margin);
    var colresult = new CSG();
    for (var y = 0; y < numy; y++) {
      var deltay = ((1 - numy) / 2 + y) * (objsize.y + margin);
      var translated = hook.translate(new CSG.Vector3D(deltax, deltay, 0));
      colresult = colresult.union(translated);
    }
    result = result.union(colresult);
  }

  if (OpenJsCad.log) OpenJsCad.log('finish');
  return result;
}
