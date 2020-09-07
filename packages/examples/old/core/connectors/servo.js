// title      : Servo Motor
// author     : Joost Nieuwenhuijse
// license    : MIT License
// description: a servo motor design
// file       : servo.js

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

// TODO Determine if/how connectors work with no object properties.

const jscad = require('@jscad/modeling')
console.log(jscad)
const { curves, maths, extrusions, primitives, transforms, booleans } = jscad
const { bezier } = curves
const { slice } = extrusions
const { cuboid, cylinder } = primitives
const { translate } = transforms
const { union, subtract } = booleans

const main = (params) => {
  // the servo motor solid:
  var servo = servoMotor()
  return servo
  // the plate:
  var plate = cuboid({ size: [40, 40, 4] })

  // Define a Connector on the plate, at the place where we want to attach the servo:
  plate.properties.servoConnector = new CSG.Connector(
    [0, 0, 4], // point
    [0, 0, 1], // axis: pointing upwards
    [2.5, 1.1, 0] // normal: use some random vector in the z plane
  )

  // Do some random rotations:
  plate = plate.rotateX(25)
  plate = plate.rotateZ(10)
  // now we really don't know the orientation of the plane anymore!

  // Still we can perfectly align the servo motor to the plane at the servoConnector
  // point that we decided on earlier:
  servo = servo.connectTo(
    servo.properties.servomotor.surfaceConnector, // the servo's pre defined Connector
    plate.properties.servoConnector, // the connector on the surface
    false, // we don't want to mirror; the Connector's axes should point in the same direction
    0 // normalrotation; we could use it to rotate the servo in the plane
  )

  // Construct the result; use the parameters set by the end user:
  var result = new CSG()
  if (params.cutout === 1) plate = plate.subtract(servo.properties.servomotor.cutout)
  if (params.showplate === 1) result = result.union(plate)
  if (params.showservo === 1) result = result.union(servo)
  if (params.showcutout === 1) result = result.union(servo.properties.servomotor.cutout.setColor(0, 0.8, 0))

  return result
}

// Here we define the user editable parameters:

function getParameterDefinitions () {
  return [
    { name: 'showservo', caption: 'Show servo:', type: 'choice', values: [0, 1], initial: 1, captions: ['No', 'Yes'] },
    { name: 'showplate', caption: 'Show plate:', type: 'choice', values: [0, 1], initial: 1, captions: ['No', 'Yes'] },
    { name: 'showcutout', caption: 'Show cutout:', type: 'choice', values: [0, 1], initial: 0, captions: ['No', 'Yes'] },
    { name: 'cutout', caption: 'Subtract the servo cutout shape from the plate:', type: 'choice', values: [0, 1], initial: 1, captions: ['No', 'Yes'] }
  ]
}

// The servoMotor() function constructs the shape of a standard '3003' servo
// Returns a CSG solid. The solid has the following additional properties:
//    .properties.servomotor.cutout: a CSG solid that can be used to create a cutout for the servo motor (including screw holes)
//    .properties.servomotor.surfaceConnector: a CSG.Connector that can be used to attach the servo motor to a surface

function servoMotor () {
  const bodyWidth = 20
  const bodyLength = 40.5
  const heightToTabs = 26.5
  const tabsHeight = 2.5
  const bodyHeight = 35.9
  const tabsLength = 55.4
  const tabsWidth = 17.8
  const holeRadius = 2.1
  const holeXOffset = 2 * 2.54
  const holeYOffset = 9.5 * 2.54
  const cutOutMargin = 1
  const shaftRadius = 3
  const shaftY = 9.25
  const shaftHeight = 4
  const cyl2radius = 7
  const gearHousingHeight = 2

  const resolution = 16 // for all circular objects

  // servoMotor: this is the solid in which we will store the servomotor
  let servoMotor = translate(
    [0, 0, bodyHeight / 2],
    cuboid({ size: [bodyWidth, bodyLength, bodyHeight] })
  )
  // console.log(servoMotor); return servoMotor

  // cutout: this is the solid for the cutout. It is never rendered directly,
  // but it will be returned as a property of the resulting solid.
  // it can be used to cutout the shape of the servo motor and screw holes
  // from another solid
  var cutout = translate(
    [0, 0, (bodyHeight / 2) + cutOutMargin],
    cuboid({ size: [bodyWidth + (2 * cutOutMargin), bodyLength + (2 * cutOutMargin), bodyHeight + (2 * cutOutMargin)] })
  )

  // add a 'bottomface' property. Since the cube already has predefined connectors at each face,
  // we can just copy the 5th:
  // servoMotor.properties.servomotor = new CSG.Properties()
  // servoMotor.properties.servomotor.bottomface = servoMotor.properties.cube.facecenters[5]

  // the tabs at the end containing the screw holes:
  let servoTabs = cuboid({ size: [tabsWidth, tabsLength, tabsHeight] })
  servoTabs = translate([0, 0, (tabsHeight / 2) + heightToTabs], servoTabs)
  servoMotor = union(servoMotor, servoTabs)

  // servoMotor = cuboid({ size: [1,1,1] })
  // create the cylinders for cutting out the screw holes:
  for (let hole = 0; hole < 4; hole++) {
    const xoffset = (hole & 1) ? holeXOffset : -holeXOffset
    const yoffset = (hole & 2) ? holeYOffset : -holeYOffset
    // let cylstart = [xoffset, yoffset, bottomZ + h2]
    // let cylend = [xoffset, yoffset, bottomZ]
    const cutoutcylinder = translate([xoffset, yoffset, tabsHeight / 2 + heightToTabs],
      cylinder({ height: tabsHeight, radius: holeRadius, segments: resolution })
    )

    // create the screw hole in the tabs:
    servoMotor = subtract(servoMotor, cutoutcylinder)

    // And also add the cutout cylinder to the cutout shape:
    cutout = union(cutoutcylinder, cutout)
  }

  // cylinder at top:
  var gearHousing = translate(
      [0,shaftY,gearHousingHeight / 2 + bodyHeight],
      cylinder({ height: gearHousingHeight, radius: cyl2radius, resolution: resolution })
  )
  servoMotor = union(servoMotor,gearHousing)

  // make the entire motor grey:
  // servoMotor = servoMotor.setColor(0.2, 0.2, 0.2)

  // create the shaft:
  // p1 = new CSG.Vector3D([0, shaftY, bottomZ + bodyHeight])
  // p2 = p1.plus(new CSG.Vector3D([0, 0, gearHousingHeight]))
  var shaft = translate(
      [0, shaftY, shaftHeight / 2 + bodyHeight + gearHousingHeight],
      cylinder({height: shaftHeight, radius: shaftRadius, segments: resolution })
  )
  servoMotor = union(shaft, servoMotor)

  // add the cutout solid to the properties:
  // servoMotor.properties.cutout = 2

  return servoMotor

  // Add a Connector to facilitate proper alignment of the servo motor to a surface
  // - The connector's point is at the x/y center of the box, in the bottom plane of the tabs
  // - The connector's axis points towards the top of the box
  // - The connector's normal points towards one of the tabs at the side
  // servoMotor.properties.servomotor.surfaceConnector = new CSG.Connector(
  //   [0, 0, bottomZ + heightToTabs], // point
  //   [0, 0, 1], // axis
  //   [0, 1, 0] // normal
  // )

  // return servoMotor
}

module.exports = { main, getParameterDefinitions }
