// title: Benchmark
// author: Rene K. Mueller
// date: 2013/04/11
// description: testing how fast the computations are done

function main() {
   var p = { 'spheres': sphere, 'cubes': cube, 'cylinders': cylinder, 'torus': torus };
   var o = [];
   var sum = 0;
   echo("OpenJSCAD "+me.toUpperCase()+" "+version+" Benchmark");
   for(var i in p) {
      var n = 10;
      var start = new Date();
      for(var j=0; j<n; j++) {
         o.push(p[i]());
      }
      var t = (new Date()-start)/1000/n;
      var fq = sprintf("%.2f",1/t);
      echo(i+" "+fq+" / secs");
      sum += parseFloat(fq);
   }
   echo("total performance: "+sprintf("%.2f",sum));
   return o;
}   
   
   
