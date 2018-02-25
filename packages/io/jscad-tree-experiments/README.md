# jscad-tree-experiments

Tree (& caching & more ) experiments to speed up significantly design computation time for JSCAD

## Foreword

### The problem

Currently in OpenJSCAD/JSCAD , everytime you change a variable's value, an objects position, it recomputes **everything** !!
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



## 1 - first attempt : 
 * create a replica of the JSCAD functional API that does NOT return geometry
 * but simple object nodes containing 'metadata' (ie , the dimensions etc of a cube, the list of operands for a boolean operation etc)
 * in order to generate a tree (at this stage, kinda, sorta like a csg tree, but not quite).
 * the tree then gets 'evaluated'/ visited and we use the current JSCAD code and api to create actual geometric data from the nodes
 
 Interestingly this also allows for a very nice **decoupling between API and implementation** ! So it might be wortwhile regardless of the results (initial benchmarking results put this implimentation a hair width ahead of the SAME designs run in the current JSCAD)