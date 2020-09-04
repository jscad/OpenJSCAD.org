/*
// title      : Involute Gear
// authors    : Joost Nieuwenhuijse, Simon Clark
// license    : MIT License
// description: Build a proper involute gear, demonstrating parameters, and how they can be used in complex math.
// tags       : gear, tangent, parameter, parameters
// file       : gear.js
*/

const jscad = require('@jscad/modeling')
const { cylinder, polygon } = jscad.primitives
const { rotateZ, translateZ } = jscad.transforms
const { extrudeLinear } = jscad.extrusions
const { union, subtract } = jscad.booleans
const { vec2 } = jscad.maths
const { degToRad } = jscad.utils

// Here we define the user editable parameters:
const getParameterDefinitions = () => {
  return [
    { name: 'numTeeth', caption: 'Number of teeth:', type: 'int', initial: 10, min: 5, max: 20, step: 1 },
    { name: 'circularPitch', caption: 'Circular pitch:', type: 'float', initial: 5 },
    { name: 'pressureAngle', caption: 'Pressure angle:', type: 'float', initial: 20 },
    { name: 'clearance', caption: 'Clearance:', type: 'float', initial: 0.0, step: 0.1 },
    { name: 'thickness', caption: 'Thickness:', type: 'float', initial: 5 },
    { name: 'centerholeradius', caption: 'Radius of center hole (0 for no hole):', type: 'float', initial: 2 }
  ]
}

// Main entry point; here we construct our solid:
const main = (params) => {
  let gear = involuteGear(
    params.numTeeth,
    params.circularPitch,
    degToRad(params.pressureAngle),
    params.clearance,
    params.thickness
  )
  if (params.centerholeradius > 0) {
    const centerHole = translateZ(params.thickness / 2, cylinder({ height: params.thickness, radius: params.centerholeradius, segments: 16 }))
    gear = subtract(gear, centerHole)
  }
  return gear
}

const createSingleToothPolygon = (maxAngle, baseRadius, angularToothWidthAtBase) => {
  // build a single 2d tooth in the 'points' array
  // A single tooth is a polygon from the origin out.
  // the points on the involute curve are made by adding a series of radial lines to tangents of increasing length.
  const toothCurveResolution = 5
  const points = [[0, 0]]
  for (let i = 0; i <= toothCurveResolution; i++) {
    // first side of the tooth:
    const angle = maxAngle * i / toothCurveResolution
    const tanLength = angle * baseRadius
    let radiantVector = vec2.fromAngle(angle)
    let tangentVector = vec2.scale(-tanLength, vec2.normal(radiantVector))
    radiantVector = vec2.scale(baseRadius, radiantVector)
    points[i + 1] = [radiantVector[0] + tangentVector[0], radiantVector[1] + tangentVector[1]]

    // opposite side of the tooth:
    radiantVector = vec2.fromAngle(angularToothWidthAtBase - angle)
    tangentVector = vec2.scale(tanLength, vec2.normal(radiantVector))
    radiantVector = vec2.scale(baseRadius, radiantVector)
    points[(2 * toothCurveResolution) + 2 - i] = [radiantVector[0] + tangentVector[0], radiantVector[1] + tangentVector[1]]
  }
  return polygon({ points, closed: true })
}

const createBaseCirclePolygon = (numTeeth, angularToothWidthAtBase, rootRadius) => {
  const points = []
  const toothAngle = 2 * Math.PI / numTeeth
  const toothCenterAngle = 0.5 * angularToothWidthAtBase
  for (let k = 0; k < numTeeth; k++) {
    const currentAngle = toothCenterAngle + k * toothAngle
    var p1 = vec2.scale(rootRadius, vec2.fromAngle(currentAngle))
    points.push([p1[0], p1[1]])
  }
  return polygon({ points, closed: true })
}

const joinGearTeeth = (numTeeth, tooth3d) => {
  const allTeeth = []
  for (let j = 0; j < numTeeth; j++) {
    const currentToothAngle = j * 2 * Math.PI / numTeeth
    const rotatedTooth = rotateZ(currentToothAngle, tooth3d)
    allTeeth.push(rotatedTooth)
  }
  return allTeeth
}

/*
  For gear terminology see:
    http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
  Algorithm based on:
    http://www.cartertools.com/involute.html
*/
const involuteGear = (numTeeth, circularPitch, pressureAngle, clearance, thickness) => {
  const addendum = circularPitch / Math.PI
  const dedendum = addendum + clearance

  // radii of the 4 circles:
  const pitchRadius = numTeeth * circularPitch / (2 * Math.PI)
  const baseRadius = pitchRadius * Math.cos(pressureAngle)
  const outerRadius = pitchRadius + addendum
  const rootRadius = pitchRadius - dedendum

  const maxTanLength = Math.sqrt(outerRadius * outerRadius - baseRadius * baseRadius)
  const maxAngle = maxTanLength / baseRadius

  const tlAtPitchCircle = Math.sqrt(pitchRadius * pitchRadius - baseRadius * baseRadius)
  const angleAtPitchCircle = tlAtPitchCircle / baseRadius
  const diffAngle = angleAtPitchCircle - Math.atan(angleAtPitchCircle)
  const angularToothWidthAtBase = (Math.PI / numTeeth) + (2 * diffAngle)

  // create the polygon for a single tooth.
  const singleTooth2D = createSingleToothPolygon(maxAngle, baseRadius, angularToothWidthAtBase)
  // extrude into 3D:
  const singleTooth3D = extrudeLinear({ height: thickness }, singleTooth2D)
  const allTeeth = joinGearTeeth(numTeeth, singleTooth3D)

  // build the root circle:
  const rootCircle2D = createBaseCirclePolygon(numTeeth, angularToothWidthAtBase, rootRadius)
  // extrude into 3D:
  const rootcircle = extrudeLinear({ height: thickness }, rootCircle2D)

  return union(rootcircle, allTeeth)
}

module.exports = { main, getParameterDefinitions }
