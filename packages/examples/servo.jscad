// title      : Servo Motor
// author     : Joost Nieuwenhuijse
// license    : MIT License
// description: a servo motor design
// file       : servo.jscad

// This demo intends to show how to use properties and connectors.
// The servoMotor() function constructs the shape of a standard servo
// It also defines a property for the cutout shape, and a connector property
// which can be used to correctly attach the motor to a surface.
//
// By using connectors, we don't need to know the actual orientation of each
// object. Instead we just attach the two objects by attaching their connectors.
//
// The cutout shape is automatically transformed with every transformation of
// the servo. We can simply subtract it from an object to make space for the servo
// motor.

function main (params) {
  // the servo motor solid:
  var servo = servoMotor();

  // the plate:
  var plate = CSG.cube({radius: [40, 40, 4]});

  // Define a Connector on the plate, at the place where we want to attach the servo:
  plate.properties.servoConnector = new CSG.Connector(
    [0, 0, 4], // point
    [0, 0, 1], // axis: pointing upwards
    [2.5, 1.1, 0] // normal: use some random vector in the z plane
  );

  // Do some random rotations:
  plate = plate.rotateX(25);
  plate = plate.rotateZ(10);
  // now we really don't know the orientation of the plane anymore!

  // Still we can perfectly align the servo motor to the plane at the servoConnector
  // point that we decided on earlier:
  servo = servo.connectTo(
    servo.properties.servomotor.surfaceConnector, // the servo's pre defined Connector
    plate.properties.servoConnector, // the connector on the surface
    false, // we don't want to mirror; the Connector's axes should point in the same direction
    0 // normalrotation; we could use it to rotate the servo in the plane
  );

  // Construct the result; use the parameters set by the end user:
  var result = new CSG();
  if (params.cutout === 1) plate = plate.subtract(servo.properties.servomotor.cutout);
  if (params.showplate === 1) result = result.union(plate);
  if (params.showservo === 1) result = result.union(servo);
  if (params.showcutout === 1) result = result.union(servo.properties.servomotor.cutout.setColor(0, 0.8, 0));

  return result;
}

// Here we define the user editable parameters:

function getParameterDefinitions () {
  return [
    {name: 'showservo', caption: 'Show servo:', type: 'choice', values: [0, 1], initial: 1, captions: ['No', 'Yes']},
    {name: 'showplate', caption: 'Show plate:', type: 'choice', values: [0, 1], initial: 1, captions: ['No', 'Yes']},
    {name: 'showcutout', caption: 'Show cutout:', type: 'choice', values: [0, 1], initial: 0, captions: ['No', 'Yes']},
    {name: 'cutout', caption: 'Subtract the servo cutout shape from the plate:', type: 'choice', values: [0, 1], initial: 1, captions: ['No', 'Yes']}
  ];
}

// The servoMotor() function constructs the shape of a standard '3003' servo
// Returns a CSG solid. The solid has the following additional properties:
//    .properties.servomotor.cutout: a CSG solid that can be used to create a cutout for the servo motor (including screw holes)
//    .properties.servomotor.surfaceConnector: a CSG.Connector that can be used to attach the servo motor to a surface

function servoMotor () {
  var width = 20;
  var length = 40.5;
  var h1 = 26.5;
  var h2 = 29;
  var h4 = 35.9;
  var l1 = 55.4;
  var w1 = 17.8;
  var holeradius = 2.1;
  var holex1 = 2 * 2.54;
  var holey1 = 9.5 * 2.54;
  var cutoutmargin = 1;
  var shaftradius = 3;
  var shafty = 9.25;
  var shafttop = 43;
  var cyl2radius = 7;
  var cyl2height = 2;

  var resolution = 16; // for all circular objects

  // result: this is the solid in which we will store the servomotor
  var result = CSG.cube({radius: [width / 2, length / 2, h4 / 2]});

  // cutout: this is the solid for the cutout. It is never rendered directly,
  // but it will be returned as a property of the resulting solid.
  // it can be used to cutout the shape of the servo motor and screw holes
  // from another solid
  var cutout = CSG.cube({radius: [width / 2 + cutoutmargin, length / 2 + cutoutmargin, h4 / 2 + cutoutmargin]});

  // add a 'bottomface' property. Since the cube already has predifined connectors at each face,
  // we can just copy the 5th:
  result.properties.servomotor = new CSG.Properties();
  result.properties.servomotor.bottomface = result.properties.cube.facecenters[5];

  // get the z coordinate of the bottom face:
  var bottomz = result.properties.servomotor.bottomface.point.z;

  // the tabs at the end containing the screw holes:
  var cube2 = CSG.cube({radius: [w1 / 2, l1 / 2, (h2 - h1) / 2]});
  cube2 = cube2.translate([0, 0, (h2 - h1) / 2 + bottomz + h1]);
  result = result.union(cube2);

  // create the cylinders for cutting out the screw holes:
  for (var hole = 0; hole < 4; hole++) {
    var xoffset = (hole & 1) ? holex1 : -holex1;
    var yoffset = (hole & 2) ? holey1 : -holey1;
    var cylstart = new CSG.Vector3D([xoffset, yoffset, bottomz + h2]);
    var cylend = new CSG.Vector3D([xoffset, yoffset, bottomz]);
    var cutoutcylinder = CSG.cylinder({start: cylstart, end: cylend, radius: holeradius, resolution: resolution});

    // create the screw hole in the tabs:
    result = result.subtract(cutoutcylinder);

    // And also add the cutout cylinder to the cutout shape:
    cutout = cutout.union(cutoutcylinder);
  }

  // cylinder at top:
  var p1 = new CSG.Vector3D([0, shafty, bottomz + h4]);
  p2 = p1.plus(new CSG.Vector3D([0, 0, cyl2height]));
  var cyl = CSG.cylinder({start: p1, end: p2, radius: cyl2radius, resolution: resolution});
  result = result.union(cyl);

  // make the entire motor grey:
  result = result.setColor(0.2, 0.2, 0.2);

  // create the shaft:
  p1 = new CSG.Vector3D([0, shafty, bottomz + h4]);
  p2 = p1.plus(new CSG.Vector3D([0, 0, cyl2height]));
  var shaft = CSG.cylinder({start: [0, shafty, bottomz + h4], end: [0, shafty, bottomz + shafttop], radius: shaftradius, resolution: resolution});
  shaft = shaft.setColor(1, 1, 1);
  result = result.union(shaft);

  // add the cutout solid to the properties:
  result.properties.servomotor.cutout = cutout;

  // Add a Connector to facilitate proper alignment of the servo motor to a surface
  // - The connector's point is at the x/y center of the box, in the bottom plane of the tabs
  // - The connector's axis points towards the top of the box
  // - The connector's normal points towards one of the tabs at the side
  result.properties.servomotor.surfaceConnector = new CSG.Connector(
    [0, 0, bottomz + h1], // point
    [0, 0, 1], // axis
    [0, 1, 0] // normal
  );

  return result;
}
