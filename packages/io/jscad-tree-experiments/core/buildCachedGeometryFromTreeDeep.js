
const hash = require('object-hash')
const generate = require('./geometry-generator-cached')
const findDisconnectedSubGraphs = require('./findDisconnectedSubGraphs')
// const makeCacheWithInvalidation = require('./cacheWithInvalidation')

/**
 * higher order function returning a function that can be called to generate
 * geometry from a vtree, using caching (for root elements for now)
 */
const makeBuildCachedGeometryFromTree = (params) => {
  // const cache = makeCacheWithInvalidation()
  const lookup = {}

  // iterates though the array of subtrees, tried to find if they are
  // in the cache based on their hash, and either caches & adds the result
  // or gets pre-existing results from the cache
  const buildFinalResult = (subTrees, deep) => {
    const finalResult = []
    subTrees.forEach(function (subTree, index) {
      const subTreeHash = hash(subTree)
      const foundData = lookup[subTreeHash]
      if (foundData !== undefined) {
        finalResult.push(foundData.geom)
      } else {
        const subTreeGeom = generate(subTree, lookup)
        lookup[subTreeHash] = subTreeGeom
        finalResult.push(subTreeGeom)
      }
      if (deep) {
        dfs(subTree, lookup)
      }
    })
    return finalResult
  }

  return function (params, tree) {
    const defaults = {deep: true}
    const {deep} = Object.assign({}, defaults, params)

    const subTrees = findDisconnectedSubGraphs(tree)
    const result = buildFinalResult(subTrees, deep)
    return result
  }
}

const dfs = (node, lookup) => {
  if (!node.children || node.children.length === 0) {
    // stack.pop(node)
    // leafs.push(node)
  }
  if (node.children) {
    node.children.forEach(function (childNode) {
      // childNode.parent = node
      dfs(childNode, lookup)
    })
  }
  // going up
  if (node.children && (node.type === 'root' || !node.type)) {
    // subTrees.push(node.children)
  }

  generate(node, lookup)
  /*
  // const nodeWithoutGeometry = omit(node, ['geom'])
  const nodeHash = hash(node)
  const foundData = lookup[nodeHash]
  if (foundData !== undefined) {
    // console.log('foundData', omit(node, ['geometry']))
    // node.geometry = foundData.geometry
  } else {
    const nodeGeom = generate(node, lookup)
    lookup[nodeHash] = nodeGeom
    // node.geometry = nodeGeom
  } */
}

const omit = (obj, blacklist) => {
  return Object.keys(obj)
    .filter((key) => blacklist.indexOf(key) < 0)
    .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {})
}

module.exports = makeBuildCachedGeometryFromTree
