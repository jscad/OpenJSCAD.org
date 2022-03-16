const { cube, union } = require('../../core/index')

const main = () => union([cube(), cube()])

module.exports = main
