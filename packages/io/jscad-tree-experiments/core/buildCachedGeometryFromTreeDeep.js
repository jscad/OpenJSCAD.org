
const hash = require('object-hash')
const generate = require('./geometry-generator-cached')
const findDisconnectedSubGraphs = require('./findDisconnectedSubGraphs')
const makeCacheWithInvalidation = require('./cacheWithInvalidation')

/**
 * higher order function returning a function that can be called to generate
 * geometry from a vtree, using caching (for root elements for now)
 */
const makeBuildCachedGeometryFromTree = (params) => {
  const cache = makeCacheWithInvalidation()
  const lookup = cache.lookup

  // iterates though the array of subtrees, tried to find if they are
  // in the cache based on their hash, and either caches & adds the result
  // or gets pre-existing results from the cache
  const buildFinalResult = (subTrees, deep) => {
    const finalResult = []
    subTrees.forEach(function (subTree, index) {
      /*const subTreeHash = hash(subTree)
      const foundData = lookup[subTreeHash]
      if (foundData !== undefined) {
        finalResult.push(foundData.geom)
      } else {
        const subTreeGeom = generate(subTree, lookup)
        lookup[subTreeHash] = subTreeGeom
        finalResult.push(subTreeGeom)
      }*/
      if (deep) {
        dfs(subTree, cache)
      }
    })
    return finalResult
  }

  return function (params, tree) {
    const defaults = {deep: true}
    const {deep} = Object.assign({}, defaults, params)

    const subTrees = findDisconnectedSubGraphs(tree)
    const result = buildFinalResult(subTrees, deep)

    // to remove potential no-hit items
    cache.updateCache()
    return result
  }
}

const dfs = (node, cache) => {
  if (node.children) {
    node.children.forEach(function (childNode) {
      dfs(childNode, cache)
    })
  }
  // going up
  if (node.children && (node.type === 'root' || !node.type)) {
    // subTrees.push(node.children)
  }

  generate(node, cache)
}

const omit = (obj, blacklist) => {
  return Object.keys(obj)
    .filter((key) => blacklist.indexOf(key) < 0)
    .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {})
}

module.exports = makeBuildCachedGeometryFromTree
