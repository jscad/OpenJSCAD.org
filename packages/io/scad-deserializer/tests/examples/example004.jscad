function main(){


return CSG.cube({center: [0,0,0],radius: [15,15,15], resolution: 16}).subtract([CSG.sphere({center: [0,0,0], radius: 20, resolution: 30})]);
};