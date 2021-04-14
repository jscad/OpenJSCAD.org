# jscad-tree-experiments

Tree (& caching & more ) experiments to speed up significantly design computation time for JSCAD

## Foreword

### The problem

Currently in JSCAD designs, everytime you change a variable's value, an objects position, it recomputes **everything** !!
but why recompute (in a very costly manner) ALL the geometry of a design everytime **a small portion** of the code changes ?

While I love the simplicity of the current design ie ** code => design **, it does not scale well because of the limiations of our 'geometric core engine' (csg.js), javascript itself, and the complexity of the models.

### Possible solutions

My initial idea & exploration of possible optimisations to JSCAD/openjscad to allow for partial re-evaluation was using **AST (abstract syntax tree)** and the Esprima & co modules ecosystem: due to lack of time, complexity etc things were not really progressing....until !

### Eureka ??

I recently had some very interesting discussions after a talk I did about JSCAD at Hannover.js 
Some people (need to find their names again, sorry folks !) mentioned AST based analysis and partial-re-evaluation not being a good solution, and possible ways of speeding things up by using:
 * an approach similar to virtual-doms : 
    * generate a tree structure, and not directly the geometry
    * do diffs of the previous tree structure to determine the changed parts
 * make use of caching when possible:
    * caching of all possible variants of objects is not really feasable (there are infinite possible sizes of even a single cube() for example)
    * but it should be possible to at least cache some of the 'previous versions' of a design before things change again (since not everything changes at once)
    * perhaps cache each geometry in the csg tree


This repository will contain code that tries to explore these possibilities.

>It is also important to mention that some of the experiments here are also inspired by Maker.js by Dan Marshall, particularly the use of 'pojo' (plain old javascript objects) as a way to define shapes

## running the benchmarks

just type

```npm run output```

The 'user' folder contains all benchmarking code and jscad scripts (in user/examples)

>Note: currently what benchmarks are run, and how is changing a lot

## 1 - first attempt : 

 * create a replica of the JSCAD functional API that does NOT return geometry
 * but simple object nodes containing 'metadata' (ie , the dimensions etc of a cube, the list of operands for a boolean operation etc)
 * in order to generate a tree (at this stage, kinda, sorta like a csg tree, but not quite).
 * the tree then gets 'evaluated'/ visited and we use the current JSCAD code and api to create actual geometric data from the nodes
 
 Interestingly this also allows for a very nice **decoupling between API and implementation** ! So it might be wortwhile regardless of the results (initial benchmarking results put this implimentation a hair width ahead of the SAME designs run in the current JSCAD)

 ### RESULTS

    This actually turned out to work really well and in a simple manner !
    The 'fake' api can be found at core/index.js

 ## 2 - second attempt :

  * building uppon the first attempt, the aim was to make things FASTER by using caching
  * the current implementation works like this:
    * everytime a node gets evaluated into geometry we create a hash of the node
    (this is simple and fast since nodes are simple json)
    * we check our lookup/cache to see if we already have a geometry for that hash
    * if we do not we generate geometry and add it to the cache
    * if we do , we simply return the previously cached geometry

### RESULTS

    This worked amazingly well !
    The first time a jscad script is evaluated, it has around the same speed as previously
    but everytime you re-evaluate it the speedup , even for simpler scripts is in the 3X to 10X range!
    and if you have multiple identical shapes (their complexity does not matter) the speedup is even more significant !

    no more 'recompute the whole thing'!

    This means huge benefits for literally any design, and it makes more complex designs a lot easier to work with !
    As code-based designs tend to be created in a very iterative manner, this is a very nice gain!

    A few additional notes:
    * memory consumption is nearly identical with the 'vanilla' variant (current, non vtree JSCAD)
    * cpu consumption as well, as visible in the benchmarks, though in that case I suspect that there might
    be an issue with my measurements, as the 'vanilla' versions, made my computer fans go crazy, unlike the cache version
    * for now the cache is in memory so there is no gain for cli, but it would be trivial to de/Serialize the cache to also have benefits there

 ## 3 - third attempt :

    This is nearly identical to the second attempt, with one key difference : cache invalidation
    It was implemented in the following manner:
        * increment a counter for a hash if there is a hit
        * keep track of all unused geometry/hash in a given pass
        * AFTER EACH PASS (re-evaluation of a jscad script) decrement the counter for unused hashes
            * if the counter drops to zero, remove the hash/geometry from the cache
    
### RESULTS

    Everything worked as expected : testing with a sequence of files with shared primitives , some of which
    where removed, and correctly decached

