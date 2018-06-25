const {linesIntersect} = require('../math/lineUtils')

const isSelfIntersecting = function (cag, debug) {
  let numsides = cag.sides.length
  for (let i = 0; i < numsides; i++) {
    let side0 = cag.sides[i]
    for (let ii = i + 1; ii < numsides; ii++) {
      let side1 = cag.sides[ii]
      if (linesIntersect(side0.vertex0.pos, side0.vertex1.pos, side1.vertex0.pos, side1.vertex1.pos)) {
        if (debug) { console.log('side ' + i + ': ' + side0); console.log('side ' + ii + ': ' + side1) }
        return true
      }
    }
  }
  return false
}

module.exports = isSelfIntersecting
