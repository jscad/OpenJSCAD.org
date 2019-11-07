const flatten = arr => Array.prototype.concat(...arr)
/* const flatten = arr =>
  arr.reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  ) */
module.exports = flatten
