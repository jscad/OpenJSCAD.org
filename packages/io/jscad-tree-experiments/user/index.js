const { cube, sphere, difference, intersection, union } = require('../core/index')
const generate = require('../core/geometry-generator')
const generateTree = require('../core/geometry-tree-generator')

const serializer = require('@jscad/stl-serializer')
const writeOutput = require('../io/writeOutput')

// example user code
let results = difference(cube(), sphere())

results = union(cube(), sphere())

results = union(
  difference(
     cube({size: 3, center: true}),
     sphere({r: 2, center: true})
  ),
  intersection(
      sphere({r: 1.3, center: true}),
      cube({size: 2.1, center: true})
  )
)

results = [
  results,
  cube()
]

console.log('output written')

let curTree = results
//
generateTree(results)
console.log(JSON.stringify(curTree))

const {diff} = require('just-diff')
// const diff = require('simple-diff')

const a = [
  sphere()
]

const b = [
  cube(),
  sphere()
]
a[0].id = 0
b[0].id = 0
b[1].id = 1

const whatDiff = diff(a, b)
console.log('prev', JSON.stringify(a))
console.log('cur', JSON.stringify(b))
console.log('what a diff', whatDiff)
