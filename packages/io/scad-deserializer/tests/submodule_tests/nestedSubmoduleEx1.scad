module mycube2(a,b) {
    cube(size=[a, b, 1], center=true);
}

module mycube(a,b,c) {
    mycube2(a,b);
}

mycube(1,2,3);