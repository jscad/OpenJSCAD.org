## Constants

<dl>
<dt><a href="#spatialResolution">spatialResolution</a></dt>
<dd><p>The resolution of space, currently one hundred nanometers.
 This should be 1 / EPS.</p>
</dd>
<dt><a href="#EPS">EPS</a></dt>
<dd><p>Epsilon used during determination of near zero distances.
 This should be 1 / spacialResolution.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#color">color(color, objects)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Apply the given color to the given objects.</p>
</dd>
<dt><a href="#colorNameToRgb">colorNameToRgb(String)</a> ⇒</dt>
<dd><p>Converts a CSS color name to RGB color.</p>
</dd>
<dt><a href="#hexToRgb">hexToRgb(notation)</a> ⇒ <code>Array</code></dt>
<dd><p>Converts CSS color notations (string of hex values) to RGB values.</p>
</dd>
<dt><a href="#hslToRgb">hslToRgb(values)</a> ⇒ <code>Array</code></dt>
<dd><p>Converts HSL color values to RGB color values.</p>
</dd>
<dt><a href="#hsvToRgb">hsvToRgb(values)</a> ⇒ <code>Array</code></dt>
<dd><p>Converts HSV color values to RGB color values.</p>
</dd>
<dt><a href="#hueToColorComponent">hueToColorComponent(p, q, t)</a></dt>
<dd><p>convert hue values to a color component (ie one of r, g, b)</p>
</dd>
<dt><a href="#rgbToHex">rgbToHex(values)</a> ⇒ <code>String</code></dt>
<dd><p>Convert the given RGB color values to CSS color notation (string)</p>
</dd>
<dt><a href="#rgbToHsl">rgbToHsl(values)</a> ⇒</dt>
<dd><p>Converts an RGB color value to HSL.</p>
</dd>
<dt><a href="#rgbToHsv">rgbToHsv(values)</a> ⇒</dt>
<dd><p>Converts an RGB color value to HSV.</p>
</dd>
<dt><a href="#create">create()</a></dt>
<dd><p>Create a new connector.
A connector allows two objects to be connected at predefined positions.</p>
<p>For example a servo motor and a servo horn can both have a connector called &#39;shaft&#39;.
The horn can be moved and rotated to any position, and then the servo horn
is attached to the servo motor at the proper position, such that the two connectors match.
Connectors are children of the solid, transform-wise, so transformations are applied
to both solid and connector(s).  (parent =&gt; child relationship)</p>
</dd>
<dt><a href="#extend">extend(distance, connector)</a> ⇒ <code>Connector</code></dt>
<dd><p>Creates a new Connector, with the connection point moved in the direction of the axis</p>
</dd>
<dt><a href="#fromPointAxisNormal">fromPointAxisNormal(point, axis, normal)</a> ⇒ <code>connector</code></dt>
<dd><p>Create a connector from the given point, axis and normal.</p>
</dd>
<dt><a href="#normalize">normalize(connector)</a> ⇒ <code>Connector</code></dt>
<dd><p>Normalize the given connector, calculating new axis and normal</p>
</dd>
<dt><a href="#toString">toString(connector)</a> ⇒ <code>string</code></dt>
<dd><p>Return a string representing the given connector.</p>
</dd>
<dt><a href="#transform">transform(matrix, connector)</a> ⇒ <code>connector</code></dt>
<dd><p>Transform the give connector using the given matrix.</p>
</dd>
<dt><a href="#transformationBetween">transformationBetween(options, from, to)</a> ⇒ <code>mat4</code></dt>
<dd><p>Get the transformation matrix that connects the given connectors.</p>
</dd>
<dt><a href="#applyTransforms">applyTransforms(geometry)</a> ⇒ <code>geom2</code></dt>
<dd><p>Apply the transforms of the given geometry.
NOTE: This function must be called BEFORE exposing any data. See toSides.</p>
</dd>
<dt><a href="#clone">clone()</a> ⇒ <code>geom2</code></dt>
<dd><p>Performs a deep clone of the given geometry.</p>
</dd>
<dt><a href="#create">create([sides])</a> ⇒ <code>geom2</code></dt>
<dd><p>Create a new 2D geometry composed of unordered sides (two connected points).</p>
</dd>
<dt><a href="#fromPoints">fromPoints(points)</a> ⇒ <code>geom2</code></dt>
<dd><p>Create a new 2D geometry from the given points.
The direction (rotation) of the points is not relevant,
as the points can define a convex or a concave polygon.
The geometry must not self intersect, i.e. the sides cannot cross.</p>
</dd>
<dt><a href="#isA">isA()</a> ⇒ <code>true</code></dt>
<dd><p>Determin if the given object is a 2D geometry.</p>
</dd>
<dt><a href="#reverse">reverse(geometry)</a> ⇒ <code>geom2</code></dt>
<dd><p>Reverses the given geometry so that the sides are flipped and in the opposite order.
This swaps the left (interior) and right (exterior) edges.</p>
</dd>
<dt><a href="#toOutlines">toOutlines(geometry)</a> ⇒ <code>Array</code></dt>
<dd><p>Create the outline(s) of the given geometry.</p>
</dd>
<dt><a href="#toPoints">toPoints(geometry)</a> ⇒ <code>Array</code></dt>
<dd><p>Produces an array of points from the given geometry.
NOTE: The points returned do NOT define an order. Use toOutlines() for ordered points.</p>
</dd>
<dt><a href="#toSides">toSides(geometry)</a> ⇒ <code>Array</code></dt>
<dd><p>Produces an array of sides from the given geometry.
The returned array should not be modified as the data is shared with the geometry.</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>String</code></dt>
<dd><p>Create a string representing the contents of the given geometry.</p>
</dd>
<dt><a href="#transform">transform(matrix, geometry)</a> ⇒ <code>geom2</code></dt>
<dd><p>Transform the given geometry using the given matrix.
This is a lazy transform of the sides, as this function only adjusts the transforms.
The transforms are applied when accessing the sides via toSides().</p>
</dd>
<dt><a href="#applyTransforms">applyTransforms(geometry)</a> ⇒ <code>geom3</code></dt>
<dd><p>Apply the transforms of the given geometry.
NOTE: This function must be called BEFORE exposing any data. See toPolygons.</p>
</dd>
<dt><a href="#clone">clone()</a> ⇒ <code>geom3</code></dt>
<dd><p>Performs a deep clone of the given geometry.</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>geom3</code></dt>
<dd><p>Create a new 3D geometry composed of polygons.</p>
</dd>
<dt><a href="#fromPoints">fromPoints(listofpoints)</a> ⇒ <code>geom2</code></dt>
<dd><p>Construct a new 3D geometry from a list of points.
The list of points should contain sub-arrays, each defining a single polygon of points.
In addition, the points should follow the right-hand rule for rotation in order to
define an external facing polygon. The opposite is true for internal facing polygon.</p>
</dd>
<dt><a href="#isA">isA()</a> ⇒ <code>true</code></dt>
<dd><p>Determin if the given object is a 3D geometry.</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>String</code></dt>
<dd><p>Create a string representing the contents of the given geometry.</p>
</dd>
<dt><a href="#transform">transform(matrix, geometry)</a> ⇒ <code>geom3</code></dt>
<dd><p>Transform the given geometry using the given matrix.
This is a lazy transform of the polygons, as this function only adjusts the transforms.
See applyTransforms() for the actual application of the transforms to the polygons.</p>
</dd>
<dt><a href="#appendArc">appendArc(options, geometry)</a> ⇒ <code>path2</code></dt>
<dd><p>Append an arc to the end of the given geometry.
This implementation follows the SVG arc specifications.</p>
</dd>
<dt><a href="#appendBezier">appendBezier(options, geometry)</a> ⇒ <code>path2</code></dt>
<dd><p>Append a Bezier curve to the end of the given geometry, using the control points to transition the curve through start and end points.
<br>
The Bézier curve starts at the last point in the path,
and ends at the last given control point. Other control points are intermediate control points.
<br>
The first control point may be null to ensure a smooth transition occurs. In this case,
the second to last control point of the path is mirrored into the control points of the Bezier curve.
In other words, the trailing gradient of the path matches the new gradient of the curve.</p>
</dd>
<dt><a href="#appendPoints">appendPoints(geometry)</a> ⇒ <code>path2</code></dt>
<dd><p>Append the given list of points to the end of the given geometry.</p>
</dd>
<dt><a href="#applyTransforms">applyTransforms(geometry)</a> ⇒ <code>path</code></dt>
<dd><p>Apply the transforms of the given geometry.
NOTE: This function must be called BEFORE exposing any data. See toPoints.</p>
</dd>
<dt><a href="#clone">clone()</a> ⇒ <code>path2</code></dt>
<dd><p>Performs a deep clone of the give path.</p>
</dd>
<dt><a href="#close">close()</a> ⇒ <code>path</code></dt>
<dd><p>Close the given geometry.</p>
</dd>
<dt><a href="#concat">concat(...paths)</a> ⇒ <code>path2</code></dt>
<dd><p>Produces a path by concatenating the given paths.
A concatenation of zero paths is an empty, open path.
A concatenation of one closed path to a series of open paths produces a closed path.
A concatenation of a path to a closed path is an error.</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>path</code></dt>
<dd><p>Produces an empty, open path.</p>
</dd>
<dt><a href="#eachPoint">eachPoint(path, thunk)</a></dt>
<dd><p>Calls a function for each point in the path in order.</p>
</dd>
<dt><a href="#equals">equals(a, b)</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if the given paths are equal.
For closed paths, this includes equality under point order rotation.</p>
</dd>
<dt><a href="#fromPoints">fromPoints(points)</a> ⇒ <code>path</code></dt>
<dd><p>Create a new path from the given points.
The points must be provided an array of points,
where each point is an array of two numbers.</p>
</dd>
<dt><a href="#isA">isA()</a> ⇒ <code>true</code></dt>
<dd><p>Determin if the given object is a path2 geometry.</p>
</dd>
<dt><a href="#reverse">reverse(path)</a> ⇒ <code>path2</code></dt>
<dd><p>Reverses the path so that the points are in the opposite order.
This swaps the left (interior) and right (exterior) edges.
Reversal of path segments with options may be non-trivial.</p>
</dd>
<dt><a href="#toPoints">toPoints(geometry)</a> ⇒ <code>Array</code></dt>
<dd><p>Produces a new array containing the path&#39;s point data.
The returned array should not be modified as the data is shared with the geometry.</p>
</dd>
<dt><a href="#toString">toString()</a> ⇒ <code>String</code></dt>
<dd><p>Create a string representing the contents of the given path.</p>
</dd>
<dt><a href="#transform">transform(matrix, geometry)</a> ⇒ <code>path2</code></dt>
<dd><p>A lazy transform of all of the points in the path.</p>
</dd>
<dt><a href="#arePointsInside">arePointsInside(points, polygon)</a> ⇒ <code>Integer</code></dt>
<dd><p>Determine if the given points are inside the given polygon.</p>
</dd>
<dt><a href="#create">create([vertices])</a> ⇒ <code>poly2</code></dt>
<dd><p>Creates a new poly2 (polygon) with initial values.</p>
</dd>
<dt><a href="#flip">flip(polygon)</a> ⇒ <code>poly2</code></dt>
<dd><p>Flip the give polygon to rotate the opposite direction.</p>
</dd>
<dt><a href="#clone">clone([out], poly3)</a> ⇒ <code>vec3</code></dt>
<dd><p>Create a deep clone of the given polygon</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>poly3</code></dt>
<dd><p>Creates a new poly3 (polygon) with initial values</p>
</dd>
<dt><a href="#flip">flip(polygon)</a> ⇒ <code>poly3</code></dt>
<dd><p>Flip the give polygon to face the opposite direction.</p>
</dd>
<dt><a href="#fromPoints">fromPoints(points)</a></dt>
<dd><p>Create a polygon from the given points.</p>
</dd>
<dt><a href="#fromPointsAndPlane">fromPointsAndPlane(vertices, [plane])</a></dt>
<dd></dd>
<dt><a href="#isA">isA()</a> ⇒ <code>true</code></dt>
<dd><p>Determin if the given object is a poly3.</p>
</dd>
<dt><a href="#isConvex">isConvex()</a> ⇒ <code>boolean</code></dt>
<dd><p>Check whether the polygon is convex. (it should be, otherwise we will get unexpected results)</p>
</dd>
<dt><a href="#measureBoundingSphere">measureBoundingSphere(the)</a> ⇒</dt>
<dd><p>Measure the bounding sphere of the given poly3</p>
</dd>
<dt><a href="#OrthoNormalBasis">OrthoNormalBasis(plane, rightvector)</a></dt>
<dd><p>class OrthoNormalBasis
Reprojects points on a 3D plane onto a 2D plane
or from a 2D plane back onto the 3D plane</p>
</dd>
<dt><a href="#clone">clone([out], line)</a> ⇒ <code>line2</code></dt>
<dd><p>Create a clone of the given 2D line.</p>
</dd>
<dt><a href="#closestPoint">closestPoint(point, line)</a> ⇒ <code>vec2</code></dt>
<dd><p>Determine the closest point on the given line to the given point.
Thanks to @khrismuc</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>line2</code></dt>
<dd><p>Create a unbounded 2D line, positioned at 0,0, and running along the X axis.</p>
</dd>
<dt><a href="#direction">direction()</a> ⇒ <code>vec2</code></dt>
<dd><p>Return the direction of the given line.</p>
</dd>
<dt><a href="#distanceToPoint">distanceToPoint(point, line)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculate the distance (positive) between the given point and line</p>
</dd>
<dt><a href="#doLinesIntersect">doLinesIntersect(p0start, p0end, p1start, p1end)</a></dt>
<dd></dd>
<dt><a href="#equals">equals()</a> ⇒ <code>boolean</code></dt>
<dd><p>Compare the given 2D lines for equality</p>
</dd>
<dt><a href="#fromPoints">fromPoints(p1, p2)</a> ⇒ <code>line2</code></dt>
<dd><p>Create a new 2D line that passes through the given points</p>
</dd>
<dt><a href="#fromValues">fromValues(x, y, w)</a> ⇒ <code>line2</code></dt>
<dd><p>Creates a new unbounded 2D line initialized with the given values.</p>
</dd>
<dt><a href="#intersectToLine">intersectToLine(line1, line2)</a> ⇒ <code>vec2</code></dt>
<dd><p>Return the point of intersection between the given lines.</p>
<p>The point will have Infinity values if the lines are paralell.
The point will have NaN values if the lines are the same.</p>
</dd>
<dt><a href="#origin">origin(line)</a> ⇒ <code>vec2</code></dt>
<dd><p>Return the origin of the given line.</p>
</dd>
<dt><a href="#reverse">reverse([out], line)</a> ⇒ <code>line2</code></dt>
<dd><p>Create a new line in the opposite direction as the given.</p>
</dd>
<dt><a href="#toString">toString(line)</a> ⇒ <code>string</code></dt>
<dd><p>Return a string representing the given line.</p>
</dd>
<dt><a href="#transform">transform([out], matrix, line)</a> ⇒ <code>line2</code></dt>
<dd><p>Transforms the given 2D line using the given matrix.</p>
</dd>
<dt><a href="#xAtY">xAtY(y, line)</a> ⇒ <code>Number</code></dt>
<dd><p>Determine the X coordinate of the given line at the Y coordinate.</p>
<p>The X coordinate will be Infinity if the line is parallel to the X axis.</p>
</dd>
<dt><a href="#clone">clone([out], line)</a> ⇒ <code>line3</code></dt>
<dd><p>Create a clone of the given 3D line.</p>
</dd>
<dt><a href="#closestPoint">closestPoint(point, line)</a> ⇒ <code>vec3</code></dt>
<dd><p>Determine the closest point on the given line to the given point.</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>line3</code></dt>
<dd><p>Create an unbounded 3D line, positioned at 0,0,0 and lying on the X axis.</p>
</dd>
<dt><a href="#direction">direction()</a> ⇒ <code>vec3</code></dt>
<dd><p>Return the direction of the given line.</p>
</dd>
<dt><a href="#distanceToPoint">distanceToPoint(point, line)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculate the distance (positive) between the given point and line</p>
</dd>
<dt><a href="#equals">equals()</a> ⇒ <code>boolean</code></dt>
<dd><p>Compare the given 3D lines for equality</p>
</dd>
<dt><a href="#fromPointAndDirection">fromPointAndDirection(point, direction)</a> ⇒ <code>line3</code></dt>
<dd><p>Create a line in 3D space from the given data.</p>
<p>The point can be any random point on the line.
The direction must be a vector with positive or negative distance from the point.
See the logic of fromPoints for appropriate values.</p>
</dd>
<dt><a href="#fromPoints">fromPoints(p1, p2)</a> ⇒ <code>line3</code></dt>
<dd><p>Creates a new 3D line that passes through the given points.</p>
</dd>
<dt><a href="#intersectToPlane">intersectToPlane(plane, line)</a> ⇒ <code>vec3</code></dt>
<dd><p>Determine the closest point on the given plane to the given line.</p>
<p>The point of intersection will be invalid if parallel to the plane, e.g. NaN.</p>
</dd>
<dt><a href="#origin">origin(line)</a> ⇒ <code>vec3</code></dt>
<dd><p>Return the origin of the given line.</p>
</dd>
<dt><a href="#reverse">reverse([out], line)</a> ⇒ <code>line3</code></dt>
<dd><p>Create a new line in the opposite direction as the given.</p>
</dd>
<dt><a href="#toString">toString(line)</a> ⇒ <code>string</code></dt>
<dd><p>Return a string representing the given line.</p>
</dd>
<dt><a href="#transform">transform(matrix, line)</a> ⇒ <code>line3</code></dt>
<dd><p>Transforms the given 3D line using the given matrix.</p>
</dd>
<dt><a href="#add">add(out, a, b)</a> ⇒ <code>mat4</code></dt>
<dd><p>Adds two mat4&#39;s</p>
</dd>
<dt><a href="#clone">clone([out], matrix)</a> ⇒ <code>mat4</code></dt>
<dd><p>Creates a clone of the given matrix</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>mat4</code></dt>
<dd><p>Creates a new identity mat4</p>
</dd>
<dt><a href="#equals">equals(a, b)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)</p>
</dd>
<dt><a href="#fromRotation">fromRotation(out, rad, axis)</a> ⇒ <code>mat4</code></dt>
<dd><p>Creates a matrix from a given angle around a given axis
This is equivalent to (but much faster than):</p>
<pre><code>mat4.identity(dest);
mat4.rotate(dest, dest, rad, axis);
</code></pre></dd>
<dt><a href="#fromScaling">fromScaling(out, v)</a> ⇒ <code>mat4</code></dt>
<dd><p>Creates a matrix from a vector scaling
This is equivalent to (but much faster than):</p>
<pre><code>mat4.identity(dest);
mat4.scale(dest, dest, vec);
</code></pre></dd>
<dt><a href="#fromTaitBryanRotation">fromTaitBryanRotation(yaw, pitch, roll)</a> ⇒ <code>mat4</code></dt>
<dd><p>Creates a matrix from the given Tait–Bryan angles.
Tait-Bryan Euler angle convention using active, intrinsic rotations around the axes in the order z-y-x.</p>
</dd>
<dt><a href="#fromTranslation">fromTranslation(out, v)</a> ⇒ <code>mat4</code></dt>
<dd><p>Creates a matrix from a vector translation
This is equivalent to (but much faster than):</p>
<pre><code>mat4.identity(dest);
mat4.translate(dest, dest, vec);
</code></pre></dd>
<dt><a href="#fromValues">fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)</a> ⇒ <code>mat4</code></dt>
<dd><p>Create a new mat4 with the given values</p>
</dd>
<dt><a href="#fromXRotation">fromXRotation(out, rad)</a> ⇒ <code>mat4</code></dt>
<dd><p>Creates a matrix from the given angle around the X axis
This is equivalent to (but much faster than):</p>
<pre><code>mat4.identity(dest);
mat4.rotateX(dest, dest, rad);
</code></pre></dd>
<dt><a href="#fromYRotation">fromYRotation(out, rad)</a> ⇒ <code>mat4</code></dt>
<dd><p>Creates a matrix from the given angle around the Y axis
This is equivalent to (but much faster than):</p>
<pre><code>mat4.identity(dest);
mat4.rotateY(dest, dest, rad);
</code></pre></dd>
<dt><a href="#fromZRotation">fromZRotation(out, rad)</a> ⇒ <code>mat4</code></dt>
<dd><p>Creates a matrix from the given angle around the Z axis
This is equivalent to (but much faster than):</p>
<pre><code>mat4.identity(dest);
mat4.rotateZ(dest, dest, rad);
</code></pre></dd>
<dt><a href="#identity">identity(out)</a> ⇒ <code>mat4</code></dt>
<dd><p>Set a mat4 to the identity matrix</p>
</dd>
<dt><a href="#isMirroring">isMirroring(mat)</a> ⇒ <code>boolean</code></dt>
<dd><p>determine whether the input matrix is a mirroring transformation</p>
</dd>
<dt><a href="#leftMultiplyVec2">leftMultiplyVec2(vector, matrix)</a> ⇒ <code>vec2</code></dt>
<dd><p>Multiply the input matrix by a Vector2 (interpreted as 2 column, 1 row)
(result = v*M)
Fourth element is set to 1</p>
</dd>
<dt><a href="#lefttMultiplyVec3">lefttMultiplyVec3(vector, matrix)</a> ⇒ <code>vec3</code></dt>
<dd><p>Multiply the input matrix by a Vector3 (interpreted as 3 column, 1 row)
(result = v*M)
Fourth element is set to 1</p>
</dd>
<dt><a href="#mirror">mirror(out, v, a)</a> ⇒ <code>mat4</code></dt>
<dd><p>m the mat4 by the dimensions in the given vec3
create an affine matrix for mirroring into an arbitrary plane:</p>
</dd>
<dt><a href="#mirrorByPlane">mirrorByPlane([out], plane)</a> ⇒ <code>mat4</code></dt>
<dd><p>Create an affine matrix for mirroring onto an arbitrary plane</p>
</dd>
<dt><a href="#multiply">multiply(out, a, b)</a> ⇒ <code>mat4</code></dt>
<dd><p>Multiplies two mat4&#39;s</p>
</dd>
<dt><a href="#rightMultiplyVec2">rightMultiplyVec2(vector, matrix)</a> ⇒ <code>vec2</code></dt>
<dd><p>Multiply the input matrix by a Vector2 (interpreted as 2 row, 1 column)
(result = M*v)
Fourth element is set to 1</p>
</dd>
<dt><a href="#rightMultiplyVec3">rightMultiplyVec3(vector, matrix)</a> ⇒ <code>vec3</code></dt>
<dd><p>Multiply the input matrix by a Vector3 (interpreted as 3 row, 1 column)
(result = M*v)
Fourth element is set to 1</p>
</dd>
<dt><a href="#rotate">rotate(out, rad, axis, matrix)</a> ⇒ <code>mat4</code></dt>
<dd><p>Rotates a mat4 by the given angle</p>
</dd>
<dt><a href="#rotateX">rotateX(out, angle, matrix)</a> ⇒ <code>mat4</code></dt>
<dd><p>Rotates a matrix by the given angle around the X axis</p>
</dd>
<dt><a href="#rotateY">rotateY(out, angle, matrix)</a> ⇒ <code>mat4</code></dt>
<dd><p>Rotates a matrix by the given angle around the Y axis</p>
</dd>
<dt><a href="#rotateZ">rotateZ(out, angle, matrix)</a> ⇒ <code>mat4</code></dt>
<dd><p>Rotates a matrix by the given angle around the Y axis</p>
</dd>
<dt><a href="#scale">scale(out, vector, matrix)</a> ⇒ <code>mat4</code></dt>
<dd><p>Scales the mat4 by the dimensions in the given vec3</p>
</dd>
<dt><a href="#subtract">subtract(out, a, b)</a> ⇒ <code>mat4</code></dt>
<dd><p>Subtracts matrix b from matrix a</p>
</dd>
<dt><a href="#translate">translate(out, vector, matrix)</a> ⇒ <code>mat4</code></dt>
<dd><p>Translate matrix mat4 by the given vector</p>
</dd>
<dt><a href="#equals">equals()</a> ⇒ <code>boolean</code></dt>
<dd><p>Compare the given planes for equality</p>
</dd>
<dt><a href="#flip">flip([out], vec)</a> ⇒ <code>vec4</code></dt>
<dd><p>Flip the given plane (vec4)</p>
</dd>
<dt><a href="#fromNormalAndPoint">fromNormalAndPoint(normal, point-)</a> ⇒ <code>Array</code></dt>
<dd><p>Create a new plane from the given normal and point values</p>
</dd>
<dt><a href="#fromObject">fromObject()</a></dt>
<dd><p>Create a new plane from an untyped object with identical properties</p>
</dd>
<dt><a href="#fromPoints">fromPoints(a, b, c)</a> ⇒ <code>Vec4</code></dt>
<dd><p>Create a new plane from the given points</p>
</dd>
<dt><a href="#fromPointsRandom">fromPointsRandom(a, b, c)</a> ⇒ <code>Vec4</code></dt>
<dd><p>Create a new plane from the given points like fromPoints, 
but allow the vectors to be on one point or one line
in such a case a random plane through the given points is constructed</p>
</dd>
<dt><a href="#signedDistanceToPoint">signedDistanceToPoint()</a> ⇒ <code>Number</code></dt>
<dd><p>Calculate the distance to the given point</p>
</dd>
<dt><a href="#splitLineSegmentByPlane">splitLineSegmentByPlane()</a> ⇒ <code>vec3</code></dt>
<dd><p>Split the given line by the given plane.
Robust splitting, even if the line is parallel to the plane</p>
</dd>
<dt><a href="#transform">transform()</a> ⇒ <code>Array</code></dt>
<dd><p>Transform the given plane using the given matrix</p>
</dd>
<dt><a href="#abs">abs([out], vec)</a> ⇒ <code>vec2</code></dt>
<dd><p>Calculates the absolute value of the give vector</p>
</dd>
<dt><a href="#add">add(out, a, b)</a> ⇒ <code>vec2</code></dt>
<dd><p>Adds two vec2&#39;s</p>
</dd>
<dt><a href="#clone">clone([out], vec)</a> ⇒ <code>vec2</code></dt>
<dd><p>Creates a new vec2 initialized with values from an existing vector</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>vec2</code></dt>
<dd><p>Creates a new, empty vec2</p>
</dd>
<dt><a href="#cross">cross(out, a, b)</a> ⇒ <code>vec3</code></dt>
<dd><p>Computes the cross product (3D) of two vectors</p>
</dd>
<dt><a href="#distance">distance(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the euclidian distance between two vec2&#39;s</p>
</dd>
<dt><a href="#divide">divide(out, a, b)</a> ⇒ <code>vec2</code></dt>
<dd><p>Divides two vec2&#39;s</p>
</dd>
<dt><a href="#dot">dot(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the dot product of two vec2&#39;s</p>
</dd>
<dt><a href="#fromArray">fromArray(data)</a> ⇒ <code>vec2</code></dt>
<dd><p>Creates a new vec2 initialized with the values in the given array
any value at an index &gt; 1 is ignored !</p>
</dd>
<dt><a href="#fromScalar">fromScalar(scalar)</a> ⇒ <code>Vec2</code></dt>
<dd><p>Create a vec2 from a single scalar value</p>
</dd>
<dt><a href="#fromValues">fromValues(x, y)</a> ⇒ <code>vec2</code></dt>
<dd><p>Creates a new vec2 initialized with the given values</p>
</dd>
<dt><a href="#fromVarious">fromVarious()</a></dt>
<dd></dd>
<dt><a href="#length">length(a)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the length of a vec2</p>
</dd>
<dt><a href="#lerp">lerp(out, t, a, b)</a> ⇒ <code>vec2</code></dt>
<dd><p>Performs a linear interpolation between two vec2&#39;s</p>
</dd>
<dt><a href="#max">max(out, a, b)</a> ⇒ <code>vec2</code></dt>
<dd><p>Returns the maximum of two vec2&#39;s</p>
</dd>
<dt><a href="#min">min(out, a, b)</a> ⇒ <code>vec2</code></dt>
<dd><p>Returns the minimum of two vec2&#39;s</p>
</dd>
<dt><a href="#multiply">multiply(out, a, b)</a> ⇒ <code>vec2</code></dt>
<dd><p>Multiplies two vec2&#39;s</p>
</dd>
<dt><a href="#negate">negate(out, a)</a> ⇒ <code>vec2</code></dt>
<dd><p>Negates the components of a vec2</p>
</dd>
<dt><a href="#normal">normal([out], vec)</a> ⇒ <code>vec2</code></dt>
<dd><p>Calculates the normal value of the give vector
The normal value is the given vector rotated 90 degress.</p>
</dd>
<dt><a href="#normalize">normalize(out, a)</a> ⇒ <code>vec2</code></dt>
<dd><p>Normalize the given vector.</p>
</dd>
<dt><a href="#rotate">rotate(out, angle, vector)</a> ⇒ <code>vec2</code></dt>
<dd><p>Rotates a vec2 by an angle</p>
</dd>
<dt><a href="#scale">scale(out, amount, vector)</a> ⇒ <code>vec2</code></dt>
<dd><p>Scales a vec2 by a scalar number</p>
</dd>
<dt><a href="#squaredDistance">squaredDistance(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the squared euclidian distance between two vec2&#39;s</p>
</dd>
<dt><a href="#squaredLength">squaredLength(a)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the squared length of a vec2</p>
</dd>
<dt><a href="#subtract">subtract(out, a, b)</a> ⇒ <code>vec2</code></dt>
<dd><p>Subtracts vector b from vector a</p>
</dd>
<dt><a href="#transform">transform(out, matrix, vector)</a> ⇒ <code>vec2</code></dt>
<dd><p>Transforms the vec2 with a mat4
3rd vector component is implicitly &#39;0&#39;
4th vector component is implicitly &#39;1&#39;</p>
</dd>
<dt><a href="#abs">abs([out], vec)</a> ⇒ <code>vec3</code></dt>
<dd><p>Calculates the absolute value of the give vector</p>
</dd>
<dt><a href="#add">add(out, a, b)</a> ⇒ <code>vec3</code></dt>
<dd><p>Adds two vec3&#39;s</p>
</dd>
<dt><a href="#angle">angle(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>Get the angle between two 3D vectors</p>
</dd>
<dt><a href="#clone">clone([out], vec)</a> ⇒ <code>vec3</code></dt>
<dd><p>Create a clone of the given vector</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>vec3</code></dt>
<dd><p>Creates a new, empty vec3</p>
</dd>
<dt><a href="#cross">cross(out, a, b)</a> ⇒ <code>vec3</code></dt>
<dd><p>Computes the cross product of two vec3&#39;s</p>
</dd>
<dt><a href="#distance">distance(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the euclidian distance between two vec3&#39;s</p>
</dd>
<dt><a href="#divide">divide(out, a, b)</a> ⇒ <code>vec3</code></dt>
<dd><p>Divides two vec3&#39;s</p>
</dd>
<dt><a href="#dot">dot(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the dot product of two vec3&#39;s</p>
</dd>
<dt><a href="#fromArray">fromArray(data)</a> ⇒ <code>vec3</code></dt>
<dd><p>Creates a new vec3 initialized with the values in the given array</p>
</dd>
<dt><a href="#fromScalar">fromScalar(scalar)</a> ⇒ <code>Vec3</code></dt>
<dd><p>create a vec3 from a single scalar value
all components of the resulting vec3 have the value of the
input scalar</p>
</dd>
<dt><a href="#fromValues">fromValues(x, y, z)</a> ⇒ <code>vec3</code></dt>
<dd><p>Creates a new vec3 initialized with the given values</p>
</dd>
<dt><a href="#fromVarious">fromVarious()</a></dt>
<dd><p>Represents a 3D vector with X, Y, Z coordinates.</p>
</dd>
<dt><a href="#length">length(a)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the length of a vec3</p>
</dd>
<dt><a href="#lerp">lerp(out, t, a, b)</a> ⇒ <code>vec3</code></dt>
<dd><p>Performs a linear interpolation between two vec3&#39;s</p>
</dd>
<dt><a href="#max">max(out, a, b)</a> ⇒ <code>vec3</code></dt>
<dd><p>Returns the maximum of two vec3&#39;s</p>
</dd>
<dt><a href="#min">min(out, a, b)</a> ⇒ <code>vec3</code></dt>
<dd><p>Returns the minimum of two vec3&#39;s</p>
</dd>
<dt><a href="#multiply">multiply(out, a, b)</a> ⇒ <code>vec3</code></dt>
<dd><p>Multiplies two vec3&#39;s</p>
</dd>
<dt><a href="#negate">negate(out, a)</a> ⇒ <code>vec3</code></dt>
<dd><p>Negates the components of a vec3</p>
</dd>
<dt><a href="#normalize">normalize(out, a)</a> ⇒ <code>vec3</code></dt>
<dd><p>Normalize a vec3</p>
</dd>
<dt><a href="#rotate">rotate(out, vector)</a> ⇒ <code>vec3</code></dt>
<dd><p>Rotate vector 3D vector around the all 3 axes in the order x-axis , yaxis, z axis</p>
</dd>
<dt><a href="#rotateX">rotateX(out, angle, origin, vector)</a> ⇒ <code>vec3</code></dt>
<dd><p>Rotate vector 3D vector around the x-axis</p>
</dd>
<dt><a href="#rotateY">rotateY(out, angle, origin, vector)</a> ⇒ <code>vec3</code></dt>
<dd><p>Rotate vector 3D vector around the y-axis</p>
</dd>
<dt><a href="#rotateZ">rotateZ(out, angle, origin, vector)</a> ⇒ <code>vec3</code></dt>
<dd><p>Rotate vector 3D vector around the z-axis</p>
</dd>
<dt><a href="#scale">scale(out, amount, vector)</a> ⇒ <code>vec3</code></dt>
<dd><p>Scales a vec3 by a scalar number</p>
</dd>
<dt><a href="#squaredDistance">squaredDistance(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the squared euclidian distance between two vec3&#39;s</p>
</dd>
<dt><a href="#squaredLength">squaredLength(a)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the squared length of a vec3</p>
</dd>
<dt><a href="#subtract">subtract(out, a, b)</a> ⇒ <code>vec3</code></dt>
<dd><p>Subtracts vector b from vector a</p>
</dd>
<dt><a href="#transform">transform([params[0]], params[1, params[2)</a> ⇒ <code>vec3</code></dt>
<dd><p>Transforms the given vec3 with the given mat4.
4th vector component is implicitly &#39;1&#39;</p>
</dd>
<dt><a href="#unit">unit([out], vector)</a> ⇒ <code>vec3</code></dt>
<dd><p>Calculates the unit vector of the given vector</p>
</dd>
<dt><a href="#clone">clone([out], vector)</a> ⇒ <code>vec4</code></dt>
<dd><p>Create a clone of the given vector</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>vec4</code></dt>
<dd><p>Creates a new vec4 initialized to zero</p>
</dd>
<dt><a href="#dot">dot(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the dot product of two vec4&#39;s</p>
</dd>
<dt><a href="#fromScalar">fromScalar(scalar)</a> ⇒ <code>vec4</code></dt>
<dd><p>Create a new vec4 from the given scalar value (single)</p>
</dd>
<dt><a href="#fromValues">fromValues(x, y, z, w)</a> ⇒ <code>vec4</code></dt>
<dd><p>Creates a new vec4 initialized with the given values</p>
</dd>
<dt><a href="#toString">toString(a)</a> ⇒ <code>String</code></dt>
<dd><p>Convert the given vec4 to a representative string</p>
</dd>
<dt><a href="#transform">transform(out, matrix, vector)</a> ⇒ <code>vec4</code></dt>
<dd><p>Transform the given vec4 using the given mat4</p>
</dd>
<dt><a href="#fromFakePolygons">fromFakePolygons()</a></dt>
<dd><p>Convert the given polygons to a list of sides.
The polygons must have only z coordinates +1 and -1, as constructed by to3DWalls().</p>
</dd>
<dt><a href="#intersect">intersect(...geometries)</a> ⇒ <code>geom2</code> | <code>geom3</code></dt>
<dd><p>Return a new geometry representing space in both the first geometry and
all subsequent geometries.
Note: None of the given geometries are modified.</p>
</dd>
<dt><a href="#intersect">intersect(...geometries)</a> ⇒ <code>geom3</code></dt>
<dd><p>Return a new 3D geometry representing space in both the first geometry and
in the subsequent geometries. None of the given geometries are modified.</p>
</dd>
<dt><a href="#intersectGeom3Sub">intersectGeom3Sub(geometry1, geometry2)</a> ⇒ <code>geom3</code></dt>
<dd><p>Return a new 3D geometry representing the space in both the first geometry and
the second geometry. None of the given geometries are modified.</p>
</dd>
<dt><a href="#mayOverlap">mayOverlap(geometry1, geometry2)</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if the given geometries overlap by comparing min and max bounds.
NOTE: This is used in union for performace gains.</p>
</dd>
<dt><a href="#reTesselateCoplanarPolygons">reTesselateCoplanarPolygons(sourcepolygons)</a> ⇒ <code>Array.&lt;poly3&gt;</code></dt>
<dd><p>Retesselation for a set of COPLANAR polygons.</p>
</dd>
<dt><a href="#subtract">subtract(...geometries)</a> ⇒ <code>geom2</code> | <code>geom3</code></dt>
<dd><p>Return a new geometry representing space in the first geometry but
not in all subsequent geometries.
Note: None of the given geometries are modified.</p>
</dd>
<dt><a href="#subtract">subtract(...geometries)</a> ⇒ <code>geom3</code></dt>
<dd><p>Return a new 3D geometry representing space in this geometry but not in the given geometries.
Neither this geometry nor the given geometries are modified.</p>
</dd>
<dt><a href="#subtractGeom3Sub">subtractGeom3Sub(geometry1, geometry2)</a> ⇒ <code>geom3</code></dt>
<dd><p>Return a new 3D geometry representing the space in the first geometry but not
in the second geometry. None of the given geometries are modified.</p>
</dd>
<dt><a href="#to3DWalls">to3DWalls(options, geometry)</a> ⇒ <code>geom3</code></dt>
<dd><p>Create a 3D geometry with walls, as constructed from the given options and geometry.</p>
</dd>
<dt><a href="#union">union(...geometries)</a> ⇒ <code>geom2</code> | <code>geom3</code></dt>
<dd><p>Return a new geometry representing the total space in the given geometries.
NOTE: None of the given geometries are modified.</p>
</dd>
<dt><a href="#union">union(...geometries)</a> ⇒ <code>geom3</code></dt>
<dd><p>Return a new 3D geometry representing the space in the given 3D geometries.</p>
</dd>
<dt><a href="#unionSub">unionSub(geometry1, geometry2)</a> ⇒ <code>goem3</code></dt>
<dd><p>Return a new 3D geometry representing the space in the given geometries.</p>
</dd>
<dt><a href="#expand">expand(options, objects)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Expand the given object(s) using the given options (if any)</p>
</dd>
<dt><a href="#expandGeom2">expandGeom2(options, geometry)</a> ⇒ <code>geom2</code></dt>
<dd><p>Expand the given geometry (geom2) using the given options (if any).</p>
</dd>
<dt><a href="#expandGeom3">expandGeom3(options, geometry)</a> ⇒ <code>geom3</code></dt>
<dd><p>Expand the given geometry (geom3) using the given options (if any).</p>
</dd>
<dt><a href="#expandPath2">expandPath2(options, geometry)</a> ⇒ <code>geom2</code></dt>
<dd><p>Expand the given geometry (path2) using the given options (if any).</p>
</dd>
<dt><a href="#expandShell">expandShell(delta, segments)</a></dt>
<dd><p>Create the expanded shell of the solid:
All faces are extruded to 2 times delta
Cylinders are constructed around every side
Spheres are placed on every vertex
the result is a true expansion of the solid</p>
</dd>
<dt><a href="#offset">offset(options, objects)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Create offset geometry(s) from the given object(s) using the given options (if any).</p>
</dd>
<dt><a href="#offsetFromPoints">offsetFromPoints(options, points)</a> ⇒ <code>Array</code></dt>
<dd><p>Create a set of offset points from the given points using the given options (if any).</p>
</dd>
<dt><a href="#hull">hull(...geometries)</a> ⇒ <code>geometry</code></dt>
<dd><p>Create a convex hull of the given geometries.</p>
</dd>
<dt><a href="#hullChain">hullChain(...geometries)</a> ⇒ <code>geometry</code></dt>
<dd><p>Create a chain of hulled geometries from the given gemetries.
Essentially hull A+B, B+C, C+D, etc., then union the results.</p>
</dd>
<dt><a href="#hullPoints2">hullPoints2(uniquepoints)</a> ⇒ <code>Array</code></dt>
<dd><p>Create a convex hull of the given set of points,  where each point is an array of [x,y].</p>
</dd>
<dt><a href="#measureArea">measureArea(...geometries)</a> ⇒ <code>Number</code> | <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Measure the area of the given geometry(s).</p>
</dd>
<dt><a href="#measureBounds">measureBounds(...geometries)</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Measure the min and max bounds of the given geometry(s),
where min and max bounds are an array of [x,y,z]</p>
</dd>
<dt><a href="#measureVolume">measureVolume(...geometries)</a> ⇒ <code>Number</code> | <code>Array.&lt;Number&gt;</code></dt>
<dd><p>Measure the volume of the given geometry(s).</p>
</dd>
<dt><a href="#center">center([options], geometries)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Center the given object(s) using the given options (if any)</p>
</dd>
<dt><a href="#mirror">mirror(options, objects)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Mirror the given object(s) using the given options (if any)
Note: The normal should be given as 90 degrees from the plane origin.</p>
</dd>
<dt><a href="#rotate">rotate(angles, objects)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Rotate the given object(s) using the given options (if any)</p>
</dd>
<dt><a href="#scale">scale(factors, objects)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Scale the given object(s) using the given options (if any)</p>
</dd>
<dt><a href="#transform">transform(matrix, objects)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Transform the given object(s) using the given matrix</p>
</dd>
<dt><a href="#translate">translate(offsets, objects)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>Translate the given object(s) using the given options (if any)</p>
</dd>
<dt><a href="#arc">arc(options)</a> ⇒ <code>path</code></dt>
<dd><p>Construct an arc.</p>
</dd>
<dt><a href="#cuboid">cuboid([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct an axis-aligned solid cuboid.</p>
</dd>
<dt><a href="#cube">cube([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct an axis-aligned solid cube with six square faces.</p>
</dd>
<dt><a href="#cylinderElliptic">cylinderElliptic([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct an elliptic cylinder.</p>
</dd>
<dt><a href="#cylinder">cylinder([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct a solid cylinder.</p>
</dd>
<dt><a href="#ellipse">ellipse([options])</a> ⇒ <code>geom2</code></dt>
<dd><p>Construct an ellispe.</p>
</dd>
<dt><a href="#circle">circle([options])</a> ⇒ <code>geom2</code></dt>
<dd><p>Construct a circle where are points are at the same distance from the center.</p>
</dd>
<dt><a href="#ellipsoid">ellipsoid([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct an ellipsoid.</p>
</dd>
<dt><a href="#sphere">sphere([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct a sphere where are points are at the same distance from the center.</p>
</dd>
<dt><a href="#geodesicSphere">geodesicSphere([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct a geodesic sphere based on icosahedron symmetry.</p>
</dd>
<dt><a href="#line">line(points)</a> ⇒ <code>path2</code></dt>
<dd><p>Create a new line (path) from the given points.
The points must be provided as an array, where each element is an array of two numbers.</p>
</dd>
<dt><a href="#polygon">polygon(options)</a> ⇒ <code>geom2</code></dt>
<dd><p>Construct a polygon from a list of points, or list of points and paths.
NOTE: The ordering of points is VERY IMPORTANT.</p>
</dd>
<dt><a href="#polyhedron">polyhedron(options)</a> ⇒ <code>geom3</code></dt>
<dd><p>Create a polyhedron from the given set of points and faces.
The faces can define outward or inward facing polygons (orientation).
However, each face must define a counter clockwise rotation of points which follows the right hand rule.</p>
</dd>
<dt><a href="#rectangle">rectangle([options])</a> ⇒ <code>geom2</code></dt>
<dd><p>Construct an axis-aligned rectangle with four sides and four 90-degree angles.</p>
</dd>
<dt><a href="#square">square([options])</a> ⇒ <code>geom2</code></dt>
<dd><p>Construct an axis-aligned square with four equal sides and four 90-degree angles.</p>
</dd>
<dt><a href="#roundedCuboid">roundedCuboid([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct an axis-aligned solid rounded cuboid.</p>
</dd>
<dt><a href="#roundedCylinder">roundedCylinder([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct a cylinder with rounded ends.</p>
</dd>
<dt><a href="#roundedRectangle">roundedRectangle([options])</a> ⇒ <code>geom2</code></dt>
<dd><p>Construct a rounded rectangle.</p>
</dd>
<dt><a href="#star">star([options])</a></dt>
<dd><p>Construct a star from the given options.</p>
</dd>
<dt><a href="#torus">torus([options])</a> ⇒ <code>geom3</code></dt>
<dd><p>Construct a torus by revolving a small circle (inner) about the circumference of a large (outer) circle.</p>
</dd>
<dt><a href="#vectorChar">vectorChar([options], [char])</a> ⇒ <code><a href="#VectorCharObject">VectorCharObject</a></code></dt>
<dd><p>Construct a <a href="#VectorCharObject">VectorCharObject</a> from a ascii character whose code is between 31 and 127,
if the character is not supported it is replaced by a question mark.</p>
</dd>
<dt><a href="#vectorText">vectorText([options], [text])</a> ⇒ <code>Array</code></dt>
<dd><p>Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
if one character is not supported it is replaced by a question mark.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#VectorCharObject">VectorCharObject</a> : <code>Object</code></dt>
<dd><p>Represents a character as segments</p>
</dd>
<dt><a href="#VectorCharObject">VectorCharObject</a> : <code>Object</code></dt>
<dd><p>Represents a character as segments</p>
</dd>
</dl>

<a name="spatialResolution"></a>

## spatialResolution
The resolution of space, currently one hundred nanometers.
 This should be 1 / EPS.

**Kind**: global constant  
**Default**: <code>100000</code>  
<a name="EPS"></a>

## EPS
Epsilon used during determination of near zero distances.
 This should be 1 / spacialResolution.

**Kind**: global constant  
**Default**: <code>0.00001</code>  
<a name="color"></a>

## color(color, objects) ⇒ <code>Object</code> \| <code>Array</code>
Apply the given color to the given objects.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - the same objects with an additional attribute 'color'  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>Array</code> | color values, where each value is between 0 and 1.0 |
| objects | <code>Object</code> \| <code>Array</code> | the objects of which to color |

**Example**  
```js
let redSphere = color([1,0,0], sphere()) // red
let greenCircle = color([0,1,0], circle()) // green
let blueArc = color([0,0,1], arc()) // blue
```
<a name="colorNameToRgb"></a>

## colorNameToRgb(String) ⇒
Converts a CSS color name to RGB color.

**Kind**: global function  
**Returns**: Array - the RGB color, or undefined if not found  

| Param | Description |
| --- | --- |
| String | s - the CSS color name |

**Example**  
```js
let mysphere = color(colorNameToRgb('lightblue'), sphere())
```
<a name="hexToRgb"></a>

## hexToRgb(notation) ⇒ <code>Array</code>
Converts CSS color notations (string of hex values) to RGB values.

**Kind**: global function  
**Returns**: <code>Array</code> - RGB color values  
**See**: https://www.w3.org/TR/css-color-3/  

| Param | Type | Description |
| --- | --- | --- |
| notation | <code>String</code> | color notation |

**Example**  
```js
let mysphere = color(hexToRgb('#000080'), sphere()) // navy blue
```
<a name="hslToRgb"></a>

## hslToRgb(values) ⇒ <code>Array</code>
Converts HSL color values to RGB color values.

**Kind**: global function  
**Returns**: <code>Array</code> - RGB color values  
**See**: http://en.wikipedia.org/wiki/HSL_color_space.  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | HSL color values |

**Example**  
```js
let mysphere = color(hslToRgb([0.9166666666666666, 1, 0.5]), sphere())
```
<a name="hsvToRgb"></a>

## hsvToRgb(values) ⇒ <code>Array</code>
Converts HSV color values to RGB color values.

**Kind**: global function  
**Returns**: <code>Array</code> - RGB color values  
**See**: http://en.wikipedia.org/wiki/HSV_color_space.  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | HSV color values |

**Example**  
```js
let mysphere = color(hsvToRgb([0.9166666666666666, 1, 1]), sphere())
```
<a name="hueToColorComponent"></a>

## hueToColorComponent(p, q, t)
convert hue values to a color component (ie one of r, g, b)

**Kind**: global function  

| Param |
| --- |
| p | 
| q | 
| t | 

<a name="rgbToHex"></a>

## rgbToHex(values) ⇒ <code>String</code>
Convert the given RGB color values to CSS color notation (string)

**Kind**: global function  
**Returns**: <code>String</code> - CSS color notation  
**See**: https://www.w3.org/TR/css-color-3/  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | RGB color values |

<a name="rgbToHsl"></a>

## rgbToHsl(values) ⇒
Converts an RGB color value to HSL.

**Kind**: global function  
**Returns**: Array HSL color values  
**See**

- http://en.wikipedia.org/wiki/HSL_color_space.
- http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c


| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | RGB color values |

<a name="rgbToHsv"></a>

## rgbToHsv(values) ⇒
Converts an RGB color value to HSV.

**Kind**: global function  
**Returns**: Array HSV color values  
**See**: http://en.wikipedia.org/wiki/HSV_color_space.  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | RGB color values |

<a name="create"></a>

## create()
Create a new connector.
A connector allows two objects to be connected at predefined positions.

For example a servo motor and a servo horn can both have a connector called 'shaft'.
The horn can be moved and rotated to any position, and then the servo horn
is attached to the servo motor at the proper position, such that the two connectors match.
Connectors are children of the solid, transform-wise, so transformations are applied
to both solid and connector(s).  (parent => child relationship)

**Kind**: global function  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| point | <code>vec3</code> | the position of the connector (relative to its parent) |
| axis | <code>vec3</code> | the direction (unit vector) of the connector |
| normal | <code>vec3</code> | the direction (unit vector) perpendicular to axis, that defines the "12 o'clock" orientation of the connector |

**Example**  
```js
let myconnector = create()
```
<a name="extend"></a>

## extend(distance, connector) ⇒ <code>Connector</code>
Creates a new Connector, with the connection point moved in the direction of the axis

**Kind**: global function  
**Returns**: <code>Connector</code> - a normalized connector  

| Param | Type | Description |
| --- | --- | --- |
| distance | <code>Number</code> | the distance to extend the connector to |
| connector | <code>Connector</code> | the connector to extend |

<a name="fromPointAxisNormal"></a>

## fromPointAxisNormal(point, axis, normal) ⇒ <code>connector</code>
Create a connector from the given point, axis and normal.

**Kind**: global function  
**Returns**: <code>connector</code> - a new connector  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>vec3</code> | the point of the connector, relative to the parent geometry |
| axis | <code>vec3</code> | the axis (directional vector) of the connector |
| normal | <code>vec3</code> | the normal (directional vector) of the connector, perpendicular to the axis |

<a name="normalize"></a>

## normalize(connector) ⇒ <code>Connector</code>
Normalize the given connector, calculating new axis and normal

**Kind**: global function  
**Returns**: <code>Connector</code> - a new connector  

| Param | Type | Description |
| --- | --- | --- |
| connector | <code>Connector</code> | the connector to normalize |

<a name="toString"></a>

## toString(connector) ⇒ <code>string</code>
Return a string representing the given connector.

**Kind**: global function  
**Returns**: <code>string</code> - string representation  

| Param | Type | Description |
| --- | --- | --- |
| connector | <code>connector</code> | the connector of reference |

<a name="transform"></a>

## transform(matrix, connector) ⇒ <code>connector</code>
Transform the give connector using the given matrix.

**Kind**: global function  
**Returns**: <code>connector</code> - a new connector  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>mat4</code> | a transform matrix |
| connector | <code>connector</code> | the connector to transform |

<a name="transformationBetween"></a>

## transformationBetween(options, from, to) ⇒ <code>mat4</code>
Get the transformation matrix that connects the given connectors.

**Kind**: global function  
**Returns**: <code>mat4</code> - - the matrix that transforms (connects) one connector to another  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.mirror | <code>Boolean</code> | <code>false</code> | the 'axis' vectors should point in the same direction  true: the 'axis' vectors should point in opposite direction |
| options.normalRotation | <code>Number</code> | <code>0</code> | : the angle (RADIANS) of rotation between the 'normal' vectors |
| from | <code>connector</code> |  | connector from which to connect |
| to | <code>connector</code> |  | connector to which to connected |

<a name="applyTransforms"></a>

## applyTransforms(geometry) ⇒ <code>geom2</code>
Apply the transforms of the given geometry.
NOTE: This function must be called BEFORE exposing any data. See toSides.

**Kind**: global function  
**Returns**: <code>geom2</code> - the given geometry  

| Param | Type | Description |
| --- | --- | --- |
| geometry | <code>geom2</code> | the geometry to transform |

**Example**  
```js
geometry = applyTransforms(geometry)
```
<a name="clone"></a>

## clone() ⇒ <code>geom2</code>
Performs a deep clone of the given geometry.

**Kind**: global function  
**Returns**: <code>geom2</code> - new geometry  
**Params**: <code>geom2</code> geometry - the geometry to clone  
<a name="create"></a>

## create([sides]) ⇒ <code>geom2</code>
Create a new 2D geometry composed of unordered sides (two connected points).

**Kind**: global function  
**Returns**: <code>geom2</code> - a new empty geometry  

| Param | Type | Description |
| --- | --- | --- |
| [sides] | <code>Array</code> | list of sides where each side is an array of two points |

<a name="fromPoints"></a>

## fromPoints(points) ⇒ <code>geom2</code>
Create a new 2D geometry from the given points.
The direction (rotation) of the points is not relevant,
as the points can define a convex or a concave polygon.
The geometry must not self intersect, i.e. the sides cannot cross.

**Kind**: global function  
**Returns**: <code>geom2</code> - a new geometry  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array</code> | list of points in 2D space where each point is an array of two values |

<a name="isA"></a>

## isA() ⇒ <code>true</code>
Determin if the given object is a 2D geometry.

**Kind**: global function  
**Returns**: <code>true</code> - if the object matches a geom2 based object  
**Params**: <code>geom2</code> object - the object to interogate  
<a name="reverse"></a>

## reverse(geometry) ⇒ <code>geom2</code>
Reverses the given geometry so that the sides are flipped and in the opposite order.
This swaps the left (interior) and right (exterior) edges.

**Kind**: global function  
**Returns**: <code>geom2</code> - the new reversed geometry  

| Param | Type | Description |
| --- | --- | --- |
| geometry | <code>geom2</code> | the geometry to reverse |

**Example**  
```js
let newgeometry = reverse(geometry)
```
<a name="toOutlines"></a>

## toOutlines(geometry) ⇒ <code>Array</code>
Create the outline(s) of the given geometry.

**Kind**: global function  
**Returns**: <code>Array</code> - an array of outlines, where each outline is an array of ordered points  

| Param | Type |
| --- | --- |
| geometry | <code>geom2</code> | 

**Example**  
```js
let geometry = subtract(rectangle({size: [5, 5]}), rectangle({size: [3, 3]}))
let outlines = toOutlines(geometry) // returns two outlines
```
<a name="toPoints"></a>

## toPoints(geometry) ⇒ <code>Array</code>
Produces an array of points from the given geometry.
NOTE: The points returned do NOT define an order. Use toOutlines() for ordered points.

**Kind**: global function  
**Returns**: <code>Array</code> - an array of points, each point contains an array of two numbers  

| Param | Type | Description |
| --- | --- | --- |
| geometry | <code>geom2</code> | the geometry |

**Example**  
```js
let sharedpoints = toPoints(geometry)
```
<a name="toSides"></a>

## toSides(geometry) ⇒ <code>Array</code>
Produces an array of sides from the given geometry.
The returned array should not be modified as the data is shared with the geometry.

**Kind**: global function  
**Returns**: <code>Array</code> - an array of sides, each side contains an array of two points  

| Param | Type | Description |
| --- | --- | --- |
| geometry | <code>geom2</code> | the geometry |

**Example**  
```js
let sharedsides = toSides(geometry)
```
<a name="toString"></a>

## toString() ⇒ <code>String</code>
Create a string representing the contents of the given geometry.

**Kind**: global function  
**Returns**: <code>String</code> - a representive string  
**Example**  
```js
console.out(toString(geometry))
```
<a name="transform"></a>

## transform(matrix, geometry) ⇒ <code>geom2</code>
Transform the given geometry using the given matrix.
This is a lazy transform of the sides, as this function only adjusts the transforms.
The transforms are applied when accessing the sides via toSides().

**Kind**: global function  
**Returns**: <code>geom2</code> - - the transformed geometry  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>mat4</code> | the matrix to transform with |
| geometry | <code>geom2</code> | the geometry to transform |

**Example**  
```js
let newgeometry = transform(fromZRotation(degToRad(90)), geometry)
```
<a name="applyTransforms"></a>

## applyTransforms(geometry) ⇒ <code>geom3</code>
Apply the transforms of the given geometry.
NOTE: This function must be called BEFORE exposing any data. See toPolygons.

**Kind**: global function  
**Returns**: <code>geom3</code> - the given geometry  

| Param | Type | Description |
| --- | --- | --- |
| geometry | <code>geom3</code> | the geometry to transform |

**Example**  
```js
geometry = applyTransforms(geometry)
```
<a name="clone"></a>

## clone() ⇒ <code>geom3</code>
Performs a deep clone of the given geometry.

**Kind**: global function  
**Returns**: <code>geom3</code> - a new geometry  
**Params**: <code>geom3</code> geometry - the geometry to clone  
<a name="create"></a>

## create() ⇒ <code>geom3</code>
Create a new 3D geometry composed of polygons.

**Kind**: global function  
**Returns**: <code>geom3</code> - - a new geometry  
<a name="fromPoints"></a>

## fromPoints(listofpoints) ⇒ <code>geom2</code>
Construct a new 3D geometry from a list of points.
The list of points should contain sub-arrays, each defining a single polygon of points.
In addition, the points should follow the right-hand rule for rotation in order to
define an external facing polygon. The opposite is true for internal facing polygon.

**Kind**: global function  
**Returns**: <code>geom2</code> - a new geometry  

| Param | Type | Description |
| --- | --- | --- |
| listofpoints | <code>Array.&lt;Array&gt;</code> | list of points in 3D space |

<a name="isA"></a>

## isA() ⇒ <code>true</code>
Determin if the given object is a 3D geometry.

**Kind**: global function  
**Returns**: <code>true</code> - if the object matches a geom3 based object  
**Params**: <code>object</code> object - the object to interogate  
<a name="toString"></a>

## toString() ⇒ <code>String</code>
Create a string representing the contents of the given geometry.

**Kind**: global function  
**Returns**: <code>String</code> - a representive string  
**Example**  
```js
console.out(toString(geometry))
```
<a name="transform"></a>

## transform(matrix, geometry) ⇒ <code>geom3</code>
Transform the given geometry using the given matrix.
This is a lazy transform of the polygons, as this function only adjusts the transforms.
See applyTransforms() for the actual application of the transforms to the polygons.

**Kind**: global function  
**Returns**: <code>geom3</code> - - the transformed geometry  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Matrix4x4</code> | the matrix to transform with |
| geometry | <code>geom3</code> | the geometry to transform |

**Example**  
```js
let newgeometry = transform(fromXRotation(degToRad(90)), geometry)
```
<a name="appendArc"></a>

## appendArc(options, geometry) ⇒ <code>path2</code>
Append an arc to the end of the given geometry.
This implementation follows the SVG arc specifications.

**Kind**: global function  
**Returns**: <code>path2</code> - new geometry with appended arc  
**See**: http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for construction |
| options.endpoint | <code>vec2</code> |  | end point of arc REQUIRED |
| [options.radius] | <code>vec2</code> | <code>[0,0]</code> | radius of arc (X and Y) |
| [options.xaxisrotation] | <code>Number</code> | <code>0</code> | rotation (RADIANS) of the X axis of the arc with respect to the X axis of the coordinate system |
| [options.clockwise] | <code>Boolean</code> | <code>false</code> | draw an arc clockwise with respect to the center point |
| [options.large] | <code>Boolean</code> | <code>false</code> | draw an arc longer than 180 degrees |
| [options.segments] | <code>Number</code> | <code>16</code> | number of segments per 360 rotation |
| geometry | <code>path2</code> |  | the path of which to append the arc |

**Example**  
```js
let p1 = path2.fromPoints({}, [[27.5,-22.96875]]);
p1 = path2.appendPoints([[27.5,-3.28125]], p1);
p1 = path2.appendArc({endpoint: [12.5, -22.96875], radius: [15, -19.6875]}, p1);
```
<a name="appendBezier"></a>

## appendBezier(options, geometry) ⇒ <code>path2</code>
Append a Bezier curve to the end of the given geometry, using the control points to transition the curve through start and end points.
<br>
The Bézier curve starts at the last point in the path,
and ends at the last given control point. Other control points are intermediate control points.
<br>
The first control point may be null to ensure a smooth transition occurs. In this case,
the second to last control point of the path is mirrored into the control points of the Bezier curve.
In other words, the trailing gradient of the path matches the new gradient of the curve.

**Kind**: global function  
**Returns**: <code>path2</code> - a new geometry with the appended curves  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for construction |
| options.controlPoints | <code>Array.&lt;vec2&gt;</code> |  | list of control points for the bezier curve |
| [options.segment] | <code>Number</code> | <code>16</code> | number of segments per 360 rotation |
| geometry | <code>path2</code> |  | the path of which to append the curves |

**Example**  
```js
let p5 = path2.create({}, [[10,-20]])
p5 = path2.appendBezier({controlPoints: [[10,-10],[25,-10],[25,-20]]}, p5);
p5 = path2.appendBezier({controlPoints: [null, [25,-30],[40,-30],[40,-20]]}, p5)
```
<a name="appendPoints"></a>

## appendPoints(geometry) ⇒ <code>path2</code>
Append the given list of points to the end of the given geometry.

**Kind**: global function  
**Returns**: <code>path2</code> - new path  

| Param | Type | Description |
| --- | --- | --- |
| geometry | <code>path2</code> | the path to concatenate |

**Example**  
```js
let newpath = concat(fromPoints({}, [[1, 2]]), fromPoints({}, [[3, 4]]))
```
<a name="applyTransforms"></a>

## applyTransforms(geometry) ⇒ <code>path</code>
Apply the transforms of the given geometry.
NOTE: This function must be called BEFORE exposing any data. See toPoints.

**Kind**: global function  
**Returns**: <code>path</code> - the given geometry  

| Param | Type | Description |
| --- | --- | --- |
| geometry | <code>path</code> | the geometry to transform |

**Example**  
```js
geometry = applyTransforms(geometry)
```
<a name="clone"></a>

## clone() ⇒ <code>path2</code>
Performs a deep clone of the give path.

**Kind**: global function  
**Returns**: <code>path2</code> - new path  
**Params**: <code>path2</code> geometry - the geometry to clone  
<a name="close"></a>

## close() ⇒ <code>path</code>
Close the given geometry.

**Kind**: global function  
**Returns**: <code>path</code> - the closed path  
**Params**: <code>geometry</code> the path to close  
<a name="concat"></a>

## concat(...paths) ⇒ <code>path2</code>
Produces a path by concatenating the given paths.
A concatenation of zero paths is an empty, open path.
A concatenation of one closed path to a series of open paths produces a closed path.
A concatenation of a path to a closed path is an error.

**Kind**: global function  
**Returns**: <code>path2</code> - new path  

| Param | Type | Description |
| --- | --- | --- |
| ...paths | <code>path</code> | the paths to concatenate |

**Example**  
```js
let newpath = concat(fromPoints({}, [[1, 2]]), fromPoints({}, [[3, 4]]))
```
<a name="create"></a>

## create() ⇒ <code>path</code>
Produces an empty, open path.

**Kind**: global function  
**Returns**: <code>path</code> - a new empty, open path  
**Example**  
```js
let newpath = create()
```
<a name="eachPoint"></a>

## eachPoint(path, thunk)
Calls a function for each point in the path in order.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>path2</code> | the path to traverse |
| thunk | <code>function</code> | the function to call |

**Example**  
```js
eachPoint(path, accumulate)
```
<a name="equals"></a>

## equals(a, b) ⇒ <code>boolean</code>
Determine if the given paths are equal.
For closed paths, this includes equality under point order rotation.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>path</code> | the first path to compare |
| b | <code>path</code> | the second path to compare |

<a name="fromPoints"></a>

## fromPoints(points) ⇒ <code>path</code>
Create a new path from the given points.
The points must be provided an array of points,
where each point is an array of two numbers.

**Kind**: global function  
**Returns**: <code>path</code> - new path  
**Example:**: my newpath = fromPoints({closed: true}, [[10, 10], [-10, 10]])  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array</code> | array of points from which to create the path |
| [options.closed] | <code>boolean</code> | if the path should be open or closed |

<a name="isA"></a>

## isA() ⇒ <code>true</code>
Determin if the given object is a path2 geometry.

**Kind**: global function  
**Returns**: <code>true</code> - if the object matches a path2 object  
**Params**: <code>object</code> object - the object to interogate  
<a name="reverse"></a>

## reverse(path) ⇒ <code>path2</code>
Reverses the path so that the points are in the opposite order.
This swaps the left (interior) and right (exterior) edges.
Reversal of path segments with options may be non-trivial.

**Kind**: global function  
**Returns**: <code>path2</code> - the reversed path.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>path2</code> | the path to reverse. |

**Example**  
```js
reverse(path)
```
<a name="toPoints"></a>

## toPoints(geometry) ⇒ <code>Array</code>
Produces a new array containing the path's point data.
The returned array should not be modified as the data is shared with the geometry.

**Kind**: global function  
**Returns**: <code>Array</code> - an array of points, each point contains an array of two numbers  

| Param | Type | Description |
| --- | --- | --- |
| geometry | <code>path2</code> | the path |

**Example**  
```js
let sharedpoints = toPoints(path)
```
<a name="toString"></a>

## toString() ⇒ <code>String</code>
Create a string representing the contents of the given path.

**Kind**: global function  
**Returns**: <code>String</code> - a representive string  
**Example**  
```js
console.out(toString(path))
```
<a name="transform"></a>

## transform(matrix, geometry) ⇒ <code>path2</code>
A lazy transform of all of the points in the path.

**Kind**: global function  
**Returns**: <code>path2</code> - - the transformed path  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>mat4</code> | the matrix to transform with |
| geometry | <code>path2</code> | the path to transform |

**Example**  
```js
transform(fromZRotation(degToRad(90)), path)
```
<a name="arePointsInside"></a>

## arePointsInside(points, polygon) ⇒ <code>Integer</code>
Determine if the given points are inside the given polygon.

**Kind**: global function  
**Returns**: <code>Integer</code> - 1 if all points are inside, 0 if some or none are inside  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array</code> | a list of points, where each point is an array with X and Y values |
| polygon | <code>poly2</code> | a 2D polygon |

<a name="create"></a>

## create([vertices]) ⇒ <code>poly2</code>
Creates a new poly2 (polygon) with initial values.

**Kind**: global function  
**Returns**: <code>poly2</code> - a new poly2  

| Param | Type | Description |
| --- | --- | --- |
| [vertices] | <code>Array.&lt;Array&gt;</code> | list of vertices |

**Example**  
```js
let polygon = create()
```
<a name="flip"></a>

## flip(polygon) ⇒ <code>poly2</code>
Flip the give polygon to rotate the opposite direction.

**Kind**: global function  
**Returns**: <code>poly2</code> - a new poly2  

| Param | Type | Description |
| --- | --- | --- |
| polygon | <code>poly2</code> | the polygon to flip |

<a name="clone"></a>

## clone([out], poly3) ⇒ <code>vec3</code>
Create a deep clone of the given polygon

**Kind**: global function  
**Returns**: <code>vec3</code> - clone of the polygon  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>vec3</code> | receiving polygon |
| poly3 | <code>vec3</code> | polygon to clone |

<a name="create"></a>

## create() ⇒ <code>poly3</code>
Creates a new poly3 (polygon) with initial values

**Kind**: global function  
**Returns**: <code>poly3</code> - a new poly3  
<a name="flip"></a>

## flip(polygon) ⇒ <code>poly3</code>
Flip the give polygon to face the opposite direction.

**Kind**: global function  
**Returns**: <code>poly3</code> - a new poly3  

| Param | Type | Description |
| --- | --- | --- |
| polygon | <code>poly3</code> | the polygon to flip |

<a name="fromPoints"></a>

## fromPoints(points)
Create a polygon from the given points.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array.&lt;Array&gt;</code> | list of points |

**Example**  
```js
const points = [
  [0,  0, 0],
  [0, 10, 0],
  [0, 10, 10]
]
const polygon = fromPoints(points)
```
<a name="fromPointsAndPlane"></a>

## fromPointsAndPlane(vertices, [plane])
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| vertices | <code>Array.&lt;Array&gt;</code> | list of vertices |
| [plane] | <code>plane</code> | plane of the polygon |

<a name="isA"></a>

## isA() ⇒ <code>true</code>
Determin if the given object is a poly3.

**Kind**: global function  
**Returns**: <code>true</code> - if the object matches a poly3 based object  
**Params**: <code>poly3</code> object - the object to interogate  
<a name="isConvex"></a>

## isConvex() ⇒ <code>boolean</code>
Check whether the polygon is convex. (it should be, otherwise we will get unexpected results)

**Kind**: global function  
<a name="measureBoundingSphere"></a>

## measureBoundingSphere(the) ⇒
Measure the bounding sphere of the given poly3

**Kind**: global function  
**Returns**: computed bounding sphere; center (vec3) and radius  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>poly3</code> | poly3 to measure |

<a name="OrthoNormalBasis"></a>

## OrthoNormalBasis(plane, rightvector)
class OrthoNormalBasis
Reprojects points on a 3D plane onto a 2D plane
or from a 2D plane back onto the 3D plane

**Kind**: global function  

| Param | Type |
| --- | --- |
| plane | <code>Plane</code> | 
| rightvector | <code>Vector3D</code> \| <code>Vector2D</code> | 

<a name="clone"></a>

## clone([out], line) ⇒ <code>line2</code>
Create a clone of the given 2D line.

**Kind**: global function  
**Returns**: <code>line2</code> - clone of the line  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>line2</code> | receiving line |
| line | <code>line2</code> | line to clone |

<a name="closestPoint"></a>

## closestPoint(point, line) ⇒ <code>vec2</code>
Determine the closest point on the given line to the given point.
Thanks to @khrismuc

**Kind**: global function  
**Returns**: <code>vec2</code> - a new point  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>vec2</code> | the point of reference |
| line | <code>line2</code> | the 2D line for calculations |

<a name="create"></a>

## create() ⇒ <code>line2</code>
Create a unbounded 2D line, positioned at 0,0, and running along the X axis.

**Kind**: global function  
**Returns**: <code>line2</code> - a new unbounded 2D line  
<a name="direction"></a>

## direction() ⇒ <code>vec2</code>
Return the direction of the given line.

**Kind**: global function  
**Returns**: <code>vec2</code> - a new relative vector in the direction of the line  
<a name="distanceToPoint"></a>

## distanceToPoint(point, line) ⇒ <code>Number</code>
Calculate the distance (positive) between the given point and line

**Kind**: global function  
**Returns**: <code>Number</code> - distance between line and point  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>vec2</code> | the point of reference |
| line | <code>line2</code> | the 2D line of reference |

<a name="doLinesIntersect"></a>

## doLinesIntersect(p0start, p0end, p1start, p1end)
**Kind**: global function  

| Param | Type |
| --- | --- |
| p0start | <code>vec</code> | 
| p0end | <code>vec</code> | 
| p1start | <code>vec</code> | 
| p1end | <code>vec</code> | 

<a name="equals"></a>

## equals() ⇒ <code>boolean</code>
Compare the given 2D lines for equality

**Kind**: global function  
**Returns**: <code>boolean</code> - true if lines are equal  
<a name="fromPoints"></a>

## fromPoints(p1, p2) ⇒ <code>line2</code>
Create a new 2D line that passes through the given points

**Kind**: global function  
**Returns**: <code>line2</code> - a new unbounded 2D line  

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>vec2</code> | start point of the 2D line |
| p2 | <code>vec2</code> | end point of the 2D line |

<a name="fromValues"></a>

## fromValues(x, y, w) ⇒ <code>line2</code>
Creates a new unbounded 2D line initialized with the given values.

**Kind**: global function  
**Returns**: <code>line2</code> - a new unbounded 2D line  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | X coordinate of the unit normal |
| y | <code>Number</code> | Y coordinate of the unit normal |
| w | <code>Number</code> | length (positive) of the normal segment |

<a name="intersectToLine"></a>

## intersectToLine(line1, line2) ⇒ <code>vec2</code>
Return the point of intersection between the given lines.

The point will have Infinity values if the lines are paralell.
The point will have NaN values if the lines are the same.

**Kind**: global function  
**Returns**: <code>vec2</code> - the point of intersection  

| Param | Type | Description |
| --- | --- | --- |
| line1 | <code>line2</code> | a 2D line for reference |
| line2 | <code>line2</code> | a 2D line for reference |

<a name="origin"></a>

## origin(line) ⇒ <code>vec2</code>
Return the origin of the given line.

**Kind**: global function  
**Returns**: <code>vec2</code> - the origin of the line  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>line2</code> | the 2D line of reference |

<a name="reverse"></a>

## reverse([out], line) ⇒ <code>line2</code>
Create a new line in the opposite direction as the given.

**Kind**: global function  
**Returns**: <code>line2</code> - a new unbounded 2D line  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>line2</code> | receiving line |
| line | <code>line2</code> | the 2D line to reverse |

<a name="toString"></a>

## toString(line) ⇒ <code>string</code>
Return a string representing the given line.

**Kind**: global function  
**Returns**: <code>string</code> - string representation  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>line2</code> | the 2D line of reference |

<a name="transform"></a>

## transform([out], matrix, line) ⇒ <code>line2</code>
Transforms the given 2D line using the given matrix.

**Kind**: global function  
**Returns**: <code>line2</code> - a new unbounded 2D line  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>line2</code> | receiving line |
| matrix | <code>mat4</code> | matrix to transform with |
| line | <code>line2</code> | the 2D line to transform |

<a name="xAtY"></a>

## xAtY(y, line) ⇒ <code>Number</code>
Determine the X coordinate of the given line at the Y coordinate.

The X coordinate will be Infinity if the line is parallel to the X axis.

**Kind**: global function  
**Returns**: <code>Number</code> - the X coordinate on the line  

| Param | Type | Description |
| --- | --- | --- |
| y | <code>Number</code> | the Y coordinate on the line |
| line | <code>line2</code> | the 2D line of reference |

<a name="clone"></a>

## clone([out], line) ⇒ <code>line3</code>
Create a clone of the given 3D line.

**Kind**: global function  
**Returns**: <code>line3</code> - clone of the line  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>line3</code> | receiving line |
| line | <code>line3</code> | line to clone |

<a name="closestPoint"></a>

## closestPoint(point, line) ⇒ <code>vec3</code>
Determine the closest point on the given line to the given point.

**Kind**: global function  
**Returns**: <code>vec3</code> - a new point  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>vec3</code> | the point of reference |
| line | <code>line3</code> | the 3D line for calculations |

<a name="create"></a>

## create() ⇒ <code>line3</code>
Create an unbounded 3D line, positioned at 0,0,0 and lying on the X axis.

**Kind**: global function  
**Returns**: <code>line3</code> - a new unbounded 3D line  
<a name="direction"></a>

## direction() ⇒ <code>vec3</code>
Return the direction of the given line.

**Kind**: global function  
**Returns**: <code>vec3</code> - the relative vector in the direction of the line  
<a name="distanceToPoint"></a>

## distanceToPoint(point, line) ⇒ <code>Number</code>
Calculate the distance (positive) between the given point and line

**Kind**: global function  
**Returns**: <code>Number</code> - distance between line and point  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>vec3</code> | the point of reference |
| line | <code>line3</code> | the 3D line of reference |

<a name="equals"></a>

## equals() ⇒ <code>boolean</code>
Compare the given 3D lines for equality

**Kind**: global function  
**Returns**: <code>boolean</code> - true if lines are equal  
<a name="fromPointAndDirection"></a>

## fromPointAndDirection(point, direction) ⇒ <code>line3</code>
Create a line in 3D space from the given data.

The point can be any random point on the line.
The direction must be a vector with positive or negative distance from the point.
See the logic of fromPoints for appropriate values.

**Kind**: global function  
**Returns**: <code>line3</code> - a new unbounded 3D line  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>vec3</code> | start point of the line segment |
| direction | <code>vec3</code> | direction of the line segment |

<a name="fromPoints"></a>

## fromPoints(p1, p2) ⇒ <code>line3</code>
Creates a new 3D line that passes through the given points.

**Kind**: global function  
**Returns**: <code>line3</code> - a new unbounded 3D line  

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>vec3</code> | start point of the line segment |
| p2 | <code>vec3</code> | end point of the line segment |

<a name="intersectToPlane"></a>

## intersectToPlane(plane, line) ⇒ <code>vec3</code>
Determine the closest point on the given plane to the given line.

The point of intersection will be invalid if parallel to the plane, e.g. NaN.

**Kind**: global function  
**Returns**: <code>vec3</code> - a new point  

| Param | Type | Description |
| --- | --- | --- |
| plane | <code>plane</code> | the plane of reference |
| line | <code>line3</code> | the 3D line of reference |

<a name="origin"></a>

## origin(line) ⇒ <code>vec3</code>
Return the origin of the given line.

**Kind**: global function  
**Returns**: <code>vec3</code> - the origin of the line  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>line3</code> | the 3D line of reference |

<a name="reverse"></a>

## reverse([out], line) ⇒ <code>line3</code>
Create a new line in the opposite direction as the given.

**Kind**: global function  
**Returns**: <code>line3</code> - a new unbounded 3D line  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>line3</code> | receiving line |
| line | <code>line3</code> | the 3D line to reverse |

<a name="toString"></a>

## toString(line) ⇒ <code>string</code>
Return a string representing the given line.

**Kind**: global function  
**Returns**: <code>string</code> - string representation  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>line3</code> | the 3D line of reference |

<a name="transform"></a>

## transform(matrix, line) ⇒ <code>line3</code>
Transforms the given 3D line using the given matrix.

**Kind**: global function  
**Returns**: <code>line3</code> - a new unbounded 3D line  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>mat4</code> | matrix to transform with |
| line | <code>line3</code> | the 3D line to transform |

<a name="add"></a>

## add(out, a, b) ⇒ <code>mat4</code>
Adds two mat4's

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |
| a | <code>mat4</code> | the first operand |
| b | <code>mat4</code> | the second operand |

<a name="clone"></a>

## clone([out], matrix) ⇒ <code>mat4</code>
Creates a clone of the given matrix

**Kind**: global function  
**Returns**: <code>mat4</code> - clone of the given matrix  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>mat4</code> | receiving matrix |
| matrix | <code>mat4</code> | matrix to clone |

<a name="create"></a>

## create() ⇒ <code>mat4</code>
Creates a new identity mat4

**Kind**: global function  
**Returns**: <code>mat4</code> - a new 4x4 matrix  
<a name="equals"></a>

## equals(a, b) ⇒ <code>Boolean</code>
Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if the matrices are equal, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>mat4</code> | The first matrix. |
| b | <code>mat4</code> | The second matrix. |

<a name="fromRotation"></a>

## fromRotation(out, rad, axis) ⇒ <code>mat4</code>
Creates a matrix from a given angle around a given axis
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.rotate(dest, dest, rad, axis);

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | mat4 receiving operation result |
| rad | <code>Number</code> | the angle to rotate the matrix by |
| axis | <code>vec3</code> | the axis to rotate around |

<a name="fromScaling"></a>

## fromScaling(out, v) ⇒ <code>mat4</code>
Creates a matrix from a vector scaling
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.scale(dest, dest, vec);

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | mat4 receiving operation result |
| v | <code>vec3</code> | Scaling vector |

<a name="fromTaitBryanRotation"></a>

## fromTaitBryanRotation(yaw, pitch, roll) ⇒ <code>mat4</code>
Creates a matrix from the given Tait–Bryan angles.
Tait-Bryan Euler angle convention using active, intrinsic rotations around the axes in the order z-y-x.

**Kind**: global function  
**Returns**: <code>mat4</code> - a new matrix  
**See**: https://en.wikipedia.org/wiki/Euler_angles  

| Param | Type | Description |
| --- | --- | --- |
| yaw | <code>Number</code> | Z rotation in radians |
| pitch | <code>Number</code> | Y rotation in radians |
| roll | <code>Number</code> | X rotation in radians |

<a name="fromTranslation"></a>

## fromTranslation(out, v) ⇒ <code>mat4</code>
Creates a matrix from a vector translation
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.translate(dest, dest, vec);

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | mat4 receiving operation result |
| v | <code>vec3</code> | Translation vector |

<a name="fromValues"></a>

## fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) ⇒ <code>mat4</code>
Create a new mat4 with the given values

**Kind**: global function  
**Returns**: <code>mat4</code> - A new mat4  

| Param | Type | Description |
| --- | --- | --- |
| m00 | <code>Number</code> | Component in column 0, row 0 position (index 0) |
| m01 | <code>Number</code> | Component in column 0, row 1 position (index 1) |
| m02 | <code>Number</code> | Component in column 0, row 2 position (index 2) |
| m03 | <code>Number</code> | Component in column 0, row 3 position (index 3) |
| m10 | <code>Number</code> | Component in column 1, row 0 position (index 4) |
| m11 | <code>Number</code> | Component in column 1, row 1 position (index 5) |
| m12 | <code>Number</code> | Component in column 1, row 2 position (index 6) |
| m13 | <code>Number</code> | Component in column 1, row 3 position (index 7) |
| m20 | <code>Number</code> | Component in column 2, row 0 position (index 8) |
| m21 | <code>Number</code> | Component in column 2, row 1 position (index 9) |
| m22 | <code>Number</code> | Component in column 2, row 2 position (index 10) |
| m23 | <code>Number</code> | Component in column 2, row 3 position (index 11) |
| m30 | <code>Number</code> | Component in column 3, row 0 position (index 12) |
| m31 | <code>Number</code> | Component in column 3, row 1 position (index 13) |
| m32 | <code>Number</code> | Component in column 3, row 2 position (index 14) |
| m33 | <code>Number</code> | Component in column 3, row 3 position (index 15) |

<a name="fromXRotation"></a>

## fromXRotation(out, rad) ⇒ <code>mat4</code>
Creates a matrix from the given angle around the X axis
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.rotateX(dest, dest, rad);

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | mat4 receiving operation result |
| rad | <code>Number</code> | the angle to rotate the matrix by |

<a name="fromYRotation"></a>

## fromYRotation(out, rad) ⇒ <code>mat4</code>
Creates a matrix from the given angle around the Y axis
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.rotateY(dest, dest, rad);

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | mat4 receiving operation result |
| rad | <code>Number</code> | the angle to rotate the matrix by |

<a name="fromZRotation"></a>

## fromZRotation(out, rad) ⇒ <code>mat4</code>
Creates a matrix from the given angle around the Z axis
This is equivalent to (but much faster than):

    mat4.identity(dest);
    mat4.rotateZ(dest, dest, rad);

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | mat4 receiving operation result |
| rad | <code>Number</code> | the angle to rotate the matrix by |

<a name="identity"></a>

## identity(out) ⇒ <code>mat4</code>
Set a mat4 to the identity matrix

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |

<a name="isMirroring"></a>

## isMirroring(mat) ⇒ <code>boolean</code>
determine whether the input matrix is a mirroring transformation

**Kind**: global function  
**Returns**: <code>boolean</code> - output  

| Param | Type | Description |
| --- | --- | --- |
| mat | <code>mat4</code> | the input matrix |

<a name="leftMultiplyVec2"></a>

## leftMultiplyVec2(vector, matrix) ⇒ <code>vec2</code>
Multiply the input matrix by a Vector2 (interpreted as 2 column, 1 row)
(result = v*M)
Fourth element is set to 1

**Kind**: global function  
**Returns**: <code>vec2</code> - output  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>vec2</code> | the input vector |
| matrix | <code>mat4</code> | the input matrix |

<a name="lefttMultiplyVec3"></a>

## lefttMultiplyVec3(vector, matrix) ⇒ <code>vec3</code>
Multiply the input matrix by a Vector3 (interpreted as 3 column, 1 row)
(result = v*M)
Fourth element is set to 1

**Kind**: global function  
**Returns**: <code>vec3</code> - output  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>vec3</code> | the input vector |
| matrix | <code>mat4</code> | the input matrix |

<a name="mirror"></a>

## mirror(out, v, a) ⇒ <code>mat4</code>
m the mat4 by the dimensions in the given vec3
create an affine matrix for mirroring into an arbitrary plane:

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix (optional) |
| v | <code>vec3</code> | the vec3 to mirror the matrix by |
| a | <code>mat4</code> | the matrix to mirror |

<a name="mirrorByPlane"></a>

## mirrorByPlane([out], plane) ⇒ <code>mat4</code>
Create an affine matrix for mirroring onto an arbitrary plane

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>mat4</code> | receiving matrix |
| plane | <code>vec4</code> | to mirror the matrix by |

<a name="multiply"></a>

## multiply(out, a, b) ⇒ <code>mat4</code>
Multiplies two mat4's

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |
| a | <code>mat4</code> | the first operand |
| b | <code>mat4</code> | the second operand |

<a name="rightMultiplyVec2"></a>

## rightMultiplyVec2(vector, matrix) ⇒ <code>vec2</code>
Multiply the input matrix by a Vector2 (interpreted as 2 row, 1 column)
(result = M*v)
Fourth element is set to 1

**Kind**: global function  
**Returns**: <code>vec2</code> - output  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>vec2</code> | the input vector |
| matrix | <code>mat4</code> | the input matrix |

<a name="rightMultiplyVec3"></a>

## rightMultiplyVec3(vector, matrix) ⇒ <code>vec3</code>
Multiply the input matrix by a Vector3 (interpreted as 3 row, 1 column)
(result = M*v)
Fourth element is set to 1

**Kind**: global function  
**Returns**: <code>vec3</code> - output  

| Param | Type | Description |
| --- | --- | --- |
| vector | <code>vec3</code> | the input vector |
| matrix | <code>mat4</code> | the input matrix |

<a name="rotate"></a>

## rotate(out, rad, axis, matrix) ⇒ <code>mat4</code>
Rotates a mat4 by the given angle

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |
| rad | <code>Number</code> | the angle to rotate the matrix by |
| axis | <code>vec3</code> | the axis to rotate around |
| matrix | <code>mat4</code> | the matrix to rotate |

<a name="rotateX"></a>

## rotateX(out, angle, matrix) ⇒ <code>mat4</code>
Rotates a matrix by the given angle around the X axis

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |
| angle | <code>Number</code> | the angle to rotate the matrix by (in radian) |
| matrix | <code>mat4</code> | the matrix to rotate |

<a name="rotateY"></a>

## rotateY(out, angle, matrix) ⇒ <code>mat4</code>
Rotates a matrix by the given angle around the Y axis

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |
| angle | <code>Number</code> | the angle to rotate the matrix by (in radian) |
| matrix | <code>mat4</code> | the matrix to rotate |

<a name="rotateZ"></a>

## rotateZ(out, angle, matrix) ⇒ <code>mat4</code>
Rotates a matrix by the given angle around the Y axis

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |
| angle | <code>Number</code> | the angle to rotate the matrix by (in radian) |
| matrix | <code>mat4</code> | the matrix to rotate |

<a name="scale"></a>

## scale(out, vector, matrix) ⇒ <code>mat4</code>
Scales the mat4 by the dimensions in the given vec3

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |
| vector | <code>vec3</code> | the vec3 to scale the matrix by |
| matrix | <code>mat4</code> | the matrix to scale |

<a name="subtract"></a>

## subtract(out, a, b) ⇒ <code>mat4</code>
Subtracts matrix b from matrix a

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |
| a | <code>mat4</code> | the first operand |
| b | <code>mat4</code> | the second operand |

<a name="translate"></a>

## translate(out, vector, matrix) ⇒ <code>mat4</code>
Translate matrix mat4 by the given vector

**Kind**: global function  
**Returns**: <code>mat4</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>mat4</code> | the receiving matrix |
| vector | <code>vec3</code> | vector to translate by |
| matrix | <code>mat4</code> | the matrix to translate |

<a name="equals"></a>

## equals() ⇒ <code>boolean</code>
Compare the given planes for equality

**Kind**: global function  
**Returns**: <code>boolean</code> - true if planes are equal  
<a name="flip"></a>

## flip([out], vec) ⇒ <code>vec4</code>
Flip the given plane (vec4)

**Kind**: global function  
**Returns**: <code>vec4</code> - flipped plane  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>vec4</code> | receiving plane |
| vec | <code>vec4</code> | plane to flip |

<a name="fromNormalAndPoint"></a>

## fromNormalAndPoint(normal, point-) ⇒ <code>Array</code>
Create a new plane from the given normal and point values

**Kind**: global function  
**Returns**: <code>Array</code> - a new plane with properly typed values  

| Param | Type | Description |
| --- | --- | --- |
| normal | <code>Vec3</code> | vector 3D |
| point- | <code>Vec3</code> | vector 3D |

<a name="fromObject"></a>

## fromObject()
Create a new plane from an untyped object with identical properties

**Kind**: global function  
<a name="fromPoints"></a>

## fromPoints(a, b, c) ⇒ <code>Vec4</code>
Create a new plane from the given points

**Kind**: global function  
**Returns**: <code>Vec4</code> - a new plane with properly typed values  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Vec3</code> | 3D point |
| b | <code>Vec3</code> | 3D point |
| c | <code>Vec3</code> | 3D point |

<a name="fromPointsRandom"></a>

## fromPointsRandom(a, b, c) ⇒ <code>Vec4</code>
Create a new plane from the given points like fromPoints, 
but allow the vectors to be on one point or one line
in such a case a random plane through the given points is constructed

**Kind**: global function  
**Returns**: <code>Vec4</code> - a new plane with properly typed values  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Vec3</code> | 3D point |
| b | <code>Vec3</code> | 3D point |
| c | <code>Vec3</code> | 3D point |

<a name="signedDistanceToPoint"></a>

## signedDistanceToPoint() ⇒ <code>Number</code>
Calculate the distance to the given point

**Kind**: global function  
**Returns**: <code>Number</code> - signed distance to point  
<a name="splitLineSegmentByPlane"></a>

## splitLineSegmentByPlane() ⇒ <code>vec3</code>
Split the given line by the given plane.
Robust splitting, even if the line is parallel to the plane

**Kind**: global function  
**Returns**: <code>vec3</code> - a new point  
<a name="transform"></a>

## transform() ⇒ <code>Array</code>
Transform the given plane using the given matrix

**Kind**: global function  
**Returns**: <code>Array</code> - a new plane with properly typed values  
<a name="abs"></a>

## abs([out], vec) ⇒ <code>vec2</code>
Calculates the absolute value of the give vector

**Kind**: global function  
**Returns**: <code>vec2</code> - absolute value of the vector  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>vec2</code> | receiving vector |
| vec | <code>vec2</code> | given value |

<a name="add"></a>

## add(out, a, b) ⇒ <code>vec2</code>
Adds two vec2's

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="clone"></a>

## clone([out], vec) ⇒ <code>vec2</code>
Creates a new vec2 initialized with values from an existing vector

**Kind**: global function  
**Returns**: <code>vec2</code> - clone of the vector  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>vec2</code> | receiving vector |
| vec | <code>vec2</code> | given vector to clone |

<a name="create"></a>

## create() ⇒ <code>vec2</code>
Creates a new, empty vec2

**Kind**: global function  
**Returns**: <code>vec2</code> - a new 2D vector  
<a name="cross"></a>

## cross(out, a, b) ⇒ <code>vec3</code>
Computes the cross product (3D) of two vectors

**Kind**: global function  
**Returns**: <code>vec3</code> - cross product  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | : the receiving vec3 (IMPORTANT) |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="distance"></a>

## distance(a, b) ⇒ <code>Number</code>
Calculates the euclidian distance between two vec2's

**Kind**: global function  
**Returns**: <code>Number</code> - distance between a and b  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="divide"></a>

## divide(out, a, b) ⇒ <code>vec2</code>
Divides two vec2's

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="dot"></a>

## dot(a, b) ⇒ <code>Number</code>
Calculates the dot product of two vec2's

**Kind**: global function  
**Returns**: <code>Number</code> - dot product of a and b  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="fromArray"></a>

## fromArray(data) ⇒ <code>vec2</code>
Creates a new vec2 initialized with the values in the given array
any value at an index > 1 is ignored !

**Kind**: global function  
**Returns**: <code>vec2</code> - a new 2D vector  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | array of numerical values |

<a name="fromScalar"></a>

## fromScalar(scalar) ⇒ <code>Vec2</code>
Create a vec2 from a single scalar value

**Kind**: global function  
**Returns**: <code>Vec2</code> - a new vec2  

| Param | Type |
| --- | --- |
| scalar | <code>Float</code> | 

<a name="fromValues"></a>

## fromValues(x, y) ⇒ <code>vec2</code>
Creates a new vec2 initialized with the given values

**Kind**: global function  
**Returns**: <code>vec2</code> - a new 2D vector  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | X component |
| y | <code>Number</code> | Y component |

<a name="fromVarious"></a>

## fromVarious()
**Kind**: global function  
**Example**  
```js
new CSG.Vector2D(1, 2);
new CSG.Vector2D([1, 2]);
new CSG.Vector2D({ x: 1, y: 2});
```
<a name="length"></a>

## length(a) ⇒ <code>Number</code>
Calculates the length of a vec2

**Kind**: global function  
**Returns**: <code>Number</code> - length of a  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec2</code> | vector to calculate length of |

<a name="lerp"></a>

## lerp(out, t, a, b) ⇒ <code>vec2</code>
Performs a linear interpolation between two vec2's

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector |
| t | <code>Number</code> | interpolation amount between the two inputs |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="max"></a>

## max(out, a, b) ⇒ <code>vec2</code>
Returns the maximum of two vec2's

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector (optional) |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="min"></a>

## min(out, a, b) ⇒ <code>vec2</code>
Returns the minimum of two vec2's

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector (optional) |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="multiply"></a>

## multiply(out, a, b) ⇒ <code>vec2</code>
Multiplies two vec2's

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="negate"></a>

## negate(out, a) ⇒ <code>vec2</code>
Negates the components of a vec2

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector (optional) |
| a | <code>vec2</code> | vector to negate |

<a name="normal"></a>

## normal([out], vec) ⇒ <code>vec2</code>
Calculates the normal value of the give vector
The normal value is the given vector rotated 90 degress.

**Kind**: global function  
**Returns**: <code>vec2</code> - normal value of the vector  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>vec2</code> | receiving vector |
| vec | <code>vec2</code> | given value |

<a name="normalize"></a>

## normalize(out, a) ⇒ <code>vec2</code>
Normalize the given vector.

**Kind**: global function  
**Returns**: <code>vec2</code> - normalized (unit) vector  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector |
| a | <code>vec2</code> | vector to normalize |

<a name="rotate"></a>

## rotate(out, angle, vector) ⇒ <code>vec2</code>
Rotates a vec2 by an angle

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector |
| angle | <code>Number</code> | the angle of rotation (in radians) |
| vector | <code>vec2</code> | the vector to rotate |

<a name="scale"></a>

## scale(out, amount, vector) ⇒ <code>vec2</code>
Scales a vec2 by a scalar number

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector |
| amount | <code>Number</code> | amount to scale the vector by |
| vector | <code>vec2</code> | the vector to scale |

<a name="squaredDistance"></a>

## squaredDistance(a, b) ⇒ <code>Number</code>
Calculates the squared euclidian distance between two vec2's

**Kind**: global function  
**Returns**: <code>Number</code> - squared distance between a and b  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="squaredLength"></a>

## squaredLength(a) ⇒ <code>Number</code>
Calculates the squared length of a vec2

**Kind**: global function  
**Returns**: <code>Number</code> - squared length of a  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec2</code> | vector to calculate squared length of |

<a name="subtract"></a>

## subtract(out, a, b) ⇒ <code>vec2</code>
Subtracts vector b from vector a

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector |
| a | <code>vec2</code> | the first operand |
| b | <code>vec2</code> | the second operand |

<a name="transform"></a>

## transform(out, matrix, vector) ⇒ <code>vec2</code>
Transforms the vec2 with a mat4
3rd vector component is implicitly '0'
4th vector component is implicitly '1'

**Kind**: global function  
**Returns**: <code>vec2</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec2</code> | the receiving vector |
| matrix | <code>mat4</code> | matrix to transform with |
| vector | <code>vec2</code> | the vector to transform |

<a name="abs"></a>

## abs([out], vec) ⇒ <code>vec3</code>
Calculates the absolute value of the give vector

**Kind**: global function  
**Returns**: <code>vec3</code> - absolute value of the vector  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>vec3</code> | receiving vector |
| vec | <code>vec3</code> | given value |

<a name="add"></a>

## add(out, a, b) ⇒ <code>vec3</code>
Adds two vec3's

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="angle"></a>

## angle(a, b) ⇒ <code>Number</code>
Get the angle between two 3D vectors

**Kind**: global function  
**Returns**: <code>Number</code> - The angle in radians  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec3</code> | The first operand |
| b | <code>vec3</code> | The second operand |

<a name="clone"></a>

## clone([out], vec) ⇒ <code>vec3</code>
Create a clone of the given vector

**Kind**: global function  
**Returns**: <code>vec3</code> - clone of the vector  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>vec3</code> | receiving vector |
| vec | <code>vec3</code> | vector to clone |

<a name="create"></a>

## create() ⇒ <code>vec3</code>
Creates a new, empty vec3

**Kind**: global function  
**Returns**: <code>vec3</code> - a new 3D vector  
<a name="cross"></a>

## cross(out, a, b) ⇒ <code>vec3</code>
Computes the cross product of two vec3's

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="distance"></a>

## distance(a, b) ⇒ <code>Number</code>
Calculates the euclidian distance between two vec3's

**Kind**: global function  
**Returns**: <code>Number</code> - distance between a and b  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="divide"></a>

## divide(out, a, b) ⇒ <code>vec3</code>
Divides two vec3's

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="dot"></a>

## dot(a, b) ⇒ <code>Number</code>
Calculates the dot product of two vec3's

**Kind**: global function  
**Returns**: <code>Number</code> - dot product of a and b  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="fromArray"></a>

## fromArray(data) ⇒ <code>vec3</code>
Creates a new vec3 initialized with the values in the given array

**Kind**: global function  
**Returns**: <code>vec3</code> - a new 3D vector  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | array of numerical values |

<a name="fromScalar"></a>

## fromScalar(scalar) ⇒ <code>Vec3</code>
create a vec3 from a single scalar value
all components of the resulting vec3 have the value of the
input scalar

**Kind**: global function  

| Param | Type |
| --- | --- |
| scalar | <code>Float</code> | 

<a name="fromValues"></a>

## fromValues(x, y, z) ⇒ <code>vec3</code>
Creates a new vec3 initialized with the given values

**Kind**: global function  
**Returns**: <code>vec3</code> - a new 3D vector  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | X component |
| y | <code>Number</code> | Y component |
| z | <code>Number</code> | Z component |

<a name="fromVarious"></a>

## fromVarious()
Represents a 3D vector with X, Y, Z coordinates.

**Kind**: global function  
**Example**  
```js
fromVarious(1, 2, 3);
fromVarious([1, 2, 3]);
fromVarious({ x: 1, y: 2, z: 3 });
fromVarious(1, 2); // assumes z=0
fromVarious([1, 2]); // assumes z=0
```
<a name="length"></a>

## length(a) ⇒ <code>Number</code>
Calculates the length of a vec3

**Kind**: global function  
**Returns**: <code>Number</code> - length of a  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec3</code> | vector to calculate length of |

<a name="lerp"></a>

## lerp(out, t, a, b) ⇒ <code>vec3</code>
Performs a linear interpolation between two vec3's

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector |
| t | <code>Number</code> | interpolant (0.0 to 1.0) applied between the two inputs |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="max"></a>

## max(out, a, b) ⇒ <code>vec3</code>
Returns the maximum of two vec3's

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector (optional) |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="min"></a>

## min(out, a, b) ⇒ <code>vec3</code>
Returns the minimum of two vec3's

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector (optional) |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="multiply"></a>

## multiply(out, a, b) ⇒ <code>vec3</code>
Multiplies two vec3's

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="negate"></a>

## negate(out, a) ⇒ <code>vec3</code>
Negates the components of a vec3

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector (optional) |
| a | <code>vec3</code> | vector to negate |

<a name="normalize"></a>

## normalize(out, a) ⇒ <code>vec3</code>
Normalize a vec3

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector (optional) |
| a | <code>vec3</code> | vector to normalize |

<a name="rotate"></a>

## rotate(out, vector) ⇒ <code>vec3</code>
Rotate vector 3D vector around the all 3 axes in the order x-axis , yaxis, z axis

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | The receiving vec3 (optional) |
| vector | <code>vec3</code> | The vec3 point to rotate |

<a name="rotateX"></a>

## rotateX(out, angle, origin, vector) ⇒ <code>vec3</code>
Rotate vector 3D vector around the x-axis

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | The receiving vec3 (optional) |
| angle | <code>Number</code> | The angle of rotation |
| origin | <code>vec3</code> | The origin of the rotation |
| vector | <code>vec3</code> | The vec3 point to rotate |

<a name="rotateY"></a>

## rotateY(out, angle, origin, vector) ⇒ <code>vec3</code>
Rotate vector 3D vector around the y-axis

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | The receiving vec3 (optional) |
| angle | <code>Number</code> | The angle of rotation |
| origin | <code>vec3</code> | The origin of the rotation |
| vector | <code>vec3</code> | The vec3 point to rotate |

<a name="rotateZ"></a>

## rotateZ(out, angle, origin, vector) ⇒ <code>vec3</code>
Rotate vector 3D vector around the z-axis

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | The receiving vec3 (optional) |
| angle | <code>Number</code> | The angle of rotation in radians |
| origin | <code>vec3</code> | The origin of the rotation |
| vector | <code>vec3</code> | The vec3 point to rotate |

<a name="scale"></a>

## scale(out, amount, vector) ⇒ <code>vec3</code>
Scales a vec3 by a scalar number

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector |
| amount | <code>Number</code> | amount to scale the vector by |
| vector | <code>vec3</code> | the vector to scale |

<a name="squaredDistance"></a>

## squaredDistance(a, b) ⇒ <code>Number</code>
Calculates the squared euclidian distance between two vec3's

**Kind**: global function  
**Returns**: <code>Number</code> - squared distance between a and b  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="squaredLength"></a>

## squaredLength(a) ⇒ <code>Number</code>
Calculates the squared length of a vec3

**Kind**: global function  
**Returns**: <code>Number</code> - squared length of a  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec3</code> | vector to calculate squared length of |

<a name="subtract"></a>

## subtract(out, a, b) ⇒ <code>vec3</code>
Subtracts vector b from vector a

**Kind**: global function  
**Returns**: <code>vec3</code> - out  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec3</code> | the receiving vector |
| a | <code>vec3</code> | the first operand |
| b | <code>vec3</code> | the second operand |

<a name="transform"></a>

## transform([params[0]], params[1, params[2) ⇒ <code>vec3</code>
Transforms the given vec3 with the given mat4.
4th vector component is implicitly '1'

**Kind**: global function  
**Returns**: <code>vec3</code> - the transformed vector  

| Param | Type | Description |
| --- | --- | --- |
| [params[0]] | <code>vec3</code> | the receiving vector (optional) |
| params[1 | <code>mat4</code> | the transform matrix |
| params[2 | <code>vec3</code> | the vector to transform |

<a name="unit"></a>

## unit([out], vector) ⇒ <code>vec3</code>
Calculates the unit vector of the given vector

**Kind**: global function  
**Returns**: <code>vec3</code> - unit vector of the given vector  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>vec3</code> | the optional receiving vector |
| vector | <code>vec3</code> | the base vector for calculations |

<a name="clone"></a>

## clone([out], vector) ⇒ <code>vec4</code>
Create a clone of the given vector

**Kind**: global function  
**Returns**: <code>vec4</code> - clone of vector  

| Param | Type | Description |
| --- | --- | --- |
| [out] | <code>vec4</code> | receiving vector |
| vector | <code>vec4</code> | vector to clone |

<a name="create"></a>

## create() ⇒ <code>vec4</code>
Creates a new vec4 initialized to zero

**Kind**: global function  
**Returns**: <code>vec4</code> - a new vector  
<a name="dot"></a>

## dot(a, b) ⇒ <code>Number</code>
Calculates the dot product of two vec4's

**Kind**: global function  
**Returns**: <code>Number</code> - dot product of a and b  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec4</code> | the first vec4 |
| b | <code>vec4</code> | the second vec4 |

<a name="fromScalar"></a>

## fromScalar(scalar) ⇒ <code>vec4</code>
Create a new vec4 from the given scalar value (single)

**Kind**: global function  
**Returns**: <code>vec4</code> - a new vector  

| Param | Type |
| --- | --- |
| scalar | <code>Number</code> | 

<a name="fromValues"></a>

## fromValues(x, y, z, w) ⇒ <code>vec4</code>
Creates a new vec4 initialized with the given values

**Kind**: global function  
**Returns**: <code>vec4</code> - a new vector  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | X component |
| y | <code>Number</code> | Y component |
| z | <code>Number</code> | Z component |
| w | <code>Number</code> | W component |

<a name="toString"></a>

## toString(a) ⇒ <code>String</code>
Convert the given vec4 to a representative string

**Kind**: global function  
**Returns**: <code>String</code> - representative string  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>vec4</code> | vector to convert |

<a name="transform"></a>

## transform(out, matrix, vector) ⇒ <code>vec4</code>
Transform the given vec4 using the given mat4

**Kind**: global function  
**Returns**: <code>vec4</code> - a new vector or the receiving vector  

| Param | Type | Description |
| --- | --- | --- |
| out | <code>vec4</code> | the receiving vector (optional) |
| matrix | <code>mat4</code> | matrix to transform with |
| vector | <code>vec4</code> | the vector to transform |

<a name="fromFakePolygons"></a>

## fromFakePolygons()
Convert the given polygons to a list of sides.
The polygons must have only z coordinates +1 and -1, as constructed by to3DWalls().

**Kind**: global function  
<a name="intersect"></a>

## intersect(...geometries) ⇒ <code>geom2</code> \| <code>geom3</code>
Return a new geometry representing space in both the first geometry and
all subsequent geometries.
Note: None of the given geometries are modified.

**Kind**: global function  
**Returns**: <code>geom2</code> \| <code>geom3</code> - a new geometry  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geometries</code> | list of geometries |

**Example**  
```js
let myshape = intersect(cube({size: [5,5,5]}), cube({size: [5,5,5], center: [5,5,5]}))
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
<a name="intersect"></a>

## intersect(...geometries) ⇒ <code>geom3</code>
Return a new 3D geometry representing space in both the first geometry and
in the subsequent geometries. None of the given geometries are modified.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geom3</code> | list of 3D geometries |

<a name="intersectGeom3Sub"></a>

## intersectGeom3Sub(geometry1, geometry2) ⇒ <code>geom3</code>
Return a new 3D geometry representing the space in both the first geometry and
the second geometry. None of the given geometries are modified.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Description |
| --- | --- | --- |
| geometry1 | <code>geom3</code> | a geometry |
| geometry2 | <code>geom3</code> | a geometry |

<a name="mayOverlap"></a>

## mayOverlap(geometry1, geometry2) ⇒ <code>boolean</code>
Determine if the given geometries overlap by comparing min and max bounds.
NOTE: This is used in union for performace gains.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if the geometries overlap  

| Param | Type | Description |
| --- | --- | --- |
| geometry1 | <code>geom3</code> | geometry for comparision |
| geometry2 | <code>geom3</code> | geometry for comparision |

<a name="reTesselateCoplanarPolygons"></a>

## reTesselateCoplanarPolygons(sourcepolygons) ⇒ <code>Array.&lt;poly3&gt;</code>
Retesselation for a set of COPLANAR polygons.

**Kind**: global function  
**Returns**: <code>Array.&lt;poly3&gt;</code> - new set of polygons  

| Param | Type | Description |
| --- | --- | --- |
| sourcepolygons | <code>Array.&lt;poly3&gt;</code> | list of polygons |

<a name="subtract"></a>

## subtract(...geometries) ⇒ <code>geom2</code> \| <code>geom3</code>
Return a new geometry representing space in the first geometry but
not in all subsequent geometries.
Note: None of the given geometries are modified.

**Kind**: global function  
**Returns**: <code>geom2</code> \| <code>geom3</code> - a new geometry  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geometries</code> | list of geometries |

**Example**  
```js
let myshape = subtract(cubiod({size: [5,5,5]}), cubiod({size: [5,5,5], center: [5,5,5]}))
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
<a name="subtract"></a>

## subtract(...geometries) ⇒ <code>geom3</code>
Return a new 3D geometry representing space in this geometry but not in the given geometries.
Neither this geometry nor the given geometries are modified.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geom3</code> | list of geometries |

<a name="subtractGeom3Sub"></a>

## subtractGeom3Sub(geometry1, geometry2) ⇒ <code>geom3</code>
Return a new 3D geometry representing the space in the first geometry but not
in the second geometry. None of the given geometries are modified.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Description |
| --- | --- | --- |
| geometry1 | <code>geom3</code> | a geometry |
| geometry2 | <code>geom3</code> | a geometry |

<a name="to3DWalls"></a>

## to3DWalls(options, geometry) ⇒ <code>geom3</code>
Create a 3D geometry with walls, as constructed from the given options and geometry.

**Kind**: global function  
**Returns**: <code>geom3</code> - the new geometry  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options with Z offsets |
| geometry | <code>geom2</code> | geometry used as base of walls |

<a name="union"></a>

## union(...geometries) ⇒ <code>geom2</code> \| <code>geom3</code>
Return a new geometry representing the total space in the given geometries.
NOTE: None of the given geometries are modified.

**Kind**: global function  
**Returns**: <code>geom2</code> \| <code>geom3</code> - a new geometry  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geometry</code> | list of geometries to union |

**Example**  
```js
let myshape = union(cube({size: [5,5,5]}), cube({size: [5,5,5], center: [5,5,5]}))
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
<a name="union"></a>

## union(...geometries) ⇒ <code>geom3</code>
Return a new 3D geometry representing the space in the given 3D geometries.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>objects</code> | list of geometries to union |

<a name="unionSub"></a>

## unionSub(geometry1, geometry2) ⇒ <code>goem3</code>
Return a new 3D geometry representing the space in the given geometries.

**Kind**: global function  
**Returns**: <code>goem3</code> - new 3D geometry  

| Param | Type | Description |
| --- | --- | --- |
| geometry1 | <code>geom3</code> | geometry to union |
| geometry2 | <code>geom3</code> | geometry to union |

<a name="expand"></a>

## expand(options, objects) ⇒ <code>Object</code> \| <code>Array</code>
Expand the given object(s) using the given options (if any)

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - the expanded object(s)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for expand |
| [options.delta] | <code>Number</code> | <code>1</code> | delta (+/-) of expansion |
| [options.corners] | <code>String</code> | <code>&#x27;edge&#x27;</code> | type corner to create during of expansion; edge, chamfer, round |
| [options.segments] | <code>Integer</code> |  | number of segments when creating rounded corners |
| objects | <code>Object</code> \| <code>Array</code> |  | the object(s) to expand |

**Example**  
```js
let newsphere = expand({delta: 2}, cube({center: [0,0,15], size: [20, 25, 5]}))
```
<a name="expandGeom2"></a>

## expandGeom2(options, geometry) ⇒ <code>geom2</code>
Expand the given geometry (geom2) using the given options (if any).

**Kind**: global function  
**Returns**: <code>geom2</code> - expanded geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for expand |
| [options.delta] | <code>Number</code> | <code>1</code> | delta (+/-) of expansion |
| [options.corners] | <code>String</code> | <code>&#x27;edge&#x27;</code> | type corner to create during of expansion; edge, chamfer, round |
| [options.segments] | <code>Integer</code> | <code>16</code> | number of segments when creating round corners |
| geometry | <code>geom2</code> |  | the geometry to expand |

<a name="expandGeom3"></a>

## expandGeom3(options, geometry) ⇒ <code>geom3</code>
Expand the given geometry (geom3) using the given options (if any).

**Kind**: global function  
**Returns**: <code>geom3</code> - expanded geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for expand |
| [options.delta] | <code>Number</code> | <code>1</code> | delta (+/-) of expansion |
| [options.corners] | <code>String</code> | <code>&#x27;round&#x27;</code> | type corner to create during of expansion; round |
| [options.segments] | <code>Integer</code> | <code>12</code> | number of segments when creating round corners |
| geometry | <code>geom3</code> |  | the geometry to expand |

<a name="expandPath2"></a>

## expandPath2(options, geometry) ⇒ <code>geom2</code>
Expand the given geometry (path2) using the given options (if any).

**Kind**: global function  
**Returns**: <code>geom2</code> - expanded geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for expand |
| [options.delta] | <code>Number</code> | <code>1</code> | delta (+) of expansion |
| [options.corners] | <code>String</code> | <code>&#x27;edge&#x27;</code> | type corner to create during of expansion; edge, chamfer, round |
| [options.segments] | <code>Integer</code> | <code>16</code> | number of segments when creating round corners |
| geometry | <code>path2</code> |  | the geometry to expand |

<a name="expandShell"></a>

## expandShell(delta, segments)
Create the expanded shell of the solid:
All faces are extruded to 2 times delta
Cylinders are constructed around every side
Spheres are placed on every vertex
the result is a true expansion of the solid

**Kind**: global function  

| Param | Type |
| --- | --- |
| delta | <code>Number</code> | 
| segments | <code>Integer</code> | 

<a name="offset"></a>

## offset(options, objects) ⇒ <code>Object</code> \| <code>Array</code>
Create offset geometry(s) from the given object(s) using the given options (if any).

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - the offset objects(s)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for offset |
| [options.delta] | <code>Float</code> | <code>1</code> | delta of offset (+ to exterior, - from interior) |
| [options.corners] | <code>String</code> | <code>&#x27;edge&#x27;</code> | type corner to create during of expansion; edge, chamfer, round |
| [options.segments] | <code>Integer</code> | <code>16</code> | number of segments when creating round corners |
| objects | <code>Object</code> \| <code>Array</code> |  | object(s) to offset |

<a name="offsetFromPoints"></a>

## offsetFromPoints(options, points) ⇒ <code>Array</code>
Create a set of offset points from the given points using the given options (if any).

**Kind**: global function  
**Returns**: <code>Array</code> - new set of offset points, plus points for each rounded corner  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for offset |
| [options.delta] | <code>Float</code> | <code>1</code> | delta of offset (+ to exterior, - from interior) |
| [options.corners] | <code>String</code> | <code>&#x27;edge&#x27;</code> | type corner to create during of expansion; edge, chamfer, round |
| [options.segments] | <code>Integer</code> | <code>16</code> | number of segments when creating round corners |
| points | <code>Array</code> |  | array of 2D points |

<a name="hull"></a>

## hull(...geometries) ⇒ <code>geometry</code>
Create a convex hull of the given geometries.

**Kind**: global function  
**Returns**: <code>geometry</code> - new geometry  
**Example:**: let myshape = hull(rectangle({center: [-5,-5]}), ellipse({center: [5,5]}))  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geometries</code> | list of geometries from which to create a hull |

**Example**  
```js
+-------+           +-------+
|       |           |        \
|   A   |           |         \
|       |           |          \
+-------+           +           \
                 =   \           \
      +-------+       \           +
      |       |        \          |
      |   B   |         \         |
      |       |          \        |
      +-------+           +-------+
```
<a name="hullChain"></a>

## hullChain(...geometries) ⇒ <code>geometry</code>
Create a chain of hulled geometries from the given gemetries.
Essentially hull A+B, B+C, C+D, etc., then union the results.

**Kind**: global function  
**Returns**: <code>geometry</code> - new geometry  
**Example:**: let newshape = hullChain(rectangle({center: [-5,-5]}), circle({center: [0,0]}), rectangle({center: [5,5]}))  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geometries</code> | list of geometries from which to create hulls |

<a name="hullPoints2"></a>

## hullPoints2(uniquepoints) ⇒ <code>Array</code>
Create a convex hull of the given set of points,  where each point is an array of [x,y].

**Kind**: global function  
**Returns**: <code>Array</code> - a list of points that form the hull  

| Param | Type | Description |
| --- | --- | --- |
| uniquepoints | <code>Array</code> | list of UNIQUE points from which to create a hull |

<a name="measureArea"></a>

## measureArea(...geometries) ⇒ <code>Number</code> \| <code>Array.&lt;Number&gt;</code>
Measure the area of the given geometry(s).

**Kind**: global function  
**Returns**: <code>Number</code> \| <code>Array.&lt;Number&gt;</code> - the area for each geometry  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geometries</code> | the geometry(s) to measure |

**Example**  
```js
let area = measureArea(sphere())
```
<a name="measureBounds"></a>

## measureBounds(...geometries) ⇒ <code>Array.&lt;Array&gt;</code>
Measure the min and max bounds of the given geometry(s),
where min and max bounds are an array of [x,y,z]

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - the min and max bounds for each geometry  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geometries</code> | the geometry(s) to measure |

**Example**  
```js
let bounds = measureBounds(sphere())
```
<a name="measureVolume"></a>

## measureVolume(...geometries) ⇒ <code>Number</code> \| <code>Array.&lt;Number&gt;</code>
Measure the volume of the given geometry(s).

**Kind**: global function  
**Returns**: <code>Number</code> \| <code>Array.&lt;Number&gt;</code> - the volume for each geometry  

| Param | Type | Description |
| --- | --- | --- |
| ...geometries | <code>geometries</code> | the geometry(s) to measure |

**Example**  
```js
let volume = measureVolume(sphere())
```
<a name="center"></a>

## center([options], geometries) ⇒ <code>Object</code> \| <code>Array</code>
Center the given object(s) using the given options (if any)

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - the centered geometries  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for centering |
| [options.axes] | <code>Array</code> | <code>[true,true,true]</code> | axis of which to center, true or false |
| [options.center] | <code>Array</code> | <code>[0,0,0]</code> | point of which to center the object upon |
| geometries | <code>Object</code> \| <code>Array</code> |  | the geometries to center |

**Example**  
```js
let myshape = center({axes: [true,false,false]}, sphere()) // center about the X axis
```
<a name="mirror"></a>

## mirror(options, objects) ⇒ <code>Object</code> \| <code>Array</code>
Mirror the given object(s) using the given options (if any)
Note: The normal should be given as 90 degrees from the plane origin.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - the mirrored object(s)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for mirror |
| options.origin | <code>Array</code> | <code>[0,0,0</code> | the origin of the plane |
| options.normal | <code>Array</code> | <code>[0,0,1</code> | the normal vector of the plane |
| objects | <code>Object</code> \| <code>Array</code> |  | the objects(s) to mirror |

**Example**  
```js
const newsphere = mirror({normal: [0,0,10]}, cube({center: [0,0,15], radius: [20, 25, 5]}))
```
<a name="rotate"></a>

## rotate(angles, objects) ⇒ <code>Object</code> \| <code>Array</code>
Rotate the given object(s) using the given options (if any)

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - the rotated object(s)  

| Param | Type | Description |
| --- | --- | --- |
| angles | <code>Array.&lt;Number&gt;</code> | angle (RADIANS) of rotations about X, Y, and X axis |
| objects | <code>Object</code> \| <code>Array</code> | the objects(s) to rotate |

**Example**  
```js
const newsphere = rotate([45,0,0], sphere())
```
<a name="scale"></a>

## scale(factors, objects) ⇒ <code>Object</code> \| <code>Array</code>
Scale the given object(s) using the given options (if any)

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - the scaled object(s)  

| Param | Type | Description |
| --- | --- | --- |
| factors | <code>Array</code> | factors by which to scale the object |
| objects | <code>Object</code> \| <code>Array</code> | the objects(s) to scale |

**Example**  
```js
const newsphere = scale([5, 0, 10], sphere())
```
<a name="transform"></a>

## transform(matrix, objects) ⇒ <code>Object</code> \| <code>Array</code>
Transform the given object(s) using the given matrix

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - the transform object(s)  

| Param | Type | Description |
| --- | --- | --- |
| matrix | <code>Matrix4x4</code> | a transformation matrix, see Matrix4x4 |
| objects | <code>Object</code> \| <code>Array</code> | the objects(s) to transform |

**Example**  
```js
const newsphere = transform(Matrix4x4.rotateX(45), sphere())
```
<a name="translate"></a>

## translate(offsets, objects) ⇒ <code>Object</code> \| <code>Array</code>
Translate the given object(s) using the given options (if any)

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - the translated object(s)  

| Param | Type | Description |
| --- | --- | --- |
| offsets | <code>Array</code> | offsets of which to translate the object |
| objects | <code>Object</code> \| <code>Array</code> | the objects(s) to translate |

**Example**  
```js
const newsphere = translate({offsets: [5, 0, 10]}, sphere())
```
<a name="arc"></a>

## arc(options) ⇒ <code>path</code>
Construct an arc.

**Kind**: global function  
**Returns**: <code>path</code> - new path (not closed)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options for construction |
| options.center | <code>Array</code> | center of arc |
| options.radius | <code>Number</code> | radius of arc |
| options.startAngle | <code>Number</code> | starting angle of the arc, in radians |
| options.endAngle | <code>Number</code> | ending angle of the arc, in radians |
| options.segments | <code>Number</code> | number of segments to create per 360 rotation |
| options.makeTangent | <code>Boolean</code> | adds line segments at both ends of the arc to ensure that the gradients at the edges are tangent |

<a name="cuboid"></a>

## cuboid([options]) ⇒ <code>geom3</code>
Construct an axis-aligned solid cuboid.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0,0]</code> | center of cuboid |
| [options.size] | <code>Array</code> | <code>[1,1,1]</code> | size of cuboid |

**Example**  
```js
let myshape = cuboid({center: [5, 5, 5], size: [5, 10, 5]})
```
<a name="cube"></a>

## cube([options]) ⇒ <code>geom3</code>
Construct an axis-aligned solid cube with six square faces.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  
**See**: [cuboid](#cuboid) for more options, as this is an alias to cuboid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0,0]</code> | center of cube |
| options.size | <code>Number</code> | <code>1</code> | size of cube |

**Example**  
```js
let mycube = cube({center: [5, 5, 5], size: 5})
```
<a name="cylinderElliptic"></a>

## cylinderElliptic([options]) ⇒ <code>geom3</code>
Construct an elliptic cylinder.

**Kind**: global function  
**Returns**: <code>geom3</code> - new geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.height] | <code>Vector3</code> | <code>2</code> | height of cylinder |
| [options.startRadius] | <code>Vector2D</code> | <code>[1,1]</code> | radius of rounded start, must be two dimensional array |
| [options.startAngle] | <code>Number</code> | <code>0</code> | start angle of cylinder, in radians |
| [options.endRadius] | <code>Vector2D</code> | <code>[1,1]</code> | radius of rounded end, must be two dimensional array |
| [options.endAngle] | <code>Number</code> | <code>(Math.PI * 2)</code> | end angle of cylinder, in radians |
| [options.segments] | <code>Number</code> | <code>12</code> | number of segments to create per full rotation |

**Example**  
```js
let cylinder = cylinderElliptic({
      height: 2,
      startRadius: [10,5],
      endRadius: [8,3]
    });
```
<a name="cylinder"></a>

## cylinder([options]) ⇒ <code>geom3</code>
Construct a solid cylinder.

**Kind**: global function  
**Returns**: <code>geom3</code> - new geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.height] | <code>Array</code> | <code>2</code> | height of cylinder |
| [options.startRadisu] | <code>Number</code> | <code>1</code> | radius of cylinder at the start |
| [options.startAngle] | <code>Number</code> | <code>0</code> | start angle of cylinder |
| [options.endRadius] | <code>Number</code> | <code>1</code> | radius of cylinder at the end |
| [options.endAngle] | <code>Number</code> | <code>(Math.PI * 2)</code> | end angle of cylinder |
| [options.segments] | <code>Number</code> | <code>12</code> | number of segments to create per full rotation |

**Example**  
```js
let cylinder = cylinder({
  height: 2,
  startRadis: 10,
  endRadis: 5,
  segments: 16
})
```
<a name="ellipse"></a>

## ellipse([options]) ⇒ <code>geom2</code>
Construct an ellispe.

**Kind**: global function  
**Returns**: <code>geom2</code> - new 2D geometry  
**See**: https://en.wikipedia.org/wiki/Ellipse  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0]</code> | center of ellipse |
| [options.radius] | <code>Array</code> | <code>[1,1]</code> | radius of ellipse, along X and Y |
| [options.segments] | <code>Number</code> | <code>16</code> | number of segments to create per 360 rotation |

<a name="circle"></a>

## circle([options]) ⇒ <code>geom2</code>
Construct a circle where are points are at the same distance from the center.

**Kind**: global function  
**Returns**: <code>geom2</code> - new 2D geometry  
**See**: [ellipse](#ellipse) for additional options, as this is an alias for ellipse  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0]</code> | center of circle |
| [options.radius] | <code>Number</code> | <code>1</code> | radius of circle |
| [options.segments] | <code>Number</code> | <code>16</code> | number of segments to create per 360 rotation |

<a name="ellipsoid"></a>

## ellipsoid([options]) ⇒ <code>geom3</code>
Construct an ellipsoid.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0,0]</code> | center of ellipsoid |
| [options.radius] | <code>Array</code> | <code>[1,1,1]</code> | radius of ellipsoid, along X, Y and Z |
| [options.segments] | <code>Number</code> | <code>12</code> | number of segements to create per 360 rotation |
| [options.axes] | <code>Array</code> |  | an array with three vectors for the x, y and z base vectors |

**Example**  
```js
let myshape = ellipsoid({center: [5, 5, 5], radius: [5, 10, 20]})
```
<a name="sphere"></a>

## sphere([options]) ⇒ <code>geom3</code>
Construct a sphere where are points are at the same distance from the center.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  
**See**: [ellipsoid](#ellipsoid) for additional options, as this is an alias for ellipsoid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0,0]</code> | center of sphere |
| [options.radius] | <code>Number</code> | <code>1</code> | radius of sphere |
| [options.segments] | <code>Number</code> | <code>12</code> | number of segments to create per 360 rotation |
| [options.axes] | <code>Array</code> |  | an array with three vectors for the x, y and z base vectors |

<a name="geodesicSphere"></a>

## geodesicSphere([options]) ⇒ <code>geom3</code>
Construct a geodesic sphere based on icosahedron symmetry.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.radius] | <code>Number</code> | <code>1</code> | target radius of sphere |
| [options.frequency] | <code>Number</code> | <code>1</code> | subdivision frequency per face, multiples of 6 |

<a name="line"></a>

## line(points) ⇒ <code>path2</code>
Create a new line (path) from the given points.
The points must be provided as an array, where each element is an array of two numbers.

**Kind**: global function  
**Returns**: <code>path2</code> - new path  
**Example:**: my newpath = line([[10, 10], [-10, 10]])  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array</code> | array of points from which to create the path |

<a name="polygon"></a>

## polygon(options) ⇒ <code>geom2</code>
Construct a polygon from a list of points, or list of points and paths.
NOTE: The ordering of points is VERY IMPORTANT.

**Kind**: global function  
**Returns**: <code>geom2</code> - new 2D geometry  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options for construction |
| options.points | <code>Array</code> | points of the polygon : either flat or nested array of points |
| [options.paths] | <code>Array</code> | paths of the polygon : either flat or nested array of points index |

**Example**  
```js
let roof = [[10,11], [0,11], [5,20]]
let wall = [[0,0], [10,0], [10,10], [0,10]]

let poly = polygon({ points: roof })
or
let poly = polygon({ points: [roof, wall] })
or
let poly = polygon({ points: roof, paths: [0, 1, 2] })
or
let poly = polygon({ points: [roof, wall], paths: [[0, 1, 2], [3, 4, 5, 6]] })
```
<a name="polyhedron"></a>

## polyhedron(options) ⇒ <code>geom3</code>
Create a polyhedron from the given set of points and faces.
The faces can define outward or inward facing polygons (orientation).
However, each face must define a counter clockwise rotation of points which follows the right hand rule.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | options for construction |
| options.points | <code>Array</code> | <code>[</code> | list of points in 3D space |
| options.faces | <code>Array</code> | <code>[</code> | list of faces, where each face is a set of indexes into the points |
| [options.orientation] | <code>Array</code> | <code>&#x27;outward&#x27;</code> | orientation of faces |

**Example**  
```js
let mypoints = [ [10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10] ]
let myfaces = [ [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3] ]
let myshape = polyhedron({points: mypoint, faces: myfaces, orientation: 'inward'})
```
<a name="rectangle"></a>

## rectangle([options]) ⇒ <code>geom2</code>
Construct an axis-aligned rectangle with four sides and four 90-degree angles.

**Kind**: global function  
**Returns**: <code>geom2</code> - new 2D geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0]</code> | center of rectangle |
| [options.size] | <code>Array</code> | <code>[1,1]</code> | size of rectangle, width and height |

**Example**  
```js
let myshape = rectangle({center: [5, 5, 5], size: [5, 10]})
```
<a name="square"></a>

## square([options]) ⇒ <code>geom2</code>
Construct an axis-aligned square with four equal sides and four 90-degree angles.

**Kind**: global function  
**Returns**: <code>geom2</code> - new 2D geometry  
**See**: [rectangle](#rectangle) for additional options, as this is an alias fo rectangle  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0]</code> | center of square |
| [options.size] | <code>Number</code> | <code>1</code> | size of square |

**Example**  
```js
let myshape = square({center: [5, 5], size: 5})
```
<a name="roundedCuboid"></a>

## roundedCuboid([options]) ⇒ <code>geom3</code>
Construct an axis-aligned solid rounded cuboid.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Vector3</code> | <code>[0,0,0]</code> | center of rounded cube |
| [options.size] | <code>Vector3</code> | <code>[1,1,1]</code> | size of rounded cube, single scalar is possible |
| [options.roundRadius] | <code>Number</code> | <code>0.2</code> | radius of rounded edges |
| [options.segments] | <code>Number</code> | <code>12</code> | number of segments to create per 360 rotation |

**Example**  
```js
let mycube = roundedCuboid({
  center: [2, 0, 2],
  size: 15,
  roundRadius: 2,
  segments: 36,
});
```
<a name="roundedCylinder"></a>

## roundedCylinder([options]) ⇒ <code>geom3</code>
Construct a cylinder with rounded ends.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| options.height | <code>Array</code> | <code>2</code> | height of cylinder |
| [options.radius] | <code>Number</code> | <code>1</code> | radius of cylinder |
| [options.roundRadius] | <code>Number</code> | <code>0.2</code> | radius of rounded edges |
| [options.segments] | <code>Number</code> | <code>12</code> | number of segments to create per 360 rotation |

**Example**  
```js
let mycylinder = roundedCylinder({
  height: 10,
  radius: 2,
  roundRadius: 0.5
})
```
<a name="roundedRectangle"></a>

## roundedRectangle([options]) ⇒ <code>geom2</code>
Construct a rounded rectangle.

**Kind**: global function  
**Returns**: <code>geom2</code> - new 2D geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0]</code> | center of rounded rectangle |
| [options.size] | <code>Array</code> | <code>[1,1]</code> | size of rounded rectangle, width and height |
| [options.roundRadius] | <code>Number</code> | <code>0.2</code> | round radius of corners |
| [options.segments] | <code>Number</code> | <code>16</code> | number of segments to create per 360 rotation |

**Example**  
```js
let myrectangle = roundedRectangle({size: [5, 10], roundRadius: 2})
```
<a name="star"></a>

## star([options])
Construct a star from the given options.

**Kind**: global function  
**See**: https://en.wikipedia.org/wiki/Star_polygon  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.center] | <code>Array</code> | <code>[0,0]</code> | center of star |
| [options.vertices] | <code>Number</code> | <code>5</code> | number of vertices (P) on the star |
| [options.density] | <code>Number</code> | <code>2</code> | density (Q) of star |
| [options.outerRadius] | <code>Number</code> | <code>1</code> | outer radius of vertices |
| [options.innerRadius] | <code>Number</code> | <code>0</code> | inner radius of vertices, or zero to calculate |
| [options.startAngle] | <code>Number</code> | <code>0</code> | starting angle for first vertice, in radians |

**Example**  
```js
let star1 = star({vertices: 8, outerRadius: 10}) // star with 8/2 density
let star2 = star({vertices: 12, outerRadius: 40, innerRadius: 20}) // star with given radius
```
<a name="torus"></a>

## torus([options]) ⇒ <code>geom3</code>
Construct a torus by revolving a small circle (inner) about the circumference of a large (outer) circle.

**Kind**: global function  
**Returns**: <code>geom3</code> - new 3D geometry  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | options for construction |
| [options.innerRadius] | <code>Float</code> | <code>1</code> | radius of small (inner) circle |
| [options.outerRadius] | <code>Float</code> | <code>4</code> | radius of large (outer) circle |
| [options.innerSegments] | <code>Integer</code> | <code>16</code> | number of segments to create per 360 rotation |
| [options.outerSegments] | <code>Integer</code> | <code>12</code> | number of segments to create per 360 rotation |
| [options.innerRotation] | <code>Integer</code> | <code>0</code> | rotation of small (inner) circle in radians |

**Example**  
```js
let torus1 = torus({
  innerRadius: 10
})
```
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

