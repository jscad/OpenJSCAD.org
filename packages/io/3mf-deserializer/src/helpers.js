export const amfMesh = (element) => {
  const obj = { type: 'mesh' }
  obj.objects = []
  return obj
}

// Note: TBD Vertices can have a color, which is used to interpolate a face color (from the 3 vertices)
export const amfVertices = (element) => {
  const obj = { type: 'vertices' }
  obj.objects = []
  return obj
}

export const amfCoordinates = (element) => {
  const obj = { type: 'coordinates' }
  obj.objects = []
  return obj
}

export const amfNormal = (element) => {
  const obj = { type: 'normal' }
  obj.objects = []
  return obj
}

export const amfX = (element) => ({ type: 'x', value: '0' })
export const amfY = (element) => ({ type: 'y', value: '0' })
export const amfZ = (element) => ({ type: 'z', value: '0' })

export const amfVolume = (element) => {
  const obj = { type: 'volume' }

  if (element.materialid) { obj.materialid = element.materialid }

  obj.objects = []
  return obj
}

export const amfTriangle = (element) => {
  const obj = { type: 'triangle' }
  obj.objects = []
  return obj
}

export const amfV1 = (element) => ({ type: 'v1', value: '0' })
export const amfV2 = (element) => ({ type: 'v2', value: '0' })
export const amfV3 = (element) => ({ type: 'v3', value: '0' })

export const amfVertex = (element) => {
  const obj = { type: 'vertex' }
  obj.objects = []
  return obj
}

export const amfEdge = (element) => {
  const obj = { type: 'edge' }

  obj.objects = []
  return obj
}

export const amfMetadata = (element) => {
  const obj = { type: 'metadata' }

  if (element.type) { obj.mtype = element.type }
  if (element.id) { obj.id = element.id }

  return obj
}

export const amfMaterial = (element) => {
  const obj = { type: 'material' }

  if (element.id) { obj.id = element.id }

  obj.objects = []
  return obj
}

export const amfColor = (element) => {
  const obj = { type: 'color' }

  obj.objects = []
  return obj
}

export const amfR = (element) => ({ type: 'r', value: '1' })
export const amfG = (element) => ({ type: 'g', value: '1' })
export const amfB = (element) => ({ type: 'b', value: '1' })
export const amfA = (element) => ({ type: 'a', value: '1' })

export const amfMap = (element) => {
  const obj = { type: 'map' }

  if (element.gtexid) { obj.gtexid = element.gtexid }
  if (element.btexid) { obj.btexid = element.btexid }
  if (element.rtexid) { obj.rtexid = element.rtexid }

  obj.objects = []
  return obj
}

export const amfU1 = (element) => ({ type: 'u1', value: '0' })
export const amfU2 = (element) => ({ type: 'u2', value: '0' })
export const amfU3 = (element) => ({ type: 'u3', value: '0' })
