function main(){


return CSG.cube({center: [0.5,0.5,0.5],radius: [0.5,0.5,0.5], resolution: 16}).translate([0,0,-1]).union([CSG.cube({center: [0.5,0.5,0.5],radius: [0.5,0.5,0.5], resolution: 16}).translate([0,0,1])]);
};