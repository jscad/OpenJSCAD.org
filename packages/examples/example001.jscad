// title      : Example 001
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: example001.scad ported to OpenJSCAD.org
// file       : example001.jscad

function r_from_dia(d) { return d / 2; }

function rotcy(rot, r, h) {
	return rotate(90, rot,
		cylinder({r: r, h: h, center: true}));
}

function example001() {
	var size = 50;
	var hole = 25;
	var cy_r = r_from_dia(hole);
	var cy_h = r_from_dia(size * 2.5);

	return difference(
		sphere({r: r_from_dia(size)}),
		rotcy([0, 0, 0], cy_r, cy_h),
		rotcy([1, 0, 0], cy_r, cy_h),
		rotcy([0, 1, 0], cy_r, cy_h)
	);
}

function main() {
	return example001();
}

