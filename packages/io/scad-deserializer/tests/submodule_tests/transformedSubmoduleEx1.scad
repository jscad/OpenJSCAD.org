module hole(size) {
	cylinder(r = size, h = 100, center = true); 
	cube(size=[10, 10, 10], center=true); 
} 

translate([25, 0, 0]) {
	hole(5); 
}