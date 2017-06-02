import fs from 'fs'
import {CSG, CAG} from '../../csg' //FIXME: BAD!! tests are supposed to be independant from our CODE !!

// import the required modules if necessary

// //////////////////////////////////////////
// define the basic OBJ
// //////////////////////////////////////////
var OBJ = {}

function _path (objectid) {
  return './objects/' + objectid + '.bin'
}

OBJ.save = function (objectid, object) {
  fs.writeFileSync(_path(objectid), JSON.stringify(object), 'utf8')
}

OBJ.load = function (objectid) {
  var buffer = fs.readFileSync(_path(objectid), 'utf8')
  var bin = JSON.parse(buffer)
  if ('sides' in bin) {
    return CAG.fromObject(bin)
  }
  if ('polygons' in bin) {
    return CSG.fromObject(bin)
  }
  throw new Error('Unsupported binary')
}

OBJ.loadPrevious = function (objectid, object) {
  let path = './objects/'
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  path = _path(objectid)
  if (!fs.existsSync(path)) {
    OBJ.save(objectid, object)
    return object
  }
  return OBJ.load(objectid)
}

module.exports = {OBJ}
