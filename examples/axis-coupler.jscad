// title      : Axis Coupler
// author     : Joost Nieuwenhuijse
// license    : MIT License
// description: a simple axis coupler
// file       : axis-coupler.jscad

var cylresolution=16;

// Here we define the user editable parameters: 
function getParameterDefinitions() {
  return [
    {
      name: 'quality', 
      type: 'choice',
      caption: 'Quality',
      values: [0, 1],
      captions: ["Draft","High"], 
      initial: 0
    },    
  
    { name: 'diameter1', caption: 'Axis diameter of first coupler:', type: 'float', initial: 12.2 },
    { name: 'shaftlength1', caption: 'Axis depth of first coupler:', type: 'float', initial: 15 },
    { name: 'outerlength1', caption: 'Outer length of first coupler:', type: 'float', initial: 20 },
    { name: 'nutradius1', caption: 'Nut radius of first coupler:', type: 'float', initial: 4.65 },
    { name: 'nutthickness1', caption: 'Nut thickness of first coupler:', type: 'float', initial: 4.2},
    { name: 'screwdiameter1', caption: 'Screw diameter of first coupler:', type: 'float', initial: 5},
    { name: 'diameter2', caption: 'Axis diameter of second coupler:', type: 'float', initial: 9.5 },
    { name: 'shaftlength2', caption: 'Axis depth of second coupler:', type: 'float', initial: 10 },
    { name: 'outerlength2', caption: 'Outer length of second coupler:', type: 'float', initial: 15 },
    { name: 'nutradius2', caption: 'Nut radius of second coupler:', type: 'float', initial: 3.2 },
    { name: 'nutthickness2', caption: 'Nut thickness of second coupler:', type: 'float', initial: 2.6},
    { name: 'screwdiameter2', caption: 'Screw diameter of second coupler:', type: 'float', initial: 3},
    { name: 'outerdiameter', caption: 'Outer diameter:', type: 'float', initial: 30 },
    { name: 'spiderlength', caption: 'Spider thickness:', type: 'float', initial: 12 },
    { name: 'spidermargin', caption: 'Spider tolerance:', type: 'float', initial: 0 },
    { name: 'numteeth', caption: 'Num teeth per coupler:', type: 'int', initial: 2}
  ];
}

function main(params)
{
  cylresolution=(params.quality == "1")? 64:16;
 
  var outerdiameter=params.outerdiameter;
  outerdiameter=Math.max(outerdiameter, params.diameter1+0.5);
  outerdiameter=Math.max(outerdiameter, params.diameter2+0.5);

  var spidercenterdiameter=outerdiameter/2;
  
  var part1=makeShaft(params.diameter1, outerdiameter,spidercenterdiameter,params.shaftlength1,params.outerlength1,params.spiderlength, params.nutradius1, params.nutthickness1, params.screwdiameter1, params.numteeth);  
  var part2=makeShaft(params.diameter2, outerdiameter,spidercenterdiameter,params.shaftlength2,params.outerlength2,params.spiderlength, params.nutradius2, params.nutthickness2, params.screwdiameter2, params.numteeth);
  var spider=makeSpider(outerdiameter, spidercenterdiameter, params.spiderlength, params.numteeth);
  
  if(params.spidermargin > 0)
  {
    spider=spider.contract(params.spidermargin, 4);
  }
  
  // rotate shaft parts for better 3d printing:
  part1=part1.rotateX(180).translate([0,0,params.outerlength1+params.spiderlength]);
  part2=part2.rotateX(180).translate([0,0,params.outerlength2+params.spiderlength]);
  
  var result=part1.translate([-outerdiameter-5,0,0]);
  result=result.union(part2.translate([0,0,0]));
  result=result.union(spider.translate([outerdiameter+5,0,-params.spidermargin]));
  return result;
}

function makeShaft(innerdiameter, outerdiameter, spidercenterdiameter, shaftlength, outerlength, spiderlength, nutradius, nutthickness, screwdiameter, numteeth)
{
  var result=CSG.cylinder({start:[0,0,0], end:[0,0,outerlength], radius:outerdiameter/2, resolution:cylresolution});
  
  for(var i=0; i < numteeth; i++)
  {
    var angle=i*360/numteeth;
    var pie=makePie(outerdiameter/2, spiderlength,angle-45/numteeth, angle+45/numteeth); 
    pie=pie.translate([0,0,outerlength]);
    result=result.union(pie);
  }
  var spidercylinder=CSG.cylinder({start:[0,0,outerlength], end:[0,0,outerlength+spiderlength],radius:spidercenterdiameter/2,resolution:cylresolution});
  result=result.subtract(spidercylinder);
  var shaftcylinder=CSG.cylinder({start:[0,0,0], end:[0,0,shaftlength], radius:innerdiameter/2, resolution:cylresolution});
  result=result.subtract(shaftcylinder);
  
  var screwz=shaftlength/2;
  if(screwz < nutradius) screwz=nutradius;  
  var nutcutout = hexagon(nutradius, nutthickness).translate([0,0,-nutthickness/2]);
  var grubnutradiusAtFlatSide = nutradius * Math.cos(Math.PI / 180 * 30);
  var nutcutoutrectangle = CSG.cube({
    radius: [outerlength/2, grubnutradiusAtFlatSide, nutthickness/2],
    center: [outerlength/2, 0, 0]
  });
  nutcutout = nutcutout.union(nutcutoutrectangle);
  nutcutout = nutcutout.rotateY(90);
  nutcutout = nutcutout.translate([(outerdiameter+innerdiameter)/4, 0, screwz]);
  result = result.subtract(nutcutout);
  
  var screwcutout=CSG.cylinder({
    start: [outerdiameter/2, 0, screwz],
    end: [0, 0, screwz],
    radius: screwdiameter/2, 
    resolution:cylresolution
  });
  result=result.subtract(screwcutout);
  
//return nutcutout; 
//  nutcutout = nutcutout.translate([-grubnutheight/2 - centerholeradius - nutdistance,0,0]);
  
  return result;
}

function makePie(radius, height, startangle, endangle)
{
  var absangle=Math.abs(startangle-endangle);
  if(absangle >= 180)
  {
    throw new Error("Pie angle must be less than 180 degrees");
  }
  var numsteps=cylresolution*absangle/360;
  if(numsteps < 1) numsteps=1;
  var points=[];
  for(var i=0; i <= numsteps; i++)
  {
    var angle=startangle+i/numsteps*(endangle-startangle);
    var vec = CSG.Vector2D.fromAngleDegrees(angle).times(radius);
    points.push(vec);    
  }
  points.push(new CSG.Vector2D(0,0));
  var shape2d=new CSG.Polygon2D(points);
  var extruded=shape2d.extrude({
    offset: [0,0,height]   // direction for extrusion
  });
  return extruded;  
}

function hexagon(radius, height)
{
  var vertices=[];
  for(var i=0; i < 6; i++)
  {
    var point=CSG.Vector2D.fromAngleDegrees(-i*60).times(radius).toVector3D(0);
    vertices.push(new CSG.Vertex(point));
  }
  var polygon=new CSG.Polygon(vertices);
  var hex=polygon.extrude([0,0,height]);
  return hex;
}

function makeSpider(outerdiameter, spidercenterdiameter, spiderlength, numteeth)
{
  var result=new CSG();
  var numspiderteeth=numteeth*2; // spider has twice the number of teeth
  for(var i=0; i < numspiderteeth; i++)
  {
    var angle=i*360/numspiderteeth;
    var pie=makePie(outerdiameter/2, spiderlength,angle-90/numspiderteeth, angle+90/numspiderteeth); 
    pie=pie.translate([0,0,0]);
    result=result.union(pie);
  }

  var centercylinder=CSG.cylinder({start:[0,0,0], end:[0,0,spiderlength], radius:spidercenterdiameter/2, resolution:cylresolution});
  result=result.union(centercylinder);

  return result;
}

