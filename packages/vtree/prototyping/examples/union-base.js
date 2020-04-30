const { cube } = require('@jscad/csg/api').primitives3d
const { union } = require('@jscad/csg/api').booleanOps

function main () {
  return union([cube(), cube()])
}

module.exports = main
