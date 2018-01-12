// title      : Grille
// author     : Joost Nieuwenhuijse
// license    : MIT License
// description: a grille for...
// file       : grille.jscad

// Here we define the user editable parameters: 
function getParameterDefinitions() {
  return [
    { name: 'outerwidth', caption: 'Outer width of grille:', type: 'float', initial: 190 },
    { name: 'outerheight', caption: 'Outer height of grille:', type: 'float', initial: 120 },
    { name: 'outerdepth', caption: 'Outer depth of grille:', type: 'float', initial: 12 },
    { name: 'thickness', caption: 'Wall thickness:', type: 'float', initial: 2.5 },
    { name: 'innerdistance', caption: 'Inner standoff distance:', type: 'float', initial: 2 },
    { name: 'bladescale', caption: 'Relative size of blades (1.0 is default):', type: 'float', initial: 1 },
    { name: 'numdividers', caption: 'Number of vertical dividers:', type: 'int', initial: 2 },
    {
      name: 'addlooseners', 
      type: 'choice',
      caption: 'Add loops (for easy removal):',
      values: [0, 1],
      captions: ["No", "Yes"], 
      initial: 1
    },
    {
      name: 'show', 
      type: 'choice',
      caption: 'Show:',
      values: ["all", "grille", "holders"],
      captions: ["All", "Grille (for printing)", "Holders (for printing)"], 
      initial: "all"
    },
    {
      name: 'mouseears', 
      type: 'choice',
      caption: 'Add mouse ears:',
      values: [0, 1],
      captions: ["No", "Yes"], 
      initial: 1
    },
    {
      name: 'quality', 
      type: 'choice',
      caption: 'Quality:',
      values: [0, 1],
      captions: ["Draft", "Final"], 
      initial: 0
    }
  ];
}

function main(params)
{
  var outerwidth = params.outerwidth;
  var outerheight = params.outerheight;
  var thickness = params.thickness;
  var outerdepth = params.outerdepth;
  var innerdistance = params.innerdistance;  
  var bladescale = params.bladescale;
  
  var draft = params.quality != 1;
  
  var marginleftright = 21;
  var margintopbottom = 15;
  var bladedistance = 12 * bladescale;
  var frontroundradius = 5;
  frontroundradius = Math.max(frontroundradius, thickness+0.2);
  var outerroundradius = 3;
  outerroundradius = Math.max(outerroundradius, thickness+0.2);
  outerdepth = Math.max(outerdepth, outerroundradius); 
  outerdepth = Math.max(outerdepth, innerdistance+thickness); 
  var frontextend = innerdistance + bladescale*12 + thickness - outerdepth;
  frontextend = Math.max(frontextend, 1.5);  
  var bladewidth = outerwidth - 2*marginleftright;
  var bladesheight = outerheight - 2*margintopbottom;
  var numblades = Math.ceil(bladesheight / bladedistance) + 1; 
  var topnotchsize = new CSG.Vector3D([20, 8, 3]);
  var topnotchpos = new CSG.Vector3D([outerwidth/2-thickness - topnotchsize.x/2, outerheight/2-thickness - topnotchsize.y/2, topnotchsize.z/2]);
  var bottomnotchsize = new CSG.Vector3D([12, 4, topnotchsize.z]);
  var bottomnotchpos = new CSG.Vector3D([outerwidth/2-thickness - 4 - bottomnotchsize.x/2, -outerheight/2+thickness + bottomnotchsize.y/2, bottomnotchsize.z/2]);

  var roundresolution = draft? 4 : 16;
  
  var result = new CSG();
  if(params.show != "holders")
  {
    // build the shell:
    var z0plane = CSG.Plane.fromNormalAndPoint([0, 0, -1], [0, 0, 0]);
    var outershell = CSG.roundedCube({center: [0,0,0], radius: [outerwidth/2, outerheight/2, outerdepth], roundradius: outerroundradius, resolution: roundresolution});
    outershell = outershell.cutByPlane(z0plane);
    var innershell = CSG.roundedCube({center: [0,0,0], radius: [outerwidth/2-thickness, outerheight/2-thickness, outerdepth-thickness], roundradius: outerroundradius-thickness, resolution: roundresolution});
    innershell = innershell.cutByPlane(z0plane);
    var shell = outershell.subtract(innershell);
    var frontextendoutershell = CSG.roundedCube({center: [0,0,0], radius: [bladewidth/2+thickness, bladesheight/2+thickness, outerdepth+frontextend+frontroundradius+thickness], roundradius: frontroundradius, resolution: roundresolution});
    var frontextendinnershell = CSG.roundedCube({center: [0,0,0], radius: [bladewidth/2, bladesheight/2, outerdepth+frontextend+frontroundradius+thickness+100], roundradius: frontroundradius-thickness, resolution: roundresolution});
    frontextendinnershell = frontextendinnershell.cutByPlane(z0plane);
    var plane3 = CSG.Plane.fromNormalAndPoint([0, 0, 1], [0, 0, outerdepth+frontextend+100]);
    frontextendinnershell = frontextendinnershell.cutByPlane(plane3);
    var plane1 = CSG.Plane.fromNormalAndPoint([0, 0, 1], [0, 0, outerdepth+frontextend]);
    frontextendoutershell = frontextendoutershell.cutByPlane(plane1);
    var plane2 = CSG.Plane.fromNormalAndPoint([0, 0, -1], [0, 0, innerdistance]);
    frontextendoutershell = frontextendoutershell.cutByPlane(plane2);
    shell = shell.subtract(frontextendinnershell);
    var frontextendshell = frontextendoutershell.subtract(frontextendinnershell);
    shell = shell.union(frontextendshell);
    
    // build a blade:
    var curvedpath = CSG.Path2D.arc({
      center: [0,0,0],
      radius: 15 * bladescale,
      startangle: 20,
      endangle: 80,
      resolution: draft? 8:32
    });
    var blade = curvedpath.rectangularExtrude(thickness, bladewidth, draft? 4:16, true);
    var bladecenter = blade.getBounds()[0].plus(blade.getBounds()[1]).times(0.5);
    blade = blade.translate(bladecenter.negated());
    blade = blade.rotateY(-90);
    blade = blade.translate([0, 0, -blade.getBounds()[0].z+innerdistance]);
    var bladesize = blade.getBounds()[1].minus(blade.getBounds()[0]);
    
    // add the blades to the shell:
    var blades = new CSG();
    for(var i = 0; i < numblades; i++)
    {
      var topy = bladesheight/2 + thickness - i*bladedistance;
      var translatedblade = blade.translate([0, topy-bladesize.y/2, 0]);
      blades = blades.union(translatedblade);
    }
    blades = blades.intersect(frontextendinnershell);
    var grille = shell;
    grille = shell.union(blades);
    
    // add the dividers:
    var dividers = new CSG();
    if(params.numdividers > 0)
    {
      var w1 = (bladewidth - params.numdividers * thickness)/(params.numdividers+1); 
      for(var j = 0; j < params.numdividers; j++)
      {
        var x = -(params.numdividers-1)*(w1+thickness)/2 + j*(w1+thickness);
        var z1 = outerdepth+frontextend;
        var divider = CSG.cube({center: [x, 0, (z1+innerdistance)/2], radius: [thickness/2, bladesheight/2, (z1-innerdistance)/2]});
        dividers = dividers.union(divider);
      }
    }
    grille = grille.union(dividers);
    
    // create the notches:
    var notches = new CSG();
    var topnotch1 = CSG.cube({center: topnotchpos, radius: topnotchsize.times(0.5) });
    notches = notches.union(topnotch1);  
    var topnotch2 = CSG.cube({center: [-topnotchpos.x, topnotchpos.y, topnotchpos.z], radius: topnotchsize.times(0.5) });
    notches = notches.union(topnotch2);
    var bottomnotch1 = CSG.cube({center: bottomnotchpos, radius: bottomnotchsize.times(0.5) });
    notches = notches.union(bottomnotch1);  
    var bottomnotch2 = CSG.cube({center: [-bottomnotchpos.x, bottomnotchpos.y, bottomnotchpos.z], radius: bottomnotchsize.times(0.5) });
    notches = notches.union(bottomnotch2);  
    notches = notches.intersect(outershell);    
    grille = grille.union(notches);
    result = result.union(grille);
    
    // create the looseners:
    if(params.addlooseners == 1)
    {
      var loosenerinnerwidth = 5;
      var loosenerinnerheight = 2;
      var loosenerdepth = 4;
      var loosener = CSG.cube({center: [0, -outerheight/2 - loosenerinnerheight/2, loosenerdepth/2],
        radius: [loosenerinnerwidth/2+thickness, loosenerinnerheight/2+thickness, loosenerdepth/2]});
      loosener = loosener.subtract(CSG.cube({center: [0, -outerheight/2 - loosenerinnerheight/2, loosenerdepth/2],
        radius: [loosenerinnerwidth/2, loosenerinnerheight/2, loosenerdepth/2]}));
      var loosenerx = -outerwidth/2 + loosenerinnerwidth/2 + 5 + thickness; 
  
      var looseners = loosener.translate([loosenerx, 0, 0]);
      looseners = looseners.union(loosener.translate([-loosenerx, 0, 0]));
      result = result.union(looseners);
    } 

    if(params.mouseears == 1)
    {
      for(var k = 0; k < 4; k++)
      {
        var xpos=outerwidth/2-10;
        var ypos=outerheight/2;
        if(k&1) xpos = -xpos;
        if(k&2) ypos = -ypos;
        var cylinder = CSG.cylinder({start: [xpos, ypos, 0], end: [xpos, ypos, 0.5], radius: 15});
        result = result.union(cylinder);
      }
      for(var m = 0; m < 4; m++)
      {
        var xpos2=bladewidth/2 + thickness/2;
        var ypos2=bladesheight/2 + thickness/2;
        if(m&1) xpos2 = -xpos2;
        if(m&2) ypos2 = -ypos2;
        var cyl1 = CSG.cylinder({start: [xpos2, ypos2, 0], end: [xpos2, ypos2, 0.5], radius: 15});
        var cyl2 = CSG.cylinder({start: [xpos2, ypos2, 0], end: [xpos2, ypos2, innerdistance], radius: 5});
        result = result.union(cyl1.union(cyl2));
      }
    }
  }
  
  if(params.show != "grille")
  {
    // create the holders:
    var holderyoffset = 0.5;
    var holderzoffset = 1;
    var holderwidth = 10;
    var holderthickness = 3;
    var holdertopclipheight = 4;
    var holderbottomclipheight = 2;
    var holderscrewholeradius = 2;
    var holderscrewholedistance = 6;
    
    var holderx;
    if(params.show == "holders")
    {
      // just the holders:
      holderx = holderwidth/2+2;
    }
    else
    {
      holderx = bottomnotchpos.x + bottomnotchsize.x/2 - holderwidth/2;
    }
    var holdery1 = topnotchpos.y - topnotchsize.y/2 - holderyoffset;
    var holdery2 = bottomnotchpos.y + bottomnotchsize.y/2 + holderyoffset;
    
    var holdery0 = holdery1+holdertopclipheight;
    var holdery3 = holdery2-holderbottomclipheight;
    var holder = CSG.cube({center: [0, (holdery1 + holdery2)/2 , holderthickness/2], 
      radius: [holderwidth/2, (holdery1-holdery2)/2, holderthickness/2]});
    var d1 = 7;  
    var holdery1a = holdery1 - d1;
    var holdery2a = holdery2 + d1;
    var holderz1 = topnotchsize.z + holderzoffset;
    var holderz2 = holderz1 + holderthickness;
    holder = holder.union(CSG.cube({
      center: [0, (holdery1a+holdery1)/2, holderz2/2],
      radius: [holderwidth/2, (holdery1-holdery1a)/2, holderz2/2]
    }));
    holder = holder.union(CSG.cube({
      center: [0, (holdery2a+holdery2)/2, holderz2/2],
      radius: [holderwidth/2, (holdery2a-holdery2)/2, holderz2/2]
    }));
    holder = holder.union(CSG.cube({
      center: [0, (holdery0+holdery1a)/2, (holderz2+holderz1)/2],
      radius: [holderwidth/2, (holdery0-holdery1a)/2, (holderz2-holderz1)/2]
    }));
    holder = holder.union(CSG.cube({
      center: [0, (holdery2a+holdery3)/2, (holderz2+holderz1)/2],
      radius: [holderwidth/2, (holdery2a-holdery3)/2, (holderz2-holderz1)/2]
    }));
    var screwhole = CSG.cylinder({start: [0,0,0], end: [0, 0, holderthickness], radius: holderscrewholeradius, resolution: 16});
    holder = holder.subtract(screwhole.translate([0, holdery1a-holderscrewholedistance, 0]));
    holder = holder.subtract(screwhole.translate([0, holdery2a+holderscrewholedistance, 0]));
    
    holder = holder.setColor(0, 1, 0);
    
    var holders = holder.translate([holderx,0,0]);
    holders = holders.union(holder.translate([-holderx,0,0]));
    if(params.show == "holders")
    {
      holders = holders.rotateZ(90);
    }
    
    result = result.union(holders);
  }
  result = result.rotateZ(90);
  return result;
}

