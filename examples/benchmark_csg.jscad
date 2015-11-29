// title      : Benchmark
// author     : Z3 Development
// license    : MIT License
// description: testing how fast the CSG objects are created

function main() {
   echo("OpenJSCAD "+OpenJsCad.version+" CSG Benchmark");

   var p = { 'cubes': CSG.cube,
             'roundedCubes': CSG.roundedCube,
             'spheres': CSG.sphere,
             'cylinders': CSG.cylinder,
             'roundedCylinders': CSG.roundedCylinder };

   var o = [];
   for(var i in p) {
      var n = 100;
      var start = new Date();
      for(var j=0; j<n; j++) {
         o.push(p[i]());
      }
      var t = (new Date()-start)/n; // milliseconds per iteration
      var t = 1000 / t;             // iterations per second
      echo(i+" "+t.toFixed(4)+" interations / sec");
   }
   return o[0];
}   
   
   
