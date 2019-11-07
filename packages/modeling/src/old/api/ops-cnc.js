const Matrix4x4 = require('../core/math/Matrix4.js')
const Vector3D = require('../core/math/Vector3.js')
const {Connector} = require('../core/connectors.js')
const {fromPoints} = require('../core/CAGFactories')
const Vector2D = require('../core/math/Vector2')

// Get the transformation that transforms this CSG such that it is lying on the z=0 plane,
// as flat as possible (i.e. the least z-height).
// So that it is in an orientation suitable for CNC milling
const getTransformationAndInverseTransformationToFlatLying = function (_csg) {
  if (_csg.polygons.length === 0) {
    let m = new Matrix4x4() // unity
    return [m, m]
  } else {
          // get a list of unique planes in the CSG:
    let csg = _csg.canonicalized()
    let planemap = {}
    csg.polygons.map(function (polygon) {
      planemap[polygon.plane.getTag()] = polygon.plane
    })
          // try each plane in the CSG and find the plane that, when we align it flat onto z=0,
          // gives the least height in z-direction.
          // If two planes give the same height, pick the plane that originally had a normal closest
          // to [0,0,-1].
    let xvector = new Vector3D(1, 0, 0)
    let yvector = new Vector3D(0, 1, 0)
    let zvector = new Vector3D(0, 0, 1)
    let z0connectorx = new Connector([0, 0, 0], [0, 0, -1], xvector)
    let z0connectory = new Connector([0, 0, 0], [0, 0, -1], yvector)
    let isfirst = true
    let minheight = 0
    let maxdotz = 0
    let besttransformation, bestinversetransformation
    for (let planetag in planemap) {
      let plane = planemap[planetag]
      let pointonplane = plane.normal.times(plane.w)
      let transformation, inversetransformation
              // We need a normal vecrtor for the transformation
              // determine which is more perpendicular to the plane normal: x or y?
              // we will align this as much as possible to the x or y axis vector
      let xorthogonality = plane.normal.cross(xvector).length()
      let yorthogonality = plane.normal.cross(yvector).length()
      if (xorthogonality > yorthogonality) {
                  // x is better:
        let planeconnector = new Connector(pointonplane, plane.normal, xvector)
        transformation = planeconnector.getTransformationTo(z0connectorx, false, 0)
        inversetransformation = z0connectorx.getTransformationTo(planeconnector, false, 0)
      } else {
                  // y is better:
        let planeconnector = new Connector(pointonplane, plane.normal, yvector)
        transformation = planeconnector.getTransformationTo(z0connectory, false, 0)
        inversetransformation = z0connectory.getTransformationTo(planeconnector, false, 0)
      }
      let transformedcsg = csg.transform(transformation)
      let dotz = -plane.normal.dot(zvector)
      let bounds = transformedcsg.getBounds()
      let zheight = bounds[1].z - bounds[0].z
      let isbetter = isfirst
      if (!isbetter) {
        if (zheight < minheight) {
          isbetter = true
        } else if (zheight === minheight) {
          if (dotz > maxdotz) isbetter = true
        }
      }
      if (isbetter) {
                  // translate the transformation around the z-axis and onto the z plane:
        let translation = new Vector3D([-0.5 * (bounds[1].x + bounds[0].x), -0.5 * (bounds[1].y + bounds[0].y), -bounds[0].z])
        transformation = transformation.multiply(Matrix4x4.translation(translation))
        inversetransformation = Matrix4x4.translation(translation.negated()).multiply(inversetransformation)
        minheight = zheight
        maxdotz = dotz
        besttransformation = transformation
        bestinversetransformation = inversetransformation
      }
      isfirst = false
    }
    return [besttransformation, bestinversetransformation]
  }
}

const getTransformationToFlatLying = function (csg) {
  let result = csg.getTransformationAndInverseTransformationToFlatLying()
  return result[0]
}

const lieFlat = function (csg) {
  let transformation = csg.getTransformationToFlatLying()
  return csg.transform(transformation)
}

/** cag = cag.overCutInsideCorners(cutterradius);
 * Using a CNC router it's impossible to cut out a true sharp inside corner. The inside corner
 * will be rounded due to the radius of the cutter. This function compensates for this by creating
 * an extra cutout at each inner corner so that the actual cut out shape will be at least as large
 * as needed.
 * @param {Object} _cag - input cag
 * @param {Float} cutterradius - radius to cut inside corners by
 * @returns {CAG} cag with overcutInsideCorners
 */
const overCutInsideCorners = function (_cag, cutterradius) {
  let cag = _cag.canonicalized()
  // for each vertex determine the 'incoming' side and 'outgoing' side:
  let pointmap = {} // tag => {pos: coord, from: [], to: []}
  cag.sides.map(function (side) {
    if (!(side.vertex0.getTag() in pointmap)) {
      pointmap[side.vertex0.getTag()] = {
        pos: side.vertex0.pos,
        from: [],
        to: []
      }
    }
    pointmap[side.vertex0.getTag()].to.push(side.vertex1.pos)
    if (!(side.vertex1.getTag() in pointmap)) {
      pointmap[side.vertex1.getTag()] = {
        pos: side.vertex1.pos,
        from: [],
        to: []
      }
    }
    pointmap[side.vertex1.getTag()].from.push(side.vertex0.pos)
  })
          // overcut all sharp corners:
  let cutouts = []
  for (let pointtag in pointmap) {
    let pointobj = pointmap[pointtag]
    if ((pointobj.from.length === 1) && (pointobj.to.length === 1)) {
                  // ok, 1 incoming side and 1 outgoing side:
      let fromcoord = pointobj.from[0]
      let pointcoord = pointobj.pos
      let tocoord = pointobj.to[0]
      let v1 = pointcoord.minus(fromcoord).unit()
      let v2 = tocoord.minus(pointcoord).unit()
      let crossproduct = v1.cross(v2)
      let isInnerCorner = (crossproduct < 0.001)
      if (isInnerCorner) {
                      // yes it's a sharp corner:
        let alpha = v2.angleRadians() - v1.angleRadians() + Math.PI
        if (alpha < 0) {
          alpha += 2 * Math.PI
        } else if (alpha >= 2 * Math.PI) {
          alpha -= 2 * Math.PI
        }
        let midvector = v2.minus(v1).unit()
        let circlesegmentangle = 30 / 180 * Math.PI // resolution of the circle: segments of 30 degrees
                      // we need to increase the radius slightly so that our imperfect circle will contain a perfect circle of cutterradius
        let radiuscorrected = cutterradius / Math.cos(circlesegmentangle / 2)
        let circlecenter = pointcoord.plus(midvector.times(radiuscorrected))
                      // we don't need to create a full circle; a pie is enough. Find the angles for the pie:
        let startangle = alpha + midvector.angleRadians()
        let deltaangle = 2 * (Math.PI - alpha)
        let numsteps = 2 * Math.ceil(deltaangle / circlesegmentangle / 2) // should be even
                      // build the pie:
        let points = [circlecenter]
        for (let i = 0; i <= numsteps; i++) {
          let angle = startangle + i / numsteps * deltaangle
          let p = Vector2D.fromAngleRadians(angle).times(radiuscorrected).plus(circlecenter)
          points.push(p)
        }
        cutouts.push(fromPoints(points))
      }
    }
  }
  return cag.subtract(cutouts)
}

module.exports = {lieFlat, getTransformationToFlatLying, getTransformationAndInverseTransformationToFlatLying, overCutInsideCorners}
