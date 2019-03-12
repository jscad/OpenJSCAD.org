function main(){


return CSG.sphere({center: [0,0,0], radius: 25, resolution: 30}).subtract([CSG.cylinder({start: [0,0,-31.25], end: [0,0,31.25],radiusStart: 12.5, radiusEnd: 12.5, resolution: 30}).transform(CSG.Matrix4x4.rotation([0,0,0], [0,0,1], 90)),
CSG.cylinder({start: [0,0,-31.25], end: [0,0,31.25],radiusStart: 12.5, radiusEnd: 12.5, resolution: 30}).transform(CSG.Matrix4x4.rotation([0,0,0], [1,0,0], 90)),
CSG.cylinder({start: [0,0,-31.25], end: [0,0,31.25],radiusStart: 12.5, radiusEnd: 12.5, resolution: 30}).transform(CSG.Matrix4x4.rotation([0,0,0], [0,1,0], 90))]);
};