include <maths_geodesic.scad>


// Information about platonic solids 
// This information is useful in constructing the various solids
// can be found here: http://en.wikipedia.org/wiki/Platonic_solid
// V - vertices
// E - edges
// F - faces
// number, V, E, F, schlafli symbol, dihedral angle, element, name
//tetrahedron = [1, 4, 6, 4, [3,3], 70.5333, "fire", "tetrahedron"];
//hexahedron = [2, 8, 12, 6, [4,3], 90, "earth", "cube"];
//octahedron = [3, 6, 12, 8, [3,4], 109.467, "air", "air"];
//dodecahedron = [4, 20, 30, 12, [5,3], 116.565, "ether", "universe"];
//icosahedron = [5, 12, 30, 20, [3,5], 138.190, "water", "water"];

// Schlafli representation for the platonic solids
// Given this representation, we have enough information
// to derive a number of other attributes of the solids
tetra_sch = [3,3];
hexa_sch = [4,3];
octa_sch = [3,4];
dodeca_sch = [5,3];
icosa_sch = [3,5];

// Given the schlafli representation, calculate
// the number of edges, vertices, and faces for the solid
function plat_edges(pq) = (2*pq[0]*pq[1])/
	((2*pq[0])-(pq[0]*pq[1])+(2*pq[1]));
function plat_vertices(pq) = (2*plat_edges(pq))/pq[1];
function plat_faces(pq) = (2*plat_edges(pq))/pq[0];


// Calculate angular deficiency of each vertex in a platonic solid 
// p - sides
// q - number of edges per vertex
//function angular_defect(pq) = 360 - (poly_single_interior_angle(pq)*pq[1]);
function plat_deficiency(pq) = DEGREES(2*Cpi - pq[1]*Cpi*(1-2/pq[0]));

function plat_dihedral(pq) = 2 * asin( cos(180/pq[1])/sin(180/pq[0]));

function plat_circumradius(pq, a) = 
	(a/2)*
	tan(Cpi/pq[1])*
	tan(plat_dihedral(pq)/2);

function plat_midradius(pq, a) = 
	(a/2)*
	cot(Cpi/pq[0])*
	tan(plat_dihedral(pq)/2);

function plat_inradius(pq,a) = 
	a/(2*tan(DEGREES(Cpi/pq[0])))*
	sqrt((1-cos(plat_dihedral(pq)))/(1+cos(plat_dihedral(pq))));

//================================================
//	Tetrahedron
//================================================
tetra_cart = [
	[+1, +1, +1],
	[-1, -1, +1],
	[-1, +1, -1],
	[+1, -1, -1]
];

function tetra_unit(rad=1) = [
	sph_to_cart(sphu_from_cart(tetra_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(tetra_cart[1], rad)),
	sph_to_cart(sphu_from_cart(tetra_cart[2], rad)),
	sph_to_cart(sphu_from_cart(tetra_cart[3], rad)),
	];


tetrafaces = [
	[0, 3, 1],
	[0,1,2],
	[2,1,3],
	[0,2,3]
];

tetra_edges = [
	[0,1],
	[0,2],
	[0,3], 
	[1,2], 
	[1,3], 
	[2,3],	
	];

function tetrahedron(rad=1) = [tetra_unit(rad), tetrafaces, tetra_edges];


//================================================
//	Hexahedron - Cube 
//================================================
// vertices for a unit cube with sides of length 1
hexa_cart = [
	[0.5, 0.5, 0.5], 
	[-0.5, 0.5, 0.5], 
	[-0.5, -0.5, 0.5], 
	[0.5, -0.5, 0.5],
	[0.5, 0.5, -0.5], 
	[-0.5, 0.5, -0.5], 
	[-0.5, -0.5, -0.5], 
	[0.5, -0.5, -0.5],
];

function hexa_unit(rad=1) = [
	sph_to_cart(sphu_from_cart(hexa_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(hexa_cart[1], rad)),
	sph_to_cart(sphu_from_cart(hexa_cart[2], rad)),
	sph_to_cart(sphu_from_cart(hexa_cart[3], rad)),
	sph_to_cart(sphu_from_cart(hexa_cart[4], rad)), 
	sph_to_cart(sphu_from_cart(hexa_cart[5], rad)), 
	sph_to_cart(sphu_from_cart(hexa_cart[6], rad)),
	sph_to_cart(sphu_from_cart(hexa_cart[7], rad)),
	];


// enumerate the faces of a cube
// vertex order is clockwise winding
hexafaces = [
	[0,3,2,1],	// top
	[0,1,5,4],
	[1,2,6,5],
	[2,3,7,6],
	[3,0,4,7],
	[4,5,6,7],	// bottom
];

hexa_edges = [
	[0,1],
	[0,3], 
	[0,4], 
	[1,2],
	[1,5],
	[2,3],
	[2,6], 
	[3,7], 
	[4,5], 	
	[4,7], 
	[5,4],
	[5,6], 
	[6,7], 
	];


function hexahedron(rad=1) =[hexa_unit(rad), hexafaces, hexa_edges];


//================================================
//	Octahedron 
//================================================

octa_cart = [
	[+1, 0, 0],  // + x axis
	[-1, 0, 0],	// - x axis
	[0, +1, 0],	// + y axis
	[0, -1, 0],	// - y axis
	[0, 0, +1],	// + z axis
	[0, 0, -1] 	// - z axis
];

function octa_unit(rad=1) = [
	sph_to_cart(sphu_from_cart(octa_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(octa_cart[1], rad)),
	sph_to_cart(sphu_from_cart(octa_cart[2], rad)),
	sph_to_cart(sphu_from_cart(octa_cart[3], rad)),
	sph_to_cart(sphu_from_cart(octa_cart[4], rad)), 
	sph_to_cart(sphu_from_cart(octa_cart[5], rad)), 
	];

octafaces = [
	[4,2,0],
	[4,0,3],
	[4,3,1],
	[4,1,2],
	[5,0,2],
	[5,3,0],
	[5,1,3],
	[5,2,1]
	];

octa_edges = [
	[0,2], 
	[0,3],
	[0,4],
	[0,5],
	[1,2],
	[1,3],
	[1,4],
	[1,5],
	[2,4], 
	[2,5],
	[3,4],
	[3,5],
	];

function octahedron(rad=1) = [octa_unit(rad), octafaces, octa_edges];

//================================================
//	Dodecahedron
//================================================
// (+-1, +-1, +-1)
// (0, +-1/Cphi, +-Cphi)
// (+-1/Cphi, +-Cphi, 0)
// (+-Cphi, 0, +-1/Cphi)

dodeca_cart = [
	[+1, +1, +1],			// 0, 0
	[+1, -1, +1],			// 0, 1
	[-1, -1, +1],			// 0, 2
	[-1, +1, +1],			// 0, 3

	[+1, +1, -1],			// 1, 4
	[-1, +1, -1],			// 1, 5
	[-1, -1, -1],			// 1, 6
	[+1, -1, -1],			// 1, 7

	[0, +1/Cphi, +Cphi],		// 2, 8
	[0, -1/Cphi, +Cphi],		// 2, 9
	[0, -1/Cphi, -Cphi],		// 2, 10
	[0, +1/Cphi, -Cphi],		// 2, 11

	[-1/Cphi, +Cphi, 0],		// 3, 12
	[+1/Cphi, +Cphi, 0],		// 3, 13
	[+1/Cphi, -Cphi, 0],		// 3, 14
	[-1/Cphi, -Cphi, 0],		// 3, 15

	[-Cphi, 0, +1/Cphi],		// 4, 16
	[+Cphi, 0, +1/Cphi],		// 4, 17
	[+Cphi, 0, -1/Cphi],		// 4, 18
	[-Cphi, 0, -1/Cphi],		// 4, 19
];

function dodeca_unit(rad=1) = [
	sph_to_cart(sphu_from_cart(dodeca_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[1], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[2], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[3], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[4], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[5], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[6], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[7], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[8], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[9], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[10], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[11], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[12], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[13], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[14], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[15], rad)), 
	sph_to_cart(sphu_from_cart(dodeca_cart[16], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[17], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[18], rad)),
	sph_to_cart(sphu_from_cart(dodeca_cart[19], rad)), 
	];



// These are the pentagon faces
// but CGAL has a problem rendering if things are 
// not EXACTLY coplanar
// so use the triangle faces instead
//dodeca_faces=[ 
//	[1,9,8,0,17],
//	[9,1,14,15,2],
//	[9,2,16,3,8],
//	[8,3,12,13,0],
//	[0,13,4,18,17],
//	[1,17,18,7,14],
//	[15,14,7,10,6],
//	[2,15,6,19,16],
//	[16,19,5,12,3],
//	[12,5,11,4,13],
//	[18,4,11,10,7],
//	[19,6,10,11,5]
//	];
dodeca_faces = [
	[1,9,8], 
	[1,8,0],
	[1,0,17],
	
	[9,1,14],
	[9,14,15],
	[9,15,2],
	
	[9,2,16],
	[9,16,3],
	[9,3,8],
	
	[8,3,12],
	[8,12,13],
	[8,13,0],
	
	[0,13,4],
	[0,4,18],
	[0,18,17],
	
	[1,17,18],
	[1,18,7],
	[1,7,14],
	
	[15,14,7],
	[15,7,10],
	[15,10,6],
	
	[2,15,6],
	[2,6,19],
	[2,19,16],
	
	[16,19,5],
	[16,5,12],
	[16,12,3],
	
	[12,5,11],
	[12,11,4],
	[12,4,13],
	
	[18,4,11],
	[18,11,10],
	[18,10,7],
	
	[19,6,10],
	[19,10,11],
	[19,11,5]
	];

dodeca_edges=[
	[0,8],
	[0,13],
	[0,17],

	[1,9],
	[1,14],
	[1,17],

	[2,9],
	[2,15],
	[2,16],

	[3,8],
	[3,12],
	[3,16],

	[4,11],
	[4,13],
	[4,18],

	[5,11],
	[5,12],
	[5,19],

	[6,10],
	[6,15],
	[6,19],

	[7,10],
	[7,14],
	[7,18],

	[8,9],
	[10,11],
	[12,13],
	[14,15],
	[16,19],
	[17,18],
	];

function dodecahedron(rad=1) = [dodeca_unit(rad), dodeca_faces, dodeca_edges];

//================================================
//	Icosahedron
//================================================
//
// (0, +-1, +-Cphi)
// (+-Cphi, 0, +-1)
// (+-1, +-Cphi, 0)

icosa_cart = [
	[0, +1, +Cphi],	// 0
	[0, +1, -Cphi],	// 1
	[0, -1, -Cphi],	// 2
	[0, -1, +Cphi],	// 3

	[+Cphi, 0, +1],	// 4
	[+Cphi, 0, -1],	// 5
	[-Cphi, 0, -1],	// 6
	[-Cphi, 0, +1],	// 7

	[+1, +Cphi, 0],	// 8
	[+1, -Cphi, 0],	// 9
	[-1, -Cphi, 0],	// 10
	[-1, +Cphi, 0]	// 11
	];

function icosa_sph(rad=1) = [
	sphu_from_cart(icosa_cart[0], rad), 
	sphu_from_cart(icosa_cart[1], rad),
	sphu_from_cart(icosa_cart[2], rad),
	sphu_from_cart(icosa_cart[3], rad),
	sphu_from_cart(icosa_cart[4], rad), 
	sphu_from_cart(icosa_cart[5], rad), 
	sphu_from_cart(icosa_cart[6], rad),
	sphu_from_cart(icosa_cart[7], rad),
	sphu_from_cart(icosa_cart[8], rad),
	sphu_from_cart(icosa_cart[9], rad), 
	sphu_from_cart(icosa_cart[10], rad), 
	sphu_from_cart(icosa_cart[11], rad),
	];

function icosa_unit(rad=1) = [
	sph_to_cart(sphu_from_cart(icosa_cart[0], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[1], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[2], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[3], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[4], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[5], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[6], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[7], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[8], rad)),
	sph_to_cart(sphu_from_cart(icosa_cart[9], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[10], rad)), 
	sph_to_cart(sphu_from_cart(icosa_cart[11], rad)),
	];

icosa_faces = [ 
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
	];

icosa_edges = [
	[0,3],
	[0,4],
	[0,7],
	[0,8],
	[0,11],
	[1,5],
	[1,8],
	[1,11],
	[1,6],
	[1,2],
	[2,5],
	[2,6],
	[2,9],
	[2,10],
	[3,4],
	[3,9],
	[3,10],
	[3,7],
	[4,5],
	[4,8],
	[4,9],
	[5,8],
	[5,9],
	[6,7],		
	[6,10],
	[6,11],
	[7,10],
	[7,11],
	[8,11],
	[9,10],
	];

function icosahedron(rad=1) = [icosa_unit(rad), icosa_faces, icosa_edges];
