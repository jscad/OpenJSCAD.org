function main(){


return CSG.cube({center: [0,0,0],radius: [25,7.5,5], resolution: 16}).translate([0,0,0]).union([CSG.cube({center: [0,0,0],radius: [25,7.5,5], resolution: 16}).translate([10,12,10])]).union([CSG.cube({center: [0,0,0],radius: [25,7.5,5], resolution: 16}).translate([20,24,20])]).union([CSG.cube({center: [0,0,0],radius: [25,7.5,5], resolution: 16}).translate([30,36,30])]).union([CSG.cube({center: [0,0,0],radius: [25,7.5,5], resolution: 16}).translate([20,48,40])]).union([CSG.cube({center: [0,0,0],radius: [25,7.5,5], resolution: 16}).translate([10,60,50])]);
};