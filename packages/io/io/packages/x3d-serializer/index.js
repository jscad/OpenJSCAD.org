// import xmldom from 'xmldom'
const xmldom = require('xmldom')

const mimeType = 'model/x3d+xml'

const XMLSerializer = xmldom.XMLSerializer
// NOTE: might be useful :https://github.com/jindw/xmldom/pull/152/commits/be5176ece6fa1591daef96a5f361aaacaa445175

function serialize (CSG) {
  const DOMImplementation = typeof document !== 'undefined' ? document.implementation : new xmldom.DOMImplementation()
  // materialPolygonLists
  // key: a color string (e.g. "0 1 1" for yellow)
  // value: an array of strings specifying polygons of this color
  //        (as space-separated indices into vertexCoords)
  var materialPolygonLists = {},
    // list of coordinates (as "x y z" strings)
    vertexCoords = [],
    // map to look up the index in vertexCoords of a given vertex
    vertexTagToCoordIndexMap = {}

  CSG.polygons.map(function (p) {
    var red = 0,
      green = 0,
      blue = 1 // default color is blue
    if (p.shared && p.shared.color) {
      red = p.shared.color[0]
      green = p.shared.color[1]
      blue = p.shared.color[2]
    }

    var polygonVertexIndices = [],
      numvertices = p.vertices.length,
      vertex
    for (var i = 0; i < numvertices; i++) {
      vertex = p.vertices[i]
      if (!(vertex.getTag() in vertexTagToCoordIndexMap)) {
        vertexCoords.push(vertex.pos._x.toString() + ' ' +
          vertex.pos._y.toString() + ' ' +
          vertex.pos._z.toString()
        )
        vertexTagToCoordIndexMap[vertex.getTag()] = vertexCoords.length - 1
      }
      polygonVertexIndices.push(vertexTagToCoordIndexMap[vertex.getTag()])
    }

    var polygonString = polygonVertexIndices.join(' ')

    var colorString = red.toString() + ' ' + green.toString() + ' ' + blue.toString()
    if (!(colorString in materialPolygonLists)) {
      materialPolygonLists[colorString] = []
    }
    // add this polygonString to the list of colorString-colored polygons
    materialPolygonLists[colorString].push(polygonString)
  })

  // create output document
  var docType = DOMImplementation.createDocumentType('X3D',
    'ISO//Web3D//DTD X3D 3.1//EN', 'http://www.web3d.org/specifications/x3d-3.1.dtd')
  var exportDoc = DOMImplementation.createDocument(null, 'X3D', docType)
  exportDoc.insertBefore(
    exportDoc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"'),
    exportDoc.doctype)

  var exportRoot = exportDoc.getElementsByTagName('X3D')[0]
  exportRoot.setAttribute('profile', 'Interchange')
  exportRoot.setAttribute('version', '3.1')
  exportRoot.setAttribute('xsd:noNamespaceSchemaLocation', 'http://www.web3d.org/specifications/x3d-3.1.xsd')
  exportRoot.setAttribute('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema-instance')

  var exportScene = exportDoc.createElement('Scene')
  exportRoot.appendChild(exportScene)

  /*
      For each color, create a shape made of an appropriately colored
      material which contains all polygons that are this color.

      The first shape will contain the definition of all vertices,
      (<Coordinate DEF="coords_mesh"/>), which will be referenced by
      subsequent shapes.
    */
  var coordsMeshDefined = false
  for (var colorString in materialPolygonLists) {
    var polygonList = materialPolygonLists[colorString]
    var shape = exportDoc.createElement('Shape')
    exportScene.appendChild(shape)

    var appearance = exportDoc.createElement('Appearance')
    shape.appendChild(appearance)

    var material = exportDoc.createElement('Material')
    appearance.appendChild(material)
    material.setAttribute('diffuseColor', colorString)
    material.setAttribute('ambientIntensity', '1.0')

    var ifs = exportDoc.createElement('IndexedFaceSet')
    shape.appendChild(ifs)
    ifs.setAttribute('solid', 'true')
    ifs.setAttribute('coordIndex', polygonList.join(' -1 ') + ' -1')

    var coordinate = exportDoc.createElement('Coordinate')
    ifs.appendChild(coordinate)
    if (coordsMeshDefined) {
      coordinate.setAttribute('USE', 'coords_mesh')
    } else {
      coordinate.setAttribute('DEF', 'coords_mesh')
      coordinate.setAttribute('point', vertexCoords.join(' '))
      coordsMeshDefined = true
    }
  }

  const x3dstring = (new XMLSerializer()).serializeToString(exportDoc)
  return [x3dstring]
}

module.exports = {
  serialize,
  mimeType
}
