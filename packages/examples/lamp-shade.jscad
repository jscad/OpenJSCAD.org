// title      : Lamp Shade
// author     : Joost Nieuwenhuijse
// license    : MIT License
// description: a lamp shade
// file       : lamp-shade.jscad

function main(params)
{
  CSG.defaultResolution2D = (params.quality == "DRAFT")? 8:32;

  var bottomradius = params.bottomdiameter/2;
  var topradius = params.topdiameter/2;
  var height = params.height;
  var numfaces = params.numfaces;
  var thickness = params.thickness;
  var topholeradius = params.topholediameter/2;
  var cutterRadius = params.cutterdiameter / 2;
  
  var solid = CSG.cube({radius: [1000, 1000, height/2]});
  
  var plane = CSG.Plane.fromPoints([bottomradius, 0, -height/2], [bottomradius, 10, -height/2], [topradius, 0, height/2]);
  for(var i = 0; i < numfaces; i++)
  {
    solid = solid.cutByPlane(plane.rotateZ(i * 360 / numfaces));
  }

  var plates = solidToOuterShellPlates(solid, thickness);
  plates = removePlateWithNormal(plates, [0,0,-1]);
  plates = removePlateWithNormal(plates, [0,0,1]);

  for(var j = 1; j < numfaces; j++)
  {
    plates[j] = plates[0].rotateZ(j * 360 / numfaces);
  }
  
  var topplate = getStockPlate(1000,1000,thickness)
    .subtract(CSG.cylinder({start: [0,0,-thickness], end:[ 0,0,thickness], radius: topholeradius}))
    .translate([0,0,height/2-thickness/2-10]);
  topplate = topplate.intersect(solid);
  topplate = fixPlate(topplate, thickness);

  var fingerjointoptions = {
    margin: 0, cutterRadius: cutterRadius, fingerWidth: 25
  };
  plates = fingerJoint(plates,fingerjointoptions);
  plates = fingerJointAdd(plates, topplate, fingerjointoptions);

  if(params.type == "TOPPLATE")
  {
    return plateCSGToCAG(plates[numfaces]);
  }
  else
  {  
    var plate2d = plateCSGToCAG(plates[0]);
    plate2d = addRandomHoles(plate2d); 
    if(params.type == "SIDEPLATE")
    {
      return plate2d;
    }
    else
    {
      for(var k = 0; k < numfaces; k++)
      {
        var plate3d =  plateCAGToCSG(plate2d, plates[k].properties.platebasis, thickness);
        plates[k] = plate3d;
      }
      var result = new CSG().union(plates);
      result = result.rotateX(90);
      return result;
    }
  }
}

function addRandomHoles(plate)
{
  var distancefromedge = 8;
  var distancebetweenholes = 10;
  var mindiameter = 10;
  var maxdiameter = 25; 
  // maskarea: the 'forbidden' area for holes:
  var maskarea = plate.contract(distancefromedge, 4);
  var bounds = maskarea.getBounds();
  maskarea = maskarea.flipped();  
  var holes = [];
  var existingholecenters = [];
  var existingholeradii = [];
  for(var i = 0; i < 10; i++)
  {
    for(var tryindex = 0; tryindex < 10; tryindex++)
    {
      var holeradius = (mindiameter + Math.random() * (maxdiameter - mindiameter))/2;
      var x = bounds[0].x + holeradius + (bounds[1].x - bounds[0].x - holeradius*2) * Math.random(); 
      var y = bounds[0].y + holeradius + (bounds[1].y - bounds[0].y - holeradius*2) * Math.random();
      var holecenter = new CSG.Vector2D(x,y);
      var valid = true;
      // check if the hole is too close to one of the existing holes:
      var numexistingholes = existingholecenters.length;
      for(var i2 = 0; i2 < numexistingholes; i2++)
      {
        var d = holecenter.minus(existingholecenters[i2]).length();
        if(d < holeradius+existingholeradii[i2] + distancebetweenholes)
        {        
          valid = false;
          break;
        } 
      }
      if(valid)
      {
        // check if the hole is not too close to the edges:
        var hole = CAG.circle({radius: holeradius, center: holecenter});
        var testarea = maskarea.intersect(hole);
        if(testarea.sides.length !== 0) valid = false;
        if(valid)
        {
          existingholeradii.push(holeradius);
          existingholecenters.push(holecenter);
          holes.push(hole);
          break;
        }
      } 
    }
  }
  return plate.subtract(holes);
}

function plateCSGToCAG(plate)
{
  if(!("platebasis" in plate.properties))
  {
    throw new Error("Plates should be created using getStockPlate()");
  }
  var plate2d = plate.projectToOrthoNormalBasis(plate.properties.platebasis);
  return plate2d;
}

function plateCAGToCSG(plate2d, platebasis, thickness)
{
  var basisinversematrix = platebasis.getInverseProjectionMatrix();
  var plate_reprojected = plate2d.extrude({offset: [0,0,thickness]}).translate([0,0,-thickness/2]);
  plate_reprojected = plate_reprojected.transform(basisinversematrix);
  plate_reprojected.properties.platebasis = platebasis;
  return plate_reprojected;
}

function fixPlate(plate, thickness)
{
  return plateCAGToCSG(plateCSGToCAG(plate), plate.properties.platebasis, thickness); 
}

function removePlateWithNormal(plates, normalvector)
{
  normalvector = new CSG.Vector3D(normalvector);
  var result = [];
  plates.map(function(plate){
    if(!("platebasis" in plate.properties))
    {
      throw new Error("Plates should be created using getStockPlate()");
    } 
    if(plate.properties.platebasis.plane.normal.dot(normalvector) < 0.9999)
    {
      result.push(plate);
    } 
  });
  return result;
}

function getStockPlate(width, height, thickness)
{
  var result = CSG.cube({radius: [width/2, height/2, thickness/2]});
  result.properties.platebasis = CSG.OrthoNormalBasis.Z0Plane();
  return result;
}

function fingerJointAdd(plates, newplate, options)
{
  var result = plates.slice(0);
  var numplates = plates.length;
  for(var plateindex1 = 0; plateindex1 < numplates; plateindex1++)
  {
    var joined = fingerJointTwo(result[plateindex1], newplate, options);
    result[plateindex1] = joined[0];
    newplate = joined[1];
  }
  result.push(newplate);
  return result;
}

// Finger joint between multiple plates:
function fingerJoint(plates, options)
{
  var result = plates.slice(0);
  var numplates = plates.length;
  var maxdelta = Math.floor(numplates/2);
  for(var delta=1; delta <= maxdelta; delta++)
  { 
    for(var plateindex1 = 0; plateindex1 < numplates; plateindex1++)
    {
      var plateindex2 = plateindex1 + delta;
      if(plateindex2 >= numplates) plateindex2 -= numplates; 
      
      var joined = fingerJointTwo(result[plateindex1], result[plateindex2], options);
      result[plateindex1] = joined[0];
      result[plateindex2] = joined[1];
      if(delta*2 >= numplates)
      {
        // numplates is even
        if(plateindex1*2 >= numplates)
        {
          // and we've done the first half: we're done
          break;
        }
      }
    }
  }
  return result;
}

function fingerJointTwo(plate1, plate2, options)
{
  if(!options) options = {};
  if(!("platebasis" in plate1.properties))
  {
    throw new Error("Plates should be created using getStockPlate()");
  } 
  if(!("platebasis" in plate2.properties))
  {
    throw new Error("Plates should be created using getStockPlate()");
  } 
  // get the intersection solid of the 2 plates:
  var intersection = plate1.intersect(plate2);
  if(intersection.polygons.length === 0)
  {
    // plates do not intersect. Return unmodified:
    return [plate1, plate2];
  }
  else
  {
    var plane1 = plate1.properties.platebasis.plane; 
    var plane2 = plate2.properties.platebasis.plane;
    // get the intersection line of the 2 center planes:
    var jointline = plane1.intersectWithPlane(plane2);
    // Now we need to find the two endpoints on jointline (the points at the edges of intersection):
    // construct a plane perpendicular to jointline:
    plane1 = CSG.Plane.fromNormalAndPoint(jointline.direction, jointline.point);
    // make the plane into an orthonormal basis:
    var basis1 = new CSG.OrthoNormalBasis(plane1);
    // get the projection matrix for the orthobasis:
    var matrix = basis1.getProjectionMatrix();
    // now transform the intersection solid:
    var intersection_transformed = intersection.transform(matrix);
    var bounds = intersection_transformed.getBounds();
    // now we know the two edge points. The joint line runs from jointline_origin, in the 
    // direction jointline_direction and has a length jointline_length (jointline_length >= 0) 
    var jointline_origin = jointline.point.plus(jointline.direction.times(bounds[0].z));
    var jointline_direction = jointline.direction;
    var jointline_length = bounds[1].z - bounds[0].z;
  
    var fingerwidth = options.fingerWidth || (jointline_length / 4); 
    var numfingers=Math.round(jointline_length / fingerwidth);
    if(numfingers < 2) numfingers=2;
    fingerwidth = jointline_length / numfingers;
    
    var margin = options.margin || 0;
    var cutterRadius = options.cutterRadius || 0; 
    var results = [];
    for(var plateindex = 0; plateindex < 2; plateindex++)
    {
      var thisplate = (plateindex == 1)? plate2:plate1;
      // var otherplate = (plateindex == 1)? plate1:plate2;
      // create a new orthonormal basis for this plate, such that the joint line runs in the positive x direction:
      var platebasis = new CSG.OrthoNormalBasis(thisplate.properties.platebasis.plane, jointline_direction);
      // get the 2d shape of our plate:
      var plate2d = thisplate.projectToOrthoNormalBasis(platebasis);
      var jointline_origin_2d = platebasis.to2D(jointline_origin);
      matrix = platebasis.getProjectionMatrix();
      intersection_transformed = intersection.transform(matrix);
      bounds = intersection_transformed.getBounds();
      var maxz = bounds[1].z;
      var minz = bounds[0].z;
      var maxy = bounds[1].y + margin/2; 
      var miny = bounds[0].y - margin/2;
      
      var cutouts2d = [];
      for(var fingerindex = 0; fingerindex < numfingers; fingerindex++)
      {
        if( (plateindex === 0) && ((fingerindex & 1)===0) ) continue;
        if( (plateindex  == 1) && ((fingerindex & 1)!==0) ) continue;
        var minx = jointline_origin_2d.x + fingerindex * fingerwidth - margin/2;
        var maxx = minx + fingerwidth + margin;
        var cutout = createRectCutoutWithCutterRadius(minx, miny, maxx, maxy, cutterRadius, plate2d);
        cutouts2d.push(cutout);
      }
      var cutout2d = new CAG().union(cutouts2d);
      var cutout3d = cutout2d.extrude({offset: [0,0,maxz-minz]}).translate([0,0,minz]);
      cutout3d = cutout3d.transform(platebasis.getInverseProjectionMatrix());
      var thisplate_modified = thisplate.subtract(cutout3d);
      results[plateindex] = thisplate_modified;  
    } 
    return results;
  }
}

// Create a rectangular cutout in 2D
// minx, miny, maxx, maxy: boundaries of the rectangle
// cutterRadius: if > 0, add extra cutting margin at the corners of the rectangle
// plate2d is the 2d shape from which the cutout will be subtracted
// it is tested at the corners of the cutout rectangle, to see if do need to add the extra margin at that corner
function createRectCutoutWithCutterRadius(minx, miny, maxx, maxy, cutterRadius, plate2d)
{
  var deltax = maxx-minx;
  var deltay = maxy-miny;  
  var cutout = CAG.rectangle({radius: [(maxx-minx)/2, (maxy-miny)/2], center: [(maxx+minx)/2, (maxy+miny)/2]});
  var cornercutouts = [];
  if(cutterRadius > 0)
  {
    var extracutout = cutterRadius * 0.2;
    var hypcutterradius = cutterRadius / Math.sqrt(2.0);
    var halfcutterradius = 0.5 * cutterRadius;
    var dcx, dcy;
    if(deltax > 3*deltay)
    {
      dcx = cutterRadius + extracutout/2;
      dcy = extracutout / 2;
    }
    else if(deltay > 3*deltax)
    {
      dcx = extracutout / 2;
      dcy = cutterRadius + extracutout/2;
    }
    else
    {
      dcx = hypcutterradius-extracutout/2;
      dcy = hypcutterradius-extracutout/2;
    }
    for(var corner = 0; corner < 4; corner++)
    {
      var cutoutcenterx = (corner & 2)? (maxx-dcx):(minx+dcx);
      var cutoutcentery = (corner & 1)? (maxy-dcy):(miny+dcy);
      var cornercutout = CAG.rectangle({radius: [cutterRadius+extracutout/2, cutterRadius+extracutout/2], center: [cutoutcenterx, cutoutcentery]});
      var testrectacenterx = (corner & 2)? (maxx-halfcutterradius):(minx+halfcutterradius);
      var testrectbcenterx = (corner & 2)? (maxx+halfcutterradius):(minx-halfcutterradius);
      var testrectacentery = (corner & 1)? (maxy+halfcutterradius):(miny-halfcutterradius);
      var testrectbcentery = (corner & 1)? (maxy-halfcutterradius):(miny+halfcutterradius);
      var testrecta = CAG.rectangle({radius: [halfcutterradius, halfcutterradius], center: [testrectacenterx, testrectacentery]}); 
      var testrectb = CAG.rectangle({radius: [halfcutterradius, halfcutterradius], center: [testrectbcenterx, testrectbcentery]});
      if( (plate2d.intersect(testrecta).sides.length > 0)  &&
       (plate2d.intersect(testrectb).sides.length > 0) )
      {
        cornercutouts.push(cornercutout);
      }
    }
  }
  if(cornercutouts.length > 0)
  {
    cutout = cutout.union(cornercutouts);
  } 
  return cutout;
}

function solidToOuterShellPlates(csg, thickness)
{
  csg = csg.canonicalized();
  var bounds = csg.getBounds();
  var csgcenter = bounds[1].plus(bounds[0]).times(0.5);
  var csgradius = bounds[1].minus(bounds[0]).length();
  var plane2polygons = {};
  csg.polygons.map(function(polygon){
    var planetag = polygon.plane.getTag();
    if(!(planetag in plane2polygons))
    {
      plane2polygons[planetag] = [];
    }
    plane2polygons[planetag].push(polygon);
  });
  var plates = [];
  for(var planetag in plane2polygons)
  {
    var polygons = plane2polygons[planetag];
    var plane = polygons[0].plane;
    var shellcenterplane = new CSG.Plane(plane.normal, plane.w - thickness/2);    
    var basis = new CSG.OrthoNormalBasis(shellcenterplane);
    var inversebasisprojection = basis.getInverseProjectionMatrix(); 
    var csgcenter_projected = basis.to2D(csgcenter);
    var plate = getStockPlate(csgradius, csgradius, thickness).translate([csgcenter_projected.x, csgcenter_projected.y, 0]);
    plate = plate.transform(inversebasisprojection);
    plate = plate.intersect(csg);
    plates.push(plate);
  }
  return plates;
}

function getParameterDefinitions()
{
  return [
    {name: 'topdiameter', type: 'float', initial: 160, caption: "Top diameter:"},
    {name: 'bottomdiameter', type: 'float', initial: 300, caption: "Bottom diameter:"},
    {name: 'height', type: 'float', initial: 170, caption: "Height:"},
    {name: 'numfaces', type: 'int', initial: 5, caption: "Number of faces:"},
    {name: 'thickness', type: 'float', initial: 4, caption: "Thickness of stock material:"},
    {name: 'topholediameter', type: 'float', initial: 42, caption: "Diameter of top hole:"},
    {name: 'cutterdiameter', type: 'float', initial: 3.2, caption: "Diameter of CNC cutter / laser beam:"},

    {
      name: 'type',
      type: 'choice',
      values: ["ASSEMBLED", "TOPPLATE", "SIDEPLATE"],               // these are the values that will be supplied to your script
      captions: ["Assembled", "Top plate (DXF output)", "Side plate (DXF output)"],  // optional, these values are shown in the listbox
                                                   // if omitted, the items in the 'values' array are used
      caption: 'Show:',                           // optional, displayed left of the input field
      initial: "ASSEMBLED"                              // optional, default selected value
                                                   // if omitted, the first item is selected by default
    },
    {
      name: 'quality',
      type: 'choice',
      values: ["DRAFT", "HIGH"],               // these are the values that will be supplied to your script
      captions: ["Draft", "High"],  // optional, these values are shown in the listbox
                                                   // if omitted, the items in the 'values' array are used
      caption: 'Quality:',                           // optional, displayed left of the input field
      initial: "DRAFT"                              // optional, default selected value
                                                   // if omitted, the first item is selected by default
    }
  ];
}

