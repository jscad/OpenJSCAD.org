const estraverse = require('estraverse')

/* if (node.arguments && arguments.length > 0) {
          const includePath = node.arguments[0]
          const {raw, value} = includePath
          results.push({raw, value})
        } */

function findByPredicate (predicate, dataExtractor, ast) {
  const results = []
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (predicate(node)) {
        results.push(dataExtractor(node))

        return estraverse.VisitorOption.Skip
      }
    }
  })
  return results
}

module.exports = findByPredicate
