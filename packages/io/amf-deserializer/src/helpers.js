
const amfMesh = (element) => {
  const obj = { type: 'mesh' }
  obj.objects = []
  return obj
}

// Note: TBD Vertices can have a color, which is used to interpolate a face color (from the 3 vertices)
const amfVertices = (element) => {
  const obj = { type: 'vertices' }
  obj.objects = []
  return obj
}

const amfCoordinates = (element) => {
  const obj = { type: 'coordinates' }
  obj.objects = []
  return obj
}

const amfNormal = (element) => {
  const obj = { type: 'normal' }
  obj.objects = []
  return obj
}

const amfX = (element) => ({ type: 'x', value: '0' })
const amfY = (element) => ({ type: 'y', value: '0' })
const amfZ = (element) => ({ type: 'z', value: '0' })

const amfVolume = (element) => {
  const obj = { type: 'volume' }

  if (element.materialid) { obj.materialid = element.materialid }

  obj.objects = []
  return obj
}

const amfTriangle = (element) => {
  const obj = { type: 'triangle' }
  obj.objects = []
  return obj
}

const amfV1 = (element) => ({ type: 'v1', value: '0' })
const amfV2 = (element) => ({ type: 'v2', value: '0' })
const amfV3 = (element) => ({ type: 'v3', value: '0' })

const amfVertex = (element) => {
  const obj = { type: 'vertex' }
  obj.objects = []
  return obj
}

const amfEdge = (element) => {
  const obj = { type: 'edge' }

  obj.objects = []
  return obj
}

const amfMetadata = (element) => {
  const obj = { type: 'metadata' }

  if (element.type) { obj.mtype = element.type }
  if (element.id) { obj.id = element.id }

  return obj
}

const amfMaterial = (element) => {
  const obj = { type: 'material' }

  if (element.id) { obj.id = element.id }

  obj.objects = []
  return obj
}

const amfColor = (element) => {
  const obj = { type: 'color' }

  obj.objects = []
  return obj
}

const amfR = (element) => ({ type: 'r', value: '1' })
const amfG = (element) => ({ type: 'g', value: '1' })
const amfB = (element) => ({ type: 'b', value: '1' })
const amfA = (element) => ({ type: 'a', value: '1' })

const amfMap = (element) => {
  const obj = { type: 'map' }

  if (element.gtexid) { obj.gtexid = element.gtexid }
  if (element.btexid) { obj.btexid = element.btexid }
  if (element.rtexid) { obj.rtexid = element.rtexid }

  obj.objects = []
  return obj
}

const amfU1 = (element) => ({ type: 'u1', value: '0' })
const amfU2 = (element) => ({ type: 'u2', value: '0' })
const amfU3 = (element) => ({ type: 'u3', value: '0' })

module.exports = {
  amfMesh,
  amfVertices,
  amfCoordinates,
  amfX,
  amfY,
  amfZ,
  amfNormal,
  amfVolume,
  amfTriangle,
  amfV1,
  amfV2,
  amfV3,
  amfVertex,
  amfEdge,
  amfMetadata,
  amfMaterial,
  amfColor,
  amfR,
  amfG,
  amfB,
  amfA,
  amfMap,
  amfU1,
  amfU2,
  amfU3
}
