const { cube, sphere } = require('@jscad/csg/api').primitives3d

const main = () => [cube(), sphere()]

module.exports = main
