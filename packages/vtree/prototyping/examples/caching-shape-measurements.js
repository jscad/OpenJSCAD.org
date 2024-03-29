const {
  cube, sphere,
  union,
  measureArea, measureVolume, measureBounds
} = require('../../core/index')

const main = () => {
  const someCube = cube()
  const someSphere = sphere({ r: 20, fn: 100 })
  const shapesSize = measureArea(union(someCube, someSphere)) * 0.1
  const simpleShapesSize = measureVolume(cube())
  console.log('simpleShapesVolume', simpleShapesSize)
  console.log('simpleShapesBounds', measureBounds(sphere()))
  const otherCube = cube({ size: [shapesSize, shapesSize, shapesSize] })
  return [
    someCube,
    otherCube
  ]
}

module.exports = main
