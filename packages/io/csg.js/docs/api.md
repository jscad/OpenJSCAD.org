## Classes

<dl>
<dt><a href="#CAG">CAG</a></dt>
<dd></dd>
<dt><a href="#CSG">CSG</a></dt>
<dd></dd>
<dt><a href="#Path2D">Path2D</a></dt>
<dd></dd>
<dt><a href="#Polygon">Polygon</a></dt>
<dd></dd>
<dt><a href="#Vector2D">Vector2D</a></dt>
<dd></dd>
<dt><a href="#Vector3D">Vector3D</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#defaultResolution2D">defaultResolution2D</a></dt>
<dd><p>Number of polygons per 360 degree revolution for 2D objects.</p>
</dd>
<dt><a href="#defaultResolution3D">defaultResolution3D</a></dt>
<dd><p>Number of polygons per 360 degree revolution for 3D objects.</p>
</dd>
<dt><a href="#EPS">EPS</a></dt>
<dd><p>Epsilon used during determination of near zero distances.</p>
</dd>
<dt><a href="#angleEPS">angleEPS</a></dt>
<dd><p>Epsilon used during determination of near zero areas.</p>
</dd>
<dt><a href="#areaEPS">areaEPS</a></dt>
<dd><p>Epsilon used during determination of near zero areas.
 This is the minimal area of a minimal polygon.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#fromObject">fromObject(obj)</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Reconstruct a CAG from an object with identical property names.</p>
</dd>
<dt><a href="#fromPointsNoCheck">fromPointsNoCheck(points)</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a CAG from a list of points (a polygon).
Like fromPoints() but does not check if the result is a valid polygon.
The points MUST rotate counter clockwise.
The points can define a convex or a concave polygon.
The polygon must not self intersect.</p>
</dd>
<dt><a href="#fromPath2">fromPath2(Path2)</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a CAG from a 2d-path (a closed sequence of points).
Like fromPoints() but does not check if the result is a valid polygon.</p>
</dd>
<dt><a href="#fromSlices">fromSlices(options)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct a CSG solid from a list of pre-generated slices.
See Polygon.prototype.solidFromSlices() for details.</p>
</dd>
<dt><a href="#fromObject">fromObject(obj)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Reconstruct a CSG solid from an object with identical property names.</p>
</dd>
<dt><a href="#fromCompactBinary">fromCompactBinary(bin)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Reconstruct a CSG from the output of toCompactBinary().</p>
</dd>
<dt><a href="#Line2D">Line2D(normal)</a> ⇒ <code><a href="#Line2D">Line2D</a></code></dt>
<dd><p>class Line2D
Represents a directional line in 2D space
A line is parametrized by its normal vector (perpendicular to the line, rotated 90 degrees counter clockwise)
and w. The line passes through the point <normal>.times(w).
Equation: p is on line if normal.dot(p)==w</p>
</dd>
<dt><a href="#circle">circle([options])</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a circle.</p>
</dd>
<dt><a href="#ellipse">ellipse([options])</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct an ellispe.</p>
</dd>
<dt><a href="#rectangle">rectangle([options])</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a rectangle.</p>
</dd>
<dt><a href="#roundedRectangle">roundedRectangle([options])</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a rounded rectangle.</p>
</dd>
<dt><a href="#cube">cube([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct an axis-aligned solid cuboid.</p>
</dd>
<dt><a href="#sphere">sphere([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct a solid sphere</p>
</dd>
<dt><a href="#cylinder">cylinder([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct a solid cylinder.</p>
</dd>
<dt><a href="#roundedCylinder">roundedCylinder([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct a cylinder with rounded ends.</p>
</dd>
<dt><a href="#cylinderElliptic">cylinderElliptic([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct an elliptic cylinder.</p>
</dd>
<dt><a href="#roundedCube">roundedCube([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct an axis-aligned solid rounded cuboid.</p>
</dd>
<dt><a href="#polyhedron">polyhedron([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Create a polyhedron using Openscad style arguments.
Define face vertices clockwise looking from outside.</p>
</dd>
</dl>

<a name="CAG"></a>

## CAG
**Kind**: global class  

* [CAG](#CAG)
    * [new CAG()](#new_CAG_new)
    * _instance_
        * [.toPoints()](#CAG+toPoints) ⇒ <code>Array.&lt;points&gt;</code>
        * [.rotateExtrude(options)](#CAG+rotateExtrude) ⇒ [<code>CSG</code>](#CSG)
        * [.toCompactBinary()](#CAG+toCompactBinary) ⇒ <code>CompactBinary</code>
    * _static_
        * [.fromSides(sides)](#CAG.fromSides) ⇒ [<code>CAG</code>](#CAG)
        * [.fromPoints(points)](#CAG.fromPoints) ⇒ [<code>CAG</code>](#CAG)
        * [.fromCompactBinary(bin)](#CAG.fromCompactBinary) ⇒ [<code>CAG</code>](#CAG)

<a name="new_CAG_new"></a>

### new CAG()
Class CAG
Holds a solid area geometry like CSG but 2D.
Each area consists of a number of sides.
Each side is a line between 2 points.

<a name="CAG+toPoints"></a>

### caG.toPoints() ⇒ <code>Array.&lt;points&gt;</code>
Convert to a list of points.

**Kind**: instance method of [<code>CAG</code>](#CAG)  
**Returns**: <code>Array.&lt;points&gt;</code> - list of points in 2D space  
<a name="CAG+rotateExtrude"></a>

### caG.rotateExtrude(options) ⇒ [<code>CSG</code>](#CSG)
Extrude to into a 3D solid by rotating the origin around the Y axis.
(and turning everything into XY plane)

**Kind**: instance method of [<code>CAG</code>](#CAG)  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for construction |
| [options.angle] | <code>Number</code> | <code>360</code> | angle of rotation |
| [options.resolution] | <code>Number</code> | <code>defaultResolution3D</code> | number of polygons per 360 degree revolution |

<a name="CAG+toCompactBinary"></a>

### caG.toCompactBinary() ⇒ <code>CompactBinary</code>
Convert to compact binary form.
See CAG.fromCompactBinary.

**Kind**: instance method of [<code>CAG</code>](#CAG)  
<a name="CAG.fromSides"></a>

### CAG.fromSides(sides) ⇒ [<code>CAG</code>](#CAG)
Construct a CAG from a list of `Side` instances.

**Kind**: static method of [<code>CAG</code>](#CAG)  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Description |
| --- | --- | --- |
| sides | <code>Array.&lt;Side&gt;</code> | list of sides |

<a name="CAG.fromPoints"></a>

### CAG.fromPoints(points) ⇒ [<code>CAG</code>](#CAG)
Construct a CAG from a list of points (a polygon).
The rotation direction of the points is not relevant.
The points can define a convex or a concave polygon.
The polygon must not self intersect.

**Kind**: static method of [<code>CAG</code>](#CAG)  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array.&lt;points&gt;</code> | list of points in 2D space |

<a name="CAG.fromCompactBinary"></a>

### CAG.fromCompactBinary(bin) ⇒ [<code>CAG</code>](#CAG)
Reconstruct a CAG from the output of toCompactBinary().

**Kind**: static method of [<code>CAG</code>](#CAG)  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Description |
| --- | --- | --- |
| bin | <code>CompactBinary</code> | see toCompactBinary() |

<a name="CSG"></a>

## CSG
**Kind**: global class  

* [CSG](#CSG)
    * [new CSG()](#new_CSG_new)
    * _instance_
        * [.toPolygons()](#CSG+toPolygons) ⇒ [<code>Array.&lt;Polygon&gt;</code>](#Polygon)
        * [.union(csg)](#CSG+union) ⇒ [<code>CSG</code>](#CSG)
        * [.subtract(csg)](#CSG+subtract) ⇒ [<code>CSG</code>](#CSG)
        * [.intersect(csg)](#CSG+intersect) ⇒ [<code>CSG</code>](#CSG)
        * [.invert()](#CSG+invert) ⇒ [<code>CSG</code>](#CSG)
        * [.transform(matrix4x4)](#CSG+transform) ⇒ [<code>CSG</code>](#CSG)
        * [.getBounds()](#CSG+getBounds) ⇒ [<code>Array.&lt;Vector3D&gt;</code>](#Vector3D)
        * [.getFeatures(features)](#CSG+getFeatures) ⇒ <code>Array.&lt;Float&gt;</code>
    * _static_
        * [.fromPolygons(polygons)](#CSG.fromPolygons) ⇒ [<code>CSG</code>](#CSG)

<a name="new_CSG_new"></a>

### new CSG()
Class CSG
Holds a binary space partition tree representing a 3D solid. Two solids can
be combined using the `union()`, `subtract()`, and `intersect()` methods.

<a name="CSG+toPolygons"></a>

### csG.toPolygons() ⇒ [<code>Array.&lt;Polygon&gt;</code>](#Polygon)
**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>Array.&lt;Polygon&gt;</code>](#Polygon) - The list of polygons.  
<a name="CSG+union"></a>

### csG.union(csg) ⇒ [<code>CSG</code>](#CSG)
Return a new CSG solid representing the space in either this solid or
in the given solids. Neither this solid nor the given solids are modified.

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  

| Param | Type | Description |
| --- | --- | --- |
| csg | [<code>Array.&lt;CSG&gt;</code>](#CSG) | list of CSG objects |

**Example**  
```js
let C = A.union(B)
```
**Example**  
```js
+-------+            +-------+
|       |            |       |
|   A   |            |       |
|    +--+----+   =   |       +----+
+----+--+    |       +----+       |
     |   B   |            |       |
     |       |            |       |
     +-------+            +-------+
```
<a name="CSG+subtract"></a>

### csG.subtract(csg) ⇒ [<code>CSG</code>](#CSG)
Return a new CSG solid representing space in this solid but
not in the given solids. Neither this solid nor the given solids are modified.

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  

| Param | Type | Description |
| --- | --- | --- |
| csg | [<code>Array.&lt;CSG&gt;</code>](#CSG) | list of CSG objects |

**Example**  
```js
let C = A.subtract(B)
```
**Example**  
```js
+-------+            +-------+
|       |            |       |
|   A   |            |       |
|    +--+----+   =   |    +--+
+----+--+    |       +----+
     |   B   |
     |       |
     +-------+
```
<a name="CSG+intersect"></a>

### csG.intersect(csg) ⇒ [<code>CSG</code>](#CSG)
Return a new CSG solid representing space in both this solid and
in the given solids. Neither this solid nor the given solids are modified.

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  

| Param | Type | Description |
| --- | --- | --- |
| csg | [<code>Array.&lt;CSG&gt;</code>](#CSG) | list of CSG objects |

**Example**  
```js
let C = A.intersect(B)
```
**Example**  
```js
+-------+
|       |
|   A   |
|    +--+----+   =   +--+
+----+--+    |       +--+
     |   B   |
     |       |
     +-------+
```
<a name="CSG+invert"></a>

### csG.invert() ⇒ [<code>CSG</code>](#CSG)
Return a new CSG solid with solid and empty space switched.
This solid is not modified.

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  
**Example**  
```js
let B = A.invert()
```
<a name="CSG+transform"></a>

### csG.transform(matrix4x4) ⇒ [<code>CSG</code>](#CSG)
Return a new CSG solid that is transformed using the given Matrix.
Several matrix transformations can be combined before transforming this solid.

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  

| Param | Type | Description |
| --- | --- | --- |
| matrix4x4 | <code>CSG.Matrix4x4</code> | matrix to be applied |

**Example**  
```js
var m = new CSG.Matrix4x4()
m = m.multiply(CSG.Matrix4x4.rotationX(40))
m = m.multiply(CSG.Matrix4x4.translation([-.5, 0, 0]))
let B = A.transform(m)
```
<a name="CSG+getBounds"></a>

### csG.getBounds() ⇒ [<code>Array.&lt;Vector3D&gt;</code>](#Vector3D)
Returns an array of Vector3D, providing minimum coordinates and maximum coordinates
of this solid.

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Example**  
```js
let bounds = A.getBounds()
let minX = bounds[0].x
```
<a name="CSG+getFeatures"></a>

### csG.getFeatures(features) ⇒ <code>Array.&lt;Float&gt;</code>
Returns an array of values for the requested features of this solid.
Supported Features: 'volume', 'area'

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: <code>Array.&lt;Float&gt;</code> - values  

| Param | Type | Description |
| --- | --- | --- |
| features | <code>Array.&lt;String&gt;</code> | list of features to calculate |

**Example**  
```js
let volume = A.getFeatures('volume')
let values = A.getFeatures('area','volume')
```
<a name="CSG.fromPolygons"></a>

### CSG.fromPolygons(polygons) ⇒ [<code>CSG</code>](#CSG)
Construct a CSG solid from a list of `Polygon` instances.

**Kind**: static method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  

| Param | Type | Description |
| --- | --- | --- |
| polygons | [<code>Array.&lt;Polygon&gt;</code>](#Polygon) | list of polygons |

<a name="Path2D"></a>

## Path2D
**Kind**: global class  

* [Path2D](#Path2D)
    * [new Path2D([points], [closed])](#new_Path2D_new)
    * _instance_
        * [.getPoints()](#Path2D+getPoints) ⇒ <code>Array.&lt;Vector2&gt;</code>
        * [.appendPoint(point)](#Path2D+appendPoint) ⇒ [<code>Path2D</code>](#Path2D)
        * [.appendPoints(points)](#Path2D+appendPoints) ⇒ [<code>Path2D</code>](#Path2D)
        * [.isClosed()](#Path2D+isClosed) ⇒ <code>Boolean</code>
        * [.appendBezier(controlpoints, [options])](#Path2D+appendBezier) ⇒ [<code>Path2D</code>](#Path2D)
        * [.appendArc(endpoint, [options])](#Path2D+appendArc) ⇒ [<code>Path2D</code>](#Path2D)
    * _static_
        * [.arc([options])](#Path2D.arc) ⇒ [<code>Path2D</code>](#Path2D)

<a name="new_Path2D_new"></a>

### new Path2D([points], [closed])
Class Path2D
Represents a series of points, connected by infinitely thin lines.
A path can be open or closed, i.e. additional line between first and last points. 
The difference between Path2D and CAG is that a path is a 'thin' line, whereas a CAG is an enclosed area.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [points] | [<code>Array.&lt;Vector2D&gt;</code>](#Vector2D) | <code>[]</code> | list of points |
| [closed] | <code>boolean</code> | <code>false</code> | closer of path |

**Example**  
```js
new CSG.Path2D()
new CSG.Path2D([[10,10], [-10,10], [-10,-10], [10,-10]], true) // closed
```
<a name="Path2D+getPoints"></a>

### path2D.getPoints() ⇒ <code>Array.&lt;Vector2&gt;</code>
Get the points that make up the path.
note that this is current internal list of points, not an immutable copy.

**Kind**: instance method of [<code>Path2D</code>](#Path2D)  
**Returns**: <code>Array.&lt;Vector2&gt;</code> - array of points the make up the path  
<a name="Path2D+appendPoint"></a>

### path2D.appendPoint(point) ⇒ [<code>Path2D</code>](#Path2D)
Append an point to the end of the path.

**Kind**: instance method of [<code>Path2D</code>](#Path2D)  
**Returns**: [<code>Path2D</code>](#Path2D) - new Path2D object (not closed)  

| Param | Type | Description |
| --- | --- | --- |
| point | [<code>Vector2D</code>](#Vector2D) | point to append |

<a name="Path2D+appendPoints"></a>

### path2D.appendPoints(points) ⇒ [<code>Path2D</code>](#Path2D)
Append a list of points to the end of the path.

**Kind**: instance method of [<code>Path2D</code>](#Path2D)  
**Returns**: [<code>Path2D</code>](#Path2D) - new Path2D object (not closed)  

| Param | Type | Description |
| --- | --- | --- |
| points | [<code>Array.&lt;Vector2D&gt;</code>](#Vector2D) | points to append |

<a name="Path2D+isClosed"></a>

### path2D.isClosed() ⇒ <code>Boolean</code>
Determine if the path is a closed or not.

**Kind**: instance method of [<code>Path2D</code>](#Path2D)  
**Returns**: <code>Boolean</code> - true when the path is closed, otherwise false  
<a name="Path2D+appendBezier"></a>

### path2D.appendBezier(controlpoints, [options]) ⇒ [<code>Path2D</code>](#Path2D)
Append a Bezier curve to the end of the path, using the control points to transition the curve through start and end points.
<br>
The Bézier curve starts at the last point in the path,
and ends at the last given control point. Other control points are intermediate control points.
<br>
The first control point may be null to ensure a smooth transition occurs. In this case,  
the second to last control point of the path is mirrored into the control points of the Bezier curve.
In other words, the trailing gradient of the path matches the new gradient of the curve.

**Kind**: instance method of [<code>Path2D</code>](#Path2D)  
**Returns**: [<code>Path2D</code>](#Path2D) - new Path2D object (not closed)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| controlpoints | [<code>Array.&lt;Vector2D&gt;</code>](#Vector2D) |  | list of control points |
| [options] | <code>Object</code> |  | options for construction |
| [options.resolution] | <code>Number</code> | <code>defaultResolution2D</code> | number of sides per 360 rotation |

**Example**  
```js
let p5 = new CSG.Path2D([[10,-20]],false);
p5 = p5.appendBezier([[10,-10],[25,-10],[25,-20]]);
p5 = p5.appendBezier([[25,-30],[40,-30],[40,-20]]);
```
<a name="Path2D+appendArc"></a>

### path2D.appendArc(endpoint, [options]) ⇒ [<code>Path2D</code>](#Path2D)
Append an arc to the end of the path.
This implementation follows the SVG arc specs. For the details see
http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands

**Kind**: instance method of [<code>Path2D</code>](#Path2D)  
**Returns**: [<code>Path2D</code>](#Path2D) - new Path2D object (not closed)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| endpoint | [<code>Vector2D</code>](#Vector2D) |  | end point of arc |
| [options] | <code>Object</code> |  | options for construction |
| [options.radius] | <code>Number</code> | <code>0</code> | radius of arc (X and Y), see also xradius and yradius |
| [options.xradius] | <code>Number</code> | <code>0</code> | X radius of arc, see also radius |
| [options.yradius] | <code>Number</code> | <code>0</code> | Y radius of arc, see also radius |
| [options.xaxisrotation] | <code>Number</code> | <code>0</code> | rotation (in degrees) of the X axis of the arc with respect to the X axis of the coordinate system |
| [options.resolution] | <code>Number</code> | <code>defaultResolution2D</code> | number of sides per 360 rotation |
| [options.clockwise] | <code>Boolean</code> | <code>false</code> | draw an arc clockwise with respect to the center point |
| [options.large] | <code>Boolean</code> | <code>false</code> | draw an arc longer than 180 degrees |

**Example**  
```js
let p1 = new CSG.Path2D([[27.5,-22.96875]],false);
p1 = p1.appendPoint([27.5,-3.28125]);
p1 = p1.appendArc([12.5,-22.96875],{xradius: 15,yradius: -19.6875,xaxisrotation: 0,clockwise: false,large: false});
p1 = p1.close();
```
<a name="Path2D.arc"></a>

### Path2D.arc([options]) ⇒ [<code>Path2D</code>](#Path2D)
Construct an arc.

**Kind**: static method of [<code>Path2D</code>](#Path2D)  
**Returns**: [<code>Path2D</code>](#Path2D) - new Path2D object (not closed)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | [<code>Vector2D</code>](#Vector2D) | <code>[0,0]</code> | center of circle |
| [options.radius] | <code>Number</code> | <code>1</code> | radius of circle |
| [options.startangle] | <code>Number</code> | <code>0</code> | starting angle of the arc, in degrees |
| [options.endangle] | <code>Number</code> | <code>360</code> | ending angle of the arc, in degrees |
| [options.resolution] | <code>Number</code> | <code>defaultResolution2D</code> | number of sides per 360 rotation |
| [options.maketangent] | <code>Boolean</code> | <code>false</code> | adds line segments at both ends of the arc to ensure that the gradients at the edges are tangent |

**Example**  
```js
let path = CSG.Path2D.arc({
  center: [5, 5],
  radius: 10,
  startangle: 90,
  endangle: 180,
  resolution: 36,
  maketangent: true
});
```
<a name="Polygon"></a>

## Polygon
**Kind**: global class  

* [Polygon](#Polygon)
    * [new Polygon(vertices, [shared], [plane])](#new_Polygon_new)
    * _instance_
        * [.checkIfConvex()](#Polygon+checkIfConvex) ⇒ <code>boolean</code>
        * [.solidFromSlices(options)](#Polygon+solidFromSlices)
        * [._addWalls(walls, bottom, top)](#Polygon+_addWalls)
    * _static_
        * [.Shared](#Polygon.Shared)
            * [new Polygon.Shared(color)](#new_Polygon.Shared_new)
            * [.fromColor(r, g, b, [a], [color])](#Polygon.Shared.fromColor)
        * [.createFromPoints(points, [shared], [plane])](#Polygon.createFromPoints)

<a name="new_Polygon_new"></a>

### new Polygon(vertices, [shared], [plane])
Class Polygon
Represents a convex polygon. The vertices used to initialize a polygon must
  be coplanar and form a convex loop. They do not have to be `Vertex`
  instances but they must behave similarly (duck typing can be used for
  customization).
<br>
Each convex polygon has a `shared` property, which is shared between all
  polygons that are clones of each other or were split from the same polygon.
  This can be used to define per-polygon properties (such as surface color).
<br>
The plane of the polygon is calculated from the vertex coordinates if not provided.
  The plane can alternatively be passed as the third argument to avoid calculations.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| vertices | <code>Array.&lt;Vertex&gt;</code> |  | list of vertices |
| [shared] | [<code>Shared</code>](#Polygon.Shared) | <code>defaultShared</code> | shared property to apply |
| [plane] | <code>Plane</code> |  | plane of the polygon |

**Example**  
```js
const vertices = [
  new CSG.Vertex(new CSG.Vector3D([0, 0, 0])),
  new CSG.Vertex(new CSG.Vector3D([0, 10, 0])),
  new CSG.Vertex(new CSG.Vector3D([0, 10, 10]))
]
let observed = new Polygon(vertices)
```
<a name="Polygon+checkIfConvex"></a>

### polygon.checkIfConvex() ⇒ <code>boolean</code>
Check whether the polygon is convex. (it should be, otherwise we will get unexpected results)

**Kind**: instance method of [<code>Polygon</code>](#Polygon)  
<a name="Polygon+solidFromSlices"></a>

### polygon.solidFromSlices(options)
Creates solid from slices (Polygon) by generating walls

**Kind**: instance method of [<code>Polygon</code>](#Polygon)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Solid generating options  - numslices {Number} Number of slices to be generated  - callback(t, slice) {Function} Callback function generating slices.          arguments: t = [0..1], slice = [0..numslices - 1]          return: Polygon or null to skip  - loop {Boolean} no flats, only walls, it's used to generate solids like a tor |

<a name="Polygon+_addWalls"></a>

### polygon._addWalls(walls, bottom, top)
**Kind**: instance method of [<code>Polygon</code>](#Polygon)  

| Param | Description |
| --- | --- |
| walls | Array of wall polygons |
| bottom | Bottom polygon |
| top | Top polygon |

<a name="Polygon.Shared"></a>

### Polygon.Shared
**Kind**: static class of [<code>Polygon</code>](#Polygon)  

* [.Shared](#Polygon.Shared)
    * [new Polygon.Shared(color)](#new_Polygon.Shared_new)
    * [.fromColor(r, g, b, [a], [color])](#Polygon.Shared.fromColor)

<a name="new_Polygon.Shared_new"></a>

#### new Polygon.Shared(color)
Class Polygon.Shared
Holds the shared properties for each polygon (Currently only color).


| Param | Type | Description |
| --- | --- | --- |
| color | <code>Array.&lt;Array&gt;</code> | array containing RGBA values, or null |

**Example**  
```js
let shared = new CSG.Polygon.Shared([0, 0, 0, 1])
```
<a name="Polygon.Shared.fromColor"></a>

#### Shared.fromColor(r, g, b, [a], [color])
Create Polygon.Shared from color values.

**Kind**: static method of [<code>Shared</code>](#Polygon.Shared)  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>number</code> | value of RED component |
| g | <code>number</code> | value of GREEN component |
| b | <code>number</code> | value of BLUE component |
| [a] | <code>number</code> | value of ALPHA component |
| [color] | <code>Array.&lt;Array&gt;</code> | OR array containing RGB values (optional Alpha) |

**Example**  
```js
let s1 = Polygon.Shared.fromColor(0,0,0)
let s2 = Polygon.Shared.fromColor([0,0,0,1])
```
<a name="Polygon.createFromPoints"></a>

### Polygon.createFromPoints(points, [shared], [plane])
Create a polygon from the given points.

**Kind**: static method of [<code>Polygon</code>](#Polygon)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| points | <code>Array.&lt;Array&gt;</code> |  | list of points |
| [shared] | [<code>Shared</code>](#Polygon.Shared) | <code>defaultShared</code> | shared property to apply |
| [plane] | <code>Plane</code> |  | plane of the polygon |

**Example**  
```js
const points = [
  [0,  0, 0],
  [0, 10, 0],
  [0, 10, 10]
]
let observed = CSG.Polygon.createFromPoints(points)
```
<a name="Vector2D"></a>

## Vector2D
**Kind**: global class  
<a name="new_Vector2D_new"></a>

### new Vector2D()
Class Vector2D
Represents a 2D vector with X, Y coordinates

**Example**  
```js
new CSG.Vector2D(1, 2);
new CSG.Vector3D([1, 2]);
new CSG.Vector3D({ x: 1, y: 2});
```
<a name="Vector3D"></a>

## Vector3D
**Kind**: global class  
<a name="new_Vector3D_new"></a>

### new Vector3D()
Class Vector3D
Represents a 3D vector with X, Y, Z coordinates.

**Example**  
```js
new CSG.Vector3D(1, 2, 3);
new CSG.Vector3D([1, 2, 3]);
new CSG.Vector3D({ x: 1, y: 2, z: 3 });
new CSG.Vector3D(1, 2); // assumes z=0
new CSG.Vector3D([1, 2]); // assumes z=0
```
<a name="defaultResolution2D"></a>

## defaultResolution2D
Number of polygons per 360 degree revolution for 2D objects.

**Kind**: global constant  
**Default**: <code>32</code>  
<a name="defaultResolution3D"></a>

## defaultResolution3D
Number of polygons per 360 degree revolution for 3D objects.

**Kind**: global constant  
**Default**: <code>12</code>  
<a name="EPS"></a>

## EPS
Epsilon used during determination of near zero distances.

**Kind**: global constant  
**Default**: <code>0.00001</code>  
<a name="angleEPS"></a>

## angleEPS
Epsilon used during determination of near zero areas.

**Kind**: global constant  
**Default**: <code>0.1</code>  
<a name="areaEPS"></a>

## areaEPS
Epsilon used during determination of near zero areas.
 This is the minimal area of a minimal polygon.

**Kind**: global constant  
<a name="fromObject"></a>

## fromObject(obj) ⇒ [<code>CAG</code>](#CAG)
Reconstruct a CAG from an object with identical property names.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | anonymous object, typically from JSON |

<a name="fromPointsNoCheck"></a>

## fromPointsNoCheck(points) ⇒ [<code>CAG</code>](#CAG)
Construct a CAG from a list of points (a polygon).
Like fromPoints() but does not check if the result is a valid polygon.
The points MUST rotate counter clockwise.
The points can define a convex or a concave polygon.
The polygon must not self intersect.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array.&lt;points&gt;</code> | list of points in 2D space |

<a name="fromPath2"></a>

## fromPath2(Path2) ⇒ [<code>CAG</code>](#CAG)
Construct a CAG from a 2d-path (a closed sequence of points).
Like fromPoints() but does not check if the result is a valid polygon.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Description |
| --- | --- | --- |
| Path2 | <code>path</code> | a Path2 path |

<a name="fromSlices"></a>

## fromSlices(options) ⇒ [<code>CSG</code>](#CSG)
Construct a CSG solid from a list of pre-generated slices.
See Polygon.prototype.solidFromSlices() for details.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options passed to solidFromSlices() |

<a name="fromObject"></a>

## fromObject(obj) ⇒ [<code>CSG</code>](#CSG)
Reconstruct a CSG solid from an object with identical property names.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | anonymous object, typically from JSON |

<a name="fromCompactBinary"></a>

## fromCompactBinary(bin) ⇒ [<code>CSG</code>](#CSG)
Reconstruct a CSG from the output of toCompactBinary().

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  

| Param | Type | Description |
| --- | --- | --- |
| bin | <code>CompactBinary</code> | see toCompactBinary(). |

<a name="Line2D"></a>

## Line2D(normal) ⇒ [<code>Line2D</code>](#Line2D)
class Line2D
Represents a directional line in 2D space
A line is parametrized by its normal vector (perpendicular to the line, rotated 90 degrees counter clockwise)
and w. The line passes through the point <normal>.times(w).
Equation: p is on line if normal.dot(p)==w

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| normal | [<code>Vector2D</code>](#Vector2D) | normal must be a unit vector! |

<a name="circle"></a>

## circle([options]) ⇒ [<code>CAG</code>](#CAG)
Construct a circle.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | [<code>Vector2D</code>](#Vector2D) | <code>[0,0]</code> | center of circle |
| [options.radius] | <code>Number</code> | <code>1</code> | radius of circle |
| [options.resolution] | <code>Number</code> | <code>defaultResolution2D</code> | number of sides per 360 rotation |

<a name="ellipse"></a>

## ellipse([options]) ⇒ [<code>CAG</code>](#CAG)
Construct an ellispe.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | [<code>Vector2D</code>](#Vector2D) | <code>[0,0]</code> | center of ellipse |
| [options.radius] | [<code>Vector2D</code>](#Vector2D) | <code>[1,1]</code> | radius of ellipse, width and height |
| [options.resolution] | <code>Number</code> | <code>defaultResolution2D</code> | number of sides per 360 rotation |

<a name="rectangle"></a>

## rectangle([options]) ⇒ [<code>CAG</code>](#CAG)
Construct a rectangle.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | [<code>Vector2D</code>](#Vector2D) | <code>[0,0]</code> | center of rectangle |
| [options.radius] | [<code>Vector2D</code>](#Vector2D) | <code>[1,1]</code> | radius of rectangle, width and height |
| [options.corner1] | [<code>Vector2D</code>](#Vector2D) | <code>[0,0]</code> | bottom left corner of rectangle (alternate) |
| [options.corner2] | [<code>Vector2D</code>](#Vector2D) | <code>[0,0]</code> | upper right corner of rectangle (alternate) |

<a name="roundedRectangle"></a>

## roundedRectangle([options]) ⇒ [<code>CAG</code>](#CAG)
Construct a rounded rectangle.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | [<code>Vector2D</code>](#Vector2D) | <code>[0,0]</code> | center of rounded rectangle |
| [options.radius] | [<code>Vector2D</code>](#Vector2D) | <code>[1,1]</code> | radius of rounded rectangle, width and height |
| [options.corner1] | [<code>Vector2D</code>](#Vector2D) | <code>[0,0]</code> | bottom left corner of rounded rectangle (alternate) |
| [options.corner2] | [<code>Vector2D</code>](#Vector2D) | <code>[0,0]</code> | upper right corner of rounded rectangle (alternate) |
| [options.roundradius] | <code>Number</code> | <code>0.2</code> | round radius of corners |
| [options.resolution] | <code>Number</code> | <code>defaultResolution2D</code> | number of sides per 360 rotation |

**Example**  
```js
let r = roundedRectangle({
  center: [0, 0],
  radius: [5, 10],
  roundradius: 2,
  resolution: 36,
});
```
<a name="cube"></a>

## cube([options]) ⇒ [<code>CSG</code>](#CSG)
Construct an axis-aligned solid cuboid.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | [<code>Vector3D</code>](#Vector3D) | <code>[0,0,0]</code> | center of cube |
| [options.radius] | [<code>Vector3D</code>](#Vector3D) | <code>[1,1,1]</code> | radius of cube, single scalar also possible |

**Example**  
```js
let cube = CSG.cube({
  center: [5, 5, 5],
  radius: 5, // scalar radius
});
```
<a name="sphere"></a>

## sphere([options]) ⇒ [<code>CSG</code>](#CSG)
Construct a solid sphere

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | [<code>Vector3D</code>](#Vector3D) | <code>[0,0,0]</code> | center of sphere |
| [options.radius] | <code>Number</code> | <code>1</code> | radius of sphere |
| [options.resolution] | <code>Number</code> | <code>defaultResolution3D</code> | number of polygons per 360 degree revolution |
| [options.axes] | <code>Array</code> |  | an array with 3 vectors for the x, y and z base vectors |

**Example**  
```js
let sphere = CSG.sphere({
  center: [0, 0, 0],
  radius: 2,
  resolution: 32,
});
```
<a name="cylinder"></a>

## cylinder([options]) ⇒ [<code>CSG</code>](#CSG)
Construct a solid cylinder.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.start] | <code>Vector</code> | <code>[0,-1,0]</code> | start point of cylinder |
| [options.end] | <code>Vector</code> | <code>[0,1,0]</code> | end point of cylinder |
| [options.radius] | <code>Number</code> | <code>1</code> | radius of cylinder, must be scalar |
| [options.resolution] | <code>Number</code> | <code>defaultResolution3D</code> | number of polygons per 360 degree revolution |

**Example**  
```js
let cylinder = CSG.cylinder({
  start: [0, -10, 0],
  end: [0, 10, 0],
  radius: 10,
  resolution: 16
});
```
<a name="roundedCylinder"></a>

## roundedCylinder([options]) ⇒ [<code>CSG</code>](#CSG)
Construct a cylinder with rounded ends.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.start] | [<code>Vector3D</code>](#Vector3D) | <code>[0,-1,0]</code> | start point of cylinder |
| [options.end] | [<code>Vector3D</code>](#Vector3D) | <code>[0,1,0]</code> | end point of cylinder |
| [options.radius] | <code>Number</code> | <code>1</code> | radius of rounded ends, must be scalar |
| [options.normal] | [<code>Vector3D</code>](#Vector3D) |  | vector determining the starting angle for tesselation. Should be non-parallel to start.minus(end) |
| [options.resolution] | <code>Number</code> | <code>defaultResolution3D</code> | number of polygons per 360 degree revolution |

**Example**  
```js
let cylinder = CSG.roundedCylinder({
  start: [0, -10, 0],
  end: [0, 10, 0],
  radius: 2,
  resolution: 16
});
```
<a name="cylinderElliptic"></a>

## cylinderElliptic([options]) ⇒ [<code>CSG</code>](#CSG)
Construct an elliptic cylinder.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.start] | [<code>Vector3D</code>](#Vector3D) | <code>[0,-1,0]</code> | start point of cylinder |
| [options.end] | [<code>Vector3D</code>](#Vector3D) | <code>[0,1,0]</code> | end point of cylinder |
| [options.radius] | [<code>Vector2D</code>](#Vector2D) | <code>[1,1]</code> | radius of rounded ends, must be two dimensional array |
| [options.radiusStart] | [<code>Vector2D</code>](#Vector2D) | <code>[1,1]</code> | OPTIONAL radius of rounded start, must be two dimensional array |
| [options.radiusEnd] | [<code>Vector2D</code>](#Vector2D) | <code>[1,1]</code> | OPTIONAL radius of rounded end, must be two dimensional array |
| [options.resolution] | <code>Number</code> | <code>defaultResolution2D</code> | number of polygons per 360 degree revolution |

**Example**  
```js
let cylinder = CSG.cylinderElliptic({
      start: [0, -10, 0],
      end: [0, 10, 0],
      radiusStart: [10,5],
      radiusEnd: [8,3],
      resolution: 16
    });
```
<a name="roundedCube"></a>

## roundedCube([options]) ⇒ [<code>CSG</code>](#CSG)
Construct an axis-aligned solid rounded cuboid.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | [<code>Vector3D</code>](#Vector3D) | <code>[0,0,0]</code> | center of rounded cube |
| [options.radius] | [<code>Vector3D</code>](#Vector3D) | <code>[1,1,1]</code> | radius of rounded cube, single scalar is possible |
| [options.roundradius] | <code>Number</code> | <code>0.2</code> | radius of rounded edges |
| [options.resolution] | <code>Number</code> | <code>defaultResolution3D</code> | number of polygons per 360 degree revolution |

**Example**  
```js
let cube = CSG.roundedCube({
  center: [2, 0, 2],
  radius: 15,
  roundradius: 2,
  resolution: 36,
});
```
<a name="polyhedron"></a>

## polyhedron([options]) ⇒ [<code>CSG</code>](#CSG)
Create a polyhedron using Openscad style arguments.
Define face vertices clockwise looking from outside.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | options for construction |

