const { cube, sphere } = require('@jscad/csg/api').primitives3d

function main () {
  return [cube(), sphere()]
}

module.exports = main
