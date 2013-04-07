// Umbilical Torus generator, by Bruce Mueller 2013/03/30 CC-BY-SA
// inc = incremental segments

inc=5;
// r = radius of circle
// t = 'radius' of triangle -distance from center to vertex
// a = angle of rotation of triangle
// b = angle rotation around center of circle

function tri(r,t,a,b) = [(r + t*sin(a))*cos(b), (r+ t*sin(a))*sin(b), t*cos(a)];

// module to generate a rotated triangle slice, inc degrees wide
// (could not implement this in the for loop below)

module wedge(r,t,i,inc) {
	a1 = tri(r,t,i/3,i);
	b1 = tri(r,t,120+i/3,i);
	c1 = tri(r,t,240+i/3,i);
	j=i+inc;
	a2 = tri(r,t,j/3,j);
	b2 = tri(r,t,120+j/3,j);
	c2 = tri(r,t,240+j/3,j);
	
	polyhedron(
		points=[a1,b1,c1,a2,b2,c2],
		triangles=[ [0,1,2], [5,4,3], 
			[3,4,0], [1,0,4],
			[3,0,2], [3,2,5],
			[5,2,4], [4,2,1] ] );
}


// created a conjoined set of triangular wedges around the circle

for (i=[0:inc:360-inc]) {
wedge(2,1,i,inc);
}
