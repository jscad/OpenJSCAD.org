function main(){


return CSG.cube({center: [0,0,0],radius: [15,15,15], resolution: 16}).union([CSG.cube({center: [0,0,0],radius: [7.5,7.5,25], resolution: 16}).translate([0,0,-25])]).subtract([CSG.cube({center: [0,0,0],radius: [25,5,5], resolution: 16}).union([CSG.cube({center: [0,0,0],radius: [5,25,5], resolution: 16}),
CSG.cube({center: [0,0,0],radius: [5,5,25], resolution: 16})])]).intersect([CSG.cylinder({start: [0,0,-25], end: [0,0,25],radiusStart: 20, radiusEnd: 5, resolution: 30}).translate([0,0,5])]);
};