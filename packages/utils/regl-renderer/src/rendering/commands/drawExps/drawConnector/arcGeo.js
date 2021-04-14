
const geoArc = (options) => {
  const geo = {
    positions: [],
    cells: [],
    uvs: []
  }

  options = options || {}
  options.cellSize = options.cellSize || 3
  options.x = options.x || 0
  options.y = options.y || 0
  options.z = options.z || 0
  options.startRadian = options.startRadian || 0
  options.endRadian = options.endRadian || Math.PI * 1.5
  options.innerRadius = typeof options.innerRadius === 'number' ? options.innerRadius : 40
  options.outerRadius = options.outerRadius || 200
  options.numBands = options.numBands || 2
  options.numSlices = options.numSlices || 40
  options.drawOutline = options.drawOutline !== undefined ? options.drawOutline : true

  createGeometry(options, geo.positions, geo.cells, geo.uvs)

  return geo
}

const createGeometry = (options, positions, cells, uvs) => {
  const o = options
  const idxSize = o.cellSize
  const radDist = o.endRadian - o.startRadian
  const numSlices = Math.floor(Math.abs(radDist) / (Math.PI * 2) * o.numSlices)
  const radInc = radDist / numSlices
  const numBandIncs = (o.numBands === 1) ? 1 : o.numBands - 1
  const bandInc = (o.outerRadius - o.innerRadius) / numBandIncs
  let cRad, x, y, z, cRadius, curSlideIdx, prevSlideIdx

  for (let i = 0, len = numSlices; i <= len; i++) {
    cRad = i * radInc + o.startRadian
    prevSlideIdx = (i - 1) * o.numBands
    curSlideIdx = i * o.numBands

    for (let j = 0, lenJ = o.numBands; j < lenJ; j++) {
      cRadius = o.innerRadius + bandInc * j

      x = Math.cos(cRad) * cRadius + o.x
      y = o.y
      z = Math.sin(cRad) * cRadius + o.z

      positions.push([x, y, z])
      uvs.push([i / numSlices, j / numBandIncs])

      // if we've added in positions then we'll add cells
      if (idxSize === 1) {
        cells.push([curSlideIdx + j])
      } else if (idxSize === 2) {
        if (i > 0 && j + 1 < lenJ) {
          cells.push([
            prevSlideIdx + j,
            curSlideIdx + j
          ])

          cells.push([
            curSlideIdx + j + 1,
            prevSlideIdx + j + 1
          ])

          if (!o.drawOutline) {
            cells.push([
              curSlideIdx + j,
              curSlideIdx + j + 1
            ])
          }
        }
      } else if (idxSize === 3) {
        if (i > 0 && j + 1 < lenJ) {
          cells.push([
            curSlideIdx + j,
            prevSlideIdx + j + 1,
            prevSlideIdx + j
          ])

          cells.push([
            curSlideIdx + j,
            curSlideIdx + j + 1,
            prevSlideIdx + j + 1
          ])
        }
      }
    }
  }

  // cap it off
  if (idxSize === 2) {
    // if it's going all the way around then we wont put the connecting line
    if (radDist % Math.PI * 2 !== 0) {
      for (let j = 0, lenJ = o.numBands - 1; j < lenJ; j++) {
        cells.push([
          curSlideIdx + j,
          curSlideIdx + j + 1])
      }

      curSlideIdx = 0

      for (let j = 0, lenJ = o.numBands - 1; j < lenJ; j++) {
        cells.push([
          curSlideIdx + j,
          curSlideIdx + j + 1])
      }
    }
  }
}

module.exports = geoArc
