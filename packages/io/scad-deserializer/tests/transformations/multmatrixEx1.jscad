function main(){


return CSG.cylinder({start: [0,0,0], end: [0,0,3],radiusStart: 5, radiusEnd: 5, resolution: 16}).transform(new CSG.Matrix4x4( [1,0,0,0,0,1,0,0,0,0,1,0,10,10,10,1] ));
};