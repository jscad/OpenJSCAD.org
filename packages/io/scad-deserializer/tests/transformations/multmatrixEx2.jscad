function main(){


return CSG.cylinder({start: [0,0,0], end: [0,0,10],radiusStart: 10, radiusEnd: 10, resolution: 30}).union([CSG.cube({center: [5,5,5],radius: [5,5,5], resolution: 16})]).transform(new CSG.Matrix4x4( [0.7071067811865476,0.7071067811865475,0,0,-0.7071067811865475,0.7071067811865476,0,0,0,0,1,0,10,20,0,1] ));
};