const { maths } = require('@jscad/modeling')

const x3dTypes = {
  X3D: 0,
  UNIT: 1,
  META: 2,
  SCENE: 3,
  TRANSFORM: 4,
  SHAPE: 5,
  GROUP: 6,
  APPEARANCE: 7,
  // shapes with data nodes
  TRIANGLESET: 10,
  TRIANGLEFANSET: 11,
  TRIANGLESTRIPSET: 12,
  QUADSET: 13,
  INDEXEDTRIANGLESET: 14,
  INDEXEDTRIANGLEFANSET: 15,
  INDEXEDTRIANGLESTRIPSET: 16,
  INDEXEDQUADSET: 17,
  ELEVATIONGRID: 18,
  INDEXEDFACESET: 19,
  LINESET: 20,
  INDEXEDLINESET: 21,
  // 3D primitives
  BOX: 50,
  CONE: 51,
  CYLINDER: 52,
  SPHERE: 53,
  EXTRUSION: 54,
  // 2D primitives
  ARC2D: 61,
  ARCCLOSE2D: 62,
  CIRCLE2D: 63,
  DISK2D: 64,
  POLYLINE2D: 65,
  RECTANGLE2D: 66,
  TRIANGLESET2D: 67,
  // data nodes
  COLOR: 91,
  COORDINATE: 92,
  MATERIAL: 93
}

// document level node, basically a group
const x3dX3D = (element) => {
  const obj = { definition: x3dTypes.X3D }

  obj.objects = []
  return obj
}

const x3dUnit = (element) => {
  const obj = { definition: x3dTypes.UNIT, category: '', name: '', conversionFactor: 1.0 }

  if (element.category) obj.category = element.category
  if (element.name) obj.name = element.name
  if (element.conversionfactor) obj.conversionFactor = element.conversionfactor

  return obj
}

const x3dMeta = (element) => {
  const obj = { definition: x3dTypes.META, content: '', name: '' }

  if (element.content) obj.content = element.content
  if (element.name) obj.name = element.name

  return obj
}

// scenes contain various other nodes, basically a group
const x3dScene = (element) => {
  const obj = { definition: x3dTypes.SCENE }
  obj.objects = []
  return obj
}

// transforms contain various other nodes, basically a group
// horrific order of transforms... see http://edutechwiki.unige.ch/en/X3D_grouping_and_transforms
const x3dTransform = (element) => {
  const obj = {
    definition: x3dTypes.TRANSFORM,
    center: [0, 0, 0],
    rotation: [0, 0, 1, 0],
    scale: [1, 1, 1],
    scaleOrientation: [0, 0, 1, 0],
    translation: [0, 0, 0]
  }

  if (element.center) {
    const values = element.center.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      obj.center = values
    }
  }
  if (element.rotation) {
    const values = element.rotation.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 3) {
      obj.rotation = values
    }
  }
  if (element.scale) {
    const values = element.scale.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      obj.scale = values
    }
  }
  if (element.scaleorientation) {
    const values = element.scaleorientation.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 3) {
      obj.scaleOrientation = values
    }
  }
  if (element.translation) {
    const values = element.translation.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      obj.translation = values
    }
  }

  obj.objects = []
  return obj
}

// shapes contain geometry and appearance, in any order
const x3dShape = (element) => {
  const obj = { definition: x3dTypes.SHAPE }
  obj.objects = []
  return obj
}

//
// 3D shapes
//

const x3dBox = (element) => {
  const obj = { definition: x3dTypes.BOX, size: [2, 2, 2] }

  if (element.size) {
    const values = element.size.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      obj.size = values
    }
  }
  return obj
}

const x3dCone = (element) => {
  const NEAR0 = 0.00001
  const obj = { definition: x3dTypes.CONE, bottomRadius: 1, height: 2, subdivision: 32, topRadius: NEAR0 }

  if (element.bottomRadius) {
    obj.bottomRadius = Math.max(parseFloat(element.bottomRadius), NEAR0)
  }
  if (element.height) {
    obj.height = parseFloat(element.height)
  }
  if (element.subdivision) {
    obj.subdivision = parseFloat(element.subdivision)
  }
  if (element.topRadius) {
    obj.topRadius = Math.max(parseFloat(element.topRadius), NEAR0)
  }
  return obj
}

const x3dCylinder = (element) => {
  const obj = { definition: x3dTypes.CYLINDER, height: 2, radius: 1, subdivision: 32 }

  if (element.height) {
    obj.height = parseFloat(element.height)
  }
  if (element.radius) {
    obj.radius = parseFloat(element.radius)
  }
  if (element.subdivision) {
    obj.subdivision = parseFloat(element.subdivision)
  }
  return obj
}

const x3dSphere = (element) => {
  const obj = { definition: x3dTypes.SPHERE, radius: 1, subdivision: 24 }

  if (element.radius) {
    obj.radius = parseFloat(element.radius)
  }
  if (element.subdivision) {
    const values = element.subdivision.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 1) {
      obj.subdivision = Math.max(...values)
    }
  }
  return obj
}

const x3dExtrusion = (element) => {
  const obj = {
    definition: x3dTypes.EXTRUSION,
    ccw: true,
    beginCap: true,
    endCap: true,
    crossSection: [[1, 1], [1, -1], [-1, -1], [-1, 1], [1, 1]],
    orientations: [[0, 0, 1, 0]],
    scales: [[1, 1]],
    spine: [[0, 0, 0], [0, 1, 0]]
  }

  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  if (element.beginCap) {
    obj.beginCap = element.beginCap.includes('TRUE') || element.beginCap.includes('true')
  }
  if (element.endCap) {
    obj.endCap = element.endCap.includes('TRUE') || element.endCap.includes('true')
  }
  if (element.crossSection) {
    const values = element.crossSection.trim().split(/ +/).map((v) => parseFloat(v))
    const numpoints = Math.trunc(values.length / 2)
    const points = []
    for (let i = 0; i < numpoints; i++) {
      const vi = i * 2
      points.push([values[vi], values[vi + 1]])
    }
    obj.ccw = (maths.utils.area(points) < 0) // WHAT!!!! X3D IS SICK!!!
    obj.crossSection = points
  }
  if (element.orientation) {
    const values = element.orientation.trim().split(/ +/).map((v) => parseFloat(v))
    const numpoints = Math.trunc(values.length / 4)
    const points = []
    for (let i = 0; i < numpoints; i++) {
      const vi = i * 4
      points.push([values[vi], values[vi + 1], values[vi + 2], values[vi + 3]])
    }
    obj.orientations = points
  }
  if (element.scale) {
    const values = element.scale.trim().split(/ +/).map((v) => parseFloat(v))
    const numpoints = Math.trunc(values.length / 2)
    const points = []
    for (let i = 0; i < numpoints; i++) {
      const vi = i * 2
      // ug... X3D allows scaling to zero
      if (values[vi] === 0) values[vi] = 0.000001
      if (values[vi + 1] === 0) values[vi + 1] = 0.000001
      points.push([values[vi], values[vi + 1]])
    }
    obj.scales = points
  }
  if (element.spine) {
    const values = element.spine.trim().split(/ +/).map((v) => parseFloat(v))
    const numpoints = Math.trunc(values.length / 3)
    const points = []
    for (let i = 0; i < numpoints; i++) {
      const vi = i * 3
      points.push([values[vi], values[vi + 1], values[vi + 2]])
    }
    obj.spine = points
  }
  return obj
}

//
// 2D shapes
//

const x3dArc2D = (element) => {
  const obj = { definition: x3dTypes.ARC2D, endAngle: Math.PI / 2, radius: 1, startAngle: 0, subdivision: 32 }

  if (element.endAngle) {
    obj.endAngle = parseFloat(element.endAngle)
  }
  if (element.radius) {
    obj.radius = parseFloat(element.radius)
  }
  if (element.startAngle) {
    obj.startAngle = parseFloat(element.startAngle)
  }
  if (element.subdivision) {
    obj.subdivision = parseFloat(element.subdivision)
  }
  return obj
}

const x3dArcClose2D = (element) => {
  const obj = { definition: x3dTypes.ARCCLOSE2D, closureType: 'PIE', endAngle: Math.PI / 2, radius: 1, startAngle: 0, subdivision: 32 }

  if (element.closureType) {
    obj.closureType = element.closureType
  }
  if (element.endAngle) {
    obj.endAngle = parseFloat(element.endAngle)
  }
  if (element.radius) {
    obj.radius = parseFloat(element.radius)
  }
  if (element.startAngle) {
    obj.startAngle = parseFloat(element.startAngle)
  }
  if (element.subdivision) {
    obj.subdivision = parseFloat(element.subdivision)
  }
  return obj
}

const x3dCircle2D = (element) => {
  const obj = { definition: x3dTypes.CIRCLE2D, radius: 1, subdivision: 32 }

  if (element.radius) {
    obj.radius = parseFloat(element.radius)
  }
  if (element.subdivision) {
    obj.subdivision = parseFloat(element.subdivision)
  }
  return obj
}

const x3dDisk2D = (element) => {
  const obj = { definition: x3dTypes.DISK2D, innerRadius: 0, outerRadius: 1, subdivision: 32 }

  if (element.innerRadius) {
    obj.innerRadius = parseFloat(element.innerRadius)
  }
  if (element.outerRadius) {
    obj.outerRadius = parseFloat(element.outerRadius)
  }
  if (element.subdivision) {
    obj.subdivision = parseFloat(element.subdivision)
  }
  return obj
}

const x3dPolyline2D = (element) => {
  const obj = { definition: x3dTypes.POLYLINE2D, lineSegments: [] }

  if (element.lineSegments) {
    const values = element.lineSegments.trim().split(/ +/).map((v) => parseFloat(v))
    for (let i = 0; i < values.length; i = i + 2) {
      const point = [values[i], values[i + 1]]
      obj.lineSegments.push(point)
    }
  }
  return obj
}

const x3dRectangle2D = (element) => {
  const obj = { definition: x3dTypes.RECTANGLE2D, size: [2, 2] }

  if (element.size) {
    const values = element.size.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 1) {
      obj.size = values
    }
  }
  return obj
}

const x3dTriangleSet2D = (element) => {
  const obj = { definition: x3dTypes.TRIANGLESET2D, vertices: [] }

  if (element.vertices) {
    const values = element.vertices.trim().split(/ +/).map((v) => parseFloat(v))
    for (let i = 0; i < values.length; i = i + 2) {
      const point = [values[i], values[i + 1]]
      obj.vertices.push(point)
    }
  }
  return obj
}

//
// Lines
//

const x3dLineSet = (element) => {
  const obj = { definition: x3dTypes.LINESET, vertexCount: [], colorPerVertex: true }

  if (element.vertexCount) {
    obj.vertexCount = element.vertexCount.trim().split(/ +/).map((v) => parseFloat(v))
  }
  // color attributes
  if (element.colorPerVertex) {
    obj.colorPerVertex = element.colorPerVertex.includes('TRUE') || element.colorPerVertex.includes('true')
  }
  obj.objects = []
  return obj
}

const x3dIndexedLineSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDLINESET, indexes: [], colorPerVertex: true }

  if (element.coordIndex) {
    const indexes = element.coordIndex.trim().split(/ -1/)
    obj.indexes = indexes.map((index) => index.trim().split(/ +/).map((v) => parseFloat(v)))
    obj.indexes = obj.indexes.filter((index) => index.length > 1)
  }
  // color attributes
  if (element.colorPerVertex) {
    obj.colorPerVertex = element.colorPerVertex.includes('TRUE') || element.colorPerVertex.includes('true')
  }
  obj.objects = []
  return obj
}

//
// Meshs
//

const x3dColor = (element) => {
  const obj = { definition: x3dTypes.COLOR, colors: [] }

  if (element.color) {
    const values = element.color.trim().split(/ +/).map((v) => parseFloat(v))
    const numvalues = values.length
    const numcolors = Math.trunc(numvalues / 3)
    for (let i = 0; i < numcolors; i++) {
      const vi = i * 3
      obj.colors.push([values[vi], values[vi + 1], values[vi + 2]])
    }
  }
  return obj
}

const x3dCoordinate = (element) => {
  const obj = { definition: x3dTypes.COORDINATE, points: [] }

  if (element.point) {
    const values = element.point.trim().split(/ +/).map((v) => parseFloat(v))
    const numvalues = values.length
    const numpoints = Math.trunc(numvalues / 3)
    for (let i = 0; i < numpoints; i++) {
      const vi = i * 3
      obj.points.push([values[vi], values[vi + 1], values[vi + 2]])
    }
  }
  return obj
}

const x3dTriangleSet = (element) => {
  const obj = { definition: x3dTypes.TRIANGLESET, ccw: true, colorPerVertex: true }

  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  obj.objects = []
  return obj
}

const x3dTriangleFanSet = (element) => {
  const obj = { definition: x3dTypes.TRIANGLEFANSET, ccw: true, fanCount: [], colorPerVertex: true }

  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  if (element.fanCount) {
    obj.fanCount = element.fanCount.trim().split(/ +/).map((v) => parseFloat(v))
  }
  obj.objects = []
  return obj
}

const x3dTriangleStripSet = (element) => {
  const obj = { definition: x3dTypes.TRIANGLESTRIPSET, ccw: true, stripCount: [], colorPerVertex: true }

  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  if (element.stripCount) {
    obj.stripCount = element.stripCount.trim().split(/ +/).map((v) => parseFloat(v))
  }
  obj.objects = []
  return obj
}

const x3dQuadSet = (element) => {
  const obj = { definition: x3dTypes.QUADSET, ccw: true, colorPerVertex: true }

  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  obj.objects = []
  return obj
}

const x3dIndexedTriangleSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDTRIANGLESET, ccw: true, index: [], colorPerVertex: true }

  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  if (element.index) {
    obj.index = element.index.trim().split(/ +/).map((v) => parseFloat(v))
  }
  obj.objects = []
  return obj
}

const x3dIndexedTriangleFanSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDTRIANGLEFANSET, ccw: true, fans: [], colorPerVertex: true }

  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  if (element.index) {
    const indexes = element.index.trim().split(/ -1/)
    obj.fans = indexes.map((index) => index.trim().split(/ +/).map((v) => parseFloat(v))).filter((index) => index.length > 2)
  }
  obj.objects = []
  return obj
}

const x3dIndexedTriangleStripSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDTRIANGLESTRIPSET, ccw: true, strips: [], colorPerVertex: true }

  obj.objects = []
  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  if (element.index) {
    const indexes = element.index.trim().split(/ -1/)
    obj.strips = indexes.map((index) => index.trim().split(/ +/).map((v) => parseFloat(v))).filter((index) => index.length > 2)
  }
  return obj
}

const x3dIndexedQuadSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDQUADSET, ccw: true, index: [], colorPerVertex: true }

  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  if (element.index) {
    obj.index = element.index.trim().split(/ +/).map((v) => parseFloat(v))
  }
  obj.objects = []
  return obj
}

const x3dIndexedFaceSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDFACESET, ccw: true, convex: true, faces: [], colorPerVertex: true, colorIndex: null }

  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  if (element.convex) {
    obj.convex = element.convex.includes('TRUE') || element.convex.includes('true')
  }
  if (element.coordIndex) {
    const indexes = element.coordIndex.trim().split(/ -1/)
    obj.faces = indexes.map((index) => index.trim().split(/ +/).map((v) => parseFloat(v))).filter((index) => index.length > 2)
  }
  // color attributes
  if (element.colorPerVertex) {
    obj.colorPerVertex = element.colorPerVertex.includes('TRUE') || element.colorPerVertex.includes('true')
  }
  if (element.colorIndex) {
    if (obj.colorPerVertex) {
      // indexes are provided for each VERTEX
      const indexes = element.colorIndex.trim().split(/ -1/)
      obj.colorIndex = indexes.map((index) => index.trim().split(/ +/).map((v) => parseFloat(v))).filter((index) => index.length > 2)
    } else {
      // indexes are provided for each FACE
      obj.colorIndex = element.colorIndex.trim().split(/ +/).map((v) => parseFloat(v))
    }
  } else {
    // reuse the indexes for the FACES
    obj.colorIndex = obj.faces
  }
  obj.objects = []
  return obj
}

const x3dElevationGrid = (element) => {
  const obj = { definition: x3dTypes.ELEVATIONGRID, xDimension: 2, zDimension: 2, xSpacing: 1.0, zSpacing: 1.0, height: [0, 0, 0, 0], ccw: true, solid: false, colorPerVertex: true }

  if (element.xDimension) {
    obj.xDimension = parseFloat(element.xDimension)
  }
  if (element.zDimension) {
    obj.zDimension = parseFloat(element.zDimension)
  }
  if (element.xSpacing) {
    obj.xSpacing = parseFloat(element.xSpacing)
  }
  if (element.zSpacing) {
    obj.zSpacing = parseFloat(element.zSpacing)
  }
  if (element.height) {
    obj.height = element.height.trim().split(/ +/).map((v) => parseFloat(v))
  }
  if (element.ccw) {
    obj.ccw = element.ccw.includes('TRUE') || element.ccw.includes('true')
  }
  if (element.solid) {
    obj.solid = element.solid.includes('TRUE') || element.solid.includes('true')
  }
  // color attributes
  if (element.colorPerVertex) {
    obj.colorPerVertex = element.colorPerVertex.includes('TRUE') || element.colorPerVertex.includes('true')
  }

  obj.objects = []
  return obj
}

//
// Materials
//

const x3dAppearance = (element) => {
  const obj = { definition: x3dTypes.APPEARANCE }

  obj.objects = []
  return obj
}

const x3dMaterial = (element) => {
  const obj = { definition: x3dTypes.MATERIAL, color: [0.8, 0.8, 0.8, 1.0] }

  // convert material to colors if possible
  // - ambientIntensity="0.2"
  // - diffuseColor="0.8 0.8 0.8" RGB, 0-1.0
  // - emissiveColor="0 0 0" RGB, 0-1.0
  // - shininess="0.2"
  // - specularColor="0 0 0" RGB, 0-1.0
  // - transparency="0" 1.0 transparent, 0 opaque
  let alpha = 1.0 // JSCAD opaque
  if (element.transparency) {
    alpha = 1.0 - element.transparency
  }
  if (element.diffuseColor) {
    const values = element.diffuseColor.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      if (values.length < 4) values.push(alpha)
      obj.color = values
    }
  }
  if (element.emissiveColor) {
    const values = element.emissiveColor.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      if (values.length < 4) values.push(alpha)
      obj.color = values
    }
  }
  return obj
}

// GROUPS

const x3dGroup = (element) => {
  const obj = { definition: x3dTypes.GROUP }

  obj.objects = []
  return obj
}

module.exports = {
  x3dTypes,

  x3dX3D,
  x3dUnit,
  x3dMeta,
  x3dScene,
  x3dTransform,
  x3dShape,
  x3dGroup,

  x3dBox,
  x3dCone,
  x3dCylinder,
  x3dSphere,
  x3dExtrusion,

  x3dArc2D,
  x3dArcClose2D,
  x3dCircle2D,
  x3dDisk2D,
  x3dPolyline2D,
  x3dRectangle2D,
  x3dTriangleSet2D,

  x3dColor,
  x3dCoordinate,
  x3dTriangleSet,
  x3dTriangleFanSet,
  x3dTriangleStripSet,
  x3dQuadSet,
  x3dIndexedTriangleSet,
  x3dIndexedTriangleFanSet,
  x3dIndexedTriangleStripSet,
  x3dIndexedQuadSet,
  x3dIndexedFaceSet,
  x3dElevationGrid,

  x3dLineSet,
  x3dIndexedLineSet,

  x3dAppearance,
  x3dMaterial
}
