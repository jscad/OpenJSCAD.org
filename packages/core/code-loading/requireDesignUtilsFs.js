const fs = require('fs')
const path = require('path')
const { toArray } = require('../utils/arrays')

const nameFromDir = (dirName, filePath) => {
  const packageFile = path.join(dirName, 'package.json')
  if (fs.existsSync(packageFile)) {
    const name = require(packageFile).name
    if (name) {
      return name
    }
  }
  return filePath ? path.parse(path.basename(filePath)).name : path.basename(dirName)
}

const getDesignName = paths => {
  if (!paths) {
    return
  }
  let mainPath = toArray(paths)[0]
  const stats = fs.statSync(mainPath)
  if (stats.isFile()) {
    const dirName = path.dirname(mainPath)
    return nameFromDir(dirName, mainPath)
  } else if (stats.isDirectory()) {
    // try to use package.json to find main
    return nameFromDir(mainPath)
  }
}

/** get main entry point of a script
 * @param  {} !paths
 */
const getDesignEntryPoint = paths => {
  if (!paths) {
    return
  }
  let mainPath = toArray(paths)[0]
  let filePath
  const stats = fs.statSync(mainPath)
  if (stats.isFile()) {
    return mainPath
  } else if (stats.isDirectory()) {
    // console.log('found dir')
    // first try to use package.json to find main
    const packageFile = path.join(mainPath, 'package.json')
    if (fs.existsSync(packageFile)) {
      const rMain = require(packageFile).main
      if (rMain) {
        return path.join(mainPath, rMain)
      }
    }

    // if all else fails try to look for index.js/jscad, main.js/jscad or a file with same name
    // as the folder
    const entries = fs.readdirSync(mainPath)
    const acceptableMainFiles = ['main', 'index', path.parse(path.basename(mainPath)).name]
    const jsMainFiles = acceptableMainFiles.map(x => x + '.js')
    const jscadMainFiles = acceptableMainFiles.map(x => x + '.jscad')

    const candidates = entries
      .filter(entry => {
        return jsMainFiles.concat(jscadMainFiles).includes(entry)
      })
    if (candidates.length > 0) {
      filePath = path.join(mainPath, candidates[0])
    }
    return filePath
  }
  return mainPath
}

module.exports = {
  getDesignEntryPoint,
  getDesignName
}
