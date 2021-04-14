const hash = require('object-hash')

// all the items not found in a single 'pass' should have count decremented
// once count reaches 0, remove the item from
const makeCacheWithInvalidation = (passesBeforeElimination = 1, lookup = {}, lookupCounts = {}) => {
  let currentPassHits = []

  const find = (node) => {
    const nodeHash = hash(node)
    const foundData = lookup[nodeHash]
    if (foundData) {
      lookupCounts[nodeHash] += 1
      currentPassHits.push(nodeHash)
    } else {
      lookupCounts[nodeHash] = passesBeforeElimination
    }
    return foundData ? { foundData, nodeHash } : { foundData: undefined, nodeHash }
  }

  const add = (nodeHash, data) => {
    lookup[nodeHash] = data
    lookupCounts[nodeHash] += 1
  }

  // call this after a 'pass'
  const update = () => {
    const totalHashes = Object.keys(lookup)
    const a = new Set(totalHashes)
    const b = new Set(currentPassHits)
    const hashesWithNoHits = Array.from(new Set([...a].filter(x => !b.has(x))))

    hashesWithNoHits.forEach(function (nodeHash, index) {
      lookupCounts[nodeHash] -= 1
      // console.log('hashesWithNoHits', nodeHash, index, lookupCounts[nodeHash])

      if (lookupCounts[nodeHash] <= 0) {
        // console.log('killing', nodeHash)
        delete lookup[nodeHash]
        delete lookupCounts[nodeHash]
      }
    })
    // console.log('totalHashes before', totalHashes.length)
    // console.log('totalHashes after', Object.keys(lookup).length)
    currentPassHits = []
  }

  return { lookup, find, add, update }
}

module.exports = makeCacheWithInvalidation
