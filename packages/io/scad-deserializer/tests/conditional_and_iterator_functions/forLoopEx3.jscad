function main(){


return CSG.cube({center: [0,0,0],radius: [50,10,10], resolution: 16}).rotateX(0).rotateY(0).rotateZ(0).union([CSG.cube({center: [0,0,0],radius: [50,10,10], resolution: 16}).rotateX(10).rotateY(20).rotateZ(300)]).union([CSG.cube({center: [0,0,0],radius: [50,10,10], resolution: 16}).rotateX(200).rotateY(40).rotateZ(57)]).union([CSG.cube({center: [0,0,0],radius: [50,10,10], resolution: 16}).rotateX(20).rotateY(88).rotateZ(57)]);
};