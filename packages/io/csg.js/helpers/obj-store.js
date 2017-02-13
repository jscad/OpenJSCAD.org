import fs from 'fs';
import {CSG} from '../csg';
import {CAG} from '../csg';

/*
*/

// import the required modules if necessary

////////////////////////////////////////////
// define the basic OBJ
////////////////////////////////////////////
  var OBJ = function() {
  };

  OBJ.convertCAGtoJSON = function(object) {
    var jsonobj = { type: 'cag', object: object };
    return JSON.stringify(jsonobj);
  };

  OBJ.convertCSGtoJSON = function(object) {
    var jsonobj = { type: 'csg', object: object };
    return JSON.stringify(jsonobj);
  };

  OBJ.save = function(objectid,object) {
    var path = './objects/'+objectid+'.json';
    if (object instanceof CAG) {
      var asjson = OBJ.convertCAGtoJSON(object);
      fs.writeFileSync(path,asjson,'utf8');
    }
    if (object instanceof CSG) {
      var asjson = OBJ.convertCSGtoJSON(object);
      fs.writeFileSync(path,asjson,'utf8');
    }
  };

  OBJ.load = function(objectid) {
    var path = './objects/'+objectid+'.json';
    var buffer = fs.readFileSync(path,'utf8');
    var jsonobj = JSON.parse(buffer);
    if (jsonobj.type == 'cag') {
      return CAG.fromObject(jsonobj.object);
    }
    if (jsonobj.type == 'csg') {
      return CSG.fromObject(jsonobj.object);
    }
    return jsonobj;
  };

  OBJ.loadPrevious = function(objectid,object) {
    var path = './objects/';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    var path = './objects/'+objectid+'.json';
    if (!fs.existsSync(path)) {
      OBJ.save(objectid,object);
      return object;
    }
    return OBJ.load(objectid);
  };

  OBJ.prototype = {
    loadthis: function(objectid) {
//console.log('loadthis: '+objectid);
    },
  };

module.exports = {OBJ}

