
const hash = require('object-hash')
const generate = require('./geometry-generator')
const findDisconnectedSubGraphs = require('./findDisconnectedSubGraphs')
/**
 * higher order function returning a function that can be called to generate
 * geometry from a vtree, using caching (for root elements for now)
 */
const makeBuildCachedGeometryFromTree = () => {
  const lookup = {}

  // iterates though the array of subtrees, tried to find if they are
  // in the cache based on their hash, and either caches & adds the result
  // or gets pre-existing results from the cache
  const buildFinalResult = (subTrees) => {
    const finalResult = []
    subTrees.forEach(function (indy, index) {
      const subTreeHash = hash(indy)
      const foundData = lookup[subTreeHash]
      if (foundData !== undefined) {
        finalResult.push(foundData.geom)
      } else {
        const subTreeGeom = generate(indy)
        lookup[subTreeHash] = subTreeGeom
        finalResult.push(subTreeGeom)
      }
    })
    return finalResult
  }

  return function (tree) {
    const subTrees = findDisconnectedSubGraphs(tree)
    const result = buildFinalResult(subTrees)
    return result
  }
}

module.exports = makeBuildCachedGeometryFromTree
