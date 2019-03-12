module mycube2(a,b) {
  module innercube(q1,q2){
    cube(size=[q1, q2, 2], center=true);
    }
  innercube(a,b);
}

module mycube1(a,b,c) {
  mycube2(a,b);
}

mycube1(1,2,3);