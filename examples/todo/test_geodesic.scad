/* 
License: This code is placed in the public Domain
Contributed By: Willliam A Adams
August 2011
*/

include <maths_geodesic.scad>

//===========================================
// 		Test Modules
//===========================================
//test_spherical();
test_polyhedra();
//test_geo_class1();
//test_geo_coords();
//test_geo_chord_factors();
//geo2v(1);
//geo3v(1);
//test_geo_struts(20);

module test_spherical()
{
// Constructing a default coordinate
	s1 = sph(0,0);
echo(s1);

// Do some distance calculations
	A = sph(0,0);
	B = sph(0,90);
	C = sph(90,90);

	M1 = sph(0,45);
	M2 = sph(90, 45);
	M3 = sph(45, 90);

echo("A-M1: ", sph_dist(A, M1));	// should be 0.765367
echo("M1-M2: ", sph_dist(M1, M2));	// should be 1

xyzA = sph_to_cart(A);
xyzB = sph_to_cart(B);
xyzC = sph_to_cart(C);

	echo("A: ", A, " Cart: ", xyzA);
	echo("B: ", B, " Cart: ", xyzB);
	echo("C: ", C, " Cart: ", xyzC);

	echo("CartA: ", xyzA, " Spherical: ", sph_from_cart(xyzA));
	echo("CartB: ", xyzB, " Spherical: ", sph_from_cart(xyzB));
	echo("CartC: ", xyzC, " Spherical: ", sph_from_cart(xyzC));

echo(sph_to_cart([45, 54.7356, 1.73205]));	// 1, 1, 1
echo("0,45,1 ==> ", sph_to_cart(sph(0,45,1)));
echo("1,1,1 ==> ", sph_from_cart([1,1,1]));

// Simple spherical distances
sp1 = sph(0,0,1);
sp2 = sph(0, 45,1);
sp3 = sph(0, 90, 1);
sp4 = sph(0, 180, 1);


d1 = sph_dist(sp1, sp2);
d2 = sph_dist(sp2, sp3);
d3 = sph_dist(sp1, sp4);
echo(d1, d2, d3);
}

module test_polyhedra()
{
	echo("pentagon interior sum: ", poly_sum_interior_angles(5));
	echo("pentagon interior angle: ", poly_single_interior_angle([5,3]));
	echo("dodecahedron: ", angular_defect([5,3]));


	echo("isocles interior sum: ", poly_sum_interior_angles(3));
	echo("isocles interior angle: ", poly_single_interior_angle([3,3]));
	echo("tetrahedron: ", angular_defect([3,3]));

	echo("ANGULAR Deficiency");
	echo("tetrahedron: ", plat_deficiency([3,3]));

	echo("DIHEDRAL");
	echo("tetrahedron: ", plat_dihedral([3,3]));
}

module test_geo_class1()
{
	v000 =  icosa_class1([2,0,1]);
	v233 = octa_class1([2,3,3]);

	echo(v000);
	echo("2,3,3: ", v233);
}

module test_geo_coords()
{
	//echo("0,0,4 => ", geo_tri2_tri3([0,0,4]));
	//echo("2,0,4 => ", geo_tri2_tri3([2,0,4]));
	//echo("0,0,6 => ", geo_tri2_tri3([0,0,6]));

	c=[0,0,6];

	echo(	c[0]*sin(72));
	echo( c[1]+c[0]*cos(72));
	echo( geo_freq(c)/2+c[2]/Cphi);

	c2 = [0,0,6.7082];

	echo("0,0 => ", icosa_class1(geo_tri2_tri3( [0,0,6])));
	echo("1,0 => ", icosa_class1(geo_tri2_tri3( [1,0,6])));
	echo("1,1 => ", icosa_class1(geo_tri2_tri3( [1,1,6])));
	echo("2,0 => ", icosa_class1(geo_tri2_tri3( [2,0,6])));
	echo("1,1 => ", icosa_class1(geo_tri2_tri3( [2,1,6])));
	echo("3,0 => ", icosa_class1(geo_tri2_tri3( [3,0,6])));
	echo("3,1 => ", icosa_class1(geo_tri2_tri3( [3,1,6])));

	echo("5v 4,3 => ", icosa_class1(geo_tri2_tri3( [4,3,5])));
	
	//echo(safediv(c[0]/c[1]));

	//echo(octa_class1(c2));
}

module test_geo_chord_factors()
{
	echo("6v 0/0, 1,0 => ", class1_icosa_chord_factor([0,0],[1,0], freq=6));
	echo("6v 1/0, 1,1 => ", class1_icosa_chord_factor([1,0],[1,1], freq=6));
	echo("6v 1/0, 2/0 => ", class1_icosa_chord_factor([1,0],[2,0], freq=6));
	echo("6v 1/0, 2/1 => ", class1_icosa_chord_factor([1,0],[2,1], freq=6));
	echo("6v 2/0, 2/1 => ", class1_icosa_chord_factor([2,0],[2,1], freq=6));
	echo("6v 2/0, 3/0 => ", class1_icosa_chord_factor([2,0],[3,0], freq=6));
}

function calc_geo2v(radius=1) = [
		class1_icosa_chord_factor([1,0],[1,1], freq=2)*radius,
		class1_icosa_chord_factor([0,0],[1,0], freq=2)*radius
	];

function calc_geo3v(radius=1) = [
		class1_icosa_chord_factor([0,0],[1,0], freq=3)*radius,
		class1_icosa_chord_factor([1,0],[1,1], freq=3)*radius,
		class1_icosa_chord_factor([1,0],[2,1], freq=3)*radius
	];


module test_geo_struts(radius = 1)
{
	// Get struts for 2v
	v2 = calc_geo2v(radius);
	echo("2v (20): ", v2);

	v3 = calc_geo3v(radius);
	echo("3v (20): ", v3);

}
