var fs = require('fs');
var CSG = require('./formats').CSG;
var CAG  = require('./formats.js').CAG;

inc = function(mod) {
  if (typeof(mod) === 'string') {
    require('g')(require(mod)); 
  } else {
    require('g')(mod);
  }
}

inc('./openscad');

function renderFile(csg, outf) {
   var outFormat = require('path').extname(outf);
   outFormat = outFormat.substr(1);
   if(csg.length) {
      var o = csg[0];
      if(o instanceof CAG) {
         o = o.extrude({offset: [0,0,0.1]});
      }
      for(i=1; i<csg.length; i++) {
         var c = csg[i];
         if(c instanceof CAG) {
            c = c.extrude({offset: [0,0,0.1]});
         }
         o = o.unionForNonIntersecting(c);
      }
      csg = o;
   }
   if(outFormat=='amf') {
      out = csg.toAMFString(meta);
   } else if(outFormat=='dxf') {
      out = csg.toDxf();
   } else if(outFormat=='stl'||outFormat=='stla') {
      out = csg.toStlString();
   } else {
      console.log("ERROR: only jscad, stl, amf or dxf as output format");
      process.exit(1);
   }

   fs.writeFile(outf,out.asBuffer());
}

module.exports = { 
  inc: inc,
  renderFile: renderFile
};
