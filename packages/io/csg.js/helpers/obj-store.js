import fs from 'fs';
import {CAG} from '../csg';

/*
*/

// import the required modules if necessary

////////////////////////////////////////////
// define the basic OBJ
////////////////////////////////////////////
  var OBJ = function() {
console.log('OBJ()');
  };

  OBJ.convertCAGtoJSON = function(object) {
    var jsonobj = { type: 'cag', object: object };
    return JSON.stringify(jsonobj);
  };

  OBJ.save = function(objectid,object) {
    var path = './objects/'+objectid+'.json';
//console.log('save path: ['+path+']');
    var asjson = OBJ.convertCAGtoJSON(object);
    fs.writeFileSync(path,asjson,'utf8');
  };

  OBJ.load = function(objectid) {
    var path = './objects/'+objectid+'.json';
//console.log('load path: ['+path+']');
    var buffer = fs.readFileSync(path,'utf8');
    var jsonobj = JSON.parse(buffer);
    if (jsonobj.type == 'cag') {
      return CAG.fromObject(jsonobj.object);
    }
    return jsonobj;
  };

  OBJ.prototype = {
    loadthis: function(objectid) {
//console.log('loadthis: '+objectid);
    },
  };

module.exports = {OBJ}

