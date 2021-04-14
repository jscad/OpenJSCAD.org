# Aims
simpler, functional oriented, descriptive api


## functional modules

* instead of adding a ton of things to an object prototype , we favor simple, 
specialized functions, each in their own module (no/less circular dependendcies, better overview,
better for future code splitting etc)

* this is partially inspired by gl-matrix and particularly its offshoots/forks : gl-vec2, gl-vec3, gl-vec4

## Order of parameters

* options first, objects after that : 
 * to make functions curryable
 * to accomodate for variable amount of objects passed in etc

## Clear errors

* nothing should fail silently!

## capabilities

### general

#### 'scene'/ object hierarchy and transforms are not implicit/ baked in
  ie in V1, there were no transforms (position/rotation/scale, transformation matrix) available, as soon as you transformed
  and object ie translate([0,10,1], shape1) , ALL of shape1's vertices where transformed
  this 
   * can be quite wastefull, and prevents efficient re-use
   * does not allow for object hierarchies
  If you want for example to create a system to show assembled/ disassembled versions of a design, you can now just apply a different transformation matrix, and leave the bulk of the work for displaying things in the right place to the scenegraph/GPU which is considerably faster than changing every vertex every frame
  * any booleans/ operations that alter the geometry itself (vertices), should not be conflated with more generic transforms

  transforms do not have to be specified manually every time:
  * they default to a 'unit' matrix
  * ie position: [0, 0 ,0] , rotation [0,0,0], scale [1, 1, 1]

  ie (pseudo code)

  ```javascript
  const myPart = {
    name:'foo'
  }
  ```
  
  is the same as

  ```javascript
    const myPart = {
      transform : [1,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
      name:'foo'
    }
  ```
  
  **TODO**  
  * use quaternions or not ?
  * define position, rotation, scale individually ie: 
      position: [10, 0, -1.2],
      rotation: [0, 0, 0],
      scale: [1, 1, 1] 
    or just transformation matrix/quaternion, (possibly with setters/getters / proxy if needed)

#### properties

  ##### purpose

    properties are mean to make taging & reusing signficant aspects of a part easier

  ##### implementation

    properties can now be considered a special type of data that is simply added as a child of a shape/part
    thus they get transformed like any item in the scene graph in a normal manner (local vs parent transforms etc)

    ie (pseudo code)

    ```javascript
    const myPart = {
      transform: [0, 0, 0, 0 , 1, 1, 1 ,0...] // transform relative to parent
      children: [
        {
          type:'property',
          name: 'somecoolstuff',
          transform: [0, 0, 0, 0 , 1, 1, 1 ,0...] // transform relative to parent
        }

      ]
    }
    ```
    we could also keep properties as a special, explicit field:

    ```javascript
    const myPart = {
      transform: [0, 0, 0, 0 , 1, 1, 1 ,0...] // transform relative to parent
      properties: [
        {
          type:'vec3',
          name: 'somecoolstuff',
          transform: [0, 0, 0, 0 , 1, 1, 1 ,0...] // transform relative to parent
        }
      ]
    }
    ```

#### Connectors

  ##### purpose

  'mating points' to make attaching parts together in preset places easier

  ##### implementation

  much like properties, connectors can just be considered a special type of data that is simply added as a child of a shape/part, with some additional orientation information
    thus they get transformed like any item in the scene graph in a normal manner (local vs parent transforms etc)


    ```javascript
    const myPart = {
      transform: [0, 0, 0, 0 , 1, 1, 1 ,0...] // transform relative to parent
      properties: [
        {
          type:'connector',
          name: 'somecoolstuff',
          point: [0, 10, 10],// position relative to parent
          axis: [0, 1, 0],
          normal: [1, 0, 0],
        }
      ]
    }
    ```

#### Annotations

  ##### purpose

  metadata for parts, possible to be displayed within the 3D view
  somewhat related to measurements

  ##### implementation

  much like properties and connectors, perhaps annotations can also just be considered a special type of data that is simply added as a child of a shape/part

### 2D shapes

#### Currently:

* path2: imperative api at odds with the rest ie 
  const path = new Path2()
  path = path.appendArc(xxxx)

#### Future

* descriptive : data describes each path segment/ curve that makes up a complex 2D shape
* seperation of concerns : data vs internal representation
  * we do not recompute the polygons everytime a different line segment or bezier curve is added
  * we describe : [point1, point2, handle1, handle2]
* only distinction between a set of paths and a shape, is whether or not it is closed ?
* not immediate triangulation

 ##### Curve types
  * line : start, end
  * arc : start, center, radius, startAngle, endAngle
  * quadratic bezier: start, controlPoint1, controlPoint2
  * cubic bezier: start, , controlPoint1, controlPoint2, end

#### implementation (description)

  ie (pseudo code)

    ```javascript
    const myshape2 = {
      name:'superShapy!',
      transform: [0, 0, 0, 0 , 1, 1, 1 ,0...]
      curves: [ // or pathSegments, or segments, or paths?
        {
          points: [
            [0,0], [10, 100]// start at [0,0], go to [10, 100]
          ],
          type:'line'
        },
        {
          points: [
            [10,100, 20, 17], [0, 0, 2, 36]// start at [10,100], go to [0, 0], by way of a bezier curve
          ],
          type:'bezier'
        },
        {
          origin: [0,0], // ???? not sure, 
          radius: 20,
          start : 10,
          end: 90,
          type:'arc'
        }
      ]
    }
    ```

### Parts

part : {
  geometry : // or other name ???
    any nested tree of shapes & extrusions ?
}


### Various

- Eliminate 3d shapes completely ?
  * everything can be create from 2d shapes + transforms/extrusions?

- More advanced features : 
 - holes with countersinks or special shapes ? 
  * could be implemented as a compound operation (combine multiple extrusions, unions etc)
  * this is an example of purely **geometrical** construct: makes no sense as part of a ...part
  * would not be a part of core ?
- patterns: put objects in positions based on a mathematical formula
   * just a function really ? some presets perhaps ?

- more heavy reliances on 2d shapes that get extruded ?
  * cylinders
  * cubes
  * torii 


- parts vs assemblies:
  looking at various 'ui based' cad systems, things are a bit different for us:
  * parts: functions
  * assemblies, instances of the various parts, structured together ?
  * returning arrays: returns all the assemblies that you can have ?

- connectors:
  * should be easier to define : addConnector({point, normal, axis}, shape)
  * should be visualized
    * points, axis, normals should be easilly viewed & understood
  * should be offsetable

- visuals that NEED to be added
 * connectors (see above)
 * perhaps we can visualize the 2D bases of extruded shapes (ie the circles 
 at the top/ bottom of cylinders )
 * annotations (not sure)
  * dimensions (not right now, but could be usefull, they are a special type of annotations)

### Various (2)

    - negative shapes:
        - add a ‘negative’ flag at the shape (not geometry ) level, as this is signaling a higher level user intent
        - add a ‘combine’ operator that combines subtract & union? or just use union (preferred)
    - mirror [0,0,0] should be a no-op that does not break anything
    - display overlaps (bounding box & more if needed) to help debug possible issues
    - placement/ align
    - namespaces/groups for parameters ?
    - PARAMETER DEPENDENCIES
        - feed the PREVIOUS value of the dependencies into the getPArameterDefinitions function
        - reuse that to change the parameter definitions !!
        - yay !
    - deal with combined CAG/CSG outputs for exports
    - hull with no params should fails clearly
    - square/rectangle : needs to also accept a single float as size param
    - rotate should work with 1, 2, 3 length arrays
    - distributeAlong (pathLike, distributor, shape)
        - pathLike: on what to distribute 
        - distributor: even, spaced, a function to set the distribution : implies ability to get evenly spaced points regardless of input path/curve
        - shape 
    - distribute 
    - throw errors when trying to do invalid operations between 2D & 3D shapes (booleans)
    - help with 3D orientation: reuse grid numbering ?
    - find ways to unify v-tree (decoupling of api vs implementation FOR GEOMETRY)
    - review/refine the way v-tree deals with uncaching, and perhaps have a priority system for what to keep or not
    - add possible DIN ids for non custom shapes
    - user space is good ! users are numerous, smart, and know their use cases and specifics better !
        - examples: 
            - dimensioned drawings: (needs some very barebones core basics: non exported 2d/3d data
    - simplify extraction of parameter definitions:
        - why is applyParameterDefinitions called multiple times ?
    - ways to get a list of evenly spaced out points on a path (useful a LOT OF TIMES)
    - ways to get the outline of a 2D shape as a path


    ## Code Archelogy

    - for 2d shapes (CAG): FuzzyShape2Factory (used every time canonicalize() is called, ie A LOT)
    lookupOrCreate() is called FOR EACH VERTEX but the results are discarded !! lots of calls for nothing
    - 3d shape (CSG) 3d polygons have 'planes' but a lot of geometry primitives generate planes (normals) on the fly, not 

### Notes

- Planes: used a lot, 
  * V1: had the following structure
  this.normal = normal
  this.w = w
  * V2: simply a vec4 : [x,y,z,w]
  xyzw are like xyzw = abcd from common written form of the plane equation

- OrthoNormalBasis: mostly used to project back & forth between 2D & 3D
  * 