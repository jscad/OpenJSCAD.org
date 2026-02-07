/**
 * Benchmarks for boolean operations
 *
 * Run with: node bench/booleans.bench.js
 */

const { cube, cuboid, sphere, cylinder, torus } = require('../src/primitives')
const { union, subtract, intersect } = require('../src/operations/booleans')
const { translate } = require('../src/operations/transforms')

// Simple benchmark runner
const benchmark = (name, fn, iterations = 10) => {
  // Warmup
  for (let i = 0; i < 2; i++) fn()

  const start = process.hrtime.bigint()
  for (let i = 0; i < iterations; i++) {
    fn()
  }
  const end = process.hrtime.bigint()
  const totalMs = Number(end - start) / 1e6
  const avgMs = totalMs / iterations

  console.log(`${name.padEnd(50)} ${avgMs.toFixed(1).padStart(10)} ms/op  (${iterations} iterations)`)
  return avgMs
}

console.log('='.repeat(80))
console.log('Boolean Operation Benchmarks')
console.log('='.repeat(80))
console.log()

// Prepare test geometries
const smallCube = cube({ size: 10 })
const smallCubeOffset = translate([5, 0, 0], cube({ size: 10 }))
const medCube = cube({ size: 20 })
const medCubeOffset = translate([10, 0, 0], cube({ size: 20 }))

const smallSphere = sphere({ radius: 5, segments: 16 })
const smallSphereOffset = translate([3, 0, 0], sphere({ radius: 5, segments: 16 }))
const medSphere = sphere({ radius: 5, segments: 32 })
const medSphereOffset = translate([3, 0, 0], sphere({ radius: 5, segments: 32 }))

const smallCyl = cylinder({ radius: 5, height: 10, segments: 16 })
const smallCylOffset = translate([3, 0, 0], cylinder({ radius: 5, height: 10, segments: 16 }))
const medCyl = cylinder({ radius: 5, height: 10, segments: 32 })
const medCylOffset = translate([3, 0, 0], cylinder({ radius: 5, height: 10, segments: 32 }))

const smallTorus = torus({ innerRadius: 1, outerRadius: 4, innerSegments: 16, outerSegments: 16 })
const smallTorusOffset = translate([2, 0, 0], torus({ innerRadius: 1, outerRadius: 4, innerSegments: 16, outerSegments: 16 }))
const medTorus = torus({ innerRadius: 1, outerRadius: 4, innerSegments: 32, outerSegments: 32 })
const medTorusOffset = translate([2, 0, 0], torus({ innerRadius: 1, outerRadius: 4, innerSegments: 32, outerSegments: 32 }))

console.log('--- Union Operations ---')
benchmark('union: cube + cube', () => union(smallCube, smallCubeOffset), 50)
benchmark('union: sphere(16) + sphere(16)', () => union(smallSphere, smallSphereOffset), 20)
benchmark('union: sphere(32) + sphere(32)', () => union(medSphere, medSphereOffset), 10)
benchmark('union: cylinder(16) + cylinder(16)', () => union(smallCyl, smallCylOffset), 20)
benchmark('union: cylinder(32) + cylinder(32)', () => union(medCyl, medCylOffset), 10)
benchmark('union: torus(16) + torus(16)', () => union(smallTorus, smallTorusOffset), 5)
benchmark('union: torus(32) + torus(32)', () => union(medTorus, medTorusOffset), 3)
console.log()

console.log('--- Subtract Operations ---')
benchmark('subtract: cube - cube', () => subtract(smallCube, smallCubeOffset), 50)
benchmark('subtract: sphere(16) - sphere(16)', () => subtract(smallSphere, smallSphereOffset), 20)
benchmark('subtract: sphere(32) - sphere(32)', () => subtract(medSphere, medSphereOffset), 10)
benchmark('subtract: cylinder(16) - cylinder(16)', () => subtract(smallCyl, smallCylOffset), 20)
benchmark('subtract: cylinder(32) - cylinder(32)', () => subtract(medCyl, medCylOffset), 10)
benchmark('subtract: torus(16) - torus(16)', () => subtract(smallTorus, smallTorusOffset), 5)
benchmark('subtract: torus(32) - torus(32)', () => subtract(medTorus, medTorusOffset), 3)
console.log()

console.log('--- Intersect Operations ---')
benchmark('intersect: cube & cube', () => intersect(smallCube, smallCubeOffset), 50)
benchmark('intersect: sphere(16) & sphere(16)', () => intersect(smallSphere, smallSphereOffset), 20)
benchmark('intersect: sphere(32) & sphere(32)', () => intersect(medSphere, medSphereOffset), 10)
benchmark('intersect: cylinder(16) & cylinder(16)', () => intersect(smallCyl, smallCylOffset), 20)
benchmark('intersect: cylinder(32) & cylinder(32)', () => intersect(medCyl, medCylOffset), 10)
benchmark('intersect: torus(16) & torus(16)', () => intersect(smallTorus, smallTorusOffset), 5)
benchmark('intersect: torus(32) & torus(32)', () => intersect(medTorus, medTorusOffset), 3)
console.log()

// Multiple operations (chain)
console.log('--- Chained Operations ---')
const cube1 = cube({ size: 10 })
const cube2 = translate([5, 0, 0], cube({ size: 10 }))
const cube3 = translate([0, 5, 0], cube({ size: 10 }))
const cube4 = translate([0, 0, 5], cube({ size: 10 }))

benchmark('union: 4 cubes', () => union(cube1, cube2, cube3, cube4), 20)
benchmark('subtract: cube - 3 cubes', () => subtract(cube1, cube2, cube3, cube4), 20)
console.log()

// Non-overlapping (fast path)
console.log('--- Non-overlapping (fast path) ---')
const farCube1 = cube({ size: 5 })
const farCube2 = translate([20, 0, 0], cube({ size: 5 }))
benchmark('union: non-overlapping cubes', () => union(farCube1, farCube2), 100)
console.log()

console.log('='.repeat(80))
console.log('Benchmark complete')
