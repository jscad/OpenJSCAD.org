function main(){


return CSG.cube({center: [0,0,0],radius: [15,15,15], resolution: 16}).union([CSG.cube({center: [0,0,0],radius: [20,7.5,7.5], resolution: 16}),
CSG.cube({center: [0,0,0],radius: [7.5,20,7.5], resolution: 16}),
CSG.cube({center: [0,0,0],radius: [7.5,7.5,20], resolution: 16})]).subtract([CSG.cube({center: [0,0,0],radius: [25,5,5], resolution: 16}).union([CSG.cube({center: [0,0,0],radius: [5,25,5], resolution: 16}),
CSG.cube({center: [0,0,0],radius: [5,5,25], resolution: 16})])]);
};