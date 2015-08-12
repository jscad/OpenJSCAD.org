/*
## License

Copyright (c) 2014 bebbi (elghatta@gmail.com)
Copyright (c) 2013 Eduard Bespalov (edwbes@gmail.com)
Copyright (c) 2012 Joost Nieuwenhuijse (joost@newhouse.nl)
Copyright (c) 2011 Evan Wallace (http://evanw.github.com/csg.js/)
Copyright (c) 2012 Alexandre Girard (https://github.com/alx)

All code released under MIT license

*/

// import the required modules if necessary

if(typeof module !== 'undefined') {    // used via nodejs
    CSG = require('./csg.js').CSG;
    CAG = require('./csg.js').CAG;
    Blob = require('./Blob.js').Blob;
}

////////////////////////////////////////////
// X3D Export
////////////////////////////////////////////

(function(module) {

CSG.prototype.toX3D = function() {
    // materialPolygonLists
    // key: a color string (e.g. "0 1 1" for yellow)
    // value: an array of strings specifying polygons of this color
    //        (as space-separated indices into vertexCoords)
    var materialPolygonLists = {},
        // list of coordinates (as "x y z" strings)
        vertexCoords = [],
        // map to look up the index in vertexCoords of a given vertex
        vertexTagToCoordIndexMap = {};

    this.polygons.map(function(p) {
        var red = 0,
            green = 0,
            blue = 1; // default color is blue
        if (p.shared && p.shared.color) {
            red = p.shared.color[0];
            green = p.shared.color[1];
            blue = p.shared.color[2];
        }

        var polygonVertexIndices = [],
            numvertices = p.vertices.length,
            vertex;
        for (var i = 0; i < numvertices; i++) {
            vertex = p.vertices[i];
            if (!(vertex.getTag() in vertexTagToCoordIndexMap)) {
                vertexCoords.push(vertex.pos._x.toString() + " " +
                    vertex.pos._y.toString() + " " +
                    vertex.pos._z.toString()
                );
                vertexTagToCoordIndexMap[vertex.getTag()] = vertexCoords.length - 1;
            }
            polygonVertexIndices.push(vertexTagToCoordIndexMap[vertex.getTag()]);
        }

        var polygonString = polygonVertexIndices.join(" ");

        var colorString = red.toString() + " " + green.toString() + " " + blue.toString();
        if (!(colorString in materialPolygonLists)) {
            materialPolygonLists[colorString] = [];
        }
        // add this polygonString to the list of colorString-colored polygons
        materialPolygonLists[colorString].push(polygonString);
    });


    // create output document
    var docType = document.implementation.createDocumentType("X3D",
        'ISO//Web3D//DTD X3D 3.1//EN" "http://www.web3d.org/specifications/x3d-3.1.dtd', null);
    var exportDoc = document.implementation.createDocument(null, "X3D", docType);
    exportDoc.insertBefore(
        exportDoc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"'),
        exportDoc.doctype);

    var exportRoot = exportDoc.getElementsByTagName("X3D")[0];
    exportRoot.setAttribute("profile", "Interchange");
    exportRoot.setAttribute("version", "3.1");
    exportRoot.setAttribute("xsd:noNamespaceSchemaLocation", "http://www.web3d.org/specifications/x3d-3.1.xsd");
    exportRoot.setAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema-instance");

    var exportScene = exportDoc.createElement("Scene");
    exportRoot.appendChild(exportScene);

    /*
        For each color, create a shape made of an appropriately colored
        material which contains all polygons that are this color.

        The first shape will contain the definition of all vertices,
        (<Coordinate DEF="coords_mesh"/>), which will be referenced by
        subsequent shapes.
      */
    var coordsMeshDefined = false;
    for (var colorString in materialPolygonLists) {
        var polygonList = materialPolygonLists[colorString];
        var shape = exportDoc.createElement("Shape");
        exportScene.appendChild(shape);

        var appearance = exportDoc.createElement("Appearance");
        shape.appendChild(appearance);

        var material = exportDoc.createElement("Material");
        appearance.appendChild(material);
        material.setAttribute("diffuseColor", colorString);
        material.setAttribute("ambientIntensity", "1.0");

        var ifs = exportDoc.createElement("IndexedFaceSet");
        shape.appendChild(ifs);
        ifs.setAttribute("solid", "true");
        ifs.setAttribute("coordIndex", polygonList.join(" -1 ") + " -1");

        var coordinate = exportDoc.createElement("Coordinate");
        ifs.appendChild(coordinate);
        if (coordsMeshDefined) {
            coordinate.setAttribute("USE", "coords_mesh");
        } else {
            coordinate.setAttribute("DEF", "coords_mesh");
            coordinate.setAttribute("point", vertexCoords.join(" "));
            coordsMeshDefined = true;
        }
    }

    var x3dstring = (new XMLSerializer()).serializeToString(exportDoc);
    return new Blob([x3dstring], {
        type: "model/x3d+xml"
    });
};

////////////////////////////////////////////
// STL Binary Export
////////////////////////////////////////////

// see http://en.wikipedia.org/wiki/STL_%28file_format%29#Binary_STL
CSG.prototype.toStlBinary = function() {
    // first check if the host is little-endian:
    var buffer = new ArrayBuffer(4);
    var int32buffer = new Int32Array(buffer, 0, 1);
    var int8buffer = new Int8Array(buffer, 0, 4);
    int32buffer[0] = 0x11223344;
    if (int8buffer[0] != 0x44) {
        throw new Error("Binary STL output is currently only supported on little-endian (Intel) processors");
    }

    var numtriangles = 0;
    this.polygons.map(function(p) {
        var numvertices = p.vertices.length;
        var thisnumtriangles = (numvertices >= 3) ? numvertices - 2 : 0;
        numtriangles += thisnumtriangles;
    });
    var headerarray = new Uint8Array(80);
    for (var i = 0; i < 80; i++) {
        headerarray[i] = 65;
    }
    var ar1 = new Uint32Array(1);
    ar1[0] = numtriangles;
    // write the triangles to allTrianglesBuffer:
    var allTrianglesBuffer = new ArrayBuffer(50 * numtriangles);
    var allTrianglesBufferAsInt8 = new Int8Array(allTrianglesBuffer);
    // a tricky problem is that a Float32Array must be aligned at 4-byte boundaries (at least in certain browsers)
    // while each triangle takes 50 bytes. Therefore we write each triangle to a temporary buffer, and copy that
    // into allTrianglesBuffer:
    var triangleBuffer = new ArrayBuffer(50);
    var triangleBufferAsInt8 = new Int8Array(triangleBuffer);
    // each triangle consists of 12 floats:
    var triangleFloat32array = new Float32Array(triangleBuffer, 0, 12);
    // and one uint16:
    var triangleUint16array = new Uint16Array(triangleBuffer, 48, 1);
    var byteoffset = 0;
    this.polygons.map(function(p) {
        var numvertices = p.vertices.length;
        for (var i = 0; i < numvertices - 2; i++) {
            var normal = p.plane.normal;
            triangleFloat32array[0] = normal._x;
            triangleFloat32array[1] = normal._y;
            triangleFloat32array[2] = normal._z;
            var arindex = 3;
            for (var v = 0; v < 3; v++) {
                var vv = v + ((v > 0) ? i : 0);
                var vertexpos = p.vertices[vv].pos;
                triangleFloat32array[arindex++] = vertexpos._x;
                triangleFloat32array[arindex++] = vertexpos._y;
                triangleFloat32array[arindex++] = vertexpos._z;
            }
            triangleUint16array[0] = 0;
            // copy the triangle into allTrianglesBuffer:
            allTrianglesBufferAsInt8.set(triangleBufferAsInt8, byteoffset);
            byteoffset += 50;
        }
    });
    return new Blob([headerarray.buffer, ar1.buffer, allTrianglesBuffer], {
        type: "application/sla"
    });
};

////////////////////////////////////////////
// STL String Export
////////////////////////////////////////////

CSG.prototype.toStlString = function() {
    var result = "solid csg.js\n";
    this.polygons.map(function(p) {
        result += p.toStlString();
    });
    result += "endsolid csg.js\n";
    return new Blob([result], {
        type: "application/sla"
    });
};

CSG.Vector3D.prototype.toStlString = function() {
    return this._x + " " + this._y + " " + this._z;
};

CSG.Vertex.prototype.toStlString = function() {
    return "vertex " + this.pos.toStlString() + "\n";
};

CSG.Polygon.prototype.toStlString = function() {
    var result = "";
    if (this.vertices.length >= 3) // should be!
    {
        // STL requires triangular polygons. If our polygon has more vertices, create
        // multiple triangles:
        var firstVertexStl = this.vertices[0].toStlString();
        for (var i = 0; i < this.vertices.length - 2; i++) {
            result += "facet normal " + this.plane.normal.toStlString() + "\nouter loop\n";
            result += firstVertexStl;
            result += this.vertices[i + 1].toStlString();
            result += this.vertices[i + 2].toStlString();
            result += "endloop\nendfacet\n";
        }
    }
    return result;
};

////////////////////////////////////////////
// DXF Export
////////////////////////////////////////////

CAG.PathsToDxf = function(paths) {
    var str = "999\nDXF generated by OpenJsCad\n";
    str += "  0\nSECTION\n  2\nHEADER\n";
    str += "  0\nENDSEC\n";
    str += "  0\nSECTION\n  2\nTABLES\n";
    str += "  0\nTABLE\n  2\nLTYPE\n  70\n1\n";
    str += "  0\nLTYPE\n  2\nCONTINUOUS\n  3\nSolid Line\n  72\n65\n  73\n0\n  40\n0.0\n";
    str += "  0\nENDTAB\n";
    str += "  0\nTABLE\n  2\nLAYER\n  70\n1\n";
    str += "  0\nLAYER\n  2\nOpenJsCad\n  62\n7\n  6\ncontinuous\n";
    str += "  0\nENDTAB\n";
    str += "  0\nTABLE\n  2\nSTYLE\n  70\n0\n  0\nENDTAB\n";
    str += "  0\nTABLE\n  2\nVIEW\n  70\n0\n  0\nENDTAB\n";
    str += "  0\nENDSEC\n";
    str += "  0\nSECTION\n  2\nBLOCKS\n";
    str += "  0\nENDSEC\n";
    str += "  0\nSECTION\n  2\nENTITIES\n";
    paths.map(function(path) {
        var numpoints_closed = path.points.length + (path.closed ? 1 : 0);
        str += "  0\nLWPOLYLINE\n  8\nOpenJsCad\n  90\n" + numpoints_closed + "\n  70\n" + (path.closed ? 1 : 0) + "\n";
        for (var pointindex = 0; pointindex < numpoints_closed; pointindex++) {
            var pointindexwrapped = pointindex;
            if (pointindexwrapped >= path.points.length) pointindexwrapped -= path.points.length;
            var point = path.points[pointindexwrapped];
            str += " 10\n" + point.x + "\n 20\n" + point.y + "\n 30\n0.0\n";
        }
    });
    str += "  0\nENDSEC\n  0\nEOF\n";
    return new Blob([str], {
        type: "application/dxf"
    });
};

CAG.prototype.toDxf = function() {
    var paths = this.getOutlinePaths();
    return CAG.PathsToDxf(paths);
};

////////////////////////////////////////////
// AMF Export
////////////////////////////////////////////

CSG.prototype.toAMFString = function(m) {
    var result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<amf"+(m&&m.unit?" unit=\"+m.unit\"":"")+">\n";
    for(var k in m) {
        result += "<metadata type=\""+k+"\">"+m[k]+"</metadata>\n";
    }
    result += "<object id=\"0\">\n<mesh>\n<vertices>\n";

    this.polygons.map(function(p) {                  // first we dump all vertices of all polygons
        for(var i=0; i<p.vertices.length; i++) {
            result += p.vertices[i].toAMFString();
        }
    });
    result += "</vertices>\n";

    var n = 0;
    this.polygons.map(function(p) {                  // then we dump all polygons
        result += "<volume>\n";
        if(p.vertices.length<3)
            return;
        var r = 1, g = 0.4, b = 1, a = 1, colorSet = false;
        if(p.shared && p.shared.color) {
            r = p.shared.color[0];
            g = p.shared.color[1];
            b = p.shared.color[2];
            a = p.shared.color[3];
            colorSet = true;
        } else if(p.color) {
            r = p.color[0];
            g = p.color[1];
            b = p.color[2];
            if(p.color.length()>3) a = p.color[3];
                colorSet = true;
        }
        result += "<color><r>"+r+"</r><g>"+g+"</g><b>"+b+"</b>"+(a!==undefined?"<a>"+a+"</a>":"")+"</color>";

        for(var i=0; i<p.vertices.length-2; i++) {      // making sure they are all triangles (triangular polygons)
            result += "<triangle>";
            result += "<v1>" + (n) + "</v1>";
            result += "<v2>" + (n+i+1) + "</v2>";
            result += "<v3>" + (n+i+2) + "</v3>";
            result += "</triangle>\n";
        }
        n += p.vertices.length;
        result += "</volume>\n";
    });
    result += "</mesh>\n</object>\n";
    result += "</amf>\n";
    return new Blob([result], {
        type: "application/amf+xml"
    });
};

CSG.Vector3D.prototype.toAMFString = function() {
    return "<x>" + this._x + "</x><y>" + this._y + "</y><z>" + this._z + "</z>";
};

CSG.Vertex.prototype.toAMFString = function() {
   return "<vertex><coordinates>" + this.pos.toAMFString() + "</coordinates></vertex>\n";
};

// re-export CSG and CAG with the extended prototypes
    module.CSG = CSG;
    module.CAG = CAG;
})(this);

