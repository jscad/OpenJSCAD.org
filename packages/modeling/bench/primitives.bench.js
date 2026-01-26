/**
 * Benchmarks for primitive shapes
 *
 * Run with: node bench/primitives.bench.js
 */

const {
  cube, cuboid, roundedCuboid,
  sphere, geodesicSphere, ellipsoid,
  cylinder, roundedCylinder, cylinderElliptic,
  torus,
  polyhedron
} = require('../src/primitives')

// Simple benchmark runner
const benchmark = (name, fn, iterations = 100) => {
  // Warmup
  for (let i = 0; i < 10; i++) fn()

  const start = process.hrtime.bigint()
  for (let i = 0; i < iterations; i++) {
    fn()
  }
  const end = process.hrtime.bigint()
  const totalMs = Number(end - start) / 1e6
  const avgMs = totalMs / iterations

  console.log(`${name.padEnd(40)} ${avgMs.toFixed(3).padStart(10)} ms/op  (${iterations} iterations, ${totalMs.toFixed(1)} ms total)`)
  return avgMs
}

console.log('='.repeat(80))
console.log('Primitive Shape Benchmarks')
console.log('='.repeat(80))
console.log()

// Box primitives
console.log('--- Box Primitives ---')
benchmark('cube (default)', () => cube())
benchmark('cube (size: 10)', () => cube({ size: 10 }))
benchmark('cuboid (default)', () => cuboid())
benchmark('cuboid (size: [10, 20, 30])', () => cuboid({ size: [10, 20, 30] }))
benchmark('roundedCuboid (default)', () => roundedCuboid())
benchmark('roundedCuboid (roundRadius: 2)', () => roundedCuboid({ size: [10, 10, 10], roundRadius: 2 }))
benchmark('roundedCuboid (segments: 32)', () => roundedCuboid({ size: [10, 10, 10], roundRadius: 2, segments: 32 }))
console.log()

// Sphere primitives
console.log('--- Sphere Primitives ---')
benchmark('sphere (default, 32 seg)', () => sphere())
benchmark('sphere (segments: 16)', () => sphere({ segments: 16 }))
benchmark('sphere (segments: 64)', () => sphere({ segments: 64 }), 50)
benchmark('sphere (segments: 128)', () => sphere({ segments: 128 }), 20)
benchmark('geodesicSphere (default)', () => geodesicSphere())
benchmark('geodesicSphere (frequency: 6)', () => geodesicSphere({ frequency: 6 }))
benchmark('geodesicSphere (frequency: 12)', () => geodesicSphere({ frequency: 12 }), 20)
benchmark('ellipsoid (default)', () => ellipsoid())
benchmark('ellipsoid (segments: 64)', () => ellipsoid({ segments: 64 }), 50)
console.log()

// Cylinder primitives
console.log('--- Cylinder Primitives ---')
benchmark('cylinder (default)', () => cylinder())
benchmark('cylinder (segments: 16)', () => cylinder({ segments: 16 }))
benchmark('cylinder (segments: 64)', () => cylinder({ segments: 64 }))
benchmark('cylinder (segments: 128)', () => cylinder({ segments: 128 }), 50)
benchmark('roundedCylinder (default)', () => roundedCylinder())
benchmark('roundedCylinder (segments: 64)', () => roundedCylinder({ segments: 64 }), 50)
benchmark('cylinderElliptic (default)', () => cylinderElliptic())
benchmark('cylinderElliptic (segments: 64)', () => cylinderElliptic({ segments: 64 }), 50)
console.log()

// Torus primitives (uses extrudeRotate internally)
console.log('--- Torus Primitives ---')
benchmark('torus (default 32x32)', () => torus())
benchmark('torus (16x16)', () => torus({ innerSegments: 16, outerSegments: 16 }))
benchmark('torus (32x32)', () => torus({ innerSegments: 32, outerSegments: 32 }))
benchmark('torus (48x48)', () => torus({ innerSegments: 48, outerSegments: 48 }), 50)
benchmark('torus (64x64)', () => torus({ innerSegments: 64, outerSegments: 64 }), 20)
benchmark('torus (partial, 180deg)', () => torus({ outerRotation: Math.PI }))
benchmark('torus (partial, 90deg)', () => torus({ outerRotation: Math.PI / 2 }))
console.log()

// Polyhedron
console.log('--- Polyhedron Primitives ---')
// Tetrahedron
const tetraPoints = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]]
const tetraFaces = [[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]]
benchmark('polyhedron (tetrahedron)', () => polyhedron({ points: tetraPoints, faces: tetraFaces }))

// Larger polyhedron (icosahedron-like)
const phi = (1 + Math.sqrt(5)) / 2
const icoPoints = [
  [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
  [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
  [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
]
const icoFaces = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
]
benchmark('polyhedron (icosahedron)', () => polyhedron({ points: icoPoints, faces: icoFaces }))
console.log()

console.log('='.repeat(80))
console.log('Benchmark complete')
