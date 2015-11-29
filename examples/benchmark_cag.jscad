// title      : Benchmark CAG
// author     : Z3 Development
// license    : MIT License
// description: testing how fast the CAG objects are created

function main() {
   echo("OpenJSCAD "+OpenJsCad.version+" CSG Benchmark");

   var p = {
             'rectangles': CAG.rectangle,
             'roundedRectangles': CAG.roundedRectangle,
             'circles': CAG.circle,
           };

   var o = [];
   for(var i in p) {
      var n = 100;
      var start = new Date();
      for(var j=0; j<n; j++) {
         o.push(p[i]());
      }
      var t = (new Date()-start)/n; // milliseconds per iteration
      t = 1000 / t;                 // iterations per second
      echo(i+" "+t.toFixed(4)+" iterations / sec");
   }
   return o[0];
}   
   
   
