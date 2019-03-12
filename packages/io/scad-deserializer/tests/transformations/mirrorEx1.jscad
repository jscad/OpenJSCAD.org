function main(){


return CSG.cube({center: [5,5,5],radius: [5,5,5], resolution: 16}).translate([5,0,-5]).mirrored(CSG.Plane.fromNormalAndPoint([0,1,0], [0,0,0]));
};
