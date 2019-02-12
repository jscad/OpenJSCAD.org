const doLinesIntersect = require('../../../math/line2/doLinesIntersect')

const isSelfIntersecting = (shape, debug) => {
  const numsides = shape.sides.length
  for (let i = 0; i < numsides; i++) {
    const side0 = shape.sides[i]
    for (let ii = i + 1; ii < numsides; ii++) {
      let side1 = shape.sides[ii]
      if (doLinesIntersect(side0[0], side0[1], side1[0], side1[1])) {
        if (debug) { console.log('side ' + i + ': ' + side0); console.log('side ' + ii + ': ' + side1) }
        return true
      }
    }
  }
  return false
}

module.exports = isSelfIntersecting
