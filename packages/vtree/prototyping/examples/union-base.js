const { cube } = require('@jscad/csg/api').primitives3d
const { union } = require('@jscad/csg/api').booleanOps

const main = () => union([cube(), cube()])

module.exports = main
