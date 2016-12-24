#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));

var json = require('../package.json');
var version = json.version; // TODO/ add version date ?

function env () {
  var env = 'OpenJSCAD ' + version;
  if (typeof document !== 'undefined') {
    var w = document.defaultView;
    env = env + ' [' + w.navigator.userAgent + ']';
  } else {
    if (typeof require === 'function') {
      var os = require('os');
      env = env + ' [' + os.type() + ':' + os.release() + ',' + os.platform() + ':' + os.arch() + ']';
    }
  }
  console.log(env);
}

/*

## IMPORTANT NOTE --- IMPORTANT 
The master for this file is located at:
https://github.com/joostn/openjscad/tree/gh-pages
That is the gh-pages branch of the joostn/openjscad project
If contributing from openjscad.org, please do NOT edit this local file but make pull requests against
above joostn/gh-pages branch.
## IMPORTANT NOTE --- IMPORTANT NOTE


## License

Copyright (c) 2014 bebbi (elghatta@gmail.com)
Copyright (c) 2013 Eduard Bespalov (edwbes@gmail.com)
Copyright (c) 2012 Joost Nieuwenhuijse (joost@newhouse.nl)
Copyright (c) 2011 Evan Wallace (http://evanw.github.com/csg.js/)
Copyright (c) 2012 Alexandre Girard (https://github.com/alx)

All code released under MIT license

## Overview

For an overview of the CSG process see the original csg.js code:
http://evanw.github.com/csg.js/

CSG operations through BSP trees suffer from one problem: heavy fragmentation
of polygons. If two CSG solids of n polygons are unified, the resulting solid may have
in the order of n*n polygons, because each polygon is split by the planes of all other
polygons. After a few operations the number of polygons explodes.

This version of CSG.js solves the problem in 3 ways:

1. Every polygon split is recorded in a tree (CSG.PolygonTreeNode). This is a separate
tree, not to be confused with the CSG tree. If a polygon is split into two parts but in
the end both fragments have not been discarded by the CSG operation, we can retrieve
the original unsplit polygon from the tree, instead of the two fragments.

This does not completely solve the issue though: if a polygon is split multiple times
the number of fragments depends on the order of subsequent splits, and we might still
end up with unncessary splits:
Suppose a polygon is first split into A and B, and then into A1, B1, A2, B2. Suppose B2 is
discarded. We will end up with 2 polygons: A and B1. Depending on the actual split boundaries
we could still have joined A and B1 into one polygon. Therefore a second approach is used as well:

2. After CSG operations all coplanar polygon fragments are joined by a retesselating
operation. See CSG.reTesselated(). Retesselation is done through a
linear sweep over the polygon surface. The sweep line passes over the y coordinates
of all vertices in the polygon. Polygons are split at each sweep line, and the fragments
are joined horizontally and vertically into larger polygons (making sure that we
will end up with convex polygons).
This still doesn't solve the problem completely: due to floating point imprecisions
we may end up with small gaps between polygons, and polygons may not be exactly coplanar
anymore, and as a result the retesselation algorithm may fail to join those polygons.
Therefore:

3. A canonicalization algorithm is implemented: it looks for vertices that have
approximately the same coordinates (with a certain tolerance, say 1e-5) and replaces
them with the same vertex. If polygons share a vertex they will actually point to the
same CSG.Vertex instance. The same is done for polygon planes. See CSG.canonicalized().


Performance improvements to the original CSG.js:

Replaced the flip() and invert() methods by flipped() and inverted() which don't
modify the source object. This allows to get rid of all clone() calls, so that
multiple polygons can refer to the same CSG.Plane instance etc.

The original union() used an extra invert(), clipTo(), invert() sequence just to remove the
coplanar front faces from b; this is now combined in a single b.clipTo(a, true) call.

Detection whether a polygon is in front or in back of a plane: for each polygon
we are caching the coordinates of the bounding sphere. If the bounding sphere is
in front or in back of the plane we don't have to check the individual vertices
anymore.


Other additions to the original CSG.js:

CSG.Vector class has been renamed into CSG.Vector3D

Classes for 3D lines, 2D vectors, 2D lines, and methods to find the intersection of
a line and a plane etc.

Transformations: CSG.transform(), CSG.translate(), CSG.rotate(), CSG.scale()

Expanding or contracting a solid: CSG.expand() and CSG.contract(). Creates nice
smooth corners.

The vertex normal has been removed since it complicates retesselation. It's not needed
for solid CAD anyway.

*/

    var _CSGDEBUG = false;

    function fnNumberSort(a, b) {
        return a - b;
    }

    // # class CSG
    // Holds a binary space partition tree representing a 3D solid. Two solids can
    // be combined using the `union()`, `subtract()`, and `intersect()` methods.
    var CSG = function() {
        this.polygons = [];
        this.properties = new CSG.Properties();
        this.isCanonicalized = true;
        this.isRetesselated = true;
    };

    CSG.defaultResolution2D = 32;
    CSG.defaultResolution3D = 12;

    // Construct a CSG solid from a list of `CSG.Polygon` instances.
    CSG.fromPolygons = function(polygons) {
        var csg = new CSG();
        csg.polygons = polygons;
        csg.isCanonicalized = false;
        csg.isRetesselated = false;
        return csg;
    };

    // Construct a CSG solid from generated slices.
    // Look at CSG.Polygon.prototype.solidFromSlices for details
    CSG.fromSlices = function(options) {
        return (new CSG.Polygon.createFromPoints([
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ])).solidFromSlices(options);
    };

    // create from an untyped object with identical property names:
    CSG.fromObject = function(obj) {
        var polygons = obj.polygons.map(function(p) {
            return CSG.Polygon.fromObject(p);
        });
        var csg = CSG.fromPolygons(polygons);
        csg.isCanonicalized = obj.isCanonicalized;
        csg.isRetesselated  = obj.isRetesselated;
        return csg;
    };

    // Reconstruct a CSG from the output of toCompactBinary()
    CSG.fromCompactBinary = function(bin) {
        if (bin['class'] != "CSG") { throw new Error("Not a CSG"); }
        var planes = [],
            planeData = bin.planeData,
            numplanes = planeData.length / 4,
            arrayindex = 0,
            x, y, z, w, normal, plane;
        for (var planeindex = 0; planeindex < numplanes; planeindex++) {
            x = planeData[arrayindex++];
            y = planeData[arrayindex++];
            z = planeData[arrayindex++];
            w = planeData[arrayindex++];
            normal = CSG.Vector3D.Create(x, y, z);
            plane = new CSG.Plane(normal, w);
            planes.push(plane);
        }

        var vertices = [],
            vertexData = bin.vertexData,
            numvertices = vertexData.length / 3,
            pos, vertex;
        arrayindex = 0;
        for (var vertexindex = 0; vertexindex < numvertices; vertexindex++) {
            x = vertexData[arrayindex++];
            y = vertexData[arrayindex++];
            z = vertexData[arrayindex++];
            pos = CSG.Vector3D.Create(x, y, z);
            vertex = new CSG.Vertex(pos);
            vertices.push(vertex);
        }

        var shareds = bin.shared.map(function(shared) {
            return CSG.Polygon.Shared.fromObject(shared);
        });

        var polygons = [],
            numpolygons = bin.numPolygons,
            numVerticesPerPolygon = bin.numVerticesPerPolygon,
            polygonVertices = bin.polygonVertices,
            polygonPlaneIndexes = bin.polygonPlaneIndexes,
            polygonSharedIndexes = bin.polygonSharedIndexes,
            numpolygonvertices, polygonvertices, shared, polygon; //already defined plane,
        arrayindex = 0;
        for (var polygonindex = 0; polygonindex < numpolygons; polygonindex++) {
            numpolygonvertices = numVerticesPerPolygon[polygonindex];
            polygonvertices = [];
            for (var i = 0; i < numpolygonvertices; i++) {
                polygonvertices.push(vertices[polygonVertices[arrayindex++]]);
            }
            plane = planes[polygonPlaneIndexes[polygonindex]];
            shared = shareds[polygonSharedIndexes[polygonindex]];
            polygon = new CSG.Polygon(polygonvertices, shared, plane);
            polygons.push(polygon);
        }
        var csg = CSG.fromPolygons(polygons);
        csg.isCanonicalized = true;
        csg.isRetesselated = true;
        return csg;
    };

    CSG.prototype = {
        toPolygons: function() {
            return this.polygons;
        },

        // Return a new CSG solid representing space in either this solid or in the
        // solid `csg`. Neither this solid nor the solid `csg` are modified.
        //
        //     A.union(B)
        //
        //     +-------+            +-------+
        //     |       |            |       |
        //     |   A   |            |       |
        //     |    +--+----+   =   |       +----+
        //     +----+--+    |       +----+       |
        //          |   B   |            |       |
        //          |       |            |       |
        //          +-------+            +-------+
        //
        union: function(csg) {
            var csgs;
            if (csg instanceof Array) {
                csgs = csg.slice(0);
                csgs.push(this);
            } else {
                csgs = [this, csg];
            }

            // combine csg pairs in a way that forms a balanced binary tree pattern
            for (var i = 1; i < csgs.length; i += 2) {
                csgs.push(csgs[i-1].unionSub(csgs[i]));
            }

            return csgs[i - 1].reTesselated().canonicalized();
        },

        unionSub: function(csg, retesselate, canonicalize) {
            if (!this.mayOverlap(csg)) {
                return this.unionForNonIntersecting(csg);
            } else {
                var a = new CSG.Tree(this.polygons);
                var b = new CSG.Tree(csg.polygons);
                a.clipTo(b, false);

                // b.clipTo(a, true); // ERROR: this doesn't work
                b.clipTo(a);
                b.invert();
                b.clipTo(a);
                b.invert();

                var newpolygons = a.allPolygons().concat(b.allPolygons());
                var result = CSG.fromPolygons(newpolygons);
                result.properties = this.properties._merge(csg.properties);
                if (retesselate) { result = result.reTesselated(); }
                if (canonicalize) { result = result.canonicalized(); }
                return result;
            }
        },

        // Like union, but when we know that the two solids are not intersecting
        // Do not use if you are not completely sure that the solids do not intersect!
        unionForNonIntersecting: function(csg) {
            var newpolygons = this.polygons.concat(csg.polygons);
            var result = CSG.fromPolygons(newpolygons);
            result.properties = this.properties._merge(csg.properties);
            result.isCanonicalized = this.isCanonicalized && csg.isCanonicalized;
            result.isRetesselated = this.isRetesselated && csg.isRetesselated;
            return result;
        },

        // Return a new CSG solid representing space in this solid but not in the
        // solid `csg`. Neither this solid nor the solid `csg` are modified.
        //
        //     A.subtract(B)
        //
        //     +-------+            +-------+
        //     |       |            |       |
        //     |   A   |            |       |
        //     |    +--+----+   =   |    +--+
        //     +----+--+    |       +----+
        //          |   B   |
        //          |       |
        //          +-------+
        //
        subtract: function(csg) {
            var csgs;
            if (csg instanceof Array) {
                csgs = csg;
            } else {
                csgs = [csg];
            }
            var result = this;
            for (var i = 0; i < csgs.length; i++) {
                var islast = (i == (csgs.length - 1));
                result = result.subtractSub(csgs[i], islast, islast);
            }
            return result;
        },

        subtractSub: function(csg, retesselate, canonicalize) {
            var a = new CSG.Tree(this.polygons);
            var b = new CSG.Tree(csg.polygons);
            a.invert();
            a.clipTo(b);
            b.clipTo(a, true);
            a.addPolygons(b.allPolygons());
            a.invert();
            var result = CSG.fromPolygons(a.allPolygons());
            result.properties = this.properties._merge(csg.properties);
            if (retesselate) { result = result.reTesselated(); }
            if (canonicalize) { result = result.canonicalized(); }
            return result;
        },

        // Return a new CSG solid representing space both this solid and in the
        // solid `csg`. Neither this solid nor the solid `csg` are modified.
        //
        //     A.intersect(B)
        //
        //     +-------+
        //     |       |
        //     |   A   |
        //     |    +--+----+   =   +--+
        //     +----+--+    |       +--+
        //          |   B   |
        //          |       |
        //          +-------+
        //
        intersect: function(csg) {
            var csgs;
            if (csg instanceof Array) {
                csgs = csg;
            } else {
                csgs = [csg];
            }
            var result = this;
            for (var i = 0; i < csgs.length; i++) {
                var islast = (i == (csgs.length - 1));
                result = result.intersectSub(csgs[i], islast, islast);
            }
            return result;
        },

        intersectSub: function(csg, retesselate, canonicalize) {
            var a = new CSG.Tree(this.polygons);
            var b = new CSG.Tree(csg.polygons);
            a.invert();
            b.clipTo(a);
            b.invert();
            a.clipTo(b);
            b.clipTo(a);
            a.addPolygons(b.allPolygons());
            a.invert();
            var result = CSG.fromPolygons(a.allPolygons());
            result.properties = this.properties._merge(csg.properties);
            if (retesselate) { result = result.reTesselated(); }
            if (canonicalize) { result = result.canonicalized(); }
            return result;
        },

        // Return a new CSG solid with solid and empty space switched. This solid is
        // not modified.
        invert: function() {
            var flippedpolygons = this.polygons.map(function(p) {
                return p.flipped();
            });
            return CSG.fromPolygons(flippedpolygons);
            // TODO: flip properties?
        },

        // Affine transformation of CSG object. Returns a new CSG object
        transform1: function(matrix4x4) {
            var newpolygons = this.polygons.map(function(p) {
                return p.transform(matrix4x4);
            });
            var result = CSG.fromPolygons(newpolygons);
            result.properties = this.properties._transform(matrix4x4);
            result.isRetesselated = this.isRetesselated;
            return result;
        },

        transform: function(matrix4x4) {
            var ismirror = matrix4x4.isMirroring();
            var transformedvertices = {};
            var transformedplanes = {};
            var newpolygons = this.polygons.map(function(p) {
                var newplane;
                var plane = p.plane;
                var planetag = plane.getTag();
                if (planetag in transformedplanes) {
                    newplane = transformedplanes[planetag];
                } else {
                    newplane = plane.transform(matrix4x4);
                    transformedplanes[planetag] = newplane;
                }
                var newvertices = p.vertices.map(function(v) {
                    var newvertex;
                    var vertextag = v.getTag();
                    if (vertextag in transformedvertices) {
                        newvertex = transformedvertices[vertextag];
                    } else {
                        newvertex = v.transform(matrix4x4);
                        transformedvertices[vertextag] = newvertex;
                    }
                    return newvertex;
                });
                if (ismirror) { newvertices.reverse(); }
                return new CSG.Polygon(newvertices, p.shared, newplane);
            });
            var result = CSG.fromPolygons(newpolygons);
            result.properties = this.properties._transform(matrix4x4);
            result.isRetesselated = this.isRetesselated;
            result.isCanonicalized = this.isCanonicalized;
            return result;
        },

        toString: function() {
            var result = "CSG solid:\n";
            this.polygons.map(function(p) {
                result += p.toString();
            });
            return result;
        },

        // Expand the solid
        // resolution: number of points per 360 degree for the rounded corners
        expand: function(radius, resolution) {
            var result = this.expandedShell(radius, resolution, true);
            result = result.reTesselated();
            result.properties = this.properties; // keep original properties
            return result;
        },

        // Contract the solid
        // resolution: number of points per 360 degree for the rounded corners
        contract: function(radius, resolution) {
            var expandedshell = this.expandedShell(radius, resolution, false);
            var result = this.subtract(expandedshell);
            result = result.reTesselated();
            result.properties = this.properties; // keep original properties
            return result;
        },

        // cut the solid at a plane, and stretch the cross-section found along plane normal
        stretchAtPlane: function(normal, point, length) {
            var plane = CSG.Plane.fromNormalAndPoint(normal, point);
            var onb = new CSG.OrthoNormalBasis(plane);
            var crosssect = this.sectionCut(onb);
            var midpiece = crosssect.extrudeInOrthonormalBasis(onb, length);
            var piece1 = this.cutByPlane(plane);
            var piece2 = this.cutByPlane(plane.flipped());
            var result = piece1.union([midpiece, piece2.translate(plane.normal.times(length))]);
            return result;
        },


        // Create the expanded shell of the solid:
        // All faces are extruded to get a thickness of 2*radius
        // Cylinders are constructed around every side
        // Spheres are placed on every vertex
        // unionWithThis: if true, the resulting solid will be united with 'this' solid;
        //   the result is a true expansion of the solid
        //   If false, returns only the shell
        expandedShell: function(radius, resolution, unionWithThis) {
            var csg = this.reTesselated();
            var result;
            if (unionWithThis) {
                result = csg;
            } else {
                result = new CSG();
            }

            // first extrude all polygons:
            csg.polygons.map(function(polygon) {
                var extrudevector = polygon.plane.normal.unit().times(2 * radius);
                var translatedpolygon = polygon.translate(extrudevector.times(-0.5));
                var extrudedface = translatedpolygon.extrude(extrudevector);
                result = result.unionSub(extrudedface, false, false);
            });

            // Make a list of all unique vertex pairs (i.e. all sides of the solid)
            // For each vertex pair we collect the following:
            //   v1: first coordinate
            //   v2: second coordinate
            //   planenormals: array of normal vectors of all planes touching this side
            var vertexpairs = {}; // map of 'vertex pair tag' to {v1, v2, planenormals}
            csg.polygons.map(function(polygon) {
                var numvertices = polygon.vertices.length;
                var prevvertex = polygon.vertices[numvertices - 1];
                var prevvertextag = prevvertex.getTag();
                for (var i = 0; i < numvertices; i++) {
                    var vertex = polygon.vertices[i];
                    var vertextag = vertex.getTag();
                    var vertextagpair;
                    if (vertextag < prevvertextag) {
                        vertextagpair = vertextag + "-" + prevvertextag;
                    } else {
                        vertextagpair = prevvertextag + "-" + vertextag;
                    }
                    var obj;
                    if (vertextagpair in vertexpairs) {
                        obj = vertexpairs[vertextagpair];
                    } else {
                        obj = {
                            v1: prevvertex,
                            v2: vertex,
                            planenormals: []
                        };
                        vertexpairs[vertextagpair] = obj;
                    }
                    obj.planenormals.push(polygon.plane.normal);

                    prevvertextag = vertextag;
                    prevvertex = vertex;
                }
            });

            // now construct a cylinder on every side
            // The cylinder is always an approximation of a true cylinder: it will have <resolution> polygons
            // around the sides. We will make sure though that the cylinder will have an edge at every
            // face that touches this side. This ensures that we will get a smooth fill even
            // if two edges are at, say, 10 degrees and the resolution is low.
            // Note: the result is not retesselated yet but it really should be!
            for (var vertextagpair in vertexpairs) {
                var vertexpair = vertexpairs[vertextagpair],
                    startpoint = vertexpair.v1.pos,
                    endpoint = vertexpair.v2.pos,
                    // our x,y and z vectors:
                    zbase = endpoint.minus(startpoint).unit(),
                    xbase = vertexpair.planenormals[0].unit(),
                    ybase = xbase.cross(zbase),

                    // make a list of angles that the cylinder should traverse:
                    angles = [];

                // first of all equally spaced around the cylinder:
                for (var i = 0; i < resolution; i++) {
                    angles.push(i * Math.PI * 2 / resolution);
                }

                // and also at every normal of all touching planes:
                for (var i = 0, iMax = vertexpair.planenormals.length; i < iMax; i++) {
                    var planenormal = vertexpair.planenormals[i],
                        si = ybase.dot(planenormal),
                        co = xbase.dot(planenormal),
                        angle = Math.atan2(si, co);

                    if (angle < 0) { angle += Math.PI * 2; }
                    angles.push(angle);
                    angle = Math.atan2(-si, -co);
                    if (angle < 0) { angle += Math.PI * 2; }
                    angles.push(angle);
                }

                // this will result in some duplicate angles but we will get rid of those later.
                // Sort:
                angles = angles.sort(fnNumberSort);

                // Now construct the cylinder by traversing all angles:
                var numangles = angles.length,
                    prevp1, prevp2,
                    startfacevertices = [],
                    endfacevertices = [],
                    polygons = [];
                for (var i = -1; i < numangles; i++) {
                    var angle = angles[(i < 0) ? (i + numangles) : i],
                        si = Math.sin(angle),
                        co = Math.cos(angle),
                        p = xbase.times(co * radius).plus(ybase.times(si * radius)),
                        p1 = startpoint.plus(p),
                        p2 = endpoint.plus(p),
                        skip = false;
                    if (i >= 0) {
                        if (p1.distanceTo(prevp1) < 1e-5) {
                            skip = true;
                        }
                    }
                    if (!skip) {
                        if (i >= 0) {
                            startfacevertices.push(new CSG.Vertex(p1));
                            endfacevertices.push(new CSG.Vertex(p2));
                            var polygonvertices = [
                                new CSG.Vertex(prevp2),
                                new CSG.Vertex(p2),
                                new CSG.Vertex(p1),
                                new CSG.Vertex(prevp1)
                            ];
                            var polygon = new CSG.Polygon(polygonvertices);
                            polygons.push(polygon);
                        }
                        prevp1 = p1;
                        prevp2 = p2;
                    }
                }
                endfacevertices.reverse();
                polygons.push(new CSG.Polygon(startfacevertices));
                polygons.push(new CSG.Polygon(endfacevertices));
                var cylinder = CSG.fromPolygons(polygons);
                result = result.unionSub(cylinder, false, false);
            }

            // make a list of all unique vertices
            // For each vertex we also collect the list of normals of the planes touching the vertices
            var vertexmap = {};
            csg.polygons.map(function(polygon) {
                polygon.vertices.map(function(vertex) {
                    var vertextag = vertex.getTag();
                    var obj;
                    if (vertextag in vertexmap) {
                        obj = vertexmap[vertextag];
                    } else {
                        obj = {
                            pos: vertex.pos,
                            normals: []
                        };
                        vertexmap[vertextag] = obj;
                    }
                    obj.normals.push(polygon.plane.normal);
                });
            });

            // and build spheres at each vertex
            // We will try to set the x and z axis to the normals of 2 planes
            // This will ensure that our sphere tesselation somewhat matches 2 planes
            for (var vertextag in vertexmap) {
                var vertexobj = vertexmap[vertextag];
                // use the first normal to be the x axis of our sphere:
                var xaxis = vertexobj.normals[0].unit();
                // and find a suitable z axis. We will use the normal which is most perpendicular to the x axis:
                var bestzaxis = null;
                var bestzaxisorthogonality = 0;
                for (var i = 1; i < vertexobj.normals.length; i++) {
                    var normal = vertexobj.normals[i].unit();
                    var cross = xaxis.cross(normal);
                    var crosslength = cross.length();
                    if (crosslength > 0.05) {
                        if (crosslength > bestzaxisorthogonality) {
                            bestzaxisorthogonality = crosslength;
                            bestzaxis = normal;
                        }
                    }
                }
                if (!bestzaxis) {
                    bestzaxis = xaxis.randomNonParallelVector();
                }
                var yaxis = xaxis.cross(bestzaxis).unit();
                var zaxis = yaxis.cross(xaxis);
                var sphere = CSG.sphere({
                    center: vertexobj.pos,
                    radius: radius,
                    resolution: resolution,
                    axes: [xaxis, yaxis, zaxis]
                });
                result = result.unionSub(sphere, false, false);
            }

            return result;
        },

        canonicalized: function() {
            if (this.isCanonicalized) {
                return this;
            } else {
                var factory = new CSG.fuzzyCSGFactory();
                var result = factory.getCSG(this);
                result.isCanonicalized = true;
                result.isRetesselated = this.isRetesselated;
                result.properties = this.properties; // keep original properties
                return result;
            }
        },

        reTesselated: function() {
            if (this.isRetesselated) {
                return this;
            } else {
                var csg = this;
                var polygonsPerPlane = {};
                var isCanonicalized = csg.isCanonicalized;
                var fuzzyfactory = new CSG.fuzzyCSGFactory();
                csg.polygons.map(function(polygon) {
                    var plane = polygon.plane;
                    var shared = polygon.shared;
                    if (!isCanonicalized) {
                        // in order to identify to polygons having the same plane, we need to canonicalize the planes
                        // We don't have to do a full canonizalization (including vertices), to save time only do the planes and the shared data:
                        plane = fuzzyfactory.getPlane(plane);
                        shared = fuzzyfactory.getPolygonShared(shared);
                    }
                    var tag = plane.getTag() + "/" + shared.getTag();
                    if (!(tag in polygonsPerPlane)) {
                        polygonsPerPlane[tag] = [polygon];
                    } else {
                        polygonsPerPlane[tag].push(polygon);
                    }
                });
                var destpolygons = [];
                for (var planetag in polygonsPerPlane) {
                    var sourcepolygons = polygonsPerPlane[planetag];
                    if (sourcepolygons.length < 2) {
                        destpolygons = destpolygons.concat(sourcepolygons);
                    } else {
                        var retesselayedpolygons = [];
                        CSG.reTesselateCoplanarPolygons(sourcepolygons, retesselayedpolygons);
                        destpolygons = destpolygons.concat(retesselayedpolygons);
                    }
                }
                var result = CSG.fromPolygons(destpolygons);
                result.isRetesselated = true;
                // result = result.canonicalized();
                result.properties = this.properties; // keep original properties
                return result;
            }
        },

        // returns an array of two CSG.Vector3Ds (minimum coordinates and maximum coordinates)
        getBounds: function() {
            if (!this.cachedBoundingBox) {
                var minpoint = new CSG.Vector3D(0, 0, 0);
                var maxpoint = new CSG.Vector3D(0, 0, 0);
                var polygons = this.polygons;
                var numpolygons = polygons.length;
                for (var i = 0; i < numpolygons; i++) {
                    var polygon = polygons[i];
                    var bounds = polygon.boundingBox();
                    if (i === 0) {
                        minpoint = bounds[0];
                        maxpoint = bounds[1];
                    } else {
                        minpoint = minpoint.min(bounds[0]);
                        maxpoint = maxpoint.max(bounds[1]);
                    }
                }
                this.cachedBoundingBox = [minpoint, maxpoint];
            }
            return this.cachedBoundingBox;
        },

        // returns true if there is a possibility that the two solids overlap
        // returns false if we can be sure that they do not overlap
        mayOverlap: function(csg) {
            if ((this.polygons.length === 0) || (csg.polygons.length === 0)) {
                return false;
            } else {
                var mybounds = this.getBounds();
                var otherbounds = csg.getBounds();
                if (mybounds[1].x < otherbounds[0].x) { return false; }
                if (mybounds[0].x > otherbounds[1].x) { return false; }
                if (mybounds[1].y < otherbounds[0].y) { return false; }
                if (mybounds[0].y > otherbounds[1].y) { return false; }
                if (mybounds[1].z < otherbounds[0].z) { return false; }
                if (mybounds[0].z > otherbounds[1].z) { return false; }
                return true;
            }
        },

        // Cut the solid by a plane. Returns the solid on the back side of the plane
        cutByPlane: function(plane) {
            if (this.polygons.length === 0) {
                return new CSG();
            }
            // Ideally we would like to do an intersection with a polygon of inifinite size
            // but this is not supported by our implementation. As a workaround, we will create
            // a cube, with one face on the plane, and a size larger enough so that the entire
            // solid fits in the cube.
            // find the max distance of any vertex to the center of the plane:
            var planecenter = plane.normal.times(plane.w);
            var maxdistance = 0;
            this.polygons.map(function(polygon) {
                polygon.vertices.map(function(vertex) {
                    var distance = vertex.pos.distanceToSquared(planecenter);
                    if (distance > maxdistance) { maxdistance = distance; }
                });
            });
            maxdistance = Math.sqrt(maxdistance);
            maxdistance *= 1.01; // make sure it's really larger
            // Now build a polygon on the plane, at any point farther than maxdistance from the plane center:
            var vertices = [];
            var orthobasis = new CSG.OrthoNormalBasis(plane);
            vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(maxdistance, -maxdistance))));
            vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(-maxdistance, -maxdistance))));
            vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(-maxdistance, maxdistance))));
            vertices.push(new CSG.Vertex(orthobasis.to3D(new CSG.Vector2D(maxdistance, maxdistance))));
            var polygon = new CSG.Polygon(vertices, null, plane.flipped());

            // and extrude the polygon into a cube, backwards of the plane:
            var cube = polygon.extrude(plane.normal.times(-maxdistance));

            // Now we can do the intersection:
            var result = this.intersect(cube);
            result.properties = this.properties; // keep original properties
            return result;
        },

        // Connect a solid to another solid, such that two CSG.Connectors become connected
        //   myConnector: a CSG.Connector of this solid
        //   otherConnector: a CSG.Connector to which myConnector should be connected
        //   mirror: false: the 'axis' vectors of the connectors should point in the same direction
        //           true: the 'axis' vectors of the connectors should point in opposite direction
        //   normalrotation: degrees of rotation between the 'normal' vectors of the two
        //                   connectors
        connectTo: function(myConnector, otherConnector, mirror, normalrotation) {
            var matrix = myConnector.getTransformationTo(otherConnector, mirror, normalrotation);
            return this.transform(matrix);
        },

        // set the .shared property of all polygons
        // Returns a new CSG solid, the original is unmodified!
        setShared: function(shared) {
            var polygons = this.polygons.map(function(p) {
                return new CSG.Polygon(p.vertices, shared, p.plane);
            });
            var result = CSG.fromPolygons(polygons);
            result.properties = this.properties; // keep original properties
            result.isRetesselated = this.isRetesselated;
            result.isCanonicalized = this.isCanonicalized;
            return result;
        },

        setColor: function(args) {
            var newshared = CSG.Polygon.Shared.fromColor.apply(this, arguments);
            return this.setShared(newshared);
        },

        toCompactBinary: function() {
            var csg = this.canonicalized(),
                numpolygons = csg.polygons.length,
                numpolygonvertices = 0,
                numvertices = 0,
                vertexmap = {},
                vertices = [],
                numplanes = 0,
                planemap = {},
                polygonindex = 0,
                planes = [],
                shareds = [],
                sharedmap = {},
                numshared = 0;
            // for (var i = 0, iMax = csg.polygons.length; i < iMax; i++) {
            //  var p = csg.polygons[i];
            //  for (var j = 0, jMax = p.length; j < jMax; j++) {
            //      ++numpolygonvertices;
            //      var vertextag = p[j].getTag();
            //      if(!(vertextag in vertexmap)) {
            //          vertexmap[vertextag] = numvertices++;
            //          vertices.push(p[j]);
            //      }
            //  }
            csg.polygons.map(function(p) {
                p.vertices.map(function(v) {
                    ++numpolygonvertices;
                    var vertextag = v.getTag();
                    if (!(vertextag in vertexmap)) {
                        vertexmap[vertextag] = numvertices++;
                        vertices.push(v);
                    }
                });

                var planetag = p.plane.getTag();
                if (!(planetag in planemap)) {
                    planemap[planetag] = numplanes++;
                    planes.push(p.plane);
                }
                var sharedtag = p.shared.getTag();
                if (!(sharedtag in sharedmap)) {
                    sharedmap[sharedtag] = numshared++;
                    shareds.push(p.shared);
                }
            });
            var numVerticesPerPolygon = new Uint32Array(numpolygons),
                polygonSharedIndexes = new Uint32Array(numpolygons),
                polygonVertices = new Uint32Array(numpolygonvertices),
                polygonPlaneIndexes = new Uint32Array(numpolygons),
                vertexData = new Float64Array(numvertices * 3),
                planeData = new Float64Array(numplanes * 4),
                polygonVerticesIndex = 0;
            for (var polygonindex = 0; polygonindex < numpolygons; ++polygonindex) {
                var p = csg.polygons[polygonindex];
                numVerticesPerPolygon[polygonindex] = p.vertices.length;
                p.vertices.map(function(v) {
                    var vertextag = v.getTag();
                    var vertexindex = vertexmap[vertextag];
                    polygonVertices[polygonVerticesIndex++] = vertexindex;
                });
                var planetag = p.plane.getTag();
                var planeindex = planemap[planetag];
                polygonPlaneIndexes[polygonindex] = planeindex;
                var sharedtag = p.shared.getTag();
                var sharedindex = sharedmap[sharedtag];
                polygonSharedIndexes[polygonindex] = sharedindex;
            }
            var verticesArrayIndex = 0;
            vertices.map(function(v) {
                var pos = v.pos;
                vertexData[verticesArrayIndex++] = pos._x;
                vertexData[verticesArrayIndex++] = pos._y;
                vertexData[verticesArrayIndex++] = pos._z;
            });
            var planesArrayIndex = 0;
            planes.map(function(p) {
                var normal = p.normal;
                planeData[planesArrayIndex++] = normal._x;
                planeData[planesArrayIndex++] = normal._y;
                planeData[planesArrayIndex++] = normal._z;
                planeData[planesArrayIndex++] = p.w;
            });
            var result = {
                "class": "CSG",
                numPolygons: numpolygons,
                numVerticesPerPolygon: numVerticesPerPolygon,
                polygonPlaneIndexes: polygonPlaneIndexes,
                polygonSharedIndexes: polygonSharedIndexes,
                polygonVertices: polygonVertices,
                vertexData: vertexData,
                planeData: planeData,
                shared: shareds
            };
            return result;
        },

        // For debugging
        // Creates a new solid with a tiny cube at every vertex of the source solid
        toPointCloud: function(cuberadius) {
            var csg = this.reTesselated();

            var result = new CSG();

            // make a list of all unique vertices
            // For each vertex we also collect the list of normals of the planes touching the vertices
            var vertexmap = {};
            csg.polygons.map(function(polygon) {
                polygon.vertices.map(function(vertex) {
                    vertexmap[vertex.getTag()] = vertex.pos;
                });
            });

            for (var vertextag in vertexmap) {
                var pos = vertexmap[vertextag];
                var cube = CSG.cube({
                    center: pos,
                    radius: cuberadius
                });
                result = result.unionSub(cube, false, false);
            }
            result = result.reTesselated();
            return result;
        },

        // Get the transformation that transforms this CSG such that it is lying on the z=0 plane,
        // as flat as possible (i.e. the least z-height).
        // So that it is in an orientation suitable for CNC milling
        getTransformationAndInverseTransformationToFlatLying: function() {
            if (this.polygons.length === 0) {
                var m = new CSG.Matrix4x4(); // unity
                return [m,m];
            } else {
                // get a list of unique planes in the CSG:
                var csg = this.canonicalized();
                var planemap = {};
                csg.polygons.map(function(polygon) {
                    planemap[polygon.plane.getTag()] = polygon.plane;
                });
                // try each plane in the CSG and find the plane that, when we align it flat onto z=0,
                // gives the least height in z-direction.
                // If two planes give the same height, pick the plane that originally had a normal closest
                // to [0,0,-1].
                var xvector = new CSG.Vector3D(1, 0, 0);
                var yvector = new CSG.Vector3D(0, 1, 0);
                var zvector = new CSG.Vector3D(0, 0, 1);
                var z0connectorx = new CSG.Connector([0, 0, 0], [0, 0, -1], xvector);
                var z0connectory = new CSG.Connector([0, 0, 0], [0, 0, -1], yvector);
                var isfirst = true;
                var minheight = 0;
                var maxdotz = 0;
                var besttransformation, bestinversetransformation;
                for (var planetag in planemap) {
                    var plane = planemap[planetag];
                    var pointonplane = plane.normal.times(plane.w);
                    var transformation, inversetransformation;
                    // We need a normal vecrtor for the transformation
                    // determine which is more perpendicular to the plane normal: x or y?
                    // we will align this as much as possible to the x or y axis vector
                    var xorthogonality = plane.normal.cross(xvector).length();
                    var yorthogonality = plane.normal.cross(yvector).length();
                    if (xorthogonality > yorthogonality) {
                        // x is better:
                        var planeconnector = new CSG.Connector(pointonplane, plane.normal, xvector);
                        transformation = planeconnector.getTransformationTo(z0connectorx, false, 0);
                        inversetransformation = z0connectorx.getTransformationTo(planeconnector, false, 0);
                    } else {
                        // y is better:
                        var planeconnector = new CSG.Connector(pointonplane, plane.normal, yvector);
                        transformation = planeconnector.getTransformationTo(z0connectory, false, 0);
                        inversetransformation = z0connectory.getTransformationTo(planeconnector, false, 0);
                    }
                    var transformedcsg = csg.transform(transformation);
                    var dotz = -plane.normal.dot(zvector);
                    var bounds = transformedcsg.getBounds();
                    var zheight = bounds[1].z - bounds[0].z;
                    var isbetter = isfirst;
                    if (!isbetter) {
                        if (zheight < minheight) {
                            isbetter = true;
                        } else if (zheight == minheight) {
                            if (dotz > maxdotz) { isbetter = true; }
                        }
                    }
                    if (isbetter) {
                        // translate the transformation around the z-axis and onto the z plane:
                        var translation = new CSG.Vector3D([-0.5 * (bounds[1].x + bounds[0].x), -0.5 * (bounds[1].y + bounds[0].y), -bounds[0].z]);
                        transformation = transformation.multiply(CSG.Matrix4x4.translation(translation));
                        inversetransformation = CSG.Matrix4x4.translation(translation.negated()).multiply(inversetransformation);
                        minheight = zheight;
                        maxdotz = dotz;
                        besttransformation = transformation;
                        bestinversetransformation = inversetransformation;
                    }
                    isfirst = false;
                }
                return [besttransformation, bestinversetransformation];
            }
        },

        getTransformationToFlatLying: function() {
            var result = this.getTransformationAndInverseTransformationToFlatLying();
            return result[0];
        },

        lieFlat: function() {
            var transformation = this.getTransformationToFlatLying();
            return this.transform(transformation);
        },

        // project the 3D CSG onto a plane
        // This returns a 2D CAG with the 'shadow' shape of the 3D solid when projected onto the
        // plane represented by the orthonormal basis
        projectToOrthoNormalBasis: function(orthobasis) {
            var EPS = 1e-5;
            var cags = [];
            this.polygons.filter(function(p) {
                    // only return polys in plane, others may disturb result
                    return p.plane.normal.minus(orthobasis.plane.normal).lengthSquared() < EPS*EPS;
                })
                .map(function(polygon) {
                    var cag = polygon.projectToOrthoNormalBasis(orthobasis);
                    if (cag.sides.length > 0) {
                        cags.push(cag);
                    }
            });
            var result = new CAG().union(cags);
            return result;
        },

        sectionCut: function(orthobasis) {
            var EPS = 1e-5;
            var plane1 = orthobasis.plane;
            var plane2 = orthobasis.plane.flipped();
            plane1 = new CSG.Plane(plane1.normal, plane1.w);
            plane2 = new CSG.Plane(plane2.normal, plane2.w + 5*EPS);
            var cut3d = this.cutByPlane(plane1);
            cut3d = cut3d.cutByPlane(plane2);
            return cut3d.projectToOrthoNormalBasis(orthobasis);
        },

        /*
         fixTJunctions:

         Suppose we have two polygons ACDB and EDGF:

          A-----B
          |     |
          |     E--F
          |     |  |
          C-----D--G

         Note that vertex E forms a T-junction on the side BD. In this case some STL slicers will complain
         that the solid is not watertight. This is because the watertightness check is done by checking if
         each side DE is matched by another side ED.

         This function will return a new solid with ACDB replaced by ACDEB

         Note that this can create polygons that are slightly non-convex (due to rounding errors). Therefore the result should
         not be used for further CSG operations!
         */
        fixTJunctions: function() {
            var csg = this.canonicalized();
            var sidemap = {};
            for (var polygonindex = 0; polygonindex < csg.polygons.length; polygonindex++) {
                var polygon = csg.polygons[polygonindex];
                var numvertices = polygon.vertices.length;
                if (numvertices >= 3) // should be true
                {
                    var vertex = polygon.vertices[0];
                    var vertextag = vertex.getTag();
                    for (var vertexindex = 0; vertexindex < numvertices; vertexindex++) {
                        var nextvertexindex = vertexindex + 1;
                        if (nextvertexindex == numvertices) { nextvertexindex = 0; }
                        var nextvertex = polygon.vertices[nextvertexindex];
                        var nextvertextag = nextvertex.getTag();
                        var sidetag = vertextag + "/" + nextvertextag;
                        var reversesidetag = nextvertextag + "/" + vertextag;
                        if (reversesidetag in sidemap) {
                            // this side matches the same side in another polygon. Remove from sidemap:
                            var ar = sidemap[reversesidetag];
                            ar.splice(-1, 1);
                            if (ar.length === 0) {
                                delete sidemap[reversesidetag];
                            }
                        } else {
                            var sideobj = {
                                vertex0: vertex,
                                vertex1: nextvertex,
                                polygonindex: polygonindex
                            };
                            if (!(sidetag in sidemap)) {
                                sidemap[sidetag] = [sideobj];
                            } else {
                                sidemap[sidetag].push(sideobj);
                            }
                        }
                        vertex = nextvertex;
                        vertextag = nextvertextag;
                    }
                }
            }
            // now sidemap contains 'unmatched' sides
            // i.e. side AB in one polygon does not have a matching side BA in another polygon
            var vertextag2sidestart = {};
            var vertextag2sideend = {};
            var sidestocheck = {};
            var sidemapisempty = true;
            for (var sidetag in sidemap) {
                sidemapisempty = false;
                sidestocheck[sidetag] = true;
                sidemap[sidetag].map(function(sideobj) {
                    var starttag = sideobj.vertex0.getTag();
                    var endtag = sideobj.vertex1.getTag();
                    if (starttag in vertextag2sidestart) {
                        vertextag2sidestart[starttag].push(sidetag);
                    } else {
                        vertextag2sidestart[starttag] = [sidetag];
                    }
                    if (endtag in vertextag2sideend) {
                        vertextag2sideend[endtag].push(sidetag);
                    } else {
                        vertextag2sideend[endtag] = [sidetag];
                    }
                });
            }

            if (!sidemapisempty) {
                // make a copy of the polygons array, since we are going to modify it:
                var polygons = csg.polygons.slice(0);

                function addSide(vertex0, vertex1, polygonindex) {
                    var starttag = vertex0.getTag();
                    var endtag = vertex1.getTag();
                    if (starttag == endtag) { throw new Error("Assertion failed"); }
                    var newsidetag = starttag + "/" + endtag;
                    var reversesidetag = endtag + "/" + starttag;
                    if (reversesidetag in sidemap) {
                        // we have a matching reverse oriented side.
                        // Instead of adding the new side, cancel out the reverse side:
                        // console.log("addSide("+newsidetag+") has reverse side:");
                        deleteSide(vertex1, vertex0, null);
                        return null;
                    }
                    //  console.log("addSide("+newsidetag+")");
                    var newsideobj = {
                        vertex0: vertex0,
                        vertex1: vertex1,
                        polygonindex: polygonindex
                    };
                    if (!(newsidetag in sidemap)) {
                        sidemap[newsidetag] = [newsideobj];
                    } else {
                        sidemap[newsidetag].push(newsideobj);
                    }
                    if (starttag in vertextag2sidestart) {
                        vertextag2sidestart[starttag].push(newsidetag);
                    } else {
                        vertextag2sidestart[starttag] = [newsidetag];
                    }
                    if (endtag in vertextag2sideend) {
                        vertextag2sideend[endtag].push(newsidetag);
                    } else {
                        vertextag2sideend[endtag] = [newsidetag];
                    }
                    return newsidetag;
                }

                function deleteSide(vertex0, vertex1, polygonindex) {
                    var starttag = vertex0.getTag();
                    var endtag = vertex1.getTag();
                    var sidetag = starttag + "/" + endtag;
                    // console.log("deleteSide("+sidetag+")");
                    if (!(sidetag in sidemap)) { throw new Error("Assertion failed"); }
                    var idx = -1;
                    var sideobjs = sidemap[sidetag];
                    for (var i = 0; i < sideobjs.length; i++) {
                        var sideobj = sideobjs[i];
                        if (sideobj.vertex0 != vertex0) { continue; }
                        if (sideobj.vertex1 != vertex1) { continue; }
                        if (polygonindex !== null) {
                            if (sideobj.polygonindex != polygonindex) { continue; }
                        }
                        idx = i;
                        break;
                    }
                    if (idx < 0) { throw new Error("Assertion failed"); }
                    sideobjs.splice(idx, 1);
                    if (sideobjs.length === 0) {
                        delete sidemap[sidetag];
                    }
                    idx = vertextag2sidestart[starttag].indexOf(sidetag);
                    if (idx < 0) { throw new Error("Assertion failed"); }
                    vertextag2sidestart[starttag].splice(idx, 1);
                    if (vertextag2sidestart[starttag].length === 0) {
                        delete vertextag2sidestart[starttag];
                    }

                    idx = vertextag2sideend[endtag].indexOf(sidetag);
                    if (idx < 0) { throw new Error("Assertion failed"); }
                    vertextag2sideend[endtag].splice(idx, 1);
                    if (vertextag2sideend[endtag].length === 0) {
                        delete vertextag2sideend[endtag];
                    }
                }


                while (true) {
                    var sidemapisempty = true;
                    for (var sidetag in sidemap) {
                        sidemapisempty = false;
                        sidestocheck[sidetag] = true;
                    }
                    if (sidemapisempty) { break; }
                    var donesomething = false;
                    while (true) {
                        var sidetagtocheck = null;
                        for (var sidetag in sidestocheck) {
                            sidetagtocheck = sidetag;
                            break;
                        }
                        if (sidetagtocheck === null) { break; } // sidestocheck is empty, we're done!
                        var donewithside = true;
                        if (sidetagtocheck in sidemap) {
                            var sideobjs = sidemap[sidetagtocheck];
                            if (sideobjs.length === 0) { throw new Error("Assertion failed"); }
                            var sideobj = sideobjs[0];
                            for (var directionindex = 0; directionindex < 2; directionindex++) {
                                var startvertex = (directionindex === 0) ? sideobj.vertex0 : sideobj.vertex1;
                                var endvertex = (directionindex === 0) ? sideobj.vertex1 : sideobj.vertex0;
                                var startvertextag = startvertex.getTag();
                                var endvertextag = endvertex.getTag();
                                var matchingsides = [];
                                if (directionindex === 0) {
                                    if (startvertextag in vertextag2sideend) {
                                        matchingsides = vertextag2sideend[startvertextag];
                                    }
                                } else {
                                    if (startvertextag in vertextag2sidestart) {
                                        matchingsides = vertextag2sidestart[startvertextag];
                                    }
                                }
                                for (var matchingsideindex = 0; matchingsideindex < matchingsides.length; matchingsideindex++) {
                                    var matchingsidetag = matchingsides[matchingsideindex];
                                    var matchingside = sidemap[matchingsidetag][0];
                                    var matchingsidestartvertex = (directionindex === 0) ? matchingside.vertex0 : matchingside.vertex1;
                                    var matchingsideendvertex = (directionindex === 0) ? matchingside.vertex1 : matchingside.vertex0;
                                    var matchingsidestartvertextag = matchingsidestartvertex.getTag();
                                    var matchingsideendvertextag = matchingsideendvertex.getTag();
                                    if (matchingsideendvertextag != startvertextag) { throw new Error("Assertion failed"); }
                                    if (matchingsidestartvertextag == endvertextag) {
                                        // matchingside cancels sidetagtocheck
                                        deleteSide(startvertex, endvertex, null);
                                        deleteSide(endvertex, startvertex, null);
                                        donewithside = false;
                                        directionindex = 2; // skip reverse direction check
                                        donesomething = true;
                                        break;
                                    } else {
                                        var startpos = startvertex.pos;
                                        var endpos = endvertex.pos;
                                        var checkpos = matchingsidestartvertex.pos;
                                        var direction = checkpos.minus(startpos);
                                        // Now we need to check if endpos is on the line startpos-checkpos:
                                        var t = endpos.minus(startpos).dot(direction) / direction.dot(direction);
                                        if ((t > 0) && (t < 1)) {
                                            var closestpoint = startpos.plus(direction.times(t));
                                            var distancesquared = closestpoint.distanceToSquared(endpos);
                                            if (distancesquared < 1e-10) {
                                                // Yes it's a t-junction! We need to split matchingside in two:
                                                var polygonindex = matchingside.polygonindex;
                                                var polygon = polygons[polygonindex];
                                                // find the index of startvertextag in polygon:
                                                var insertionvertextag = matchingside.vertex1.getTag();
                                                var insertionvertextagindex = -1;
                                                for (var i = 0; i < polygon.vertices.length; i++) {
                                                    if (polygon.vertices[i].getTag() == insertionvertextag) {
                                                        insertionvertextagindex = i;
                                                        break;
                                                    }
                                                }
                                                if (insertionvertextagindex < 0) { throw new Error("Assertion failed"); }
                                                // split the side by inserting the vertex:
                                                var newvertices = polygon.vertices.slice(0);
                                                newvertices.splice(insertionvertextagindex, 0, endvertex);
                                                var newpolygon = new CSG.Polygon(newvertices, polygon.shared /*polygon.plane*/ );

// FIX
                                               //calculate plane with differents point
                                                if(isNaN(newpolygon.plane.w)){

                                                    var found = false,
                                                        loop = function(callback){
                                                            newpolygon.vertices.forEach(function(item){
                                                                if(found) { return; }
                                                                callback(item);
                                                            });
                                                        };

                                                    loop(function(a){
                                                        loop(function(b) {
                                                            loop(function (c) {
                                                                newpolygon.plane = CSG.Plane.fromPoints(a.pos, b.pos, c.pos);
                                                                if(!isNaN(newpolygon.plane.w)) {
                                                                    found = true;
                                                                }
                                                            });
                                                        });
                                                    });
                                                }
// FIX

                                                polygons[polygonindex] = newpolygon;

                                                // remove the original sides from our maps:
                                                // deleteSide(sideobj.vertex0, sideobj.vertex1, null);
                                                deleteSide(matchingside.vertex0, matchingside.vertex1, polygonindex);
                                                var newsidetag1 = addSide(matchingside.vertex0, endvertex, polygonindex);
                                                var newsidetag2 = addSide(endvertex, matchingside.vertex1, polygonindex);
                                                if (newsidetag1 !== null) { sidestocheck[newsidetag1] = true; }
                                                if (newsidetag2 !== null) { sidestocheck[newsidetag2] = true; }
                                                donewithside = false;
                                                directionindex = 2; // skip reverse direction check
                                                donesomething = true;
                                                break;
                                            } // if(distancesquared < 1e-10)
                                        } // if( (t > 0) && (t < 1) )
                                    } // if(endingstidestartvertextag == endvertextag)
                                } // for matchingsideindex
                            } // for directionindex
                        } // if(sidetagtocheck in sidemap)
                        if (donewithside) {
                            delete sidestocheck[sidetag];
                        }
                    }
                    if (!donesomething) { break; }
                }
                var newcsg = CSG.fromPolygons(polygons);
                newcsg.properties = csg.properties;
                newcsg.isCanonicalized = true;
                newcsg.isRetesselated = true;
                csg = newcsg;
            } // if(!sidemapisempty)
            var sidemapisempty = true;
            for (var sidetag in sidemap) {
                sidemapisempty = false;
                break;
            }
            if (!sidemapisempty) {
                // throw new Error("!sidemapisempty");
            OpenJsCad.log("!sidemapisempty");
            }
            return csg;
        },

        toTriangles: function() {
            var polygons = [];
            this.polygons.forEach(function(poly) {
                var firstVertex = poly.vertices[0];
                for (var i = poly.vertices.length - 3; i >= 0; i--) {
                    polygons.push(new CSG.Polygon([
                            firstVertex, poly.vertices[i + 1], poly.vertices[i + 2]
                        ],
                        poly.shared, poly.plane));
                }
            });
            return polygons;
        },

        // features: string, or array containing 1 or more strings of: 'volume', 'area'
        // more could be added here (Fourier coeff, moments)
        getFeatures: function(features) {
            if (!(features instanceof Array)) {
                features = [features];
            }
            var result = this.toTriangles().map(function(triPoly) {
                    return triPoly.getTetraFeatures(features);
                })
                .reduce(function(pv, v) {
                    return v.map(function(feat, i) {
                        return feat + (pv === 0 ? 0 : pv[i]);
                    });
                }, 0);
            return (result.length == 1) ? result[0] : result;
        }
    };

    // Parse an option from the options object
    // If the option is not present, return the default value
    CSG.parseOption = function(options, optionname, defaultvalue) {
        var result = defaultvalue;
        if (options) {
            if (optionname in options) {
                result = options[optionname];
            }
        }
        return result;
    };

    // Parse an option and force into a CSG.Vector3D. If a scalar is passed it is converted
    // into a vector with equal x,y,z
    CSG.parseOptionAs3DVector = function(options, optionname, defaultvalue) {
        var result = CSG.parseOption(options, optionname, defaultvalue);
        result = new CSG.Vector3D(result);
        return result;
    };

    CSG.parseOptionAs3DVectorList = function(options, optionname, defaultvalue) {
        var result = CSG.parseOption(options, optionname, defaultvalue);
        return result.map(function(res) {
            return new CSG.Vector3D(res);
        });
    };

    // Parse an option and force into a CSG.Vector2D. If a scalar is passed it is converted
    // into a vector with equal x,y
    CSG.parseOptionAs2DVector = function(options, optionname, defaultvalue) {
        var result = CSG.parseOption(options, optionname, defaultvalue);
        result = new CSG.Vector2D(result);
        return result;
    };

    CSG.parseOptionAsFloat = function(options, optionname, defaultvalue) {
        var result = CSG.parseOption(options, optionname, defaultvalue);
        if (typeof(result) == "string") {
            result = Number(result);
        }
        if (isNaN(result) || typeof(result) != "number") {
            throw new Error("Parameter " + optionname + " should be a number");
        }
        return result;
    };

    CSG.parseOptionAsInt = function(options, optionname, defaultvalue) {
        var result = CSG.parseOption(options, optionname, defaultvalue);
        result = Number(Math.floor(result));
        if (isNaN(result)) {
            throw new Error("Parameter " + optionname + " should be a number");
        }
        return result;
    };

    CSG.parseOptionAsBool = function(options, optionname, defaultvalue) {
        var result = CSG.parseOption(options, optionname, defaultvalue);
        if (typeof(result) == "string") {
            if (result == "true") { result = true; }
            else if (result == "false") { result = false; }
            else if (result == 0) { result = false; }
        }
        result = !!result;
        return result;
    };

    // Construct an axis-aligned solid cuboid.
    // Parameters:
    //   center: center of cube (default [0,0,0])
    //   radius: radius of cube (default [1,1,1]), can be specified as scalar or as 3D vector
    //
    // Example code:
    //
    //     var cube = CSG.cube({
    //       center: [0, 0, 0],
    //       radius: 1
    //     });
    CSG.cube = function(options) {
        var c, r;
        options = options || {};
        if (('corner1' in options) || ('corner2' in options)) {
            if (('center' in options) || ('radius' in options)) {
                throw new Error("cube: should either give a radius and center parameter, or a corner1 and corner2 parameter")
            }
            corner1 = CSG.parseOptionAs3DVector(options, "corner1", [0, 0, 0]);
            corner2 = CSG.parseOptionAs3DVector(options, "corner2", [1, 1, 1]);
            c = corner1.plus(corner2).times(0.5);
            r = corner2.minus(corner1).times(0.5);
        } else {
            c = CSG.parseOptionAs3DVector(options, "center", [0, 0, 0]);
            r = CSG.parseOptionAs3DVector(options, "radius", [1, 1, 1]);
        }
        r = r.abs(); // negative radii make no sense
        var result = CSG.fromPolygons([
            [
                [0, 4, 6, 2],
                [-1, 0, 0]
            ],
            [
                [1, 3, 7, 5],
                [+1, 0, 0]
            ],
            [
                [0, 1, 5, 4],
                [0, -1, 0]
            ],
            [
                [2, 6, 7, 3],
                [0, +1, 0]
            ],
            [
                [0, 2, 3, 1],
                [0, 0, -1]
            ],
            [
                [4, 5, 7, 6],
                [0, 0, +1]
            ]
        ].map(function(info) {
            //var normal = new CSG.Vector3D(info[1]);
            //var plane = new CSG.Plane(normal, 1);
            var vertices = info[0].map(function(i) {
                var pos = new CSG.Vector3D(
                    c.x + r.x * (2 * !!(i & 1) - 1), c.y + r.y * (2 * !!(i & 2) - 1), c.z + r.z * (2 * !!(i & 4) - 1));
                return new CSG.Vertex(pos);
            });
            return new CSG.Polygon(vertices, null /* , plane */ );
        }));
        result.properties.cube = new CSG.Properties();
        result.properties.cube.center = new CSG.Vector3D(c);
        // add 6 connectors, at the centers of each face:
        result.properties.cube.facecenters = [
            new CSG.Connector(new CSG.Vector3D([r.x, 0, 0]).plus(c), [1, 0, 0], [0, 0, 1]),
            new CSG.Connector(new CSG.Vector3D([-r.x, 0, 0]).plus(c), [-1, 0, 0], [0, 0, 1]),
            new CSG.Connector(new CSG.Vector3D([0, r.y, 0]).plus(c), [0, 1, 0], [0, 0, 1]),
            new CSG.Connector(new CSG.Vector3D([0, -r.y, 0]).plus(c), [0, -1, 0], [0, 0, 1]),
            new CSG.Connector(new CSG.Vector3D([0, 0, r.z]).plus(c), [0, 0, 1], [1, 0, 0]),
            new CSG.Connector(new CSG.Vector3D([0, 0, -r.z]).plus(c), [0, 0, -1], [1, 0, 0])
        ];
        return result;
    };

    // Construct a solid sphere
    //
    // Parameters:
    //   center: center of sphere (default [0,0,0])
    //   radius: radius of sphere (default 1), must be a scalar
    //   resolution: determines the number of polygons per 360 degree revolution (default 12)
    //   axes: (optional) an array with 3 vectors for the x, y and z base vectors
    //
    // Example usage:
    //
    //     var sphere = CSG.sphere({
    //       center: [0, 0, 0],
    //       radius: 2,
    //       resolution: 32,
    //     });
    CSG.sphere = function(options) {
        options = options || {};
        var center = CSG.parseOptionAs3DVector(options, "center", [0, 0, 0]);
        var radius = CSG.parseOptionAsFloat(options, "radius", 1);
        var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution3D);
        var xvector, yvector, zvector;
        if ('axes' in options) {
            xvector = options.axes[0].unit().times(radius);
            yvector = options.axes[1].unit().times(radius);
            zvector = options.axes[2].unit().times(radius);
        } else {
            xvector = new CSG.Vector3D([1, 0, 0]).times(radius);
            yvector = new CSG.Vector3D([0, -1, 0]).times(radius);
            zvector = new CSG.Vector3D([0, 0, 1]).times(radius);
        }
        if (resolution < 4) { resolution = 4; }
        var qresolution = Math.round(resolution / 4);
        var prevcylinderpoint;
        var polygons = [];
        for (var slice1 = 0; slice1 <= resolution; slice1++) {
            var angle = Math.PI * 2.0 * slice1 / resolution;
            var cylinderpoint = xvector.times(Math.cos(angle)).plus(yvector.times(Math.sin(angle)));
            if (slice1 > 0) {
                // cylinder vertices:
                var vertices = [];
                var prevcospitch, prevsinpitch;
                for (var slice2 = 0; slice2 <= qresolution; slice2++) {
                    var pitch = 0.5 * Math.PI * slice2 / qresolution;
                    var cospitch = Math.cos(pitch);
                    var sinpitch = Math.sin(pitch);
                    if (slice2 > 0) {
                        vertices = [];
                        vertices.push(new CSG.Vertex(center.plus(prevcylinderpoint.times(prevcospitch).minus(zvector.times(prevsinpitch)))));
                        vertices.push(new CSG.Vertex(center.plus(cylinderpoint.times(prevcospitch).minus(zvector.times(prevsinpitch)))));
                        if (slice2 < qresolution) {
                            vertices.push(new CSG.Vertex(center.plus(cylinderpoint.times(cospitch).minus(zvector.times(sinpitch)))));
                        }
                        vertices.push(new CSG.Vertex(center.plus(prevcylinderpoint.times(cospitch).minus(zvector.times(sinpitch)))));
                        polygons.push(new CSG.Polygon(vertices));
                        vertices = [];
                        vertices.push(new CSG.Vertex(center.plus(prevcylinderpoint.times(prevcospitch).plus(zvector.times(prevsinpitch)))));
                        vertices.push(new CSG.Vertex(center.plus(cylinderpoint.times(prevcospitch).plus(zvector.times(prevsinpitch)))));
                        if (slice2 < qresolution) {
                            vertices.push(new CSG.Vertex(center.plus(cylinderpoint.times(cospitch).plus(zvector.times(sinpitch)))));
                        }
                        vertices.push(new CSG.Vertex(center.plus(prevcylinderpoint.times(cospitch).plus(zvector.times(sinpitch)))));
                        vertices.reverse();
                        polygons.push(new CSG.Polygon(vertices));
                    }
                    prevcospitch = cospitch;
                    prevsinpitch = sinpitch;
                }
            }
            prevcylinderpoint = cylinderpoint;
        }
        var result = CSG.fromPolygons(polygons);
        result.properties.sphere = new CSG.Properties();
        result.properties.sphere.center = new CSG.Vector3D(center);
        result.properties.sphere.facepoint = center.plus(xvector);
        return result;
    };

    // Construct a solid cylinder.
    //
    // Parameters:
    //   start: start point of cylinder (default [0, -1, 0])
    //   end: end point of cylinder (default [0, 1, 0])
    //   radius: radius of cylinder (default 1), must be a scalar
    //   resolution: determines the number of polygons per 360 degree revolution (default 12)
    //
    // Example usage:
    //
    //     var cylinder = CSG.cylinder({
    //       start: [0, -1, 0],
    //       end: [0, 1, 0],
    //       radius: 1,
    //       resolution: 16
    //     });
    CSG.cylinder = function(options) {
        var s = CSG.parseOptionAs3DVector(options, "start", [0, -1, 0]);
        var e = CSG.parseOptionAs3DVector(options, "end", [0, 1, 0]);
        var r = CSG.parseOptionAsFloat(options, "radius", 1);
        var rEnd = CSG.parseOptionAsFloat(options, "radiusEnd", r);
        var rStart = CSG.parseOptionAsFloat(options, "radiusStart", r);
        var alpha = CSG.parseOptionAsFloat(options, "sectorAngle", 360);
        alpha = alpha > 360 ? alpha % 360 : alpha;

        if ((rEnd < 0) || (rStart < 0)) {
            throw new Error("Radius should be non-negative");
        }
        if ((rEnd === 0) && (rStart === 0)) {
            throw new Error("Either radiusStart or radiusEnd should be positive");
        }

        var slices = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
        var ray = e.minus(s);
        var axisZ = ray.unit(); //, isY = (Math.abs(axisZ.y) > 0.5);
        var axisX = axisZ.randomNonParallelVector().unit();

        //  var axisX = new CSG.Vector3D(isY, !isY, 0).cross(axisZ).unit();
        var axisY = axisX.cross(axisZ).unit();
        var start = new CSG.Vertex(s);
        var end = new CSG.Vertex(e);
        var polygons = [];

        function point(stack, slice, radius) {
            var angle = slice * Math.PI * alpha / 180;
            var out = axisX.times(Math.cos(angle)).plus(axisY.times(Math.sin(angle)));
            var pos = s.plus(ray.times(stack)).plus(out.times(radius));
            return new CSG.Vertex(pos);
        }
        if (alpha > 0) {
            for (var i = 0; i < slices; i++) {
                var t0 = i / slices,
                    t1 = (i + 1) / slices;
                if (rEnd == rStart) {
                    polygons.push(new CSG.Polygon([start, point(0, t0, rEnd), point(0, t1, rEnd)]));
                    polygons.push(new CSG.Polygon([point(0, t1, rEnd), point(0, t0, rEnd), point(1, t0, rEnd), point(1, t1, rEnd)]));
                    polygons.push(new CSG.Polygon([end, point(1, t1, rEnd), point(1, t0, rEnd)]));
                } else {
                    if (rStart > 0) {
                        polygons.push(new CSG.Polygon([start, point(0, t0, rStart), point(0, t1, rStart)]));
                        polygons.push(new CSG.Polygon([point(0, t0, rStart), point(1, t0, rEnd), point(0, t1, rStart)]));
                    }
                    if (rEnd > 0) {
                        polygons.push(new CSG.Polygon([end, point(1, t1, rEnd), point(1, t0, rEnd)]));
                        polygons.push(new CSG.Polygon([point(1, t0, rEnd), point(1, t1, rEnd), point(0, t1, rStart)]));
                    }
                }
            }
            if (alpha < 360) {
                polygons.push(new CSG.Polygon([start, end, point(0, 0, rStart)]));
                polygons.push(new CSG.Polygon([point(0, 0, rStart), end, point(1, 0, rEnd)]));
                polygons.push(new CSG.Polygon([start, point(0, 1, rStart), end]));
                polygons.push(new CSG.Polygon([point(0, 1, rStart), point(1, 1, rEnd), end]));
            }
        }
        var result = CSG.fromPolygons(polygons);
        result.properties.cylinder = new CSG.Properties();
        result.properties.cylinder.start = new CSG.Connector(s, axisZ.negated(), axisX);
        result.properties.cylinder.end = new CSG.Connector(e, axisZ, axisX);
        var cylCenter = s.plus(ray.times(0.5));
        var fptVec = axisX.rotate(s, axisZ, -alpha / 2).times((rStart + rEnd) / 2);
        var fptVec90 = fptVec.cross(axisZ);
        // note this one is NOT a face normal for a cone. - It's horizontal from cyl perspective
        result.properties.cylinder.facepointH = new CSG.Connector(cylCenter.plus(fptVec), fptVec, axisZ);
        result.properties.cylinder.facepointH90 = new CSG.Connector(cylCenter.plus(fptVec90), fptVec90, axisZ);
        return result;
    };

    // Like a cylinder, but with rounded ends instead of flat
    //
    // Parameters:
    //   start: start point of cylinder (default [0, -1, 0])
    //   end: end point of cylinder (default [0, 1, 0])
    //   radius: radius of cylinder (default 1), must be a scalar
    //   resolution: determines the number of polygons per 360 degree revolution (default 12)
    //   normal: a vector determining the starting angle for tesselation. Should be non-parallel to start.minus(end)
    //
    // Example usage:
    //
    //     var cylinder = CSG.roundedCylinder({
    //       start: [0, -1, 0],
    //       end: [0, 1, 0],
    //       radius: 1,
    //       resolution: 16
    //     });
    CSG.roundedCylinder = function(options) {
        var p1 = CSG.parseOptionAs3DVector(options, "start", [0, -1, 0]);
        var p2 = CSG.parseOptionAs3DVector(options, "end", [0, 1, 0]);
        var radius = CSG.parseOptionAsFloat(options, "radius", 1);
        var direction = p2.minus(p1);
        var defaultnormal;
        if (Math.abs(direction.x) > Math.abs(direction.y)) {
            defaultnormal = new CSG.Vector3D(0, 1, 0);
        } else {
            defaultnormal = new CSG.Vector3D(1, 0, 0);
        }
        var normal = CSG.parseOptionAs3DVector(options, "normal", defaultnormal);
        var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution3D);
        if (resolution < 4) { resolution = 4; }
        var polygons = [];
        var qresolution = Math.floor(0.25 * resolution);
        var length = direction.length();
        if (length < 1e-10) {
            return CSG.sphere({
                center: p1,
                radius: radius,
                resolution: resolution
            });
        }
        var zvector = direction.unit().times(radius);
        var xvector = zvector.cross(normal).unit().times(radius);
        var yvector = xvector.cross(zvector).unit().times(radius);
        var prevcylinderpoint;
        for (var slice1 = 0; slice1 <= resolution; slice1++) {
            var angle = Math.PI * 2.0 * slice1 / resolution;
            var cylinderpoint = xvector.times(Math.cos(angle)).plus(yvector.times(Math.sin(angle)));
            if (slice1 > 0) {
                // cylinder vertices:
                var vertices = [];
                vertices.push(new CSG.Vertex(p1.plus(cylinderpoint)));
                vertices.push(new CSG.Vertex(p1.plus(prevcylinderpoint)));
                vertices.push(new CSG.Vertex(p2.plus(prevcylinderpoint)));
                vertices.push(new CSG.Vertex(p2.plus(cylinderpoint)));
                polygons.push(new CSG.Polygon(vertices));
                var prevcospitch, prevsinpitch;
                for (var slice2 = 0; slice2 <= qresolution; slice2++) {
                    var pitch = 0.5 * Math.PI * slice2 / qresolution;
                    //var pitch = Math.asin(slice2/qresolution);
                    var cospitch = Math.cos(pitch);
                    var sinpitch = Math.sin(pitch);
                    if (slice2 > 0) {
                        vertices = [];
                        vertices.push(new CSG.Vertex(p1.plus(prevcylinderpoint.times(prevcospitch).minus(zvector.times(prevsinpitch)))));
                        vertices.push(new CSG.Vertex(p1.plus(cylinderpoint.times(prevcospitch).minus(zvector.times(prevsinpitch)))));
                        if (slice2 < qresolution) {
                            vertices.push(new CSG.Vertex(p1.plus(cylinderpoint.times(cospitch).minus(zvector.times(sinpitch)))));
                        }
                        vertices.push(new CSG.Vertex(p1.plus(prevcylinderpoint.times(cospitch).minus(zvector.times(sinpitch)))));
                        polygons.push(new CSG.Polygon(vertices));
                        vertices = [];
                        vertices.push(new CSG.Vertex(p2.plus(prevcylinderpoint.times(prevcospitch).plus(zvector.times(prevsinpitch)))));
                        vertices.push(new CSG.Vertex(p2.plus(cylinderpoint.times(prevcospitch).plus(zvector.times(prevsinpitch)))));
                        if (slice2 < qresolution) {
                            vertices.push(new CSG.Vertex(p2.plus(cylinderpoint.times(cospitch).plus(zvector.times(sinpitch)))));
                        }
                        vertices.push(new CSG.Vertex(p2.plus(prevcylinderpoint.times(cospitch).plus(zvector.times(sinpitch)))));
                        vertices.reverse();
                        polygons.push(new CSG.Polygon(vertices));
                    }
                    prevcospitch = cospitch;
                    prevsinpitch = sinpitch;
                }
            }
            prevcylinderpoint = cylinderpoint;
        }
        var result = CSG.fromPolygons(polygons);
        var ray = zvector.unit();
        var axisX = xvector.unit();
        result.properties.roundedCylinder = new CSG.Properties();
        result.properties.roundedCylinder.start = new CSG.Connector(p1, ray.negated(), axisX);
        result.properties.roundedCylinder.end = new CSG.Connector(p2, ray, axisX);
        result.properties.roundedCylinder.facepoint = p1.plus(xvector);
        return result;
    };

    // Construct an axis-aligned solid rounded cuboid.
    // Parameters:
    //   center: center of cube (default [0,0,0])
    //   radius: radius of cube (default [1,1,1]), can be specified as scalar or as 3D vector
    //   roundradius: radius of rounded corners (default 0.2), must be a scalar
    //   resolution: determines the number of polygons per 360 degree revolution (default 8)
    //
    // Example code:
    //
    //     var cube = CSG.roundedCube({
    //       center: [0, 0, 0],
    //       radius: 1,
    //       roundradius: 0.2,
    //       resolution: 8,
    //     });
    CSG.roundedCube = function(options) {
        var EPS = 1e-5;
        var minRR = 1e-2; //minroundradius 1e-3 gives rounding errors already
        var center, cuberadius;
        options = options || {};
        if (('corner1' in options) || ('corner2' in options)) {
            if (('center' in options) || ('radius' in options)) {
                throw new Error("roundedCube: should either give a radius and center parameter, or a corner1 and corner2 parameter");
            }
            corner1 = CSG.parseOptionAs3DVector(options, "corner1", [0, 0, 0]);
            corner2 = CSG.parseOptionAs3DVector(options, "corner2", [1, 1, 1]);
            center = corner1.plus(corner2).times(0.5);
            cuberadius = corner2.minus(corner1).times(0.5);
        } else {
            center = CSG.parseOptionAs3DVector(options, "center", [0, 0, 0]);
            cuberadius = CSG.parseOptionAs3DVector(options, "radius", [1, 1, 1]);
        }
        cuberadius = cuberadius.abs(); // negative radii make no sense
        var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution3D);
        if (resolution < 4) { resolution = 4; }
        if (resolution%2 == 1 && resolution < 8) { resolution = 8; } // avoid ugly
        var roundradius = CSG.parseOptionAs3DVector(options, "roundradius", [0.2, 0.2, 0.2]);
        // slight hack for now - total radius stays ok
        roundradius = CSG.Vector3D.Create(Math.max(roundradius.x, minRR), Math.max(roundradius.y, minRR), Math.max(roundradius.z, minRR));
        var innerradius = cuberadius.minus(roundradius);
        if (innerradius.x < 0 || innerradius.y < 0 || innerradius.z < 0) {
            throw('roundradius <= radius!');
        }
        var res = CSG.sphere({radius:1, resolution:resolution});
        res = res.scale(roundradius);
        innerradius.x > EPS && (res = res.stretchAtPlane([1, 0, 0], [0, 0, 0], 2*innerradius.x));
        innerradius.y > EPS && (res = res.stretchAtPlane([0, 1, 0], [0, 0, 0], 2*innerradius.y));
        innerradius.z > EPS && (res = res.stretchAtPlane([0, 0, 1], [0, 0, 0], 2*innerradius.z));
        res = res.translate([-innerradius.x+center.x, -innerradius.y+center.y, -innerradius.z+center.z]);
        res = res.reTesselated();
        res.properties.roundedCube = new CSG.Properties();
        res.properties.roundedCube.center = new CSG.Vertex(center);
        res.properties.roundedCube.facecenters = [
            new CSG.Connector(new CSG.Vector3D([cuberadius.x, 0, 0]).plus(center), [1, 0, 0], [0, 0, 1]),
            new CSG.Connector(new CSG.Vector3D([-cuberadius.x, 0, 0]).plus(center), [-1, 0, 0], [0, 0, 1]),
            new CSG.Connector(new CSG.Vector3D([0, cuberadius.y, 0]).plus(center), [0, 1, 0], [0, 0, 1]),
            new CSG.Connector(new CSG.Vector3D([0, -cuberadius.y, 0]).plus(center), [0, -1, 0], [0, 0, 1]),
            new CSG.Connector(new CSG.Vector3D([0, 0, cuberadius.z]).plus(center), [0, 0, 1], [1, 0, 0]),
            new CSG.Connector(new CSG.Vector3D([0, 0, -cuberadius.z]).plus(center), [0, 0, -1], [1, 0, 0])
        ];
        return res;
    };

    /**
     * polyhedron accepts openscad style arguments. I.e. define face vertices clockwise looking from outside
     */
    CSG.polyhedron = function(options) {
        options = options || {};
        if (('points' in options) !== ('faces' in options)) {
            throw new Error("polyhedron needs 'points' and 'faces' arrays");
        }
        var vertices = CSG.parseOptionAs3DVectorList(options, "points", [
                [1, 1, 0],
                [1, -1, 0],
                [-1, -1, 0],
                [-1, 1, 0],
                [0, 0, 1]
            ])
            .map(function(pt) {
                return new CSG.Vertex(pt);
            });
        var faces = CSG.parseOption(options, "faces", [
                [0, 1, 4],
                [1, 2, 4],
                [2, 3, 4],
                [3, 0, 4],
                [1, 0, 3],
                [2, 1, 3]
            ]);
        // openscad convention defines inward normals - so we have to invert here
        faces.forEach(function(face) {
            face.reverse();
        });
        var polygons = faces.map(function(face) {
            return new CSG.Polygon(face.map(function(idx) {
                return vertices[idx];
            }));
        });

        // TODO: facecenters as connectors? probably overkill. Maybe centroid
        // the re-tesselation here happens because it's so easy for a user to
        // create parametrized polyhedrons that end up with 1-2 dimensional polygons.
        // These will create infinite loops at CSG.Tree()
        return CSG.fromPolygons(polygons).reTesselated();
    };

    CSG.IsFloat = function(n) {
        return (!isNaN(n)) || (n === Infinity) || (n === -Infinity);
    };

    // solve 2x2 linear equation:
    // [ab][x] = [u]
    // [cd][y]   [v]
    CSG.solve2Linear = function(a, b, c, d, u, v) {
        var det = a * d - b * c;
        var invdet = 1.0 / det;
        var x = u * d - b * v;
        var y = -u * c + a * v;
        x *= invdet;
        y *= invdet;
        return [x, y];
    };

    // # class Vector3D
    // Represents a 3D vector.
    //
    // Example usage:
    //
    //     new CSG.Vector3D(1, 2, 3);
    //     new CSG.Vector3D([1, 2, 3]);
    //     new CSG.Vector3D({ x: 1, y: 2, z: 3 });
    //     new CSG.Vector3D(1, 2); // assumes z=0
    //     new CSG.Vector3D([1, 2]); // assumes z=0
    CSG.Vector3D = function(x, y, z) {
        if (arguments.length == 3) {
            this._x = parseFloat(x);
            this._y = parseFloat(y);
            this._z = parseFloat(z);
        } else if (arguments.length == 2) {
            this._x = parseFloat(x);
            this._y = parseFloat(y);
            this._z = 0;
        } else {
            var ok = true;
            if (arguments.length == 1) {
                if (typeof(x) == "object") {
                    if (x instanceof CSG.Vector3D) {
                        this._x = x._x;
                        this._y = x._y;
                        this._z = x._z;
                    } else if (x instanceof CSG.Vector2D) {
                        this._x = x._x;
                        this._y = x._y;
                        this._z = 0;
                    } else if (x instanceof Array) {
                        if ((x.length < 2) || (x.length > 3)) {
                            ok = false;
                        } else {
                            this._x = parseFloat(x[0]);
                            this._y = parseFloat(x[1]);
                            if (x.length == 3) {
                                this._z = parseFloat(x[2]);
                            } else {
                                this._z = 0;
                            }
                        }
                    } else if (('_x' in x) && ('_y' in x)) {
                        this._x = parseFloat(x._x);
                        this._y = parseFloat(x._y);
                        if ('_z' in x) {
                            this._z = parseFloat(x._z);
                        } else {
                            this._z = 0;
                        }
                    } else { ok = false; }
                } else {
                    var v = parseFloat(x);
                    this._x = v;
                    this._y = v;
                    this._z = v;
                }
            } else { ok = false; }
            if (ok) {
                if ((!CSG.IsFloat(this._x)) || (!CSG.IsFloat(this._y)) || (!CSG.IsFloat(this._z))) { ok = false; }
            }
            if (!ok) {
                throw new Error("wrong arguments");
            }
        }
    };

    // This does the same as new CSG.Vector3D(x,y,z) but it doesn't go through the constructor
    // and the parameters are not validated. Is much faster.
    CSG.Vector3D.Create = function(x, y, z) {
        var result = Object.create(CSG.Vector3D.prototype);
        result._x = x;
        result._y = y;
        result._z = z;
        return result;
    };

    CSG.Vector3D.prototype = {
        get x() {
            return this._x;
        },
        get y() {
            return this._y;
        },
        get z() {
            return this._z;
        },

        set x(v) {
            throw new Error("Vector3D is immutable");
        },
        set y(v) {
            throw new Error("Vector3D is immutable");
        },
        set z(v) {
            throw new Error("Vector3D is immutable");
        },

        clone: function() {
            return CSG.Vector3D.Create(this._x, this._y, this._z);
        },

        negated: function() {
            return CSG.Vector3D.Create(-this._x, -this._y, -this._z);
        },

        abs: function() {
            return CSG.Vector3D.Create(Math.abs(this._x), Math.abs(this._y), Math.abs(this._z));
        },

        plus: function(a) {
            return CSG.Vector3D.Create(this._x + a._x, this._y + a._y, this._z + a._z);
        },

        minus: function(a) {
            return CSG.Vector3D.Create(this._x - a._x, this._y - a._y, this._z - a._z);
        },

        times: function(a) {
            return CSG.Vector3D.Create(this._x * a, this._y * a, this._z * a);
        },

        dividedBy: function(a) {
            return CSG.Vector3D.Create(this._x / a, this._y / a, this._z / a);
        },

        dot: function(a) {
            return this._x * a._x + this._y * a._y + this._z * a._z;
        },

        lerp: function(a, t) {
            return this.plus(a.minus(this).times(t));
        },

        lengthSquared: function() {
            return this.dot(this);
        },

        length: function() {
            return Math.sqrt(this.lengthSquared());
        },

        unit: function() {
            return this.dividedBy(this.length());
        },

        cross: function(a) {
            return CSG.Vector3D.Create(
                this._y * a._z - this._z * a._y, this._z * a._x - this._x * a._z, this._x * a._y - this._y * a._x);
        },

        distanceTo: function(a) {
            return this.minus(a).length();
        },

        distanceToSquared: function(a) {
            return this.minus(a).lengthSquared();
        },

        equals: function(a) {
            return (this._x == a._x) && (this._y == a._y) && (this._z == a._z);
        },

        // Right multiply by a 4x4 matrix (the vector is interpreted as a row vector)
        // Returns a new CSG.Vector3D
        multiply4x4: function(matrix4x4) {
            return matrix4x4.leftMultiply1x3Vector(this);
        },

        transform: function(matrix4x4) {
            return matrix4x4.leftMultiply1x3Vector(this);
        },

        toString: function() {
            return "(" + this._x.toFixed(2) + ", " + this._y.toFixed(2) + ", " + this._z.toFixed(2) + ")";
        },

        // find a vector that is somewhat perpendicular to this one
        randomNonParallelVector: function() {
            var abs = this.abs();
            if ((abs._x <= abs._y) && (abs._x <= abs._z)) {
                return CSG.Vector3D.Create(1, 0, 0);
            } else if ((abs._y <= abs._x) && (abs._y <= abs._z)) {
                return CSG.Vector3D.Create(0, 1, 0);
            } else {
                return CSG.Vector3D.Create(0, 0, 1);
            }
        },

        min: function(p) {
            return CSG.Vector3D.Create(
                Math.min(this._x, p._x), Math.min(this._y, p._y), Math.min(this._z, p._z));
        },

        max: function(p) {
            return CSG.Vector3D.Create(
                Math.max(this._x, p._x), Math.max(this._y, p._y), Math.max(this._z, p._z));
        }
    };

    // # class Vertex
    // Represents a vertex of a polygon. Use your own vertex class instead of this
    // one to provide additional features like texture coordinates and vertex
    // colors. Custom vertex classes need to provide a `pos` property
    // `flipped()`, and `interpolate()` methods that behave analogous to the ones
    // defined by `CSG.Vertex`.
    CSG.Vertex = function(pos) {
        this.pos = pos;
    };

    // create from an untyped object with identical property names:
    CSG.Vertex.fromObject = function(obj) {
        var pos = new CSG.Vector3D(obj.pos);
        return new CSG.Vertex(pos);
    };

    CSG.Vertex.prototype = {
        // Return a vertex with all orientation-specific data (e.g. vertex normal) flipped. Called when the
        // orientation of a polygon is flipped.
        flipped: function() {
            return this;
        },

        getTag: function() {
            var result = this.tag;
            if (!result) {
                result = CSG.getTag();
                this.tag = result;
            }
            return result;
        },

        // Create a new vertex between this vertex and `other` by linearly
        // interpolating all properties using a parameter of `t`. Subclasses should
        // override this to interpolate additional properties.
        interpolate: function(other, t) {
            var newpos = this.pos.lerp(other.pos, t);
            return new CSG.Vertex(newpos);
        },

        // Affine transformation of vertex. Returns a new CSG.Vertex
        transform: function(matrix4x4) {
            var newpos = this.pos.multiply4x4(matrix4x4);
            return new CSG.Vertex(newpos);
        },

        toString: function() {
            return this.pos.toString();
        }
    };

    // # class Plane
    // Represents a plane in 3D space.
    CSG.Plane = function(normal, w) {
        this.normal = normal;
        this.w = w;
    };

    // create from an untyped object with identical property names:
    CSG.Plane.fromObject = function(obj) {
        var normal = new CSG.Vector3D(obj.normal);
        var w = parseFloat(obj.w);
        return new CSG.Plane(normal, w);
    };

    // `CSG.Plane.EPSILON` is the tolerance used by `splitPolygon()` to decide if a
    // point is on the plane.
    CSG.Plane.EPSILON = 1e-5;

    CSG.Plane.fromVector3Ds = function(a, b, c) {
        var n = b.minus(a).cross(c.minus(a)).unit();
        return new CSG.Plane(n, n.dot(a));
    };

    // like fromVector3Ds, but allow the vectors to be on one point or one line
    // in such a case a random plane through the given points is constructed
    CSG.Plane.anyPlaneFromVector3Ds = function(a, b, c) {
        var v1 = b.minus(a);
        var v2 = c.minus(a);
        if (v1.length() < 1e-5) {
            v1 = v2.randomNonParallelVector();
        }
        if (v2.length() < 1e-5) {
            v2 = v1.randomNonParallelVector();
        }
        var normal = v1.cross(v2);
        if (normal.length() < 1e-5) {
            // this would mean that v1 == v2.negated()
            v2 = v1.randomNonParallelVector();
            normal = v1.cross(v2);
        }
        normal = normal.unit();
        return new CSG.Plane(normal, normal.dot(a));
    };

    CSG.Plane.fromPoints = function(a, b, c) {
        a = new CSG.Vector3D(a);
        b = new CSG.Vector3D(b);
        c = new CSG.Vector3D(c);
        return CSG.Plane.fromVector3Ds(a, b, c);
    };

    CSG.Plane.fromNormalAndPoint = function(normal, point) {
        normal = new CSG.Vector3D(normal);
        point = new CSG.Vector3D(point);
        normal = normal.unit();
        var w = point.dot(normal);
        return new CSG.Plane(normal, w);
    };

    CSG.Plane.prototype = {
        flipped: function() {
            return new CSG.Plane(this.normal.negated(), -this.w);
        },

        getTag: function() {
            var result = this.tag;
            if (!result) {
                result = CSG.getTag();
                this.tag = result;
            }
            return result;
        },

        equals: function(n) {
            return this.normal.equals(n.normal) && this.w == n.w;
        },

        transform: function(matrix4x4) {
            var ismirror = matrix4x4.isMirroring();
            // get two vectors in the plane:
            var r = this.normal.randomNonParallelVector();
            var u = this.normal.cross(r);
            var v = this.normal.cross(u);
            // get 3 points in the plane:
            var point1 = this.normal.times(this.w);
            var point2 = point1.plus(u);
            var point3 = point1.plus(v);
            // transform the points:
            point1 = point1.multiply4x4(matrix4x4);
            point2 = point2.multiply4x4(matrix4x4);
            point3 = point3.multiply4x4(matrix4x4);
            // and create a new plane from the transformed points:
            var newplane = CSG.Plane.fromVector3Ds(point1, point2, point3);
            if (ismirror) {
                // the transform is mirroring
                // We should mirror the plane:
                newplane = newplane.flipped();
            }
            return newplane;
        },

        // Returns object:
        // .type:
        //   0: coplanar-front
        //   1: coplanar-back
        //   2: front
        //   3: back
        //   4: spanning
        // In case the polygon is spanning, returns:
        // .front: a CSG.Polygon of the front part
        // .back: a CSG.Polygon of the back part
        splitPolygon: function(polygon) {
            var this$1 = this;

            var result = {
                type: null,
                front: null,
                back: null
            };
            // cache in local vars (speedup):
            var planenormal = this.normal;
            var vertices = polygon.vertices;
            var numvertices = vertices.length;
            if (polygon.plane.equals(this)) {
                result.type = 0;
            } else {
                var EPS = CSG.Plane.EPSILON;
                var thisw = this.w;
                var hasfront = false;
                var hasback = false;
                var vertexIsBack = [];
                var MINEPS = -EPS;
                for (var i = 0; i < numvertices; i++) {
                    var t = planenormal.dot(vertices[i].pos) - thisw;
                    var isback = (t < 0);
                    vertexIsBack.push(isback);
                    if (t > EPS) { hasfront = true; }
                    if (t < MINEPS) { hasback = true; }
                }
                if ((!hasfront) && (!hasback)) {
                    // all points coplanar
                    var t = planenormal.dot(polygon.plane.normal);
                    result.type = (t >= 0) ? 0 : 1;
                } else if (!hasback) {
                    result.type = 2;
                } else if (!hasfront) {
                    result.type = 3;
                } else {
                    // spanning
                    result.type = 4;
                    var frontvertices = [],
                        backvertices = [];
                    var isback = vertexIsBack[0];
                    for (var vertexindex = 0; vertexindex < numvertices; vertexindex++) {
                        var vertex = vertices[vertexindex];
                        var nextvertexindex = vertexindex + 1;
                        if (nextvertexindex >= numvertices) { nextvertexindex = 0; }
                        var nextisback = vertexIsBack[nextvertexindex];
                        if (isback == nextisback) {
                            // line segment is on one side of the plane:
                            if (isback) {
                                backvertices.push(vertex);
                            } else {
                                frontvertices.push(vertex);
                            }
                        } else {
                            // line segment intersects plane:
                            var point = vertex.pos;
                            var nextpoint = vertices[nextvertexindex].pos;
                            var intersectionpoint = this$1.splitLineBetweenPoints(point, nextpoint);
                            var intersectionvertex = new CSG.Vertex(intersectionpoint);
                            if (isback) {
                                backvertices.push(vertex);
                                backvertices.push(intersectionvertex);
                                frontvertices.push(intersectionvertex);
                            } else {
                                frontvertices.push(vertex);
                                frontvertices.push(intersectionvertex);
                                backvertices.push(intersectionvertex);
                            }
                        }
                        isback = nextisback;
                    } // for vertexindex
                    // remove duplicate vertices:
                    var EPS_SQUARED = CSG.Plane.EPSILON * CSG.Plane.EPSILON;
                    if (backvertices.length >= 3) {
                        var prevvertex = backvertices[backvertices.length - 1];
                        for (var vertexindex = 0; vertexindex < backvertices.length; vertexindex++) {
                            var vertex = backvertices[vertexindex];
                            if (vertex.pos.distanceToSquared(prevvertex.pos) < EPS_SQUARED) {
                                backvertices.splice(vertexindex, 1);
                                vertexindex--;
                            }
                            prevvertex = vertex;
                        }
                    }
                    if (frontvertices.length >= 3) {
                        var prevvertex = frontvertices[frontvertices.length - 1];
                        for (var vertexindex = 0; vertexindex < frontvertices.length; vertexindex++) {
                            var vertex = frontvertices[vertexindex];
                            if (vertex.pos.distanceToSquared(prevvertex.pos) < EPS_SQUARED) {
                                frontvertices.splice(vertexindex, 1);
                                vertexindex--;
                            }
                            prevvertex = vertex;
                        }
                    }
                    if (frontvertices.length >= 3) {
                        result.front = new CSG.Polygon(frontvertices, polygon.shared, polygon.plane);
                    }
                    if (backvertices.length >= 3) {
                        result.back = new CSG.Polygon(backvertices, polygon.shared, polygon.plane);
                    }
                }
            }
            return result;
        },

        // robust splitting of a line by a plane
        // will work even if the line is parallel to the plane
        splitLineBetweenPoints: function(p1, p2) {
            var direction = p2.minus(p1);
            var labda = (this.w - this.normal.dot(p1)) / this.normal.dot(direction);
            if (isNaN(labda)) { labda = 0; }
            if (labda > 1) { labda = 1; }
            if (labda < 0) { labda = 0; }
            var result = p1.plus(direction.times(labda));
            return result;
        },

        // returns CSG.Vector3D
        intersectWithLine: function(line3d) {
            return line3d.intersectWithPlane(this);
        },

        // intersection of two planes
        intersectWithPlane: function(plane) {
            return CSG.Line3D.fromPlanes(this, plane);
        },

        signedDistanceToPoint: function(point) {
            var t = this.normal.dot(point) - this.w;
            return t;
        },

        toString: function() {
            return "[normal: " + this.normal.toString() + ", w: " + this.w + "]";
        },

        mirrorPoint: function(point3d) {
            var distance = this.signedDistanceToPoint(point3d);
            var mirrored = point3d.minus(this.normal.times(distance * 2.0));
            return mirrored;
        }
    };


    // # class Polygon
    // Represents a convex polygon. The vertices used to initialize a polygon must
    // be coplanar and form a convex loop. They do not have to be `CSG.Vertex`
    // instances but they must behave similarly (duck typing can be used for
    // customization).
    //
    // Each convex polygon has a `shared` property, which is shared between all
    // polygons that are clones of each other or were split from the same polygon.
    // This can be used to define per-polygon properties (such as surface color).
    //
    // The plane of the polygon is calculated from the vertex coordinates
    // To avoid unnecessary recalculation, the plane can alternatively be
    // passed as the third argument
    CSG.Polygon = function(vertices, shared, plane) {
        this.vertices = vertices;
        if (!shared) { shared = CSG.Polygon.defaultShared; }
        this.shared = shared;
        //var numvertices = vertices.length;

        if (arguments.length >= 3) {
            this.plane = plane;
        } else {
            this.plane = CSG.Plane.fromVector3Ds(vertices[0].pos, vertices[1].pos, vertices[2].pos);
        }

        if (_CSGDEBUG) {
            this.checkIfConvex();
        }
    };

    // create from an untyped object with identical property names:
    CSG.Polygon.fromObject = function(obj) {
        var vertices = obj.vertices.map(function(v) {
            return CSG.Vertex.fromObject(v);
        });
        var shared = CSG.Polygon.Shared.fromObject(obj.shared);
        var plane = CSG.Plane.fromObject(obj.plane);
        return new CSG.Polygon(vertices, shared, plane);
    };

    CSG.Polygon.prototype = {
        // check whether the polygon is convex (it should be, otherwise we will get unexpected results)
        checkIfConvex: function() {
            if (!CSG.Polygon.verticesConvex(this.vertices, this.plane.normal)) {
                CSG.Polygon.verticesConvex(this.vertices, this.plane.normal);
                throw new Error("Not convex!");
            }
        },

        setColor: function(args) {
            var newshared = CSG.Polygon.Shared.fromColor.apply(this, arguments);
            this.shared = newshared;
            return this;
        },

        getSignedVolume: function() {
            var this$1 = this;

            var signedVolume = 0;
            for (var i = 0; i < this.vertices.length - 2; i++) {
                signedVolume += this$1.vertices[0].pos.dot(this$1.vertices[i+1].pos
                    .cross(this$1.vertices[i+2].pos));
            }
            signedVolume /= 6;
            return signedVolume;
        },

        // Note: could calculate vectors only once to speed up
        getArea: function() {
            var this$1 = this;

            var polygonArea = 0;
            for (var i = 0; i < this.vertices.length - 2; i++) {
                polygonArea += this$1.vertices[i+1].pos.minus(this$1.vertices[0].pos)
                    .cross(this$1.vertices[i+2].pos.minus(this$1.vertices[i+1].pos)).length();
            }
            polygonArea /= 2;
            return polygonArea;
        },


        // accepts array of features to calculate
        // returns array of results
        getTetraFeatures: function(features) {
            var result = [];
            features.forEach(function(feature) {
                if (feature == 'volume') {
                    result.push(this.getSignedVolume());
                } else if (feature == 'area') {
                    result.push(this.getArea());
                }
            }, this);
            return result;
        },

        // Extrude a polygon into the direction offsetvector
        // Returns a CSG object
        extrude: function(offsetvector) {
            var this$1 = this;

            var newpolygons = [];

            var polygon1 = this;
            var direction = polygon1.plane.normal.dot(offsetvector);
            if (direction > 0) {
                polygon1 = polygon1.flipped();
            }
            newpolygons.push(polygon1);
            var polygon2 = polygon1.translate(offsetvector);
            var numvertices = this.vertices.length;
            for (var i = 0; i < numvertices; i++) {
                var sidefacepoints = [];
                var nexti = (i < (numvertices - 1)) ? i + 1 : 0;
                sidefacepoints.push(polygon1.vertices[i].pos);
                sidefacepoints.push(polygon2.vertices[i].pos);
                sidefacepoints.push(polygon2.vertices[nexti].pos);
                sidefacepoints.push(polygon1.vertices[nexti].pos);
                var sidefacepolygon = CSG.Polygon.createFromPoints(sidefacepoints, this$1.shared);
                newpolygons.push(sidefacepolygon);
            }
            polygon2 = polygon2.flipped();
            newpolygons.push(polygon2);
            return CSG.fromPolygons(newpolygons);
        },

        translate: function(offset) {
            return this.transform(CSG.Matrix4x4.translation(offset));
        },

        // returns an array with a CSG.Vector3D (center point) and a radius
        boundingSphere: function() {
            if (!this.cachedBoundingSphere) {
                var box = this.boundingBox();
                var middle = box[0].plus(box[1]).times(0.5);
                var radius3 = box[1].minus(middle);
                var radius = radius3.length();
                this.cachedBoundingSphere = [middle, radius];
            }
            return this.cachedBoundingSphere;
        },

        // returns an array of two CSG.Vector3Ds (minimum coordinates and maximum coordinates)
        boundingBox: function() {
            if (!this.cachedBoundingBox) {
                var minpoint, maxpoint;
                var vertices = this.vertices;
                var numvertices = vertices.length;
                if (numvertices === 0) {
                    minpoint = new CSG.Vector3D(0, 0, 0);
                } else {
                    minpoint = vertices[0].pos;
                }
                maxpoint = minpoint;
                for (var i = 1; i < numvertices; i++) {
                    var point = vertices[i].pos;
                    minpoint = minpoint.min(point);
                    maxpoint = maxpoint.max(point);
                }
                this.cachedBoundingBox = [minpoint, maxpoint];
            }
            return this.cachedBoundingBox;
        },

        flipped: function() {
            var newvertices = this.vertices.map(function(v) {
                return v.flipped();
            });
            newvertices.reverse();
            var newplane = this.plane.flipped();
            return new CSG.Polygon(newvertices, this.shared, newplane);
        },

        // Affine transformation of polygon. Returns a new CSG.Polygon
        transform: function(matrix4x4) {
            var newvertices = this.vertices.map(function(v) {
                return v.transform(matrix4x4);
            });
            var newplane = this.plane.transform(matrix4x4);
            if (matrix4x4.isMirroring()) {
                // need to reverse the vertex order
                // in order to preserve the inside/outside orientation:
                newvertices.reverse();
            }
            return new CSG.Polygon(newvertices, this.shared, newplane);
        },

        toString: function() {
            var result = "Polygon plane: " + this.plane.toString() + "\n";
            this.vertices.map(function(vertex) {
                result += "  " + vertex.toString() + "\n";
            });
            return result;
        },

        // project the 3D polygon onto a plane
        projectToOrthoNormalBasis: function(orthobasis) {
            var points2d = this.vertices.map(function(vertex) {
                return orthobasis.to2D(vertex.pos);
            });
            var result = CAG.fromPointsNoCheck(points2d);
            var area = result.area();
            if (Math.abs(area) < 1e-5) {
                // the polygon was perpendicular to the orthnormal plane. The resulting 2D polygon would be degenerate
                // return an empty area instead:
                result = new CAG();
            } else if (area < 0) {
                result = result.flipped();
            }
            return result;
        },

        /**
         * Creates solid from slices (CSG.Polygon) by generating walls
         * @param {Object} options Solid generating options
         *  - numslices {Number} Number of slices to be generated
         *  - callback(t, slice) {Function} Callback function generating slices.
         *          arguments: t = [0..1], slice = [0..numslices - 1]
         *          return: CSG.Polygon or null to skip
         *  - loop {Boolean} no flats, only walls, it's used to generate solids like a tor
         */
        solidFromSlices: function(options) {
            var this$1 = this;

            var polygons = [],
                csg = null,
                prev = null,
                bottom = null,
                top = null,
                numSlices = 2,
                bLoop = false,
                fnCallback,
                flipped = null;

            if (options) {
                bLoop = Boolean(options['loop']);

                if (options.numslices)
                    { numSlices = options.numslices; }

                if (options.callback)
                    { fnCallback = options.callback; }
            }
            if (!fnCallback) {
                var square = new CSG.Polygon.createFromPoints([
                    [0, 0, 0],
                    [1, 0, 0],
                    [1, 1, 0],
                    [0, 1, 0]
                ]);
                fnCallback = function(t, slice) {
                    return t == 0 || t == 1 ? square.translate([0, 0, t]) : null;
                };
            }
            for (var i = 0, iMax = numSlices - 1; i <= iMax; i++) {
                csg = fnCallback.call(this$1, i / iMax, i);
                if (csg) {
                    if (!(csg instanceof CSG.Polygon)) {
                        throw new Error("CSG.Polygon.solidFromSlices callback error: CSG.Polygon expected");
                    }
                    csg.checkIfConvex();

                    if (prev) { //generate walls
                        if (flipped === null) { //not generated yet
                            flipped = prev.plane.signedDistanceToPoint(csg.vertices[0].pos) < 0;
                        }
                        this$1._addWalls(polygons, prev, csg, flipped);

                    } else { //the first - will be a bottom
                        bottom = csg;
                    }
                    prev = csg;
                } //callback can return null to skip that slice
            }
            top = csg;

            if (bLoop) {
                var bSameTopBottom = bottom.vertices.length == top.vertices.length &&
                    bottom.vertices.every(function(v, index) {
                        return v.pos.equals(top.vertices[index].pos)
                    });
                //if top and bottom are not the same -
                //generate walls between them
                if (!bSameTopBottom) {
                    this._addWalls(polygons, top, bottom, flipped);
                } //else - already generated
            } else {
                //save top and bottom
                //TODO: flip if necessary
                polygons.unshift(flipped ? bottom : bottom.flipped());
                polygons.push(flipped ? top.flipped() : top);
            }
            return CSG.fromPolygons(polygons);
        },
        /**
         *
         * @param walls Array of wall polygons
         * @param bottom Bottom polygon
         * @param top Top polygon
         */
        _addWalls: function(walls, bottom, top, bFlipped) {
            var bottomPoints = bottom.vertices.slice(0), //make a copy
                topPoints = top.vertices.slice(0), //make a copy
                color = top.shared || null;

            //check if bottom perimeter is closed
            if (!bottomPoints[0].pos.equals(bottomPoints[bottomPoints.length - 1].pos)) {
                bottomPoints.push(bottomPoints[0]);
            }

            //check if top perimeter is closed
            if (!topPoints[0].pos.equals(topPoints[topPoints.length - 1].pos)) {
                topPoints.push(topPoints[0]);
            }
            if (bFlipped) {
                bottomPoints = bottomPoints.reverse();
                topPoints = topPoints.reverse();
            }

            var iTopLen = topPoints.length - 1,
                iBotLen = bottomPoints.length - 1,
                iExtra = iTopLen - iBotLen, //how many extra triangles we need
                bMoreTops = iExtra > 0,
                bMoreBottoms = iExtra < 0;

            var aMin = []; //indexes to start extra triangles (polygon with minimal square)
            //init - we need exactly /iExtra/ small triangles
            for (var i = Math.abs(iExtra); i > 0; i--) {
                aMin.push({
                    len: Infinity,
                    index: -1
                });
            }

            var len;
            if (bMoreBottoms) {
                for (var i = 0; i < iBotLen; i++) {
                    len = bottomPoints[i].pos.distanceToSquared(bottomPoints[i + 1].pos);
                    //find the element to replace
                    for (var j = aMin.length - 1; j >= 0; j--) {
                        if (aMin[j].len > len) {
                            aMin[j].len = len;
                            aMin.index = j;
                            break;
                        }
                    } //for
                }
            } else if (bMoreTops) {
                for (var i = 0; i < iTopLen; i++) {
                    len = topPoints[i].pos.distanceToSquared(topPoints[i + 1].pos);
                    //find the element to replace
                    for (var j = aMin.length - 1; j >= 0; j--) {
                        if (aMin[j].len > len) {
                            aMin[j].len = len;
                            aMin.index = j;
                            break;
                        }
                    } //for
                }
            } //if
            //sort by index
            aMin.sort(fnSortByIndex);
            var getTriangle = function addWallsPutTriangle(pointA, pointB, pointC, color) {
                return new CSG.Polygon([pointA, pointB, pointC], color);
                //return bFlipped ? triangle.flipped() : triangle;
            };

            var bpoint = bottomPoints[0],
                tpoint = topPoints[0],
                secondPoint,
                nBotFacet, nTopFacet; //length of triangle facet side
            for (var iB = 0, iT = 0, iMax = iTopLen + iBotLen; iB + iT < iMax;) {
                if (aMin.length) {
                    if (bMoreTops && iT == aMin[0].index) { //one vertex is on the bottom, 2 - on the top
                        secondPoint = topPoints[++iT];
                        //console.log('<<< extra top: ' + secondPoint + ', ' + tpoint + ', bottom: ' + bpoint);
                        walls.push(getTriangle(
                            secondPoint, tpoint, bpoint, color
                        ));
                        tpoint = secondPoint;
                        aMin.shift();
                        continue;
                    } else if (bMoreBottoms && iB == aMin[0].index) {
                        secondPoint = bottomPoints[++iB];
                        walls.push(getTriangle(
                            tpoint, bpoint, secondPoint, color
                        ));
                        bpoint = secondPoint;
                        aMin.shift();
                        continue;
                    }
                }
                //choose the shortest path
                if (iB < iBotLen) { //one vertex is on the top, 2 - on the bottom
                    nBotFacet = tpoint.pos.distanceToSquared(bottomPoints[iB + 1].pos);
                } else {
                    nBotFacet = Infinity;
                }
                if (iT < iTopLen) { //one vertex is on the bottom, 2 - on the top
                    nTopFacet = bpoint.pos.distanceToSquared(topPoints[iT + 1].pos);
                } else {
                    nTopFacet = Infinity;
                }
                if (nBotFacet <= nTopFacet) {
                    secondPoint = bottomPoints[++iB];
                    walls.push(getTriangle(
                        tpoint, bpoint, secondPoint, color
                    ));
                    bpoint = secondPoint;
                } else if (iT < iTopLen) { //nTopFacet < Infinity
                    secondPoint = topPoints[++iT];
                    //console.log('<<< top: ' + secondPoint + ', ' + tpoint + ', bottom: ' + bpoint);
                    walls.push(getTriangle(
                        secondPoint, tpoint, bpoint, color
                    ));
                    tpoint = secondPoint;
                }
            }
            return walls;
        }
    };

    CSG.Polygon.verticesConvex = function(vertices, planenormal) {
        var numvertices = vertices.length;
        if (numvertices > 2) {
            var prevprevpos = vertices[numvertices - 2].pos;
            var prevpos = vertices[numvertices - 1].pos;
            for (var i = 0; i < numvertices; i++) {
                var pos = vertices[i].pos;
                if (!CSG.Polygon.isConvexPoint(prevprevpos, prevpos, pos, planenormal)) {
                    return false;
                }
                prevprevpos = prevpos;
                prevpos = pos;
            }
        }
        return true;
    };

    // Create a polygon from the given points
    CSG.Polygon.createFromPoints = function(points, shared, plane) {
        var normal;
        if (arguments.length < 3) {
            // initially set a dummy vertex normal:
            normal = new CSG.Vector3D(0, 0, 0);
        } else {
            normal = plane.normal;
        }
        var vertices = [];
        points.map(function(p) {
            var vec = new CSG.Vector3D(p);
            var vertex = new CSG.Vertex(vec);
            vertices.push(vertex);
        });
        var polygon;
        if (arguments.length < 3) {
            polygon = new CSG.Polygon(vertices, shared);
        } else {
            polygon = new CSG.Polygon(vertices, shared, plane);
        }
        return polygon;
    };

    // calculate whether three points form a convex corner
    //  prevpoint, point, nextpoint: the 3 coordinates (CSG.Vector3D instances)
    //  normal: the normal vector of the plane
    CSG.Polygon.isConvexPoint = function(prevpoint, point, nextpoint, normal) {
        var crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point));
        var crossdotnormal = crossproduct.dot(normal);
        return (crossdotnormal >= 0);
    };

    CSG.Polygon.isStrictlyConvexPoint = function(prevpoint, point, nextpoint, normal) {
        var crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point));
        var crossdotnormal = crossproduct.dot(normal);
        return (crossdotnormal >= 1e-5);
    };

    // # class CSG.Polygon.Shared
    // Holds the shared properties for each polygon (currently only color)
    // Constructor expects a 4 element array [r,g,b,a], values from 0 to 1, or null
    CSG.Polygon.Shared = function(color) {
        if(color !== null)
        {
            if (color.length != 4) {
                throw new Error("Expecting 4 element array");
            }
        }
        this.color = color;
    };

    CSG.Polygon.Shared.fromObject = function(obj) {
        return new CSG.Polygon.Shared(obj.color);
    };

    // Create CSG.Polygon.Shared from a color, can be called as follows:
    // var s = CSG.Polygon.Shared.fromColor(r,g,b [,a])
    // var s = CSG.Polygon.Shared.fromColor([r,g,b [,a]])
    CSG.Polygon.Shared.fromColor = function(args) {
        var arguments$1 = arguments;

        var color;
        if(arguments.length == 1) {
            color = arguments[0].slice(); // make deep copy
        }
        else {
            color = [];
            for(var i=0; i < arguments.length; i++) {
                color.push(arguments$1[i]);
            }
        }
        if(color.length == 3) {
            color.push(1);
        } else if(color.length != 4) {
            throw new Error("setColor expects either an array with 3 or 4 elements, or 3 or 4 parameters.");
        }
        return new CSG.Polygon.Shared(color);
    };

    CSG.Polygon.Shared.prototype = {
        getTag: function() {
            var result = this.tag;
            if (!result) {
                result = CSG.getTag();
                this.tag = result;
            }
            return result;
        },
        // get a string uniquely identifying this object
        getHash: function() {
            if (!this.color) { return "null"; }
            return this.color.join("/");
        }
    };

    CSG.Polygon.defaultShared = new CSG.Polygon.Shared(null);

    // # class PolygonTreeNode
    // This class manages hierarchical splits of polygons
    // At the top is a root node which doesn hold a polygon, only child PolygonTreeNodes
    // Below that are zero or more 'top' nodes; each holds a polygon. The polygons can be in different planes
    // splitByPlane() splits a node by a plane. If the plane intersects the polygon, two new child nodes
    // are created holding the splitted polygon.
    // getPolygons() retrieves the polygon from the tree. If for PolygonTreeNode the polygon is split but
    // the two split parts (child nodes) are still intact, then the unsplit polygon is returned.
    // This ensures that we can safely split a polygon into many fragments. If the fragments are untouched,
    //  getPolygons() will return the original unsplit polygon instead of the fragments.
    // remove() removes a polygon from the tree. Once a polygon is removed, the parent polygons are invalidated
    // since they are no longer intact.
    // constructor creates the root node:
    CSG.PolygonTreeNode = function() {
        this.parent = null;
        this.children = [];
        this.polygon = null;
        this.removed = false;
    };

    CSG.PolygonTreeNode.prototype = {
        // fill the tree with polygons. Should be called on the root node only; child nodes must
        // always be a derivate (split) of the parent node.
        addPolygons: function(polygons) {
            if (!this.isRootNode())
            // new polygons can only be added to root node; children can only be splitted polygons
                { throw new Error("Assertion failed"); }
            var _this = this;
            polygons.map(function(polygon) {
                _this.addChild(polygon);
            });
        },

        // remove a node
        // - the siblings become toplevel nodes
        // - the parent is removed recursively
        remove: function() {
            if (!this.removed) {
                this.removed = true;

                if (_CSGDEBUG) {
                    if (this.isRootNode()) { throw new Error("Assertion failed"); } // can't remove root node
                    if (this.children.length) { throw new Error("Assertion failed"); } // we shouldn't remove nodes with children
                }

                // remove ourselves from the parent's children list:
                var parentschildren = this.parent.children;
                var i = parentschildren.indexOf(this);
                if (i < 0) { throw new Error("Assertion failed"); }
                parentschildren.splice(i, 1);

                // invalidate the parent's polygon, and of all parents above it:
                this.parent.recursivelyInvalidatePolygon();
            }
        },

        isRemoved: function() {
            return this.removed;
        },

        isRootNode: function() {
            return !this.parent;
        },

        // invert all polygons in the tree. Call on the root node
        invert: function() {
            if (!this.isRootNode()) { throw new Error("Assertion failed"); } // can only call this on the root node
            this.invertSub();
        },

        getPolygon: function() {
            if (!this.polygon) { throw new Error("Assertion failed"); } // doesn't have a polygon, which means that it has been broken down
            return this.polygon;
        },

        getPolygons: function(result) {
            var children = [this];
            var queue = [children];
            var i, j, l, node;
            for (i = 0; i < queue.length; ++i ) { // queue size can change in loop, don't cache length
                children = queue[i];
                for (j = 0, l = children.length; j < l; j++) { // ok to cache length
                    node = children[j];
                    if (node.polygon) {
                        // the polygon hasn't been broken yet. We can ignore the children and return our polygon:
                        result.push(node.polygon);
                    } else {
                        // our polygon has been split up and broken, so gather all subpolygons from the children
                        queue.push(node.children);
                    }
                }
            }
        },

        // split the node by a plane; add the resulting nodes to the frontnodes and backnodes array
        // If the plane doesn't intersect the polygon, the 'this' object is added to one of the arrays
        // If the plane does intersect the polygon, two new child nodes are created for the front and back fragments,
        //  and added to both arrays.
        splitByPlane: function(plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes) {
            if (this.children.length) {
                var queue = [this.children], i, j, l, node, nodes;
                for (i = 0; i < queue.length; i++) { // queue.length can increase, do not cache
                    nodes = queue[i];
                    for (j = 0, l = nodes.length; j < l; j++) { // ok to cache length
                        node = nodes[j];
                        if (node.children.length) {
                            queue.push(node.children);
                        } else {
                            // no children. Split the polygon:
                            node._splitByPlane(plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes);
                        }
                    }
                }
            } else {
                this._splitByPlane(plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes);
            }
        },

        // only to be called for nodes with no children
        _splitByPlane: function (plane, coplanarfrontnodes, coplanarbacknodes, frontnodes, backnodes) {
            var polygon = this.polygon;
            if (polygon) {
                var bound = polygon.boundingSphere();
                var sphereradius = bound[1] + 1e-4;
                var planenormal = plane.normal;
                var spherecenter = bound[0];
                var d = planenormal.dot(spherecenter) - plane.w;
                if (d > sphereradius) {
                    frontnodes.push(this);
                } else if (d < -sphereradius) {
                    backnodes.push(this);
                } else {
                    var splitresult = plane.splitPolygon(polygon);
                    switch (splitresult.type) {
                        case 0:
                            // coplanar front:
                            coplanarfrontnodes.push(this);
                            break;

                        case 1:
                            // coplanar back:
                            coplanarbacknodes.push(this);
                            break;

                        case 2:
                            // front:
                            frontnodes.push(this);
                            break;

                        case 3:
                            // back:
                            backnodes.push(this);
                            break;

                        case 4:
                            // spanning:
                            if (splitresult.front) {
                                var frontnode = this.addChild(splitresult.front);
                                frontnodes.push(frontnode);
                            }
                            if (splitresult.back) {
                                var backnode = this.addChild(splitresult.back);
                                backnodes.push(backnode);
                            }
                            break;
                    }
                }
            }
        },


        // PRIVATE methods from here:
        // add child to a node
        // this should be called whenever the polygon is split
        // a child should be created for every fragment of the split polygon
        // returns the newly created child
        addChild: function(polygon) {
            var newchild = new CSG.PolygonTreeNode();
            newchild.parent = this;
            newchild.polygon = polygon;
            this.children.push(newchild);
            return newchild;
        },

        invertSub: function() {
            var children = [this];
            var queue = [children];
            var i, j, l, node;
            for (i = 0; i < queue.length; i++) {
                children = queue[i];
                for (j = 0, l = children.length; j < l; j++) {
                    node = children[j];
                    if (node.polygon) {
                        node.polygon = node.polygon.flipped();
                    }
                    queue.push(node.children);
                }
            }
        },

        recursivelyInvalidatePolygon: function() {
            var node = this;
            while (node.polygon) {
                node.polygon = null;
                if (node.parent) {
                    node = node.parent;
                }
            }
        }
    };



    // # class Tree
    // This is the root of a BSP tree
    // We are using this separate class for the root of the tree, to hold the PolygonTreeNode root
    // The actual tree is kept in this.rootnode
    CSG.Tree = function(polygons) {
        this.polygonTree = new CSG.PolygonTreeNode();
        this.rootnode = new CSG.Node(null);
        if (polygons) { this.addPolygons(polygons); }
    };

    CSG.Tree.prototype = {
        invert: function() {
            this.polygonTree.invert();
            this.rootnode.invert();
        },

        // Remove all polygons in this BSP tree that are inside the other BSP tree
        // `tree`.
        clipTo: function(tree, alsoRemovecoplanarFront) {
            alsoRemovecoplanarFront = alsoRemovecoplanarFront ? true : false;
            this.rootnode.clipTo(tree, alsoRemovecoplanarFront);
        },

        allPolygons: function() {
            var result = [];
            this.polygonTree.getPolygons(result);
            return result;
        },

        addPolygons: function(polygons) {
            var _this = this;
            var polygontreenodes = polygons.map(function(p) {
                return _this.polygonTree.addChild(p);
            });
            this.rootnode.addPolygonTreeNodes(polygontreenodes);
        }
    };

    // # class Node
    // Holds a node in a BSP tree. A BSP tree is built from a collection of polygons
    // by picking a polygon to split along.
    // Polygons are not stored directly in the tree, but in PolygonTreeNodes, stored in
    // this.polygontreenodes. Those PolygonTreeNodes are children of the owning
    // CSG.Tree.polygonTree
    // This is not a leafy BSP tree since there is
    // no distinction between internal and leaf nodes.
    CSG.Node = function(parent) {
        this.plane = null;
        this.front = null;
        this.back = null;
        this.polygontreenodes = [];
        this.parent = parent;
    };

    CSG.Node.prototype = {
        // Convert solid space to empty space and empty space to solid space.
        invert: function() {
            var queue = [this];
            var i, node;
            for (var i = 0; i < queue.length; i++) {
                node = queue[i];
                if(node.plane) { node.plane = node.plane.flipped(); }
                if(node.front) { queue.push(node.front); }
                if(node.back) { queue.push(node.back); }
                var temp = node.front;
                node.front = node.back;
                node.back = temp;
            }
        },

        // clip polygontreenodes to our plane
        // calls remove() for all clipped PolygonTreeNodes
        clipPolygons: function(polygontreenodes, alsoRemovecoplanarFront) {
            var args = {'node': this, 'polygontreenodes': polygontreenodes };
            var node;
            var stack = [];

            do {
                node = args.node;
                polygontreenodes = args.polygontreenodes;

                // begin "function"
                if(node.plane) {
                    var backnodes = [];
                    var frontnodes = [];
                    var coplanarfrontnodes = alsoRemovecoplanarFront ? backnodes : frontnodes;
                    var plane = node.plane;
                    var numpolygontreenodes = polygontreenodes.length;
                    for(i = 0; i < numpolygontreenodes; i++) {
                        var node1 = polygontreenodes[i];
                        if(!node1.isRemoved()) {
                            node1.splitByPlane(plane, coplanarfrontnodes, backnodes, frontnodes, backnodes);
                        }
                    }

                    if(node.front && (frontnodes.length > 0)) {
                        stack.push({'node': node.front, 'polygontreenodes': frontnodes});
                    }
                    var numbacknodes = backnodes.length;
                    if (node.back && (numbacknodes > 0)) {
                        stack.push({'node': node.back, 'polygontreenodes': backnodes});
                    } else {
                        // there's nothing behind this plane. Delete the nodes behind this plane:
                        for (var i = 0; i < numbacknodes; i++) {
                            backnodes[i].remove();
                        }
                    }
                }
                args = stack.pop();
            } while (typeof(args) !== 'undefined');
        },

        // Remove all polygons in this BSP tree that are inside the other BSP tree
        // `tree`.
        clipTo: function(tree, alsoRemovecoplanarFront) {
            var node = this, stack = [];
            do {
                if(node.polygontreenodes.length > 0) {
                    tree.rootnode.clipPolygons(node.polygontreenodes, alsoRemovecoplanarFront);
                }
                if(node.front) { stack.push(node.front); }
                if(node.back) { stack.push(node.back); }
                node = stack.pop();
            } while(typeof(node) !== 'undefined');
        },

        addPolygonTreeNodes: function(polygontreenodes) {
            var args = {'node': this, 'polygontreenodes': polygontreenodes };
            var node;
            var stack = [];
            do {
                node = args.node;
                polygontreenodes = args.polygontreenodes;

                if (polygontreenodes.length === 0) {
                    args = stack.pop();
                    continue;
                }
                var _this = node;
                if (!node.plane) {
                    var bestplane = polygontreenodes[0].getPolygon().plane;
                    node.plane = bestplane;
                }
                var frontnodes = [];
                var backnodes = [];

                for (var i = 0, n = polygontreenodes.length ; i < n; ++i) {
                    polygontreenodes[i].splitByPlane(_this.plane, _this.polygontreenodes, backnodes, frontnodes, backnodes);
                }

                if (frontnodes.length > 0) {
                    if (!node.front) { node.front = new CSG.Node(node); }
                    stack.push({'node': node.front, 'polygontreenodes': frontnodes});
                }
                if (backnodes.length > 0) {
                    if (!node.back) { node.back = new CSG.Node(node); }
                    stack.push({'node': node.back, 'polygontreenodes': backnodes});
                }

                args = stack.pop();
            } while (typeof(args) !== 'undefined');
        },

        getParentPlaneNormals: function(normals, maxdepth) {
            if (maxdepth > 0) {
                if (this.parent) {
                    normals.push(this.parent.plane.normal);
                    this.parent.getParentPlaneNormals(normals, maxdepth - 1);
                }
            }
        }
    };

    //////////
    // # class Matrix4x4:
    // Represents a 4x4 matrix. Elements are specified in row order
    CSG.Matrix4x4 = function(elements) {
        if (arguments.length >= 1) {
            this.elements = elements;
        } else {
            // if no arguments passed: create unity matrix
            this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    };

    CSG.Matrix4x4.prototype = {
        plus: function(m) {
            var this$1 = this;

            var r = [];
            for (var i = 0; i < 16; i++) {
                r[i] = this$1.elements[i] + m.elements[i];
            }
            return new CSG.Matrix4x4(r);
        },

        minus: function(m) {
            var this$1 = this;

            var r = [];
            for (var i = 0; i < 16; i++) {
                r[i] = this$1.elements[i] - m.elements[i];
            }
            return new CSG.Matrix4x4(r);
        },

        // right multiply by another 4x4 matrix:
        multiply: function(m) {
            // cache elements in local variables, for speedup:
            var this0 = this.elements[0];
            var this1 = this.elements[1];
            var this2 = this.elements[2];
            var this3 = this.elements[3];
            var this4 = this.elements[4];
            var this5 = this.elements[5];
            var this6 = this.elements[6];
            var this7 = this.elements[7];
            var this8 = this.elements[8];
            var this9 = this.elements[9];
            var this10 = this.elements[10];
            var this11 = this.elements[11];
            var this12 = this.elements[12];
            var this13 = this.elements[13];
            var this14 = this.elements[14];
            var this15 = this.elements[15];
            var m0 = m.elements[0];
            var m1 = m.elements[1];
            var m2 = m.elements[2];
            var m3 = m.elements[3];
            var m4 = m.elements[4];
            var m5 = m.elements[5];
            var m6 = m.elements[6];
            var m7 = m.elements[7];
            var m8 = m.elements[8];
            var m9 = m.elements[9];
            var m10 = m.elements[10];
            var m11 = m.elements[11];
            var m12 = m.elements[12];
            var m13 = m.elements[13];
            var m14 = m.elements[14];
            var m15 = m.elements[15];

            var result = [];
            result[0] = this0 * m0 + this1 * m4 + this2 * m8 + this3 * m12;
            result[1] = this0 * m1 + this1 * m5 + this2 * m9 + this3 * m13;
            result[2] = this0 * m2 + this1 * m6 + this2 * m10 + this3 * m14;
            result[3] = this0 * m3 + this1 * m7 + this2 * m11 + this3 * m15;
            result[4] = this4 * m0 + this5 * m4 + this6 * m8 + this7 * m12;
            result[5] = this4 * m1 + this5 * m5 + this6 * m9 + this7 * m13;
            result[6] = this4 * m2 + this5 * m6 + this6 * m10 + this7 * m14;
            result[7] = this4 * m3 + this5 * m7 + this6 * m11 + this7 * m15;
            result[8] = this8 * m0 + this9 * m4 + this10 * m8 + this11 * m12;
            result[9] = this8 * m1 + this9 * m5 + this10 * m9 + this11 * m13;
            result[10] = this8 * m2 + this9 * m6 + this10 * m10 + this11 * m14;
            result[11] = this8 * m3 + this9 * m7 + this10 * m11 + this11 * m15;
            result[12] = this12 * m0 + this13 * m4 + this14 * m8 + this15 * m12;
            result[13] = this12 * m1 + this13 * m5 + this14 * m9 + this15 * m13;
            result[14] = this12 * m2 + this13 * m6 + this14 * m10 + this15 * m14;
            result[15] = this12 * m3 + this13 * m7 + this14 * m11 + this15 * m15;
            return new CSG.Matrix4x4(result);
        },

        clone: function() {
            var elements = this.elements.map(function(p) {
                return p;
            });
            return new CSG.Matrix4x4(elements);
        },

        // Right multiply the matrix by a CSG.Vector3D (interpreted as 3 row, 1 column)
        // (result = M*v)
        // Fourth element is taken as 1
        rightMultiply1x3Vector: function(v) {
            var v0 = v._x;
            var v1 = v._y;
            var v2 = v._z;
            var v3 = 1;
            var x = v0 * this.elements[0] + v1 * this.elements[1] + v2 * this.elements[2] + v3 * this.elements[3];
            var y = v0 * this.elements[4] + v1 * this.elements[5] + v2 * this.elements[6] + v3 * this.elements[7];
            var z = v0 * this.elements[8] + v1 * this.elements[9] + v2 * this.elements[10] + v3 * this.elements[11];
            var w = v0 * this.elements[12] + v1 * this.elements[13] + v2 * this.elements[14] + v3 * this.elements[15];
            // scale such that fourth element becomes 1:
            if (w != 1) {
                var invw = 1.0 / w;
                x *= invw;
                y *= invw;
                z *= invw;
            }
            return new CSG.Vector3D(x, y, z);
        },

        // Multiply a CSG.Vector3D (interpreted as 3 column, 1 row) by this matrix
        // (result = v*M)
        // Fourth element is taken as 1
        leftMultiply1x3Vector: function(v) {
            var v0 = v._x;
            var v1 = v._y;
            var v2 = v._z;
            var v3 = 1;
            var x = v0 * this.elements[0] + v1 * this.elements[4] + v2 * this.elements[8] + v3 * this.elements[12];
            var y = v0 * this.elements[1] + v1 * this.elements[5] + v2 * this.elements[9] + v3 * this.elements[13];
            var z = v0 * this.elements[2] + v1 * this.elements[6] + v2 * this.elements[10] + v3 * this.elements[14];
            var w = v0 * this.elements[3] + v1 * this.elements[7] + v2 * this.elements[11] + v3 * this.elements[15];
            // scale such that fourth element becomes 1:
            if (w != 1) {
                var invw = 1.0 / w;
                x *= invw;
                y *= invw;
                z *= invw;
            }
            return new CSG.Vector3D(x, y, z);
        },

        // Right multiply the matrix by a CSG.Vector2D (interpreted as 2 row, 1 column)
        // (result = M*v)
        // Fourth element is taken as 1
        rightMultiply1x2Vector: function(v) {
            var v0 = v.x;
            var v1 = v.y;
            var v2 = 0;
            var v3 = 1;
            var x = v0 * this.elements[0] + v1 * this.elements[1] + v2 * this.elements[2] + v3 * this.elements[3];
            var y = v0 * this.elements[4] + v1 * this.elements[5] + v2 * this.elements[6] + v3 * this.elements[7];
            var z = v0 * this.elements[8] + v1 * this.elements[9] + v2 * this.elements[10] + v3 * this.elements[11];
            var w = v0 * this.elements[12] + v1 * this.elements[13] + v2 * this.elements[14] + v3 * this.elements[15];
            // scale such that fourth element becomes 1:
            if (w != 1) {
                var invw = 1.0 / w;
                x *= invw;
                y *= invw;
                z *= invw;
            }
            return new CSG.Vector2D(x, y);
        },

        // Multiply a CSG.Vector2D (interpreted as 2 column, 1 row) by this matrix
        // (result = v*M)
        // Fourth element is taken as 1
        leftMultiply1x2Vector: function(v) {
            var v0 = v.x;
            var v1 = v.y;
            var v2 = 0;
            var v3 = 1;
            var x = v0 * this.elements[0] + v1 * this.elements[4] + v2 * this.elements[8] + v3 * this.elements[12];
            var y = v0 * this.elements[1] + v1 * this.elements[5] + v2 * this.elements[9] + v3 * this.elements[13];
            var z = v0 * this.elements[2] + v1 * this.elements[6] + v2 * this.elements[10] + v3 * this.elements[14];
            var w = v0 * this.elements[3] + v1 * this.elements[7] + v2 * this.elements[11] + v3 * this.elements[15];
            // scale such that fourth element becomes 1:
            if (w != 1) {
                var invw = 1.0 / w;
                x *= invw;
                y *= invw;
                z *= invw;
            }
            return new CSG.Vector2D(x, y);
        },

        // determine whether this matrix is a mirroring transformation
        isMirroring: function() {
            var u = new CSG.Vector3D(this.elements[0], this.elements[4], this.elements[8]);
            var v = new CSG.Vector3D(this.elements[1], this.elements[5], this.elements[9]);
            var w = new CSG.Vector3D(this.elements[2], this.elements[6], this.elements[10]);

            // for a true orthogonal, non-mirrored base, u.cross(v) == w
            // If they have an opposite direction then we are mirroring
            var mirrorvalue = u.cross(v).dot(w);
            var ismirror = (mirrorvalue < 0);
            return ismirror;
        }
    };

    // return the unity matrix
    CSG.Matrix4x4.unity = function() {
        return new CSG.Matrix4x4();
    };

    // Create a rotation matrix for rotating around the x axis
    CSG.Matrix4x4.rotationX = function(degrees) {
        var radians = degrees * Math.PI * (1.0 / 180.0);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var els = [
            1, 0, 0, 0, 0, cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1
        ];
        return new CSG.Matrix4x4(els);
    };

    // Create a rotation matrix for rotating around the y axis
    CSG.Matrix4x4.rotationY = function(degrees) {
        var radians = degrees * Math.PI * (1.0 / 180.0);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var els = [
            cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1
        ];
        return new CSG.Matrix4x4(els);
    };

    // Create a rotation matrix for rotating around the z axis
    CSG.Matrix4x4.rotationZ = function(degrees) {
        var radians = degrees * Math.PI * (1.0 / 180.0);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var els = [
            cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
        ];
        return new CSG.Matrix4x4(els);
    };

    // Matrix for rotation about arbitrary point and axis
    CSG.Matrix4x4.rotation = function(rotationCenter, rotationAxis, degrees) {
        rotationCenter = new CSG.Vector3D(rotationCenter);
        rotationAxis = new CSG.Vector3D(rotationAxis);
        var rotationPlane = CSG.Plane.fromNormalAndPoint(rotationAxis, rotationCenter);
        var orthobasis = new CSG.OrthoNormalBasis(rotationPlane);
        var transformation = CSG.Matrix4x4.translation(rotationCenter.negated());
        transformation = transformation.multiply(orthobasis.getProjectionMatrix());
        transformation = transformation.multiply(CSG.Matrix4x4.rotationZ(degrees));
        transformation = transformation.multiply(orthobasis.getInverseProjectionMatrix());
        transformation = transformation.multiply(CSG.Matrix4x4.translation(rotationCenter));
        return transformation;
    };

    // Create an affine matrix for translation:
    CSG.Matrix4x4.translation = function(v) {
        // parse as CSG.Vector3D, so we can pass an array or a CSG.Vector3D
        var vec = new CSG.Vector3D(v);
        var els = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, vec.x, vec.y, vec.z, 1];
        return new CSG.Matrix4x4(els);
    };

    // Create an affine matrix for mirroring into an arbitrary plane:
    CSG.Matrix4x4.mirroring = function(plane) {
        var nx = plane.normal.x;
        var ny = plane.normal.y;
        var nz = plane.normal.z;
        var w = plane.w;
        var els = [
            (1.0 - 2.0 * nx * nx), (-2.0 * ny * nx), (-2.0 * nz * nx), 0,
            (-2.0 * nx * ny), (1.0 - 2.0 * ny * ny), (-2.0 * nz * ny), 0,
            (-2.0 * nx * nz), (-2.0 * ny * nz), (1.0 - 2.0 * nz * nz), 0,
            (2.0 * nx * w), (2.0 * ny * w), (2.0 * nz * w), 1
        ];
        return new CSG.Matrix4x4(els);
    };

    // Create an affine matrix for scaling:
    CSG.Matrix4x4.scaling = function(v) {
        // parse as CSG.Vector3D, so we can pass an array or a CSG.Vector3D
        var vec = new CSG.Vector3D(v);
        var els = [
            vec.x, 0, 0, 0, 0, vec.y, 0, 0, 0, 0, vec.z, 0, 0, 0, 0, 1
        ];
        return new CSG.Matrix4x4(els);
    };

    ///////////////////////////////////////////////////
    // # class Vector2D:
    // Represents a 2 element vector
    CSG.Vector2D = function(x, y) {
        if (arguments.length == 2) {
            this._x = parseFloat(x);
            this._y = parseFloat(y);
        } else {
            var ok = true;
            if (arguments.length == 1) {
                if (typeof(x) == "object") {
                    if (x instanceof CSG.Vector2D) {
                        this._x = x._x;
                        this._y = x._y;
                    } else if (x instanceof Array) {
                        this._x = parseFloat(x[0]);
                        this._y = parseFloat(x[1]);
                    } else if (('x' in x) && ('y' in x)) {
                        this._x = parseFloat(x.x);
                        this._y = parseFloat(x.y);
                    } else { ok = false; }
                } else {
                    var v = parseFloat(x);
                    this._x = v;
                    this._y = v;
                }
            } else { ok = false; }
            if (ok) {
                if ((!CSG.IsFloat(this._x)) || (!CSG.IsFloat(this._y))) { ok = false; }
            }
            if (!ok) {
                throw new Error("wrong arguments");
            }
        }
    };

    CSG.Vector2D.fromAngle = function(radians) {
        return CSG.Vector2D.fromAngleRadians(radians);
    };

    CSG.Vector2D.fromAngleDegrees = function(degrees) {
        var radians = Math.PI * degrees / 180;
        return CSG.Vector2D.fromAngleRadians(radians);
    };

    CSG.Vector2D.fromAngleRadians = function(radians) {
        return CSG.Vector2D.Create(Math.cos(radians), Math.sin(radians));
    };

    // This does the same as new CSG.Vector2D(x,y) but it doesn't go through the constructor
    // and the parameters are not validated. Is much faster.
    CSG.Vector2D.Create = function(x, y) {
        var result = Object.create(CSG.Vector2D.prototype);
        result._x = x;
        result._y = y;
        return result;
    };

    CSG.Vector2D.prototype = {
        get x() {
            return this._x;
        },
        get y() {
            return this._y;
        },

        set x(v) {
            throw new Error("Vector2D is immutable");
        },
        set y(v) {
            throw new Error("Vector2D is immutable");
        },

        // extend to a 3D vector by adding a z coordinate:
        toVector3D: function(z) {
            return new CSG.Vector3D(this._x, this._y, z);
        },

        equals: function(a) {
            return (this._x == a._x) && (this._y == a._y);
        },

        clone: function() {
            return CSG.Vector2D.Create(this._x, this._y);
        },

        negated: function() {
            return CSG.Vector2D.Create(-this._x, -this._y);
        },

        plus: function(a) {
            return CSG.Vector2D.Create(this._x + a._x, this._y + a._y);
        },

        minus: function(a) {
            return CSG.Vector2D.Create(this._x - a._x, this._y - a._y);
        },

        times: function(a) {
            return CSG.Vector2D.Create(this._x * a, this._y * a);
        },

        dividedBy: function(a) {
            return CSG.Vector2D.Create(this._x / a, this._y / a);
        },

        dot: function(a) {
            return this._x * a._x + this._y * a._y;
        },

        lerp: function(a, t) {
            return this.plus(a.minus(this).times(t));
        },

        length: function() {
            return Math.sqrt(this.dot(this));
        },

        distanceTo: function(a) {
            return this.minus(a).length();
        },

        distanceToSquared: function(a) {
            return this.minus(a).lengthSquared();
        },

        lengthSquared: function() {
            return this.dot(this);
        },

        unit: function() {
            return this.dividedBy(this.length());
        },

        cross: function(a) {
            return this._x * a._y - this._y * a._x;
        },

        // returns the vector rotated by 90 degrees clockwise
        normal: function() {
            return CSG.Vector2D.Create(this._y, -this._x);
        },

        // Right multiply by a 4x4 matrix (the vector is interpreted as a row vector)
        // Returns a new CSG.Vector2D
        multiply4x4: function(matrix4x4) {
            return matrix4x4.leftMultiply1x2Vector(this);
        },

        transform: function(matrix4x4) {
            return matrix4x4.leftMultiply1x2Vector(this);
        },

        angle: function() {
            return this.angleRadians();
        },

        angleDegrees: function() {
            var radians = this.angleRadians();
            return 180 * radians / Math.PI;
        },

        angleRadians: function() {
            // y=sin, x=cos
            return Math.atan2(this._y, this._x);
        },

        min: function(p) {
            return CSG.Vector2D.Create(
                Math.min(this._x, p._x), Math.min(this._y, p._y));
        },

        max: function(p) {
            return CSG.Vector2D.Create(
                Math.max(this._x, p._x), Math.max(this._y, p._y));
        },

        toString: function() {
            return "(" + this._x.toFixed(2) + ", " + this._y.toFixed(2) + ")";
        },

        abs: function() {
            return CSG.Vector2D.Create(Math.abs(this._x), Math.abs(this._y));
        },
    };


    // # class Line2D
    // Represents a directional line in 2D space
    // A line is parametrized by its normal vector (perpendicular to the line, rotated 90 degrees counter clockwise)
    // and w. The line passes through the point <normal>.times(w).
    // normal must be a unit vector!
    // Equation: p is on line if normal.dot(p)==w
    CSG.Line2D = function(normal, w) {
        normal = new CSG.Vector2D(normal);
        w = parseFloat(w);
        var l = normal.length();
        // normalize:
        w *= l;
        normal = normal.times(1.0 / l);
        this.normal = normal;
        this.w = w;
    };

    CSG.Line2D.fromPoints = function(p1, p2) {
        p1 = new CSG.Vector2D(p1);
        p2 = new CSG.Vector2D(p2);
        var direction = p2.minus(p1);
        var normal = direction.normal().negated().unit();
        var w = p1.dot(normal);
        return new CSG.Line2D(normal, w);
    };

    CSG.Line2D.prototype = {
        // same line but opposite direction:
        reverse: function() {
            return new CSG.Line2D(this.normal.negated(), -this.w);
        },

        equals: function(l) {
            return (l.normal.equals(this.normal) && (l.w == this.w));
        },

        origin: function() {
            return this.normal.times(this.w);
        },

        direction: function() {
            return this.normal.normal();
        },

        xAtY: function(y) {
            // (py == y) && (normal * p == w)
            // -> px = (w - normal._y * y) / normal.x
            var x = (this.w - this.normal._y * y) / this.normal.x;
            return x;
        },

        absDistanceToPoint: function(point) {
            point = new CSG.Vector2D(point);
            var point_projected = point.dot(this.normal);
            var distance = Math.abs(point_projected - this.w);
            return distance;
        },
        /*FIXME: has error - origin is not defined, the method is never used
         closestPoint: function(point) {
             point = new CSG.Vector2D(point);
             var vector = point.dot(this.direction());
             return origin.plus(vector);
         },
         */

        // intersection between two lines, returns point as Vector2D
        intersectWithLine: function(line2d) {
            var point = CSG.solve2Linear(this.normal.x, this.normal.y, line2d.normal.x, line2d.normal.y, this.w, line2d.w);
            point = new CSG.Vector2D(point); // make  vector2d
            return point;
        },

        transform: function(matrix4x4) {
            var origin = new CSG.Vector2D(0, 0);
            var pointOnPlane = this.normal.times(this.w);
            var neworigin = origin.multiply4x4(matrix4x4);
            var neworiginPlusNormal = this.normal.multiply4x4(matrix4x4);
            var newnormal = neworiginPlusNormal.minus(neworigin);
            var newpointOnPlane = pointOnPlane.multiply4x4(matrix4x4);
            var neww = newnormal.dot(newpointOnPlane);
            return new CSG.Line2D(newnormal, neww);
        }
    };

    // # class Line3D
    // Represents a line in 3D space
    // direction must be a unit vector
    // point is a random point on the line
    CSG.Line3D = function(point, direction) {
        point = new CSG.Vector3D(point);
        direction = new CSG.Vector3D(direction);
        this.point = point;
        this.direction = direction.unit();
    };

    CSG.Line3D.fromPoints = function(p1, p2) {
        p1 = new CSG.Vector3D(p1);
        p2 = new CSG.Vector3D(p2);
        var direction = p2.minus(p1);
        return new CSG.Line3D(p1, direction);
    };

    CSG.Line3D.fromPlanes = function(p1, p2) {
        var direction = p1.normal.cross(p2.normal);
        var l = direction.length();
        if (l < 1e-10) {
            throw new Error("Parallel planes");
        }
        direction = direction.times(1.0 / l);

        var mabsx = Math.abs(direction.x);
        var mabsy = Math.abs(direction.y);
        var mabsz = Math.abs(direction.z);
        var origin;
        if ((mabsx >= mabsy) && (mabsx >= mabsz)) {
            // direction vector is mostly pointing towards x
            // find a point p for which x is zero:
            var r = CSG.solve2Linear(p1.normal.y, p1.normal.z, p2.normal.y, p2.normal.z, p1.w, p2.w);
            origin = new CSG.Vector3D(0, r[0], r[1]);
        } else if ((mabsy >= mabsx) && (mabsy >= mabsz)) {
            // find a point p for which y is zero:
            var r = CSG.solve2Linear(p1.normal.x, p1.normal.z, p2.normal.x, p2.normal.z, p1.w, p2.w);
            origin = new CSG.Vector3D(r[0], 0, r[1]);
        } else {
            // find a point p for which z is zero:
            var r = CSG.solve2Linear(p1.normal.x, p1.normal.y, p2.normal.x, p2.normal.y, p1.w, p2.w);
            origin = new CSG.Vector3D(r[0], r[1], 0);
        }
        return new CSG.Line3D(origin, direction);
    };


    CSG.Line3D.prototype = {
        intersectWithPlane: function(plane) {
            // plane: plane.normal * p = plane.w
            // line: p=line.point + labda * line.direction
            var labda = (plane.w - plane.normal.dot(this.point)) / plane.normal.dot(this.direction);
            var point = this.point.plus(this.direction.times(labda));
            return point;
        },

        clone: function(line) {
            return new CSG.Line3D(this.point.clone(), this.direction.clone());
        },

        reverse: function() {
            return new CSG.Line3D(this.point.clone(), this.direction.negated());
        },

        transform: function(matrix4x4) {
            var newpoint = this.point.multiply4x4(matrix4x4);
            var pointPlusDirection = this.point.plus(this.direction);
            var newPointPlusDirection = pointPlusDirection.multiply4x4(matrix4x4);
            var newdirection = newPointPlusDirection.minus(newpoint);
            return new CSG.Line3D(newpoint, newdirection);
        },

        closestPointOnLine: function(point) {
            point = new CSG.Vector3D(point);
            var t = point.minus(this.point).dot(this.direction) / this.direction.dot(this.direction);
            var closestpoint = this.point.plus(this.direction.times(t));
            return closestpoint;
        },

        distanceToPoint: function(point) {
            point = new CSG.Vector3D(point);
            var closestpoint = this.closestPointOnLine(point);
            var distancevector = point.minus(closestpoint);
            var distance = distancevector.length();
            return distance;
        },

        equals: function(line3d) {
            if (!this.direction.equals(line3d.direction)) { return false; }
            var distance = this.distanceToPoint(line3d.point);
            if (distance > 1e-8) { return false; }
            return true;
        }
    };


    // # class OrthoNormalBasis
    // Reprojects points on a 3D plane onto a 2D plane
    // or from a 2D plane back onto the 3D plane
    CSG.OrthoNormalBasis = function(plane, rightvector) {
        if (arguments.length < 2) {
            // choose an arbitrary right hand vector, making sure it is somewhat orthogonal to the plane normal:
            rightvector = plane.normal.randomNonParallelVector();
        } else {
            rightvector = new CSG.Vector3D(rightvector);
        }
        this.v = plane.normal.cross(rightvector).unit();
        this.u = this.v.cross(plane.normal);
        this.plane = plane;
        this.planeorigin = plane.normal.times(plane.w);
    };

    // Get an orthonormal basis for the standard XYZ planes.
    // Parameters: the names of two 3D axes. The 2d x axis will map to the first given 3D axis, the 2d y 
    // axis will map to the second.
    // Prepend the axis with a "-" to invert the direction of this axis.
    // For example: CSG.OrthoNormalBasis.GetCartesian("-Y","Z")
    //   will return an orthonormal basis where the 2d X axis maps to the 3D inverted Y axis, and
    //   the 2d Y axis maps to the 3D Z axis.
    CSG.OrthoNormalBasis.GetCartesian = function(xaxisid, yaxisid) {
        var axisid = xaxisid + "/" + yaxisid;
        var planenormal, rightvector;
        if (axisid == "X/Y") {
            planenormal = [0, 0, 1];
            rightvector = [1, 0, 0];
        } else if (axisid == "Y/-X") {
            planenormal = [0, 0, 1];
            rightvector = [0, 1, 0];
        } else if (axisid == "-X/-Y") {
            planenormal = [0, 0, 1];
            rightvector = [-1, 0, 0];
        } else if (axisid == "-Y/X") {
            planenormal = [0, 0, 1];
            rightvector = [0, -1, 0];
        } else if (axisid == "-X/Y") {
            planenormal = [0, 0, -1];
            rightvector = [-1, 0, 0];
        } else if (axisid == "-Y/-X") {
            planenormal = [0, 0, -1];
            rightvector = [0, -1, 0];
        } else if (axisid == "X/-Y") {
            planenormal = [0, 0, -1];
            rightvector = [1, 0, 0];
        } else if (axisid == "Y/X") {
            planenormal = [0, 0, -1];
            rightvector = [0, 1, 0];
        } else if (axisid == "X/Z") {
            planenormal = [0, -1, 0];
            rightvector = [1, 0, 0];
        } else if (axisid == "Z/-X") {
            planenormal = [0, -1, 0];
            rightvector = [0, 0, 1];
        } else if (axisid == "-X/-Z") {
            planenormal = [0, -1, 0];
            rightvector = [-1, 0, 0];
        } else if (axisid == "-Z/X") {
            planenormal = [0, -1, 0];
            rightvector = [0, 0, -1];
        } else if (axisid == "-X/Z") {
            planenormal = [0, 1, 0];
            rightvector = [-1, 0, 0];
        } else if (axisid == "-Z/-X") {
            planenormal = [0, 1, 0];
            rightvector = [0, 0, -1];
        } else if (axisid == "X/-Z") {
            planenormal = [0, 1, 0];
            rightvector = [1, 0, 0];
        } else if (axisid == "Z/X") {
            planenormal = [0, 1, 0];
            rightvector = [0, 0, 1];
        } else if (axisid == "Y/Z") {
            planenormal = [1, 0, 0];
            rightvector = [0, 1, 0];
        } else if (axisid == "Z/-Y") {
            planenormal = [1, 0, 0];
            rightvector = [0, 0, 1];
        } else if (axisid == "-Y/-Z") {
            planenormal = [1, 0, 0];
            rightvector = [0, -1, 0];
        } else if (axisid == "-Z/Y") {
            planenormal = [1, 0, 0];
            rightvector = [0, 0, -1];
        } else if (axisid == "-Y/Z") {
            planenormal = [-1, 0, 0];
            rightvector = [0, -1, 0];
        } else if (axisid == "-Z/-Y") {
            planenormal = [-1, 0, 0];
            rightvector = [0, 0, -1];
        } else if (axisid == "Y/-Z") {
            planenormal = [-1, 0, 0];
            rightvector = [0, 1, 0];
        } else if (axisid == "Z/Y") {
            planenormal = [-1, 0, 0];
            rightvector = [0, 0, 1];
        } else {
            throw new Error("CSG.OrthoNormalBasis.GetCartesian: invalid combination of axis identifiers. Should pass two string arguments from [X,Y,Z,-X,-Y,-Z], being two different axes.");
        }
        return new CSG.OrthoNormalBasis(new CSG.Plane(new CSG.Vector3D(planenormal), 0), new CSG.Vector3D(rightvector));
    };

    /*
    // test code for CSG.OrthoNormalBasis.GetCartesian()
    CSG.OrthoNormalBasis.GetCartesian_Test=function() {
      var axisnames=["X","Y","Z","-X","-Y","-Z"];
      var axisvectors=[[1,0,0], [0,1,0], [0,0,1], [-1,0,0], [0,-1,0], [0,0,-1]];
      for(var axis1=0; axis1 < 3; axis1++) {
        for(var axis1inverted=0; axis1inverted < 2; axis1inverted++) {
          var axis1name=axisnames[axis1+3*axis1inverted];
          var axis1vector=axisvectors[axis1+3*axis1inverted];
          for(var axis2=0; axis2 < 3; axis2++) {
            if(axis2 != axis1) {
              for(var axis2inverted=0; axis2inverted < 2; axis2inverted++) {
                var axis2name=axisnames[axis2+3*axis2inverted];
                var axis2vector=axisvectors[axis2+3*axis2inverted];
                var orthobasis=CSG.OrthoNormalBasis.GetCartesian(axis1name, axis2name);
                var test1=orthobasis.to3D(new CSG.Vector2D([1,0]));
                var test2=orthobasis.to3D(new CSG.Vector2D([0,1]));
                var expected1=new CSG.Vector3D(axis1vector);
                var expected2=new CSG.Vector3D(axis2vector);
                var d1=test1.distanceTo(expected1);
                var d2=test2.distanceTo(expected2);
                if( (d1 > 0.01) || (d2 > 0.01) ) {
                  throw new Error("Wrong!");
      }}}}}}
      throw new Error("OK");
    };
    */

    // The z=0 plane, with the 3D x and y vectors mapped to the 2D x and y vector
    CSG.OrthoNormalBasis.Z0Plane = function() {
        var plane = new CSG.Plane(new CSG.Vector3D([0, 0, 1]), 0);
        return new CSG.OrthoNormalBasis(plane, new CSG.Vector3D([1, 0, 0]));
    };

    CSG.OrthoNormalBasis.prototype = {
        getProjectionMatrix: function() {
            return new CSG.Matrix4x4([
                this.u.x, this.v.x, this.plane.normal.x, 0,
                this.u.y, this.v.y, this.plane.normal.y, 0,
                this.u.z, this.v.z, this.plane.normal.z, 0,
                0, 0, -this.plane.w, 1
            ]);
        },

        getInverseProjectionMatrix: function() {
            var p = this.plane.normal.times(this.plane.w);
            return new CSG.Matrix4x4([
                this.u.x, this.u.y, this.u.z, 0,
                this.v.x, this.v.y, this.v.z, 0,
                this.plane.normal.x, this.plane.normal.y, this.plane.normal.z, 0,
                p.x, p.y, p.z, 1
            ]);
        },

        to2D: function(vec3) {
            return new CSG.Vector2D(vec3.dot(this.u), vec3.dot(this.v));
        },

        to3D: function(vec2) {
            return this.planeorigin.plus(this.u.times(vec2.x)).plus(this.v.times(vec2.y));
        },

        line3Dto2D: function(line3d) {
            var a = line3d.point;
            var b = line3d.direction.plus(a);
            var a2d = this.to2D(a);
            var b2d = this.to2D(b);
            return CSG.Line2D.fromPoints(a2d, b2d);
        },

        line2Dto3D: function(line2d) {
            var a = line2d.origin();
            var b = line2d.direction().plus(a);
            var a3d = this.to3D(a);
            var b3d = this.to3D(b);
            return CSG.Line3D.fromPoints(a3d, b3d);
        },

        transform: function(matrix4x4) {
            // todo: this may not work properly in case of mirroring
            var newplane = this.plane.transform(matrix4x4);
            var rightpoint_transformed = this.u.transform(matrix4x4);
            var origin_transformed = new CSG.Vector3D(0, 0, 0).transform(matrix4x4);
            var newrighthandvector = rightpoint_transformed.minus(origin_transformed);
            var newbasis = new CSG.OrthoNormalBasis(newplane, newrighthandvector);
            return newbasis;
        }
    };

    function insertSorted(array, element, comparefunc) {
        var leftbound = 0;
        var rightbound = array.length;
        while (rightbound > leftbound) {
            var testindex = Math.floor((leftbound + rightbound) / 2);
            var testelement = array[testindex];
            var compareresult = comparefunc(element, testelement);
            if (compareresult > 0) // element > testelement
            {
                leftbound = testindex + 1;
            } else {
                rightbound = testindex;
            }
        }
        array.splice(leftbound, 0, element);
    }

    // Get the x coordinate of a point with a certain y coordinate, interpolated between two
    // points (CSG.Vector2D).
    // Interpolation is robust even if the points have the same y coordinate
    CSG.interpolateBetween2DPointsForY = function(point1, point2, y) {
        var f1 = y - point1.y;
        var f2 = point2.y - point1.y;
        if (f2 < 0) {
            f1 = -f1;
            f2 = -f2;
        }
        var t;
        if (f1 <= 0) {
            t = 0.0;
        } else if (f1 >= f2) {
            t = 1.0;
        } else if (f2 < 1e-10) {
            t = 0.5;
        } else {
            t = f1 / f2;
        }
        var result = point1.x + t * (point2.x - point1.x);
        return result;
    };

    // Retesselation function for a set of coplanar polygons. See the introduction at the top of
    // this file.
    CSG.reTesselateCoplanarPolygons = function(sourcepolygons, destpolygons) {
        var EPS = 1e-5;

        var numpolygons = sourcepolygons.length;
        if (numpolygons > 0) {
            var plane = sourcepolygons[0].plane;
            var shared = sourcepolygons[0].shared;
            var orthobasis = new CSG.OrthoNormalBasis(plane);
            var polygonvertices2d = []; // array of array of CSG.Vector2D
            var polygontopvertexindexes = []; // array of indexes of topmost vertex per polygon
            var topy2polygonindexes = {};
            var ycoordinatetopolygonindexes = {};

            var xcoordinatebins = {};
            var ycoordinatebins = {};

            // convert all polygon vertices to 2D
            // Make a list of all encountered y coordinates
            // And build a map of all polygons that have a vertex at a certain y coordinate:
            var ycoordinateBinningFactor = 1.0 / EPS * 10;
            for (var polygonindex = 0; polygonindex < numpolygons; polygonindex++) {
                var poly3d = sourcepolygons[polygonindex];
                var vertices2d = [];
                var numvertices = poly3d.vertices.length;
                var minindex = -1;
                if (numvertices > 0) {
                    var miny, maxy, maxindex;
                    for (var i = 0; i < numvertices; i++) {
                        var pos2d = orthobasis.to2D(poly3d.vertices[i].pos);
                        // perform binning of y coordinates: If we have multiple vertices very
                        // close to each other, give them the same y coordinate:
                        var ycoordinatebin = Math.floor(pos2d.y * ycoordinateBinningFactor);
                        var newy;
                        if (ycoordinatebin in ycoordinatebins) {
                            newy = ycoordinatebins[ycoordinatebin];
                        } else if (ycoordinatebin + 1 in ycoordinatebins) {
                            newy = ycoordinatebins[ycoordinatebin + 1];
                        } else if (ycoordinatebin - 1 in ycoordinatebins) {
                            newy = ycoordinatebins[ycoordinatebin - 1];
                        } else {
                            newy = pos2d.y;
                            ycoordinatebins[ycoordinatebin] = pos2d.y;
                        }
                        pos2d = CSG.Vector2D.Create(pos2d.x, newy);
                        vertices2d.push(pos2d);
                        var y = pos2d.y;
                        if ((i === 0) || (y < miny)) {
                            miny = y;
                            minindex = i;
                        }
                        if ((i === 0) || (y > maxy)) {
                            maxy = y;
                            maxindex = i;
                        }
                        if (!(y in ycoordinatetopolygonindexes)) {
                            ycoordinatetopolygonindexes[y] = {};
                        }
                        ycoordinatetopolygonindexes[y][polygonindex] = true;
                    }
                    if (miny >= maxy) {
                        // degenerate polygon, all vertices have same y coordinate. Just ignore it from now:
                        vertices2d = [];
                        numvertices = 0;
                        minindex = -1;
                    } else {
                        if (!(miny in topy2polygonindexes)) {
                            topy2polygonindexes[miny] = [];
                        }
                        topy2polygonindexes[miny].push(polygonindex);
                    }
                } // if(numvertices > 0)
                // reverse the vertex order:
                vertices2d.reverse();
                minindex = numvertices - minindex - 1;
                polygonvertices2d.push(vertices2d);
                polygontopvertexindexes.push(minindex);
            }
            var ycoordinates = [];
            for (var ycoordinate in ycoordinatetopolygonindexes) { ycoordinates.push(ycoordinate); }
            ycoordinates.sort(fnNumberSort);

            // Now we will iterate over all y coordinates, from lowest to highest y coordinate
            // activepolygons: source polygons that are 'active', i.e. intersect with our y coordinate
            //   Is sorted so the polygons are in left to right order
            // Each element in activepolygons has these properties:
            //        polygonindex: the index of the source polygon (i.e. an index into the sourcepolygons
            //                      and polygonvertices2d arrays)
            //        leftvertexindex: the index of the vertex at the left side of the polygon (lowest x)
            //                         that is at or just above the current y coordinate
            //        rightvertexindex: dito at right hand side of polygon
            //        topleft, bottomleft: coordinates of the left side of the polygon crossing the current y coordinate
            //        topright, bottomright: coordinates of the right hand side of the polygon crossing the current y coordinate
            var activepolygons = [];
            var prevoutpolygonrow = [];
            for (var yindex = 0; yindex < ycoordinates.length; yindex++) {
                var newoutpolygonrow = [];
                var ycoordinate_as_string = ycoordinates[yindex];
                var ycoordinate = Number(ycoordinate_as_string);

                // update activepolygons for this y coordinate:
                // - Remove any polygons that end at this y coordinate
                // - update leftvertexindex and rightvertexindex (which point to the current vertex index
                //   at the the left and right side of the polygon
                // Iterate over all polygons that have a corner at this y coordinate:
                var polygonindexeswithcorner = ycoordinatetopolygonindexes[ycoordinate_as_string];
                for (var activepolygonindex = 0; activepolygonindex < activepolygons.length; ++activepolygonindex) {
                    var activepolygon = activepolygons[activepolygonindex];
                    var polygonindex = activepolygon.polygonindex;
                    if (polygonindexeswithcorner[polygonindex]) {
                        // this active polygon has a corner at this y coordinate:
                        var vertices2d = polygonvertices2d[polygonindex];
                        var numvertices = vertices2d.length;
                        var newleftvertexindex = activepolygon.leftvertexindex;
                        var newrightvertexindex = activepolygon.rightvertexindex;
                        // See if we need to increase leftvertexindex or decrease rightvertexindex:
                        while (true) {
                            var nextleftvertexindex = newleftvertexindex + 1;
                            if (nextleftvertexindex >= numvertices) { nextleftvertexindex = 0; }
                            if (vertices2d[nextleftvertexindex].y != ycoordinate) { break; }
                            newleftvertexindex = nextleftvertexindex;
                        }
                        var nextrightvertexindex = newrightvertexindex - 1;
                        if (nextrightvertexindex < 0) { nextrightvertexindex = numvertices - 1; }
                        if (vertices2d[nextrightvertexindex].y == ycoordinate) {
                            newrightvertexindex = nextrightvertexindex;
                        }
                        if ((newleftvertexindex != activepolygon.leftvertexindex) && (newleftvertexindex == newrightvertexindex)) {
                            // We have increased leftvertexindex or decreased rightvertexindex, and now they point to the same vertex
                            // This means that this is the bottom point of the polygon. We'll remove it:
                            activepolygons.splice(activepolygonindex, 1);
                            --activepolygonindex;
                        } else {
                            activepolygon.leftvertexindex = newleftvertexindex;
                            activepolygon.rightvertexindex = newrightvertexindex;
                            activepolygon.topleft = vertices2d[newleftvertexindex];
                            activepolygon.topright = vertices2d[newrightvertexindex];
                            var nextleftvertexindex = newleftvertexindex + 1;
                            if (nextleftvertexindex >= numvertices) { nextleftvertexindex = 0; }
                            activepolygon.bottomleft = vertices2d[nextleftvertexindex];
                            var nextrightvertexindex = newrightvertexindex - 1;
                            if (nextrightvertexindex < 0) { nextrightvertexindex = numvertices - 1; }
                            activepolygon.bottomright = vertices2d[nextrightvertexindex];
                        }
                    } // if polygon has corner here
                } // for activepolygonindex
                var nextycoordinate;
                if (yindex >= ycoordinates.length - 1) {
                    // last row, all polygons must be finished here:
                    activepolygons = [];
                    nextycoordinate = null;
                } else // yindex < ycoordinates.length-1
                {
                    nextycoordinate = Number(ycoordinates[yindex + 1]);
                    var middleycoordinate = 0.5 * (ycoordinate + nextycoordinate);
                    // update activepolygons by adding any polygons that start here:
                    var startingpolygonindexes = topy2polygonindexes[ycoordinate_as_string];
                    for (var polygonindex_key in startingpolygonindexes) {
                        var polygonindex = startingpolygonindexes[polygonindex_key];
                        var vertices2d = polygonvertices2d[polygonindex];
                        var numvertices = vertices2d.length;
                        var topvertexindex = polygontopvertexindexes[polygonindex];
                        // the top of the polygon may be a horizontal line. In that case topvertexindex can point to any point on this line.
                        // Find the left and right topmost vertices which have the current y coordinate:
                        var topleftvertexindex = topvertexindex;
                        while (true) {
                            var i = topleftvertexindex + 1;
                            if (i >= numvertices) { i = 0; }
                            if (vertices2d[i].y != ycoordinate) { break; }
                            if (i == topvertexindex) { break; } // should not happen, but just to prevent endless loops
                            topleftvertexindex = i;
                        }
                        var toprightvertexindex = topvertexindex;
                        while (true) {
                            var i = toprightvertexindex - 1;
                            if (i < 0) { i = numvertices - 1; }
                            if (vertices2d[i].y != ycoordinate) { break; }
                            if (i == topleftvertexindex) { break; } // should not happen, but just to prevent endless loops
                            toprightvertexindex = i;
                        }
                        var nextleftvertexindex = topleftvertexindex + 1;
                        if (nextleftvertexindex >= numvertices) { nextleftvertexindex = 0; }
                        var nextrightvertexindex = toprightvertexindex - 1;
                        if (nextrightvertexindex < 0) { nextrightvertexindex = numvertices - 1; }
                        var newactivepolygon = {
                            polygonindex: polygonindex,
                            leftvertexindex: topleftvertexindex,
                            rightvertexindex: toprightvertexindex,
                            topleft: vertices2d[topleftvertexindex],
                            topright: vertices2d[toprightvertexindex],
                            bottomleft: vertices2d[nextleftvertexindex],
                            bottomright: vertices2d[nextrightvertexindex],
                        };
                        insertSorted(activepolygons, newactivepolygon, function(el1, el2) {
                            var x1 = CSG.interpolateBetween2DPointsForY(
                                el1.topleft, el1.bottomleft, middleycoordinate);
                            var x2 = CSG.interpolateBetween2DPointsForY(
                                el2.topleft, el2.bottomleft, middleycoordinate);
                            if (x1 > x2) { return 1; }
                            if (x1 < x2) { return -1; }
                            return 0;
                        });
                    } // for(var polygonindex in startingpolygonindexes)
                } //  yindex < ycoordinates.length-1
                //if( (yindex == ycoordinates.length-1) || (nextycoordinate - ycoordinate > EPS) )
                {
                    // Now activepolygons is up to date
                    // Build the output polygons for the next row in newoutpolygonrow:
                    for (var activepolygon_key in activepolygons) {
                        var activepolygon = activepolygons[activepolygon_key];
                        var polygonindex = activepolygon.polygonindex;
                        var vertices2d = polygonvertices2d[polygonindex];
                        var numvertices = vertices2d.length;

                        var x = CSG.interpolateBetween2DPointsForY(activepolygon.topleft, activepolygon.bottomleft, ycoordinate);
                        var topleft = CSG.Vector2D.Create(x, ycoordinate);
                        x = CSG.interpolateBetween2DPointsForY(activepolygon.topright, activepolygon.bottomright, ycoordinate);
                        var topright = CSG.Vector2D.Create(x, ycoordinate);
                        x = CSG.interpolateBetween2DPointsForY(activepolygon.topleft, activepolygon.bottomleft, nextycoordinate);
                        var bottomleft = CSG.Vector2D.Create(x, nextycoordinate);
                        x = CSG.interpolateBetween2DPointsForY(activepolygon.topright, activepolygon.bottomright, nextycoordinate);
                        var bottomright = CSG.Vector2D.Create(x, nextycoordinate);
                        var outpolygon = {
                            topleft: topleft,
                            topright: topright,
                            bottomleft: bottomleft,
                            bottomright: bottomright,
                            leftline: CSG.Line2D.fromPoints(topleft, bottomleft),
                            rightline: CSG.Line2D.fromPoints(bottomright, topright)
                        };
                        if (newoutpolygonrow.length > 0) {
                            var prevoutpolygon = newoutpolygonrow[newoutpolygonrow.length - 1];
                            var d1 = outpolygon.topleft.distanceTo(prevoutpolygon.topright);
                            var d2 = outpolygon.bottomleft.distanceTo(prevoutpolygon.bottomright);
                            if ((d1 < EPS) && (d2 < EPS)) {
                                // we can join this polygon with the one to the left:
                                outpolygon.topleft = prevoutpolygon.topleft;
                                outpolygon.leftline = prevoutpolygon.leftline;
                                outpolygon.bottomleft = prevoutpolygon.bottomleft;
                                newoutpolygonrow.splice(newoutpolygonrow.length - 1, 1);
                            }
                        }
                        newoutpolygonrow.push(outpolygon);
                    } // for(activepolygon in activepolygons)
                    if (yindex > 0) {
                        // try to match the new polygons against the previous row:
                        var prevcontinuedindexes = {};
                        var matchedindexes = {};
                        for (var i = 0; i < newoutpolygonrow.length; i++) {
                            var thispolygon = newoutpolygonrow[i];
                            for (var ii = 0; ii < prevoutpolygonrow.length; ii++) {
                                if (!matchedindexes[ii]) // not already processed?
                                {
                                    // We have a match if the sidelines are equal or if the top coordinates
                                    // are on the sidelines of the previous polygon
                                    var prevpolygon = prevoutpolygonrow[ii];
                                    if (prevpolygon.bottomleft.distanceTo(thispolygon.topleft) < EPS) {
                                        if (prevpolygon.bottomright.distanceTo(thispolygon.topright) < EPS) {
                                            // Yes, the top of this polygon matches the bottom of the previous:
                                            matchedindexes[ii] = true;
                                            // Now check if the joined polygon would remain convex:
                                            var d1 = thispolygon.leftline.direction().x - prevpolygon.leftline.direction().x;
                                            var d2 = thispolygon.rightline.direction().x - prevpolygon.rightline.direction().x;
                                            var leftlinecontinues = Math.abs(d1) < EPS;
                                            var rightlinecontinues = Math.abs(d2) < EPS;
                                            var leftlineisconvex = leftlinecontinues || (d1 >= 0);
                                            var rightlineisconvex = rightlinecontinues || (d2 >= 0);
                                            if (leftlineisconvex && rightlineisconvex) {
                                                // yes, both sides have convex corners:
                                                // This polygon will continue the previous polygon
                                                thispolygon.outpolygon = prevpolygon.outpolygon;
                                                thispolygon.leftlinecontinues = leftlinecontinues;
                                                thispolygon.rightlinecontinues = rightlinecontinues;
                                                prevcontinuedindexes[ii] = true;
                                            }
                                            break;
                                        }
                                    }
                                } // if(!prevcontinuedindexes[ii])
                            } // for ii
                        } // for i
                        for (var ii = 0; ii < prevoutpolygonrow.length; ii++) {
                            if (!prevcontinuedindexes[ii]) {
                                // polygon ends here
                                // Finish the polygon with the last point(s):
                                var prevpolygon = prevoutpolygonrow[ii];
                                prevpolygon.outpolygon.rightpoints.push(prevpolygon.bottomright);
                                if (prevpolygon.bottomright.distanceTo(prevpolygon.bottomleft) > EPS) {
                                    // polygon ends with a horizontal line:
                                    prevpolygon.outpolygon.leftpoints.push(prevpolygon.bottomleft);
                                }
                                // reverse the left half so we get a counterclockwise circle:
                                prevpolygon.outpolygon.leftpoints.reverse();
                                var points2d = prevpolygon.outpolygon.rightpoints.concat(prevpolygon.outpolygon.leftpoints);
                                var vertices3d = [];
                                points2d.map(function(point2d) {
                                    var point3d = orthobasis.to3D(point2d);
                                    var vertex3d = new CSG.Vertex(point3d);
                                    vertices3d.push(vertex3d);
                                });
                                var polygon = new CSG.Polygon(vertices3d, shared, plane);
                                destpolygons.push(polygon);
                            }
                        }
                    } // if(yindex > 0)
                    for (var i = 0; i < newoutpolygonrow.length; i++) {
                        var thispolygon = newoutpolygonrow[i];
                        if (!thispolygon.outpolygon) {
                            // polygon starts here:
                            thispolygon.outpolygon = {
                                leftpoints: [],
                                rightpoints: []
                            };
                            thispolygon.outpolygon.leftpoints.push(thispolygon.topleft);
                            if (thispolygon.topleft.distanceTo(thispolygon.topright) > EPS) {
                                // we have a horizontal line at the top:
                                thispolygon.outpolygon.rightpoints.push(thispolygon.topright);
                            }
                        } else {
                            // continuation of a previous row
                            if (!thispolygon.leftlinecontinues) {
                                thispolygon.outpolygon.leftpoints.push(thispolygon.topleft);
                            }
                            if (!thispolygon.rightlinecontinues) {
                                thispolygon.outpolygon.rightpoints.push(thispolygon.topright);
                            }
                        }
                    }
                    prevoutpolygonrow = newoutpolygonrow;
                }
            } // for yindex
        } // if(numpolygons > 0)
    };

    ////////////////////////////////
    // ## class fuzzyFactory
    // This class acts as a factory for objects. We can search for an object with approximately
    // the desired properties (say a rectangle with width 2 and height 1)
    // The lookupOrCreate() method looks for an existing object (for example it may find an existing rectangle
    // with width 2.0001 and height 0.999. If no object is found, the user supplied callback is
    // called, which should generate a new object. The new object is inserted into the database
    // so it can be found by future lookupOrCreate() calls.
    // Constructor:
    //   numdimensions: the number of parameters for each object
    //     for example for a 2D rectangle this would be 2
    //   tolerance: The maximum difference for each parameter allowed to be considered a match
    CSG.fuzzyFactory = function(numdimensions, tolerance) {
        this.lookuptable = {};
        this.multiplier = 1.0 / tolerance;
    };

    CSG.fuzzyFactory.prototype = {
        // var obj = f.lookupOrCreate([el1, el2, el3], function(elements) {/* create the new object */});
        // Performs a fuzzy lookup of the object with the specified elements.
        // If found, returns the existing object
        // If not found, calls the supplied callback function which should create a new object with
        // the specified properties. This object is inserted in the lookup database.
        lookupOrCreate: function(els, creatorCallback) {
            var this$1 = this;

            var hash = "";
            var multiplier = this.multiplier;
            els.forEach(function(el) {
                var valueQuantized = Math.round(el * multiplier);
                hash += valueQuantized + "/";
            });
            if (hash in this.lookuptable) {
                return this.lookuptable[hash];
            } else {
                var object = creatorCallback(els);
                var hashparts = els.map(function(el) {
                    var q0 = Math.floor(el * multiplier);
                    var q1 = q0 + 1;
                    return ["" + q0 + "/", "" + q1 + "/"];
                });
                var numelements = els.length;
                var numhashes = 1 << numelements;
                for (var hashmask = 0; hashmask < numhashes; ++hashmask) {
                    var hashmask_shifted = hashmask;
                    hash = "";
                    hashparts.forEach(function(hashpart) {
                        hash += hashpart[hashmask_shifted & 1];
                        hashmask_shifted >>= 1;
                    });
                    this$1.lookuptable[hash] = object;
                }
                return object;
            }
        },
    };


    //////////////////////////////////////
    CSG.fuzzyCSGFactory = function() {
        this.vertexfactory = new CSG.fuzzyFactory(3, 1e-5);
        this.planefactory = new CSG.fuzzyFactory(4, 1e-5);
        this.polygonsharedfactory = {};
    };

    CSG.fuzzyCSGFactory.prototype = {
        getPolygonShared: function(sourceshared) {
            var hash = sourceshared.getHash();
            if (hash in this.polygonsharedfactory) {
                return this.polygonsharedfactory[hash];
            } else {
                this.polygonsharedfactory[hash] = sourceshared;
                return sourceshared;
            }
        },

        getVertex: function(sourcevertex) {
            var elements = [sourcevertex.pos._x, sourcevertex.pos._y, sourcevertex.pos._z];
            var result = this.vertexfactory.lookupOrCreate(elements, function(els) {
                return sourcevertex;
            });
            return result;
        },

        getPlane: function(sourceplane) {
            var elements = [sourceplane.normal._x, sourceplane.normal._y, sourceplane.normal._z, sourceplane.w];
            var result = this.planefactory.lookupOrCreate(elements, function(els) {
                return sourceplane;
            });
            return result;
        },

        getPolygon: function(sourcepolygon) {
            var newplane = this.getPlane(sourcepolygon.plane);
            var newshared = this.getPolygonShared(sourcepolygon.shared);
            var _this = this;
            var newvertices = sourcepolygon.vertices.map(function(vertex) {
                return _this.getVertex(vertex);
            });
            // two vertices that were originally very close may now have become
            // truly identical (referring to the same CSG.Vertex object).
            // Remove duplicate vertices:
            var newvertices_dedup = [];
            if(newvertices.length > 0) {
                var prevvertextag = newvertices[newvertices.length-1].getTag();
                newvertices.forEach(function(vertex) {
                    var vertextag = vertex.getTag();
                    if(vertextag != prevvertextag)
                    {
                        newvertices_dedup.push(vertex);
                    }
                    prevvertextag = vertextag;
                });
            }
            // If it's degenerate, remove all vertices:
            if(newvertices_dedup.length < 3) {
                newvertices_dedup = [];
            }
            return new CSG.Polygon(newvertices_dedup, newshared, newplane);
        },

        getCSG: function(sourcecsg) {
            var _this = this;
            var newpolygons = [];
            sourcecsg.polygons.forEach(function(polygon) {
                var newpolygon = _this.getPolygon(polygon);
                // see getPolygon above: we may get a polygon with no vertices, discard it:
                if(newpolygon.vertices.length >= 3)
                {
                    newpolygons.push(newpolygon);
                }
            });
            return CSG.fromPolygons(newpolygons);
        }
    };

    //////////////////////////////////////
    // Tag factory: we can request a unique tag through CSG.getTag()
    CSG.staticTag = 1;

    CSG.getTag = function() {
        return CSG.staticTag++;
    };

    //////////////////////////////////////
    // # Class Properties
    // This class is used to store properties of a solid
    // A property can for example be a CSG.Vertex, a CSG.Plane or a CSG.Line3D
    // Whenever an affine transform is applied to the CSG solid, all its properties are
    // transformed as well.
    // The properties can be stored in a complex nested structure (using arrays and objects)
    CSG.Properties = function() {};

    CSG.Properties.prototype = {
        _transform: function(matrix4x4) {
            var result = new CSG.Properties();
            CSG.Properties.transformObj(this, result, matrix4x4);
            return result;
        },
        _merge: function(otherproperties) {
            var result = new CSG.Properties();
            CSG.Properties.cloneObj(this, result);
            CSG.Properties.addFrom(result, otherproperties);
            return result;
        }
    };

    CSG.Properties.transformObj = function(source, result, matrix4x4) {
        for (var propertyname in source) {
            if (propertyname == "_transform") { continue; }
            if (propertyname == "_merge") { continue; }
            var propertyvalue = source[propertyname];
            var transformed = propertyvalue;
            if (typeof(propertyvalue) == "object") {
                if (('transform' in propertyvalue) && (typeof(propertyvalue.transform) == "function")) {
                    transformed = propertyvalue.transform(matrix4x4);
                } else if (propertyvalue instanceof Array) {
                    transformed = [];
                    CSG.Properties.transformObj(propertyvalue, transformed, matrix4x4);
                } else if (propertyvalue instanceof CSG.Properties) {
                    transformed = new CSG.Properties();
                    CSG.Properties.transformObj(propertyvalue, transformed, matrix4x4);
                }
            }
            result[propertyname] = transformed;
        }
    };

    CSG.Properties.cloneObj = function(source, result) {
        for (var propertyname in source) {
            if (propertyname == "_transform") { continue; }
            if (propertyname == "_merge") { continue; }
            var propertyvalue = source[propertyname];
            var cloned = propertyvalue;
            if (typeof(propertyvalue) == "object") {
                if (propertyvalue instanceof Array) {
                    cloned = [];
                    for (var i = 0; i < propertyvalue.length; i++) {
                        cloned.push(propertyvalue[i]);
                    }
                } else if (propertyvalue instanceof CSG.Properties) {
                    cloned = new CSG.Properties();
                    CSG.Properties.cloneObj(propertyvalue, cloned);
                }
            }
            result[propertyname] = cloned;
        }
    };

    CSG.Properties.addFrom = function(result, otherproperties) {
        for (var propertyname in otherproperties) {
            if (propertyname == "_transform") { continue; }
            if (propertyname == "_merge") { continue; }
            if ((propertyname in result) &&
                (typeof(result[propertyname]) == "object") &&
                (result[propertyname] instanceof CSG.Properties) &&
                (typeof(otherproperties[propertyname]) == "object") &&
                (otherproperties[propertyname] instanceof CSG.Properties)) {
                CSG.Properties.addFrom(result[propertyname], otherproperties[propertyname]);
            } else if (!(propertyname in result)) {
                result[propertyname] = otherproperties[propertyname];
            }
        }
    };

    //////////////////////////////////////
    // # class Connector
    // A connector allows to attach two objects at predefined positions
    // For example a servo motor and a servo horn:
    // Both can have a Connector called 'shaft'
    // The horn can be moved and rotated such that the two connectors match
    // and the horn is attached to the servo motor at the proper position.
    // Connectors are stored in the properties of a CSG solid so they are
    // ge the same transformations applied as the solid
    CSG.Connector = function(point, axisvector, normalvector) {
        this.point = new CSG.Vector3D(point);
        this.axisvector = new CSG.Vector3D(axisvector).unit();
        this.normalvector = new CSG.Vector3D(normalvector).unit();
    };

    CSG.Connector.prototype = {
        normalized: function() {
            var axisvector = this.axisvector.unit();
            // make the normal vector truly normal:
            var n = this.normalvector.cross(axisvector).unit();
            var normalvector = axisvector.cross(n);
            return new CSG.Connector(this.point, axisvector, normalvector);
        },

        transform: function(matrix4x4) {
            var point = this.point.multiply4x4(matrix4x4);
            var axisvector = this.point.plus(this.axisvector).multiply4x4(matrix4x4).minus(point);
            var normalvector = this.point.plus(this.normalvector).multiply4x4(matrix4x4).minus(point);
            return new CSG.Connector(point, axisvector, normalvector);
        },

        // Get the transformation matrix to connect this Connector to another connector
        //   other: a CSG.Connector to which this connector should be connected
        //   mirror: false: the 'axis' vectors of the connectors should point in the same direction
        //           true: the 'axis' vectors of the connectors should point in opposite direction
        //   normalrotation: degrees of rotation between the 'normal' vectors of the two
        //                   connectors
        getTransformationTo: function(other, mirror, normalrotation) {
            mirror = mirror ? true : false;
            normalrotation = normalrotation ? Number(normalrotation) : 0;
            var us = this.normalized();
            other = other.normalized();
            // shift to the origin:
            var transformation = CSG.Matrix4x4.translation(this.point.negated());
            // construct the plane crossing through the origin and the two axes:
            var axesplane = CSG.Plane.anyPlaneFromVector3Ds(
                new CSG.Vector3D(0, 0, 0), us.axisvector, other.axisvector);
            var axesbasis = new CSG.OrthoNormalBasis(axesplane);
            var angle1 = axesbasis.to2D(us.axisvector).angle();
            var angle2 = axesbasis.to2D(other.axisvector).angle();
            var rotation = 180.0 * (angle2 - angle1) / Math.PI;
            if (mirror) { rotation += 180.0; }
            transformation = transformation.multiply(axesbasis.getProjectionMatrix());
            transformation = transformation.multiply(CSG.Matrix4x4.rotationZ(rotation));
            transformation = transformation.multiply(axesbasis.getInverseProjectionMatrix());
            var usAxesAligned = us.transform(transformation);
            // Now we have done the transformation for aligning the axes.
            // We still need to align the normals:
            var normalsplane = CSG.Plane.fromNormalAndPoint(other.axisvector, new CSG.Vector3D(0, 0, 0));
            var normalsbasis = new CSG.OrthoNormalBasis(normalsplane);
            angle1 = normalsbasis.to2D(usAxesAligned.normalvector).angle();
            angle2 = normalsbasis.to2D(other.normalvector).angle();
            rotation = 180.0 * (angle2 - angle1) / Math.PI;
            rotation += normalrotation;
            transformation = transformation.multiply(normalsbasis.getProjectionMatrix());
            transformation = transformation.multiply(CSG.Matrix4x4.rotationZ(rotation));
            transformation = transformation.multiply(normalsbasis.getInverseProjectionMatrix());
            // and translate to the destination point:
            transformation = transformation.multiply(CSG.Matrix4x4.translation(other.point));
            // var usAligned = us.transform(transformation);
            return transformation;
        },

        axisLine: function() {
            return new CSG.Line3D(this.point, this.axisvector);
        },

        // creates a new Connector, with the connection point moved in the direction of the axisvector
        extend: function(distance) {
            var newpoint = this.point.plus(this.axisvector.unit().times(distance));
            return new CSG.Connector(newpoint, this.axisvector, this.normalvector);
        }
    };

    CSG.ConnectorList = function(connectors) {
        this.connectors_ = connectors ? connectors.slice() : [];
    };

    CSG.ConnectorList.defaultNormal = [0, 0, 1];

    CSG.ConnectorList.fromPath2D = function(path2D, arg1, arg2) {
        if (arguments.length === 3) {
            return CSG.ConnectorList._fromPath2DTangents(path2D, arg1, arg2);
        } else if (arguments.length == 2) {
            return CSG.ConnectorList._fromPath2DExplicit(path2D, arg1);
        } else {
            throw("call with path2D and either 2 direction vectors, or a function returning direction vectors");
        }
    };

    /*
     * calculate the connector axisvectors by calculating the "tangent" for path2D.
     * This is undefined for start and end points, so axis for these have to be manually
     * provided.
     */
    CSG.ConnectorList._fromPath2DTangents = function(path2D, start, end) {
        // path2D
        var axis;
        var pathLen = path2D.points.length;
        var result = new CSG.ConnectorList([new CSG.Connector(path2D.points[0],
            start, CSG.ConnectorList.defaultNormal)]);
        // middle points
        path2D.points.slice(1, pathLen - 1).forEach(function(p2, i) {
            axis = path2D.points[i + 2].minus(path2D.points[i]).toVector3D(0);
            result.appendConnector(new CSG.Connector(p2.toVector3D(0), axis,
              CSG.ConnectorList.defaultNormal));
        }, this);
        result.appendConnector(new CSG.Connector(path2D.points[pathLen - 1], end,
          CSG.ConnectorList.defaultNormal));
        result.closed = path2D.closed;
        return result;
    };

    /*
     * angleIsh: either a static angle, or a function(point) returning an angle
     */
    CSG.ConnectorList._fromPath2DExplicit = function(path2D, angleIsh) {
        function getAngle(angleIsh, pt, i) {
            if (typeof angleIsh == 'function') {
                angleIsh = angleIsh(pt, i);
            }
            return angleIsh;
        }
        var result = new CSG.ConnectorList(
            path2D.points.map(function(p2, i) {
                return new CSG.Connector(p2.toVector3D(0),
                    CSG.Vector3D.Create(1, 0, 0).rotateZ(getAngle(angleIsh, p2, i)),
                      CSG.ConnectorList.defaultNormal);
            }, this)
        );
        result.closed = path2D.closed;
        return result;
    };


    CSG.ConnectorList.prototype = {
        setClosed: function(bool) {
            this.closed = !!closed;
        },
        appendConnector: function(conn) {
            this.connectors_.push(conn);
        },
        /*
         * arguments: cagish: a cag or a function(connector) returning a cag
         *            closed: whether the 3d path defined by connectors location
         *              should be closed or stay open
         *              Note: don't duplicate connectors in the path
         * TODO: consider an option "maySelfIntersect" to close & force union all single segments
         */
        followWith: function(cagish) {
            this.verify();
            function getCag(cagish, connector) {
                if (typeof cagish == "function") {
                    cagish = cagish(connector.point, connector.axisvector, connector.normalvector);
                }
                return cagish;
            }

            var polygons = [], currCag;
            var prevConnector = this.connectors_[this.connectors_.length - 1];
            var prevCag = getCag(cagish, prevConnector);
            // add walls
            this.connectors_.forEach(function(connector, notFirst) {
                currCag = getCag(cagish, connector);
                if (notFirst || this.closed) {
                    polygons.push.apply(polygons, prevCag._toWallPolygons({
                        toConnector1: prevConnector, toConnector2: connector, cag: currCag}));
                } else {
                    // it is the first, and shape not closed -> build start wall
                    polygons.push.apply(polygons,
                        currCag._toPlanePolygons({toConnector: connector, flipped: true}));
                }
                if (notFirst == this.connectors_.length - 1 && !this.closed) {
                    // build end wall
                    polygons.push.apply(polygons,
                        currCag._toPlanePolygons({toConnector: connector}));
                }
                prevCag = currCag;
                prevConnector = connector;
            }, this);
            return CSG.fromPolygons(polygons).reTesselated().canonicalized();
        },
        /*
         * general idea behind these checks: connectors need to have smooth transition from one to another
         * TODO: add a check that 2 follow-on CAGs are not intersecting
         */
        verify: function() {
            var this$1 = this;

            var connI, connI1, dPosToAxis, axisToNextAxis;
            for (var i = 0; i < this.connectors_.length - 1; i++) {
                connI = this$1.connectors_[i], connI1 = this$1.connectors_[i + 1];
                if (connI1.point.minus(connI.point).dot(connI.axisvector) <= 0) {
                    throw("Invalid ConnectorList. Each connectors position needs to be within a <90deg range of previous connectors axisvector");
                }
                if (connI.axisvector.dot(connI1.axisvector) <= 0) {
                    throw("invalid ConnectorList. No neighboring connectors axisvectors may span a >=90deg angle");
                }
            }
        }
    };

    //////////////////////////////////////
    // # Class Path2D
    CSG.Path2D = function(points, closed) {
        closed = !!closed;
        points = points || [];
        // re-parse the points into CSG.Vector2D
        // and remove any duplicate points
        var prevpoint = null;
        if (closed && (points.length > 0)) {
            prevpoint = new CSG.Vector2D(points[points.length - 1]);
        }
        var newpoints = [];
        points.map(function(point) {
            point = new CSG.Vector2D(point);
            var skip = false;
            if (prevpoint !== null) {
                var distance = point.distanceTo(prevpoint);
                skip = distance < 1e-5;
            }
            if (!skip) { newpoints.push(point); }
            prevpoint = point;
        });
        this.points = newpoints;
        this.closed = closed;
    };

    /*
    Construct a (part of a) circle. Parameters:
      options.center: the center point of the arc (CSG.Vector2D or array [x,y])
      options.radius: the circle radius (float)
      options.startangle: the starting angle of the arc, in degrees
        0 degrees corresponds to [1,0]
        90 degrees to [0,1]
        and so on
      options.endangle: the ending angle of the arc, in degrees
      options.resolution: number of points per 360 degree of rotation
      options.maketangent: adds two extra tiny line segments at both ends of the circle
        this ensures that the gradients at the edges are tangent to the circle
    Returns a CSG.Path2D. The path is not closed (even if it is a 360 degree arc).
    close() the resulting path if you want to create a true circle.
    */
    CSG.Path2D.arc = function(options) {
        var center = CSG.parseOptionAs2DVector(options, "center", 0);
        var radius = CSG.parseOptionAsFloat(options, "radius", 1);
        var startangle = CSG.parseOptionAsFloat(options, "startangle", 0);
        var endangle = CSG.parseOptionAsFloat(options, "endangle", 360);
        var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
        var maketangent = CSG.parseOptionAsBool(options, "maketangent", false);
        // no need to make multiple turns:
        while (endangle - startangle >= 720) {
            endangle -= 360;
        }
        while (endangle - startangle <= -720) {
            endangle += 360;
        }
        var points = [],
            point;
        var absangledif = Math.abs(endangle - startangle);
        if (absangledif < 1e-5) {
            point = CSG.Vector2D.fromAngle(startangle / 180.0 * Math.PI).times(radius);
            points.push(point.plus(center));
        } else {
            var numsteps = Math.floor(resolution * absangledif / 360) + 1;
            var edgestepsize = numsteps * 0.5 / absangledif; // step size for half a degree
            if (edgestepsize > 0.25) { edgestepsize = 0.25; }
            var numsteps_mod = maketangent ? (numsteps + 2) : numsteps;
            for (var i = 0; i <= numsteps_mod; i++) {
                var step = i;
                if (maketangent) {
                    step = (i - 1) * (numsteps - 2 * edgestepsize) / numsteps + edgestepsize;
                    if (step < 0) { step = 0; }
                    if (step > numsteps) { step = numsteps; }
                }
                var angle = startangle + step * (endangle - startangle) / numsteps;
                point = CSG.Vector2D.fromAngle(angle / 180.0 * Math.PI).times(radius);
                points.push(point.plus(center));
            }
        }
        return new CSG.Path2D(points, false);
    };

    CSG.Path2D.prototype = {
        concat: function(otherpath) {
            if (this.closed || otherpath.closed) {
                throw new Error("Paths must not be closed");
            }
            var newpoints = this.points.concat(otherpath.points);
            return new CSG.Path2D(newpoints);
        },

        appendPoint: function(point) {
            if (this.closed) {
                throw new Error("Path must not be closed");
            }
            point = new CSG.Vector2D(point); // cast to Vector2D
            var newpoints = this.points.concat([point]);
            return new CSG.Path2D(newpoints);
        },

        appendPoints: function(points) {
            if (this.closed) {
                throw new Error("Path must not be closed");
            }
            var newpoints = this.points;
            points.forEach(function(point) {
                newpoints.push(new CSG.Vector2D(point)); // cast to Vector2D
            });
            return new CSG.Path2D(newpoints);
        },

        close: function() {
            return new CSG.Path2D(this.points, true);
        },

        // Extrude the path by following it with a rectangle (upright, perpendicular to the path direction)
        // Returns a CSG solid
        //   width: width of the extrusion, in the z=0 plane
        //   height: height of the extrusion in the z direction
        //   resolution: number of segments per 360 degrees for the curve in a corner
        rectangularExtrude: function(width, height, resolution) {
            var cag = this.expandToCAG(width / 2, resolution);
            var result = cag.extrude({
                offset: [0, 0, height]
            });
            return result;
        },

        // Expand the path to a CAG
        // This traces the path with a circle with radius pathradius
        expandToCAG: function(pathradius, resolution) {
            var this$1 = this;

            var sides = [];
            var numpoints = this.points.length;
            var startindex = 0;
            if (this.closed && (numpoints > 2)) { startindex = -1; }
            var prevvertex;
            for (var i = startindex; i < numpoints; i++) {
                var pointindex = i;
                if (pointindex < 0) { pointindex = numpoints - 1; }
                var point = this$1.points[pointindex];
                var vertex = new CAG.Vertex(point);
                if (i > startindex) {
                    var side = new CAG.Side(prevvertex, vertex);
                    sides.push(side);
                }
                prevvertex = vertex;
            }
            var shellcag = CAG.fromSides(sides);
            var expanded = shellcag.expandedShell(pathradius, resolution);
            return expanded;
        },

        innerToCAG: function() {
            if (!this.closed) { throw new Error("The path should be closed!"); }
            return CAG.fromPoints(this.points);
        },

        transform: function(matrix4x4) {
            var newpoints = this.points.map(function(point) {
                return point.multiply4x4(matrix4x4);
            });
            return new CSG.Path2D(newpoints, this.closed);
        },

        appendBezier: function(controlpoints, options) {
            var this$1 = this;

            if (arguments.length < 2) {
                options = {};
            }
            if (this.closed) {
                throw new Error("Path must not be closed");
            }
            if (!(controlpoints instanceof Array)) {
                throw new Error("appendBezier: should pass an array of control points")
            }
            if (controlpoints.length < 1) {
                throw new Error("appendBezier: need at least 1 control point")
            }
            if (this.points.length < 1) {
                throw new Error("appendBezier: path must already contain a point (the endpoint of the path is used as the starting point for the bezier curve)");
            }
            var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
            if (resolution < 4) { resolution = 4; }
            var factorials = [];
            var controlpoints_parsed = [];
            controlpoints_parsed.push(this.points[this.points.length - 1]); // start at the previous end point
            for (var i = 0; i < controlpoints.length; ++i) {
                var p = controlpoints[i];
                if (p === null) {
                    // we can pass null as the first control point. In that case a smooth gradient is ensured:
                    if (i != 0) {
                        throw new Error("appendBezier: null can only be passed as the first control point");
                    }
                    if (controlpoints.length < 2) {
                        throw new Error("appendBezier: null can only be passed if there is at least one more control point");
                    }
                    var lastBezierControlPoint;
                    if ('lastBezierControlPoint' in this$1) {
                        lastBezierControlPoint = this$1.lastBezierControlPoint;
                    } else {
                        if (this$1.points.length < 2) {
                            throw new Error("appendBezier: null is passed as a control point but this requires a previous bezier curve or at least two points in the existing path");
                        }
                        lastBezierControlPoint = this$1.points[this$1.points.length - 2];
                    }
                    // mirror the last bezier control point:
                    p = this$1.points[this$1.points.length - 1].times(2).minus(lastBezierControlPoint);
                } else {
                    p = new CSG.Vector2D(p); // cast to Vector2D
                }
                controlpoints_parsed.push(p);
            }
            var bezier_order = controlpoints_parsed.length - 1;
            var fact = 1;
            for (var i = 0; i <= bezier_order; ++i) {
                if (i > 0) { fact *= i; }
                factorials.push(fact);
            }
            var binomials = [];
            for (var i = 0; i <= bezier_order; ++i) {
                var binomial = factorials[bezier_order] / (factorials[i] * factorials[bezier_order - i]);
                binomials.push(binomial);
            }
            var getPointForT = function(t) {
                var t_k = 1; // = pow(t,k)
                var one_minus_t_n_minus_k = Math.pow(1 - t, bezier_order); // = pow( 1-t, bezier_order - k)
                var inv_1_minus_t = (t != 1) ? (1 / (1 - t)) : 1;
                var point = new CSG.Vector2D(0, 0);
                for (var k = 0; k <= bezier_order; ++k) {
                    if (k == bezier_order) { one_minus_t_n_minus_k = 1; }
                    var bernstein_coefficient = binomials[k] * t_k * one_minus_t_n_minus_k;
                    point = point.plus(controlpoints_parsed[k].times(bernstein_coefficient));
                    t_k *= t;
                    one_minus_t_n_minus_k *= inv_1_minus_t;
                }
                return point;
            };
            var newpoints = [];
            var newpoints_t = [];
            var numsteps = bezier_order + 1;
            for (var i = 0; i < numsteps; ++i) {
                var t = i / (numsteps - 1);
                var point = getPointForT(t);
                newpoints.push(point);
                newpoints_t.push(t);
            }
            // subdivide each segment until the angle at each vertex becomes small enough:
            var subdivide_base = 1;
            var maxangle = Math.PI * 2 / resolution; // segments may have differ no more in angle than this
            var maxsinangle = Math.sin(maxangle);
            while (subdivide_base < newpoints.length - 1) {
                var dir1 = newpoints[subdivide_base].minus(newpoints[subdivide_base - 1]).unit();
                var dir2 = newpoints[subdivide_base + 1].minus(newpoints[subdivide_base]).unit();
                var sinangle = dir1.cross(dir2); // this is the sine of the angle
                if (Math.abs(sinangle) > maxsinangle) {
                    // angle is too big, we need to subdivide
                    var t0 = newpoints_t[subdivide_base - 1];
                    var t1 = newpoints_t[subdivide_base + 1];
                    var t0_new = t0 + (t1 - t0) * 1 / 3;
                    var t1_new = t0 + (t1 - t0) * 2 / 3;
                    var point0_new = getPointForT(t0_new);
                    var point1_new = getPointForT(t1_new);
                    // remove the point at subdivide_base and replace with 2 new points:
                    newpoints.splice(subdivide_base, 1, point0_new, point1_new);
                    newpoints_t.splice(subdivide_base, 1, t0_new, t1_new);
                    // re - evaluate the angles, starting at the previous junction since it has changed:
                    subdivide_base--;
                    if (subdivide_base < 1) { subdivide_base = 1; }
                } else {
                    ++subdivide_base;
                }
            }
            // append to the previous points, but skip the first new point because it is identical to the last point:
            newpoints = this.points.concat(newpoints.slice(1));
            var result = new CSG.Path2D(newpoints);
            result.lastBezierControlPoint = controlpoints_parsed[controlpoints_parsed.length - 2];
            return result;
        },

        /*
         options:
         .resolution // smoothness of the arc (number of segments per 360 degree of rotation)
         // to create a circular arc:
         .radius
         // to create an elliptical arc:
         .xradius
         .yradius
         .xaxisrotation  // the rotation (in degrees) of the x axis of the ellipse with respect to the x axis of our coordinate system
         // this still leaves 4 possible arcs between the two given points. The following two flags select which one we draw:
         .clockwise // = true | false (default is false). Two of the 4 solutions draw clockwise with respect to the center point, the other 2 counterclockwise
         .large     // = true | false (default is false). Two of the 4 solutions are an arc longer than 180 degrees, the other two are <= 180 degrees
         This implementation follows the SVG arc specs. For the details see
         http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
         */
        appendArc: function(endpoint, options) {
            var decimals = 100000;
            if (arguments.length < 2) {
                options = {};
            }
            if (this.closed) {
                throw new Error("Path must not be closed");
            }
            if (this.points.length < 1) {
                throw new Error("appendArc: path must already contain a point (the endpoint of the path is used as the starting point for the arc)");
            }
            var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
            if (resolution < 4) { resolution = 4; }
            var xradius, yradius;
            if (('xradius' in options) || ('yradius' in options)) {
                if ('radius' in options) {
                    throw new Error("Should either give an xradius and yradius parameter, or a radius parameter");
                }
                xradius = CSG.parseOptionAsFloat(options, "xradius", 0);
                yradius = CSG.parseOptionAsFloat(options, "yradius", 0);
            } else {
                xradius = CSG.parseOptionAsFloat(options, "radius", 0);
                yradius = xradius;
            }
            var xaxisrotation = CSG.parseOptionAsFloat(options, "xaxisrotation", 0);
            var clockwise = CSG.parseOptionAsBool(options, "clockwise", false);
            var largearc = CSG.parseOptionAsBool(options, "large", false);
            var startpoint = this.points[this.points.length - 1];
            endpoint = new CSG.Vector2D(endpoint);
            // round to precision in order to have determinate calculations
            xradius = Math.round(xradius*decimals)/decimals;
            yradius = Math.round(yradius*decimals)/decimals;
            endpoint = new CSG.Vector2D(Math.round(endpoint.x*decimals)/decimals,Math.round(endpoint.y*decimals)/decimals);

            var sweep_flag = !clockwise;
            var newpoints = [];
            if ((xradius == 0) || (yradius == 0)) {
                // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes:
                // If rx = 0 or ry = 0, then treat this as a straight line from (x1, y1) to (x2, y2) and stop
                newpoints.push(endpoint);
            } else {
                xradius = Math.abs(xradius);
                yradius = Math.abs(yradius);

                // see http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes :
                var phi = xaxisrotation * Math.PI / 180.0;
                var cosphi = Math.cos(phi);
                var sinphi = Math.sin(phi);
                var minushalfdistance = startpoint.minus(endpoint).times(0.5);
                // F.6.5.1:
                // round to precision in order to have determinate calculations
                var x = Math.round((cosphi * minushalfdistance.x + sinphi * minushalfdistance.y)*decimals)/decimals;
                var y = Math.round((-sinphi * minushalfdistance.x + cosphi * minushalfdistance.y)*decimals)/decimals;
                var start_translated = new CSG.Vector2D(x,y);
                // F.6.6.2:
                var biglambda = (start_translated.x * start_translated.x) / (xradius * xradius) + (start_translated.y * start_translated.y) / (yradius * yradius);
                if (biglambda > 1.0) {
                    // F.6.6.3:
                    var sqrtbiglambda = Math.sqrt(biglambda);
                    xradius *= sqrtbiglambda;
                    yradius *= sqrtbiglambda;
                    // round to precision in order to have determinate calculations
                    xradius = Math.round(xradius*decimals)/decimals;
                    yradius = Math.round(yradius*decimals)/decimals;
                }
                // F.6.5.2:
                var multiplier1 = Math.sqrt((xradius * xradius * yradius * yradius - xradius * xradius * start_translated.y * start_translated.y - yradius * yradius * start_translated.x * start_translated.x) / (xradius * xradius * start_translated.y * start_translated.y + yradius * yradius * start_translated.x * start_translated.x));
                if (sweep_flag == largearc) { multiplier1 = -multiplier1; }
                var center_translated = new CSG.Vector2D(xradius * start_translated.y / yradius, -yradius * start_translated.x / xradius).times(multiplier1);
                // F.6.5.3:
                var center = new CSG.Vector2D(cosphi * center_translated.x - sinphi * center_translated.y, sinphi * center_translated.x + cosphi * center_translated.y).plus((startpoint.plus(endpoint)).times(0.5));
                // F.6.5.5:
                var vec1 = new CSG.Vector2D((start_translated.x - center_translated.x) / xradius, (start_translated.y - center_translated.y) / yradius);
                var vec2 = new CSG.Vector2D((-start_translated.x - center_translated.x) / xradius, (-start_translated.y - center_translated.y) / yradius);
                var theta1 = vec1.angleRadians();
                var theta2 = vec2.angleRadians();
                var deltatheta = theta2 - theta1;
                deltatheta = deltatheta % (2 * Math.PI);
                if ((!sweep_flag) && (deltatheta > 0)) {
                    deltatheta -= 2 * Math.PI;
                } else if ((sweep_flag) && (deltatheta < 0)) {
                    deltatheta += 2 * Math.PI;
                }

                // Ok, we have the center point and angle range (from theta1, deltatheta radians) so we can create the ellipse
                var numsteps = Math.ceil(Math.abs(deltatheta) / (2 * Math.PI) * resolution) + 1;
                if (numsteps < 1) { numsteps = 1; }
                for (var step = 1; step <= numsteps; step++) {
                    var theta = theta1 + step / numsteps * deltatheta;
                    var costheta = Math.cos(theta);
                    var sintheta = Math.sin(theta);
                    // F.6.3.1:
                    var point = new CSG.Vector2D(cosphi * xradius * costheta - sinphi * yradius * sintheta, sinphi * xradius * costheta + cosphi * yradius * sintheta).plus(center);
                    newpoints.push(point);
                }
            }
            newpoints = this.points.concat(newpoints);
            var result = new CSG.Path2D(newpoints);
            return result;
        },
    };

    // Add several convenience methods to the classes that support a transform() method:
    CSG.addTransformationMethodsToPrototype = function(prot) {
        prot.mirrored = function(plane) {
            return this.transform(CSG.Matrix4x4.mirroring(plane));
        };

        prot.mirroredX = function() {
            var plane = new CSG.Plane(CSG.Vector3D.Create(1, 0, 0), 0);
            return this.mirrored(plane);
        };

        prot.mirroredY = function() {
            var plane = new CSG.Plane(CSG.Vector3D.Create(0, 1, 0), 0);
            return this.mirrored(plane);
        };

        prot.mirroredZ = function() {
            var plane = new CSG.Plane(CSG.Vector3D.Create(0, 0, 1), 0);
            return this.mirrored(plane);
        };

        prot.translate = function(v) {
            return this.transform(CSG.Matrix4x4.translation(v));
        };

        prot.scale = function(f) {
            return this.transform(CSG.Matrix4x4.scaling(f));
        };

        prot.rotateX = function(deg) {
            return this.transform(CSG.Matrix4x4.rotationX(deg));
        };

        prot.rotateY = function(deg) {
            return this.transform(CSG.Matrix4x4.rotationY(deg));
        };

        prot.rotateZ = function(deg) {
            return this.transform(CSG.Matrix4x4.rotationZ(deg));
        };

        prot.rotate = function(rotationCenter, rotationAxis, degrees) {
            return this.transform(CSG.Matrix4x4.rotation(rotationCenter, rotationAxis, degrees));
        };

        prot.rotateEulerAngles = function(alpha, beta, gamma, position) {
            position = position || [0,0,0];

            var Rz1 = CSG.Matrix4x4.rotationZ(alpha);
            var Rx  = CSG.Matrix4x4.rotationX(beta);
            var Rz2 = CSG.Matrix4x4.rotationZ(gamma);
            var T   = CSG.Matrix4x4.translation(new CSG.Vector3D(position));

            return this.transform(Rz2.multiply(Rx).multiply(Rz1).multiply(T));
        };
    };

    // TODO: consider generalization and adding to addTransformationMethodsToPrototype
    CSG.addCenteringToPrototype = function(prot, axes) {
        prot.center = function(cAxes) {
            cAxes = Array.prototype.map.call(arguments, function(a) {
                return a; //.toLowerCase();
            });
            // no args: center on all axes
            if (!cAxes.length) {
                cAxes = axes.slice();
            }
            var b = this.getBounds();
            return this.translate(axes.map(function(a) {
                return cAxes.indexOf(a) > -1 ?
                    -(b[0][a] + b[1][a])/2 : 0;
            }));
        };
    };

    //////////////////
    // CAG: solid area geometry: like CSG but 2D
    // Each area consists of a number of sides
    // Each side is a line between 2 points
    var CAG = function() {
        this.sides = [];
        this.isCanonicalized = false;
    };

    // create from an untyped object with identical property names:
    CAG.fromObject = function(obj) {
        var sides = obj.sides.map(function(s) {
            return CAG.Side.fromObject(s);
        });
        var cag = CAG.fromSides(sides);
        return cag;
    };

    // Construct a CAG from a list of `CAG.Side` instances.
    CAG.fromSides = function(sides) {
        var cag = new CAG();
        cag.sides = sides;
        return cag;
    };

    // Construct a CAG from a list of points (a polygon)
    // Rotation direction of the points is not relevant. Points can be a convex or concave polygon.
    // Polygon must not self intersect
    CAG.fromPoints = function(points) {
        var numpoints = points.length;
        if (numpoints < 3) { throw new Error("CAG shape needs at least 3 points"); }
        var sides = [];
        var prevpoint = new CSG.Vector2D(points[numpoints - 1]);
        var prevvertex = new CAG.Vertex(prevpoint);
        points.map(function(p) {
            var point = new CSG.Vector2D(p);
            var vertex = new CAG.Vertex(point);
            var side = new CAG.Side(prevvertex, vertex);
            sides.push(side);
            prevvertex = vertex;
        });
        var result = CAG.fromSides(sides);
        if (result.isSelfIntersecting()) {
            throw new Error("Polygon is self intersecting!");
        }
        var area = result.area();
        if (Math.abs(area) < 1e-5) {
            throw new Error("Degenerate polygon!");
        }
        if (area < 0) {
            result = result.flipped();
        }
        result = result.canonicalized();
        return result;
    };

    // Like CAG.fromPoints but does not check if it's a valid polygon.
    // Points should rotate counter clockwise
    CAG.fromPointsNoCheck = function(points) {
        var sides = [];
        var prevpoint = new CSG.Vector2D(points[points.length - 1]);
        var prevvertex = new CAG.Vertex(prevpoint);
        points.map(function(p) {
            var point = new CSG.Vector2D(p);
            var vertex = new CAG.Vertex(point);
            var side = new CAG.Side(prevvertex, vertex);
            sides.push(side);
            prevvertex = vertex;
        });
        return CAG.fromSides(sides);
    };

    // Converts a CSG to a CAG. The CSG must consist of polygons with only z coordinates +1 and -1
    // as constructed by CAG._toCSGWall(-1, 1). This is so we can use the 3D union(), intersect() etc
    CAG.fromFakeCSG = function(csg) {
        var sides = csg.polygons.map(function(p) {
            return CAG.Side._fromFakePolygon(p);
            })
            .filter(function(s) {
                return s !== null;
        });
        return CAG.fromSides(sides);
    };

    // see if the line between p0start and p0end intersects with the line between p1start and p1end
    // returns true if the lines strictly intersect, the end points are not counted!
    CAG.linesIntersect = function(p0start, p0end, p1start, p1end) {
        if (p0end.equals(p1start) || p1end.equals(p0start)) {
            var d = p1end.minus(p1start).unit().plus(p0end.minus(p0start).unit()).length();
            if (d < 1e-5) {
                return true;
            }
        } else {
            var d0 = p0end.minus(p0start);
            var d1 = p1end.minus(p1start);
            if (Math.abs(d0.cross(d1)) < 1e-9) { return false; } // lines are parallel
            var alphas = CSG.solve2Linear(-d0.x, d1.x, -d0.y, d1.y, p0start.x - p1start.x, p0start.y - p1start.y);
            if ((alphas[0] > 1e-6) && (alphas[0] < 0.999999) && (alphas[1] > 1e-5) && (alphas[1] < 0.999999)) { return true; }
            //    if( (alphas[0] >= 0) && (alphas[0] <= 1) && (alphas[1] >= 0) && (alphas[1] <= 1) ) return true;
        }
        return false;
    };

    /* Construct a circle
    options:
      center: a 2D center point
      radius: a scalar
      resolution: number of sides per 360 degree rotation
    returns a CAG object
    */
    CAG.circle = function(options) {
        options = options || {};
        var center = CSG.parseOptionAs2DVector(options, "center", [0, 0]);
        var radius = CSG.parseOptionAsFloat(options, "radius", 1);
        var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
        var sides = [];
        var prevvertex;
        for (var i = 0; i <= resolution; i++) {
            var radians = 2 * Math.PI * i / resolution;
            var point = CSG.Vector2D.fromAngleRadians(radians).times(radius).plus(center);
            var vertex = new CAG.Vertex(point);
            if (i > 0) {
                sides.push(new CAG.Side(prevvertex, vertex));
            }
            prevvertex = vertex;
        }
        return CAG.fromSides(sides);
    };

    /* Construct an ellispe
    options:
      center: a 2D center point
      radius: a 2D vector with width and height
      resolution: number of sides per 360 degree rotation
    returns a CAG object
    */
    CAG.ellipse = function(options) {
        options = options || {};
        var c = CSG.parseOptionAs2DVector(options, "center", [0, 0]);
        var r = CSG.parseOptionAs2DVector(options, "radius", [1, 1]);
        r = r.abs(); // negative radii make no sense
        var res = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);

        var e2 = new CSG.Path2D([[c.x,c.y + r.y]]);
        e2 = e2.appendArc([c.x,c.y - r.y], {
            xradius: r.x,
            yradius: r.y,
            xaxisrotation: 0,
            resolution: res,
            clockwise: true,
            large: false,
        });
        e2 = e2.appendArc([c.x,c.y + r.y], {
            xradius: r.x,
            yradius: r.y,
            xaxisrotation: 0,
            resolution: res,
            clockwise: true,
            large: false,
        });
        e2 = e2.close();
        return e2.innerToCAG();
    };

    /* Construct a rectangle
    options:
      center: a 2D center point
      radius: a 2D vector with width and height
      returns a CAG object
    */
    CAG.rectangle = function(options) {
        options = options || {};
        var c, r;
        if (('corner1' in options) || ('corner2' in options)) {
            if (('center' in options) || ('radius' in options)) {
                throw new Error("rectangle: should either give a radius and center parameter, or a corner1 and corner2 parameter")
            }
            corner1 = CSG.parseOptionAs2DVector(options, "corner1", [0, 0]);
            corner2 = CSG.parseOptionAs2DVector(options, "corner2", [1, 1]);
            c = corner1.plus(corner2).times(0.5);
            r = corner2.minus(corner1).times(0.5);
        } else {
            c = CSG.parseOptionAs2DVector(options, "center", [0, 0]);
            r = CSG.parseOptionAs2DVector(options, "radius", [1, 1]);
        }
        r = r.abs(); // negative radii make no sense
        var rswap = new CSG.Vector2D(r.x, -r.y);
        var points = [
            c.plus(r), c.plus(rswap), c.minus(r), c.minus(rswap)
        ];
        return CAG.fromPoints(points);
    };

    //     var r = CSG.roundedRectangle({
    //       center: [0, 0],
    //       radius: [2, 1],
    //       roundradius: 0.2,
    //       resolution: 8,
    //     });
    CAG.roundedRectangle = function(options) {
        options = options || {};
        var center, radius;
        if (('corner1' in options) || ('corner2' in options)) {
            if (('center' in options) || ('radius' in options)) {
                throw new Error("roundedRectangle: should either give a radius and center parameter, or a corner1 and corner2 parameter")
            }
            corner1 = CSG.parseOptionAs2DVector(options, "corner1", [0, 0]);
            corner2 = CSG.parseOptionAs2DVector(options, "corner2", [1, 1]);
            center = corner1.plus(corner2).times(0.5);
            radius = corner2.minus(corner1).times(0.5);
        } else {
            center = CSG.parseOptionAs2DVector(options, "center", [0, 0]);
            radius = CSG.parseOptionAs2DVector(options, "radius", [1, 1]);
        }
        radius = radius.abs(); // negative radii make no sense
        var roundradius = CSG.parseOptionAsFloat(options, "roundradius", 0.2);
        var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution2D);
        var maxroundradius = Math.min(radius.x, radius.y);
        maxroundradius -= 0.1;
        roundradius = Math.min(roundradius, maxroundradius);
        roundradius = Math.max(0, roundradius);
        radius = new CSG.Vector2D(radius.x - roundradius, radius.y - roundradius);
        var rect = CAG.rectangle({
            center: center,
            radius: radius
        });
        if (roundradius > 0) {
            rect = rect.expand(roundradius, resolution);
        }
        return rect;
    };

    // Reconstruct a CAG from the output of toCompactBinary()
    CAG.fromCompactBinary = function(bin) {
        if (bin['class'] != "CAG") { throw new Error("Not a CAG"); }
        var vertices = [];
        var vertexData = bin.vertexData;
        var numvertices = vertexData.length / 2;
        var arrayindex = 0;
        for (var vertexindex = 0; vertexindex < numvertices; vertexindex++) {
            var x = vertexData[arrayindex++];
            var y = vertexData[arrayindex++];
            var pos = new CSG.Vector2D(x, y);
            var vertex = new CAG.Vertex(pos);
            vertices.push(vertex);
        }

        var sides = [];
        var numsides = bin.sideVertexIndices.length / 2;
        arrayindex = 0;
        for (var sideindex = 0; sideindex < numsides; sideindex++) {
            var vertexindex0 = bin.sideVertexIndices[arrayindex++];
            var vertexindex1 = bin.sideVertexIndices[arrayindex++];
            var side = new CAG.Side(vertices[vertexindex0], vertices[vertexindex1]);
            sides.push(side);
        }
        var cag = CAG.fromSides(sides);
        cag.isCanonicalized = true;
        return cag;
    };

    function fnSortByIndex(a, b) {
        return a.index - b.index;
    }

    CAG.prototype = {
        toString: function() {
            var result = "CAG (" + this.sides.length + " sides):\n";
            this.sides.map(function(side) {
                result += "  " + side.toString() + "\n";
            });
            return result;
        },

        _toCSGWall: function(z0, z1) {
            var polygons = this.sides.map(function(side) {
                return side.toPolygon3D(z0, z1);
            });
            return CSG.fromPolygons(polygons);
        },

        _toVector3DPairs: function(m) {
            // transform m
            var pairs = this.sides.map(function(side) {
                var p0 = side.vertex0.pos, p1 = side.vertex1.pos;
                return [CSG.Vector3D.Create(p0.x, p0.y, 0),
                    CSG.Vector3D.Create(p1.x, p1.y, 0)];
            });
            if (typeof m != 'undefined') {
                pairs = pairs.map(function(pair) {
                    return pair.map(function(v) {
                        return v.transform(m);
                    });
                });
            }
            return pairs;
        },

        /*
         * transform a cag into the polygons of a corresponding 3d plane, positioned per options
         * Accepts a connector for plane positioning, or optionally
         * single translation, axisVector, normalVector arguments
         * (toConnector has precedence over single arguments if provided)
         */
        _toPlanePolygons: function(options) {
            var flipped = options.flipped || false;
            // reference connector for transformation
            var origin = [0, 0, 0], defaultAxis = [0, 0, 1], defaultNormal = [0, 1, 0];
            var thisConnector = new CSG.Connector(origin, defaultAxis, defaultNormal);
            // translated connector per options
            var translation = options.translation || origin;
            var axisVector = options.axisVector || defaultAxis;
            var normalVector = options.normalVector || defaultNormal;
            // will override above if options has toConnector
            var toConnector = options.toConnector ||
                new CSG.Connector(translation, axisVector, normalVector);
            // resulting transform
            var m = thisConnector.getTransformationTo(toConnector, false, 0);
            // create plane as a (partial non-closed) CSG in XY plane
            var bounds = this.getBounds();
            bounds[0] = bounds[0].minus(new CSG.Vector2D(1, 1));
            bounds[1] = bounds[1].plus(new CSG.Vector2D(1, 1));
            var csgshell = this._toCSGWall(-1, 1);
            var csgplane = CSG.fromPolygons([new CSG.Polygon([
                new CSG.Vertex(new CSG.Vector3D(bounds[0].x, bounds[0].y, 0)),
                new CSG.Vertex(new CSG.Vector3D(bounds[1].x, bounds[0].y, 0)),
                new CSG.Vertex(new CSG.Vector3D(bounds[1].x, bounds[1].y, 0)),
                new CSG.Vertex(new CSG.Vector3D(bounds[0].x, bounds[1].y, 0))
            ])]);
            if (flipped) {
                csgplane = csgplane.invert();
            }
            // intersectSub -> prevent premature retesselate/canonicalize
            csgplane = csgplane.intersectSub(csgshell);
            // only keep the polygons in the z plane:
            var polys = csgplane.polygons.filter(function(polygon) {
                return Math.abs(polygon.plane.normal.z) > 0.99;
            });
            // finally, position the plane per passed transformations
            return polys.map(function(poly) {
                return poly.transform(m);
            });
        },


        /*
         * given 2 connectors, this returns all polygons of a "wall" between 2
         * copies of this cag, positioned in 3d space as "bottom" and
         * "top" plane per connectors toConnector1, and toConnector2, respectively 
         */
        _toWallPolygons: function(options) {
            // normals are going to be correct as long as toConn2.point - toConn1.point
            // points into cag normal direction (check in caller)
            // arguments: options.toConnector1, options.toConnector2, options.cag
            //     walls go from toConnector1 to toConnector2
            //     optionally, target cag to point to - cag needs to have same number of sides as this!
            var origin = [0, 0, 0], defaultAxis = [0, 0, 1], defaultNormal = [0, 1, 0];
            var thisConnector = new CSG.Connector(origin, defaultAxis, defaultNormal);
            // arguments:
            var toConnector1 = options.toConnector1;
            // var toConnector2 = new CSG.Connector([0, 0, -30], defaultAxis, defaultNormal);
            var toConnector2 = options.toConnector2;
            if (!(toConnector1 instanceof CSG.Connector && toConnector2 instanceof CSG.Connector)) {
                throw('could not parse CSG.Connector arguments toConnector1 or toConnector2');
            }
            if (options.cag) {
                if (options.cag.sides.length != this.sides.length) {
                    throw('target cag needs same sides count as start cag');
                }
            }
            // target cag is same as this unless specified
            var toCag = options.cag || this;
            var m1 = thisConnector.getTransformationTo(toConnector1, false, 0);
            var m2 = thisConnector.getTransformationTo(toConnector2, false, 0);
            var vps1 = this._toVector3DPairs(m1);
            var vps2 = toCag._toVector3DPairs(m2);

            var polygons = [];
            vps1.forEach(function(vp1, i) {
                polygons.push(new CSG.Polygon([
                    new CSG.Vertex(vps2[i][1]), new CSG.Vertex(vps2[i][0]), new CSG.Vertex(vp1[0])]));
                polygons.push(new CSG.Polygon([
                    new CSG.Vertex(vps2[i][1]), new CSG.Vertex(vp1[0]), new CSG.Vertex(vp1[1])]));
            });
            return polygons;
        },

        union: function(cag) {
            var cags;
            if (cag instanceof Array) {
                cags = cag;
            } else {
                cags = [cag];
            }
            var r = this._toCSGWall(-1, 1);
            var r = r.union(
                cags.map(function(cag) {
                    return cag._toCSGWall(-1, 1).reTesselated();
                }), false, false);
            return CAG.fromFakeCSG(r).canonicalized();
        },

        subtract: function(cag) {
            var cags;
            if (cag instanceof Array) {
                cags = cag;
            } else {
                cags = [cag];
            }
            var r = this._toCSGWall(-1, 1);
            cags.map(function(cag) {
                r = r.subtractSub(cag._toCSGWall(-1, 1), false, false);
            });
            r = r.reTesselated();
            r = r.canonicalized();
            r = CAG.fromFakeCSG(r);
            r = r.canonicalized();
            return r;
        },

        intersect: function(cag) {
            var cags;
            if (cag instanceof Array) {
                cags = cag;
            } else {
                cags = [cag];
            }
            var r = this._toCSGWall(-1, 1);
            cags.map(function(cag) {
                r = r.intersectSub(cag._toCSGWall(-1, 1), false, false);
            });
            r = r.reTesselated();
            r = r.canonicalized();
            r = CAG.fromFakeCSG(r);
            r = r.canonicalized();
            return r;
        },

        transform: function(matrix4x4) {
            var ismirror = matrix4x4.isMirroring();
            var newsides = this.sides.map(function(side) {
                return side.transform(matrix4x4);
            });
            var result = CAG.fromSides(newsides);
            if (ismirror) {
                result = result.flipped();
            }
            return result;
        },

        // see http://local.wasp.uwa.edu.au/~pbourke/geometry/polyarea/ :
        // Area of the polygon. For a counter clockwise rotating polygon the area is positive, otherwise negative
        // Note(bebbi): this looks wrong. See polygon getArea()
        area: function() {
            var polygonArea = 0;
            this.sides.map(function(side) {
                polygonArea += side.vertex0.pos.cross(side.vertex1.pos);
            });
            polygonArea *= 0.5;
            return polygonArea;
        },

        flipped: function() {
            var newsides = this.sides.map(function(side) {
                return side.flipped();
            });
            newsides.reverse();
            return CAG.fromSides(newsides);
        },

        getBounds: function() {
            var minpoint;
            if (this.sides.length === 0) {
                minpoint = new CSG.Vector2D(0, 0);
            } else {
                minpoint = this.sides[0].vertex0.pos;
            }
            var maxpoint = minpoint;
            this.sides.map(function(side) {
                minpoint = minpoint.min(side.vertex0.pos);
                minpoint = minpoint.min(side.vertex1.pos);
                maxpoint = maxpoint.max(side.vertex0.pos);
                maxpoint = maxpoint.max(side.vertex1.pos);
            });
            return [minpoint, maxpoint];
        },

        isSelfIntersecting: function(debug) {
            var this$1 = this;

            var numsides = this.sides.length;
            for (var i = 0; i < numsides; i++) {
                var side0 = this$1.sides[i];
                for (var ii = i + 1; ii < numsides; ii++) {
                    var side1 = this$1.sides[ii];
                    if (CAG.linesIntersect(side0.vertex0.pos, side0.vertex1.pos, side1.vertex0.pos, side1.vertex1.pos)) {
                        if (debug) { OpenJsCad.log(side0); OpenJsCad.log(side1);}
                        return true;
                    }
                }
            }
            return false;
        },

        expandedShell: function(radius, resolution) {
            resolution = resolution || 8;
            if (resolution < 4) { resolution = 4; }
            var cags = [];
            var pointmap = {};
            var cag = this.canonicalized();
            cag.sides.map(function(side) {
                var d = side.vertex1.pos.minus(side.vertex0.pos);
                var dl = d.length();
                if (dl > 1e-5) {
                    d = d.times(1.0 / dl);
                    var normal = d.normal().times(radius);
                    var shellpoints = [
                        side.vertex1.pos.plus(normal),
                        side.vertex1.pos.minus(normal),
                        side.vertex0.pos.minus(normal),
                        side.vertex0.pos.plus(normal)
                    ];
                    //      var newcag = CAG.fromPointsNoCheck(shellpoints);
                    var newcag = CAG.fromPoints(shellpoints);
                    cags.push(newcag);
                    for (var step = 0; step < 2; step++) {
                        var p1 = (step === 0) ? side.vertex0.pos : side.vertex1.pos;
                        var p2 = (step === 0) ? side.vertex1.pos : side.vertex0.pos;
                        var tag = p1.x + " " + p1.y;
                        if (!(tag in pointmap)) {
                            pointmap[tag] = [];
                        }
                        pointmap[tag].push({
                            "p1": p1,
                            "p2": p2
                        });
                    }
                }
            });
            for (var tag in pointmap) {
                var m = pointmap[tag];
                var angle1, angle2;
                var pcenter = m[0].p1;
                if (m.length == 2) {
                    var end1 = m[0].p2;
                    var end2 = m[1].p2;
                    angle1 = end1.minus(pcenter).angleDegrees();
                    angle2 = end2.minus(pcenter).angleDegrees();
                    if (angle2 < angle1) { angle2 += 360; }
                    if (angle2 >= (angle1 + 360)) { angle2 -= 360; }
                    if (angle2 < angle1 + 180) {
                        var t = angle2;
                        angle2 = angle1 + 360;
                        angle1 = t;
                    }
                    angle1 += 90;
                    angle2 -= 90;
                } else {
                    angle1 = 0;
                    angle2 = 360;
                }
                var fullcircle = (angle2 > angle1 + 359.999);
                if (fullcircle) {
                    angle1 = 0;
                    angle2 = 360;
                }
                if (angle2 > (angle1 + 1e-5)) {
                    var points = [];
                    if (!fullcircle) {
                        points.push(pcenter);
                    }
                    var numsteps = Math.round(resolution * (angle2 - angle1) / 360);
                    if (numsteps < 1) { numsteps = 1; }
                    for (var step = 0; step <= numsteps; step++) {
                        var angle = angle1 + step / numsteps * (angle2 - angle1);
                        if (step == numsteps) { angle = angle2; } // prevent rounding errors
                        var point = pcenter.plus(CSG.Vector2D.fromAngleDegrees(angle).times(radius));
                        if ((!fullcircle) || (step > 0)) {
                            points.push(point);
                        }
                    }
                    var newcag = CAG.fromPointsNoCheck(points);
                    cags.push(newcag);
                }
            }
            var result = new CAG();
            result = result.union(cags);
            return result;
        },

        expand: function(radius, resolution) {
            var result = this.union(this.expandedShell(radius, resolution));
            return result;
        },

        contract: function(radius, resolution) {
            var result = this.subtract(this.expandedShell(radius, resolution));
            return result;
        },

        // extrude the CAG in a certain plane. 
        // Giving just a plane is not enough, multiple different extrusions in the same plane would be possible
        // by rotating around the plane's origin. An additional right-hand vector should be specified as well,
        // and this is exactly a CSG.OrthoNormalBasis.
        // orthonormalbasis: characterizes the plane in which to extrude
        // depth: thickness of the extruded shape. Extrusion is done symmetrically above and below the plane.
        extrudeInOrthonormalBasis: function(orthonormalbasis, depth) {
            // first extrude in the regular Z plane:
            if (!(orthonormalbasis instanceof CSG.OrthoNormalBasis)) {
                throw new Error("extrudeInPlane: the first parameter should be a CSG.OrthoNormalBasis");
            }
            var extruded = this.extrude({
                offset: [0, 0, depth]
            });
            var matrix = orthonormalbasis.getInverseProjectionMatrix();
            extruded = extruded.transform(matrix);
            return extruded;
        },

        // Extrude in a standard cartesian plane, specified by two axis identifiers. Each identifier can be
        // one of ["X","Y","Z","-X","-Y","-Z"]
        // The 2d x axis will map to the first given 3D axis, the 2d y axis will map to the second.
        // See CSG.OrthoNormalBasis.GetCartesian for details.
        extrudeInPlane: function(axis1, axis2, depth) {
            return this.extrudeInOrthonormalBasis(CSG.OrthoNormalBasis.GetCartesian(axis1, axis2), depth);
        },

        // extruded=cag.extrude({offset: [0,0,10], twistangle: 360, twiststeps: 100});
        // linear extrusion of 2D shape, with optional twist
        // The 2d shape is placed in in z=0 plane and extruded into direction <offset> (a CSG.Vector3D)
        // The final face is rotated <twistangle> degrees. Rotation is done around the origin of the 2d shape (i.e. x=0, y=0)
        // twiststeps determines the resolution of the twist (should be >= 1)
        // returns a CSG object
        extrude: function(options) {
            var this$1 = this;

            if (this.sides.length == 0) {
                // empty!
                return new CSG();
            }
            var offsetVector = CSG.parseOptionAs3DVector(options, "offset", [0, 0, 1]);
            var twistangle = CSG.parseOptionAsFloat(options, "twistangle", 0);
            var twiststeps = CSG.parseOptionAsInt(options, "twiststeps", CSG.defaultResolution3D);
            if (offsetVector.z == 0) {
                throw('offset cannot be orthogonal to Z axis');
            }
            if (twistangle == 0 || twiststeps < 1) {
                twiststeps = 1;
            }
            var normalVector = CSG.Vector3D.Create(0, 1, 0);

            var polygons = [];
            // bottom and top
            polygons = polygons.concat(this._toPlanePolygons({translation: [0, 0, 0],
                normalVector: normalVector, flipped: !(offsetVector.z < 0)}));
            polygons = polygons.concat(this._toPlanePolygons({translation: offsetVector,
                normalVector: normalVector.rotateZ(twistangle), flipped: offsetVector.z < 0}));
            // walls
            for (var i = 0; i < twiststeps; i++) {
                var c1 = new CSG.Connector(offsetVector.times(i / twiststeps), [0, 0, offsetVector.z],
                    normalVector.rotateZ(i * twistangle/twiststeps));
                var c2 = new CSG.Connector(offsetVector.times((i + 1) / twiststeps), [0, 0, offsetVector.z],
                    normalVector.rotateZ((i + 1) * twistangle/twiststeps));
                polygons = polygons.concat(this$1._toWallPolygons({toConnector1: c1, toConnector2: c2}));
            }

            return CSG.fromPolygons(polygons);
        },

        /*
         * extrude CAG to 3d object by rotating the origin around the y axis
         * (and turning everything into XY plane)
         * arguments: options dict with angle and resolution, both optional
         */
        rotateExtrude: function(options) {
            var this$1 = this;

            var alpha = CSG.parseOptionAsFloat(options, "angle", 360);
            var resolution = CSG.parseOptionAsInt(options, "resolution", CSG.defaultResolution3D);

            var EPS = 1e-5;

            alpha = alpha > 360 ? alpha % 360 : alpha;
            var origin = [0, 0, 0];
            var axisV = CSG.Vector3D.Create(0, 1, 0);
            var normalV = [0, 0, 1];
            var polygons = [];
            // planes only needed if alpha > 0
            var connS = new CSG.Connector(origin, axisV, normalV);
            if (alpha > 0 && alpha < 360) {
                // we need to rotate negative to satisfy wall function condition of
                // building in the direction of axis vector
                var connE = new CSG.Connector(origin, axisV.rotateZ(-alpha), normalV);
                polygons = polygons.concat(
                    this._toPlanePolygons({toConnector: connS, flipped: true}));
                polygons = polygons.concat(
                    this._toPlanePolygons({toConnector: connE}));
            }
            var connT1 = connS, connT2;
            var step = alpha/resolution;
            for (var a = step; a <= alpha + EPS; a += step) {
                connT2 = new CSG.Connector(origin, axisV.rotateZ(-a), normalV);
                polygons = polygons.concat(this$1._toWallPolygons(
                    {toConnector1: connT1, toConnector2: connT2}));
                connT1 = connT2;
            }
            return CSG.fromPolygons(polygons).reTesselated();
        },

        // check if we are a valid CAG (for debugging)
        // NOTE(bebbi) uneven side count doesn't work because rounding with EPS isn't taken into account
        check: function() {
            var EPS = 1e-5;
            var errors = [];
            if (this.isSelfIntersecting(true)) {
                errors.push("Self intersects");
            }
            var pointcount = {};
            this.sides.map(function(side) {
                function mappoint(p) {
                    var tag = p.x + " " + p.y;
                    if (!(tag in pointcount)) { pointcount[tag] = 0; }
                    pointcount[tag] ++;
                }
                mappoint(side.vertex0.pos);
                mappoint(side.vertex1.pos);
            });
            for (var tag in pointcount) {
                var count = pointcount[tag];
                if (count & 1) {
                    errors.push("Uneven number of sides (" + count + ") for point " + tag);
                }
            }
            var area = this.area();
            if (area < EPS*EPS) {
                errors.push("Area is " + area);
            }
            if (errors.length > 0) {
                var ertxt = "";
                errors.map(function(err) {
                    ertxt += err + "\n";
                });
                throw new Error(ertxt);
            }
        },

        canonicalized: function() {
            if (this.isCanonicalized) {
                return this;
            } else {
                var factory = new CAG.fuzzyCAGFactory();
                var result = factory.getCAG(this);
                result.isCanonicalized = true;
                return result;
            }
        },

        toCompactBinary: function() {
            var cag = this.canonicalized();
            var numsides = cag.sides.length;
            var vertexmap = {};
            var vertices = [];
            var numvertices = 0;
            var sideVertexIndices = new Uint32Array(2 * numsides);
            var sidevertexindicesindex = 0;
            cag.sides.map(function(side) {
                [side.vertex0, side.vertex1].map(function(v) {
                    var vertextag = v.getTag();
                    var vertexindex;
                    if (!(vertextag in vertexmap)) {
                        vertexindex = numvertices++;
                        vertexmap[vertextag] = vertexindex;
                        vertices.push(v);
                    } else {
                        vertexindex = vertexmap[vertextag];
                    }
                    sideVertexIndices[sidevertexindicesindex++] = vertexindex;
                });
            });
            var vertexData = new Float64Array(numvertices * 2);
            var verticesArrayIndex = 0;
            vertices.map(function(v) {
                var pos = v.pos;
                vertexData[verticesArrayIndex++] = pos._x;
                vertexData[verticesArrayIndex++] = pos._y;
            });
            var result = {
                'class': "CAG",
                sideVertexIndices: sideVertexIndices,
                vertexData: vertexData
            };
            return result;
        },

        getOutlinePaths: function() {
            var cag = this.canonicalized();
            var sideTagToSideMap = {};
            var startVertexTagToSideTagMap = {};
            cag.sides.map(function(side) {
                var sidetag = side.getTag();
                sideTagToSideMap[sidetag] = side;
                var startvertextag = side.vertex0.getTag();
                if (!(startvertextag in startVertexTagToSideTagMap)) {
                    startVertexTagToSideTagMap[startvertextag] = [];
                }
                startVertexTagToSideTagMap[startvertextag].push(sidetag);
            });
            var paths = [];
            while (true) {
                var startsidetag = null;
                for (var aVertexTag in startVertexTagToSideTagMap) {
                    var sidesForThisVertex = startVertexTagToSideTagMap[aVertexTag];
                    startsidetag = sidesForThisVertex[0];
                    sidesForThisVertex.splice(0, 1);
                    if (sidesForThisVertex.length === 0) {
                        delete startVertexTagToSideTagMap[aVertexTag];
                    }
                    break;
                }
                if (startsidetag === null) { break; } // we've had all sides
                var connectedVertexPoints = [];
                var sidetag = startsidetag;
                var thisside = sideTagToSideMap[sidetag];
                var startvertextag = thisside.vertex0.getTag();
                while (true) {
                    connectedVertexPoints.push(thisside.vertex0.pos);
                    var nextvertextag = thisside.vertex1.getTag();
                    if (nextvertextag == startvertextag) { break; } // we've closed the polygon
                    if (!(nextvertextag in startVertexTagToSideTagMap)) {
                        throw new Error("Area is not closed!");
                    }
                    var nextpossiblesidetags = startVertexTagToSideTagMap[nextvertextag];
                    var nextsideindex = -1;
                    if (nextpossiblesidetags.length == 1) {
                        nextsideindex = 0;
                    } else {
                        // more than one side starting at the same vertex. This means we have
                        // two shapes touching at the same corner
                        var bestangle = null;
                        var thisangle = thisside.direction().angleDegrees();
                        for (var sideindex = 0; sideindex < nextpossiblesidetags.length; sideindex++) {
                            var nextpossiblesidetag = nextpossiblesidetags[sideindex];
                            var possibleside = sideTagToSideMap[nextpossiblesidetag];
                            var angle = possibleside.direction().angleDegrees();
                            var angledif = angle - thisangle;
                            if (angledif < -180) { angledif += 360; }
                            if (angledif >= 180) { angledif -= 360; }
                            if ((nextsideindex < 0) || (angledif > bestangle)) {
                                nextsideindex = sideindex;
                                bestangle = angledif;
                            }
                        }
                    }
                    var nextsidetag = nextpossiblesidetags[nextsideindex];
                    nextpossiblesidetags.splice(nextsideindex, 1);
                    if (nextpossiblesidetags.length === 0) {
                        delete startVertexTagToSideTagMap[nextvertextag];
                    }
                    thisside = sideTagToSideMap[nextsidetag];
                } // inner loop
                var path = new CSG.Path2D(connectedVertexPoints, true);
                paths.push(path);
            } // outer loop
            return paths;
        },

        /*
        cag = cag.overCutInsideCorners(cutterradius);

        Using a CNC router it's impossible to cut out a true sharp inside corner. The inside corner
        will be rounded due to the radius of the cutter. This function compensates for this by creating
        an extra cutout at each inner corner so that the actual cut out shape will be at least as large
        as needed.
        */
        overCutInsideCorners: function(cutterradius) {
            var cag = this.canonicalized();
            // for each vertex determine the 'incoming' side and 'outgoing' side:
            var pointmap = {}; // tag => {pos: coord, from: [], to: []}
            cag.sides.map(function(side) {
                if (!(side.vertex0.getTag() in pointmap)) {
                    pointmap[side.vertex0.getTag()] = {
                        pos: side.vertex0.pos,
                        from: [],
                        to: []
                    };
                }
                pointmap[side.vertex0.getTag()].to.push(side.vertex1.pos);
                if (!(side.vertex1.getTag() in pointmap)) {
                    pointmap[side.vertex1.getTag()] = {
                        pos: side.vertex1.pos,
                        from: [],
                        to: []
                    };
                }
                pointmap[side.vertex1.getTag()].from.push(side.vertex0.pos);
            });
            // overcut all sharp corners:
            var cutouts = [];
            for (var pointtag in pointmap) {
                var pointobj = pointmap[pointtag];
                if ((pointobj.from.length == 1) && (pointobj.to.length == 1)) {
                    // ok, 1 incoming side and 1 outgoing side:
                    var fromcoord = pointobj.from[0];
                    var pointcoord = pointobj.pos;
                    var tocoord = pointobj.to[0];
                    var v1 = pointcoord.minus(fromcoord).unit();
                    var v2 = tocoord.minus(pointcoord).unit();
                    var crossproduct = v1.cross(v2);
                    var isInnerCorner = (crossproduct < 0.001);
                    if (isInnerCorner) {
                        // yes it's a sharp corner:
                        var alpha = v2.angleRadians() - v1.angleRadians() + Math.PI;
                        if (alpha < 0) {
                            alpha += 2 * Math.PI;
                        } else if (alpha >= 2 * Math.PI) {
                            alpha -= 2 * Math.PI;
                        }
                        var midvector = v2.minus(v1).unit();
                        var circlesegmentangle = 30 / 180 * Math.PI; // resolution of the circle: segments of 30 degrees
                        // we need to increase the radius slightly so that our imperfect circle will contain a perfect circle of cutterradius
                        var radiuscorrected = cutterradius / Math.cos(circlesegmentangle / 2);
                        var circlecenter = pointcoord.plus(midvector.times(radiuscorrected));
                        // we don't need to create a full circle; a pie is enough. Find the angles for the pie:
                        var startangle = alpha + midvector.angleRadians();
                        var deltaangle = 2 * (Math.PI - alpha);
                        var numsteps = 2 * Math.ceil(deltaangle / circlesegmentangle / 2); // should be even
                        // build the pie:
                        var points = [circlecenter];
                        for (var i = 0; i <= numsteps; i++) {
                            var angle = startangle + i / numsteps * deltaangle;
                            var p = CSG.Vector2D.fromAngleRadians(angle).times(radiuscorrected).plus(circlecenter);
                            points.push(p);
                        }
                        cutouts.push(CAG.fromPoints(points));
                    }
                }
            }
            var result = cag.subtract(cutouts);
            return result;
        }
    };

    CAG.Vertex = function(pos) {
        this.pos = pos;
    };

    CAG.Vertex.fromObject = function(obj) {
        return new CAG.Vertex(new CSG.Vector2D(obj.pos._x,obj.pos._y));
    };

    CAG.Vertex.prototype = {
        toString: function() {
            return "(" + this.pos.x.toFixed(2) + "," + this.pos.y.toFixed(2) + ")";
        },
        getTag: function() {
            var result = this.tag;
            if (!result) {
                result = CSG.getTag();
                this.tag = result;
            }
            return result;
        }
    };

    CAG.Side = function(vertex0, vertex1) {
        if (!(vertex0 instanceof CAG.Vertex)) { throw new Error("Assertion failed"); }
        if (!(vertex1 instanceof CAG.Vertex)) { throw new Error("Assertion failed"); }
        this.vertex0 = vertex0;
        this.vertex1 = vertex1;
    };

    CAG.Side.fromObject = function(obj) {
        var vertex0 = CAG.Vertex.fromObject(obj.vertex0);
        var vertex1 = CAG.Vertex.fromObject(obj.vertex1);
        return new CAG.Side(vertex0,vertex1);
    };

    CAG.Side._fromFakePolygon = function(polygon) {
        polygon.vertices.forEach(function(v) {
            if (!((v.pos.z >= -1.001) && (v.pos.z < -0.999)) && !((v.pos.z >= 0.999) && (v.pos.z < 1.001))) {
                throw("Assertion failed: _fromFakePolygon expects abs z values of 1");
            }
        });
        // this can happen based on union, seems to be residuals -
        // return null and handle in caller
        if (polygon.vertices.length < 4) {
            return null;
        }
        var reverse = false;
        var vert1Indices = [];
        var pts2d = polygon.vertices.filter(function(v, i) {
            if (v.pos.z > 0) {
                vert1Indices.push(i);
                return true;
            }
        })
        .map(function(v) {
            return new CSG.Vector2D(v.pos.x, v.pos.y);
        });
        if (pts2d.length != 2) {
            throw('Assertion failed: _fromFakePolygon: not enough points found')
        }
        var d = vert1Indices[1] - vert1Indices[0];
        if (d == 1 || d == 3) {
            if (d == 1) {
                pts2d.reverse();
            }
        } else {
            throw('Assertion failed: _fromFakePolygon: unknown index ordering');
        }
        var result = new CAG.Side(new CAG.Vertex(pts2d[0]), new CAG.Vertex(pts2d[1]));
        return result;
    };

    CAG.Side.prototype = {
        toString: function() {
            return this.vertex0 + " -> " + this.vertex1;
        },

        toPolygon3D: function(z0, z1) {
            var vertices = [
                new CSG.Vertex(this.vertex0.pos.toVector3D(z0)),
                new CSG.Vertex(this.vertex1.pos.toVector3D(z0)),
                new CSG.Vertex(this.vertex1.pos.toVector3D(z1)),
                new CSG.Vertex(this.vertex0.pos.toVector3D(z1))
            ];
            return new CSG.Polygon(vertices);
        },

        transform: function(matrix4x4) {
            var newp1 = this.vertex0.pos.transform(matrix4x4);
            var newp2 = this.vertex1.pos.transform(matrix4x4);
            return new CAG.Side(new CAG.Vertex(newp1), new CAG.Vertex(newp2));
        },

        flipped: function() {
            return new CAG.Side(this.vertex1, this.vertex0);
        },

        direction: function() {
            return this.vertex1.pos.minus(this.vertex0.pos);
        },

        getTag: function() {
            var result = this.tag;
            if (!result) {
                result = CSG.getTag();
                this.tag = result;
            }
            return result;
        },

        lengthSquared: function() {
            var x = this.vertex1.pos.x - this.vertex0.pos.x,
                y = this.vertex1.pos.y - this.vertex0.pos.y;
            return x * x + y * y;
        },

        length: function() {
            return Math.sqrt(this.lengthSquared());
        }
    };

    //////////////////////////////////////
    CAG.fuzzyCAGFactory = function() {
        this.vertexfactory = new CSG.fuzzyFactory(2, 1e-5);
    };

    CAG.fuzzyCAGFactory.prototype = {
        getVertex: function(sourcevertex) {
            var elements = [sourcevertex.pos._x, sourcevertex.pos._y];
            var result = this.vertexfactory.lookupOrCreate(elements, function(els) {
                return sourcevertex;
            });
            return result;
        },

        getSide: function(sourceside) {
            var vertex0 = this.getVertex(sourceside.vertex0);
            var vertex1 = this.getVertex(sourceside.vertex1);
            return new CAG.Side(vertex0, vertex1);
        },

        getCAG: function(sourcecag) {
            var _this = this;
            var newsides = sourcecag.sides.map(function(side) {
                return _this.getSide(side);
            })
            // remove bad sides (mostly a user input issue)
            .filter(function(side) {
                return side.length() > 1e-5;
            });
            return CAG.fromSides(newsides);
        }
    };

    //////////////////////////////////////
    CSG.addTransformationMethodsToPrototype(CSG.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.Vector2D.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.Vector3D.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.Vertex.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.Plane.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.Polygon.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.Line3D.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.Connector.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.Path2D.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.Line2D.prototype);
    CSG.addTransformationMethodsToPrototype(CAG.prototype);
    CSG.addTransformationMethodsToPrototype(CAG.Side.prototype);
    CSG.addTransformationMethodsToPrototype(CSG.OrthoNormalBasis.prototype);

    CSG.addCenteringToPrototype(CSG.prototype, ['x', 'y', 'z']);
    CSG.addCenteringToPrototype(CAG.prototype, ['x', 'y']);

    /*
    2D polygons are now supported through the CAG class.
    With many improvements (see documentation):
      - shapes do no longer have to be convex
      - union/intersect/subtract is supported
      - expand / contract are supported

    But we'll keep CSG.Polygon2D as a stub for backwards compatibility
    */
    
    CSG.Polygon2D = function(points) {
        var cag = CAG.fromPoints(points);
        this.sides = cag.sides;
    };
    CSG.Polygon2D.prototype = CAG.prototype;


    //console.log('module', module)
    //module.CSG = CSG;
    //module.CAG = CAG;
//})(this); //module to export to

var csg = {CSG: CSG,CAG: CAG};//({})(module)

var csg_1 = csg.CSG;
var csg_2 = csg.CAG;

/*
 * Blob.js
 * See https://developer.mozilla.org/en-US/docs/Web/API/Blob
 *
 * Node and Browserify Compatible
 *
 * Copyright (c) 2015 by Z3 Dev (@zdev/www.z3dev.jp)
 * License: MIT License
 *
 * This implementation uses the Buffer class for all storage.
 * See https://nodejs.org/api/buffer.html
 *
 * URL.createObjectURL(blob)
 *
 * History:
 * 2015/07/02: 0.0.1: contributed to OpenJSCAD.org CLI openjscad
 */

function makeBlob(contents, options){
  var blob = typeof window !== 'undefined' ? window.Blob : Blob$3;
  return blob
}

function Blob$3 (contents, options) {
  var this$1 = this;

  // make the optional options non-optional
  options = options || {};
  // number of bytes
  this.size = 0; // contents, not allocation
  // media type
  this.type = '';
  // readability state (CLOSED: true, OPENED: false)
  this.isClosed = false;
  // encoding of given strings
  this.encoding = 'utf8';
  // storage
  this.buffer = null;
  this.length = 32e+6; // allocation, not contents

  if (!contents) { return }
  if (!Array.isArray(contents)) { return }

  // process options if any
  if (options.type) {
    // TBD if type contains any chars outside range U+0020 to U+007E, then set type to the empty string
    // Convert every character in type to lowercase
    this.type = options.type.toLowerCase();
  }
  if (options.endings) {
    // convert the EOL on strings
  }
  if (options.encoding) {
    this.encoding = options.encoding.toLowerCase();
  }
  if (options.length) {
    this.length = options.length;
  }

  var wbytes;
  var object;
  // convert the contents (String, ArrayBufferView, ArrayBuffer, Blob)
  this.buffer = new Buffer(this.length);
  var index = 0;
  for (index = 0; index < contents.length; index++) {
    switch (typeof (contents[index])) {
      case 'string':
        wbytes = this$1.buffer.write(contents[index], this$1.size, this$1.encoding);
        this$1.size = this$1.size + wbytes;
        break
      case 'object':
        object = contents[index]; // this should be a reference to an object
        if (Buffer.isBuffer(object)) {
        }
        if (object instanceof ArrayBuffer) {
          var view = new DataView(object);
          var bindex = 0;
          for (bindex = 0; bindex < object.byteLength; bindex++) {
            var xbyte = view.getUint8(bindex);
            wbytes = this$1.buffer.writeUInt8(xbyte, this$1.size, false);
            this$1.size++;
          }
        }
        break
      default:
        break
    }
  }
  return this
}

Blob$3.prototype = {
  asBuffer: function () {
    return this.buffer.slice(0, this.size)
  },

  slice: function (start, end, type) {
    start = start || 0;
    end = end || this.size;
    type = type || '';
    return new Blob$3()
  },

  close: function () {
    // if state of context objext is already CLOSED then return
    if (this.isClosed) { return }
    // set the readbility state of the context object to CLOSED and remove storage
    this.isClosed = true;
  },

  toString: function () {
    return 'blob blob blob'
  }
};

var Blob$2 = makeBlob();

function toStlString (CSG) {
  var result = 'solid csg.js\n';
  CSG.polygons.map(function (p) {
    result += CSGPolygontoStlString(p);
  });
  result += 'endsolid csg.js\n';
  return new Blob$2([result], {
    type: 'application/sla'
  })
}

function CSGVector3DtoStlString (v) {
  return v._x + ' ' + v._y + ' ' + v._z
}

function CSGVertextoStlString (vertex) {
  return 'vertex ' + CSGVector3DtoStlString(vertex.pos) + '\n'
}

function CSGPolygontoStlString (polygon) {
  var result = '';
  if (polygon.vertices.length >= 3) // should be!
  {
    // STL requires triangular polygons. If our polygon has more vertices, create
    // multiple triangles:
    var firstVertexStl = CSGVertextoStlString(polygon.vertices[0]);
    for (var i = 0; i < polygon.vertices.length - 2; i++) {
      result += 'facet normal ' + CSGVector3DtoStlString(polygon.plane.normal) + '\nouter loop\n';
      result += firstVertexStl;
      result += CSGVertextoStlString(polygon.vertices[i + 1]);
      result += CSGVertextoStlString(polygon.vertices[i + 2]);
      result += 'endloop\nendfacet\n';
    }
  }
  return result
}

var Blob$4 = makeBlob();

// see http://en.wikipedia.org/wiki/STL_%28file_format%29#Binary_STL
function toStlBinary (CSG) {
  // first check if the host is little-endian:
  var buffer = new ArrayBuffer(4);
  var int32buffer = new Int32Array(buffer, 0, 1);
  var int8buffer = new Int8Array(buffer, 0, 4);
  int32buffer[0] = 0x11223344;
  if (int8buffer[0] != 0x44) {
    throw new Error('Binary STL output is currently only supported on little-endian (Intel) processors')
  }

  var numtriangles = 0;
  CSG.polygons.map(function (p) {
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
  CSG.polygons.map(function (p) {
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
  return new Blob$4([headerarray.buffer, ar1.buffer, allTrianglesBuffer], {
    type: 'application/sla'
  })
}

var Blob$5 = makeBlob();

function toAMFString (CSG, m) {
  var result = '<?xml version="1.0" encoding="UTF-8"?>\n<amf' + (m && m.unit ? ' unit="+m.unit"' : '') + '>\n';
  for (var k in m) {
    result += '<metadata type="' + k + '">' + m[k] + '</metadata>\n';
  }
  result += '<object id="0">\n<mesh>\n<vertices>\n';

  CSG.polygons.map(function (p) { // first we dump all vertices of all polygons
    for (var i = 0; i < p.vertices.length; i++) {
      result += CSGVertextoAMFString(p.vertices[i]);
    }
  });
  result += '</vertices>\n';

  var n = 0;
  CSG.polygons.map(function (p) { // then we dump all polygons
    result += '<volume>\n';
    if (p.vertices.length < 3)
      { return }
    var color = null;
    if (p.shared && p.shared.color) {
      color = p.shared.color;
    } else if (p.color) {
      color = p.color;
    }
    if (color != null) {
      if (color.length < 4) { color.push(1.); }
      result += '<color><r>' + color[0] + '</r><g>' + color[1] + '</g><b>' + color[2] + '</b><a>' + color[3] + '</a></color>';
    }

    for (var i = 0; i < p.vertices.length - 2; i++) { // making sure they are all triangles (triangular polygons)
      result += '<triangle>';
      result += '<v1>' + (n) + '</v1>';
      result += '<v2>' + (n + i + 1) + '</v2>';
      result += '<v3>' + (n + i + 2) + '</v3>';
      result += '</triangle>\n';
    }
    n += p.vertices.length;
    result += '</volume>\n';
  });
  result += '</mesh>\n</object>\n';
  result += '</amf>\n';

  return new Blob$5([result], {
    type: 'application/amf+xml'
  })
}

function CSGVectortoAMFString(v){
  return '<x>' + v._x + '</x><y>' + v._y + '</y><z>' + v._z + '</z>'
}

function CSGVertextoAMFString(vertex){
  return '<vertex><coordinates>' + CSGVectortoAMFString(vertex.pos) + '</coordinates></vertex>\n'
}
/*
CSG.Vector3D.prototype.toAMFString = function () {
  return '<x>' + this._x + '</x><y>' + this._y + '</y><z>' + this._z + '</z>'
}

CSG.Vertex.prototype.toAMFString = function () {
  return '<vertex><coordinates>' + this.pos.toAMFString() + '</coordinates></vertex>\n'
}*/

var Blob$6 = makeBlob();

function toX3D (CSG) {
  // materialPolygonLists
  // key: a color string (e.g. "0 1 1" for yellow)
  // value: an array of strings specifying polygons of this color
  //        (as space-separated indices into vertexCoords)
  var materialPolygonLists = {},
    // list of coordinates (as "x y z" strings)
    vertexCoords = [],
    // map to look up the index in vertexCoords of a given vertex
    vertexTagToCoordIndexMap = {};

  CSG.polygons.map(function (p) {
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
        vertexCoords.push(vertex.pos._x.toString() + ' ' +
          vertex.pos._y.toString() + ' ' +
          vertex.pos._z.toString()
        );
        vertexTagToCoordIndexMap[vertex.getTag()] = vertexCoords.length - 1;
      }
      polygonVertexIndices.push(vertexTagToCoordIndexMap[vertex.getTag()]);
    }

    var polygonString = polygonVertexIndices.join(' ');

    var colorString = red.toString() + ' ' + green.toString() + ' ' + blue.toString();
    if (!(colorString in materialPolygonLists)) {
      materialPolygonLists[colorString] = [];
    }
    // add this polygonString to the list of colorString-colored polygons
    materialPolygonLists[colorString].push(polygonString);
  });

  // create output document
  var docType = document.implementation.createDocumentType('X3D',
    'ISO//Web3D//DTD X3D 3.1//EN', 'http://www.web3d.org/specifications/x3d-3.1.dtd');
  var exportDoc = document.implementation.createDocument(null, 'X3D', docType);
  exportDoc.insertBefore(
    exportDoc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"'),
    exportDoc.doctype);

  var exportRoot = exportDoc.getElementsByTagName('X3D')[0];
  exportRoot.setAttribute('profile', 'Interchange');
  exportRoot.setAttribute('version', '3.1');
  exportRoot.setAttribute('xsd:noNamespaceSchemaLocation', 'http://www.web3d.org/specifications/x3d-3.1.xsd');
  exportRoot.setAttribute('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema-instance');

  var exportScene = exportDoc.createElement('Scene');
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
    var shape = exportDoc.createElement('Shape');
    exportScene.appendChild(shape);

    var appearance = exportDoc.createElement('Appearance');
    shape.appendChild(appearance);

    var material = exportDoc.createElement('Material');
    appearance.appendChild(material);
    material.setAttribute('diffuseColor', colorString);
    material.setAttribute('ambientIntensity', '1.0');

    var ifs = exportDoc.createElement('IndexedFaceSet');
    shape.appendChild(ifs);
    ifs.setAttribute('solid', 'true');
    ifs.setAttribute('coordIndex', polygonList.join(' -1 ') + ' -1');

    var coordinate = exportDoc.createElement('Coordinate');
    ifs.appendChild(coordinate);
    if (coordsMeshDefined) {
      coordinate.setAttribute('USE', 'coords_mesh');
    } else {
      coordinate.setAttribute('DEF', 'coords_mesh');
      coordinate.setAttribute('point', vertexCoords.join(' '));
      coordsMeshDefined = true;
    }
  }

  var x3dstring = (new XMLSerializer()).serializeToString(exportDoc);
  return new Blob$6([x3dstring], {
    type: 'model/x3d+xml'
  })
}

var Blob$7 = makeBlob();

function CAGtoSvg (cagObject) {
  var decimals = 1000;

  // mirror the CAG about the X axis in order to generate paths into the POSITIVE direction
  var plane = new csg_1.Plane(csg_1.Vector3D.Create(0, 1, 0), 0);
  var cag = cagObject.transform(csg_1.Matrix4x4.mirroring(plane));

  var bounds = cag.getBounds();
  var paths = cag.getOutlinePaths();
  var width = Math.round((bounds[1].x - bounds[0].x) * decimals) / decimals;
  var height = Math.round((bounds[1].y - bounds[0].y) * decimals) / decimals;
  var svg = '<?xml version="1.0" encoding="UTF-8"?>\n';
  svg += '<!-- Generated by OpenJSCAD.org -->\n';
  svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">\n';
  svg += '<svg width="' + width + 'mm" height="' + height + 'mm" viewBox="0 0 ' + width + ' ' + height + '" version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n';
  svg += PathsToSvg(paths, bounds);
  svg += '</svg>';
  return new Blob$7([svg], {
    type: 'image/svg+xml'
  })
}

function PathsToSvg (paths, bounds) {
  // calculate offsets in order to create paths orientated from the 0,0 axis
  var xoffset = 0 - bounds[0].x;
  var yoffset = 0 - bounds[0].y;
  var str = '<g>\n';
  paths.map(function (path) {
    str += '<path d="';
    // FIXME add fill color when CAG has support for colors
    var numpoints_closed = path.points.length + (path.closed ? 1 : 0);
    for (var pointindex = 0; pointindex < numpoints_closed; pointindex++) {
      var pointindexwrapped = pointindex;
      if (pointindexwrapped >= path.points.length) { pointindexwrapped -= path.points.length; }
      var point = path.points[pointindexwrapped];
      if (pointindex > 0) {
        str += 'L' + (point.x + xoffset) + ' ' + (point.y + yoffset);
      } else {
        str += 'M' + (point.x + xoffset) + ' ' + (point.y + yoffset);
      }
    }
    str += '"/>\n';
  });
  str += '</g>\n';
  return str
}

var Blob$8 = makeBlob();

function CAGToJson (CAG) {
  var str = '{ "type": "cag","sides": [';
  var comma = '';
  CAG.sides.map(
    function (side) {
      str += comma;
      str += JSON.stringify(side);
      comma = ',';
    }
  );
  str += '] }';
  return new Blob$8([str], {
    type: 'application/json'
  })
}

var Blob$9 = makeBlob();

function CAGtoDxf (cagObject) {
  var paths = cagObject.getOutlinePaths();
  return PathsToDxf(paths)
}

function PathsToDxf (paths) {
  var str = '999\nDXF generated by OpenJsCad\n';
  str += '  0\nSECTION\n  2\nHEADER\n';
  str += '  0\nENDSEC\n';
  str += '  0\nSECTION\n  2\nTABLES\n';
  str += '  0\nTABLE\n  2\nLTYPE\n  70\n1\n';
  str += '  0\nLTYPE\n  2\nCONTINUOUS\n  3\nSolid Line\n  72\n65\n  73\n0\n  40\n0.0\n';
  str += '  0\nENDTAB\n';
  str += '  0\nTABLE\n  2\nLAYER\n  70\n1\n';
  str += '  0\nLAYER\n  2\nOpenJsCad\n  62\n7\n  6\ncontinuous\n';
  str += '  0\nENDTAB\n';
  str += '  0\nTABLE\n  2\nSTYLE\n  70\n0\n  0\nENDTAB\n';
  str += '  0\nTABLE\n  2\nVIEW\n  70\n0\n  0\nENDTAB\n';
  str += '  0\nENDSEC\n';
  str += '  0\nSECTION\n  2\nBLOCKS\n';
  str += '  0\nENDSEC\n';
  str += '  0\nSECTION\n  2\nENTITIES\n';
  paths.map(function (path) {
    var numpoints_closed = path.points.length + (path.closed ? 1 : 0);
    str += '  0\nLWPOLYLINE\n  8\nOpenJsCad\n  90\n' + numpoints_closed + '\n  70\n' + (path.closed ? 1 : 0) + '\n';
    for (var pointindex = 0; pointindex < numpoints_closed; pointindex++) {
      var pointindexwrapped = pointindex;
      if (pointindexwrapped >= path.points.length) { pointindexwrapped -= path.points.length; }
      var point = path.points[pointindexwrapped];
      str += ' 10\n' + point.x + '\n 20\n' + point.y + '\n 30\n0.0\n';
    }
  });
  str += '  0\nENDSEC\n  0\nEOF\n';
  return new Blob$9([str], {
    type: 'application/dxf'
  })
}

/* converts input data to array if it is not already an array*/
function toArray (data) {
  if (!data) { return [] }
  if (data.constructor !== Array) { return [data] }
  return data
}

var Blob$1 = makeBlob();

function convertToBlob (objects, params) {
  var format = params.format;
  var formatInfo = params.formatInfo;

  var object;

  if (format === 'jscad') {
    object = objects;
  } else {
    objects = toArray(objects);
    //console.log('convertToBlob', objects, format)
    //console.log('object', objects[0], objects[0] instanceof CSG)

    // review the given objects
    var foundCSG = false;
    var foundCAG = false;
    for (var i = 0; i < objects.length; i++) {
      if (objects[i] instanceof csg_1) { foundCSG = true; }
      if (objects[i] instanceof csg_2) { foundCAG = true; }
    }
    // convert based on the given format
    foundCSG = foundCSG && formatInfo.convertCSG;
    foundCAG = foundCAG && formatInfo.convertCAG;
    if (foundCSG && foundCAG) { foundCAG = false; } // use 3D conversion

    object = !foundCSG ? new csg_2() : new csg_1();

    for (var i$1 = 0; i$1 < objects.length; i$1++) {
      if (foundCSG === true && objects[i$1] instanceof csg_2) {
        object = object.union(objects[i$1].extrude({offset: [0, 0, 0.1]})); // convert CAG to a thin solid CSG
        continue
      }
      if (foundCAG === true && objects[i$1] instanceof csg_1) {
        continue
      }
      object = object.union(objects[i$1]);
    }
  }

  var meta = {
    producer: 'OpenJSCAD.org ' + version,
    date: new Date()
  };

  var outputFormatHandlers = {
    amf: function (object) { return toAMFString(object, meta); }, // CSG to AMF
    stl: function (object) { return toStlString(object); }, // CSG to STL ASCII
    stla: function (object) { return toStlString(object); }, // CSG to STL ASCII
    stlb: function (object) { return toStlBinary(object, {webBlob: true}); }, // CSG to STL BINARY
    dxf: function (object) { return CAGtoDxf(object); }, // CAG to DXF
    svg: function (object) { return CAGtoSvg(object); }, // CAG to SVG
    x3d: function (object) { return toX3D(object.fixTJunctions()); }, // CSG to X3D Only possible via browsers
    json: function (object) { return CAGToJson(object); }, // CSG or CAG to JSON
    js: function (object) { return object; }, // js , pass through
    jscad: function (object) { return object; }, // jscad, pass through
    undefined: function () {
      throw new Error('Not supported : only jscad, stl, amf, dxf, svg or json as output format')
    }
  };

  var blob = outputFormatHandlers[format](object);

  if (format === 'jscad') {
    blob = new Blob$1([blob], { type: formatInfo.mimetype });
  }
  return blob
}

// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

/**
 * Create an function for processing the JSCAD script into CSG/CAG objects
 * @param {String} script the script
 * @param {Object} globals the globals to use when evaluating the script: these are not ..
 * ...ACTUAL globals, merely functions/ variable accessible AS IF they were globals !
 */
function createJscadFunction (script, globals) {
  // console.log('globals', globals)
  // not a fan of this, we have way too many explicit api elements
  var globalsList = '';
  // each top key is a library ie : openscad helpers etc
  // one level below that is the list of libs
  // last level is the actual function we want to export to 'local' scope
  Object.keys(globals).forEach(function (libKey) {
    var lib = globals[libKey];
    // console.log(`lib:${libKey}: ${lib}`)
    Object.keys(lib).forEach(function (libItemKey) {
      var libItems = lib[libItemKey];
      // console.log('libItems', libItems)
      Object.keys(libItems).forEach(function (toExposeKey) {
        // console.log('toExpose',toExpose )
        var text = "const " + toExposeKey + " = globals['" + libKey + "']['" + libItemKey + "']['" + toExposeKey + "']\n";
        globalsList += text;
      });
    });
  });

  var source = "// SYNC WORKER\n    " + globalsList + "\n\n    //user defined script(s)\n    " + script + "\n\n    if (typeof (main) !== 'function') {\n      throw new Error('The JSCAD script must contain a function main() which returns one or more CSG or CAG solids.')\n    }\n\n    return main(params)\n  ";

  var f = new Function('params', 'include', 'globals', source);
  return f
}

//
// THESE FUNCTIONS ARE SERIALIZED FOR INCLUSION IN THE FULL SCRIPT
//
// TODO It might be possible to cache the serialized versions
//

// Include the requested script via MemFs (if available) or HTTP Request
//
// (Note: This function is appended together with the JSCAD script)
//
function includeJscadSync (relpath, fn) {
  //console.log('include', relpath, fn)
  // include the requested script via MemFs if possible
  return new Promise(function (resolve, reject) {
    if (typeof (gMemFs) === 'object') {
      for (var fs$$1 in gMemFs) {
        if (gMemFs[fs$$1].name === fn) {
          //eval(gMemFs[fs].source)
          resolve(gMemFs[fs$$1].source);
        }
      }
    }
    // include the requested script via webserver access
    var xhr = new XMLHttpRequest();
    var url = relpath + fn;
    if (fn.match(/^(https:|http:)/i)) {
      url = fn;
    }
    xhr.open('GET', url, false);
    xhr.onload = function () {
      var src = this.responseText;
      //console.log('src',src)
      //eval(src) // UGH ???
      resolve(src);
    };
    xhr.onerror = function () {};
    xhr.send();
  })
}

/**
 * helper function that finds include() statements in files,
 * fetches their code & returns it (recursively) returning the whole code with
 * inlined includes
 * this is more reliable than async xhr + eval()
 * @param {String} text the original script (with include statements)
 * @param {String} relpath relative path, for xhr resolution
 * @returns {String} the full script, with inlined
 */
function replaceIncludes (text, relpath) {
  return new Promise(function (resolve, reject) {
    var scriptWithIncludes = text;
    var includesPattern = /(?:include)\s?\("([\w\/.\s]*)"\);?/gm;

    var foundIncludes = [];
    var foundIncludesFull = [];
    var match;
    while(match = includesPattern.exec(text)) {
      foundIncludes.push(match[1]);
      foundIncludesFull.push(match[0]);
    }

    var tmpPromises = foundIncludes.map(function (uri, index$$1) {
      var promise = includeJscadSync(relpath, uri);
      return promise.then(function (includedScript) {
        return replaceIncludes(includedScript, relpath).then(function (substring) {
          var currentItem = foundIncludesFull[index$$1];
          scriptWithIncludes = scriptWithIncludes.replace(currentItem, substring);
          return scriptWithIncludes
        })
      })
    });
    Promise.all(tmpPromises).then(function (x) { return resolve(scriptWithIncludes); });
  })
}

/**
 * evaluate script & rebuild solids, in main thread
 * @param {String} script the script
 * @param {String} fullurl full url of current script
 * @param {Object} parameters the parameters to use with the script
 * @param {Object} globals the globals to use when evaluating the script
 * @param {Object} callback the callback to call once evaluation is done /failed
 */
function rebuildSolidSync (script, fullurl, parameters, globals, callback) {
  var relpath = fullurl;
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0, relpath.lastIndexOf('/') + 1);
  }

  replaceIncludes(script, relpath).then(function (fullScript) {
    var func = createJscadFunction(fullScript, globals);
    // stand-in for the include function(no-op)
    var include = function (x) { return x; };
    try {
      var objects = func(parameters, include, globals);
      objects = toArray(objects);
      if (objects.length === 0) {
        throw new Error('The JSCAD script must return one or more CSG or CAG solids.')
      }
      callback(undefined, objects);
    } catch(error) {
      callback(error, undefined);
    }
  }).catch(function (error) { return callback(error, undefined); });
}

/**
 * evaluate script & rebuild solids, in seperate thread/webworker
 * @param {String} script the script
 * @param {String} fullurl full url of current script
 * @param {Object} parameters the parameters to use with the script
 * @param {Object} globals the globals to use when evaluating the script
 * @param {Object} callback the callback to call once evaluation is done /failed
 */

function getParameterDefinitionsCLI (getParameterDefinitions, param) { // used for openjscad CLI only
  if (typeof getParameterDefinitions !== 'undefined') {
    var p = {};
    var pa = getParameterDefinitions();
    for (var a in pa) { // defaults, given by getParameterDefinitions()
      var x = pa[a];
      if ('default' in x) {
        p[pa[a].name] = pa[a].default;
      } else if ('initial' in x) {
        p[pa[a].name] = pa[a].initial;
      } else if ('checked' in x) {
        p[pa[a].name] = pa[a].checked;
      }
    }
    for (var a in param) { // given by command-line
      p[a] = param[a];
    }
    return p
  } else
    { return param }
}

var formats = {
  stl: { displayName: 'STL (ASCII)', description: 'STereoLithography, ASCII', extension: 'stl', mimetype: 'application/sla', convertCSG: true, convertCAG: false },
  stla: { displayName: 'STL (ASCII)', description: 'STereoLithography, ASCII', extension: 'stl', mimetype: 'application/sla', convertCSG: true, convertCAG: false },
  stlb: { displayName: 'STL (Binary)', description: 'STereoLithography, Binary', extension: 'stl', mimetype: 'application/sla', convertCSG: true, convertCAG: false },
  amf: { displayName: 'AMF (experimental)', description: 'Additive Manufacturing File Format', extension: 'amf', mimetype: 'application/amf+xml', convertCSG: true, convertCAG: false },
  x3d: { displayName: 'X3D', description: 'X3D File Format', extension: 'x3d', mimetype: 'model/x3d+xml', convertCSG: true, convertCAG: false },
  dxf: { displayName: 'DXF', description: 'AutoCAD Drawing Exchange Format', extension: 'dxf', mimetype: 'application/dxf', convertCSG: false, convertCAG: true },
  jscad: { displayName: 'JSCAD', description: 'OpenJSCAD.org Source', extension: 'jscad', mimetype: 'application/javascript', convertCSG: true, convertCAG: true },
  svg: { displayName: 'SVG', description: 'Scalable Vector Graphics Format', extension: 'svg', mimetype: 'image/svg+xml', convertCSG: false, convertCAG: true },
  js: { displayName: 'js', description: 'JavaScript Source' },
  gcode: { displayName: 'gcode', description: 'G Programming Language File Format' },
  json: { displayName: 'json', description: 'JavaScript Object Notation Format' }
};

// -- 2D primitives (OpenSCAD like notion)

function square() {
   var v = [1,1], off; var a = arguments, p = a[0];
   if(p&&!p.size) { v = [p,p]; }
   if(p&&p.length) { v = a[0], p = a[1]; }
   if(p&&p.size&&p.size.length) { v = p.size; }

   off = [v[0]/2,v[1]/2];
   if(p&&p.center==true) { off = [0,0]; }

   var o = csg_2.rectangle({center:off,radius:[v[0]/2,v[1]/2]});

   return o;
}

function circle() {
   var r = 1, off, fn = 32; var a = arguments, p = a[0];
   if(p&&p.r) { r = p.r; }
   if(p&&p.fn) { fn = p.fn; }
   if(p&&!p.r&&!p.fn&&!p.center) { r = p; }
   off = [r,r];
   if(p&&p.center==true) { off = [0,0]; }
   var o = csg_2.circle({center:off,radius:r,resolution:fn});
   return o;
}

function polygon(p) {  // array of po(ints) and pa(ths)
   var points = new Array();
   if(p.paths&&p.paths.length&&p.paths[0].length) {          // pa(th): [[0,1,2],[2,3,1]] (two paths)
      for(var j=0; j<p.paths.length; j++) {
         for(var i=0; i<p.paths[j].length; i++) {
            points[i] = p.points[p.paths[j][i]];
         }
      }
   } else if(p.paths&&p.paths.length) {                 // pa(th): [0,1,2,3,4] (single path)
      for(var i=0; i<p.paths.length; i++) {
         points[i] = p.points[p.paths[i]];
      }
   } else {                               // pa(th) = po(ints)
      if(p.length) {
         points = p;
      } else {
         points = p.points;
      }
   }
   return csg_2.fromPoints(points);
}

function triangle() {         // -- new addition
   var a = arguments;
   if(a[0]&&a[0].length) { a = a[0]; }
   var o = csg_2.fromPoints(a);
   return o;
}


var primitives2d = Object.freeze({
	square: square,
	circle: circle,
	polygon: polygon,
	triangle: triangle
});

// -- 2D to 3D primitives (OpenSCAD like notion)

function linear_extrude(p,s) {
   //console.log("linear_extrude() not yet implemented");
   //return;
   var h = 1, off = 0, /* convexity = 10,*/ twist = 0, slices = 10;
   if(p.height) { h = p.height; }
   //if(p.convexity) convexity = p.convexity;      // abandoned
   if(p.twist) { twist = p.twist; }
   if(p.slices) { slices = p.slices; }
   var o = s.extrude({offset:[0,0,h], twistangle:twist, twiststeps:slices});
   if(p.center==true) {
      var b = new Array;
      b = o.getBounds();      // b[0] = min, b[1] = max
      off = b[1].plus(b[0]);
      off = off.times(-0.5);
      o = o.translate(off);
   }
   return o;
}

function rotate_extrude(p,o) {
   var fn = 32;
   if(arguments.length<2) {
      o = p;      // no switches, just an object
   } else if(p!==undefined) {
      fn = p.fn;
   }
   if(fn<3) { fn = 3; }
   var ps = [];
   for(var i=0; i<fn; i++) {
      // o.{x,y} -> rotate([0,0,i:0..360], obj->{o.x,0,o.y})
      for(var j=0; j<o.sides.length; j++) {
         // has o.sides[j].vertex{0,1}.pos (only x,y)
         var p = [];
         var m;

         m = new csg_1.Matrix4x4.rotationZ(i/fn*360);
         p[0] = new csg_1.Vector3D(o.sides[j].vertex0.pos.x,0,o.sides[j].vertex0.pos.y);
         p[0] = m.rightMultiply1x3Vector(p[0]);

         p[1] = new csg_1.Vector3D(o.sides[j].vertex1.pos.x,0,o.sides[j].vertex1.pos.y);
         p[1] = m.rightMultiply1x3Vector(p[1]);

         m = new csg_1.Matrix4x4.rotationZ((i+1)/fn*360);
         p[2] = new csg_1.Vector3D(o.sides[j].vertex1.pos.x,0,o.sides[j].vertex1.pos.y);
         p[2] = m.rightMultiply1x3Vector(p[2]);

         p[3] = new csg_1.Vector3D(o.sides[j].vertex0.pos.x,0,o.sides[j].vertex0.pos.y);
         p[3] = m.rightMultiply1x3Vector(p[3]);

         var p1 = new csg_1.Polygon([
            new csg_1.Vertex(p[0]),
            new csg_1.Vertex(p[1]),
            new csg_1.Vertex(p[2]),
            new csg_1.Vertex(p[3]) ]);
         //var p2 = new CSG.Polygon([
         //   new CSG.Vertex(p[0]),
         //   new CSG.Vertex(p[2]),
         //   new CSG.Vertex(p[3]),
         //]);
         ps.push(p1);
         //ps.push(p2);
         //echo("i="+i,i/fn*360,"j="+j);
      }
   }
   return csg_1.fromPolygons(ps);
}

function rectangular_extrude(pa,p) {
   var w = 1, h = 1, fn = 8, closed = false, round = true;
   if(p) {
      if(p.w) { w = p.w; }
      if(p.h) { h = p.h; }
      if(p.fn) { fn = p.fn; }
      if(p.closed!==undefined) { closed = p.closed; }
      if(p.round!==undefined) { round = p.round; }
   }
   return new csg_1.Path2D(pa,closed).rectangularExtrude(w,h,fn,round);
}


var extrusion = Object.freeze({
	linear_extrude: linear_extrude,
	rotate_extrude: rotate_extrude,
	rectangular_extrude: rectangular_extrude
});

// -- 3D primitives (OpenSCAD like notion)
function cube(p) {
   var s = 1, v = null, off = [0,0,0], round = false, r = 0, fn = 8;
   if(p&&p.length) { v = p; }
   if(p&&p.size&&p.size.length) { v = p.size; }        // { size: [1,2,3] }
   if(p&&p.size&&!p.size.length) { s = p.size; }       // { size: 1 }
   //if(p&&!p.size&&!p.length&&p.center===undefined&&!p.round&&!p.radius) s = p;      // (2)
   if(p&&(typeof p!='object')) { s = p; }      // (2)
   if(p&&p.round==true) { round = true, r = v&&v.length?(v[0]+v[1]+v[2])/30:s/10;}
   if(p&&p.radius) { round = true, r = p.radius; }
   if(p&&p.fn) { fn = p.fn; }              // applies in case of round: true

   var x = s, y = s, z = s;
   if(v&&v.length) {
      x = v[0], y = v[1], z = v[2];
   }
   off = [x/2,y/2,z/2];       // center: false default
   var o = round?
      csg_1.roundedCube({radius:[x/2,y/2,z/2], roundradius:r, resolution: fn}):
      csg_1.cube({radius:[x/2,y/2,z/2]});
   if(p&&p.center&&p.center.length) {
      off = [p.center[0]?0:x/2, p.center[1]?0:y/2,p.center[2]?0:z/2];
   } else if(p&&p.center==true) {
      off = [0,0,0];
   } else if(p&&p.center==false) {
      off = [x/2,y/2,z/2];
   }
   if(off[0]||off[1]||off[2]) { o = o.translate(off); }
   //if(v&&v.length) o = o.scale(v);      // we don't scale afterwards, we already created box with the correct size
   return o;
}

function sphere(p) {
   var r = 1;
   var fn = 32;
   var off = [0,0,0];
   var type = 'normal';

   //var zoff = 0; // sphere() in openscad has no center:true|false
   if(p&&p.r) { r = p.r; }
   if(p&&p.fn) { fn = p.fn; }
   if(p&&p.type) { type = p.type; }
   //if(p&&!p.r&&!p.fn&&!p.type) r = p;
   if(p&&(typeof p!='object')) { r = p; }
   off = [0,0,0];       // center: false (default)

   var o;
   if(type=='geodesic')
      { o = geodesicSphere(p); }
   else
      { o = csg_1.sphere({radius:r,resolution:fn}); }

   if(p&&p.center&&p.center.length) {         // preparing individual x,y,z center
      off = [p.center[0]?0:r,p.center[1]?0:r,p.center[2]?0:r];
   } else if(p&&p.center==true) {
      off = [0,0,0];
   } else if(p&&p.center==false) {
      off = [r,r,r];
   }
   if(off[0]||off[1]||off[2]) { o = o.translate(off); }
   return o;
}

function geodesicSphere(p) {
   var r = 1, fn = 5;

   var ci = [              // hard-coded data of icosahedron (20 faces, all triangles)
      [0.850651,0.000000,-0.525731],
      [0.850651,-0.000000,0.525731],
      [-0.850651,-0.000000,0.525731],
      [-0.850651,0.000000,-0.525731],
      [0.000000,-0.525731,0.850651],
      [0.000000,0.525731,0.850651],
      [0.000000,0.525731,-0.850651],
      [0.000000,-0.525731,-0.850651],
      [-0.525731,-0.850651,-0.000000],
      [0.525731,-0.850651,-0.000000],
      [0.525731,0.850651,0.000000],
      [-0.525731,0.850651,0.000000]];

   var ti = [ [0,9,1], [1,10,0], [6,7,0], [10,6,0], [7,9,0], [5,1,4], [4,1,9], [5,10,1], [2,8,3], [3,11,2], [2,5,4],
      [4,8,2], [2,11,5], [3,7,6], [6,11,3], [8,7,3], [9,8,4], [11,10,5], [10,11,6], [8,9,7]];

   var geodesicSubDivide = function(p,fn,off) {
      var p1 = p[0], p2 = p[1], p3 = p[2];
      var n = off;
      var c = [];
      var f = [];

      //           p3
      //           /\
      //          /__\     fn = 3
      //      i  /\  /\
      //        /__\/__\       total triangles = 9 (fn*fn)
      //       /\  /\  /\
      //     0/__\/__\/__\
      //    p1 0   j      p2

      for(var i=0; i<fn; i++) {
         for(var j=0; j<fn-i; j++) {
            var t0 = i/fn;
            var t1 = (i+1)/fn;
            var s0 = j/(fn-i);
            var s1 = (j+1)/(fn-i);
            var s2 = fn-i-1?j/(fn-i-1):1;
            var q = [];

            q[0] = mix3(mix3(p1,p2,s0),p3,t0);
            q[1] = mix3(mix3(p1,p2,s1),p3,t0);
            q[2] = mix3(mix3(p1,p2,s2),p3,t1);

            // -- normalize
            for(var k=0; k<3; k++) {
               var r = Math.sqrt(q[k][0]*q[k][0]+q[k][1]*q[k][1]+q[k][2]*q[k][2]);
               for(var l=0; l<3; l++) {
                  q[k][l] /= r;
               }
            }
            c.push(q[0],q[1],q[2]);
            f.push([n,n+1,n+2]); n += 3;

            if(j<fn-i-1) {
               var s3 = fn-i-1?(j+1)/(fn-i-1):1;
               q[0] = mix3(mix3(p1,p2,s1),p3,t0);
               q[1] = mix3(mix3(p1,p2,s3),p3,t1);
               q[2] = mix3(mix3(p1,p2,s2),p3,t1);

               // -- normalize
               for(var k=0; k<3; k++) {
                  var r = Math.sqrt(q[k][0]*q[k][0]+q[k][1]*q[k][1]+q[k][2]*q[k][2]);
                  for(var l=0; l<3; l++) {
                     q[k][l] /= r;
                  }
               }
               c.push(q[0],q[1],q[2]);
               f.push([n,n+1,n+2]); n += 3;
            }
         }
      }
      return { points: c, triangles: f, off: n };
   };

   var mix3 = function(a,b,f) {
      var _f = 1-f;
      var c = [];
      for(var i=0; i<3; i++) {
         c[i] = a[i]*_f+b[i]*f;
      }
      return c;
   };

   if(p) {
      if(p.fn) { fn = Math.floor(p.fn/6); }
      if(p.r) { r = p.r; }
   }

   if(fn<=0) { fn = 1; }

   var q = [];
   var c = [], f = [];
   var off = 0;

   for(var i=0; i<ti.length; i++) {
      var g = geodesicSubDivide([ ci[ti[i][0]], ci[ti[i][1]], ci[ti[i][2]] ],fn,off);
      c = c.concat(g.points);
      f = f.concat(g.triangles);
      off = g.off;
   }
   return polyhedron({points: c, triangles: f}).scale(r);
}

function cylinder(p) {
   var r1 = 1, r2 = 1, h = 1, fn = 32, round = false; var a = arguments;
   var off = [0,0,0];
   if(p&&p.d) {
      r1 = r2 = p.d/2;
   }
   if(p&&p.r) {
      r1 = p.r; r2 = p.r;
   }
   if(p&&p.h) {
      h = p.h;
   }
   if(p&&(p.r1||p.r2)) {
      r1 = p.r1; r2 = p.r2; if(p.h) { h = p.h; }
   }
   if(p&&(p.d1||p.d2)) {
      r1 = p.d1/2; r2 = p.d2/2;
   }

   if(a&&a[0]&&a[0].length) {
      a = a[0]; r1 = a[0]; r2 = a[1]; h = a[2]; if(a.length==4) { fn = a[3]; }
   }
   if(p&&p.fn) { fn = p.fn; }
   //if(p&&p.center==true) zoff = -h/2;
   if(p&&p.round==true) { round = true; }
   var o;
   if(p&&(p.start&&p.end)) {
      o = round?
         csg_1.roundedCylinder({start:p.start,end:p.end,radiusStart:r1,radiusEnd:r2,resolution:fn}):
         csg_1.cylinder({start:p.start,end:p.end,radiusStart:r1,radiusEnd:r2,resolution:fn});
   } else {
      o = round?
         csg_1.roundedCylinder({start:[0,0,0],end:[0,0,h],radiusStart:r1,radiusEnd:r2,resolution:fn}):
         csg_1.cylinder({start:[0,0,0],end:[0,0,h],radiusStart:r1,radiusEnd:r2,resolution:fn});
      var r = r1>r2?r1:r2;
      if(p&&p.center&&p.center.length) {         // preparing individual x,y,z center
         off = [p.center[0]?0:r,p.center[1]?0:r,p.center[2]?-h/2:0];
      } else if(p&&p.center==true) {
         off = [0,0,-h/2];
      } else if(p&&p.center==false) {
         off = [0,0,0];
      }
      if(off[0]||off[1]||off[2]) { o = o.translate(off); }
   }
   return o;
}

function torus(p) {
   var ri = 1, ro = 4, fni = 16, fno = 32, roti = 0;
   if(p) {
      if(p.ri) { ri = p.ri; }
      if(p.fni) { fni = p.fni; }
      if(p.roti) { roti = p.roti; }
      if(p.ro) { ro = p.ro; }
      if(p.fno) { fno = p.fno; }
   }
   if(fni<3) { fni = 3; }
   if(fno<3) { fno = 3; }
   var c = circle({r:ri,fn:fni,center:true});
   if(roti) { c = c.rotateZ(roti); }
   return rotate_extrude({fn:fno},c.translate([ro,0,0]));
}

function polyhedron(p) {
   var pgs = [];
   var ref = p.triangles||p.polygons;
   var colors = p.colors||null;

   for(var i=0; i<ref.length; i++) {
      var pp = [];
      for(var j=0; j<ref[i].length; j++) {
         pp[j] = p.points[ref[i][j]];
      }

      var v = [];
      for(j=ref[i].length-1; j>=0; j--) {       // --- we reverse order for examples of OpenSCAD work
         v.push(new csg_1.Vertex(new csg_1.Vector3D(pp[j][0],pp[j][1],pp[j][2])));
      }
      var s = csg_1.Polygon.defaultShared;
      if (colors && colors[i]) {
         s = csg_1.Polygon.Shared.fromColor(colors[i]);
      }
      pgs.push(new csg_1.Polygon(v,s));
   }
   var r = csg_1.fromPolygons(pgs);
   return r;
}


var primitives3d = Object.freeze({
	cube: cube,
	sphere: sphere,
	geodesicSphere: geodesicSphere,
	cylinder: cylinder,
	torus: torus,
	polyhedron: polyhedron
});

// -- 3D operations (OpenSCAD like notion)
function union () {
  var o,i = 0,a = arguments;
  if (a[0].length) { a = a[0]; }

  o = a[i++];
  for (; i < a.length; i++) {
    var obj = a[i];

    // for now disabled, later perhaps allow mixed union of CAG/CSG
    if (0 && (typeof (a[i]) == 'object') && (a[i] instanceof csg_2)) {
      obj = a[i].extrude({offset: [0, 0, 0.1]}); // -- convert a 2D shape to a thin solid:
    }
    o = o.union(obj);
  }
  return o
}

function difference () {
  var o,i = 0,a = arguments;
  if (a[0].length) { a = a[0]; }
  for (o = a[i++]; i < a.length; i++) {
    if (a[i] instanceof csg_2) {
      o = o.subtract(a[i]);
    } else {
      o = o.subtract(a[i].setColor(1, 1, 0)); // -- color the cuts
    }
  }
  return o
}

function intersection () {
  var o,i = 0,a = arguments;
  if (a[0].length) { a = a[0]; }
  for (o = a[i++]; i < a.length; i++) {
    if (a[i] instanceof csg_2) {
      o = o.intersect(a[i]);
    } else {
      o = o.intersect(a[i].setColor(1, 1, 0)); // -- color the cuts
    }
  }
  return o
}


var booleanOps = Object.freeze({
	union: union,
	difference: difference,
	intersection: intersection
});

// -- 3D transformations (OpenSCAD like notion)

function translate() {      // v, obj or array
   var a = arguments, v = a[0], o, i = 1;
   if(a[1].length) { a = a[1]; i = 0; }
   for(o=a[i++]; i<a.length; i++) {
      o = o.union(a[i]);
   }
   return o.translate(v);
}

function center() { // v, obj or array
   var a = arguments, v = a[0], o, i = 1;
   if(a[1].length) { a = a[1]; i = 0; }
   for(o=a[i++]; i<a.length; i++) {
      o = o.union(a[i]);
   }
   return o.center(v);
}

function scale() {         // v, obj or array
   var a = arguments, v = a[0], o, i = 1;
   if(a[1].length) { a = a[1]; i = 0; }
   for(o=a[i++]; i<a.length; i++) {
      o = o.union(a[i]);
   }
   return o.scale(v);
}

function rotate() {
   var o,i,v, r = 1, a = arguments;
   if(!a[0].length) {        // rotate(r,[x,y,z],o)
      r = a[0];
      v = a[1];
      i = 2;
      if(a[2].length) { a = a[2]; i = 0; }
   } else {                   // rotate([x,y,z],o)
      v = a[0];
      i = 1;
      if(a[1].length) { a = a[1]; i = 0; }
   }
   for(o=a[i++]; i<a.length; i++) {
      o = o.union(a[i]);
   }
   if(r!=1) {
      return o.rotateX(v[0]*r).rotateY(v[1]*r).rotateZ(v[2]*r);
   } else {
      return o.rotateX(v[0]).rotateY(v[1]).rotateZ(v[2]);
   }
}

function mirror(v,o) {
   var a = Array.prototype.slice.call(arguments, 1, arguments.length),
       o = a[0];

   for(var i=1; i<a.length; i++) {
      o = o.union(a[i]);
   }
   var plane = new csg_1.Plane(new csg_1.Vector3D(v[0], v[1], v[2]).unit(), 0);
   return o.mirrored(plane);
}

function expand(r,n,o) {
   return o.expand(r,n);
}

function contract(r,n,o) {
   return o.contract(r,n);
}

function multmatrix() {
   console.log("multmatrix() not yet implemented");
}

function minkowski() {
   console.log("minkowski() not yet implemented");
}

function hull() {
   var pts = [];

   var a = arguments;
   if(a[0].length) { a = a[0]; }
   var done = [];

   for(var i=0; i<a.length; i++) {              // extract all points of the CAG in the argument list
      var cag = a[i];
      if(!(cag instanceof csg_2)) {
         throw("ERROR: hull() accepts only 2D forms / CAG");
         return;
      }
      for(var j=0; j<cag.sides.length; j++) {
         var x = cag.sides[j].vertex0.pos.x;
         var y = cag.sides[j].vertex0.pos.y;
         if(done[''+x+','+y])  // avoid some coord to appear multiple times
            { continue; }
         pts.push({ x:x, y:y });
         done[''+x+','+y]++;
         //echo(x,y);
      }
   }
   //echo(pts.length+" points in",pts);

   // from http://www.psychedelicdevelopment.com/grahamscan/
   //    see also at https://github.com/bkiers/GrahamScan/blob/master/src/main/cg/GrahamScan.java
   var ConvexHullPoint = function(i, a, d) {

      this.index = i;
      this.angle = a;
      this.distance = d;

      this.compare = function(p) {
         if (this.angle<p.angle)
            { return -1; }
         else if (this.angle>p.angle)
            { return 1; }
         else {
            if (this.distance<p.distance)
               { return -1; }
            else if (this.distance>p.distance)
               { return 1; }
         }
         return 0;
      };
   };

   var ConvexHull = function() {
      this.points = null;
      this.indices = null;

      this.getIndices = function() {
         return this.indices;
      };

      this.clear = function() {
         this.indices = null;
         this.points = null;
      };

      this.ccw = function(p1, p2, p3) {
         var ccw = (this.points[p2].x - this.points[p1].x)*(this.points[p3].y - this.points[p1].y) -
                   (this.points[p2].y - this.points[p1].y)*(this.points[p3].x - this.points[p1].x);
         if(ccw<1e-5)      // we need this, otherwise sorting never ends, see https://github.com/Spiritdude/OpenJSCAD.org/issues/18
            { return 0 }
         return ccw;
      };

      this.angle = function(o, a) {
         //return Math.atan((this.points[a].y-this.points[o].y) / (this.points[a].x - this.points[o].x));
         return Math.atan2((this.points[a].y-this.points[o].y), (this.points[a].x - this.points[o].x));
      };

      this.distance = function(a, b) {
         return ((this.points[b].x-this.points[a].x)*(this.points[b].x-this.points[a].x)+
                 (this.points[b].y-this.points[a].y)*(this.points[b].y-this.points[a].y));
      };

      this.compute = function(_points) {
         var this$1 = this;

         this.indices=null;
         if (_points.length<3)
            { return; }
         this.points=_points;

         // Find the lowest point
         var min = 0;
         for(var i = 1; i < this.points.length; i++) {
            if(this$1.points[i].y==this$1.points[min].y) {
               if(this$1.points[i].x<this$1.points[min].x)
                  { min = i; }
            }
            else if(this$1.points[i].y<this$1.points[min].y)
               { min = i; }
         }

         // Calculate angle and distance from base
         var al = new Array();
         var ang = 0.0;
         var dist = 0.0;
         for (i = 0; i<this.points.length; i++) {
            if (i==min)
               { continue; }
            ang = this$1.angle(min, i);
            if (ang<0)
               { ang += Math.PI; }
            dist = this$1.distance(min, i);
            al.push(new ConvexHullPoint(i, ang, dist));
         }

         al.sort(function (a, b) { return a.compare(b); });

         // Create stack
         var stack = new Array(this.points.length+1);
         var j = 2;
         for(i = 0; i<this.points.length; i++) {
            if(i==min)
               { continue; }
            stack[j] = al[j-2].index;
            j++;
         }
         stack[0] = stack[this.points.length];
         stack[1] = min;

         var tmp;
         var M = 2;
         for(i = 3; i<=this.points.length; i++) {
            while(this.ccw(stack[M-1], stack[M], stack[i]) <= 0)
               { M--; }
            M++;
            tmp = stack[i];
            stack[i] = stack[M];
            stack[M] = tmp;
         }

         this.indices = new Array(M);
         for (i = 0; i<M; i++) {
            this$1.indices[i] = stack[i+1];
         }
      };
   };

   var hull = new ConvexHull();

   hull.compute(pts);
   var indices = hull.getIndices();

   if(indices&&indices.length>0) {
      var ch = [];
      for(var i=0; i<indices.length; i++) {
         ch.push(pts[indices[i]]);
         //echo(pts[indices[i]]);
      }
      //echo(ch.length+" points out",ch);
      return csg_2.fromPoints(ch);
      //return CAG.fromPointsNoCheck(ch);
   }
}

// "Whosa whatsis" suggested "Chain Hull" as described at https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN
// essentially hull A+B, B+C, C+D and then union those

function chain_hull() {
   var a = arguments;
   var j = 0, closed = false;

   if(a[j].closed!==undefined)
      { closed = a[j++].closed; }

   if(a[j].length)
      { a = a[j]; }

   var h = []; var n = a.length-(closed?0:1);
   for(var i=0; i<n; i++) {
      h.push(hull(a[i],a[(i+1)%a.length]));
   }
   return union(h);
}


var transformations = Object.freeze({
	translate: translate,
	center: center,
	scale: scale,
	rotate: rotate,
	mirror: mirror,
	expand: expand,
	contract: contract,
	multmatrix: multmatrix,
	minkowski: minkowski,
	hull: hull,
	chain_hull: chain_hull
});

// color table from http://www.w3.org/TR/css3-color/

function color () {
  var map = {
    'black': [ 0 / 255, 0 / 255, 0 / 255 ],
    'silver': [ 192 / 255, 192 / 255, 192 / 255 ],
    'gray': [ 128 / 255, 128 / 255, 128 / 255 ],
    'white': [ 255 / 255, 255 / 255, 255 / 255 ],
    'maroon': [ 128 / 255, 0 / 255, 0 / 255 ],
    'red': [ 255 / 255, 0 / 255, 0 / 255 ],
    'purple': [ 128 / 255, 0 / 255, 128 / 255 ],
    'fuchsia': [ 255 / 255, 0 / 255, 255 / 255 ],
    'green': [ 0 / 255, 128 / 255, 0 / 255 ],
    'lime': [ 0 / 255, 255 / 255, 0 / 255 ],
    'olive': [ 128 / 255, 128 / 255, 0 / 255 ],
    'yellow': [ 255 / 255, 255 / 255, 0 / 255 ],
    'navy': [ 0 / 255, 0 / 255, 128 / 255 ],
    'blue': [ 0 / 255, 0 / 255, 255 / 255 ],
    'teal': [ 0 / 255, 128 / 255, 128 / 255 ],
    'aqua': [ 0 / 255, 255 / 255, 255 / 255 ],
    'aliceblue': [ 240 / 255, 248 / 255, 255 / 255 ],
    'antiquewhite': [ 250 / 255, 235 / 255, 215 / 255 ],
    'aqua': [ 0 / 255, 255 / 255, 255 / 255 ],
    'aquamarine': [ 127 / 255, 255 / 255, 212 / 255 ],
    'azure': [ 240 / 255, 255 / 255, 255 / 255 ],
    'beige': [ 245 / 255, 245 / 255, 220 / 255 ],
    'bisque': [ 255 / 255, 228 / 255, 196 / 255 ],
    'black': [ 0 / 255, 0 / 255, 0 / 255 ],
    'blanchedalmond': [ 255 / 255, 235 / 255, 205 / 255 ],
    'blue': [ 0 / 255, 0 / 255, 255 / 255 ],
    'blueviolet': [ 138 / 255, 43 / 255, 226 / 255 ],
    'brown': [ 165 / 255, 42 / 255, 42 / 255 ],
    'burlywood': [ 222 / 255, 184 / 255, 135 / 255 ],
    'cadetblue': [ 95 / 255, 158 / 255, 160 / 255 ],
    'chartreuse': [ 127 / 255, 255 / 255, 0 / 255 ],
    'chocolate': [ 210 / 255, 105 / 255, 30 / 255 ],
    'coral': [ 255 / 255, 127 / 255, 80 / 255 ],
    'cornflowerblue': [ 100 / 255, 149 / 255, 237 / 255 ],
    'cornsilk': [ 255 / 255, 248 / 255, 220 / 255 ],
    'crimson': [ 220 / 255, 20 / 255, 60 / 255 ],
    'cyan': [ 0 / 255, 255 / 255, 255 / 255 ],
    'darkblue': [ 0 / 255, 0 / 255, 139 / 255 ],
    'darkcyan': [ 0 / 255, 139 / 255, 139 / 255 ],
    'darkgoldenrod': [ 184 / 255, 134 / 255, 11 / 255 ],
    'darkgray': [ 169 / 255, 169 / 255, 169 / 255 ],
    'darkgreen': [ 0 / 255, 100 / 255, 0 / 255 ],
    'darkgrey': [ 169 / 255, 169 / 255, 169 / 255 ],
    'darkkhaki': [ 189 / 255, 183 / 255, 107 / 255 ],
    'darkmagenta': [ 139 / 255, 0 / 255, 139 / 255 ],
    'darkolivegreen': [ 85 / 255, 107 / 255, 47 / 255 ],
    'darkorange': [ 255 / 255, 140 / 255, 0 / 255 ],
    'darkorchid': [ 153 / 255, 50 / 255, 204 / 255 ],
    'darkred': [ 139 / 255, 0 / 255, 0 / 255 ],
    'darksalmon': [ 233 / 255, 150 / 255, 122 / 255 ],
    'darkseagreen': [ 143 / 255, 188 / 255, 143 / 255 ],
    'darkslateblue': [ 72 / 255, 61 / 255, 139 / 255 ],
    'darkslategray': [ 47 / 255, 79 / 255, 79 / 255 ],
    'darkslategrey': [ 47 / 255, 79 / 255, 79 / 255 ],
    'darkturquoise': [ 0 / 255, 206 / 255, 209 / 255 ],
    'darkviolet': [ 148 / 255, 0 / 255, 211 / 255 ],
    'deeppink': [ 255 / 255, 20 / 255, 147 / 255 ],
    'deepskyblue': [ 0 / 255, 191 / 255, 255 / 255 ],
    'dimgray': [ 105 / 255, 105 / 255, 105 / 255 ],
    'dimgrey': [ 105 / 255, 105 / 255, 105 / 255 ],
    'dodgerblue': [ 30 / 255, 144 / 255, 255 / 255 ],
    'firebrick': [ 178 / 255, 34 / 255, 34 / 255 ],
    'floralwhite': [ 255 / 255, 250 / 255, 240 / 255 ],
    'forestgreen': [ 34 / 255, 139 / 255, 34 / 255 ],
    'fuchsia': [ 255 / 255, 0 / 255, 255 / 255 ],
    'gainsboro': [ 220 / 255, 220 / 255, 220 / 255 ],
    'ghostwhite': [ 248 / 255, 248 / 255, 255 / 255 ],
    'gold': [ 255 / 255, 215 / 255, 0 / 255 ],
    'goldenrod': [ 218 / 255, 165 / 255, 32 / 255 ],
    'gray': [ 128 / 255, 128 / 255, 128 / 255 ],
    'green': [ 0 / 255, 128 / 255, 0 / 255 ],
    'greenyellow': [ 173 / 255, 255 / 255, 47 / 255 ],
    'grey': [ 128 / 255, 128 / 255, 128 / 255 ],
    'honeydew': [ 240 / 255, 255 / 255, 240 / 255 ],
    'hotpink': [ 255 / 255, 105 / 255, 180 / 255 ],
    'indianred': [ 205 / 255, 92 / 255, 92 / 255 ],
    'indigo': [ 75 / 255, 0 / 255, 130 / 255 ],
    'ivory': [ 255 / 255, 255 / 255, 240 / 255 ],
    'khaki': [ 240 / 255, 230 / 255, 140 / 255 ],
    'lavender': [ 230 / 255, 230 / 255, 250 / 255 ],
    'lavenderblush': [ 255 / 255, 240 / 255, 245 / 255 ],
    'lawngreen': [ 124 / 255, 252 / 255, 0 / 255 ],
    'lemonchiffon': [ 255 / 255, 250 / 255, 205 / 255 ],
    'lightblue': [ 173 / 255, 216 / 255, 230 / 255 ],
    'lightcoral': [ 240 / 255, 128 / 255, 128 / 255 ],
    'lightcyan': [ 224 / 255, 255 / 255, 255 / 255 ],
    'lightgoldenrodyellow': [ 250 / 255, 250 / 255, 210 / 255 ],
    'lightgray': [ 211 / 255, 211 / 255, 211 / 255 ],
    'lightgreen': [ 144 / 255, 238 / 255, 144 / 255 ],
    'lightgrey': [ 211 / 255, 211 / 255, 211 / 255 ],
    'lightpink': [ 255 / 255, 182 / 255, 193 / 255 ],
    'lightsalmon': [ 255 / 255, 160 / 255, 122 / 255 ],
    'lightseagreen': [ 32 / 255, 178 / 255, 170 / 255 ],
    'lightskyblue': [ 135 / 255, 206 / 255, 250 / 255 ],
    'lightslategray': [ 119 / 255, 136 / 255, 153 / 255 ],
    'lightslategrey': [ 119 / 255, 136 / 255, 153 / 255 ],
    'lightsteelblue': [ 176 / 255, 196 / 255, 222 / 255 ],
    'lightyellow': [ 255 / 255, 255 / 255, 224 / 255 ],
    'lime': [ 0 / 255, 255 / 255, 0 / 255 ],
    'limegreen': [ 50 / 255, 205 / 255, 50 / 255 ],
    'linen': [ 250 / 255, 240 / 255, 230 / 255 ],
    'magenta': [ 255 / 255, 0 / 255, 255 / 255 ],
    'maroon': [ 128 / 255, 0 / 255, 0 / 255 ],
    'mediumaquamarine': [ 102 / 255, 205 / 255, 170 / 255 ],
    'mediumblue': [ 0 / 255, 0 / 255, 205 / 255 ],
    'mediumorchid': [ 186 / 255, 85 / 255, 211 / 255 ],
    'mediumpurple': [ 147 / 255, 112 / 255, 219 / 255 ],
    'mediumseagreen': [ 60 / 255, 179 / 255, 113 / 255 ],
    'mediumslateblue': [ 123 / 255, 104 / 255, 238 / 255 ],
    'mediumspringgreen': [ 0 / 255, 250 / 255, 154 / 255 ],
    'mediumturquoise': [ 72 / 255, 209 / 255, 204 / 255 ],
    'mediumvioletred': [ 199 / 255, 21 / 255, 133 / 255 ],
    'midnightblue': [ 25 / 255, 25 / 255, 112 / 255 ],
    'mintcream': [ 245 / 255, 255 / 255, 250 / 255 ],
    'mistyrose': [ 255 / 255, 228 / 255, 225 / 255 ],
    'moccasin': [ 255 / 255, 228 / 255, 181 / 255 ],
    'navajowhite': [ 255 / 255, 222 / 255, 173 / 255 ],
    'navy': [ 0 / 255, 0 / 255, 128 / 255 ],
    'oldlace': [ 253 / 255, 245 / 255, 230 / 255 ],
    'olive': [ 128 / 255, 128 / 255, 0 / 255 ],
    'olivedrab': [ 107 / 255, 142 / 255, 35 / 255 ],
    'orange': [ 255 / 255, 165 / 255, 0 / 255 ],
    'orangered': [ 255 / 255, 69 / 255, 0 / 255 ],
    'orchid': [ 218 / 255, 112 / 255, 214 / 255 ],
    'palegoldenrod': [ 238 / 255, 232 / 255, 170 / 255 ],
    'palegreen': [ 152 / 255, 251 / 255, 152 / 255 ],
    'paleturquoise': [ 175 / 255, 238 / 255, 238 / 255 ],
    'palevioletred': [ 219 / 255, 112 / 255, 147 / 255 ],
    'papayawhip': [ 255 / 255, 239 / 255, 213 / 255 ],
    'peachpuff': [ 255 / 255, 218 / 255, 185 / 255 ],
    'peru': [ 205 / 255, 133 / 255, 63 / 255 ],
    'pink': [ 255 / 255, 192 / 255, 203 / 255 ],
    'plum': [ 221 / 255, 160 / 255, 221 / 255 ],
    'powderblue': [ 176 / 255, 224 / 255, 230 / 255 ],
    'purple': [ 128 / 255, 0 / 255, 128 / 255 ],
    'red': [ 255 / 255, 0 / 255, 0 / 255 ],
    'rosybrown': [ 188 / 255, 143 / 255, 143 / 255 ],
    'royalblue': [ 65 / 255, 105 / 255, 225 / 255 ],
    'saddlebrown': [ 139 / 255, 69 / 255, 19 / 255 ],
    'salmon': [ 250 / 255, 128 / 255, 114 / 255 ],
    'sandybrown': [ 244 / 255, 164 / 255, 96 / 255 ],
    'seagreen': [ 46 / 255, 139 / 255, 87 / 255 ],
    'seashell': [ 255 / 255, 245 / 255, 238 / 255 ],
    'sienna': [ 160 / 255, 82 / 255, 45 / 255 ],
    'silver': [ 192 / 255, 192 / 255, 192 / 255 ],
    'skyblue': [ 135 / 255, 206 / 255, 235 / 255 ],
    'slateblue': [ 106 / 255, 90 / 255, 205 / 255 ],
    'slategray': [ 112 / 255, 128 / 255, 144 / 255 ],
    'slategrey': [ 112 / 255, 128 / 255, 144 / 255 ],
    'snow': [ 255 / 255, 250 / 255, 250 / 255 ],
    'springgreen': [ 0 / 255, 255 / 255, 127 / 255 ],
    'steelblue': [ 70 / 255, 130 / 255, 180 / 255 ],
    'tan': [ 210 / 255, 180 / 255, 140 / 255 ],
    'teal': [ 0 / 255, 128 / 255, 128 / 255 ],
    'thistle': [ 216 / 255, 191 / 255, 216 / 255 ],
    'tomato': [ 255 / 255, 99 / 255, 71 / 255 ],
    'turquoise': [ 64 / 255, 224 / 255, 208 / 255 ],
    'violet': [ 238 / 255, 130 / 255, 238 / 255 ],
    'wheat': [ 245 / 255, 222 / 255, 179 / 255 ],
    'white': [ 255 / 255, 255 / 255, 255 / 255 ],
    'whitesmoke': [ 245 / 255, 245 / 255, 245 / 255 ],
    'yellow': [ 255 / 255, 255 / 255, 0 / 255 ],
    'yellowgreen': [ 154 / 255, 205 / 255, 50 / 255 ] };

  var o, i = 1, a = arguments, c = a[0], alpha;

  if (a[0].length < 4 && (a[i] * 1 - 0) == a[i]) { alpha = a[i++];} // first argument rgb (no a), and next one is numeric?
  if (a[i].length) { a = a[i], i = 0; } // next arg an array, make it our main array to walk through
  if (typeof c == 'string')
    { c = map[c.toLowerCase()]; }
  if (alpha !== undefined)
    { c = c.concat(alpha); }
  for (o = a[i++]; i < a.length; i++) {
    o = o.union(a[i]);
  }
  return o.setColor(c)
}


/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hsl2rgb(h, s, l){
    if(h.length) { l = h[2], s = h[1], h = h[0]; }
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) { t += 1; }
            if(t > 1) { t -= 1; }
            if(t < 1/6) { return p + (q - p) * 6 * t; }
            if(t < 1/2) { return q; }
            if(t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r, g, b];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */

function rgb2hsv(r, g, b){
    if(r.length) { b = r[2], g = r[1], r = r[0]; }
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsv2rgb(h, s, v){
    if(h.length) { v = h[2], s = h[1], h = h[0]; }
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r, g, b];
}

/**
 * Converts a HTML5 color value (string) to RGB values
 * See the color input type of HTML5 forms
 * Conversion formula:
 * - split the string; "#RRGGBB" into RGB components
 * - convert the HEX value into RGB values
 */
function html2rgb(s) {
    var r = 0;
    var g = 0;
    var b = 0;
    if(s.length == 7) {
      r = parseInt('0x'+s.slice(1,3))/255;
      g = parseInt('0x'+s.slice(3,5))/255;
      b = parseInt('0x'+s.slice(5,7))/255;
    }
    return [r,g,b];
}

/**
 * Converts RGB color value to HTML5 color value (string)
 * Conversion forumla:
 * - convert R, G, B into HEX strings
 * - return HTML formatted string "#RRGGBB"
 */
function rgb2html(r, g, b){
    if(r.length) { b = r[2], g = r[1], r = r[0]; }
    var s = '#' +
      Number(0x1000000+r*255*0x10000+g*255*0x100+b*255).toString(16).substring(1);
    return s;
}


var color$1 = Object.freeze({
	color: color,
	hsl2rgb: hsl2rgb,
	rgb2hsv: rgb2hsv,
	hsv2rgb: hsv2rgb,
	html2rgb: html2rgb,
	rgb2html: rgb2html
});

// -- Math functions (360 deg based vs 2pi)

function sin(a) {
   return Math.sin(a/360*Math.PI*2);
}
function cos(a) {
   return Math.cos(a/360*Math.PI*2);
}
function asin(a) {
   return Math.asin(a)/(Math.PI*2)*360;
}
function acos(a) {
   return Math.acos(a)/(Math.PI*2)*360;
}
function tan(a) {
   return Math.tan(a/360*Math.PI*2);
}
function atan(a) {
   return Math.atan(a)/(Math.PI*2)*360;
}
function atan2(a,b) {
   return Math.atan2(a,b)/(Math.PI*2)*360;
}
function ceil(a) {
   return Math.ceil(a);
}
function floor(a) {
   return Math.floor(a);
}
function abs(a) {
   return Math.abs(a);
}
function min(a,b) {
   return a<b?a:b;
}
function max(a,b) {
   return a>b?a:b;
}
function rands(min,max,vn,seed) {
   // -- seed is ignored for now, FIX IT (requires reimplementation of random())
   //    see http://stackoverflow.com/questions/424292/how-to-create-my-own-javascript-random-number-generator-that-i-can-also-set-the
   var v = new Array(vn);
   for(var i=0; i<vn; i++) {
      v[i] = Math.random()*(max-min)+min;
   }
}
function log(a) {
   return Math.log(a);
}
function lookup(ix,v) {
   var r = 0;
   for(var i=0; i<v.length; i++) {
      var a0 = v[i];
      if(a0[0]>=ix) {
         i--;
         a0 = v[i];
         var a1 = v[i+1];
         var m = 0;
         if(a0[0]!=a1[0]) {
            m = abs((ix-a0[0])/(a1[0]-a0[0]));
         }
         //echo(">>",i,ix,a0[0],a1[0],";",m,a0[1],a1[1]);
         if(m>0) {
            r = a0[1]*(1-m)+a1[1]*m;
         } else {
            r = a0[1];
         }
         return r;
      }
   }
   return r;
}

function pow(a,b) {
   return Math.pow(a,b);
}

function sign(a) {
   return a<0?-1:(a>1?1:0);
}

function sqrt(a) {
   return Math.sqrt(a);
}

function round(a) {
   return floor(a+0.5);
}


var maths = Object.freeze({
	sin: sin,
	cos: cos,
	asin: asin,
	acos: acos,
	tan: tan,
	atan: atan,
	atan2: atan2,
	ceil: ceil,
	floor: floor,
	abs: abs,
	min: min,
	max: max,
	rands: rands,
	log: log,
	lookup: lookup,
	pow: pow,
	sign: sign,
	sqrt: sqrt,
	round: round
});

function vector_char(x,y,c) {
   c = c.charCodeAt(0);
   c -= 32;
   if(c<0||c>=95) { return { width: 0, segments: [] }; }

   var off = c*112;
   var n = simplexFont[off++];
   var w = simplexFont[off++];
   var l = [];
   var segs = [];

   for(var i=0; i<n; i++) {
      var xp = simplexFont[off+i*2];
      var yp = simplexFont[off+i*2+1];
      if(xp==-1&&yp==-1) {
         segs.push(l); l = [];
      } else {
         l.push([xp+x,yp+y]);
      }
   }
   if(l.length) { segs.push(l); }
   return { width: w, segments: segs };
}

function vector_text(x,y,s) {
   var o = [];
   var x0 = x;
   for(var i=0; i<s.length; i++) {
      var c = s.charAt(i);
      if(c=='\n') {
         x = x0; y -= 30;
      } else {
         var d = vector_char(x,y,c);
         x += d.width;
         o = o.concat(d.segments);
      }
   }
   return o;
}

// -- data below from http://paulbourke.net/dataformats/hershey/

var simplexFont = [
    0,16, /* Ascii 32 */
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,10, /* Ascii 33 */
    5,21, 5, 7,-1,-1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,16, /* Ascii 34 */
    4,21, 4,14,-1,-1,12,21,12,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   11,21, /* Ascii 35 */
   11,25, 4,-7,-1,-1,17,25,10,-7,-1,-1, 4,12,18,12,-1,-1, 3, 6,17, 6,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   26,20, /* Ascii 36 */
    8,25, 8,-4,-1,-1,12,25,12,-4,-1,-1,17,18,15,20,12,21, 8,21, 5,20, 3,
   18, 3,16, 4,14, 5,13, 7,12,13,10,15, 9,16, 8,17, 6,17, 3,15, 1,12, 0,
    8, 0, 5, 1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   31,24, /* Ascii 37 */
   21,21, 3, 0,-1,-1, 8,21,10,19,10,17, 9,15, 7,14, 5,14, 3,16, 3,18, 4,
   20, 6,21, 8,21,10,20,13,19,16,19,19,20,21,21,-1,-1,17, 7,15, 6,14, 4,
   14, 2,16, 0,18, 0,20, 1,21, 3,21, 5,19, 7,17, 7,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   34,26, /* Ascii 38 */
   23,12,23,13,22,14,21,14,20,13,19,11,17, 6,15, 3,13, 1,11, 0, 7, 0, 5,
    1, 4, 2, 3, 4, 3, 6, 4, 8, 5, 9,12,13,13,14,14,16,14,18,13,20,11,21,
    9,20, 8,18, 8,16, 9,13,11,10,16, 3,18, 1,20, 0,22, 0,23, 1,23, 2,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    7,10, /* Ascii 39 */
    5,19, 4,20, 5,21, 6,20, 6,18, 5,16, 4,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   10,14, /* Ascii 40 */
   11,25, 9,23, 7,20, 5,16, 4,11, 4, 7, 5, 2, 7,-2, 9,-5,11,-7,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   10,14, /* Ascii 41 */
    3,25, 5,23, 7,20, 9,16,10,11,10, 7, 9, 2, 7,-2, 5,-5, 3,-7,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,16, /* Ascii 42 */
    8,21, 8, 9,-1,-1, 3,18,13,12,-1,-1,13,18, 3,12,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,26, /* Ascii 43 */
   13,18,13, 0,-1,-1, 4, 9,22, 9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,10, /* Ascii 44 */
    6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6,-1, 5,-3, 4,-4,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    2,26, /* Ascii 45 */
    4, 9,22, 9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,10, /* Ascii 46 */
    5, 2, 4, 1, 5, 0, 6, 1, 5, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    2,22, /* Ascii 47 */
   20,25, 2,-7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,20, /* Ascii 48 */
    9,21, 6,20, 4,17, 3,12, 3, 9, 4, 4, 6, 1, 9, 0,11, 0,14, 1,16, 4,17,
    9,17,12,16,17,14,20,11,21, 9,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    4,20, /* Ascii 49 */
    6,17, 8,18,11,21,11, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   14,20, /* Ascii 50 */
    4,16, 4,17, 5,19, 6,20, 8,21,12,21,14,20,15,19,16,17,16,15,15,13,13,
   10, 3, 0,17, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   15,20, /* Ascii 51 */
    5,21,16,21,10,13,13,13,15,12,16,11,17, 8,17, 6,16, 3,14, 1,11, 0, 8,
    0, 5, 1, 4, 2, 3, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    6,20, /* Ascii 52 */
   13,21, 3, 7,18, 7,-1,-1,13,21,13, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,20, /* Ascii 53 */
   15,21, 5,21, 4,12, 5,13, 8,14,11,14,14,13,16,11,17, 8,17, 6,16, 3,14,
    1,11, 0, 8, 0, 5, 1, 4, 2, 3, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   23,20, /* Ascii 54 */
   16,18,15,20,12,21,10,21, 7,20, 5,17, 4,12, 4, 7, 5, 3, 7, 1,10, 0,11,
    0,14, 1,16, 3,17, 6,17, 7,16,10,14,12,11,13,10,13, 7,12, 5,10, 4, 7,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,20, /* Ascii 55 */
   17,21, 7, 0,-1,-1, 3,21,17,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   29,20, /* Ascii 56 */
    8,21, 5,20, 4,18, 4,16, 5,14, 7,13,11,12,14,11,16, 9,17, 7,17, 4,16,
    2,15, 1,12, 0, 8, 0, 5, 1, 4, 2, 3, 4, 3, 7, 4, 9, 6,11, 9,12,13,13,
   15,14,16,16,16,18,15,20,12,21, 8,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   23,20, /* Ascii 57 */
   16,14,15,11,13, 9,10, 8, 9, 8, 6, 9, 4,11, 3,14, 3,15, 4,18, 6,20, 9,
   21,10,21,13,20,15,18,16,14,16, 9,15, 4,13, 1,10, 0, 8, 0, 5, 1, 4, 3,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   11,10, /* Ascii 58 */
    5,14, 4,13, 5,12, 6,13, 5,14,-1,-1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   14,10, /* Ascii 59 */
    5,14, 4,13, 5,12, 6,13, 5,14,-1,-1, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6,
   -1, 5,-3, 4,-4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    3,24, /* Ascii 60 */
   20,18, 4, 9,20, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,26, /* Ascii 61 */
    4,12,22,12,-1,-1, 4, 6,22, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    3,24, /* Ascii 62 */
    4,18,20, 9, 4, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   20,18, /* Ascii 63 */
    3,16, 3,17, 4,19, 5,20, 7,21,11,21,13,20,14,19,15,17,15,15,14,13,13,
   12, 9,10, 9, 7,-1,-1, 9, 2, 8, 1, 9, 0,10, 1, 9, 2,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   55,27, /* Ascii 64 */
   18,13,17,15,15,16,12,16,10,15, 9,14, 8,11, 8, 8, 9, 6,11, 5,14, 5,16,
    6,17, 8,-1,-1,12,16,10,14, 9,11, 9, 8,10, 6,11, 5,-1,-1,18,16,17, 8,
   17, 6,19, 5,21, 5,23, 7,24,10,24,12,23,15,22,17,20,19,18,20,15,21,12,
   21, 9,20, 7,19, 5,17, 4,15, 3,12, 3, 9, 4, 6, 5, 4, 7, 2, 9, 1,12, 0,
   15, 0,18, 1,20, 2,21, 3,-1,-1,19,16,18, 8,18, 6,19, 5,
    8,18, /* Ascii 65 */
    9,21, 1, 0,-1,-1, 9,21,17, 0,-1,-1, 4, 7,14, 7,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   23,21, /* Ascii 66 */
    4,21, 4, 0,-1,-1, 4,21,13,21,16,20,17,19,18,17,18,15,17,13,16,12,13,
   11,-1,-1, 4,11,13,11,16,10,17, 9,18, 7,18, 4,17, 2,16, 1,13, 0, 4, 0,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   18,21, /* Ascii 67 */
   18,16,17,18,15,20,13,21, 9,21, 7,20, 5,18, 4,16, 3,13, 3, 8, 4, 5, 5,
    3, 7, 1, 9, 0,13, 0,15, 1,17, 3,18, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   15,21, /* Ascii 68 */
    4,21, 4, 0,-1,-1, 4,21,11,21,14,20,16,18,17,16,18,13,18, 8,17, 5,16,
    3,14, 1,11, 0, 4, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   11,19, /* Ascii 69 */
    4,21, 4, 0,-1,-1, 4,21,17,21,-1,-1, 4,11,12,11,-1,-1, 4, 0,17, 0,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,18, /* Ascii 70 */
    4,21, 4, 0,-1,-1, 4,21,17,21,-1,-1, 4,11,12,11,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   22,21, /* Ascii 71 */
   18,16,17,18,15,20,13,21, 9,21, 7,20, 5,18, 4,16, 3,13, 3, 8, 4, 5, 5,
    3, 7, 1, 9, 0,13, 0,15, 1,17, 3,18, 5,18, 8,-1,-1,13, 8,18, 8,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,22, /* Ascii 72 */
    4,21, 4, 0,-1,-1,18,21,18, 0,-1,-1, 4,11,18,11,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    2, 8, /* Ascii 73 */
    4,21, 4, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   10,16, /* Ascii 74 */
   12,21,12, 5,11, 2,10, 1, 8, 0, 6, 0, 4, 1, 3, 2, 2, 5, 2, 7,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,21, /* Ascii 75 */
    4,21, 4, 0,-1,-1,18,21, 4, 7,-1,-1, 9,12,18, 0,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,17, /* Ascii 76 */
    4,21, 4, 0,-1,-1, 4, 0,16, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   11,24, /* Ascii 77 */
    4,21, 4, 0,-1,-1, 4,21,12, 0,-1,-1,20,21,12, 0,-1,-1,20,21,20, 0,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,22, /* Ascii 78 */
    4,21, 4, 0,-1,-1, 4,21,18, 0,-1,-1,18,21,18, 0,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   21,22, /* Ascii 79 */
    9,21, 7,20, 5,18, 4,16, 3,13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0,13, 0,15,
    1,17, 3,18, 5,19, 8,19,13,18,16,17,18,15,20,13,21, 9,21,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   13,21, /* Ascii 80 */
    4,21, 4, 0,-1,-1, 4,21,13,21,16,20,17,19,18,17,18,14,17,12,16,11,13,
   10, 4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   24,22, /* Ascii 81 */
    9,21, 7,20, 5,18, 4,16, 3,13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0,13, 0,15,
    1,17, 3,18, 5,19, 8,19,13,18,16,17,18,15,20,13,21, 9,21,-1,-1,12, 4,
   18,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   16,21, /* Ascii 82 */
    4,21, 4, 0,-1,-1, 4,21,13,21,16,20,17,19,18,17,18,15,17,13,16,12,13,
   11, 4,11,-1,-1,11,11,18, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   20,20, /* Ascii 83 */
   17,18,15,20,12,21, 8,21, 5,20, 3,18, 3,16, 4,14, 5,13, 7,12,13,10,15,
    9,16, 8,17, 6,17, 3,15, 1,12, 0, 8, 0, 5, 1, 3, 3,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,16, /* Ascii 84 */
    8,21, 8, 0,-1,-1, 1,21,15,21,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   10,22, /* Ascii 85 */
    4,21, 4, 6, 5, 3, 7, 1,10, 0,12, 0,15, 1,17, 3,18, 6,18,21,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,18, /* Ascii 86 */
    1,21, 9, 0,-1,-1,17,21, 9, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   11,24, /* Ascii 87 */
    2,21, 7, 0,-1,-1,12,21, 7, 0,-1,-1,12,21,17, 0,-1,-1,22,21,17, 0,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,20, /* Ascii 88 */
    3,21,17, 0,-1,-1,17,21, 3, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    6,18, /* Ascii 89 */
    1,21, 9,11, 9, 0,-1,-1,17,21, 9,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,20, /* Ascii 90 */
   17,21, 3, 0,-1,-1, 3,21,17,21,-1,-1, 3, 0,17, 0,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   11,14, /* Ascii 91 */
    4,25, 4,-7,-1,-1, 5,25, 5,-7,-1,-1, 4,25,11,25,-1,-1, 4,-7,11,-7,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    2,14, /* Ascii 92 */
    0,21,14,-3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   11,14, /* Ascii 93 */
    9,25, 9,-7,-1,-1,10,25,10,-7,-1,-1, 3,25,10,25,-1,-1, 3,-7,10,-7,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   10,16, /* Ascii 94 */
    6,15, 8,18,10,15,-1,-1, 3,12, 8,17,13,12,-1,-1, 8,17, 8, 0,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    2,16, /* Ascii 95 */
    0,-2,16,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    7,10, /* Ascii 96 */
    6,21, 5,20, 4,18, 4,16, 5,15, 6,16, 5,17,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,19, /* Ascii 97 */
   15,14,15, 0,-1,-1,15,11,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4,
    3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,19, /* Ascii 98 */
    4,21, 4, 0,-1,-1, 4,11, 6,13, 8,14,11,14,13,13,15,11,16, 8,16, 6,15,
    3,13, 1,11, 0, 8, 0, 6, 1, 4, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   14,18, /* Ascii 99 */
   15,11,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0,11,
    0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,19, /* Ascii 100 */
   15,21,15, 0,-1,-1,15,11,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4,
    3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,18, /* Ascii 101 */
    3, 8,15, 8,15,10,14,12,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4,
    3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,12, /* Ascii 102 */
   10,21, 8,21, 6,20, 5,17, 5, 0,-1,-1, 2,14, 9,14,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   22,19, /* Ascii 103 */
   15,14,15,-2,14,-5,13,-6,11,-7, 8,-7, 6,-6,-1,-1,15,11,13,13,11,14, 8,
   14, 6,13, 4,11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   10,19, /* Ascii 104 */
    4,21, 4, 0,-1,-1, 4,10, 7,13, 9,14,12,14,14,13,15,10,15, 0,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8, 8, /* Ascii 105 */
    3,21, 4,20, 5,21, 4,22, 3,21,-1,-1, 4,14, 4, 0,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   11,10, /* Ascii 106 */
    5,21, 6,20, 7,21, 6,22, 5,21,-1,-1, 6,14, 6,-3, 5,-6, 3,-7, 1,-7,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,17, /* Ascii 107 */
    4,21, 4, 0,-1,-1,14,14, 4, 4,-1,-1, 8, 8,15, 0,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    2, 8, /* Ascii 108 */
    4,21, 4, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   18,30, /* Ascii 109 */
    4,14, 4, 0,-1,-1, 4,10, 7,13, 9,14,12,14,14,13,15,10,15, 0,-1,-1,15,
   10,18,13,20,14,23,14,25,13,26,10,26, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   10,19, /* Ascii 110 */
    4,14, 4, 0,-1,-1, 4,10, 7,13, 9,14,12,14,14,13,15,10,15, 0,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,19, /* Ascii 111 */
    8,14, 6,13, 4,11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0,11, 0,13, 1,15, 3,16,
    6,16, 8,15,11,13,13,11,14, 8,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,19, /* Ascii 112 */
    4,14, 4,-7,-1,-1, 4,11, 6,13, 8,14,11,14,13,13,15,11,16, 8,16, 6,15,
    3,13, 1,11, 0, 8, 0, 6, 1, 4, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,19, /* Ascii 113 */
   15,14,15,-7,-1,-1,15,11,13,13,11,14, 8,14, 6,13, 4,11, 3, 8, 3, 6, 4,
    3, 6, 1, 8, 0,11, 0,13, 1,15, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,13, /* Ascii 114 */
    4,14, 4, 0,-1,-1, 4, 8, 5,11, 7,13, 9,14,12,14,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   17,17, /* Ascii 115 */
   14,11,13,13,10,14, 7,14, 4,13, 3,11, 4, 9, 6, 8,11, 7,13, 6,14, 4,14,
    3,13, 1,10, 0, 7, 0, 4, 1, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,12, /* Ascii 116 */
    5,21, 5, 4, 6, 1, 8, 0,10, 0,-1,-1, 2,14, 9,14,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   10,19, /* Ascii 117 */
    4,14, 4, 4, 5, 1, 7, 0,10, 0,12, 1,15, 4,-1,-1,15,14,15, 0,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,16, /* Ascii 118 */
    2,14, 8, 0,-1,-1,14,14, 8, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   11,22, /* Ascii 119 */
    3,14, 7, 0,-1,-1,11,14, 7, 0,-1,-1,11,14,15, 0,-1,-1,19,14,15, 0,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    5,17, /* Ascii 120 */
    3,14,14, 0,-1,-1,14,14, 3, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    9,16, /* Ascii 121 */
    2,14, 8, 0,-1,-1,14,14, 8, 0, 6,-4, 4,-6, 2,-7, 1,-7,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    8,17, /* Ascii 122 */
   14,14, 3, 0,-1,-1, 3,14,14,14,-1,-1, 3, 0,14, 0,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   39,14, /* Ascii 123 */
    9,25, 7,24, 6,23, 5,21, 5,19, 6,17, 7,16, 8,14, 8,12, 6,10,-1,-1, 7,
   24, 6,22, 6,20, 7,18, 8,17, 9,15, 9,13, 8,11, 4, 9, 8, 7, 9, 5, 9, 3,
    8, 1, 7, 0, 6,-2, 6,-4, 7,-6,-1,-1, 6, 8, 8, 6, 8, 4, 7, 2, 6, 1, 5,
   -1, 5,-3, 6,-5, 7,-6, 9,-7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    2, 8, /* Ascii 124 */
    4,25, 4,-7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   39,14, /* Ascii 125 */
    5,25, 7,24, 8,23, 9,21, 9,19, 8,17, 7,16, 6,14, 6,12, 8,10,-1,-1, 7,
   24, 8,22, 8,20, 7,18, 6,17, 5,15, 5,13, 6,11,10, 9, 6, 7, 5, 5, 5, 3,
    6, 1, 7, 0, 8,-2, 8,-4, 7,-6,-1,-1, 8, 8, 6, 6, 6, 4, 7, 2, 8, 1, 9,
   -1, 9,-3, 8,-5, 7,-6, 5,-7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   23,24, /* Ascii 126 */
    3, 6, 3, 8, 4,11, 6,12, 8,12,10,11,14, 8,16, 7,18, 7,20, 8,21,10,-1,
   -1, 3, 8, 4,10, 6,11, 8,11,10,10,14, 7,16, 6,18, 6,20, 7,21,10,21,12,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
   -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1 ];


var text = Object.freeze({
	vector_char: vector_char,
	vector_text: vector_text
});

function log$1 (txt) {
  var timeInMs = Date.now();
  var prevtime = OpenJsCad.log.prevLogTime;
  if (!prevtime) { prevtime = timeInMs; }
  var deltatime = timeInMs - prevtime;
  log$1.prevLogTime = timeInMs;
  var timefmt = (deltatime * 0.001).toFixed(3);
  txt = '[' + timefmt + '] ' + txt;
  if ((typeof (console) == 'object') && (typeof (console.log) == 'function')) {
    console.log(txt);
  } else if ((typeof (self) == 'object') && (typeof (self.postMessage) == 'function')) {
    self.postMessage({cmd: 'log', txt: txt});
  }
  else { throw new Error('Cannot log') }
}

// See Processor.setStatus()
// Note: leave for compatibility

var exportedApi = {
  csg: {CAG: csg_2, CSG: csg_1},
  primitives2d: primitives2d,
  primitives3d: primitives3d,
  booleanOps: booleanOps,
  transformations: transformations,
  extrusion: extrusion,
  color: color$1,
  maths: maths,
  text: text,
  OpenJsCad: {Openjscad: {log: log$1}}
};

/**
 * generate output data from source
 * @param {String} source the original source
 * @param {Object} params hash of parameters to pass to main function
 * @param {String} options
 * @return a Promise with the output data
 */
function generateOutputData (source, params, options) {
  var defaults = {
    implicitGlobals: true,
    outputFormat: 'stl'
  };
  options = Object.assign({}, defaults, options);
  var implicitGlobals = options.implicitGlobals;
  var outputFormat = options.outputFormat;

  var globals = {};
  if (implicitGlobals) {
    globals.oscad = exportedApi;
  }
  globals.extras = {cli: {getParameterDefinitionsCLI: getParameterDefinitionsCLI}};

  // modify main to adapt parameters
  var mainFunction = "var wrappedMain = main\n  main = function(){\n    var paramsDefinition = (typeof getParameterDefinitions !== 'undefined') ? getParameterDefinitions : undefined\n    return wrappedMain(getParameterDefinitionsCLI(paramsDefinition, " + (JSON.stringify(params)) + "))\n  }";
  source = source + "\n  " + mainFunction + "\n  ";

  // objects = rebuildSolidSync(source, '', params, globals, callback)
  return new Promise(function (resolve, reject) {
    var callback = function (err, result) {
      if (!err) {
        return resolve(result)
      }
      return reject(err)
    };

    if (outputFormat === 'jscad' || outputFormat === 'js') {
      resolve(source);
    } else {
      rebuildSolidSync(source, '', params, globals, callback);
    }
  })
    .then(function (objects) {
      var formatInfo = {
        convertCAG: true, convertCSG: true, mimetype: formats[outputFormat].mimetype
      };
      return convertToBlob(objects, {format: outputFormat, formatInfo: formatInfo})
    })

// return convertToBlob(objects, {format: outputFormat, formatInfo: {convertCAG: true, convertCSG: true}})
}

// shebang gets auto added here
//--log_all

// NOTE: this will only run on Node > 6 or needs to be transpiled, or launched via launch-cli

// == OpenJSCAD.org CLI interface, written by Rene K. Mueller <spiritdude@gmail.com>, Licensed under MIT License
//
// Description:
//   openjscad <file> [-of <format>] [-o <output>]
// e.g.
//   openjscad test.jscad
//   openjscad test.jscad -o test.stl
//   openjscad test.jscad -o test.amf
//   openjscad test.jscad -o test.dxf
//   openjscad test.scad -o testFromSCAD.jscad
//   openjscad test.scad -o test.stl
//   openjscad test.stl -o test2.stl      # reprocessed: stl -> jscad -> stl
//   openjscad test.amf -o test2.jscad
//   openjscad test.jscad -of amf
//   openjscad test.jscad -of dxf
//   openjscad test.jscad -of stl
//   openjscad name_plate.jscad --name "Just Me" --title "CEO" -o amf test.amf
//
// History:
// 2016/10/01: 0.5.2: changes for libraries
// 2016/06/27: 0.5.1: refactored AMF import and export by Z3 Dev
//                    enhanced STL import, adding support for MM colors by Z3 Dev
// 2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev
// 2015/07/02: 0.3.0: node 0.10.x support, /usr/bin/nodejs, new files involved: formats.js (Stefan Baumann) and Blob.js (Z3 Dev)
// 2014/12/09: 0.019: support of DXF output for 2D objects (laser cutter)
// 2013/04/25: 0.010: support of params passed to main()
// 2013/04/12: 0.008: reimplement parseAMF without jquery
// 2013/04/11: 0.007: support of alpha for AMF addded, bumping version
// 2013/04/05: 0.006: support of AMF added, requires node 0.8.1+
// 2013/03/25: 0.005: more sanity check on input and local installation support
// 2013/03/18: 0.004: STL .stl (binary & ascii) support (experimental via openscad.js)
// 2013/03/18: 0.003: OpenSCAD .scad support by Gary Hodgson's openscad-openjscad-translator module
// 2013/03/02: 0.002: proper installation of the dependencies (csg.js & openscad.js) so openjscad can be used properly
// 2013/03/01: 0.001: initial version, with base function from openscad.jscad
//
// var csg = sphere(1);          // -- basic test
// var csg = require(file).main; // -- treating .jscad as module? later perhaps

var args = process.argv.splice(2);

// -- main code

// handle arguments
// inputs, outputs
var ref = parseArgs(args);
var inputFile = ref.inputFile;
var inputFormat = ref.inputFormat;
var outputFile = ref.outputFile;
var outputFormat = ref.outputFormat;
var params = ref.params;

// outputs
var output = determineOutputNameAndFormat(outputFormat, outputFile);
outputFormat = output.outputFormat;
outputFile = output.outputFile;

console.log(("converting " + inputFile + " -> " + outputFile + " (" + (formats[outputFormat].description) + ")"));

var src = fs.readFileSync(inputFile, inputFile.match(/\.stl$/i) ? 'binary' : 'UTF8');
// -- include input, and convert into JSCAD source
// src = inputFormatHandlers[inputFormat](src, inputFile, outputFile)

if(inputFormat === 'scad')
{
  var scadParser = require('openscad-openjscad-translator'); // hardcoded is bad, but works
  src = scadParser.parse(src); //    doing the magick
  src = '// producer: OpenJSCAD ' + version + '\n' + src;
  src = '// source: ' + outputFile + '\n\n' + src;
}

// -- convert from JSCAD script into the desired output format
// const outputData = generateOutputData(src, params, {outputFormat})
// -- and write it to disk
// writeOutputDataToFile(outputFile, outputData)
generateOutputData(src, params, {outputFormat: outputFormat})
  .then(function (outputData) {
    writeOutputDataToFile(outputFile, outputData);
  }).catch(function (error){ return console.error(error); });

// -- helper functions ---------------------------------------------------------------------------------------
function parseArgs (args) {
  // hint: https://github.com/substack/node-optimist
  //       https://github.com/visionmedia/commander.js
  //
  // process.argv.forEach(function (val, index, array) {
  //  console.log(index + ': ' + val)
  // })
  if (args.length < 1) {
    console.log('USAGE:\n\nopenjscad [-v] <file> [-of <format>] [-o <output>]');
    console.log('\t<file>  :\tinput file (Supported types: .jscad, .js, .scad, .stl, .amf, .obj, .gcode, .svg, .json)');
    console.log('\t<output>:\toutput file (Supported types: .jscad, .stl, .amf, .dxf, .svg, .json)');
    console.log("\t<format>:\t'jscad', 'stla' (STL ASCII, default), 'stlb' (STL Binary), 'amf', 'dxf', 'svg', 'json'");
    process.exit(1);
  }

  var inputFile;
  var inputFormat;
  var outputFile;
  var outputFormat;
  var params = {};

  for (var i = 0; i < args.length; i++) {
    if (args[i] === '-of') { // -of <format>
      outputFormat = args[++i];
    } else if (args[i].match(/^-o(\S.+)/)) { // -o<output>
      outputFile = args[i];
      outputFile = outputFile.replace(/^\-o(\S+)$/, '$1');
    } else if (args[i] === '-o') { // -o <output>
      outputFile = args[++i];
    } else if (args[i].match(/^--(\w+)=(.*)/)) { // params for main()
      params[RegExp.$1] = RegExp.$2;
    } else if (args[i].match(/^--(\w+)$/)) { // params for main()
      params[RegExp.$1] = args[++i];
    } else if (args[i].match(/^--(\w+)$/)) { // params for main()
      params[RegExp.$1] = args[++i];
    } else if (args[i].match(/.+\.(jscad|js|scad|stl|amf|obj|gcode|svg|json)$/i)) {
      inputFile = args[i];
      inputFormat = RegExp.$1;
      if (!fs.statSync(inputFile).isFile()) {
        console.log('ERROR: cannot open file <' + inputFile + '>');
        process.exit(1);
      }
    } else if (args[i].match(/^-v$/)) { // show the version and the environment information
      env();
      console.log('OpenSCAD Compatibility (' + version + ')');
    } else {
      console.log('ERROR: invalid file name or argument <' + args[i] + '>');
      console.log("Type 'openjscad' for help");
      process.exit(1);
    }
  }
  // exit if a input file was not provided
  if (inputFile === null) { process.exit(1); }

  if (!outputFormat && !outputFile) {
    outputFormat = 'stla';
  }

  return {
    inputFile: inputFile,
    inputFormat: inputFormat,
    outputFile: outputFile,
    outputFormat: outputFormat,
  params: params}
}

function determineOutputNameAndFormat (outputFormat, outputFile) {
  if (!outputFormat && outputFile && outputFile.length && outputFile.match(/\.(jscad|js|stl|amf|dxf|svg)$/)) { // output filename set
    outputFormat = RegExp.$1;
  } else if (!outputFormat && outputFile && outputFile.length) { // output filename isn't valid
    console.log('ERROR: invalid output file <' + outputFile + '>');
    process.exit(1);
  } else if (outputFormat.match(/(jscad|js|stl|stla|stlb|amf|dxf|svg)/i)) { // output format defined?
    var ext = RegExp.$1;
    if (!outputFile) { // unless output filename not set, compose it
      ext = ext.replace(/stl[ab]/, 'stl'); // drop [ab] from stl
      outputFile = inputFile;
      outputFile = outputFile.replace(/\.([^\.]+)$/, '.' + ext); // compose output filename
    }
  } else {
    console.log(("ERROR: invalid output format <" + outputFormat));
    process.exit(1);
  }
  return {outputFormat: outputFormat, outputFile: outputFile}
}

function writeOutputDataToFile (outputFile, outputData) {
  fs.writeFile(outputFile, outputData.asBuffer(),
    function (err) {
      if (err) {
        console.log('err', err);
      } else {
        //console.log('success')
      }
    }
  );
}
//# sourceMappingURL=cli.js.map
