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
  * define position, rotation, scale individually, or just transformation matrix/quaternion, with setters/getters

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
  * everything can be create from 2d shapes + transforms/extrusions

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
  * should be easier to define
  * should be visualized
    * points, axis, normals should be easilly viewed & understood
  * should be offsetable

- visuals that NEED to be added
 * connectors (see above)
 * perhaps we can visualize the 2D bases of extruded shapes (ie the circles 
 at the top/ bottom of cylinders )
 * annotations (not sure)
  * dimensions (not right now, but could be usefull, they are a special type of annotations)