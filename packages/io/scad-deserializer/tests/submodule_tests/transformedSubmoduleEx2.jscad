function main(){


return CSG.cylinder({start: [0,0,-50], end: [0,0,50],radiusStart: 5, radiusEnd: 5, resolution: 16}).union([CSG.cube({center: [0,0,0],radius: [5,5,5], resolution: 16})]).translate([25,0,0]).union([CSG.cube({center: [0,0,0],radius: [5,5,5], resolution: 16})]);
};