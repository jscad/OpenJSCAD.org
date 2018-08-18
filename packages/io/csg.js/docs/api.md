## Classes

<dl>
<dt><a href="#CAG">CAG</a></dt>
<dd></dd>
<dt><a href="#CSG">CSG</a></dt>
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
<dt><a href="#center">center([options], objects)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Centers the given object(s) using the given options (if any)</p>
</dd>
<dt><a href="#clone">clone(obj)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>clone the given object</p>
</dd>
<dt><a href="#css2rgb">css2rgb(String)</a> ⇒</dt>
<dd><p>Converts an CSS color name to RGB color.</p>
</dd>
<dt><a href="#color">color(color, objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>apply the given color to the input object(s)</p>
</dd>
<dt><a href="#rgb2hsl">rgb2hsl(Number, Number, Number)</a> ⇒</dt>
<dd><p>Converts an RGB color value to HSL. Conversion formula
adapted from <a href="http://en.wikipedia.org/wiki/HSL_color_space">http://en.wikipedia.org/wiki/HSL_color_space</a>.
Assumes r, g, and b are contained in the set [0, 1] and
returns h, s, and l in the set [0, 1].</p>
</dd>
<dt><a href="#hsl2rgb">hsl2rgb(Number, Number, Number)</a> ⇒</dt>
<dd><p>Converts an HSL color value to RGB. Conversion formula
adapted from <a href="http://en.wikipedia.org/wiki/HSL_color_space">http://en.wikipedia.org/wiki/HSL_color_space</a>.
Assumes h, s, and l are contained in the set [0, 1] and
returns r, g, and b in the set [0, 1].</p>
</dd>
<dt><a href="#rgb2hsv">rgb2hsv(Number, Number, Number)</a> ⇒</dt>
<dd><p>Converts an RGB color value to HSV. Conversion formula
adapted from <a href="http://en.wikipedia.org/wiki/HSV_color_space">http://en.wikipedia.org/wiki/HSV_color_space</a>.
Assumes r, g, and b are contained in the set [0, 1] and
returns h, s, and v in the set [0, 1].</p>
</dd>
<dt><a href="#hsv2rgb">hsv2rgb(Number, Number, Number)</a> ⇒</dt>
<dd><p>Converts an HSV color value to RGB. Conversion formula
adapted from <a href="http://en.wikipedia.org/wiki/HSV_color_space">http://en.wikipedia.org/wiki/HSV_color_space</a>.
Assumes h, s, and v are contained in the set [0, 1] and
returns r, g, and b in the set [0, 1].</p>
</dd>
<dt><a href="#html2rgb">html2rgb()</a></dt>
<dd><p>Converts a HTML5 color value (string) to RGB values
See the color input type of HTML5 forms
Conversion formula:</p>
<ul>
<li>split the string; &quot;#RRGGBB&quot; into RGB components</li>
<li>convert the HEX value into RGB values</li>
</ul>
</dd>
<dt><a href="#rgb2html">rgb2html()</a></dt>
<dd><p>Converts RGB color value to HTML5 color value (string)
Conversion forumla:</p>
<ul>
<li>convert R, G, B into HEX strings</li>
<li>return HTML formatted string &quot;#RRGGBB&quot;</li>
</ul>
</dd>
<dt><a href="#union">union(objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>union/ combine the given shapes</p>
</dd>
<dt><a href="#difference">difference(objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>difference/ subtraction of the given shapes ie:
cut out C From B From A ie : a - b - c etc</p>
</dd>
<dt><a href="#intersection">intersection(objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>intersection of the given shapes: ie keep only the common parts between the given shapes</p>
</dd>
<dt><a href="#overCutInsideCorners">overCutInsideCorners(_cag, cutterradius)</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>cag = cag.overCutInsideCorners(cutterradius);
Using a CNC router it&#39;s impossible to cut out a true sharp inside corner. The inside corner
will be rounded due to the radius of the cutter. This function compensates for this by creating
an extra cutout at each inner corner so that the actual cut out shape will be at least as large
as needed.</p>
</dd>
<dt><a href="#sectionCut">sectionCut(csg, orthobasis)</a></dt>
<dd><p>cuts a csg along a orthobasis</p>
</dd>
<dt><a href="#cutByPlane">cutByPlane(plane)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Cut the solid by a plane. Returns the solid on the back side of the plane</p>
</dd>
<dt><a href="#expandedShellOfCCSG">expandedShellOfCCSG(radius, resolution, unionWithThis)</a></dt>
<dd><p>Create the expanded shell of the solid:
All faces are extruded to get a thickness of 2*radius
Cylinders are constructed around every side
Spheres are placed on every vertex
unionWithThis: if true, the resulting solid will be united with &#39;this&#39; solid;
the result is a true expansion of the solid
If false, returns only the shell</p>
</dd>
<dt><a href="#extrudeInOrthonormalBasis">extrudeInOrthonormalBasis(cag, orthonormalbasis, depth, [options])</a></dt>
<dd><p>extrude the CAG in a certain plane.
Giving just a plane is not enough, multiple different extrusions in the same plane would be possible
by rotating around the plane&#39;s origin. An additional right-hand vector should be specified as well,
and this is exactly a OrthoNormalBasis.</p>
</dd>
<dt><a href="#extrudeInPlane">extrudeInPlane(cag, axis1, axis2, depth, [options])</a></dt>
<dd><p>Extrude in a standard cartesian plane, specified by two axis identifiers. Each identifier can be
one of [&quot;X&quot;,&quot;Y&quot;,&quot;Z&quot;,&quot;-X&quot;,&quot;-Y&quot;,&quot;-Z&quot;]
The 2d x axis will map to the first given 3D axis, the 2d y axis will map to the second.
See OrthoNormalBasis.GetCartesian for details.</p>
</dd>
<dt><a href="#extrude">extrude(cag, [options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>linear extrusion of 2D shape, with optional twist</p>
</dd>
<dt><a href="#rotateExtrude">rotateExtrude(options)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Extrude to into a 3D solid by rotating the origin around the Y axis.
(and turning everything into XY plane)</p>
</dd>
<dt><a href="#linear_extrude">linear_extrude([options], baseShape)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>linear extrusion of the input 2d shape</p>
</dd>
<dt><a href="#rotate_extrude">rotate_extrude([options], baseShape)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>rotate extrusion / revolve of the given 2d shape</p>
</dd>
<dt><a href="#rectangular_extrude">rectangular_extrude(basePoints, [options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>rectangular extrusion of the given array of points</p>
</dd>
<dt><a href="#translate">translate(vector, ...objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>translate an object in 2D/3D space</p>
</dd>
<dt><a href="#scale">scale(scale, ...objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>scale an object in 2D/3D space</p>
</dd>
<dt><a href="#rotate">rotate(rotation, objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>rotate an object in 2D/3D space</p>
</dd>
<dt><a href="#transform">transform(matrix, ...objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>apply the given matrix transform to the given objects</p>
</dd>
<dt><a href="#center">center(axes, ...object)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Center the given object(s) about the given axes</p>
</dd>
<dt><a href="#mirror">mirror(vector, ...objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>mirror an object in 2D/3D space</p>
</dd>
<dt><a href="#expand">expand(radius, object)</a> ⇒ <code>CSG/CAG</code></dt>
<dd><p>expand an object in 2D/3D space</p>
</dd>
<dt><a href="#contract">contract(radius, object)</a> ⇒ <code>CSG/CAG</code></dt>
<dd><p>contract an object(s) in 2D/3D space</p>
</dd>
<dt><a href="#minkowski">minkowski(objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>create a minkowski sum of the given shapes</p>
</dd>
<dt><a href="#hull">hull(objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>create a convex hull of the given shapes</p>
</dd>
<dt><a href="#chain_hull">chain_hull(objects)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>create a chain hull of the given shapes
Originally &quot;Whosa whatsis&quot; suggested &quot;Chain Hull&quot; ,
as described at <a href="https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN">https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN</a>
essentially hull A+B, B+C, C+D and then union those</p>
</dd>
<dt><a href="#square">square([options])</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a square/rectangle</p>
</dd>
<dt><a href="#circle">circle([options])</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a circle</p>
</dd>
<dt><a href="#polygon">polygon([options])</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a polygon either from arrays of paths and points,
or just arrays of points nested paths (multiple paths) and flat paths are supported</p>
</dd>
<dt><a href="#triangle">triangle()</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a triangle</p>
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
<dd><p>Construct a cuboid</p>
</dd>
<dt><a href="#sphere">sphere([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct a sphere</p>
</dd>
<dt><a href="#cylinder">cylinder([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct a cylinder</p>
</dd>
<dt><a href="#torus">torus([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct a torus</p>
</dd>
<dt><a href="#polyhedron">polyhedron([options])</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct a polyhedron from the given triangles/ polygons/points</p>
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
<dt><a href="#solidFromSlices">solidFromSlices(options)</a></dt>
<dd><p>Creates solid from slices (Polygon) by generating walls</p>
</dd>
<dt><a href="#_addWalls">_addWalls(walls, bottom, top)</a></dt>
<dd></dd>
<dt><a href="#vectorChar">vectorChar([options], [char])</a> ⇒ <code><a href="#VectorCharObject">VectorCharObject</a></code></dt>
<dd><p>Construct a <a href="#VectorCharObject">VectorCharObject</a> from a ascii character whose code is between 31 and 127,
if the character is not supported it is replaced by a question mark.</p>
</dd>
<dt><a href="#vectorText">vectorText([options], [text])</a> ⇒ <code>Array</code></dt>
<dd><p>Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
if one character is not supported it is replaced by a question mark.</p>
</dd>
<dt><del><a href="#vector_char">vector_char(x, y, char)</a> ⇒ <code><a href="#VectorCharObject">VectorCharObject</a></code></del></dt>
<dd><p>Construct a <a href="#VectorCharObject">VectorCharObject</a> from a ascii character whose code is between 31 and 127,
if the character is not supported it is replaced by a question mark.</p>
</dd>
<dt><del><a href="#vector_text">vector_text(x, y, text)</a> ⇒ <code>Array</code></del></dt>
<dd><p>Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
if one character is not supported it is replaced by a question mark.</p>
</dd>
<dt><a href="#fromSides">fromSides(sides)</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a CAG from a list of <code>Side</code> instances.</p>
</dd>
<dt><a href="#fromPoints">fromPoints(points)</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Construct a CAG from a list of points (a polygon) or an nested array of points.
The rotation direction of the points is not relevant.
The points can define a convex or a concave polygon.
The polygon must not self intersect.
Hole detection follows the even/odd rule,
which means that the order of the paths is not important.</p>
</dd>
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
<dt><a href="#fromCompactBinary">fromCompactBinary(bin)</a> ⇒ <code><a href="#CAG">CAG</a></code></dt>
<dd><p>Reconstruct a CAG from the output of toCompactBinary().</p>
</dd>
<dt><a href="#fromPolygons">fromPolygons(polygons)</a> ⇒ <code><a href="#CSG">CSG</a></code></dt>
<dd><p>Construct a CSG solid from a list of <code>Polygon</code> instances.</p>
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
</dl>

## Typedefs

<dl>
<dt><a href="#VectorCharObject">VectorCharObject</a> : <code>Object</code></dt>
<dd><p>Represents a character as segments</p>
</dd>
</dl>

<a name="CAG"></a>

## CAG
**Kind**: global class  

* [CAG](#CAG)
    * [new CAG()](#new_CAG_new)
    * [.toPoints()](#CAG+toPoints) ⇒ <code>Array.&lt;points&gt;</code>
    * [.toCompactBinary()](#CAG+toCompactBinary) ⇒ <code>CompactBinary</code>

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
<a name="CAG+toCompactBinary"></a>

### caG.toCompactBinary() ⇒ <code>CompactBinary</code>
Convert to compact binary form.
See fromCompactBinary.

**Kind**: instance method of [<code>CAG</code>](#CAG)  
<a name="CSG"></a>

## CSG
**Kind**: global class  

* [CSG](#CSG)
    * [new CSG()](#new_CSG_new)
    * [.union(csg)](#CSG+union) ⇒ [<code>CSG</code>](#CSG)
    * [.subtract(csg)](#CSG+subtract) ⇒ [<code>CSG</code>](#CSG)
    * [.intersect(csg)](#CSG+intersect) ⇒ [<code>CSG</code>](#CSG)
    * [.invert()](#CSG+invert) ⇒ [<code>CSG</code>](#CSG)
    * [.transform(matrix4x4)](#CSG+transform) ⇒ [<code>CSG</code>](#CSG)
    * [.mayOverlap(csg)](#CSG+mayOverlap)
    * [.connectTo(myConnector, otherConnector, mirror, normalrotation)](#CSG+connectTo) ⇒ [<code>CSG</code>](#CSG)
    * [.setShared(shared)](#CSG+setShared) ⇒ [<code>CSG</code>](#CSG)
    * [.setColor(args)](#CSG+setColor) ⇒ [<code>CSG</code>](#CSG)
    * [.getFeatures(features)](#CSG+getFeatures) ⇒ <code>Array.&lt;Float&gt;</code>
    * [.toPolygons()](#CSG+toPolygons) ⇒ <code>Array.&lt;Polygon&gt;</code>
    * [.toCompactBinary()](#CSG+toCompactBinary) ⇒ <code>Object</code>
    * [.toTriangles()](#CSG+toTriangles) ⇒ <code>Polygons</code>

<a name="new_CSG_new"></a>

### new CSG()
Class CSG
Holds a binary space partition tree representing a 3D solid. Two solids can
be combined using the `union()`, `subtract()`, and `intersect()` methods.

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
<a name="CSG+mayOverlap"></a>

### csG.mayOverlap(csg)
returns true if there is a possibility that the two solids overlap
returns false if we can be sure that they do not overlap
NOTE: this is critical as it is used in UNIONs

**Kind**: instance method of [<code>CSG</code>](#CSG)  

| Param | Type |
| --- | --- |
| csg | [<code>CSG</code>](#CSG) | 

<a name="CSG+connectTo"></a>

### csG.connectTo(myConnector, otherConnector, mirror, normalrotation) ⇒ [<code>CSG</code>](#CSG)
Connect a solid to another solid, such that two Connectors become connected

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>CSG</code>](#CSG) - this csg, tranformed accordingly  

| Param | Type | Description |
| --- | --- | --- |
| myConnector | <code>Connector</code> | a Connector of this solid |
| otherConnector | <code>Connector</code> | a Connector to which myConnector should be connected |
| mirror | <code>Boolean</code> | false: the 'axis' vectors of the connectors should point in the same direction true: the 'axis' vectors of the connectors should point in opposite direction |
| normalrotation | <code>Float</code> | degrees of rotation between the 'normal' vectors of the two connectors |

<a name="CSG+setShared"></a>

### csG.setShared(shared) ⇒ [<code>CSG</code>](#CSG)
set the .shared property of all polygons

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>CSG</code>](#CSG) - Returns a new CSG solid, the original is unmodified!  

| Param | Type |
| --- | --- |
| shared | <code>Object</code> | 

<a name="CSG+setColor"></a>

### csG.setColor(args) ⇒ [<code>CSG</code>](#CSG)
sets the color of this csg: non mutating, returns a new CSG

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: [<code>CSG</code>](#CSG) - a copy of this CSG, with the given color  

| Param | Type |
| --- | --- |
| args | <code>Object</code> | 

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
<a name="CSG+toPolygons"></a>

### csG.toPolygons() ⇒ <code>Array.&lt;Polygon&gt;</code>
**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: <code>Array.&lt;Polygon&gt;</code> - The list of polygons.  
<a name="CSG+toCompactBinary"></a>

### csG.toCompactBinary() ⇒ <code>Object</code>
returns a compact binary representation of this csg
usually used to transfer CSG objects to/from webworkes
NOTE: very interesting compact format, with a lot of reusable ideas

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: <code>Object</code> - compact binary representation of a CSG  
<a name="CSG+toTriangles"></a>

### csG.toTriangles() ⇒ <code>Polygons</code>
returns the triangles of this csg

**Kind**: instance method of [<code>CSG</code>](#CSG)  
**Returns**: <code>Polygons</code> - triangulated polygons  
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
<a name="center"></a>

## center([options], objects) ⇒ <code>Object</code> \| <code>Array</code>
Centers the given object(s) using the given options (if any)

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - objects  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for centering |
| [options.axes] | <code>Array</code> | <code>[true,true,true]</code> | axis of which to center, true or false |
| [options.center] | <code>Array</code> | <code>[0,0,0]</code> | point of which to center the object upon |
| objects | <code>Object</code> \| <code>Array</code> |  | the shape(s) to center |

**Example**  
```js
let csg = center({axes: [true,false,false]}, sphere()) // center about the X axis
```
<a name="clone"></a>

## clone(obj) ⇒ [<code>CSG</code>](#CSG)
clone the given object

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , a copy of the input  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | the object to clone by |

**Example**  
```js
let copy = clone(sphere())
```
<a name="css2rgb"></a>

## css2rgb(String) ⇒
Converts an CSS color name to RGB color.

**Kind**: global function  
**Returns**: Array           The RGB representation, or [0,0,0] default  

| Param | Description |
| --- | --- |
| String | s       The CSS color name |

<a name="color"></a>

## color(color, objects) ⇒ [<code>CSG</code>](#CSG)
apply the given color to the input object(s)

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , with the given color  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>Object</code> | either an array or a hex string of color values |
| objects | <code>Object</code> \| <code>Array</code> | either a single or multiple CSG/CAG objects to color |

**Example**  
```js
let redSphere = color([1,0,0,1], sphere())
```
<a name="rgb2hsl"></a>

## rgb2hsl(Number, Number, Number) ⇒
Converts an RGB color value to HSL. Conversion formula
adapted from http://en.wikipedia.org/wiki/HSL_color_space.
Assumes r, g, and b are contained in the set [0, 1] and
returns h, s, and l in the set [0, 1].

**Kind**: global function  
**Returns**: Array           The HSL representation  

| Param | Description |
| --- | --- |
| Number | r       The red color value |
| Number | g       The green color value |
| Number | b       The blue color value |

<a name="hsl2rgb"></a>

## hsl2rgb(Number, Number, Number) ⇒
Converts an HSL color value to RGB. Conversion formula
adapted from http://en.wikipedia.org/wiki/HSL_color_space.
Assumes h, s, and l are contained in the set [0, 1] and
returns r, g, and b in the set [0, 1].

**Kind**: global function  
**Returns**: Array           The RGB representation  

| Param | Description |
| --- | --- |
| Number | h       The hue |
| Number | s       The saturation |
| Number | l       The lightness |

<a name="rgb2hsv"></a>

## rgb2hsv(Number, Number, Number) ⇒
Converts an RGB color value to HSV. Conversion formula
adapted from http://en.wikipedia.org/wiki/HSV_color_space.
Assumes r, g, and b are contained in the set [0, 1] and
returns h, s, and v in the set [0, 1].

**Kind**: global function  
**Returns**: Array           The HSV representation  

| Param | Description |
| --- | --- |
| Number | r       The red color value |
| Number | g       The green color value |
| Number | b       The blue color value |

<a name="hsv2rgb"></a>

## hsv2rgb(Number, Number, Number) ⇒
Converts an HSV color value to RGB. Conversion formula
adapted from http://en.wikipedia.org/wiki/HSV_color_space.
Assumes h, s, and v are contained in the set [0, 1] and
returns r, g, and b in the set [0, 1].

**Kind**: global function  
**Returns**: Array           The RGB representation  

| Param | Description |
| --- | --- |
| Number | h       The hue |
| Number | s       The saturation |
| Number | v       The value |

<a name="html2rgb"></a>

## html2rgb()
Converts a HTML5 color value (string) to RGB values
See the color input type of HTML5 forms
Conversion formula:
- split the string; "#RRGGBB" into RGB components
- convert the HEX value into RGB values

**Kind**: global function  
<a name="rgb2html"></a>

## rgb2html()
Converts RGB color value to HTML5 color value (string)
Conversion forumla:
- convert R, G, B into HEX strings
- return HTML formatted string "#RRGGBB"

**Kind**: global function  
<a name="union"></a>

## union(objects) ⇒ [<code>CSG</code>](#CSG)
union/ combine the given shapes

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object, the union of all input shapes  

| Param | Type | Description |
| --- | --- | --- |
| objects | <code>Object(s)</code> \| <code>Array</code> | objects to combine : can be given - one by one: union(a,b,c) or - as an array: union([a,b,c]) |

**Example**  
```js
let unionOfSpherAndCube = union(sphere(), cube())
```
<a name="difference"></a>

## difference(objects) ⇒ [<code>CSG</code>](#CSG)
difference/ subtraction of the given shapes ie:
cut out C From B From A ie : a - b - c etc

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object, the difference of all input shapes  

| Param | Type | Description |
| --- | --- | --- |
| objects | <code>Object(s)</code> \| <code>Array</code> | objects to subtract can be given - one by one: difference(a,b,c) or - as an array: difference([a,b,c]) |

**Example**  
```js
let differenceOfSpherAndCube = difference(sphere(), cube())
```
<a name="intersection"></a>

## intersection(objects) ⇒ [<code>CSG</code>](#CSG)
intersection of the given shapes: ie keep only the common parts between the given shapes

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object, the intersection of all input shapes  

| Param | Type | Description |
| --- | --- | --- |
| objects | <code>Object(s)</code> \| <code>Array</code> | objects to intersect can be given - one by one: intersection(a,b,c) or - as an array: intersection([a,b,c]) |

**Example**  
```js
let intersectionOfSpherAndCube = intersection(sphere(), cube())
```
<a name="overCutInsideCorners"></a>

## overCutInsideCorners(_cag, cutterradius) ⇒ [<code>CAG</code>](#CAG)
cag = cag.overCutInsideCorners(cutterradius);
Using a CNC router it's impossible to cut out a true sharp inside corner. The inside corner
will be rounded due to the radius of the cutter. This function compensates for this by creating
an extra cutout at each inner corner so that the actual cut out shape will be at least as large
as needed.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - cag with overcutInsideCorners  

| Param | Type | Description |
| --- | --- | --- |
| _cag | <code>Object</code> | input cag |
| cutterradius | <code>Float</code> | radius to cut inside corners by |

<a name="sectionCut"></a>

## sectionCut(csg, orthobasis)
cuts a csg along a orthobasis

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| csg | [<code>CSG</code>](#CSG) | the csg object to cut |
| orthobasis | <code>Orthobasis</code> | the orthobasis to cut along |

<a name="cutByPlane"></a>

## cutByPlane(plane) ⇒ [<code>CSG</code>](#CSG)
Cut the solid by a plane. Returns the solid on the back side of the plane

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - the solid on the back side of the plane  

| Param | Type |
| --- | --- |
| plane | <code>Plane</code> | 

<a name="expandedShellOfCCSG"></a>

## expandedShellOfCCSG(radius, resolution, unionWithThis)
Create the expanded shell of the solid:
All faces are extruded to get a thickness of 2*radius
Cylinders are constructed around every side
Spheres are placed on every vertex
unionWithThis: if true, the resulting solid will be united with 'this' solid;
the result is a true expansion of the solid
If false, returns only the shell

**Kind**: global function  

| Param | Type |
| --- | --- |
| radius | <code>Float</code> | 
| resolution | <code>Integer</code> | 
| unionWithThis | <code>Boolean</code> | 

<a name="extrudeInOrthonormalBasis"></a>

## extrudeInOrthonormalBasis(cag, orthonormalbasis, depth, [options])
extrude the CAG in a certain plane.
Giving just a plane is not enough, multiple different extrusions in the same plane would be possible
by rotating around the plane's origin. An additional right-hand vector should be specified as well,
and this is exactly a OrthoNormalBasis.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cag | [<code>CAG</code>](#CAG) |  | the cag to extrude |
| orthonormalbasis | <code>Orthonormalbasis</code> |  | characterizes the plane in which to extrude |
| depth | <code>Float</code> |  | thickness of the extruded shape. Extrusion is done upwards from the plane  (unless symmetrical option is set, see below) |
| [options] | <code>Object</code> |  | options for construction |
| [options.symmetrical] | <code>Boolean</code> | <code>true</code> | extrude symmetrically in two directions about the plane |

<a name="extrudeInPlane"></a>

## extrudeInPlane(cag, axis1, axis2, depth, [options])
Extrude in a standard cartesian plane, specified by two axis identifiers. Each identifier can be
one of ["X","Y","Z","-X","-Y","-Z"]
The 2d x axis will map to the first given 3D axis, the 2d y axis will map to the second.
See OrthoNormalBasis.GetCartesian for details.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cag | [<code>CAG</code>](#CAG) |  | the cag to extrude |
| axis1 | <code>String</code> |  | the first axis |
| axis2 | <code>String</code> |  | the second axis |
| depth | <code>Float</code> |  | thickness of the extruded shape. Extrusion is done upwards from the plane |
| [options] | <code>Object</code> |  | options for construction |
| [options.symmetrical] | <code>Boolean</code> | <code>true</code> | extrude symmetrically in two directions about the plane |

<a name="extrude"></a>

## extrude(cag, [options]) ⇒ [<code>CSG</code>](#CSG)
linear extrusion of 2D shape, with optional twist

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - the extrude shape, as a CSG object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cag | [<code>CAG</code>](#CAG) |  | the cag to extrude |
| [options] | <code>Object</code> |  | options for construction |
| [options.offset] | <code>Array</code> | <code>[0,0,1]</code> | The 2d shape is placed in in z=0 plane and extruded into direction <offset> (a 3D vector as a 3 component array) |
| [options.twiststeps] | <code>Boolean</code> | <code>defaultResolution3D</code> | twiststeps determines the resolution of the twist (should be >= 1) |
| [options.twistangle] | <code>Boolean</code> | <code>0</code> | twistangle The final face is rotated <twistangle> degrees. Rotation is done around the origin of the 2d shape (i.e. x=0, y=0) |

**Example**  
```js
extruded=cag.extrude({offset: [0,0,10], twistangle: 360, twiststeps: 100});
```
<a name="rotateExtrude"></a>

## rotateExtrude(options) ⇒ [<code>CSG</code>](#CSG)
Extrude to into a 3D solid by rotating the origin around the Y axis.
(and turning everything into XY plane)

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for construction |
| [options.angle] | <code>Number</code> | <code>360</code> | angle of rotation |
| [options.resolution] | <code>Number</code> | <code>defaultResolution3D</code> | number of polygons per 360 degree revolution |

<a name="linear_extrude"></a>

## linear_extrude([options], baseShape) ⇒ [<code>CSG</code>](#CSG)
linear extrusion of the input 2d shape

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new extruded shape  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.height] | <code>Float</code> | <code>1</code> | height of the extruded shape |
| [options.slices] | <code>Integer</code> | <code>10</code> | number of intermediary steps/slices |
| [options.twist] | <code>Integer</code> | <code>0</code> | angle (in degrees to twist the extusion by) |
| [options.center] | <code>Boolean</code> | <code>false</code> | whether to center extrusion or not |
| baseShape | [<code>CAG</code>](#CAG) |  | input 2d shape |

**Example**  
```js
let revolved = linear_extrude({height: 10}, square())
```
<a name="rotate_extrude"></a>

## rotate_extrude([options], baseShape) ⇒ [<code>CSG</code>](#CSG)
rotate extrusion / revolve of the given 2d shape

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new extruded shape  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.fn] | <code>Integer</code> | <code>1</code> | resolution/number of segments of the extrusion |
| [options.startAngle] | <code>Float</code> | <code>1</code> | start angle of the extrusion, in degrees |
| [options.angle] | <code>Float</code> | <code>1</code> | angle of the extrusion, in degrees |
| [options.overflow] | <code>Float</code> | <code>&#x27;cap&#x27;</code> | what to do with points outside of bounds (+ / - x) : defaults to capping those points to 0 (only supported behaviour for now) |
| baseShape | [<code>CAG</code>](#CAG) |  | input 2d shape |

**Example**  
```js
let revolved = rotate_extrude({fn: 10}, square())
```
<a name="rectangular_extrude"></a>

## rectangular_extrude(basePoints, [options]) ⇒ [<code>CSG</code>](#CSG)
rectangular extrusion of the given array of points

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new extruded shape  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| basePoints | <code>Array</code> |  | array of points (nested) to extrude from layed out like [ [0,0], [10,0], [5,10], [0,10] ] |
| [options] | <code>Object</code> |  | options for construction |
| [options.h] | <code>Float</code> | <code>1</code> | height of the extruded shape |
| [options.w] | <code>Float</code> | <code>10</code> | width of the extruded shape |
| [options.fn] | <code>Integer</code> | <code>1</code> | resolution/number of segments of the extrusion |
| [options.closed] | <code>Boolean</code> | <code>false</code> | whether to close the input path for the extrusion or not |
| [options.round] | <code>Boolean</code> | <code>true</code> | whether to round the extrusion or not |

**Example**  
```js
let revolved = rectangular_extrude({height: 10}, square())
```
<a name="translate"></a>

## translate(vector, ...objects) ⇒ [<code>CSG</code>](#CSG)
translate an object in 2D/3D space

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , translated by the given amount  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Object</code> | 3D vector to translate the given object(s) by |
| ...objects | <code>Object(s)</code> \| <code>Array</code> | either a single or multiple CSG/CAG objects to translate |

**Example**  
```js
let movedSphere = translate([10,2,0], sphere())
```
<a name="scale"></a>

## scale(scale, ...objects) ⇒ [<code>CSG</code>](#CSG)
scale an object in 2D/3D space

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , scaled by the given amount  

| Param | Type | Description |
| --- | --- | --- |
| scale | <code>Float</code> \| <code>Array</code> | either an array or simple number to scale object(s) by |
| ...objects | <code>Object(s)</code> \| <code>Array</code> | either a single or multiple CSG/CAG objects to scale |

**Example**  
```js
let scaledSphere = scale([0.2,15,1], sphere())
```
<a name="rotate"></a>

## rotate(rotation, objects) ⇒ [<code>CSG</code>](#CSG)
rotate an object in 2D/3D space

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , rotated by the given amount  

| Param | Type | Description |
| --- | --- | --- |
| rotation | <code>Float</code> \| <code>Array</code> | either an array or simple number to rotate object(s) by |
| objects | <code>Object(s)</code> \| <code>Array</code> | either a single or multiple CSG/CAG objects to rotate |

**Example**  
```js
let rotatedSphere = rotate([0.2,15,1], sphere())
```
<a name="transform"></a>

## transform(matrix, ...objects) ⇒ [<code>CSG</code>](#CSG)
apply the given matrix transform to the given objects

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , transformed  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Array</code> | the 4x4 matrix to apply, as a simple 1d array of 16 elements |
| ...objects | <code>Object(s)</code> \| <code>Array</code> | either a single or multiple CSG/CAG objects to transform |

**Example**  
```js
const angle = 45
let transformedShape = transform([
cos(angle), -sin(angle), 0, 10,
sin(angle),  cos(angle), 0, 20,
0         ,           0, 1, 30,
0,           0, 0,  1
], sphere())
```
<a name="center"></a>

## center(axes, ...object) ⇒ [<code>CSG</code>](#CSG)
Center the given object(s) about the given axes

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , translated by the given amount  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| axes | <code>Array</code> \| <code>Boolean</code> | <code>[true,true,true]|true</code> | an array of boolean values that indicate the axes (X,Y,Z) to center upon. A single boolean is also allowed. |
| ...object | <code>Object</code> |  | one or more objects to center, i.e. objects are CSG or CAG |

**Example**  
```js
let csg = center([true,false,false], sphere()) // center about the X axis
```
<a name="mirror"></a>

## mirror(vector, ...objects) ⇒ [<code>CSG</code>](#CSG)
mirror an object in 2D/3D space

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , mirrored  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>Array</code> | the axes to mirror the object(s) by |
| ...objects | <code>Object(s)</code> \| <code>Array</code> | either a single or multiple CSG/CAG objects to mirror |

**Example**  
```js
let rotatedSphere = mirror([0.2,15,1], sphere())
```
<a name="expand"></a>

## expand(radius, object) ⇒ <code>CSG/CAG</code>
expand an object in 2D/3D space

**Kind**: global function  
**Returns**: <code>CSG/CAG</code> - new CSG/CAG object , expanded  

| Param | Type | Description |
| --- | --- | --- |
| radius | <code>float</code> | the radius to expand by |
| object | <code>Object</code> | a CSG/CAG objects to expand |

**Example**  
```js
let expanededShape = expand([0.2,15,1], sphere())
```
<a name="contract"></a>

## contract(radius, object) ⇒ <code>CSG/CAG</code>
contract an object(s) in 2D/3D space

**Kind**: global function  
**Returns**: <code>CSG/CAG</code> - new CSG/CAG object , contracted  

| Param | Type | Description |
| --- | --- | --- |
| radius | <code>float</code> | the radius to contract by |
| object | <code>Object</code> | a CSG/CAG objects to contract |

**Example**  
```js
let contractedShape = contract([0.2,15,1], sphere())
```
<a name="minkowski"></a>

## minkowski(objects) ⇒ [<code>CSG</code>](#CSG)
create a minkowski sum of the given shapes

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , mirrored  

| Param | Type | Description |
| --- | --- | --- |
| objects | <code>Object(s)</code> \| <code>Array</code> | either a single or multiple CSG/CAG objects to create a hull around |

**Example**  
```js
let hulled = hull(rect(), circle())
```
<a name="hull"></a>

## hull(objects) ⇒ [<code>CSG</code>](#CSG)
create a convex hull of the given shapes

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object , a hull around the given shapes  

| Param | Type | Description |
| --- | --- | --- |
| objects | <code>Object(s)</code> \| <code>Array</code> | either a single or multiple CSG/CAG objects to create a hull around |

**Example**  
```js
let hulled = hull(rect(), circle())
```
<a name="chain_hull"></a>

## chain_hull(objects) ⇒ [<code>CSG</code>](#CSG)
create a chain hull of the given shapes
Originally "Whosa whatsis" suggested "Chain Hull" ,
as described at https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN
essentially hull A+B, B+C, C+D and then union those

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object ,which a chain hull of the inputs  

| Param | Type | Description |
| --- | --- | --- |
| objects | <code>Object(s)</code> \| <code>Array</code> | either a single or multiple CSG/CAG objects to create a chain hull around |

**Example**  
```js
let hulled = chain_hull(rect(), circle())
```
<a name="square"></a>

## square([options]) ⇒ [<code>CAG</code>](#CAG)
Construct a square/rectangle

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new square  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.size] | <code>Float</code> | <code>1</code> | size of the square, either as array or scalar |
| [options.center] | <code>Boolean</code> | <code>true</code> | wether to center the square/rectangle or not |

**Example**  
```js
let square1 = square({
  size: 10
})
```
<a name="circle"></a>

## circle([options]) ⇒ [<code>CAG</code>](#CAG)
Construct a circle

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new circle  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.r] | <code>Float</code> | <code>1</code> | radius of the circle |
| [options.fn] | <code>Integer</code> | <code>32</code> | segments of circle (ie quality/ resolution) |
| [options.center] | <code>Boolean</code> | <code>true</code> | wether to center the circle or not |

**Example**  
```js
let circle1 = circle({
  r: 10
})
```
<a name="polygon"></a>

## polygon([options]) ⇒ [<code>CAG</code>](#CAG)
Construct a polygon either from arrays of paths and points,
or just arrays of points nested paths (multiple paths) and flat paths are supported

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new polygon  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | options for construction or either flat or nested array of points |
| [options.points] | <code>Array</code> | points of the polygon : either flat or nested array of points |
| [options.paths] | <code>Array</code> | paths of the polygon : either flat or nested array of points index |

**Example**  
```js
let roof = [[10,11], [0,11], [5,20]]
let wall = [[0,0], [10,0], [10,10], [0,10]]

let poly = polygon(roof)
or
let poly = polygon([roof, wall])
or
let poly = polygon({ points: roof })
or
let poly = polygon({ points: [roof, wall] })
or
let poly = polygon({ points: roof, path: [0, 1, 2] })
or
let poly = polygon({ points: [roof, wall], path: [[0, 1, 2], [3, 4, 5, 6]] })
or
let poly = polygon({ points: roof.concat(wall), paths: [[0, 1, 2], [3, 4, 5], [3, 6, 5]] })
```
<a name="triangle"></a>

## triangle() ⇒ [<code>CAG</code>](#CAG)
Construct a triangle

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new triangle  
**Example**  
```js
let triangle = trangle({
  length: 10
})
```
<a name="circle"></a>

## circle([options]) ⇒ [<code>CAG</code>](#CAG)
Construct a circle.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Vector2D</code> | <code>[0,0]</code> | center of circle |
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
| [options.center] | <code>Vector2D</code> | <code>[0,0]</code> | center of ellipse |
| [options.radius] | <code>Vector2D</code> | <code>[1,1]</code> | radius of ellipse, width and height |
| [options.resolution] | <code>Number</code> | <code>defaultResolution2D</code> | number of sides per 360 rotation |

<a name="rectangle"></a>

## rectangle([options]) ⇒ [<code>CAG</code>](#CAG)
Construct a rectangle.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Vector2D</code> | <code>[0,0]</code> | center of rectangle |
| [options.radius] | <code>Vector2D</code> | <code>[1,1]</code> | radius of rectangle, width and height |
| [options.corner1] | <code>Vector2D</code> | <code>[0,0]</code> | bottom left corner of rectangle (alternate) |
| [options.corner2] | <code>Vector2D</code> | <code>[0,0]</code> | upper right corner of rectangle (alternate) |

<a name="roundedRectangle"></a>

## roundedRectangle([options]) ⇒ [<code>CAG</code>](#CAG)
Construct a rounded rectangle.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Vector2D</code> | <code>[0,0]</code> | center of rounded rectangle |
| [options.radius] | <code>Vector2D</code> | <code>[1,1]</code> | radius of rounded rectangle, width and height |
| [options.corner1] | <code>Vector2D</code> | <code>[0,0]</code> | bottom left corner of rounded rectangle (alternate) |
| [options.corner2] | <code>Vector2D</code> | <code>[0,0]</code> | upper right corner of rounded rectangle (alternate) |
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
Construct a cuboid

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new sphere  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.size] | <code>Float</code> | <code>1</code> | size of the side of the cuboid : can be either: - a scalar : ie a single float, in which case all dimensions will be the same - or an array: to specify different dimensions along x/y/z |
| [options.fn] | <code>Integer</code> | <code>32</code> | segments of the sphere (ie quality/resolution) |
| [options.fno] | <code>Integer</code> | <code>32</code> | segments of extrusion (ie quality) |
| [options.type] | <code>String</code> | <code>&#x27;normal&#x27;</code> | type of sphere : either 'normal' or 'geodesic' |

**Example**  
```js
let cube1 = cube({
  r: 10,
  fn: 20
})
```
<a name="sphere"></a>

## sphere([options]) ⇒ [<code>CSG</code>](#CSG)
Construct a sphere

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new sphere  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.r] | <code>Float</code> | <code>1</code> | radius of the sphere |
| [options.fn] | <code>Integer</code> | <code>32</code> | segments of the sphere (ie quality/resolution) |
| [options.fno] | <code>Integer</code> | <code>32</code> | segments of extrusion (ie quality) |
| [options.type] | <code>String</code> | <code>&#x27;normal&#x27;</code> | type of sphere : either 'normal' or 'geodesic' |

**Example**  
```js
let sphere1 = sphere({
  r: 10,
  fn: 20
})
```
<a name="cylinder"></a>

## cylinder([options]) ⇒ [<code>CSG</code>](#CSG)
Construct a cylinder

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new cylinder  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.r] | <code>Float</code> | <code>1</code> | radius of the cylinder |
| [options.r1] | <code>Float</code> | <code>1</code> | radius of the top of the cylinder |
| [options.r2] | <code>Float</code> | <code>1</code> | radius of the bottom of the cylinder |
| [options.d] | <code>Float</code> | <code>1</code> | diameter of the cylinder |
| [options.d1] | <code>Float</code> | <code>1</code> | diameter of the top of the cylinder |
| [options.d2] | <code>Float</code> | <code>1</code> | diameter of the bottom of the cylinder |
| [options.fn] | <code>Integer</code> | <code>32</code> | number of sides of the cylinder (ie quality/resolution) |

**Example**  
```js
let cylinder = cylinder({
  d: 10,
  fn: 20
})
```
<a name="torus"></a>

## torus([options]) ⇒ [<code>CSG</code>](#CSG)
Construct a torus

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new torus  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.ri] | <code>Float</code> | <code>1</code> | radius of base circle |
| [options.ro] | <code>Float</code> | <code>4</code> | radius offset |
| [options.fni] | <code>Integer</code> | <code>16</code> | segments of base circle (ie quality) |
| [options.fno] | <code>Integer</code> | <code>32</code> | segments of extrusion (ie quality) |
| [options.roti] | <code>Integer</code> | <code>0</code> | rotation angle of base circle |

**Example**  
```js
let torus1 = torus({
  ri: 10
})
```
<a name="polyhedron"></a>

## polyhedron([options]) ⇒ [<code>CSG</code>](#CSG)
Construct a polyhedron from the given triangles/ polygons/points

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new polyhedron  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | options for construction |
| [options.triangles] | <code>Array</code> | triangles to build the polyhedron from |
| [options.polygons] | <code>Array</code> | polygons to build the polyhedron from |
| [options.points] | <code>Array</code> | points to build the polyhedron from |
| [options.colors] | <code>Array</code> | colors to apply to the polyhedron |

**Example**  
```js
let torus1 = polyhedron({
  points: [...]
})
```
<a name="cube"></a>

## cube([options]) ⇒ [<code>CSG</code>](#CSG)
Construct an axis-aligned solid cuboid.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new 3D solid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Vector3</code> | <code>[0,0,0]</code> | center of cube |
| [options.radius] | <code>Vector3</code> | <code>[1,1,1]</code> | radius of cube, single scalar also possible |

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
| [options.center] | <code>Vector3</code> | <code>[0,0,0]</code> | center of sphere |
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
| [options.start] | <code>Vector3</code> | <code>[0,-1,0]</code> | start point of cylinder |
| [options.end] | <code>Vector3</code> | <code>[0,1,0]</code> | end point of cylinder |
| [options.radius] | <code>Number</code> | <code>1</code> | radius of rounded ends, must be scalar |
| [options.normal] | <code>Vector3</code> |  | vector determining the starting angle for tesselation. Should be non-parallel to start.minus(end) |
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
| [options.start] | <code>Vector3</code> | <code>[0,-1,0]</code> | start point of cylinder |
| [options.end] | <code>Vector3</code> | <code>[0,1,0]</code> | end point of cylinder |
| [options.radius] | <code>Vector2D</code> | <code>[1,1]</code> | radius of rounded ends, must be two dimensional array |
| [options.radiusStart] | <code>Vector2D</code> | <code>[1,1]</code> | OPTIONAL radius of rounded start, must be two dimensional array |
| [options.radiusEnd] | <code>Vector2D</code> | <code>[1,1]</code> | OPTIONAL radius of rounded end, must be two dimensional array |
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
| [options.center] | <code>Vector3</code> | <code>[0,0,0]</code> | center of rounded cube |
| [options.radius] | <code>Vector3</code> | <code>[1,1,1]</code> | radius of rounded cube, single scalar is possible |
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

<a name="solidFromSlices"></a>

## solidFromSlices(options)
Creates solid from slices (Polygon) by generating walls

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Solid generating options  - numslices {Number} Number of slices to be generated  - callback(t, slice) {Function} Callback function generating slices.          arguments: t = [0..1], slice = [0..numslices - 1]          return: Polygon or null to skip  - loop {Boolean} no flats, only walls, it's used to generate solids like a tor |

<a name="_addWalls"></a>

## _addWalls(walls, bottom, top)
**Kind**: global function  

| Param | Description |
| --- | --- |
| walls | Array of wall polygons |
| bottom | Bottom polygon |
| top | Top polygon |

<a name="vectorChar"></a>

## vectorChar([options], [char]) ⇒ [<code>VectorCharObject</code>](#VectorCharObject)
Construct a [VectorCharObject](#VectorCharObject) from a ascii character whose code is between 31 and 127,
if the character is not supported it is replaced by a question mark.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> \| <code>String</code> |  | options for construction or ascii character |
| [options.xOffset] | <code>Float</code> | <code>0</code> | x offset |
| [options.yOffset] | <code>Float</code> | <code>0</code> | y offset |
| [options.height] | <code>Float</code> | <code>21</code> | font size (uppercase height) |
| [options.extrudeOffset] | <code>Float</code> | <code>0</code> | width of the extrusion that will be applied (manually) after the creation of the character |
| [options.input] | <code>String</code> | <code>&#x27;?&#x27;</code> | ascii character (ignored/overwrited if provided as seconds parameter) |
| [char] | <code>String</code> | <code>&#x27;?&#x27;</code> | ascii character |

**Example**  
```js
let vectorCharObject = vectorChar()
or
let vectorCharObject = vectorChar('A')
or
let vectorCharObject = vectorChar({ xOffset: 57 }, 'C')
or
let vectorCharObject = vectorChar({ xOffset: 78, input: '!' })
```
<a name="vectorText"></a>

## vectorText([options], [text]) ⇒ <code>Array</code>
Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
if one character is not supported it is replaced by a question mark.

**Kind**: global function  
**Returns**: <code>Array</code> - characters segments [[[x, y], ...], ...]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> \| <code>String</code> |  | options for construction or ascii string |
| [options.xOffset] | <code>Float</code> | <code>0</code> | x offset |
| [options.yOffset] | <code>Float</code> | <code>0</code> | y offset |
| [options.height] | <code>Float</code> | <code>21</code> | font size (uppercase height) |
| [options.lineSpacing] | <code>Float</code> | <code>1.4</code> | line spacing expressed as a percentage of font size |
| [options.letterSpacing] | <code>Float</code> | <code>1</code> | extra letter spacing expressed as a percentage of font size |
| [options.align] | <code>String</code> | <code>&#x27;left&#x27;</code> | multi-line text alignement: left, center or right |
| [options.extrudeOffset] | <code>Float</code> | <code>0</code> | width of the extrusion that will be applied (manually) after the creation of the character |
| [options.input] | <code>String</code> | <code>&#x27;?&#x27;</code> | ascii string (ignored/overwrited if provided as seconds parameter) |
| [text] | <code>String</code> | <code>&#x27;?&#x27;</code> | ascii string |

**Example**  
```js
let textSegments = vectorText()
or
let textSegments = vectorText('OpenJSCAD')
or
let textSegments = vectorText({ yOffset: -50 }, 'OpenJSCAD')
or
let textSegments = vectorText({ yOffset: -80, input: 'OpenJSCAD' })
```
<a name="vector_char"></a>

## ~~vector_char(x, y, char) ⇒ [<code>VectorCharObject</code>](#VectorCharObject)~~
***Deprecated***

Construct a [VectorCharObject](#VectorCharObject) from a ascii character whose code is between 31 and 127,
if the character is not supported it is replaced by a question mark.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Float</code> | x offset |
| y | <code>Float</code> | y offset |
| char | <code>String</code> | ascii character |

**Example**  
```js
let vectorCharObject = vector_char(36, 0, 'B')
```
<a name="vector_text"></a>

## ~~vector_text(x, y, text) ⇒ <code>Array</code>~~
***Deprecated***

Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
if one character is not supported it is replaced by a question mark.

**Kind**: global function  
**Returns**: <code>Array</code> - characters segments [[[x, y], ...], ...]  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Float</code> | x offset |
| y | <code>Float</code> | y offset |
| text | <code>String</code> | ascii string |

**Example**  
```js
let textSegments = vector_text(0, -20, 'OpenJSCAD')
```
<a name="fromSides"></a>

## fromSides(sides) ⇒ [<code>CAG</code>](#CAG)
Construct a CAG from a list of `Side` instances.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Description |
| --- | --- | --- |
| sides | <code>Array.&lt;Side&gt;</code> | list of sides |

<a name="fromPoints"></a>

## fromPoints(points) ⇒ [<code>CAG</code>](#CAG)
Construct a CAG from a list of points (a polygon) or an nested array of points.
The rotation direction of the points is not relevant.
The points can define a convex or a concave polygon.
The polygon must not self intersect.
Hole detection follows the even/odd rule,
which means that the order of the paths is not important.

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array.&lt;points&gt;</code> \| <code>Array.&lt;Array.&lt;points&gt;&gt;</code> | (nested) list of points in 2D space |

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

<a name="fromCompactBinary"></a>

## fromCompactBinary(bin) ⇒ [<code>CAG</code>](#CAG)
Reconstruct a CAG from the output of toCompactBinary().

**Kind**: global function  
**Returns**: [<code>CAG</code>](#CAG) - new CAG object  

| Param | Type | Description |
| --- | --- | --- |
| bin | <code>CompactBinary</code> | see toCompactBinary() |

<a name="fromPolygons"></a>

## fromPolygons(polygons) ⇒ [<code>CSG</code>](#CSG)
Construct a CSG solid from a list of `Polygon` instances.

**Kind**: global function  
**Returns**: [<code>CSG</code>](#CSG) - new CSG object  

| Param | Type | Description |
| --- | --- | --- |
| polygons | <code>Array.&lt;Polygon&gt;</code> | list of polygons |

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

<a name="VectorCharObject"></a>

## VectorCharObject : <code>Object</code>
Represents a character as segments

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| width | <code>Float</code> | character width |
| height | <code>Float</code> | character height (uppercase) |
| segments | <code>Array</code> | character segments [[[x, y], ...], ...] |

