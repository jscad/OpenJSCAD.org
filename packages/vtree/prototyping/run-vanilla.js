const { runBenchMark } = require('./runBenchmark')

const runVanilla = () => {
  require('./examples/caching-test-vanilla')()

  require('./examples/caching-test-vanilla-changed')()

  require('./examples/caching-test-vanilla-changed2')()

  require('./examples/caching-test-vanilla-changed2')()
}

const runs = process.argv[2]

runBenchMark(runVanilla, 'Vanilla', runs)
