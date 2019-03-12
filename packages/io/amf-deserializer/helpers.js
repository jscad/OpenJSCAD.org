function amfMesh (element) {
  let obj = {type: 'mesh'}
  obj.objects = []
  return obj
}

// Note: TBD Vertices can have a color, which is used to interpolate a face color (from the 3 vertices)
function amfVertices (element) {
  let obj = {type: 'vertices'}
  obj.objects = []
  return obj
}

function amfCoordinates (element) {
  let obj = {type: 'coordinates'}
  obj.objects = []
  return obj
}
function amfNormal (element) {
  let obj = {type: 'normal'}
  obj.objects = []
  return obj
}
function amfX (element) {
  return {type: 'x', value: '0'}
}
function amfY (element) {
  return {type: 'y', value: '0'}
}
function amfZ (element) {
  return {type: 'z', value: '0'}
}

function amfVolume (element) {
  let obj = {type: 'volume'}

  if ('MATERIALID' in element) { obj.materialid = element.MATERIALID }

  obj.objects = []
  return obj
}

function amfTriangle (element) {
  let obj = {type: 'triangle'}
  obj.objects = []
  return obj
}
function amfV1 (element) {
  return {type: 'v1', value: '0'}
}
function amfV2 (element) {
  return {type: 'v2', value: '0'}
}
function amfV3 (element) {
  return {type: 'v3', value: '0'}
}

function amfVertex (element) {
  let obj = {type: 'vertex'}
  obj.objects = []
  return obj
}

function amfEdge (element) {
  let obj = {type: 'edge'}

  obj.objects = []
  return obj
}

function amfMetadata (element) {
  let obj = {type: 'metadata'}

  if ('TYPE' in element) { obj.mtype = element.TYPE }
  if ('ID' in element) { obj.id = element.ID }

  return obj
}

function amfMaterial (element) {
  let obj = {type: 'material'}

  if ('ID' in element) { obj.id = element.ID }

  obj.objects = []
  return obj
}

function amfColor (element) {
  let obj = {type: 'color'}

  obj.objects = []
  return obj
}
function amfR (element) {
  return {type: 'r', value: '1'}
}
function amfG (element) {
  return {type: 'g', value: '1'}
}
function amfB (element) {
  return {type: 'b', value: '1'}
}
function amfA (element) {
  return {type: 'a', value: '1'}
}

function amfMap (element) {
  let obj = {type: 'map'}

  if ('GTEXID' in element) { obj.gtexid = element.GTEXID }
  if ('BTEXID' in element) { obj.btexid = element.BTEXID }
  if ('RTEXID' in element) { obj.rtexid = element.RTEXID }

  obj.objects = []
  return obj
}

function amfU1 (element) {
  return {type: 'u1', value: '0'}
}
function amfU2 (element) {
  return {type: 'u2', value: '0'}
}
function amfU3 (element) {
  return {type: 'u3', value: '0'}
}

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
