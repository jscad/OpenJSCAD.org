/*
## License

Copyright (c) 2014 bebbi (elghatta@gmail.com)
Copyright (c) 2013 Eduard Bespalov (edwbes@gmail.com)
Copyright (c) 2012 Joost Nieuwenhuijse (joost@newhouse.nl)
Copyright (c) 2011 Evan Wallace (http://evanw.github.com/csg.js/)
Copyright (c) 2012 Alexandre Girard (https://github.com/alx)

All code released under MIT license

## Overview

For an overview of the CSG process see the original csg.js code:
http://evanw.github.com/csg.js/

CSG operations through BSP trees suffer from one problem: heavy fragmentation
of polygons. If two CSG solids of n polygons are unified, the resulting solid may have
in the order of n*n polygons, because each polygon is split by the planes of all other
polygons. After a few operations the number of polygons explodes.

This version of CSG.js solves the problem in 3 ways:

1. Every polygon split is recorded in a tree (CSG.PolygonTreeNode). This is a separate
tree, not to be confused with the CSG tree. If a polygon is split into two parts but in
the end both fragments have not been discarded by the CSG operation, we can retrieve
the original unsplit polygon from the tree, instead of the two fragments.

This does not completely solve the issue though: if a polygon is split multiple times
the number of fragments depends on the order of subsequent splits, and we might still
end up with unncessary splits:
Suppose a polygon is first split into A and B, and then into A1, B1, A2, B2. Suppose B2 is
discarded. We will end up with 2 polygons: A and B1. Depending on the actual split boundaries
we could still have joined A and B1 into one polygon. Therefore a second approach is used as well:

2. After CSG operations all coplanar polygon fragments are joined by a retesselating
operation. See CSG.reTesselated(). Retesselation is done through a
linear sweep over the polygon surface. The sweep line passes over the y coordinates
of all vertices in the polygon. Polygons are split at each sweep line, and the fragments
are joined horizontally and vertically into larger polygons (making sure that we
will end up with convex polygons).
This still doesn't solve the problem completely: due to floating point imprecisions
we may end up with small gaps between polygons, and polygons may not be exactly coplanar
anymore, and as a result the retesselation algorithm may fail to join those polygons.
Therefore:

3. A canonicalization algorithm is implemented: it looks for vertices that have
approximately the same coordinates (with a certain tolerance, say 1e-5) and replaces
them with the same vertex. If polygons share a vertex they will actually point to the
same CSG.Vertex instance. The same is done for polygon planes. See CSG.canonicalized().

Performance improvements to the original CSG.js:

Replaced the flip() and invert() methods by flipped() and inverted() which don't
modify the source object. This allows to get rid of all clone() calls, so that
multiple polygons can refer to the same CSG.Plane instance etc.

The original union() used an extra invert(), clipTo(), invert() sequence just to remove the
coplanar front faces from b; this is now combined in a single b.clipTo(a, true) call.

Detection whether a polygon is in front or in back of a plane: for each polygon
we are caching the coordinates of the bounding sphere. If the bounding sphere is
in front or in back of the plane we don't have to check the individual vertices
anymore.

Other additions to the original CSG.js:

CSG.Vector class has been renamed into CSG.Vector3D

Classes for 3D lines, 2D vectors, 2D lines, and methods to find the intersection of
a line and a plane etc.

Transformations: CSG.transform(), CSG.translate(), CSG.rotate(), CSG.scale()

Expanding or contracting a solid: CSG.expand() and CSG.contract(). Creates nice
smooth corners.

The vertex normal has been removed since it complicates retesselation. It's not needed
for solid CAD anyway.

*/

const {addTransformationMethodsToPrototype, addCenteringToPrototype} = require('./src/mutators')
let CSG = require('./src/CSG')
let CAG = require('./src/CAG')

// FIXME: how many are actual usefull to be exposed as API ?? looks like a code smell
const { _CSGDEBUG,
  defaultResolution2D,
  defaultResolution3D,
  EPS,
  angleEPS,
  areaEPS,
  all,
  top,
  bottom,
  left,
  right,
  front,
  back,
  staticTag,
  getTag} = require('./src/constants')

CSG._CSGDEBUG = _CSGDEBUG
CSG.defaultResolution2D = defaultResolution2D
CSG.defaultResolution3D = defaultResolution3D
CSG.EPS = EPS
CSG.angleEPS = angleEPS
CSG.areaEPS = areaEPS
CSG.all = all
CSG.top = top
CSG.bottom = bottom
CSG.left = left
CSG.right = right
CSG.front = front
CSG.back = back
CSG.staticTag = staticTag
CSG.getTag = getTag

// eek ! all this is kept for backwards compatibility...for now
CSG.Vector2D = require('./src/math/Vector2')
CSG.Vector3D = require('./src/math/Vector3')
CSG.Vertex = require('./src/math/Vertex3')
CAG.Vertex = require('./src/math/Vertex2')
CSG.Plane = require('./src/math/Plane')
CSG.Polygon = require('./src/math/Polygon3')
CSG.Polygon2D = require('./src/math/Polygon2')
CSG.Line2D = require('./src/math/Line2')
CSG.Line3D = require('./src/math/Line3')
CSG.Path2D = require('./src/math/Path2')
CSG.OrthoNormalBasis = require('./src/math/OrthoNormalBasis')
CSG.Matrix4x4 = require('./src/math/Matrix4')

CAG.Side = require('./src/math/Side')

CSG.Connector = require('./src/connectors').Connector
CSG.ConnectorList = require('./src/connectors').ConnectorList
CSG.Properties = require('./src/Properties')

const {circle, ellipse, rectangle, roundedRectangle} = require('./src/primitives2d')
const {sphere, cube, roundedCube, cylinder, roundedCylinder, cylinderElliptic, polyhedron} = require('./src/primitives3d')

CSG.sphere = sphere
CSG.cube = cube
CSG.roundedCube = roundedCube
CSG.cylinder = cylinder
CSG.roundedCylinder = roundedCylinder
CSG.cylinderElliptic = cylinderElliptic
CSG.polyhedron = polyhedron

CAG.circle = circle
CAG.ellipse = ellipse
CAG.rectangle = rectangle
CAG.roundedRectangle = roundedRectangle

//
const {fromCompactBinary, fromObject, fromSlices} = require('./src/CSGFactories')
CSG.fromCompactBinary = fromCompactBinary
CSG.fromObject = fromObject
CSG.fromSlices = fromSlices

CSG.toPointCloud = require('./src/debugHelpers').toPointCloud

const CAGMakers = require('./src/CAGFactories')
CAG.fromObject = CAGMakers.fromObject
CAG.fromPointsNoCheck = CAGMakers.fromPointsNoCheck
CAG.fromPath2 = CAGMakers.fromPath2

// ////////////////////////////////////
addTransformationMethodsToPrototype(CSG.prototype)
addTransformationMethodsToPrototype(CSG.Vector2D.prototype)
addTransformationMethodsToPrototype(CSG.Vector3D.prototype)
addTransformationMethodsToPrototype(CSG.Vertex.prototype)
addTransformationMethodsToPrototype(CSG.Plane.prototype)
addTransformationMethodsToPrototype(CSG.Polygon.prototype)
addTransformationMethodsToPrototype(CSG.Line2D.prototype)
addTransformationMethodsToPrototype(CSG.Line3D.prototype)
addTransformationMethodsToPrototype(CSG.Path2D.prototype)
addTransformationMethodsToPrototype(CSG.OrthoNormalBasis.prototype)
addTransformationMethodsToPrototype(CSG.Connector.prototype)

addTransformationMethodsToPrototype(CAG.prototype)
addTransformationMethodsToPrototype(CAG.Side.prototype)
addTransformationMethodsToPrototype(CAG.Vertex.prototype)

addCenteringToPrototype(CSG.prototype, ['x', 'y', 'z'])
addCenteringToPrototype(CAG.prototype, ['x', 'y'])

module.exports = {CSG, CAG}
