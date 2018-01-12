// title      : iPhone 4 Dock
// author     : Joost Nieuwenhuijse
// license    : MIT License
// description: iPhone 4 dock
// file       : iphone4-case.jscad

/*

OpenJsCad script for iPhone 4 dock
Note: not tried printing yet, not sure if it really wil fit.

To create the STL file, launch Google Chrome and go to:
http://joostn.github.com/OpenJsCad/processfile.html or http://openjscad.org

Then drag&drop this file into the page

OpenJsCad is an open source 3d solid modeling tool using JavaScript.
For more information see http://joostn.github.com/OpenJsCad

*/

function getParameterDefinitions() {
  return [
    {
      name: 'quality', 
      type: 'choice',
      caption: 'Quality:',
      values: ["draft", "smooth", "supersmooth"],
      captions: ["Draft (no rounded corners)", "Smooth (rounded corners)", "Super smooth (rounded corners)"], 
      initial: "draft"
    },
    {
      name: 'iphonemargin', 
      type: 'float', 
      initial: 0.5,
      caption: "Margin around iphone (in mm):"
    },
    {
      name: 'plugmargin', 
      type: 'float', 
      initial: 0.25,
      caption: "Margin around dock connector (in mm):"
    },
    { name: 'mouseear', caption: 'Add mouse ear:', type: 'choice', values: [0, 1], initial: 1, captions: ["No", "Yes"]}
  ];
}

function main(params)
{  
  var resolution = 16;  // resolution for all the curved surfaces
  var smoothing = (params.quality != "draft"); // set to false during development, for fast rendering
  var draft = (params.quality != "supersmooth");     // set to false for high resolution smoothing, rendering will take several minutes!

  var x1=40, x2=25, x3=8;
  var y1=35, y2=y1+8, y3=y2+25;
  var frontheight = 30;
  
  // Build the base from two 2D polygons:
  var base1=new CSG.Polygon2D([[0,0],[x1,0],[x1,y1],[x2,y2],[0,y2]]);
  var base2=new CSG.Polygon2D([[0,y2],[x2,y2],[x3,y3],[0,y3]]);
  var extruded1=base1.extrude({offset: [0, 0,frontheight]});
  var extruded2=base2.extrude({offset: [0, 0,frontheight]});
  // We now have the right half; mirror to create the left half:
  extruded1 = extruded1.union(extruded1.mirroredX());
  extruded2 = extruded2.union(extruded2.mirroredX());
  var base = extruded1.union(extruded2);
  
  // Make the top back surface slightly slanted:
  var backtopplane = CSG.Plane.fromNormalAndPoint([0, 8, 10], [0, y2, frontheight]);
  base = base.cutByPlane(backtopplane);
  
  // Make the front surface slightly slanted:
  var frontplane = CSG.Plane.fromNormalAndPoint([0, -10, 2], [0, 0, 0]);
  base = base.cutByPlane(frontplane);
  
  // Add a CSG.Connector to the base, at the point where the iphone should
  // rest in the base. The connector's axis points upwards and its normal
  // points towards the front:
  var recessionDepth = 10;
  var distanceFromFront = 20;
  var angle = 15;
  base.properties.iphoneConnector = new CSG.Connector(
    [0, distanceFromFront, frontheight - recessionDepth],  // the point
    [0, 0, 1],  // axis vector
    [1, 0, 0]  // normal vector
  );
  // rotate the base.properties.iphoneConnector, so that the iphone will be tilted: 
  var rotmaxtrix = CSG.Matrix4x4.rotation(base.properties.iphoneConnector.point, [1, 0, 0], angle);
  base.properties.iphoneConnector = base.properties.iphoneConnector.transform(rotmaxtrix);
   
  // Create iphone placeholder (it's just a cube with the iphone's dimensions):
  var iphoneradius = new CSG.Vector3D(58.6/2 + params.iphonemargin, 9.4/2 + params.iphonemargin, 115/2); 
  var iphone = CSG.cube({radius: iphoneradius});
  
  // Create the little tab behind the iphone:
  var tabradius = new CSG.Vector3D(15, 5, 12); 
  var tab = CSG.cube({radius: tabradius});
  tab = tab.translate([0, (iphoneradius.y+tabradius.y), (-iphoneradius.z+tabradius.z)]);
  
  // Add a CSG.Connector to the iphone's properties. This is the place where the 
  // 30 pin dock plug will snap in. In this case it is the center of the bottom
  // Z plane of the cube. Since the cube already has 6 predefined connectors
  // at the center of each face, we can just use one of those instead of creating
  // a new CSG.Connector:
  iphone.properties.dockConnector = iphone.properties.cube.facecenters[5];

  // transform the iphone so it sits in the base:
  var iphoneTransformation = iphone.properties.dockConnector.getTransformationTo(base.properties.iphoneConnector, true, 0); 
  iphone = iphone.transform(iphoneTransformation);
  
  // transform the tab so it stays behind the iphone: 
  tab = tab.transform(iphoneTransformation);

  // and add the tab to the base:  
  base = base.union(tab);  

  // build the iphone plug:
  var plug = getIphoneDockConnector(params.plugmargin, resolution);
  
  // The plug has a predefined Connector plug.properties.iphoneConnector
  // To attach the plug to the iphone we connect plug.properties.iphoneConnector
  // to iphone.properties.dockConnector
  plug = plug.connectTo(plug.properties.iphoneConnector, 
    iphone.properties.dockConnector, true, 0);
  
  // We must make sure we can pull the USB cable through the dock. So there needs 
  // to be space for the plug. We just create a tall cube with the size of the USB
  // plug (8 by 40 mm), which will be subtracted from the dock's shape:
  var gapForUsbPlug = CSG.cube({radius: [8, 4, 40]});
  
  // Align it to the plug. Again, since gapForUsbPlug is a CSG.cube it already
  // has predefined CSG.Connectors at every face. Connect the Z face to the iphone: 
  gapForUsbPlug = gapForUsbPlug.connectTo(gapForUsbPlug.properties.cube.facecenters[5], 
    iphone.properties.dockConnector, true, 0);
  
//  return plug.union(iphone).union(gapForUsbPlug);
  
  //var cutout = plug.union(iphone).union(gapForUsbPlug);
  //return cutout;
  
  base = base.subtract(iphone);
  
  // make the cutout for the cable:
  var cablewidth = 3;
  var cableheight = 4; 
  var bottomplane = CSG.Plane.fromNormalAndPoint([0, 0, -1], [0, 0, 0]);
  var cableline = plug.properties.cableConnector.axisLine();
  var cableexitpoint = bottomplane.intersectWithLine(cableline);
  var cableentrypoint = new CSG.Vector3D(0, y3, 0);

  var cablepath = new CSG.Path2D([[cableentrypoint.x, cableentrypoint.y], [cableexitpoint.x, cableexitpoint.y]], false);
  var cablecutout = cablepath.rectangularExtrude(cablewidth, cableheight, resolution, false);
  
  // Smooth the base:
  if(smoothing)
  {
    base = base.contract(4, draft? 4:16);
    base = base.expand(4, draft? 4:16);
  }
  
  // Subtract the connector and cable:
  base = base.subtract(iphone).subtract(plug).subtract(cablecutout).subtract(gapForUsbPlug);
  
  // add mouse ear:
  if(params.mouseear == 1)
  {
    var mouseearpoint = new CSG.Vector3D(0, y3, 0);
    var mouseearthickness = 0.5;
    var mouseearradius = 15;
    var mouseear = CSG.cylinder({
      start: mouseearpoint, 
      end: mouseearpoint.plus(new CSG.Vector3D(0, 0, mouseearthickness)),
      radius: mouseearradius,
      resolution: 16
    });
    base = base.union(mouseear);     
  }
  
  // center:
  var basecenter = base.getBounds()[0].plus(base.getBounds()[1]).times(0.5);
  base = base.translate(basecenter.negated());
  
  return base;
}

///////////////////// 
function getIphoneDockConnector(margin, resolution)
{
  margin = new CSG.Vector3D(margin);
  var dockConnectorSize = new CSG.Vector3D([26.2, 5.7, 9.5]).plus(margin.times(2));  
  var dockConnector = CSG.cube({radius: [(dockConnectorSize.x-dockConnectorSize.y)/2, dockConnectorSize.y/2, dockConnectorSize.z/2]});
  dockConnector = dockConnector.union(CSG.cylinder({
    start: [(dockConnectorSize.x-dockConnectorSize.y)/2, 0, -dockConnectorSize.z/2],
    end: [(dockConnectorSize.x-dockConnectorSize.y)/2, 0, dockConnectorSize.z/2],
    radius: dockConnectorSize.y/2,
    resolution: resolution
  }));
  dockConnector = dockConnector.union(CSG.cylinder({
    start: [-(dockConnectorSize.x-dockConnectorSize.y)/2, 0, -dockConnectorSize.z/2],
    end: [-(dockConnectorSize.x-dockConnectorSize.y)/2, 0, dockConnectorSize.z/2],
    radius: dockConnectorSize.y/2,
    resolution: resolution
  }));
  var cableTube = CSG.cylinder({
    start: [0, 0, -dockConnectorSize.z/2-5.70-margin.z],
    end: [0, 0, -dockConnectorSize.z/2],
    radius: 2.25+margin.y,
    resolution: resolution
  }); 
  dockConnector = dockConnector.union(cableTube);
  
  // Add CSG.Connector properties:
  dockConnector.properties.iphoneConnector = dockConnector.properties.cube.facecenters[4];
  dockConnector.properties.cableConnector = cableTube.properties.cylinder.start;
    
  return dockConnector;
}


