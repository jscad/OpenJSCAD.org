// title      : Umbilical Torus generator
// author     : Bruce Mueller 
// license    : Creative Commons CC BY-SA
// description: adapted for OpenJSCAD.org by Rene K. Mueller
// date:      : 2013/03/30
// file       : hull.jscad

// inc = incremental segments
// r = radius of circle
// t = 'radius' of triangle -distance from center to vertex
// a = angle of rotation of triangle
// b = angle rotation around center of circle

function tri(r,t,a,b) { return [(r + t*sin(a))*cos(b), (r+ t*sin(a))*sin(b), t*cos(a)]; }

// module to generate a rotated triangle slice, inc degrees wide
// (could not implement this in the for loop below)

function wedge(r,t,i,inc) {
	var a1 = tri(r,t,i/3,i);
	var b1 = tri(r,t,120+i/3,i);
	var c1 = tri(r,t,240+i/3,i);
	j = i+inc;
	var a2 = tri(r,t,j/3,j);
	var b2 = tri(r,t,120+j/3,j);
	var c2 = tri(r,t,240+j/3,j);
	
	return polyhedron({
		points: [a1,b1,c1,a2,b2,c2],
		triangles: [ [0,1,2], [5,4,3], 
			[3,4,0], [1,0,4],
			[3,0,2], [3,2,5],
			[5,2,4], [4,2,1] ] });
}


// created a conjoined set of triangular wedges around the circle


function main() {
   var inc = 10;
   var o = [];

   for(var i=0; i<360; i+=inc) {
      o.push(wedge(2,1,i,inc));
   }
   return union(o).scale(10);        // would be more effectice & suitable to create just one polyhedron
}
