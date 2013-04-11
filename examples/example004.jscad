// title: Example 004
// author: OpenSCAD.org
// description: example001.scad ported to OpenJSCAD.org

function example004() {
	return difference(
		cube({size: 30, center: true}),
		sphere(20)
	);
}

function main() {
   return example004();
}

