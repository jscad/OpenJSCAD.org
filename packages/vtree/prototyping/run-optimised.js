const { runBenchMark } = require('./runBenchmark')
const makeBuildCachedGeometryFromTree = require('../core/buildCachedGeometryFromTree')

const runOptimisedCached = () => {
  const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree()
  let vtree = require('./examples/caching-test-vtree')()
  buildCachedGeometryFromTree(undefined, vtree)

  vtree = require('./examples/caching-test-vtree-changed')()
  buildCachedGeometryFromTree(undefined, vtree)

  vtree = require('./examples/caching-test-vtree-changed2')()
  buildCachedGeometryFromTree(undefined, vtree)

  vtree = require('./examples/caching-test-vtree-changed2')()
  buildCachedGeometryFromTree(undefined, vtree)
}

const runs = process.argv[2]

runBenchMark(runOptimisedCached, 'OptimisedCached', runs)
