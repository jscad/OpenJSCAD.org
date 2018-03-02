
const generate = require('./geometry-generator-cached')
const makeCacheWithInvalidation = require('./cacheWithInvalidation')
const {flatten, toArray} = require('./arrays')

/**
 * higher order function returning a function that can be called to generate
 * geometry from a vtree, using caching (for root elements for now)
 */
const makeBuildCachedGeometryFromTree = (params) => {
  const cache = makeCacheWithInvalidation()

  const buildFinalResult = (tree, deep) => {
    return toArray(dfs(tree, cache))
  }

  return function (params, tree) {
    const defaults = {deep: true}
    const {deep} = Object.assign({}, defaults, params)

    const result = buildFinalResult(tree, deep)

    // to remove potential no-hit items
    cache.update()
    return result
  }
}

const dfs = (node, cache) => {
  if (node.children) {
    flatten(node.children).forEach(function (childNode) {
      dfs(childNode, cache)
    })
  }
  return generate(node, cache)
}

module.exports = makeBuildCachedGeometryFromTree
