const { cube, union } = require('../../core/index')

function main () {
  return union([cube(), cube()])
}

module.exports = main
