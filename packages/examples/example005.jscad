// title      : Example 005
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: example005.scad ported to OpenJSCAD
// file       : example005.jscad

function example005() {
   var cy = [];
   for(var i = 0; i<=5; i++) {
      //echo(360*i/6, sin(360*i/6)*80, cos(360*i/6)*80);
      cy[i] = translate([sin(360*i/6)*80, cos(360*i/6)*80, 0 ],
         cylinder({h: 200, r: 10}));
   }
   return translate([0, 0, -120],
      union(
         difference(
            cylinder({h: 50, r: 100}),
            translate([0, 0, 10], cylinder({h: 50, r: 80})),
            translate([100, 0, 35], cube({size: 50, center: true}))
         ),
         cy,
         translate([0, 0, 200],
            cylinder({h: 80, r1: 120, r2: 0}))
      )
   );
}

function main() {
   return example005().scale(1/3);
}
