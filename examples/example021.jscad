// -- Example 021

function main() {
    var cyl = new Array();
    for(var i=0; i<64; i++) {
        cyl[i] = rotate([0,0,i/64*360],
            translate([20,0,0],
            cylinder({start: [0,0,0], end: [5,2,30], r: 0.3, fn: 9})));
    }
    return union(cyl);
}
