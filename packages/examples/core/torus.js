// title      : Torus()
// author     : Rene K. Mueller
// license    : MIT License
// description: testing torus() function
// file       : torus.jscad

function main () {
  return [
    torus(),
    torus({ri: 0.5, fni: 8}).translate([0, 10, 0]),

    torus({fni: 4}).translate([-10, 0, 0]),
    torus({fni: 4, roti: 45}).translate([-10, 10, 0]),
    torus({fni: 4, fno: 4, roti: 45}).translate([-10, 20, 0]),
    torus({fni: 4, fno: 5, roti: 45}).translate([-10, 30, 0]),

    torus({fno: 8}).translate([10, 0, 0]),
    torus({fno: 4}).translate([20, 0, 0]),
    torus({fno: 3}).translate([30, 0, 0])
  ];
}
