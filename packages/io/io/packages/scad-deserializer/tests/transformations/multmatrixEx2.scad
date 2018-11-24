angle=45;
multmatrix(m = [ [cos(angle), -sin(angle), 0, 10],
                [sin(angle), cos(angle), 0, 20],
                [0, 0, 1, 0],
                [0, 0, 0,  1]
              ]) union() {
   cylinder(r=10.0,h=10,center=false);
   cube(size=[10,10,10],center=false);
}