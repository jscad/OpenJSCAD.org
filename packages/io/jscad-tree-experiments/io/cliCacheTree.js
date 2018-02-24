// this is for keeping / comparing different trees in CLI mode
const cliCacheTree = (curTree) => {
  const fs = require('fs')
  let prevTreeFileName = 'prevTree.json'
  let prevTree
  if (fs.existsSync('prevTree')) {
    prevTree = fs.readFileSync(prevTreeFileName, 'utf8')
  }
  fs.writeFileSync(prevTreeFileName, JSON.stringify(curTree))
}

module.exports = cliCacheTree
