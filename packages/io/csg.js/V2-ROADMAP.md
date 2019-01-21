

# OVERVIEW

## The past

The current version of CSG.js has been built over  a long time, by adding a lot of features on top of the original csg.js.
Up until recently there where :
  - no unit tests
  - no coherence requirements
  - no overarching intent
  - no checks for duplicate features or partially implemented ones
  - a double API: the 'old' object oriented API and a functional API semi overlapping, semi conflicting
  - no linting
  - a blind trust in what came before (insert giant with feet of clay jokes here)
  - barebones documentation, that was written at various stages of development and thus partially outdated or flat out 
  false in some cases
  - no decoupling between API & implementation
  - not using standards or modules (up until recently all of csg was a few GIANT js files, no modules, which made maintenance/ changes very hard)

The end result at this stage is to put it midly, a big mess, that has become increasingly hard to maintain and expand

## Goals

### API: 
  - cleaned up, unified , 'coherent' : ie 
    - functional API only: easier to expand, easier to work with, more granular, easy to understand
    - coherent parameter positions: based on the Ramda logic, options first, data second ! 
    - coherent parameter names: right now we have a giant mess for example: 
      'r' in some functions
      'radius' in some others
      'diameter' is sometimes supported, sometimes not, sometimes 'd' is used instead etc
    - correct primitive & function names, that actually represent what they are doing ! (square => rectangle, cube => cuboid etc)
  
  - decouple api & implementation
    - we want to be able to change the internals of the csg algorithm & data structures without breaking everything
    in the process
      - for example we have been looking into f-rep, b-rep, half edges and beyond that, into Implicit Surfaces and true volumetric modeling (signed distance fields, raymarching & co)
      -  those representations might be useful for different purposes: fast realtime view with distance fields, triangulated/ polygonal output for stl files etc
      The code below does not need to say anything about HOW things are implemented (with the usual caveats that not all of the above can do everything , or equaly well)
  
      ```javascript 
      const shape1 = cube()
      const shape2 = sphere()
      const combined = union(shape1, shape2)
      ``` 
    
    - see [vtree experiments](https://github.com/kaosat-dev/jscad-tree-experiments) for a working system based on V1
  
  - keep the immutability of the API, it is sane, avoids issues with accidental mutation
    - note that this does NOT mean that there cannot be mutable parts in the 'core' (behind the scenes)
  - make all extrusions forms (linear, rotate, fromSlices, etc) use the same code base (most likely a HEAVILLY updated/ optimized version of fromSlices as it is the most generic one)
  
### Internals: 
  - emphasis on simple data as inputs

  - simplification of data structures and functions (they should do one thing & do it well)
    - vertices, points, polygons etc all have deeply nested, overly complex data structures
    - the whole use of 'tags' on the above to find identical instances is overly complex and should be removed (the code predates weakmaps, sets etc)
  
  - the 2d shapes system is in a rather bad state and needs an overhaul, keeping in line with the new functional API,
  and simplifing the data structures

  - use webgl & js environement more inteligently
    - a shorter path to webgl would be ideal to avoid having to regenerate geometry useable by webgl (this note is only valid as long as we use triangle based structures obviously)
    - seperate object TRANSFORMS (transformation matrix) from object STRUCTURE, ie move from transforms 'baked in'
    into geometry to seperate transforms
      multiple reasons for this:
        * currently any transformation (translate, rotate, scale etc) updates every point of every vertex of every polygon (essentially newVertices => oldVertices.map(transform)), this can be very costly and does not scale well
        * A shape is only 
          ```javascript
          {geometry}
          ```
        * the api is immutable so 
          ```javascript
          const a = someFunctionThatCreatesSomeGeometry()
          const b = translate([10, 0, 0], a)
          ```
          means
          - all the geometry of **a** is transformed (memory & cpu use), and stored (memory) in **b**
          - almost only the boolean /csg operation need the baked in transforms (even that could be changed)

        * it could be modified like so:
          A shape could be ```{transforms, geometry}```
          which means
          ```javascript
          const a = someFunctionThatCreatesSomeGeometry() // => {transforms: mat4.identity(), geometry}
          const b = translate([10, 0, 0], a) // {transforms: mat4.identity() * mat4.translation([10, 0,0]), geometry }
          ```
          As long as we are not applying operations that change the actual STRUCTURE of the shape (booleans etc) 
          we only store a **reference** to the original shape's (**a**) geometry
          * we just update the transformation matrix of shape **b*** which is trivial and fast (low memory & cpu cost)
          * we pass that transformation matrix along with the geometry to WebGL for display (which is also very fast & efficient)
          * if we want to export the data to various file formats we might need to bake in the transforms if the format has no support for seperate transforms(STL), or we can keep the data seperate (AMF/ 3MF).
          since exporting happens a lot less than displaying the shapes on screen, this is again much more efficient

        * possible use of instancing : same object with different transforms at different places
        * real time movement of the final shapes in assemblies (common use case)
        * more in depth information about this [here](./V2-BRAINSTORM.md##capabilities)
        
  
  - use arrays & typed arrays with functions to manipulate their data rather than overly complex , shoe-horned classes where applicable

  - this does not mean excluding classes ! IF they make sense, and mostly as very minimal objects that get manipulated by functions (not methods !!) 


 #### Some generic thoughts

  - use of more modern standards & structures: ES6 is our friend ! more readable code , weakmaps, sets , iterators, your name it !
  - do not reinvent the wheel, but avoid dependency bloat
  - optimise (but avoid premature optimisation)

### Small core, big ecosystem 

'less is more': possibly remove things from the 'core' into 'user space' 
  - a lot of contributions had to be refused because they added too specific code to the 'core', despite providing good
  features: we feel most contributions are valid, but instead of having a giant 'do it all but not well core', we want to make finding, importing & using small , specialized pieces of code easier

  - Solutions:
    - use of node modules to distribute user created helpers & designs (this works very well [in practice](https://github.com/PiRo-bots/kiwikee/tree/master/cad/kiwikee))
    - support es6 modules when they are ready (requires universal support for the dynamic `import()` statement)
    - the future website (not just )

### Documentation & examples

- we need to have an actual site (this is not specific to csg, but to jscad in general) with examples and documentation, preferably with live/ interactive examples (should be way easier now that the new ui allows for multiple instances of jscad per page)

## Details

# BREAKING CHANGES

details are [here](V2-BREAKING-CHANGES.md)

# BRAINSTORMING

details are [here](V2-BRAINSTORM.md)

# Notes

- for documentation prefer markdown files over wiki
  - no need for infrastructure
  - single source of truth
  - can be distributed easilly (desktop app, docs generation etc)
  - 'kiss' principle

