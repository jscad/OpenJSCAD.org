function main(){


return CSG.sphere({center: [0,0,0], radius: 30, resolution: 30}).scale([10,1,1]).union([CSG.cube({center: [5,5,5],radius: [5,5,5], resolution: 16}).scale([10,1,1])]).union([CSG.cylinder({start: [0,0,0], end: [0,0,50],radiusStart: 10, radiusEnd: 10, resolution: 30}).scale([10,1,1])]);
};