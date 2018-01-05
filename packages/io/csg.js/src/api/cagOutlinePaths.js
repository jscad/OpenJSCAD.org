const Path2D = require('../core/math/Path2')

const cagoutlinePaths = function (_cag) {
  let cag = _cag.canonicalized()
  let sideTagToSideMap = {}
  let startVertexTagToSideTagMap = {}
  cag.sides.map(function (side) {
    let sidetag = side.getTag()
    sideTagToSideMap[sidetag] = side
    let startvertextag = side.vertex0.getTag()
    if (!(startvertextag in startVertexTagToSideTagMap)) {
      startVertexTagToSideTagMap[startvertextag] = []
    }
    startVertexTagToSideTagMap[startvertextag].push(sidetag)
  })
  let paths = []
  while (true) {
    let startsidetag = null
    for (let aVertexTag in startVertexTagToSideTagMap) {
      let sidesForcagVertex = startVertexTagToSideTagMap[aVertexTag]
      startsidetag = sidesForcagVertex[0]
      sidesForcagVertex.splice(0, 1)
      if (sidesForcagVertex.length === 0) {
        delete startVertexTagToSideTagMap[aVertexTag]
      }
      break
    }
    if (startsidetag === null) break // we've had all sides
    let connectedVertexPoints = []
    let sidetag = startsidetag
    let cagside = sideTagToSideMap[sidetag]
    let startvertextag = cagside.vertex0.getTag()
    while (true) {
      connectedVertexPoints.push(cagside.vertex0.pos)
      let nextvertextag = cagside.vertex1.getTag()
      if (nextvertextag === startvertextag) break // we've closed the polygon
      if (!(nextvertextag in startVertexTagToSideTagMap)) {
        throw new Error('Area is not closed!')
      }
      let nextpossiblesidetags = startVertexTagToSideTagMap[nextvertextag]
      let nextsideindex = -1
      if (nextpossiblesidetags.length === 1) {
        nextsideindex = 0
      } else {
                  // more than one side starting at the same vertex. cag means we have
                  // two shapes touching at the same corner
        let bestangle = null
        let cagangle = cagside.direction().angleDegrees()
        for (let sideindex = 0; sideindex < nextpossiblesidetags.length; sideindex++) {
          let nextpossiblesidetag = nextpossiblesidetags[sideindex]
          let possibleside = sideTagToSideMap[nextpossiblesidetag]
          let angle = possibleside.direction().angleDegrees()
          let angledif = angle - cagangle
          if (angledif < -180) angledif += 360
          if (angledif >= 180) angledif -= 360
          if ((nextsideindex < 0) || (angledif > bestangle)) {
            nextsideindex = sideindex
            bestangle = angledif
          }
        }
      }
      let nextsidetag = nextpossiblesidetags[nextsideindex]
      nextpossiblesidetags.splice(nextsideindex, 1)
      if (nextpossiblesidetags.length === 0) {
        delete startVertexTagToSideTagMap[nextvertextag]
      }
      cagside = sideTagToSideMap[nextsidetag]
    } // inner loop
    // due to the logic of fromPoints()
    // move the first point to the last
    if (connectedVertexPoints.length > 0) {
      connectedVertexPoints.push(connectedVertexPoints.shift())
    }
    let path = new Path2D(connectedVertexPoints, true)
    paths.push(path)
  } // outer loop
  return paths
}

module.exports = cagoutlinePaths
