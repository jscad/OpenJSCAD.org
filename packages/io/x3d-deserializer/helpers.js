const x3dTypes = {
  X3D: 0,
  SCENE: 1,
  TRANSFORM: 2,
  SHAPE: 3,
  TRIANGLESET: 4,
  TRIANGLEFANSET: 5,
  TRIANGLESTRIPSET: 6,
  QUADSET: 7,
  INDEXEDTRIANGLESET: 8,
  INDEXEDTRIANGLEFANSET: 9,
  INDEXEDTRIANGLESTRIPSET: 10,
  INDEXEDQUADSET: 11,
  INDEXEDFACESET: 12,
  NODE: -1
}

// document level node, basically a group
const x3dX3D = (element) => {
  const obj = { definition: x3dTypes.X3D, type: 'x3d' }

  obj.objects = []
  return obj
}

const x3dUnit = (element) => {
  const obj = { type: 'unit', category: '', name: '', conversionFactor: 1.0 }

  if (element.CATEGORY) obj.category = element.CATEGORY
  if (element.NAME) obj.name = element.NAME
  if (element.CONVERSIONFACTOR) obj.conversionFactor = element.CONVERSIONFACTOR

  return obj
}

const x3dMeta = (element) => {
  const obj = { type: 'meta', content: '', name: '' }

  if (element.CONTENT) obj.content = element.CONTENT
  if (element.NAME) obj.name = element.NAME

  return obj
}

// scenes contain various other nodes, basically a group
const x3dScene = (element) => {
  const obj = { definition: x3dTypes.SCENE, type: 'scene' }
  obj.objects = []
  return obj
}

// transforms contain various other nodes, basically a group
// horrific order of transforms... see http://edutechwiki.unige.ch/en/X3D_grouping_and_transforms
const x3dTransform = (element) => {
  const obj = {
     definition: x3dTypes.TRANSFORM, type: 'transform',
     center: [0,0,0], rotation: [0,0,1,0], scale: [1,1,1], scaleOrientation: [0,0,1,0], translation: [0,0,0]
  }

  if (element.CENTER) {
    const values = element.CENTER.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      obj.center = values
    }
  }
  if (element.ROTATION) {
    const values = element.ROTATION.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 3) {
      obj.rotation = values
    }
  }
  if (element.SCALE) {
    const values = element.SCALE.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      obj.scale = values
    }
  }
  if (element.SCALEORIENTATION) {
    const values = element.SCALEORIENTATION.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 3) {
      obj.scaleOrientation = values
    }
  }
  if (element.TRANSLATION) {
    const values = element.TRANSLATION.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      obj.translation = values
    }
  }

  obj.objects = []
  return obj
}

// shapes contain geometry and appearance, in any order
const x3dShape = (element) => {
  const obj = { definition: x3dTypes.SHAPE, type: 'shape' }
  obj.objects = []
  return obj
}

//
// 3D shapes
//

const x3dBox = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'box', size: [2, 2, 2] }

  if (element.SIZE) {
    const values = element.SIZE.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      obj.size = values
    }
  }
  return obj
}

const x3dCone = (element) => {
  const NEAR0 = 0.00001
  const obj = { definition: x3dTypes.NODE, type: 'cone', bottomRadius: 1, height: 2, subdivision: 32, topRadius: NEAR0 }

  if (element.BOTTOMRADIUS) {
    obj.bottomRadius = Math.max(parseFloat(element.BOTTOMRADIUS), NEAR0)
  }
  if (element.HEIGHT) {
    obj.height = parseFloat(element.HEIGHT)
  }
  if (element.SUBDIVISION) {
    obj.subdivision = parseFloat(element.SUBDIVISION)
  }
  if (element.TOPRADIUS) {
    obj.topRadius = Math.max(parseFloat(element.TOPRADIUS), NEAR0)
  }
  return obj
}

const x3dCylinder = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'cylinder', height: 2, radius: 1, subdivision: 32 }

  if (element.HEIGHT) {
    obj.height = parseFloat(element.HEIGHT)
  }
  if (element.RADIUS) {
    obj.radius = parseFloat(element.RADIUS)
  }
  if (element.SUBDIVISION) {
    obj.subdivision = parseFloat(element.SUBDIVISION)
  }
  return obj
}

const x3dSphere = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'sphere', radius: 1, subdivision: 24 }

  if (element.RADIUS) {
    obj.radius = parseFloat(element.RADIUS)
  }
  if (element.SUBDIVISION) {
    const values = element.SUBDIVISION.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 1) {
      obj.subdivision = Math.max(...values)
    }
  }
  return obj
}

//
// 2D shapes
//

const x3dArc2D = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'arc2d', endAngle: Math.PI/2, radius: 1, startAngle: 0, subdivision: 32 }

  if (element.ENDANGLE) {
    obj.endAngle = parseFloat(element.ENDANGLE)
  }
  if (element.RADIUS) {
    obj.radius = parseFloat(element.RADIUS)
  }
  if (element.STARTANGLE) {
    obj.startAngle = parseFloat(element.STARTANGLE)
  }
  if (element.SUBDIVISION) {
    obj.subdivision = parseFloat(element.SUBDIVISION)
  }
  return obj
}

const x3dArcClose2D = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'arcClose2d', closureType: 'PIE', endAngle: Math.PI/2, radius: 1, startAngle: 0, subdivision: 32 }

  if (element.CLOSURETYPE) {
    obj.closureType = element.CLOSURETYPE
  }
  if (element.ENDANGLE) {
    obj.endAngle = parseFloat(element.ENDANGLE)
  }
  if (element.RADIUS) {
    obj.radius = parseFloat(element.RADIUS)
  }
  if (element.STARTANGLE) {
    obj.startAngle = parseFloat(element.STARTANGLE)
  }
  if (element.SUBDIVISION) {
    obj.subdivision = parseFloat(element.SUBDIVISION)
  }
  return obj
}

const x3dCircle2D = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'circle2d', radius: 1, subdivision: 32 }

  if (element.RADIUS) {
    obj.radius = parseFloat(element.RADIUS)
  }
  if (element.SUBDIVISION) {
    obj.subdivision = parseFloat(element.SUBDIVISION)
  }
  return obj
}

const x3dDisk2D = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'disk2d', innerRadius: 0, outerRadius: 1, subdivision: 32 }

  if (element.INNERRADIUS) {
    obj.innerRadius = parseFloat(element.INNERRADIUS)
  }
  if (element.OUTERRADIUS) {
    obj.outerRadius = parseFloat(element.OUTERRADIUS)
  }
  if (element.SUBDIVISION) {
    obj.subdivision = parseFloat(element.SUBDIVISION)
  }
  return obj
}

const x3dPolyline2D = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'polyline2d', lineSegments: [] }

  if (element.LINESEGMENTS) {
    const values = element.LINESEGMENTS.trim().split(/ +/).map((v) => parseFloat(v))
    for (let i = 0; i < values.length; i = i + 2) {
      const point = [values[i], values[i + 1]]
      obj.lineSegments.push(point)
    }
  }
  return obj
}

const x3dRectangle2D = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'rectangle2d', size: [2, 2] }

  if (element.SIZE) {
    const values = element.SIZE.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 1) {
      obj.size = values
    }
  }
  return obj
}

const x3dTriangleSet2D = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'triangleset2d', vertices: [] }

  if (element.VERTICES) {
    const values = element.VERTICES.trim().split(/ +/).map((v) => parseFloat(v))
    for (let i = 0; i < values.length; i = i + 2) {
      const point = [values[i], values[i + 1]]
      obj.vertices.push(point)
    }
  }
  return obj
}

//
// Meshs
//

const x3dCoordinate = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'coordinate', points: [] }

  if (element.POINT) {
    const values = element.POINT.trim().split(/ +/).map((v) => parseFloat(v))
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
  const obj = { definition: x3dTypes.TRIANGLESET, type: 'triangleset', ccw: true }

  if (element.CCW) {
    obj.ccw = element.CCW.includes('TRUE') || element.CCW.includes('true')
  }
  obj.objects = []
  return obj
}

const x3dTriangleFanSet = (element) => {
  const obj = { definition: x3dTypes.TRIANGLEFANSET, type: 'trianglefanset', ccw: true, fanCount: [] }

  if (element.CCW) {
    obj.ccw = element.CCW.includes('TRUE') || element.CCW.includes('true')
  }
  if (element.FANCOUNT) {
    obj.fanCount = element.FANCOUNT.trim().split(/ +/).map((v) => parseFloat(v))
  }
  obj.objects = []
  return obj
}

const x3dTriangleStripSet = (element) => {
  const obj = { definition: x3dTypes.TRIANGLESTRIPSET, type: 'trianglestripset', ccw: true, stripCount: [] }

  if (element.CCW) {
    obj.ccw = element.CCW.includes('TRUE') || element.CCW.includes('true')
  }
  if (element.STRIPCOUNT) {
    obj.stripCount = element.STRIPCOUNT.trim().split(/ +/).map((v) => parseFloat(v))
  }
  obj.objects = []
  return obj
}

const x3dQuadSet = (element) => {
  const obj = { definition: x3dTypes.QUADSET, type: 'quadset', ccw: true }

  if (element.CCW) {
    obj.ccw = element.CCW.includes('TRUE') || element.CCW.includes('true')
  }
  obj.objects = []
  return obj
}

const x3dIndexedTriangleSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDTRIANGLESET, type: 'indexedtriangleset', ccw: true, index: [] }

  if (element.CCW) {
    obj.ccw = element.CCW.includes('TRUE') || element.CCW.includes('true')
  }
  if (element.INDEX) {
    obj.index = element.INDEX.trim().split(/ +/).map((v) => parseFloat(v))
  }
  obj.objects = []
  return obj
}

const x3dIndexedTriangleFanSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDTRIANGLEFANSET, type: 'indexedtrianglefanset', ccw: true, fans: [] }

  if (element.CCW) {
    obj.ccw = element.CCW.includes('TRUE') || element.CCW.includes('true')
  }
  if (element.INDEX) {
    const indexes = element.INDEX.trim().split(/ -1/)
    obj.fans = indexes.map((index) => index.trim().split(/ +/).map((v) => parseFloat(v))).filter((index) => index.length > 2)
  }
  obj.objects = []
  return obj
}

const x3dIndexedTriangleStripSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDTRIANGLESTRIPSET, type: 'indexedtrianglestripset', ccw: true, strips: [] }

  obj.objects = []
  if (element.CCW) {
    obj.ccw = element.CCW.includes('TRUE') || element.CCW.includes('true')
  }
  if (element.INDEX) {
    const indexes = element.INDEX.trim().split(/ -1/)
    obj.strips = indexes.map((index) => index.trim().split(/ +/).map((v) => parseFloat(v))).filter((index) => index.length > 2)
  }
  return obj
}

const x3dIndexedQuadSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDQUADSET, type: 'indexedquadset', ccw: true, index: [] }

  if (element.CCW) {
    obj.ccw = element.CCW.includes('TRUE') || element.CCW.includes('true')
  }
  if (element.INDEX) {
    obj.index = element.INDEX.trim().split(/ +/).map((v) => parseFloat(v))
  }
  obj.objects = []
  return obj
}

const x3dIndexedFaceSet = (element) => {
  const obj = { definition: x3dTypes.INDEXEDFACESET, type: 'indexedfaceset', ccw: true, convex: true, faces: [] }

  if (element.CCW) {
    obj.ccw = element.CCW.includes('TRUE') || element.CCW.includes('true')
  }
  if (element.CONVEX) {
    obj.convex = element.CONVEX.includes('TRUE') || element.CONVEX.includes('true')
  }
  if (element.COORDINDEX) {
    const indexes = element.COORDINDEX.trim().split(/ -1/)
    obj.faces = indexes.map((index) => index.trim().split(/ +/).map((v) => parseFloat(v))).filter((index) => index.length > 2)
  }
  obj.objects = []
  return obj
}

//
// Materials
//

const x3dAppearance = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'appearence' }
  return obj
}

const x3dMaterial = (element) => {
  const obj = { definition: x3dTypes.NODE, type: 'material', color: [0.8, 0.8, 0.8, 1.0] }

  // convert material to colors if possible
  // - ambientIntensity="0.2"
  // - diffuseColor="0.8 0.8 0.8" RGB, 0-1.0
  // - emissiveColor="0 0 0" RGB, 0-1.0
  // - shininess="0.2"
  // - specularColor="0 0 0" RGB, 0-1.0
  // - transparency="0" 1.0 transparent, 0 opaque
  if (element.DIFFUSECOLOR) {
    let a = 1.0 // opaque
    const values = element.DIFFUSECOLOR.trim().split(/ +/).map((v) => parseFloat(v))
    if (values.length > 2) {
      if (values.length < 4) values.push(1.0)
      obj.color = values
    }
  }
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

  x3dBox,
  x3dCone,
  x3dCylinder,
  x3dSphere,

  x3dArc2D,
  x3dArcClose2D,
  x3dCircle2D,
  x3dDisk2D,
  x3dPolyline2D,
  x3dRectangle2D,
  x3dTriangleSet2D,

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

  x3dAppearance,
  x3dMaterial
}
