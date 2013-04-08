// -- center

function main() {
   var o = [];
   
   echo("start compose");
   o.push(cube());
   o.push(cube({size: 1.5}));
   o.push(cube({size: [1,2,3]}));
   o.push(cube({size: [1,2,3], center: true}));
   o.push(cube({size: [1,2,3], center: [true,true,false]}));
   o.push(cube({size: [1,2,3], round: true, center: [true,true,false]}));

   o.push(sphere());
   o.push(sphere(0.8));
   o.push(sphere({r: 1.1}));
   o.push(sphere({r: 1, center: false}));
   o.push(sphere({r: 1, center: [true, true, false]}));
   o.push(sphere({r: 1, fn: 10}));

   o.push(cylinder());
   o.push(cylinder({r:1, h: 4}));
   o.push(cylinder({r:1, h: 4, center: true}));
   o.push(cylinder({r:1, h: 4, center: [true,true,false]}));
   o.push(cylinder({r1:1, r2:0, h: 4, center: [false,false,true]}));
   o.push(cylinder({r: 1, start: [0,0,0], end:[1,1,4], center: [true,true,false]}));
   echo("end compose, translate");
   
   for(var i=0; i<o.length; i++) {
      o[i] = o[i].translate([(i%6)*3,Math.floor(i/6)*4,0]);
   }
   echo("end translate, union");
   o = union(o);
   echo("end union");
   return o;
}

