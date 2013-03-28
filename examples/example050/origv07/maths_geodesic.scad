/*
	License: This code is placed in the public Domain
	Contributed By: Willliam A Adams
	August 2011
*/

// A couple of useful constants
Cpi = 3.14159;
Cphi = 1.61803399;
Cepsilon = 0.00000001;

 
// Function: clean
//
// Parameters:
//	n - A number that might be very close to zero
// Description:  
//	There are times when you want a very small number to 
// 	just be zero, instead of being that very small number.
//	This function will compare the number to an arbitrarily small 
//	number.  If it is smaller than the 'epsilon', then zero will be 
// 	returned.  Otherwise, the original number will be returned.
//

function clean(n) = (n < 0) ? ((n < -Cepsilon) ? n : 0) : 
	(n < Cepsilon) ? 0 : n; 

// Function: safediv
//
// Parameters
//	n - The numerator
//	d - The denominator
//
// Description:
//	Since division by zero is generally not a desirable thing, safediv
//	will return '0' whenever there is a division by zero.  Although this will
//	mask some erroneous division by zero errors, it is often the case
//	that you actually want this behavior.  So, it makes it convenient.
function safediv(n,d) = (d==0) ? 0 : n/d;


//==================================
// Degrees
//==================================

function DEGREES(radians) = (180/Cpi) * radians;

function RADIANS(degrees) = Cpi/180 * degrees;

function deg(deg, min=0, sec=0) = [deg, min, sec];

function deg_to_dec(d) = d[0] + d[1]/60 + d[2]/60/60;


//==================================
//  Spherical coordinates
//==================================

// create an instance of a spherical coordinate
// long - rotation around z -axis
// lat - latitude, starting at 0 == 'north pole'
// rad - distance from center
function sph(long, lat, rad=1) = [long, lat, rad];

// Convert spherical to cartesian
function sph_to_cart(s) = [
	clean(s[2]*sin(s[1])*cos(s[0])),  
	clean(s[2]*sin(s[1])*sin(s[0])),
	clean(s[2]*cos(s[1]))
	];

// Convert from cartesian to spherical
function sph_from_cart(c) = sph(
	atan2(c[1],c[0]), 
	atan2(sqrt(c[0]*c[0]+c[1]*c[1]), c[2]), 
	sqrt(c[0]*c[0]+c[1]*c[1]+c[2]*c[2])
	);

function sphu_from_cart(c, rad=1) = sph(
	atan2(c[1],c[0]), 
	atan2(sqrt(c[0]*c[0]+c[1]*c[1]), c[2]), 
	rad
	);

// compute the chord distance between two points on a sphere
function sph_dist(c1, c2) = sqrt(
	c1[2]*c1[2] + c2[2]*c2[2] - 
	2*c1[2]*c2[2]*
	((cos(c1[1])*cos(c2[1])) + cos(c1[0]-c2[0])*sin(c1[1])*sin(c2[1]))   
	);


//==========================================
//	Geodesic calculations
// 
//  Reference: Geodesic Math and How to Use It
//  By: Hugh Kenner
//  Second Paperback Edition (2003), p.74-75
//  http://www.amazon.com/Geodesic-Math-How-Hugh-Kenner/dp/0520239318
//
//  The book was used for reference, so if you want to check the math, 
//  you can plug in various numbers to various routines and see if you get
//  the same numbers in the book.
//
//  In general, there are enough routines here to implement the various
//  pieces necessary to make geodesic objects.
//==========================================

function poly_sum_interior_angles(sides) = (sides-2)*180;
function poly_single_interior_angle(pq) = poly_sum_interior_angles(pq[0])/pq[0];



// Given a set of coordinates, return the frequency
// Simply calculated by adding up the values of the coordinates
function geo_freq(xyz) = xyz[0]+xyz[1]+xyz[2];

// Convert between the 2D coordinates of vertices on the face triangle
// to the 3D vertices needed to calculate spherical coordinates
function geo_tri2_tri3(xyf) = [xyf[1], xyf[0]-xyf[1], xyf[2]-xyf[0]];

// Given coordinates for a vertex on the octahedron face
// return the spherical coordinates for the vertex
// class 1, method 1
function octa_class1(c) = sph(
	atan(safediv(c[0], c[1])),
	atan(sqrt(c[0]*c[0]+c[1]*c[1])/c[2]),
	1 
	);

function octa_class2(c) = sph(
	atan(c[0]/c[1]),
	atan( sqrt( 2*(c[0]*c[0]+c[1]*c[1])) /c[2]),
	1 
	);

function icosa_class1(c) = octa_class1(
	[
		c[0]*sin(72),  
		c[1]+c[0]*cos(72),  
		geo_freq(c)/2+c[2]/Cphi
	]);

function icosa_class2(c) = sph(
	atan([c0]/c[1]), 
	atan(sqrt(c[0]*c[0]+c[1]*c[1]))/cos(36)*c[2],
	1
	);
 
function tetra_class1(c) = octa_class1(
	[
		sqrt(3*c[0]),  
		2*c[1]-c[0],  
		(3*c[2]-c[0]-c[1])/sqrt(2)
	]);

function class1_icosa_chord_factor(v1, v2, freq) = sph_dist( 
		icosa_class1(geo_tri2_tri3( [v1[0], v1[1], freq])),
		icosa_class1(geo_tri2_tri3( [v2[0], v2[1], freq]))
	);


