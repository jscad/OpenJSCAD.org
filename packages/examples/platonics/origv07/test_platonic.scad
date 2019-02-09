include <platonic.scad>

//test_duals();
test_wireframes();
//test_polyhedron();

//=======================================
//	WIREFRAMES
//=======================================
module test_wireframes()
{
	//rotate(v=[-1,1,0], a=54.7356)
	//display_polywireframe(tetrahedron(40), radius=2.5, style=0);
	
	//display_polywireframe(hexahedron(20), radius=2.5, style=0, smoothness=24);
	
	//rotate(v=[-1,1,0], a=54.7356)
	//display_polywireframe(octahedron(20), radius=2.5, style=0, smoothness=24);
	
	//rotate(v=[1,0,0], a=plat_dihedral(dodeca_sch)/2)	// dihedral
	//display_polywireframe(dodecahedron(20), radius=2.5, style=0, smoothness=24);
	
	rotate(v=[-1,1,0], a=54.7356)
	display_polywireframe(icosahedron(30), radius=2.5, style=0);
}


//====================================
//	Utility functions
//====================================
function VMAG(v) = sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]); 

function LineRotations(v) = [ 
	atan2(sqrt(v[0]*v[0]+v[1]*v[1]), v[2]), 
	0, 
	atan2(v[1], v[0])+90];

function parseSeg(seg) = [ 
	seg[0], 
	LineRotations(seg[1]-seg[0]), 
	VMAG(seg[1]-seg[0])
	];


module PlaceLine(seg, radius=0.025, style=1, smoothness=24) 
{
	$fn=smoothness;
	diameter = radius*2;
	side = sqrt((diameter*diameter)/2);


	params = parseSeg(seg);

	origin = params[0];
	rot = params[1];
	len = params[2];

	translate(origin)
	rotate(rot)
	{
		if (style == 0)	// cylinders, with no end caps
		{
			cylinder(r=radius, h=len);
		} else if (style == 1) // cylinders with rounded end caps
		{
			cylinder(r=radius, h=len);

			// Cap with spheres
			sphere(r=radius);

			translate([0,0,len])
			sphere(r=radius);		
		} else // Second style is experimental
		{
//			translate([-side/2, -side/2,0])
//			cube(size=[side, side, len]);
//
//			translate([-side/2, -side/2, -side/2])
//			cube(size=[side, side, side]);
//
//			translate([-side/2, -side/2, (-side/2)+len])
//			cube(size=[side, side, side]);
		}
	}
}

module display_polywireframe(poly, radius=0.025, style=1, smoothness=24) 
{
	
	// For each edge
	// Draw the wireframe
	for (edge = poly[2])
	{
		PlaceLine([poly[0][edge[0]], poly[0][edge[1]]], 
			radius=radius, 
			style = style,
			smoothness=smoothness);
	}

	display_poly_verts(poly[0], radius, $fn=smoothness);
}

module display_polyhedron(poly) 
{
	polyhedron(points = poly[0], triangles = poly[1]);
}

module display_platonics(rad=1)
{
	// At the center, the self dual tetrahedron
	display_polyhedron(tetrahedron(rad));


	translate(rad*[3, 3, 0])
	display_polyhedron(icosahedron(rad));
	
	translate(rad*[-3, -3, 0])
	display_polyhedron(dodecahedron(rad));
	

	translate(rad*[-3, 3, 0])
	display_polyhedron(hexahedron(rad));
	translate(rad*[3,-3,0])
	display_polyhedron(octahedron(rad));

	
}

module print_spherical_to_cartesian(sverts) 
{
	for (vert = sverts)
	{
		echo(sph_to_cart(vert));
	}
}

module print_cartesian_to_spherical(cverts) 
{
	for (vert = cverts)
	{
		echo(sph_from_cart(vert));
	}
}

module display_verts(verts, indices, numverts, radius=0.1)
{
//echo(verts);
	
	for (i = [0:numverts-1])
	{
		//color([i/numverts, i/numverts, i/numverts])
		color([(i+1)/(numverts), (i+1)/(numverts), (i+1)/(numverts)])
		translate(verts[indices[i]])
		sphere(r=radius, $fn=24);
	}
}

module display_poly_verts(verts, radius=0.1)
{
//echo(verts);

	for (vert = verts)
	{
		translate(vert)
		sphere(r=radius, $fn=24);
	}
}

//=======================================
//	POLYHEDRON
//=======================================
module test_polyhedron()
{
	//test_polyhedron(tetrahedron(1));
	//test_polyhedron(hexahedron(1));
	//test_polyhedron(octahedron(1));
	//test_polyhedron(dodecahedron(1));
	//test_polyhedron(icosahedron(1));
	//test_dodeca();
	//test_icosa();


//display_platonics(20);

//rotate(v=[-1,1,0], a=54.7356)
//display_polyhedron(tetrahedron(20));

//display_polyhedron(hexahedron(20));

//rotate(v=[-1,1,0], a=54.7356)
//display_polyhedron(octahedron(20));

rotate(v=[-1,1,0], a=54.7356)
test_polyhedron_too(octahedron(20), circumradius=20, wireframe=true);

//rotate(v=[-1,1,0], a=54.7356)
//display_polyhedron(icosahedron(20));

//echo("dihedral: ", plat_dihedral(dodeca_sch));
//echo("dihedral: ", plat_dihedral(hexa_sch));

//rotate(v=[1,0,0], a=plat_dihedral(dodeca_sch)/2)	// dihedral
//display_polyhedron(dodecahedron(20));
}

module test_polyhedron_too(poly, circumradius=1, wireradius=1,  wireframe=false)
{
	display_poly_verts(poly[0]);

	if (wireframe)
	{
		display_polywireframe(poly, radius=wireradius);
	} else
	{
		display_polyhedron(poly);
	}

	color([0.5, 0.5, 0.5, 0.4])
	sphere(r=circumradius, $fn=24);

}

//=======================================
//	COMPOUNDS
//=======================================
module test_dual()
{
	difference()
	{
	display_polyhedron(dodecahedron(1));
	display_polyhedron(icosahedron(1));
	}
}

module test_duals()
{
	//test_dual();
	//test_dual_cube1(20);
	//test_dual_cube2(20);
	//test_dual_cube3(20);
	
	test_dual_dodeca(20);
}

module test_dual_cube1(rad=1)
{
	// Union
	display_polyhedron(hexahedron(rad));
	display_polyhedron(octahedron(rad));	
}

module test_dual_cube2(rad=1)
{
	// Difference
	difference()
	{
		display_polyhedron(hexahedron(rad));
		display_polyhedron(octahedron(rad));
	}
}

module test_dual_cube3(rad=1)
{
	// Intersection, for truncation
	intersection()
	{
		display_polyhedron(hexahedron(rad));
		display_polyhedron(octahedron(rad));
	}	
}

// Calculated by doing trig on a icosahedron with radius 1
// calculate the distance between any two vertices
// then use that to find the angles between them
icosaangle = 63.43;


function icosasph(rad=1) = [ 
	sph(0,0,rad), 	// top

	// Top lesser circle
	sph(72*0, icosaangle, rad), 	// top
	sph(72*1, icosaangle, rad), 	// top
	sph(72*2, icosaangle, rad), 	// top
	sph(72*3, icosaangle, rad), 	// top
	sph(72*4, icosaangle, rad), 	// top

	// Bottom lesser circle
	sph((72*0)+36, 180-icosaangle,rad), 	// top
	sph((72*1)+36, 180-icosaangle,rad), 	// top
	sph((72*2)+36, 180-icosaangle,rad), 	// top
	sph((72*3)+36, 180-icosaangle,rad), 	// top
	sph((72*4)+36, 180-icosaangle,rad), 	// top

	sph(0,0,-rad), 	// bottom
];

function icosacart(rad=1) = [
	sph_to_cart(icosasph(rad)[0]),
	sph_to_cart(icosasph(rad)[1]),

	sph_to_cart(icosasph(rad)[2]),
	sph_to_cart(icosasph(rad)[3]),
	sph_to_cart(icosasph(rad)[4]),
	sph_to_cart(icosasph(rad)[5]),
	sph_to_cart(icosasph(rad)[6]),

	sph_to_cart(icosasph(rad)[7]),
	sph_to_cart(icosasph(rad)[8]),
	sph_to_cart(icosasph(rad)[9]),
	sph_to_cart(icosasph(rad)[10]),
	sph_to_cart(icosasph(rad)[11]),
];

icosaedges = [
	// Top
	[0,1],
	[0,2],
	[0,3],
	[0,4],
	[0,5],

	[1,2],
	[2,3],
	[3,4],
	[4,5],
	[5,1],

	// Bottom
	[11,6],
	[11,7],
	[11,8],
	[11,9],
	[11,10],

	[6,7],
	[7,8],
	[8,9],
	[9,10],
	[10,6],

	// antiprism
	[1,6],
	[2,6],
	
	[2,7],
	[3,7],

	[3,8],
	[4,8],
	
	[4,9],
	[5,9],

	[5,10],
	[6,10],
	[1,10]
];

// clockwise winding
icosafaces = [
	// top
	[0,2,1],
	[0,3,2],
	[0,4,3],
	[0,5,4],
	[0,1,5],

	// antiprism
	[1,2,6],
	[2,7,6],
	[2,3,7],
	[3,8,7],
	[3,4,8],
	[4,9,8],
	[4,5,9],
	[5,10,9],
	[1,10,5],
	[1,6,10],	

	// bottom
	[11,6,7],
	[11,7,8],
	[11,8,9],
	[11,9,10],
	[11,10,6],
	];


function icosaplat(rad=1) = [icosacart(rad), icosafaces, icosaedges];

module test_dual_dodeca(rad=1)
{
	inradius = plat_inradius(dodeca_sch, rad);

//	echo("rad, inrad: ", rad, inradius);
	echo("Dihedral Icosa: ", plat_dihedral(icosa_sch));

	mycosasph = icosasph(inradius);
	mycosacart = [
		sph_to_cart(mycosasph[0]),
		
		sph_to_cart(mycosasph[1]),
		sph_to_cart(mycosasph[2]),
		sph_to_cart(mycosasph[3]),
		sph_to_cart(mycosasph[4]),
		sph_to_cart(mycosasph[5]),
		
		sph_to_cart(mycosasph[6]),
		sph_to_cart(mycosasph[7]),
		sph_to_cart(mycosasph[8]),
		sph_to_cart(mycosasph[9]),
		sph_to_cart(mycosasph[10]),
		
		sph_to_cart(mycosasph[11]),
		];

	//mycosa=[mycosacart, ccw_icosafaces, icosaedges];
	mycosa=[mycosacart, icosafaces, icosaedges];


	//display_poly_verts(icosacart(20), 2.5);
	//display_polywireframe(icosaplat(20), radius=2.5, style=1);
	
	intersection()
	{
		rotate(v=[1,0,0], a=plat_dihedral(dodeca_sch)/2)	
		display_polyhedron(dodecahedron(inradius));

		//color([0.5,0.5,0.5,0.5])
		rotate(v=[0,0,1], a=90)
		display_polyhedron(mycosa);
	}
}


module test_degrees() 
{
	d1 = deg(25, 17, 16);
	d2 = deg(18,34);

	echo("deg: ", d1, " decimal: ", deg_to_dec(d1));
	echo("deg: ", d2, " decimal: ", deg_to_dec(d2));
}




module test_dodeca()
{
echo("TEST_DODECA");
poly = dodecahedron(20);

//echo(poly);

	//verts = poly[0];
	verts = dodeca_cart;
	faces = poly[1];

//	difference()
//	{
//		display_polyhedron(poly);
//
//		cylinder(r=0.5, h=2, center=true, $fn=24);
//	}

	
//	display_poly_verts(verts, radius=1);
//
	color([0/5, 0/5, 0/5, 1])
	polyhedron(points=verts, 
		triangles=[
			[0,1,2,3],
		]);

	color([2/5, 2/5, 2/5, 1])
	polyhedron(points=verts, 
		triangles=[
			[4,5,6,7],
		]);

	color([3/5, 3/5, 3/5, 1])
	polyhedron(points=verts, 
		triangles=[
			[8,9,10,11],
		]);

	color([4/5, 4/5, 4/5, 1])
	polyhedron(points=verts, 
		triangles=[
			[12,13,14,15],
		]);

	color([5/5, 5/5, 5/5, 1])
	polyhedron(points=verts, 
		triangles=[
			[16,17,18,19]
		]);

	vertradius = 0.1;
	//display_verts(verts,[0,17,1,9,8], numverts=5, radius=vertradius);
	//display_verts(verts,[1,14,15,2,9], numverts=5, radius=vertradius);
	display_verts(verts,[9,2,16,3,8], numverts=5, radius=vertradius);
	//display_verts(verts,[0,8,3,12,13], numverts=5, radius=vertradius);
	//display_verts(verts,[0,13,4,18,17], numverts=5, radius=vertradius);
	//display_verts(verts,[1,17,18,7,14], numverts=5, radius=1);
	//display_verts(verts,[15,14,7,10,6], numverts=5, radius=1);
	//display_verts(verts,[2,15,6,19,16], numverts=5, radius=1);
	//display_verts(verts,[16,19,5,12,3], numverts=5, radius=1);
	//display_verts(verts,[12,5,11,4,13], numverts=5, radius=1);
	//display_verts(verts,[18,4,11,10,7], numverts=5, radius=1);
	//display_verts(verts,[19,6,10,11,5], numverts=5, radius=1);

	// Can't use pentagons directly as they won't 
	// have enough precision to be coplanar
	// which will cause CGAL to fail
	color([0.5,0.5,0.5,0.5])
	polyhedron(points=verts,
		triangles=[
			[1,9,8,0,17],
			[9,1,14,15,2],
			[9,2,16,3,8],
			[8,3,12,13,0],
			[0,13,4,18,17],
			[1,17,18,7,14],
			[15,14,7,10,6],
			[2,15,6,19,16],
			[16,19,5,12,3],
			[12,5,11,4,13],
			[18,4,11,10,7],
			[19,6,10,11,5]
		]);
}


//==========================================
//	ICOSAHEDRON
//==========================================
module test_icosa()
{
	poly = icosahedron(10);

	verts = poly[0];
	faces = poly[1];

	vert1 = verts[faces[0][0]];
	vert2 = verts[faces[0][1]];
	svert1 = sph_from_cart(vert1);
	svert2 = sph_from_cart(vert2);
	distance = sph_dist(svert1, svert2);

	echo("vertex1: ", vert1);
	echo("vertex2: ", vert2); 
	echo("spherical 1: ", svert1);
	echo("spherical 2: ", svert2);

	echo("vertex distance: ", distance);
	icosadihedral = plat_dihedral(icosa_sch);
	echo("Dihedral: ", icosadihedral, 180-icosadihedral);
	echo("Deficiency: ", plat_deficiency(icosa_sch));

//	difference()
//	{
//		display_polyhedron(poly);
//
//		cylinder(r=0.5, h=2, center=true, $fn=24);
//	}

	//display_poly_verts(verts);

	color([0/5, 0/5, 0/5, 1])
	polyhedron(points=verts, 
		triangles=[
			[0,1,2,3],
		]);

	color([2/5, 2/5, 2/5, 1])
	polyhedron(points=verts, 
		triangles=[
			[4,5,6,7],
		]);

	color([3/5, 3/5, 3/5, 1])
	polyhedron(points=verts, 
		triangles=[
			[8,9,10,11],
		]);

	vertradius = .1;
	//display_verts(verts, [3,0,4], 3, radius = vertradius);

	polyhedron(points=verts,
		triangles=[
			[3,0,4],
			[3,4,9],
			[3,9,10],
			[3,10,7],
			[3,7,0],
			[0,8,4],
			[0,7,11],
			[0,11,8],
			[4,8,5],
			[4,5,9],
			[7,10,6],
			[7,6,11],
			[9,5,2],
			[9,2,10],
			[2,6,10],
			[1,5,8],
			[1,8,11],
			[1,11,6],
			[5,1,2],
			[2,1,6]
		]);
}

