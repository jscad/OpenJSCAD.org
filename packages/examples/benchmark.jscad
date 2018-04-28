// title      : Benchmark SCAD Compatibility
// author     : Rene K. Mueller
// license    : MIT License
// description: testing how fast the computations are done
// file       : benchmark.jscad

function main () {
  var p = { 'spheres': sphere, 'cubes': cube, 'cylinders': cylinder, 'torus': torus };
  var o = [];
  var sum = 0;
  echo('OpenJSCAD ' + OpenJsCad.version + ' Benchmark');
  for (var i in p) {
    var n = 100;
    var start = new Date();
    for (var j = 0; j < n; j++) {
      o.push(p[i]());
    }
    var t = (new Date() - start) / n; // milliseconds per iteration
    t = 1000 / t; // iterations per second
    echo(i + ' ' + t.toFixed(4) + ' iterations / sec');
    sum += t;
  }
  echo('total ' + sum.toFixed(4));
  return o[0];
}
