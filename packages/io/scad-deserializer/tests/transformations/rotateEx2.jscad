function main(){


return CSG.cube({center: [5,5,5],radius: [5,5,5], resolution: 16}).transform(CSG.Matrix4x4.rotation([0,0,0], [1,1,0], 45));
};
