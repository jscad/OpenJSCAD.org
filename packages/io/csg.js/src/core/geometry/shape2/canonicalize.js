const {EPS} = require('../../constants')
const FuzzyCAGFactory = require('../FuzzyFactory2d')
const fromSides = require('./fromSides')

const canonicalizeCAG = function (cag, options) {
  if (cag.isCanonicalized) {
    return cag
  } else {
    let factory = new FuzzyCAGFactory()
    let result = CAGFromCAGFuzzyFactory(factory, cag)
    result.isCanonicalized = true
    return result
  }
}

const CAGFromCAGFuzzyFactory = function (factory, sourcecag) {
  let _this = factory
  let newsides = sourcecag.sides.map(function (side) {
    return _this.getSide(side)
  })
  // remove bad sides (mostly a user input issue)
  .filter(function (side) {
    return side.length() > EPS
  })
  return fromSides(newsides)
}

module.exports = canonicalizeCAG
