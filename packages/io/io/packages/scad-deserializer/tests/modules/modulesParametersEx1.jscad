function main(){


return CSG.cube({center: [0.5,0.5,0.5],radius: [0.5,0.5,0.5], resolution: 16}).translate([0,-1,0]).setColor(1,0,0).union([(new CSG.Path2D([[0,0],[0,1],[0.5,1.5],[1,1],[1,0]],true)).innerToCAG().extrude({offset: [0, 0, 1], twistangle: 0,twiststeps: 2}).rotateX(90).rotateY(0).rotateZ(0).setColor(1,0,0).translate([2,0,0]),
CSG.sphere({center: [0,0,0], radius: 0.5, resolution: 20}).translate([0.5,0.5,1]).union([CSG.cube({center: [0.5,0.5,0.5],radius: [0.5,0.5,0.5], resolution: 16})]).translate([0,-1,0]).setColor(0,1,0).translate([4,0,0]),
(new CSG.Path2D([[0,0],[0,1],[0.5,1.5],[1,1],[1,0]],true)).innerToCAG().extrude({offset: [0, 0, 1], twistangle: 0,twiststeps: 2}).rotateX(90).rotateY(0).rotateZ(0).setColor(0,0,1).translate([6,0,0]),
(new CSG.Path2D([[0,0],[0,1],[0.5,1.5],[1,1],[1,0]],true)).innerToCAG().extrude({offset: [0, 0, 1], twistangle: 0,twiststeps: 2}).rotateX(90).rotateY(0).rotateZ(0).setColor(0,0,0).translate([8,0,0]),
CSG.sphere({center: [0,0,0], radius: 0.5, resolution: 20}).translate([0.5,0.5,1]).union([CSG.cube({center: [0.5,0.5,0.5],radius: [0.5,0.5,0.5], resolution: 16})]).translate([0,-1,0]).setColor(1,0,0).translate([10,0,0]),
CSG.cube({center: [0.5,0.5,0.5],radius: [0.5,0.5,0.5], resolution: 16}).translate([0,-1,0]).setColor(0,0.5,0.5).translate([12,0,0])]);
};